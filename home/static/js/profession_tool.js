$(document).ready(function() {
	console.log('init')
	if (performance.navigation.type === 1) {
		my_consume_list = {}
		$(".prof-filter").removeClass('selected');
		$("#consumes").empty()
		$("#materials").empty()
		$("#saved_list_info").empty()
		$("#recipe_list").empty()
		update_url()
	}
	profession_tool_handlers()
});

window.addEventListener('load', function(e) {
	recipe_helper_handlers();
	consume_helper_handlers();
});

document.addEventListener('readystatechange', (event) => {
    console.log('ready state changed');
});

function profession_tool_handlers() {
	
	$(".prof-filter").on({
		click: e => {
			e.preventDefault()
			var prof = $(e.target)[0].id;
			build_recipe_list(prof);
		}
	});
}

function build_recipe_list(prof, spec_name = '', page = 1) {
	var current_prof = $(".prof-filter.selected")
	$.ajax({
		type: "POST",
		url: `/profession_tool/${prof}`,
		data: {
			'prof': prof,
			'page': page
		},
		// dataType: 'html',
		success: function(data) {
			let selected = $(".prof-filter.selected").attr("id");
			let current_page = $("span.current-page").text()

			if ((selected != prof) || (current_page != page)) {
				$("#recipe_list").html(data);
				$(".prof-filter").removeClass('selected');
				$(`#${prof}`).addClass('selected');
			}
			var path = document.location.pathname
			if (current_prof.length) {
				path = document.location.pathname.toString().replace(current_prof.attr('id'), prof)
			} else {
				let p = document.location.pathname
				var ix = p.toString().replace("\/profession_tool", '').replace("/", '')

				path = (!(isNaN(parseInt(ix)))) ? `/profession_tool/${prof}/${ix}` : `/profession_tool/${prof}`
			}
			update_url(path, document.location.search)
		},
		complete: recipe_helper_handlers
	});
}

function update_url(path = '', search = '') {
	var url = new URL(document.location.origin.toString())

	if (Boolean(path)) {
		url.pathname = path
	} else {
		url.pathname = "/profession_tool"
	}
	url.search = search
	history.replaceState(null, null, url)
}

function stepValidator(n, step) {
	return ((step * Math.round(n / step) >= 0) ? step * Math.round(n / step) : 0)
}
var ALL_PROFS = ['alchemy', 'blacksmithing', 'cooking', 'enchanting', 'engineering', 'fishing', 'first aid', 'leatherworking', 'mining', 'herbalism', 'riding', 'skinning']

function consume_calculator(current_amount, multiple, step) {
	var x = 0
	if (current_amount + (multiple * step) <= 0) {
		x = -(current_amount)
		multiple = x / step
		if (x % step != 0) {
			multiple = Math.ceil(multiple / step)
		}
	} else if (current_amount + (multiple * step) >= 999) {
		x = (999 - current_amount)
		multiple = x / step
		if (x % step != 0) {
			multiple = Math.floor(x / step)
		}
	}
	return multiple
}

function add_consume(r, num_added = 1, step = 1, ix) {
	var recipe = (typeof(r) == "string") ? ALL_RECIPES[ix] : r
	var name = recipe.n
	let consume_container = $(`span.consume-container[name="${name}"]`)
	let prof_item_recipe = $(`div.prof-item-recipe[name="${name}"]`)
	var ix = (ix) ? ix : consume_container.attr("data-ix")
	// var consume = ALL_RECIPES[ix]
	// var step = consume.step
	var materials = {}

	for (let [id, amount] of Object.entries(recipe.materials)) {
		let material = ALL_MATERIALS[id]
		let name = material.n
		materials[name] = {}
		materials[name]['amount'] = amount
		materials[name]['q'] = material.q
		materials[name]['img'] = material.img
		materials[name]['ix'] = id
	}

	let updated_amount = 0
	let materials_list_elem
	let sanitized = sanitize(name)
	if (consume_container.length) {
		let current_amount = parseInt(consume_container.find($('span.amount')).text())
		updated_amount = current_amount + (num_added * step)
		materials_list_elem = $(`#${sanitized}_collapse`)
		update_or_create(materials_list_elem, num_added, materials)
		consume_container.children("span.amount").text(updated_amount)

		if (updated_amount <= 0) {
			consume_container.parent().empty().remove()
			// return false
		}

	} else {
		updated_amount = num_added * step
		if (updated_amount <= 0) {
			return false
		}

		let consume_list_item = $('<div/>', {
			class: "consume-list-item",
		})

		let consume_container = $('<span/>', {
			class: "consume-container data-container",
			role: "button",
			href: `#${sanitized}_collapse`,
			name: `${name}`,
		}).attr("data-toggle", "collapse")

		consume_container.attr("data-ix", ix)

		let expand_button = $('<a/>', {
			class: "btn btn-sm plus",
			role: 'button',
			href: `#${sanitized}_collapse`,
		}).attr("data-toggle", "collapse").append($('<span/>', {
			class: "glyphicon glyphicon-triangle-right",
			style: "color: azure;"
		}))

		let image_url = static_url + "images/icons/large/" + prof_item_recipe.find("img.recipe-image").attr("data-img") + ".jpg"

		let consume_image = $('<img/>', {
			class: 'icon-small consume-image',
			src: "/static/images/icons/small/icon_border.png",
			style: `background-image: url(${image_url});`,
		})

		let buttonContainer = $('<div/>', {
			class: 'add-subtract-button-container',
		}).append($('<button/>', {
				class: 'btn btn-sm adjustment-button add-button',
				style: "background-color: transparent; padding: 1px; padding-right: 2px"
			}).on({
				click: e => {
					var multiple = (e.shiftKey) ? 5 : 1
					var current_amount = ($(`span.consume-container[name="${name}"]`).length) ? parseInt($(`span.consume-container[name="${name}"]`).find($('span.amount')).text()) : 0
					multiple = consume_calculator(current_amount, multiple, step)
					update_consume_list(name, multiple, step)
					add_consume(name, multiple, step, ix)
					combatText(e, multiple * step)
				}
			}).append($('<span/>', {
				class: "glyphicon glyphicon-plus",
				style: "font-size: 12px;"
			})),
			$('<button/>', {
				class: 'btn btn-sm adjustment-button sub-button',
				style: "background-color: transparent; padding: 1px; padding-right: 2px"
			}).on({
				click: e => {
					var multiple = (e.shiftKey) ? -(5) : -(1)
					var current_amount = ($(`span.consume-container[name="${name}"]`).length) ? parseInt($(`span.consume-container[name="${name}"]`).find($('span.amount')).text()) : 0
					multiple = consume_calculator(current_amount, multiple, step)
					update_consume_list(name, multiple, step)
					add_consume(name, multiple, step, ix)
					combatText(e, multiple * step)
				}
			}).append($('<span/>', {
				class: "glyphicon glyphicon-minus",
				style: "font-size: 12px;"
			}))
		)

		consume_image.on({
			mouseenter: e => {
				clear_tooltip(e)
				ez_tooltip(e)
			},
			mouseleave: e => {
				$("#tooltip_container").hide()
			},
			mousemove: e => {
				move_tooltip(e)
			}
		})

		let consume_span = $('<span/>', {
			class: `consume-name q${recipe.q}`,
			text: `${name}`,
		})

		consume_span.on({
			mouseenter: e => {
				clear_tooltip(e)
				ez_tooltip(e)
			},
			mouseleave: e => {
				$("#tooltip_container").hide()
			},
			mousemove: e => {
				move_tooltip(e)
			}
		})

		consume_container.append(expand_button, consume_image, consume_span, " ", $('<span/>', {
			text: "[",
		}), $('<span/>', {
			class: 'amount',
			text: `${updated_amount}`,
		}), $('<span/>', {
			text: "]",
		}))

		materials_list_elem = $('<div/>', {
			class: 'materials-list collapse',
			id: `${sanitized}_collapse`,
		}).on({
			'shown.bs.collapse': e => {
				$(`span.consume-container[name="${name}"]`).find('span.glyphicon').removeClass('glyphicon-triangle-right').addClass('glyphicon-triangle-bottom')
				// let targetID = $(e.target).attr('id').replace('_collapse', '')
			},
			'hidden.bs.collapse': e => {
				$(`span.consume-container[name="${name}"]`).find('span.glyphicon').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-right')
				// let targetID = $(e.target).attr('id').replace('_collapse', '')
			},
		})

		if (materials) {
			materials_list_elem = update_or_create(materials_list_elem, num_added, materials)
		}

		consume_list_item.append(consume_container, materials_list_elem, buttonContainer)


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
				let updated_amount = amount_added + current_amount
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
					class: 'materials-list-item  data-container',
				}).attr("data-ix", mat.ix)

				let icon_image = static_url + `images/icons/large/${mat.img}.jpg`
				material_container = $('<span/>', {
					class: 'material-container',
					name: `${name}`
				}).append($('<img/>', {
						class: 'icon-small material-image',
						src: static_url + "images/icons/small/icon_border.png",
						style: `background-image: url(${icon_image});`,
					})
					.on({
						mouseenter: e => {
							clear_tooltip(external)
							ez_tooltip(e)
						},
						mouseleave: e => {
							$("#tooltip_container").hide()
						},
						mousemove: e => {
							move_tooltip(e)
						}
					}), $('<span/>', {
						class: `material-name q${mat.q}`,
						text: `${name}`,
					}).on({
						mouseenter: e => {
							clear_tooltip(e)
							ez_tooltip(e)
						},
						mouseleave: e => {
							$("#tooltip_container").hide()
						},
						mousemove: e => {
							move_tooltip(e)
						}
					}), " ", $('<span/>', {
						text: "[",
					}), $('<span/>', {
						class: 'amount',
						text: `${amount_added}`,
					}), $('<span/>', {
						text: "]",
					})

				)
				materials_list_item.append(material_container)
				parent_elem.append(materials_list_item)
			}
		}
	}
	return parent_elem
}


function addSavedList(name) {

	let deleteBtn = $('<a/>', {
		class: "btn btn-sm float-right trashcan",
		title: "Delete",
	}).on('click', function() {
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


// begin js from recipe_helper.html


function update_consume_list(name, amount = 1, step = 1, prof) {

	var prof = (!prof) ? $("a.prof-filter.selected").attr("id") : prof

	if (!my_consume_list[prof]) {
		my_consume_list[prof] = {}
	}
	// let step = (allConsumes[name].step) ? allConsumes[name].step : 1
	if (!my_consume_list[prof][name]) {
		my_consume_list[prof][name] = amount * step
	} else {
		my_consume_list[prof][name] += amount * step
	}
	if (my_consume_list[prof][name] <= 0) {
		delete my_consume_list[prof][name]

	}
	if (Object.keys(my_consume_list[prof]) == 0) {
		delete my_consume_list[prof]
	}

}

function recipe_helper_handlers() {
	if (!RECIPES) {
		var RECIPES = {}
	}
	if (!MATERIALS) {
		var MATERIALS = {}
	}
	if (!ITEMSETS) {
		var ITEMSETS = {}
	}

	ALL_RECIPES = Object.assign(ALL_RECIPES, RECIPES)
	ALL_MATERIALS = Object.assign(ALL_MATERIALS, MATERIALS)
	ALL_ITEMSETS = Object.assign(ALL_ITEMSETS, ITEMSETS)


	$(".recipe-name").unbind()
	$(".recipe-image").unbind()
	$(".reagent-list-container").unbind()
	$(".prof-item-recipe").unbind()

	$(".recipe-name").on({
		mouseenter: e => {
			clear_tooltip()
			ez_tooltip(e)
		},
		mouseleave: e => {
			$("#tooltip_container").hide()
		},
		mousemove: e => {
			move_tooltip(e)
		},
	})
	$(".recipe-image").on({
		mouseenter: e => {
			clear_tooltip()
			ez_tooltip(e, true)
		},
		mouseleave: e => {
			$("#tooltip_container").hide()
		},
		mousemove: e => {
			move_tooltip(e, true)
		},
	})

	$(".prof-item-recipe").on({
		mousedown: e => {
			e.stopImmediatePropagation()
			var multiple = 1
			var ix = $(e.target).closest(".data-container").attr("data-ix")
			var recipe = ALL_RECIPES[ix]

			var name = recipe.n
			var step = recipe.step

			if (e.shiftKey) {
				multiple = 5
			}

			if (e.which === 3) {
				multiple = multiple * (-1)
			}

			var current_amount = ($(`span.consume-container[name="${name}"]`).length) ? parseInt($(`span.consume-container[name="${name}"]`).find($('span.amount')).text()) : 0
			multiple = consume_calculator(current_amount, multiple, step)
			update_consume_list(name, multiple, step)
			add_consume(recipe, multiple, step, ix)
			combatText(e, multiple * step)

		}
	})

	$(".reagent-list-container").on({
		mouseenter: e => {
			clear_tooltip(e)
			ez_tooltip(e, true)
		},
		mouseleave: e => {
			$("#tooltip_container").hide()
		},
		mousemove: e => {
			move_tooltip(e, true)
		},
	});
	$(".change-page").on({
		click: e => {
			e.preventDefault()
			let target = $(e.target)
			var page = 1
			if (target.text() == "»") {
				page = parseInt($("span.current-page").text()) + 1
			} else if (target.text() == "last »") {
				page = $("span.last-page").text()
			} else if (target.text() == "previous") {
				page = parseInt($("span.current-page").text()) - 1
			} else if (target.text() == "«") {
				page = parseInt($("span.current-page").text()) - 1
			} else {
				page = target.text()
			}
			let selected = $(".prof-filter.selected").attr("id");
			build_recipe_list(selected, '', page)
		}
	})
}
// end js from recipe_helper.html


// begin js from recipe_helper.html
var my_consume_list;

function consume_helper_handlers() {


	my_consume_list = JSON.parse(document.getElementById('hello-data').textContent)
	if (!my_consume_list) {
	    my_consume_list = {}
	}


	$(".consume-name").unbind()
	$(".consume-image").unbind()
	$(".material-image").unbind()
	$(".material-name").unbind()


    $(".consume-name, .material-name, .consume-image, .material-image").on({
        mouseenter: e => {
            clear_tooltip(e)
            ez_tooltip( e )
        },
        mouseleave: e => {
            $("#tooltip_container").hide()
        },
        mousemove: e => {
            move_tooltip( e )
        }
    });


    $(".materials-list").on({
        'shown.bs.collapse': e => {
            let id = $( e.target ).attr("id")
            $(`span.consume-container[href="#${id}"]`).find('span.glyphicon').removeClass('glyphicon-triangle-right').addClass('glyphicon-triangle-bottom')
        },
        'hidden.bs.collapse': e => {
            let id = $( e.target ).attr("id")
            $(`span.consume-container[href="#${id}"]`).find('span.glyphicon').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-right')
        },
    });

    $(".sub-button").on({
        click: e=> {
            var multiple = (e.shiftKey) ? -(5) : -(1)
            var data_container = $(e.target).closest(".data-container")
            let prof = data_container.attr("data-prof")
            let ix = data_container.attr("data-ix")
            var recipe = ALL_RECIPES[ix]
            var step = recipe.step
            var name = recipe.n
            var current_amount = ($(`span.consume-container[name="${name}"]`).length) ? parseInt($(`span.consume-container[name="${name}"]`).find($('span.amount')).text()) : 0
            update_consume_list(name, multiple, step, prof)
            multiple = consume_calculator(current_amount, multiple, step)
            add_consume(recipe, multiple, step, ix)
            combatText(e, multiple*step)
        }
    });

    $(".add-button").on({
        click: e=> {
            var multiple = (e.shiftKey) ? 5 : 1
            var data_container = $(e.target).closest(".data-container")
            let prof = data_container.attr("data-prof")

            let ix = data_container.attr("data-ix")
            var recipe = ALL_RECIPES[ix]
            var step = recipe.step
            var name = recipe.n
            var current_amount = ($(`span.consume-container[name="${name}"]`).length) ? parseInt($(`span.consume-container[name="${name}"]`).find($('span.amount')).text()) : 0
            multiple = consume_calculator(current_amount, multiple, step)
            update_consume_list(name, multiple, step, prof)
            add_consume(recipe, multiple, step)
            combatText(e, multiple*step)
        }
    });
}
// end consume_helper js


function updateItemLists() {

		if (!RECIPES) {
			var RECIPES = {}
		}
		if (!MATERIALS) {
			var MATERIALS = {}
		}
		if (!ITEMSETS) {
			var ITEMSETS = {}
		}


		ALL_RECIPES = Object.assign(ALL_RECIPES, RECIPES)
		ALL_MATERIALS = Object.assign(ALL_MATERIALS, MATERIALS)
		ALL_ITEMSETS = Object.assign(ALL_ITEMSETS, ITEMSETS)
}
