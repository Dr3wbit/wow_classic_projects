const NUMBRE = /\[(\d+)\]/

$(document).ready(initializeApp)

function initializeApp() {
	applyClickHandlers();
}

function stepValidator(n, step) {
	return ((step*Math.round(n/step) >= 0) ? step*Math.round(n/step) : 0)
}

function applyClickHandlers() {
	selectionHandler()
	recipesHandler()
	craftedItemsHandler()
	totalMaterialsList()
	$("#engineering").click()
}

function selectionHandler() {
	$('.prof-filter').on({
		click: e => {
			e.preventDefault()
			$('.prof-filter').removeClass('selected')
			$(e.target).addClass('selected')
			const profName = $(e.target)[0].id

			const profDataArr = []
			Object.entries(allConsumes).forEach(function(val, ind) {
				if (val[1].category == profName){
					if (!(val[1].name)) {
						val[1].name = utilities.titleCase(val[0])
					}
					profDataArr.push(val)
				}
			})
			const profDataObject = Object.fromEntries(profDataArr)
			populateConsumeBlocks(profDataObject)
		},

	})
}

function recipesHandler() {
	$("#recipe_list").on({
		mouseenter: e => {
			$(".prof-item-recipe").on({
				mouseenter: e => {
					clearTooltip()
					updatetooltip(e)
				},
				mouseleave: e => {
					clearTooltip()
				},
				mousedown: e => {
					addCraftedItem(e)
					e.stopImmediatePropagation()
				}
			})
		},
		mouseleave: e => {
			clearTooltip()

		}
	})
}

function craftedItemsHandler() {
	$("#total_crafted").on({
		mouseenter: e => {
			$(".crafted-list-item").on({
				mouseenter: e => {
					clearTooltip()
					updatetooltip(e)
				},
				mouseleave: e => {
					clearTooltip()
				},
			})
		},
		mouseleave: e => {
			clearTooltip()
		}
	})
}

function totalMaterialsList() {
	$("#total_materials").on({
		mouseenter: e => {
			e.preventDefault()
			$(".materials-list-item").on({
				mouseenter: e => {
					clearTooltip()
					updatetooltip(e, 'material')
				},
				mouseleave: e => {
					clearTooltip()
				},
			})
		},
		mouseleave: e => {
			clearTooltip()
		}
	})
}

function populateConsumeBlocks(data) {
	let template = $('#consume-block-template').html();
	let templateScript = Handlebars.compile(template);
	let consume_html = templateScript(data);
	$('#recipe_list').html(consume_html);
}

function clearTooltip() {
	$("#tooltip").empty()
	$("#tooltip").hide()
}

function addCraftedItem(e) {
	let totalItems = $("#total_crafted")
	let name = $(e.target).attr('name')
	let craftedItemObj = allConsumes[name]
	let craftedItem = $(`div.crafted-list-item[name='${name}']`)
	let step = (craftedItemObj.step) ? craftedItemObj.step : 1
	let numAdded = 1 // for <input> support
	let updatedAmount = 0

	if (craftedItem.length) {
		let amountStr = craftedItem.find($('span.amount')).text()
		let currentAmount = parseInt(amountStr.match(NUMBRE)[1])
		updatedAmount = currentAmount + (step * numAdded)
		craftedItem.find($('span.amount')).text(`[${updatedAmount}]`)

	} else {

		updatedAmount = step * numAdded
		craftedItem = $('<div/>', {
			class: 'crafted-list-item',
			name: `${name}`
		}).append($('<img/>', {
			class: 'icon-small',
			src: "assets/images/icons/small/icon_border.png",
			style: `background-image: url(assets/images/icons/consumes/${name}.jpg);`,
		})).append($('<span/>', {
			class: `crafted-name ${craftedItemObj.rarity}`,
			text: `${craftedItemObj.name}`,
		})).append(" ").append($('<span/>', {
			class: 'amount',
			text: `[${updatedAmount}]`,
		}))
		totalItems.append(craftedItem)
	}
	updateMaterialsList(craftedItemObj, numAdded)
}

function updateMaterialsList(craftedItemObj, numAdded) {
	let totalMats = $("#total_materials")
	for (let [name, matStep] of Object.entries(craftedItemObj.materials)) {
		let materialsObj = allMaterials[name]
		let properName = (materialsObj.name) ? materialsObj.name : utilities.titleCase(name)
		let materialsCount = 0
		let craftedStep = (craftedItemObj.step) ? craftedItemObj.step : 1
		let amountAdded = Math.round(numAdded * matStep * craftedStep)
		let materialListItem = $(`.materials-list-item[name='${name}']`)

		if (materialListItem.length) {
			let currentAmount = parseInt(materialListItem.find($("span.amount")).text().match(NUMBRE)[1])
			materialsCount = currentAmount + amountAdded
			materialListItem.find($("span.amount")).text(`[${materialsCount}]`)

		} else {
			let image_name = (name.endsWith('eko')) ? ('eko') : name
			materialsListItem = $('<div/>', {
				class: 'materials-list-item',
				name: `${name}`
			}).append($('<img/>', {
				class: 'icon-small',
				src: "assets/images/icons/small/icon_border.png",
				style: `background-image: url(assets/images/icons/small/${image_name}.jpg);`,
			})).append($('<span/>', {
				class: `material-name ${materialsObj.rarity}`,
				text: `${properName}`,
			})).append(" ").append($('<span/>', {
				class: 'amount',
				text: `[${amountAdded}]`,
			}))

			totalMats.append(materialsListItem)
		}
	}
}
//
// function updatetooltip(e, matOrConsume='consume') {
// 	const targetElement = $(e.target)
// 	if (targetElement.hasClass('test')) {
// 		//
// 	}
// 	const name = targetElement.attr('name')
// 	const thisObj = (matOrConsume=='consume') ? allConsumes[name] : allMaterials[name]
// 	const properName = (thisObj.name) ? thisObj.name : utilities.titleCase(name)
// 	const rarity = thisObj.rarity
// 	const tooltipElems = [{class: `title ${rarity}`, text: properName}]
// 	if (thisObj.bop) {
// 		tooltipElems.push({class: 'bop', text: "Binds when picked up",})
// 	}
// 	if (thisObj.unique) {
// 		tooltipElems.push({class: 'unique', text: "Unique",})
// 	}
// 	let requirementText = ''
// 	if (name == 'goblin_rocket_boots' || name == 'black_mageweave_boots') {
// 		requirementText = thisObj.req
// 	} else {
// 		requirementText = (thisObj.req) ? ((thisObj.req.toString().startsWith('engi') || thisObj.req.toString().startsWith('first')) ? utilities.titleCase(thisObj.req.replace(/([a-zA-Z\_]+)(\d+)/, "$1 ($2)")) : `Requires Level ${thisObj.req}`) : false
// 	}
//
// 	if (thisObj.req || thisObj.stats) {
// 		tooltipElems.push({class: 'requiredLevel', text: requirementText})
// 	}
// 	if (thisObj.use) {
// 		tooltipElems.push({class: 'use', text: `Use: ${thisObj.use}`})
// 	}
// 	if (thisObj.description) {
// 		tooltipElems.push({class: 'description', text: `"${thisObj.description}"`})
// 	}
// 	utilities.bigdaddytooltip(e, tooltipElems)
// }
//
//
// function materialsTooltip() {
//     $("#results").on({
//         mouseenter: e => {
// 			e.preventDefault()
//
// 			if ($(e.target).hasClass("consumes-list-item")) {
// 				$(e.target).find("span.consume-name").addClass('underlined')
// 				return false
// 			}
//             const closestMat = $( e.target ).closest('.materials-list-item').find('.materials-name')
//             let matName = closestMat.text()
// 			let name = utilities.sanitize(matName)
//             if ((closestMat.hasClass('underlined')) || (matName=='Gold' || matName=='Silver')) {
//                 return
//             } else {
//                 $("#results").find('.materials-name').removeClass('underlined')
//                 closestMat.addClass('underlined')
// 				$("#tooltip").children().remove()
// 				$("#tooltip").hide()
//                 const materialObject = allMaterials[name]
// 				let requirementText = ''
// 				if (name == 'goblin_rocket_boots' || name == 'black_mageweave_boots') {
// 					requirementText = materialObject.req
// 				} else {
// 					requirementText = (materialObject.req) ? ((materialObject.req.toString().startsWith('engi') || materialObject.req.toString().startsWith('first')) ? utilities.titleCase(materialObject.req.replace(/([a-zA-Z\_]+)(\d+)/, "$1 ($2)")) : `Requires Level ${materialObject.req}`) : null
// 				}
//
// 				const rarity = materialObject.rarity
// 				let properName = (materialObject.name) ? materialObject.name : matName
//
// 				const tooltipElems = [{class: `title ${rarity}`, text: matName}]
//                 if (materialObject.bop) {
//                     tooltipElems.push({class:'bop', text: "Binds when picked up"})
//                 }
//                 if (materialObject.unique) {
//                     tooltipElems.push({class: 'unique', text: "Unique",})
//                 }
// 				if (materialObject.req){
//                     tooltipElems.push({class: 'requiredLevel', text: requirementText})
//                 }
//                 if (materialObject.use) {
//                     tooltipElems.push({class: 'use', text: `Use: ${materialObject.use}`})
//                 }
//                 if (materialObject.description) {
//                     tooltipElems.push({class: 'description', text:`"${materialObject.description}"`})
//                 }
// 				utilities.bigdaddytooltip(e, tooltipElems)
//             }
//         },
//         mouseleave: e => {
//             $("#results").find(".materials-name, .consume-name").removeClass('underlined')
// 			// $("#results").find('.consume-name').removeClass('underlined')
//
//             $("#tooltip").hide()
//             $("#tooltip").children().remove()
//         },
// 		'shown.bs.collapse': e=> {
// 			let targetID = $(e.target).attr('id').replace('_collapse', '')
// 			$(`#${targetID}`).find('span.plus').text('-')
// 		},
// 		'hidden.bs.collapse': e=> {
//
// 			let targetID = $(e.target).attr('id').replace('_collapse', '')
//
// 			$(`#${targetID}`).find('span.plus').text('+')
// 		},
//     })
// }
//
//
// function appendMaterials(consumables) {
//
// 	let totalMaterialCount = {}
// 	consumables.forEach(function(consume) {
// 		let consumeItemElement = $(`#${consume.name}`)
// 		if (consumeItemElement.length) {
// 			consumeItemElement.find($('span.amount')).text(` [${consume.amount}]`)
//
// 			for (let [name, matsPer] of Object.entries(consume.data.materials)) {
// 				totalMaterialCount[name] = (!(totalMaterialCount[name])) ? Math.round(matsPer * consume.amount) : Math.round((matsPer * consume.amount) + totalMaterialCount[name])
// 				// console.log(totalMaterialCount)
// 				$(`.materials-list-item[name='${consume.name}_${name}']`).find($("span.amount")).text(`[${Math.round(matsPer * consume.amount)}]`)
// 			}
// 		} else {
// 			let consumeName = (consume.data.name) ? consume.data.name : utilities.titleCase(consume.name)
// 			let consumeElement = $('<a/>', {
// 				href: `#${consume.name}_collapse`,
// 				role: 'button',
// 				class: "consumes-list-item",
// 				id: `${consume.name}`,
// 			})
// 			consumeElement.attr("data-toggle", "collapse")
//
// 			consumeElement.append($('<span/> ', {
// 					class:`${consume.data.rarity} plus`,
// 					text: "+",
// 				})).append(" ").append($('<span/>', {
// 					class:`${consume.data.rarity} consume-name`,
// 					text: `${consumeName}`,
// 				})).append(" ").append($('<span/>', {
// 					class:`${consume.data.rarity} amount`,
// 					text:`[${consume.amount}]`,
// 				}))
//
// 			materialsListParent = $('<div/>', {
// 				class: 'materials-list collapse',
// 				id: `${consume.name}_collapse`,
// 			})
//
//
// 			for (let [name, matsPer] of Object.entries(consume.data.materials)) {
// 				let matObject = allMaterials[name]
// 				let category = matObject.category
// 				let rarity = matObject.rarity
// 				let properName = (matObject.name) ? matObject.name : utilities.titleCase(name)
// 				let imageName = (properName.endsWith("E'ko")) ? "eko" : name
//
// 				if (!(totalMaterialCount[name])) {
// 					totalMaterialCount[name] = Math.round(matsPer * consume.amount)
// 				} else {
// 					totalMaterialCount[name] = Math.round((matsPer * consume.amount) + totalMaterialCount[name])
// 				}
// 				let materialsListItemElement = $('<div/>', {
// 					class: 'materials-list-item',
// 					name: `${consume.name}_${name}`
// 				}).append($('<img/>', {
// 					class: 'icon-small',
// 					src: "assets/images/icons/small/icon_border.png",
// 					style: `background-image: url(assets/images/icons/small/materials/${category}/${imageName}.jpg);`,
// 				})).append($('<span/>', {
// 					text: `${properName}`,
// 					class: `materials-name ${rarity}`,
// 				})).append(" ").append($('<span/>', {
// 					text: `[${Math.round(matsPer * consume.amount)}]`,
// 					class: 'amount',
// 				}))
// 				materialsListParent.append(materialsListItemElement)
// 			}
//
// 			// materialsListParent.insertAfter(consumeElement)
//
// 			// consumeElement.append(materialsListParent)
// 			$('#results').append(consumeElement, materialsListParent)
//
// 		}
// 	})
// 	calculateTotals(totalMaterialCount)
// }
