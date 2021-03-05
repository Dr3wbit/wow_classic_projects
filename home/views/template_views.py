from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, RedirectView, TemplateView
from django.core.cache import cache
from django.db.models import Count, Q, Avg
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect, QueryDict
from django.core import serializers, mail
from home.forms import ContactForm, SpecForm, ConsumeListForm
from home.models import Item, WoWClass, Talent, TalentTree, Crafted, Profession, Spec, TreeAllotted, Tag, Consume, ConsumeList, Rating
from django.db.utils import IntegrityError # use this in try except when unique_together constraint fails
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib.contenttypes.models import ContentType
# from django.core.paginator import Paginator
from django.conf import settings
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page


from itertools import chain
from operator import attrgetter
import math, re, datetime, secrets, os, json, requests, random


def handler500(request):
	context = {}
	phrases = ["Did you find what you were looking for?", "You seem lost...", "Oopsy whoops, we made a fucksy wucksy!!!", "Hello?"]
	print(500)

	if settings.GIF_API:
		search_terms = ['lost', 'shrug', 'always sunny']
		search = random.choice(search_terms)
		start_pos = random.randint(1, 50)
		r = requests.get("https://api.tenor.com/v1/search?q=%s&key=%s&limit=%s&locale=%s&pos=%s" % (search, settings.GIF_API, 20, 'en_US', start_pos))
		if r.status_code == 200:
			content = json.loads(r.content)
			if content:
				if 'results' in content.keys():
					gifs = content['results']
					gif = random.choice(gifs)
					medium_gif = [v for x in gif['media'] for k,v in x.items() if k == 'mediumgif']
					if medium_gif:
						gif_url = medium_gif[0]['url']
						gif_dimensions = medium_gif[0]['dims']

						if gif_url and gif_dimensions:
							context['phrase'] = random.choice(phrases)
							context['gif_url'] = gif_url
							context['gif_width'] = gif_dimensions[0]
							context['gif_height'] = gif_dimensions[0]

	response = render(request, "error500.html", context=context)
	response.status_code = 500
	return response

def handler404(request, exception):
	context = {}
	phrases = ["Did you find what you were looking for?", "You seem lost...", "Oopsy whoops, we made a fucksy wucksy!!!", "Hello?"]
	print(404)

	if settings.GIF_API:
		search_terms = ['lost', 'shrug', 'always sunny']
		search = random.choice(search_terms)
		start_pos = random.randint(1, 50)
		r = requests.get("https://api.tenor.com/v1/search?q=%s&key=%s&limit=%s&locale=%s&pos=%s" % (search, settings.GIF_API, 20, 'en_US', start_pos))

		if r.status_code == 200:
			content = json.loads(r.content)
			if content:
				if 'results' in content.keys():

					gifs = content['results']
					gif = random.choice(gifs)

					medium_gif = [v for x in gif['media'] for k,v in x.items() if k == 'mediumgif']

					if medium_gif:
						gif_url = medium_gif[0]['url']
						gif_dimensions = medium_gif[0]['dims']

						if gif_url and gif_dimensions:
							context['phrase'] = random.choice(phrases)
							context['gif_url'] = gif_url
							context['gif_width'] = gif_dimensions[0]
							context['gif_height'] = gif_dimensions[0]

	response = render(request,'error404.html', context=context)
	response.status_code = 404
	return response


class ThanksView(TemplateView):
	template_name = "thanks.html"

@method_decorator(cache_page(60 * 1440), name='dispatch')
class APIView(TemplateView):
	template_name = "api.html"

	def get(self, request, *args, **kwargs):

		if request.user.groups.filter(name='admins').exists():

			context = {'recipes': Crafted.objects.filter(profession__name='Enchanting'),
				'consume_lists': ConsumeList.objects.all(), 'rangen': range(5),
				'specs': {}, 'saved_lists': {}
			}

			for spec in Spec.objects.all():
				context['specs'][spec.name] = {'obj': spec, 'has_voted': False}

				if request.user.is_authenticated:
					if spec.ratings.filter(user=request.user).exists():
						context['specs'][spec.name]['has_voted'] = True

			for cl in context['consume_lists']:
				context['saved_lists'][cl.name] = {
					'user': cl.user, 'hash': cl.hash, 'consumes': {}, 'materials': {}
				}

				for consume in cl.consumes.all():
					prof_name = consume.item.profession.name if consume.item.profession else 'other'
					if prof_name not in context['saved_lists'][cl.name]['consumes'].keys():
						context['saved_lists'][cl.name]['consumes'][prof_name] = {}

					context['saved_lists'][cl.name]['consumes'][prof_name][consume.name] = consume.amount
					for mat in consume.item.materials.all():
						if mat.name not in context['saved_lists'][cl.name]['materials'].keys():
							context['saved_lists'][cl.name]['materials'][mat.name] = {
								'value': 0, 'quality': mat.quality, 'img': mat.img
							}

						context['saved_lists'][cl.name]['materials'][mat.name]['value'] = int(consume.amount * mat.amount)

			return render(request, self.template_name, context)
		else:
			return HttpResponseRedirect('denied')

class IndexView(TemplateView):
	template_name = "index.html"

	def get(self, request, *args, **kwargs):
		context = {'rangen': range(5), 'specs': Spec.objects.all(),
			'wowclasses': WoWClass.objects.all(), 'tags': Tag.objects.all(),
			'consume_lists': ConsumeList.objects.all()
		}

		return render(request, self.template_name, context)


	def post(self, request, *args, **kwargs):
		pass
		# NOTE: saved-list ratings


class TalentCalcTemplate(TemplateView):
	form_class = SpecForm

	def talent_architect(self, context):
		class_name = context["selected"]
		blueprints = {}
		cache_key = 'tc_{}'.format(class_name)
		cache_item = cache.get(cache_key)

		if cache_item:
			blueprints = cache_item
		else:
			if WoWClass.objects.filter(name=class_name.title()):
				wow_class = WoWClass.objects.filter(name=class_name.title()).first()
				talent_trees = wow_class.talenttree_set.all()
				context["talent_trees"] = []

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
								blueprints[tree_name][outer_i][inner_i] = (val, {'name':str(next_tal.name), 'sanitized':sanitize(next_tal.name), 'locked':next_tal.locked, 'unlocks':next_tal.unlocks}, 0)

				cache.add(cache_key, blueprints, 86400)

		context["blueprints"] = blueprints
		return(context)


	def get(self, request, *args, **kwargs):
		context = {}
		id = ''
		if 'id' in request.session:
			id = request.session['id']
			del request.session['id']
		else:
			id = self.kwargs.get('id', None)

		if id:
			context['id'] = id
			spec = Spec.objects.filter(id=id)

			if spec:
				spec = spec.first()
				context["spec"] = spec

		context['form'] = self.form_class()
		context["classes"] = ["druid", "hunter", "mage", "paladin", "priest", "rogue", "shaman", "warrior", "warlock"]

		class_name = self.kwargs.get("class", None)

		if bool(class_name):
			context["selected"] = class_name.lower()
			context = self.talent_architect(context)

		# if request.is_ajax():
		# 	response = render(request, "talent_builder.html", context=context)

		response = render(request, "talent.html", context=context)

		return response


	def post(self, request, *args, **kwargs):
		form = self.form_class(request.POST)
		context = {}

		if form.is_valid():
			context['form'] = form
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
						'id': form_data['id'],
						'img': form_data['img']
					}
					response = JsonResponse(data)

				except IntegrityError as e:
					name = request.POST.get('name', None)
					message = "User {} already has spec with name: {}".format(request.user.email, name)
					data = {
						'name': name,
						'message': message
					}
					response = JsonResponse(data)
					response.status_code = 400

			else:
				response = HttpResponseRedirect('not_ajax')
		else:
			print('save failed, redirecting to previous page...')
			response = HttpResponseRedirect('form_not_valid')

		return response


	def save_list(self, request, cleaned_data):
		data = dict(request.POST)
		data.update({'hash': cleaned_data['hash'], 'private': cleaned_data['private'],
			'name': cleaned_data['name'], 'wow_class': request.POST.get('wow_class', None)
		})

		tags = request.POST.getlist('tags')
		spnt = request.POST.getlist('spent')
		spent = {}
		for x in spnt:
			y = x.split(',')
			data['spent'].append(y[1])
			spent[y[0]] = y[1]

		if request.user.is_authenticated:
			user = request.user
			if data['hash'] and data['wow_class'] and data['name']:
				wow_class = WoWClass.objects.get(name=data['wow_class'].title())
				spec,spec_created = Spec.objects.update_or_create(
					name=data['name'], user=user, wow_class=wow_class,
					defaults={'name': data['name'], 'user':user,
						'wow_class':wow_class, 'hash': data['hash'],
						'description':data['description'], 'private':cleaned_data['private']
					}
				)
				data['created'] = True if spec_created else False
				data['id'] = spec.id

				data['img'] = spec.img
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

		qd = list((self.request.GET).keys())[0]

		new_url = "{}://{}/profession_tool".format(self.request.scheme, self.request.get_host())

		if 'id' in self.request.session:
			del self.request.session['id']

		id = kwargs['id']
		# if id:
			# new_url = new_url+"/{}".format(id)

		cl = ConsumeList.objects.filter(id=id)
		if cl:
			cl = cl.first()
			self.request.session['id'] = id
			cl = ConsumeList.objects.get(id=id)
			qs = cl.hash

		else:
			qs = qd

		self.url = new_url+"?{}".format(qs)

		return self.url

## Also known as the ProfessionTool
class ConsumeToolTemplate(TemplateView):
	form_class = ConsumeListForm

	def paginator(self, num_recipes, page_number, items_per_page):

		pagination = {}
		max_pages = round(num_recipes/items_per_page)
		pagination['rangen'] = range(1, max_pages+1)
		pagination['page_number'] = page_number
		pagination['START'] = ((page_number - 1)*items_per_page)
		pagination['STOP'] = pagination['START']+items_per_page if page_number != max_pages else num_recipes
		pagination['current_page'] = page_number
		pagination['num_pages'] = max_pages
		pagination['plus_one'] = self.has_next(page_number+1, max_pages)
		pagination['plus_two'] = self.has_next(page_number+2, max_pages)
		pagination['plus_three'] = self.has_next(page_number+3, max_pages)
		pagination['has_next'] = self.has_next(page_number, max_pages)
		pagination['has_previous'] = self.has_previous(page_number)
		return pagination

	def get(self, request, *args, **kwargs):
		context = {'form': self.form_class(), 'professions': [
			"engineering", "alchemy", "blacksmithing", "cooking",
			"tailoring", "other", "leatherworking", "enchanting", "first_aid",
			"skinning", "mining", "herbalism", "fishing"
		]}

		id,cl = False,False

		if 'id' in request.session:
			id = request.session['id']
			del request.session['id']

		elif 'id' in self.kwargs.keys():
			id = self.kwargs.get('id')

		if id:
			cl = ConsumeList.objects.filter(id=id)

		if cl:
			cl = cl.first()
			context['ix'] = id
			context["consume_list"] = cl
			context['materials'] = self.get_materials(context["consume_list"])
			context['consumes'] = {}

			for consume in cl.consumes.all():
				prof_name = sanitize(consume.item.profession.name) if consume.item.profession else 'other'
				if prof_name not in context['consumes'].keys():
					context['consumes'][prof_name] = {}
				context['consumes'][prof_name][consume.name] = consume.amount


		prof = self.kwargs.get("prof", None)
		context["recipes"] = {}
		context["selected"] = prof

		all_recipes = []

		if prof=='other':
			all_recipes = Crafted.objects.filter(profession=None).order_by('item')
			# context["recipes"] = Crafted.objects.filter(prof=None)
		elif prof:
			all_recipes = Crafted.objects.filter(profession__name=titlecase(prof)).order_by('item')

		if all_recipes:

			if all_recipes.count() > 50:

				# pagination
				num_recipes = all_recipes.count()
				items_per_page = int(request.GET.get('results_per_page', 30))
				page_number = int(request.GET.get('page', 1))

				context['pagination'] = {}
				context['pagination'] = self.paginator(num_recipes, page_number, items_per_page)

				START = context['pagination']['START']
				STOP = context['pagination']['STOP']

				context["recipes"] = all_recipes[START:STOP]

			else:
				context["recipes"] = all_recipes

		qs = request.META.get('QUERY_STRING', None)
		data = dict(request.GET)

		if data.keys() and qs:
			# context['consumes'] = {}
			context['materials'] = {}
			cl = ConsumeList.objects.filter(hash=qs)
			if cl:
				cl = cl.first()
				context['consume_list'] = cl
				context['materials'] = self.get_materials(cl)



		response = render(request, "profession_tool.html", context=context)
		return response

	def post(self, request, *args, **kwargs):

		if request.method == 'POST':
			form = self.form_class(request.POST)
			context = {}

			if form.is_valid():
				context['form'] = form
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
						consume_list = ConsumeList.objects.filter(id=form_data['id'], hash=form_data['hash'])
						if consume_list:
							consume_list = consume_list.first()
							data['img'] = consume_list.img
							profs_used = consume_list.profs_used[0]

							data['profs'] = profs_used

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
					cl = ConsumeList.objects.filter(id=id)

				if cl:
					cl = cl.first()
					context['ix'] = id
					context["consume_list"] = cl
					context['materials'] = self.get_materials(context["consume_list"])
					context['consumes'] = {}

					for consume in cl.consumes.all():
						prof_name = sanitize(consume.item.profession.name) if consume.item.profession else 'other'
						if prof_name not in context['consumes'].keys():
							context['consumes'][prof_name] = {}
						context['consumes'][prof_name][consume.name] = consume.amount

				prof = self.kwargs.get("prof", None)
				context["recipes"] = {}
				context["selected"] = prof

				if prof=='other':
					all_recipes = Crafted.objects.filter(profession=None).order_by('item')
					# context["recipes"] = Crafted.objects.filter(prof=None)
				elif prof:
					all_recipes = Crafted.objects.filter(profession__name=titlecase(prof)).order_by('item')
				else:
					all_recipes = []


				if all_recipes:

					if all_recipes.count() > 50:
						# pagination
						items_per_page = int(request.POST.get('results_per_page', 30))
						page_number = int(request.POST.get('page', 1))
						num_recipes = all_recipes.count()

						context['pagination'] = {}
						context['pagination'] = self.paginator(num_recipes, page_number, items_per_page)

						START = context['pagination']['START']
						STOP = context['pagination']['STOP']

						context["recipes"] = all_recipes[START:STOP]
					else:
						context["recipes"] = all_recipes

				qs = request.META.get('QUERY_STRING', None)

				data = dict(request.POST)

				if data.keys() and qs:
					# context['consumes'] = {}
					context['materials'] = {}
					cl = ConsumeList.objects.filter(hash=qs)
					if cl:
						cl = cl.first()
						context['consume_list'] = cl
						context['materials'] = self.get_materials(cl)


				if request.is_ajax():
					if 'prof' in data.keys():
						response = render(request, "recipe_helper.html", context=context)
					else:
						response = render(request, "consume_helper.html", context=context)
				else:
					context["whole_page"] = True
					response = render(request, "profession_tool.html", context=context)

				return response

				print('save failed, redirecting to previous page...')
				response = HttpResponseRedirect('profession_tool')

			return response

	def has_next(self, page_number, max_pages):
		if page_number < max_pages:
			return True
		else:
			return False

	def has_previous(self, page_number):
		return True if page_number > 1 else False

	def save_list(self, request, cleaned_data):

		private = cleaned_data['private']
		tags = request.POST.getlist('tags')
		name = request.POST.get('name', None)
		spent = request.POST.getlist('spent')
		description = request.POST.get('description')
		data = dict(request.POST)
		consumes = {}

		for x in spent:
			y = x.split(',')

			ix = y[0]
			amount = y[1]
			consumes[ix] = amount


		data['name'] = name

		user = request.user

		c_list,cl_created = ConsumeList.objects.update_or_create(
			name=name, user=user,
			defaults={'name': name, 'user':user,
				'description':description, 'private':private
			}
		)

		data['id'] = c_list.id
		hash = secrets.token_hex(5)

		if cl_created:

			while hash in ConsumeList.objects.all().values_list('hash', flat=True):
				hash = secrets.token_hex(5)

			c_list.hash = hash

		data['hash'] = c_list.hash

		data['created'] = True if cl_created else False

		for tag in tags:
			t,tag_created = Tag.objects.get_or_create(name=tag, defaults={'name':tag})
			if tag_created or t not in c_list.tags.all():
				c_list.tags.add(t)
				c_list.save()


		for ix,amount in consumes.items():
			crafted = Crafted.objects.get(item__ix=ix)
			c,cons_created = Consume.objects.update_or_create(
				amount=amount, consume_list=c_list, item=crafted,
				defaults={'amount':amount, 'consume_list':c_list, 'item':crafted}
			)
			if cons_created:
				c_list.consumes.add(c)

			c_list.save()


		return data
		# return JsonResponse(data)


	def get_materials(self, cl):
		materials = {}
		for consume in cl.consumes.all():
			for mat in consume.mats:
				if mat.name not in materials.keys():
					materials[mat.name] = {'value': 0, 'quality': mat.quality,
						'img': mat.img, 'ix': mat.item.ix
					}

				materials[mat.name]['value'] += int(consume.amount * mat.amount)

		return materials


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
