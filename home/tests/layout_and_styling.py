from .base import FunctionalTest, sanitize
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys


class LayoutAndStylingTest(FunctionalTest):

	def test_screen_dimensions(self):

		rect = self.browser.get_window_size()
		self.assertEqual(self.browser.execute_script("return window.innerWidth"), rect['width'])
		self.assertEqual(self.browser.execute_script("return window.innerHeight"), rect['height'])


	def test_can_click_filter(self):
		self.wait_for(lambda: self.browser.find_elements_by_css_selector("#dropdownFilterLink"))
		ActionChains(self.browser).send_keys(Keys.ESCAPE).perform()
		# self.browser.send_keys(Keys.ESCAPE)
		filter = self.browser.find_element_by_css_selector("#dropdownFilterLink")
		filter.click()

		self.wait_for(lambda: self.browswer.find_element_by_name("Hunter"))
		hunter = self.browswer.find_element_by_name("Hunter")
		self.assertEqual(hunter.is_visible(), True)

		# self.browser.get()
	#
	# def test_element_clickable(self):
	# 	navbar = self.get_navbar()
	# 	pass
