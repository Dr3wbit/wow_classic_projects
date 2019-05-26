let selectedData = {}
let materialArray = []

$(document).ready(initializeApp)

function initializeApp() {
	$(".consume-form").submit(function(e) {
		e.preventDefault()

	});
	applyClickHandlers();
	$(".consume-form").on({
		'change': (e) => {
			// console.log("this: ", $( e.target ) )
			$('.consume-form').submit(getMaterials(selectedData))
		},
		blur: (e) => {
			$('.consume-form').submit(getMaterials(selectedData))
		},
		// 'keyup': (e) => {
		// 	// console.log("this: ", $( e.target ) )
		// 	$('.consume-form').submit(getMaterials(selectedData))
		// }
	})
	$("#warrior").click()
}

function stepValidator(n, step) {
	return ((step*Math.round(n/step) >= 0) ? step*Math.round(n/step) : 0)
}


function applyClickHandlers() {
	const classMarker = $('<div/>', {
		class: 'classMarker',
	})
	const classMarkerGhost = $('<div/>', {
		class: 'classMarkerGhost',
	})
	$('.class-filter').on({
		click: e => {
			$('.class-filter').removeClass('selected')
			const clickedFilter = $(e.target)
			clickedFilter.append(classMarker)
			clickedFilter.addClass('selected')
			const clickedID = clickedFilter[0].id
			const defaultData = consumes.find((a) => {
				return a.name == "all"
			})
			const classData = consumes.find((a) => {
				return a.name == clickedID;
			})
			const fullData = combineData(defaultData.data, classData.data)
			selectedData = fullData
			clearForm()
			populateConsumeBlocks({
				professions: fullData
			})

			$('.icon-container').on({
				contextmenu: e => {
					e.preventDefault()
				},

				mouseenter: (e) => {
					// $(e.currentTarget.children[1]).removeClass('tooltip-hidden')
					bigdaddytooltip(e)
				},
				mouseleave: (e) => {
					// $(e.currentTarget.children[1]).addClass('tooltip-hidden')
					$("#tooltip").hide()
					$("#tooltip").children().remove()
				},

                mousedown: (e) => {


					// e.preventDefault()


                    if (e.which === 1) {

						let input = $( e.target ).closest('.consume-block').find( $('input') ).first()
						let step = input.attr('step')
						input.val(function(i, val) {
							return ( parseInt(val) || 0 ) + parseInt(step)
						})
						$(".consume-form").trigger('change')

                    } else if (e.which === 3){

							let input = $( e.target ).closest('.consume-block').find( $('input') ).first()
							let step = input.attr('step')
							input.val(function(i, val) {
								return (parseInt(val) >= parseInt(step) ) ? parseInt(val) - parseInt(step) : 0
							})
							$(".consume-form").trigger('change')
							// console.log(typeof($(e.target).closest('.consume-block')))

                    }
               }

			})
		},
		mouseenter: e => {
			const hoveredFilter = $(e.target)
			if(hoveredFilter.hasClass('selected')){
				return
			}else{
				hoveredFilter.append(classMarkerGhost)
			}
		},
		mouseleave: e => {
			$('.classMarkerGhost').remove()
		}
	})
}



function clearForm() {
	$('.consume-form').empty()
	$('.results').empty()
}

function combineData(defaultData, classData) {
	let combinedData = []
	defaultData.map((item, index) => {
		combinedData.push({
			name: item.name,
			data: item.data.concat(classData[index].data)
		})
	})
	const cleanedData = removeEmptyCategory(combinedData)
	return cleanedData
}

function removeEmptyCategory(dataToClean) {
	let refinedData = []
	dataToClean.map((item) => {
		if (item.data.length > 0) {
			refinedData.push(item)
		}
	})
	return refinedData
}

function populateConsumeBlocks(data) {
	let template = $('#consume-block-template').html();
	let templateScript = Handlebars.compile(template);
	let consume_html = templateScript(data);
	$('#consume-form').html(consume_html);
}

function getMaterials(data) {
	let materials = []
	const formValues = $('.consume-input')
	formValues.map((item) => {
		const name = formValues[item].attributes.name.value
		const category = formValues[item].attributes.category.value
		let inp2 = formValues[item].value
		const inputValue = stepValidator(formValues[item].value, formValues[item].attributes.step.value)
		if (inputValue != formValues[item].value) {

			$(`.consume-input[name="${name}"]`).val( parseInt(inputValue) ).delay( 3000 )
			console.log('test')
		}

		materials.push(findMaterials(name, category, data, inputValue))
	})
	appendMaterials(materials)
}

function findMaterials(name, category, data, inputValue) {
	const profession = data.find((a) => {
		return a.name == category
	})
	const item = profession.data.find((a) => {
		return a.name == name
	})
	let materialsToAppend = []
	Object.keys(item.materials).map(key => {
		materialsToAppend.push({
			[key]: Math.ceil(item.materials[key] * inputValue)
		})
	});
	return {
		name: [item.name],
		materials: materialsToAppend,
		amount: inputValue
	}
}

function appendMaterials(materials) {
	$('.results').empty()

	let totalMaterialCount = []
	materials.forEach((item) => {
		let resultConsume = $('<div/>', {
			class: 'result-consume',
			text: item.name + ' : ' + item.amount,
		})


		let materialsToAppend = []
		for (let mats in item.materials) {
			key = Object.keys(item.materials[mats])
			let resultMaterials = $('<div/>', {
				class: 'total-materials',
				text: key.toString().replace(/_/g, " ") + ": " + Object.values(item.materials[mats])
			})
			if (Object.values(item.materials[mats]) > 0) {
				materialsToAppend.push(resultMaterials)
				totalMaterialCount.push(item.materials[mats])
			}
		}
		if (materialsToAppend.length > 0) {
			resultConsume.append(materialsToAppend)
			$('.results').append(resultConsume)
		}
	})
	calculateTotals(totalMaterialCount)
}

function calculateTotals(materialTotals) {
	let materialsTotalsToAppend = []
	materialTotals.forEach((material) => {
		let key = Object.keys(material)
		let value = Object.values(material)
		for (let i = 0; i < value; i++) {
			materialsTotalsToAppend.push(key)
		}
	})
	let materialsToAppend = []
	let counts = {}
	materialsTotalsToAppend.forEach(function(x) {
		counts[x] = (counts[x] || 0) + 1;
	});
	let material = Object.keys(counts)
	let totalTitle = $('<div/>', {
		class: 'totalTitle',
		text: "Totals"
	})
	for (let i = 0; i < material.length; i++) {
		let totalMaterialCount = $('<div/>', {
			class: 'total-materials',
			text: material[i].replace(/_/g, " ") + ": " + counts[material[i]]
		})
		materialsToAppend.push(totalMaterialCount)
		totalTitle.append(totalMaterialCount)
	}
	$('.results').append(totalTitle)
}

function titleCase(s){
    const spaceRE = /\_/g
    let a = s.replace(spaceRE, ' ')
    let strArr = a.split(' ')
    strArr.forEach(function(word, i) {
        if (word != ('of' || 'the') && typeof(word)=='string'){
            strArr[i] = word.charAt(0).toUpperCase() + word.slice(1)
        }
    })
    return strArr.join(' ')

}

function bigdaddytooltip(e) {
	const targetElement = $(e.target)
	const name = targetElement.closest($('.consume-block')).attr('name')
	let properName = ''

	if (name.startsWith('dirg')) {
		properName = "Dirge’s Kickin’ Chimaerok Chops"
	} else if(name == 'roids') {
		properName = "R.O.I.D.S."
	} else {
		properName = titleCase(name)
	}

	const thisConsume = allConsumes[name]

	const tooltipContainer = $("#tooltip")
	const rarity = thisConsume.rarity

	const BoP = (thisConsume.bop) ? $('<div/>', {
		class: 'bop',
		text: "Binds when picked up",
	}) : null

	const unique = (thisConsume.unique) ? $('<div/>', {
		class: 'unique',
		text: "Unique",
	}) : null

	let requirementText = ''
	if (name == 'goblin_rocket_boots') {
		requirementText = "Binds when equipped\nFeet\t\t\t\t\t\t\t\t\t\t    Cloth\n41 Armor\nDurability 35 / 35"
	} else {
		requirementText = (thisConsume.req) ? ((thisConsume.req.toString().startsWith('engi') || thisConsume.req.toString().startsWith('first')) ? titleCase(thisConsume.req.replace(/([a-zA-Z\_]+)(\d+)/, "$1 ($2)")) : `Requires Level ${thisConsume.req}`) : false
	}
	// requirementText = (thisConsume.req.startsWith('engineering')) ? thisConsume.req.replace('engineering_', 'Engineering (')+')' : `Requires Level ${thisConsume.req}`
	const requirements = (thisConsume.req || thisConsume.stats) ? $('<div/>', {
		class: 'requiredLevel',
		text: requirementText,
	}) : null

	const use = (thisConsume.use) ? $('<div/>', {
		class: 'use',
		text: `Use: ${thisConsume.use}`,
	}) : null

	const description = (thisConsume.description) ? $('<div/>', {
		class: 'description',
		text: `"${thisConsume.description}"`,
	}) : null



	tooltipContainer.append($('<div/>', {
		class: 'tooltip-container',
		}).append($('<div/>', {
		class: `title ${rarity}`,
		text: properName,
		})).append(BoP).append(unique).append(requirements).append(use).append(description)
	)

	let xy = getTooltipPosition(e, tooltipContainer)
	let left = xy.x
	let top = xy.y


	tooltipContainer.attr("style", `top: ${top}px; left: ${left}px; visiblity: visible;`)
}

function getTooltipPosition(e, tooltip) {

	let width = tooltip.width()
	let height = tooltip.height()

	this.coords = {}

	let xCoeff = ($(e.target).offset().left/window.innerWidth)*100
	let distanceFromTop = $(e.target).offset().top - $(window).scrollTop()
	let yCoeff = (distanceFromTop/window.innerHeight)*100
	
	console.log('yCoeff: ', yCoeff)



	let left = 0

	let top = 0

	if (xCoeff > 50) {
		left = $(e.target).offset().left - 25 - width
	} else {
		left = $(e.target).offset().left + 45

	}
	if (yCoeff < 30) {
		top = $(e.target).offset().top + height/2 - 10

	}
	else if (yCoeff >= 30 && yCoeff < 75) {
		// sets tooltip vertically centered with talent
		let a = (height - 40)/2
		top = $(e.target).offset().top - (a+20)
	} else {
		let a = $(e.target).offset().top + 30
		top = a - height
	}

	this.coords.x = left
	this.coords.y = top

	return this.coords

	//old

}

// }
// // NEW !
// function updateTooltip(e) {
// 	const targetTalent = $(e.target)
// 	const name = targetTalent.attr('name')
// 	const tree = targetTalent.closest('div.talentTable')[0].id
//
// 	const found = classData.trees.find(function (x) {
// 		return x.name == tree
// 	})
//
// 	const j = targetTalent.attr('data-j')
// 	const k = targetTalent.attr('data-k')
//
// 	const talentObj = found.data[j][k]
// 	const talentCopy = Object.assign({}, talentObj)
// 	const requiredTalentPoints = talentObj.requiredTalentPoints
//
// 	let description
// 	let next_rank = true
// 	let req_text = ''
// 	let tooltipFooter = {}
//
// 	const locked = $(e.target).hasClass('locked')
//
// 	if (talentObj.invested == 0) {
// 		next_rank = false
// 		talentCopy.invested++
// 		tooltipFooter.text = 'Click to learn'
// 		tooltipFooter.color = 'learn'
// 		description = talentCopy.description()
// 	}
//
// 	if (talentObj.maxRank == 1) {
// 		next_rank = false
// 		talentCopy.invested = talentCopy.maxRank
// 		description = talentCopy.description()
// 	}
//
// 	if (talentObj.invested == talentObj.maxRank) {
// 		tooltipFooter.text = 'Right-click to unlearn'
// 		tooltipFooter.color = 'unlearn'
//
// 		next_rank = false
// 		description = talentCopy.description()
// 	}
//
// 	if (talentObj.maxRank > 1 && talentObj.invested > 0 && next_rank) {
// 		talentCopy.invested++
// 		// description = talent.description() + "\n\nNext Rank:\n" + talentCopy.description()
// 		description = talentObj.description()
//
// 	}
// 	if (talentPointsSpent[tree].total() < requiredTalentPoints) {
// 		req_text = `Requires ${requiredTalentPoints} points in ${tree} Talents`
// 	}
//
// 	if (locked) {
// 		const coords = talentCopy.locked
// 		const prereq = Object.assign({}, found.data[coords[0]][coords[1]])
// 		const points_remaining = prereq.maxRank - prereq.invested
// 		const plural = (points_remaining > 1) ? 's' : ''
// 		req_text = `Requires ${points_remaining} point${plural} in ${prereq.name}\n` + req_text  //Figure out how to get the talent and points needed to unlock for this text
// 	}
//
// 	const tooltipContainer = $("#tooltip")
//
// 	let top = 0
// 	let left = $(e.target).offset().left + 45
// 	let distanceFromTop = $(e.target).offset().top - $(window).scrollTop()
//
// 	const next_rank_ele = (next_rank) ? $('<div/>', {
// 		class: 'next',
// 		text: "\nNext Rank:\n",
// 	}).append($('<div/>', {
// 		class: 'description',
// 		text: talentCopy.description(),
// 	})) : (req_text || talentPointsSpent.hardLocked || (talentPointsSpent.softLocked && tooltipFooter.color == 'learn')) ? null : $('<div/>', {
// 		class: tooltipFooter.color,
// 		text: tooltipFooter.text,
// 	})
//
// 	const testElem = $('<div/>', {
// 		class: 'tooltip-container',
// 		})
// 		.append($('<div/>', {
// 			class: 'title',
// 			text: name,
// 		}))
// 		.append($('<div/>', {
// 			class: 'rank',
// 			text: "Rank " + talentObj.invested + "/" + talentObj.maxRank,
// 		}))
// 		.append($('<div/>', {
// 			class: 'req',
// 			text: req_text,
// 		}))
// 		.append($('<div/>', {
// 			class: 'description',
// 			text: description,
// 		}))
// 		.append(next_rank_ele)
//
// 	tooltipContainer.append(testElem)
//
// 	let windowCoefficient = window.innerHeight/$(e.target).offset().top
//
// 	if (windowCoefficient < 1.3) {
// 		let a = $(e.target).offset().top + 45
// 		top = a - tooltipContainer.height()
// 	}
// 	else if (windowCoefficient >= 1.3 && windowCoefficient < 2) {
// 		// set tooltip vertically centered with talent
// 		let a = (tooltipContainer.height() - 40)/2
// 		top = $(e.target).offset().top - (a+20)
// 	} else {
// 		top = $(e.target).offset().top + 10
// 	}
//
// 	tooltipContainer.attr("style", `top: ${top}px; left: ${left}px; visiblity: visible;`)
//
// }
