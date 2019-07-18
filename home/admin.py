from django.contrib import admin
from home.models import Item, Talent, WoWClass, Spec
#
# # Register your models here.
# class SpecAdmin(admin.ModelAdmin):
# 	"""
# 	Don't allow addition of more than five model instance in Django admin
# 	See: http://stackoverflow.com/a/12469482
# 	"""
# 	def has_add_permission(self, request):
# 		if self.model.objects.count() >= 5:
# 			return False
# 		else:
# 			return True
#
# admin.site.register(Spec, SpecAdmin)

# class ItemAdmin(admin.ModelAdmin):

admin.site.register(WoWClass)
admin.site.register(Item)
