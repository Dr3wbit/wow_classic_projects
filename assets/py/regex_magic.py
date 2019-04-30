import re, os, time


r_test = re.compile(r"(\w+): '(\w+) (\w+)',", re.M)
has_x = re.compile(r"x: ([\d]+)")
get_proposed = re.compile(r"return `([\w\s,%]+?)([\d.]+)(.*?)\.`")
READ_FROM = "strictly_testing.txt"
WRITE_TO = "talent_test_data.txt"
r1 = re.compile(r"(x: )(?P<num>\d+?)(,[\s\w:,(){}.*]+?description: function\(\)\ {\s+return )(`[\w,%\s']*?)((?P=num))([\w,%\s'.]*?`)(\s+},).*?\s+(description: \[.+?\],)", re.M)
r2 = re.compile(r"(name: )('[\w\s]+',)(?:\s+)([\s\w,():{}.*]*?)(?P<return>`[\w\s%,'.]*?`)([\s},]*)?(?P<description>description: \[['\"%\w\s.,]+\],\s*)?", re.M)

def num(s):
    try:
        return int(s)
    except ValueError:
        return float(s)

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

			predicted_coeff = get_proposed.search(x.group(0))
			predicted_coeff = predicted_coeff.group(2)
			name = x.group(2)
			returned = x.group('return')
			description = x.group('description')
			print("name: ",name, '\nold description:', description, '\nnew function: ', returned,'\n\n')

			proposed = input("Coeff needed, leave blank to use predicted ({}) \n".format(predicted_coeff))
			if proposed != '':
				proposed = num(proposed)
				confirmed = input("Press enter to confirm coefficient: {} \n".format(proposed))
				if confirmed == '':
					v = "x: "+str(proposed)
					f = r"\1\2 \n {},\n\3\4\5".format(v)
					new_str = x.expand(f)
					# print("x.group(0)", x.group(0))
					print("NEW: ", new_str, "\n")
					print("OLD: ", x.group(0), "\n\n")
					return new_str
				else:
					print('keeping original')
					return x.group(0)


			else:
				proposed = num(predicted_coeff)
				v = "x: "+str(proposed)
				f = r"\1\2 \n {},\n\3\4\5\6".format(v)
				new_str = x.expand(f)
				print("NEW: ", new_str, "\n")
				print("OLD: ", x.group(0), "\n\n")
				return new_str

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
			print('keeping original')
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
		print("eRrOnEoUs bEhAvi0rZ")
		return x.group(0)

with open(READ_FROM, 'r') as f:
	content = f.read()
	x = int(input('(1) for coefficient setter, (2) for checking x: ' ))

	if x == 1:
		num_matches = r2.findall(content, re.M)
		print("number of matches: ", len(num_matches), "\n")
		content_new = r2.sub(set_coefficient, content)


	else:
		num_matches = r1.findall(content, re.M)
		print("number of matches", len(num_matches))

		content_new = r1.sub(get_replacement, content)



with open(WRITE_TO, 'w') as f:
	f.write(content_new)






# new_str = matched.expand(r"\1\2\3${this.y()}\5")


# print(matched.groups())


# repl = re.compile(r"$1$2$3\{this\.y\(\)\}$5")
# print(matched.group('num'))


#
# // replacing icon name with talent name
# \'([\w]+\s?[\w]+)\',(?=\s+?maxRank)([.\s\w\:\,\[\]\'\%{}\\]+?iconname: ')(\w+)
#
# // getting icon name
# (iconname)(: ')(\w+?\s?)?(\w+?\s?\w+?)'
#
# // getting n: <spell name>
# n: '(\w+(\s|s)?\w+)+'
#
# // find and replace single quoted strings containing escaped apostrophes with double quotes, and remove the escape '\'
# '(.*?\w*?)\\(\'\w*?.*?)'
# "$1$2"
#
#
# (description: )(\[\')([\w\s%.\,\-]+)('?\],)
# $1function() {\rreturn `$3`\r},\r$&
#
# (description: )(\[\')([\w\s%.\,\-]+)(',.*?\],)
# y: function() {\rreturn this.x * this.invested\r},\r\t$1function() {\rreturn `$3`\r},\r$&
#
# x: \d+?,\s.*+,description: function\(\)\ {\s+return `([\w,%\s']*).`
#
# x: \d+?,\s.*\s+description: function\(\)\ {\s+return `([\w,%\s']*).`
#
# (x: )(?<num>\d+?)(,[\s\w:,(){}.*]+?description: function\(\)\ {\s+return `[\w,%\s']*)(\k<num>)(.*?\.`)
# $1$2\${this.y()}$4
#
# (x: )(?\d+?)(,[\s\w:,(){}.*]+?description: function\(\)\ {\s+return `[\w,%\s']*)($1)(.*?\.`)
#
#
