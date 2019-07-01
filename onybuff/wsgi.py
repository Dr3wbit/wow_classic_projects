"""
WSGI config for onybuff project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'onybuff.settings')

application = get_wsgi_application()

# maybe neccessary, see: https://github.com/benoitc/gunicorn/issues/1766#issuecomment-414408026
# secure_scheme_headers = {'X-FORWARDED-PROTOCOL': 'https', 'X-FORWARDED-PROTO': 'https', 'X-FORWARDED-SSL': 'on'}
