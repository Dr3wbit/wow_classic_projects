from django.contrib.auth import models

def add_navlinks_to_context(request):
	context = {}
	context['nav_items'] = {
		"talent_calc": "Talent Calculator",
		"profession_tool": "Profession Tool", 
		"enchant_tool": "Enchant Tool",
		"contact": "Contact"
		}

	return context
