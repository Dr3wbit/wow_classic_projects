
function stepValidator(n, step) {
	return ((step*Math.round(n/step) >= 0) ? step*Math.round(n/step) : 0)
}

var ALL_PROFS = ['alchemy', 'blacksmithing', 'cooking', 'enchanting', 'engineering', 'fishing', 'first aid', 'leatherworking', 'mining', 'herbalism', 'riding', 'skinning']
function add_consume(name, num_added=1, step=1) {

	let consume_container = $(`span.consume-container[name="${name}"]`)
	let prof_item_recipe = $(`div.prof-item-recipe[name="${name}"]`)
	let reagent_list_containers = prof_item_recipe.siblings("div.reagent-list").children("div.reagent-list-container")
	var materials = {}
	reagent_list_containers.each(function() {
		var amount = 1;
		let mat_name = $( this ).attr('name')
		materials[mat_name] = {}
		materials[mat_name]['img'] = $( this ).children("img.icon-medium").attr("data-img")
		materials[mat_name]['q'] = $( this ).attr('data-q')
		if ( $( this ).children("span.count-container").length ) {
			amount =  parseInt($( this ).find("div.material-count").first().text())
		}
		// console.log('amount: ', amount)
		materials[mat_name]['amount'] = amount
	})

	let updated_amount = 0
	let materials_list_elem
	let sanitized = sanitize(name)
	if (consume_container.length) {
		let current_amount = parseInt(consume_container.find($('span.amount')).text())

		updated_amount = current_amount + (num_added*step)
		materials_list_elem = $(`#${sanitized}_collapse`)

		if (reagent_list_containers.length) {
			update_or_create(materials_list_elem, num_added, materials)
		}

		consume_container.children("span.amount").text(updated_amount)

		if (updated_amount <= 0) {
			consume_container.parent().empty().remove()
			// return false
		}

	} else {
		updated_amount = num_added*step
		if (updated_amount <= 0) {
			return false
		}

		let consume_list_item = $('<div/>', {
			class: "consume-list-item",
		})

		let consume_container = $('<span/>', {
			class: "consume-container",
			role: "button",
			href: `#${sanitized}_collapse`,
			name: `${name}`,
		}).attr("data-toggle", "collapse")

		let expand_button = $('<a/>', {
			class: "btn btn-sm plus",
			role: 'button',
			href: `#${sanitized}_collapse`,
		}).attr("data-toggle", "collapse").append($('<span/>', {
			class: "glyphicon glyphicon-triangle-right",
			style: "color: azure;"
		}))


		let image_url = static_url+"images/icons/large/"+prof_item_recipe.find("img.recipe-image").attr("data-img")+".jpg"

		let consume_image = $('<img/>', {
			class: 'icon-small consume-image',
			src: "/static/images/icons/small/icon_border.png",
			style: `background-image: url(${image_url});`,
		})

		consume_image.on({
			mouseenter: e => {
				clearTooltip()
				future_tooltip( e )
			},
			mouseleave: e => {
				clearTooltip()
			},
			mousemove: e => {
				update_tooltip(e)
			}
		})

		let quality = prof_item_recipe.attr("data-q")
		let consume_span = $('<span/>', {
			class: `consume-name q${quality}`,
			text: `${name}`,
		})

		consume_span.on({
			mouseenter: e => {
				clearTooltip()
				future_tooltip( e )
			},
			mouseleave: e => {
				clearTooltip()
			},
			mousemove: e => {
				update_tooltip(e)
			}
		})

		consume_container.append(expand_button, consume_image, consume_span, " ", $('<span/>', {
				text: "[",
			}), $('<span/>', {
				class: 'amount',
				text:`${updated_amount}`,
			}), $('<span/>', {
				text:"]",
			}))

		materials_list_elem = $('<div/>', {
			class: 'materials-list collapse',
			id: `${sanitized}_collapse`,
		}).on({
			'shown.bs.collapse': e=> {
				$(`span.consume-container[name="${name}"]`).find('span.glyphicon').removeClass('glyphicon-triangle-right').addClass('glyphicon-triangle-bottom')
				// let targetID = $(e.target).attr('id').replace('_collapse', '')
			},
			'hidden.bs.collapse': e=> {
				$(`span.consume-container[name="${name}"]`).find('span.glyphicon').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-right')
				// let targetID = $(e.target).attr('id').replace('_collapse', '')
			},
		})

		if (materials) {
			materials_list_elem = update_or_create(materials_list_elem, num_added, materials)
		}

		consume_list_item.append(consume_container, materials_list_elem)

		$("#consumes").append(consume_list_item)
	}
	// update totals
	update_or_create($("#materials"), num_added, materials)
}

/*
num_added = 1 or 5, does not use step as that is already factored into materials
*/
function update_or_create(parent_elem, num_added, materials) {

	if (materials) {
		for (let [name, mat] of Object.entries(materials)) {
			let material_container = parent_elem.find($(`span.material-container[name="${name}"]`))
			let amount_added = Math.round(mat.amount * num_added)

			if (material_container.length) { // already exists; update it
				var amount_elem = material_container.children("span.amount")
				let current_amount = parseInt(amount_elem.text())
				let updated_amount = amount_added+current_amount
				if (updated_amount <= 0) {
					material_container.parent("div.materials-list-item").empty().remove()
				} else {
					amount_elem.text(`${updated_amount}`)
				}
			} else { // doesnt exist; create and append it
				if (amount_added <= 0) {
					return false
				}

				let materials_list_item = $('<div/>', {
					class: 'materials-list-item',
				})

				let icon_image = static_url+`images/icons/large/${mat.img}.jpg`
				material_container = $('<span/>', {
					class: 'material-container',
					name: `${name}`
				}).append($('<img/>', {
					class: 'icon-small material-image',
					src: static_url+"images/icons/small/icon_border.png",
					style: `background-image: url(${icon_image});`,
				}).on({
			        mouseenter: e => {
			            clearTooltip()
			            future_tooltip( e )
			        },
			        mouseleave: e => {
			            clearTooltip()
			        },
					mousemove: e => {
						update_tooltip( e )
					}
			    }), $('<span/>', {
					class: `material-name q${mat.q}`,
					text: `${name}`,
				}).on({
			        mouseenter: e => {
			            clearTooltip()
						future_tooltip( e )
			        },
			        mouseleave: e => {
			            clearTooltip()
			        },
					mousemove: e => {
						update_tooltip( e )
					}
			    }), " ", $('<span/>', {
					text: "[",
				}), $('<span/>', {
					class: 'amount',
					text: `${amount_added}`,
				}), $('<span/>', {
					text: "]",
				}))

				materials_list_item.append(material_container)
				parent_elem.append(materials_list_item)
			}
		}
	}
	return parent_elem
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
