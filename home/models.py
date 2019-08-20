#-*- coding: utf-8 -*-
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models import Avg, Sum
import datetime, math, re, time
from social_django.models import UserSocialAuth
from django.contrib.postgres import fields as postgres
from django.contrib.postgres.validators import KeysValidator
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _
from .managers import UserManager
from django.core.serializers import json as JSON
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from decimal import *

class User(AbstractUser):
	username = None
	email = models.EmailField(_('email address'), unique=True)
	date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
	is_active = models.BooleanField(_('active'), default=True)
	# avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
	max_lists = models.PositiveSmallIntegerField(default=20)

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

	def __str__(self):
		return "{}#{} - {}".format(self.disc_username, self.tag, self.email)

### NOTE: NEW
# the baseline; everything is an item
class Item(models.Model):
	JUNK, COMMON, UNCOMMON, RARE, EPIC, LEGENDARY, GM = range(1,8)
	QUALITY_CHOICES = ( (JUNK, 'junk'), (COMMON, 'common'), (UNCOMMON, 'uncommon'), (RARE, 'rare'), (EPIC, 'epic'), (LEGENDARY, 'legendary'), (GM, 'gm'),)

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
		(TRINKET2, 'Trinket2'),(BACK, 'Back'), (MAINHAND, 'Main Hand'), (OFFHAND, 'Off Hand'),
		(RANGED, 'Ranged'), (TABARD,'Tabard'), (BAG, 'Bag'), (BAG2, 'Bag2'), (BAG3, 'Bag3'), (BAG4, 'Bag4'),
		(TWO_HAND, 'Two-hand'), (ONE_HAND, 'One-hand'),(THROWN, 'Thrown'), (RELIC, 'Relic'),
		(OH_FRILL, 'Held In Off-Hand'), (AMMO, 'Projectile'),
	)

	ix = models.PositiveIntegerField(primary_key=True)
	name = models.CharField(max_length=100)
	quality = models.PositiveSmallIntegerField(default=1, validators=[MinValueValidator(0), MaxValueValidator(6)])
	img = models.CharField(max_length=50)

	ilvl = models.PositiveSmallIntegerField(default=1, validators=[MaxValueValidator(300)])
	_slot = models.PositiveSmallIntegerField(default=0, choices=SLOT_CHOICES, validators=[MinValueValidator(0), MaxValueValidator(20)])
	_proficiency = models.PositiveSmallIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(10)])
	slot = models.CharField(max_length=20, default='')
	proficiency = models.CharField(max_length=20, default='')

	armor = models.PositiveSmallIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(20000)])
	speed = models.DecimalField(default=0.0, max_digits=4, decimal_places=2, validators=[MinValueValidator(0.0), MaxValueValidator(4.0)])

	damage = models.ManyToManyField('Damage')

	unique = models.BooleanField(default=False)
	bop = models.BooleanField(default=False)
	quest_item = models.BooleanField(default=False)

	stats = postgres.JSONField(encoder=JSON.DjangoJSONEncoder, blank=True, null=True)
	resists = postgres.JSONField(encoder=JSON.DjangoJSONEncoder, blank=True, null=True)
	requirements = postgres.JSONField(encoder=JSON.DjangoJSONEncoder, blank=True, null=True)
	durability = models.PositiveSmallIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(400)])
	use = models.ForeignKey('Spell', blank=True, null=True, on_delete=models.SET_NULL)
	equips = models.ManyToManyField('Spell', related_name='equips')
	procs = models.ManyToManyField('Spell', related_name='procs')
	description = models.CharField(max_length=250, blank=True)
	itemset = models.ForeignKey('ItemSet', blank=True, null=True, on_delete=models.SET_NULL)

	bagslots = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(30)])

	val = postgres.JSONField(encoder=JSON.DjangoJSONEncoder, blank=True, null=True, help_text='Monetary Value')
	disenchant = postgres.JSONField(encoder=JSON.DjangoJSONEncoder, blank=True, null=True)

	consume = models.BooleanField(default=False)
	#https://docs.djangoproject.com/en/2.2/ref/contrib/postgres/fields/#hstorefield
	# price = postgres.HStoreField(validators=KeysValidator(REQUIREMENT_KEYS, strict=True))

	ARMOR_SLOTS = [HEAD,SHOULDER,CHEST,BELT,LEGS,FEET,WRIST,HANDS,BACK]
	RANGED_SLOTS = [RANGED, THROWN]
	MELEE_SLOTS = [MAINHAND, OFFHAND, ONE_HAND, TWO_HAND]

	MELEE_CHOICES = {
		1:'Axe', 2:'Dagger', 3:'Fishing Pole', 4:'Fist Weapon', 5:'Mace', 6:'Miscellaneous',
		7:'Polearm', 8:'Shield', 9:'Staff', 10:'Sword'
	}
	ARMOR_CHOICES = {1:'Cloth', 2:'Leather', 3:'Mail', 4:'Plate'}
	AMMO_CHOICES = {1:'Bullet', 2:'Arrow'}
	RANGED_CHOICES = {1:'Gun', 2:'Bow', 3:'Crossbow', 4:'Thrown', 5:'Wand'}
	RELIC_CHOICES = {1:'Libram', 2:'Idol', 3:'Totem'}
	SLOT_NAME_CHOICES = {a:b for (a,b) in SLOT_CHOICES}

	# def get_monetary_value(self):
	# 	return {'copper':0, 'silver':0, 'gold':0}

	def __str__(self):
		return self.name

	@property
	def dps(self):
		if self.speed and self.damage.count() > 0:
			return (Decimal((self.damage.aggregate(Sum('low'))['low__sum']+self.damage.aggregate(Sum('high'))['high__sum'])/2)/self.speed).quantize(Decimal('1.0'))
		else:
			return False

	class Meta:
		unique_together = ['ix', 'name']
		ordering = ['name']

class ItemSet(models.Model):
	ix = models.PositiveIntegerField(primary_key=True)
	name = models.CharField(max_length=100, unique=True)
	bonuses = models.ManyToManyField('SetBonus')

	def __str__(self):
		return self.name

class SetBonus(models.Model):
	pieces = models.PositiveIntegerField(default=2, validators=[MaxValueValidator(9)])
	spell = models.ForeignKey('Spell', on_delete=models.CASCADE)

	def __str__(self):
		return "({}) Set: {}".format(self.pieces, self.spell.t)

	class Meta:
		ordering = ['pieces']
		unique_together = ['pieces', 'spell']

class Crafted(models.Model):
	item = models.ForeignKey('Item', on_delete=models.CASCADE)
	profession = models.ForeignKey('Profession', on_delete=models.SET_NULL, blank=True, null=True)
	step = models.PositiveSmallIntegerField(default=1)
	materials = models.ManyToManyField('Material')
	help_text = "Describes an item as a craftable or consumable"
	end_game = models.BooleanField(default=False)

	# quest = models.ForeignKey('Quest', blank=True, null=True, on_delete=models.SET_NULL, help_text='Which quest rewards the item')

	skillup = postgres.JSONField(encoder=JSON.DjangoJSONEncoder, blank=True, null=True)

	profession_level = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(300)])

	@property
	def name(self):
		return self.item.name

	@property
	def quality(self):
		return self.item.quality

	@property
	def img(self):
		return self.item.img

	def __str__(self):
		return self.item.__str__()



class Damage(models.Model):
	i = models.ForeignKey('Item', on_delete=models.CASCADE, related_name='+')
	school = models.ForeignKey('School', on_delete=models.CASCADE)
	high = models.PositiveSmallIntegerField(default=2)
	low = models.PositiveSmallIntegerField(default=1)

	def __str__(self):
		added = "+" if self.i.proficiency != "Wand" else ""
		if self.school.ix <= 1:
			return "{}  -  {} Damage".format(self.low, self.high)
		else:
			return "{}{}  -  {} {} Damage".format(added, self.low, self.high, self.school.name)

	class Meta:
		unique_together = ['i', 'school']

class Material(models.Model):
	item = models.ForeignKey('Item', on_delete=models.CASCADE)
	creates = models.ForeignKey('Crafted', on_delete=models.CASCADE)
	amount = models.PositiveSmallIntegerField(default=1)
	help_text = "Describes an item as a material. Items can exist on their own, but this describes their relationship in terms of a consumable they can help create, hence as a 'material' and not simply as an 'item'"

	@property
	def name(self):
		return self.item.name

	@property
	def quality(self):
		return self.item.quality

	@property
	def img(self):
		return self.item.img

	def __str__(self):
		return self.item.__str__()

	class Meta:
		unique_together = ['item', 'creates']


class WoWClass(models.Model):
	CLASS_CHOICES = (
			('Druid', 'Druid'),
			('Hunter', 'Hunter'),
			('Mage', 'Mage'),
			('Paladin', 'Paladin'),
			('Priest', 'Priest'),
			('Rogue', 'Rogue'),
			('Shaman', 'Shaman'),
			('Warlock', 'Warlock'),
			('Warrior', 'Warrior'),
	)

	name = models.CharField(max_length=10, choices=CLASS_CHOICES, unique=True)
	img = models.CharField(max_length=30)

	def __str__(self):
		return self.name

	class Meta:
		verbose_name_plural = "classes"

class TalentTree(models.Model):
	name = models.CharField(max_length=40)
	wow_class = models.ForeignKey('WoWClass', on_delete=models.CASCADE)
	position = models.PositiveSmallIntegerField(default=0, validators=[MaxValueValidator(3)])
	_architect = models.CharField(max_length=100, default="[]")
	img = models.CharField(max_length=30)
	background = models.CharField(max_length=30)

	@property
	def architect(self):
		return eval(self._architect)

	def __str__(self):
		return self.name

	class Meta:
		ordering = ['position']
		unique_together = ['wow_class', 'name']
		verbose_name_plural = "talent_trees"

class Talent(models.Model):

	img = models.CharField(max_length=50, default='')
	name = models.CharField(max_length=40)
	wow_class = models.ForeignKey('WoWClass', on_delete=models.CASCADE)
	tree = models.ForeignKey('TalentTree', on_delete=models.CASCADE)
	max_rank = models.PositiveSmallIntegerField(default=5, validators=[MaxValueValidator(5)])
	_description = models.CharField(max_length=400, blank=False)
	formula = models.CharField(max_length=150, default="[x]")

	x = models.PositiveSmallIntegerField(validators=[MaxValueValidator(5)], default=0)
	y = models.PositiveSmallIntegerField(validators=[MaxValueValidator(7)], default=0)
	locked = models.ForeignKey("self", blank=True, null=True, on_delete=models.SET_NULL)

	class Meta:
		unique_together = ['wow_class', 'name', 'tree']
		ordering = ['id']


	def __str__(self):
		return self.name

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
	def unlocks(self):
		return([x.name for x in Talent.objects.filter(locked=self)])

	def __str__(self):
		return self.name

class Spell(models.Model):
	ix = models.PositiveSmallIntegerField(primary_key=True, unique=True)
	t = models.CharField(max_length=1000)
	name = models.CharField(max_length=70)
	# img = models.CharField(max_length=30)

	# SELF_RANGE = 0
	# INSTANT = 0.0
	# DISEASE,MAGIC,CURSE,POISON = range(1,5)
	# DISPEL_TYPES = (
	# 	(CURSE, 'Curse'),
	# 	(DISEASE, 'Disease'),
	# 	(MAGIC, 'Magic'),
	# 	(POISON, 'Poison')
	# )
	# DISORIENT,POLYMORPH,ROOT,SNARE,STUN = range(1,6)
	# MECHANIC_TYPES = (
	# 	(DISORIENT, 'Disoriented'),
	# 	(POLYMORPH, 'Polymorphed'),
	# 	(ROOT, 'Rooted'),
	# 	(SNARE, 'Snared'),
	# 	(STUN, 'Stunned'),
	# )

	# range = models.PositiveSmallIntegerField(default=SELF_RANGE, choices=RANGE_CHOICES)
	# cast = models.DecimalField(default=INSTANT, max_digits=5, decimal_places=2)
	# duration = models.DecimalField(default=0.0, max_digits=5, decimal_places=2)
	# cooldown = models.DecimalField(default=0.0)
	# mana_cost = models.PositiveSmallIntegerField(default=0)
	#
	# school = models.ForeignKey('School', on_delete=models.CASCADE)
	# dispel = models.PositiveSmallIntegerField(choices=DISPEL_TYPES)
	# mechanic = models.PositiveSmallIntegerField(choices=MECHANIC_TYPES)

	def __str__(self):
		return self.t


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

	ix = models.PositiveIntegerField(primary_key=True, unique=True, validators=[MaxValueValidator(7)])
	name = models.CharField(max_length=30, default='')

	def __str__(self):
		return self.name

class Profession(models.Model):

	ALCH,BS,ENCH,ENGI,HERB,LW,MINING,SKIN,TAILOR = range(1, 10)
	COOK,FA,FISH,RIDING = range(10, 14)
	PROFESSION_CHOICES = (
		(ALCH, 'Alchemy'),
		(BS, 'Blacksmithing'),
		(ENCH, 'Enchanting'),
		(ENGI, 'Engineering'),
		(HERB, 'Herbalism'),
		(LW, 'Leatherworking'),
		(MINING, 'Mining'),
		(SKIN, 'Skinning'),
		(TAILOR, 'Tailoring'),
		(COOK, 'Cooking'),
		(FA, 'First Aid'),
		(FISH, 'Fishing'),
		(RIDING, 'Riding'),
	)
	ix = models.PositiveIntegerField(primary_key=True, unique=True, choices=PROFESSION_CHOICES)
	img = models.CharField(max_length=40)
	name = models.CharField(max_length=30, default='')

	@property
	def primary(self):
		return True if self.ix <= 9 else False

	def __str__(self):
		return self.name


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

	name = models.CharField(max_length=15, choices=TAG_NAME_CHOICES, unique=True)

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
	user = models.ForeignKey('User', on_delete=models.CASCADE)
	content_object = GenericForeignKey('content_type', 'object_id')
	help_text = "Spec or ConsumeList"

	def __str__(self):
		return("User={}, SavedList={}, Rating={}".format(self.user.email, self.content_object.name, self.value))

	class Meta:
		unique_together = ['user', 'content_type', 'object_id']

class SavedList(models.Model):

	name = models.CharField(max_length=30, default='')
	user = models.ForeignKey('User', on_delete=models.CASCADE)
	hash = models.CharField(max_length=100, default='')
	description = models.CharField(default='couple line of text...', max_length=2000)
	private = models.BooleanField(default=False)
	ratings = GenericRelation('Rating', related_query_name="%(class)s_rating")
	created = models.DateTimeField(auto_now_add=True)
	updated = models.DateTimeField(auto_now=True)
	tags = models.ManyToManyField('Tag', related_name="%(class)s_tags_related", related_query_name="%(class)s_tags")
	flagged = models.BooleanField(default=False)
	visible = models.BooleanField(default=True)

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
	hash = models.CharField(max_length=100, default='', unique=True)

	shorthand = {
		'Alchemy':'alch', 'Blacksmithing':'BS', 'Engineering':'eng',
		'Enchanting':'ench', 'Leatherworking':'LW', 'Tailoring':'tailor',
		'Cooking':'cook', 'First Aid':'FA', 'Other':'misc', 'Mining':'mining',
		'Herbalism': 'herb'
		}

	@property
	def prof_shorthand(self):
		prof_dict = {}
		for consume in self.consumes.all():
			if consume.item.profession:
				if consume.item.profession.name not in prof_dict.keys():
					prof_dict[consume.item.profession.name] = 0
				prof_dict[consume.item.profession.name] += 1
			else:
				if 'Other' not in prof_dict.keys():
					prof_dict['Other'] = 0
				prof_dict['Other'] += 1

		return [self.shorthand[x] for x,y in sorted(prof_dict.items(), key=lambda kv: kv[1], reverse=True)]


class Spec(SavedList):
	wow_class = models.ForeignKey('WoWClass', on_delete=models.CASCADE)


class Consume(models.Model):
	amount = models.PositiveSmallIntegerField(default=1, validators=[MinValueValidator(1), MaxValueValidator(999)])
	item = models.ForeignKey('Crafted', on_delete=models.CASCADE)
	consume_list = models.ForeignKey('ConsumeList', on_delete=models.CASCADE)

	class Meta:
		unique_together = ['item', 'consume_list']

	def __str__(self):
		return("{}:{}".format(self.item.name, self.amount))

	@property
	def name(self):
		return self.item.name

	@property
	def mats(self):
		return self.item.materials.all()

	@property
	def quality(self):
		return self.item.quality

	@property
	def img(self):
		return self.item.img


class Zone(models.Model):
	REACTION_CHOICES = {
		-1:'Horde', 0:'Neutral', 1:'Alliance'
	}
	ix = models.PositiveSmallIntegerField(primary_key=True, unique=True)
	name = models.CharField(max_length=100)
	# _reaction = models.ForeignKey('Faction', on_delete=models.SET_NULL, null=True, blank=True)

	_reaction = models.SmallIntegerField(validators=[MinValueValidator(-1), MaxValueValidator(1)])

	# continent = models.ForeignKey('Continent', on_delete=models.CASCADE)

	@property
	def reaction(self):
		return self.REACTION_CHOICES[self._reaction]

	def __str__(self):
		return self.name


from home.signals import savedspec_limit, consumelist_limit, set_profession_name, set_school_name, set_slot, set_proficiency

# class Faction(models.Model):
# 	ALLY,HORDE,NEUTRAL = 1,2,3
# 	FACTION_CHOICES = (
# 		(ALLY, 'Alliance'),
# 		(HORDE, 'Horde'),
# 		(NEUTRAL, 'Neutral')
# 	)
#
# 	ix = models.PositiveSmallIntegerField(primary_key=True, unique=True, choices=FACTION_CHOICES, default=NEUTRAL, validators=[MinValueValidator(1), MaxValueValidator(3)])
# 	name = models.CharField(max_length=1, choices=FACTION_CHOICES, unique=True)
#
# 	@property
# 	def name(self):
# 		return self.FACTION_CHOICES[self.ix+-1][1]
#
# 	def __str__(self):
# 		return self.name


# class Quest(models.Model):
# 	FACTION_CHOICES = (
# 		('A', 'Alliance'),
# 		('H', 'Horde'),
# 	)
#
# 	i = models.PositiveIntegerField(primary_key=True)
# 	n = models.CharField(max_length=100)
# 	ilvl = models.PositiveSmallIntegerField(default=1,  validators=[MinValueValidator(1), MaxValueValidator(90)])
# 	required_level = models.PositiveSmallIntegerField(default=0,  validators=[MinValueValidator(1), MaxValueValidator(60)])
# 	tier = models.PositiveSmallIntegerField(default=0,  validators=[MinValueValidator(0), MaxValueValidator(30)])
#
# 	faction = models.CharField(max_length=15, choices=FACTION_CHOICES)
#
# 	# faction = models.ForeignKey('Faction', on_delete=models.SET_NULL, null=True, blank=True)
# 	# start = models.ForeignKey('NPC', on_delete=models.CASCADE)
# 	# end = models.ForeignKey('NPC', on_delete=models.CASCADE)
# 	# pre_req = models.ManyToManyField('self', on_delete=models.SET_NULL, blank=True, null=True)
# 	# opens = models.ManyToManyField('self')
# 	# description = models.CharField(max_length=1000)
# 	# progress = models.CharField(max_length=1000)
# 	# completion = models.CharField(max_length=1000)
#
# 	class Meta:
# 		unique_together = ['name', 'tier']
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

# class Continent(models.Model):
# 	name = models.CharField(max_length=100)
#
# 	def __str__(self):
# 		return titleCase(self.name)
#

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
