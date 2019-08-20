from home.models import Crafted, Profession, Item, ItemSet, Material
from django.core.management.base import BaseCommand, CommandError
from django.core.serializers.json import DjangoJSONEncoder

import os, json, re

class Command(BaseCommand):
	help = 'exports scraped recipes to file'

	def add_arguments(self, parser):
		parser.add_argument("-b", "--basic", action='store_true', help='Attempts to add basic information')
		parser.add_argument("-o", "--other", action='store_true', help='Attempts to add basic information')

	def handle(self, *args, **options):
		basic = options['basic']
		other = options['other']

		if basic:

			professions = [x.name for x in Profession.objects.all()]
		else:
			professions = ['other']

		for prof in professions:
			prof_name = self.sanitize(prof)
			if not os.path.isdir(os.path.abspath('dumps/{}'.format(prof_name))):
				os.makedirs(prof_name)

			all_crafted = {}
			all_materials = {}
			all_itemsets = {}

			if prof == 'other':
				queryset = Crafted.objects.filter(profession=None)
			else:
				queryset = Crafted.objects.filter(profession__name='{}'.format(prof))

			print('({}) items found for {}'.format(queryset.count(), prof))

			for crafted in queryset:
				item = crafted.item
				id = str(item.ix)
				all_crafted[id] = {}
				all_crafted[id] = self.get_item_attributes(item)
				all_crafted[id]['step'] = crafted.step
				all_crafted[id]['materials'] = {}
				for mat in crafted.materials.all():
					mat_id = str(mat.item.ix)
					all_crafted[id]['materials'][mat_id] = mat.amount

					if mat_id not in all_materials.keys():
						all_materials[mat_id] = {}
						all_materials[mat_id] = self.get_item_attributes(mat.item)


				if item.itemset:
					itemset = item.itemset
					set_ix = str(itemset.ix)
					all_crafted[id]['itemset'] = set_ix

					if set_ix not in all_itemsets.keys():
						all_itemsets[set_ix] = {}
						all_itemsets[set_ix]['n'] = itemset.name

						all_itemsets[set_ix]['items'] = []
						for item in itemset.item_set.all():
							all_itemsets[set_ix]['items'].append(item.name)

						all_itemsets[set_ix]['bonuses'] = []
						for bonus in itemset.bonuses.all():
							all_itemsets[set_ix]['bonuses'].append(str(bonus))


			print('Recipes for {} contains ({}) items'.format(prof_name, len(all_crafted.items())))

			if all_crafted:
				path = os.path.abspath('dumps/{}/recipes.js'.format(prof_name))
				if not os.path.exists(path):
					with open(path, 'w+') as f:
						json.dump(all_crafted, f, cls=DjangoJSONEncoder, indent=4)

			if all_materials:
				path = os.path.abspath('dumps/{}/materials.js'.format(prof_name))
				if not os.path.exists(path):
					with open(path, 'w+') as f:
						json.dump(all_materials, f, cls=DjangoJSONEncoder, indent=4)


			if all_itemsets:
				path = os.path.abspath('dumps/{}/itemsets.js'.format(prof_name))
				if not os.path.exists(path):
					with open(path, 'w+') as f:
						json.dump(all_itemsets, f, cls=DjangoJSONEncoder, indent=4)


	nope = re.compile(r"[\-]")
	forbidden = re.compile(r"[\:\'\(\)]")

	def sanitize(self, s):
		a = self.forbidden.sub('', str(s))
		a = self.nope.sub(' ', a).strip().replace(' ', '_').lower()
		return(a)

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

		if item.bop:
			attributes['bop'] = item.bop

		if item.unique:
			attributes['unique'] = item.unique

		if item.description:
			attributes['description'] = item.description


		return attributes
