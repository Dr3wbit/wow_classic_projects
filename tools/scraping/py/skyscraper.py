import os, re, urllib.request, json, time
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common import exceptions

# chmod 755 path/to/chromedriver
driver = webdriver.Chrome(executable_path=os.path.abspath("../drivers/chromedriver"))

RARITY_CHOICES = {
    'q1': 'common',
    'q2': 'uncommon',
    'q3': 'rare',
    'q4': 'epic',
    'q5': 'legendary',
    'q10': 'rank',
}

BOP = "Binds when picked up"
UNIQUE = 'Unique'

ARMORLESS_SLOTS = ['Finger', 'Trinket', 'Shirt', 'Ring', 'Neck', 'Bag']
MAGIC_SCHOOLS = ['Frost', 'Fire', 'Arcane', 'Nature', 'Shadow']
STATLESS_SLOTS = ['Shirt']
CLASSES = {
    'c1': 'warrior',
    'c2': 'paladin',
    'c3': 'hunter',
    'c4': 'rogue',
    'c5': 'priest',
    'c8': 'mage',
    'c9': 'warlock',
    'c7': 'shaman',
    'c11': 'druid',
}

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

ARMOR_SLOTS = ['Head', 'Shoulder', 'Back', 'Chest', 'Feet', 'Hands', 'Shield', 'Waist', 'Wrist']
WEAPONSLOTS = ['Off-Hand', 'One-Hand', 'Main-Hand', 'Thrown', 'Ranged', 'Two-Hand']
#https://classicdb.ch/?item=18826
#https://classicdb.ch/?item=19866
#https://classicdb.ch/?item=23300
#https://classicdb.ch/?item=19019

# 		('oh', 'Off-Hand'),
# 		('1h', 'One-Hand'),
# 		('mh', 'Main-Hand'),
# 		('thrown', 'Thrown'),
# 		('ranged', 'Ranged'),
# 		('2h', 'Two-Hand'),
# 	)

def main():
    ANY_DIGITS = re.compile(r"([\d]+)", re.M, re.G)
    IMAGE_NAME_RE = re.compile(r"'(\w*)'")
    ALL_IMAGES = create_image_list(os.path.abspath('../../home/static/images/icons/large'))
    ALL_ITEMS = get_item_list(os.path.abspath('../js/all_items.js'))
    ARMOR_RE = re.compile(r"([\d]+) Armor")
    DURA_RE = re.compile(r"Durability ([\d]+)")
    BASE_URL="https://classicdb.ch/?item="
    REQ_RE = re.compile(r"Requires (\w+)")

    for n in range(23320):
        url = "{}{}".format(BASE_URL, n)
        driver.get(url)
        error_box = check_element_exists_by_id('inputbox-error')
        if not error_box:
            # do stuff
            # name = sanitize(driver.find_element(By.CSS_SELECTOR, 'div.text')[0].find_element(By.TAG_NAME, 'h1')[0].text)

            tooltip = driver.find_elements(By.CSS_SELECTOR, 'div.tooltip')[-1]
            tables = tooltip.find_element(By.TAG_NAME, 'table').find_elements(By.TAG_NAME, 'table')
            upper_table = tables[0].find_element(By.TAG_NAME, 'td')

            name = sanitize(upper_table.find_element(By.TAG_NAME, 'b').text)

            if name not in ALL_ITEMS.keys():
                ALL_ITEMS[name] = {}

            class_name = upper_table.find_element(By.TAG_NAME, 'b').get_attribute("class")
            ALL_ITEMS[name]['rarity'] = RARITY_CHOICES[class_name]

            if BOP in text_items:
                ALL_ITEMS[name]['bop'] = True

            if UNIQUE in text_items:
                ALL_ITEMS[name]['unique'] = True


            if check_element_exists_by_css(main_content, 'table'):
                ALL_ITEMS[name]['equipable'] = True
                tab = upper_table.find_element(By.TAG_NAME, 'table')
                slot = tab.find_element(By.TAG_NAME, 'td').text
                ALL_ITEMS[name]['slot'] = slot

            if slot=='Off-Hand':
                # are shields armor or weapons?
                pass

            ################
            ################
            text_items = main_content.text.split("\n")
            name = sanitize(text_items.pop(0))

            for item in text_items:
                if 'Damage' in item:
                    ALL_ITEMS[name][]

                elif item.startswith('+'):
                        # look for school of magic

                #if slot not in STATLESS_SLOTS:
                #    ALL_ITEMS[name]['stats'] = {}

                if slot in WEAPONSLOTS:
                    weapon_type = tab.find_element(By.TAG_NAME, 'th').text
                    ALL_ITEMS[name]['weapon'] = weapon_type
                    ## get weapon speed, topend, lowend, and any extra elemental damage
                    ## also note that weapons can have +armor on them

                elif slot not in ARMORLESS_SLOTS:
                    armor_type = tab.find_element(By.TAG_NAME, 'th').text
                    ALL_ITEMS[name]['armor'] = armor_type
                    if 'Armor' in main_text:
                        matched = ARMOR_RE.search(main_text)
                        if matched:
                            ALL_ITEMS[name]['stats']['armor'] = int(matched.group(1))

                    if 'Durability' in main_text:
                        matched = DURA_RE.search(main_text)
                        if matched:
                            ALL_ITEMS[name]['durability'] = int(matched.group(1))


                requirements = REQ_RE.findall(main_text)
                if requirements:
                    for req in requirement:
                        # different req types are:
                        # rank, level, profession, faction (argent dawn, warsong, etc.) race?


                if 'Classes' in main_text:
                    ## figure out which class and save it


            ################
            ################
            icon_name = get_icon_name(IMAGE_NAME_RE)
            ALL_ITEMS[name]['image_name'] = icon_name
            ALL_IMAGES.append(icon_name)
            ALL_ITEMS[name]['rarity'] = get_rarity()

            infobox = driver.find_element(By.CSS_SELECTOR, 'table.infobox').find_elements(By.TAG_NAME, 'tr')[1].find_element(By.TAG_NAME, 'ul')
            ALL_ITEMS[name]['ilvl'] = get_ilvl(ANY_DIGITS, infobox)

            moneybox = infobox.find_elements(By.TAG_NAME, 'li')[2]
            ALL_ITEMS[name]['sells_for'] = get_sell_price(moneybox)


        # indicates no item found
        else:
            return


	with open(os.path.abspath('../js/all_items.js'), 'w') as f:
		json.dump(ALL_ITEMS, f, indent=4)


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
