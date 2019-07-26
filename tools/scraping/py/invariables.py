import os,json

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
REP_LVLS = ['Hated', 'Neutral', 'Friendly', 'Honored', 'Exalted']
PROFESSIONS = [
    'Alchemy', 'Enchanting', 'Engineering', 'Blacksmithing', 'Cooking', 'First Aid',
    'Leatherworking', 'Skinning', 'Tailoring', 'Fishing', 'Riding', 'Mining',
    'Herbalism'
]

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
		"Legionnare": 8,
		"Centurion": 9,
		"Champion": 10,
		"Lieutenant General": 11,
		"General": 12,
		"Warlord": 13,
		"High Warlord": 14,
	}

}

def get_item_list(path):
	all_items = ''
	mode = "r"
	if not os.path.exists(path):
		mode = "w+"

	with open(path, mode) as f:
		all_items = json.load(f)

	return all_items

ITEMSETS = get_item_list(os.path.abspath('../js/itemsets.js'))
