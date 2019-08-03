# import os
# import django
# os.environ["DJANGO_SETTINGS_MODULE"] = 'project.settings'
# django.setup()
# from .models import

from home.models import Item, Material, Crafted, Talent, WoWClass, TalentTree, Profession
import django.utils as utils
from decimal import *
import json

crafted_categories = ['blacksmithing', 'enchanting', 'engineering', 'tailoring', 'leatherworking', 'alchemy', 'first_aid', 'cooking']
gather_categories = ['fishing', 'skinning', 'mining', 'herbalism']




def add_locked_talents():
	talents_filename = "home/static/testing/all_talents_stripped.js"
	all_talents = ''
	with open(talents_filename, 'r') as f:
		all_talents = json.load(f)
		for cl, talent_tree in all_talents.items():
			wow,_ = WoWClass.objects.get_or_create(
				name=cl, defaults={'name':cl}
			)
			print('\n', cl)
			for i, v in enumerate(talent_tree.items()):
				tree,_ = TalentTree.objects.get_or_create(
					wow_class=wow, name=v[0], position=i,
					defaults={'wow_class':wow, 'name': v[0], 'position':i}
				)
				print('\ntree: ', v[0])

				for tal_name, props in v[1].items():

					if 'locked' in props.keys():
						print('name: ', tal_name)

						locked = props['locked']
						lockedObj = Talent.objects.get(name=locked, wow_class=wow, tree=tree)
						print('prereq: ', lockedObj.name)

						talentObj,_ = Talent.objects.update_or_create(
							name=tal_name, wow_class=wow, tree=tree,
							defaults={'name':tal_name,'wow_class': wow,
							'tree': tree, 'locked': lockedObj
							}
						)

def add_talents():
	talents_filename = "home/static/testing/all_talents_stripped.js"
	all_talents = ''
	with open(talents_filename, 'r') as f:
		all_talents = json.load(f)
		for cl, talent_tree in all_talents.items():
			wow,_ = WoWClass.objects.update_or_create(
				name=cl, defaults={'name':cl}
			)
			print('\n', cl)
			for i, v in enumerate(talent_tree.items()):
				tree,_ = TalentTree.objects.update_or_create(
					wow_class=wow, name=v[0], position=i,
					defaults={'wow_class':wow, 'name': v[0], 'position':i}
				)
				print('\ntree: ', v[0])
				print('num talents: ', len(v[1]))

				for tal_name, props in v[1].items():
					print('name: ', tal_name)
					print('props: ', props)
					fn = props['fn'] if 'fn' in props.keys() else "[x]"
					talentObj,_ = Talent.objects.update_or_create(
						name=tal_name, wow_class=wow, tree=tree,
						_description=props['description'], formula=fn,
						max_rank=props['maxRank'], defaults={'name':tal_name,
						'wow_class': wow, 'tree': tree, '_description': props['description'],
						'formula': fn, 'max_rank': props['maxRank']
						}
					)

def add_materials_as_items(json):

	all_materials_filename = 'home/static/testing/all_materials.js'
	all_materials = ''
	with open(all_materials_filename, 'r') as f:
		all_materials = json.load(f)

		for key,val in all_materials.items():
			print(key)
			if val['category'] in crafted_categories:
				category = 'crafted'
			elif val['category'] in gather_categories:
				category = 'gathered'
			else:
				category = val['category']

			obj, created = Item.objects.update_or_create(
				name=key, rarity=val['rarity'], category=category,
				defaults={'name': key, 'rarity': val['rarity'], 'category': category},
			)
			for k in val.keys():
				obj, created = Item.objects.update_or_create(
					name=key, defaults={k: val[k]}
				)

def add_consumes_as_items(json):

	all_consumes_filename = 'home/static/testing/all_consumes.js'
	with open(all_consumes_filename, 'r') as f:
		all_consumes = json.load(f)

		for key,val in all_consumes.items():

			print(key)
			crafted_parent = Item.objects.get(name=key)
			step = val['step'] if 'step' in val.keys() else 1

			crafted_obj,_ = Crafted.objects.update_or_create(
				item=crafted_parent,  step=step,
				defaults={'item':crafted_parent, 'step':step}
				)

			if val['category'] in crafted_categories:
				prof = Profession.objects.get(name=val['category'])
				crafted_obj.prof = prof
				crafted_obj.save()

			for k,v in val['materials'].items():
				mat_parent = Item.objects.get(name=k)
				mat,_ = Material.objects.update_or_create(
					item=mat_parent, creates=crafted_obj, amount=v,
					defaults={'item':mat_parent, 'creates':crafted_obj, 'amount':v}
				)
				crafted_obj.materials.add(mat)
				crafted_obj.save()

# also adds materials as materials
# def add_consumes_as_consumes(json):
def lower_case_tree_names():

	for wow_class in WoWClass.objects.all():
	    trees = wow_class.talenttree_set.all()
	    for tree in trees:
	        talents = tree.talent_set.all()
	        tree.name = tree.sanitized
	        tree.save()
	        print(tree.name)

			# not recommended due to talent names with special characters (ex: Imp Power Word: Shield)
			# for talent in talents:
			#	talent.name = talent.sanitized
			#	talent.save()
