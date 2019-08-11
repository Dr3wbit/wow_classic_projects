from django.core.management.base import BaseCommand, CommandError
import json, os
from home.models import Item, Spell, Damage, School, Profession, Material, Crafted

CLOTH,LEATHER,MAIL,PLATE = range(1,5)
ARMOR_PROFICIENCIES = (
	(CLOTH, 'Cloth'),
	(LEATHER, 'Leather'),
	(MAIL, 'Mail'),
	(PLATE, 'Plate'),
	)

HEAD,NECK,SHOULDER,SHIRT,CHEST,BELT,LEGS,FEET,WRIST,HANDS = range(1,11)
FINGER,FINGER2,TRINKET,TRINKET2,BACK,MAINHAND,OFFHAND,RANGED,TABARD = range(11,20)
BAG,BAG2,BAG3,BAG4 = range(20,24)
TWO_HAND,ONE_HAND,THROWN,RELIC,OH_FRILL,AMMO = range(24, 30)

SLOT_CHOICES = (
	(HEAD, 'Head'), (NECK, 'Neck'), (SHOULDER, 'Shoulder'), (SHIRT, 'Shirt'),
	(CHEST, 'Chest'), (BELT, 'Waist'), (LEGS, 'Legs'), (FEET, 'Feet'), (WRIST, 'Wrist'),
	(HANDS, 'Hands'), (FINGER,'Finger'), (FINGER2,'Finger2'),(TRINKET,'Trinket'),
	(TRINKET2,'Trinket2'),(BACK, 'Back'), (MAINHAND, 'Main Hand'), (OFFHAND, 'Off Hand'),
	(RANGED, 'Ranged'), (TABARD,'Tabard'), (BAG, 'Bag'), (BAG2, 'Bag2'), (BAG3, 'Bag3'), (BAG4, 'Bag4'),
	(TWO_HAND, 'Two-hand'), (ONE_HAND, 'One-hand'),(THROWN, 'Thrown'), (RELIC, 'Relic'),
	(OH_FRILL, 'Held In Off-Hand'), (AMMO, 'Projectile'),
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

REQUIRED_FIELDS = ['materials', 'profession']

class Command(BaseCommand):
	help = 'Imports scraped Items to database. Does not include '

	def add_arguments(self, parser):
		parser.add_argument("-a", "--advanced", action='store_true', help='Attempts to add equips, procs, and on use effects')
		parser.add_argument("-b", "--basic", action='store_true', help='Attempts to add basic information about the items')
		parser.add_argument("-c", "--crafted", action='store_true', help='Attempts to add consume recipes')

		parser.add_argument("-t", "--test", action='store_true', help='Just for testing')
		parser.add_argument("-n", "--noprof", action='store_true', help="Finding consumes that don't have a profession")

	def handle(self, *args, **options):
		advanced = options['advanced']
		basic = options['basic']
		test = options['test']
		crafted = options['crafted']
		noprof = options['noprof']

		if test:
			self.stdout.write(self.style.SQL_KEYWORD('this') + " is a "+ self.style.SUCCESS('test'))

		for x in range(4, 25):
				ALL_ITEMS = self.get_item_list(os.path.abspath('home/management/commands/data/items/items{}.js'.format(x)))
				for ix, valu in ALL_ITEMS.items():

					try:

						I = int(ix)
						img = valu['image_name']
						name = valu['n']
						ilvl = valu['ilvl']
						quality = valu['quality']

						defaults = {
							'img': img,
							'quality': quality,
							'ilvl': ilvl
						}

						item,created = Item.objects.get_or_create(
							ix=I, name=name, defaults=defaults
						)

						if noprof:
							if 'consume' in valu.keys():
								if 'created_by' in valu.keys():
									if 'materials' in valu['created_by'].keys():
										if bool(valu['created_by']['materials']):
											continue

								if 'reward_from' in valu.keys():
									if 'materials' in valu['reward_from'].keys():
										if bool(valu['reward_from']['materials']):

											crafted,craft_created = Crafted.objects.get_or_create(
												item=item, defaults={'item':item}
											)

											if 'step' in valu['reward_from'].keys():
												crafted.step = int(valu['reward_from']['step'])

											if craft_created:
												self.stdout.write(self.style.SQL_KEYWORD('New') + " recipe for ("+ self.style.HTTP_NOT_MODIFIED(item.ix) +") " + self.style.SQL_TABLE(item.name))
												crafted.save()

											for mat_ix, amount in valu['reward_from']['materials'].items():
												mat_item = Item.objects.get(ix=mat_ix)
												material, mat_created = Material.objects.get_or_create(
													item=mat_item, creates=crafted, amount=int(amount),
													defaults={'item':mat_item, 'creates':crafted, 'amount':int(amount)}
												)
												if mat_created:
													crafted.materials.add(material)
													crafted.save()
													self.stdout.write(self.style.HTTP_NOT_MODIFIED(mat_item.name) + "("+ self.style.HTTP_NOT_MODIFIED(mat_item.ix) +") ")



						if basic:

							if 'consume' in valu.keys():
								item.consume = True

							if 'bop' in valu.keys():
								item.bop = True

							if 'unique' in valu.keys():
								item.unique = True

							slot = ''
							if 'slot' in valu.keys():
								if valu['slot'] != "":
									slot = SLOT_TRANSLATOR[valu['slot']]
									if bool(slot):
										item._slot =  slot

							proficiency = ''
							if 'proficiency' in valu.keys():
								valu['proficiency']
								item._proficiency = self.get_proficiency(item._slot, valu['proficiency'])

							if 'quest_item' in valu.keys():
								item.quest_item = True

							# NOTE: need to change profession setup? axesmith, tribal lw, etc.
							if 'requirements' in valu.keys():
								item.requirements = valu['requirements']

							if 'speed' in valu.keys():
								item.speed = float(valu['speed'])

							if 'resist' in valu.keys():
								item.resists = valu['resist']

							if 'description' in valu.keys():
								item.description = valu['description']
								
							item.save()

						if crafted:
							if 'created_by' in valu.keys():
								if all(x in valu['created_by'].keys() for x in REQUIRED_FIELDS):
									if bool(valu['created_by']['materials']) and bool(valu['created_by']['profession']):
										prof_name = valu['created_by']['profession']
										prof = Profession.objects.get(name=prof_name)

										crafted,craft_created = Crafted.objects.get_or_create(
											profession=prof, item=item, defaults={
												'profession':prof, 'item':item
											}
										)
										if 'step' in valu['created_by'].keys():
											crafted.step = int(valu['created_by']['step'])


										if craft_created:
											self.stdout.write(self.style.SQL_KEYWORD('New') + " recipe for ("+ self.style.HTTP_NOT_MODIFIED(item.ix) +") " + self.style.SQL_TABLE(item.name))
											crafted.save()

										for k,v in valu['created_by']['materials'].items():

											mat_item = Item.objects.get(ix=int(k))
											material,mat_created = Material.objects.update_or_create(
												item=mat_item, creates=crafted, amount=int(v),
												defaults={'item':mat_item, 'creates':crafted, 'amount':int(v)}
											)
											if mat_created:

												crafted.materials.add(material)
												crafted.save()
												self.stdout.write(self.style.HTTP_NOT_MODIFIED(mat_item.name) + "("+ self.style.HTTP_NOT_MODIFIED(mat_item.ix) +") ")


										if item.ilvl >= 250:
											crafted.end_game = True
											crafted.save()

										if 'skill' in valu['created_by'].keys():
											crafted.skillup = valu['created_by']['skill']
											crafted.save()

						if advanced:

							if 'stats' in valu.keys():
								stats = {}
								for stat, v in valu['stats'].items():
									if stat == 'durability':
										item.durability = int(v)
									elif stat == 'armor':
										item.durability = int(v)
									else:
										stats[stat.title()] = int(v)

								if stats:
									item.stats = stats

								elif not stats:
									self.stdout.write(self.style.NOTICE('REMOVED') + " stats from ("+ self.style.HTTP_NOT_MODIFIED(item.ix) +")")

									item.stats = None

								item.save()


							if 'damage' in valu.keys():
								for dmg_type, highlow in valu['damage'].items():
									if dmg_type == 'normal':
										school = School.objects.get(name='Physical')
									else:
										school = School.objects.get(name=dmg_type)

									low,high = highlow
									damage,_created = Damage.objects.get_or_create(
										i=item, school=school,
										defaults={'low':low, 'high':high}
									)

									if damage not in item.damage.all():

										item.damage.add(damage)
										self.stdout.write("("+self.style.HTTP_NOT_MODIFIED(item.ix)+") "+self.style.HTTP_NOT_MODIFIED(low) + " - " + self.style.HTTP_NOT_MODIFIED(high)+" "+ self.style.SQL_KEYWORD(str(school.name))+"Damage")

										item.save()

							if 'effects' in valu.keys():
								for effect_type,effect_list in valu['effects'].items():
									for effect in effect_list:
										s = effect['s']
										t = effect['t']
										spell,spell_created = Spell.objects.get_or_create(
											ix=int(s), defaults={'t':t}
										)

										if spell_created:
											self.stdout.write(self.style.SQL_KEYWORD('NEW') + " spell: ("+ self.style.SUCCESS(s) +")")

										if effect_type == "equip":
											if spell not in item.equips.all():
												item.equips.add(spell)
												self.stdout.write(self.style.SQL_KEYWORD('Equip') + " added to ("+ self.style.HTTP_NOT_MODIFIED(item.ix) +")")

										elif effect_type == "proc":
											if spell not in item.procs.all():
												item.procs.add(spell)
												self.stdout.write(self.style.SQL_KEYWORD('Proc') + " added to ("+ self.style.HTTP_NOT_MODIFIED(item.ix) +")")

										item.save()

							if 'use' in valu.keys():
								s = valu['use']['s']
								t = valu['use']['t']
								spell,spell_created = Spell.objects.get_or_create(
									ix=int(s), defaults={'t':t}
								)

								if spell_created:
									self.stdout.write(self.style.SQL_KEYWORD('NEW') + " spell: ("+ self.style.HTTP_NOT_MODIFIED(item.ix) +")")


								if not item.use:

									item.use = spell
									self.stdout.write(self.style.SQL_KEYWORD('Use') + " added to ("+ self.style.HTTP_NOT_MODIFIED(item.ix) +")")

									item.save()

							if 'disenchant' in valu.keys():
								item.disenchant = valu['disenchant']
								item.save()

							# if created:
							# 	self.stdout.write(self.style.SUCCESS('{} ({}) {} {}'.format(name, ix, slot, proficiency)))


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
