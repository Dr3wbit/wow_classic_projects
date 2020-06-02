
$(document).ready(function() {
	console.log('init')
	professionToolHandlers();
});

window.addEventListener('load', function(e) {
	// figure out which profession(if any) is in the url
	var selectedProfession = professionTool.ALL_PROFS.filter(substring => document.location.pathname.includes(substring))
	if (selectedProfession.length) { // simulate click on said profession
		$(`#${selectedProfession[0]}.prof-filter`).trigger("click")
	}

	// var matchedhref = checkLocalHashes()
	if (document.location.search) {
		professionTool.remove.all()
		getConsumeList(document.location)
	}

	consumeHandlers();
	recipeHandlers()
});


function updateSelectedList() {

	var currentSelection = document.querySelector('div.spec-list-item.selected')
	if (currentSelection) {
		currentSelection.classList.remove('selected')
	}

	var selectedList = checkLocalHashes()
	if (selectedList) {
		selectedList.classList.add('selected')
	}
}

function getHash(href) {
	var myURL = new URL(href=href, base=document.location)
	return myURL.search
}

function checkLocalHashes() {
	var savedListElems = document.querySelectorAll('div.spec-list-item')
	var hashes = Array.from(savedListElems, x => getHash(x.querySelector('a').getAttribute('href')))
	var index = hashes.findIndex(substring => document.location.href.includes(substring))
	return (index) ? savedListElems[index] : false
}

var professionTool = {
	ALL_PROFS: ['alchemy', 'blacksmithing', 'cooking', 'enchanting', 'engineering', 'first_aid', 'leatherworking', 'mining', 'other', 'skinning'],
	ALL_RECIPES: {},
	ALL_ITEMS: {},
	ALL_ITEMSETS: {},
	PROF_DATA: {},
	monkeyList: '',
	CONSUMES: {},
	MATERIALS: {},
	combine: '',
	update: {
		item: function(ix, amount=1, step=1) {
			var recipe = professionTool.ALL_ITEMS[ix]
			professionTool.add.item(professionTool.CONSUMES, ix, amount, step, 'consumes')

			for (let [matIX, materialStep] of Object.entries(recipe.materials)) {
				// var materialStep = (material.step) ? material.step : matStep.step
				professionTool.add.item(professionTool.MATERIALS, matIX, amount, materialStep, 'materials')
			}
		},
		container: function(ix, parent) {

			var parentElem;
			if (parent == 'consumes') {
				parentElem = document.getElementById('consumes')
				var dataContainer = parentElem.querySelector(`div.consume-list-item.data-container[data-ix="${ix}"]`)
				dataContainer.querySelector('span.consume-container > span.amount').innerText = professionTool.CONSUMES[ix]

				var recipe = professionTool.ALL_ITEMS[ix]
				var materialsList = dataContainer.querySelector('div.materials-list')

				for (let [matIX, materialStep] of Object.entries(recipe.materials)) {
					var materialElem = materialsList.querySelector(`div.data-container.materials-list-item[data-ix="${matIX}"] > span.material-container > span.amount`)
					materialElem.innerText = (professionTool.CONSUMES[ix]/recipe.step)*materialStep
				}
			} else {
				parentElem = document.getElementById('materials')
				parentElem.querySelector(`div.materials-list-item.data-container[data-ix="${ix}"] > span.material-container > span.amount`).innerText = professionTool.MATERIALS[ix]
			}
		},
	},
	addExisting: function(d) {

		var data = (d.responseJSON) ? d.responseJSON : d
		professionTool.ALL_ITEMS = Object.assign(professionTool.ALL_ITEMS, data.consume_list)
		professionTool.ALL_ITEMS = Object.assign(professionTool.ALL_ITEMS, data.material_list)

		for (let [ix, consume] of Object.entries(data.consume_list)) {
			professionTool.update.item(ix, consume.amount, consume.step)
		}
	},
	add: {
		item: function(itemObj, ix, amount=1, step=1, parent) {
			if (!itemObj[ix]) {
				itemObj[ix] = amount * step
				professionTool.add.toPage(ix, parent)
			} else {
				itemObj[ix] += amount * step
				professionTool.update.container(ix, parent)
			}

			if (itemObj[ix] <= 0) {
				professionTool.remove.item(ix, parent)
				delete itemObj[ix]
			}
		},
		toPage: function(ix, parent) {
			var parentElem;
			var iconBorderPath = static_url + 'images/icon_border_2.png',
				imagePrefix = static_url + 'images/icons/large/';

			//create_element(tag, class_name, style, text, dataAttrs={})
			if (parent == 'consumes') {
				var recipe = professionTool.ALL_ITEMS[ix]
				parentElem = document.getElementById('consumes')
				var dataContainer = create_element('div', 'consume-list-item data-container', '', '', {'data-ix': ix}),
					expandButton = create_element('span', 'consume-container collapsed', '', '', {'data-toggle': 'collapse', 'href': `#${sanitize(recipe.n)}_collapse`, 'role':'button'}),
					btnSm = create_element('a', 'btn btn-sm plus'),
					glyphiconTriangle = create_element('span', 'glyphicon glyphicon-triangle-right', 'color: azure;'),
					imagePath = `${imagePrefix}${recipe.img}`;

				var consumeImage = create_element('img', 'consume-image icon-small', `background-image: url('${imagePath}.jpg')`)
				consumeImage.src = iconBorderPath

				var consumeName = create_element('span', `consume-name q${recipe.q}`, '', recipe.n),
					consumeAmount = create_element('span', 'amount', '', professionTool.CONSUMES[ix]),
					materialCollapse = create_element('div', 'materials-list collapse');


				materialCollapse.id = sanitize(recipe.n)+"_collapse"

				$(materialCollapse).on({
					'shown.bs.collapse': function(e) {
						glyphiconTriangle.classList.remove('glyphicon-triangle-right')
						glyphiconTriangle.classList.add('glyphicon-triangle-bottom')
					},
					'hidden.bs.collapse': function(e) {
						glyphiconTriangle.classList.remove('glyphicon-triangle-bottom')
						glyphiconTriangle.classList.add('glyphicon-triangle-right')
					}
				});


				parentElem.appendChild(dataContainer)
				dataContainer.appendChild(expandButton)
				expandButton.appendChild(btnSm)
				btnSm.appendChild(glyphiconTriangle)
				expandButton.appendChild(consumeImage)
				expandButton.appendChild(consumeName)
				expandButton.appendChild(document.createTextNode(' ['))
				expandButton.appendChild(consumeAmount)
				expandButton.appendChild(document.createTextNode(']'))
				dataContainer.appendChild(materialCollapse)

				for (let [matIX, matStep] of Object.entries(recipe.materials)) {
					var materialAmount = (professionTool.CONSUMES[ix]/recipe.step)*matStep,
						material = professionTool.ALL_ITEMS[matIX],
						materialListItem = create_element('div', 'materials-list-item data-container', '', '', {'data-ix': matIX}),
						materialContainer = create_element('span', 'material-container');

					var imagePath = `${imagePrefix}${material.img}`
					var materialImage = create_element('img', 'material-image icon-small', `background-image: url('${imagePath}.jpg')`)
					materialImage.src = static_url+'images/icons/small/icon_border.png'


					var materialName = create_element('span', `material-name q${material.q}`, '', material.n),
						materialAmountSpan = create_element('span', 'amount', '', materialAmount);

					materialCollapse.appendChild(materialListItem)
					materialListItem.appendChild(materialContainer)
					materialContainer.appendChild(materialImage)
					materialContainer.appendChild(materialName)
					materialContainer.appendChild(document.createTextNode(' ['))
					materialContainer.appendChild(materialAmountSpan)
					materialContainer.appendChild(document.createTextNode(']'))
				}

				var addSubtractContainer = create_element('div', 'add-subtract-button-container'),
					addButton = create_element('button', 'btn btn-sm adjustment-button add-button', 'background-color:transparent; padding:1px;'),
					glyphiconPlus = create_element('span', 'glyphicon glyphicon-plus untouchable', 'color:azure; font-size:12px;'),
					subtractButton = create_element('button', 'btn btn-sm adjustment-button sub-button', 'background-color:transparent; padding:1px; padding-right:2px;'),
					glyphiconMinus = create_element('span', 'glyphicon glyphicon-minus untouchable', 'color:azure; font-size:12px;')

				dataContainer.appendChild(addSubtractContainer)
				addSubtractContainer.appendChild(addButton)
				addButton.appendChild(glyphiconPlus)
				addSubtractContainer.appendChild(subtractButton)
				subtractButton.appendChild(glyphiconMinus)

			} else {
				parentElem = document.getElementById('materials')

				var material = professionTool.ALL_ITEMS[ix],
					dataContainer = create_element('div', 'materials-list-item data-container', '', '', {'data-ix': ix}),
					materialContainer = create_element('span', 'material-container');
				var imagePath = `${imagePrefix}${material.img}`
				var materialImage = create_element('img', 'material-image icon-small', `background-image: url('${imagePath}.jpg')`)

				materialImage.src = static_url+'images/icons/small/icon_border.png'
				var materialName = create_element('span', `material-name q${material.q}`, '', material.n),
					amountSpan = create_element('span', 'amount', '', professionTool.MATERIALS[ix]);

				parentElem.appendChild(dataContainer)
				dataContainer.appendChild(materialContainer)
				materialContainer.appendChild(materialImage)
				materialContainer.appendChild(materialName)
				materialContainer.appendChild(document.createTextNode(' ['))
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
	remove: {
		item: function(ix, parent) {
			var parentElem = document.getElementById(parent).querySelector(`div.data-container[data-ix='${ix}']`)
			while (parentElem.firstChild) {
				parentElem.removeChild(parentElem.firstChild);
			}
			parentElem.remove()
		},
		all: function() {
			for (let [ix, amount] of Object.entries(professionTool.CONSUMES)) {
				professionTool.update.item(ix, amount*-1)
			}
		}
	}
}

function getItemInfo(ix, completeCallback=getItemInfoComplete) {
    var data = {}
    data['ix'] = ix
    $.ajax({
        method: "GET",
        url: '/ajax/get_item_info/',
        data: data,
        dataType: 'json',
        success: function(data) {
			saveItemQuery(data)
		},
        complete: function(response) {
			completeCallback(response)
		},
		error: notFoundError
	});
}

function getItemInfoComplete(response) {
	console.log('item info: ', response.responseJSON)
}

function saveItemQuery(data) {
	var prev_query_keys = Object.keys(STORAGE_ITEMS)
	var item = data
    var ix = item.ix

    if (!prev_query_keys.includes(ix)) {
        STORAGE_ITEMS[ix] = item
        if (storageAvailable('localStorage')) {
            localStorage.setItem(ix, JSON.stringify(item));
        }
        prev_query_keys.push(ix)
        console.log(`added ${ix} to localStorage`)
    }
}

function getConsumeList(url) {
	var data = {}
	data['hash'] = url.search

	$.ajax({
		method: "GET",
		url: '/ajax/consume_list_builder/',
		data: data,
		dataType: 'json',
		success: professionTool.addExisting,
		complete: updateSelectedList,
		error: notFoundError,
	});
}


function notFoundError(jqXHR, textStatus, errorThrown) {
	notifyUser(errorThrown)
	console.log('\n**error**\n')
	console.log(jqXHR)
	console.log(textStatus)
	console.log(errorThrown)
}

function initListObj() {

	var listOptions = {
		valueNames: [
            'recipe-name',
			{attr: 'data-level', name: 'level'},
			{attr: 'data-quality', name: 'rarity'},
		],
	};

	professionTool.monkeyList = new List('recipe_list', listOptions);
	listObjHandlers()
}

function updateURL(prof='', search='') {
	var path = "/profession_tool"
	path = (Boolean(prof)) ? path + "/" + prof : path
	path = (Boolean(search)) ? path + search : path
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
		professionTool.monkeyList.sort(sortBySelection.toLowerCase(), {
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
		professionTool.monkeyList.sort(sortBySelection, {
			order: sort_order
		});

	});

	$('#search_bar').on('keyup', function() {
		var searchString = $(this).val();
		professionTool.monkeyList.search(searchString);
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

	var recipeList = document.getElementById('recipe_list')

	recipeList.addEventListener('mouseover', function(e) {
		if (e.target.matches('.recipe-name, .recipe-image, .material-image')) {
			// console.log(e.target)
			tooltip.init(e)
			e.target.addEventListener('mouseleave', tooltip.mouseleaveCleanup)
		}
		return
	})

	recipeList.addEventListener('mousedown', function(e) {
		if (e.target.matches('.recipe-container, .recipe-image, .recipe-name')) {
			var multiple = (e.shiftKey) ? 5 : 1
			multiple = (e.which === 3) ? multiple * (-1) : multiple
			var ix = $(e.target).closest(".data-container").attr("data-ix")
			var step = professionTool.ALL_ITEMS[ix].step

			var amount = step * multiple
			amount = ((amount + professionTool.CONSUMES[ix]) >= 0) ? (amount) : (professionTool.CONSUMES[ix] * -1)
			professionTool.update.item(ix, multiple, step)

			combatText(e, amount)
		}
		return
	})


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


function consumeHandlers() {

	var totalsContainer = document.getElementById('totals_container')
	totalsContainer.addEventListener('mouseover', function(e) {
		if (e.target.matches('.consume-image, .material-image, .consume-name, .material-name')) {
			// console.log(e.target)
			tooltip.init(e)
			e.target.addEventListener('mouseleave', tooltip.mouseleaveCleanup)
		}
		return
	})

	var consumesListContainer = document.getElementById('consumes')
	consumesListContainer.addEventListener('click', function(e) {
		if (e.target.matches('.add-button, .sub-button')) {
			var multiple = (e.shiftKey) ? 5 : 1
			var dataContainer = $(e.target).closest(".data-container")
			var ix = dataContainer.attr("data-ix")
			var step = professionTool.ALL_ITEMS[ix].step

			if (e.target.matches('.sub-button')) {
				multiple = multiple * (-1)
			}
			var amount = step*multiple
			amount = ((amount + professionTool.CONSUMES[ix]) >= 0) ? (amount) : (professionTool.CONSUMES[ix] * -1)

			professionTool.update.item(ix, multiple, step)

			console.log('amount: ', amount)
			combatText(e, amount)
			return
		}
		return

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

}

function getRecipeList(prof) {

	if (!Object.keys(professionTool.ALL_RECIPES).includes(prof)) {
		addScript(prof)
	} else {
		buildRecipeList(professionTool.ALL_RECIPES[prof])
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

	professionTool.ALL_ITEMS = Object.assign(professionTool.ALL_ITEMS, materials)
	professionTool.ALL_ITEMS = Object.assign(professionTool.ALL_ITEMS, recipes)

	professionTool.ALL_RECIPES[prof] = recipes
	professionTool.ALL_ITEMSETS = Object.assign(professionTool.ALL_ITEMSETS, itemsets)

	buildRecipeList(recipes)
}


function buildRecipeList(recipes) {
	var config = {
    	// If the image gets within 200px in the Y axis, start the download.
		// TODO: adjust and make dependent on screensize
    	rootMargin: '200px 0px',
    	threshold: 0.1
	};
	var recipeList = document.getElementById('list_container'),
		iconBorderPath = static_url + 'images/icon_border_2.png',
		imagePrefix = static_url + 'images/icons/large/',
		index = 0;

	for (let [ix, recipe] of Object.entries(recipes)) {


		var row = create_element('div', 'row') // t0
		var levelReq = (recipe.requirements) ? recipe.requirements.level : 1
		var dataContainer = create_element('div', 'col recipe-container data-container rarity level', '', '', {'data-ix': ix, 'data-quality': recipe.q, 'data-level': levelReq}) // t1
		dataContainer.name = recipe.n

		recipeList.appendChild(row)
		row.appendChild(dataContainer)

		var imagePath = `${imagePrefix}${recipe.img}`,
			recipeImage;

		if (index < 15) {
			recipeImage = create_element('img', 'icon-medium recipe-image', `background-image: url('${imagePath}.jpg')`) // t3
			recipeImage.src = iconBorderPath
		} else {
			recipeImage = create_element('img', 'icon-medium recipe-image', '', '', {'data-src':iconBorderPath, 'data-bgimage':imagePath}) // t3
			imgObserver = new IntersectionObserver(showImage, config);
			imgObserver.observe(recipeImage);
		}

		dataContainer.appendChild(recipeImage)

		if (recipe.step > 1) {
			var stepContainer = create_element('span', 'count-container'),
				div1 = create_element('span', 'step-amount', '', `${recipe.step}`),
				div2 = create_element('span', 'step-amount', 'color:black; bottom:1px; z-index:4;', recipe.step),
				div3 = create_element('span', 'step-amount', 'rgba(0,0,0,.9); bottom:2px; z-index:4;', recipe.step),
				div4 = create_element('span', 'step-amount', 'color:black; right:2px; z-index:4;', recipe.step);

			stepContainer.appendChild(div1)
			stepContainer.appendChild(div2)
			stepContainer.appendChild(div3)
			stepContainer.appendChild(div4)
			dataContainer.appendChild(stepContainer)

		}

		var recipeNameSpan = create_element('span', `recipe-name q${recipe.q}`, '', recipe.n)
		var reagantList = create_element('div', 'reagent-list d-none d-md-block')

		dataContainer.appendChild(recipeNameSpan)
		row.appendChild(reagantList)

		for (let [matIX, step] of Object.entries(recipe.materials)) {

			var mat = professionTool.ALL_ITEMS[matIX]
			var matDataContainer = create_element('div', `reagent-list-container data-container q${mat.q}`, '', '', {'data-ix': matIX}) // t2
			matDataContainer.name = mat.n

			reagantList.appendChild(matDataContainer)

			var imagePath = `${imagePrefix}${mat.img}`,
				matImage;

			if (index < 15) {
				matImage = create_element('img', 'icon-medium material-image', `background-image: url('${imagePath}.jpg')`) // t3
				matImage.src = iconBorderPath
			} else {
				matImage = create_element('img', 'icon-medium material-image', '', '', {'data-src':iconBorderPath, 'data-bgimage':imagePath}) // t3
				matImgObserver = new IntersectionObserver(showImage, config);
				matImgObserver.observe(matImage);
			}

			matDataContainer.appendChild(matImage)

			if (step > 1) {
				var countContainer = create_element('span', 'count-container'),
					amountDiv1 = create_element('span', 'step-amount', '', step),
					amountDiv2 = create_element('span', 'step-amount', 'color:black; bottom:1px; z-index:4;', step),
					amountDiv3 = create_element('span', 'step-amount', 'rgba(0,0,0,.9); bottom:2px; z-index:4;', step),
					amountDiv4 = create_element('span', 'step-amount', 'color:black; right:2px; z-index:4;', step);

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
