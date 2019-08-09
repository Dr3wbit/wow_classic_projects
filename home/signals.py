from django.db.models.signals import pre_save, post_init
from django.core.exceptions import PermissionDenied, ValidationError
from home.models import ConsumeList, Spec, User, Profession, School, Item
from django.dispatch import receiver

@receiver(pre_save, sender=Spec, weak=False)
def savedspec_limit(sender, instance, **kwargs):
	user = User.objects.get(email=instance.user.email)
	if user.spec_set.count() >= 10:
		raise PermissionDenied("Username: %s can only save 10 specs"%instance.user.email)
		# raise ValidationError("Can only create 1 %s instance" % model.__name__)

@receiver(pre_save, sender=ConsumeList, weak=False)
def consumelist_limit(sender, instance, **kwargs):
	user = User.objects.get(email=instance.user.email)
	if user.consumelist_set.count() >= 10:
		raise PermissionDenied("Username: %s can only save 10 consume lists"%instance.user.email)
		# raise ValidationError("Can only create 1 %s instance" % model.__name__)

@receiver(post_init, sender=Profession)
def set_profession_name(sender, instance, *args, **kwargs):
	"""
	Set the default value for `name` on the `instance`.

	:sender: The `Profession` class that sent the signal.
	:instance: The `Profession` instance that is being
		initialised.
	:return: None.
	"""
	if not instance.name:
		instance.name = Profession.PROFESSION_CHOICES[instance.ix-1][1]

@receiver(post_init, sender=School)
def set_school_name(sender, instance, *args, **kwargs):
	"""
	Set the default value for `name` on the `instance`.

	:sender: The `Profession` class that sent the signal.
	:instance: The `Profession` instance that is being
		initialised.
	:return: None.
	"""
	if not instance.name:
		instance.name = School.SCHOOLS_OF_MAGIC[instance.ix-1][1]


@receiver(pre_save, sender=Item)
def set_slot(sender, instance, *args, **kwargs):
	"""
	Set the default value for `slot` and `proficiency` on the `instance`.

	:sender: The `Item` class that sent the signal.
	:instance: The `Item` instance that is being
		initialised.
	:return: None.
	"""
	if bool(instance._slot):
		if not instance.slot:

			instance.slot = Item.SLOT_CHOICES[instance._slot-1][1]

		# print("({}) {}".format(instance.ix, instance.slot))

@receiver(pre_save, sender=Item)
def set_proficiency(sender, instance, *args, **kwargs):
	"""
	Set the default value for `slot` and `proficiency` on the `instance`.

	:sender: The `Item` class that sent the signal.
	:instance: The `Item` instance that is being
		initialised.
	:return: None.
	"""
	if bool(instance._proficiency):
		if not instance.proficiency:
			if instance._slot in Item.ARMOR_SLOTS:
				instance.proficiency = Item.ARMOR_CHOICES[instance._proficiency]

			elif instance._slot in Item.RANGED_SLOTS:
				instance.proficiency =instance.proficiency = Item.RANGED_CHOICES[instance._proficiency]

			elif instance._slot == Item.RELIC:
				instance.proficiency = Item.RELIC_CHOICES[instance._proficiency]

			elif instance._slot == Item.AMMO:
				instance.proficiency =instance.proficiency = Item.AMMO_CHOICES[instance._proficiency]

			elif instance._slot in Item.MELEE_SLOTS:
				instance.proficiency = Item.MELEE_CHOICES[instance._proficiency]

		# print("({}) {}".format(instance.ix, instance.proficiency))
