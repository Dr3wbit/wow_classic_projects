from django.contrib.auth import models

def add_navlinks_to_context(request):
	context = {}
	context['nav_items'] = {
		"talent_calc": "Talent Calculator",
		"consume_tool": "Consume Tool", 
		"enchant_tool": "Enchant Tool",
		"contact": "Contact"
		}

	return context
