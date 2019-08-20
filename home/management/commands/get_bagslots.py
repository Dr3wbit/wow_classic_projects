from home.models import Crafted, Profession, Item, ItemSet, Material
from django.core.management.base import BaseCommand, CommandError
import os, json

class Command(BaseCommand):
	help = 'exports scraped recipes to file'

	def add_arguments(self, parser):
		parser.add_argument("-b", "--basic", action='store_true', help='Attempts to add basic information')

	def handle(self, *args, **options):
		basic = options['basic']

		items = Item.objects.filter(slot='Bag')

		bagcount = 0

		for item in items:
			ix = str(item.ix)
			file_suffix = ix[:2] if len(ix) == 5 else ix[:1]
			if len(ix) == 3 or int(file_suffix) == 2:
				file_suffix = 1

			ALL_ITEMS = self.get_item_list(os.path.abspath('home/management/commands/data/items/items{}.js'.format(file_suffix)))

			js_item = ALL_ITEMS[ix]
			if 'slots' in js_item.keys():
				item.bagslots = ALL_ITEMS[ix]['slots']
				item.save()
				print("{} ({}) ({}) Slot Bag".format(item.name, item.ix, item.bagslots))
				bagcount += 1

			else:
				print("Unable to find slots for ({}) - {} ".format(item.ix, item.name))

		print('Number of bags we found slots for: {}'.format(bagcount))

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
