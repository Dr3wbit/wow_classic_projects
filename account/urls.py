from django.urls import path
from . import views
from social_django import views as social_views

app_name = 'account'
urlpatterns = [
    path('', views.AccountView.as_view(), name='profile'),
    path('login', views.LoginView.as_view(), name='login'),
    path('logout', views.LogoutView.as_view(), name='logout'),
]
