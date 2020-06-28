from .base import FunctionalTest
from django.urls import reverse, URLPattern

class PageNavigationTest(FunctionalTest):

    def test_page_navigation(self):

        urls = self.get_urls()

        for url in urls:
            # For now, perform only GET requests and ignore URLs that need arguments.
            # print(dir(url))
            if not isinstance(url, URLPattern) or url.pattern.regex.groups or not url.name or not url.name.startswith('ajax'):
                continue

            urlpath = reverse(url.name)

            self.browser.get(self.server_url + urlpath)
            self.wait_for(lambda: self.browser.find_element_by_css_selector(
                'a.navbar-brand'
            ))

            self.assertEqual(self.titlecase(urlpath), self.browser.title())
