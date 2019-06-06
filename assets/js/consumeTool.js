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

function updatetooltip(e, matOrConsume='consume') {
	const targetElement = $(e.target)
	if (targetElement.hasClass('test')) {
		//
	}
	const name = targetElement.attr('name')
	const thisObj = (matOrConsume=='consume') ? allConsumes[name] : allMaterials[name]
	const properName = (thisObj.name) ? thisObj.name : utilities.titleCase(name)
	const rarity = thisObj.rarity
	const tooltipElems = [{class: `title ${rarity}`, text: properName}]
	if (thisObj.bop) {
		tooltipElems.push({class: 'bop', text: "Binds when picked up",})
	}
	if (thisObj.unique) {
		tooltipElems.push({class: 'unique', text: "Unique",})
	}
	let requirementText = ''
	if (name == 'goblin_rocket_boots' || name == 'black_mageweave_boots') {
		requirementText = thisObj.req
	} else {
		requirementText = (thisObj.req) ? ((thisObj.req.toString().startsWith('engi') || thisObj.req.toString().startsWith('first')) ? utilities.titleCase(thisObj.req.replace(/([a-zA-Z\_]+)(\d+)/, "$1 ($2)")) : `Requires Level ${thisObj.req}`) : false
	}

	if (thisObj.req || thisObj.stats) {
		tooltipElems.push({class: 'requiredLevel', text: requirementText})
	}
	if (thisObj.use) {
		tooltipElems.push({class: 'use', text: `Use: ${thisObj.use}`})
	}
	if (thisObj.description) {
		tooltipElems.push({class: 'description', text: `"${thisObj.description}"`})
	}
	utilities.bigdaddytooltip(e, tooltipElems)
}
