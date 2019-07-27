import invariables as const
import os, re, urllib.request, json, time, datetime, random
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common import exceptions

# if permissions error: chmod 755 path/to/chromedriver
driver = webdriver.Chrome(executable_path=os.path.abspath("../drivers/chromedriver"))

START_TIME = datetime.datetime.now()
IMAGE_DLS = 0
def main():

	ALL_ITEMS = const.get_item_list(os.path.abspath('../js/all_items.js'))
	BASE_URL="https://classicdb.ch/?item="
	#item_numbers = ['15772', '18984']
	# item_numbers = ["1168", "17082", "17104", "18835", "22194", "17620", "19019", "15515", "13822", "19865"]
	#item_numbers = ['15772', '18984','10725','20076', "18564"]
	# item_numbers = range(23300, 23305)
	Z,E = 0,0
	iStart = datetime.datetime.now()

	for ix in range(5630, 5640):

		r = random.randint(3, 8)
		if ix+r % 2 == 0:
			print("ZUG ZUG")
			time.sleep(0.3)

		iStart = datetime.datetime.now()
		url = "{}{}".format(BASE_URL, ix)
		driver.get(url)
		error_box = check_element_exists_by_id('inputbox-error')
		if not error_box:
			I = ix
			if I in ALL_ITEMS.keys():
				if ALL_ITEMS[I]['i'] and ALL_ITEMS[I]['n'] and ALL_ITEMS[I]['image_name']:
					continue
			else:
				ALL_ITEMS[I] = {}

			ALL_ITEMS[I]['i'] = int(ix)

			tooltip = driver.find_elements(By.CSS_SELECTOR, 'div.tooltip')[-1]
			tables = tooltip.find_elements(By.XPATH, "./table/tbody/tr/td/table")

			upper_table = tables[0].find_element(By.XPATH, "./tbody/tr/td")
			upper_items = upper_table.text.split("\n")

			css_class_name = upper_table.find_element(By.TAG_NAME, 'b').get_attribute("class")
			ALL_ITEMS[I]['quality'] = const.RARITY_CHOICES[css_class_name]

			ALL_ITEMS[I]['n'] = upper_items.pop(0)

			image_name, STACK = image_handler()
			ALL_ITEMS[I]['image_name'] = image_name

			if STACK:
				ALL_ITEMS[I]['stack'] = STACK

			if image_name not in const.ALL_IMAGES:
				const.ALL_IMAGES.append(ALL_ITEMS[I]['image_name'])

			infobox = driver.find_element(By.CSS_SELECTOR, 'table.infobox').find_elements(By.TAG_NAME, 'tr')[1].find_element(By.TAG_NAME, 'ul')
			ALL_ITEMS[I]['ilvl'] = get_ilvl(infobox)

			moneybox = infobox.find_elements(By.TAG_NAME, 'li')
			if len(moneybox) > 1:
				ALL_ITEMS[I]['sells_for'] = get_sell_price(moneybox[-1])

			if any(x for x in upper_items if x in const.BOP):
				ALL_ITEMS[I]['bop'] = True
				i = [x for x,y in enumerate(upper_items) if y in const.BOP][0]
				upper_items.pop(i)

			if any(x for x in upper_items if 'damage' and 'second' in x):
				i = [x for x,y in enumerate(upper_items) if 'damage' and 'second' in y][0] #removes dps
				upper_items.pop(i)

			if const.BOE in upper_items:
				ALL_ITEMS[I]['boe'] = True
				i = upper_items.index(const.BOE)
				upper_items.pop(i)

			if const.UNIQUE in upper_items:
				ALL_ITEMS[I]['unique'] = True
				i = upper_items.index(const.UNIQUE)
				upper_items.pop(i)

			if check_element_exists_by_css(upper_table, 'table'):

				tab = upper_table.find_element(By.TAG_NAME, 'table')
				text = tab.text
				if text:
					slot = tab.find_element(By.TAG_NAME, 'td').text

					ALL_ITEMS[I]['slot'] = slot
					i = [x for x,y in enumerate(upper_items) if slot in y][0]
					upper_items[i] = upper_items[i].replace(slot, '').strip()

					if check_element_exists_by_css(tab, "th") and slot not in const.ARMORLESS_SLOTS:
						th = tab.find_element(By.TAG_NAME, 'th')
						if th.text:
							proficiency = th.text
							ALL_ITEMS[I]['proficiency'] = proficiency
							id = upper_items.index(proficiency)
							upper_items.pop(id)

			# wep speed is normally coupled with dmg, so extract speed
			if any(x for x in upper_items if 'Speed' in x):
				i = [x for x,y in enumerate(upper_items) if 'Speed' in y][0]
				regex = r"Speed ([\d\.]+)"
				match = re.search(regex, upper_items[i])
				if match:
					upper_items[i] = re.sub(match.group(0), '', upper_items[i]).strip()
					ALL_ITEMS[I]['speed'] = float(match.group(1))

			ALL_ITEMS[I] = extract_stats(upper_items, ALL_ITEMS[I])

			# items in the lower table include:
			# use, effects, procs, itemset, description
			lower_table = tables[1].find_element(By.XPATH, "./tbody/tr/td")
			ALL_ITEMS[I] = get_lowboys(ALL_ITEMS[I], lower_table)


			iFinish = datetime.datetime.now()
			# PREVIOUS = "t: {}sec".format(round((iStart - iFinish).total_seconds(), 2))
			print('PROCESSED: {} ({}) in ~{}s'.format(ALL_ITEMS[I]['n'], ALL_ITEMS[I]['i'], round((iFinish - iStart).total_seconds(), 2)))
			Z+=1
		# no item found
			# except:
			# 	print('ERROR AT ITEM ({})'.format(ix))
			# 	E+=1
			# 	continue

		else:
			print('NOT FOUND: ({})'.format(ix))
			continue


	with open(os.path.abspath('../js/all_items.js'), 'w+') as f:
		json.dump(ALL_ITEMS, f, indent=4)

	with open(os.path.abspath('../js/itemsets.js'), 'w+') as f:
		json.dump(const.ITEMSETS, f, indent=4)

	with open(os.path.abspath('image_list.txt'), 'w+') as f:
		for name in const.ALL_IMAGES:
			f.write(name+"\n")


	T = str(iFinish - START_TIME)
	print('==============\nTIME ELAPSED: {}\nITEMS PROCESSED: ({})\nERRORS: ({})\nNEW IMAGES: ({})'.format(T, Z, E, IMAGE_DLS))
	driver.close()

def get_lowboys(item_dict, table):
	spans = table.find_elements(By.XPATH, "./span")
	for span in spans:
		text = span.text
		t, s = '', 0
		if text.startswith("Equip"):
			t = text[7:]
			href = span.find_element(By.XPATH, './a').get_attribute('href')
			regex = re.compile(r"spell\=([\d]+)")
			matched = regex.search(href)

			if matched:
				s = int(matched.group(1))
			else:
				match_fail_disclaimer('equip', text, regex)
				continue

			if 'effects' not in item_dict.keys():
				item_dict['effects'] = {}

			if 'equip' not in item_dict['effects'].keys():
				item_dict['effects']['equip'] = []

			item_dict['effects']['equip'].append({"s": s, "t": t})

		elif text.startswith("Chance"):
			t = text[15:]
			href = span.find_element(By.XPATH, './a').get_attribute('href')
			regex = re.compile(r"spell\=([\d]+)")
			matched = regex.search(href)
			if matched:
				s = matched.group(1)
			else:
				match_fail_disclaimer('chance', text, regex)
				continue

			if 'effects' not in item_dict.keys():
				item_dict['effects'] = {}

			if 'proc' not in item_dict['effects'].keys():
				item_dict['effects']['proc'] = []

			item_dict['effects']['proc'].append({"s": s, "t": t})

		elif text.startswith("Use"):
			t, s = text[5:], 0
			href = span.find_element(By.XPATH, './a').get_attribute('href')
			regex = re.compile(r"spell\=([\d]+)")
			matched = regex.search(href)
			if matched:
				s = int(matched.group(1))
			else:
				match_fail_disclaimer('use', text, regex)
				continue

			item_dict['use'] = {"s": s, "t": t}

		elif span.get_attribute("class") is "q":
			if '"' in text:
				item_dict['description'] = text[1:-2]

			# check if its an itemset
			elif check_element_exists_by_css(span, 'a'):
				i = "0"
				a = span.find_element(By.XPATH, './a')
				href = a.get_attribute('href')
				if 'itemset' in href:
					regex = re.compile(r"itemset\=([\d]+)")
					matched = regex.search(href)
					i = matched.group(1)
					n = a.text
					item_dict['itemset'] = {"n":n, "i":int(i)}
					if i not in const.ITEMSETS.keys():
						create_itemset(i, n, table)
			else:
				continue

		elif text is ("Random Bonuses"):
			if 'stats' not in item_dict.keys():
				item_dict['stats'] = {}

			item_dict['stats']['random'] = True

	return item_dict

def create_itemset(id, name, lower_table):
	# create itemset
	I = id
	const.ITEMSETS[I] = {}
	const.ITEMSETS[I]['n'] = name
	const.ITEMSETS[I]['i'] = I

	# getting the item ids
	elems = lower_table.find_elements(By.XPATH, "./div[@class='q0 indent']/span/a")
	if len(elems) > 0:
		regex = re.compile(r"item\=([\d]+)")
		const.ITEMSETS[I]['items'] = []
		for elem in elems:
			href = elem.get_attribute('href')
			match = regex.search(href)
			item_id = int(match.group(1))
			const.ITEMSETS[I]['items'].append(item_id)

	# getting the bonuses
	elems = lower_table.find_elements(By.XPATH, "./span[@class='q0']/span/span")
	if len(elems) > 0:
		const.ITEMSETS[I]['bonuses'] = {}
		for elem in elems:
			text = elem.text
			t, spell_id = text, 0
			regex = re.compile(r"\((\d)\) Set\:")
			matched = regex.search(elem.text)
			if matched:
				required_pieces = str(matched.group(1))
				regex = re.compile(r"spell\=([\d]+)")
				a_elem = elem.find_element(By.XPATH, './a')
				href = a_elem.get_attribute('href')
				match = regex.search(href)
				spell_id = match.group(1)
				t = a_elem.text
				const.ITEMSETS[I]['bonuses'][required_pieces] = {"s": spell_id, "t":t}

			else:
				match_fail_disclaimer('itemset bonus', text, regex)
				continue

	print('NEW ITEMSET ADDED: {} ({})'.format(name, I))

# attempts to get armor, stats, damage, resists, and durability
def extract_stats(items, item_dict):
	for item in items:
		if not item: #filters empty items
			continue
		if 'Damage' in item:
			# find numbers and potential school of magic
			botend = 0
			topend = 0
			school = 'normal'
			if any(x in item for x in const.MAGIC_SCHOOLS):
				school = [x for x in const.MAGIC_SCHOOLS if x in item][0]

			regex = re.compile(r"([\d]{1,3}) \- ([\d]{1,3})")
			matched = regex.search(item)
			if matched:
				botend = int(matched.group(1))
				topend = int(matched.group(2))
			else:
				match_fail_disclaimer('damage', item, regex)
				continue

			if 'damage' not in item_dict.keys():
				item_dict['damage'] = {}

			item_dict['damage'][school] = [botend, topend]


		elif 'Resist' in item:
			school = [x for x in const.MAGIC_SCHOOLS if x in item][0]
			v = 0
			regex = re.compile(r"\+([\d]+)")
			matched = regex.search(item)
			if matched:
				v = int(matched.group(1))
			else:
				match_fail_disclaimer('resist', item, regex)
				continue

			if 'resist' not in item_dict.keys():
				item_dict['resist'] = {}

			item_dict['resist'][school] = v

		elif 'Durability' in item:
			v = 0
			regex = re.compile(r"Durability ([\d]+)")
			matched = regex.search(item)
			if matched:
				v = int(matched.group(1))

			else:
				match_fail_disclaimer('durability', item, regex)
				continue

			if 'stats' not in item_dict.keys():
				item_dict['stats'] = {}

			item_dict['stats']['durability'] = v

		elif 'Require' in item:
			# determine the type
			if 'Level' in item:
				v = 1
				regex = re.compile(r"Requires Level ([\d]+)")
				matched = regex.search(item)
				if matched:
					v = int(matched.group(1))
				else:
					match_fail_disclaimer('require, level', item, )
					continue

				if 'requirements' not in item_dict.keys():
					item_dict['requirements'] = {}

				item_dict['requirements']['level'] = v

			elif any(x in item for x in const.PROFESSIONS):
				v = 0
				prof = [x for x in const.PROFESSIONS if x in item][0]
				any_digits = re.search(r"[\d]+", item)
				if any_digits:
					regex = re.compile(r"Requires {} \(([\d]+)\)".format(prof))
					matched = regex.search(item)

					if matched:
						v = int(matched.group(1))
					else:
						match_fail_disclaimer('require, profession (n)', item, regex)
						continue

					if 'requirements' not in item_dict.keys():
						item_dict['requirements'] = {}

					if 'profession' not in item_dict['requirements'].keys():
						item_dict['requirements']['profession'] = {}

					item_dict['requirements']['profession'][prof.lower()] = v

				# specialized profession
				else:
					regex = re.compile(r"Requires ([\w ]+)")
					matched = regex.search(item)
					if matched:
						v = matched.group(1)
					else:
						match_fail_disclaimer('require, spec profession', item, regex)
						continue

					if 'requirements' not in item_dict.keys():
						item_dict['requirements'] = {}

					if 'profession' not in item_dict['requirements'].keys():
						item_dict['requirements']['profession'] = {}

					item_dict['requirements']['profession'][v.lower()] = True

			# requires faction rep
			elif any(x in item for x in const.REP_LVLS):
				name = 'None'
				rep = [x for x in const.REP_LVLS if x in item][0]
				regex = re.compile(r"Requires ([\w ]+) \- {}".format(rep))
				matched = regex.search(item)
				if matched:
					name = matched.group(1)

					href = driver.find_element(By.LINK_TEXT, name).get_attribute("href")
					hrefex = re.compile(r"([\d]+)")
					href_match = hrefex.search(href)
					id = href_match.group(1) if href_match else 0
				else:
					match_fail_disclaimer('require, faction', item, regex)
					continue

				if 'requirements' not in item_dict.keys():
					item_dict['requirements'] = {}

				item_dict['requirements']['reputation'] = {}
				item_dict['requirements']['reputation']['n'] = name
				item_dict['requirements']['reputation']['i'] = id
				item_dict['requirements']['reputation']['v'] = rep

			# must be rank requirement
			else:
				regex = re.compile(r"Requires ([\w \-]+)")
				match = regex.search(item)
				if match:
					rank = match.group(1)
					if rank in const.RANKS['ALLIANCE'].keys():
						faction = "Alliance"
						v = const.RANKS['ALLIANCE'][rank]
					else:
						faction = "Horde"
						v = const.RANKS['HORDE'][rank]

					if 'requirements' not in item_dict.keys():
						item_dict['requirements'] = {}

					item_dict['requirements']['rank'] = v
					item_dict['requirements']['faction'] = faction

				else:
					match_fail_disclaimer('require, rank', item, regex)
					continue


		elif 'Classes' in item:
			class_names = [x for x in const.CLASSES if x in item]

			if 'requirements' not in item_dict.keys():
				item_dict['requirements'] = {}

			item_dict['requirements']['class'] = class_names


		# else its a stat item
		elif any(x in item for x in const.STATS):
			v = 0
			stat = [x for x in const.STATS if x in item][0]
			r = "(\+|\-)" if stat not in const.EXTENDED_STATS else ""

			regex = re.compile(r"{}([\d]+) {}".format(r, stat))
			matched = regex.search(item)
			if matched:
				v = int("{}{}".format(matched.group(1), (matched.group(2) if len(matched.groups())>1 else "")))
			else:
				match_fail_disclaimer('stat, {}'.format(stat), item, regex)
				continue

			if 'stats' not in item_dict.keys():
				item_dict['stats'] = {}

			item_dict['stats'][stat.lower()] = v


		else:
			print('NO MATCHES FOUND FOR: {}'.format(item))
			continue

	return item_dict

def get_ilvl(infobox):
	ilvl = 0
	regex = re.compile(r"([\d]+)", re.M)
	matched = regex.search(infobox.find_elements(By.TAG_NAME, 'li')[0].text)
	if matched:
		ilvl = int(matched.group(1))
	return ilvl


def get_sell_price(moneybox):
	sells_for = {'gold':0, 'silver':0, 'copper':0}
	for k,v in sells_for.items():
		s = 'span.money{}'.format(k)
		if check_element_exists_by_css(moneybox, s):
			x = moneybox.find_element(By.CSS_SELECTOR, s).text
			sells_for[k] = int(x)

	return sells_for

def image_handler():
	regex = re.compile(r"'(\w*)'")
	icon = driver.find_element(By.CSS_SELECTOR, "div#minibox + div")
	icon_match = regex.search(icon.get_attribute("onclick"))
	stack_size = 0

	if icon_match:
		icon_name = icon_match.group(1)
		folder_path = os.path.abspath('../../../home/static/images/icons/large')
		full_path = folder_path+"/"+icon_name+".jpg"
		if not os.path.exists(full_path):
			img_url = "https://classicdb.ch/images/icons/large/"+icon_name+".jpg"
			urllib.request.urlretrieve(img_url, full_path)
			IMAGE_DLS+=1
			print('Downloaded icon: ', icon_name)

	if check_element_exists_by_css(icon, "span.glow"):

		stack_size = int(icon.find_element(By.CSS_SELECTOR, "span.glow").find_element(By.XPATH, "./div[1]").text)

	return icon_name, stack_size

def check_element_exists_by_id(id):
	try:
		driver.find_element(By.ID, id)
	except exceptions.NoSuchElementException:
		return False
	return True

def check_element_exists_by_css(element, selector):
	try:
		element.find_element(By.CSS_SELECTOR, selector)
	except exceptions.NoSuchElementException:
		return False
	return True

def match_fail_disclaimer(s, item, regex):
	print("Found '{}' in item: {}, but could not find match".format(s.upper(), item))
	print('Regex: {}\n'.format(regex))

def sleepy_time(n):

	print("no throttle plz b0ss")
	for ix in range(n):
		s = "".rjust(ix, 'z')
		# q = list(s)
		# for k,v in enumerate(q):
			# r = random.randint(0,1)
			# if k+r % 1 == 0:
				#q[i] = q[i].upper()
		print("".rjust(ix, 'z'))
		time.sleep(1)

main()
