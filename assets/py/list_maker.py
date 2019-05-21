import os,re

## Gets list of file names from all subdirectories of 'dir' and outputs them to a txt file (removes extensions)
## used in conjuction with image yoinker

dir = "~/Documents/wow_classic_projects/assets/images/icons/medium/materials"

get_name = re.compile("([\w\_]+).jpg")

file_list = []

def compile_list(dir):
	for root, dirs, files in os.walk(dir):
		for name in files:
			print(name)
			match = get_name.search(name)
			if match:
				file_name = match.group(1)

			file_list.append(file_name)


compile_list(dir)


with open("Documents/wow_classic_projects/assets/py/icon_download_list.txt", 'a') as f:
	for name in file_list:
		f.write(name+"\n")
