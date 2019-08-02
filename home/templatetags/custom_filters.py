from django import template
from django.template.defaultfilters import stringfilter

from home.models import Spec, ConsumeList
import re

nope = re.compile(r"[\-]")
forbiden = re.compile(r"[\:\'\(\)]")

register = template.Library()

@register.filter
@stringfilter
def titlecase(s):
	word_exceptions = ['of', 'the']
	a = s.replace('_', ' ')
	word_list = a.split()

	for i,word in enumerate(word_list):
		if word not in word_exceptions:
			word_list[i] = word.title()

	c = ' '.join(word_list)
	return(c)

@register.filter
@stringfilter
def sanitize(s):
	a = forbiden.sub('', s)
	a = nope.sub(' ', a).strip().replace(' ', '_').lower()
	return(a)


@register.simple_tag
def has_voted(id, email, spec):
	if bool(spec):
		saved_list = Spec.objects.get(id=id)
	else:
		saved_list = ConsumeList.objects.get(id=id)

	return saved_list.has_voted(email)
