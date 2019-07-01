from home.models import Profile
from django import template
from django.contrib.auth import models

register = template.Library()

def add_navlinks_to_context(request):
	context = {}
	context['nav_items'] = {
		"specs_and_guides": "Specs & Guides", "talent_calc": "Talent Calculator",
		"consume_tool": "Consumable Tool", "enchant_tool": "Enchant Tool",
		"contact": "Contact"
		}
	# print(request.user)
	context['profile'] = Profile.objects.get(email=request.user.email) if not request.user.is_anonymous else models.AnonymousUser

	# context['profile'] = Profile.objects.get()
	# print('request: ', request)
	# print(request.content_params)
	# print('meta: ', request.META)

	return context


# returning each saved list as a (query) string
# @register.simple_tag
# def saved_list_url(value, field_name, urlencode=None):
# 	url = '?{}={}'.format(field_name, value)
# 	if urlencode:
# 		querystring = urlencode.split('&')
# 		filtered_querystring = filter(lambda p: p.split('=')[0] != field_name, querystring)
# 		encoded_querystring = '&'.join(filtered_querystring)
# 		url = '{}&{}'.format(url, encoded_querystring)
# 	return url
