from .base import FunctionalTest, sanitize

class LayoutAndStylingTest(FunctionalTest):

	def test_screen_width(self):

		rect = self.browser.get_window_size()
		self.assertEqual(self.browser.execute_script("return window.innerWidth"), rect['width'])
		self.assertEqual(self.browser.execute_script("return window.innerHeight"), rect['height'])

	def test_element_clickable(self):
		navbar = self.get_navbar()
		pass
