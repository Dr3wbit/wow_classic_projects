
function stepValidator(n, step) {
	return ((step*Math.round(n/step) >= 0) ? step*Math.round(n/step) : 0)
}

function addCraftedItem(name, numAdded=1) {
	const NUMBRE = /\[(\d+)\]/
	let totalItems = $("#total_crafted")
	// let craftedItemObj = allConsumes[name]
	let craftedContainerJr = $(`span.crafted-container[name='${name}']`)

	// let step = (craftedItemObj.step) ? craftedItemObj.step : 1
	let updatedAmount = 0

	let materialsListContainer


	if (craftedContainerJr.length) {
		let currentAmount = parseInt(craftedContainerJr.find($('span.amount')).text())
		updatedAmount = currentAmount + numAdded

		craftedContainerJr.find($('span.amount')).text(`${updatedAmount}`)
		materialsListContainer = $(`#${name}_collapse`)
		if (craftedItemObj.materials) {
			updateOrCreate(materialsListContainer, name, numAdded)
		}

		if (updatedAmount <= 0) {
			let craftedParent = craftedContainerJr.parent()
			craftedParent.empty().remove()
			// return false
		}

	} else {
		updatedAmount = numAdded
		if (updatedAmount <= 0) {
			return false
		}

		let craftedContainerSr = $('<div/>', {
			class: "crafted-list-item",
		})

		let craftedContainerJr = $('<span/>', {
			class: "crafted-container",
			role: "button",
			href: `#${name}_collapse`,
			name: `${name}`,
		}).attr("data-toggle", "collapse")

		let expandButton = $('<a/>', {
			class: "btn btn-sm plus",
			role: 'button',
			href: `#${name}_collapse`,
		}).attr("data-toggle", "collapse").append($('<span/>', {
			class: "glyphicon glyphicon-triangle-right",
			style: "color: azure;"
		}))

		let crafted_image = $('<img/>', {
			name: `${name}`,
			class: 'icon-small crafted-image',
			src: "/static/images/icons/small/icon_border.png",
			style: `background-image: url(/static/images/icons/consumes/${name}.jpg);`,
		})

		crafted_image.on({
			mouseenter: e => {
				clearTooltip()
				tooltip_v2(e, false, 2)
			},
			mouseleave: e => {
				clearTooltip()
			},
			mousemove: e => {
				update_tooltip(e)
			}
		})

		let crafted_span = $('<span/>', {
			class: `crafted-name ${craftedItemObj.rarity}`,
			text: `${utilities.titleCase(name)}`,
			name: `${name}`
		})

		crafted_span.on({
			mouseenter: e => {
				clearTooltip()
				tooltip_v2(e, false, 2)
			},
			mouseleave: e => {
				clearTooltip()
			},
			mousemove: e => {
				update_tooltip(e)
			}
		})

		craftedContainerJr.append(expandButton, crafted_image, crafted_span, " ", $('<span/>', {
				text: "[",
			}), $('<span/>', {
				class: 'amount',
				text:`${updatedAmount}`,
			}), $('<span/>', {
				text:"]",
			}))

		materialsListContainer = $('<div/>', {
			class: 'materials-list collapse',
			id: `${name}_collapse`,
		}).on({
			'shown.bs.collapse': e=> {
				$(`span.crafted-container[name="${name}"]`).find('span.glyphicon').removeClass('glyphicon-triangle-right').addClass('glyphicon-triangle-bottom')
				// let targetID = $(e.target).attr('id').replace('_collapse', '')
			},
			'hidden.bs.collapse': e=> {
				$(`span.crafted-container[name="${name}"]`).find('span.glyphicon').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-right')
				// let targetID = $(e.target).attr('id').replace('_collapse', '')
			},
		})
		if (craftedItemObj.materials) {
			materialsListContainer = updateOrCreate(materialsListContainer, name, numAdded)
		}

		craftedContainerSr.append(craftedContainerJr, materialsListContainer)

		totalItems.append(craftedContainerSr)
	}
	// update totals
	updateOrCreate($("#total_materials"), name, numAdded)
}

function updateOrCreate(parentElem, consume_name, numAdded) {
	const NUMBRE = /\[(\d+)\]/

	let craftedItemObj = allConsumes[consume_name]
	let craftedStep = (craftedItemObj.step) ? craftedItemObj.step : 1

	if (craftedItemObj.materials) {
		for (let [name, matStep] of Object.entries(craftedItemObj.materials)) {
			let matContainerJr = parentElem.find($(`span.material-container[name='${name}']`))
			let materialsAdded = Math.round(matStep * craftedStep * numAdded)
			if (matContainerJr.length) { // already exists; update it
				let currentAmount = parseInt(matContainerJr.find($("span.amount")).text())
				let updatedMatCount = materialsAdded+currentAmount
				if (updatedMatCount <= 0) {
					let matListItem = $(`div.materials-list-item[name="${name}"]`)
					matListItem.empty().remove()
				} else {
					matContainerJr.find($("span.amount")).text(`${updatedMatCount}`)
				}

			} else { // doesnt exist; create and append it
				if (materialsAdded <= 0) {
					return false
				}
				let materialsObj = allMaterials[name]
				let properName = (materialsObj.name) ? materialsObj.name : utilities.titleCase(name)
				let image_name = (name.endsWith('eko')) ? ('eko') : name
				let suffix = (name=='gold'||name=='silver') ? '.gif' : '.jpg'
				let matContainerSr = $('<div/>', {
					class: 'materials-list-item',
					name: name
				})

				image_name += `${suffix}`

				matContainerJr = $('<span/>', {
					class: 'material-container',
					name: `${name}`
				}).append($('<img/>', {
					class: 'icon-small material-image',
					name: `${name}`,
					src: "/static/images/icons/small/icon_border.png",
					style: `background-image: url(/static/images/icons/small/${image_name});`,
				}).on({
			        mouseenter: e => {
			            clearTooltip()
			            tooltip_v2(e, false, 2)
			        },
			        mouseleave: e => {
			            clearTooltip()
			        },
					mousemove: e => {
						update_tooltip(e)
					}
			    }), $('<span/>', {
					class: `material-name ${materialsObj.rarity}`,
					name: `${name}`,
					text: `${properName}`,
				}).on({
			        mouseenter: e => {
			            clearTooltip()
			            tooltip_v2(e, false, 2)
			        },
			        mouseleave: e => {
			            clearTooltip()
			        },
					mousemove: e => {
						update_tooltip(e)
					}
			    }), " ", $('<span/>', {
					text: "[",
				}), $('<span/>', {
					class: 'amount',
					text: `${materialsAdded}`,
				}), $('<span/>', {
					text: "]",
				}))

				matContainerSr.append(matContainerJr)
				parentElem.append(matContainerSr)
			}
		}
	} else {

		let name = consume_name
		let matContainerJr = parentElem.find($(`span.material-container[name='${name}']`))
		let materialsAdded = Math.round(craftedStep * numAdded)
		if (matContainerJr.length) { // already exists; update it
			// let currentAmount = parseInt(matContainerJr.find($("span.amount")).text().match(NUMBRE)[1])
			let currentAmount = parseInt(matContainerJr.find($("span.amount")).text())
			matContainerJr.find($("span.amount")).text(`${materialsAdded+currentAmount}`)

		} else { // doesnt exist; create and append it

			let materialsObj = allMaterials[name]
			let properName = (materialsObj.name) ? materialsObj.name : utilities.titleCase(name)
			let image_name = (name.endsWith('eko')) ? ('eko') : name
			let suffix = (name=='gold'||name=='silver') ? '.gif' : '.jpg'
			let matContainerSr = $('<div/>', {
				class: 'materials-list-item'
			})

			image_name += `${suffix}`

			matContainerJr = $('<span/>', {
				class: 'material-container',
				name: `${name}`
			}).on({
				mouseenter: e => {
					clearTooltip()
					e.stopPropagation()
					tooltip_v2(e, false, 2)
					// updatetooltip($(e.target).closest(".material-container"), 'material')
				},
				mouseleave: e => {
					clearTooltip()
				},
			}).append($('<img/>', {

				class: 'icon-small',
				src: "/static/images/icons/small/icon_border.png",
				style: `background-image: url(/static/images/icons/small/${image_name}); user-select: none; pointer-events: none;`,
			}), $('<span/>', {
				class: `materials-name ${materialsObj.rarity}`,
				name: name,
				text: `${properName}`,
			}), " ", $('<span/>', {
				text: "[",
			}), $('<span/>', {
				class: 'amount',
				text: `${materialsAdded}`,
			}), $('<span/>', {
				text: "]",
			}))

			matContainerSr.append(matContainerJr)
			parentElem.append(matContainerSr)
		}
	}

	return parentElem
}



// function removeSavedList(name) {
// 	$(`div.saved-list[name='${name}']`).remove()
// 	let oldLists = JSON.parse(localStorage.getItem('consumeLists'))
// 	delete oldLists[name]
// 	let allLists = Object.assign({}, oldLists)
// 	localStorage.setItem('consumeLists', JSON.stringify(allLists))
// }

function addSavedList(name) {

	let deleteBtn = $('<a/>', {
		class: "btn btn-sm float-right trashcan",
		title: "Delete",
	}).on('click', function () {
		removeSavedList(name)
	})

	deleteBtn.append($('<span/>', {
		class: "glyphicon glyphicon-trash",
		style: "color: azure;"
	}))

	let savedList = $('<div/>', {
			class: 'saved-list',
			name: name
		})

	savedList.append($('<span/>', {
			class: 'saved-list-name',
			text: name,
		}), deleteBtn)

	$(".savedListsContainer").append(savedList)


}



function updatetooltip(e, name, matOrConsume='consume') {

	const targetElement = $(e.target)

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
	utilities_v2.bigdaddytooltip(e, tooltipElems)
}
