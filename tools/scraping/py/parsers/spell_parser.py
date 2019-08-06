
from home.models import Spell
import json
import invariables as const


def main():

	ALL_SPELLS = const.get_item_list(os.path.abspath('../js/spells.js'))
	for ix, val_kilmer in ALL_SPELLS.items():
		I = int(ix)
        if 't' in val_kilmer.keys():
            t = val_kilmer['t']
            spell,_ = Spell.objects.update_or_create(
                i=I, t=t, defaults={'i':I, 't':t}
            )
            if 'n' in val_kilmer.keys():
                spell.n = val_kilmer['n']

            spell.save()

main()
