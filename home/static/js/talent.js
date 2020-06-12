
$(document).ready(function() {
	classSelectionHandler()
	tooltip.static = true

	talentCalc.handlers()

	var selectedClass = talentCalc.CLASSES.filter(substring => document.location.pathname.includes(substring.toLowerCase()))
	if (selectedClass.length) { // simulate click on said class
		document.querySelector(`#${selectedClass[0].toLowerCase()}.class-filter`).click()
	}

})

window.addEventListener('load', function(e) {
	if (document.location.search) {
		// predefined talent spec, fill in the talents
		talentCalc.build.spec(document.location.search)
		updateSelectedList()
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

			// get talent architect and all talent data and add it to page as a script
			if (Object.keys(talentCalc.CLASS_DATA).includes(WoWClass)) {
				talentCalc.update.classSelection(WoWClass);
				talentCalc.build.main(talentCalc.CLASS_DATA[WoWClass])

			} else {
				talentCalc.get.classData(WoWClass)
			}

			if (e.isTrusted) {
				updateURL("/talent_calc", WoWClass, document.location.search)
			}

		}
	})
}

var talentCalc = {
	maxLevel: 60,
	container: document.getElementById('talent_calc'),
	CLASSES: ['druid', 'hunter', 'mage', 'paladin', 'priest', 'rogue', 'shaman', 'warrior', 'warlock'],
	selection: '',
	CLASS_DATA: {},
	translationTable: {
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
	},
	imageLocationOld: true,
	init: function() {
		if (talentCalc.selection) {
			talentCalc.reset.all()
			talentCalc.empty(talentCalc.container)
		}
	},
	reset: {
		tree: function(tree) {
			var data = talentCalc.CLASS_DATA[talentCalc.selection][tree]
			var treeElement = document.getElementById(tree)
			data.talents.forEach(function(talent) {
				talent.spent = 0
				var talentContainer = talentCalc.get.talent.elem(tree, talent.x, talent.y)
				var spentContainer = talentContainer.querySelector('div.spent-points')
				spentContainer.innerText = talent.spent
				talentCalc.maxed(talent, tree, talentContainer)
				talentCalc.lock.talent(talent, tree, talentContainer)
			})
			talentCalc.grayed(tree)
			talentCalc.update.header()
			talentCalc.update.footer(tree)
		},
		all: function() {

			for (let key of Object.keys(talentCalc.CLASS_DATA[talentCalc.selection])) {
				talentCalc.reset.tree(key)
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
		tree: function(tree) {
			var treeElem = document.getElementById(tree)
			talentCalc.CLASS_DATA[selection][tree].talents.forEach(function(talent) {
				var talentContainer = talentCalc.get.talent.elem(tree, talent.x, talent.y)
				var spentContainer = talentContainer.querySelector('div.spent-points')
				spentContainer.innerText = talent.spent

				talentContainer.querySelector('div.spent-points')
				talentCalc.lock.talent(talent, tree, talentContainer)
			})

		},
		all: function() {
			for (let [treeName, tree] of Object.entries(talentCalc.CLASS_DATA[talentCalc.selection])) {
				talentCalc.update.tree(treeName)
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

				var tree = talentCalc.get.tree.name(e)
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

		tree: {
			//gets name of nearest tree element, requires event
			name: function(e) {
				return e.target.closest('.talent-table').id
			}
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
			var treeNameElement = create_element('span', 'tree-name', style, data.n),
				treeSpentSpan = create_element('span', 'spent', '', '(0)'),
				resetTreeBtn = create_element('button', 'reset-tree', '', '', {'type':'button', 'data-reset':treeName, 'title':`Reset ${data.n}`});

			talentFooter.appendChild(treeNameElement)
			talentFooter.appendChild(treeSpentSpan)
			talentFooter.appendChild(resetTreeBtn)

			talentTable.appendChild(talentFooter)

			return talentTable
		},
		hash: function() {
			const re = /a{2,}|b{2,}|c{2,}|d{2,}|e{2,}|m{2,}|J{2,}/g //only looks for repeats of a/b/c/d/e atm
			var myURL = '',
				invested = '',
				newURL = '',
				index = 0;

			for (let [tree, data] of Object.entries(talentCalc.CLASS_DATA[talentCalc.selection])) {
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
					newURL += talentCalc.translationTable[parseInt(subStr)]
				}
				index++
			})

			let matchArr = newURL.match(re)
			for (var y = 0; y < matchArr.length; y++) {
				newURL = newURL.replace(matchArr[y], matchArr[y][0] + (matchArr[y].length).toString())
			}

			let hash = newURL.slice(0, newURL.indexOf('Z'))
			let url = new URL(location.origin + location.pathname)
			let params = url.searchParams

			params.set('class', talentCalc.selection)
			url.hash = hash
			return hash
		},
		spec: function(h='') {
			var hash = h

			if (!hash) {
				return
			}

			if (hash.startsWith('?')) {
				hash = hash.substring(1)
			}

			var expanded = talentCalc.hashExpander(hash),
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
		},

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

		if (this.prereqSpent(talent, tree) || talent.spent == 0) {
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
	// checks if talent is the prereq for any talents and if points were spent in it; helper function for canUnspend()
	prereqSpent: function(talent, tree) {
		var truth = false
		if (talent.unlocks) {
			talent.unlocks.forEach(function(item) {
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

		var savedSpecs = document.getElementById('saved_specs')

		savedSpecs.addEventListener('click', function(e) {
			if (e.target.matches('.saved-list-link')) {
				if (e.metaKey || e.target.matches('.external')) { // allow opening in new tab
					return
				}
				e.preventDefault()
				var parent = e.target.closest('div.spec-list-item')
				var currentSelection = document.querySelector('div.spec-list-item.selected')
				if (parent == currentSelection) {
					return
				}



				var url = new URL(e.target.href)
				hash = url.search
				history.pushState(null, null, url)
				updateSelectedList()
				
				var WoWClass = talentCalc.CLASSES.filter(substring => url.pathname.includes(substring))[0]
				document.querySelector(`#${WoWClass}.class-filter`).click()

				// talentCalc.update.classSelection(WoWClass)

				// talentCalc.build.spec(hash)


				setTimeout(() => { talentCalc.build.spec(hash) }, 100);

				return
			}

			if (e.target.matches('.trashcan')) {
				var data = {}
				var parent = e.target.closest('div.spec-list-item')
				var link = parent.querySelector('a.saved-list-link').href
				var hash = new URL(href=link).search
				data['hash'] = hash
				data['name'] = parent.name
				$.ajax({
	                method: "POST",
	                url: '/ajax/delete_list/',
	                data: data,
	                success: trashCanSuccess,
	                error: trashCanError,
	            })
			}
		});

		var buttonCity = document.getElementById('buttonCity');

		buttonCity.addEventListener('click', function(e) {
			if (e.target.matches('#talentLock')) {
				e.target.classList.toggle('lock')
				if (e.target.classList.contains('lock')) {
					talentCalc.lock.all()
				} else {
					//unlock them
					for (let [tree, data] of Object.entries(talentCalc.CLASS_DATA[talentCalc.selection])) {
						talentCalc.grayed(tree)
					}
				}

			// reset all talents
			} else if (e.target.matches('#resetTalents')) {
				var lockButton = document.getElementById('talentLock')
				lockButton.classList.add('lock')
				lockButton.click()
				talentCalc.reset.all()
				updateURL("/talent_calc", talentCalc.selection)

			} else if (e.target.matches('#copyLink')) {


				$('#copyLink').popover({
					title: "Copied!",
					container: "#copyLink",
					template: '<div class="popover customPopover bg-dark text-white" role="tooltip"><div class="arrow text-white"></div><h3 class="popover-header bg-dark text-white"></h3><div class="popover-body bg-dark text-white"></div></div>'
				}).attr('data-content', document.location.toString())


				// not all browsers support navigator.clipboard.writeText()
				navigator.clipboard.writeText(document.location.toString()).then(function() {
					// clipboard successfully set
					return
				}, function() {
					// clipboard write failed
					let tempInput = document.createElement("input")
					tempInput.style = "position: absolute; left: -1000px; top: -1000px"
					tempInput.value = url.toString()
					document.body.appendChild(tempInput)
					tempInput.select()
					document.execCommand("copy")
					document.body.removeChild(tempInput)
				});

				$('#copyLink').popover('toggle')
			}
			return
		}, true);

		$('#copyLink').on({
			'shown.bs.popover': e => {
				setTimeout(function a() {
					$('#copyLink').popover('hide')
					$('#copyLink').popover('disable')
				}, 1500)
			},
			'hidden.bs.popover': e => {
				$('#copyLink').popover('enable')
			},
		})


		talentCalc.container.addEventListener('contextmenu', function(e) {
			e.preventDefault()
		});

		talentCalc.container.addEventListener('mouseenter', function(e) {

			if (e.target.matches('img.talent') && e.isTrusted) {

				tooltip.init(e)
				var talent = talentCalc.get.talent.obj(e)
				var data = Object.assign({}, talent)
				delete data.img

				var tree = talentCalc.get.tree.name(e)
				data.treeName = tree
				data.tree = Object.assign({}, talentCalc.CLASS_DATA[talentCalc.selection][tree])
				data.tree.spent = talentCalc.CLASS_DATA[talentCalc.selection][tree].spent()

				tooltip.create(data)
				tooltip.updateCoords(e)
			}
			return
		}, true);

		talentCalc.container.addEventListener('mouseleave', function(e) {
			if (e.target.matches('img.talent')) {
				tooltip.empty()
			}
			return
		}, true);

		talentCalc.container.addEventListener('mousedown', function(e) {
			if (e.target.matches('img.talent')) {

				var tree = talentCalc.get.tree.name(e)
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

				// if event was generated by user action, update url & show tooltip
				if (e.isTrusted) {
					updateURL("/talent_calc", talentCalc.selection, `?${talentCalc.build.hash()}`)
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

		talentCalc.container.addEventListener('click', function(e) {
			if (e.target.matches('button.reset-tree')) {
				talentCalc.reset.tree(e.target.dataset.reset)
			}
		});


	},
	spend: function(talent, talentElem, amount, tree) {
		talent.spent += amount
		var elem = talentElem.closest('div.talent-container')
		elem.querySelector('div.spent-points').innerText = talent.spent
		this.maxed(talent, tree, elem)
		this.grayed(tree)
		this.lock.talent(talent, tree, elem)
		this.update.footer(tree)
		this.update.header()
		if (talentCalc.spent() == 51) {
			talentCalc.lock.all()
		}
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
	grayed: function(treeName) {
		var treeTable = document.getElementById(treeName)
		var treeSpent = this.CLASS_DATA[this.selection][treeName].spent()
		for (var i = 0; i < 7; i++) {
			var row = treeTable.querySelector(`div.row[data-y='${i}']`)
			if ( treeSpent >= i*5 ) {
				row.querySelectorAll('.grayed').forEach(x => x.classList.remove('grayed'))
			} else {
				row.querySelectorAll('img.talent,div.spent-points,div.talentcalc-arrow').forEach(x => x.classList.add('grayed'))
			}
		}
	},
	lock: {
		// adds or removes 'locked' class list to given talent element
		talent: function(talent, tree, talentElem) {
			if (talent.unlocks) {
				talent.unlocks.forEach(function(name) {
					var unlockedTalent = talentCalc.get.talent.byName(name, tree)
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
		tree: function(tree, data='') {

			var treeData = (!Boolean(data)) ? talentCalc.CLASS_DATA[talentCalc.selection][tree] : data
			var treeElement = document.getElementById(tree)

			treeData.talents.forEach(function(talent) {

				var talentContainer = talentCalc.get.talent.elem(tree, talent.x, talent.y)
				// var spentContainer = talentContainer.querySelector('div.spent-points')

				if (talent.spent == 0) {
					talentContainer.querySelectorAll('img.talent,div.spent-points,div.talentcalc-arrow').forEach(x => x.classList.add('grayed'))
				}
			})
		},
		// used with the lock button
		all: function() {
			for (let [treeName, data] of Object.entries(talentCalc.CLASS_DATA[talentCalc.selection])) {
				talentCalc.lock.tree(treeName, data)
			}
		}
	},
	hashExpander: function(hash) {
		const re2 = /([a-z])\d/g
		const reverseTable = talentCalc.getReverseTable()
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
	getReverseTable: function() {
		const reversedTable = {}
		Object.values(talentCalc.translationTable).forEach(function(item, index) {
			let repl = (Object.keys(talentCalc.translationTable)[index].length > 1) ? Object.keys(talentCalc.translationTable)[index] : "0" + Object.keys(talentCalc.translationTable)[index]
			reversedTable[item] = repl
		})
		return reversedTable
	}
}

function addScript(WoWClass, src, loadedCallback = scriptLoaded, errorCallback = loadError) {

	var newScript = document.createElement("script");
	newScript.onerror = errorCallback;
	newScript.addEventListener('load', function() {
		loadedCallback(WoWClass);
	})

	// newScript.onload = function() {
	// 	loadedCallback(WoWClass);
	// }
	document.body.appendChild(newScript);
	newScript.src = src
}

function loadError(oError) {
	throw new URIError("The script " + oError.target.src + " didn't load correctly.");
}

function scriptLoaded(WoWClass) {

	talentCalc.CLASS_DATA = Object.assign(talentCalc.CLASS_DATA, cdata)
	talentCalc.update.classSelection(WoWClass);
	talentCalc.update.classData()
	// updateURL("/talent_calc", WoWClass, document.location.search)
	talentCalc.build.main(talentCalc.CLASS_DATA[WoWClass])
}

function updateSelectedList() {

	var currentSelection = document.querySelector('div.spec-list-item.selected')
	if (currentSelection) {
		currentSelection.classList.remove('selected')
	}

	var selectedList = checkLocalHashes()
	if (selectedList) {
		selectedList.classList.add('selected')
	}
}

function getHash(href) {
	var myURL = new URL(href=href, base=document.location)
	return myURL.search
}

function checkLocalHashes() {
	var savedListElems = document.querySelectorAll('div.spec-list-item')
	var hashes = Array.from(savedListElems, x => getHash(x.querySelector('a').getAttribute('href')))
	var index = hashes.findIndex(substring => document.location.href.includes(substring))
	return (index) ? savedListElems[index] : false
}
