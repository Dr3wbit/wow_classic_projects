
const talentPointsSpent = {}
const re = /a{2,}|b{2,}|c{2,}|d{2,}|e{2,}/g //only looks for repeats of a, b, or c atm
const re2 = /([a-z])\d/g

$(document).ready(initializeApp)

function initializeApp() {

	classSelectionHandler()
	talentHandler()

	const CLASS_ARR = ['druid','hunter','mage','paladin','priest','rogue','shaman','warlock','warrior']

	let myURL = new URL(document.location)
	if (myURL.search) {
		console.log("test init: ", myURL.search)
	}
	let params = myURL.searchParams
	if (params.has('class')){
		let cl_name = params.get('class')
		console.log("class (init): ", params.get('class'))
		if (CLASS_ARR.some(function(name){ return cl_name == name})){
			//if class exists in preset list, move on

			//get hash,
			// NOTE: validity check for the hash needed here
			if (myURL.hash) {
				// urlExpander(myURL.hash)
				console.log("hash (init): ", myURL.hash)
				talentBuilder(null, cl_name, myURL.hash)
			}
		}
	}


	// if (true) {
	// 	$('.class-filter').trigger('click', [ {hash:urlExpander(myURL.hash)} ])
	// }
	// applyClickHandlers();

}

// function applyClickHandlers() {
// 	classSelectionHandler()
// 	talentHandler()
// }

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

function populateTables(classData) {
	//Retrieve the template data from the HTML
	let template = $('#handlebars-demo2').html();
	//Compile the template data into a function
	let templateScript = Handlebars.compile(template);
	let talent_html = templateScript(classData);
	$('#talentCalc').html(talent_html);
	talentHandler(classData)
}

function classSelectionHandler() {

	$('.class-filter').on({
		click: e => {
			talentBuilder(e)
		},
	})
}

function talentBuilder(e=null, cl='', hash='') {

	let className = cl

	if (cl && hash){
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

		let url = new URL(location.origin+location.pathname)
		let params = url.searchParams

		params.set('class', className)
		url.hash = '#'
		history.replaceState({}, null, url)
	}

	const selectedClass = talentData.classes.find(function(a) {
		return a.name == className;
	})

	let tree_names = []

	selectedClass.tree_talents.forEach(function(item, index) {
		tree_names.push(item.name)
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
		return (this[tree_names[0]].total()+this[tree_names[1]].total()+this[tree_names[2]].total())
	}
	talentPointsSpent.locked = false

	const tableData = tableFormat[className]
	const combinedTalents = combineTalents(selectedClass)
	const finalData = mapTalentsToTableData(tableData.trees, combinedTalents)


	populateTables({trees: finalData}, talentPointsSpent)

	if (hash){
		const expanded = urlExpander(hash)
		preBuiltSpec({trees: finalData}, expanded, true)
		updatePointsElems({trees: finalData})
	}
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
    return talent_arr.flat().reverse()   //Microsoft Edge does not support  .flat()
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
			// console.log(e)
			targetTalent.children($('.talent-tooltip').remove())
		},

		mousedown: e => {
			const targetTalent = $(e.target)
			targetTalent.children($('.talent-tooltip').remove())
			// const unlocks = targetTalent.attr('data-unlocks')
			//gets talent tree name (kinda ghetto)
			const tree = targetTalent.closest('div.treeTitle.col').text().split('\n')[0]
			const name = targetTalent.attr('name')

			const found = classData.trees.find(function(x) { //
				return x.name == tree
			})
			const j = targetTalent.attr('data-j')
			const k = targetTalent.attr('data-k')

			const talent = found.data[j][k]
			talent.invested = parseInt(targetTalent.children(0).first().text()) // should insure points don't carry over when switching between classes

			const talentCopy = Object.assign({}, talent)
			const maxRank = talent.maxRank

			pointSpender(talent, e, tree, classData)

			// targetTalent.children(0).first().text(talent.invested)
			targetTalent.closest(".talentTable").find(".talentFooter").children(0).text(talentPointsSpent[tree].total())
			console.log(targetTalent.attr('name') + " : " + talent.invested)
			updateTooltip(classData, e)
			urlBuilder(classData)
		}

	})
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

            const talent = found.data[j][k]
			const talentCopy = Object.assign({}, talent)
			const requiredTalentPoints = talent.requiredTalentPoints

            let description
			let next_rank = true
			let req_text = ''

			const locked = $(e.target).hasClass('locked')

            if (talent.invested == 0)
            {
				next_rank = false
                talentCopy.invested++
                description = talentCopy.description()
            }

            if (talent.maxRank == 1)
            {
                next_rank = false
                talentCopy.invested = talentCopy.maxRank
                description = talentCopy.description()
            }

            if (talent.invested == talent.maxRank) {
                next_rank = false
                description = talentCopy.description()
            }

            if (talent.maxRank > 1 && talent.invested > 0 && next_rank) {
                talentCopy.invested++
                // description = talent.description() + "\n\nNext Rank:\n" + talentCopy.description()
				description = talent.description()

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
				text: "Rank " + talent.invested +"/"+ talent.maxRank,
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

function tryToUnlock(talentObj, tree, classData) {


	console.log("classData: ", classData)
	let talentCopy = Object.assign({}, talentObj)

	let parent_tal_elem = $(`div.talent[name="${talentCopy.name}"]`).first()
	let spent_points_elem = parent_tal_elem.find('.spentPoints')



	if (talentCopy.invested == talentCopy.maxRank) {
		parent_tal_elem.addClass('max').removeClass('unlocked').removeClass('grayed')
		spent_points_elem.addClass('max').removeClass('unlocked').removeClass('grayed')
	}
	if (!(talentCopy.invested == talentCopy.maxRank) && parent_tal_elem.hasClass('max')) {
		parent_tal_elem.removeClass('max').removeClass('grayed').addClass('unlocked')
		spent_points_elem.removeClass('max').removeClass('grayed').addClass('unlocked')

	}

	// if not an array, turn into array
	const talents_unlocked = (!Array.isArray(talentCopy.unlocks)) ? Array(talentCopy.unlocks) : talentCopy.unlocks
	if (talentCopy.unlocks) {
		talents_unlocked.forEach(function(unlocks){
			let talent_elem = $(`div.talent[name="${unlocks}"]`).first()
			if (talent_elem){

				//NOTE: ARRO_WS
				let talent_arrows = $(`div.talentcalc-arrow[data-unlocks="${unlocks}"]`)
				if (talentCopy.invested === talentCopy.maxRank) {

					talent_arrows.each(function(i, v){
						let a = $( this )
						a.removeClass('locked')
					})

					talent_elem.removeClass('locked')
					talent_elem.find('.spentPoints').removeClass('locked')

					if (!talent_elem.hasClass('grayed')) {
						talent_elem.addClass('unlocked')
						talent_elem.find('.spentPoints').addClass('unlocked')
					}


				}
				else {
					console.log("Unable to unlock ", unlocks, "...", talentCopy.invested, " points invested in", talentCopy.name)
					if (!talent_elem.hasClass('locked')){
						talent_arrows.each(function(ind, item){
							let a = $( this )
							a.addClass('locked')
						})

						talent_elem.addClass('locked').removeClass('unlocked')
						talent_elem.find('.spentPoints').addClass('locked').removeClass('unlocked')

					}
				}
			}else{
				console.log("Unable to find element with name: ", unlocks)
			}

		})
	}

	//logic for max talent points spent
	if (talentPointsSpent.grandTotal() >= 50){
		if (talentPointsSpent.grandTotal() == 51){
			lockTalents(classData, true)
		} else {
			lockTalents(classData, false)
		}
	}


	if (talentPointsSpent[tree].total()>30){
		return
	} else {
		if (talentPointsSpent[tree].total()%5==0 && talentPointsSpent[tree].total()>0) {
			const tier = talentPointsSpent[tree].total()/5
			const found = classData.trees.find(function(x) { //
				return x.name == tree
			})

			let talent_names = []
			found.data[tier].filter(function(item) {
				talent_names.push(item.name)
			})

			talent_names.forEach(function(name) {
				let ele = $(`div.talent[name="${name}"]`)
				ele.removeClass('grayed')
				if (!ele.hasClass('locked')){
					ele.addClass('unlocked')
				}

				// ele.find('.spentPoints').removeClass('locked').addClass('unlocked')
				ele.find('.spentPoints').removeClass('grayed').addClass('unlocked')

				// ARROWS
				let talent_arrows = $(`div.talentcalc-arrow[data-unlocks="${name}"]`)
				talent_arrows.removeClass('grayed')

				// $(`div.talent[name="${item}"]`).removeClass('grayed').addClass('talent-unlocked')
			})
		}
		if (talentPointsSpent[tree].total()%5==4){
			const tier = Math.round(talentPointsSpent[tree].total()/5)
			const found = classData.trees.find(function(x) { //
				return x.name == tree
			})

			let talent_names = []
			found.data[tier].filter(function(item) {
				talent_names.push(item.name)
			})

			talent_names.forEach(function(name) {

				let ele = $(`div.talent[name="${name}"]`)
				ele.removeClass('unlocked').addClass('grayed')
				ele.find('.spentPoints').removeClass('unlocked').addClass('grayed')
				let talent_arrows = $(`div.talentcalc-arrow[data-unlocks="${name}"]`)
				talent_arrows.each(function(i, v){
					let a = $( this )
					a.addClass('grayed')
				})
			})
		}
	}
}

//
// function canSpendPoints(talent, e, tree, classData) {
//
// 	const unlocks = (!Array.isArray(talent.unlocks)) ? Array(talent.unlocks) : talent.unlocks
// 	const targetTalent = $(e.target)
// 	const locked = targetTalent.hasClass('locked')
// 	const requiredTalentPoints = talent.requiredTalentPoints
// 	const tier = (requiredTalentPoints/5)
// 	const maxRank = talent.maxRank
//
// 	if (talentPointsSpent[tree].total() < requiredTalentPoints) {
// 		console.log(`you must have ${requiredTalentPoints} points in this ${tree} tree to spec here`)
// 		return
// 	}
// 	if (locked) {
// 		console.log("that boy lockeD")
// 		return
// 	}
//
// 	// normal click
// 	if (e.which === 1) {
// 		if (talentPointsSpent.grandTotal() > 50){
// 			console.log('Maximum talent points spent')
// 			return
// 		}
// 		if (talent.invested < maxRank) {
// 			talentPointsSpent[tree].vals[tier]++
// 			talent.invested++
// 			targetTalent.children(0).first().text(talent.invested)
//
// 			tryToUnlock(talent, tree, classData)
// 			return
// 		}
// 	}
//
// 	// right click
// 	else if (e.which === 3) {
// 		let can_unspec = false
// 		let tier_unspeccing = tier+1
// 		if (tier_unspeccing == talentPointsSpent[tree].highest_tier()){
// 			can_unspec = true
// 		}
//
// 		if (tier_unspeccing < talentPointsSpent[tree].highest_tier()){
// 			can_unspec = checkIfAbleToUnspec(tree, tier_unspeccing)
// 		}
//
// 		if (talent.invested == maxRank && unlocks) {
// 			// NOTE: will be unique once element names are unique, won't need .first()
// 			let test_arr = []
// 			unlocks.forEach(function(item){
// 				const child_talent = $(`div.talent[name="${item}"]`)
// 				let n = child_talent.find('.spentPoints').text()
// 				if (can_unspec && n > 0) {
// 					console.log('you must unspec ' + item)
// 					test_arr.push(false)
// 					return
// 				}
// 				else {
// 					test_arr.push(true)
// 				}
// 			})
// 			if (test_arr.some(function(item) {return item == false})) {
// 				return
// 		  	}
// 		}
//
//
// 		if (talent.invested > 0 && can_unspec) {
// 			talentPointsSpent[tree].vals[tier]--
// 			talent.invested--
// 			targetTalent.children(0).first().text(talent.invested)
// 			tryToUnlock(talent, tree, classData)
// 			return
// 		}
// 	}
// }



function pointSpender(talent, e, tree, classData) {

	const unlocks = (!Array.isArray(talent.unlocks)) ? Array(talent.unlocks) : talent.unlocks
	const tier = (talent.requiredTalentPoints/5)
	const targetTalent = $(e.target)

	// const locked = targetTalent.hasClass('locked')
	// const requiredTalentPoints = talent.requiredTalentPoints
	// const maxRank = talent.maxRank


	if (talentPointsSpent[tree].total() < talent.requiredTalentPoints) {
		console.log(`you must have ${talent.requiredTalentPoints} points in this ${tree} tree to spec here`)
		return
	}
	if (targetTalent.hasClass('locked')) {
		console.log("that boy lockeD")
		return
	}

	// normal click
	if (e.which === 1) {
		if (talentPointsSpent.grandTotal() > 50){
			if (!talentPointsSpent.locked) {
				lockOrUnlockSpec()
			}
			return
		}
		if (talent.invested < talent.maxRank) {
			talentPointsSpent[tree].vals[tier]++
			talent.invested++

			targetTalent.children(0).first().text(talent.invested)

			let tierU = Math.floor(talentPointsSpent[tree].total()/5) //highest tier unlocked
			let talentObjs = []

			// get talents in highest unlocked tier

			const found = classData.trees.find(function(x) { //
				return x.name == tree
			})

			console.log(found)
			console.log(found.data[tierU])
			console.log(tierU)

			found.data[tierU].filter(function(t) {
				if (t) {
					talentObjs.push(t)
				}
			})



			talentObjs.forEach(function(tal){
				let t = $(`div.talent[name="${tal.name}"]`)
				t.removeClass('grayed') //NOTE: ungray talent element
				t.find(".spentPoints").first().removeClass('grayed') //NOTE: ungray spentPoints element


				if (tal.locked) { // indicates it has arrows
					let arrows = $(`div.talentcalc-arrow[data-unlocks="${tal.name}"]`)
					arrows.each(function() {
						$( this ).removeClass('grayed') //NOTE: ungray the arrows
					})
				}
			})

			if (talent.invested == talent.maxRank) {
				let t = $(`div.talent[name="${talent.name}"]`)
				t.addClass('max')
				t.find(".spentPoints").first().addClass('max')

				// if talent is a pre req, unlock each parent elem
				if (talent.unlocks) {
					unlocks.forEach(function(n) {
						let par = $(`div.talent[name="${n}"]`).removeClass('locked') //NOTE: unlocks talent element
						par.find(".spentPoints").first().removeClass('locked') //NOTE: unlocks points spent element

						let arrows = $(`div.talentcalc-arrow[data-unlocks="${n}"]`)
						arrows.each(function(){
							$( this ).removeClass('locked') //NOTE: unlock arrows
						})
					})
				}
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

			// begin locking/graying syntax
			talElem = $(`div.talent[name="${talent.name}"]`)
			talElem.removeClass('max') //NOTE: remove max class from talent element
			talElem.find('.spentPoints').removeClass('max') // NOTE: remove max class from pointsSpent element
			if (talent.unlocks) {
				unlocks.forEach(function(n) {
					let par = $(`div.talent[name="${n}"]`).addClass('locked') //NOTE: locks talent element
					par.find(".spentPoints").first().addClass('locked') //NOTE: locks points spent element
					let arrows = $(`div.talentcalc-arrow[data-unlocks="${n}"]`)
					arrows.each(function(){
						$( this ).addClass('locked') //NOTE: locks arrow elements
					})
				})
			}

			let tierL = Math.ceil(talentPointsSpent[tree].total()/5)+1
			console.log('tree: ', tree)

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


			// found.data[tierL].filter(function(t) {
			// 	if (t) {
			// 		talentObjs.push(t)
			// 	}
			// })



			talentObjs.forEach(function(tal, ind) {
				if (tal) {
					let t = $(`div.talent[name="${tal.name}"]`)
					t.addClass('grayed') //NOTE: grayed added to talent elem
					t.find('.spentPoints').addClass('grayed') //NOTE: grayed added to pointsSpent elem
					if (tal.locked) {
						let arrows = $(`div.talentcalc-arrow[data-unlocks="${tal.name}"]`)
						arrows.each(function(){
							$( this ).addClass('grayed') //NOTE: add gray to arrows
						})
					}
				}
			})


			return
		}
	}
}



// function lockOrUnlockTalents(talent, tree, classData) {
//
// 	// unlocking logic, z is like a switch
// 	if (z == 1){
//
// 		let tier = Math.floor(talentPointsSpent/5)
// 		let talentNames = []
//
// 		// get names of all talents in highest unlocked tier
// 		classData[tree].data[tier].forEach(function(t){
// 			if (t) {
// 				talentNames.push(t.name)
// 			}
// 		})
//
// 		talentNames.forEach(function(name){
// 			let t = $(`div.talent[name="${name}"]`)
// 			t.removeClass('grayed')
// 			t.find(".spentPoints").first().removeClass('grayed')
//
//
// 			let talentObj = ''// find the talent within classData using name
// 			if (talentObj.locked) { // indicates it has arrows
// 				let talentArrows = $(`div.talentcalc-arrow[data-unlocks="${talentObj.name}"]`)
// 				talentArrows.each(function() {
// 					$( this ).removeClass('grayed')
// 				})
// 			}
// 		})
// 	}
//
//
//
// } //end lockOrUnlockTalents

function lockorUnlockSpec() {
	//
}


function urlBuilder(classData) {
	let myURL = ''
	var newURL = ''
	classData.trees.forEach(function(item, ind){
		let testStr = ''
		item.data.forEach(function(dataArr){
			dataArr.forEach(function(x) {
				if (x) {
					testStr = testStr.concat('', x.invested)
				}
			})
		})
		testStr = (testStr.length%2==0) ? testStr.concat('', '0') : testStr
		testStr = (ind<2) ? testStr.concat('', '7') : testStr.concat('', '8')
		myURL = myURL.concat('', testStr)
	})

	let newStrArr = myURL.split('7')
	newStrArr.forEach(function(str,indc){
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
	history.replaceState({}, null, url)

	// let expanded = urlExpander()

	// console.log("before: ", myURL)
	// console.log("after: ", expanded)

	// if (expanded == myURL) {
	// 	console.log('same hash')
	// }
}

function urlExpander() {
	let hash = window.location.hash
	let newStr = window.location.hash.slice(location.hash.indexOf('#')+1, location.hash.length)

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

function lockTalents(classData, lock=false) {
	//logic for max talent points spent
	if (lock){
		console.log('Maximum talent points spent, locking all')
		// lock all talents without points spent in them
		let talent_containers = $("div.talent")
		let filtered = talent_containers.filter(".unlocked").not(".max")
		filtered.each(function(ind, item){
			let a = $( this ).find(".spentPoints").first()
			if (a.text() >= 1) {
			}
			else{
				a.removeClass("unlocked").addClass("locked")
				$( this ).removeClass('unlocked').addClass('grayed')

				let n = $( this ).attr("name")

				// make unused arrows gray
				let talent_arrows = $(`div.talentcalc-arrow[data-unlocks="${n}"]`)
				if (talent_arrows) {
					talent_arrows.each(function(i, v){
						let b = $( this )
						b.addClass('grayed')
					})
				}
			}
		})
		return
	} else {
		// unlocking portion
		let tree_names = []
		classData.trees.forEach(function(item) {
			tree_names.push(item.name)
		})
		tree_names.forEach(function(name) {

			let tiers = [...Array(Math.min(Math.floor((talentPointsSpent[name].total()/5)+1), 7)).keys()]
			tiers.forEach(function(tier) {
				let talent_names = []
				let found = classData.trees.find(function(x) {
					return x.name == name
				})

				found.data[tier].filter(function(item) {
					talent_names.push(item.name)
				})

				talent_names.forEach(function(n) {
					let ele = $(`div.talent[name="${n}"]`)
					if (!ele.hasClass('locked')) {
						ele.removeClass('grayed').addClass('unlocked')

						ele.find('.spentPoints').removeClass('locked').addClass('unlocked')

					}

					let talent_arrows = $(`div.talentcalc-arrow[data-unlocks="${n}"]`)

					talent_arrows.each(function(i, v){
						let a = $( this )
						a.removeClass('grayed')
					})
				})
			})
		})
	}


}

function preBuiltSpec(classData, hash='', unlock=false) {

	let hashArr = (hash) ? hash.slice(0,hash.indexOf('8')).split('7') : ''
	classData.trees.forEach(function(item, i){
		var arr = (hashArr) ? hashArr[i].split(''): ''
		let treeName = item.name
		item.data.forEach(function(dataArr, i2){
			dataArr.forEach(function(t, i3) {
				if (t) {
					if (hashArr){
						t.invested = parseInt(arr.shift())
						talentPointsSpent[treeName].vals[parseInt(i2)] += parseInt(t.invested)
					}
					if (unlock){
						tryToUnlock(t, treeName, classData)
					}

				}
			})
		})

	})

	// console.log(hash)
	// console.log(hashArr)
	// console.log(classData)
	//

	// lockTalents(classData, false)



	// assume hashes given are legit, will implement check for them later
	// populate classData and talentPointsSpent
	// run lockTalents(classData, lock=true)
}

function updatePointsElems(classData) {
	classData.trees.forEach(function(item, i){
		let treeName = item.name
		let footer = $(".talentTable").find(".talentFooter").children()
		console.log(footer[i])
		footer[i].innerText = talentPointsSpent[treeName].total()
		// first().text(talentPointsSpent[treeName].total())
		// console.log(footer[i])
		// footer[i].text(talentPointsSpent[treeName].total())
		// console.log(footer[i].children().first())

		// footer[i].text(talentPointsSpent[treeName].total())

		item.data.forEach(function(dataArr, i2){
			dataArr.forEach(function(t, i3) {
				if (t) {
						if (t.invested) {
							console.log("t.name: ", t.name)
							var targetTalent = $(`div.talent[name="${t.name}"]`).first()
							targetTalent.removeClass('grayed')
							targetTalent.find('.spentPoints').removeClass('grayed').text(t.invested)
							// targetTalent.find('.spentPoints').text(t.invested)
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
