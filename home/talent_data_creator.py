import json, os
from home.models import WoWClass, Talent, TalentTree

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
