// let selectedData = {}
// let materialArray = []
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
					let name = $(e.target).attr('name')
					updatetooltip(e)
				},
				mouseleave: e => {
					clearTooltip()
				},
				mousedown: e => {
					addCraftedItem(e)
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
			$(".materials-list-item").on({
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
	updateMaterialsList(craftedItemObj, updatedAmount)
}

function updateMaterialsList(craftedItemObj, craftedItemAmount) {

	let totalMats = $("#total_materials")

	for (let [name, matsPer] of Object.entries(craftedItemObj.materials)) {
		let materialsObj = allMaterials[name]
		let properName = (materialsObj.name) ? materialsObj.name : utilities.titleCase(name)
		let materialsCount = Math.round(craftedItemAmount * matsPer)
		let materialListItem = $(`.materials-list-item[name='${name}']`)

		if (materialListItem.length) {
			materialListItem.find($("span.amount")).text(`[${materialsCount}]`)
		} else {

			materialsListItem = $('<div/>', {
				class: 'materials-list-item',
				name: `${name}`
			}).append($('<img/>', {
				class: 'icon-small',
				src: "assets/images/icons/small/icon_border.png",
				style: `background-image: url(assets/images/icons/small/${name}.jpg);`,
			})).append($('<span/>', {
				class: `${materialsObj.rarity}`,
				text: `${properName}`,
			})).append(" ").append($('<span/>', {
				class: 'amount',
				text: `[${materialsCount}]`,
			}))

			totalMats.append(materialsListItem)
		}
	}
}

function updatetooltip(e) {
	const targetElement = $(e.target)
	const name = targetElement.attr('name')
	const consumeObj = allConsumes[name]
	const properName = (allConsumes[name].name) ? allConsumes[name].name : utilities.titleCase(name)
	const rarity = consumeObj.rarity
	const tooltipElems = [{class: `title ${rarity}`, text: properName}]
	if (consumeObj.bop) {
		tooltipElems.push({class: 'bop', text: "Binds when picked up",})
	}
	if (consumeObj.unique) {
		tooltipElems.push({class: 'unique', text: "Unique",})
	}
	let requirementText = ''
	if (name == 'goblin_rocket_boots' || name == 'black_mageweave_boots') {
		requirementText = consumeObj.req
	} else {
		requirementText = (consumeObj.req) ? ((consumeObj.req.toString().startsWith('engi') || consumeObj.req.toString().startsWith('first')) ? utilities.titleCase(consumeObj.req.replace(/([a-zA-Z\_]+)(\d+)/, "$1 ($2)")) : `Requires Level ${consumeObj.req}`) : false
	}

	if (consumeObj.req || consumeObj.stats) {
		tooltipElems.push({class: 'requiredLevel', text: requirementText})
	}
	if (consumeObj.use) {
		tooltipElems.push({class: 'use', text: `Use: ${consumeObj.use}`})
	}
	if (consumeObj.description) {
		tooltipElems.push({class: 'description', text: `"${consumeObj.description}"`})
	}
	utilities.bigdaddytooltip(e, tooltipElems)
}
