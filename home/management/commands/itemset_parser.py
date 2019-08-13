from django.core.management.base import BaseCommand, CommandError
import json, os
from home.models import ItemSet, SetBonus, Spell, Item
from django.db.utils import IntegrityError

class Command(BaseCommand):

	def handle(self, *args, **options):
		ALL_ITEMSETS = self.get_item_list(os.path.abspath('home/management/commands/data/itemsets.js'))
		for ix, valu in ALL_ITEMSETS.items():
			try:

				I = int(ix)
				name = valu['n']
				itemset,_ = ItemSet.objects.get_or_create(
					ix=I, name=name, defaults={'ix':I, 'name':name}
				)

				for amount,bonus in valu['bonuses'].items():
					s = int(bonus['s'])
					t = bonus['t']

					spell,_ = Spell.objects.get_or_create(
						ix=s, t=t, defaults={'ix':s, 't':t}
					)

					setbonus,_ = SetBonus.objects.get_or_create(
						pieces=int(amount), spell=spell,
						defaults={'pieces':int(amount), 'spell':spell}
					)

					itemset.bonuses.add(setbonus)
					itemset.save()


				for inx in valu['items']:
					item = Item.objects.get(ix=inx)
					item.itemset = itemset
					item.save()

			except IntegrityError as e:
				raise("{e}".format())


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
