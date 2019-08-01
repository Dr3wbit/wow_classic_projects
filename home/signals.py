from django.db.models.signals import pre_save
from django.core.exceptions import PermissionDenied, ValidationError
from home.models import ConsumeList, User, Spec
from django.dispatch import receiver

@receiver(pre_save, sender=Spec, weak=False)
def savedspec_limit(sender, instance, **kwargs):
	print('***signals test***')
	user = User.objects.get(email=instance.user.email)
	if user.spec_set.count() >= 10:
		raise PermissionDenied("Username: %s can only save 10 specs"%instance.user.email)
		# raise ValidationError("Can only create 1 %s instance" % model.__name__)

@receiver(pre_save, sender=ConsumeList, weak=False)
def consumelist_limit(sender, instance, **kwargs):
	print('***signals test***')
	user = User.objects.get(email=instance.user.email)
	if user.consumelist_set.count() >= 10:
		raise PermissionDenied("Username: %s can only save 10 consume lists"%instance.user.email)
		# raise ValidationError("Can only create 1 %s instance" % model.__name__)


# pre_save.connect(check_limits, sender=SavedSpec, weak=False)
