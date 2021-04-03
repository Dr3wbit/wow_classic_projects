from django.db.models.signals import pre_save, post_save, post_init, post_delete
from django.core.exceptions import PermissionDenied, ValidationError
from home.models import ConsumeList, Spec, User, Profession, School, Item
from django.dispatch import receiver
import re
from django.core.cache import cache
from django.core.cache.utils import make_template_fragment_key

NAUGHTY_WORDS = ["nigger", "faggot", "shit", "fuck", "fag", "nlgger", "nigg3r", "nlgg3r", "n1gg3r"]

@receiver(pre_save, sender=ConsumeList, weak=False)
@receiver(pre_save, sender=Spec, weak=False)
def savedlist_limit(sender, instance, **kwargs):
	user = User.objects.get(email=instance.user.email)
	if sender.objects.filter(user=user).count() > instance.user.max_lists:
		raise PermissionDenied("Username: {} can only save {} lists of type {}".format(instance.user.email, instance.user.max_lists, instance.__class__.__name__))

	if instance.img == 'samwise':
		instance.img = "class/"+instance.wow_class.name.lower()+".jpg" if sender == Spec else 'inv_misc_book_09.jpg'

@receiver(pre_save, sender=ConsumeList, weak=False)
def no_empty_consumes(sender, instance, **kwargs):
	for consume in instance.consumes.all():
		if consume.amount <= 0:
			consume.delete()

@receiver(post_delete, sender=Spec, weak=False)
@receiver(post_delete, sender=ConsumeList, weak=False)
@receiver(post_save, sender=Spec, weak=False)
@receiver(post_save, sender=ConsumeList, weak=False)
def clear_sidebar_cache(sender, instance, created=True, **kwargs):
	if created:
		user = instance.user
		key = make_template_fragment_key('sidebar', [user.uid])
		cache.delete(key)

@receiver(post_save, sender=Spec, weak=False)
@receiver(post_save, sender=ConsumeList, weak=False)
def savedlist_profanity_filter(sender, instance, created, **kwargs):
	if created:
		naughty_words = [x.lower() for x in NAUGHTY_WORDS]
		reggie = r"({})".format("|".join(naughty_words))
		description = instance.description[0] if type(instance.description) == list else instance.description
		description = description.lower().strip().split()
		description = set([x.strip("!#.*&^-=@`~{\/?[]}|><,;:_%()").strip() for x in description])

		match = False
		for word in description:
			if re.search(reggie, word):
				match = True

		else:
			title = instance.name.lower().strip().split()
			title = set([x.strip("!#.*&^-=@`~{\/?[]}|><,;:_%()").strip() for x in title])
			match = False
			for word in title:
				if re.search(reggie, word):
					match = True


		if match:
			instance.flagged = True
			instance.visible = False
			instance.save()

	# if (any(x for x in NAUGHTY_WORDS if x in instance.description) or any()):

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
