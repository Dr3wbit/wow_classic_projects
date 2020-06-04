
var talentPointsSpent = {}
var classData = {}

$(document).ready(initializeApp)

function initializeApp() {
	$("#talentLock").unbind("click")
	$("#resetTalents").unbind("click")

	applyClickHandlers()
	var refresh = (performance.navigation.type == 1) ? true : false
	buildClassData(refresh)

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
			navigator.clipboard.writeText(url.toString()).then(function () {
				/* clipboard successfully set */
			}, function () {
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
				lockButton.css({"color": "#3d7e9a"})
				params.delete('L')
				if (talentPointsSpent.softLocked) {
					talentLocker()
				}
			}
			else if ($("#talentLock").hasClass('unlock')) {
				talentLocker()

				talentPointsSpent.hardLocked = true

				lockButton.removeClass("unlock").addClass("lock")
				lockButton.attr('title', 'Locked')
				lockButton.css({"color": "rgba(231, 186, 0, 1);"})
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

	treeNames.forEach(function (tree) {
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
	let found = classData.trees.find(function (x) {
		return x.name == tree_name
	})

	found.data.forEach(function (dataArr, tier) {
		dataArr.forEach(function (tal) {
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

	talentPointsSpent[tree_name].vals.forEach(function (v, i) {
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
	} else {
	}
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
	const selectedClass = talentData.classes.find(function (a) {
		return a.name == className;
	})
	let treeNames = []

	selectedClass.tree_talents.forEach(function (item, index) {
		// let n = titleCase(item.name)
		treeNames.push(item.name)
		talentPointsSpent[item.name] = {
			vals: [0, 0, 0, 0, 0, 0, 0],
			total: function () { return this.vals.reduce((a, b) => a + b) },
			highest_tier: function () {
				let x = []
				this.vals.forEach(function (item, index) {
					if (item > 0) {
						x.push(index)
					}
				})
				return Math.max(...x) + 1
			}
		}
	})
	talentPointsSpent.grandTotal = function () {
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

	classData = { trees: finalData }

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
	trees.forEach(function (tree, index) {
		tree.data.forEach(function (data_arr, j) {
			let reqTalentPoints = j * 5
			data_arr.forEach(function (v, k) {
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
							trees[index].data[j][k].unlocks.forEach(function (z, ii) {
								trees[index].data[j][k].arrows.push(arrowTypeSwitch(v[ii]))
							})
						}
						else {
							trees[index].data[j][k].arrows.push(arrowTypeSwitch(v))
						}
					}
				}
			})
		})
	})
	return trees
}

function arrowTypeSwitch(item) {

	switch (item) {
		// down, arrow length is inverse of v (v decreases, length increases)
		default:
			let n = 5 - item
			return `talentcalc-arrow-down down-${n}`
		// right
		case 6:
			return "talentcalc-arrow right"
		// rightdown
		case 7:
			return "talentcalc-arrow rightdown"
	}
}

function combineTalents(d) {
	let talent_arr = []
	data = d.tree_talents
	data.forEach(function (item, index) {
		talent_arr.push(item.talents)
	})
	return talent_arr.flat().reverse()
}

function talentHandler() {

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

		// var treeName = targetTalent.closest('div.talentTable')[0].id
		var treeName = titleCase(targetTalent.closest('div.talentTable')[0].id)

		// const name = targetTalent.attr('name')
		const name = titleCase(targetTalent.attr('name'))
		const j = targetTalent.attr('data-j')
		const k = targetTalent.attr('data-k')

		const found = classData.trees.find(function (x) {
			return x.name == treeName
		})
		var talentObj = found.data[j][k]

		talentObj.invested = parseInt(targetTalent.closest('.talent-container').find('.spentPoints').first().text()) // should insure points don't carry over when switching between classes

		if (((talentObj.invested === talentObj.maxRank) && e.which === 1) || (talentPointsSpent.hardLocked)) {
			// updateTooltip(e) //tooltip goes away otherwise, unsure why
			return
		}
	}
	else {
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
	const found = classData.trees.find(function (x) {
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
		{class: 'title', text: name},
		{class: 'rank', text: "Rank " + talentObj.invested + "/" + talentObj.maxRank},
		{class: 'req', text: req_text},
		{class: 'description', text: description} ]

	if (next_rank) {
		tooltipElems.push({class: 'next', text: "\nNext Rank:\n"})
		tooltipElems.push({class: 'description', text: talentCopy.description()})

	} else if (!(req_text || talentPointsSpent.hardLocked || (talentPointsSpent.softLocked && tooltipFooter.color == 'learn'))) {
		tooltipElems.push({class: tooltipFooter.color, text: tooltipFooter.text})
	}

	utilities.bigdaddytooltip(targetTalent, tooltipElems)
}

function checkIfAbleToUnspec(tree, tier_unspeccing_from) {
	const tier_unspeccing = tier_unspeccing_from
	const tier_check = talentPointsSpent[tree].highest_tier() - 1
	const locked_tier = checkLockedTiers(tree)
	const tier_unlocked = (tier_unspeccing <= locked_tier) ? false : true

	let decision = false
	if (!tier_unlocked) {
	}

	if (((talentPointsSpent[tree].vals.slice(0, tier_check).reduce((a, b) => (a + b)) - tier_check * 5) > 0) &&
		tier_unlocked &&
		(talentPointsSpent[tree].vals.slice(0, tier_unspeccing).reduce((a, b) => (a + b)) - tier_unspeccing * 5) > 0) {
		decision = true
	}
	return decision
}

function checkLockedTiers(tree) {
	let bool_arr = [], num_arr = []
	let tier_check = talentPointsSpent[tree].highest_tier() - 1
	for (let k = 0; k < tier_check; k++) {
		let y = k + 1
		let req_points = y * 5
		let f = talentPointsSpent[tree].vals.slice(0, y).reduce((a, b) => (a + b))
		let sum = (f - req_points)
		num_arr.push(sum)
		bool_arr.push({ extrapoints: sum, tier: y }) //for debugging
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
		}
		else if (talent.invested < talent.maxRank) {
			talentPointsSpent[tree].vals[tier]++
			talent.invested++

			targetTalent.closest('.talent-container').find('.spentPoints').first().text(talent.invested)

			let tierU = (talentPointsSpent[tree].total() < 30) ? Math.floor(talentPointsSpent[tree].total() / 5) : 6
			let talentObjs = []
			const found = classData.trees.find(function (x) {
				return x.name == tree
			})
			found.data[tierU].filter(function (t) {
				if (t) {
					talentObjs.push(t)
				}
			})
			talentObjs.forEach(function (tal) {

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
					unlocks.forEach(function (n) {
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
			unlocks.forEach(function (item) {
				const child_talent = $(`img.talent[name="${item}"]`)
				let n = child_talent.closest('.talent-container').find('.spentPoints').text()
				if (can_unspec && n > 0) {
					console.log('Hey idiot, you gotta unspec ' + item + ' first')
					test_arr.push(false)
					return
				}
				else {
					test_arr.push(true)
				}
			})
			if (test_arr.some(function (item) { return item == false })) {
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
				unlocks.forEach(function (n) {
					let par = $(`img.talent[name="${n}"]`).addClass('locked') //NOTE: locks talent element
					par.closest('.talent-container').find(".spentPoints").first().addClass('locked') //NOTE: locks points spent element

					arrowClassChanger(n, true, 'locked')
				})
			}

			let tierL = Math.floor(talentPointsSpent[tree].total() / 5) + 1

			let talentObjs = []

			let found = classData.trees.find(function (x) {
				return x.name == tree
			})

			found.data.slice(tierL).forEach(function (arr, ind) {
				arr.filter(function (t) {
					if (t) {
						talentObjs.push(t)
					}
				})
			})

			talentObjs.forEach(function (tal, ind) {
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
function talentLocker(tree='') {

	let treeNames = []
	if (!tree) { // defaults to all trees
		treeNames = talentPointsSpent.treeNames
	} else {
		treeNames.push(tree)
	}
	let talentObjs = []

	// get list of talent objects with no points spent
	treeNames.forEach(function (name) {
		let found = classData.trees.find(function (x) {
			return x.name == name
		})

		found.data.forEach(function (dataArr, tier) {
			dataArr.forEach(function (tal) {
				if (tal) {
					if (!tal.invested) {
						talentObjs.push(tal)
					}
				}
			})
		})
	})

	talentObjs.forEach(function (tal) {
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
			unlocks.forEach(function (n) {
				let par = $(`img.talent[name="${n}"]`).addClass('locked')
				par.closest('.talent-container').find(".spentPoints").first().addClass('locked')

				arrowClassChanger(n, true, 'locked')
			})
		}
	})
}

function talentUnlocker(tree='') {
	let treeNames = []
	if (!tree) { // defaults to all trees
		treeNames = talentPointsSpent.treeNames
	} else {
		treeNames.push(tree)
	}

	treeNames.forEach(function (tree) {
		let found = classData.trees.find(function (x) {
			return x.name == tree
		})
		let y = (talentPointsSpent[tree].total() < 30) ? Math.floor(talentPointsSpent[tree].total() / 5) : 6
		let tiers = [...Array(y + 1).keys()]
		tiers.forEach(function (i) {
		})
		let tier = tiers[tiers.length - 1]
		for (tier; tier >= 0; tier = tier - 1) {
			found.data[tier].forEach(function (tal) {
				if (tal) {//skips empty slots
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
	classData.trees.forEach(function (item, ind) {
		let invested = ''
		item.data.forEach(function (dataArr) {
			dataArr.forEach(function (x) {
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
	newStrArr.forEach(function (str, indc) {

		if (indc < 2) {
			str = (str.length % 2 == 0) ? str.concat('', '07') : str.concat('', '7')
		}
		for (var i = 0; i < str.length; i = i + 2) {
			let subStr = str.substring(i, i + 2)
			newURL = newURL.concat('', translationTable[parseInt(subStr)])
		}
	})

	let matchArr = newURL.match(re)
	for (var y=0; y < matchArr.length; y++) {
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
	newStrArr.forEach(function (item, ind) {
		item = (ind < 2) ? item + 'Y' : item + 'Z'
		arr = item.split('')
		arr.forEach(function (v, i) {
			arr[i] = arr[i].replace(v, reverseTable[v])
		})
		newStrArr[ind] = arr.join('')
	})
	newStr = newStrArr.join('')
	return newStr

}

function preBuiltSpec(ha='') {
	var hash = ha
	if (hash.startsWith('?')) {
		hash = hash.substring(1)
	}
	var expanded = urlExpander(hash)
	var treeName = ''
	let hashArr = expanded.slice(0, expanded.indexOf('8')).split('7')
	classData.trees.forEach(function (item, i) {
		var arr = hashArr[i].split('')
		treeName = item.name
		item.data.forEach(function (dataArr, i2) {
			dataArr.forEach(function (t, i3) {
				if (t) {
					if (hashArr) {
						if (arr[0] >= 1) {
							let newArr = [...Array(parseInt(arr.shift()))].fill(1)
							newArr.forEach(function (item2) {
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
	arrows.each(function () {
		if (add) {
			$(this).addClass(lockOrGray)
		} else {
			$(this).removeClass(lockOrGray)
		}
	})
}

function getTranslationTable() {
	const translationTable = {
		00: 'a', 01: 'b', 02: 'c', 03: 'd', 04: 'e', 05: 'f',
		10: 'g', 11: 'h', 12: 'i', 13: 'j', 14: 'k', 15: 'l',
		20: 'm', 21: 'n', 22: 'o', 23: 'p', 24: 'q', 25: 'r',
		30: 's', 31: 't', 32: 'u', 33: 'v', 34: 'w', 35: 'x',
		40: 'y', 41: 'z', 42: 'A', 43: 'B', 44: 'C', 45: 'D',
		50: 'E', 51: 'F', 52: 'G', 53: 'H', 54: 'I', 55: 'J', 07: 'Y', 08: 'Z'
	}
	return translationTable
}

function getReverseTable() {
	let translationTable = getTranslationTable()
	const reversedTable = {}
	Object.values(translationTable).forEach(function (item, index) {
		let repl = (Object.keys(translationTable)[index].length > 1) ? Object.keys(translationTable)[index] : "0" + Object.keys(translationTable)[index]
		reversedTable[item] = repl
	})
	return reversedTable
}
