from home.models import Crafted, Profession, Item, ItemSet, Material
from django.core.management.base import BaseCommand, CommandError
from django.core.serializers.json import DjangoJSONEncoder

import os, json

class Command(BaseCommand):
	help = 'replacing enchant recipe materials with index and adding their appropriate img names'

	def add_arguments(self, parser):
		parser.add_argument("-b", "--basic", action='store_true', help='Attempts to add basic information')
		parser.add_argument("-i", "--images", action='store_true', help='Attempts to add basic information')

	def handle(self, *args, **options):
		basic = options['basic']

		ALL_ENCHANTS = self.get_item_list(os.path.abspath('dumps/enchants.js'))
		NEW_ENCHANT_FORMAT = {}
		ALL_ENCHANTING_MATERIALS = {}
		ALL_ENCHANT_IMAGES = {}

		for slot, recipes in ALL_ENCHANTS.items():
			NEW_ENCHANT_FORMAT[slot] = recipes

			for recipe_name,recipe in recipes.items():
				NEW_ENCHANT_FORMAT[slot][recipe_name] = recipe
				materials = recipe['materials']
				NEW_ENCHANT_FORMAT[slot][recipe_name]['materials'] = {}

				for material,amount in materials.items():
					ALL_ENCHANT_IMAGES[material] = {}

					mat_name = self.titlecase(material)
					print('mat_name: ', mat_name)
					if mat_name.startswith("Night Dragon"):
						mat_name = "Night Dragon's Breath"

					if mat_name == 'Gold':
						ix = 'gold'

					else:
						item = Item.objects.get(name=mat_name)
						ix = str(item.ix)
						ALL_ENCHANT_IMAGES[material] = item.img

						ALL_ENCHANTING_MATERIALS[ix] = {}

						ALL_ENCHANTING_MATERIALS[ix] = self.get_item_attributes(item)

					NEW_ENCHANT_FORMAT[slot][recipe_name]['materials'][ix] = amount



		path = os.path.abspath('dumps/new_enchants.js')
		if not os.path.exists(path):
			with open(path, 'w+') as f:
				json.dump(NEW_ENCHANT_FORMAT, f, cls=DjangoJSONEncoder, indent=4)

		path = os.path.abspath('dumps/enchant_materials.js')
		if not os.path.exists(path):
			with open(path, 'w+') as f:
				json.dump(ALL_ENCHANTING_MATERIALS, f, cls=DjangoJSONEncoder, indent=4)

		path = os.path.abspath('dumps/enchant_material_images.js')
		if not os.path.exists(path):
			with open(path, 'w+') as f:
				json.dump(ALL_ENCHANT_IMAGES, f, cls=DjangoJSONEncoder, indent=4)



	def get_item_list(self, path):
		all_items = ''
		mode = "w+" if not os.path.exists(path) else "r"
		with open(path, mode) as f:
			all_items = json.load(f) if os.path.getsize(path)>0 else {}

		if len(all_items) > 0:
			sorted_dict = dict(sorted(all_items.items()))
			return sorted_dict
		else:
			return all_items

	def titlecase(self, s):
		word_exceptions = ['of', 'the']
		a = s.replace('_', ' ')
		word_list = a.split()

		for i,word in enumerate(word_list):
			if word not in word_exceptions:
				word_list[i] = word.title()

		c = ' '.join(word_list)
		return(c)

	def get_item_attributes(self, item):
		attributes = {}
		attributes['n'] = item.name
		attributes['q'] = item.quality
		attributes['img'] = item.img

		if item.slot:
			attributes['slot'] = item.slot
			if item.slot == 'Bag':
				attributes['slots'] = item.bagslots

		if item.proficiency:
			attributes['proficiency'] = item.proficiency

		if item.armor:
			attributes['armor'] = item.armor

		if item.speed:
			attributes['speed'] = item.speed

		if item.durability:
			attributes['durability'] = item.durability

		if item.stats:
			attributes['stats'] = item.stats

		if item.resists:
			attributes['resists'] = item.resists

		if item.requirements:
			attributes['requirements'] = item.requirements


		if item.procs.exists():
			attributes['procs'] = []
			for proc in item.procs.all():
				attributes['procs'].append("Chance on Hit: {}".format(proc.t))

		if item.equips.exists():
			attributes['equips'] = []
			for equip in item.equips.all():
				attributes['equips'].append("Equip: {}".format(equip.t))

		if item.damage.exists():
			attributes['damage'] = []
			attributes['dps'] = item.dps
			for dmg in item.damage.all():
				attributes['damage'].append(str(dmg))

		if item.quest_item:
			attributes['quest_item'] = item.quest_item

		if item.use:
			attributes['use'] = item.use.t

		if item.quest_item:
			attributes['quest_item'] = item.quest_item

		if item.bop:
			attributes['bop'] = item.bop

		if item.unique:
			attributes['unique'] = item.unique

		if item.description:
			attributes['description'] = item.description


		return attributes
