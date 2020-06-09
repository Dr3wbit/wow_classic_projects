
$(document).ready(function() {
	classSelectionHandler()
	var selectedClass = talentCalc.CLASSES.filter(substring => document.location.pathname.includes(substring))
	if (selectedClass.length) { // simulate click on said class
		document.querySelector(`#${selectedClass[0]}.class-filter`).click()
	}
})

window.addEventListener('load', function(e) {
	tooltip.static = true
	// load all talent-related handlers
	talentCalc.handlers()

	if (document.location.search) {
		// predefined talent spec, fill in the talents
		talentCalc.preBuiltSpec(document.location.search)
	}

});

function classSelectionHandler() {

	var classSelection = document.getElementById('class_selection')
	classSelection.addEventListener('click', function(e) {
		if (e.target.matches('a.class-filter')) {
			e.preventDefault()
			var WoWClass = e.target.id
			if (talentCalc.selection == WoWClass) {
				return false
			}

			talentCalc.init()

			// professionTool.empty(document.getElementById('list_container'));
			// get talent architect and all talent data and add it to page as a script

			if (Object.keys(talentCalc.CLASS_DATA).includes(WoWClass)) {
				talentCalc.update.classSelection(WoWClass);
				talentCalc.build.main(talentCalc.CLASS_DATA[WoWClass])
				updateURL("/talent_calc", WoWClass, document.location.search)
			} else {
				talentCalc.get.classData(WoWClass)
			}
		}
	})
}

var talentCalc = {
	container: document.getElementById('talent_calc'),
	maxLevel: 60,
	CLASSES: ['druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'shaman', 'warrior', 'warlock'],
	selection: '',
	CLASS_DATA: '',
	imageLocationOld: true,
	init: function() {
		talentCalc.reset.all()
		talentCalc.empty(talentCalc.container)
		this.CLASS_DATA = {}
	},
	reset: {
		tree: function(tree, data='') {
			var treeData = (!Boolean(data)) ? talentCalc.CLASS_DATA[talentCalc.selection][tree] : data
			var treeElement = document.getElementById(tree)
			treeData.talents.forEach(function(talent) {
				talent.spent = 0
				var talentContainer = talentCalc.get.talent.elem(tree, talent.x, talent.y)
				var spentContainer = talentContainer.querySelector('div.spent-points')
				spentContainer.innerText = talent.spent
				talentCalc.maxed(talent, tree, talentContainer)
				talentCalc.unlock(talent, tree, talentContainer)
			})
			talentCalc.grayed(tree)
			talentCalc.update.header()
			talentCalc.update.footer(tree)
		},
		all: function() {
			if (Boolean(talentCalc.CLASS_DATA)) {
				for (let [treeName, data] of Object.entries(talentCalc.CLASS_DATA[talentCalc.selection])) {
					talentCalc.reset.tree(treeName, data)
				}
			}
		},
	},
	update: {
		footer: function(tree) {
			var footerSpentSpan = document.querySelector(`#${tree}.talent-table`).querySelector('div.talent-footer > span.spent')
			footerSpentSpan.innerText = `(${talentCalc.CLASS_DATA[talentCalc.selection][tree].spent()})`
			var index = Array.from(document.querySelectorAll('div.talent-footer > span.spent')).indexOf(footerSpentSpan)
			document.querySelectorAll('#talent_points_spent > span.spent')[index].innerText = `${talentCalc.CLASS_DATA[talentCalc.selection][tree].spent()}`

		},
		header: function() {
			var requiredLevel = (talentCalc.spent() > 0) ? talentCalc.spent()+9 : ''
			document.getElementById('requiredLevel').innerText = `Required level: ${requiredLevel}`
			document.getElementById('pointsRemaining').innerText = `Points Left: ${51-talentCalc.spent()}`
		},

		classSelection: function(WoWClass) {
			talentCalc.selection = WoWClass
			var prevSelected = document.querySelectorAll('a.class-filter.selected')
			if (prevSelected.length) {
				prevSelected[0].classList.remove('selected')
			}

			var selectedElem = document.getElementById(`${WoWClass}`)
			selectedElem.classList.add('selected')
		},
		classData: function() {

			for (let [treeName, tree] of Object.entries(talentCalc.CLASS_DATA[talentCalc.selection])) {
				talentCalc.CLASS_DATA[talentCalc.selection][treeName].talents.forEach(tal => tal.spent = 0)
				talentCalc.CLASS_DATA[talentCalc.selection][treeName].spent = function() {
					var total = 0;
					talentCalc.CLASS_DATA[talentCalc.selection][treeName].talents.forEach(tal => total += tal.spent)
					return total
				}
			}
		},
		talentTree: function(tree) {
			var treeElem = document.getElementById(tree)
			talentCalc.CLASS_DATA[selection][tree].talents.forEach(function(talent) {
				var talentContainer = talentCalc.get.talent.elem(tree, talent.x, talent.y)
				var spentContainer = talentContainer.querySelector('div.spent-points')
				spentContainer.innerText = talent.spent

				talentContainer.querySelector('div.spent-points')
				talentCalc.unlocked(talent, tree, talentContainer)
			})

		},
		all: function() {
			for (let [treeName, tree] of Object.entries(talentCalc.CLASS_DATA[talentCalc.selection])) {
				talentCalc.update.talentTree(treeName)
				talentCalc.grayed(treeName)
			}
		},
	},
	get: {
		classData: function(WoWClass) {
			var src = static_url + `js/talents/${WoWClass}.js`
			addScript(WoWClass, src, scriptLoaded, loadError)
		},
		pointsSpent: function(tree, tier=7) {
			// get sum of points spent for each elem array of talents where y is below the given tier
			var filtered = talentCalc.CLASS_DATA[talentCalc.selection][tree].talents.filter(tal => tal.y < tier)
			return talentCalc.CLASS_DATA[talentCalc.selection][tree].talents.filter(tal => tal.y < tier).map(tal => tal.spent).reduce((total, cur) => (total+cur), 0)

		},
		//gets nearest talent element
		talent: {
			// from event
			obj: function(e) {
				var dataContainer = e.target.closest('div.talent-container');
				var x = dataContainer.getAttribute('data-x'),
					y = dataContainer.getAttribute('data-y');

				var tree = talentCalc.get.tree(e)
				var talent = talentCalc.CLASS_DATA[talentCalc.selection][tree].talents.find(tal => tal.x == x && tal.y == y)
				return talent
			},
			elem: function(tree, x, y, options={}) {
				var elem = document.getElementById(tree).querySelector(`div.talent-container[data-x="${x}"][data-y="${y}"]`)
				if (options.img) {
					elem = elem.querySelector('img.talent')
				}
				return elem
			},
			byName: function(name, tree) {
				return talentCalc.CLASS_DATA[talentCalc.selection][tree].talents.find(x => x.n == name)
			}
		},
		//gets (id of) nearest tree
		tree: function(e) {
			return e.target.closest('.talent-table').id
		}
	},
	build: {
		main: function(data) {
			for (let [treeName, treeData] of Object.entries(data)) {
				var treeElement = talentCalc.build.talentTree(treeName, treeData)
				talentCalc.container.appendChild(treeElement)
			}
		},
		talentTable: function(talents, blueprint = talentCalc.blueprint) {
			talents.forEach(function(talent) {
				blueprint[talent.x][talent.y] = talent
			})
		},
		talentTree: function(treeName, data) {
			var imagePathPrefix = (talentCalc.imageLocationOld) ? `${static_url}images/talent_spells/${talentCalc.selection}/${treeName}` : `${static_url}images/icons/large`
			var backgroundImagePath = `${static_url}images/talent_spells/${talentCalc.selection}/${treeName}.jpg`

			var talentTable = create_element('div', 'talent-table', `background-image: url('${backgroundImagePath}')`)
			talentTable.id = sanitize(data.n)

			var treeTitle = create_element('div', 'treeTitle col')

			talentTable.appendChild(treeTitle)

			var x = 0,
				y = 0,
				grayed = '';

			data.blueprint.forEach(function(row) {
				grayed = (y > 0) ? ' grayed' : grayed
				var rowElem = create_element('div', 'row', '', '', {'data-y':y})
				treeTitle.appendChild(rowElem)
				row.forEach(function(item) {
					if (item == 0) {
						var slot = create_element('div', 'open-slot')
						rowElem.appendChild(slot)
						x++
						return
					} else {
						var talent = data.talents.find(item => (item.x == x && item.y == y))
						var locked = (talent.locked) ? ' locked' : ''
						var dataAttrs = (talent.unlocks) ? {'data-unlocks':talent.unlocks, 'data-x':x, 'data-y':y} : {'data-x':x, 'data-y':y}

						var arrowLocked = (talent.unlocks) ? ' locked' : ''
						var slot = create_element('div', 'talent-slot')

						rowElem.appendChild(slot)

						var talentContainer = create_element('div', 'talent-container', '', '', dataAttrs)
						slot.appendChild(talentContainer)

						var talentImage = create_element('img', `talent${locked}${grayed}`, `background-image: url('${imagePathPrefix}/${talent.img}.jpg');`, '', dataAttrs)
						talentImage.src = `${static_url}images/icon_border_2.png`

						talentContainer.appendChild(talentImage)

						var spentPoints = create_element('div', `spent-points${locked}${grayed}`, '', '0')
						talentContainer.appendChild(spentPoints)

					}
					if (item > 1 || item.length) {

						var itemArr = (item.length) ? item : Array.of(item)
						var index = 0

						var dataAttrs = {'data-x':x, 'data-y':y}
						itemArr.forEach(function(N) {
							dataAttrs = Object.assign(dataAttrs, {'data-unlocks':talent.unlocks[index]})
							var arrow = create_element('div', `talentcalc-arrow ${talentCalc.arrowTypeSwitch(N)}${arrowLocked}${grayed}`, '', '', dataAttrs)
							if (N == 7) {
								var arrow2 = create_element('div', `talentcalc-arrow ${talentCalc.arrowTypeSwitch(N)}${arrowLocked}${grayed}`, '', '', dataAttrs)
								arrow.appendChild(arrow2)
							}
							slot.appendChild(arrow)
							index++
						})
					}

					x++
				});

				x = 0
				y++
			});

			var talentFooter = create_element('div', 'talent-footer'),
				style = `background-image: url('${imagePathPrefix}/small_${treeName}_icon.jpg');`;
			var treeName = create_element('span', 'tree-name', style, data.n),
				treeSpentSpan = create_element('span', 'spent', '', '(0)'),
				resetTreeBtn = create_element('button', 'reset-tree', '', '', {'type':'button', 'id':`clear${treeName}`, 'title':`Clear ${data.n}`});

			talentFooter.appendChild(treeName)
			talentFooter.appendChild(treeSpentSpan)
			talentFooter.appendChild(resetTreeBtn)

			talentTable.appendChild(talentFooter)

			return talentTable
		}

	},
	empty: function(parent, options = {}) {

		while (parent.firstChild) {
			parent.removeChild(parent.firstChild);
		}
		if (options.includeParent) {
			parent.remove()
		}
	},
	arrowTypeSwitch: function(n) {
		switch (n) {
			// down; NOTE: arrow length is inverse of v (v decreases, arrow length increases)
			default:
				let v = n - 3
				return `talentcalc-arrow-down down-${v}`
				// right
			case 6:
				return "talentcalc-arrow right"
				// rightdown
			case 7:
				return "talentcalc-arrow rightdown"
		}
	},
	canSpend: function(talent, tree) {
		var total = talentCalc.spent()
		return ( ( total < ( talentCalc.maxLevel - 9 ) ) && (talentCalc.CLASS_DATA[talentCalc.selection][tree].spent() >= (talent.y * 5) ) && (talentCalc.unlocked(talent, tree) ) && (talent.spent < talent.max) )
	},

	canUnspend: function(talent, tree) {

		var maxTier = this.CLASS_DATA[this.selection][tree].talents.filter(tal => tal.spent > 0).map(tal => tal.y).reduce((max, cur) => Math.max(max, cur), 0)

		if (this.locked(talent, tree) || talent.spent == 0) {
			return false
		}

		if (maxTier == talent.y) {
			return true
		}

		var tier = maxTier
		var decision = true

		while (decision && tier > 0) {
			decision = (talentCalc.get.pointsSpent(tree, tier) > tier*5)
		    tier--
		}

		return decision

	},
	locked: function(talent, tree) {
		var truth = false
		if (talent.unlocks) {

			talent.unlocks.forEach(function(item) {
				// var found = talentCalc.CLASS_DATA[talentCalc.selection][tree].talents.find(x => x.n == item)
				var found = talentCalc.get.talent.byName(item, tree)

				if (found.spent != 0) {
					truth = true
				}
			})
		}
		return truth
	},
	// checks talent has any prereq talents required and if points spent in prereq
	unlocked: function(talent, tree) {
		var truth = true
		if (talent.locked) {
			// get the talent its locked by and check i
			var found = talentCalc.get.talent.byName(talent.locked, tree)
			if (found.spent != found.max) {
				truth = false
			}
		}
		return truth
	},
	spent: function() {
		var total = 0;
		for (let [name, tree] of Object.entries(this.CLASS_DATA[this.selection])) {
			total += tree.spent()
		}
		return total
	},
	handlers: function() {

		this.container.addEventListener('contextmenu', function(e) {
			e.preventDefault()
		});

		this.container.addEventListener('mouseenter', function(e) {

			if (e.target.matches('img.talent') && e.isTrusted) {

				tooltip.init(e)
				var talent = talentCalc.get.talent.obj(e)
				var data = Object.assign({}, talent)
				delete data.img

				var tree = talentCalc.get.tree(e)
				data.treeName = tree
				data.tree = Object.assign({}, talentCalc.CLASS_DATA[talentCalc.selection][tree])
				data.tree.spent = talentCalc.CLASS_DATA[talentCalc.selection][tree].spent()

				tooltip.create(data)
				tooltip.updateCoords(e)
			}
			return
		}, true);

		this.container.addEventListener('mouseleave', function(e) {
			if (e.target.matches('img.talent')) {
				tooltip.empty()
			}
			return
		}, true);

		this.container.addEventListener('mousedown', function(e) {
			if (e.target.matches('img.talent')) {

				var tree = talentCalc.get.tree(e)
				var talent = talentCalc.get.talent.obj(e)
				var data;

				var amount = 1;
				//TODO: add shift click functionality to spend all points in selected talent
				if (e.which === 3 && talentCalc.canUnspend(talent, tree)) {
					amount *= -1
					talentCalc.spend(talent, e.target, amount, tree)
				} else if (e.which === 1 && talentCalc.canSpend(talent, tree)) {
					talentCalc.spend(talent, e.target, amount, tree)
				} else {
					return
				}

				// if event was generated by user action, update url
				if (e.isTrusted) {
					updateURL("/talent_calc", talentCalc.selection, `?${talentCalc.URLbuilder()}`)
					data = Object.assign({}, talent)
					data.treeName = tree
					data.tree = Object.assign({}, talentCalc.CLASS_DATA[talentCalc.selection][tree])
					data.tree.spent = talentCalc.CLASS_DATA[talentCalc.selection][tree].spent()

					delete data.img
					tooltip.empty()
					tooltip.create(data)
					tooltip.updateCoords(e)
				}
			}
			return
		});


	},
	spend: function(talent, talentElem, amount, tree) {
		talent.spent += amount
		var elem = talentElem.closest('div.talent-container')
		elem.querySelector('div.spent-points').innerText = talent.spent
		this.maxed(talent, tree, elem)
		this.grayed(tree)
		this.unlock(talent, tree, elem)
		this.update.footer(tree)
		this.update.header()
		return talent
	},
	maxed: function(talent, tree, talentElem) {
		var elems = talentElem.querySelectorAll('img.talent,div.spent-points')
		if (talent.spent == talent.max) {
			elems.forEach(x => x.classList.add('max'))
		} else {
			elems.forEach(x => x.classList.remove('max'))
		}
	},
	grayed: function(tree) {
		var treeTable = document.getElementById(tree)
		var treeSpent = this.CLASS_DATA[this.selection][tree].spent()
		for (var i = 0; i < 7; i++) {
			var row = treeTable.querySelector(`div.row[data-y='${i}']`)
			if ( treeSpent >= i*5 ) {
				row.querySelectorAll('.grayed').forEach(x => x.classList.remove('grayed'))
			} else {
				row.querySelectorAll('img.talent,div.spent-points,div.talentcalc-arrow').forEach(x => x.classList.add('grayed'))
			}
		}
	},
	// adds or removes 'locked' class list to given talent element
	unlock: function(talent, tree, talentElem) {
		if (talent.unlocks) {
			talent.unlocks.forEach(function(name) {
				var unlockedTalent = talentCalc.get.talent.byName(name, tree)

				// var unlockedTalent = talentCalc.CLASS_DATA[talentCalc.selection][tree].talents.find(t => t.n == name)
				var unlockedTalentContainer = talentCalc.get.talent.elem(tree, unlockedTalent.x, unlockedTalent.y)

				// var unlockedTalentContainer = document.getElementById(tree).querySelector(`div.talent-container[data-x="${unlockedTalent.x}"][data-y="${unlockedTalent.y}"]`)
				var elems = unlockedTalentContainer.querySelectorAll('img.talent,div.spent-points')
				var arrows = talentElem.closest('div.talent-slot').querySelectorAll(`div.talentcalc-arrow[data-unlocks="${name}"]`)

				if (talent.spent == talent.max) {
					elems.forEach(x => x.classList.remove('locked'))
					arrows.forEach(arrow => arrow.classList.remove('locked'))
				} else {
					elems.forEach(x => x.classList.add('locked'))
					arrows.forEach(arrow => arrow.classList.add('locked'))
				}
			})
		}
		return
	},
	URLbuilder: function() {
		const re = /a{2,}|b{2,}|c{2,}|d{2,}|e{2,}|m{2,}|J{2,}/g //only looks for repeats of a/b/c/d/e atm
		const translationTable = getTranslationTable()
		var myURL = '',
			invested = '',
			newURL = '',
			index = 0;

		for (let [tree, data] of Object.entries(this.CLASS_DATA[this.selection])) {
			invested = ''
			data.talents.forEach(x => invested += x.spent.toString())
			if (!invested.length % 2 == 0) {
				invested += '0'
			}
			invested += (index < 2) ? '7' : '8'
			myURL += invested
			index++
		}
		index = 0

		var strArr = myURL.split('7')
		var bigStr = ''

		strArr.forEach(function(str) {
			if (index < 2) {
				str += (str.length % 2 == 0) ? '07' : '7'
			}
			for (var i=0; i < str.length; i += 2) {
				let subStr = str.substring(i, i + 2)
				newURL += translationTable[parseInt(subStr)]
			}
			index++
		})

		let matchArr = newURL.match(re)
		for (var y = 0; y < matchArr.length; y++) {
			newURL = newURL.replace(matchArr[y], matchArr[y][0] + (matchArr[y].length).toString())
		}

		let shortestURL = newURL.slice(0, newURL.indexOf('Z'))
		let url = new URL(location.origin + location.pathname)
		let params = url.searchParams

		params.set('class', this.selection)
		url.hash = shortestURL
		return shortestURL
	},
	URLexpander: function(hash) {
		const re2 = /([a-z])\d/g
		const reverseTable = getReverseTable()
		if (!hash) {
			var hash = window.location.hash
		}
		let newStr = hash.slice(hash.indexOf('#') + 1, hash.length)
		let matchArr = newStr.match(re2)
		for (var y = 0; y < matchArr.length; y++) {
			let replStr = Array(parseInt(matchArr[y][1])).fill(matchArr[y][0]).join('')
			newStr = newStr.replace(matchArr[y], replStr)
		}
		let newStrArr = newStr.split('Y')
		let arr
		newStrArr.forEach(function(item, ind) {
			item = (ind < 2) ? item + 'Y' : item + 'Z'
			arr = item.split('')
			arr.forEach(function(v, i) {
				arr[i] = arr[i].replace(v, reverseTable[v])
			})
			newStrArr[ind] = arr.join('')
		})
		newStr = newStrArr.join('')
		return newStr

	},
	preBuiltSpec: function(h='') {
		var hash = h
		if (hash.startsWith('?')) {
			hash = hash.substring(1)
		}
		var expanded = talentCalc.URLexpander(hash),
			treeName = '',
			index = 0;

		var hashArr = expanded.slice(0, expanded.indexOf('8')).split('7')

		for (let [tree, data] of Object.entries(talentCalc.CLASS_DATA[talentCalc.selection])) {
			var arr = hashArr[index].split('')
			data.talents.forEach(function(talent) {
				var talentElem = talentCalc.get.talent.elem(tree, talent.x, talent.y, {'img': true})
				if (arr[0] >= 1) {
					let pointsSpent = [...Array(parseInt(arr.shift()))].fill(1)
					pointsSpent.forEach(function(item2) {
						talentElem.dispatchEvent(new MouseEvent('mousedown', {
							which: 1, bubbles: true
							})
						)
					})
					return
				} else {
					arr.shift()
				}
			})
			index++
		}
	}

}

function addScript(WoWClass, src, loadedCallback = scriptLoaded, errorCallback = loadError) {

	var newScript = document.createElement("script");
	newScript.onerror = errorCallback;
	newScript.onload = function() {
		loadedCallback(WoWClass);
	}
	document.body.appendChild(newScript);
	newScript.src = src
}

function loadError(oError) {
	throw new URIError("The script " + oError.target.src + " didn't load correctly.");
}


function scriptLoaded(WoWClass) {
	talentCalc.CLASS_DATA = Object.assign(talentCalc.CLASS_DATA, classData)
	talentCalc.update.classSelection(WoWClass);
	talentCalc.update.classData()
	updateURL("/talent_calc", WoWClass, document.location.search)
	talentCalc.build.main(talentCalc.CLASS_DATA[WoWClass])
}

function applyClickHandlers() {
	talentHandler()
	exportSpec()
	resetHandler()
	lockSpec()
	resetTree()
}

function exportSpec() {
	$("#export").on({
		click: e => {
			e.preventDefault()
			e.stopImmediatePropagation()
			if (!$("#talentLock").hasClass('lock')) {
				$("#talentLock").trigger("click")
			}
			let url = new URL(document.location)
			url.search = urlBuilder()

			$('#export').popover({
				content: url.toString(),
				title: "Copied!",
				container: "#export",
				template: '<div class="popover customPopover bg-dark text-white" role="tooltip"><div class="arrow text-white"></div><h3 class="popover-header bg-dark text-white"></h3><div class="popover-body bg-dark text-white"></div></div>'
			})

			// not all browsers support navigator.clipboard.writeText()
			navigator.clipboard.writeText(url.toString()).then(function() {
				/* clipboard successfully set */
			}, function() {
				/* clipboard write failed */
				let tempInput = document.createElement("input")
				tempInput.style = "position: absolute; left: -1000px; top: -1000px"
				tempInput.value = url.toString()
				document.body.appendChild(tempInput)
				tempInput.select()
				document.execCommand("copy")
				document.body.removeChild(tempInput)
			});

			$('#export').popover('toggle')
		},

		'shown.bs.popover': e => {
			setTimeout(function a() {
				$('#export').popover('hide')
				$('#export').popover('disable')
			}, 1500)

		},
		'hidden.bs.popover': e => {
			$('#export').popover('enable')
		},
	})
}

function resetTree() {
	$('.resetTree').on({
		click: e => {
			e.preventDefault()
			let treeName = $(e.target)[0].id
			resetTalentTree(treeName.slice(5, treeName.length), e)
		}
	})
}

function lockSpec() {
	$('#talentLock').on({
		click: e => {

			let url = new URL(document.location)
			let lockButton = $("#talentLock")
			let params = url.searchParams
			if ($("#talentLock").hasClass('lock')) {
				talentPointsSpent.hardLocked = false
				talentUnlocker()
				lockButton.removeClass("lock").addClass("unlock")
				lockButton.attr('title', 'Unlocked')
				lockButton.css({
					"color": "#3d7e9a"
				})
				params.delete('L')
				if (talentPointsSpent.softLocked) {
					talentLocker()
				}
			} else if ($("#talentLock").hasClass('unlock')) {
				talentLocker()

				talentPointsSpent.hardLocked = true

				lockButton.removeClass("unlock").addClass("lock")
				lockButton.attr('title', 'Locked')
				lockButton.css({
					"color": "rgba(231, 186, 0, 1);"
				})
			}

		},
	})
}

function resetHandler() {
	$('#resetTalents').on({
		click: e => {
			resetAll()
			$("#talentLock").unbind("click")
			$("#talentLock").bind("click", lockSpec())
		}
	})
}

function resetAll() {
	let className = $('.class-filter.selected').attr("id")
	let treeNames = talentPointsSpent.treeNames

	talentPointsSpent.hardLocked = false
	talentPointsSpent.softLocked = false

	treeNames.forEach(function(tree) {
		resetTalentTree(tree)
	})

	if ($("#talentLock").hasClass('lock')) {
		$("#talentLock").trigger("click")
	}

	let url = new URL(document.location)
	url.hash = '#'
	history.replaceState(null, null, url)
}

function resetTalentTree(tree, e) {

	const tree_name = titleCase(tree)
	let found = classData.trees.find(function(x) {
		return x.name == tree_name
	})

	found.data.forEach(function(dataArr, tier) {
		dataArr.forEach(function(tal) {
			if (tal) {
				// let tal_name = utilities.sanitize(tal.name)
				let tal_name = tal.name

				tal.invested = 0
				let targetTalent = $(`img.talent[name="${tal_name}"]`)
				targetTalent.removeClass('max')
				let spentPoints = targetTalent.closest('.talent-slot').find('.spentPoints')
				spentPoints.text(tal.invested).removeClass('max')
			}
		})
	})

	talentPointsSpent[tree_name].vals.forEach(function(v, i) {
		talentPointsSpent[tree_name].vals[i] = 0
	})

	if (talentPointsSpent.grandTotal() < 51) {
		talentPointsSpent.softLocked = false
	}

	updateTalentHeader()

	let footer = ''

	if (e) {
		let targetTalent = $(e.target)
		footer = targetTalent.parents(".talentFooter").find("span.talentFooter-spentPoints")
		footer.first().text("(" + talentPointsSpent[tree_name].total() + ")")
	} else {

		let targetTalent = $(`span:contains('${tree_name}')`)
		footer = targetTalent.parents(".talentFooter").find("span.talentFooter-spentPoints")
		footer.first().text("(" + talentPointsSpent[tree_name].total() + ")")

	}

	talentLocker(tree_name)
	talentUnlocker(tree_name)

	if ((talentPointsSpent.hardLocked) || (talentPointsSpent.softLocked)) {
		talentLocker()
	} else {}
}

function talentHandler() {
	$(".class-filter").on({
		click: e => {
			var class_name = $(e.target)[0].id;
			update_class(class_name)
		}
	});

	$(".talent").on({
		contextmenu: e => {
			e.preventDefault()
		},

		mouseenter: e => {
			clear_tooltip()
			tooltip_v2(e, true, 1)
		},

		mouseleave: e => {
			clear_tooltip()
		},

		mousedown: e => {
			mouseDownHandler(e)
			clear_tooltip()
			tooltip_v2(e, true, 1)
		},
	})
}

// needs optimization
function talentLocker(tree = '') {

	let treeNames = []
	if (!tree) { // defaults to all trees
		treeNames = talentPointsSpent.treeNames
	} else {
		treeNames.push(tree)
	}
	let talentObjs = []

	// get list of talent objects with no points spent
	treeNames.forEach(function(name) {
		let found = classData.trees.find(function(x) {
			return x.name == name
		})

		found.data.forEach(function(dataArr, tier) {
			dataArr.forEach(function(tal) {
				if (tal) {
					if (!tal.invested) {
						talentObjs.push(tal)
					}
				}
			})
		})
	})

	talentObjs.forEach(function(tal) {
		// let tal_name = utilities.sanitize(tal.name)
		let tal_name = tal.name

		let t = $(`img.talent[name="${tal_name}"]`)
		t.addClass('grayed')
		t.closest('.talent-slot').find(".spentPoints").addClass('grayed')
		if (tal.locked) {
			arrowClassChanger(tal_name, true, 'grayed')
		}
		if (tal.unlocks) {
			let unlocks = (!Array.isArray(tal.unlocks)) ? Array(tal.unlocks) : tal.unlocks
			unlocks.forEach(function(n) {
				let par = $(`img.talent[name="${n}"]`).addClass('locked')
				par.closest('.talent-container').find(".spentPoints").first().addClass('locked')

				arrowClassChanger(n, true, 'locked')
			})
		}
	})
}

function talentUnlocker(tree = '') {
	let treeNames = []
	if (!tree) { // defaults to all trees
		treeNames = talentPointsSpent.treeNames
	} else {
		treeNames.push(tree)
	}

	treeNames.forEach(function(tree) {
		let found = classData.trees.find(function(x) {
			return x.name == tree
		})
		let y = (talentPointsSpent[tree].total() < 30) ? Math.floor(talentPointsSpent[tree].total() / 5) : 6
		let tiers = [...Array(y + 1).keys()]
		tiers.forEach(function(i) {})
		let tier = tiers[tiers.length - 1]
		for (tier; tier >= 0; tier = tier - 1) {
			found.data[tier].forEach(function(tal) {
				if (tal) { //skips empty slots
					// let tal_name = utilities.sanitize(tal.name)
					let tal_name = tal.name

					let t = $(`img.talent[name="${tal_name}"]`)
					t.removeClass('grayed')
					t.closest('.talent-slot').find('.spentPoints').first().removeClass('grayed')
					if (tal.locked) {
						arrowClassChanger(tal_name, false, 'grayed')

					}

				}
			})
		}
	})
}

function getTranslationTable() {
	const translationTable = {
		00: 'a',
		01: 'b',
		02: 'c',
		03: 'd',
		04: 'e',
		05: 'f',
		10: 'g',
		11: 'h',
		12: 'i',
		13: 'j',
		14: 'k',
		15: 'l',
		20: 'm',
		21: 'n',
		22: 'o',
		23: 'p',
		24: 'q',
		25: 'r',
		30: 's',
		31: 't',
		32: 'u',
		33: 'v',
		34: 'w',
		35: 'x',
		40: 'y',
		41: 'z',
		42: 'A',
		43: 'B',
		44: 'C',
		45: 'D',
		50: 'E',
		51: 'F',
		52: 'G',
		53: 'H',
		54: 'I',
		55: 'J',
		07: 'Y',
		08: 'Z'
	}
	return translationTable
}

function getReverseTable() {
	let translationTable = getTranslationTable()
	const reversedTable = {}
	Object.values(translationTable).forEach(function(item, index) {
		let repl = (Object.keys(translationTable)[index].length > 1) ? Object.keys(translationTable)[index] : "0" + Object.keys(translationTable)[index]
		reversedTable[item] = repl
	})
	return reversedTable
}
