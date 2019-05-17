
import os, re, urllib.request
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By


CLASS_NAME = "rogue"

#driver = webdriver.Firefox(executable_path=os.path.abspath("geckodriver")) #for firefox
driver = webdriver.Chrome(executable_path=os.path.abspath("chromedriver")) #for chrome
wow_head = "https://classic.wowhead.com/talent-calc/"+CLASS_NAME
driver.get(wow_head)
driver.implicitly_wait(5)

talent_trees_container = driver.find_element(By.CLASS_NAME, 'ctc-tree-container')
talent_trees = talent_trees_container.find_elements(By.CLASS_NAME, 'ctc-tree')

# janitors
r1 = re.compile(r'spell=[\d]+?\/([\w\-]+)', re.M)
r2 = re.compile(r'url\(\"(https://wow\.zamimg\.com.+?\.jpg)', re.M)
p = re.compile('\-')
space_replacer = re.compile('\s')

for tree in talent_trees:

    tree_n = tree.find_element(By.CLASS_NAME, 'ctc-tree-header').find_element(By.TAG_NAME, 'b').text
    tree_name = space_replacer.sub('_', tree_n)
    tree_name = tree_name.lower()
    folder_name = CLASS_NAME+"/"+tree_name
    print("tree name: ", tree_name)
    print("folder name: ", folder_name)

    tree_style_ele = tree.find_element(By.CLASS_NAME, 'ctc-tree-talents').get_attribute("style")

    bg = r2.search(tree_style_ele)
    bg_url = bg.group(1)

    background_filename = tree_name+"_background.jpg"
    bg_path = folder_name+"/"+background_filename


    if not os.path.exists(folder_name):
        os.makedirs(folder_name)

    urllib.request.urlretrieve(bg_url, bg_path)
    talent_icons = tree.find_elements(By.CLASS_NAME, 'ctc-tree-talent')

    for item in talent_icons:
        img_elem = item.find_element(By.TAG_NAME, 'ins')
        link_elem = item.find_element(By.TAG_NAME, 'a')

        href = link_elem.get_attribute("href")

        # gets spell name via url redirect
        response = urllib.request.urlopen(href)
        f = response.geturl()
        m1 = r1.search(f)
        n = m1.group(1)

        # replace the dashes with underscores
        spell_name = p.sub('_', n)

        # get the url for the actual image
        style = img_elem.get_attribute("style")
        m2 = r2.search(style)
        url = m2.group(1)

        file_name = spell_name+".jpg"
        path = folder_name+"/"+file_name

        print("file path: ", path)
        # download and save the image
        urllib.request.urlretrieve(url, path)


parent = driver.find_element(By.ID, "minibox")
sibling = driver.find_element_by_xpath("//div[@id='minibox']/following-sibling::div")

onclick = sibling.get_attribute("onclick") #ShowIconName('inv_misc_stonetablet_07')"

# regex search the onclick result "inv_misc_stonetablet_07.jpg"

# use request to fill

# https://classicdb.ch/images/icons/large/

# https://classicdb.ch/images/icons/medium/inv_misc_stonetablet_07.jpg
