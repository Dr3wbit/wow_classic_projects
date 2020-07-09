from .base import FunctionalTest, sanitize

class LayoutAndStylingTest(FunctionalTest):

	def test_screen_width(self):

		rect = self.browser.get_window_size()
		self.assertEqual(self.browser.execute_script("return window.innerWidth"), rect['width'])

	def test_screen_height(self):

		rect = self.browser.get_window_size()
		self.assertEqual(self.browser.execute_script("return window.innerHeight"), rect['height'])


	def test_can_click_filter(self):
		self.wait_for(lambda: self.browser.find_elements_by_css_selector(
            "#dropdownFilterLink"
        ))
		filter = self.browser.find_element_by_css_selector("#dropdownFilterLink")
		filter.click()

		hunter = filter.find_element_by_name("Hunter")
		self.assertEqual(hunter.is_visible(), True)

		# self.browser.get()
	#
	# def test_element_clickable(self):
	# 	navbar = self.get_navbar()
	# 	pass
