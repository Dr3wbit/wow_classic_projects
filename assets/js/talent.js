
const talentPointsSpent = {}

$(document).ready(initializeApp)

function initializeApp() {
	applyClickHandlers();
}

function applyClickHandlers() {
	classSelectionHandler()
	talentHandler()
}

function populateTables(classData) {
	//Retrieve the template data from the HTML .
	let template = $('#handlebars-demo2').html();
	//Compile the template data into a function
	let templateScript = Handlebars.compile(template);
	let talent_html = templateScript(classData);
	$('#talentCalc').html(talent_html);
	talentHandler(classData)
}

//~~~~~~~~~~~////////KEEP THIS////////~~~~~~~~~~//

// function createTalents(data) {
//     if(data){                       //only warlock has data
//        const talentList = combineTalents(data)
//        let talentsToAppend = []
//     for (let talentIterator = 0; talentIterator < talentList.length; talentIterator++) {
//         let data = talentList[0]
//         talent = $('<div/>', {
//             value: 0,
//             class: 'talent',
//             name: data.name,
//             description: data.description,
//             maxRank: data.maxRank,
//             requiredTalentPoints: data.requiredTalentPoints,
//             unlocks: data.unlocks,
//             locked: data.locked
//         })
//         if (data.locked){
//             talent.addClass('locked')
//         }
//         talentsToAppend.push(talent)
//     }
//     return talentsToAppend
//     }
// }

function classSelectionHandler() {
	$('.class-filter').on({
		click: e => {
			$('.class-filter').removeClass('selected')
			const clickedFilter = $(e.target)
			clickedFilter.addClass('selected')
			const clickedID = clickedFilter[0].id

			const selectedClass = talentData.classes.find(function(a) {
				return a.name == clickedID;
			})


			selectedClass.tree_talents.forEach(function(item, index) {
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

			const tableData = tableFormat[clickedID]
			const combinedTalents = combineTalents(selectedClass)
			const finalData = mapTalentsToTableData(tableData.trees, combinedTalents)

			populateTables({trees: finalData}, talentPointsSpent)
			// console.log("finalData: ", {trees: finalData})

		},
	})
}

// function mapTalentsToTableData(tableData, talents) {
// 	// console.log("mapTalentsToTableData, tableData", tableData)
// 	let spellIterator = 0
// 	for (let treeIterator = 0; treeIterator < tableData.length; treeIterator++) {
// 		for (let rowIterator = 0; rowIterator < tableData[treeIterator].data.length; rowIterator++) {
// 			for (let talentIterator = 0; talentIterator < tableData[treeIterator].data[rowIterator].length; talentIterator++) {
// 				const slot = tableData[treeIterator].data[rowIterator][talentIterator]
// 				if (slot != 0) {
// 					tableData[treeIterator].data[rowIterator].splice(talentIterator, 1, talents[spellIterator])
// 					spellIterator++
// 				}
// 			}
// 		}
// 	}
// 	// console.log("from function mapTalentsToTableData, tableData: ", tableData)
// 	return tableData
// }

function mapTalentsToTableData(trees, tal_arr) {
	trees.forEach(function(tree, index) {
		tree.data.forEach(function(data_arr, j) {
            let reqTalentPoints = j*5
			data_arr.forEach(function(v, k) {
                // trees[index].data[j][k] = (v >= 1) ? tal_arr.pop() : trees[index].data[j][k]
                if (v >= 1){ //
                    trees[index].data[j][k] = tal_arr.pop()
					trees[index].data[j][k].invested = 0
                    trees[index].data[j][k].requiredTalentPoints = reqTalentPoints
					trees[index].data[j][k].j = j
					trees[index].data[j][k].k = k

                }
			})
		})
	})
    return trees
}

// function combineTalents(data) {
// 	if (data) {
// 		data = data.tree_talents
// 		let combinedTalents = []
// 		for (let treeIterator = 0; treeIterator < data.length; treeIterator++) {
// 			for (let talentIterator = 0; talentIterator < data[treeIterator].talents.length; talentIterator++)
// 				combinedTalents.push(data[treeIterator].talents[talentIterator])
// 		}
// 		return combinedTalents
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
		//for talent tooltips on hover?
		contextmenu: e => {
			e.preventDefault()
		},
		mouseenter: e => {
			updateTooltip(classData, e)
		},

		mouseleave: e => {
			const targetTalent = $(e.target)
			console.log(e)
			targetTalent.children($('.talent-tooltip').remove())
		},

		mousedown: e => {
			const targetTalent = $(e.target)
			targetTalent.children($('.talent-tooltip').remove())
			const unlocks = targetTalent.attr('data-unlocks')

			//gets talent tree name (kinda ghetto)
			const tree = targetTalent.closest('div.treeTitle.col').text().split('\n')[0]
			const name = targetTalent.attr('name')

			const found = classData.trees.find(function(x) { //
				return x.name == tree
			})
			const j = targetTalent.attr('data-j')
			const k = targetTalent.attr('data-k')

			const talent = found.data[j][k]

			talent.invested = targetTalent.children(0).text() // should insure points don't carry over when switching between classes

			const maxRank = talent.maxRank

			canSpendPoints(talent, e, tree)
			checkForUnlock(unlocks, talent)

			targetTalent.children(0).text(talent.invested)
			targetTalent.closest(".talentTable").find(".talentFooter").children(0).text(talentPointsSpent[tree].total())
			console.log(targetTalent.attr('name') + " : " + talent.invested)
			updateTooltip(classData, e)
		}

	})
}

function updateTooltip(classData, e){
	const targetTalent = $(e.target)
			const name = targetTalent.attr('name')
            const tree = targetTalent.closest('div.treeTitle.col').text().split('\n')[0]

            const found = classData.trees.find(function(x) { //
                return x.name == tree
            })
            const j = targetTalent.attr('data-j')
            const k = targetTalent.attr('data-k')

            const talent = found.data[j][k]
            const testobj = Object.assign({}, talent)

            let description
            let next_rank = true

            if (talent.invested == 0)
            {
                testobj.invested++
                description = testobj.description()
            }

            if (talent.maxRank == 1)
            {
                next_rank = false
                testobj.invested = testobj.maxRank
                description = testobj.description()
            }

            if (talent.invested == talent.maxRank) {
                next_rank = false
                description = testobj.description()
            }

            if (talent.maxRank > 1 && talent.invested > 0 && next_rank) {
                testobj.invested++
                description = talent.description() + "\nNext Rank:\n" + testobj.description()
            }

			targetTalent.append($('<div/>', {
				class: 'talent-tooltip',
				text: description
			}))
            console.log("description: ", description)

			// console.log("mouse entered, talent.name: ", talent.name)
			// tooltip should display:
			// Talent Name
			// Rank x/maxRank
			// required talent prereqs if not met (red font)
			// required talent points spent if not enough spent in tree (red font)
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

function checkForUnlock(unlocks, talent) {
	const points = talent.invested
	const maxRank = talent.maxRank

	if (unlocks) {
		const talentReference = unlocks

		// NOTE: will be unique once element names are unique, won't need .first()
		let talent_elem = $(`div.talent[name='${talentReference}']`).first()
		if (points === maxRank) {

			talent_elem.removeClass('locked')
			console.log(talentReference + " is Unlocked.")
		} else {

			talent_elem.addClass('locked')
			console.log(talentReference + " is locked.")
		}
	}
}

function canSpendPoints(talent, e, tree) {

	const locked = $(e.target).hasClass('locked')

	const requiredTalentPoints = talent.requiredTalentPoints
	const tier = (requiredTalentPoints/5)
	const maxRank = talent.maxRank
	const unlocks = talent.unlocks

	if (talentPointsSpent[tree].total() < requiredTalentPoints) {
		console.log(`you must have ${requiredTalentPoints} points in this ${tree} tree to spec here`)
		return
	}
	if (locked) {
		console.log("that boy lockeD")
		return
	}

	// normal click
	if (e.which === 1) {
		if (talent.invested < maxRank) {
			talentPointsSpent[tree].vals[tier]++
			talent.invested++
			return
		}
	}

	// right click
	else if (e.which === 3) {
		let can_unspec = false
		let tier_unspeccing = tier+1
		if (tier_unspeccing == talentPointsSpent[tree].highest_tier()){
			console.log("tier_unspeccing == highest_tier_used")
			can_unspec = true
		}

		if (tier_unspeccing < talentPointsSpent[tree].highest_tier()){
			console.log("tier_unspeccing < highest_tier_used")
			can_unspec = checkIfAbleToUnspec(tree, tier_unspeccing)
		}

		if (talent.invested == maxRank && unlocks) {
			// NOTE: will be unique once element names are unique, won't need .first()
			const child_talent = $(`div.talent[name='${unlocks}']`).first()
			let n = child_talent.find('.spentPoints').text()

			if (can_unspec && n > 0) {
				console.log('you must unspec ' + unlocks)
				return
			}
		}

		if (talent.invested > 0 && can_unspec) {
			talentPointsSpent[tree].vals[tier]--
			talent.invested--
			return
		}
	}
}
