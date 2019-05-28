
import os, re, urllib.request, json
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time
from selenium.common import exceptions

driver = webdriver.Chrome(executable_path=os.path.abspath("chromedriver"))

prof_text = {'Fished':'fishing', 'Gathered':'herbalism', 'Mined':'mining',
			'Disenchanted':'enchanting', 'Skinned':'skinning'}

other_text = {'Dropped': 'drop', 'Sold': 'vendor'}

image_size = 'medium'

r1 = re.compile(r'spell=[\d]+?\/([\w\-]+)', re.M)
get_img_name = re.compile(r"medium\/([\w]+\.jpg)")
get_url = re.compile(r'url\(\"(https://wow\.zamimg\.com.+?\.jpg)', re.M)
class_from_url = re.compile(r"url\(\"(https://wow\.zamimg\.com.+?\/class\_(\w+)\.jpg)", re.M)
icon_re = re.compile(r"'(\w*)'")
item_grabber = re.compile(r"item\=(\d+)")
p = re.compile(r'\-')
space_replacer = re.compile(r'\s')
numberRE = re.compile(r"(\d+)")
get_profRE = re.compile(r"([a-z ]+)([ \d]*)", re.I)

word_exceptions = ['of', 'the']

materials_list_filename = "all_materials_list.txt"
consumes_list_filename = "consume_parse_list.txt"
all_consumes_json_file = "all_consumes_json.js"
all_materials_json_file = "all_materials_json.js"
DOWNLOAD_URL = "https://wow.zamimg.com/images/wow/icons/small/"

all_consumes = ''
materials_list = ''
all_materials = ''

with open(all_materials_json_file, 'r') as f:
	all_materials = json.load(f)

with open(all_consumes_json_file, 'r') as f:
	all_consumes = json.load(f)

with open(materials_list_filename, 'r') as f:
	content = f.read()
	materials_list = content.split()




with open(consumes_list_filename, 'r') as f:
	content = f.read()
	consumes_list = content.split()


def main():
	# image_size = input("image size (small / medium / large )") or 'small'
	# image_size = 'small'


	choice = 'wowhead'
	if choice == 'classicdb':
		use_classicdb()
	else:
		use_wowhead()



	with open(all_materials_json_file, 'w') as f:
		json.dump(all_materials, f, indent=4)

	with open(all_consumes_json_file, 'w') as f:
		json.dump(all_consumes, f, indent=4)

	with open(materials_list_filename, 'w') as f:
			for item in materials_list:
				f.write(item+"\n")




def title_case(s):
	a = s.replace('_', ' ')
	word_list = a.split()

	for i,word in enumerate(word_list):
		if word not in word_exceptions:
			word_list[i] = word.title()

	c = ' '.join(word_list)
	return(c)

def sanitize(s):
	a = s.strip().replace(' ', '_')
	a = a.replace('\n', '')
	b = a.lower()
	return(b)

def get_rarity(class_name):
	rarity = ''
	if class_name == 'q1':
		 rarity = 'common'
	elif class_name == 'q2':
		rarity = 'uncommon'
	elif class_name == 'q3':
		rarity = 'rare'
	else:
		rarity = 'epic'
	return rarity


def use_classicdb():
	BASE_URL = "https://classicdb.ch/?items"
	driver.get(BASE_URL)
	driver.implicitly_wait(5)
	try:
		if choice == 'materials':
			# materials_list_filename = input('enter filepath for list of icons to be downloaded') or "icon_download_list.txt"
			for item in materials_list:

				try:
					driver.implicitly_wait(3)

					search_bar = driver.find_element(By.CLASS_NAME, 'search-database')
					search_bar.send_keys(item)
					search_bar.send_keys(Keys.ENTER)

					# try:
					h1 = driver.find_elements(By.CSS_SELECTOR, 'h1')
					found_search = False

					for text in h1:
						## look for the presence of 'search' in h1 elements
						## don't immediately act if we find it (would cause issues)
						search_text = text.get_attribute("textContent")
						# print(search_text)

						if 'Search' in search_text:
							found_search = True


					if found_search:
						a = title_case(item)

						b = driver.find_element(By.LINK_TEXT, a)
						b.click()

					driver.implicitly_wait(3)

					tab_parent = driver.find_element(By.CSS_SELECTOR, 'ul.tabs')
					tabs = tab_parent.find_elements(By.TAG_NAME, 'li')

					is_prof = False
					folder_name = ''

					for tab in tabs:
						div = tab.find_element(By.TAG_NAME, 'div')
						tab_text = div.get_attribute('textContent')

						if tab_text.startswith(tuple(prof_text.keys())):
							is_prof = True
							key = tab_text.split()[0]
							folder_name = prof_text[key]


						elif ((not folder_name and not is_prof) and tab_text.startswith(tuple(other_text.keys()))):

							key = tab_text.split()[0]
							folder_name = other_text[key]

						elif not folder_name and not is_prof:
							folder_name = 'other'

					driver.implicitly_wait(1)
					a = driver.find_elements(By.CSS_SELECTOR, 'div.tooltip')[0].find_element(By.TAG_NAME, 'tr').find_element(By.TAG_NAME, 'table').find_element(By.TAG_NAME, 'td')
					b = a.find_element(By.TAG_NAME, 'b')

					class_name = b.get_attribute('class')

					if (sanitize(item) not in all_materials.keys()):
						sanitzed_name = sanitize(item)

						all_materials[item] = {}

						all_materials[item]['category'] = folder_name
						all_materials[item]['rarity'] = get_rarity(class_name)



					icon = driver.find_element(By.CSS_SELECTOR, "div#minibox + div")

					icon_match = icon_re.search(icon.get_attribute("onclick"))
					icon_name = icon_match.group(1)

					folder_path = "../images/icons/medium/materials/"+folder_name

					full_path = folder_path+"/"+item+".jpg"

					if not os.path.exists(folder_path):
						os.makedirs(folder_path)

					if os.path.exists(full_path):
						materials_list_copy.remove(item)
						continue



					img_url = "https://classicdb.ch/images/icons/"+image_size+"/"+icon_name+".jpg"
					urllib.request.urlretrieve(img_url, full_path)

					materials_list_copy.remove(item)

				except exceptions.NoSuchElementException as e:
					print(e)

			driver.close()
	except:
		print('error')

def use_wowhead():
	BASE_URL = "https://classic.wowhead.com/search?q=%27"
	driver.get(BASE_URL)
	driver.implicitly_wait(5)
	link_list = []
	driver.implicitly_wait(5)
	for item in consumes_list:
		try:
			if item not in all_consumes.keys():
				all_consumes[item] = {}

				# if all_consumes[item]

				search_bar = driver.find_element(By.CSS_SELECTOR, 'div.header-search').find_element(By.TAG_NAME, 'input')
				search_bar.clear()
				search_text = title_case(item)
				print('search_text: ', search_text)
				search_bar.send_keys(search_text)
				search_bar.send_keys(Keys.ENTER)
				driver.implicitly_wait(3)

				selected_tab = driver.find_element(By.CSS_SELECTOR, 'a.selected')

				if not selected_tab.text.startswith('Items'):
					tabs = driver.find_element(By.CSS_SELECTOR, 'div.tabs-container').find_element(By.CSS_SELECTOR, 'ul.tabs').find_elements(By.TAG_NAME, 'li')
					for tab in tabs:
						this_link = tab.find_element(By.TAG_NAME, 'a')
						tab_text = this_link.find_element(By.TAG_NAME, 'div').text
						if tab_text.startswith('Items'):
							this_link.click()
							driver.implicitly_wait(2)


				parent = driver.find_element(By.CSS_SELECTOR, 'div.listview-scroller').find_element(By.CSS_SELECTOR, 'table.listview-mode-default').find_element(By.TAG_NAME, 'tbody')
				rows = parent.find_elements(By.TAG_NAME, 'tr')

				for row in rows:
					link = row.find_elements(By.TAG_NAME, 'td')[2].find_element(By.TAG_NAME, 'a')
					if link.text == search_text:
						my_link = link.get_attribute('href')

						link_list.append(my_link)
						all_consumes[item]['url'] = my_link
			else:
				print('{} URL found, next'.format(item))
				link_list.append(all_consumes[item]['url'])

		except:
			print('error')
			print('number of links: ', len(link_list))

		# print('number of links: ', len(link_list))
				# if 'url' in all_consumes[item].keys():

			# else if not all_consumes[item]['url']:


	for link in link_list:
		try:
			match = item_grabber.search(link)

			if not match:
				print('no match')
				continue

			else:
				item_number = match.group(1)
				this_link = "https://classicdb.ch/?item="+str(item_number)+"#created-by"
				driver.get(this_link)
				driver.implicitly_wait(3)


			tables = driver.find_elements(By.CSS_SELECTOR, 'div.tooltip')[-1].find_element(By.TAG_NAME, 'table').find_element(By.TAG_NAME, 'tbody').find_element(By.TAG_NAME, 'tr').find_element(By.TAG_NAME, 'td').find_elements(By.TAG_NAME, 'table')
			b = tables[0].find_element(By.TAG_NAME, 'b')
			class_name = b.get_attribute('class')
			all_consumes[item]['rarity'] = get_rarity(class_name)

			item_name = b.text
			item = sanitize(item_name)

			print('Now searching for: {}'.format(item_name))

			whole_text = tables[0].find_element(By.TAG_NAME, 'td').text
			new_text = whole_text.replace(item_name, '')
			if new_text.startswith('Binds'):
				all_consumes[item]['bop'] = True

			if new_text.endswith('Unique'):
				all_consumes[item]['unique'] = True


			if 'Requires' in new_text:
				match = numberRE.search(new_text)
				req_lvl = match.group(1)
				if 'Engineering' in new_text:

					all_consumes[item]['req'] = 'engineering_{}'.format(req_lvl)
				else:
					all_consumes[item]['req'] = req_lvl

			spans = tables[-1].find_elements(By.TAG_NAME, 'span')

			# print(item_name, ' spans: ', len(spans))

			if len(spans) > 1:
				old_text = spans[0].text
				all_consumes[item]['description'] = spans[1].text

			else:

				old_text = tables[-1].text

			# print(item_name, ' use: ', old_text)

			use = old_text.replace('Use: ', '')
			all_consumes[item]['use'] = use

			tab_parent = driver.find_elements(By.CSS_SELECTOR, 'ul.tabs')[0]
			tabs = tab_parent.find_elements(By.TAG_NAME, 'li')

			tab_found = False
			created_tab = driver.find_element(By.ID, 'tab-created-by')
			# for tab in tabs:
			# 	print('tab text:', tab.text)
			# 	if tab.text.startswith('Created'):
			# 		tab_found = True
			# 		tab_link = tab.find_element(By.TAG_NAME, 'a')
			# 		found_tab = tab_link
			# 		print('Found tab')
			# 		continue

					# if tab_link.get_attribute('class') != 'selected':

			#
			# if tab_found:
			# 	found_tab.click()
			# 	driver.implicitly_wait(1)

			if not (all_consumes[item]['materials']):
				all_consumes[item]['materials'] = {}

			created_tab = driver.find_element(By.ID, 'tab-created-by')
			materials = created_tab.find_element(By.CSS_SELECTOR, 'table.listview-mode-default').find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'td')[2].find_elements(By.CSS_SELECTOR, 'div.iconmedium')
			t = created_tab.find_element(By.CSS_SELECTOR, 'table.listview-mode-default').find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'td')[3].text
			match = get_profRE.search(t)
			if match:
				all_consumes[item]['profession'] = lower(match.group(1))

			for mat in materials:

				mat_link = mat.find_element(By.TAG_NAME, 'a')
				quantity = mat_link.get_attribute('rel')
				layers = driver.find_element(By.ID, 'layers')

				tooltip = driver.find_elements(By.CSS_SELECTOR, 'div.tooltip')[0]

				ActionChains(driver).move_to_element(mat).perform()


				time.sleep(0.5)

				tooltip = layers.find_element(By.CSS_SELECTOR, 'div.tooltip')

				this_mat = tooltip.find_element(By.TAG_NAME, 'table').find_element(By.TAG_NAME, 'tbody').find_element(By.TAG_NAME, 'tr').find_element(By.TAG_NAME, 'table').find_element(By.TAG_NAME, 'b')
				mat_name = sanitize(this_mat.text)
				class_name = this_mat.get_attribute('class')

				all_consumes[item]['materials'][mat_name] = quantity

				print(mat_name, ':', quantity)
				if mat_name not in materials_list:
					materials_list.append(mat_name)

				if mat_name not in all_materials.keys():

					print('new material added: ', mat_name)

					all_materials[mat_name] = {}
					all_materials[mat_name]['rarity'] = get_rarity(class_name)

					mat_link.click()

					driver.implicitly_wait(2)

					tab_parent = driver.find_element(By.CSS_SELECTOR, 'ul.tabs')
					tabs = tab_parent.find_elements(By.TAG_NAME, 'li')

					is_prof = False
					category = ''

					for tab in tabs:
						div = tab.find_element(By.TAG_NAME, 'div')
						tab_text = div.get_attribute('textContent')

						if tab_text.startswith(tuple(prof_text.keys())):
							is_prof = True
							key = tab_text.split()[0]
							category = prof_text[key]
							break

						elif ((not category and not is_prof) and tab_text.startswith(tuple(other_text.keys()))):
							key = tab_text.split()[0]
							category = other_text[key]
							break

						elif not category and not is_prof:
							category = 'other'

					all_materials[mat_name]['category'] = category


				filepath = "../images/icons/small/materials/"+all_materials[mat_name]['category']+"/"+mat_name+".jpg"


				if not os.path.exists(filepath):


					style = mat.find_element(By.TAG_NAME, 'ins').get_attribute('style')
					match = get_img_name.search(style)
					if match:
						file_name = match.group(1)
						img_url = DOWNLOAD_URL+file_name
						urllib.request.urlretrieve(img_url, filepath)




		except:
			print('error with {}'.format(link))




def get_images():
	class_icons_parent = driver.find_element(By.CLASS_NAME, 'ctc-classes-inner')
	class_icons = class_icons_parent.find_elements(By.CLASS_NAME, 'iconmedium')
	talent_trees_container = driver.find_element(By.CLASS_NAME, 'ctc-tree-container')
	talent_trees = talent_trees_container.find_elements(By.CLASS_NAME, 'ctc-tree')

	icontype = input('icon type:') or 'talent'

	if icontype == 'class':
		for icon in class_icons:
			icon.click()
			driver.implicitly_wait(2)

			class_icon_style = icon.find_element(By.TAG_NAME, 'ins').get_attribute("style")
			class_icon_match = class_from_url.search(class_icon_style)

			class_name = class_icon_match.group(2)
			# print("class: ", class_name)

			for tree in talent_trees:

				t = tree.find_element(By.CLASS_NAME, 'ctc-tree-header')

				tree_n = t.find_element(By.TAG_NAME, 'b').text

				tree_name = space_replacer.sub('_', tree_n)
				tree_name = tree_name.lower()

				folder_path = class_name+"/"+tree_name
				# print("tree: ", tree_name)

				small_icon_ele = t.find_element(By.TAG_NAME, 'span').find_element(By.TAG_NAME, 'ins')
				icon_style = small_icon_ele.get_attribute("style")

				img_match = get_url.search(icon_style)
				img_url = img_match.group(1)


				img_filename = "small_"+tree_name+"_icon.jpg"

				path = folder_path+"/"+img_filename


				if not os.path.exists(folder_path):
					os.makedirs(folder_path)

				urllib.request.urlretrieve(img_url, path)
		driver.close()


	else:
		try:
			for tree in talent_trees:

				tree_n = tree.find_element(By.CLASS_NAME, 'ctc-tree-header').find_element(By.TAG_NAME, 'b').text
				tree_name = space_replacer.sub('_', tree_n)
				tree_name = tree_name.lower()

				folder_path = class_name+"/"+tree_name
				tree_style = tree.find_element(By.CLASS_NAME, 'ctc-tree-talents').get_attribute("style")

				bg = get_url.search(tree_style)
				bg_url = bg.group(1)

				background_filename = tree_name+"_background.jpg"
				bg_path = folder_path+"/"+background_filename


				if not os.path.exists(folder_path):
					os.makedirs(folder_path)

				urllib.request.urlretrieve(bg_url, bg_path)
				talent_icons = tree.find_elements(By.CLASS_NAME, 'ctc-tree-talent')

				for item in talent_icons:
					img_elem = item.find_element(By.TAG_NAME, 'ins')
					link_elem = item.find_element(By.TAG_NAME, 'a')

					href = link_elem.get_attribute("href")

					# gets spell name via url redirect
					response = urllib.request.urlopen(href)
					f = response.geturl()
					m1 = r1.search(f)
					n = m1.group(1)

					# replace the dashes with underscores
					spell_name = p.sub('_', n)

					# get the url for the actual image
					style = img_elem.get_attribute("style")
					m2 = get_url.search(style)
					url = m2.group(1)

					file_name = spell_name+".jpg"
					path = folder_path+"/"+file_name

					# print("file path: ", path)
					# download and save the image
					urllib.request.urlretrieve(url, path)
		except:
			print("error")
			driver.close()


def test_run():
	BASE_URL = "http://classicdb.ch/?item=18262"
	driver.get(BASE_URL)
	driver.implicitly_wait(5)

	# all_consumes[item]['materials'] = {}
	created_tab = driver.find_element(By.ID, 'tab-created-by')
	materials = created_tab.find_element(By.CSS_SELECTOR, 'table.listview-mode-default').find_element(By.TAG_NAME, 'tbody').find_elements(By.TAG_NAME, 'td')[2].find_elements(By.CSS_SELECTOR, 'div.iconmedium')

	for mat in materials:

		quantity = mat.find_element(By.TAG_NAME, 'a').get_attribute('rel')
		layers = driver.find_element(By.ID, 'layers')

		tooltip = driver.find_elements(By.CSS_SELECTOR, 'div.tooltip')[0]

		ActionChains(driver).move_to_element(mat).perform()


		time.sleep(0.5)

		tooltip = layers.find_element(By.CSS_SELECTOR, 'div.tooltip')

		mat_name = tooltip.find_element(By.TAG_NAME, 'table').find_element(By.TAG_NAME, 'tbody').find_element(By.TAG_NAME, 'tr').find_element(By.TAG_NAME, 'table').find_element(By.TAG_NAME, 'b').text
		print(mat_name, ': ', quantity)

		ActionChains(driver).reset_actions()


main()
