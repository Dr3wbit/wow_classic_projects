
const talentPointsSpent = {}
const re = /a{2,}|b{2,}|c{2,}|d{2,}|e{2,}/g //only looks for repeats of a, b, or c atm
const re2 = /([a-z])\d/g
const translationTable = {
	00:'a', 01:'b', 02:'c', 03:'d', 04:'e', 05:'f',
	10:'g', 11:'h', 12:'i', 13:'j', 14:'k', 15:'l',
	20:'m', 21:'n', 22:'o', 23:'p', 24:'q', 25:'r',
	30:'s', 31:'t', 32:'u', 33:'v', 34:'w', 35:'x',
	40:'y', 41:'z',42:'A',43:'B',44:'C',45:'D',
	50:'E',51:'F',52:'G',53:'H',54:'I',55:'J', 07:'Y', 08:'Z'
}

const reversedTable = {}

Object.values(translationTable).forEach(function(item,index) {
  let repl = (Object.keys(translationTable)[index].length>1) ? Object.keys(translationTable)[index] : "0"+Object.keys(translationTable)[index]
  reversedTable[item] = repl
})


$(document).ready(initializeApp)

$(window).on('unload', function() {
	console.log("unloaded")
	// resetHandler()
})

function initializeApp() {

	// applyClickHandlers();

	classSelectionHandler()
	talentHandler()
	// lockSpec()
	// resetTalents()
	// exportSpec()

	const CLASS_ARR = ['druid','hunter','mage','paladin','priest','rogue','shaman','warlock','warrior']

	let myURL = new URL(document.location)
	if (myURL.search) {
		//
	}
	let params = myURL.searchParams
	if (params.has('class')){
		let cl_name = params.get('class')
		if (CLASS_ARR.some(function(name){ return cl_name == name})){
			buildClassData(null, cl_name, myURL.hash)
			// if (params.has('L')) {
			// }
			// if (myURL.hash) {
			// 	console.log("hash (init): ", myURL.hash)
			// 	buildClassData(null, cl_name, myURL.hash)
			// }
			//
		}
	}
}



// function applyClickHandlers() {
// 	classSelectionHandler()
// 	talentHandler()
// 	lockSpec()
// 	resetTalents()
// 	exportSpec()
// }


function exportSpec(){
	//
}




function populateTables(classData, reset=false) {
	//Retrieve the template data from the HTML
	let template = $('#handlebars-demo2').html();
	//Compile the template data into a function
	let templateScript = Handlebars.compile(template);
	let talent_html = templateScript(classData);
	$('#talentCalc').html(talent_html);
	talentHandler(classData)
	lockSpec(classData)
	if (!reset) {
		resetHandler(classData)
	}
	exportSpec(classData)
}

function classSelectionHandler() {

	$('.class-filter').on({
		click: e => {
			buildClassData(e)
		},
	})
}

function lockSpec(classData){
	$('#talentLock').on({
		click: e => {

			let url = new URL(document.location)
			let params = url.searchParams

			if ($(e.target).hasClass("unlock")) {
				talentLocker(classData)
				$(e.target).removeClass("unlock").addClass("lock")
				$(e.target).attr('title', 'Locked')

				params.set('L', true)


			} else {
				talentUnlocker(classData)
				$(e.target).removeClass("lock").addClass("unlock")
				$(e.target).attr('title', 'Unlocked')

				params.delete('L')


			}
			history.replaceState(null, null, url)
		},
	})
}

function resetHandler(classData){
	$('#resetTalents').on({
		click: e => {
			resetTalents(classData)
		}
	})
}

function resetTalents(classData) {

	let className = $('.class-filter.selected')[0].id
	let treeNames = []
	classData.trees.forEach(function(item) {
		treeNames.push(item.name)
	})

	treeNames.forEach(function(name) {
		let found = classData.trees.find(function(x) {
			return x.name == name
		})

		found.data.forEach(function(dataArr, tier){
			dataArr.forEach(function(tal){
				if (tal) {
					tal.invested = 0
				}
			})
		})
	})

	buildClassData(null, className, '', true)

	let url = new URL(document.location)
	url.hash = '#'

	history.replaceState(null, null, url)

}

function buildClassData(e=null, cl='', hash='', reset) {

	let className = cl
	let url = new URL(document.location)
	let params = url.searchParams


	if (cl){
		$(`#${className}`).addClass('selected')
	}
	else{
		if ($('.class-filter.selected') == $(e.target)) {
			return
		}
		$('.class-filter').removeClass('selected')
		const clickedFilter = $(e.target)
		clickedFilter.addClass('selected')
		className = clickedFilter[0].id
		$('.talentHeader').text(className)
		// let url = new URL(location.origin+location.pathname)
		// let params = url.searchParams

		params.set('class', className)
		url.hash = '#'
		history.replaceState(null, null, url)
	}

	const selectedClass = talentData.classes.find(function(a) {
		return a.name == className;
	})

	let treeNames = []

	selectedClass.tree_talents.forEach(function(item, index) {
		treeNames.push(item.name)
		talentPointsSpent[item.name] = {
			vals: [0,0,0,0,0,0,0],
			total: function() {return this.vals.reduce((a,b) => a+b)},
			highest_tier: function(){
				let x = []
				this.vals.forEach(function(item,index){
					if (item>0){
						x.push(index)
					}
				})
				return Math.max(...x)+1
			}
		}
	})
	talentPointsSpent.grandTotal = function(){
		return (this[treeNames[0]].total()+this[treeNames[1]].total()+this[treeNames[2]].total())
	}
	talentPointsSpent.locked = false

	const tableData = tableFormat[className]
	const combinedTalents = combineTalents(selectedClass)
	const finalData = mapTalentsToTableData(tableData.trees, combinedTalents)

	populateTables({trees: finalData}, reset)

	if (hash){
		const expanded = urlExpander(hash)
		try {
			preBuiltSpec({trees: finalData}, expanded, true)
		} catch (e) {
			console.log("While building spec using hash, the following exception occurred:\n", e)
		// } finally {
		// 	return
		}
	}

	if (params.has('L')){
		talentLocker({trees: finalData})
	}

	updateTalentHeader({trees: finalData}) //function call needed here for switching to different class
}


function mapTalentsToTableData(trees, tal_arr) {
	trees.forEach(function(tree, index) {
		tree.data.forEach(function(data_arr, j) {
            let reqTalentPoints = j*5
			data_arr.forEach(function(v, k) {
                if (v >= 1 || v.length > 1){ //
                    trees[index].data[j][k] = tal_arr.pop()
					trees[index].data[j][k].invested = 0
                    trees[index].data[j][k].requiredTalentPoints = reqTalentPoints
					trees[index].data[j][k].j = j
					trees[index].data[j][k].k = k
					if (trees[index].data[j][k].unlocks){
						trees[index].data[j][k].arrows = []
						if (v.length == 2) {
							trees[index].data[j][k].multi = true
							trees[index].data[j][k].unlocks.forEach(function(z, ii) {
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
		// down, arrow length is inverse of v (v decreases)
		default:
			let n = 5-item
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
	data.forEach(function(item, index) {
		talent_arr.push(item.talents)
	})
    return talent_arr.flat().reverse()
}

// name janitor, example: Curse of Exhaustion --> curse_of_exhaustion
// NOTE: not sure this is still needed
function name_sanitizer(arr) {
	const talent_arr = arr
	var regex = /\s/ig
	talent_arr.forEach(function(item, index) {
		item.name = item.name.toLowerCase().replace(regex, '_')
	})
	return talent_arr
}

function talentHandler(classData) {

	$(".talent").on({
		contextmenu: e => {
			e.preventDefault()
		},

		mouseenter: e => {
			updateTooltip(classData, e)
		},

		mouseleave: e => {
			const targetTalent = $(e.target)
			targetTalent.children($('.talent-tooltip').remove())
		},

		mousedown: e => {

			mouseDownHandler(e, classData)
		}

	})
}

//needs new name
function mouseDownHandler(e=null, classData, talent, tree) {

	var manuallyClicked = false
	if (e){
		manuallyClicked = true
		var targetTalent = $(e.target)
		targetTalent.children($('.talent-tooltip').remove())
		var treeName = targetTalent.closest('div.treeTitle.col').text().split('\n')[0]

		const name = targetTalent.attr('name')
		const j = targetTalent.attr('data-j')
		const k = targetTalent.attr('data-k')

		const found = classData.trees.find(function(x) { //
			return x.name == treeName
		})
		var talentObj = found.data[j][k]

		talentObj.invested = parseInt(targetTalent.children(0).first().text()) // should insure points don't carry over when switching between classes

		if (((talentObj.invested === talentObj.maxRank) && e.which===1 ) || (talentPointsSpent.locked)){
			updateTooltip(classData, e) //tooltip goes away otherwise, unsure why
			return
		}
	}
	else {
		var talentObj = talent
		var treeName = tree
		var targetTalent = $(`div.talent[name="${talentObj.name}"]`)
		var e = true
	}


	pointSpender(talentObj, e, treeName, classData)

	targetTalent.closest(".talentTable").find(".talentFooter").children(0).text(talentPointsSpent[treeName].total())

	// console.log(targetTalent.attr('name') + " : " + talentObj.invested)
	if (manuallyClicked) {
		urlBuilder(classData)
		updateTooltip(classData, e)
	}

	updateTalentHeader(classData)

}

function updateTalentHeader(classData) {
	let treeNames = []
	classData.trees.forEach(function(item) {
		treeNames.push(item.name)
	})
	let a = `(${talentPointsSpent[treeNames[0]].total()}/${talentPointsSpent[treeNames[1]].total()}/${talentPointsSpent[treeNames[2]].total()})`
	$("#allottedTalentPoints").text(a)
	let requiredLevel = (talentPointsSpent.grandTotal() >= 1) ? talentPointsSpent.grandTotal()+9 : "--"
	$("#requiredLevel").text(`Required level: ${requiredLevel}`)
	let pointsRemaining = 51-talentPointsSpent.grandTotal()
	$("#pointsRemaining").text(`Points left: ${pointsRemaining}`)
}

function updateTooltip(classData, e){
	const targetTalent = $(e.target)
	const name = targetTalent.attr('name')
	const tree = targetTalent.closest('div.treeTitle.col').text().split('\n')[0]

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

	const locked = $(e.target).hasClass('locked')

    if (talentObj.invested == 0)
    {
		next_rank = false
        talentCopy.invested++
        description = talentCopy.description()
    }

    if (talentObj.maxRank == 1)
    {
        next_rank = false
        talentCopy.invested = talentCopy.maxRank
        description = talentCopy.description()
    }

    if (talentObj.invested == talentObj.maxRank) {
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

	if (locked){
		const coords = talentCopy.locked
		const prereq = Object.assign({}, found.data[coords[0]][coords[1]])
		const points_remaining = prereq.maxRank - prereq.invested
		const plural = (points_remaining>1) ? 's' : ''
		req_text = `Requires ${points_remaining} point${plural} in ${prereq.name}\n` + req_text  //Figure out how to get the talent and points needed to unlock for this text
	}

	const next_rank_ele = (next_rank) ? $('<div/>', {
		class: 'talent-tooltip-rank-next',
		text: "\nNext Rank:\n",
	}).append($('<div/>', {
		class: 'talent-tooltip-description',
		text: talentCopy.description(),
	})) : null

	targetTalent.prev().append($('<div/>', {
		class: 'talent-tooltip',  //talent-tooltip (the container) is only class in css, the rest are inline styling
	})
	.append($('<div/>', {
		class: 'talent-tooltip-title',
		text: name,
	}))
	.append($('<div/>', {
		class: 'talent-tooltip-rank',
		text: "Rank " + talentObj.invested +"/"+ talentObj.maxRank,
	}))
	.append($('<div/>', {
		class: 'talent-tooltip-req',
		text: req_text,
	}))
	.append($('<div/>', {
		class: 'talent-tooltip-description',
		text: description,
	}))
	.append(next_rank_ele)
	)
}

function checkIfAbleToUnspec(tree, tier_unspeccing_from) {

	const tier_unspeccing = tier_unspeccing_from
	const tier_check = talentPointsSpent[tree].highest_tier() - 1
	const locked_tier = checkLockedTiers(tree)
	const tier_unlocked = (tier_unspeccing <= locked_tier)? false : true

	let decision = false
	if (!tier_unlocked){
		console.log(`Tiers ${locked_tier} and above are locked, unable to remove points`)
	}

	if ( ( (talentPointsSpent[tree].vals.slice(0, tier_check).reduce((a,b)=>(a+b)) - tier_check*5) > 0) &&
	tier_unlocked &&
	(talentPointsSpent[tree].vals.slice(0, tier_unspeccing).reduce((a,b)=>(a+b)) - tier_unspeccing*5) > 0)
	{
		decision = true
	}
	return decision
}

function checkLockedTiers(tree) {
	let bool_arr = [], num_arr = []
	let tier_check = talentPointsSpent[tree].highest_tier() - 1

	for (let k=0;k<tier_check;k++){

		let y = k+1
		let req_points = y*5
		let f = talentPointsSpent[tree].vals.slice(0, y).reduce((a,b)=>(a+b))
		let sum = (f - req_points)
		num_arr.push(sum)
		bool_arr.push({extrapoints:sum, tier:y}) //for debugging
	}

	let locked_tier = num_arr.lastIndexOf(0)+1
	return locked_tier
}

function pointSpender(talent, e, tree, classData, targetTal) {

	const unlocks = (!Array.isArray(talent.unlocks)) ? Array(talent.unlocks) : talent.unlocks
	const tier = (talent.requiredTalentPoints/5)
	const targetTalent = $(`div.talent[name="${talent.name}"]`)

	if (talentPointsSpent[tree].total() < talent.requiredTalentPoints) {
		return
	}
	if (targetTalent.hasClass('locked')) {
		return
	}

	// normal click
	if (e.which === 1 || e == true) {
		if (talentPointsSpent.grandTotal() > 50){
			if (!talentPointsSpent.locked) {
				talentLocker(classData)
			}
			return
		}
		if (talent.invested < talent.maxRank) {
			talentPointsSpent[tree].vals[tier]++
			talent.invested++
			targetTalent.children(0).first().text(talent.invested)

			let tierU = (talentPointsSpent[tree].total() < 30) ? Math.floor(talentPointsSpent[tree].total()/5) : 6
			let talentObjs = []
			const found = classData.trees.find(function(x) {
				return x.name == tree
			})

			found.data[tierU].filter(function(t) {
				if (t) {
					talentObjs.push(t)
				}
			})

			talentObjs.forEach(function(tal){
				let t = $(`div.talent[name="${tal.name}"]`)
				t.removeClass('grayed') // ungray talent element
				t.find(".spentPoints").first().removeClass('grayed') // ungray spentPoints element

				if (tal.locked) { // if talent object has locked property, also has arrows
					arrowClassChanger(tal.name, false, 'grayed')
				}
			})

			if (talent.invested == talent.maxRank) {
				let t = $(`div.talent[name="${talent.name}"]`)
				t.addClass('max')
				t.find(".spentPoints").first().addClass('max')

				// if talent is a pre req, unlock each parent elem
				if (talent.unlocks) {
					unlocks.forEach(function(n) {
						let par = $(`div.talent[name="${n}"]`).removeClass('locked') //unlock talent element
						par.find(".spentPoints").first().removeClass('locked') //unlock points spent element
						arrowClassChanger(n, false, 'locked')

					})
				}
			}
			if (talentPointsSpent.grandTotal() > 50) {
				talentLocker(classData)
				return
			}
			return
		}
	}

	// right click
	else if (e.which === 3) {
		let can_unspec = false
		let tier_unspeccing = tier+1
		if (tier_unspeccing == talentPointsSpent[tree].highest_tier()){
			can_unspec = true
		}

		if (tier_unspeccing < talentPointsSpent[tree].highest_tier()){
			can_unspec = checkIfAbleToUnspec(tree, tier_unspeccing)
		}

		if (talent.invested == talent.maxRank && unlocks) {
			// NOTE: will be unique once element names are unique, won't need .first()
			let test_arr = []
			unlocks.forEach(function(item){
				const child_talent = $(`div.talent[name="${item}"]`)
				let n = child_talent.find('.spentPoints').text()
				if (can_unspec && n > 0) {
					console.log('you must unspec ' + item)
					test_arr.push(false)
					return
				}
				else {
					test_arr.push(true)
				}
			})
			if (test_arr.some(function(item) {return item == false})) {
				return
		  	}
		}


		if (talent.invested > 0 && can_unspec) {
			talentPointsSpent[tree].vals[tier]--
			talent.invested--
			targetTalent.children(0).first().text(talent.invested)

			if (talentPointsSpent.grandTotal() < 51 && talentPointsSpent.locked) {
				talentUnlocker(classData)
			}

			// begin locking/graying syntax
			talElem = $(`div.talent[name="${talent.name}"]`)
			talElem.removeClass('max') //NOTE: remove max class from talent element
			talElem.find('.spentPoints').removeClass('max') // NOTE: remove max class from pointsSpent element
			if (talent.unlocks) {
				unlocks.forEach(function(n) {
					let par = $(`div.talent[name="${n}"]`).addClass('locked') //NOTE: locks talent element
					par.find(".spentPoints").first().addClass('locked') //NOTE: locks points spent element
					arrowClassChanger(n, true, 'locked')
				})
			}

			let tierL = Math.floor(talentPointsSpent[tree].total()/5)+1

			let talentObjs = []

			let found = classData.trees.find(function(x) {
				return x.name == tree
			})

			found.data.slice(tierL).forEach(function(arr, ind){
				arr.filter(function(t){
					if (t) {
						talentObjs.push(t)
					}
				})
			})

			talentObjs.forEach(function(tal, ind) {
				if (tal) {
					let t = $(`div.talent[name="${tal.name}"]`)
					t.addClass('grayed') //NOTE: grayed added to talent elem
					t.find('.spentPoints').addClass('grayed') //NOTE: grayed added to pointsSpent elem
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
function talentLocker(classData, trees='') {

	let treeNames = []
	if (!trees) { // defaults to all trees
		classData.trees.forEach(function(item) {
			treeNames.push(item.name)
		})
	} else {
		trees.forEach(function(item){
			treeNames.push(item)
		})
	}

	let talentObjs = []

	// get list of talent objects with no points spent
	treeNames.forEach(function(name) {
		let found = classData.trees.find(function(x) {
			return x.name == name
		})

		found.data.forEach(function(dataArr, tier){
			dataArr.forEach(function(tal){
				if (tal) {
					if (!tal.invested) {
						talentObjs.push(tal)
					}
				}
			})
		})
	})

	talentObjs.forEach(function(tal){
		let t = $(`div.talent[name="${tal.name}"]`)
		t.addClass('grayed')
		t.find(".spentPoints").addClass('grayed')
		if (tal.locked) {
			arrowClassChanger(tal.name, true, 'grayed')
		}
	})

	let url = new URL(document.location)
	let params = url.searchParams
	let lockButton = $("#talentLock")
	params.set('L', true)

	lockButton.removeClass("unlock").addClass("lock")
	lockButton.attr('title', 'Locked')
	history.replaceState(null, null, url)

	talentPointsSpent.locked = true
}

function talentUnlocker(classData, trees='') {
	let treeNames = []
	if (!trees) { // defaults to all trees
		classData.trees.forEach(function(item) {
			treeNames.push(item.name)
		})
	} else {
		trees.forEach(function(item){
			treeNames.push(item)
		})
	}
	treeNames.forEach(function(tree){
		let found = classData.trees.find(function(x) {
			return x.name == tree
		})
		let y = (talentPointsSpent[tree].total() < 30) ? Math.floor(talentPointsSpent[tree].total()/5) : 6
		let tiers = [...Array(y+1).keys()]
		tiers.forEach(function(i){
		})
		let tier = tiers[tiers.length - 1]
		for (tier; tier>=0;tier=tier-1){
			found.data[tier].forEach(function(tal) {
				if (tal) {//skips empty slots
					let t = $(`div.talent[name="${tal.name}"]`)
					t.removeClass('grayed')
					t.find('.spentPoints').first().removeClass('grayed')
					if (tal.locked) { //if object has a locked property, it also has an arrow(s)
						// let arrows = $(`div.talentcalc-arrow[data-unlocks="${tal.name}"]`)
						// arrows.each(function() {
						// 	$( this ).removeClass('grayed')
						// })
						arrowClassChanger(tal.name, false, 'grayed')

					}
				}
			})
		}
	})
	talentPointsSpent.locked = false
	let url = new URL(document.location)
	let params = url.searchParams
	let lockButton = $("#talentLock")

	lockButton.removeClass("lock").addClass("unlock")
	lockButton.attr('title', 'Unlocked')

	params.delete('L')
	history.replaceState(null, null, url)
}

function urlBuilder(classData) {
	let myURL = ''
	var newURL = ''
	classData.trees.forEach(function(item, ind){
		let invested = ''
		item.data.forEach(function(dataArr){
			dataArr.forEach(function(x) {
				if (x) {
					invested = invested.concat('', x.invested)
				}
			})
		})
		invested = (!invested.length%2==0) ? invested.concat('', '0') : invested
		invested = (ind<2) ? invested.concat('', '7') : invested.concat('', '8')
		myURL = myURL.concat('', invested)
	})

	let newStrArr = myURL.split('7')
	newStrArr.forEach(function(str, indc){

		if (indc <2 ){
			str = (str.length%2==0) ? str.concat('', '07') : str.concat('', '7')
		}

		for (var i = 0;i<str.length;i=i+2){

			let subStr = str.substring(i,i+2)
			newURL = newURL.concat('', translationTable[parseInt(subStr)])

		}
	})

	let matchArr = newURL.match(re)
	for (var y=0;y<matchArr.length;y++){
		newURL = newURL.replace(matchArr[y], matchArr[y][0]+(matchArr[y].length).toString())
	}

	let shortestURL = newURL.slice(0, newURL.indexOf('Z'))
	let url = new URL(location.origin+location.pathname)
	let params = url.searchParams

	params.set('class', $('.class-filter.selected')[0].id)
	url.hash = shortestURL
	// const finalURL = new URL(hash, url);
	history.replaceState(null, null, url)
}

function urlExpander(hash) {
	if (!hash){
		var hash = window.location.hash
	}
	let newStr = hash.slice(hash.indexOf('#')+1, hash.length)
	let matchArr = newStr.match(re2)
	for (var y=0;y<matchArr.length;y++){
		let replStr = Array(parseInt(matchArr[y][1])).fill(matchArr[y][0]).join('')
		newStr = newStr.replace(matchArr[y], replStr)
	}
	let newStrArr = newStr.split('Y')
	let arr

	newStrArr.forEach(function(item,ind){
		item = (ind<2) ? item+'Y' : item+'Z'
		arr = item.split('')
		arr.forEach(function(v,i){
			arr[i] = arr[i].replace(v, reversedTable[v])
		})

		newStrArr[ind] = arr.join('')

	})
	newStr = newStrArr.join('')
	return newStr

}

// needs new name
function preBuiltSpec(classData, hash='') {

	var treeName = ''
	let hashArr = hash.slice(0,hash.indexOf('8')).split('7')
	classData.trees.forEach(function(item, i){
		var arr = hashArr[i].split('')
		treeName = item.name
		item.data.forEach(function(dataArr, i2){
			dataArr.forEach(function(t, i3) {
				if (t) {
					if (hashArr){
						if (arr[0] > 1) {
							let newArr = [...Array(parseInt(arr.shift()))].fill()
							newArr.forEach(function(item2) {
								mouseDownHandler(null, classData, t, treeName)
							})
							return
						} if (arr[0] == 1){
							arr.shift()
							mouseDownHandler(null, classData, t, treeName)
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


//polyfill
// .flat()
if (!Array.prototype.flat) {
  Array.prototype.flat = function() {
    var depth = arguments[0];
    depth = depth === undefined ? 1 : Math.floor(depth);
    if (depth < 1) return Array.prototype.slice.call(this);
    return (function flat(arr, depth) {
      var len = arr.length >>> 0;
      var flattened = [];
      var i = 0;
      while (i < len) {
        if (i in arr) {
          var el = arr[i];
          if (Array.isArray(el) && depth > 0)
            flattened = flattened.concat(flat(el, depth - 1));
          else flattened.push(el);
        }
        i++;
      }
      return flattened;
    })(this, depth);
  };
}

function arrowClassChanger(talName, add, lockOrGray) {
	//
	let arrows = $(`div.talentcalc-arrow[data-unlocks="${talName}"]`)
	arrows.each(function() {
		if (add) {
			$( this ).addClass(lockOrGray)
		} else {
			$( this ).removeClass(lockOrGray)
		}
	})
}

function updateURL(url) {
	history.replaceState(null, null, url)
}
