from django.urls import path,re_path
from . import views


urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    # path('test', views.TalentsRedirectView.as_view(), name='talents_redirect'),
    path('talent_calc', views.TalentCalcTemplate.as_view(), name='talent_calc'),
    path('consume_tool', views.ConsumeToolTemplate.as_view(), name='consume_tool'),
    path('enchant_tool', views.EnchantToolView.as_view(), name='enchant_tool'),
    path('specs_and_guides', views.SpecsAndGuidesView.as_view(), name='specs_and_guides'),
    path('talent_calc/<str:class>', views.TalentCalcTemplate.as_view(), name='talents'),
    path('contact', views.ContactView.as_view(), name='contact'),
    path('success', views.SuccessView.as_view(), name='success'),
    path('consume_tool/<str:prof>', views.ConsumeToolTemplate.as_view(), name='consumes'),
    path('ajax/delete_list/', views.delete_list, name='delete_list'),
    path('ajax/load_spec/', views.load_spec, name='load_spec'),
    path('ajax/save_spec/', views.save_spec, name='save_spec'),
    # re_path(r'^test/', views.TalentsRedirectView.as_view(), name='talents_redirect'),
    # re_path(r'^test/(?P<class>[a-z]{5,12})/', views.TalentsRedirectView.as_view(), name='talents_redirect'),
    # path('ajax/talent_builder/', views.talent_builder, name='talent_builder'),
]
