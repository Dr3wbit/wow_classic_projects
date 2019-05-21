
import os, re, urllib.request
from urllib.parse import urlparse
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.common import exceptions


prof_text = {'Fished':'fishing', 'Gathered':'herbalism', 'Mined':'mining',
            'Disenchanted':'enchanting', 'Skinned':'skinning'}

other_text = {'Dropped': 'drop', 'Sold': 'vendor'}
image_size = 'small'


r1 = re.compile(r'spell=[\d]+?\/([\w\-]+)', re.M)
get_url = re.compile(r'url\(\"(https://wow\.zamimg\.com.+?\.jpg)', re.M)
class_from_url = re.compile(r"url\(\"(https://wow\.zamimg\.com.+?\/class\_(\w+)\.jpg)", re.M)
icon_re = re.compile(r"'(\w*)'")

# jannys
p = re.compile('\-')
space_replacer = re.compile('\s')
word_exceptions = ['of', 'the']

def main():
    # choice = input("image category:") or "materials"
    choice = 'materials'
    # image_size = input("image size (small / medium / large )") or 'small'
    # image_size = 'small'

    if choice == "materials":
        BASE_URL = "https://classicdb.ch/?items"
    else:
        BASE_URL = "https://classic.wowhead.com/talent-calc"

    get_images(choice, BASE_URL)




def title_case(s):
    a = s.replace('_', ' ')
    word_list = a.split()

    for i,word in enumerate(word_list):
        if word not in word_exceptions:
            word_list[i] = word.title()

    c = ' '.join(word_list)
    return(c)

def get_images(choice, BASE_URL):
    driver = webdriver.Chrome(executable_path=os.path.abspath("chromedriver"))
    driver.get(BASE_URL)
    driver.implicitly_wait(5)

    if choice == 'materials':
        materials_filename = input('enter filepath for list of icons to be downloaded') or "icon_download_list.txt"

        with open(materials_filename, 'r') as f:
        	content = f.read()
        	materials_list = content.split()

        materials_list_copy = materials_list.copy()

        try:

            for item in materials_list:
                driver.implicitly_wait(3)

                search_bar = driver.find_element(By.CLASS_NAME, 'search-database')
                search_bar.send_keys(item)
                search_bar.send_keys(Keys.ENTER)

                # try:
                h1 = driver.find_elements(By.CSS_SELECTOR, 'h1')
                found_search = False

                for text in h1:
                    ## look for the presence of 'search' in h1 elements
                    ## don't immediately act if we find it, as it might cause issues with selenium
                    search_text = text.get_attribute("textContent")
                    print(search_text)

                    if 'Search' in search_text:
                        found_search = True


                if found_search:
                    a = title_case(item)

                    b = driver.find_element(By.LINK_TEXT, a)
                    b.click()

                driver.implicitly_wait(3)

                tab_parent = driver.find_element(By.CSS_SELECTOR, 'ul.tabs')
                tabs = tab_parent.find_elements(By.TAG_NAME, 'li')

                is_prof = False
                folder_name = ''

                for tab in tabs:
                    div = tab.find_element(By.TAG_NAME, 'div')
                    tab_text = div.get_attribute('textContent')

                    if tab_text.startswith(tuple(prof_text.keys())):
                        is_prof = True
                        key = tab_text.split()[0]
                        folder_name = prof_text[key]

                    elif ((not folder_name and not is_prof) and tab_text.startswith(tuple(other_text.keys()))):

                        key = tab_text.split()[0]
                        folder_name = other_text[key]

                    elif not folder_name and not is_prof:
                        folder_name = 'other'


                icon = driver.find_element(By.CSS_SELECTOR, "div#minibox + div")
                icon_match = icon_re.search(icon.get_attribute("onclick"))
                icon_name = icon_match.group(1)

                folder_path = "../images/icons/small/materials/"+folder_name

                full_path = folder_path+"/"+item+".jpg"

                if not os.path.exists(folder_path):
                    os.makedirs(folder_path)

                if os.path.exists(full_path):
                    materials_list_copy.remove(item)
                    continue



                img_url = "https://classicdb.ch/images/icons/"+image_size+"/"+icon_name+".jpg"
                urllib.request.urlretrieve(img_url, full_path)

                materials_list_copy.remove(item)
        except exceptions.NoSuchElementException as e:
            print(e)

        with open(materials_filename, 'w') as f:
            	for item in materials_list_copy:
            		f.write(item+"\n")

        driver.close()

    else:

        class_icons_parent = driver.find_element(By.CLASS_NAME, 'ctc-classes-inner')
        class_icons = class_icons_parent.find_elements(By.CLASS_NAME, 'iconmedium')
        talent_trees_container = driver.find_element(By.CLASS_NAME, 'ctc-tree-container')
        talent_trees = talent_trees_container.find_elements(By.CLASS_NAME, 'ctc-tree')

        icontype = input('icon type:') or 'talent'

        if icontype == 'class':
            for icon in class_icons:
                icon.click()
                driver.implicitly_wait(2)

                class_icon_style = icon.find_element(By.TAG_NAME, 'ins').get_attribute("style")
                class_icon_match = class_from_url.search(class_icon_style)

                class_name = class_icon_match.group(2)
                print("class: ", class_name)

                for tree in talent_trees:

                    t = tree.find_element(By.CLASS_NAME, 'ctc-tree-header')

                    tree_n = t.find_element(By.TAG_NAME, 'b').text

                    tree_name = space_replacer.sub('_', tree_n)
                    tree_name = tree_name.lower()

                    folder_path = class_name+"/"+tree_name
                    print("tree: ", tree_name)

                    small_icon_ele = t.find_element(By.TAG_NAME, 'span').find_element(By.TAG_NAME, 'ins')
                    icon_style = small_icon_ele.get_attribute("style")

                    img_match = get_url.search(icon_style)
                    img_url = img_match.group(1)


                    img_filename = "small_"+tree_name+"_icon.jpg"

                    path = folder_path+"/"+img_filename


                    if not os.path.exists(folder_path):
                        os.makedirs(folder_path)

                    urllib.request.urlretrieve(img_url, path)
            driver.close()

        else:
            try:
                for tree in talent_trees:

                    tree_n = tree.find_element(By.CLASS_NAME, 'ctc-tree-header').find_element(By.TAG_NAME, 'b').text
                    tree_name = space_replacer.sub('_', tree_n)
                    tree_name = tree_name.lower()

                    folder_path = CLASS_NAME+"/"+tree_name
                    print("tree name: ", tree_name)
                    print("folder name: ", folder_path)

                    tree_style = tree.find_element(By.CLASS_NAME, 'ctc-tree-talents').get_attribute("style")

                    bg = get_url.search(tree_style)
                    bg_url = bg.group(1)

                    background_filename = tree_name+"_background.jpg"
                    bg_path = folder_path+"/"+background_filename


                    if not os.path.exists(folder_path):
                        os.makedirs(folder_path)

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
                        m2 = get_url.search(style)
                        url = m2.group(1)

                        file_name = spell_name+".jpg"
                        path = folder_path+"/"+file_name

                        print("file path: ", path)
                        # download and save the image
                        urllib.request.urlretrieve(url, path)
            except:
                print("error")
                driver.close()




# parent = driver.find_element(By.ID, "minibox")
# sibling = driver.find_element_by_xpath("//div[@id='minibox']/following-sibling::div")
#
# onclick = sibling.get_attribute("onclick") #ShowIconName('inv_misc_stonetablet_07')"


# regex search the onclick result "inv_misc_stonetablet_07.jpg"

# use request to fill

# https://classicdb.ch/images/icons/large/

# https://classicdb.ch/images/icons/medium/inv_misc_stonetablet_07.jpg


# materials_list = {'herbalism':[], 'mining':[], 'skinning':[], 'enchanting':[], 'vendor':[], 'fishing':[], 'drop':[]}
#
# fishing = 'Fished in' #any tab
# herbalism = 'Gathered from' #any tab
# mining = 'Mined from' #any tab
# enchanting = 'Disenchanted from' #any tab
# skinning = 'Skinned from' #any tab
#
# # if not any of the above
# vendor = 'Sold by' #first tab
# drop = 'Dropped by' #first tab

main()
