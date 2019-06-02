import re, os, time

READ_FROM = "../txt/talent_data.txt"
WRITE_TO = "../txt/talent_test_data.txt"

r_test = re.compile(r"(\w+): '(\w+) (\w+)',", re.M)
has_x = re.compile(r"x: ([\d]+)")
get_proposed = re.compile(r"return `([\w\s,%]+?)([\d.]+)(.*?)\.`")

r1 = re.compile(r"(x: )(?P<num>\d+?)(,[\s\w:,(){}.*]+?description: function\(\)\ {\s+return )(`[\w,%\s']*?)((?P=num))([\w,%\s'.]*?`)(\s+},).*?\s+(description: \[.+?\],)", re.M)
r2 = re.compile(r"(name: )('[\w\s]+',)(?:\s+)([\s\w,():{}.*]*?)(?P<return>`[\w\s%,'.]*?`)([\s},]*)?(?P<description>description: \[['\"%\w\s.,]+\],\s*)?", re.M)
# same as r2 but includes dashes
r3 = re.compile(r"(name: )('[\-\w\s]+',)(?:\s+)([\s\w,():{}.*]*?)(?P<return>`[\w\s%,\-'.]*?`)([\s},]*)?(?P<description>description: \[['\-\"%\w\s.,]+\],\s*)+", re.M)

# finds description arrays with only 1 entry, blessing of kings, pyroblast, etc.
r4 = re.compile(r"(name: )('[\w\s]+',)(?:\s+)([\s`\w%,():{}.*]*?)(description: \['[\-\"%\w\s.,]+\'],)", re.M)

def num(s):
	try:
		return int(s)
	except ValueError:
		try:
			return float(s)
		except ValueError:
			return False


def get_replacement(x):

	new_str = x.expand(r"\1\2\3\4${this.y()}\6\7")

	print("last index", x.lastindex)
	new = x.group(4)+ "${this.y()}"+ x.group(6) #old description
	old = x.group(x.lastindex) #old description

	print("\nOLD:  ", old, "\n")
	print("NEW:  ", new, "\twhere x = ", x.group(2), "\n")

	u = input("proceed?")
	if u == ' ':
		print('accepted')
		return new_str
	else:
		print('rejected')
		return x.group(0)


def set_coefficient(x):
	# iamtry
	try:
		has_coefficient = has_x.search(x.group(0))
		# new_str = x.expand(r"\1\2\3\4${this.y()}\6\7")
		if not has_coefficient:

			predicted = get_proposed.search(x.group(0)) #grab the first number found in description
			predicted_coeff = predicted.group(2)
			name = x.group(2)
			returned = x.group('return')
			description = x.group('description')
			print("*******")
			print("talent: ",name, '\n*******\nold description: ', description, '\nnew function: ', returned, '\n\n')

			print("Coefficient needed. Enter a number, SPACE+ENTER to use to use {}, or ENTER to skip\n".format(predicted_coeff))

			user_num = input("answer:")

			proposed = num(predicted_coeff) if (user_num == ' ') else num(user_num)

			if not proposed:
				print('skipping... ', name, '\n')
				time.sleep(.2)
				return x.group(0)

				# this would remove the trailing 'description' array
				# if description:
				# 	del_description = input('Press enter to leave description array, any other key removes it')
				# 	if del_description != '':
				# 		return x.expand(r"\1\2\3\4\5")
				# 	else:
				# 		print('skipping... ', name, '\n')
				# 		time.sleep(.2)
				# 		return x.group(0)
				# else:
				# 	print('skipping... ', name, '\n')
				# 	time.sleep(.2)
				# 	return x.group(0)

			else:
				confirmed = input("Press enter to confirm coefficient: {} \n".format(proposed))
				if confirmed == '':
					v = "x: "+str(proposed)

					a = returned.replace(str(proposed), '${this.y()}')
					f = r"\1\2 \n {},\n\3{}\5".format(v,a)

					new_str = x.expand(f)
					print("NEW: ", new_str, "\n")
					time.sleep(.1)
					print("OLD: ", x.group(0), "\n\n")
					time.sleep(.1)

					return new_str
				else:
					print('skipping... ', name, '\n')
					time.sleep(.2)
					return x.group(0)


			# if not description:
			# 	skip = input("press enter to skip this entry: ")
			#
			# 	print("\n")
			# 	if skip != '':
			# 		new_str = x.expand(r"\1\2\3\4\5")
			# 		return new_str
			#
			# 	else:
			# 		print('skipping entry')
			#
			# 		for y in range(3):
			# 			time.sleep(.2), print('.', end='', flush=True)
			#
			#
			# 		print("\n")
			# 		return x.group(0)


		else:
			print('keeping original...\n')
			time.sleep(.2)
			return x.group(0)
			# print("coeff: ", coeff)
			#
			# returned = x.group('return')
			# description = x.group('description')
			# is_coeff_correct = input("check coeff?")
			# if is_coeff_correct == ' ':

			# input("check x.group(0)?")
			# print("no coeff found: ", x.group(0))

	except:
		print("=======eRrOnEoUs bEhAvi0rZ======== \n")
		return x.group(0)

def remove_description(x):

	name = x.group(2)
	description_arr = x.group(4)

	remove = input("Press enter to remove description")

	if remove == '':
		return x.expand(r"\1\2\3")
	else:
		return x.group(0)

with open(READ_FROM, 'r') as f:
	content = f.read()
	x = int(input('(1) for coefficient setter, (2) adding coeffs and including dashs in check, (3) for checking x: ' ))

	if x == 1:
		num_matches = r2.findall(content, re.M)
		content_new = r2.sub(set_coefficient, content)
	if x == 2:
		num_matches = r3.findall(content, re.M)
		content_new = r3.sub(set_coefficient, content)

	if x == 3:
		num_matches = r4.findall(content, re.M)
		content_new = r4.sub(remove_description, content)
	else:
		num_matches = r1.findall(content, re.M)
		content_new = r1.sub(get_replacement, content)



with open(WRITE_TO, 'w') as f:
	f.write(content_new)
