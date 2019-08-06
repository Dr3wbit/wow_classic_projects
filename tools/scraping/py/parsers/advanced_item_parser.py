
from home.models import Item, Spell, Effect
import json
import invariables as const

EFFECT_TYPES = {'proc':1, 'equip':2, 'use':3}

# get USE, effects, and disenchant
def main():

	for x in range(1, 25):
		ALL_ITEMS = const.get_item_list(os.path.abspath('../../js/items/items{}.js'.format(x)))

		for ix, val in ALL_ITEMS.items():

			I = int(ix)
			img = val['image_name']
			n = val['n']
			ilvl = val['ilvl']
			quality = val['quality']

			defaults = {
				'i': I,
				'n': n,
				'image_name': img,
				'quality': quality,
				'ilvl': ilvl
			}

			item,created = Item.objects.update_or_create(
				i=I, n=n, img=img, ilvl=ilvl, quality=quality,
				defaults=defaults
			)

			if 'effects' in val.keys():
				for effect_type,effect_list in val['effects'].items():
					for effect in effect_list:
						s = effect['s']
						t = effect['t']
						spell,_ = Spell.objects.get_or_create(
							i=int(s),t=t, defaults={'i':s, 't':t}
						)

						e = EFFECT_TYPE[effect_type]
						effect,_ = Effect.objects.get_or_create(
							spell=spell, effect_type=e,
							default={'spell':spell, 'effect_type':e}
						)

						item.effects.add(effect)
						item.save()

			if 'use' in val.keys():
				s = val['s']
				t = val['t']
				spell,_ Spell.objects.get_or_create(
					i=int(s), t=t, defaults={'i':int(s), 't':t}
				)

				item.use = spell
				item.save()
				
			if 'disenchant' in val.keys():
				item.disenchant = v['disenchant']
				item.save()



main()
