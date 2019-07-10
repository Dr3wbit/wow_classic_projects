from django.shortcuts import render, redirect
from home.models import WoWClass, Talent, TalentTree, Crafted, Profession, Spec, TreeAllotted, Tag, Consume, ConsumeList, Rating
from django.views.generic import RedirectView, TemplateView
from django.core.cache import cache
from django.views.decorators.cache import cache_page, never_cache
from django.utils.decorators import method_decorator
from django.db.models import Q
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect, QueryDict
from django.core import serializers, mail
from home.forms import ContactForm, SpecForm, ConsumeListForm
from django.db.utils import IntegrityError # use this in try except when unique_together constraint failed

class IndexView(TemplateView):
	template_name = "index.html"

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['specs'] = Spec.objects.all()
		context['consume_lists'] = ConsumeList.objects.all()
		context['rangen'] = range(5)
		return context


	def post(self, request, *args, **kwargs):
		pass
		# NOTE: saved-list ratings
		# name = request.POST.get('name', None)
		# rating = request.POST.get('rating', 0)
		# user = Profile.objects.get(username=request.user.email)

		# saved_list = Spec.objects.get

		# rating creation
		# z = Rating(content_object=saved_list, value=val, user=user)

class TalentCalcTemplate(TemplateView):
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
		wow_class = WoWClass.objects.get(name=class_name)
		talent_trees = wow_class.talenttree_set.all()
		context["talent_trees"] = []
		blueprints = {}

		for tree in talent_trees:
			context["talent_trees"].append({'name':tree.name, 'sanitized':tree.sanitized})
			tree_name = tree.sanitized
			all_talents = iter(tree.talent_set.all())
			blueprints[tree_name] = tree.architect
			for outer_i, outer_v in enumerate(blueprints[tree_name]):
				for inner_i, inner_v in enumerate(outer_v):
					if inner_v:
						next_tal = next(all_talents)
						val = [inner_v] if type(inner_v) is not list else inner_v
						val = zip(val, next_tal.unlocks) if next_tal.unlocks else val
						blueprints[tree_name][outer_i][inner_i] = (val, {'name':str(next_tal.name), 'sanitized':str(next_tal.sanitized), 'locked':next_tal.locked, 'unlocks':next_tal.unlocks}, 0)

		context["blueprints"] = blueprints
		return(context)

	def get(self, request, *args, **kwargs):
		print('get request')
		context = {}
		context['form'] = self.form_class()
		context["classes"] = ["druid", "hunter", "mage", "paladin", "priest", "rogue", "shaman", "warrior", "warlock"]
		class_name = self.kwargs.get("class", None)
		if class_name:
			context["selected"] = class_name
			context = self.talent_architect(context)

		if request.is_ajax():
			response = render(request, "talent_builder.html", context=context)

		else:
			context["first_load"] = True
			response = render(request, "talent.html", context=context)

		return response


	def post(self, request, *args, **kwargs):
		form = self.form_class(request.POST)
		context = {}
		context['form'] = form

		print('post request')
		if form.is_valid():

			# response = self.save_list(request)
			print('dir: ', dir(form))
			if request.is_ajax():
				form_data = self.save_list(request, form.cleaned_data)
				name = form_data['name']
				spent = form_data['spent']
				wow_class = form_data['wow_class']

				print('cleaned data: ', form.cleaned_data)
				data = {
					'name': name,
					'wow_class': wow_class,
					'spent': spent,
					'message': "Successfully saved spec!"
				}
				response = JsonResponse(data)
			else:
				data = {
					'error': IntegrityError,
				}
				response = response
			# return HttpResponseRedirect('success')
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

		for x in spnt:
			y = x.split(',')
			data['spent'].append(y[1])
			spent[y[0]] = y[1]

		# data['spent'] = spent

		if request.user.is_authenticated:
			user = request.user
			if url and wow_class and name:
				wow_class = WoWClass.objects.get(name=wow_class)
				spec,_ = Spec.objects.update_or_create(
					name=name, user=user, wow_class=wow_class, private=private,
					hash=url, description=description,
					defaults={'name': name, 'user':user,
						'wow_class':wow_class, 'hash': url, 'description':description, 'private':private
					}
				)
				for tag in tags:
					t,_ = Tag.objects.get_or_create(name=tag, defaults={'name':tag})
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
					print('\nt: ', t)
					t.save()


		print('data, saved_list: ', data)
		return data


class ConsumeToolTemplate(TemplateView):
	form_class = ConsumeListForm

	def get(self, request, *args, **kwargs):
		context = {}
		context['form'] = self.form_class()
		context["professions"] = [
			"engineering", "alchemy", "blacksmithing", "cooking",
			"tailoring", "other", "leatherworking", "enchanting", "first_aid",
			"skinning", "mining", "herbalism", "fishing"
			]

		prof = self.kwargs.get("prof", None)
		context["recipes"] = {}
		context["selected"] = prof

		if prof=='other':
			recipes = Crafted.objects.filter(prof=None)
			# context["recipes"] = Crafted.objects.filter(prof=None)
		elif prof:
			recipes = Crafted.objects.filter(prof__name=self.kwargs["prof"])

		else:
			recipes = []

		for recipe in recipes:
			nombre = recipe.name
			context["recipes"][nombre] = {}
			context["recipes"][nombre]['rarity'] = recipe.rarity
			context["recipes"][nombre]['name'] = str(recipe)
			context["recipes"][nombre]['materials'] = {}
			for mat in recipe.materials.all():
				m_nombre = mat.name
				context["recipes"][nombre]['materials'][m_nombre] = {}
				context["recipes"][nombre]['materials'][m_nombre]['rarity'] = mat.rarity
				context["recipes"][nombre]['materials'][m_nombre]['amount'] = int(recipe.step*mat.amount)
				context["recipes"][nombre]['materials'][m_nombre]['name'] = str(mat)


		if request.is_ajax():
			response = render(request, "consume_helper.html", context=context)

		else:
			context["something"] = True
			response = render(request, "consume_tool.html", context=context)

		return response

	def post(self, request, *args, **kwargs):
		form = self.form_class(request.POST)
		context = {}
		context['form'] = form
		if form.is_valid():
			print('dir: ', dir(form))
			if request.is_ajax():
				print('cleaned data: ', form.cleaned_data)
				form_data = self.save_list(request, form.cleaned_data)
				name = form_data['name']
				spent = form_data['spent']

				data = {
					'name': name,
					'spent': spent,
					'message': "Successfully submitted form data."
				}
				response = JsonResponse(data)
			else:
				response = HttpResponseRedirect('consume_tool')
		else:
			print('save failed, redirecting to previous page...')
			response = HttpResponseRedirect('consume_tool')

		return response


	# def delete_list(self, request):
	# 	saved_list = request.GET.get('saved_list', None)
	# 	data = {}
	# 	if request.user.is_authenticated:
	# 		user = request.user
	# 		if saved_list:
	# 			saved_spec = Spec.objects.filter(name=saved_list, user=user).first()
	# 			if saved_spec:
	# 				print('found spec, deleting')
	# 				data['saved_list'] = saved_spec.name
	# 				Spec.objects.get(name=saved_list, user=user).delete()
	#
	# 	return JsonResponse(data)

	def save_list(self, request, cleaned_data):

		private = cleaned_data['private']
		tags = request.POST.getlist('tags')
		name = request.POST.get('name', None)
		spnt = request.POST.getlist('spent')
		description = request.POST.get('description')
		data = dict(request.POST)
		print(data)
		data['spent'] = []
		spent = {}

		for x in spnt:
			y = x.split(',')
			a = y[0]
			b = y[1]
			prof = Crafted.objects.get(item__name=a).prof
			prof_name = prof.name

			if prof_name not in spent.keys():
				spent[prof_name] = {}

			spent[prof_name][a] = b

			# spent[y[0]] = y[1]

		hash = self.url_builder(spent)
		print('hash: ', hash)
		data['spent'] = spent
		data['hash'] = hash

		user = request.user
		c_list,_ = ConsumeList.objects.update_or_create(
			name=name, user=user, private=private,
			hash=hash, description=description,
			defaults={'name': name, 'user':user, 'hash': hash,
				'description':description, 'private':private
			}
		)

		for tag in tags:
			print(tag)
			t,_ = Tag.objects.get_or_create(name=tag, defaults={'name':tag})
			c_list.tags.add(t)
			c_list.save()

		for p,v in spent.items():
			print("prof:{} -- {}".format(p, v))

			prof = Profession.objects.get(name=p)
			for x,y in v.items():

				# item = Item.objects.get(name=x)
				cr = Crafted.objects.get(item__name=x, prof=prof)
				c,_ = Consume.objects.update_or_create(
					invested=y, consume_list=c_list, item=cr,
					defaults={'invested':y, 'consume_list':c_list, 'item':cr}
				)
				c_list.consumes.add(c)
				c_list.save()

		return JsonResponse(data)


	def url_builder(self, consume_list):
		stringy_boy = ''

		rle_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		prof_str = {
			'alchemy': 'AL', 'blacksmithing':'BS', 'cooking':'CK', 'engineering':'EN',
			'enchanting': 'EC', 'first_aid':'FA', 'fishing':'FI', 'leatherworking': 'LW', 'other':'OT',
			'tailoring': 'TL', 'skinning':'SK'
			}
		translator = {}
		translator['professions'] = prof_str

		for prof_name,crafted_list in consume_list.items():
			stringy_boy = ''.join([stringy_boy, "&{}=".format(translator['professions'][prof_name])])

			prof = Profession.objects.get(name=prof_name)

			all_crafted = Crafted.objects.filter(prof=prof, end_game=True)

			translator[prof_name] = {}

			for k,crafted in zip(rle_str[:all_crafted.count()], all_crafted):
				translator[prof_name][crafted.name] = k

			for i,v in crafted_list.items():
				stringy_boy = ''.join([stringy_boy, translator[prof_name][i], str(v)])

		print(stringy_boy)
		return(stringy_boy)

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
				data['message'] = 'successfully deleted the list'
				response = JsonResponse(data)

			else:
				data['message'] = 'unable to delete saved list'
				response = JsonResponse(data)

	return response

def load_spec(request):
	data = {}
	name = request.GET.get('spec_name', None)
	print(name)
	if name:
		spec = Spec.objects.filter(name=name).first()
		if spec:
			data['hash'] = spec.hash

	return JsonResponse(data)

def save_consume_list(request):
	pass
