import os, re, sys, time
from datetime import datetime
from django.conf import settings
from django.db import connections
from django.contrib.staticfiles.testing import StaticLiveServerTestCase
from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from home.urls import urlpatterns

# from .server_tools import reset_database
# from .server_tools import create_session_on_server
# from .management.commands.create_session import create_pre_authenticated_session

MAX_WAIT = 10

def sanitize(s):

	nope = re.compile(r"[\-]")
	forbidden = re.compile(r"[\:\'\(\)]")

	a = forbidden.sub('', str(s))
	a = nope.sub(' ', a).strip().replace(' ', '_').lower()

	return(a)

def wait(fn):
	def modified_fn(*args, **kwargs):
		start_time = time.time()
		while True:
			try:
				return fn(*args, **kwargs)
			except (AssertionError, WebDriverException) as e:
				if time.time() - start_time > MAX_WAIT:
					raise e
				time.sleep(0.5)
	return modified_fn

def close_db_connections(func, *args, **kwargs):
	# NOTE: when encounter following error:
	# django.db.utils.OperationalError: database "test_devdevdjango" is being accessed by other users
	# DETAIL:  There is 1 other session using the database.
	# run the following
	# postgres=# drop database test_databasename;
	# brew services restart postgres

	"""
	Decorator to explicitly close db connections during threaded execution
	Note this is necessary to work around:
	https://code.djangoproject.com/ticket/22420
	"""
	def _close_db_connections(*args, **kwargs):
		ret = None
		try:
			ret = func(*args, **kwargs)
		finally:
			for conn in connections.all():
				conn.close()
		return ret
	return _close_db_connections

SCREEN_DUMP_LOCATION = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'screendumps')


class FunctionalTest(StaticLiveServerTestCase):
	# fixtures = ['home.json']
	device = ''

	## needs to somehow inherit deviceName
	@classmethod
	def setUpClass(cls):

		super().setUpClass()
		cls.chrome_options = Options()
		if cls.device:
			cls.chrome_options.add_experimental_option("mobileEmulation", {"deviceName": cls.device})

		cls.server_url = cls.live_server_url


	@close_db_connections
	def setUp(self):
		# ContentType.objects.clear_cache()

		self.browser = webdriver.Chrome(executable_path=os.path.join(os.path.dirname(os.path.abspath(__file__)), 'drivers/chromedriver'), chrome_options=self.chrome_options)
		self.browser.get(self.server_url)

	@close_db_connections
	def tearDown(self):
		# ContentType.objects.clear_cache()
		if self._test_has_failed():
			if not os.path.exists(SCREEN_DUMP_LOCATION):
				os.makedirs(SCREEN_DUMP_LOCATION)
			for ix, handle in enumerate(self.browser.window_handles):
				self._windowid = ix
				self.browser.switch_to_window(handle)
				self.take_screenshot()
				self.dump_html()
		self.browser.quit()
		super().tearDown()




	def _test_has_failed(self):
		return any(error for (method, error) in self._outcome.errors)

	def take_screenshot(self):
		filename = self._get_filename() + '.png'
		self.browser.get_screenshot_as_file(filename)


	def dump_html(self):
		filename = self._get_filename() + '.html'
		with open(filename, 'w') as f:
			f.write(self.browser.page_source)


	def _get_filename(self):
		timestamp = datetime.now().isoformat().replace(':', '.')[:19]
		return '{folder}/{classname}.{method}-window{windowid}-{timestamp}'.format(
			folder=SCREEN_DUMP_LOCATION,
			classname=self.__class__.__name__,
			method=self._testMethodName,
			windowid=self._windowid,
			timestamp=timestamp
		)

	@wait
	def wait_for(self, fn):
		return fn()

	def titlecase(self, s):
		word_exceptions = ['of', 'the']
		a = s.replace('_', ' ')
		word_list = a.split()

		for i,word in enumerate(word_list):
			if word not in word_exceptions:
				word_list[i] = word.title()

		c = ' '.join(word_list)
		return(c)

	def get_navbar(self):
		return self.browser.find_element_by_id('navbarSupportedContent')

	def get_urls(self):
		return urlpatterns

	# def add_list_item(self, item_text):
	#     num_rows = len(self.browser.find_elements_by_css_selector('#id_list_table tr'))
	#     self.get_item_input_box().send_keys(item_text)
	#     self.get_item_input_box().send_keys(Keys.ENTER)
	#     item_number = num_rows + 1
	#     self.wait_for_row_in_list_table(
	#         '{}: {}'.format(item_number, item_text)
	#     )


	# @wait
	# def wait_to_be_logged_in(self, email):
	#     self.browser.find_element_by_link_text('Log out')
	#     navbar = self.browser.find_element_by_css_selector('.navbar')
	#     self.assertIn(email, navbar.text)


	# @wait
	# def wait_to_be_logged_out(self, email):
	#     self.browser.find_element_by_name('email')
	#     navbar = self.browser.find_element_by_css_selector('.navbar')
	#     self.assertNotIn(email, navbar.text)


	# def create_pre_authenticated_session(self, email):
	#     if self.against_staging:
	#         session_key = create_session_on_server(self.server_host, email)
	#     else:
	#         session_key = create_pre_authenticated_session(email)
	#     ## to set a cookie we need to first visit the domain.
	#     ## 404 pages load the quickest!
	#     self.browser.get(self.server_url + "/404_no_such_url/")
	#     self.browser.add_cookie(dict(
	#         name=settings.SESSION_COOKIE_NAME,
	#         value=session_key,
	#         path='/',
	#     ))
