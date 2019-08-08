from django.core.management.base import BaseCommand, CommandError
import json, os
from home.models import Item

HEAD,NECK,SHOULDER,SHIRT,CHEST,BELT,LEGS,FEET,WRIST,HANDS = range(1,11)
FINGER,TRINKET,BACK,MAINHAND,OFFHAND,RANGED,TABARD,BAG, = 11,13,15,16,17,18,19,20
TWO_HAND,ONE_HAND,THROWN,RELIC,OH_FRILL,AMMO = range(24, 30)
CLOTH,LEATHER,MAIL,PLATE = range(1,5)
ARMOR_PROFICIENCIES = (
	(CLOTH, 'Cloth'),
	(LEATHER, 'Leather'),
	(MAIL, 'Mail'),
	(PLATE, 'Plate'),
	)

SLOT_CHOICES = (
	(HEAD, 'Head'), (NECK, 'Neck'), (SHOULDER, 'Shoulder'), (SHIRT, 'Shirt'),
	(CHEST, 'Chest'), (BELT, 'Waist'), (LEGS, 'Legs'), (FEET, 'Feet'), (WRIST, 'Wrist'),
	(HANDS, 'Hands'), (FINGER,'Finger'), (TRINKET,'Trinket'), (BACK, 'Back'), (MAINHAND, 'Main Hand'), (OFFHAND, 'Off Hand'),
	(RANGED, 'Ranged'), (TABARD,'Tabard'), (BAG, 'Bag'), (ONE_HAND, 'One-hand'), (TWO_HAND, 'Two-hand'),
	(THROWN, 'Thrown'), (OH_FRILL, 'Held In Off-Hand'), (RELIC, 'Relic'), (AMMO, 'Projectile'),
)
SLOT_TRANSLATOR = {b:a for (a,b) in SLOT_CHOICES}
ARMOR_CHOICES = {'Cloth':1, 'Leather':2, 'Mail':3, 'Plate':4}
AMMO_CHOICES = {'Bullet':1, 'Arrow':2}
RANGED_CHOICES = {'Gun':1, 'Bow':2, 'Crossbow':3, 'Thrown':4, 'Wand':5}
RELIC_CHOICES = {'Libram': 1, 'Idol': 2, 'Totem': 3}
ARMOR_SLOTS = [HEAD,SHOULDER,CHEST,BELT,LEGS,FEET,WRIST,HANDS,BACK]
RANGED_SLOTS = [RANGED, THROWN]
MELEE_SLOTS = [MAINHAND, OFFHAND, ONE_HAND, TWO_HAND]

MELEE_CHOICES = {b:a for a,b in {
	1:'Axe', 2:'Dagger', 3:'Fishing Pole', 4:'Fist Weapon', 5:'Mace', 6:'Miscellaneous',
	7:'Polearm', 8:'Shield', 9:'Staff', 10:'Sword'
}.items()}

class Command(BaseCommand):
	help = 'Closes the specified poll for voting'

	def handle(self, *args, **options):
		for x in range(1, 25):
				ALL_ITEMS = self.get_item_list(os.path.abspath('home/management/commands/data/items/items{}.js'.format(x)))
				for ix, valu in ALL_ITEMS.items():
					try:

						I = int(ix)
						img = valu['image_name']
						name = valu['n']
						ilvl = valu['ilvl']
						quality = valu['quality']

						defaults = {
							'ix': I,
							'name': name,
							'img': img,
							'quality': quality,
							'ilvl': ilvl
						}

						item,created = Item.objects.get_or_create(
							ix=I, name=name, img=img, ilvl=ilvl, quality=quality,
							defaults=defaults
						)

						if 'consume' in valu.keys():
							item.consume = True

						if 'bop' in valu.keys():
							item.bop = True

						if 'unique' in valu.keys():
							item.unique = True

						if 'slot' in valu.keys():
							if valu['slot'] != "":
								slot = SLOT_TRANSLATOR[valu['slot']]
								if slot:
									item._slot =  slot

						if 'proficiency' in valu.keys():

							item._proficiency = self.get_proficiency(item._slot, valu['proficiency'])

						if 'quest_item' in valu.keys():
							item.quest_item = True

						# NOTE: need to change profession setup? axesmith, tribal lw, etc.
						if 'requirements' in valu.keys():
							item.requirements = valu['requirements']

						# NOTE: need to exclude armor maybe?
						if 'stats' in valu.keys():
							item.stats = valu['stats']


						item.save()
						if created:
							self.stdout.write(self.style.SUCCESS('Successfully added item "%s"' % ix))



					except Item.DoesNotExist:
						raise CommandError('Item "%s" does not exist' % ix)



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

	def get_proficiency(self, _slot, _proficiency):
		if not _proficiency:
			return ''
		else:
			if _slot in ARMOR_SLOTS:
				return ARMOR_CHOICES[_proficiency]

			elif _slot in RANGED_SLOTS:
				return RANGED_CHOICES[_proficiency]

			elif _slot == "Relic":
				return RELIC_CHOICES[_proficiency]

			elif _slot == "Projectile":
				return AMMO_CHOICES[_proficiency]

			elif _slot in MELEE_SLOTS:
				return MELEE_CHOICES[_proficiency]
			else:
				return 0
