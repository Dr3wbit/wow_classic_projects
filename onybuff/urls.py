"""onybuff URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
	https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
	1. Add an import:  from my_app import views
	2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
	1. Add an import:  from other_app.views import Home
	2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
	1. Import the include() function: from django.urls import include, path
	2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from home.models import Spec, ConsumeList
from home.admin import admin_site
from home import views

admin.site = admin_site
admin.autodiscover()

urlpatterns = [
	path('account/', include('account.urls')),
	path('', include('home.urls')),
	path('admin/', admin.site.urls),
	path('authorize/', include('social_django.urls', namespace='social')),
	path('', views.handler404),
]

handler404 = 'home.views.handler404'
handler500 = 'home.views.handler500'

if settings.DEV:
	import debug_toolbar
	urlpatterns = [
		path('__debug__/', include(debug_toolbar.urls)),
	] + urlpatterns

if not settings.DEBUG and settings.LOCAL:
	from django.views.static import serve
	urlpatterns = [
		re_path(r'^static/(?P<path>.*)$', serve,{'document_root': settings.STATIC_ROOT}),
	] + urlpatterns
