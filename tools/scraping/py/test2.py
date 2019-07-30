import invariables as const
import os, re, urllib.request, json, time, datetime, random
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common import exceptions
from statistics import mean

START_TIME = datetime.datetime.now()
NEW = {'MISSING':0, 'IMAGES':0, 'SPELLS':0, 'OBJECTS':0, 'NPCS':0, 'ZONES':0, 'ITEMS':0, 'ITEMSETS':0, 'NPCS': 0, 'QUESTS':0, 'ERRORS':0}
# ALL_ITEMS = const.get_item_list(os.path.abspath('../js/items2.js'))
ALL_ITEMS = {}

TOTAL_TIMES = dict.fromkeys(const.FN_NAMES, datetime.timedelta())
TOTAL_CALLS = dict.fromkeys(const.FN_NAMES, 0)
# if permissions error: chmod 755 path/to/chromedriver
driver = webdriver.Chrome(executable_path=os.path.abspath("../drivers/chromedriver"))
iStart = datetime.datetime.now()


def main():
	start = 3251
	end = 3315
	BASE_URL="https://classicdb.ch/?item="


	item_numbers = range(int(start), int(end))

	Z = 0
	iStart = datetime.datetime.now()

	print("\n=======================================")
	print('{:<22} {:<6} {:>4}s'.format('NAME', 'ITEM#', 'TIME'))
	print("=======================================")

	for ix in item_numbers:

		iStart = datetime.datetime.now()
		url = "{}{}".format(BASE_URL, ix)
		driver.get(url)
		error_box = check_element_exists_by_id('inputbox-error')
		if not error_box:
			I = str(ix)

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

			if "This Item Begins a Quest" in upper_items:
				i = upper_items.index("This Item Begins a Quest")
				upper_items.pop(i)

				if check_element_exists_by_id("tab-starts"):
					ALL_ITEMS[I]['starts'] = starts_quest()

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
					upper_items[i] = upper_items[i].replace(slot, '', 1).strip()

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

	with open(os.path.abspath('../js/items2.js'), 'a+') as f:
		json.dump(ALL_ITEMS, f, indent=4, sort_keys=True)

	with open(os.path.abspath('image_list.txt'), 'w+') as f:
		for name in const.ALL_IMAGES:
			f.write(name+"\n")


	T = datetime.datetime.now() - START_TIME
	print('==============\nTIME ELAPSED: {}\nMISSING ITEMS: ({})\nERRORS: ({})\n'.format(str(T), NEW['MISSING'], NEW['ERRORS']))
	print("====== NEW ======\n")
	for k,v in NEW.items():
		print(f"{k:10} {v:>3}")

	# total_time = sum(TOTAL_TIMES.values(), datetime.timedelta())

	print(f"\n{'fn':<35} {'h:mm:ss.ms':<15} {'%':>7}%")
	print("----------------------")
	for k,v in TOTAL_TIMES.items():
		if k not in const.RUNTIME_STATS_V2.keys():

			const.RUNTIME_STATS_V2[k] = {
				"t": [],
				"p": [],
				"avg": {},
			}

		if "calls" not in const.RUNTIME_STATS_V2[k].keys():
			const.RUNTIME_STATS_V2[k]['calls'] = []

		if not v:
			v = datetime.timedelta(microseconds=1)

		const.RUNTIME_STATS_V2[k]['t'].append(str(v))
		const.RUNTIME_STATS_V2[k]['calls'].append(TOTAL_CALLS[k])

		times = [datetime.datetime.strptime(x, "%H:%M:%S.%f").time() for x in const.RUNTIME_STATS_V2[k]['t']]
		tds = [datetime.timedelta(hours=x.hour, minutes=x.minute, seconds=x.second, microseconds=x.microsecond) for x in times]
		avg_t = sum(tds, datetime.timedelta())/len(tds)
		const.RUNTIME_STATS_V2[k]['avg']['t'] = str(avg_t)
		perc = round(v/T*100, 2)

		const.RUNTIME_STATS_V2[k]['p'].append(perc)
		const.RUNTIME_STATS_V2[k]['avg']['p'] = round(mean(const.RUNTIME_STATS_V2[k]['p']), 3)

		const.RUNTIME_STATS_V2[k]['avg']['calls'] = round(mean(const.RUNTIME_STATS_V2[k]['calls']), 3)

		print(f"{k:<35} {str(v):<15} {perc:>7}% {TOTAL_CALLS[k]:>5}")

	with open(os.path.abspath('../js/RUNTIME_STATS_V2.js'), 'w+') as f:
		json.dump(const.RUNTIME_STATS_V2, f, indent=4)

	print("\n----------------------")
	print(sum(TOTAL_TIMES.values(), datetime.timedelta()))
	print("\n")
	driver.close()

def starts_quest():
	q = 0
	driver.find_element(By.ID, "tabs-generic").find_element(By.XPATH, "//div[@class='tabs-levels']/div[@class='tabs-level'][last()]/ul/li/a[div[contains(text(), 'Starts')]]").click()
	tab = driver.find_element(By.ID, "tab-starts")
	row = tab.find_element(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")
	quest_link = row.find_element(By.XPATH, "./td[1]/a")
	href = quest_link.get_attribute('href')
	regex = re.compile(r"\?quest\=([\d]+)")
	match = regex.search(href)
	if match:
		q = int(match.group(1))

	return q

def get_mats(row):
	start = datetime.datetime.now()
	materials = {}
	mat_icons = row.find_elements(By.XPATH, "./td[3]/div/div[@class='iconmedium']")
	for mat in mat_icons:
		mat_link = mat.find_element(By.TAG_NAME, "a")
		mat_href = mat_link.get_attribute('href')

		m = re.search(r"\?item=([\d]+)", mat_href)
		mat_ix = str(m.group(1))
		v = 1 if not mat_link.get_attribute('rel') else int(mat_link.get_attribute('rel'))
		materials[mat_ix] = v

	TOTAL_CALLS['get_mats'] +=1
	TOTAL_TIMES['get_mats'] += (datetime.datetime.now() - start)
	return materials


def get_lowboys(item_dict, table):
	start = datetime.datetime.now()
	fn = 'get_lowboys'
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

	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
	TOTAL_CALLS[fn] +=1
	return item_dict




def create_quest(ix, name, row):
	start = datetime.datetime.now()
	fn = 'create_quest'
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
		print("QUEST: {:<35} {:>9} {:<25}".format(nnn, ilvl, location))

	TOTAL_CALLS[fn] +=1
	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)

def create_zone(ix, name):
	start = datetime.datetime.now()
	if ix not in const.ZONES.keys():

		const.ZONES[ix] = {}
		const.ZONES[ix]['i'] = int(ix)
		const.ZONES[ix]['n'] = name
		NEW['ZONES'] += 1
		stop_watch('zone', name, ix)

	TOTAL_CALLS['create_zone'] +=1

	TOTAL_TIMES['create_zone'] += (datetime.datetime.now() - start)

def stop_watch(what, name, ix):
	start = datetime.datetime.now()
	nnn = "{}(NEW)".format(name)
	iii = "({})".format(ix)
	www = "{}:".format(what.upper())
	print("{:<10} {:<35} {:>10}".format(www, nnn, iii))
	TOTAL_TIMES['stop_watch'] += (datetime.datetime.now() - start)

def create_object(ix, name):
	start = datetime.datetime.now()
	if ix not in const.OBJECTS.keys():

		const.OBJECTS[ix] = {}
		const.OBJECTS[ix]['i'] = int(ix)
		const.OBJECTS[ix]['n'] = name
		NEW['OBJECTS'] += 1

		stop_watch('object', name, ix)

	TOTAL_CALLS['create_object'] +=1

	TOTAL_TIMES['create_object'] += (datetime.datetime.now() - start)


def create_spell(ix, name):
	start = datetime.datetime.now()
	if ix not in const.SPELLS.keys():

		const.SPELLS[ix] = {}
		const.SPELLS[ix]['i'] = int(ix)
		const.SPELLS[ix]['n'] = name
		NEW['SPELLS'] += 1
		stop_watch('spell', name, ix)

	TOTAL_CALLS['create_spell'] +=1

	TOTAL_TIMES['create_spell'] += (datetime.datetime.now() - start)


def create_itemset(id, name, lower_table):
	start = datetime.datetime.now()
	fn = 'create_itemset'
	ix = str(id)
	if ix not in const.ITEMSETS.keys():
		NEW['ITEMSETS'] += 1

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

		stop_watch('itemset', name, ix)

	TOTAL_CALLS[fn] += 1
	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)

# attempts to get armor, stats, damage, resists, and durability
def extract_stats(items, item_dict):
	start = datetime.datetime.now()
	fn = 'extract_stats'
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


	TOTAL_CALLS[fn] += 1
	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
	return item_dict



def created_by(tab, I):
	start = datetime.datetime.now()
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

	TOTAL_CALLS[fn] += 1

	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
	# except:
	# 	print('ERROR in {} ({})'.format(fn, I))
	# 	log_error(I, fn)

def reagant_for(tab, I):
	start = datetime.datetime.now()
	fn = 'reagant_for'
	trs = tab.find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")

	if "creates" not in ALL_ITEMS[I].keys():
		ALL_ITEMS[I]["creates"] = {}
	for row in trs:
		icon = row.find_element(By.XPATH, "./td[1]/div[@class='iconmedium']")
		link = icon.find_element(By.XPATH, "./a")
		href = link.get_attribute('href')
		link_re = re.compile(r"\?item\=([\d]+)")
		link_match = link_re.search(href)
		if link_match:
			ix = str(link_match.group(1))
			if ix in ALL_ITEMS.keys():
				if 'materials' not in ALL_ITEMS[ix].keys():
					ALL_ITEMS[ix]['materials'] = get_mats(row)
		else:
			match_fail_disclaimer('reagant_for, item', I, link_re)
			continue

		spell_link = row.find_element(By.XPATH, "./td[2]/div/a")
		spell_href = spell_link.get_attribute('href')
		spell_link_re = re.compile(r"\?spell=([\d]+)")
		spell_match = spell_link_re.search(spell_href)
		if spell_match:
			spell_ix = str(spell_match.group(1))
			spell_name = spell_link.text
			if spell_ix not in const.SPELLS.keys():
				create_spell(spell_ix, spell_name)
		else:
			match_fail_disclaimer('reagant_for, spell', I, spell_link_re)
			continue


		ALL_ITEMS[I]["creates"][spell_ix] = int(ix)
		# elif tab.text.startswith("Objective"):
		# 	trs = driver.find_element(By.ID, "tab-objective-of").find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr]")
		# 	pass

	TOTAL_CALLS[fn] += 1

	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)

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

def get_ilvl(infobox):
	start = datetime.datetime.now()
	fn = "get_ilvl"
	ilvl = 0
	regex = re.compile(r"([\d]+)", re.M)
	matched = regex.search(infobox.find_elements(By.TAG_NAME, 'li')[0].text)
	if matched:
		ilvl = int(matched.group(1))

	TOTAL_CALLS[fn] += 1

	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
	return ilvl


def get_sell_price(moneybox):
	start = datetime.datetime.now()
	fn = 'get_sell_price'
	sells_for = {'gold':0, 'silver':0, 'copper':0}
	for k,v in sells_for.items():
		s = 'span.money{}'.format(k)
		if check_element_exists_by_css(moneybox, s):
			x = moneybox.find_element(By.CSS_SELECTOR, s).text
			sells_for[k] = int(x)

	TOTAL_CALLS[fn] += 1

	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
	return sells_for

def image_handler():
	start = datetime.datetime.now()
	fn = "image_handler"
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

	TOTAL_CALLS[fn] += 1

	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
	return icon_name, stack_size

def check_element_exists_by_id(id):
	start = datetime.datetime.now()
	fn = "check_element_exists_by_id"
	try:
		driver.find_element(By.ID, id)
	except exceptions.NoSuchElementException:
		TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
		return False

	TOTAL_CALLS[fn] += 1
	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
	return True

def check_element_exists_by_css(element, selector):
	start = datetime.datetime.now()
	fn = "check_element_exists_by_css"

	try:
		element.find_element(By.CSS_SELECTOR, selector)
	except exceptions.NoSuchElementException:
		TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
		return False

	TOTAL_CALLS[fn] += 1
	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
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
