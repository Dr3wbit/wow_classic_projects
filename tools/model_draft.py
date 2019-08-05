from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Avg
import datetime, math, re, time
from social_django.models import UserSocialAuth
from django.contrib.postgres import fields as postgres
from django.contrib.postgres.validators import KeysValidator
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from .managers import UserManager

	class User(AbstractUser):
		username = None
		email = models.EmailField(_('email address'), unique=True)
		date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
		is_active = models.BooleanField(_('active'), default=True)
		avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

		objects = UserManager()

		USERNAME_FIELD = 'email'
		REQUIRED_FIELDS = []


		def email_user(self, subject, message, from_email=None, **kwargs):
				'''Sends an email to this User.'''
				send_mail(subject, message, from_email, [self.email], **kwargs)

		@property
		def discord(self):
			return UserSocialAuth.objects.get(user=self) if self.social_auth.exists() else False

		@property
		def tag(self):
			return self.discord.extra_data['tag'] if self.discord else False

		@property
		def avatar(self):
			return self.discord.extra_data['avatar'] if self.discord else False

		@property
		def uid(self):
			return self.discord.uid if self.discord else False

		@property
		def disc_username(self):
			return self.discord.extra_data['disc_username'] if self.discord else False

### NOTE: NEW
# the baseline; everything is an item
class Item(models.Model):
	CURRENCY = ['copper', 'gold', 'silver']
	JUNK, COMMON, UNCOMMON, RARE, EPIC, LEGENDARY, GM = range(1,7)
	QUALITY_CHOICES = ( (JUNK, 'junk'), (COMMON, 'common'), (UNCOMMON, 'uncommon'), (RARE, 'rare'), (EPIC, 'epic'), (LEGENDARY, 'legendary'), (GM, 'gm'),)

	CLOTH,LEATHER,MAIL,PLATE = range(1,5)
	ARMOR_PROFICIENCIES = (
		(CLOTH, 'Cloth'),
		(LEATHER, 'Leather'),
		(MAIL, 'Mail'),
		(PLATE, 'Plate'),
	)

	HEAD,NECK,SHOULDER,SHIRT,CHEST,BELT,LEGS,FEET,WRIST,HANDS = range(1,11)
	FINGER,TRINKET,BACK,MAINHAND,OFFHAND,RANGED,TABBARD,BAG, = 11,13,15,16,17,18,19,20
	TWO_HAND,ONE_HAND,THROWN,RELIC,OH_FRILL,AMMO = 24,25,26,27,28,29,30

	SLOT_CHOICES = (
		(HEAD, 'Head'), (NECK, 'Neck'), (SHOULDER, 'Shoulder'), (SHIRT, 'Shirt'),
		(CHEST, 'Chest'), (BELT, 'Belt'), (LEGS, 'Legs'), (FEET, 'Feet'), (WRIST, 'Wrist'),
		(HANDS, 'Hands'), (BACK, 'Back'), (MAINHAND, 'Main Hand'), (OFFHAND, 'Off Hand'),
		(RANGED, 'Ranged'), (BAG, 'Bag'), (ONE_HAND, 'One-hand'), (TWO_HAND, 'Two-hand'),
		(THROWN, 'Thrown'), (OH_FRILL, 'Held In Off-Hand'), (RELIC, 'Relic'), (AMMO, 'Projectile'),
	)


	i = models.PositiveIntegerField(primary_key=True)
	n = models.CharField(max_length=100, unique=True, help_text='Name')
	quality = models.PositiveSmallIntegerField(default=1, validators=[MinValueValidator(0), MaxValueValidator(6)])
	img = models.CharField(max_length=50)

	ilvl = models.PositiveSmallIntegerField(default=1, validators=[MaxValueValidator(300)])
	_slot = models.PositiveSmallIntegerField(default=0, choices=SLOT_CHOICES, validators=[MinValueValidator(0), MaxValueValidator(20)])
	_proficiency = models.PositiveSmallIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(10)])

	armor = models.PositiveSmallIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(20000)])
	speed = models.DecimalField(default=0.0, max_digits=4, decimal_places=2, validators=[MinValueValidator(0.0), MaxValueValidator(4.0)])

	unique = models.BooleanField(default=False)
	bop = models.BooleanField(default=False)
	quest_item = models.BooleanField(default=False)

	use = models.PositiveSmallIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(20000)])
	description = models.CharField(max_length=250, blank=True)

	requirements = postgres.JSONField()
	val = postgres.JSONField(default=self.get_monetary_value())
	stats = postgres.JSONField()

	effects = models.ManyToManyField('Effect')
	disenchant = postgres.JSONField()


	#https://docs.djangoproject.com/en/2.2/ref/contrib/postgres/fields/#hstorefield
	# price = postgres.HStoreField(validators=KeysValidator(REQUIREMENT_KEYS, strict=True))

	ARMOR_SLOTS = [HEAD,SHOULDER,CHEST,BELT,LEGS,FEET,WRIST,HANDS,BACK]
	RANGED_SLOTS = [RANGED, THROWN]
	MELEE_SLOTS = [MAINHAND, OFFHAND, ONE_HAND, TWO_HAND]
	MELEE_CHOICES = {
		1:'Axe', 2:'Dagger', 3:'Fishing Pole', 4:'Fist Weapon', 5:'Miscellaneous'
		6:'Polearm', 7:'Shield', 8:'Staff', 9:'Sword'
	}
	ARMOR_CHOICES = {1:'Cloth': 2:'Leather', 3:'Mail', 4:'Plate'}
	AMMO_CHOICES = {1:'Bullet', 2:'Arrow'}
	RANGED_CHOICES = {1:'Gun', 2:'Bow', 3:'Crossbow', 4:'Thrown', 5:'Wand'}
	RELIC_CHOICES = {1:'Libram', 2:'Idol', 3:'Totem'}
	SLOT_NAME_CHOICES = {a:b for (a,b) in SLOT_CHOICES}


	def get_monetary_value(self):
		return {'copper':0, 'silver':0, 'gold':0}

	@property
	def slot(self):
		if not self._slot:
			return ''
		else:
			return self.SLOT_NAME_CHOICES[self._slot]

	@property
	def proficiency(self):
		if not self._proficiency:
			return ''
		else:
			if self._slot in self.ARMOR_SLOTS:
				return self.ARMOR_CHOICES[self._proficiency]

			elif self._slot in self.RANGED_SLOTS:
				return self.RANGED_CHOICES[self._proficiency]

			elif self._slot == self.RELIC:
				return self.RELIC_CHOICES[self._proficiency]

			elif self._slot == self.AMMO:
				return self.AMMO_CHOICES[self._proficiency]

			elif self._slot in self.MELEE_SLOTS:
				return self.MELEE_CHOICES[self._proficiency]
			else:
				return ''

	def __str__(self):
		return self.n


class WoWClass(models.Model):
	DRUID,HUNTER,MAGE,PALADIN,PRIEST,ROGUE,SHAMAN,WARLOCK,WARRIOR = range(1,10)
	CLASS_CHOICES = (
			(DRUID, 'Druid'),
			(HUNTER, 'Hunter'),
			(MAGE, 'Mage'),
			(PALADIN, 'Paladin'),
			(PRIEST, 'Priest'),
			(ROGUE, 'Rogue'),
			(SHAMAN, 'Shaman'),
			(WARLOCK, 'Warlock'),
			(WARRIOR, 'Warrior')
	)
	i = models.PositiveSmallIntegerField(primary_key=True, choices=CLASS_CHOICES, unique=True, default=WARRIOR)
	image = models.CharField(max_length=30)

	@property
	def n(self):
		return self.CLASS_CHOICES[self.i+1]

	def __str__(self):
		return(self.name)


class Spell(models.Model):
	SELF_RANGE = 0
	INSTANT = 0.0

	DISEASE,MAGIC,CURSE,POISON = range(1,5)
	DISPEL_TYPES =
	MECHANIC_TYPES = (
		(SNARE, 'Snared'),
		(ROOT, 'Rooted'),
		(DISORIENT, 'Disoriented'),
		(POLYMORPH, 'Polymorphed'),
		(STUN, 'Stunned'),
	)
	i = models.PositiveSmallIntegerField(primary_key=True, unique=True)
	range = models.PositiveSmallIntegerField(default=SELF_RANGE, choice=RANGE_CHOICES)
	cast = models.DecimalField(default=INSTANT, max_digits=5, decimal_places=2)
	duration = models.DecimalField(default=0.0, max_digits=5, decimal_places=2)
	mana_cost = models.PositiveSmallIntegerField(default=0)

	school = models.ForeignKey('School', on_delete=models.CASCADE)
	dispel = models.PositiveSmallIntegerField(default=SELF_RANGE, choice=DISPEL_TYPES)
	mechanic = models.PositiveSmallIntegerField(default=SELF_RANGE, choice=RANGE_CHOICES)

class Effect(models.Model):
	PROC,EQUIP,USE = range(1,4)
	EFFECT_TYPES = (
		(PROC, 'Chance on hit:'),
		(EQUIP, 'Equip:'),
		(USE, 'Use:'),
	)

	i = models.PositiveIntegerField(primary_key=True, unique=True)
	effect_type = models.PositiveSmallIntegerField(default=EQUIP, choices=EFFECT_TYPES)
	t = models.CharField(max_length=400)

	def __str__(self):
		return self.EFFECT_TYPES[self.i][1]

class School(models.Model):

	PHYSICAL,ARCANE,FIRE,FROST,HOLY,NATURE,SHADOW = range(1,8)
	SCHOOLS_OF_MAGIC = (
		(PHYSICAL, 'Physical'),
		(ARCANE, 'Arcane'),
		(FIRE, 'Fire'),
		(FROST, 'Frost'),
		(HOLY, 'Holy'),
		(NATURE, 'Nature'),
		(SHADOW, 'Shadow'),
	)
	i = models.PositiveIntegerField(primary_key=True, unique=True)

	@property:
	def n(self):
		return self.SCHOOLS_OF_MAGIC[self.i+1][1]

class Armor(models.Model):
	i = models.PositiveIntegerField(primary_key=True)

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
		('tailoring', 'tailoring'),
		('riding', 'riding'),
	)

	TYPE_CHOICES = (
		('primary', 'Primary'),
		('secondary', 'Secondary'),
	)

	i = models.PositiveIntegerField(primary_key=True)
	n = models.CharField(max_length=20, unique=True, choices=PROFESSION_CHOICES, default='alchemy')
	image = models.CharField(max_length=30)

	type_of = models.CharField(max_length=25, default='primary')

	# level required to craft an item
	# craft_level = models.PositiveSmallIntegerField(validators=[MaxValueValidator(300)], default=1)

	def __str__(self):
		return(self.name)

class TalentTree(models.Model):
	i = models.PositiveIntegerField(primary_key=True)
	n = models.CharField(max_length=40)
	wow_class = models.ForeignKey('WoWClass', on_delete=models.CASCADE)
	position = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(3)])
	_architect = models.CharField(max_length=100, default="[]")
	image = models.CharField(max_length=30)

	@property
	def architect(self):
		return eval(self._architect)

	def __str__(self):
		return(self.name)

	class Meta:
		ordering = ['position']
		unique_together = ['wow_class', 'name']


class Crafted(Item):
	prof = models.ForeignKey('Profession', on_delete=models.CASCADE, blank=True, null=True)

class Armor(Item):
	slot =
	stats = models.ManyToManyField


class Recipe(models.Model):

### NOTE: old

class Crafted(models.Model):
	item = models.ForeignKey('Item', on_delete=models.CASCADE)
	prof = models.ForeignKey('Profession', on_delete=models.CASCADE, blank=True, null=True)
	step = models.PositiveSmallIntegerField(default=1)
	materials = models.ManyToManyField('Material')
	help_text = "Describes an item as a craftable or consumable"
	end_game = models.BooleanField(default=False)

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
		('tailoring', 'tailoring'),
		('riding', 'riding'),
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


class TalentTree(models.Model):
	name = models.CharField(max_length=40)
	wow_class = models.ForeignKey('WoWClass', on_delete=models.CASCADE)
	position = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(3)])
	_architect = models.CharField(max_length=100, default="[]")

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


class Tag(models.Model):

	TAG_NAME_CHOICES = (
		('pvp', 'PvP'),
		('wpvp', 'wPvP'),
		('bgs', 'BGs'),
		('pve', 'PvE'),
		('meme', 'MeMe'),
		('mc', 'MC'),
		('bwl', 'BWL'),
		('zg', 'ZG'),
		('aq20', 'AQ20'),
		('aq40', 'AQ40'),
		('naxx', 'Naxx'),
		('5man', '5-man'),
		('melee', 'Melee'),
		('caster', 'Caster'),
		('healer', 'Healer'),
		('tank', 'Tank'),
		('dps', 'DPS'),
		('horde', 'Horde'),
		('alliance', 'Alliance'),
	)

	name = models.CharField(max_length=5, choices=TAG_NAME_CHOICES, unique=True)

	def __str__(self):
		return(self.name)

	class Meta:
		ordering = ['name']

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

class Rating(models.Model):
	value = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(5)])
	content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
	object_id = models.PositiveIntegerField()
	user = models.ForeignKey('Profile', on_delete=models.CASCADE) if settings.LOCAL else models.ForeignKey('User', on_delete=models.CASCADE)
	content_object = GenericForeignKey('content_type', 'object_id')
	help_text = "Spec or ConsumeList"

	def __str__(self):
		return("User={}, SavedList={}, Rating={}".format(self.user.email, self.content_object.name, self.value))

	class Meta:
		unique_together = ['user', 'content_type', 'object_id']

class SavedList(models.Model):

	name = models.CharField(max_length=30, default='')
	user = models.ForeignKey('Profile', on_delete=models.CASCADE) if settings.LOCAL else models.ForeignKey('User', on_delete=models.CASCADE)
	hash = models.CharField(max_length=100, default='testy test')
	description = models.CharField(default='couple line of text...', max_length=1000)
	private = models.BooleanField(default=False)
	ratings = GenericRelation('Rating', related_query_name="%(class)s_rating")
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)
	tags = models.ManyToManyField('Tag', related_name="%(class)s_tags_related", related_query_name="%(class)s_tags")


	def __str__(self):
		return("{}, last updated:{}, rating:{}, created by:{}".format(self.name, self.updated, self.rating, self.user.email))

	class Meta:
		abstract = True
		unique_together = ['user', 'name']

	@property
	def rating(self):
		return self.ratings.aggregate(Avg('value'))['value__avg']

	def has_voted(self, email):
		return self.ratings.filter(user__email=email).exists()

class ConsumeList(SavedList):
	consumes = models.ManyToManyField('Consume')


class Spec(SavedList):
	wow_class = models.ForeignKey('WoWClass', on_delete=models.CASCADE)


class Consume(models.Model):
	amount = models.PositiveSmallIntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(100)])
	item = models.ForeignKey('Crafted', on_delete=models.CASCADE)
	consume_list = models.ForeignKey('ConsumeList', on_delete=models.CASCADE)

	class Meta:
		unique_together = ['item', 'consume_list']

	def __str__(self):
		return("{}:{}".format(self.item.name, self.amount))

	@property
	def name(self):
		return(self.item.name)

	@property
	def mats(self):
		return(self.item.materials)

from home.signals import savedspec_limit, consumelist_limit

# class Requirement(models.Model):
# 	value = models.PositiveSmallIntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(300)])
# 	content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
# 	object_id = models.PositiveIntegerField()
# 	item = models.ForeignKey('Item', on_delete=models.CASCADE)
# 	content_object = GenericForeignKey('content_type', 'object_id')
#
# 	def __str__(self):
# 		return("Item: {}, Requirement: {}".format(self.item.name, self.content_object.__class__.__name__))
#

# class Rank(models.Model):
# 	CHOICES =
# 		{'ALLIANCE':
# 			['Private', 'Corporal', 'Sergeant', 'Master Sergeant',
# 			'Sergeant Major', 'Knight', 'Knight-Lieutenent', 'Knight-Captain',
# 			'Knight-Champion', 'Lieutenent-Commander', 'Commander', 'Marshal',
# 			'Field Marshal', 'Grand Marshal']
# 		},
# 		{'HORDE':
# 			['Scout', 'Grunt', 'Sergeant', 'Senior Sergeant', 'First Sergeant',
# 			'Stone Guard', 'Blood Guard', 'Legionnaire', 'Centurion', 'Champion',
# 			'Lieutenant General', 'General', 'Warlord', 'High Warlord']
# 		}
#
# 	value = models.PositiveSmallIntegerField(default=0,  validators=[MinValueValidator(0), MaxValueValidator(14)])
#
# 	@property
# 	def name(self, faction):
# 		return self.CHOICES[faction][self.value]
#
# class Faction(models.Model):
# 	FACTION_CHOICES = (
# 		('A', 'Alliance'),
# 		('H', 'Horde'),
# 		('N', 'Neutral')
# 	)
# 	name = models.CharField(max_length=1, choices=FACTION_CHOICES, unique=True)
#
# 	def __str__(self):
# 		return self.name
#
# class Race(models.Model):
#
# 	name = models.CharField()
# 	faction = models.ForeignKey('Faction', on_delete=models.CASCADE)
#
# 	def __str__(self):
# 		return "{}, {}".format(self.name, self.faction)
#
# class Zone(models.Model):
#
# 	name = models.CharField(max_length=100)
# 	reaction = models.ForeignKey('Faction', on_delete=models.CASCADE)
# 	continent = models.ForeignKey('Continent', on_delete=models.CASCADE)
#
# 	def __str__(self):
# 		return "{},{}".format(titleCase(self.name), self.continent)
#
#
# class Continent(models.Model):
# 	name = models.CharField(max_length=100)
#
# 	def __str__(self):
# 		return titleCase(self.name)
#
# class Quest(models.Model):
#	tier = models.PositiveSmallIntegerField(default=0,  validators=[MinValueValidator(0), MaxValueValidator(60)])
# 	start = models.ForeignKey('NPC')
# 	end = models.ForeignKey('NPC')
# 	faction = models.ForeignKey('Faction', on_delete=models.CASCADE)
#	pre_req = models.ManyToManyField('Quest', on_delete=models.CASCADE)
#	opens = models.ManyToManyField('Quest')
# 	required_level = models.PositiveSmallIntegerField(default=1,  validators=[MinValueValidator(1), MaxValueValidator(60)])
# 	name = models.CharField(max_length=100)
# 	description = models.CharField(max_length=1000)
# 	progress = models.CharField(max_length=1000)
# 	completion = models.CharField(max_length=1000)
#	class Meta:
#		unique_together = ['name', 'tier']

# class Loot(models.Model):
# 	item = models.ForeignKey('Item', on_delete=models.CASCADE)
# 	mob = models.ForeignKey('NPC', on_delete=models.CASCADE)
# 	drop_chance = models.DecimalField(default=0.0, max_digits=4, decimal_places=2, validators=[MaxValueValidator(0.00), MaxValueValidator(100.00)])
#

# class NPC(models.Model):
# 	MOB_TYPES = (
# 		('dragon', 'Dragonkin'),
# 		('human', 'Humanoid'),
# 		('undead', 'Undead'),
# 		('beast', 'Beast'),
# 		('giant', 'Giant'),
# 		('ele', 'Elemental'),
# 		('crit', 'Critter'),
# 		('mech', 'Mechanical')
# 		('demon', 'Demon')
# 	)
#
# 	name = models.CharField(max_length=75, default='')
# 	drops = models.ManyToManyField('Loot')
# 	health = models.PositiveIntegerField()
# 	level = models.PositiveSmallIntegerField()
# 	boss = models.BooleanField()
# 	max_damage = models.PositiveSmallIntegerField()
# 	min_damage = models.PositiveSmallIntegerField()
# 	armor = models.PositiveSmallIntegerField()
# 	mob_type = models.CharField(max_length=75, choices=MOB_TYPES)
#
# 	@property
# 	def skinnable(self):
# 		if self.mob_type is 'beast' or 'dragon':
# 			return True
# 		else:
# 			return False

#
#
#
# class Equipable(Item):
# 	SLOT_CHOICES = (
# 	('back', 'Back'),
# 	('bag', 'Bag'),
# 	('chest', 'Chest'),
# 	('feet', 'Feet'),
# 	('hands', 'Hands'),
# 	('head', 'Head'),
# 	('neck', 'Neck'),
# 	('ring', 'Ring'),
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
#
# 	class Meta:
# 		abstract = True
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
# 	WEAPON_TYPES = (
# 		('oh', 'Off-Hand'),
# 		('1h', 'One-Hand'),
# 		('mh', 'Main-Hand'),
# 		('thrown', 'Thrown'),
# 		('ranged', 'Ranged'),
# 		('2h', 'Two-Hand'),
# 	)
#
# 	hand = models.CharField(max_length=6, choices=WEAPON_TYPES)
# 	proficiency = models.CharField(max_length=50, choices=WEAPON_PROFICIENCIES)
# 	max_damage = models.PositiveSmallIntegerField(default=2)
# 	min_damage = models.PositiveSmallIntegerField(default=1)
# 	speed = models.DecimalField(default=0.0, max_digits=4, decimal_places=2)
# 	effects = models.ManyToManyField('Effect')
#
# 	@property
# 	def dps(self):
# 		return((self.max_damage+self.min_damage/2)/self.speed)


# # i.e. Equip: +60 Attack Power
# class Effect(models.Model):
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
# 	('stamina', 'Stamina'),
#
# 	)
# 	name = models.CharField(max_length=20, unique=True, choices=CHOICES)
#
#
# class ItemSet(models.Model):
# 	name = models.CharField(max_length=75)
# 	items = models.ManyToManyField('Item')
# 	bonuses = models.ManyToManyField('Bonus')
#
# 	def __str__(self):
# 		return self.name
#
#
# class Bonus(models.Model):
#
# 	value = models.PositiveSmallIntegerField(default=1)
# 	itemset = models.ForeignKey('ItemSet', on_delete=models.CASCADE)
# 	stat = models.ForeignKey('Stat', on_delete=models.CASCADE, blank=True, null=True)
# 	effect = models.ForeignKey('Effect', on_delete=models.CASCADE, blank=True, null=True)
# 	pieces_required = models.PositiveSmallIntegerField(default=1)
#


# MELEE_PROFICIENCIES = (
# 	(AXE, 'Axe'),
# 	(DAGGER, 'Dagger'),
# 	(FISHING_POLE, 'Fishing Pole'),
# 	(FIST, 'Fist Weapon'),
# 	(MISC, 'Miscellaneous'),
# 	(POLEARM, 'Polearm'),
# 	(STAFF, 'Staff'),
# 	(SWORD, 'Sword'),
# )
