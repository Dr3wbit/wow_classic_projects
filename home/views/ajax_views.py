from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.db.models import Count, Q, Avg
from django.template.loader import render_to_string
from django.views.decorators.cache import cache_page
from home.models import Crafted, ConsumeList, Item, Profession, Rating, Spec, Tag, WoWClass, User

from itertools import chain
from operator import attrgetter
import os

def clear_cache_item(request):
	status_code = 404
	pass


def consume_list_builder(request):
	status_code = 404
	data = {'recipes':{}, 'crafted':{}, 'items': {}, 'list_info':{}}
	hash = request.GET.get('hash', None)
	qs = request.META.get('QUERY_STRING', None)

	def add_recipes_and_items(mats):
		for mat_ix in mats:
			if mat_ix not in data['items'].keys():
				data['items'][mat_ix] = get_item_info(mat_ix, True)
				if Crafted.objects.filter(item__ix=mat_ix) and mat_ix not in data['recipes'].keys():
					data['recipes'][mat_ix] = get_materials(mat_ix)
					add_recipes_and_items(list(data['recipes'][mat_ix].keys()))

	if hash:

		hash = hash.replace("?", "")
		if ConsumeList.objects.filter(hash=hash):

			status_code = 200
			cl = ConsumeList.objects.filter(hash=hash).first()
			data['list_info'] = {'name': cl.name, 'user': cl.user.disc_username if not cl.private else 'anonymous',
				'description': cl.description, 'updated':cl.updated,
				'tags': [x.name for x in cl.tags.all()]
			}

			for consume in cl.consumes.all():
				crafted = Crafted.objects.get(item__ix=consume.ix)
				data['crafted'][consume.ix] = consume.amount

				data['items'][consume.ix] = get_item_info(consume.ix, True)
				data['recipes'][consume.ix] = get_materials(consume.ix)

				add_recipes_and_items([x for x in consume.mats.values_list('item__ix', flat=True)])



	response = JsonResponse(data, safe=False)
	response.status_code = status_code

	return response


# receives crafted item ix, returns required materials as a dictionary {ix1: amount, ix2: amount}
def get_materials(ix):
	crafted = Crafted.objects.get(item=Item.objects.get(ix=ix))
	materials = {}

	for mat in crafted.materials.all():
		materials[mat.item.ix] = mat.amount


	return materials

def get_spec_info(request):
	status_code = 404
	print(request.GET)
	data = {'hash': request.GET.get('hash', None), 'wow_class': request.GET.get('wow_class', None),
		'list_info': {}, 'uid': request.GET.get('uid', None)
	}

	if data['hash'] and data['wow_class']:
		data['hash'] = data['hash'].replace("?", "")

		if WoWClass.objects.filter(name=data['wow_class'].title()):
			wow_class = WoWClass.objects.filter(name=data['wow_class'].title()).first()

			if User.objects.filter(id=data['uid']):
				user = User.objects.filter(id=data['uid']).first()
				if Spec.objects.filter(user=user, hash=data['hash'], wow_class=wow_class):
					spec = Spec.objects.filter(user=user, hash=data['hash'], wow_class=wow_class).first()
					status_code = 200

					data['list_info'] = {'name': spec.name, 'user': spec.user.disc_username,
						'description': spec.description, 'updated': spec.updated,
						'tags': [x.name for x in spec.tags.all()]
					}

	response = JsonResponse(data, safe=False)
	response.status_code = status_code

	return response

def get_basic_item_info(item):
	info = {'n': item.name, 'q': item.quality, 'img': item.img}
	if item.step:
		info['step'] = item.step

	return info

def set_pagination(request):
	pass

@cache_page(60*5) #cache for 5mins
def get_saved_lists(request):
	data = {'saved_lists': []}
	specs = Spec.objects.exclude(visible=False)
	consume_lists = ConsumeList.objects.exclude(visible=False)
	all_lists = sorted(chain(specs, consume_lists), key=attrgetter('created'))
	for list_item in all_lists:

		list_info = {'ix': list_item.id, 'uid': list_item.user.id, 'img': list_item.img,
			'description': list_item.description, 'name': list_item.name,
			'rating': list_item.rating, 'created': list_item.created,
			'private': list_item.private, 'hash': list_item.hash,
			'username': list_item.user.disc_username if not list_item.private else 'anonymous',
			'voted': (list_item.has_voted(request.user.email)) if hasattr(request.user, 'email') else False,
			'can_vote': True if (request.user.is_authenticated and ((not list_item.has_voted(request.user.email)) and (list_item.user != request.user))) else False,
			'ratings_count': list_item.ratings.count(), 'tags': [x.name for x in list_item.tags.all()]
		}

		if hasattr(list_item, 'wow_class'):
			list_info['wow_class'] = list_item.wow_class.name
			list_info['spec'] = '({}/{}/{})'.format(list_item.treeallotted_set.all()[0].invested, list_item.treeallotted_set.all()[1].invested, list_item.treeallotted_set.all()[2].invested)

		data['saved_lists'].append(list_info)

	response = JsonResponse(data, safe=False)
	return response


def user_info(request):
	data = {'auth': False}

	if request.user.is_authenticated:
		data['auth'] = True
		data['uid'] = request.user.uid
		data['staff'] = True if request.user.is_staff else False
		data['super'] = True if request.user.is_superuser else False

	response = JsonResponse(data)
	return response


def update_icon(request):
	status_code = 400
	data = {'img': request.POST.get("img", None), 'id': request.user.queue,
		'message': 'Unable to update icon for saved list'
	}

	if data['id'] and data['img']:
		data['queue_type'] = request.user.queue_type
		saved_list = Spec.objects.filter(id=id, user=request.user) if data['queue_type'] == 1 else ConsumeList.objects.filter(id=id, user=request.user)
		if saved_list:
			status_code = 200
			saved_list = saved_list.first()
			saved_list.img = data['img']+".jpg"
			saved_list.save()
			data['message'] = "{} updated to use icon: {}".format(saved_list.name, img)

	response = JsonResponse(data)
	response.status_code = status_code

	return response

@cache_page(60*60*24*7) # cache for a week
def icon_list(request):
	context = {'info': {}}
	page_number = int(request.GET.get('page', 1))
	PER_PAGE = int(request.GET.get('results_per_page', 50))

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

	ALL_IMAGES = get_all_images("tools/scraping/py/image_list.txt")
	max_pages = round(len(ALL_IMAGES)/PER_PAGE)


	context['info'] = {'num_pages': max_pages, 'plus_one': has_next(page_number+1, max_pages),
		'plus_two': has_next(page_number+2, max_pages), 'plus_three': has_next(page_number+3, max_pages),
		'has_next': has_next(page_number, max_pages), 'has_previous': has_previous(page_number),
		'page_number': page_number
	}

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

	return render(request, 'icon_list.html', {'context': context})

	## for populating 'image_list.txt'
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
	status_code = 404
	data = {
		'uid': request.POST.get("uid", None), 'ix': request.POST.get("ix", None)
	}

	saved_list = Spec.objects.filter(id=data['ix']) if request.POST.get("wow_class", None) else ConsumeList.objects.filter(id=data['ix'])

	if saved_list:
		status_code = 200
		saved_list = saved_list.first()
		saved_list.visible = False
		saved_list.flagged = True
		saved_list.save()
		data['message'] = "{} - ({}) by {}, flagged for review`".format(saved_list.name, data['ix'], saved_list.user.email)


	response = JsonResponse(data)
	response.status_code = status_code

	return response


def recipe_list_builder(request):

	data = {'prof': request.GET.get('prof', None)}
	cache_key = 'recipelist_{}'.format(data['prof'])
	rl_cache_item = cache.get(cache_key)

	if rl_cache_item:
		data['recipes'] = rl_cache_item

	else:
		all_recipes = {}
		recipe_list = {}

		if data['prof'] == 'other':
			all_recipes = Crafted.objects.filter(profession=None).order_by('item')

		elif data['prof']:
			all_recipes = Crafted.objects.filter(profession__name=titlecase(data['prof'])).order_by('item')

		for recipe in all_recipes:
			recipe_list[recipe.item.ix] = {
				'name': recipe.item.name, 'quality': recipe.item.quality,
				'img': recipe.item.img, 'step': recipe.step, 'mats': {}
			}

			for mat in recipe.materials.all():
				matIX = mat.item.ix
				recipe_list[recipe.item.ix]['mats'][mat.item.ix] = {
					'name': mat.name, 'quality':mat.quality, 'img': mat.img,
					'step': mat.amount
				}


		data['recipes'] = recipe_list
		cache.add(cache_key, recipe_list, 604800)

	response = JsonResponse(data, safe=False)
	return response


def prof_loader(request):
	status_code = 400
	data = []

	prof = request.GET.get("prof", None)
	id = request.user.queue

	if prof:
		status_code = 200
		recipes = Crafted.objects.filter(profession__name=prof)

		for ind,recipe in zip(range(recipes.count()), recipes.all()):
			data.append({'name':recipe.name, 'ix':recipe.item.ix,
						'step':recipe.step, 'quality':recipe.item.quality,
						'img':recipe.item.img, 'mats':[], 'skillups':recipe.skillup})

			for mat in recipe.materials.all():
				data[-1]['mats'].append({'name':mat.name, 'ix': mat.item.ix,
				'step':mat.amount, 'quality': mat.quality, 'img': mat.img})


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
	status_code = 400
	data = {
		'wow_class': request.POST.get('wow_class', None),
		'id': request.POST.get('id', None)
	}
	rating_value = request.POST.get('rating', None)

	if (request.user.is_authenticated and id and rating_value):
		saved_list = Spec.objects.filter(id=data['id']) if data['wow_class'] else ConsumeList.objects.filter(id=data['id'])

		if saved_list:
			saved_list = saved_list.first()
			rating = Rating(content_object=saved_list, value=rating_value, user=request.user)
			rating.save()
			status_code = 200
			data.update({'success': True, 'average_rating': saved_list.rating, 'id': id,
				'num_ratings': saved_list.ratings.count(),
				'message': "USER: {} SUCCESSFULLY RATED {}".format(request.user.email, saved_list.name)
			})

	response = JsonResponse(data)
	response.status_code = status_code

	return response

def delete_list(request):
	status_code = 400
	data = {'name': request.POST.get('name', None), 'wow_class': request.POST.get('wow_class', None)}
	if request.is_ajax():
		if request.user.is_authenticated:
			saved_list = Spec.objects.filter(name=data['name'], user=request.user) if data['wow_class'] else ConsumeList.objects.filter(name=data['name'], user=request.user)
			if saved_list:
				saved_list.first().delete()
				data.update({'message': 'SUCCESSFULLY DELETED {}'.format(data['name']),
					'success': True
				})
				status_code = 200

	response = JsonResponse(data)
	response.status_code = status_code

	return response


def get_item_info(ix=None, advanced=False, request=None):
	status_code = 404
	data = {}

	data['ix'] = request.GET.get('ix', None) if request else ix

	if Item.objects.filter(ix=data['ix']):
		status_code = 200
		item = Item.objects.filter(ix=data['ix']).first()
	else:
		item = Item.objects.get(name='samwise', ix=69420)

	data.update({'img': item.img, 'q':item.quality, 'n': item.name})

	if Crafted.objects.filter(item__ix=ix):
		data['step'] = Crafted.objects.filter(item__ix=ix).first().step

	if advanced:
		data['bop'] = item.bop if item.bop else None
		data['unique'] = item.unique if item.unique else None
		data['slot'] = item.slot if item.slot else None
		data['proficiency'] = item.proficiency if item.proficiency else None
		data['damage'] = [str(x) for x in item.damage.all()] if item.damage else None
		data['speed'] = item.speed if item.speed else None
		data['dps'] = item.dps if (item.speed and item.damage) else None
		data['armor'] = item.armor if item.armor else None
		data['stats'] = item.stats if item.stats else None
		data['resists'] = item.resists if item.resists else None
		data['durability'] = item.durability if item.durability else None
		data['requirements'] = item.requirements if item.requirements else None
		data['equips'] = [x.t for x in item.equips.all()] if item.equips else None
		data['procs'] = [x.t for x in item.procs.all()] if item.procs else None
		data['use'] = item.use.t if item.use else None
		data['description'] = item.description if item.description else None

		filtered = {k:v for k, v in data.items() if v is not None and v != []}
		data = filtered

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
