from social_core.backends.oauth import BaseOAuth2, DiscordOAuth2

# example
class GitHubOAuth2(BaseOAuth2):
	"""Github OAuth authentication backend"""
	name = 'github'
	AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize'
	ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token'
	SCOPE_SEPARATOR = ','
	EXTRA_DATA = [
		('id', 'id'),
		('expires', 'expires')
	]

	def get_user_details(self, response):
		"""Return user details from GitHub account"""
		return {'username': response.get('login'),
				'email': response.get('email') or '',
				'first_name': response.get('name')}

	def user_data(self, access_token, *args, **kwargs):
		"""Loads user data from service"""
		url = 'https://api.github.com/user?' + urlencode({
			'access_token': access_token
		})
		return self.get_json(url)

#
# class DiscordOAuth2(BaseOAuth2):
# 	"""Discord OAuth authentication backend"""
# 	name = 'discord'
# 	AUTHORIZATION_URL = 'https://discordapp.com/api/oauth2/authorize'
# 	ACCESS_TOKEN_URL = 'https://discordapp.com/api/oauth2/token'
# 	SCOPE_SEPARATOR = "%20"
# 	REQUIRES_EMAIL_VALIDATION = True
# 	EXTRA_DATA = [
# 		('id', 'id'),
# 		('expires', 'expires')
# 	]
#
# 	def get_user_details(self, response):
# 		"""Return user details from GitHub account"""
# 		return {'username': response.get('login'),
# 				'email': response.get('email') or '',
# 				'first_name': response.get('name')}
#
# 	def user_data(self, access_token, *args, **kwargs):
# 		"""Loads user data from service"""
# 		url = 'https://discordapp.com/api/v6?' + urlencode({
# 			'access_token': access_token
# 		})
# 		return self.get_json(url)
#
#
#
# 	# example from: https://discordapp.com/developers/docs/topics/oauth2
# 	API_ENDPOINT = 'https://discordapp.com/api/v6'
# 	CLIENT_ID = '332269999912132097'
# 	CLIENT_SECRET = '937it3ow87i4ery69876wqire'
# 	REDIRECT_URI = 'https://nicememe.website'
#
# 	def exchange_code(code):
# 		data = {
# 			'client_id': CLIENT_ID,
# 			'client_secret': CLIENT_SECRET,
# 			'grant_type': 'authorization_code',
# 			'code': code,
# 			'redirect_uri': REDIRECT_URI,
# 			'scope': 'identify email connections'
# 			 }
# 	  headers = {
# 		  'Content-Type': 'application/x-www-form-urlencoded'
# 	  }
# 	  r = requests.post('%s/oauth2/token' % API_ENDPOINT, data=data, headers=headers)
# 	  r.raise_for_status()
# 	  return r.json()
#
#
#
#
# 	# https://discordapp.com/developers/docs/topics/oauth2
# 	DISCORD_SOCIAL_LOGIN_URL="https://discordapp.com/api/oauth2/authorize?client_id=366621423554265108&redirect_uri=https%3A%2F%2Fonybuff.org%2Flogin&response_type=code&scope=identify%20email"
#
# 	# FROM THE EXAMPLE:
# 	DISCORD_CLIENT_ID = "366621423554265108"
# 	REDIRECT_URI = "http%3A%2F%2Fminecraft.devdungeon.com:8000/discord_oauth"
# 	DISCORD_SCOPE = "identify%20email&state=1010101101010101010"
# 	DISCORD_BASE_AUTH_URL = 'https://discordapp.com/api/oauth2/authorize'
# 	DISCORD_TOKEN_URL = 'https://discordapp.com/api/oauth2/token'
# 	DISCORD_SOCIAL_LOGIN_URL = DISCORD_BASE_AUTH_URL+"?response_type=code&client_id="+DISCORD_CLIENT_ID+"&scope="+DISCORD_SCOPE+"&redirect_uri="+REDIRECT_URI
#
# 	# to find secret key, go to: https://discordapp.com/developers/applications/366621423554265108/information
# 	# os.environ['DISCORD_CLIENT_SECRET']
# 	DISCORD_CLIENT_SECRET = ""
#
# 	LOGIN_URL = '/account/login'  # Where you get sent when login is required
# 	LOGIN_REDIRECT_URL = '/'  # Where you get forwarded after logging in
#
#
#
# """
# Discord Auth OAuth2 backend, docs at:
#     https://discordapp.com/developers/docs/topics/oauth2
# """
# from social_core.backends.oauth import BaseOAuth2
# import os
#
# class DiscordOAuth2(BaseOAuth2):
#     name = 'discord'
#     AUTHORIZATION_URL = 'https://discordapp.com/api/oauth2/authorize'
#     ACCESS_TOKEN_URL = 'https://discordapp.com/api/oauth2/token'
#     ACCESS_TOKEN_METHOD = 'POST'
#     REVOKE_TOKEN_URL = 'https://discordapp.com/api/oauth2/token/revoke'
#     REVOKE_TOKEN_METHOD = 'GET'
#     DEFAULT_SCOPE = ['email']
#     SCOPE_SEPARATOR = '+'
#     REDIRECT_STATE = False
#     EXTRA_DATA = [
#         ('expires_in', 'expires'),
#         ('refresh_token', 'refresh_token')
#     ]
#
#     def get_user_details(self, response):
#         return {'username': response.get('username'),
#                 'email': response.get('email') or ''}
#
#     def user_data(self, access_token, *args, **kwargs):
#         url = 'https://discordapp.com/api/users/@me'
#         auth_header = {"Authorization": "Bearer %s" % access_token}
#         return self.get_json(url, headers=auth_header)
