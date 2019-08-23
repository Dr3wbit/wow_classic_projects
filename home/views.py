from django.shortcuts import render, redirect, get_object_or_404
from home.models import Item, WoWClass, Talent, TalentTree, Crafted, Profession, Spec, TreeAllotted, Tag, Consume, ConsumeList, Rating
from django.views.generic import RedirectView, TemplateView
from django.core.cache import cache
from django.db.models import Count, Q, Avg
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect, QueryDict
from django.core import serializers, mail
from home.forms import ContactForm, SpecForm, ConsumeListForm
from django.db.utils import IntegrityError # use this in try except when unique_together constraint fails
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.contenttypes.models import ContentType

from itertools import chain
from operator import attrgetter
import re, datetime, secrets

class ThanksView(TemplateView):
	template_name = "thanks.html"

class APIView(TemplateView):
	template_name = "api.html"

	def get(self, request, *args, **kwargs):

		if request.user.groups.filter(name='admins').exists():

			context = {}
			context['recipes'] = Crafted.objects.filter(profession__name='Blacksmithing')
			context['consume_lists'] = ConsumeList.objects.all()
			context['rangen'] = range(5)
			context['specs'] = {}

			for spec in Spec.objects.all():
				context['specs'][spec.name] = {}
				context['specs'][spec.name]['obj'] = spec
				context['specs'][spec.name]['has_voted'] = False

				if request.user.is_authenticated:
					if spec.ratings.filter(user=request.user).exists():
						context['specs'][spec.name]['has_voted'] = True

			context['saved_lists'] = {}
			for cl in context['consume_lists']:
				name = cl.name
				context['saved_lists'][name] = {}
				context['saved_lists'][name]['user'] = cl.user
				context['saved_lists'][name]['hash'] = cl.hash
				context['saved_lists'][name]['consumes'] = {}
				context['saved_lists'][name]['materials'] = {}

				for consume in cl.consumes.all():
					if not consume.item.profession:
						prof_name = 'other'
					else:
						prof_name = consume.item.profession.name

					if prof_name not in context['saved_lists'][name]['consumes'].keys():
						context['saved_lists'][name]['consumes'][prof_name] = {}

					context['saved_lists'][name]['consumes'][prof_name][consume.name] = consume.amount

					for mat in consume.item.materials.all():
						if mat.name not in context['saved_lists'][name]['materials'].keys():
							context['saved_lists'][name]['materials'][mat.name] = {}
							context['saved_lists'][name]['materials'][mat.name]['value'] = 0
							context['saved_lists'][name]['materials'][mat.name]['quality'] = mat.quality
							context['saved_lists'][name]['materials'][mat.name]['img'] = mat.img

						context['saved_lists'][name]['materials'][mat.name]['value'] = int(consume.amount * mat.amount)


			return render(request, self.template_name, context)
		else:
			return HttpResponseRedirect('denied')

class IndexView(TemplateView):
	template_name = "index.html"

	def get(self, request, *args, **kwargs):
		context = {}
		context['rangen'] = range(5) # 5 stars
		context['specs'] = {}
		context['wowclasses'] = WoWClass.objects.all()
		context['wowprofessions'] = Profession.objects.all()
		context['tags'] = Tag.objects.all()
		context['specs'] = Spec.objects.all()
		context['consume_lists'] = ConsumeList.objects.all()

		return render(request, self.template_name, context)


	def post(self, request, *args, **kwargs):
		pass
		# NOTE: saved-list ratings


class TalentCalcTemplate(TemplateView):
	nope = re.compile(r"[\-]")
	forbidden = re.compile(r"[\:\'\(\)]")
	def sanitize(self, s):
		a = self.forbidden.sub('', str(s))
		a = self.nope.sub(' ', a).strip().replace(' ', '_').lower()
		return(a)

	form_class = SpecForm


	def setup(self, request, *args, **kwargs):
		setup = super().setup(request, *args, **kwargs)
		return setup

	# @method_decorator(never_cache)
	def dispatch(self, request, *args, **kwargs):
		dispatch = super().dispatch(request, *args, **kwargs)
		return dispatch

	def talent_architect(self, context):
		class_name = context["selected"]
		wow_class = WoWClass.objects.filter(name=class_name.title()).first()
		if wow_class:

			talent_trees = wow_class.talenttree_set.all()
			context["talent_trees"] = []
			blueprints = {}

			for tree in talent_trees:
				context["talent_trees"].append({'name':tree.name})
				tree_name = tree.name
				all_talents = iter(tree.talent_set.all())
				blueprints[tree_name] = tree.architect
				for outer_i, outer_v in enumerate(blueprints[tree_name]):
					for inner_i, inner_v in enumerate(outer_v):
						if inner_v:
							next_tal = next(all_talents)
							val = [inner_v] if type(inner_v) is not list else inner_v
							val = zip(val, next_tal.unlocks) if next_tal.unlocks else val
							blueprints[tree_name][outer_i][inner_i] = (val, {'name':str(next_tal.name), 'sanitized':self.sanitize(next_tal.name), 'locked':next_tal.locked, 'unlocks':next_tal.unlocks}, 0)

			context["blueprints"] = blueprints
			return(context)


	def get(self, request, *args, **kwargs):
		context = {}
		if 'id' in request.session:
			id = request.session['id']
			context['id'] = id
			spec = Spec.objects.filter(id=id).first()
			if spec:
				context["spec"] = spec

			del request.session['id']
		else:
			id = self.kwargs.get('id', None)
			if id:
				context['id'] = id
				spec = Spec.objects.filter(id=id).first()
				if spec:
					context["spec"] = spec

		context['form'] = self.form_class()
		context["classes"] = ["druid", "hunter", "mage", "paladin", "priest", "rogue", "shaman", "warrior", "warlock"]
		class_name = self.kwargs.get("class", None)

		if bool(class_name):
			context["selected"] = class_name
			context = self.talent_architect(context)

		if request.is_ajax():
			response = render(request, "talent_builder.html", context=context)

		else:
			response = render(request, "talent.html", context=context)

		return response


	def post(self, request, *args, **kwargs):
		form = self.form_class(request.POST)
		context = {}
		context['form'] = form

		if form.is_valid():
			if request.is_ajax():
				try:
					form_data = self.save_list(request, form.cleaned_data)
					created = form_data['created']
					saved_or_updated = 'created' if created else 'updated'
					message = "Successfully {} spec!".format(saved_or_updated)
					data = {
						'name': form_data['name'],
						'created': created,
						'wow_class': form_data['wow_class'],
						'spent': form_data['spent'],
						'message': message,
						'hash': form_data['hash'],
						'id': form_data['id']
					}
					response = JsonResponse(data)

				except IntegrityError as e:
					name = request.POST.get('name', None)
					message = "User {} already has consume list with name: {}".format(request.user.email, name)
					data = {
						'name': name,
						'message': message
					}
					response = JsonResponse(data)
					response.status_code = 400

			else:
				response = HttpResponseRedirect('talent_calc')
		else:
			print('save failed, redirecting to previous page...')
			response = HttpResponseRedirect('talent_calc')

		return response


	def save_list(self, request, cleaned_data):
		url = request.POST.get('hash', None)
		wow_class = request.POST.get('wow_class', None)
		private = cleaned_data['private']
		description = cleaned_data['description']
		name = cleaned_data['name']
		tags = request.POST.getlist('tags')
		spnt = request.POST.getlist('spent')
		data = dict(request.POST)
		data['wow_class'] = wow_class
		spent = {}
		data['hash'] = url
		for x in spnt:
			y = x.split(',')
			data['spent'].append(y[1])
			spent[y[0]] = y[1]

		if request.user.is_authenticated:
			user = request.user
			if url and wow_class and name:
				wow_class = WoWClass.objects.get(name=wow_class.title())
				spec,spec_created = Spec.objects.update_or_create(
					name=name, user=user, wow_class=wow_class, private=private,
					hash=url, description=description,
					defaults={'name': name, 'user':user,
						'wow_class':wow_class, 'hash': url, 'description':description, 'private':private
					}
				)
				data['created'] = True if spec_created else False
				data['id'] = spec.id

				for tag in tags:
					t,tag_created = Tag.objects.get_or_create(name=tag, defaults={'name':tag})

					if tag_created or t not in spec.tags.all():
						spec.tags.add(t)
						spec.save()

				for k,v in spent.items():
					tree_name = k
					invested = v
					tree = TalentTree.objects.get(name=tree_name, wow_class=wow_class)
					t,_ = TreeAllotted.objects.update_or_create(
						tree=tree, spec=spec, defaults={
							'tree':tree, 'spec': spec, 'invested':invested
						}
					)
					t.save()
		return data


class TalentBuilderRedirectView(RedirectView):
	query_string = False
	pattern_name = 'talent_calc'
	permanent = False

	def get_redirect_url(self, *args, **kwargs):

		new_url = "{}://{}/talent_calc".format(self.request.scheme, self.request.get_host())

		if 'id' in self.request.session:
			del self.request.session['id']

		id = kwargs['id']
		self.request.session['id'] = id
		spec = Spec.objects.get(id=id)
		class_name = spec.wow_class.name
		qs = spec.hash
		self.url = new_url+"/{}/{}?{}".format(class_name.lower(), id, qs)

		return self.url

class ConsumeBuilderRedirectView(RedirectView):
	query_string = False
	pattern_name = 'profession_tool'
	permanent = False

	def get_redirect_url(self, *args, **kwargs):

		new_url = "{}://{}/profession_tool".format(self.request.scheme, self.request.get_host())

		if 'id' in self.request.session:
			del self.request.session['id']

		id = kwargs['id']
		self.request.session['id'] = id
		cl = ConsumeList.objects.get(id=id)
		qs = cl.hash
		self.url = new_url+"/{}?{}".format(id, qs)

		return self.url

class ConsumeToolTemplate(TemplateView):
	form_class = ConsumeListForm

	def get(self, request, *args, **kwargs):
		context = {}
		context["form"] = self.form_class()
		context["professions"] = [
			"engineering", "alchemy", "blacksmithing", "cooking",
			"tailoring", "other", "leatherworking", "enchanting", "first_aid",
			"skinning", "mining", "herbalism", "fishing"
		]

		id,cl = False,False

		if 'id' in request.session:
			id = request.session['id']
			del request.session['id']

		elif 'id' in self.kwargs.keys():
			id = self.kwargs.get('id')

		if id:
			cl = ConsumeList.objects.filter(id=id).first()

		if cl:
			context['ix'] = id
			context["consume_list"] = cl
			context['materials'] = get_materials(context["consume_list"])
			context['consumes'] = {}

			for consume in cl.consumes.all():
				prof_name = sanitize(consume.item.profession.name) if consume.item.profession else 'other'
				if prof_name not in context['consumes'].keys():
					context['consumes'][prof_name] = {}
				context['consumes'][prof_name][consume.name] = consume.amount

		data = dict(request.GET)

		prof = self.kwargs.get("prof", None)
		context["recipes"] = {}
		context["selected"] = prof

		if prof=='other':
			recipes = Crafted.objects.filter(profession=None).order_by('item')
			# context["recipes"] = Crafted.objects.filter(prof=None)
		elif prof:
			recipes = Crafted.objects.filter(profession__name=titlecase(prof)).order_by('item')

		else:
			recipes = []

		context["recipes"] = recipes
		qs = request.META.get('QUERY_STRING', None)

		if data.keys() and qs:
			# context['consumes'] = {}
			context['materials'] = {}
			cl = ConsumeList.objects.filter(hash=qs).first()
			if cl:
				context['consume_list'] = cl
				context['materials'] = get_materials(cl)


		if request.is_ajax():
			if 'prof' in data.keys():
				response = render(request, "recipe_helper.html", context=context)
			else:
				response = render(request, "consume_helper.html", context=context)
		else:
			context["whole_page"] = True
			response = render(request, "profession_tool.html", context=context)

		return response

	def post(self, request, *args, **kwargs):
		form = self.form_class(request.POST)
		context = {}
		context['form'] = form
		if form.is_valid():
			if request.is_ajax():
				try:
					form_data = self.save_list(request, form.cleaned_data)
					name = form_data['name']
					created = form_data['created']
					update_or_create = 'created' if created else 'updated'
					message = "Successfully {} list: {}".format(update_or_create, name)
					data = {
						'name': name,
						'spent': form_data['spent'],
						'hash': form_data['hash'],
						'created': created,
						'message': message,
						'id': form_data['id']
					}
					response = JsonResponse(data)
				except IntegrityError as e:
					name = request.POST.get('name', None)
					message = "User {} already has consume list with name: {}".format(request.user.email, name)
					data = {
						'name': name,
						'message': message
					}
					response = JsonResponse(data)
					response.status_code = 400

			else:
				response = HttpResponseRedirect('profession_tool')
		else:
			print('save failed, redirecting to previous page...')
			response = HttpResponseRedirect('profession_tool')

		return response

	#####################################################################
	## with the addition of all items/recipes, no longer a viable method
	## of generating meaningful CL hashes; decommissioned
	#####################################################################
	def consume_list_builder(self, query_str):

		print('query_str: ', query_str)
		qd = QueryDict(query_str).dict()
		my_consumes = {}
		translator = {}

		rle_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		prof_str = {
			'alchemy': 'AL', 'blacksmithing':'BS', 'cooking':'CK', 'engineering':'EN',
			'enchanting': 'EC', 'first_aid':'FA', 'fishing':'FI', 'leatherworking': 'LW', 'other':'OT',
			'tailoring': 'TL', 'skinning':'SK'
		}

		prof_trans = {}
		for k,v in prof_str.items():
			prof_trans[v] = k

		for x,y in qd.items():
			prof_name = prof_trans[x]
			my_consumes[prof_name] = {}
			translator[prof_name] = {}

			if prof_name == 'other':
				prof = None
			else:
				prof = Profession.objects.get(name=prof_name)

			all_crafted = Crafted.objects.filter(prof=prof, end_game=True)

			for k,crafted in zip(rle_str[:all_crafted.count()], all_crafted):
				translator[prof_name][k] = crafted.name

			splitted = re.split(r'([a-zA-Z]{1}[\d]{1,2})', y)
			item_str_list = list(filter(None, splitted))
			for str_item in item_str_list:
				item_name = translator[prof_name][str_item[:1]]
				quantity = str_item[1:]
				my_consumes[prof_name][item_name] = int(quantity)

		return my_consumes


	def save_list(self, request, cleaned_data):

		private = cleaned_data['private']
		tags = request.POST.getlist('tags')
		name = request.POST.get('name', None)
		spnt = request.POST.getlist('spent')
		description = request.POST.get('description')
		data = dict(request.POST)
		data['spent'] = []
		spent = {}

		for x in spnt:
			y = x.split(',')
			a = y[0]
			b = y[1]

			cr = Crafted.objects.get(item__name=a)
			if cr.profession:
				prof_name = cr.profession.name
			else:
				prof_name = 'other'

			if prof_name not in spent.keys():
				spent[prof_name] = {}
			spent[prof_name][a] = b

		data['name'] = name
		data['spent'] = spent

		user = request.user

		c_list,cl_created = ConsumeList.objects.update_or_create(
			name=name, user=user, private=private, description=description,
			defaults={'name': name, 'user':user,
				'description':description, 'private':private
			}
		)

		data['id'] = c_list.id
		hash = secrets.token_hex(5)

		if hash in ConsumeList.objects.all().values_list('hash', flat=True):
			hash = secrets.token_hex(5)

		data['hash'] = hash
		c_list.hash = hash

		data['created'] = True if cl_created else False

		for tag in tags:
			t,tag_created = Tag.objects.get_or_create(name=tag, defaults={'name':tag})
			if tag_created or t not in c_list.tags.all():
				c_list.tags.add(t)
				c_list.save()

		for p,v in spent.items():
			v = {a:b for a,b in v.items() if b}

			# if p == 'other':
			# 	prof = None
			# else:
			# 	prof = Profession.objects.get(name=p)
			#
			for x,y in v.items():

				# item = Item.objects.get(name=x)
				crafted = Crafted.objects.get(item__name=x)
				c,cons_created = Consume.objects.update_or_create(
					amount=y, consume_list=c_list, item=crafted,
					defaults={'amount':y, 'consume_list':c_list, 'item':crafted}
				)
				if cons_created:
					c_list.consumes.add(c)

				c_list.save()


		return data
		# return JsonResponse(data)

	# def url_builder(self, user, consume_list, spent):
	# 	stringy_boy = 'iX={}'.format(uuid.uuid4().hex[:6].upper())
	#
	#
	#
	# 	rle_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
	# 	prof_str = {
	# 		'Alchemy': 'AL', 'Blacksmithing':'BS', 'Cooking':'CK', 'Engineering':'EN',
	# 		'Enchanting': 'EC', 'First Aid':'FA', 'Fishing':'FI', 'Leatherworking': 'LW', 'Other':'OT',
	# 		'Tailoring': 'TL', 'Skinning':'SK'
	# 		}
	# 	translator = {}
	# 	translator['professions'] = prof_str
	#
	# 	for prof_name,crafted_list in spent.items():
	# 		stringy_boy = ''.join([stringy_boy, "&{}=".format(translator['professions'][prof_name])])
	# 		if prof_name == 'other':
	# 			prof = None
	# 		else:
	# 			prof = Profession.objects.get(name=prof_name)
	#
	# 		all_crafted = Crafted.objects.filter(profession=prof, end_game=True)
	# 		translator[prof_name] = {}
	#
	# 		for k,crafted in zip(rle_str[:all_crafted.count()], all_crafted):
	# 			translator[prof_name][crafted.name] = k
	#
	# 		for i,v in crafted_list.items():
	# 			stringy_boy = ''.join([stringy_boy, translator[prof_name][i], str(v)])
	#
	# 	return(stringy_boy)

class EnchantToolView(TemplateView):
	template_name = "enchant_tool.html"

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['slots'] = {
			"left": ["head", "neck", "cloak", "chest", "shirt", "tabard", "bracer"],
			"right": ["gloves", "belt", "legs", "boots", "ring1", "ring2", "trinket1", "trinket2"]
		}
		return context

class SpecsAndGuidesView(TemplateView):
	template_name = "specs_and_guides.html"


class ContactView(TemplateView):
	form_class = ContactForm
	template_name = 'contact.html'

	# Handle GET HTTP requests
	def get(self, request, *args, **kwargs):
		context = {}
		context['form'] = self.form_class()
		return render(request, self.template_name, context)

	# Handle POST HTTP requests
	def post(self, request, *args, **kwargs):
		form = self.form_class(request.POST)
		context = {}

		if form.is_valid():
			subject = form.cleaned_data['subject']
			message = form.cleaned_data['message']
			sender = form.cleaned_data['sender']
			cc_myself = form.cleaned_data['cc_myself']
			recipients = ['admin@onybuff.org']

			if cc_myself:
				recipients.append(sender)
			try:
				mail.send_mail(subject, message, sender, recipients)

			except mail.BadHeaderError:
				return HttpResponse('Invalid header found.')

			return HttpResponseRedirect('success')

		context['form'] = form
		return render(request, self.template_name, context)

class SuccessView(TemplateView):
	template_name = "success.html"

class DeniedView(TemplateView):
	template_name = "denied.html"


def save_rating(request):
	id = request.POST.get('id', None)
	value = request.POST.get('value', None)
	spec = bool(int(request.POST.get('spec', 0)))
	type_of = 'spec' if spec else 'consume_list'
	data = {}
	if (request.user.is_authenticated and id and value):
		user = request.user
		if spec:
			saved_list = Spec.objects.get(id=id)
			data['wow_class'] = saved_list.wow_class.name
		else:
			saved_list = ConsumeList.objects.get(id=id)

		rating = Rating(content_object=saved_list, value=value, user=user)
		rating.save()
		data['success'] = True
		data['average_rating'] = saved_list.rating
		data['num_ratings'] = saved_list.ratings.count()
		data['message'] = "USER: {} SUCCESSFULLY RATED {}".format(user.email, saved_list.name)
		data['id'] = id
		data['spec'] = spec

	return JsonResponse(data)

def delete_rating(request):

	if (request.user.is_staff and request.user.is_superuser):

		id = request.POST.get('id', None)
		spec = request.POST.get('spec', False)
		type_of = 'spec' if spec else 'consume_list'
		data = {}
		if (request.user.is_authenticated and id):
			user = request.user

			if spec:
				if Spec.objects.filter(id=id).exists():
					saved_list = Spec.objects.get(id=id)
			else:
				if ConsumeList.objects.filter(id=id).exists():
					saved_list = ConsumeList.objects.get(id=id)

			if saved_list:


				rating = saved_list.ratings.filter(user=user).first()
				rating_value = rating.value
				rating.delete()

				data['success'] = True
				data['average_rating'] = saved_list.rating
				data['num_ratings'] = saved_list.ratings.count()
				data['message'] = "User: {} successfully deleted your {} star rating for {}".format(str(request.user), rating_value, saved_list.name)
		else:
			data['success'] = False
			data['message'] = 'No id found or user is not authenticated'

	else:
		data['success'] = False
		data['message'] = 'Insufficient permissions'

	return JsonResponse(data)

def delete_list(request):
	name = request.POST.get('name', None)
	wow_class = request.POST.get('wow_class', None)
	data = {}

	if request.is_ajax():
		if request.user.is_authenticated:
			user = request.user
			if wow_class:
				data['wow_class'] = wow_class
				saved_list = Spec.objects.filter(name=name, user=user).first()
			else:
				saved_list = ConsumeList.objects.filter(name=name, user=user).first()

			if saved_list:
				data['name'] = name
				saved_list.delete()
				data['message'] = 'SUCCESSFULLY DELETED {}'.format(name)
				data['success'] = True
				response = JsonResponse(data)

			else:
				data['name'] = name

				data['success'] = False
				data['message'] = 'SAVED LIST {} NOT FOUND, UNABLE TO DELETE'.format(name)
				response = JsonResponse(data)

	return response

def load_spec(request):
	data = {}
	name = request.GET.get('spec_name', None)
	id = request.GET.get('id', None)
	print('id: ', id)
	if id:
		spec = Spec.objects.filter(id=id).first()
		if spec:
			data['hash'] = spec.hash
	#
	# if name:
	# 	spec = Spec.objects.filter(name=name).first()
	# 	if spec:
	# 		data['hash'] = spec.hash

	return JsonResponse(data)


# def save_consume_list(request):
# 	pass

def ajax_tooltip(request):
	data = {}
	# static = request.GET.get('static', None)
	which = request.GET.get('which', 0)
	name = request.GET.get('name', None)
	data['name'] = name
	static = request.GET.get('static', False)

	if int(which) == 0:
		items = Item.objects.filter(name=name)
		if items:
			item = items.first()
		else:
			item = Item.objects.get(name='samwise', ix=69420)

		if not static:
			data['image_name'] = item.img

		data['quality'] = item.quality
		if item.bop:
			data['bop'] = item.bop

		if item.unique:
			data['unique'] = item.unique

		if item.slot:
			data['slot'] = item.slot

		if item.proficiency:
			data['proficiency'] = item.proficiency

		if item.damage:
			data['damage'] = []
			for dmg in item.damage.all():
				data['damage'].append(str(dmg))

		if item.speed:
			data['speed'] = item.speed

		if item.damage and item.speed:
			data['dps'] = item.dps

		if item.stats:
			data['stats'] = item.stats

		if item.resists:
			data['resists'] = item.resists

		if item.durability:
			data['durability'] = item.durability

		if item.requirements:
			data['requirements'] = item.requirements

		if item.equips:
			data['equips'] = []
			for equip in item.equips.all():
				data['equips'].append(equip.t)

		if item.procs:
			data['procs'] = []
			for proc in item.procs.all():
				data['procs'].append(proc.t)

		if item.use:
			data['use'] = item.use.t

		if item.description:
			data['description'] = item.description

	elif which == 1:
		talents = Talent.objects.filter(name=name)
		pass

	response = JsonResponse(data)
	return response

def yeet_cannon(request):

	context = {}
	context['rangen'] = range(5)
	# specs = Spec.objects.all()
	# consume_lists = ConsumeList.objects.all()

	data = dict(request.GET)
	reverse = data.get('reverse', False)
	# prof_filters = request.GET.get('prof_filters', None)
	# class_filters = request.GET.get('class_filters', None)
	tags = data.get('tags', None)
	sorting = data.get('sorting', None)
	combined = data.get('combined', None)
	query = data.get('query', None)
	specs = ''
	consume_lists = ''
	if tags:
		# NOTE: and(&&):
		print('tags: ', tags)
		# specs = set(specs.filter(tags__name__in=tags).filter(wow_class__name__in=tags))
		# consume_lists = set(consume_lists.filter(tags__name__in=tags).filter(consume__item__prof__name__in=tags))

		# NOTE: or(||):
		specs = Spec.objects.filter(Q(tags__name__in=tags) | Q(wow_class__name__in=tags))

		# print('specs.count: ', specs.count)
		consume_lists = ConsumeList.objects.filter(Q(tags__name__in=tags) | Q(consume__item__profession__name__in=tags))
		# consume_lists = set(ConsumeList.objects.filter(tags__name__in=tags) | ConsumeList.objects.filter(consume__item__profession__name__in=tags))


	if query:
		search_re = ''
		for i,term in enumerate(query):
			if term != query[-1]:
				search_re = search_re+"{}|".format(term)
			else:
				search_re = search_re+"{}".format(term)

		search_regex = r"({})+".format(search_re)

		# qs = [x.lower() for x in qs]
		# print("qs: ", query)
		# print("search_regex: ", search_regex)
		query_consume_lists = ConsumeList.objects.exclude(Q(visible=False) | Q(flagged=True)).filter(Q(name__iregex=search_regex) | Q(description__iregex=search_regex))
		query_specs = Spec.objects.exclude(Q(visible=False) | Q(flagged=True)).filter(Q(name__iregex=search_regex) | Q(description__iregex=search_regex))

		print('query_specs.count: ', query_specs.count())
		print('query_consume_lists.count: ', query_consume_lists.count())

		if specs:
			specs = specs.union(query_specs)
		else:
			specs = query_specs

		if consume_lists:
			consume_lists = consume_lists.union(query_consume_lists)
		else:
			consume_lists = query_consume_lists


	# print("SORTING IS MANUALLY SET TO FALSE #YEET_CANNON")
	if sorting:
		sorting = sorting[0]

		sorting = list(sorting)
		sign = sorting.pop(0)
		sign = '' if sign == '+' else sign
		sorting = ''.join(sorting)
		reverse = True if sign=="-" else False
		if not specs and not consume_lists:
			specs = Spec.objects.all()
			consume_lists = ConsumeList.objects.all()

		if sorting == 'rating':
			how_order = '{}avg_rating'.format(sign)

			specs = specs.annotate(num_ratings=Count('ratings'), avg_rating=Avg('ratings__value')).filter(num_ratings__gt=0).distinct().order_by('{}avg_rating'.format(sign))
			consume_lists = consume_lists.annotate(num_ratings=Count('ratings'), avg_rating=Avg('ratings__value')).filter(num_ratings__gt=0).distinct().order_by('{}avg_rating'.format(sign))

		elif sorting == 'created':
			specs = specs.distinct().order_by('{}created'.format(sign))
			consume_lists = consume_lists.distinct().order_by('{}created'.format(sign))

		# combining specs and consume lists
		# if combined:
		# 	#created, ascending(oldest):
		# 	# context['result_list'] = sorted(chain(specs, consume_lists), key=attrgetter('created'))
		#
		# 	#created, descending(newest):
		# 	context['result_list'] = sorted(chain(specs, consume_lists), key=attrgetter('created'), reverse=reverse)
		#
		# 	#top rated (filters out saved lists with 0 ratings):
		# 	specs = specs.annotate(num_ratings=Count('ratings')).filter(num_ratings__gt=0)
		# 	consume_lists = consume_lists.annotate(num_ratings=Count('ratings')).filter(num_ratings__gt=0)
		#
		# 	context['result_list'] = sorted(chain(specs, consume_lists), key=attrgetter('rating'), reverse=True)
		#
		# # individual sorting
		# madeup = False
		# if madeup:
		# 	# top rated
		#
		# 	specs = specs.annotate(num_ratings=Count('ratings'), avg_rating=Avg('ratings__value')).filter(num_ratings__gt=0).order_by('-avg_rating')
		# 	consume_lists = consume_lists.annotate(num_ratings=Count('ratings'), avg_rating=Avg('ratings__value')).filter(num_ratings__gt=0).order_by('-avg_rating')

			# context['result_list'] = list(chain(specs, consume_lists))

	if not specs and not consume_lists:
		context['specs'] = Spec.objects.all()
		context['consume_lists'] = ConsumeList.objects.all()


	else:
		context['specs'] = specs
		context['consume_lists'] = consume_lists
	# context['specs'] = Spec.objects.all() if not specs else specs
	# context['consume_lists'] = ConsumeList.objects.all() if not consume_lists else consume_lists

	response = render(request, "index_helper.html", context=context)
	return response


def savedlist_info(request):
	id = request.GET.get("id", None)
	print('id: ', id)
	caller = request.GET.get("caller", None)
	context = {}
	if id:
		if caller == 'tc':
			saved_list = Spec.objects.filter(id=id).first()
			if saved_list:
				context['spec'] = saved_list

		elif caller == 'pt':
			saved_list = ConsumeList.objects.filter(id=id).first()
			if saved_list:
				context['consume_list'] = saved_list
				context['materials'] = get_materials(saved_list)

		return render(request, "info_display.html", context=context)

def get_materials(cl):
	materials = {}
	for consume in cl.consumes.all():
		for mat in consume.mats:
			if mat.name not in materials.keys():
				materials[mat.name] = {}
				materials[mat.name]['value'] = 0
				materials[mat.name]['quality'] = mat.quality
				materials[mat.name]['img'] = mat.img
				materials[mat.name]['ix'] = mat.item.ix

			materials[mat.name]['value'] += int(consume.amount * mat.amount)

	return materials
#
# def search_query(request):
# 	context = {}
# 	context['message'] = 'ok'
#
# 	class_names = ["druid", "hunter", "mage", "paladin", "priest", "rogue", "shaman", "warrior", "warlock"]
# 	tag_names = [x.name.lower() for x in Tag.objects.all()]
#
# 	qd = dict(request.GET)
# 	qs = qd.get('query', None)
#
# 	search_re = ''
# 	for i,term in enumerate(qs):
# 		if term != qs[-1]:
# 			search_re = search_re+"{}|".format(term)
# 		else:
# 			search_re = search_re+"{}".format(term)
#
# 	search_regex = r"({})+".format(search_re)
#
# 	# qs = [x.lower() for x in qs]
# 	print("qs: ", qs)
# 	print("search_regex: ", search_regex)
#
# 	if qs:
# 		class_ix = [class_names.index(x) for x in qs if x in class_names]
# 		if class_ix:
# 			wow_classes = [class_names[x] for x in class_ix]
# 			print('wow_classes: ', wow_classes)
#
# 		tag_ix = [tag_names.index(x) for x in qs if x in tag_names]
# 		if tag_ix:
# 			tags = [tag_names[x] for x in tag_ix]
# 			tags = [x for x in tags if x not in class_names]
#
# 			print('tags present: ', wow_classes)
#
# 		# consumelists = ConsumeList.objects.filter(Q(description__icontains__in=qs) | Q(name__icontains__in=qs))
# 		consume_lists = ConsumeList.objects.exclude(Q(visible=False) | Q(flagged=True)).filter(Q(name__iregex=search_regex) | Q(description__iregex=search_regex))
# 		specs = Spec.objects.exclude(Q(visible=False) | Q(flagged=True)).filter(Q(name__iregex=search_regex) | Q(description__iregex=search_regex))
#
# 		context['consume_lists'] = consume_lists
# 		context['specs'] = specs
#
# 		# saved_lists = consume_lists.union(specs)
# 		print('consume_lists: ', consume_lists)
# 		print('specs: ', specs)
#
# 		print('num consume_lists: ', consume_lists.count())
# 		print('num specs: ', specs.count())
#
#
#
# 	if (specs.count==0) and (consume_lists.count==0):
# 		# context['status_code'] = 400
# 		context['message'] = 'not ok'
# 		print('no ok')
# 		return HttpResponse('No matches', status=400)
# 	else:
# 		return render(request, "index_helper.html", context=context)

	# response = JsonResponse(context)

	# return response

def flag_list(request):
	uid = request.POST.get("uid", None)
	ix = request.POST.get("ix", None)
	print(request.POST)


	wow_class = request.POST.get("wow_class", None)
	data = {}
	if wow_class:
		print('wow_class')

		saved_list = Spec.objects.filter(id=int(ix)).first()

	else:
		saved_list = ConsumeList.objects.filter(id=(ix)).first()

	if saved_list:
		saved_list.visible = False
		saved_list.flagged = True
		saved_list.save()
		message = "{} - ({}) by {}, flagged for review`".format(saved_list.name, ix, saved_list.user.email)
		data['message'] = message
		data['uid'] = uid
		data['ix'] = ix
		response = JsonResponse(data)

	else:
		response = JsonResponse(data)
		response.status_code = 400

	return response


def titlecase(s):
	word_exceptions = ['of', 'the']
	a = s.replace('_', ' ')
	word_list = a.split()

	for i,word in enumerate(word_list):
		if word not in word_exceptions:
			word_list[i] = word.title()

	c = ' '.join(word_list)
	return(c)

nope = re.compile(r"[\-]")
forbidden = re.compile(r"[\:\'\(\)]")

def sanitize(s):
	a = forbidden.sub('', str(s))
	a = nope.sub(' ', a).strip().replace(' ', '_').lower()
	return(a)
