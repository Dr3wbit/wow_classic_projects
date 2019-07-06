from django.shortcuts import render
from home.models import WoWClass, Talent, TalentTree, Crafted, Profession, Spec, TreeAllotted
from django.views.generic import RedirectView, TemplateView
from . import talent_data_creator
from django.core.cache import cache
from django.views.decorators.cache import cache_page, never_cache
from django.utils.decorators import method_decorator
from django.db.models import Q
from django.http import JsonResponse
from django.core import serializers


class IndexView(TemplateView):
	template_name = "index.html"


class TalentCalcTemplate(TemplateView):

	def setup(self, request, *args, **kwargs):
		setup = super().setup(request, *args, **kwargs)
		return setup

	# @method_decorator(never_cache)
	def dispatch(self, request, *args, **kwargs):
		dispatch = super().dispatch(request, *args, **kwargs)
		return dispatch

	def talent_architect(self, context):
		# talent_data_creator.create(cl)
		# const re = /a{2,}|b{2,}|c{2,}|d{2,}|e{2,}|f{2,}|E{2,}|F{2,}|J{2,}/g //looks for repeats of listed letters
		# const re2 = /([a-zA-J])\d/g
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
		context = {}
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


class ConsumeToolTemplate(TemplateView):

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		return context

	def get(self, request, *args, **kwargs):
		context = {}
		context["professions"] = [
			"engineering", "alchemy", "blacksmithing", "cooking",
			"tailoring", "other", "leatherworking", "enchanting", "first_aid",
			"skinning", "mining", "herbalism", "fishing"
			]

		prof = self.kwargs.get("prof", None)
		context["consumes"] = {}
		context["selected"] = prof

		print('\nprof: ', prof)

		if prof=='other':
			consumes = Crafted.objects.filter(prof=None)
			# context["consumes"] = Crafted.objects.filter(prof=None)
		elif prof:
			consumes = Crafted.objects.filter(prof__name=self.kwargs["prof"])

		else:
			consumes = []

		for consume in consumes:
			context["consumes"][consume.name] = {}
			context["consumes"][consume.name]['rarity'] = consume.rarity
			context["consumes"][consume.name]['name'] = str(consume)
			context["consumes"][consume.name]['materials'] = {}
			for mat in consume.materials.all():
				context["consumes"][consume.name]['materials'][mat.name] = {}
				context["consumes"][consume.name]['materials'][mat.name]['rarity'] = mat.rarity
				context["consumes"][consume.name]['materials'][mat.name]['amount'] = int(consume.step*mat.amount)
				context["consumes"][consume.name]['materials'][mat.name]['name'] = str(mat)


		if request.is_ajax():
			response = render(request, "consume_helper.html", context=context)

		else:
			context["something"] = True
			response = render(request, "consume_tool.html", context=context)

		print(context)
		return response


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
	template_name = "contact.html"
#
#
# class ConsumesListView(ConsumeToolTemplate):
#
# 	query_string = ''
#
# 	def setup(self, request, *args, **kwargs):
# 		setup = super().setup(request, *args, **kwargs)
# 		if request.META["QUERY_STRING"]:
# 			self.query_string = request.META["QUERY_STRING"]
# 			# print('query string: ', request.META["QUERY_STRING"])
# 		return setup
#
# 	def get_context_data(self, **kwargs):
#
# 		context = super().get_context_data(**kwargs)
# 		prof_choices = [x for x,y in Profession.PROFESSION_CHOICES]
# 		if self.kwargs["prof"] in prof_choices:
# 			context["consumes"] = Crafted.objects.filter(prof__name=self.kwargs["prof"])
# 		else:
# 			context["consumes"] = Crafted.objects.filter(prof=None)
#
#
# 		context["selected"] = self.kwargs["prof"]
# 		return context
#
# 	# @method_decorator(cache_page(9000)) #cache for 1 hour
# 	def dispatch(self, request, *args, **kwargs):
# 		dispatch = super().dispatch(request, *args, **kwargs)
# 		return dispatch


class TalentsRedirectView(RedirectView):
	permanent = False
	query_string = True
	pattern_name = 'talent_calc'


	def get_redirect_url(self, *args, **kwargs):
		# article = get_object_or_404(Article, pk=kwargs['pk'])

		redirect_url = super().get_redirect_url(*args, **kwargs)
		# article.update_counter()
		print(dir(redirect_url))
		print('self: ', self)
		print('dir self: ', dir(self))
		print(self.args)
		print(self.kwargs)
		print(self.request)

		print('\nredirect_url: ', redirect_url)

		return redirect_url

def delete_list(request):
	saved_list = request.GET.get('saved_list', None)
	data = {}
	if request.user.is_authenticated:
		user = request.user
		if saved_list:
			saved_spec = Spec.objects.filter(name=saved_list, user=user).first()
			if saved_spec:
				print('found spec, deleting')
				data['saved_list'] = saved_spec.name
				Spec.objects.get(name=saved_list, user=user).delete()

	return JsonResponse(data)

def save_spec(request):
	spec_url = request.POST.get('spec_url', None)
	class_name = request.POST.get('class_name', None)
	spec_name = request.POST.get('spec_name', None)
	spnt = request.POST.getlist('spent')
	data = dict(request.POST)
	data['spent'] = []
	spent = {}
	for x in spnt:
		y = x.split(',')
		print(y)
		data['spent'].append(y[1])
		spent[y[0]] = y[1]
	if request.user.is_authenticated:
		user = request.user
		if spec_url and class_name and spec_name:
			wow_class = WoWClass.objects.get(name=class_name)
			spec,created = Spec.objects.update_or_create(
				name=spec_name, user=user, wow_class=wow_class,
				hash=spec_url, defaults={'name': spec_name, 'user':user,
					'wow_class':wow_class, 'hash': spec_url
				}
			)
			data['created'] = created
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

			saved_list = Spec.objects.filter(name=spec_name).first()
			if saved_list:
				print('success')

	return JsonResponse(data)

def load_spec(request):
	data = {}
	name = request.GET.get('spec_name', None)
	print(name)
	if name:
		spec = Spec.objects.filter(name=name).first()
		if spec:
			data['hash'] = spec.hash

	return JsonResponse(data)
# def talent_builder(request):
# 	context = {}
# 	context["classes"] = ["druid", "hunter", "mage", "paladin", "priest", "rogue", "shaman", "warrior", "warlock"]
# 	class_name = request.GET.get('class_name', None)
# 	if class_name:
# 		context["selected"] = class_name
# 		context = talent_architect(context)
#
# 	response = render(request, "talent_builder.html", context=context)
# 	return response


#
# class LoginView(TemplateView):
# 	pass
#
# def talent_architect(context):
# 	# talent_data_creator.create(cl)
# 	# const re = /a{2,}|b{2,}|c{2,}|d{2,}|e{2,}|f{2,}|E{2,}|F{2,}|J{2,}/g //looks for repeats of listed letters
# 	# const re2 = /([a-zA-J])\d/g
# 	class_name = context["selected"]
# 	wow_class = WoWClass.objects.get(name=class_name)
# 	talent_trees = wow_class.talenttree_set.all()
#
# 	context["talent_trees"] = []
# 	blueprints = {}
#
# 	for tree in talent_trees:
# 		context["talent_trees"].append({'name':tree.name, 'sanitized':tree.sanitized})
# 		tree_name = tree.sanitized
# 		all_talents = iter(tree.talent_set.all())
# 		blueprints[tree_name] = tree.architect
# 		for outer_i, outer_v in enumerate(blueprints[tree_name]):
# 			for inner_i, inner_v in enumerate(outer_v):
# 				if inner_v:
# 					next_tal = next(all_talents)
# 					val = [inner_v] if type(inner_v) is not list else inner_v
# 					val = zip(val, next_tal.unlocks) if next_tal.unlocks else val
# 					blueprints[tree_name][outer_i][inner_i] = (val, {'name':str(next_tal.name), 'sanitized':str(next_tal.sanitized), 'unlocks':next_tal.unlocks}, 0)
#
# 	context["blueprints"] = blueprints
# 	return(context)
