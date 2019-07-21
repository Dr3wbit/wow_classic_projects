from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _
from home.models import Item, Talent, WoWClass, Spec, User
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

class UserAdmin(DjangoUserAdmin):
    """Define admin model for custom User model with no email field."""

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

#admin.site.unregister(User)
admin.site.register(User, UserAdmin)
