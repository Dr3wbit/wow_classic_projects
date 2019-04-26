let talentPointsSpent = {}

$(document).ready(initializeApp)

function initializeApp() {
	applyClickHandlers();
}

function applyClickHandlers() {
	classSelectionHandler()
	talentClickedHandler()
}

function populateTables(classData) {
	//Retrieve the template data from the HTML .
	let template = $('#handlebars-demo2').html();
	//Compile the template data into a function
	let templateScript = Handlebars.compile(template);

	let talent_html = templateScript(classData);

	$('#talentCalc').html(talent_html);
	talentClickedHandler()
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
            // console.log("tableData: ", tableData)
			const combinedTalents = combineTalents(selectedClass)
            // console.log("combinedTalents: ", combinedTalents)
			const finalData = mapTalentsToTableData(tableData.trees, combinedTalents)
            console.log("finalData: ", finalData)
			const test = name_sanitizer(combinedTalents)

			populateTables({
				trees: finalData
			})
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

// same as mapTalentsToTableData
function mapTalentsToTableData(trees, tal_arr) {
	trees.forEach(function(item, index) {
		item.data.forEach(function(val, j) {
            let reqTalentPoints = j*5
			val.forEach(function(v, k) {
                if (v >= 1){
                    trees[index].data[j][k] = tal_arr.pop()
                    trees[index].data[j][k].requiredTalentPoints = reqTalentPoints
                }
                // trees[index].data[j][k] = (v >= 1) ? tal_arr.pop() : trees[index].data[j][k]

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

//same as combineTalents
function combineTalents(data) {
    // console.log("hello_test, data: ", data)
	if (data) {
        let talent_arr = []
		data = data.tree_talents
    	data.forEach(function(item, index) {
    		talent_arr.push(item.talents)
    	})
    	talent_arr = talent_arr.flat().reverse()
        return talent_arr
    }
}

// name janitor, example: Curse of Exhaustion --> curse_of_exhaustion
function name_sanitizer(arr) {
	const talent_arr = arr
	var regex = /\s/ig
	talent_arr.forEach(function(item, index) {
		item.name = item.name.toLowerCase().replace(regex, '_')
	})
	return talent_arr
}

function talentClickedHandler() {
	$(".talent").on({
		//for talent tooltips on hover?
		contextmenu: e => {
			e.preventDefault()
		},

		mousedown: e => {
			const clickedTalent = $(e.target)

			//gets talent tree name (kinda ghetto)
			const tree = clickedTalent.closest('div.treeTitle.col').text().split('\n')[0]
			const unlocks = clickedTalent.attr('data-unlocks')
			const locked = clickedTalent.hasClass('locked')
			const maxRank = clickedTalent.attr('data-maxrank')

			const requiredTalentPoints = clickedTalent.attr('data-requiredtalentpoints')
            const tier = (requiredTalentPoints/5)
			clickedTalent.attr('points', function(index, val = 0) {
				const pointsSpent = parseInt(val)

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
					if (pointsSpent < maxRank) {
                        talentPointsSpent[tree].vals[tier]++
						return pointsSpent + 1
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

					if (pointsSpent == maxRank && unlocks) {
						// NOTE: will be unique once element names are unique, won't need .first()
						const child_talent = $(`div.talent[name='${unlocks}']`).first()
						let n = child_talent.find('.spentPoints').text()

						if (can_unspec && n > 0) {
							console.log('you must unspec ' + unlocks)
							return
						}
					}
					if (pointsSpent > 0 && can_unspec) {
                        talentPointsSpent[tree].vals[tier]--
                        return pointsSpent - 1
					}
				}
			})
			const points = clickedTalent.attr('points')
			checkForUnlock(unlocks, maxRank, points)
			clickedTalent.children()[0].innerText = ((points !== undefined) ? points : 0)
			clickedTalent.closest(".talentTable").find(".talentFooter").children(0).text(talentPointsSpent[tree].total())
			console.log(clickedTalent.attr('name') + " : " + points)
		}
	})
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

function checkForUnlock(unlocks, maxRank, p) {
	let points = p || 0
	if (unlocks) {
		const talentReference = unlocks
		// NOTE: will be unique once element names are unique, won't need .first()
		let talent_elem = $(`div.talent[name='${talentReference}']`).first()
		if (points === maxRank) {
			talent_elem.attr('locked', function(index, originalValue) {
				return false
			})
			talent_elem.removeClass('locked')
			console.log(talentReference + " is Unlocked.")
		} else {
			talent_elem.attr('locked', function(index, originalValue) {
				return true
			})
			talent_elem.addClass('locked')
			console.log(talentReference + " is locked.")
		}
	}
}
