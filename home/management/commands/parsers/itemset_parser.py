
from home.models import Item, ItemSet, SetBonus, Spell
import json
import invariables as const

# NOTE: can only be run after Item and Spell objects are added to db
def main():

	ALL_ITEMSETS = const.get_item_list(os.path.abspath('../../js/itemsets.js'))
	for ix, valu in ALL_ITEMSETS.items():

		I = int(ix)
		name = valu['n']
		itemset,_ = ItemSet.objects.get_or_create(
			ix=I, name=name, defaults={'ix':I, 'name':name}
		)

		for amount,bonus in valu['bonuses'].items():
			s = int(valu['s'])
			t = valu['t']

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

main()
