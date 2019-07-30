import invariables as const
import os, re, urllib.request, json, time, datetime, random
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common import exceptions

START_TIME = datetime.datetime.now()
NEW = {'MISSING':0, 'IMAGES':0, 'SPELLS':0, 'OBJECTS':0, 'NPCS':0, 'ZONES':0, 'ITEMS':0, 'ITEMSETS':0, 'NPCS': 0, 'QUESTS':0, 'ERRORS':0}
ALL_ITEMS = const.get_item_list(os.path.abspath('../js/all_items.js'))
# if permissions error: chmod 755 path/to/chromedriver
driver = webdriver.Chrome(executable_path=os.path.abspath("../drivers/chromedriver"))
iStart = datetime.datetime.now()


def main():
	# 1939
	start = 2001
	end = 3000
	BASE_URL="https://classicdb.ch/?item="
	item_numbers1 = ['10050', '15994', '15523']
	item_numbers2 = ["422", "11446", "2319", "2775"]
	item_numbers3 = ["422", "11446", "2319", "2775", "1168", "17082", "17104", "18835", "22194", "17620", "19019", '15772', '18984','10725','20076', "18564"]
	# item_numbers = item_numbers1+item_numbers2

	item_numbers = range(int(start), int(end))
	# item_numbers = range(23300, 23305)
	Z,E = 0,0
	iStart = datetime.datetime.now()
	# print("\n=======================================")
	# print('{:<15} {:<6}'.format('ITEMS', len(ALL_ITEMS)))

	print("\n=======================================")
	print('{:<22} {:<6} {:>4}s'.format('NAME', 'ITEM#', 'TIME'))
	print("=======================================")

	for ix in item_numbers:

		# r = random.randint(3, 8)
		# if int(ix)+r % 2 == 0:
		# 	print("ZUG ZUG")
		# 	time.sleep(0.3)

		iStart = datetime.datetime.now()
		url = "{}{}".format(BASE_URL, ix)
		driver.get(url)
		error_box = check_element_exists_by_id('inputbox-error')
		if not error_box:
			I = str(ix)

			if I in ALL_ITEMS.keys():
				iii = "({})".format(ALL_ITEMS[I]['i'])
				print('\n{:<30} {:<8} {:>4}s'.format(ALL_ITEMS[I]['n'], iii, round((datetime.datetime.now() - iStart).total_seconds(), 2)))
				continue
				# if all(k in ALL_ITEMS[I].keys() for k in ['i', 'n', 'image_name']):
					# continue
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

			if const.QUEST_ITEM in upper_items:
				ALL_ITEMS[I]['quest_item'] = True
				i = upper_items.index(const.QUEST_ITEM)
				upper_items.pop(i)

			if any(x for x in upper_items if 'Slot Bag' in x):
				ALL_ITEMS[I]['slot'] = 'Bag'
				i = [x for x,y in enumerate(upper_items) if 'Bag' in y][0]
				bag = upper_items.pop(i)
				num_slots = re.search(r"([\d]+)", bag).group(1)
				ALL_ITEMS[I]['slots'] = int(num_slots)

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

			lower_table = tables[1].find_element(By.XPATH, "./tbody/tr/td")
			ALL_ITEMS[I] = get_lowboys(ALL_ITEMS[I], lower_table)

			tabs = driver.find_element(By.ID, "tabs-generic").find_elements(By.XPATH, "//div[@class='tabs-levels']/div[@class='tabs-level'][last()]/ul/li/a[div[not(contains(text(),'Comments'))] and div[not(contains(text(), 'Screenshots'))]]")

			for tab in tabs:

				# if tab.get_attribute('class') != 'selected':
				tab.click()

				tab_handler(tab, I)


			iStop = datetime.datetime.now()
			NEW['ITEMS']+=1
			# PREVIOUS = "t: {}sec".format(round((iStart - iFinish).total_seconds(), 2))
			iii = "({})".format(ALL_ITEMS[I]['i'])
			nnn = "\n{} (NEW) ".format(ALL_ITEMS[I]['n'])
			print('{:<33} {:<8} {:>4}s'.format(nnn, iii, round((iStop - iStart).total_seconds(), 2)))
			# print("NEW ITEM {:<35} {:>10} {:<15} {:<11} - {:>25}".format(ALL_ITEMS[I]['n'], iii, cl,  const.NPCS[I]['type'], zone_name))

			Z+=1
		# no item found
			# except:
			# 	print('ERROR AT ITEM ({})'.format(ix))
			# 	E+=1
			# 	continue

		else:
			# print('NOT FOUND: ({})'.format(ix))
			NEW['MISSING'] += 1
			continue


	with open(os.path.abspath('../js/all_items.js'), 'w+') as f:
		json.dump(ALL_ITEMS, f, indent=4)


	# for file in const.FILE_LIST:
	# 	ST = file.upper()
	# 	with open(os.path.abspath('../js/{}.js'.format(file)), 'w+') as f:
	# 		json.dump(const.ST, f, indent=4)


	with open(os.path.abspath('../js/itemsets.js'), 'w+') as f:
		json.dump(const.ITEMSETS, f, indent=4)

	with open(os.path.abspath('../js/zones.js'), 'w+') as f:
		json.dump(const.ZONES, f, indent=4)

	with open(os.path.abspath('../js/npcs.js'), 'w+') as f:
		json.dump(const.NPCS, f, indent=4)

	with open(os.path.abspath('../js/spells.js'), 'w+') as f:
		json.dump(const.SPELLS, f, indent=4)

	with open(os.path.abspath('../js/factions.js'), 'w+') as f:
		json.dump(const.FACTIONS, f, indent=4)

	with open(os.path.abspath('../js/quests.js'), 'w+') as f:
		json.dump(const.QUESTS, f, indent=4)

	with open(os.path.abspath('../js/objects.js'), 'w+') as f:
		json.dump(const.OBJECTS, f, indent=4)

	with open(os.path.abspath('image_list.txt'), 'w+') as f:
		for name in const.ALL_IMAGES:
			f.write(name+"\n")


	T = str(datetime.datetime.now() - START_TIME)
	print('==============\nTIME ELAPSED: {}\nMISSING ITEMS: ({})\nERRORS: ({})\n'.format(T, NEW['MISSING'], NEW['ERRORS']))
	print("====== NEW ======\n")
	for k,v in NEW.items():
		print(f"{k:10} {v:>3}")

	driver.close()


def get_mats(row):
	materials = {}
	mat_icons = row.find_elements(By.XPATH, "./td[3]/div/div[@class='iconmedium']")
	for mat in mat_icons:
		mat_link = mat.find_element(By.TAG_NAME, "a")
		mat_href = mat_link.get_attribute('href')

		m = re.search(r"\?item=([\d]+)", mat_href)
		mat_ix = str(m.group(1))
		v = 1 if not mat_link.get_attribute('rel') else int(mat_link.get_attribute('rel'))
		materials[mat_ix] = v

	return materials


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
					create_itemset(i, n, table)
			else:
				continue

		elif text is ("Random Bonuses"):
			if 'stats' not in item_dict.keys():
				item_dict['stats'] = {}

			item_dict['stats']['random'] = True

	return item_dict

def create_npc(ix, row, get_type=False):
	START = datetime.datetime.now()
	if ix not in const.NPCS.keys():

		const.NPCS[ix] = {}
		const.NPCS[ix]['i'] = int(ix)
		name = row.find_element(By.XPATH, "./td[1]/a").text
		const.NPCS[ix]['n'] = name

		react_td = row.find_element(By.XPATH, "./td[span[@class='q2' or @class='q' or @class='q10']]")
		react_td_spans = react_td.find_elements(By.TAG_NAME, 'span')
		a_ = const.REACT[react_td_spans[0].get_attribute('class')]
		h_ = const.REACT[react_td_spans[1].get_attribute('class')]
		const.NPCS[ix]['react'] = [a_, h_]

		if get_type:
			const.NPCS[ix]['type'] = row.find_element(By.XPATH, "./td[@class='small q1'][a[contains(@href, 'npcs=')]]").text

		# there are exceptions where this assumption will be wrong, such as Chromie
		# but they should be few and far between
		else:
			const.NPCS[ix]['type'] = 'Humanoid'
		# class_lvl_text = row.find_element(By.XPATH, "./td[div[@class='small q1'] and not(a)]").text
		class_lvl_text = row.find_element(By.XPATH, "./td[2]").text
		cl = ''
		if "Boss" in class_lvl_text:
			cl = "Boss"

		elif "Elite" in class_lvl_text:
			cl = "Elite"

			if "Rare" in class_lvl_text:
				cl = "Rare "+cl

		matches = re.findall(r"([\d]+)", class_lvl_text)
		if matches:
			const.NPCS[ix]['level'] = [int(x) for x in matches]

		else:
			const.NPCS[ix]['level'] = [0]

		const.NPCS[ix]['class'] = cl
		td = row.find_element(By.XPATH, "./td[3]")
		zone_name = ''
		if check_element_exists_by_css(td, 'a'):

			zone_td = row.find_element(By.XPATH, "./td[a[contains(@href, 'zone')]]")
			zones = zone_td.find_elements(By.TAG_NAME, 'a')
			const.NPCS[ix]['zone'] = []

			for zone in zones:
				href = zone.get_attribute('href')
				m = re.search(r"zone\=([\d]+)", href)
				zone_name = zone.text
				zone_ix = str(m.group(1))
				const.NPCS[ix]['zone'].append(int(zone_ix))

				create_zone(zone_ix, zone_name)


		lvl = 0
		if 'level' in const.NPCS[ix].keys():
			lvl = " - ".join([str(x) for x in const.NPCS[ix]['level']]) if type(const.NPCS[ix]['level']) == list else const.NPCS[ix]['level']

			cl = '' if 'class' not in const.NPCS[ix].keys() else const.NPCS[ix]['class']
			lvl = "??" if cl is 'Boss' else lvl
			lvl = "({})".format(lvl)

		nnn = "{} (NEW)".format(const.NPCS[ix]['n'])
		NEW['NPCS']+=1

	else:
		# zone_name = ', '.join(const.NPCS[ix]['zone'])
		if 'level' not in const.NPCS[ix].keys():
			const.NPCS[ix]['level'] = [0]

		lvl = " - ".join([str(x) for x in const.NPCS[ix]['level']]) if type(const.NPCS[ix]['level']) == list else const.NPCS[ix]['level']
		cl = '' if 'class' not in const.NPCS[ix].keys() else const.NPCS[ix]['class']
		lvl = "??" if cl is 'Boss' else lvl
		lvl = "({})".format(lvl)
		nnn = "{}".format(const.NPCS[ix]['n'])


	FINISH = datetime.datetime.now()
	time_taken = round((FINISH - START).total_seconds(), 2)
	print("NPC: {:<35} {:>10} {:<15} {:<11} {:>8}".format(nnn, lvl, cl,  const.NPCS[ix]['type'], time_taken))



def create_quest(ix, name, row):
	START = datetime.datetime.now()

	if ix not in const.QUESTS.keys():
		const.QUESTS[ix] = {}
		const.QUESTS[ix]['i'] = int(ix)
		const.QUESTS[ix]['n'] = name

		req_text = row.find_element(By.XPATH, "./td[3]").text
		required_lvl = int(req_text) if req_text else 0

		ilvl_list = row.find_element(By.XPATH, "./td[2]").text.split("\n")
		ilvl = int(ilvl_list[0]) if ilvl_list[0] else (required_lvl+5)

		if any(x in y for x in ilvl_list for y in ['Dungeon', 'Group']):
			req = [x for x in ['Dungeon', 'Group'] if x in ilvl_list][0]
			const.QUESTS[ix][req.lower()] = True

		side_icon = row.find_element(By.XPATH, "./td[4]/span").get_attribute("class")
		faction = ""
		if side_icon:
			if side_icon.startswith("alliance"):
				faction = "A"
			else:
				faction = "H"

		location = row.find_element(By.XPATH, "./td[last()]").text
		if location:
			const.QUESTS[ix]['zone'] = location

		const.QUESTS[ix]['requirements'] = {"level": required_lvl}
		const.QUESTS[ix]['ilvl'] = ilvl
		if faction:
			const.QUESTS[ix]['requirements']['faction'] = faction

		NEW['QUESTS'] += 1
		nnn = "{} (NEW)".format(const.QUESTS[ix]['n'])
	else:
		nnn = "{}".format(const.QUESTS[ix]['n'])
		ilvl = const.QUESTS[ix]['ilvl']

	FINISH = datetime.datetime.now()
	time_taken = round((FINISH - START).total_seconds(), 2)
	print("QUEST: {:<35} {:>9} {:<25} {:<11}s".format(nnn, ilvl, location, time_taken))

def create_zone(ix, name):
	START = datetime.datetime.now()

	if ix not in const.ZONES.keys():

		const.ZONES[ix] = {}
		const.ZONES[ix]['i'] = int(ix)
		const.ZONES[ix]['n'] = name
		NEW['ZONES'] += 1
		nnn = "{} (NEW)".format(const.ZONES[ix]['n'])
	else:
		nnn = "{}".format(const.ZONES[ix]['n'])

	iii = "({})".format(ix)
	FINISH = datetime.datetime.now()
	time_taken = round((FINISH - START).total_seconds(), 2)
	print("ZONE: {:<35} {:>9} {:<11}s".format(nnn, iii, time_taken))


def create_object(ix, name):
	START = datetime.datetime.now()

	if ix not in const.OBJECTS.keys():

		const.OBJECTS[ix] = {}
		const.OBJECTS[ix]['i'] = int(ix)
		const.OBJECTS[ix]['n'] = name
		NEW['OBJECTS'] += 1
		nnn = "{} (NEW)".format(const.OBJECTS[ix]['n'])
	else:
		nnn = "{}".format(const.OBJECTS[ix]['n'])

	FINISH = datetime.datetime.now()
	iii = "({})".format(ix)

	time_taken = round((FINISH - START).total_seconds(), 2)
	print("OBJECT: {:<35} {:>9} {:<11}s".format(nnn, iii, time_taken))

def create_spell(ix, name):
	START = datetime.datetime.now()

	if ix not in const.SPELLS.keys():

		const.SPELLS[ix] = {}
		const.SPELLS[ix]['i'] = int(ix)
		const.SPELLS[ix]['n'] = name
		NEW['SPELLS'] += 1
		nnn = "{} (NEW)".format(const.SPELLS[ix]['n'])
	else:
		nnn = "{}".format(const.OBJECTS[I]['n'])

	FINISH = datetime.datetime.now()
	iii = "({})".format(ix)
	time_taken = round((FINISH - START).total_seconds(), 2)

	print("SPELL: {:<35} {:>9} {:<11}s".format(nnn, iii, time_taken))

def create_itemset(id, name, lower_table):
	START = datetime.datetime.now()
	ix = str(id)
	if ix not in const.ITEMSETS.keys():
		NEW['ITEMSETS'] += 1

		nnn = "{} NEW".format(name)
		const.ITEMSETS[ix] = {}
		const.ITEMSETS[ix]['n'] = name
		const.ITEMSETS[ix]['i'] = int(ix)


		# getting the item ids
		elems = lower_table.find_elements(By.XPATH, "./div[@class='q0 indent']/span/a")
		if len(elems) > 0:
			regex = re.compile(r"item\=([\d]+)")
			const.ITEMSETS[ix]['items'] = []
			for elem in elems:
				href = elem.get_attribute('href')
				match = regex.search(href)
				item_id = int(match.group(1))
				const.ITEMSETS[ix]['items'].append(item_id)

		# getting the bonuses
		elems = lower_table.find_elements(By.XPATH, "./span[@class='q0']/span/span")
		if len(elems) > 0:
			const.ITEMSETS[ix]['bonuses'] = {}
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
					const.ITEMSETS[ix]['bonuses'][required_pieces] = {"s": spell_id, "t":t}

				else:
					match_fail_disclaimer('itemset bonus', text, regex)
					continue

	else:
		nnn = "{}".format(name)

	iii = "({})".format(ix)
	FINISH = datetime.datetime.now()
	time_taken = round((FINISH - START).total_seconds(), 2)

	print("ITEMSET: {:<35} {:>9} {:<11}s".format(nnn, iii, time_taken))

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


#NOTE: need Skinned by, reward from, sold by
def tab_handler(_tab, I):
	fn = 'tab_handler'
	# try:
	tab_href = _tab.get_attribute("href")
	tab_matched = re.search(r"\#([\w\-]+)", tab_href)

	if tab_matched:
		tab_id = "tab-{}".format(tab_matched.group(1))
	else:
		match_fail_disclaimer('tab handler, ', item, r"\#([\w\-]+)")
		return

	tab = driver.find_element(By.ID, tab_id)

	reward_from_calls = ["tab-objective-of", "tab-starts", "tab-reward-of", "tab-provided-for"]
	contained_or_gathered_calls = ["tab-gathered-from-object", "tab-contained-in-item", "tab-contained-in-object", "tab-mined-from-object"]
	drop_pick_skin_sold_calls = ["tab-dropped-by", "tab-sold-by", "tab-pick-pocketed-from", "tab-skinned-from"]

	# TAB_OPTIONS = {
	# 	"tab-dropped-by": drop_pick_skin_sold(tab, I, "dropped"),
	# 	"tab-sold-by": drop_pick_skin_sold(tab, I, "sold"),
	# 	"tab-skinned-from": drop_pick_skin_sold(tab, I, "skinned"),
	# 	"tab-pick-pocketed-from": drop_pick_skin_sold(tab, I, "pickpocketed"),
	# 	"tab-disenchanting": disenchant(tab, I),
	# 	"tab-reagant-for": created_by(tab),
	#	"tab-created-by": created_by(tab),
	# 	"tab-reward-of": reward_from(tab, I, 'reward_from'),
	# 	"tab-objective-of": reward_from(tab, I, 'objective'),
	# 	"tab-starts": reward_from(tab, I, 'starts'),
	# 	"tab-gathered-from-object":contained_or_gathered(tab, I, "gathered"),
	# 	"tab-contained-in-item": contained_or_gathered(tab, I, "contained", "items", "./td[1]/div/a"),
	# 	"tab-contained-in-object": contained_or_gathered(tab, I, "contained", "objects"),
	# 	"tab-mined-from-object": contained_or_gathered(tab, I, "mined"),
	# }

	no_data = tab.find_element(By.CSS_SELECTOR, "div.listview-nodata.text").text if check_element_exists_by_css(tab, "div.listview-nodata.text") else False

	if no_data:
		print('** NO DATA FOUND FOR {}'.format(tab_id))
		return
	else:
		# TAB_OPTIONS[tab_id]

		if tab_id in drop_pick_skin_sold_calls:
			if 'dropped' in tab_id:
				which = 'dropped'
			elif 'sold' in tab_id:
				which = 'sold'
			elif 'pick' in tab_id:
				which = 'pickpocketed'
			else:
				which = 'skinned'
			drop_pick_skin_sold(tab, I, which)

		elif tab_id in contained_or_gathered_calls:
			i_or_o = 'object'
			xpath = ''
			if 'contained' in tab_id:
				which = 'contained'
				if 'item' in tab_id:
					i_or_o = 'item'
					xpath = "./td[1]/div/a"

			elif 'gathered' in tab_id:
				which = 'gathered'
			else:
				which = 'mined'

			contained_or_gathered(tab, I, which, i_or_o, xpath)

		elif tab_id in reward_from_calls:
			if 'reward' in tab_id:
				which = 'reward_from'
			elif 'objective' in tab_id:
				which = 'objective'
			elif 'starts' in tab_id:
				which = 'starts'
			else:
				which = 'provided_for'

			reward_from(tab, I, which)

		elif tab_id == 'tab-disenchanting':
			disenchant(tab, I)

		elif tab_id == 'tab-reagent-for':
			reagant_for(tab, I)

		elif tab_id=='tab-created-by':
			created_by(tab, I)
		else:
			print('** NO TAB MATCH FOUND FOR: {}'.format(tab_id))
	# except:
	# 	print('ERROR in {} {}'.format(fn, I))
	# 	log_error(I, fn)


def reward_from(tab, I, which):

	fn = 'reward_from'

	thead = tab.find_element(By.XPATH, "./table[@class='listview-mode-default']/thead")
	thead_keys = thead.text.split("\n")

	trs = tab.find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")
	for row in trs:
		quest_link = row.find_element(By.XPATH, "./td[1]/a")
		quest_name = quest_link.text
		quest_ix = re.search(r"\?quest\=([\d]+)", quest_link.get_attribute('href')).group(1)
		if quest_ix not in const.QUESTS.keys():
			create_quest(quest_ix, quest_name, row)
		else:
			iii = "({})".format(quest_ix)
			nnn = const.QUESTS[quest_ix]['n']

	if which == 'reward_from':
		xpath = "./td[5]/div/div[@class='iconsmall']/a[contains(@href, 'item={}')]".format(I)
		elem = row.find_element(By.XPATH, xpath)
		rel = elem.get_attribute('rel')
		amount = int(rel) if rel else 1
		if which not in ALL_ITEMS[I].keys():
			ALL_ITEMS[I][which] = {}

		ALL_ITEMS[I][which][str(quest_ix)] = amount

	else:
		ALL_ITEMS[I][which] = int(quest_ix)

	# except:
	# 	print('ERROR in {} {}'.format(fn, I))
	# 	log_error(I, fn)



# NOTE: fix threshold issue
def drop_pick_skin_sold(tab, I, which):
	fn = 'drop_pick_skin_sold'

	get_npc_type = False
	if which not in ALL_ITEMS[I].keys():
		ALL_ITEMS[I][which] = {}

	trs = tab.find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")
	if len(trs) < 1:
		print("NO ROWS FOUND IN drop_pick_skin_sold()")
		return

	if which != 'sold':
		get_npc_type = True
		perc_threshold = 0.1
		trs = tab.find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr[td[last()][text() > {}]]".format(perc_threshold))
		while len(trs) < 1: # to insure something is recorded
			perc_threshold = perc_threshold/10
			trs = tab.find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr[td[last()][text() > {}]]".format(perc_threshold))
			if perc_threshold < 0.00001:
				break

	for row in trs:
		href = row.find_element(By.XPATH, "./td[1]/a").get_attribute('href')
		regex = re.compile(r"npc\=([\d]+)")
		matched = regex.search(href)
		npc_id = str(matched.group(1))

		if which != 'sold':
			get_npc_type = True
			chance = round(float(row.find_element(By.XPATH, "./td[last()]").text), 3)
			ALL_ITEMS[I][which][npc_id] = chance

		else:
			ALL_ITEMS[I][which][npc_id] = {}
			row.find_element(By.XPATH, "./td[last()]").text
			v = row.find_element(By.XPATH, "./td[5]").text
			if v != '∞':
				ALL_ITEMS[I][which][npc_id]['stock'] = int(v)

			money_td = row.find_element(By.XPATH, "./td[last()]")
			money_copper = int(money_td.find_element(By.CSS_SELECTOR, "span.moneycopper").text) if check_element_exists_by_css(money_td, 'span.moneycopper') else 0
			money_silver = int(money_td.find_element(By.CSS_SELECTOR, "span.moneysilver").text) if check_element_exists_by_css(money_td, 'span.moneysilver') else 0
			money_gold = int(money_td.find_element(By.CSS_SELECTOR, "span.moneygold").text) if check_element_exists_by_css(money_td, 'span.moneygold') else 0

			ALL_ITEMS[I][which][npc_id]['cost'] = {
				"copper": money_copper, "silver": money_silver, "gold": money_gold,
			}

		create_npc(npc_id, row, get_npc_type)


	# except:
	# 	print('ERROR in {} {}'.format(fn, I))
	# 	log_error(I, fn)

def contained_or_gathered(tab, ix, which, i_or_o, xpath):

	fn = 'contained_or_gathered'
	# try:
	sandwich = which
	xpath = "./td[1]/a" if not xpath else "./td[1]/div/a"
	ttt = i_or_o+"s"

	if sandwich not in ALL_ITEMS[ix].keys():
		ALL_ITEMS[ix][sandwich] = {}
	if i_or_o:
		if ttt not in ALL_ITEMS[ix][sandwich].keys():
			ALL_ITEMS[ix][sandwich][ttt] = {}

	trs = tab.find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")

	for row in trs:

		link = row.find_element(By.XPATH, xpath)
		t = row.find_element(By.XPATH, "./td[last()]").text
		chance = round(float(t), 3)
		href = link.get_attribute('href')
		name = link.text
		matched = re.search(r"\?{}=([\d]+)".format(i_or_o), href)
		id = str(matched.group(1))
		ALL_ITEMS[ix][sandwich][ttt][id] = chance
		if i_or_o == 'object':
			create_object(id, name)
	# except:
	# 	print('ERROR in {} {}'.format(fn, I))
	# 	log_error(I, fn)

def disenchant(tab, I):
	fn = 'disenchant'
	try:
		trs = tab.find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")
		if "disenchant" not in ALL_ITEMS[I].keys():
			ALL_ITEMS[I]["disenchant"] = {}

		for row in trs:
			icon = row.find_element(By.XPATH, "./td[1]/div[@class='iconmedium']")
			t = row.find_element(By.XPATH, "./td[6]").text
			chance = round(float(t), 3)

			link = icon.find_element(By.TAG_NAME, "a")
			href = link.get_attribute('href')
			m = re.search(r"\?item=([\d]+)", href)
			ix = str(m.group(1))
			v = [1]
			if link.get_attribute('rel'):
				rel = link.get_attribute('rel')
				m = re.search(r"([\d]+)\-([\d]+)", rel)
				v = [m.group(1), m.group(2)]

			ALL_ITEMS[I]["disenchant"][ix] = {"chance": chance, "v": v}
	except:
		print('ERROR in {} {}'.format(fn, I))
		log_error(I, fn)

def created_by(tab, I):
	fn = 'created_by'
	trs = tab.find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")
	for row in trs:
		spell_link = row.find_element(By.XPATH, "./td[2]/div/a")
		spell_href = spell_link.get_attribute('href')
		m = re.search(r"\?spell=([\d]+)", spell_href)
		spell_ix = str(m.group(1))
		spell_name = spell_link.text

		if spell_ix not in const.SPELLS.keys():

			create_spell(spell_ix, spell_name)

		if 'created_by' not in ALL_ITEMS[I].keys():
			ALL_ITEMS[I]['created_by'] = {}

			skill_td = row.find_element(By.XPATH, "./td[last()]")

			if check_element_exists_by_css(skill_td, "div.small"):

				prof_text = skill_td.find_element(By.XPATH, "./div[1][@class='small']").text

				yellow = skill_td.find_element(By.XPATH, "./div[@class='small']/span[@class='r2']").text if check_element_exists_by_css(skill_td, 'span.r2') else ''
				green = skill_td.find_element(By.XPATH, "./div[@class='small']/span[@class='r3']").text if check_element_exists_by_css(skill_td, 'span.r3') else ''
				grey = skill_td.find_element(By.XPATH, "./div[@class='small']/span[@class='r4']").text if check_element_exists_by_css(skill_td, 'span.r4') else ''

				for k,skill_lvl in ({'yellow':yellow, 'green':green, 'grey':grey}).items():
					if 'skill' not in ALL_ITEMS[I]['created_by'].keys():
						ALL_ITEMS[I]['created_by']['skill'] = {}

					if skill_lvl:
						ALL_ITEMS[I]['created_by']['skill'][k] = int(skill_lvl)


				ALL_ITEMS[I]['created_by']['profession'] = prof_text

			ALL_ITEMS[I]['created_by']['materials'] = get_mats(row)
	# except:
	# 	print('ERROR in {} ({})'.format(fn, I))
	# 	log_error(I, fn)

def log_error(I, fn):

	if I not in const.ALL_ERRORS.keys():
		const.ALL_ERRORS[I] = {}

	if fn not in const.ALL_ERRORS[I].keys():
		const.ALL_ERRORS[I][fn] = {}
		const.ALL_ERRORS[I][fn]['count'] = 0
	const.ALL_ERRORS[I][fn]['count'] += 1

	NEW['ERRORS'] += 1
	with open(os.path.abspath('../js/ERRORS.js'), 'w+') as f:
		json.dump(const.ALL_ERRORS, f, indent=4)

def reagant_for(tab, I):
	fn = 'reagant_for'
	trs = tab.find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")

	if "creates" not in ALL_ITEMS[I].keys():
		ALL_ITEMS[I]["creates"] = []

	for row in trs:
		icon = row.find_element(By.XPATH, "./td[1]/div[@class='iconmedium']")
		link = icon.find_element(By.TAG_NAME, "a")
		href = link.get_attribute('href')
		m = re.search(r"\?item=([\d]+)", href)
		ix = str(m.group(1))
		spell_link = row.find_element(By.XPATH, "./td[2]/div/a")
		spell_href = spell_link.get_attribute('href')
		m = re.search(r"\?spell=([\d]+)", spell_href)
		spell_ix = str(m.group(1))
		spell_name = spell_link.text

		create_spell(spell_ix, spell_name)

		if ix in ALL_ITEMS.keys():
			if 'materials' not in ALL_ITEMS[ix].keys():
				ALL_ITEMS[ix]['materials'] = get_mats(row)

		ALL_ITEMS[I]["creates"].append({"i":int(ix), "s":int(spell_ix)})
		# elif tab.text.startswith("Objective"):
		# 	trs = driver.find_element(By.ID, "tab-objective-of").find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr]")
		# 	pass

	# except:
	# 	print('ERROR in reagant_for ({})'.format(I))
	# 	log_error(I, fn)

def get_ilvl(infobox):
	fn = "get_ilvl"
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
			NEW['IMAGES'] += 1
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

def match_fail_disclaimer(st, item, regex):
	print("Found '{}' in item: {}, but could not find match".format(st.upper(), item))
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
