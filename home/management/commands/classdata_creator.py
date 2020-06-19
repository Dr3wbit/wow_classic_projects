from home.models import Talent, TalentTree, WoWClass
from django.core.management.base import BaseCommand, CommandError
from django.core.serializers.json import DjangoJSONEncoder

import os, json, re

class Command(BaseCommand):

	help = 'exports class data for selected class'

	def add_arguments(self, parser):
		parser.add_argument("selection", type=str, help='Which class would you like data for')

		# parser.add_argument("-o", "--other", action='store_true', help='Attempts to add basic information')

	def handle(self, *args, **kwargs):
		wow_classes = ['druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'shaman', 'warrior', 'warlock']

		selection = kwargs['selection'].lower()

		class_data = {}

		if selection in wow_classes:

			class_data[selection] = {}

			wowclass = WoWClass.objects.filter(name=selection.title())
			if not wowclass:
				return False

			wowclass = wowclass.first()

			for tree in wowclass.talenttree_set.all():
				tree_name = self.sanitize(tree.name)
				class_data[selection][tree_name] = {}
				class_data[selection][tree_name]['n'] = tree.name
				class_data[selection][tree_name]['blueprint'] = tree.architect

				class_data[selection][tree_name]['talents'] = []


				blueprint = tree.architect
				for y,row in enumerate(blueprint):
					for x,item in enumerate(row):
						if not item:
							continue

						tal = tree.talent_set.filter(x=x, y=y)
						if not tal:
							continue

						tal = tal.first()
						print(tal)
						tal_data = {'n':tal.name, 'img':tal.img, 'max':tal.max_rank, 'd':tal.description, 'x':x, 'y':y}

						s = getattr(tal, 's', None)
						if s:
							tal_data['s'] = tal.s

						if tal.locked:
							tal_data['locked'] = tal.locked.name

						if tal.unlocks:
							tal_data['unlocks'] = tal.unlocks

						class_data[selection][tree_name]['talents'].append(tal_data)




			if not os.path.isdir(os.path.abspath('dumps/talents')):
				os.makedirs('dumps/talents')


		else:
			print('Invalid choice')
			return False

		if class_data:
			path = os.path.abspath('dumps/talents/{}.js'.format(selection))
			with open(path, 'w+') as f:
				json.dump(class_data, f, cls=DjangoJSONEncoder, indent=4)

			# if not os.path.exists(path):
			# 	with open(path, 'w+') as f:
			# 		json.dump(class_data, f, cls=DjangoJSONEncoder, indent=4)


	nope = re.compile(r"[\-]")
	forbidden = re.compile(r"[\:\'\(\)]")

	def sanitize(self, s):
		a = self.forbidden.sub('', str(s))
		a = self.nope.sub(' ', a).strip().replace(' ', '_').lower()
		return(a)
