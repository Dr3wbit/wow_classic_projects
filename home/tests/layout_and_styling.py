from .base import FunctionalTest


class LayoutAndStylingTest(FunctionalTest, device):


    def test_layout_and_styling(self):


        self.browser.quit()
        self.setUp({"deviceName": device})

        # self.setUp({
        #     "mobileEmulation": {"deviceMetrics": { "width": width, "height": height, "pixelRatio": 3.0 },
        #     "userAgent": "Mozilla/5.0 (Linux; Android 4.2.1; en-us; Nexus 5 Build/JOP40D) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19"
        # }})

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
