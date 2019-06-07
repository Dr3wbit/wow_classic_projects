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
	consumeListSaver()
	sideNav()
	savedLists()
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
		'shown.bs.collapse': e=> {
			let targetID = $(e.target).attr('id').replace('_collapse', '')
			$(`a.crafted-list-item[name='${targetID}']`).find('span.plus').text('-')
		},
		'hidden.bs.collapse': e=> {
			let targetID = $(e.target).attr('id').replace('_collapse', '')
			$(`a.crafted-list-item[name='${targetID}']`).find('span.plus').text('+')
		},
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
		},

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
	let craftedItem = $(`a.crafted-list-item[name='${name}']`)

	let step = (craftedItemObj.step) ? craftedItemObj.step : 1
	let numAdded = 1 // for <input> support
	let updatedAmount = 0

	let materialsListContainer

	if (craftedItem.length) {
		let amountStr = craftedItem.find($('span.amount')).text()
		let currentAmount = parseInt(amountStr.match(NUMBRE)[1])
		updatedAmount = currentAmount + (step * numAdded)
		craftedItem.find($('span.amount')).text(`[${updatedAmount}]`)
		materialsListContainer = $(`#${name}_collapse`)
		updateOrCreate(materialsListContainer, craftedItemObj, numAdded)

	} else {
		updatedAmount = step * numAdded
		craftedItem = $('<a/>', {
			class: "crafted-list-item",
			name: `${name}`,
			href: `#${name}_collapse`,
			role: "button",
		})
		craftedItem.attr("data-toggle", "collapse")
		craftedItem.append($('<span/> ', {
				class: "plus",
				text: "+",
			})).append($('<img/>', {
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

		materialsListContainer = $('<div/>', {
			class: 'materials-list collapse',
			id: `${name}_collapse`,
		})

		materialsListContainer = updateOrCreate(materialsListContainer, craftedItemObj, numAdded)
		totalItems.append(craftedItem, materialsListContainer)
	}
	// update totals
	updateOrCreate($("#total_materials"), craftedItemObj, numAdded)
}

function updateOrCreate(parentElem, craftedItemObj, numAdded) {
	let craftedStep = (craftedItemObj.step) ? craftedItemObj.step : 1
	for (let [name, matStep] of Object.entries(craftedItemObj.materials)) {
		let matElem = parentElem.find($(`div.materials-list-item[name='${name}']`))
		let materialsAdded = Math.round(matStep * craftedStep * numAdded)
		if (matElem.length) { // already exists; update it
			let currentAmount = parseInt(matElem.find($("span.amount")).text().match(NUMBRE)[1])
			matElem.find($("span.amount")).text(`[${materialsAdded+currentAmount}]`)

		} else { // doesnt exist; create and append it

			let materialsObj = allMaterials[name]
			let properName = (materialsObj.name) ? materialsObj.name : utilities.titleCase(name)
			let image_name = (name.endsWith('eko')) ? ('eko') : name
			let suffix = (name=='gold'||name=='silver') ? '.gif' : '.jpg'
			image_name+=`${suffix}`
			matElem = $('<div/>', {
				class: 'materials-list-item',
				name: `${name}`
			}).append($('<img/>', {
				class: 'icon-small',
				src: "assets/images/icons/small/icon_border.png",
				style: `background-image: url(assets/images/icons/small/${image_name});`,
			})).append($('<span/>', {
				class: `materials-name ${materialsObj.rarity}`,
				text: `${properName}`,
			})).append(" ").append($('<span/>', {
				class: 'amount',
				text: `[${materialsAdded}]`,
			}))
			parentElem.append(matElem)
		}
	}
	return parentElem
}

function updatetooltip(e, matOrConsume='consume') {
	const targetElement = $(e.target)
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

function consumeListSaver() {
	$("button.saveConsumeList").on({
		click: e => {
			$("#consumeListPrompt").modal('show')
		}
	})
	$("input.saveConsumeList, form.saveConsumeList").on({
		submit: e=> {
			e.preventDefault()
			let myConsumeList = {}
			let allCraftedItems
			let oldLists = JSON.parse(localStorage.getItem('consumeLists'))
			$("a.crafted-list-item").each(function(elem) {
				let amountStr = $( this ).find($('span.amount')).text()
				let currentAmount = parseInt(amountStr.match(NUMBRE)[1])
				let name = $( this ).attr('name')
				myConsumeList[name] = currentAmount
			})
			let listName = $("#consumeListName").val()
			let newList = {[listName.toString()]: myConsumeList}
			let allLists = Object.assign({}, oldLists, newList)
			localStorage.setItem('consumeLists', JSON.stringify(allLists))
			let localConsumeLists = localStorage.getItem('consumeLists')
			$("#consumeListPrompt").modal('hide')
		}
	})
}

function sideNav(){
	$("#navTrigger").on({
		click: e => {
			if ($("#sideNav").hasClass('minimized')) {
				$("#sideNav").removeClass('minimized')
				$(".trigger-icon").removeClass('iconSwitch')
			} else {
				$("#sideNav").addClass('minimized')
				$(".trigger-icon").addClass('iconSwitch')
			}
		},
	})
}

function savedLists() {
	//
	let oldLists = JSON.parse(localStorage.getItem('consumeLists'))
	if (oldLists) {
		for (let [listName, consumes] of Object.entries(oldLists)) {
			console.log('listName: ', listName, '\n consumes ', consumes)
			let closeButton = $('<button/>', {
				class: "close"
			})

			closeButton.append($('<span/>', {
				text: '×',
			}))

			let savedList = $('<div/>', {
					class: 'saved-list',
				})

			savedList.append($('<span/>', {
					class: 'saved-list-name',
					text: listName,
				}), closeButton)

			$(".savedListsContainer").append(savedList)
		}
	}
}
