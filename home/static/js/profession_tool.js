$(document).ready(function() {
	console.log('init')
	// if (performance.navigation.type === 1) {
	// 	my_consume_list = {}
	// 	$(".prof-filter").removeClass('selected');
	// 	$("#consumes").empty()
	// 	$("#materials").empty()
	// 	$("#saved_list_info").empty()
	// 	$("#list_container").empty()
	// 	update_url()
	// }
	professionToolHandlers()
});

// window.addEventListener('load', function(e) {
// 	recipe_helper_handlers();
// 	consume_helper_handlers();
// });

var ALL_RECIPES = {},
	ALL_MATERIALS = {},
	ALL_ITEMSETS = {},
	PROF_DATA = {},
	monkeyList;

function initListObj() {

	// var page = 3
	var listOptions = {
		valueNames: [
            'recipe-name',
			{attr: 'data-level', name: 'level'},
			{attr: 'data-quality', name: 'rarity'},
		],
	};

	monkeyList = new List('recipe_list', listOptions);
	listObjHandlers()
}

window.onpopstate = function(event) {
  alert(`location: ${document.location}, state: ${JSON.stringify(event.state)}`)
}

function updateURL(prof='', search='') {
	// var url = new URL(document.location.origin.toString())
	var path = "/profession_tool"
	if (Boolean(prof)) {
		path += "/"+prof
	}

	if (Boolean(search)) {
		path += "?"+search
	}
	// url.search = search
	// history.replaceState(null, null, url)
	history.pushState(null, prof, path)
}

function listObjHandlers() {

	$('.sorting-item').on('click', function() {
		var sortBySelection = $(this).text()
		$('#current_sort').text(sortBySelection)
		var sortingOrder = $("#sorting_order")
		sortingOrder.removeClass('hidden').removeClass('untouchable')
		$('#sorting').addClass("remove-carrat")
		sortingOrder.find("span.glyphicon").removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom")
		monkeyList.sort(sortBySelection.toLowerCase(), {
			order: 'desc'
		});
	});

	$('#sorting_order').on('click', function() {
		var glyph_triangle = $(this).find("span.glyphicon")
		var sort_order;
		var sortBySelection = $('#current_sort').text().toLowerCase()
		if (glyph_triangle.hasClass("glyphicon-triangle-bottom")) {
			sort_order = 'asc'
			glyph_triangle.removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-top")
		} else {
			sort_order = 'desc'
			glyph_triangle.removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom")
		}
		monkeyList.sort(sortBySelection, {
			order: sort_order
		});

	});

	$('#search_bar').on('keyup', function() {
		var searchString = $(this).val();
		monkeyList.search(searchString);
	});
}

function professionToolHandlers() {
	var url = new URL(document.location.origin.toString())
	console.log(document.location.pathname)

	$(".prof-filter").on({
		click: e => {
			listObjUnhandlers()
			e.preventDefault()
			var prof = $(e.target)[0].id;
			getRecipeList(prof);
			updateURL(prof, '')
		}
	});
}

function recipeHandlers() {
	recipeUnhandlers()
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
			// e.stopImmediatePropagation()
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

function getRecipeList(prof) {

	var selected = document.querySelectorAll('a.prof-filter.selected')
	// var scriptURL = static_url+`js/professions/${selected}/recipes.js`
	if (selected.length) {
		if (selected[0].id == prof) {
			return false
		}
	}

	updateSelectedProf(prof);
	emptyRecipeList();
	if (!Object.keys(ALL_RECIPES).includes(prof)) {
		addScript(prof)
	} else {
		buildRecipeList(ALL_RECIPES[prof])
	}

	window.setTimeout(initListObj, 500)
}

function updateSelectedProf(prof) {
	var prevSelected = document.querySelectorAll('a.prof-filter.selected')
	if (prevSelected.length) {
		prevSelected[0].classList.remove('selected')
	}
	var selected = document.getElementById(`${prof}`)
	selected.classList.add('selected')
}

function loadError(oError) {
	throw new URIError("The script " + oError.target.src + " didn't load correctly.");
}

function addScript(prof, type) {

	var newScript = document.createElement("script");
	newScript.onerror = loadError;
	newScript.onload = function() {
		scriptLoaded(prof);
	}

	document.body.appendChild(newScript);
	newScript.src = static_url + `js/professions/${prof}.js`

}

function emptyRecipeList() {
	var recipeList = document.getElementById('list_container')
	while (recipeList.firstChild) {
		recipeList.removeChild(recipeList.firstChild);
	}
}

function scriptLoaded(prof) {

	ALL_RECIPES = Object.assign(ALL_RECIPES, recipes)
	ALL_RECIPES[prof] = recipes
	ALL_MATERIALS = Object.assign(ALL_MATERIALS, materials)
	ALL_ITEMSETS = Object.assign(ALL_ITEMSETS, itemsets)

	buildRecipeList(recipes)

}

//create_element(tag, class_name, style, text, dataAttrs={})
function buildRecipeList(recipes) {
	var config = {
    	// If the image gets within 50px in the Y axis, start the download.
		// TODO: adjust and make dependent on screensize
    	rootMargin: '200px 0px',
    	threshold: 0.1
	};
	var recipeList = document.getElementById('list_container')
	var iconBorderPath = static_url + 'images/icon_border_2.png'
	var imagePrefix = static_url + 'images/icons/large/'
	var index = 0
	for (let [ix, recipe] of Object.entries(recipes)) {


		var row = create_element('div', 'row') // t0
		recipeList.appendChild(row)

		var levelReq = (recipe.requirements) ? recipe.requirements.level : 1

		var dataContainer = create_element('div', 'prof-item-recipe data-container rarity level col', '', '', {'ix': ix, 'quality': recipe.q, 'level': levelReq}) // t1
		dataContainer.name = recipe.n
		row.appendChild(dataContainer)

		var recipeContainer = create_element('div', `recipe-container q${recipe.q}`) // t2
		dataContainer.appendChild(recipeContainer)

		var imagePath = `${imagePrefix}${recipe.img}`


		var recipeImage;
		if (index < 15) {
			recipeImage = create_element('img', 'icon-medium recipe-image', `background-image: url('${imagePath}.jpg')`) // t3
			recipeImage.src = iconBorderPath
		} else {
			var recipeImage = create_element('img', 'icon-medium recipe-image', '', '', {'src':iconBorderPath, 'bgimage':imagePath}) // t3
			imgObserver = new IntersectionObserver(showImage, config);
			imgObserver.observe(recipeImage);
		}

		recipeContainer.appendChild(recipeImage)

		if (recipe.step > 1) {


			var stepContainer = create_element('span', 'count-container') // t3

			var div1 = create_element('span', 'step-amount', '', `${recipe.step}`) // t4
			var div2 = create_element('span', 'step-amount', 'color:black; bottom:1px; z-index:4;', recipe.step) // t4
			var div3 = create_element('span', 'step-amount', 'rgba(0,0,0,.9); bottom:2px; z-index:4;', recipe.step) // t4
			var div4 = create_element('span', 'step-amount', 'color:black; right:2px; z-index:4;', recipe.step) // t4

			stepContainer.appendChild(div1)
			stepContainer.appendChild(div2)
			stepContainer.appendChild(div3)
			stepContainer.appendChild(div4)

			recipeContainer.appendChild(stepContainer)
		}

		var recipeNameSpan = create_element('span', 'recipe-name', '', recipe.n) // t3
		recipeContainer.appendChild(recipeNameSpan)

		var reagantList = create_element('div', 'reagent-list d-none d-md-block') // t1
		row.appendChild(reagantList)

		for (let [matIX, step] of Object.entries(recipe.materials)) {


			var mat = ALL_MATERIALS[matIX]
			var matDataContainer = create_element('div', `reagent-list-container data-container q${mat.q}}`, '', '', {
				ix: matIX
			}) // t2
			matDataContainer.name = mat.n

			reagantList.appendChild(matDataContainer)

			var imagePath = `${imagePrefix}${mat.img}`
			var matImage;

			if (index < 15) {
				matImage = create_element('img', 'icon-medium', `background-image: url('${imagePath}.jpg')`) // t3
				matImage.src = iconBorderPath
			} else {
				matImage = create_element('img', 'icon-medium recipe-image', '', '', {'src':iconBorderPath, 'bgimage':imagePath}) // t3
				matImgObserver = new IntersectionObserver(showImage, config);
				matImgObserver.observe(matImage);
			}

			matDataContainer.appendChild(matImage)

			if (step > 1) {
				var countContainer = create_element('span', 'count-container')

				var amountDiv1 = create_element('span', 'step-amount', '', step) // t4
				var amountDiv2 = create_element('span', 'step-amount', 'color:black; bottom:1px; z-index:4;', step) // t4
				var amountDiv3 = create_element('span', 'step-amount', 'rgba(0,0,0,.9); bottom:2px; z-index:4;', step) // t4
				var amountDiv4 = create_element('span', 'step-amount', 'color:black; right:2px; z-index:4;', step) // t4

				countContainer.appendChild(amountDiv1)
				countContainer.appendChild(amountDiv2)
				countContainer.appendChild(amountDiv3)
				countContainer.appendChild(amountDiv4)

				matDataContainer.appendChild(countContainer)
			}
		}

		index++

	}
	var paginationContainer = create_element('div', 'pagination')
	recipeHandlers()
}

function showImage(entries, observer) {

	for (var i = 0; i < entries.length; i++) {

		var io = entries[i];

		if (io.isIntersecting && io.intersectionRatio > 0) {

			var image = io.target,
				src = image.getAttribute("data-src"),
				bg = image.getAttribute("data-bgimage"),
				srcSet = image.getAttribute("data-srcset");

			if (srcSet) {

				image.setAttribute("srcset", srcSet);

			}

			if (src) {

				image.setAttribute("src", src);

			}

			if (bg) {
				image.style.backgroundImage = `url('${bg}.jpg')`
				// image.setAttribute("src", src);

			}

			// Stop watching and load the image
			observer.unobserve(io.target);

		}

	}
}

function listObjUnhandlers() {
	$('.sorting-item').unbind()
	$('#sorting_order').unbind()
	$('#sorting').removeClass('remove-carrat')
	$('#sorting_order').addClass('hidden').addClass('untouchable')
	$('#current_sort').text('Sort')
}

function recipeUnhandlers() {
	$(".recipe-name").unbind()
	$(".recipe-image").unbind()
	$(".reagent-list-container").unbind()
	$(".prof-item-recipe").unbind()
}

// old
// function build_recipe_list(prof, spec_name = '', page = 1) {
// 	var current_prof = $(".prof-filter.selected")
// 	$.ajax({
// 		type: "POST",
// 		url: `/profession_tool/${prof}`,
// 		data: {
// 			'prof': prof,
// 			'page': page
// 		},
// 		// dataType: 'html',
// 		success: function(data) {
// 			let selected = $(".prof-filter.selected").attr("id");
// 			let current_page = $("span.current-page").text()
//
// 			if ((selected != prof) || (current_page != page)) {
// 				$("#recipe_list").html(data);
// 				$(".prof-filter").removeClass('selected');
// 				$(`#${prof}`).addClass('selected');
// 			}
// 			var path = document.location.pathname
// 			if (current_prof.length) {
// 				path = document.location.pathname.toString().replace(current_prof.attr('id'), prof)
// 			} else {
// 				let p = document.location.pathname
// 				var ix = p.toString().replace("\/profession_tool", '').replace("/", '')
//
// 				path = (!(isNaN(parseInt(ix)))) ? `/profession_tool/${prof}/${ix}` : `/profession_tool/${prof}`
// 			}
// 			update_url(path, document.location.search)
// 		},
// 		complete: recipe_helper_handlers
// 	});
// }

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

//old
// function recipe_helper_handlers() {
//
// 	$(".recipe-name").unbind()
// 	$(".recipe-image").unbind()
// 	$(".reagent-list-container").unbind()
// 	$(".prof-item-recipe").unbind()
//
// 	$(".recipe-name").on({
// 		mouseenter: e => {
// 			clear_tooltip()
// 			ez_tooltip(e)
// 		},
// 		mouseleave: e => {
// 			$("#tooltip_container").hide()
// 		},
// 		mousemove: e => {
// 			move_tooltip(e)
// 		},
// 	})
// 	$(".recipe-image").on({
// 		mouseenter: e => {
// 			clear_tooltip()
// 			ez_tooltip(e, true)
// 		},
// 		mouseleave: e => {
// 			$("#tooltip_container").hide()
// 		},
// 		mousemove: e => {
// 			move_tooltip(e, true)
// 		},
// 	})
//
// 	$(".prof-item-recipe").on({
// 		mousedown: e => {
// 			e.stopImmediatePropagation()
// 			var multiple = 1
// 			var ix = $(e.target).closest(".data-container").attr("data-ix")
// 			var recipe = ALL_RECIPES[ix]
//
// 			var name = recipe.n
// 			var step = recipe.step
//
// 			if (e.shiftKey) {
// 				multiple = 5
// 			}
//
// 			if (e.which === 3) {
// 				multiple = multiple * (-1)
// 			}
//
// 			var current_amount = ($(`span.consume-container[name="${name}"]`).length) ? parseInt($(`span.consume-container[name="${name}"]`).find($('span.amount')).text()) : 0
// 			multiple = consume_calculator(current_amount, multiple, step)
// 			update_consume_list(name, multiple, step)
// 			add_consume(recipe, multiple, step, ix)
// 			combatText(e, multiple * step)
//
// 		}
// 	})
//
// 	$(".reagent-list-container").on({
// 		mouseenter: e => {
// 			clear_tooltip(e)
// 			ez_tooltip(e, true)
// 		},
// 		mouseleave: e => {
// 			$("#tooltip_container").hide()
// 		},
// 		mousemove: e => {
// 			move_tooltip(e, true)
// 		},
// 	});
// 	$(".change-page").on({
// 		click: e => {
// 			e.preventDefault()
// 			let target = $(e.target)
// 			var page = 1
// 			if (target.text() == "»") {
// 				page = parseInt($("span.current-page").text()) + 1
// 			} else if (target.text() == "last »") {
// 				page = $("span.last-page").text()
// 			} else if (target.text() == "previous") {
// 				page = parseInt($("span.current-page").text()) - 1
// 			} else if (target.text() == "«") {
// 				page = parseInt($("span.current-page").text()) - 1
// 			} else {
// 				page = target.text()
// 			}
// 			let selected = $(".prof-filter.selected").attr("id");
// 			build_recipe_list(selected, '', page)
// 		}
// 	})
// }
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
			ez_tooltip(e)
		},
		mouseleave: e => {
			$("#tooltip_container").hide()
		},
		mousemove: e => {
			move_tooltip(e)
		}
	});


	$(".materials-list").on({
		'shown.bs.collapse': e => {
			let id = $(e.target).attr("id")
			$(`span.consume-container[href="#${id}"]`).find('span.glyphicon').removeClass('glyphicon-triangle-right').addClass('glyphicon-triangle-bottom')
		},
		'hidden.bs.collapse': e => {
			let id = $(e.target).attr("id")
			$(`span.consume-container[href="#${id}"]`).find('span.glyphicon').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-right')
		},
	});

	$(".sub-button").on({
		click: e => {
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
			combatText(e, multiple * step)
		}
	});

	$(".add-button").on({
		click: e => {
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
			combatText(e, multiple * step)
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
