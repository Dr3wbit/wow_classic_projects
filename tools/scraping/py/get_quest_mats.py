import os, re, json
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common import exceptions

# prefix = int(input("Enter number 1-23: "))


def main():
	# start = prefix*1000
	# end = (prefix+1)*1000
	driver = webdriver.Chrome(executable_path=os.path.abspath("../drivers/chromedriver"))
	BASE_URL = "https://classicdb.ch/?quest="

	# item_numbers = range(int(start), int(end))
	for x in range(1,25):
		ALL_ITEMS = get_item_list(os.path.abspath('../js/items/items{}.js'.format(x)))

		for ix, valu in ALL_ITEMS.items():
			if 'consume' in valu.keys():
				if 'reward_from' in valu.keys() and 'sold' not in valu.keys():

					quest_id,step = valu['reward_from'].popitem()
					url = "{}{}".format(BASE_URL, quest_id)
					driver.get(url)

					print('Consume ({}) rewarded from ({})'.format(ix, quest_id))

					if check_element_exists_by_css(driver, "table.iconlist"):

						valu['reward_from']['quest'] = int(quest_id)
						valu['reward_from']['step'] = int(step)
						rows = driver.find_element(By.CSS_SELECTOR, "table.iconlist").find_elements(By.XPATH, "./tbody/tr")

						for row in rows:
							if check_element_exists_by_css(row, "div.iconsmall"):
								link = row.find_element(By.XPATH, "./th/div/a")
								href = link.get_attribute('href')
								amount = int(link.get_attribute('rel'))
								match = re.search(r"\?item=([\d]+)", href)
								name = row.find_element(By.XPATH, "./td/span").text
								if match:
									if 'materials' not in valu['reward_from'].keys():
										valu['reward_from']['materials'] = {}

									item_ix = match.group(1)
									valu['reward_from']['materials'][str(item_ix)] = amount
									print('Added {}'.format(name))

								else:
									print('no match')

							else:
								print('no icons found for quest ({})'.format(quest_id))

					else:
						print('table.iconlist not found ({})'.format(ix))

			else:
				continue

		with open(os.path.abspath('../js/items/items{}.js'.format(x)), 'w+') as f:
			json.dump(ALL_ITEMS, f, indent=4)



def check_element_exists_by_id(id):
	try:
		driver.find_element(By.ID, id)
	except exceptions.NoSuchElementException:
		return False

	return True

def check_element_exists_by_css(element, selector):
	try:
		element.find_element(By.CSS_SELECTOR, selector)
	except exceptions.NoSuchElementException:
		return False

	return True


def get_item_list(path):
	all_items = ''
	mode = "w+" if not os.path.exists(path) else "r"
	with open(path, mode) as f:
		all_items = json.load(f) if os.path.getsize(path)>0 else {}

	if len(all_items) > 0:
		sorted_dict = dict(sorted(all_items.items()))
		return sorted_dict
	else:
		return all_items

main()
