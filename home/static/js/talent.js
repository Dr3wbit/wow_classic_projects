var talentPointsSpent = {}
var classData = {}

$(document).ready(function() {
	classSelectionHandler()
})

window.addEventListener('load', function(e) {

	// check for wow_class and hash in URL
	var selectedClass = talentCalc.CLASSES.filter(substring => document.location.pathname.includes(substring))

	if (selectedClass.length) { // simulate click on said class
		document.querySelector(`#${selectedClass[0]}.class-filter`).click()
	}

	if (document.location.search) {

		// predefined talent spec, fill in the talents

	}

	// load all talent-related handlers
	talentCalc.handlers()

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
		talent: function(tree, talentName) {

		},
		tree: function(tree) {
			var treeElement = document.getElementById(tree)
			talentCalc.CLASS_DATA[talentCalc.selection][tree].talents.forEach(function(talent) {
				talent.spent = 0
			})
			talentCalc.update.header()
			talentCalc.update.footer(tree)

		},
		all: function() {
			if (Boolean(talentCalc.CLASS_DATA)) {
				for (let [tree, data] of Object.entries(talentCalc.CLASS_DATA[talentCalc.selection])) {
					talentCalc.reset.tree(tree)
				}
			}
		},
	},
	update: {
		footer: function(tree) {
			var footerSpentSpan = document.querySelector(`#${tree}.talent-table`).querySelector('div.talent-footer > span.spent')
			footerSpentSpan.innerText = talentCalc.CLASS_DATA[talentCalc.selection][tree].spent()
			var index = Array.from(document.querySelectorAll('div.talent-footer > span.spent')).indexOf(footerSpentSpan)
			document.querySelectorAll('#talent_points_spent > span.spent')[index].innerText = talentCalc.CLASS_DATA[talentCalc.selection][tree].spent()

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
				if (talentCalc.canSpend(talent)) {

					var talentContainer = treeElement.querySelector(`div.talent-container[data-x='${talent.x}'][data-y='${talent.y}']`)

					var spentContainer = talentContainer.querySelector('div.spent-points')
					spentContainer.innerText = talent.spent

					talentContainer.querySelector('div.spent-points')
					if (talentCalc.locked(talent, tree)) {
						spentContainer.classList.add('locked')
						talentContainer.querySelector('img.talent').classList.add('locked')

						// add locked classList
					}
				}
			})

		},
		all: function() {

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

		}
	},
	build: {

		main: function(data) {
			console.log('data: ', data)
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
						itemArr.forEach(function(N) {
							var arrow = create_element('div', `talentcalc-arrow ${talentCalc.arrowTypeSwitch(N)}${arrowLocked}${grayed}`, '', '', dataAttrs)
							if (N == 7) {
								var arrow2 = create_element('div', `talentcalc-arrow ${talentCalc.arrowTypeSwitch(N)}${arrowLocked}${grayed}`, '', '', dataAttrs)
								arrow.appendChild(arrow2)
							}
							slot.appendChild(arrow)
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
		return ( ( total < ( talentCalc.maxLevel - 9 ) ) && (talentCalc.CLASS_DATA[talentCalc.selection][tree].spent() >= (talent.y * 5) ) && (! talentCalc.locked(talent, tree) ) && (talent.spent < talent.max) )
	},

	canUnspend: function(talent, tree) {
		// var maxTier = 0;
		// talentCalc.CLASS_DATA[talentCalc.selection][tree].talents.forEach(tal => (tal.spent > 0 && tal.y > maxTier) ? maxTier = tal.y : maxTier)  //faster version

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
		    // truth1 = (talentCalc.get.pointsSpent(tree, tier) > tier*5 || (tier==1 && talentCalc.get.pointsSpent(tree, tier) >= tier*5))
			truth = (talentCalc.get.pointsSpent(tree, tier) > tier*5)
		    tier--
		}

		return decision

	},
	locked: function(talent, tree) {

		var truth = false
		if (talent.unlocks) {
			var found = talentCalc.CLASS_DATA[talentCalc.selection][tree].talents.find(x => x.n == talent.unlocks)
			if (found.spent != 0) {
				truth = true
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

		this.container.addEventListener('mousedown', function(e) {
			if (e.target.matches('.talent')) {
				var x = e.target.dataset.x,
					y = e.target.dataset.y;

				var tree = e.target.closest('.talent-table').id
				var talent = talentCalc.CLASS_DATA[talentCalc.selection][tree].talents.find(t => t.x == x && t.y == y)

				var amount = 1
				if (e.which === 3) {
					amount *= -1

					if (talentCalc.canUnspend(talent, tree)){

						talentCalc.spend(talent, e.target, amount, tree)

					}
				} else if (e.which === 1) {

					if (talentCalc.canSpend(talent, tree)) {
						talentCalc.spend(talent, e.target, amount, tree)
					}
				}
			}
		});

		this.container.addEventListener('mouseover', function(e) {

			if (e.target.matches('img.talent')) {
				console.log('mouseenter: ', e)
				tooltip.init(e)

				var dataContainer = e.target.closest('div.talent-container');
				var x = dataContainer.getAttribute('data-x'),
					y = dataContainer.getAttribute('data-y');

				var tree = e.target.closest('.talent-table').id

				var talent = talentCalc.CLASS_DATA[talentCalc.selection][tree].talents.find(tal => tal.x == x && tal.y == y)
				var data = Object.assign({}, talent)
				delete data.img

				data.canSpend = talentCalc.locked(talent, tree)

				// data.description = talent.d

				tooltip.create(data)
				tooltip.updateCoords(e)

				// e.target.addEventListener('mouseleave', tooltip.mouseleaveCleanup)
			}
			return
		})

		// this.container.addEventListener('mouseleave', function(e) {
		// 	if (e.target.matches('img.talent')) {
		// 		tooltip.empty()
		// 		// e.target.addEventListener('mouseleave', tooltip.mouseleaveCleanup)
		// 	}
		// })


	},
	spend: function(talent, talentElem, amount, tree) {
		talent.spent += amount
		var elem = talentElem.closest('div.talent-container')
		elem.querySelector('div.spent-points').innerText = talent.spent
		this.maxed(talent, tree, elem)
		this.grayed(tree)
		this.unlocked(talent, tree, elem)
		this.update.footer(tree)
		this.update.header()

	},
	maxed: function(talent, tree, talentElem) {
		// var talentElem = document.getElementById(tree).querySelector(`div.talent-container[data-x='${talent.x}'][data-y='${talent.y}']`)
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
	// checks to see if a given talent should be unlocked
	unlocked: function(talent, tree, talentElem) {
		if (talent.unlocks) {
			talent.unlocks.forEach(function(name) {
				var unlockedTalent = talentCalc.CLASS_DATA[talentCalc.selection][tree].talents.find(t => t.n == name)
				var unlockedTalentContainer = document.getElementById(tree).querySelector(`div.talent-container[data-x="${unlockedTalent.x}"][data-y="${unlockedTalent.y}"]`)
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
	},

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

function update_class(class_name, ix = 0, search) {
	var id = ix;
	var badass_url = new URL(document.location.origin.toString())
	badass_url.pathname = `talent_calc/${class_name}`
	if (Boolean(id)) {
		badass_url.pathname = `talent_calc/${class_name}/${id}`
	}
	if (Boolean(search)) {
		badass_url.search = search
	}

	$.ajax({
		url: badass_url,
		dataType: 'html',
		success: function(data) {
			let selected = $("a.class-filter.selected").attr("id");
			if (selected != class_name) {
				$("#talent_calc").html(data);
				$(".class-filter").removeClass('selected');
				$(`#${class_name}`).addClass('selected');
			}
		},
		complete: function(data) {
			var data2 = {}
			if (id) {
				data2['id'] = id
			}
			if (class_name) {
				data2['class_name'] = class_name
				$.ajax({
					url: '/ajax/load_spec/',
					data: data2,
					dataType: 'json',
					success: function(data) {
						if (class_name) {
							if (document.location.href.toString().includes('talent_calc')) {
								updateURL("/talent_calc", class_name, data.hash)
							}
							resetAll()
							if (data.hash) {
								preBuiltSpec(data.hash);
							}
							if (id) {
								info_display(id, 'tc')
							}
						}
					}
				});
			}
		}
	});
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

// most likely needed
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

function buildClassData(refresh) {
	talentPointsSpent = {}
	classData = {}
	// 	let params = myURL.searchParams
	// let classEle =
	// const className = $('.class-filter.selected')[0].id
	const className = ($('.class-filter.selected').length) ? $('.class-filter.selected')[0].id : false

	if (!className) {
		return
	}
	const selectedClass = talentData.classes.find(function(a) {
		return a.name == className;
	})
	let treeNames = []

	selectedClass.tree_talents.forEach(function(item, index) {
		// let n = titleCase(item.name)
		treeNames.push(item.name)
		talentPointsSpent[item.name] = {
			vals: [0, 0, 0, 0, 0, 0, 0],
			total: function() {
				return this.vals.reduce((a, b) => a + b)
			},
			highest_tier: function() {
				let x = []
				this.vals.forEach(function(item, index) {
					if (item > 0) {
						x.push(index)
					}
				})
				return Math.max(...x) + 1
			}
		}
	})
	talentPointsSpent.grandTotal = function() {
		return (this[treeNames[0]].total() + this[treeNames[1]].total() + this[treeNames[2]].total())
	}

	// for convenience
	talentPointsSpent.treeNames = treeNames
	talentPointsSpent.className = className

	talentPointsSpent.hardLocked = false
	talentPointsSpent.softLocked = false


	const tableData = tableFormat[className]
	const combinedTalents = combineTalents(selectedClass)
	const finalData = mapTalentsToTableData(tableData.trees, combinedTalents)

	classData = {
		trees: finalData
	}

	let url = new URL(document.location)
	if (url.search && !refresh) {
		try {
			preBuiltSpec(url.search)
		} catch (error) {
			console.log("While building spec using hash, the following exception occurred:\n", error)
		}
	}
	updateTalentHeader() //function call needed here for switching to different class
}

function mapTalentsToTableData(trees, tal_arr) {
	trees.forEach(function(tree, index) {
		tree.data.forEach(function(data_arr, j) {
			let reqTalentPoints = j * 5
			data_arr.forEach(function(v, k) {
				if (v >= 1 || v.length > 1) { //
					trees[index].data[j][k] = tal_arr.pop()
					trees[index].data[j][k].invested = 0
					trees[index].data[j][k].requiredTalentPoints = reqTalentPoints
					trees[index].data[j][k].j = j
					trees[index].data[j][k].k = k
					if (trees[index].data[j][k].unlocks) {
						trees[index].data[j][k].arrows = []
						if (v.length == 2) {
							trees[index].data[j][k].multi = true
							trees[index].data[j][k].unlocks.forEach(function(z, ii) {
								trees[index].data[j][k].arrows.push(arrowTypeSwitch(v[ii]))
							})
						} else {
							trees[index].data[j][k].arrows.push(arrowTypeSwitch(v))
						}
					}
				}
			})
		})
	})
	return trees
}

// function arrowTypeSwitch(item) {
//
// 	switch (item) {
// 		// down, arrow length is inverse of v (v decreases, length increases)
// 		default:
// 			let n = 5 - item
// 			return `talentcalc-arrow-down down-${n}`
// 		// right
// 		case 6:
// 			return "talentcalc-arrow right"
// 		// rightdown
// 		case 7:
// 			return "talentcalc-arrow rightdown"
// 	}
// }

function combineTalents(d) {
	let talent_arr = []
	data = d.tree_talents
	data.forEach(function(item, index) {
		talent_arr.push(item.talents)
	})
	return talent_arr.flat().reverse()
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

function mouseDownHandler(e = null, talent, tree) {
	var manuallyClicked = false
	if (e) {
		manuallyClicked = true
		var targetTalent = $(e.target)

		var treeName = titleCase(targetTalent.closest('div.talentTable')[0].id)

		// const name = targetTalent.attr('name')
		const name = titleCase(targetTalent.attr('name'))
		const j = targetTalent.attr('data-j')
		const k = targetTalent.attr('data-k')

		const found = classData.trees.find(function(x) {
			return x.name == treeName
		})
		var talentObj = found.data[j][k]

		talentObj.invested = parseInt(targetTalent.closest('.talent-container').find('.spentPoints').first().text()) // should insure points don't carry over when switching between classes

		if (((talentObj.invested === talentObj.maxRank) && e.which === 1) || (talentPointsSpent.hardLocked)) {
			// updateTooltip(e) //tooltip goes away otherwise, unsure why
			return
		}
	} else {
		var talentObj = talent
		var treeName = titleCase(tree)
		var targetTalent = $(`img.talent[name="${talentObj.name}"]`)
		var e = true
	}
	pointSpender(talentObj, e, treeName)

	targetTalent.closest(".talentTable").find(".talentFooter span.talentFooter-spentPoints").text("(" + talentPointsSpent[treeName].total() + ")")

	if (manuallyClicked) {
		let url = new URL(document.location)
		url.search = urlBuilder()
		history.replaceState(null, null, url)
		// tooltip_v2(e, true, true)
	}

	updateTalentHeader()
}

function updateTalentHeader() {
	let treeNames = talentPointsSpent.treeNames

	let a = `(${talentPointsSpent[treeNames[0]].total()}/${talentPointsSpent[treeNames[1]].total()}/${talentPointsSpent[treeNames[2]].total()})`
	$("#allottedTalentPoints").text(a)
	$("#talents_spent").text(a)

	let requiredLevel = (talentPointsSpent.grandTotal() >= 1) ? talentPointsSpent.grandTotal() + 9 : "--"
	$("#requiredLevel").text(`Required level: ${requiredLevel}`)
	let pointsRemaining = 51 - talentPointsSpent.grandTotal()
	$("#pointsRemaining").text(`Points left: ${pointsRemaining}`)

	return a
}

function updateTooltip(e) {
	const targetTalent = $(e.target)
	const name = titleCase(targetTalent.attr('name'))
	const tree = titleCase(targetTalent.closest('div.talentTable')[0].id)
	const found = classData.trees.find(function(x) {
		return x.name == tree
	})

	const j = targetTalent.attr('data-j')
	const k = targetTalent.attr('data-k')

	const talentObj = found.data[j][k]
	const talentCopy = Object.assign({}, talentObj)
	const requiredTalentPoints = talentObj.requiredTalentPoints

	let description
	let next_rank = true
	let req_text = ''
	let tooltipFooter = {}

	const locked = $(e.target).hasClass('locked')

	if (talentObj.invested == 0) {
		next_rank = false
		talentCopy.invested++
		tooltipFooter.text = 'Click to learn'
		tooltipFooter.color = 'learn'
		description = talentCopy.description()
	}

	if (talentObj.maxRank == 1) {
		next_rank = false
		talentCopy.invested = talentCopy.maxRank
		description = talentCopy.description()
	}

	if (talentObj.invested == talentObj.maxRank) {
		tooltipFooter.text = 'Right-click to unlearn'
		tooltipFooter.color = 'unlearn'

		next_rank = false
		description = talentCopy.description()
	}

	if (talentObj.maxRank > 1 && talentObj.invested > 0 && next_rank) {
		talentCopy.invested++
		// description = talent.description() + "\n\nNext Rank:\n" + talentCopy.description()
		description = talentObj.description()

	}
	if (talentPointsSpent[tree].total() < requiredTalentPoints) {
		req_text = `Requires ${requiredTalentPoints} points in ${tree} Talents`
	}

	if (locked) {

		// once talentData format is corrected, won't need coords, can just do named lookups
		const testName = talentCopy.locked
		let testEle = $(`img.talent[name="${testName}"]`)
		let j = testEle.attr('data-j')
		let k = testEle.attr('data-k')
		const prereq = Object.assign({}, found.data[j][k])

		const points_remaining = prereq.maxRank - prereq.invested
		const plural = (points_remaining > 1) ? 's' : ''
		req_text = `Requires ${points_remaining} point${plural} in ${prereq.name}\n` + req_text
	}


	const tooltipElems = [
		{
			class: 'title',
			text: name
		},
		{
			class: 'rank',
			text: "Rank " + talentObj.invested + "/" + talentObj.maxRank
		},
		{
			class: 'req',
			text: req_text
		},
		{
			class: 'description',
			text: description
		}]

	if (next_rank) {
		tooltipElems.push({
			class: 'next',
			text: "\nNext Rank:\n"
		})
		tooltipElems.push({
			class: 'description',
			text: talentCopy.description()
		})

	} else if (!(req_text || talentPointsSpent.hardLocked || (talentPointsSpent.softLocked && tooltipFooter.color == 'learn'))) {
		tooltipElems.push({
			class: tooltipFooter.color,
			text: tooltipFooter.text
		})
	}

	utilities.bigdaddytooltip(targetTalent, tooltipElems)
}

function checkIfAbleToUnspec(tree, tier_unspeccing_from) {
	const tier_unspeccing = tier_unspeccing_from
	const tier_check = talentPointsSpent[tree].highest_tier() - 1
	const locked_tier = checkLockedTiers(tree)
	const tier_unlocked = (tier_unspeccing <= locked_tier) ? false : true

	let decision = false
	if (!tier_unlocked) {}

	if (((talentPointsSpent[tree].vals.slice(0, tier_check).reduce((a, b) => (a + b)) - tier_check * 5) > 0) &&
		tier_unlocked &&
		(talentPointsSpent[tree].vals.slice(0, tier_unspeccing).reduce((a, b) => (a + b)) - tier_unspeccing * 5) > 0) {
		decision = true
	}
	return decision
}

function checkLockedTiers(tree) {
	let bool_arr = [],
		num_arr = []
	let tier_check = talentPointsSpent[tree].highest_tier() - 1
	for (let k = 0; k < tier_check; k++) {
		let y = k + 1
		let req_points = y * 5
		let f = talentPointsSpent[tree].vals.slice(0, y).reduce((a, b) => (a + b))
		let sum = (f - req_points)
		num_arr.push(sum)
		bool_arr.push({
			extrapoints: sum,
			tier: y
		}) //for debugging
	}
	let locked_tier = num_arr.lastIndexOf(0) + 1
	return locked_tier
}

function pointSpender(talent, e, tree, targetTal) {
	const talent_name = talent.name

	// basically the inverse of .locked
	const unlocks = (!Array.isArray(talent.unlocks)) ? Array(talent.unlocks) : talent.unlocks
	const tier = (talent.requiredTalentPoints / 5)
	const targetTalent = $(`img.talent[name="${talent_name}"]`)

	if ((talentPointsSpent[tree].total() < talent.requiredTalentPoints) || (targetTalent.hasClass('locked')) || (talentPointsSpent.hardLocked)) {
		return
	}
	if (e.which === 1 || e == true) {
		if (talentPointsSpent.grandTotal() > 50) {
			if (!talentPointsSpent.softLocked) {
				talentPointsSpent.softLocked = true
				talentLocker()
			}
			return
		} else if (talent.invested < talent.maxRank) {
			talentPointsSpent[tree].vals[tier]++
			talent.invested++

			targetTalent.closest('.talent-container').find('.spentPoints').first().text(talent.invested)

			let tierU = (talentPointsSpent[tree].total() < 30) ? Math.floor(talentPointsSpent[tree].total() / 5) : 6
			let talentObjs = []
			const found = classData.trees.find(function(x) {
				return x.name == tree
			})
			found.data[tierU].filter(function(t) {
				if (t) {
					talentObjs.push(t)
				}
			})
			talentObjs.forEach(function(tal) {

				let tal_name = tal.name
				let t = $(`img.talent[name="${tal_name}"]`)
				t.removeClass('grayed') // ungray talent element
				t.closest('.talent-container').find(".spentPoints").first().removeClass('grayed') // ungray spentPoints element
				if (tal.locked) { // if talent object has locked property, also has arrows
					arrowClassChanger(tal_name, false, 'grayed')
				}
			})
			if (talent.invested == talent.maxRank) {
				let t = $(`img.talent[name="${talent_name}"]`)
				t.addClass('max')
				t.closest('.talent-container').find(".spentPoints").first().addClass('max')

				// if talent is a pre req, unlock each parent elem
				if (talent.unlocks) {
					unlocks.forEach(function(n) {
						let par = $(`img.talent[name="${n}"]`).removeClass('locked') //unlock talent element
						par.closest('.talent-container').find(".spentPoints").first().removeClass('locked') //unlock points spent element
						arrowClassChanger(n, false, 'locked')

					})
				}
			}
			if (talentPointsSpent.grandTotal() > 50) {
				talentPointsSpent.softLocked = true
				talentLocker()
				return
			}
			return
		}
	}

	// right click
	else if (e.which === 3) {
		let can_unspec = false
		let tier_unspeccing = tier + 1
		if (tier_unspeccing == talentPointsSpent[tree].highest_tier()) {
			can_unspec = true
		}

		if (tier_unspeccing < talentPointsSpent[tree].highest_tier()) {
			can_unspec = checkIfAbleToUnspec(tree, tier_unspeccing)
		}

		if (talent.invested == talent.maxRank && unlocks) {
			let test_arr = []
			unlocks.forEach(function(item) {
				const child_talent = $(`img.talent[name="${item}"]`)
				let n = child_talent.closest('.talent-container').find('.spentPoints').text()
				if (can_unspec && n > 0) {
					console.log('Hey idiot, you gotta unspec ' + item + ' first')
					test_arr.push(false)
					return
				} else {
					test_arr.push(true)
				}
			})
			if (test_arr.some(function(item) {
					return item == false
				})) {
				return
			}
		}


		if (talent.invested > 0 && can_unspec) {
			talentPointsSpent[tree].vals[tier]--
			talent.invested--

			targetTalent.closest('.talent-container').find('.spentPoints').first().text(talent.invested)


			if (talentPointsSpent.grandTotal() < 51 && talentPointsSpent.softLocked) {
				talentPointsSpent.softLocked = false
				talentUnlocker()
			}

			// begin locking/graying syntax
			talElem = $(`img.talent[name="${talent_name}"]`)
			talElem.removeClass('max') //NOTE: remove max class from talent element
			talElem.closest('.talent-container').find('.spentPoints').removeClass('max') // NOTE: remove max class from pointsSpent element
			if (talent.unlocks) {
				unlocks.forEach(function(n) {
					let par = $(`img.talent[name="${n}"]`).addClass('locked') //NOTE: locks talent element
					par.closest('.talent-container').find(".spentPoints").first().addClass('locked') //NOTE: locks points spent element

					arrowClassChanger(n, true, 'locked')
				})
			}

			let tierL = Math.floor(talentPointsSpent[tree].total() / 5) + 1

			let talentObjs = []

			let found = classData.trees.find(function(x) {
				return x.name == tree
			})

			found.data.slice(tierL).forEach(function(arr, ind) {
				arr.filter(function(t) {
					if (t) {
						talentObjs.push(t)
					}
				})
			})

			talentObjs.forEach(function(tal, ind) {
				if (tal) {
					let t = $(`img.talent[name="${tal.name}"]`)
					t.addClass('grayed') //NOTE: grayed added to talent elem
					t.closest('.talent-container').find('.spentPoints').addClass('grayed') //NOTE: grayed added to pointsSpent elem
					if (tal.locked) {
						arrowClassChanger(tal.name, true, 'grayed')
					}
				}
			})
			return
		}
	}
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

function urlBuilder() {
	const re = /a{2,}|b{2,}|c{2,}|d{2,}|e{2,}|m{2,}|J{2,}/g //only looks for repeats of a/b/c/d/e atm
	const translationTable = getTranslationTable()
	let myURL = ''
	var newURL = ''
	classData.trees.forEach(function(item, ind) {
		let invested = ''
		item.data.forEach(function(dataArr) {
			dataArr.forEach(function(x) {
				if (x) {
					invested = invested.concat('', x.invested)
				}
			})
		})
		invested = (!invested.length % 2 == 0) ? invested.concat('', '0') : invested
		invested = (ind < 2) ? invested.concat('', '7') : invested.concat('', '8')
		myURL = myURL.concat('', invested)
	})

	let newStrArr = myURL.split('7')
	newStrArr.forEach(function(str, indc) {

		if (indc < 2) {
			str = (str.length % 2 == 0) ? str.concat('', '07') : str.concat('', '7')
		}
		for (var i = 0; i < str.length; i = i + 2) {
			let subStr = str.substring(i, i + 2)
			newURL = newURL.concat('', translationTable[parseInt(subStr)])
		}
	})

	let matchArr = newURL.match(re)
	for (var y = 0; y < matchArr.length; y++) {
		newURL = newURL.replace(matchArr[y], matchArr[y][0] + (matchArr[y].length).toString())
	}

	let shortestURL = newURL.slice(0, newURL.indexOf('Z'))
	let url = new URL(location.origin + location.pathname)
	let params = url.searchParams

	params.set('class', $('.class-filter.selected')[0].id)
	url.hash = shortestURL
	return shortestURL
}

function urlExpander(hash) {
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

}

function preBuiltSpec(ha = '') {
	var hash = ha
	if (hash.startsWith('?')) {
		hash = hash.substring(1)
	}
	var expanded = urlExpander(hash)
	var treeName = ''
	let hashArr = expanded.slice(0, expanded.indexOf('8')).split('7')
	classData.trees.forEach(function(item, i) {
		var arr = hashArr[i].split('')
		treeName = item.name
		item.data.forEach(function(dataArr, i2) {
			dataArr.forEach(function(t, i3) {
				if (t) {
					if (hashArr) {
						if (arr[0] >= 1) {
							let newArr = [...Array(parseInt(arr.shift()))].fill(1)
							newArr.forEach(function(item2) {
								mouseDownHandler(null, t, treeName)
							})
							return
						} else {
							arr.shift()
						}
					}
				}
			})
		})
	})
}

function arrowClassChanger(talName, add, lockOrGray) {
	//

	let addOrRemove = 'add'

	if (!add) {
		addOrRemove = 'remove'
	}
	let arrows = $(`div.talentcalc-arrow[data-unlocks="${talName}"]`)
	arrows.each(function() {
		if (add) {
			$(this).addClass(lockOrGray)
		} else {
			$(this).removeClass(lockOrGray)
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
