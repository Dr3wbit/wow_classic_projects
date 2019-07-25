import os, re, urllib.request, json, time
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common import exceptions

# chmod 755 path/to/chromedriver
driver = webdriver.Chrome(executable_path=os.path.abspath("../drivers/chromedriver"))

BOP = "Binds when picked up"
UNIQUE = 'Unique'

# not that they cant have armor, that they cant have a proficiency, i.e cloth, plate, sword
ARMORLESS_SLOTS = ['Finger', 'Trinket', 'Shirt', 'Ring', 'Neck', 'Bag', 'Tabbard']
MAGIC_SCHOOLS = ['Frost', 'Fire', 'Arcane', 'Nature', 'Shadow']
STATLESS_SLOTS = ['Shirt', 'Tabbard']
STATS = ['Agility', 'Armor', 'Block', 'Intellect', 'Spirit', 'Stamina', 'Strength']
EXTENDED_STATS = ['Armor', 'Block']

CLASS_DICT = {
	'c1': 'warrior',
	'c2': 'paladin',
	'c3': 'Hunter',
	'c4': 'rogue',
	'c5': 'priest',
	'c8': 'mage',
	'c9': 'warlock',
	'c7': 'shaman',
	'c11': 'druid',
}

CLASSES = [x.title() for x in CLASS_DICT.values()]

def main():
	REP_LVLS = ['Hated', 'Neutral', 'Friendly', 'Honored', 'Exalted']
	PROFESSIONS = [
		'Alchemy', 'Enchanting', 'Engineering', 'Blacksmithing', 'Cooking', 'First Aid',
		'Leatherworking', 'Skinning', 'Tailoring', 'Fishing', 'Riding', 'Mining',
		'Herbalism'
		]
	RARITY_CHOICES = {'q0': 0,'q1': 1,'q2': 2, 'q3': 3, 'q4': 4, 'q5': 5, 'q6': 6}
	ANY_DIGITS = re.compile(r"([\d]+)", re.M)
	IMAGE_NAME_RE = re.compile(r"'(\w*)'")
	ARMOR_RE = re.compile(r"([\d]+) Armor")
	DUR_RE = re.compile(r"Durability ([\d]+)")

	REQ_RE = re.compile(r"Requires (\w+)")

	ALL_IMAGES = create_image_list(os.path.abspath('../../home/static/images/icons/large'))
	ALL_ITEMS = get_item_list(os.path.abspath('../js/all_items.js'))

	BASE_URL="https://classicdb.ch/?item="

	for n in range(23320):
		url = "{}{}".format(BASE_URL, n)
		driver.get(url)
		error_box = check_element_exists_by_id('inputbox-error')
		if not error_box:
			# do stuff
			# name = sanitize(driver.find_element(By.CSS_SELECTOR, 'div.text')[0].find_element(By.TAG_NAME, 'h1')[0].text)

			tooltip = driver.find_elements(By.CSS_SELECTOR, 'div.tooltip')[-1]
			tables = tooltip.find_elements(By.XPATH, "./table/tbody/tr/td/table")

			# items in the upper table include:
			# name, bop, unique, slot, proficiency, armor, damage, stats, durability, resists

			upper_table = tables[0].find_element(By.XPATH, "./tbody/tr/td")

			name = sanitize(upper_table.find_element(By.TAG_NAME, 'b').text)

			ALL_ITEMS[name] = {}
			ALL_ITEMS[name]['i'] = n

			class_name = upper_table.find_element(By.TAG_NAME, 'b').get_attribute("class")
			ALL_ITEMS[name]['quality'] = RARITY_CHOICES[class_name]

			upper_items = upper_table.text.split("\n")
			# js equiv: document.querySelectorAll('div.tooltip')[1].getElementsByTagName('table')[0].getElementsByTagName('table')[0]

			ALL_ITEMS[name]['n'] = upper_items.pop(0)

			ALL_ITEMS[name]['image_name'] = get_icon_name(IMAGE_NAME_RE)
			ALL_IMAGES.append(ALL_ITEMS[name]['image_name'])

			infobox = driver.find_element(By.CSS_SELECTOR, 'table.infobox').find_elements(By.TAG_NAME, 'tr')[1].find_element(By.TAG_NAME, 'ul')
			ALL_ITEMS[name]['ilvl'] = get_ilvl(ANY_DIGITS, infobox)

			moneybox = infobox.find_elements(By.TAG_NAME, 'li')[2]
			ALL_ITEMS[name]['sells_for'] = get_sell_price(moneybox)


			if BOP in upper_items:
				ALL_ITEMS[name]['bop'] = True
				i = upper_items.index(BOP)
				upper_items.pop(i)

			if UNIQUE in upper_items:
				ALL_ITEMS[name]['unique'] = True
				i = upper_items.index(UNIQUE)
				upper_items.pop(i)

			if check_element_exists_by_css(upper_table, 'table'):
				# ALL_ITEMS[name]['equipable'] = True
				tab = upper_table.find_element(By.TAG_NAME, 'table')
				slot = tab.find_element(By.TAG_NAME, 'td').text
				ALL_ITEMS[name]['slot'] = slot
				i = [x for x,y in enumerate(upper_items) if slot in y][0]
				upper_items[i] = upper_items[i].replace(slot, '').strip()

				if check_element_exists_by_css(tab, "th") and slot not in ARMORLESS_SLOTS:
					th = tab.find_element(By.TAG_NAME, 'th')
					if th.text:
						proficiency = th.text
						ALL_ITEMS[name]['proficiency'] = proficiency
						i = upper_items.index(proficiency)
						upper_items.pop(i)


			# wep speed is normally coupled with dmg, so extract speed
			if any(x for x in upper_items if 'Speed' in x):
				i = [x for x,y in enumerate(upper_items) if 'Speed' in y][0]
				match = re.search(r"Speed ([\d\.]+)", upper_items[i])
				if match:
					upper_items[i] = re.sub(match.group(0), '', upper_items[i]).strip()
					ALL_ITEMS[name]['speed'] = match.group(1)

			ALL_ITEMS[name] = extract_stats(text_items, ALL_ITEMS[name], ARMOR_RE, DUR_RE)


			# items in the lower table include:
			# use, effects, procs, itemset, description
			# NOTE: descriptions will always have quotes around them

			lower_table = tables[1].find_element(By.XPATH, "./tbody/tr/td")
			spans = lower_table.find_elements(By.XPATH, "./span")
			for span in spans:
				text = span.text
			    if text.startswith("Equip"):
					t = text[6:]
					if t.startswith
			    elif text.startswith("Use"):

			    elif text.startswith("Chance"):

			if span.q:
			    if '"' in text:
			        ALL_ITEMS[description] = text
			    elif:
			        # check element exists
			        span.q.find_element(By.TAG_NAME, 'a')
			    else:
			        pass


		# indicates no item found
		else:
			return


	with open(os.path.abspath('../js/all_items.js'), 'w') as f:
		json.dump(ALL_ITEMS, f, indent=4)


# attempts to get armor, stats, damage, resists, and durability
def extract_stats(items, stat_dict):
	for item in items:
		if 'Damage' in item:
			# find numbers and potential school of magic
			botend = 0
			topend = 0
			if any(x in item for x in MAGIC_SCHOOLS):
				school = [x for x in MAGIC_SCHOOLS if x in item][0]

			matched = re.search(r"([\d]{1,3}) \- ([\d]{1,3})", item)
			if matched:
				botend = int(matched.group(1))
				topend = int(matched.group(2))
			else:
				match_fail_disclaimer('damage', item, r"([\d]{1,3}) \- ([\d]{1,3})")

			if 'damage' not in stat_dict.keys():
				stat_dict['damage'] = {}

			stat_dict['damage'][school] = [botend, topend]


		elif 'Resist' in item:
			school = [x for x in MAGIC_SCHOOLS if x in item][0]
			v = 0
			matched = re.search(r"\+([\d]+)", item)
			if matched:
				v = int(matched.group(1))
			else:
				match_fail_disclaimer('resist', item, r"\+([\d]+)")

			if 'resist' not in stat_dict.keys():
				stat_dict['resist'] = {}

			stat_dict['resist'][school] = v


		elif 'Durability' in item:
			v = 0
			matched = re.search(r"Durability ([\d]+)", item)
			if matched:
				v = int(matched.group(1))

			else:
				match_fail_disclaimer('durability', item, r"Durability ([\d]+)")

			if 'stats' not in stat_dict.keys():
				stat_dict['stats'] = {}

			stat_dict['stats']['durability'] = v


		elif 'Require' in item:
			# determine the type
			if 'Level' in item:
				v = 1
				matched = re.search(r"Requires Level ([\d]+)", item)
				if matched:
					v = int(matched.group(1))
				else:
					match_fail_disclaimer('require, level', item, r"Requires Level ([\d]+)")

				if 'requirements' not in stat_dict.keys():
					stat_dict['requirements'] = {}

				stat_dict['requirements']['level'] = v

			elif any(x in item for x in PROFESSIONS):
				v = 1
				prof = [x for x in PROFESSIONS if x in item][0]
				matched = re.search(r"Requires {} \(([\d]+)\)".format(prof), item)

				if matched:
					v = int(matched.group(1))
				else:
					match_fail_disclaimer('require, profession', item, r"Requires {} \(([\d]+)\)".format(prof))

				if 'requirements' not in stat_dict.keys():
					stat_dict['requirements'] = {}

				stat_dict['requirements']['profession'] = {}
				stat_dict['requirements']['profession'][prof.lower()] = v

			# requires faction rep
		elif any(x in item for x in REP_LVLS):
				name = 'None'
				rep = [x for x in PROFESSIONS if x in item][0]
				matched = re.search(r"Requires ([\w ]+) \- {}".format(rep), item)

				if matched:
					name = matched.group(1)

					href = driver.find_element(By.LINK_TEXT, faction).get_attribute("href")
					href_match = re.search(r"([\d]+)", href)
					id = s.group(1) if href_match else 0

				else:
					match_fail_disclaimer('require, faction', item, r"Requires ([\w ]+) \- {}".format(rep))

				if 'requirements' not in stat_dict.keys():
					stat_dict['requirements'] = {}

				stat_dict['requirements']['reputation'] = {}
				stat_dict['requirements']['reputation']['n'] = name
				stat_dict['requirements']['reputation']['i'] = id
				stat_dict['requirements']['reputation']['v'] = rep


		elif 'Classes' in item:
			class_names = [x for x in CLASSES if x in item]

			if 'requirements' not in stat_dict.keys():
				stat_dict['requirements'] = {}

			stat_dict['requirements']['class'] = class_names


		# else its a stat item
		elif any(x in item for x in STATS):
			v = 0
			stat = [x for x in STATS if x in item][0]
			r = "(\+|\-)" if stat not in EXTENDED_STATS else ""
			regex = "{}([\d]+) {}".format(r, stat)
			matched = re.search(r"{}".format(regex), item)
			if matched:
				v = int("{}{}".format(matched.group(1), (matched.group(2) if len(matched.groups())>1 else "")))
			else:
				match_fail_disclaimer('stat, {}'.format(stat), item, r"{}".format(regex))

			if 'stats' not in stat_dict.keys():
				stat_dict['stats'] = {}

			stat_dict['stats'][stat.lower()] = v

		else:
			print('NO MATCHES FOUND')
			return

	return stat_dict

def get_ilvl(reee, infobox):
	ilvl = 0
	matched = reee.search(infobox.find_elements(By.TAG_NAME, 'li')[0].text)
	if matched:
		ilvl = int(matched.group(1))

	return ilvl

def get_icon_name(reee):
	icon = driver.find_element(By.CSS_SELECTOR, "div#minibox + div")
	icon_match = reee.search(icon.get_attribute("onclick"))
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
	get_name = re.compile("([\w\_]+).jpg")
	file_list = []
	for _root, _dirs, files in os.walk(dir):
		for name in files:
			print(name)
			match = get_name.search(name)
			if match:
				file_name = match.group(1)
				file_list.append(file_name)


	with open("image_list.txt", 'w') as f:
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


def get_item_list(path):

	with open(path, 'r') as f:
		all_items = json.load(f)


		return all_items


# 	WEAPON_PROFICIENCIES = (
# 		('axe', 'Axe'),
# 		('sword', 'Sword'),
# 		('staff', 'Staff'),
# 		('staff', 'Staff'),
# 		('polearm', 'Polearm'),
# 		('gun', 'Gun'),
# 		('wand', 'Wand'),
# 		('bow', 'Bow'),
# 		('crossbow','Crossbow'),
# 		('dagger', 'Dagger'),
# 	)
#
# 	WEAPON_TYPES = (
# 		('oh', 'Off-Hand'),
# 		('1h', 'One-Hand'),
# 		('mh', 'Main-Hand'),
# 		('thrown', 'Thrown'),
# 		('ranged', 'Ranged'),
# 		('2h', 'Two-Hand'),
# 	)
# 	SLOT_CHOICES = (
# 	('back', 'Back'),
# 	('bag', 'Bag'),
# 	('chest', 'Chest'),
# 	('feet', 'Feet'),
# 	('hands', 'Hands'),
# 	('head', 'Head'),
# 	('neck', 'Neck'),
# 	('ring', 'Ring'),
# 	('shield', 'Shield'),
# 	('shirt', 'Shirt'),
# 	('shoulder', 'Shoulder'),
# 	('trinket', 'Trinket'),
# 	('waist', 'Waist'),
# 	('wrist', 'Wrist')
# 	)
# 	ARMOR_TYPES = (
# 	('cloth', 'Cloth'),
# 	('leather', 'Leather'),
# 	('mail', 'Mail'),
# 	('plate', 'Plate'),
# 	)
# 	CHOICES = (
# 	('agility', 'Agility'),
# 	('strength', 'Strength'),
# 	('intellect', 'Intellect'),
# 	('spirit', 'Spirit'),
# 	('Stamina', 'Stamina'),
# 	)

ARMOR_SLOTS = ['Head', 'Shoulder', 'Back', 'Chest', 'Feet', 'Hands', 'Shield', 'Waist', 'Wrist']
WEAPONSLOTS = ['Off Hand', 'One-hand', 'Main Hand', 'Thrown', 'Ranged', 'Two-hand']

tfury = ['Thunderfury, Blessed Blade of the Windseeker', 'Binds when picked up', 'Unique', 'One-hand Sword', '44 - 115 Damage Speed 1.90', '+16 - 30 Nature Damage', '(53.9 damage per second)', '+5 Agility', '+8 Stamina', '+8 Fire Resistance', '+9 Nature Resistance', 'Durability 125 / 125', 'Requires Level 60']
ironbark_staff = ['Ironbark Staff', 'Binds when picked up', 'Two-hand Staff', '136.62 - 242.62 Damage Speed 3.40', '(55.8 damage per second)', '100 Armor', '+10 Intellect', '+19 Stamina', 'Durability 120 / 120', 'Requires Level 60', 'Requires The Defilers - Exalted']
defilers_shoulders = ["Defiler's Chain Pauldrons", 'Binds when picked up', 'Unique', 'Shoulder Mail', '312 Armor', '+20 Agility', '+18 Stamina', '+17 Intellect', 'Durability 85 / 85', 'Classes: Hunter, Shaman', 'Requires Level 60', 'Requires The Defilers - Exalted']

hwl shield: https://classicdb.ch/?item=18826
multi-req recipe: https://classicdb.ch/?item=13482
roids, dscription text: https://classicdb.ch/?item=8410
brill mana oil, charges, https://classicdb.ch/?item=20748

weapon with armor on it: https://classicdb.ch/?item=20220

triple requirement consume, https://classicdb.ch/?item=20232

triple req item, part of itemset: https://classicdb.ch/?item=20163

increase damage of multishot: https://classicdb.ch/?item=16463

increase movespeed of ghost wolf: https://classicdb.ch/?item=16573

50% pushback decrease? https://classicdb.ch/?item=17620

increase mana absorbed by mana shield: https://classicdb.ch/?item=16540
