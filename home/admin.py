from django.contrib import admin
from home.models import Item, WoWClass, Spec, ConsumeList
from django.utils import html
from django.conf import settings
from django import forms

QUALITY = {
	"junk": "rgba(157,157,157,1)",
	"common": "rgba(240,255,255,0.95)",
	"uncommon":"rgba(30,255,0,0.95)",
	"rare":"rgba(0, 112, 221, 1)",
	"epic": "rgba(163, 53, 238, 1)",
	"legendary": "rgba(255, 128, 0, 0.95)",
}

admin.site.site_header = 'Onybuff Admin'
admin.site.register(WoWClass)
# admin.site.register(Spec)
# admin.site.register(ConsumeList)

class ItemAdmin(admin.ModelAdmin):
	model = Item
	# change_list_results_template = "change_list_results.html"
	list_display = ('name', 'quality', 'image',)

	# def image(self, obj):
	#     return format_html(
	#         '<img class="icon-medium" src=style="color: #{};">{} {}</span>',
	#         self.color_code,
	#         self.first_name,
	#         self.last_name,
	#     )

	def image(self, obj):
		# format_html_join()
		return html.format_html(
			'<img class="icon-medium" src="{}" style="background-image: url({});">',
			html.format_html(settings.STATIC_URL+"images/icon_border_2.png"),
			html.format_html(settings.STATIC_URL+"images/icons/large/"+obj.img+".jpg"),
	)
	#
	# def image(self, obj):
	# 	return "{}".format(obj.image_name)

	image.short_description = 'Image'

	# def get_list_display(self, request):
	# 	list_display = super().get_list_display(request)
	# 	print('\nlist_display: ', list_display)
	# 	list_display += ('quality', )
	# 	return list_display

	# def colored_name(self):
	# 	color = QUALITY[self.quality]
	# 	return format_html(
	# 		'<span style="color: {};">{}</span>',
	# 		color, self.name
	# 	)
	# colored_name.admin_order_field = 'name'

# print(dir(ItemAdmin))

admin.site.register(Item, ItemAdmin)


# class ItemLocationAdminForm(admin.TabularInline):
#     choice = forms.ChoiceField(choice=(('APPROVE', 'Approve'), ('DENY', 'Deny')))
#
#     class Meta:
#         fields = ['choice']
#
#     def save(self, commit=True):
#         choice = self.cleaned_data['choice']
#
#         instance = super(ItemLocationAdminForm, self).save(commit=False)
# 		instance.visibility = True if choice=='APPROVE' else False
#         if commit:
#             instance.save()
#         return instance
#
# class InlineApproval(admin.TabularInline):
#
# 	def formfield_for_choice_field(self, db_field, request, **kwargs):
#         if db_field.name == "status":
#             kwargs['choices'] = (
#                 ('accepted', 'Accepted'),
#                 ('denied', 'Denied'),
#             )
#             if request.user.is_superuser:
#                 kwargs['choices'] += (('ready', 'Ready for deployment'),)
#         return super().formfield_for_choice_field(db_field, request, **kwargs)

class SpecApprovalForm(forms.ModelForm):


	class Meta:
		STATUS_CHOICES = (
			('TRUE', 'True'),
			('FALSE', 'False'),
		)
		fields = ['user', 'name', 'description', 'visible']
		widgets = {'visible': forms.Select(choices=STATUS_CHOICES)}

	def save(self, *args, **kwargs):
		print('\ndir self: ', dir(self))
		print('\n initial: ', self.initial)
		print('\ndir self.instance: ', dir(self.instance))
		print('\ncleaned: ', self.cleaned_data)
		print(self.cleaned_data['visible'])
		# print('data: ', self.data)

		# print('\nself.fields: ', self.fields)
		# print('\nself.visible_fields: ', self.visible_fields)

		# print('\nargs: ', args)
		# print('\nkwargs: ', kwargs)

		# print('dir self: ', dir(self))


		# print('\nself.instance.name: ', self.instance.name)
		#
		# print('\nself.Meta: ', self.Meta())
		# self.cleaned_data['visible'] =
		# super().save(*args, **kwargs)

class FlaggedSpecsAdmin(admin.ModelAdmin):
	form = SpecApprovalForm
	# class Meta:
		# model = Spec
	# model = Spec
	# def __init__(self, *args, **kwargs):
		# super().__init__(*args, **kwargs)

	def get_changelist_form(self, request, **kwargs):
		return SpecApprovalForm

	def get_queryset(self, request):
		qs = super().get_queryset(request)
		return qs.filter(flagged=True)

	# def resolve(self, obj):
	# 	STATUS_CHOICES = (
	# 		('approved', 'Approve'),
	# 		('denied', 'Deny'),
	# 	)
	#
	# 	resolve = forms.CharField(
	# 		max_length=10,
	# 		widget=forms.Select(choices=STATUS_CHOICES),
	# 	)
	#
	# 	print(dir(resolve))
		# return resolve


	list_display = ('name', 'description', 'user', 'visible',)
	list_editable = ('visible', )
	# readonly_fields = ('user',)

# class FlaggedSpecsAdmin(admin.ModelAdmin):
# 	model = Spec
# 	form = FlaggedSpecForm
# 	list_display = ('name', 'description', 'user',)

	# actions = ['resolve']
	# change_list_results_template = "change_list_results.html"
	# list_display = ('name', 'description', 'user', 'resolve')
	# readonly_fields = ('user',)
	#
	#
	# def get_queryset(self, request):
	# 	qs = super().get_queryset(request)
	# 	return qs.filter(flagged=True)

	# def resolve(self, request):
	# 	return self.form.resolve

	# def get_fieldsets(self, request, obj=None):
	#     fieldsets = super().get_fieldsets(request, obj)
	#
	#     newfieldsets = list(fieldsets)
	#     fields = ['foo', 'bar', 'baz']
	#     newfieldsets.append(['Dynamic Fields', { 'fields': fields }])
	#
	#     return newfieldsets

#
#
# 	# def get_list_display(self, request):
# 	# 	list_display = super().get_list_display(request)
# 	# 	print('\nlist_display: ', list_display)
# 	# 	list_display += ('quality', )
# 	# 	return list_display
#
# 	# def colored_name(self):
# 	# 	color = QUALITY[self.quality]
# 	# 	return format_html(
# 	# 		'<span style="color: {};">{}</span>',
# 	# 		color, self.name
# 	# 	)
# 	# colored_name.admin_order_field = 'name'
#
# # print(dir(ItemAdmin))
#
#
#
admin.site.register(Spec, FlaggedSpecsAdmin)


from django.conf import settings
if not settings.LOCAL:

	from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
	from django.utils.translation import ugettext_lazy as _
	from home.models import User

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

	admin.site.register(User, UserAdmin)
