
from home.models import Item, ItemSet, SetBonus, Spell
import json
import invariables as const

# NOTE: can only be run after Item and Spell objects are added to db
def main():

	ALL_ITEMSETS = const.get_item_list(os.path.abspath('../../js/itemsets.js'))
	for ix, val in ALL_ITEMSETS.items():

		I = int(ix)
		n = val['n']
		itemset,_ = ItemSet.objects.update_or_create(
			i=I, n=n, defaults={'i':I, 'n':n}
		)

		for amount,bonus in val['bonuses'].items():
			s = int(val['s'])
			t = val['t']

			spell,_ = Spell.objects.update_or_create(
				i=s, t=t, defaults={'i':i, 't':t}
			)

			setbonus,_ = SetBonus.objects.update_or_create(
				pieces=int(amount), spell=spell,
				defaults={'pieces':int(amount), 'spell':spell}
			)

			itemset.bonuses.add(setbonus)
			itemset.save()


		for inx in val['items']:
			item = Item.objects.get(i=inx)
			item.itemset = itemset
			item.save()

main()
