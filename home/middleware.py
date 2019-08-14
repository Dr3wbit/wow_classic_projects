from social_django.middleware import SocialAuthExceptionMiddleware
from social_core import exceptions as social_exceptions
from django.http import HttpResponse

class SocialAuthCancelledMiddleware(SocialAuthExceptionMiddleware):

	def get_redirect_uri(self, request, exception):
		print('get_redirect_uri')
		if exception == 'AuthCanceled':
			print('exception: ', exception)
		return '/'
