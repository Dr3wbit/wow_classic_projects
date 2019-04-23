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
	Handlebars.registerHelper('if', function(context, options) {
		if (context) {
			// console.log("context: ", context)
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	});
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
					vals: [0,0,0,0,0,0],
					total: function() {return this.vals.reduce((a,b) => a+b)},

					highest_tier: function(){
						let x = []
						this.vals.forEach(function(item,index){
							if (item>0){
								x.push(index)
							}
						})
						return Math.max(...x)
					}


				}

			})

			console.log("talentPointsSpent: ", talentPointsSpent)


			const tableData = tableFormat[clickedID]
			const combinedTalents = combineTalents(selectedClass)
			const finalData = mapTalentsToTableData(tableData.trees, combinedTalents)
			const test = name_sanitizer(combinedTalents)
			console.log("testing name janny: ", test)

			//
			// console.log("{trees: finalData} ", {
			// 	trees: finalData
			// });
			populateTables({
				trees: finalData
			})
		},
	})
}

function mapTalentsToTableData(tableData, talents) {
	// console.log("mapTalentsToTableData, tableData", tableData)
	let spellIterator = 0
	for (let treeIterator = 0; treeIterator < tableData.length; treeIterator++) {
		for (let rowIterator = 0; rowIterator < tableData[treeIterator].data.length; rowIterator++) {
			for (let talentIterator = 0; talentIterator < tableData[treeIterator].data[rowIterator].length; talentIterator++) {
				const slot = tableData[treeIterator].data[rowIterator][talentIterator]
				if (slot != 0) {
					tableData[treeIterator].data[rowIterator].splice(talentIterator, 1, talents[spellIterator])
					spellIterator++
				}
			}
		}
	}
	// console.log("from function mapTalentsToTableData, tableData: ", tableData)
	return tableData
}

function combineTalents(data) {
	if (data) {
		data = data.tree_talents
		let combinedTalents = []
		for (let treeIterator = 0; treeIterator < data.length; treeIterator++) {
			for (let talentIterator = 0; talentIterator < data[treeIterator].talents.length; talentIterator++)
				combinedTalents.push(data[treeIterator].talents[talentIterator])
		}
		return combinedTalents
	}
}

// name janny Curse of Exhaustion --> curse_of_exhaustion
function name_sanitizer(arr) {
	const talent_arr = arr
	var regex = /\s/ig
	console.log("talent_arr: ", talent_arr)
	talent_arr.forEach(function(item, index) {
		item.name = item.name.toLowerCase().replace(regex, '_')
	})
	return talent_arr
}

function talentClickedHandler() {
	$(".talent").on({
		//for talent tooltips on hover
		contextmenu: e => {
			e.preventDefault()
		},

		mousedown: e => {
			const clickedTalent = $(e.target)

			//gets talent tree name (kinda ghetto)
			const tree = clickedTalent.closest('div.treeTitle.col').text().split('\n')[0]
			const unlocks = clickedTalent.attr('data-unlocks')
			const locked = clickedTalent.attr('data-locked')
			const maxRank = clickedTalent.attr('data-maxrank')
			const prereq = clickedTalent.attr('data-prereq') || null

			// not accessible through dataset, unsure why
			// const maxRank = clickedTalent.dataset.maxrank
			const requiredTalentPoints = clickedTalent.attr('data-requiredtalentpoints')
            const tier = (requiredTalentPoints/5)
            // console.log("tier: ", tier)
			clickedTalent.attr('points', function(index, val = 0) {
				const pointsSpent = parseInt(val)


				if (talentPointsSpent[tree].total() < requiredTalentPoints) {
					console.log('you must have ' + requiredTalentPoints + ' points in this tree to spec here')
					return
				}
				if (locked === 'true') {
					return
				}

				// normal click
				if (e.which === 1) {
					if (pointsSpent < maxRank) {
						// talentPointsSpent[tree]['total']++
                        talentPointsSpent[tree].vals[tier]++
						return pointsSpent + 1
					}
				}

				// right click
				else if (e.which === 3) {

					let can_unspec

					let tier_unspeccing = (requiredTalentPoints/5)+1
					let indarr = []

					let tiers_used = talentPointsSpent[tree].vals.forEach(function(item, index) {
						if (item > 0) {
							indarr.push(index)
						}
					})


					let highest_tier_used = (Math.max(...indarr)+1)
					console.log("highest_tier_used: ", highest_tier_used)

					if (tier_unspeccing == highest_tier_used){
						console.log("tier_unspeccing == highest_tier_used")
						can_unspec = true
					}

					if (tier_unspeccing < highest_tier_used){
						let bool_arr = []
						console.log("tier_unspeccing < highest_tier_used")
						const tier_check = highest_tier_used-1
						let k = tier_check

						for (k;k>0;k--){
							let req_points = k*5
							let f = talentPointsSpent[tree].vals.slice(0, k).reduce((a,b)=>(a+b))
							let num = (f - req_points)
							if (num > 0)
							{
								bool_arr.push(true)
							}else{
								bool_arr.push(false)
							}

						}


						if ((bool_arr.slice(0,-1).every(function(item,index) {return(item == true)}) &&
						talentPointsSpent[tree].vals[0] >=5 && tier_unspeccing != 1) ||
						bool_arr.every(function(item) {return(item == true)}))
						{
							can_unspec = true
							console.log("false positive")
						}
						console.log("bool_arr: ", bool_arr)

						// do this recursively for each tier
						// if ((talentPointsSpent[tree].vals.slice(0, tier_check).reduce((a,b)=>(a+b)) - tier_check*5) > 0) {
						// 	can_unspec = true
						// }
						// else {
						// 	console.log("number: ", (tier_unspeccing*5 - talentPointsSpent[tree].vals.slice(0, tier_unspeccing).reduce((a,b)=>(a+b))))
						// }
					}



                    console.log("can_unspec: ", can_unspec)


					// if (pointsSpent == maxRank && unlocks) {
					// 	// const can_unspec = checkIfAbleToUnspec(clickedTalent, tree, tier)
					// 	if (!can_unspec) {
					// 		console.log('you must unspec ' + unlocks)
					// 		return
					// 	}
					//
					// }
					if (pointsSpent > 0) {
                        if (can_unspec){
                            // talentPointsSpent[tree]['total']--
                            talentPointsSpent[tree].vals[tier]--
                            return pointsSpent - 1
                        }

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


function checkForUnlock(unlocks, maxRank, p) {
	let points = p || 0
	if (unlocks) {
		const talentReference = unlocks //"improved_curse_of_exhaustion"
		// console.log("checkForUnlock, talentReference: ", talentReference)

		if (points === maxRank) {
			$('#' + talentReference).attr('locked', function(index, originalValue) {
				return false
			})
			$('#' + talentReference).removeClass('locked')
			// console.log(talentReference + " is Unlocked.")

		} else {
			$('#' + talentReference).attr('locked', function(index, originalValue) {
				return true
			})
			$('#' + talentReference).addClass('locked')
			// console.log(talentReference + " is locked.")
		}
	}
}

function checkIfAbleToUnspec(clickedTalent, tree, tier) {
    // let t = tier+1
    // let x = talentPointsSpent.reqs(t, tree)
    // console.log("x: ",x)
    // return x
}
	// let unlocked_talent_name = clickedTalent.attr('data-unlocks')
	// console.log('checkIfAbleToUnspec, talents_unlocked: ', unlocked_talent_name)
    //
	// let unlocked_talent_elem = $(`div.talent[name='${unlocked_talent_name}']`)
	// console.log("unlocked_talent_elem: ", unlocked_talent_elem)
	// let points = unlocked_talent_elem.attr('points') || 0
    //
	// console.log('checkIfAbleToUnspec, points: ', points)
	// // let points = $('#' + talent).attr('points')
	// if (points == '0') {
	// 	return true
	// }
    //
    //
	// const talent_tier = ((clickedTalent.attr('requiredTalentPoints') + points) / 5) + 1 // points in talent trying to unspec
	// const current_tier = Math.ceil(talentPointsSpent[tree][total] / 5) // total points divided
	// if (talent_tier < current_tier) {
	// 	return false
	// }
    //
	// if ((points + requiredTalentPoints) < talentPointsSpent[tree]['total']) &&
    //

// function checkIfAbleToUnspec (clickedTalent) {
//     let talent = clickedTalent.attr('unlocks')
//     let value = $('#' + talent).attr('value')
//     if (value !== '0'){
//         return true
//     }
// }
