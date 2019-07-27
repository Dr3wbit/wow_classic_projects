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
NEW = {'IMAGES':0, 'SPELLS':0, 'OBJECTS':0, 'NPCS':0, 'ZONES':0, 'ITEMS':0, 'ITEMSETS':0, 'NPCS':0}
ALL_ITEMS = const.get_item_list(os.path.abspath('../js/all_items.js'))

def main():

	BASE_URL="https://classicdb.ch/?item="
	#item_numbers = ['15772', '18984']
	# item_numbers = ["1168", "17082", "17104", "18835", "22194", "17620", "19019", "15515", "13822", "19865"]
	#item_numbers = ['15772', '18984','10725','20076', "18564"]
	# item_numbers = range(23300, 23305)
	Z,E = 0,0
	iStart = datetime.datetime.now()
	print("\n=======================================")
	print('{:<22} {:<6} {:>4}s'.format('NAME', 'ITEM#', 'TIME'))
	print("=======================================")
	for ix in range(420, 750):

		r = random.randint(3, 8)
		if ix+r % 2 == 0:
			print("ZUG ZUG")
			time.sleep(0.3)

		iStart = datetime.datetime.now()
		url = "{}{}".format(BASE_URL, ix)
		driver.get(url)
		error_box = check_element_exists_by_id('inputbox-error')
		if not error_box:
			I = str(ix)

			if I in ALL_ITEMS.keys():
				iii = "({})".format(ALL_ITEMS[I]['i'])
				print('{:<22} {:<6} {:>4}s'.format(ALL_ITEMS[I]['n'], iii, round((datetime.datetime.now() - iStart).total_seconds(), 2)))
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

				if tab.get_attribute('class') != 'selected':
					tab.click()

				tab_handler(tab, I)


			iFinish = datetime.datetime.now()
			NEW['ITEMS']+=1
			# PREVIOUS = "t: {}sec".format(round((iStart - iFinish).total_seconds(), 2))
			iii = "({})".format(ALL_ITEMS[I]['i'])
			print('{:<22} {:<6} {:>4}s'.format(ALL_ITEMS[I]['n'], iii, round((iFinish - iStart).total_seconds(), 2)))
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
	print('==============\nTIME ELAPSED: {}\nITEMS PROCESSED: ({})\nERRORS: ({})\n'.format(T, Z, E))
	print("====== NEW ITEMS ======\n")
	for k,v in NEW.items():
		print(f"{k:10} {v:>3}")

	driver.close()


def get_mats(id, row):
	materials = {}
	mat_icons = row.find_elements(By.XPATH, "./td[3]/div[@class='iconmedium']")
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
					if i not in const.ITEMSETS.keys():
						create_itemset(i, n, table)
			else:
				continue

		elif text is ("Random Bonuses"):
			if 'stats' not in item_dict.keys():
				item_dict['stats'] = {}

			item_dict['stats']['random'] = True

	return item_dict

def create_npc(I, row):
	const.NPCS[I] = {}
	const.NPCS[I]['i'] = int(I)
	name = row.find_element(By.XPATH, "./td[1]/a").text
	const.NPCS[I]['n'] = name

	react_td = row.find_element(By.XPATH, "./td[span[@class='q2' or @class='q' or @class='q10']]")
	react_td_spans = react_td.find_elements(By.TAG_NAME, 'span')
	a_ = const.REACT[react_td_spans[0].get_attribute('class')]
	h_ = const.REACT[react_td_spans[1].get_attribute('class')]
	const.NPCS[I]['react'] = [a_, h_]

	const.NPCS[I]['type'] = row.find_element(By.XPATH, "./td[@class='small q1'][a[contains(@href, 'npcs=')]]").text

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
		const.NPCS[I]['level'] = matches

	const.NPCS[I]['class'] = cl
	td = row.find_element(By.XPATH, "./td[3]")
	zone_name = ''
	if check_element_exists_by_css(td, 'a'):

		zone_td = row.find_element(By.XPATH, "./td[a[contains(@href, 'zone')]]")
		zones = zone_td.find_elements(By.TAG_NAME, 'a')
		const.NPCS[I]['zone'] = []

		for zone in zones:
			href = zone.get_attribute('href')
			m = re.search(r"zone\=([\d]+)", href)
			zone_name = zone.text
			ix = str(m.group(1))
			const.NPCS[I]['zone'].append(int(ix))

			if ix not in const.ZONES.keys():
				create_zone(ix, zone_name)

	lvl = 0
	if 'level' in const.NPCS[I].keys():
		lvl = " - ".join(const.NPCS[I]['level']) if type(const.NPCS[I]['level']) == list else const.NPCS[I]['level']

	cl = '' if 'class' not in const.NPCS[I].keys() else const.NPCS[I]['class']
	lvl = "??" if cl is 'Boss' else lvl

	lvl = "({})".format(lvl)
	NEW['NPCS']+=1
	print("NEW NPC {:<30} - {:>8} {:<15} {:<11} - {:>25}".format(const.NPCS[I]['n'], lvl, cl,  const.NPCS[I]['type'], zone_name))



def create_quest(ix, name, level):
	const.QUESTS[ix] = {}
	const.QUESTS[ix]['i'] = int(ix)
	const.QUESTS[ix]['n'] = name
	const.QUESTS[ix]['requirements'] = {"level": level}
	NEW['QUESTS'] += 1

def create_zone(ix, name):

	const.ZONES[ix] = {}
	const.ZONES[ix]['i'] = int(ix)
	const.ZONES[ix]['n'] = name
	NEW['ZONES'] += 1

def create_object(ix, name):

	const.OBJECTS[ix] = {}
	const.OBJECTS[ix]['i'] = int(ix)
	const.OBJECTS[ix]['n'] = name
	NEW['OBJECTS'] += 1

def create_spell(ix, name):
	const.SPELLS[ix] = {}
	const.SPELLS[ix]['i'] = int(ix)
	const.SPELLS[ix]['n'] = name
	NEW['SPELLS'] += 1

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
	NEW['ITEMSETS'] += 1
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

def tab_handler(tab, I):

	if tab.text.startswith("Dropped" or "Pickpocket"):
		which = "dropped" if tab.text.startswith("Drop") else "pickpocket"
		tab_id = "tab-dropped-by" if which=="dropped" else "tab-pick-pocketed-from"

		if which not in ALL_ITEMS[I].keys():
			ALL_ITEMS[I][which] = {}

		perc_threshold = 0.1
		trs = driver.find_element(By.ID, tab_id).find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr[td[last()][text() > {}]]".format(perc_threshold))

		while len(trs) < 1: # to insure something is recorded
			perc_threshold = perc_threshold/10
			trs = driver.find_element(By.ID, tab_id).find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr[td[last()][text() > {}]]".format(perc_threshold))

		for row in trs:
			href = row.find_element(By.XPATH, "./td[1]/a").get_attribute('href')
			regex = re.compile(r"npc\=([\d]+)")
			matched = regex.search(href)
			id = str(matched.group(1))
			if id not in const.NPCS.keys():
				create_npc(id, row)

			chance = round(float(row.find_element(By.XPATH, "./td[last()]").text), 3)
			ALL_ITEMS[I][which][id] = chance


	elif tab.text.startswith("Contained" or "Gathered"):
		which = "gathered" if tab.text.startswith("Gather") else "contained"
		if which == "contained":

			tab_href = tab.get_attribute("href")
			regex = re.compile(r"\#([\w-]+)")
			match = regex.search(tab_href)
			item_or_object = "item" if "item" in match.group(1) else "object"

		tab_id = "tab-gathered-from-object" if which=="gathered" else "tab-contained-in-{}".format(item_or_object)
		trs = driver.find_element(By.ID, tab_id).find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")
		if which not in ALL_ITEMS[I].keys():
			ALL_ITEMS[I][which] = {}

		for row in trs:
			link = row.find_element(By.XPATH, "./td[1]/a")
			t = row.find_element(By.XPATH, "./td[last()]").text
			print('TEXT: ', t)
			chance = round(float(t), 3)
			href = link.get_attribute('href')
			m = re.search(r"\?object=([\d]+)", href)
			id = str(m.group(1))
			name = link.text
			ALL_ITEMS[I][which][id] = chance
			if id not in const.OBJECTS.keys():
				create_object(id, name)

	elif tab.text.startswith("Disenchant"):
			trs = driver.find_element(By.ID, "tab-disenchanting").find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")
			if "disenchant" not in ALL_ITEMS[I].keys():
				ALL_ITEMS[I]["disenchant"] = {}

			for row in trs:
				icon = row.find_element(By.XPATH, "./td[1]/div[@class='iconmedium']")
				chance = round(float(row.find_element(By.XPATH, "./td[5]").text), 3)

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

	elif tab.text.startswith("Created"):
		trs = driver.find_element(By.ID, "tab-created-by").find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")
		for row in trs:
			spell_link = row.find_element(By.XPATH, "./td[2]/div/a")
			spell_href = spell_link.get_attribute('href')
			m = re.search(r"\?spell=([\d]+)", spell_href)
			spell_ix = str(m.group(1))
			spell_name = spell_link.text

			if spell_ix not in const.SPELLS.keys():
				create_spell(spell_ix, spell_name)


			if 'materials' not in ALL_ITEMS[I].keys():
				ALL_ITEMS[I]['materials'] = get_mats(spell_ix, row)

	elif tab.text.startswith("Reagant"):
		trs = driver.find_element(By.ID, "tab-reagant-for").find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")
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

			if spell_ix not in const.SPELLS.keys():
				create_spell(spell_ix, spell_name)

			if ix in ALL_ITEMS.keys():
				if 'materials' not in ALL_ITEMS[ix].keys():
					ALL_ITEMS[ix]['materials'] = get_mats(ix, row)


			ALL_ITEMS[I]["creates"].append({"i":int(ix), "s":int(spell_ix)})

	# elif tab.text.startswith("Objective"):
	# 	trs = driver.find_element(By.ID, "tab-objective-of").find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr]")
	# 	pass

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
