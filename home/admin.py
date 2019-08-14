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



class SpecApprovalForm(forms.ModelForm):

	def has_changed(self, *args, **kwargs):
		return True


	class Meta:
		STATUS_CHOICES = (
			(True, 'ACCEPT'),
			(False, 'DENY'),
		)

		fields = ['user', 'name', 'description', 'visible']
		# visible = forms.ChoiceField(widget=forms.Select(choices=STATUS_CHOICES), initial=False, label="Violating?", required=True)
		widgets = {'visible': forms.Select(choices=STATUS_CHOICES)}

	def save(self, *args, **kwargs):
		data_dict = self.data.dict()
		print('datadict: ', data_dict)
		for x in range(int(data_dict['form-TOTAL_FORMS'])):
			inx = 'form-{}-id'.format(x)
			ix = data_dict[inx]
			spec = Spec.objects.get(id=ix)
			approved_key = 'form-{}-visible'.format(x)
			approved = True if data_dict[approved_key] == 'True' else False
			spec.visible = approved
			spec.flagged = False
			spec.save(force_update=True)
			print(spec.flagged)
		m = super().save(*args, **kwargs)
		return spec

class FlaggedSpecsAdmin(admin.ModelAdmin):
	form = SpecApprovalForm
	# actions = ['update_selected']
	actions = None
	# class Meta:
		# model = Spec
	# model = Spec
	# def __init__(self, *args, **kwargs):
		# super().__init__(*args, **kwargs)

	def get_changelist_form(self, request, **kwargs):
		print(dir(self))
		return SpecApprovalForm

	def get_queryset(self, request):
		qs = super().get_queryset(request)
		return qs.filter(flagged=True)

	# def update_selected(self, request, queryset):
	# 	print('\nself: ', dir(self))
	# 	print('\nrequest: ', dir(request))
	# 	print(request.POST)
	# 	for obj in queryset:
	# 		print(dir(obj))
	# 		print(obj)

		# if rows_updated == 1:
		#     message_bit = "1 story was"
		# else:
		#     message_bit = "%s stories were" % rows_updated
		# self.message_user(request, "wilddaddy")

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
	readonly_fields = ('user',)

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
