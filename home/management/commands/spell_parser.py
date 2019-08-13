from django.core.management.base import BaseCommand, CommandError
import json, os
from home.models import Spell

class Command(BaseCommand):

	def handle(self, *args, **options):
		ALL_SPELLS = self.get_item_list(os.path.abspath('home/management/commands/data/spells.js'))
		for ix, valu in ALL_SPELLS.items():
			try:
				I = int(ix)
				if 't' in valu.keys():
					t = valu['t']
					spell,spell_created = Spell.objects.update_or_create(
						ix=I, t=t, defaults={'ix':I, 't':t}
					)
					if 'n' in valu.keys():
						spell.name = valu['n']

					spell.save()

					if spell_created:
						self.stdout.write(self.style.SUCCESS('Successfully added spell "%s"' % ix))


			except Spell.DoesNotExist:
				raise CommandError('Spell "%s" does not exist' % ix)

	def get_item_list(self, path):
		all_items = ''
		mode = "w+" if not os.path.exists(path) else "r"
		with open(path, mode) as f:
			all_items = json.load(f) if os.path.getsize(path)>0 else {}

		if len(all_items) > 0:
			sorted_dict = dict(sorted(all_items.items()))
			return sorted_dict
		else:
			return all_items
