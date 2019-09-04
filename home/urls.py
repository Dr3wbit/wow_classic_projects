from django.urls import path, re_path
from . import views
import re

profession_re = r'^profession_tool/(?P<prof>(alchemy|blacksmithing|first_aid|enchanting|engineering|cooking|skinning|mining|other|tailoring|leatherworking|riding|fishing|herbalism))'
class_re = r'^talent_calc/(?P<class>(paladin|priest|hunter|mage|rogue|shaman|warrior|warlock|druid))'
id_re = r'/(?P<id>[\d]+)'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('api', views.APIView.as_view(), name='api'),
    path('talent_calc', views.TalentCalcTemplate.as_view(), name='talent_calc'),
    re_path(class_re+r'$', views.TalentCalcTemplate.as_view(), name='talents'),
    re_path(class_re+id_re+r'$', views.TalentCalcTemplate.as_view(), name='talent_helper'),
    path('tc/<int:id>', views.TalentBuilderRedirectView.as_view(), name='talent_builder'),
    path('pt/<int:id>', views.ConsumeBuilderRedirectView.as_view(), name='consume_builder'),
    path('profession_tool', views.ConsumeToolTemplate.as_view(), name='profession_tool'),
    re_path(profession_re+r'$', views.ConsumeToolTemplate.as_view(), name='recipes'),
    re_path(r'^profession_tool'+id_re, views.ConsumeToolTemplate.as_view(), name='consume_helper'),
    re_path(profession_re+id_re, views.ConsumeToolTemplate.as_view(), name='consume_helper'),
    path('enchant_tool', views.EnchantToolView.as_view(), name='enchant_tool'),
    path('specs_and_guides', views.SpecsAndGuidesView.as_view(), name='specs_and_guides'),
    path('contact', views.ContactView.as_view(), name='contact'),
    path('success', views.SuccessView.as_view(), name='success'),
    path('ajax/delete_list/', views.delete_list, name='delete_list'),
    path('ajax/load_spec/', views.load_spec, name='load_spec'),
    path('ajax/save_rating/', views.save_rating, name='save_rating'),
    path('ajax/delete_rating/', views.delete_rating, name='delete_rating'),
    path('ajax/savedlist_info/', views.savedlist_info, name='savedlist_info'),
    path('thanks', views.ThanksView.as_view(), name='thanks'),
    path('denied', views.DeniedView.as_view(), name='denied'),
    path('ajax/tooltip/', views.ajax_tooltip, name='ajax_tooltip'),
    path('ajax/yeet_cannon/', views.yeet_cannon, name='yeet_cannon'),
    path('ajax/flag_list/', views.flag_list, name='flag_list'),
    path('ajax/icon_list/', views.icon_list, name='icon_list'),
    path('ajax/update_icon/', views.update_icon, name='update_icon'),
]
