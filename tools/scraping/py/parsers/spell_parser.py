
from home.models import Spell
import json
import invariables as const


def main():

	ALL_SPELLS = const.get_item_list(os.path.abspath('../js/spells.js'))
	for ix, valu in ALL_SPELLS.items():
		I = int(ix)
		if 't' in valu.keys():
			t = valu['t']
			spell,_ = Spell.objects.update_or_create(
				i=I, t=t, defaults={'i':I, 't':t}
			)
			if 'n' in valu.keys():
				spell.n = valu['n']

			spell.save()

main()
