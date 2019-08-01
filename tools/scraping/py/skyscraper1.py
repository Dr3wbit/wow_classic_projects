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
ALL_ITEMS = const.get_item_list(os.path.abspath('../js/items/items9.js'))
TOTAL_TIMES = dict.fromkeys(const.FN_NAMES, datetime.timedelta())
TOTAL_CALLS = dict.fromkeys(const.FN_NAMES, 0)
# if permissions error: chmod 755 path/to/chromedriver
driver = webdriver.Chrome(executable_path=os.path.abspath("../drivers/chromedriver"))
iStart = datetime.datetime.now()


def main():
	start = 9500
	end = 9750
	BASE_URL = "https://classicdb.ch/?item="

	item_numbers = range(int(start), int(end))

	iStart = datetime.datetime.now()

	print("\n=======================================")
	print('{:<22} {:<6} {:>4}s'.format('NAME', 'ITEM#', 'TIME'))
	print("=======================================")

	for ix in item_numbers:
		# try:

		url = "{}{}".format(BASE_URL, ix)
		driver.get(url)
		error_box = check_element_exists_by_id('inputbox-error')
		if not error_box:

			I = str(ix)
			if I not in ALL_ITEMS.keys():
				ALL_ITEMS[I] = {}
				NEW['ITEMS'] += 1

			tabs = driver.find_element(By.ID, "tabs-generic").find_elements(By.XPATH, "//div[@class='tabs-levels']/div[@class='tabs-level'][last()]/ul/li/a[div[not(contains(text(),'Comments'))] and div[not(contains(text(), 'Screenshots'))]]")
			for tab in tabs:
				tab.click()
				tab_handler(tab, I)


			iStop = datetime.datetime.now()

			# PREVIOUS = "t: {}sec".format(round((iStart - iFinish).total_seconds(), 2))
			print('{:<8} {:>4}s'.format(I, round((iStop - iStart).total_seconds(), 2)))
			# print("NEW ITEM {:<35} {:>10} {:<15} {:<11} - {:>25}".format(ALL_ITEMS[I]['n'], iii, cl,  const.NPCS[I]['type'], zone_name))

		else:
			# print('NOT FOUND: ({})'.format(ix))
			NEW['MISSING'] += 1
			continue
		#
		# except:
		# 	NEW['ERRORS'] += 1
		# 	save_and_close()

	save_and_close()

def save_and_close():
	with open(os.path.abspath('../js/items9.js'), 'w+') as f:
		json.dump(ALL_ITEMS, f, indent=4)

	with open(os.path.abspath('../js/ERRORS.js'), 'w+') as f:
		json.dump(const.ALL_ERRORS, f, indent=4)

	with open(os.path.abspath('../js/zones.js'), 'w+') as f:
		json.dump(const.ZONES, f, indent=4)

	with open(os.path.abspath('../js/npcs.js'), 'w+') as f:
		json.dump(const.NPCS, f, indent=4)

	with open(os.path.abspath('../js/spells.js'), 'w+') as f:
		json.dump(const.SPELLS, f, indent=4)

	with open(os.path.abspath('../js/factions.js'), 'w+') as f:
		json.dump(const.FACTIONS, f, indent=4)

	# with open(os.path.abspath('../js/quests.js'), 'w+') as f:
	# 	json.dump(const.QUESTS, f, indent=4)

	with open(os.path.abspath('../js/objects.js'), 'w+') as f:
		json.dump(const.OBJECTS, f, indent=4)


	T = datetime.datetime.now() - START_TIME
	print('==============\nTIME ELAPSED: {}\nMISSING ITEMS: ({})\nERRORS: ({})\n'.format(str(T), NEW['MISSING'], NEW['ERRORS']))
	print("====== NEW ======\n")
	for k,v in NEW.items():
		print(f"{k:10} {v:>3}")

	# total_time = sum(TOTAL_TIMES.values(), datetime.timedelta())

	print(f"\n{'fn':<35} {'h:mm:ss.ms':<15} {'%':>7}%")
	print("----------------------")
	for k,v in TOTAL_TIMES.items():
		if k not in const.RUNTIME_STATS.keys():

			const.RUNTIME_STATS[k] = {
				"t": [],
				"p": [],
				"avg": {},
			}

		if "calls" not in const.RUNTIME_STATS[k].keys():
			const.RUNTIME_STATS[k]['calls'] = []

		if not v:
			v = datetime.timedelta(microseconds=1)

		const.RUNTIME_STATS[k]['t'].append(str(v))
		const.RUNTIME_STATS[k]['calls'].append(TOTAL_CALLS[k])

		times = [datetime.datetime.strptime(x, "%H:%M:%S.%f").time() for x in const.RUNTIME_STATS[k]['t']]
		tds = [datetime.timedelta(hours=x.hour, minutes=x.minute, seconds=x.second, microseconds=x.microsecond) for x in times]
		avg_t = sum(tds, datetime.timedelta())/len(tds)
		const.RUNTIME_STATS[k]['avg']['t'] = str(avg_t)
		perc = round(v/T*100, 2)

		const.RUNTIME_STATS[k]['p'].append(perc)
		const.RUNTIME_STATS[k]['avg']['p'] = round(mean(const.RUNTIME_STATS[k]['p']), 3)

		const.RUNTIME_STATS[k]['avg']['calls'] = round(mean(const.RUNTIME_STATS[k]['calls']), 3)

		print(f"{k:<35} {str(v):<15} {perc:>7}% {TOTAL_CALLS[k]:>5}")

	with open(os.path.abspath('../js/RUNTIME_STATS.js'), 'w+') as f:
		json.dump(const.RUNTIME_STATS, f, indent=4)

	print("\n----------------------")
	print(sum(TOTAL_TIMES.values(), datetime.timedelta()))
	print("\n")
	driver.close()


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

def create_npc(ix, row, get_type=False):
	start = datetime.datetime.now()
	fn = 'create_npc'
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
		NEW['NPCS'] += 1
		print("NPC: {:<35} {:>10} {:<15} {:<11}".format(nnn, lvl, cl,  const.NPCS[ix]['type']))


	TOTAL_CALLS[fn] +=1
	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)


#
# def create_quest(ix, name, row):
# 	start = datetime.datetime.now()
# 	fn = 'create_quest'
# 	if ix not in const.QUESTS.keys():
# 		const.QUESTS[ix] = {}
# 		const.QUESTS[ix]['i'] = int(ix)
# 		const.QUESTS[ix]['n'] = name
#
# 		req_text = row.find_element(By.XPATH, "./td[3]").text
# 		required_lvl = int(req_text) if req_text else 0
#
# 		ilvl_list = row.find_element(By.XPATH, "./td[2]").text.split("\n")
# 		ilvl = int(ilvl_list[0]) if ilvl_list[0] else (required_lvl+5)
#
# 		if any(x in y for x in ilvl_list for y in ['Dungeon', 'Group']):
# 			req = [x for x in ['Dungeon', 'Group'] if x in ilvl_list][0]
# 			const.QUESTS[ix][req.lower()] = True
#
# 		side_icon = row.find_element(By.XPATH, "./td[4]/span").get_attribute("class")
# 		faction = ""
# 		if side_icon:
# 			if side_icon.startswith("alliance"):
# 				faction = "A"
# 			else:
# 				faction = "H"
#
# 		location = row.find_element(By.XPATH, "./td[last()]").text
# 		if location:
# 			const.QUESTS[ix]['zone'] = location
#
# 		const.QUESTS[ix]['requirements'] = {"level": required_lvl}
# 		const.QUESTS[ix]['ilvl'] = ilvl
# 		if faction:
# 			const.QUESTS[ix]['requirements']['faction'] = faction
#
# 		NEW['QUESTS'] += 1
# 		nnn = "{} (NEW)".format(const.QUESTS[ix]['n'])
# 		print("QUEST: {:<35} {:>9} {:<25}".format(nnn, ilvl, location))
#
# 	TOTAL_CALLS[fn] +=1
# 	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)

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


#NOTE: need Skinned by, reward from, sold by
def tab_handler(_tab, I):
	start = datetime.datetime.now()
	fn = 'tab_handler'
	# try:
	tab_href = _tab.get_attribute("href")
	tab_matched = re.search(r"\#([\w\-]+)", tab_href)

	if tab_matched:
		tab_id = "tab-{}".format(tab_matched.group(1))
	else:
		match_fail_disclaimer('tab handler, ', I, r"\#([\w\-]+)")
		TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
		return

	tab = driver.find_element(By.ID, tab_id)

	no_data = tab.find_element(By.CSS_SELECTOR, "div.listview-nodata.text").text if check_element_exists_by_css(tab, "div.listview-nodata.text") else False

	if no_data:
		print('** NO DATA FOUND FOR {}'.format(tab_id))
		TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
		return
	else:
		# TAB_OPTIONS[tab_id]
		if tab_id in const.drop_pick_skin_sold_calls:
			if tab_id == "tab-dropped-by":
				which = 'dropped'
			elif tab_id == "tab-sold-by":
				which = 'sold'
			elif tab_id ==  "tab-pick-pocketed-from":
				which = 'pickpocketed'
			else:
				which = 'skinned'

			drop_pick_skin_sold(tab, I, which)

		elif tab_id in const.contained_or_gathered_calls:
			i_or_o = 'object'
			xpath = ''
			if 'contained' in tab_id:
				which = 'contained'
				if 'item' in tab_id:
					i_or_o = 'item'
					xpath = "./td[1]/div/a"

			elif tab_id == "tab-gathered-from-object":
				which = 'gathered'
			else:
				which = 'mined'

			contained_or_gathered(tab, I, which, i_or_o, xpath)

		elif tab_id in const.reward_from_calls:
			if tab_id == "tab-reward-of":
				which = 'reward_from'
			elif tab_id == "tab-objective-of":
				which = 'objective'
			else:
				which = 'provided_for'

			reward_from(tab, I, which)

		elif tab_id == 'tab-disenchanting':
			disenchant(tab, I)

		elif tab_id == 'tab-reagent-for':
			reagant_for(tab, I)

		# elif tab_id=='tab-created-by':
		# 	created_by(tab, I)

		# expected: tab-currency-for, tab-created-by, tab-fished-in
		else:
			if tab_id not in const.ALL_ERRORS["missing_tabs"].keys():
				const.ALL_ERRORS["missing_tabs"][tab_id] = {}
				const.ALL_ERRORS["missing_tabs"][tab_id]['count'] = 0
				const.ALL_ERRORS["missing_tabs"][tab_id]['i'] = []

			const.ALL_ERRORS["missing_tabs"][tab_id]['count'] += 1
			const.ALL_ERRORS["missing_tabs"][tab_id]['i'].append(int(I))

			print('** NO TAB MATCH FOUND FOR: {}'.format(tab_id))
	# except:
	# 	print('ERROR in {} {}'.format(fn, I))
	# 	log_error(I, fn)

	TOTAL_CALLS[fn] += 1
	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)

def starts_quest(tab, I):
	trs = tab.find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")
	for row in trs:
		quest_link = row.find_element(By.XPATH, "./td[1]/a")
		href = quest_link.get_attribute('href')
		regex = re.compile(r"\?quest\=([\d]+)")
		match = regex.search(href)
		if match:
			ALL_ITEMS[I].starts = int(match.group(1))

def reward_from(tab, I, which):
	start = datetime.datetime.now()
	fn = 'reward_from'

	#thead = tab.find_element(By.XPATH, "./table[@class='listview-mode-default']/thead")
	#thead_keys = thead.text.split("\n")

	trs = tab.find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")
	for row in trs:
		quest_link = row.find_element(By.XPATH, "./td[1]/a")
		# quest_name = quest_link.text
		quest_ix = re.search(r"\?quest\=([\d]+)", quest_link.get_attribute('href')).group(1)
		# if quest_ix not in const.QUESTS.keys():
			# create_quest(quest_ix, quest_name, row)
		#else:
			#iii = "({})".format(quest_ix)
			#nnn = const.QUESTS[quest_ix]['n']

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

	TOTAL_CALLS[fn] += 1
	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)



# NOTE: fix threshold issue
def drop_pick_skin_sold(tab, I, which):
	start = datetime.datetime.now()
	fn = 'drop_pick_skin_sold({})'.format(which)

	get_npc_type = False
	if which not in ALL_ITEMS[I].keys():
		ALL_ITEMS[I][which] = {}

	trs = tab.find_elements(By.XPATH, "./table[@class='listview-mode-default']/tbody/tr")
	if len(trs) < 1:
		print("NO ROWS FOUND IN drop_pick_skin_sold()")

		TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
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

	max_trs = min(len(trs), 20)
	for row in trs[:max_trs]:
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

		if npc_id not in const.NPCS.keys():

			create_npc(npc_id, row, get_npc_type)

	TOTAL_CALLS[fn] += 1
	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)


	# except:
	# 	print('ERROR in {} {}'.format(fn, I))
	# 	log_error(I, fn)

def contained_or_gathered(tab, ix, which, i_or_o, xpath):
	start = datetime.datetime.now()
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
		obj_id = str(matched.group(1))
		ALL_ITEMS[ix][sandwich][ttt][obj_id] = chance
		if i_or_o == 'object':
			create_object(obj_id, name)

	TOTAL_CALLS[fn] += 1

	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)
	# except:
	# 	print('ERROR in {} {}'.format(fn, I))
	# 	log_error(I, fn)

def disenchant(tab, I):
	fn = 'disenchant'
	start = datetime.datetime.now()
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

	TOTAL_CALLS[fn] += 1

	TOTAL_TIMES[fn] += (datetime.datetime.now() - start)

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
