
const talentPointsSpent = {}
const re = /a{2,}|b{2,}|c{2,}|d{2,}|e{2,}/g //only looks for repeats of a, b, or c atm
const re2 = /([a-z])\d/g

$(document).ready(initializeApp)

function initializeApp() {
	applyClickHandlers();
	// if (window.location.hash) {
	// 	console.log('test')
	// 	$('.class-filter').trigger("click")
	// }

}

function applyClickHandlers() {
	classSelectionHandler()
	talentHandler()
}

const translationTable = {
	00:'a', 01:'b', 02:'c', 03:'d', 04:'e', 05:'f',
	10:'g', 11:'h', 12:'i', 13:'j', 14:'k', 15:'l',
	20:'m', 21:'n', 22:'o', 23:'p', 24:'q', 25:'r',
	30:'s', 31:'t', 32:'u', 33:'v', 34:'w', 35:'x',
	40:'y', 41:'z',42:'A',43:'B',44:'C',45:'D',
	50:'E',51:'F',52:'G',53:'H',54:'I',55:'J', 7:'Y', 8:'Z'
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
// function decimalToHexString(number)
// {
//   if (number < 0)
//   {
//     number = 0xFFFFFFFF + number + 1;
//   }
//
//   return ((number) >>> 0).toString(16).toUpperCase();
// }
//
// function binaryToHex(bin) {
// 	var hexa = parseInt(number, 2).toString(16);
// }
//
// function hex2bin(hex){
//     return (parseInt(hex, 16).toString(2)).padStart(8, '0');
// }


function classSelectionHandler() {

	$('.class-filter').on({
		click: e => {

			if ($('.class-filter.selected') == $(e.target)) {
				return
			}

			$('.class-filter').removeClass('selected')
			const clickedFilter = $(e.target)
			clickedFilter.addClass('selected')

			const clickedID = clickedFilter[0].id
			// console.log(window.location.protocol)
			// console.log((window.location.protocol=='file:'))

			// console.log(window.location)
			// let original_url = (window.location.protocol=='file:') ? "file:///Users/ktuten/Documents/wow_classic_projects/talent.html" : window.location.origin+"/enchanter_tool/talent.html"
			// let new_url = original_url+'#'+clickedID

			// if (window.location.hash) {
			// 	var clickedID = window.location.hash.slice(1, window.location.hash.length)
			// 	console.log('1', clickedID)
			//
			// } else {
			// 	var clickedID = clickedFilter[0].id
			// 	console.log('2', clickedID)
			// }

			let myURL = window.location.origin+window.location.pathname+"#"+clickedID


			window.history.pushState(`Ony Buff: ${clickedID}`, clickedID, myURL)
			//

			const selectedClass = talentData.classes.find(function(a) {
				return a.name == clickedID;
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

			talentPointsSpent.grand_total = function(){
				return (this[tree_names[0]].total()+this[tree_names[1]].total()+this[tree_names[2]].total())
			}

			const tableData = tableFormat[clickedID]
			const combinedTalents = combineTalents(selectedClass)
			const finalData = mapTalentsToTableData(tableData.trees, combinedTalents)

			populateTables({trees: finalData}, talentPointsSpent)
			// console.log("finalData: ", {trees: finalData})

		},
	})
}

function urlBuilder(classData) {

	let myURL = ''
	var newURL = ''
	console.log("classData: ", classData)
	classData.trees.forEach(function(item, ind){
		item.data.forEach(function(dataArr){
			dataArr.forEach(function(x) {
				if (x) {
					myURL = myURL.concat('', x.invested)
				}
			})
		})
		myURL = (ind<2) ? myURL.concat('', '7') : myURL.concat('', '8')
	})
	let myURLarr = myURL.split('7')
	myURLarr.forEach(function(str){
		if (str.length%2==1){
			str = str.concat('', '7')
			console.log(str)
		}
		else {
			str = str.concat('', '07')
		}
		for (var i = 0;i<str.length;i=i+2){
			let subStr = str.substring(i,i+2)
			newURL = newURL.concat('', translationTable[parseInt(subStr)])
		}
	})
	let found = newURL.match(re)
	console.log('preTranslation: ', myURL)
	console.log('post: ', newURL)
	for (var y=0;y<found.length;y++){
		newURL = newURL.replace(found[y], found[y][0]+(found[y].length).toString())
		// newURL = shortened
	}

	let shortestURL = newURL.slice(0, newURL.indexOf('Z'))

	console.log('shortened: ',shortestURL)
	console.log(window.location.href+'?v='+shortestURL)

	let url = window.location.href+"#rogue"
	let hash = "#rogue"+"?"+shortestURL
	const finalURL = new URL(hash, url);
	history.replaceState({}, null, finalURL)
	urlExpander()
}

function urlExpander() {
	let hash = window.location.hash
	let newStr = window.location.hash.slice(location.hash.indexOf('?')+1, location.hash.length)
	console.log(newStr)

	let matchArr = newStr.match(re2)
	for (var y=0;y<matchArr.length;y++){
		let replStr = Array(parseInt(matchArr[y][1])).fill(matchArr[y][0]).join('')
		console.log(replStr)
		newStr = newStr.replace(matchArr[y], replStr)
		console.log(newStr)

	}
	// console.log(newStr)
	let newStrArr = newStr.split('Y')
	let arr
	// console.log(newStrArr)
	newStrArr.forEach(function(item,ind){
		
		arr = item.split('')
		arr.forEach(function(v,i){
			arr[i] = arr[i].replace(v, reversedTable[v])
		})
		newStrArr[ind] = arr.join('')
	})
	console.log(newStrArr)
	newStr = newStrArr.join('')
	console.log('expanded: ', newStr)

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

			canSpendPoints(talent, e, tree, classData)

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

function tryToUnlock(talent, tree, classData) {
	const talentCopy = Object.assign({}, talent)
	let parent_tal_elem = $(`div.talent[name="${talentCopy.name}"]`).first()
	let spent_points_elem = parent_tal_elem.find('.spentPoints')

	if (talentCopy.invested === talentCopy.maxRank) {
		parent_tal_elem.addClass('max').removeClass('unlocked')
		spent_points_elem.addClass('max').removeClass('unlocked')
	}
	if (!(talentCopy.invested === talentCopy.maxRank) && parent_tal_elem.hasClass('max')) {
		parent_tal_elem.removeClass('max').addClass('unlocked')
		spent_points_elem.removeClass('max').addClass('unlocked')

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

					// talent_arrow.removeClass('locked')
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
	if (talentPointsSpent.grand_total() >= 50){
		if (talentPointsSpent.grand_total() == 51) {
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

					// make arrows gray
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
		}
		else {
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
						//NOTE: ARRO_WS
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

	if (talentPointsSpent[tree].total()>30){
		return
	} else {
		if (talentPointsSpent[tree].total()%5==0) {
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
				ele.find('.spentPoints').removeClass('unlocked').addClass('grayed') //NOTE HERE
				let talent_arrows = $(`div.talentcalc-arrow[data-unlocks="${name}"]`)
				talent_arrows.each(function(i, v){
					let a = $( this )
					a.addClass('grayed')
				})
			})
		}
	}
}


function canSpendPoints(talent, e, tree, classData) {

	const unlocks = (!Array.isArray(talent.unlocks)) ? Array(talent.unlocks) : talent.unlocks
	const targetTalent = $(e.target)
	const locked = targetTalent.hasClass('locked')
	const requiredTalentPoints = talent.requiredTalentPoints
	const tier = (requiredTalentPoints/5)
	const maxRank = talent.maxRank

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
		if (talentPointsSpent.grand_total() > 50){
			console.log('Maximum talent points spent')
			return
		}
		if (talent.invested < maxRank) {
			talentPointsSpent[tree].vals[tier]++
			talent.invested++
			targetTalent.children(0).first().text(talent.invested)

			tryToUnlock(talent, tree, classData)
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

		if (talent.invested == maxRank && unlocks) {
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
			tryToUnlock(talent, tree, classData)
			return
		}
	}
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
