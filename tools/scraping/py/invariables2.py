import re,os,json

REACT = {
	'q2': 1,
	'q10': -1,
	'q':0,
}

FILE_LIST = ["itemsets", "npcs", "quests", "zones", "objects", "factions", "spells"]

TAB_OPTIONS = {
	"Reward from": "reward-of", "Dropped by": "dropped-by",
	"Sold by": "sold-by", "Disenchanting": "disenchanting",
	"Gathered from":"gathered-from-object", "Reagant for": "reagant-for",
	"Objective of":"objective-of", "Pickpocketed from": "pick-pocketed-from",
	"Contained in": {
		"item": "contained-in-item",
		"object": "contained-in-object"
	}
}

BAD_TABS = ["Comments", "Screenshots"]

QUEST_ITEM = "Quest Item"
BOP = ["Binds when picked up", "Soulbound"]
UNIQUE = 'Unique'
BOE = "Binds when equipped"

REP_LVLS = ["Neutral", "Friendly", "Honored", "Revered", "Exalted"]

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
REP_LVLS = ['Hated', 'Neutral', 'Friendly', 'Honored', 'Revered', 'Exalted']
PROFESSIONS = [
    'Alchemy', 'Enchanting', 'Engineering', 'Blacksmithing', 'Cooking', 'First Aid',
    'Leatherworking', 'Skinning', 'Tailoring', 'Fishing', 'Riding', 'Mining',
    'Herbalism', 'Engineer', 'Leatherworker', 'Hammersmith', 'Lockpicking', 'Armorsmith',
	'Swordsmith', 'Axesmith', 'Weaponsmith'
]

RARITY_CHOICES = {
	"q0": 0,
	"q1": 1,
	"q2": 2,
	"q3": 3,
	"q4": 4,
	"q5": 5,
	"q6": 6,
	"q10": 10
}

RANKS = {
	"ALLIANCE": {
		"Private": 1,
		"Corporal": 2,
		"Sergeant": 3,
		"Master Sergeant": 4,
		"Sergeant Major": 5,
		"Knight": 6,
		"Knight-Lieutenant": 7,
		"Knight-Captain": 8,
		"Knight-Champion": 9,
		"Lieutenant Commander": 10,
		"Commander": 11,
		"Marshal": 12,
		"Field Marshal": 13,
		"Grand Marshal": 14,
	},
	"HORDE": {
		"Scout": 1,
		"Grunt": 2,
		"Sergeant": 3,
		"Senior Sergeant": 4,
		"First Sergeant": 5,
		"Stone Guard": 6,
		"Blood Guard": 7,
		"Legionnaire": 8,
		"Centurion": 9,
		"Champion": 10,
		"Lieutenant General": 11,
		"General": 12,
		"Warlord": 13,
		"High Warlord": 14,
	}

}

REEEs = {
	'ARMOR': re.compile(r"([\d]+) Armor"),
	'DURABILITY': re.compile(r"Durability ([\d]+)"),
	'REQUIRE': re.compile(r"Requires (\w+)"),
}

def get_item_list(path):
	all_items = ''
	mode = "w+" if not os.path.exists(path) else "r"
	with open(path, mode) as f:
		all_items = json.load(f) if os.path.getsize(path)>0 else {}

	if len(all_items) > 0:
		sorted_dict = dict(sorted(all_items.items()))
		return sorted_dict
	else:
		return all_items

def create_image_list(dir):
	regex = re.compile("([\w\_]+).jpg")
	file_list = []
	for _root, _dirs, files in os.walk(dir):
		for name in files:
			match = regex.search(name)
			if match:
				file_name = match.group(1)
				file_list.append(file_name)


	with open(os.path.abspath("image_list.txt"), 'a+') as f:
		for name in set(file_list):
			f.write(name+"\n")

	return file_list

ALL_IMAGES = create_image_list(os.path.abspath('../../../home/static/images/icons/large'))
ALL_ERRORS = get_item_list(os.path.abspath('../js/ERRORS_p2.js'))
ITEMSETS = get_item_list(os.path.abspath('../js/itemsets.js'))
QUESTS = get_item_list(os.path.abspath('../js/quests.js'))

RUNTIME_STATS_V2 = get_item_list(os.path.abspath('../js/runtime_stats_v2.js'))

FN_NAMES = [
	'get_lowboys', 'get_mats', 'extract_stats', 'create_itemset',
	'stop_watch', 'create_quest', 'created_by', 'check_element_exists_by_css', 'check_element_exists_by_id',
	'image_handler', 'get_sell_price', 'get_ilvl'
]
