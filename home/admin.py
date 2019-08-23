from django.contrib import admin
from home.models import Item, WoWClass, Spec, ConsumeList
from django.utils import html
from django.conf import settings
from django import forms
from django.contrib.auth.models import Group
from django.contrib.auth.admin import GroupAdmin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import ugettext_lazy as _
from home.models import User


QUALITY = {
	"junk": "rgba(157,157,157,1)",
	"common": "rgba(240,255,255,0.95)",
	"uncommon":"rgba(30,255,0,0.95)",
	"rare":"rgba(0, 112, 221, 1)",
	"epic": "rgba(163, 53, 238, 1)",
	"legendary": "rgba(255, 128, 0, 0.95)",
}

class OnybuffAdminSite(admin.AdminSite):
	# Text to put at the end of each page's <title>.
	site_title = 'ONYBUFF'
	site_header = 'Onybuff Admin'
	# My custom variable
	#
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)


	def each_context(self, request):
		"""
		Overriden dictionary of variables returned for
		*every* page in the admin site.
		"""
		context = super().each_context(request)

		context['flagged'] = {}
		context['flagged']['specs'] = Spec.objects.filter(flagged=True).count()
		context['flagged']['consumelists'] = ConsumeList.objects.filter(flagged=True).count()

		return context

admin_site = OnybuffAdminSite(name='admin')
# admin.site.site_header = 'Onybuff Admin'
# OnybuffAdminSite.register(model_or_iterable=WoWClass)
# admin.site.register(Spec)
# admin.site.register(ConsumeList)

class ItemAdmin(admin.ModelAdmin):
	model = Item
	# change_list_results_template = "change_list_results.html"
	list_display = ('name', 'quality', 'image',)

	def image(self, obj):
		# format_html_join()
		return html.format_html(
			'<img class="icon-medium" src="{}" style="background-image: url({});">',
			html.format_html(settings.STATIC_URL+"images/icon_border_2.png"),
			html.format_html(settings.STATIC_URL+"images/icons/large/"+obj.img+".jpg"),
	)

	image.short_description = 'Image'



class SpecApprovalForm(forms.ModelForm):

	def has_changed(self, *args, **kwargs):
		return True

	class Meta:
		STATUS_CHOICES = (
			(True, 'ACCEPT'),
			(False, 'DENY'),
		)

		fields = ['user', 'name', 'description', 'visible']
		widgets = {'visible': forms.Select(choices=STATUS_CHOICES)}
		initial = {'visible': "-------"}

	def save(self, *args, **kwargs):
		data_dict = self.data.dict()
		print(data_dict)
		for x in range(int(data_dict['form-TOTAL_FORMS'])):
			inx = 'form-{}-id'.format(x)
			ix = int(data_dict[inx])
			print('ix: ', ix)
			print('inx: ', inx)

			spec = Spec.objects.get(id=ix)
			approved_key = 'form-{}-visible'.format(x)
			approved = True if data_dict[approved_key] == 'True' else False
			spec.visible = approved
			spec.flagged = False
			spec.save(force_update=True)
		m = super().save(*args, **kwargs)
		return spec

class FlaggedSpecsAdmin(admin.ModelAdmin):
	form = SpecApprovalForm
	actions = None

	def get_changelist_form(self, request, **kwargs):
		return SpecApprovalForm

	def get_queryset(self, request):
		qs = super().get_queryset(request)
		return qs.filter(flagged=True)

	list_display = ('name', 'description', 'user', 'visible',)
	list_editable = ('visible', )
	readonly_fields = ('user',)


class CLApprovalForm(forms.ModelForm):

	def has_changed(self, *args, **kwargs):
		return True

	class Meta:
		STATUS_CHOICES = (
			(True, 'ACCEPT'),
			(False, 'DENY'),
		)

		fields = ['user', 'name', 'description', 'visible']
		widgets = {'visible': forms.Select(choices=STATUS_CHOICES)}

	def save(self, *args, **kwargs):
		data_dict = self.data.dict()
		for x in range(int(data_dict['form-TOTAL_FORMS'])):
			inx = 'form-{}-id'.format(x)
			ix = data_dict[inx]
			cl = ConsumeList.objects.get(id=ix)
			approved_key = 'form-{}-visible'.format(x)
			approved = True if data_dict[approved_key] == 'True' else False
			cl.visible = approved
			cl.flagged = False
			cl.save(force_update=True)

		m = super().save(*args, **kwargs)
		return cl

class FlaggedCLAdmin(admin.ModelAdmin):
	form = CLApprovalForm
	actions = None

	def get_changelist_form(self, request, **kwargs):
		return CLApprovalForm

	def get_queryset(self, request):
		qs = super().get_queryset(request)
		return qs.filter(flagged=True)

	list_display = ('name', 'description', 'user', 'visible',)
	list_editable = ('visible', )
	readonly_fields = ('user',)




class UserAdmin(DjangoUserAdmin):

	"""Define admin model for custom User model with no email field."""

	fieldsets = (
		(None, {'fields': ('email', 'password')}),
		(_('Personal info'), {'fields': ('first_name', 'last_name')}),
		(_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
									   'groups', 'user_permissions')}),
		(_('Important dates'), {'fields': ('last_login', 'date_joined')}),
	)
	readonly_fields = ('date_joined',)
	add_fieldsets = (
		(None, {
			'classes': ('wide',),
			'fields': ('email', 'password1', 'password2'),
		}),
	)
	list_display = ('email', 'first_name', 'last_name', 'is_staff')
	search_fields = ('email', 'first_name', 'last_name')
	ordering = ('email',)

	# OnybuffAdminSite.site.register(User, UserAdmin)


# OnybuffAdminSite.site.register(Spec, FlaggedSpecsAdmin)
# OnybuffAdminSite.register(Item, ItemAdmin)
# OnybuffAdminSite.register(model_or_iterable=WoWClass)

admin_site.register(WoWClass)
admin_site.register(Item, ItemAdmin)
admin_site.register(Group, GroupAdmin)
admin_site.register(Spec, FlaggedSpecsAdmin)
admin_site.register(ConsumeList, FlaggedCLAdmin)

# admin_site.register(model_or_iterable=Item, admin_class=ItemAdmin)

admin_site.register(User, UserAdmin)
