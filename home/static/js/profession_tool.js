$(document).ready(function() {
	console.log('init')
	// if (performance.navigation.type === 1) {
	// 	MY_CONSUME_LIST = {}
	// 	$(".prof-filter").removeClass('selected');
	// 	$("#consumes").empty()
	// 	$("#materials").empty()
	// 	$("#saved_list_info").empty()
	// 	$("#list_container").empty()
	// 	update_url()
	// }
	professionToolHandlers();
});

window.addEventListener('load', function(e) {
	const ALL_PROFS = ['alchemy', 'blacksmithing', 'cooking', 'enchanting', 'engineering', 'first_aid', 'leatherworking', 'mining', 'other', 'skinning'];

	// figure out which profession(if any) is in the url
	var selected = ALL_PROFS.filter(substring => document.location.pathname.includes(substring))

	if (selected.length) {
		//simulate click on respective profession
		$(`#${selected[0]}.prof-filter`).trigger("click")
	}

	// var matchedhref = checkLocalHashes()
	getConsumeList(document.location)

	consumeHandlers();
});

function getHash(href) {
	var myURL = new URL(href=href, base=document.location)
	return myURL.search
}

function checkLocalHashes() {
	var savedListElems = document.querySelectorAll('div.spec-list-item[href]')
	var hashes = Array.from(savedListElems, x => getHash(x.getAttribute('href')))
	var index = hashes.findIndex(substring => document.location.href.includes(substring))
	return index
}

var ALL_RECIPES = {},
	ALL_ITEMS = {},
	ALL_ITEMSETS = {},
	PROF_DATA = {},
	MY_CONSUME_LIST = {MATERIALS:{}},
	monkeyList;

var consumeList = {
	combine: '',
	update: {

		item: function(ix, amount=1, step=1) {

			var recipe = ALL_ITEMS[ix]
			consumeList.add.item(MY_CONSUME_LIST, ix, amount, step, 'consumes')

			for (let [matIX, materialStep] of Object.entries(recipe.materials)) {
				// var materialStep = (material.step) ? material.step : matStep.step
				consumeList.add.item(MY_CONSUME_LIST.MATERIALS, matIX, amount, materialStep, 'materials')
			}

		},
		// needs to update MY_CONSUME_LIST

		container: function(ix, parent) {

			var parentElem;

			if (parent == 'consumes') {
				parentElem = document.getElementById('consumes')
				var dataContainer = parentElem.querySelector(`div.consume-list-item.data-container[data-ix="${ix}"]`)
				dataContainer.querySelector('span.consume-container > span.amount').innerText = MY_CONSUME_LIST[ix]

				var recipe = ALL_ITEMS[ix]
				var materialsList = dataContainer.querySelector('div.materials-list')

				for (let [matIX, materialStep] of Object.entries(recipe.materials)) {
					// var materialStep = (mat.step) ? mat.step : mat
					var materialElem = materialsList.querySelector(`div.data-container.materials-list-item[data-ix="${matIX}"] > span.material-container > span.amount`)
					materialElem.innerText = (MY_CONSUME_LIST[ix]/recipe.step)*materialStep
				}

			} else {
				parentElem = document.getElementById('materials')
				parentElem.querySelector(`div.materials-list-item.data-container[data-ix="${ix}"] > span.material-container > span.amount`).innerText = MY_CONSUME_LIST.MATERIALS[ix]
			}
		},
	},
	addExisting: function(data) {
		var recipes = data.consume_list
		console.log(data)
		ALL_ITEMS = Object.assign(ALL_ITEMS, recipes)
		ALL_ITEMS = Object.assign(ALL_ITEMS, data.material_list)

		for (let [ix, consume] of Object.entries(recipes)) {
			// ALL_ITEMS = Object.assign(ALL_ITEMS, consume.materials)
			consumeList.update.item(ix, consume.amount, consume.step)
		}
	},
	add: {
		item: function(itemObj, ix, amount=1, step=1, parent) {
			if (!itemObj[ix]) {
				itemObj[ix] = amount * step
				consumeList.add.toPage(ix, parent)
			} else {
				itemObj[ix] += amount * step
				consumeList.update.container(ix, parent)
			}

			if (itemObj[ix] <= 0) {
				consumeList.remove(ix, parent)
				delete itemObj[ix]
			}
		},

		toPage: function(ix, parent) {
			var parentElem;
			var iconBorderPath = static_url + 'images/icon_border_2.png'
			var imagePrefix = static_url + 'images/icons/large/'

			//create_element(tag, class_name, style, text, dataAttrs={})
			if (parent == 'consumes') {
				var recipe = ALL_ITEMS[ix]
				parentElem = document.getElementById('consumes')
				var dataContainer = create_element('div', 'consume-list-item data-container', '', '', {'data-ix': ix})
				parentElem.appendChild(dataContainer)

				var expandButton = create_element('span', 'consume-container collapsed', '', '', {'data-toggle': 'collapse', 'href': `#${sanitize(recipe.n)}_collapse`, 'role':'button'})

				dataContainer.appendChild(expandButton)

				var btnSm = create_element('a', 'btn btn-sm plus')
				expandButton.appendChild(btnSm)

				var glyphiconTriangle = create_element('span', 'glyphicon glyphicon-triangle-right', 'color: azure;')
				btnSm.appendChild(glyphiconTriangle)

				var imagePath = `${imagePrefix}${recipe.img}`

				var consumeImage = create_element('img', 'consume-image icon-small', `background-image: url('${imagePath}.jpg')`)
				consumeImage.src = iconBorderPath
				expandButton.appendChild(consumeImage)

				var consumeName = create_element('span', `consume-name q${recipe.q}`, '', recipe.n)
				expandButton.appendChild(consumeName)

				expandButton.appendChild(document.createTextNode(' ['))

				var consumeAmount = create_element('span', 'amount', '', MY_CONSUME_LIST[ix])
				expandButton.appendChild(consumeAmount)

				expandButton.appendChild(document.createTextNode(']'))

				var materialCollapse = create_element('div', 'materials-list collapse')
				materialCollapse.id = sanitize(recipe.n)+"_collapse"
				dataContainer.appendChild(materialCollapse)

				for (let [matIX, matStep] of Object.entries(recipe.materials)) {
					var materialAmount = (MY_CONSUME_LIST[ix]/recipe.step)*matStep

					var material = ALL_ITEMS[matIX]
					var materialListItem = create_element('div', 'materials-list-item data-container', '', '', {'data-ix': matIX})
					materialCollapse.appendChild(materialListItem)

					var materialContainer = create_element('span', 'material-container')
					materialListItem.appendChild(materialContainer)

					var imagePath = `${imagePrefix}${material.img}`
					var materialImage = create_element('img', 'material-image icon-small', `background-image: url('${imagePath}.jpg')`)
					materialImage.src = static_url+'images/icons/small/icon_border.png'
					materialContainer.appendChild(materialImage)

					var materialName = create_element('span', `material-name q${material.q}`, '', material.n)
					materialContainer.appendChild(materialName)

					materialContainer.appendChild(document.createTextNode(' ['))

					var materialAmountSpan = create_element('span', 'amount', '', materialAmount)
					materialContainer.appendChild(materialAmountSpan)

					materialContainer.appendChild(document.createTextNode(']'))
				}

				var addSubtractContainer = create_element('div', 'add-subtract-button-container')
				dataContainer.appendChild(addSubtractContainer)

				var addButton = create_element('button', 'btn btn-sm adjustment-button add-button', 'background-color:transparent; padding:1px;')
				addSubtractContainer.appendChild(addButton)

				var glyphiconPlus = create_element('span', 'glyphicon glyphicon-plus untouchable', 'color:azure; font-size:12px;')
				addButton.appendChild(glyphiconPlus)

				var subtractButton = create_element('button', 'btn btn-sm adjustment-button sub-button', 'background-color:transparent; padding:1px; padding-right:2px;')
				addSubtractContainer.appendChild(subtractButton)

				var glyphiconMinus = create_element('span', 'glyphicon glyphicon-minus untouchable', 'color:azure; font-size:12px;')
				subtractButton.appendChild(glyphiconMinus)


			} else {
				var material = ALL_ITEMS[ix]
				parentElem = document.getElementById('materials')
				var dataContainer = create_element('div', 'materials-list-item data-container', '', '', {'data-ix': ix})
				parentElem.appendChild(dataContainer)

				var materialContainer = create_element('span', 'material-container')
				dataContainer.appendChild(materialContainer)

				var imagePath = `${imagePrefix}${material.img}`
				var materialImage = create_element('img', 'material-image icon-small', `background-image: url('${imagePath}.jpg')`)
				materialImage.src = static_url+'images/icons/small/icon_border.png'

				materialContainer.appendChild(materialImage)

				var materialName = create_element('span', `material-name q${material.q}`, '', material.n)
				materialContainer.appendChild(materialName)

				materialContainer.appendChild(document.createTextNode(' ['))

				var amountSpan = create_element('span', 'amount', '', MY_CONSUME_LIST.MATERIALS[ix])
				materialContainer.appendChild(amountSpan)

				materialContainer.appendChild(document.createTextNode(']'))
			}
		}
	},
	build: function(response) {
		var data = response.responseJSON
		// for (let [ix, consume] of Object.entries(data.consume_list)) {
		// 	addConsumeToPage(ix, consume, num_added=1, step=1)
		// }
	},
	remove: function(ix, parent) {
		var parentElem = document.getElementById(parent).querySelector(`div.data-container[data-ix='${ix}']`)
		while (parentElem.firstChild) {
			parentElem.removeChild(parentElem.firstChild);
		}
		parentElem.remove()
	}
}

function getConsumeList(url) {
	var d = {}
	d['hash'] = url.search

	$.ajax({
		method: "GET",
		url: '/ajax/consume_list_builder/',
		data: d,
		dataType: 'json',
		success: consumeList.addExisting,
		complete: consumeList.build
	});
}

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

function updateURL(prof='', search='') {
	// var url = new URL(document.location.origin.toString())
	var path = "/profession_tool"
	if (Boolean(prof)) {
		path += "/"+prof
	}

	if (Boolean(search)) {
		path += search
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

	$(".prof-filter").on({
		click: e => {
			e.preventDefault()

			var prof = $(e.target)[0].id;
			var currProf = document.querySelectorAll('a.prof-filter.selected')
			if (currProf.length) {
				if (currProf[0].id == prof) {
					return false
				}
			}
			emptyRecipeList();
			listObjUnhandlers()

			updateSelectedProf(prof);
			getRecipeList(prof);
			updateURL(prof, document.location.search)
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

	// $(".prof-item-recipe").on({
	// 	mousedown: e => {
	//
	// 		// e.stopImmediatePropagation()
	// 		var multiple = 1
	// 		var ix = $(e.target).closest(".data-container").attr("data-ix")
	// 		var recipe = ALL_ITEMS[ix]
	//
	// 		var name = recipe.n
	// 		var step = recipe.step
	//
	// 		if (e.shiftKey) {
	// 			multiple = 5
	// 		}
	//
	// 		if (e.which === 3) {
	// 			multiple = multiple * (-1)
	// 		}
	//
	// 		var current_amount = ($(`span.consume-container[name="${name}"]`).length) ? parseInt($(`span.consume-container[name="${name}"]`).find($('span.amount')).text()) : 0
	// 		multiple = consume_calculator(current_amount, multiple, step)
	// 		update_consume_list(name, multiple, step)
	// 		add_consume(recipe, multiple, step, ix)
	// 		combatText(e, multiple * step)
	//
	// 	}
	// })

	$(".prof-item-recipe").on({
		mousedown: e => {
			var multiple = (e.shiftKey) ? 5 : 1
			multiple = (e.which === 3) ? multiple * (-1) : multiple

			var ix = $(e.target).closest(".data-container").attr("data-ix")
			var step = ALL_ITEMS[ix].step
			consumeList.update.item(ix, multiple, step)

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

	if (!Object.keys(ALL_RECIPES).includes(prof)) {
		addScript(prof)
	} else {
		buildRecipeList(ALL_RECIPES[prof])
	}

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
	newScript.src = static_url + `js/professions/${prof}.min.js`

}

function emptyRecipeList() {
	var recipeList = document.getElementById('list_container')
	while (recipeList.firstChild) {
		recipeList.removeChild(recipeList.firstChild);
	}
}

function scriptLoaded(prof) {

	ALL_ITEMS = Object.assign(ALL_ITEMS, materials)
	ALL_ITEMS = Object.assign(ALL_ITEMS, recipes)


	ALL_RECIPES[prof] = recipes
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

		var dataContainer = create_element('div', 'prof-item-recipe data-container rarity level col', '', '', {'data-ix': ix, 'data-quality': recipe.q, 'data-level': levelReq}) // t1
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
			var recipeImage = create_element('img', 'icon-medium recipe-image', '', '', {'data-src':iconBorderPath, 'data-bgimage':imagePath}) // t3
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


			var mat = ALL_ITEMS[matIX]
			var matDataContainer = create_element('div', `reagent-list-container data-container q${mat.q}`, '', '', {
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
				matImage = create_element('img', 'icon-medium recipe-image', '', '', {'data-src':iconBorderPath, 'data-bgimage':imagePath}) // t3
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
	initListObj()
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
	var recipe = (typeof(r) == "string") ? ALL_ITEMS[ix] : r
	var name = recipe.n
	let consume_container = $(`span.consume-container[name="${name}"]`)
	let prof_item_recipe = $(`div.prof-item-recipe[name="${name}"]`)
	var ix = (ix) ? ix : consume_container.attr("data-ix")
	// var consume = ALL_RECIPES[ix]
	// var step = consume.step
	var materials = {}

	for (let [id, amount] of Object.entries(recipe.materials)) {
		let material = ALL_ITEMS[id]
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

		let image_url = static_url + "images/icons/large/" + recipe.img + ".jpg"

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

	if (!MY_CONSUME_LIST[prof]) {
		MY_CONSUME_LIST[prof] = {}
	}
	// let step = (allConsumes[name].step) ? allConsumes[name].step : 1
	if (!MY_CONSUME_LIST[prof][name]) {
		MY_CONSUME_LIST[prof][name] = amount * step
	} else {
		MY_CONSUME_LIST[prof][name] += amount * step
	}
	if (MY_CONSUME_LIST[prof][name] <= 0) {
		delete MY_CONSUME_LIST[prof][name]
	}
	if (Object.keys(MY_CONSUME_LIST[prof]) == 0) {
		console.log('deleting consume list')
		delete MY_CONSUME_LIST[prof]
	}

}

// begin js from recipe_helper.html

function consumeHandlers() {


	// my_consume_list = JSON.parse(document.getElementById('hello-data').textContent)
	if (!MY_CONSUME_LIST) {
		MY_CONSUME_LIST = {}
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
			var prof = data_container.attr("data-prof")
			var ix = data_container.attr("data-ix")
			console.log('ix: ', ix)
			var recipe = ALL_ITEMS[ix]
			console.log('ALL_ITEMS[ix]: ', ALL_ITEMS[ix])

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
			var recipe = ALL_ITEMS[ix]
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
