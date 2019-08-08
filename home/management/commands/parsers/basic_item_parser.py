
from home.models import Item, Spell, ItemSet
import json
import invariables as const

HEAD,NECK,SHOULDER,SHIRT,CHEST,BELT,LEGS,FEET,WRIST,HANDS = range(1,11)
FINGER,TRINKET,BACK,MAINHAND,OFFHAND,RANGED,TABBARD,BAG, = 11,13,15,16,17,18,19,20
TWO_HAND,ONE_HAND,THROWN,RELIC,OH_FRILL,AMMO = 24,25,26,27,28,29,30
ARMOR_PROFICIENCIES = (
    (CLOTH, 'Cloth'),
    (LEATHER, 'Leather'),
    (MAIL, 'Mail'),
    (PLATE, 'Plate'),
    )
SLOT_CHOICES = (
    (HEAD, 'Head'), (NECK, 'Neck'), (SHOULDER, 'Shoulder'), (SHIRT, 'Shirt'),
    (CHEST, 'Chest'), (BELT, 'Belt'), (LEGS, 'Legs'), (FEET, 'Feet'), (WRIST, 'Wrist'),
    (HANDS, 'Hands'), (BACK, 'Back'), (MAINHAND, 'Main Hand'), (OFFHAND, 'Off Hand'),
    (RANGED, 'Ranged'), (BAG, 'Bag'), (ONE_HAND, 'One-hand'), (TWO_HAND, 'Two-hand'),
    (THROWN, 'Thrown'), (OH_FRILL, 'Held In Off-Hand'), (RELIC, 'Relic'), (AMMO, 'Projectile'),
)
SLOT_TRANSLATOR = {b:a for (a,b) in SLOT_CHOICES}
ARMOR_CHOICES = {'Cloth':1, 'Leather':2, 'Mail':3, 'Plate':4}
AMMO_CHOICES = {'Bullet':1, 'Arrow':2}
RANGED_CHOICES = {'Gun':1, 'Bow':2, 'Crossbow':3, 'Thrown':4, 'Wand':5}
RELIC_CHOICES = {'Libram': 1, 'Idol': 2, 'Totem': 3}

def main():

    for x in range(1, 25):
		ALL_ITEMS = const.get_item_list(os.path.abspath('../js/items/items{}.js'.format(x)))

		for ix, valu in ALL_ITEMS.items():

			I = int(ix)
			img = valu['image_name']
			n = valu['n']
			ilvl = valu['ilvl']
			quality = valu['quality']

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

        	if 'consume' in valu.keys():
        		item.consume = True

        	if 'bop' in valu.keys():
        		item.bop = True

        	if 'unique' in valu.keys():
        		item.unique = True

        	if 'slot' in valu.keys():
        		item._slot = SLOT_TRANSLATOR[v['slot']]

        	if 'proficiency' in valu.keys():
        		item._proficiency = get_proficiency(item._slot, valu['proficiency'])

        	if 'quest_item' in valu.keys():
        		item.quest_item = True

        	# NOTE: need to change profession setup? axesmith, tribal lw, etc.
        	if 'requirements' in valu.keys():
        		item.requirements = valu['requirements']

        	# NOTE: need to exclude armor maybe?
        	if 'stats' in valu.keys():
        		item.stats = valu['stats']


			item.save()



def get_proficiency(_slot, _proficiency):
	if not _proficiency:
		return ''
	else:
		if _slot in ARMOR_SLOTS:
			return ARMOR_CHOICES[_proficiency]

		elif _slot in RANGED_SLOTS:
			return RANGED_CHOICES[_proficiency]

		elif _slot == 'Relic':
			return RELIC_CHOICES[_proficiency]

		elif _slot == 'Projectile':
			return AMMO_CHOICES[_proficiency]

		elif _slot in MELEE_SLOTS:
			return MELEE_CHOICES[_proficiency]
		else:
			return ''

main()
