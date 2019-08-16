from django.urls import path,re_path
from . import views


urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('api', views.APIView.as_view(), name='api'),
    path('talent_calc', views.TalentCalcTemplate.as_view(), name='talent_calc'),
    path('talent_calc/<str:class>', views.TalentCalcTemplate.as_view(), name='talents'),
    path('talent_calc/<str:class>/<int:id>', views.TalentCalcTemplate.as_view(), name='talent_helper'),
    path('tc/<int:id>', views.TalentBuilderRedirectView.as_view(), name='talent_builder'),
    path('pt/<int:id>', views.ConsumeBuilderRedirectView.as_view(), name='consume_builder'),
    path('profession_tool', views.ConsumeToolTemplate.as_view(), name='profession_tool'),
    path('profession_tool/<str:prof>', views.ConsumeToolTemplate.as_view(), name='recipes'),
    path('profession_tool/<int:id>', views.ConsumeToolTemplate.as_view(), name='consume_helper'),
    path('profession_tool/<str:prof>/<int:id>', views.ConsumeToolTemplate.as_view(), name='consume_helper'),
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
    path('ajax/apply_filters/', views.apply_filters, name='apply_filters'),
    path('ajax/flag_list/', views.flag_list, name='flag_list'),

    # path('ajax/save_list/', views.save_list, name='save_list'),
    # re_path(r'^test/', views.TalentsRedirectView.as_view(), name='talents_redirect'),
    # re_path(r'^test/(?P<class>[a-z]{5,12})/', views.TalentsRedirectView.as_view(), name='talents_redirect'),
    # path('ajax/talent_builder/', views.talent_builder, name='talent_builder'),
]
