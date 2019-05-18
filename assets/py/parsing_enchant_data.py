import json,re

name_catcher = re.compile('\-\s([\w\s]*)$')

with open('/Users/kjt/Desktop/enchant_data.js', 'r+') as f:
	content = f.read()
	all_enchants = json.loads(content)

def santitizer(s):
	a = s.replace(' ', '_')
	b = a.lower()
	return(b)


for slot,v in all_enchants:
	print(slot)

	link_list = []

	search_text = 'Enchant {}'.format(slot.title())
	search_bar = driver.find_element(By.CLASS_NAME, 'search-database')

	search_bar.send_keys(search_text)
	search_bar.send_keys(Keys.ENTER)
	driver.implicitly_wait(3)

	spell_tab = driver.find_element(By.CSS_SELECTOR, 'ul.tabs').find_elements(By.TAG_NAME, 'li')[1]

	spell_tab.find_element(By.TAG_NAME, 'a').click()
	driver.implicitly_wait(1)

	ench_rows = driver.find_element(By.CSS_SELECTOR, 'table.listview-mode-default').find_elements(By.TAG_NAME, 'tr')

	for row in ench_rows:
		this_link = row.find_elements(By.TAG_NAME, 'td')[0].find_element(By.TAG_NAME, 'a')

		if this_link.text.startswith(search_text):
			link_list.append(this_link)

	for link in link_list:
		link_text = link.text
		match = name_catcher.search(link_text)
		a = match.group(1)
		b = a.replace(' ', '_')

		ench_name = b.lower()

		all_enchants[slot][ench_name] = {}

		link.click()
		driver.implicitly_wait(3)

		tables = driver.find_elements(By.CSS_SELECTOR, 'table.iconlist')

		rows = tables[0].find_elements(By.TAG_NAME, 'tr')
		all_enchants[slot][ench_name]['materials'] = {}
		for tablerow in rows:
			q_parent = tablerow.find_element(By.TAG_NAME, 'div.iconsmall')

			quantity = q_parent.find_element(By.TAG_NAME, 'a').get_attribute('rel')
			mat_name = tablerow.find_element(By.CSS_SELECTOR, 'span.q3').find_element(By.TAG_NAME, 'a').text

			all_enchants[slot][ench_name]['materials'][mat_name] = quantity


		# get ench name
		all_enchants[slot][ench_name][]

		driver.back()
		driver.implicitly_wait(3)










	for each_item in

	for i, ench in v.items():
		print(ench['name'])

		url_text =
		a = driver.get_element(By.LINK_TEXT, )
		a.click()
		driver.implicitly_wait(3)
