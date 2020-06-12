
$(document).ready(function() {
	console.log('init')
	professionToolHandlers();
});

var wait = true;


window.addEventListener('load', function(e) {
	// figure out which profession(if any) is in the url
	var selectedProfession = professionTool.PROFS.filter(substring => document.location.pathname.includes(substring))
	if (selectedProfession.length) { // simulate click on said profession
		document.querySelector(`#${selectedProfession[0]}.prof-filter`).click()
		// $(`#${selectedProfession[0]}.prof-filter`).trigger("click")
	}

	// var matchedhref = checkLocalHashes()
	if (document.location.search) {
		professionTool.remove.all()
		professionTool.get.consumeList(document.location)
	}

	consumeHandlers();
	recipeHandlers();
	sidebarHandlers();
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
	PROFS: ['alchemy', 'blacksmithing', 'cooking', 'enchanting', 'engineering', 'first_aid', 'leatherworking', 'mining', 'other', 'skinning'],
	RECIPES: {}, ITEMS: {}, ITEMSETS: {}, monkeyList: '', CONSUMES: {}, MATERIALS: {},
	update: {
		item: function(ix, amount=1, step=1) {
			var recipe = professionTool.ITEMS[ix]
			professionTool.add.item(professionTool.CONSUMES, ix, amount, step, 'consumes')

			for (let [matIX, materialStep] of Object.entries(recipe.materials)) {
				// var materialStep = (material.step) ? material.step : matStep.step
				professionTool.add.item(professionTool.MATERIALS, matIX, amount, materialStep, 'materials')
			}
		},
		element: function(ix, parent) {

			var parentElem;
			if (parent == 'consumes') {
				parentElem = document.getElementById('consumes')
				var dataContainer = parentElem.querySelector(`div.consume-list-item.data-container[data-ix="${ix}"]`)
				dataContainer.querySelector('span.consume-container > span.amount').innerText = professionTool.CONSUMES[ix]

				var recipe = professionTool.ITEMS[ix]
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
		consumes: function(d) {
			var data = (d.responseJSON) ? d.responseJSON : d
			professionTool.ITEMS = Object.assign(professionTool.ITEMS, data.consume_list)
			professionTool.ITEMS = Object.assign(professionTool.ITEMS, data.material_list)

			for (let [ix, consume] of Object.entries(data.consume_list)) {
				professionTool.update.item(ix, consume.amount, consume.step)
			}
			if (data.list_info) {
				professionTool.update.listInfo(data)
			}
		},
		listInfo: function(data) {
			var listInfoContainer = document.getElementById('saved_list_info')

			professionTool.empty(listInfoContainer)

			var title = create_element('h1', 'mt-5', '', data.list_info.name)
			listInfoContainer.appendChild(title)

			if (data.list_info.tags) {
				data.list_info.tags.forEach(function(tag) {
					var tagElem = create_element('div', 'feed-tag', '', tag)
					listInfoContainer.appendChild(tagElem)
				})
			}

			if (data.description) {
				var description = create_element('h5', 'mt-3', '', data.list_info.description)
				listInfoContainer.appendChild(description)
			}

			if (data.updated) {
				var updateDate = create_element('div', 'mt-3', '', `Last updated: ${data.list_info.updated} by ${data.list_info.user}`)
				listInfoContainer.appendChild(updateDate)
			}

			var craftedTable = professionTool.createTable('Crafted Items', professionTool.CONSUMES)

			listInfoContainer.appendChild(craftedTable)

			var materialTable = professionTool.createTable('Total Materials', professionTool.MATERIALS)

			listInfoContainer.appendChild(materialTable)

		}
	},
	createTable: function(title, items) {
		var table = create_element('table', 'table table-sm table-dark table-hover mx-auto mt-5 text-left', 'background-color:#1C1C1C'),
			thead = create_element('thead'),
			tr = create_element('tr'),
			th = create_element('th', '','','', {'colspan':3}),
			h5 = create_element('h5', 'fix-me text-center', '', title);

		table.appendChild(thead)
		thead.appendChild(tr)
		tr.appendChild(th)
		th.appendChild(h5)

		var tbody = create_element('tbody')
		table.append(tbody)

		for (let [ix, amount] of Object.entries(items)) {
			var item = professionTool.ITEMS[ix]

			var tRow = create_element('tr'),
				td1 = create_element('td'),
				td2 = create_element('td'),
				td3 = create_element('td'),
				img = create_element('img', 'icon-medium', `background-image: url('${static_url}images/icons/large/${item.img}.jpg');`),
				nameSpan = create_element('span', `q${item.q}`, '', item.n),
				amountSpan = create_element('span', 'fix-me', '', amount);

			img.src = static_url+'images/icon_border_2.png'

			tbody.append(tRow)

			td1.appendChild(img)
			td2.appendChild(nameSpan)
			td3.appendChild(amountSpan)

			tRow.appendChild(td1)
			tRow.appendChild(td2)
			tRow.appendChild(td3)
		}

		return table
	},
	add: {
		item: function(itemObj, ix, amount=1, step=1, parent) {
			if (!itemObj[ix]) {
				itemObj[ix] = amount * step
				professionTool.add.toPage(ix, parent)
			} else {
				itemObj[ix] += amount * step
				professionTool.update.element(ix, parent)
			}

			if (itemObj[ix] <= 0) {
				var parentElem =
				professionTool.empty(document.getElementById(parent).querySelector(`div.data-container[data-ix='${ix}']`), {'includeParent':true})

				// professionTool.remove.element(ix, parent)

				delete itemObj[ix]
			}
		},
		toPage: function(ix, parent) {
			var parentElem;
			var iconBorderPath = static_url + 'images/icon_border_2.png',
				imagePrefix = static_url + 'images/icons/large/';

			if (parent == 'consumes') {
				var recipe = professionTool.ITEMS[ix]
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
						material = professionTool.ITEMS[matIX],
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

				var material = professionTool.ITEMS[ix],
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
	remove: {
		all: function() {
			for (let [ix, amount] of Object.entries(professionTool.CONSUMES)) {
				professionTool.update.item(ix, amount*-1)
			}
		}
	},
	empty: function(parent, options={}) {

			while (parent.firstChild) {
				parent.removeChild(parent.firstChild);
			}
			if (options.includeParent) {
				parent.remove()
			}
	},
	get: {
		consumeList: function(url) {
			var data = {}
			data['hash'] = url.search

			$.ajax({
				method: "GET",
				url: '/ajax/consume_list_builder/',
				data: data,
				dataType: 'json',
				success: professionTool.update.consumes,
				complete: updateSelectedList,
				error: notFoundError,
			});
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
	var profSelection = document.getElementById('prof_selection')

	profSelection.addEventListener('click', function(e) {
		if (e.target.matches('a.prof-filter')) {
			e.preventDefault()
			var prof = e.target.id
			var currProf = document.querySelectorAll('a.prof-filter.selected')
			if (currProf.length) {
				if (currProf[0].id == prof) {
					return false
				}
			}
			professionTool.empty(document.getElementById('list_container'));
			listObjUnhandlers()
			updateSelectedProf(prof);
			getRecipeList(prof);

			updateURL("/profession_tool", prof, document.location.search)
		}
	})
}

function recipeHandlers() {

	var recipeList = document.getElementById('recipe_list')

	recipeList.addEventListener('mouseover', function(e) {
		if (e.target.matches('.recipe-name, .recipe-image, .material-image')) {
			// console.log(e.target)
			tooltip.init(e)
			tooltip.addMousemove(e)

			var dataContainer = e.target.closest('div.data-container')
	        var ix = dataContainer.getAttribute("data-ix")
			var data;


			if (Object.keys(professionTool.ITEMS).includes(ix)) {
	            data = professionTool.ITEMS[ix]
	            tooltip.create(data)
	            tooltip.updateCoords(e)
	        } else {
	            getItemInfo(ix, tooltip.create)
	        }

			e.target.addEventListener('mouseleave', tooltip.mouseleaveCleanup)
		}
		return
	})

	recipeList.addEventListener('mousedown', function(e) {
		if (e.target.matches('.recipe-container, .recipe-image, .recipe-name')) {
			var multiple = (e.shiftKey) ? 5 : 1
			multiple = (e.which === 3) ? multiple * (-1) : multiple
			var ix = $(e.target).closest(".data-container").attr("data-ix")
			var step = professionTool.ITEMS[ix].step

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


function sidebarHandlers() {
	var savedConsumeLists = document.getElementById('saved_consume_lists')

	savedConsumeLists.addEventListener('click', function(e) {
		if (e.target.matches('.saved-list-link')) {
			if (e.metaKey || e.target.matches('.external')) { // allow opening in new tab
				return
			}

			e.preventDefault()
			var parent = e.target.closest('div.spec-list-item')
			var currentSelection = document.querySelector('div.spec-list-item.selected')
			if (parent == currentSelection) {
				return
			}

			var link = e.target.href
			var tempurl = new URL(href=link, base=document.location)
			var path = "/profession_tool"
			var prof_elem = $('a.prof-filter.selected')

			if (prof_elem.length){
				path += "/"+prof_elem.attr('id')
			}

			tempurl.pathname = path
			professionTool.remove.all()
			professionTool.get.consumeList(tempurl)
			history.pushState(null, null, tempurl)
			return
		}

		if (e.target.matches('.trashcan')) {
			var data = {}
			var parent = e.target.closest('div.spec-list-item')
			var link = parent.querySelector('a.saved-list-link').href
			var hash = new URL(href=link).search
			data['hash'] = hash
			data['name'] = parent.name
			$.ajax({
                method: "POST",
                url: '/ajax/delete_list/',
                data: data,
                success: trashCanSuccess,
                error: trashCanError,
            })
		}
	});
}

function consumeHandlers() {

	var totalsContainer = document.getElementById('totals_container')
	totalsContainer.addEventListener('mouseover', function(e) {
		if (e.target.matches('.consume-image, .material-image, .consume-name, .material-name')) {

			tooltip.init(e)
			tooltip.addMousemove(e)

			var dataContainer = e.target.closest('div.data-container')
	        var ix = dataContainer.getAttribute("data-ix")
			var data;


			if (Object.keys(professionTool.ITEMS).includes(ix)) {
	            data = professionTool.ITEMS[ix]
	            tooltip.create(data)
	            tooltip.updateCoords(e)
	        } else {
	            getItemInfo(ix, tooltip.create)
	        }

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
			var step = professionTool.ITEMS[ix].step

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

	if (!Object.keys(professionTool.RECIPES).includes(prof)) {
		var src = static_url + `js/professions/${prof}.min.js`
		addScript(prof, src, scriptLoaded, loadError)

	} else {
		buildRecipeList(professionTool.RECIPES[prof])
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

function scriptLoaded(prof) {

	professionTool.ITEMS = Object.assign(professionTool.ITEMS, materials)
	professionTool.ITEMS = Object.assign(professionTool.ITEMS, recipes)

	professionTool.RECIPES[prof] = recipes
	professionTool.ITEMSETS = Object.assign(professionTool.ITEMSETS, itemsets)

	buildRecipeList(recipes)
}

function addScript(loadedVar, src, loadedCallback=scriptLoaded, errorCallback=loadError) {

	var newScript = document.createElement("script");
	newScript.onerror = errorCallback;
	newScript.onload = function() {
		loadedCallback(loadedVar);
	}
	document.body.appendChild(newScript);
	newScript.src = src
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

			var mat = professionTool.ITEMS[matIX]
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

function combatText(e, t){
	let color = null
	var text = t
	if (t >= 0) {
		text = "+" + text
		color = "rgba(30,255,0,0.95)"
	} else {
		color = "red"
	}
	let timeStamp = $.now();
	let uniqueID = `${e.pageX}${e.pageY}${timeStamp}`
	let notificationContainer = create_element('div', "floating-container", `left: ${e.pageX}px; top: ${e.pageY}px; color: ${color}`, text)
	notificationContainer.id = uniqueID

	document.body.appendChild(notificationContainer)

	setTimeout(() => { $(`#${uniqueID}`).remove() }, 2900);
}
