from .base import FunctionalTest, sanitize
# import re
# from .layout_and_styling import LayoutAndStylingTest

# TODO: create factory for LayoutAndStylingTest and loop through list of devices,
#       where each device counts as a separate test

# DEVICES = [
# 	"iPhone X", "Moto G4", "Galaxy S5", "iPhone 6/7/8", "Pixel 2",
# 	"Pixel 2 XL", "iPhone 6/7/8 Plus", "iPad", "iPad Pro"
# ]


def make_test_function(device):
	def test(self):
		# do stuff
		self.browser.quit()
		self.setUp({"mobileEmulation": {"deviceName": device}})
		self.browser.get(self.server_url)
		rect = self.browser.get_window_size()
		self.assertEqual(self.browser.execute_script("return window.innerWidth"), rect['width'])
		self.assertEqual(self.browser.execute_script("return window.innerHeight"), rect['height'])

	return test

class LayoutAndStylingTest(FunctionalTest):

	devices = ["iPhone X", "Pixel 2", "Galaxy S5"]

	def setup_device_tests(self):
		# print(dir(self))
		for device in self.devices:
			sanitized = sanitize(device)
			test_func = make_test_function(device)
			setattr(self, 'test_layout_and_styling_{0}'.format(sanitized), test_func)



LayoutAndStylingTest.setup_device_tests(LayoutAndStylingTest)


# class DeviceLayoutAndStyling(FunctionalTest):
#
# 	SIZES = [[1024, 768], [360, 640], [1366, 768], [1280, 800]]
# 	DEVICES = [
# 		"iPhone X", "Moto G4", "Galaxy S5", "iPhone 6/7/8", "Pixel 2",
# 		"Pixel 2 XL", "iPhone 6/7/8 Plus", "iPad", "iPad Pro"
# 	]
#
#
# 	def test_layout_and_styling_pixel2(self):
#
# 		self.browser.quit()
# 		self.setUp({"mobileEmulation": {"deviceName": "Pixel 2"}})
#
# 		self.browser.get(self.server_url)
# 		rect = self.browser.get_window_size()
# 		self.assertEqual(self.browser.execute_script("return window.innerWidth"), rect['width'])
# 		self.assertEqual(self.browser.execute_script("return window.innerHeight"), rect['height'])
#
#
# 	def test_layout_and_styling_iphoneX(self):
# 		self.browser.quit()
#
# 		self.setUp({"mobileEmulation": {"deviceName": "iPhone X"}})
# 		self.browser.get(self.server_url)
# 		rect = self.browser.get_window_size()
#
# 		self.assertEqual(self.browser.execute_script("return window.innerWidth"), rect['width'])
# 		self.assertEqual(self.browser.execute_script("return window.innerHeight"), rect['height'])
#
#
# 	def get_sidenav(self):
# 		return self.browser.find_element_by_id('saved_lists')
