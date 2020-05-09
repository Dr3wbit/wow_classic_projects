from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse, HttpResponse
from django.db.models import Count, Q, Avg
from home.models import Crafted, ConsumeList, Profession, Rating, Spec, Tag, WoWClass
from itertools import chain
from operator import attrgetter

def get_saved_lists(request):
    data = {}
    user = request.user
    specs = Spec.objects.exclude(visible=False)
    consume_lists = ConsumeList.objects.exclude(visible=False)
    all_lists = sorted(chain(specs, consume_lists), key=attrgetter('created'))
    data['saved_lists'] = []
    for list_item in all_lists:

        list_info = {}
        list_info['id'] = list_item.id
        list_info['img'] = list_item.img
        list_info['description'] = list_item.description
        list_info['name'] = list_item.name
        list_info['rating'] = list_item.rating
        list_info['created'] = list_item.created
        list_info['private'] = list_item.private
        list_info['hash'] = list_item.hash

        list_info['tags'] = []
        for tag in list_item.tags.all():
            list_info['tags'].append(tag.name)

        if hasattr(list_item, 'wow_class'):
            list_info['wow_class'] = list_item.wow_class.name

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
			saved_list = Spec.objects.filter(id=id, user=request.user).first()
		else:
			saved_list = ConsumeList.objects.filter(id=id, user=request.user).first()

		if saved_list:
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
			saved_list = Spec.objects.filter(id=id).first()
			if saved_list:
				context['spec'] = saved_list

		elif caller == 'pt':
			saved_list = ConsumeList.objects.filter(id=id).first()
			if saved_list:
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
		print(sorting)
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

	if (request.user.is_staff and request.user.is_superuser):

		id = request.POST.get('id', None)
		spec = request.POST.get('spec', False)
		type_of = 'spec' if spec else 'consume_list'
		data = {}
		saved_list = ''
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

def get_item_info(request):
	data = {}
	ix = request.GET.get('ix', None)
	data['ix'] = ix
	# name = request.GET.get('name', None)
	# data['name'] = name
	# static = request.GET.get('static', False)
	item = ''

	if ix:
		items = Item.objects.filter(ix=ix)
		if items:
			item = items.first()
		else:
			item = Item.objects.get(name='samwise', ix=69420)

		data['img'] = item.img
		data['quality'] = item.quality
		data['name'] = item.name
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


	response = JsonResponse(data, safe=False)
	return response
