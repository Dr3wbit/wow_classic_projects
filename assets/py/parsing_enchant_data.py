
import json, os, re, urllib.request
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common import exceptions
from selenium.webdriver.common.action_chains import ActionChains

name_catcher = re.compile('\-\s([\w\s]*)$')
name_catcher_v2 = re.compile("Enchant\s\w+\s\-\s([\w ]+)")
effect_finder = re.compile("(\+\d+?)\s([\w]+)\.")
slots = ['bracers', 'boots']
all_enchants = {}
driver = webdriver.Chrome(executable_path=os.path.abspath("chromedriver"))

def sanitize(s):
	a = s.replace(' ', '_')
	b = a.lower()
	return(b)


def check_element_exists_by_css(element, selector):
	try:
		element.find_element(By.CSS_SELECTOR, selector)
	except exceptions.NoSuchElementException:
		print('NoSuchElementException')
		return False
	return True


def main():
	site = input("classicdb or wowhead") or "wowhead"
	get_data(site)
	print("finished\n\n")
	print(all_enchants)


def get_data(site):

	if site=='wowhead':
		BASE_URL = "https://classicdb.ch/?items"
		driver.get(BASE_URL)
		driver.implicitly_wait(5)

		# go = input('page finished loading?')

		for slot in slots:
			all_enchants[slot] = {}

			# search_bar = driver.find_element(By.CSS_SELECTOR, 'span.listview-quicksearch').find_element(By.TAG_NAME, 'input')
			search_bar = driver.find_element(By.ID, 'filter-facet-name')

			search_bar.send_keys(slot)
			search_bar.send_keys(Keys.ENTER)

			driver.implicitly_wait(3)

			# parent = driver.find_element(By.ID, 'tab-recipes').find_element(By.CSS_SELECTOR, 'div.listview-scroller').find_element(By.CSS_SELECTOR, 'table.listview-mode-default').find_element(By.TAG_NAME, 'tbody')
			# rows = driver.find_element(By.ID, 'tab-recipes').find_element(By.CSS_SELECTOR, 'div.listview-scroller').find_element(By.CSS_SELECTOR, 'table.listview-mode-default').find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'tr')

			parent = driver.find_element(By.CSS_SELECTOR, 'div.listview-scroller').find_element(By.CSS_SELECTOR, 'table.listview-mode-default').find_element(By.TAG_NAME, 'tbody')
			rows = parent.find_elements(By.TAG_NAME, 'tr')

			#
			# for k,v in enumerate(range(len(rows))):
			# 	print(k)

			for row in rows:
				row_divs = row.find_elements(By.TAG_NAME, 'td')

				link = row.find_elements(By.TAG_NAME, 'td')[2]
				# link = row_divs[2].find_element(By.TAG_NAME, 'a')
				img = row.find_elements(By.TAG_NAME, 'td')[1].find_element(By.CSS_SELECTOR, 'div.iconmedium')

				ench_text = row.find_elements(By.TAG_NAME, 'td')[2].text
				match = name_catcher_v2.search(ench_text)
				ench_name = sanitize(match.group(1))
				effect = match.group(1)

				all_enchants[slot][ench_name] = {}

				hover = ActionChains(driver).move_to_element(img)
				hover.perform()

				driver.implicitly_wait(1)

				tooltip = driver.find_element(By.CSS_SELECTOR, 'div.wowhead-tooltip').find_element(By.TAG_NAME, 'table').find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'tr')[0].find_element(By.TAG_NAME, 'td').find_element(By.TAG_NAME, 'table')
				description = tooltip.find_element(By.CSS_SELECTOR, 'span.q').text

				all_enchants[slot][ench_name]['description'] = description
				match = effect_finder.search(description)
				if match:
					effect = "{} {}".format(match.group(2), match.group(1))

				all_enchants[slot][ench_name]['effect'] = effect

				ActionChains(driver).reset_actions()

				mat_list = row.find_elements(By.TAG_NAME, 'td')[3].find_elements(By.CSS_SELECTOR, 'div.iconmedium')

				all_enchants[slot][ench_name]['materials'] = {}

				for j,mat in enumerate(mat_list):
					ActionChains(driver).move_to_element(row.find_elements(By.TAG_NAME, 'td')[3].find_elements(By.CSS_SELECTOR, 'div.iconmedium')[j]).perform()
					driver.implicitly_wait(1)

					tooltip_text = driver.find_elements(By.CSS_SELECTOR, 'div.wowhead-tooltip')[0].find_element(By.TAG_NAME, 'table').find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'tr')[0].find_element(By.TAG_NAME, 'td').find_elements(By.TAG_NAME, 'table')[0].find_element(By.TAG_NAME, 'b').text

					# hover_2.perform()
					driver.implicitly_wait(1)

					mat_name = sanitize(tooltip_text)

					quantity = 1

					if check_element_exists_by_css(mat, 'span.glow'):
						quantity = driver.find_element(By.ID, 'tab-recipes').row.find_elements(By.TAG_NAME, 'td')[3].find_elements(By.CSS_SELECTOR, 'div.iconmedium')[j].find_element(By.CSS_SELECTOR, 'span.glow').find_elements(By.TAG_NAME, 'div')[0].text
					ActionChains(driver).reset_actions()

					all_enchants[slot][ench_name]['materials'][mat_name] = quantity
					print(all_enchants)



					# print(mats[0].text)

				print(all_enchants)
				#
				# table = driver.find_element(By.ID, 'spelldetails')
				# rows = table.find_elements(By.TAG_NAME, 'tr')
				# effect = rows[5].find_element(By.CSS_SELECTOR, 'span.q2')
				# all_enchants[slot][ench_name]['effect'] = effect.text
				# driver.back()
				# driver.implicitly_wait(2)

	else:

		for slot in slots:

			all_enchants[slot] = {}

			link_list = []

			search_text = 'Enchant {}'.format(slot.title())
			search_bar = driver.find_element(By.CLASS_NAME, 'search-database')

			search_bar.send_keys(search_text)
			search_bar.send_keys(Keys.ENTER)

			driver.implicitly_wait(3)

			tabs = driver.find_element(By.ID, 'tabs-generic').find_element(By.CSS_SELECTOR, 'div.tabs-levels').find_elements(By.CSS_SELECTOR, 'div.tabs-level')
			tabs[2].find_elements(By.TAG_NAME, 'li')[1].find_element(By.TAG_NAME, 'a').click() # make the spell tab to show
			spell_tab = driver.find_element(By.ID, 'tab-spells')

			ench_rows = spell_tab.find_element(By.CSS_SELECTOR, 'table.listview-mode-default').find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'tr')

			for row in ench_rows:


				tdivs = row.find_elements(By.TAG_NAME, 'td')
				mats_div = tdivs[2]
				this_link = tdivs[1].find_element(By.TAG_NAME, 'a')


				if this_link.text.startswith(search_text) and check_element_exists_by_css(mats_div, 'div'):
					link_list.append(this_link)



			for link in link_list:
				link_text = link.text
				match = name_catcher.search(link_text)
				a = match.group(1)
				ench_name_san = sanitize(a)


				all_enchants[slot][ench_name_san] = {}

				link.click()
				driver.implicitly_wait(3)

				tables = driver.find_elements(By.CSS_SELECTOR, 'table.iconlist')

				rows = tables[0].find_elements(By.TAG_NAME, 'tr')
				all_enchants[slot][ench_name_san]['materials'] = {}


				for tablerow in rows:
					t_head = tablerow.find_element(By.TAG_NAME, 'th')
					parent = t_head.find_element(By.CSS_SELECTOR, 'div.iconsmall')

					quantity = parent.find_element(By.TAG_NAME, 'a').get_attribute('rel')


					# image = parent.find_element(By.TAG_NAME, 'ins')


					mat_name = sanitize(tablerow.find_element(By.TAG_NAME, 'td').find_element(By.TAG_NAME, 'span').find_element(By.TAG_NAME, 'a').text)

					all_enchants[slot][ench_name_san]['materials'][mat_name] = quantity

					description = driver.find_elements(By.CSS_SELECTOR, 'div.tooltip')[1].find_elements(By.TAG_NAME, 'tr')[0].find_elements(By.TAG_NAME, 'table')[-1].find_element(By.CSS_SELECTOR, 'span.q').text
					all_enchants[slot][ench_name_san]['description'] = description
					match = effect_finder.search(description)
					effect = ench_name

					if match:
						effect = match.group(1)

					all_enchants[slot][ench_name_san]['effect'] = effect


				driver.back()
				driver.implicitly_wait(3)




main()


with open('~/Desktop/enchant_data.txt', 'w') as f:
	f.write(all_enchants)

	# for key,val in all_enchants.items():
	# 	f.write()
	# content = f.read()
	# slots = json.loads(content)
