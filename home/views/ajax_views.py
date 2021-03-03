from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.db.models import Count, Q, Avg
from home.models import Crafted, ConsumeList, Item, Profession, Rating, Spec, Tag, WoWClass
from itertools import chain
from operator import attrgetter
from django.template.loader import render_to_string
import os
from django.views.decorators.cache import cache_page


def consume_list_builder(request):
	data = {}
	status_code = 200
	hash = request.GET.get('hash', None)
	qs = request.META.get('QUERY_STRING', None)

	hash = hash.replace("?", "")
	consume_list = {}
	material_list = {}
	list_info = {}

	if hash:

		cl = ConsumeList.objects.filter(hash=hash)

		if cl:
			cl = cl.first()
			list_info['name'] = cl.name
			list_info['user'] = cl.user.disc_username
			list_info['description'] = cl.description
			list_info['updated'] = cl.updated
			list_info['tags'] = [x.name for x in cl.tags.all()]

			for consume in cl.consumes.all():
				consume_list[consume.ix] = get_item_info('', consume.ix)
				consume_list[consume.ix]['amount'] = consume.amount/consume_list[consume.ix]['step']


				consume_list[consume.ix]['materials'] = {}
				for mat in consume.mats:
					consume_list[consume.ix]['materials'][mat.item.ix] = mat.amount

					material_list[mat.item.ix] = get_item_info('', mat.item.ix)
					material_list[mat.item.ix]['per'] = mat.amount


	data['list_info'] = list_info
	data['consume_list'] = consume_list
	data['material_list'] = material_list

	response = JsonResponse(data, safe=False)

	if not consume_list:
		response.status_code = 404

	return response


def get_spec_info(request):

	data = {}
	status_code = 404

	data['hash'] = request.GET.get('hash', None)
	qs = request.META.get('QUERY_STRING', None)
	data['wow_class'] = request.GET.get('wow_class', None)

	data['hash'] = data['hash'].replace("?", "")
	list_info = {}

	if data['hash'] and data['wow_class']:

		wow_class = WoWClass.objects.filter(name=data['wow_class'].title())
		if wow_class:
			wow_class = wow_class.first()
			spec = Spec.objects.filter(user=request.user, hash=data['hash'], wow_class=wow_class)


			if spec:
				spec = spec.first()
				status_code = 200
				list_info['name'] = spec.name
				list_info['user'] = spec.user.disc_username
				list_info['description'] = spec.description
				list_info['updated'] = spec.updated
				list_info['tags'] = [x.name for x in spec.tags.all()]


	data['list_info'] = list_info

	response = JsonResponse(data, safe=False)
	response.status_code = status_code

	return response

def get_basic_item_info(item):
	info = {}
	info['n'] = item.name
	info['q'] = item.quality
	info['img'] = item.img
	if item.step:
		info['step'] = item.step

	return info


def recipe_list_builder(request):

	data = {}
	prof = request.GET.get('prof', None)
	data['prof'] = prof

	all_recipes = {}
	recipe_list = {}

	if prof == 'other':
		all_recipes = Crafted.objects.filter(profession=None).order_by('item')

	elif prof:
		all_recipes = Crafted.objects.filter(profession__name=titlecase(prof)).order_by('item')
	else:
		all_recipes = {}

	for recipe in all_recipes:
		ix = recipe.item.ix
		recipe_list[ix] = {}
		recipe_list[ix]['name'] = recipe.item.name
		recipe_list[ix]['quality'] = recipe.item.quality
		recipe_list[ix]['img'] = recipe.item.img
		recipe_list[ix]['step'] = recipe.step
		recipe_list[ix]['mats'] = {}
		for mat in recipe.materials.all():
			matIX = mat.item.ix
			recipe_list[ix]['mats'][matIX] = {}
			recipe_list[ix]['mats'][matIX]['name'] = mat.name
			recipe_list[ix]['mats'][matIX]['quality'] = mat.quality
			recipe_list[ix]['mats'][matIX]['img'] = mat.img
			recipe_list[ix]['mats'][matIX]['step'] = mat.amount

	data['recipes'] = recipe_list

	response = JsonResponse(data, safe=False)
	return response


def set_pagination(request):
	pass

@cache_page(60*5) #cache for 15mins
def get_saved_lists(request):
	data = {}
	specs = Spec.objects.exclude(visible=False)
	consume_lists = ConsumeList.objects.exclude(visible=False)
	all_lists = sorted(chain(specs, consume_lists), key=attrgetter('created'))
	data['saved_lists'] = []
	for list_item in all_lists:

		list_info = {}
		list_info['ix'] = list_item.id
		list_info['uid'] = list_item.user.uid
		list_info['img'] = list_item.img
		list_info['description'] = list_item.description
		list_info['name'] = list_item.name
		list_info['rating'] = list_item.rating
		list_info['created'] = list_item.created
		list_info['private'] = list_item.private
		list_info['hash'] = list_item.hash
		list_info['disc_username'] = list_item.user.disc_username
		list_info['voted'] = (list_item.has_voted(request.user.email)) if hasattr(request.user, 'email') else False

		list_info['can_vote'] = True if (request.user.is_authenticated and ((not list_item.has_voted(request.user.email)) and (list_item.user != request.user))) else False
		list_info['ratings_count'] = list_item.ratings.count()

		list_info['tags'] = []
		for tag in list_item.tags.all():
			list_info['tags'].append(tag.name)

		if hasattr(list_item, 'wow_class'):
			list_info['wow_class'] = list_item.wow_class.name
			list_info['spec'] = '({}/{}/{})'.format(list_item.treeallotted_set.all()[0].invested, list_item.treeallotted_set.all()[1].invested, list_item.treeallotted_set.all()[2].invested)

		data['saved_lists'].append(list_info)


	response = JsonResponse(data, safe=False)
	return response



def user_info(request):
	data = {}
	data['auth'] = False
	data['staff'] = False
	data['super'] = False

	if request.user.is_authenticated:
		data['auth'] = True
		data['uid'] = request.user.uid

		if request.user.is_staff:
			data['staff'] = True

		if request.user.is_superuser:
			data['super'] = True

	response = JsonResponse(data)
	return response


def update_icon(request):
	data = {}
	status_code = 200

	img = request.POST.get("img", None)
	id = request.user.queue

	data['id'] = id
	data['img'] = img
	if not img or not id:
		status_code = 400

	else:

		data['queue_type'] = request.user.queue_type
		if request.user.queue_type == 1:
			saved_list = Spec.objects.filter(id=id, user=request.user)
		else:
			saved_list = ConsumeList.objects.filter(id=id, user=request.user)

		if saved_list:
			saved_list = saved_list.first()
			saved_list.img = img+".jpg"
			saved_list.save()
			data['message'] = "{} updated to use icon: {}".format(saved_list.name, img)

		else:
			status_code = 400

	if status_code == 400:
		data['message'] = 'Unable to update icon for saved list'

	response = JsonResponse(data)
	response.status_code = status_code

	return response

@cache_page(60*60*24*7) # cache for a week
def icon_list(request):
	context = {}
	context['info'] = {}

	def has_next(page_number, max_pages):
		if page_number < max_pages:
			return True
		else:
			return False

	def has_previous(page_number):
		return True if page_number > 1 else False

	def get_all_images(path):
		ALL_IMAGES = []
		with open(os.path.abspath(path), 'r+') as f:
			for line in f:
				ALL_IMAGES.append(line.strip())

		return list(set(ALL_IMAGES))

	PER_PAGE = int(request.GET.get('results_per_page', 50))
	ALL_IMAGES = get_all_images("tools/scraping/py/image_list.txt")
	max_pages = round(len(ALL_IMAGES)/PER_PAGE)

	page_number = int(request.GET.get('page', 1))

	context['info']['page_number'] = page_number

	queue = request.GET.get('queue', None)
	id = request.GET.get('ix', None)

	if id and queue:
		request.user.queue = int(id)
		context['info']['id'] = int(id)
		request.user.queue_type = int(queue)
		request.user.save()


	START = page_number*PER_PAGE if page_number != 1 else 1
	STOP = START+PER_PAGE

	context['images'] = ALL_IMAGES[START:STOP]

	context['info']['num_pages'] = max_pages
	context['info']['plus_one'] = has_next(page_number+1, max_pages)
	context['info']['plus_two'] = has_next(page_number+2, max_pages)
	context['info']['plus_three'] = has_next(page_number+3, max_pages)
	context['info']['has_next'] = has_next(page_number, max_pages)
	context['info']['has_previous'] = has_previous(page_number)

	return render(request, 'icon_list.html', {'context': context})


	def create_image_list(self, dir):
		regex = re.compile("([\w\_]+).jpg")
		file_list = []
		for _root, _dirs, files in os.walk(dir):
			for name in files:
				match = regex.search(name)
				if match:
					file_name = match.group(1)
					file_list.append(file_name)
		with open(os.path.abspath("image_list.txt"), 'a+') as f:
			for name in set(file_list):
				f.write(name+"\n")

		return file_list


def flag_list(request):
	uid = request.POST.get("uid", None)
	ix = request.POST.get("ix", None)

	wow_class = request.POST.get("wow_class", None)
	data = {}
	saved_list = ''

	print('ix: ', ix)
	print('wow_class: ', wow_class)

	if wow_class:
		saved_list = Spec.objects.filter(id=ix)
	else:
		saved_list = ConsumeList.objects.filter(id=ix)

	if saved_list:
		saved_list = saved_list.first()
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
		response.status_code = 404

	return response

def prof_loader(request):
	data = {}
	status_code = 200

	prof = request.GET.get("prof", None)
	id = request.user.queue

	data = []

	if not prof:
		status_code = 400
	else:
		recipes = Crafted.objects.filter(profession__name=prof)

		for ind,recipe in zip(range(recipes.count()), recipes.all()):
			data.append({'name':recipe.name, 'ix':recipe.item.ix,
						'step':recipe.step, 'quality':recipe.item.quality,
						'img':recipe.item.img, 'mats':[], 'skillups':recipe.skillup})

			for mat in recipe.materials.all():
				data[-1]['mats'].append({'name':mat.name, 'ix': mat.item.ix,
				'step':mat.amount, 'quality': mat.quality, 'img': mat.img})

	if status_code == 400:
		data['message'] = 'An error occurred'

	response = JsonResponse(data, safe=False)
	response.status_code = status_code

	return response

def savedlist_info(request):
	id = request.POST.get("id", None)
	caller = request.POST.get("caller", None)
	context = {}
	if id:
		if caller == 'tc':
			saved_list = Spec.objects.filter(id=id)
			if saved_list:
				saved_list = saved_list.first()
				context['spec'] = saved_list

		elif caller == 'pt':
			saved_list = ConsumeList.objects.filter(id=id)
			if saved_list:
				saved_list = saved_list.first()
				context['consume_list'] = saved_list
				context['materials'] = get_materials(saved_list)

		html = render_to_string("info_display.html", context)
		return HttpResponse(html)

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

def query_saved_lists(request):

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
		# print('tags: ', tags)
		# specs = set(specs.filter(tags__name__in=tags).filter(wow_class__name__in=tags))
		# consume_lists = set(consume_lists.filter(tags__name__in=tags).filter(consume__item__prof__name__in=tags))

		# NOTE: or(||):
		# filtering specs in the database by tag name
		specs = Spec.objects.filter(Q(tags__name__in=tags) | Q(wow_class__name__in=tags))

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

			specs = specs.annotate(num_ratings=Count('ratings'), avg_rating=Avg('ratings__value')).filter(num_ratings__gt=0).distinct().order_by(how_order)
			consume_lists = consume_lists.annotate(num_ratings=Count('ratings'), avg_rating=Avg('ratings__value')).filter(num_ratings__gt=0).distinct().order_by(how_order)

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
		# 	#top rated (excludes any saved list not yet rated):
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

def delete_rating(request):
	data = {}
	status_code = 200

	if (request.user.is_staff or request.user.is_superuser):

		id = request.POST.get('ix', None)
		wow_class = request.POST.get('wow_class', None)
		saved_list = ''
		if (request.user.is_authenticated and id):
			data['ix'] = id

			if wow_class:
				data['wow_class'] = wow_class
				saved_list = Spec.objects.filter(id=id)
			else:
				saved_list = ConsumeList.objects.filter(id=id)

			if saved_list:
				saved_list = saved_list.first()
				data['uid'] = saved_list.user.uid
				rating = saved_list.ratings.filter(user=request.user).first()
				rating_value = rating.value
				rating.delete()

				data['success'] = True
				data['average_rating'] = saved_list.rating
				data['num_ratings'] = saved_list.ratings.count()
				data['message'] = "User: {} successfully deleted your {} star rating for {}".format(str(request.user), rating_value, saved_list.name)
		else:
			data['success'] = False
			status_code = 406
			data['message'] = 'No id found or user is not authenticated'

	else:
		status_code = 403
		print('not a super user')
		data['success'] = False
		data['message'] = 'Insufficient permissions'

	response = JsonResponse(data)
	response.status_code = status_code

	return response



def save_rating(request):
	id = request.POST.get('id', None)
	rating_value = request.POST.get('rating', None)
	wow_class = request.POST.get('wow_class', None)
	data = {}
	saved_list = ''

	if (request.user.is_authenticated and id and rating_value):
		user = request.user

		if wow_class:
			saved_list = Spec.objects.filter(id=id)
		else:
			saved_list = ConsumeList.objects.filter(id=id)

		if saved_list:
			saved_list = saved_list.first()
			rating = Rating(content_object=saved_list, value=rating_value, user=user)
			rating.save()
			data['success'] = True
			data['average_rating'] = saved_list.rating
			data['num_ratings'] = saved_list.ratings.count()
			data['message'] = "USER: {} SUCCESSFULLY RATED {}".format(user.email, saved_list.name)
			data['id'] = id
			data['wow_class'] = wow_class

	return JsonResponse(data)

def delete_list(request):
	name = request.POST.get('name', None)
	wow_class = request.POST.get('wow_class', None)

	data = {}

	data['success'] = False
	data['message'] = 'SAVED LIST {} NOT FOUND, UNABLE TO DELETE'.format(name)
	status_code = 400
	if request.is_ajax():
		if request.user.is_authenticated:
			user = request.user
			if wow_class:
				data['wow_class'] = wow_class
				saved_list = Spec.objects.filter(name=name, user=user)
			else:
				saved_list = ConsumeList.objects.filter(name=name, user=user)

			data['name'] = name

			if saved_list:
				saved_list.first().delete()
				data['message'] = 'SUCCESSFULLY DELETED {}'.format(name)
				data['success'] = True
				status_code = 200

	response = JsonResponse(data)
	response.status_code = status_code
	return response

def load_spec(request):
	data = {}
	name = request.GET.get('spec_name', None)
	id = request.GET.get('id', None)
	if id:
		spec = Spec.objects.filter(id=id)
		if spec:
			spec = spec.first()
			data['hash'] = spec.hash
	#
	# if name:
	# 	spec = Spec.objects.filter(name=name).first()
	# 	if spec:
	# 		data['hash'] = spec.hash

	return JsonResponse(data)

def get_item_info(request, ix=None):
	data = {}
	status_code = 200
	if not ix:
		ix = request.GET.get('ix', None)

	item = ''

	if ix:
		data['ix'] = ix
		itemQS = Item.objects.filter(ix=ix)
		if itemQS:
			item = itemQS.first()
			if item:
				recipeQS = Crafted.objects.filter(item=item)
				if recipeQS:
					recipe = recipeQS.first()
					data['step'] = recipe.step
					data['materials'] = {}
					for mat in recipe.materials.all():
						matIX = mat.item.ix
						data['materials'][matIX] = mat.amount

		else:
			status_code = 404
			item = Item.objects.get(name='samwise', ix=69420)


		data['img'] = item.img
		data['q'] = item.quality
		data['n'] = item.name

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

			if data['damage'] == []:
				del data['damage']

		if item.speed:
			data['speed'] = item.speed

		if item.damage and item.speed:
			data['dps'] = item.dps

		if item.armor:
			data['armor'] = item.armor

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

			if data['equips'] == []:
				del data['equips']

		if item.procs:
			data['procs'] = []
			for proc in item.procs.all():
				data['procs'].append(proc.t)

			if data['procs'] == []:
				del data['procs']


		if item.use:
			data['use'] = item.use.t

		if item.description:
			data['description'] = item.description

	if request:
		response = JsonResponse(data, safe=False)
		response.status_code = status_code
		return response

	else:
		return data

def titlecase(s):
	word_exceptions = ['of', 'the']
	a = s.replace('_', ' ')
	word_list = a.split()

	for i,word in enumerate(word_list):
		if word not in word_exceptions:
			word_list[i] = word.title()

	c = ' '.join(word_list)
	return(c)
