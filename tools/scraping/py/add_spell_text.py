
import json, os
import invariables as const

SPELLS = const.get_item_list(os.path.abspath('../js/spells.js'))
def main():

	for x in range(1, 15):
		ALL_ITEMS = const.get_item_list(os.path.abspath('../js/items/items{}.js'.format(x)))
		if ALL_ITEMS:
			for ix, v in ALL_ITEMS.items():
				if 'effects' in v.keys():
					if 'equip' in v['effects'].keys():
						for xd in v['effects']['equip']:
							if 't' in xd.keys():
								spell_id = str(xd['s'])
								spell_text = xd['t']

								if spell_id in SPELLS.keys():
									SPELLS[spell_id]['t'] = spell_text
								else:
									SPELLS[spell_id] = {}
									SPELLS[spell_id]['i'] = int(spell_id)
									SPELLS[spell_id]['t'] = spell_text
									
					elif 'proc' in v['effects'].keys():
						for xd in v['effects']['proc']:
							if 't' in xd.keys():
								spell_id = str(xd['s'])
								spell_text = xd['t']
								if spell_id in SPELLS.keys():
									SPELLS[spell_id]['t'] = spell_text
								else:
									SPELLS[spell_id] = {}
									SPELLS[spell_id]['i'] = int(spell_id)
									SPELLS[spell_id]['t'] = spell_text

					# if 'proc' in v['effects'].keys():
					# 	if 't' in v['effects']['equip'].keys():
					# 		spell_id = str(v['use']['s'])
					# 		spell_text = v['use']['t']
					# 		if spell_id in SPELLS.keys():
					# 			SPELLS[spell_id]['t'] = spell_text
					# 		else:
					# 			SPELLS[spell_id] = {}
					# 			SPELLS[spell_id]['i'] = int(spell_id)
					# 			SPELLS[spell_id]['t'] = spell_text

				if 'use' in v.keys():
					spell_id = str(v['use']['s'])
					if 't' in v['use'].keys():
						spell_text = v['use']['t']
						if spell_id in SPELLS.keys():
							SPELLS[spell_id]['t'] = spell_text

						else:
							SPELLS[spell_id] = {}
							SPELLS[spell_id]['i'] = int(spell_id)
							SPELLS[spell_id]['t'] = spell_text

	with open(os.path.abspath('../js/spells.js'), 'w+') as f:
		json.dump(SPELLS, f, indent=4)

main()
