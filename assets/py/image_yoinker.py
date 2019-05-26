
import os, re, urllib.request, json
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common import exceptions

driver = webdriver.Chrome(executable_path=os.path.abspath("chromedriver"))

prof_text = {'Fished':'fishing', 'Gathered':'herbalism', 'Mined':'mining',
			'Disenchanted':'enchanting', 'Skinned':'skinning'}

other_text = {'Dropped': 'drop', 'Sold': 'vendor'}
image_size = 'medium'

all_consumes = {}
#
# with open("all_materials_json.js", 'r') as f:
# 	all_materials = json.load(f)


r1 = re.compile(r'spell=[\d]+?\/([\w\-]+)', re.M)
get_url = re.compile(r'url\(\"(https://wow\.zamimg\.com.+?\.jpg)', re.M)
class_from_url = re.compile(r"url\(\"(https://wow\.zamimg\.com.+?\/class\_(\w+)\.jpg)", re.M)
icon_re = re.compile(r"'(\w*)'")
item_grabber = re.compile(r"item\=(\d+)")
p = re.compile('\-')
space_replacer = re.compile('\s')
numberRE = re.compile("(\d+)")

word_exceptions = ['of', 'the']

# materials_filename = "icon_download_list_total.txt"
consumes_filename = "consume_parse_list.txt"

# with open(materials_filename, 'r') as f:
# 	content = f.read()
# 	materials_list = content.split()

# materials_list_copy = materials_list.copy()

with open(consumes_filename, 'r') as f:
	content = f.read()
	consumes_list = content.split()

consumes_list_copy = consumes_list.copy()

def main():
	# image_size = input("image size (small / medium / large )") or 'small'
	# image_size = 'small'

	choice = 'wowhead'
	if choice == 'classicdb':
		use_classicdb()
	else:
		use_wowhead()

	# with open(materials_filename, 'w') as f:
	# 		for item in materials_list_copy:
	# 			f.write(item+"\n")

	# with open('all_materials_json.js', 'w') as f:
	# 	json.dump(all_materials, f, indent=4)

	with open('all_consumes_json.js', 'w') as f:
		json.dump(all_materials, f, indent=4)




def title_case(s):
	a = s.replace('_', ' ')
	word_list = a.split()

	for i,word in enumerate(word_list):
		if word not in word_exceptions:
			word_list[i] = word.title()

	c = ' '.join(word_list)
	return(c)

def sanitize(s):
	print('s: ', s)
	a = s.strip().replace(' ', '_')
	a = a.replace('\n', '')
	b = a.lower()

	print('b: ', b)
	return(b)

def use_classicdb():
	BASE_URL = "https://classicdb.ch/?items"
	driver.get(BASE_URL)
	driver.implicitly_wait(5)
	try:
		if choice == 'materials':
			# materials_filename = input('enter filepath for list of icons to be downloaded') or "icon_download_list.txt"
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

					if (item not in all_materials.keys()):
						all_materials[item] = {}

						all_materials[item]['category'] = folder_name

						if class_name == 'q1':
							 rarity = 'common'
						elif class_name == 'q2':
							rarity = 'uncommon'
						elif class_name == 'q3':
							rarity = 'rare'
						else:
							rarity = 'epic'

						print(item, " : ", rarity, ', ', folder_name)
						all_materials[item]['rarity'] = rarity


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
			all_consumes[item] = {}

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
					link_list.append(link.get_attribute('href'))

		except:
			print('error')
			print('number of links: ', len(link_list))

	print('number of links: ', len(link_list))

	for link in link_list:
		match = item_grabber.search(link)

		if not match:
			continue

		else:
			item_number = match.group(1)
			this_link = "https://classicdb.ch/?item="+str(item_number)
			driver.get(this_link)
			driver.implicitly_wait(3)

		tables = driver.find_elements(By.CSS_SELECTOR, 'div.tooltip')[-1].find_element(By.TAG_NAME, 'table').find_element(By.TAG_NAME, 'tbody').find_element(By.TAG_NAME, 'tr').find_element(By.TAG_NAME, 'td').find_elements(By.TAG_NAME, 'table')

		item_name = tables[0].find_element(By.TAG_NAME, 'b').text
		item = sanitize(item_name)

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

		# second table has
		spans = tables[1].find_element(By.TAG_NAME, 'td').find_elements(By.TAG_NAME, 'span')
		if len(spans) > 1:
			old_text = spans[0].text
			use = old_text.replace('Use: ', '')

			all_consumes[item]['use'] = use
			all_consumes['description'] = spans[1].text


		continue

		tab_parent = driver.find_element(By.CSS_SELECTOR, 'ul.tabs')
		tabs = tab_parent.find_elements(By.TAG_NAME, 'li')

		is_prof = False
		folder_name = ''

		for tab in tabs:
			div = tab.find_element(By.TAG_NAME, 'div')
			tab_text = div.get_attribute('textContent')

			if tab_text.startswith('Created'):
				div.click()
				driver.implicitly_wait(2)
				break





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


main()
