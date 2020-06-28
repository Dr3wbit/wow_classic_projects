from .base import FunctionalTest

# TODO: create factory for LayoutAndStylingTest and loop through list of devices,
#       where each device counts as a separate test

class LayoutAndStylingTest(FunctionalTest):

    SIZES = [[1024, 768], [360, 640], [1366, 768], [1280, 800]]
    DEVICES = [
        "iPhone X", "Moto G4", "Galaxy S5", "iPhone 6/7/8", "Pixel 2",
        "Pixel 2 XL", "iPhone 6/7/8 Plus", "iPad", "iPad Pro"
    ]
    def test_layout_and_styling(self):

        for width,height in self.SIZES:
            self.browser.quit()
            self.setUp({
                "mobileEmulation": {"deviceMetrics": { "width": width, "height": height, "pixelRatio": 3.0 },
                "userAgent": "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
            }})

            self.browser.get(self.server_url)

            self.assertEqual(self.browser.execute_script("return window.innerWidth"), width)
            self.assertEqual(self.browser.execute_script("return window.innerHeight"), height)

            # sidenav tests
            # navbar tests
            # saved list tests
            # presence of discord login elements test


        # mobile_emulation = { "deviceName": "Nexus 5" }
        # chrome_options = webdriver.ChromeOptions()
        # chrome_options.add_experimental_option("mobileEmulation", mobile_emulation)
        # driver = webdriver.Chrome(command_executor='http://127.0.0.1:4444/wd/hub', desired_capabilities=chrome_options.to_capabilities())


    def get_sidenav(self):
        return self.browser.find_element_by_id('saved_lists')
