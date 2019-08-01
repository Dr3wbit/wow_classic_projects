import json, os, re
from home.models import WoWClass, Talent, TalentTree, Crafted, Profession

def create(cl):
	print('class: ', cl)

	wow_class = WoWClass.objects.get(name=cl)
	talent_trees = wow_class.talenttree_set.all()

	blueprints = {}

	for tree in talent_trees:
		wow_class = WoWClass.objects.get(name=cl)
		talent_trees = wow_class.talenttree_set.all()

		blueprints = {}

		for tree in talent_trees:
			tree_name = tree.sanitized
			all_talents = iter(tree.talent_set.all())

			blueprints[tree_name] = tree.architect
			for outer_i, outer_v in enumerate(blueprints[tree_name]):
				for inner_i, inner_v in enumerate(outer_v):
					if inner_v:
						next_tal = next(all_talents)
						val = [inner_v] if type(inner_v) is not list else inner_v
						val = zip(val, next_tal.unlocks) if next_tal.unlocks else val
						blueprints[tree_name][outer_i][inner_i] = (val, next_tal, 0)



# attempting to rebuild urlBuilder in python
def url_builder(talent_trees):
	myURL = ''

	for i,tree in talent_trees.items():
		invested = ''
		for row in tree:
			for tal in row:
				if tal:
					invested = ''.join([invested, str(tal[2])])

		invested = ''.join([invested, '0']) if not len(invested) % 2==0 else invested
		invested = ''.join([invested, '7']) if i < 2 else ''.join([invested, '8'])
		myURL = ''.join([myURL, invested])

		invested_arr = '7'.split(myURL)

		for i,x in enumerate(invested_arr):
			a = x
			if i < 2:
				b = '07' if len(a)%2==0 else '7'
				a = ''.join([a, b])



##############################################################################
## expects dict in the following form:
## consume_list = {'alchemy': {'arcane_elixir':1}, 'engineering': {'goblin_rocket_boots':2} }
###############################################################################
def consume_list_url_builder(consume_list):
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
		stringy_boy = ''.join([stringy_boy, "&{}=".format(translator['professions']['prof_name'])])
		translator[prof_name] = {}

		prof = Profession.objects.get(name=prof_name)

		all_crafted = Crafted.objects.filter(prof=prof, end_game=True)



		for k,crafted in zip(rle_str[:all_crafted.count()], all_crafted):
			translator[prof.name][crafted.name] = k

		for i,v in crafted_list.items():
			stringy_boy = ''.join([stringy_boy, translator['prof_name'][i], str(v)])

	print(stringy_boy)

##############################################################################
## decodes query strings built by the function above and constructs a list of consumes
###############################################################################
def consume_list_builder(query_str):
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

	for x,y in query_str.items():
		prof_name = prof_trans[x]
		my_consumes[prof_name] = {}
		translator[prof_name] = {}

		prof = Profession.objects.get(name=prof_name)
		all_crafted = Crafted.objects.filter(prof=prof, end_game=True)

		for k,crafted in zip(rle_str[:all_crafted.count()], all_crafted):
			translator[prof_name][k] = crafted.name

		item_str_list = list(filter(None, re.split(r'([a-zA-Z]{1}[\d]{1,2})', y)))
		for str_item in item_str_list:

			item_name = translator[prof_name][str_item[:1]]
			quantity = str_item[1:]
			my_consumes[item_name] = int(quantity)

	return my_consumes
