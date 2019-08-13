
from home.models import Quest, Zone
import json
import invariables as const


# requires running ZONE_PARSER first
def main():

    for x in range(1, 25):
		ALL_QUESTS = const.get_item_list(os.path.abspath('../js/items/items{}.js'.format(x)))

		for ix, val in ALL_QUESTS.items():
			I = int(ix)
            n = val['n']
            quest,_ = Quest.objects.update_or_create(
                i=I, n=n, default={'i':I, 'n':n}
            )

            if 'requirements' in val.keys():
                if 'level' in val['requirements'].keys():
                    quest.required_level = int(val['requirements']['level'])
                    quest.save()

            if 'zone' in val.keys():
                if val['zone'] != 'undefined':
                    zone = Zone.objects.get(n=val['zone'])
                    quest.zone = zone
                    quest.save()



main()
