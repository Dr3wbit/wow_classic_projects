from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
import datetime, math, re, time
from django.contrib.auth.models import User
from social_django.models import UserSocialAuth

nope = re.compile(r"[\-]")
forbiden = re.compile(r"[\:\'\(\)]")

def title_case(s):
	word_exceptions = ['of', 'the']
	a = s.replace('_', ' ')
	word_list = a.split()

	for i,word in enumerate(word_list):
		if word not in word_exceptions:
			word_list[i] = word.title()

	c = ' '.join(word_list)
	return(c)

def sanitize(s):
	a = forbiden.sub('', s)
	a = nope.sub(' ', a).strip().replace(' ', '_').lower()
	return(a)

class Profile(User):

	class Meta:
		proxy = True

	@property
	def discord(self):
		return(UserSocialAuth.objects.get(user=self))

	@property
	def extra_data(self):
		return(self.discord.extra_data)

	# @property
	# def is_authenticated(self):
	# 	if not self.social_auth.exists():
	# 		return(False)
	# 	else:
	# 		self.expiration_date = self.extra_data['auth_time'] + self.extra_data['expires']
	# 		return(self.expiration_date - datetime.datetime.now().timestamp() > 0)

	@property
	def uid(self):
		if not self.social_auth.exists():
			return(0)
		else:
			return(self.discord.uid)

	@property
	def tag(self):
		return(self.extra_data['tag'])

	@property
	def disc_username(self):
		return(self.extra_data['disc_username'])

# the baseline; everything is an item
class Item(models.Model):
	name = models.CharField(max_length=100, unique=True)
	RARITY_CHOICES = (
		('junk', 'junk'),
		('common', 'common'),
		('uncommon', 'uncommon'),
		('rare', 'rare'),
		('epic', 'epic'),
		('legendary', 'legendary'),
		)

	CATEGORY_CHOICES = (
		('gathered', 'gathered'),
		('drop', 'drop'),
		('quest', 'quest'),
		('crafted', 'crafted'),
		('vendor', 'vendor'),
		('other', 'other'),
	)

	# ilvl = models.PositiveSmallIntegerField(default=1)
	rarity = models.CharField(max_length=10, choices=RARITY_CHOICES, default='common')
	unique = models.BooleanField(default=False)
	bop = models.BooleanField(default=False)
	use = models.CharField(max_length=250, blank=True)
	proper_name = models.CharField(max_length=100, blank=True)
	description = models.CharField(max_length=250, blank=True)
	# required_prof = models.CharField(max_length=15, choices=PROFESSION_CHOICES, blank=True)
	# required_prof_lvl = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(300)])
	category = models.CharField(max_length=15, choices=CATEGORY_CHOICES, default='drop')
	required_level = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(60)])

	def __str__(self):
		if not self.proper_name:
			return(title_case(self.name))
		else:
			return(self.proper_name)

	class Meta:
		ordering = ['name']


class Crafted(models.Model):
	item = models.ForeignKey('Item', on_delete=models.CASCADE)
	prof = models.ForeignKey('Profession', on_delete=models.CASCADE, blank=True, null=True)
	step = models.PositiveSmallIntegerField(default=1)
	materials = models.ManyToManyField('Material')
	help_text = "Describes an item as a craftable or consumable"

	@property
	def name(self):
		return self.item.name

	@property
	def rarity(self):
		return self.item.rarity

	def __str__(self):
		return self.item.__str__()



class Material(models.Model):
	item = models.ForeignKey('Item', on_delete=models.CASCADE)
	creates = models.ForeignKey('Crafted', on_delete=models.CASCADE)
	amount = models.DecimalField(default=0.0, max_digits=4, decimal_places=2)
	help_text = "Describes an item as a material. Items can exist on their own, but this describes their relationship in terms of a consumable they can help create, hence as a 'material' and not simply as an 'item'"

	@property
	def name(self):
		return self.item.name

	@property
	def rarity(self):
		return self.item.rarity

	@property
	def adjusted_amount(self):
		return(self.amount*self.creates.step)

	def __str__(self):
		return self.item.__str__()

	class Meta:
		unique_together = ['item', 'creates']

class Profession(models.Model):
	PROFESSION_CHOICES = (
		('alchemy', 'alchemy'),
		('blacksmithing', 'blacksmithing'),
		('cooking', 'cooking'),
		('enchanting', 'enchanting'),
		('engineering', 'engineering'),
		('leatherworking', 'leatherworking'),
		('first_aid', 'first_aid'),
		('skinning', 'skinning'),
		('fishing', 'fishing'),
		('herbalism', 'herbalism'),
		('mining', 'mining'),
		('tailoring', 'tailoring')
	)

	TYPE_CHOICES = (
		('primary', 'Primary'),
		('secondary', 'Secondary'),
	)

	name = models.CharField(max_length=20, unique=True, choices=PROFESSION_CHOICES, default='alchemy')
	type_of = models.CharField(max_length=25, default='primary')

	# level required to craft an item
	# craft_level = models.PositiveSmallIntegerField(validators=[MaxValueValidator(300)], default=1)

	def __str__(self):
		return(self.name)


class WoWClass(models.Model):
	class_choices = (
			('druid', 'druid'),
			('hunter', 'hunter'),
			('mage', 'mage'),
			('paladin', 'paladin'),
			('priest', 'priest'),
			('rogue', 'rogue'),
			('shaman', 'shaman'),
			('warlock', 'warlock'),
			('warrior', 'warrior')
	)

	name = models.CharField(max_length=20, choices=class_choices, default='Warrior', unique=True)

	def __str__(self):
		return(self.name)

	class Meta:
		ordering = ['name']


class TalentTree(models.Model):
	name = models.CharField(max_length=40)
	wow_class = models.ForeignKey('WoWClass', on_delete=models.CASCADE)
	position = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(3)])
	_architect = models.CharField(max_length=100, default="[]")

	@property
	def sanitized(self):
		return(sanitize(self.name))

	@property
	def architect(self):
		return eval(self._architect)

	def __str__(self):
		return(self.name)

	class Meta:
		ordering = ['position']
		unique_together = ['wow_class', 'name']


class Talent(models.Model):
	wow_class = models.ForeignKey('WoWClass', on_delete=models.CASCADE)
	tree = models.ForeignKey(TalentTree, on_delete=models.CASCADE)
	name = models.CharField(max_length=40)
	max_rank = models.PositiveSmallIntegerField(default=5, validators=[MaxValueValidator(5)])
	_description = models.CharField(max_length=400, blank=False)
	formula = models.CharField(max_length=150, default="[x]")
	x = models.PositiveSmallIntegerField(validators=[MaxValueValidator(5)], default=0)
	y = models.PositiveSmallIntegerField(validators=[MaxValueValidator(7)], default=0)

	locked = models.ForeignKey("self", blank=True, null=True, on_delete=models.CASCADE)
	class Meta:
		unique_together = ['wow_class', 'name', 'tree']

	def __str__(self):
		return(self.name)

	@property # returns list of descriptions
	def description(self):
		self.descripts = []
		for x in range(1, self.max_rank+1):
			self.descripts.append(self._description.format(*eval(self.formula)))
		return self.descripts

	@property
	def position(self):
		return(self.x, self.y)

	@property
	def sanitized(self):
		return(sanitize(self.name))

	@property
	def unlocks(self):
		return([x.name for x in Talent.objects.filter(locked=self)])

class Spec(models.Model):
	hash = models.CharField(max_length=100, default='testy test')
	name = models.CharField(max_length=30, default='')
	wow_class = models.ForeignKey('WoWClass', on_delete=models.CASCADE)
	user = models.ForeignKey('Profile', on_delete=models.CASCADE)
	private = models.BooleanField(default=False)

	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)

	def __str__(self):
		return(self.name)

	class Meta:
		unique_together = ['user', 'name']

class TreeAllotted(models.Model):
	spec = models.ForeignKey('Spec', on_delete=models.CASCADE)
	tree = models.ForeignKey('TalentTree', on_delete=models.CASCADE)
	invested = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(51)])

	def __str__(self):
		return(self.tree.name)

	@property
	def name(self):
		return(self.tree.name)

	class Meta:
		unique_together = ['spec', 'tree']


class ConsumeList(models.Model):
	name = models.CharField(max_length=30, default='')
	user = models.ForeignKey('Profile', on_delete=models.CASCADE)
	hash = models.CharField(max_length=100, default='testy test')
	private = models.BooleanField(default=False)

	def __str__(self):
		return(self.tree.name)

	class Meta:
		unique_together = ['user', 'name']

class Consume(models.Model):
	invested = models.PositiveSmallIntegerField(default=1, validators=[MaxValueValidator(100)])
	item = models.ForeignKey('Crafted', on_delete=models.CASCADE)
	consume_list = models.ForeignKey('ConsumeList', on_delete=models.CASCADE)

	class Meta:
		unique_together = ['item', 'consume_list']

	def __str__(self):
		return(self.item.name)

	@property
	def name(self):
		return(self.item.name)

	@property
	def mats(self):
		return(self.item.materials)

from home.signals import savedspec_limit, consumelist_limit

# class Equipable(Item):
# 	SLOT_CHOICES = (
# 	('back', 'Back'),
# 	('bag', 'Bag'),
# 	('chest', 'Chest'),
# 	('feet', 'Feet'),
# 	('hands', 'Hands'),
# 	('head', 'Head'),
# 	('neck', 'Neck'),
# 	('ring', 'Ring')
# 	('shield', 'Shield'),
# 	('shirt', 'Shirt'),
# 	('shoulder', 'Shoulder'),
# 	('trinket', 'Trinket'),
# 	('waist', 'Waist'),
# 	('wrist', 'Wrist')
# 	)
#
# 	slot = models.CharField(max_length=20, choices=SLOT_CHOICES)
# 	durability = models.PositiveSmallIntegerField(default=0)
# 	required_level = models.PositiveSmallIntegerField(default=0)
#
#
# class Weapon(Equipable):
# 	WEAPON_PROFICIENCIES = (
# 		('axe', 'Axe'),
# 		('sword', 'Sword'),
# 		('staff', 'Staff'),
# 		('staff', 'Staff'),
# 		('polearm', 'Polearm'),
# 		('gun', 'Gun'),
# 		('wand', 'Wand'),
# 		('bow', 'Bow'),
# 		('crossbow','Crossbow'),
# 		('dagger', 'Dagger'),
# 	)
#
# 	WEAPON_CHOICES = (
# 		('off-hand', 'Off-Hand'),
# 		('one-hand', 'One-Hand'),
# 		('main-hand', 'Main-Hand'),
# 		('thrown', 'Thrown'),
# 		('ranged', 'Ranged'),
# 		('two-hand', 'Two-Hand'),
# 	)
#
# 	slot = models.CharField(max_length=50, choices=WEAPON_CHOICES)
# 	proficiency = models.CharField(max_length=50, choices=WEAPON_PROFICIENCIES)
# 	max_damage = models.PositiveSmallIntegerField(default=2)
# 	min_damage = models.PositiveSmallIntegerField(default=1)
# 	speed = models.DecimalField(default=0.0, max_digits=4, decimal_places=2)
# 	on_hit = models.CharField(max_length=400, blank=True)
#
#
# # i.e. Equip: +60 Attack Power
# class BonusEffect(models.Model):
# 	amount = models.PositiveSmallIntegerField(default=0)
# 	# i.e crit%, attack power, hit%
# 	effect = models.CharField(max_length=400, blank=True)
#
# class Armor(Equipable):
#
# 	ARMOR_TYPES = (
# 	('cloth', 'Cloth'),
# 	('leather', 'Leather'),
# 	('mail', 'Mail'),
# 	('plate', 'Plate'),
# 	)
#
# 	# for validation purposes
# 	SLOT_CHOICES = (
# 	('head', 'Head'),
# 	('shoulders', 'Shoulder'),
# 	('back', 'Back'),
# 	('chest', 'Chest'),
# 	('wrist', 'Wrist'),
# 	('Hands', 'Hands'),
# 	('waist', 'Waist'),
# 	)
#
# 	proficiency = models.CharField(max_length=20, unique=True, choices=ARMOR_TYPES)
# 	slot = models.CharField(max_length=20, unique=True, choices=SLOT_CHOICES)
# 	amount = models.PositiveSmallIntegerField(default=0)
#
# class Stat(models.Model):
# 	CHOICES = (
# 	('agility', 'Agility'),
# 	('strength', 'Strength'),
# 	('intellect', 'Intellect'),
# 	('spirit', 'Spirit'),
# 	('Stamina', 'Stamina'),
# 	)
# 	name = models.CharField(max_length=20, unique=True, choices=CHOICES)
