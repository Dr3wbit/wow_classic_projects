
from home.models import Item,Crafted,Material
import json
import invariables as const


required_fields = ['materials', 'profession']
def main():

    for x in range(1, 25):
		ALL_ITEMS = const.get_item_list(os.path.abspath('../../js/items/items{}.js'.format(x)))

		for ix, val_kilmer in ALL_ITEMS.items():
			I = int(ix)

        	if 'created_by' in val_kilmer.keys():
                if all(x in val_kilmer['created_by'].keys() for x in required_fields):

                    item = Item.objects.get(i=I)
                    prof_name = ['created_by']['profession']
            		prof = Profession.objects.get(name=prof_name)

                    crafted,_ = Crafted.objects.get_or_create(
                        profession=prof, item=item, defaults={
                            'profession':prof, 'item':item
                        }
                    )
                    for k,v in val_kilmer['created_by']['materials'].items():

                        mat_item = Item.objects.get(i=int(k))
                        material,_ = Material.objects.update_or_create(
                            item=mat_item, creates=crafted, amount=int(v),
                            defaults={'item':mat_item, 'creates':crafted, 'amount':int(v)}
                        )
                        crafted.materials.add(material)
                        crafted.save()

                    if 'ilvl' in val_kilmer.keys():
                        if val_kilmer['ilvl'] >= 250:
                        crafted.end_game = True
                        crafted.save()

                    if 'skill' in val_kilmer['created_by'].keys():
                        crafted.skillup = val_kilmer['created_by']['skill']
                        crafted.save()


main()
