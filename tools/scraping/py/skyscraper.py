import invariables as const
import os, re, urllib.request, json, time
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common import exceptions
# NOTE: UPPER NEEDS RANK REQUIREMENT and PROFESSION SPECIALIZATION (i.e tribal lw) HANDLING
# NOTE: LOWER NEEDS ITEMSET HANDLING

# if permissions error: chmod 755 path/to/chromedriver
driver = webdriver.Chrome(executable_path=os.path.abspath("../drivers/chromedriver"))


def main():

	ARMOR_RE = re.compile(r"([\d]+) Armor")
	DUR_RE = re.compile(r"Durability ([\d]+)")

	REQ_RE = re.compile(r"Requires (\w+)")

	ALL_IMAGES = create_image_list(os.path.abspath('../../home/static/images/icons/large'))

	ALL_ITEMS = const.get_item_list(os.path.abspath('../js/all_items.js'))

	ITEMSETS = get_item_list(os.path.abspath('../js/itemsets.js'))

	BASE_URL="https://classicdb.ch/?item="

	for _i in range(23320):
		url = "{}{}".format(BASE_URL, n)
		driver.get(url)
		error_box = check_element_exists_by_id('inputbox-error')
		if not error_box:
			I = str(_i)
			ALL_ITEMS[I] = {}
			ALL_ITEMS[I]['i'] = _i

			tooltip = driver.find_elements(By.CSS_SELECTOR, 'div.tooltip')[-1]
			tables = tooltip.find_elements(By.XPATH, "./table/tbody/tr/td/table")

			# items in the upper table include:
			# name, bop, unique, slot, proficiency, armor, damage, stats, durability, resists
			upper_table = tables[0].find_element(By.XPATH, "./tbody/tr/td")
			upper_items = upper_table.text.split("\n")

			css_lass_name = upper_table.find_element(By.TAG_NAME, 'b').get_attribute("class")
			ALL_ITEMS[I]['quality'] = const.RARITY_CHOICES[css_lass_name]

			ALL_ITEMS[I]['n'] = upper_items.pop(0)
			ALL_ITEMS[I]['image_name'] = get_icon_name()
			ALL_IMAGES.append(ALL_ITEMS[I]['image_name'])

			infobox = driver.find_element(By.CSS_SELECTOR, 'table.infobox').find_elements(By.TAG_NAME, 'tr')[1].find_element(By.TAG_NAME, 'ul')
			ALL_ITEMS[I]['ilvl'] = get_ilvl(infobox)

			moneybox = infobox.find_elements(By.TAG_NAME, 'li')[2]
			ALL_ITEMS[I]['sells_for'] = get_sell_price(moneybox)


			if BOP in upper_items:
				ALL_ITEMS[I]['bop'] = True
				i = upper_items.index(BOP)
				upper_items.pop(i)

			if UNIQUE in upper_items:
				ALL_ITEMS[I]['unique'] = True
				i = upper_items.index(UNIQUE)
				upper_items.pop(i)

			if check_element_exists_by_css(upper_table, 'table'):
				tab = upper_table.find_element(By.TAG_NAME, 'table')
				slot = tab.find_element(By.TAG_NAME, 'td').text
				ALL_ITEMS[I]['slot'] = slot
				i = [x for x,y in enumerate(upper_items) if slot in y][0]
				upper_items[i] = upper_items[i].replace(slot, '').strip()

				if check_element_exists_by_css(tab, "th") and slot not in ARMORLESS_SLOTS:
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
					ALL_ITEMS[I]['speed'] = match.group(1)

			ALL_ITEMS[I] = extract_stats(text_items, ALL_ITEMS[I])

			# items in the lower table include:
			# use, effects, procs, itemset, description
			lower_table = tables[1].find_element(By.XPATH, "./tbody/tr/td")
			ALL_ITEMS[I] = get_lowboys(ALL_ITEMS[I], lower_table)


		# no item found
		else:
			print('error box on page, no item found')
			continue


	with open(os.path.abspath('../js/all_items.js'), 'w') as f:
		json.dump(ALL_ITEMS, f, indent=4)

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
				s = matched.group(1)
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
			print(text)
			if '"' in text:
				item_dict['description'] = text[1:-2]

			# check if its an itemset
			elif check_item_exists_by_css(span, 'a'):
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
						create_itemset(i, n, lower_table)
			else:
				continue

		elif text is ("Random Bonuses"):
			if 'stats' not in item_dict.keys()
				item_dict['stats'] = {}

			item_dict['stats']['random'] = True


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
			ITEMSETS[I]['items'].append(item_id)

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


# attempts to get armor, stats, damage, resists, and durability
def extract_stats(items, item_dict):
	for item in items:
		if 'Damage' in item:
			# find numbers and potential school of magic
			botend = 0
			topend = 0
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
				v = 1
				prof = [x for x in const.PROFESSIONS if x in item][0]
				any_digits = re.search(r"[\d]+", item)
				if any_digits.match:

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
					v = prof
					regex = re.compile(r"Requires ([\w]+) ([\w]+)")
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
				rep = [x for x in const.PROFESSIONS if x in item][0]
				regex = re.compile(r"Requires ([\w ]+) \- {}".format(rep))
				matched = regex.search(item)
				if matched:
					name = matched.group(1)

					href = driver.find_element(By.LINK_TEXT, faction).get_attribute("href")
					hrefex = re.compile(r"([\d]+)")
					href_match = hrefex.search(href)
					id = s.group(1) if href_match else 0

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
			print('NO MATCHES FOUND')
			continue

	return item_dict

def get_ilvl(infobox):
	ilvl = 0
	regex = re.compile(r"([\d]+)", re.M)
	matched = regex.search(infobox.find_elements(By.TAG_NAME, 'li')[0].text)
	if matched:
		ilvl = int(matched.group(1))

	return ilvl

def get_icon_name():
	regex = re.compile(r"'(\w*)'")
	icon = driver.find_element(By.CSS_SELECTOR, "div#minibox + div")
	icon_match = regex.search(icon.get_attribute("onclick"))
	icon_name = ''
	if icon_match:
		icon_name = icon_match.group(1)
		folder_path = os.path.abspath('../../home/static/images/icons/large')
		full_path = folder_path+"/"+icon_name+".jpg"

		if os.path.exists(full_path):
			continue
		else:
			img_url = "https://classicdb.ch/images/icons/large/"+icon_name+".jpg"
			urllib.request.urlretrieve(img_url, full_path)

	return icon_name



def get_sell_price(moneybox):
	sells_for = {'gold':0, 'silver':0, 'copper':0}

	for k,v in sells_for.items():
		s = 'span.money{}'.format(k)
		if check_element_exists_by_css(moneybox, s):
			x = moneybox.find_element(By.CSS_SELECTOR, s).text
			sells_for[k] = int(x)

	return sells_for



def create_image_list(dir):
	regex = re.compile("([\w\_]+).jpg")
	file_list = []
	for _root, _dirs, files in os.walk(dir):
		for name in files:
			print(name)
			match = regex.search(name)
			if match:
				file_name = match.group(1)
				file_list.append(file_name)


	with open(os.path.abspath("image_list.txt"), 'a+') as f:
		for name in file_list:
			f.write(name+"\n")

	return file_list


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

def sanitize(s):
	a = s.strip().replace(' ', '_')
	a = a.replace('\n', '').replace("'", "")
	b = a.lower()
	return(b)

def match_fail_disclaimer(s, item, regex):
	print("Found '{}' in item: {}, but could not find match".format(s.upper(), item))
	print('Regex: {}\n'.format(regex))


# def get_item_list(path):
# 	all_items = ''
# 	mode = "r"
# 	if not os.path.exists(path):
# 		mode = "w+"
#
# 	with open(path, mode) as f:
# 		all_items = json.load(f)
#
# 	return all_items


tfury = ['Thunderfury, Blessed Blade of the Windseeker', 'Binds when picked up', 'Unique', 'One-hand Sword', '44 - 115 Damage Speed 1.90', '+16 - 30 Nature Damage', '(53.9 damage per second)', '+5 Agility', '+8 Stamina', '+8 Fire Resistance', '+9 Nature Resistance', 'Durability 125 / 125', 'Requires Level 60']
ironbark_staff = ['Ironbark Staff', 'Binds when picked up', 'Two-hand Staff', '136.62 - 242.62 Damage Speed 3.40', '(55.8 damage per second)', '100 Armor', '+10 Intellect', '+19 Stamina', 'Durability 120 / 120', 'Requires Level 60', 'Requires The Defilers - Exalted']
defilers_shoulders = ["Defiler's Chain Pauldrons", 'Binds when picked up', 'Unique', 'Shoulder Mail', '312 Armor', '+20 Agility', '+18 Stamina', '+17 Intellect', 'Durability 85 / 85', 'Classes: Hunter, Shaman', 'Requires Level 60', 'Requires The Defilers - Exalted']
