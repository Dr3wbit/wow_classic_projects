from django.shortcuts import render
from django.views.generic import DetailView, TemplateView
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import logout

class LoginView(TemplateView):

	template_name = "login.html"


class AccountView(TemplateView):
	template_name = "account.html"

	@method_decorator(login_required)
	def dispatch(self, request, *args, **kwargs):
		dispatch = super().dispatch(request, *args, **kwargs)
		return dispatch


class LogoutView(TemplateView):
	template_name = "logout.html"

	@method_decorator(login_required)
	def dispatch(self, request, *args, **kwargs):
		dispatch = super().dispatch(request, *args, **kwargs)
		logout(request)
		return dispatch


# class SocialSerializer(serializers.Serializer):
#     """
#     Serializer which accepts an OAuth2 access token.
#     """
#     access_token = serializers.CharField(
#         allow_blank=False,
#         trim_whitespace=True,
#     )
