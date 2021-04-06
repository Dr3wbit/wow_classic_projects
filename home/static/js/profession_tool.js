
$(document).ready(function() {
	professionToolHandlers();
});

window.addEventListener('load', function(e) {
	// figure out which profession(if any) is in the url
	var selectedProfession = professionTool.PROFS.find(substring => document.location.pathname.includes(substring))
	if (selectedProfession) { // simulate click on said profession
		document.querySelector(`#${selectedProfession}.prof-filter`).click()
	}

	if (document.location.search) {
		clearCraftedList()
		getCraftedList(document.location)
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
	PROFS: ['alchemy', 'blacksmithing', 'cooking', 'enchanting', 'engineering', 'first_aid', 'leatherworking', 'mining', 'other', 'skinning', 'tailoring'],
	RECIPES: {ALL: {}}, ITEMS: {}, ITEMSETS: {}, CONSUMES: {}, MATERIALS: {}, recipeInd: 0,
	observer: {
		config:{
	    	// If the image gets within rootMargin px in the Y axis, start the download.
			// TODO: adjust and make dependent on screensize
			root: document.querySelector('#recipe_list'),
	    	rootMargin: '200px',
	    	threshold: 0.1
		}
	},
	selected: '',
	createTable: function(title, items) {
		var isMaterialsList = title.toLowerCase().includes("material");
		var tableId = `${sanitize(title.toLowerCase())}_table`

		var table = create_element('table', 'table table-sm table-dark table-hover mx-auto text-left', 'background-color:#1C1C1C', '', {"id": tableId}),
			thead = create_element('thead'),
			trTop = create_element('tr'),
			trBottom = create_element('tr'),
			thMain = create_element('th', '','','', {'colspan':5}),
			thEmpty = create_element('th','','','', {"scope": "col"})
			th2 = create_element('th', '','','', {"scope": "col", 'colspan':1}),
			th3 = create_element('th', '', '', '', {"scope": "col", 'colspan':1}),
			thspan = create_element('span', 'fix-me text-center', '', '#'),
			h5 = create_element('h5', 'fix-me text-center', '', title),
			checkAll = create_element('input', 'check-list master', '', '', {"type": "checkbox"});


		table.appendChild(thead)
		thead.append(trTop, trBottom)
		trTop.appendChild(thMain)
		trBottom.append(thEmpty, thEmpty.cloneNode(true), thEmpty.cloneNode(true), th2, th3)

		thMain.appendChild(h5)
		th2.appendChild(thspan)
		th3.appendChild(checkAll)

		var tbody = create_element('tbody')
		table.append(tbody)

		for (let [ix, amount] of Object.entries(items)) {
			var item = professionTool.ITEMS[ix]
			var tRow = create_element('tr', 't1', '', '', {"data-ix": ix})

			tbody.append(tRow)

			let td1 = create_element('td'),
				td2 = create_element('td'),
				td3 = create_element('td'),
				td4 = create_element('td', '', 'margin:0; padding:0;'),
				td5 = create_element('td'),
				img = create_element('img', 'icon-small', `background-image: url('${global.static_url}images/icons/large/${item.img}.jpg');`),
				nameSpan = create_element('span', `q${item.q} untouchable`, '', item.n),
				numInput = create_element('input', 'amount-input', "display:block; padding:0; margin:0;", '', {"max": amount, "min":0, "type": "number", "size": 7}),
				amountSpan = create_element('span', 'fix-me', '', amount),
				checkbox = create_element('input', 'check-list', '', '', {"type": "checkbox"});

			img.alt = item.n
			img.src = `${global.static_url}images/icon_border_2.png`

			if (isMaterialsList && professionTool.RECIPES.ALL[ix]) {
				tRow.classList.add("collapse-toggle")

				var recipe = professionTool.RECIPES.ALL[ix]
				tRow.setAttribute("data-target", Object.keys(recipe).join(","))

				for (let [matIX, recipeAmount] of Object.entries(recipe) ) {
					let trCollapse = create_element('tr', `row-collapsed table-dark sub-material mat-table-collapse${ix}`, '', '', {"data-ix": matIX, "data-parent":ix});

					let matItem = professionTool.ITEMS[matIX]
					let matAmount = recipeAmount * (professionTool.MATERIALS[ix]/professionTool.ITEMS[ix].step)

					let td1 = create_element('td'),
						td2 = create_element('td'),
						td3 = create_element('td'),
						td4 = create_element('td', '', 'margin:0; padding:0;'),
						td5 = create_element('td'),
						img = create_element('img', 'icon-small', `background-image: url('${global.static_url}images/icons/large/${matItem.img}.jpg');`),
						nameSpan = create_element('span', `q${matItem.q} untouchable`, '', matItem.n),
						numInput = create_element('input', 'amount-input', "display:block; padding:0; margin:0;", '', {"max": matAmount, "min":0, "type": "number", "size": 7}),
						amountSpan = create_element('span', 'fix-me', '', matAmount),
						checkbox = create_element('input', 'check-list', '', '', {"type": "checkbox"});

					img.src = `${global.static_url}images/icon_border_2.png`
					img.alt = matItem.n

					trCollapse.append(td1, td2, td3, td4, td5)

					td1.appendChild(img)
					td2.appendChild(nameSpan)
					td3.appendChild(amountSpan)
					td4.appendChild(numInput)
					td5.appendChild(checkbox)

					tbody.append(trCollapse)
				}

			}

			tRow.append(td1, td2, td3, td4, td5)
			td1.appendChild(img)
			td2.appendChild(nameSpan)
			td3.appendChild(amountSpan)
			td4.appendChild(numInput)
			td5.appendChild(checkbox)
		}
		return table
	},
}

function toolTipMouseover(e) {
	tooltip.init(e)

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
}

function removeElements(parent, options={}) {

	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}

	if (options.includeParent) {
		parent.remove()
	}
}

function clearCraftedList() {
	for (let [ix, amount] of Object.entries(professionTool.CONSUMES)) {
		updateCraftedAmount(ix, amount*-1)
	}
}

function updateListInfo(data={}) {
	var listInfoContainer = document.getElementById('saved_list_info')
	removeElements(listInfoContainer)

	if (data.list_info) {

		if (data.list_info.name) {
			if (document.querySelector("#id_name")) {
				document.querySelector("#id_name").value = data.list_info.name
			}
			var title = create_element('h1', '', '', data.list_info.name)
			listInfoContainer.appendChild(title)
		}

		if (data.list_info.tags) {
			data.list_info.tags.forEach(function(tag) {
				var checkBox = document.querySelector(`input[value='${tag}'][type='checkbox']`)
				if (checkBox) {
					checkBox.checked = true
				}

				var tagElem = create_element('div', 'feed-tag', '', tag)
				listInfoContainer.appendChild(tagElem)
			})
		}

		if (data.list_info.description) {

			var description = create_element('h5', 'mt-3', '', data.list_info.description)
			listInfoContainer.appendChild(description)
			if (document.querySelector("#id_description")) {
				document.querySelector("#id_description").value = data.list_info.description
			}
		}

		if (data.list_info.updated) {
			var date = new Date(data.list_info.updated)
			var lastUpdateContainer = create_element('div', 'mt-3', '', 'Last updated: '),
				lastUpdate = create_element('span', 'fix-me last-update', '', date.toLocaleString()),
				textContent = document.createTextNode(' by '),
				userNameSpan = create_element('span', 'fix-me user-tag', '', data.list_info.user),
				newLine = create_element('br')

			if (document.querySelector("#id_private")) {
				document.querySelector("#id_private").checked = (data.list_info.user == 'anonymous')
			}

			lastUpdateContainer.append(lastUpdate, textContent, userNameSpan, newLine)
			listInfoContainer.appendChild(lastUpdateContainer)
		}
	} else {
		var descriptionText = "Want to share this list with others? Save it using the form below and a link will be generated"
		var description = create_element('h5', 'mt-3', 'margin-bottom: 1rem', descriptionText)
		listInfoContainer.appendChild(description)
	}

	var row = create_element('div', 'row')
	listInfoContainer.appendChild(row)

	var craftedTableContainer = create_element('div', 'col-lg-4 offset-lg-2 col-md-6 col-sm-6')
	var craftedTable = professionTool.createTable('Crafted Items', professionTool.CONSUMES)

	row.appendChild(craftedTableContainer)
	craftedTableContainer.appendChild(craftedTable)

	var materialTableContainer = create_element('div', 'col-lg-4 col-md-6 col-sm-6')
	var materialTable = professionTool.createTable('Total Materials', professionTool.MATERIALS)

	row.appendChild(materialTableContainer)
	materialTableContainer.appendChild(materialTable)
	listInfoHandlers()
}

function getCraftedList(url) {
	var data = {}
	data['hash'] = url.search

	$.ajax({
		method: "GET",
		url: '/ajax/consume_list_builder/',
		data: data,
		dataType: 'json',
		success: getCraftedListSuccess,
		complete: updateSelectedList,
		error: notFoundError,
	});
}

function getCraftedListSuccess(d) {
	var data = (d.responseJSON) ? d.responseJSON : d

	professionTool.ITEMS = Object.assign(professionTool.ITEMS, data.items)
	professionTool.RECIPES.ALL =  Object.assign(professionTool.RECIPES.ALL, data.recipes)

	for (let [ix, amount] of Object.entries(data.crafted)) {
		updateCraftedAmount(ix, amount)
	}

	if (data.list_info) {
		updateListInfo(data)
	}
}

function updateCraftedAmount(ix, consumeAmount) {

	if (!professionTool.CONSUMES[ix] && (consumeAmount <= 0)) {
		return
	}
	professionTool.CONSUMES[ix] = (professionTool.CONSUMES[ix]) ? professionTool.CONSUMES[ix] + consumeAmount : consumeAmount
	updateMaterialsAmount(ix, consumeAmount)
	if (professionTool.CONSUMES[ix] <= 0) {
		delete professionTool.CONSUMES[ix]
		removeElements(document.querySelector(`#consumes > .data-container[data-ix='${ix}']`), {"includeParent": true})

	} else {
		addOrUpdateElements(ix)
	}
}

//
function updateMaterialsAmount(consumeIX, consumeAmount) {

	var recipe = professionTool.RECIPES.ALL[consumeIX] || professionTool.RECIPES[professionTool.selected]
	for (let [matIX, matAmountPer] of Object.entries(recipe)) {
		var matAmountAdded =  matAmountPer * consumeAmount/professionTool.ITEMS[consumeIX].step
		professionTool.MATERIALS[matIX] = (!professionTool.MATERIALS[matIX]) ? matAmountAdded : matAmountAdded+professionTool.MATERIALS[matIX]
		if (professionTool.MATERIALS[matIX] <= 0) {
			delete professionTool.MATERIALS[matIX]

			removeElements(document.querySelector(`#materials > .data-container[data-ix='${matIX}']`), {"includeParent": true})
		}
	}
}



// adds or updates consume elements and materials elements on page
function addOrUpdateElements(consumeIX) {
	var consumeAmount = professionTool.CONSUMES[consumeIX]
	var iconBorderPath = `${global.static_url}images/icon_border_2.png`,
		imagePrefix = `${global.static_url}images/icons/large/`;
		var item = professionTool.ITEMS[consumeIX],
			recipe = professionTool.RECIPES.ALL[consumeIX];

		// check if consume already on page
		if (document.querySelector(`.consume-list-item.data-container[data-ix='${consumeIX}']`)) {
			var consumeContainer = document.querySelector(`.consume-list-item.data-container[data-ix='${consumeIX}']`)
			var consumeAmountText = consumeContainer.querySelector("span.amount")
			consumeAmountText.innerText = consumeAmount

			for (let [matIX, matAmountPer] of Object.entries(recipe)) {
				var matAmount = (consumeAmount/item.step)*matAmountPer
				consumeContainer.querySelector(`.materials-list-item.data-container[data-ix='${matIX}'] span.amount`).innerText = matAmount
				document.querySelector(`#materials > .materials-list-item.data-container[data-ix='${matIX}'] span.amount`).innerText = professionTool.MATERIALS[matIX]
			}
		} else {

			parentElem = document.getElementById('consumes')
			var dataContainer = create_element('div', 'consume-list-item data-container', '', '', {'data-ix': consumeIX}),
				expandButton = create_element('span', 'consume-container collapsed', '', '', {'data-toggle': 'collapse', 'href': `#${sanitize(item.n)}_collapse`, 'role':'button'}),
				btnSm = create_element('a', 'btn btn-sm plus'),
				glyphiconTriangle = create_element('span', 'glyphicon glyphicon-triangle-right', 'color: azure;'),
				imagePath = `${imagePrefix}${item.img}`;

			var consumeImage = create_element('img', 'consume-image icon-small', `background-image: url('${imagePath}.jpg')`)
			consumeImage.src = iconBorderPath

			var consumeName = create_element('span', `consume-name q${item.q}`, '', item.n),
				consumeAmountSpan = create_element('span', 'amount', '', consumeAmount),
				materialCollapse = create_element('div', 'materials-list collapse');


			materialCollapse.id = sanitize(item.n)+"_collapse"

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
			expandButton.append(consumeImage, consumeName, document.createTextNode(' ['), consumeAmountSpan, document.createTextNode(']'))
			dataContainer.appendChild(materialCollapse)

			for (let [matIX, matAmountPer] of Object.entries(professionTool.RECIPES.ALL[consumeIX])) {

				var matAmount = (professionTool.CONSUMES[consumeIX]/item.step)*matAmountPer,
					material = professionTool.ITEMS[matIX],
					materialListItem = create_element('div', 'materials-list-item data-container', '', '', {'data-ix': matIX}),
					materialContainer = create_element('span', 'material-container');

				var imagePath = `${imagePrefix}${material.img}`
				var materialImage = create_element('img', 'material-image icon-small', `background-image: url('${imagePath}.jpg')`)

				materialImage.src = `${global.static_url}images/icons/small/icon_border.png`


				var materialName = create_element('span', `material-name q${material.q}`, '', material.n),
					materialAmountSpan = create_element('span', 'amount', '', matAmount);

				materialCollapse.appendChild(materialListItem)

				materialListItem.appendChild(materialContainer)
				materialContainer.append(materialImage, materialName, document.createTextNode(' ['), materialAmountSpan, document.createTextNode(']'))

				if (document.querySelector(`#materials > .data-container[data-ix='${matIX}']`)) {
					document.querySelector(`#materials > .data-container[data-ix='${matIX}'] span.amount`).innerText = professionTool.MATERIALS[matIX]
				} else {
					var materialListCopy = materialListItem.cloneNode(true)
					materialListCopy.querySelector("span.amount").innerText = professionTool.MATERIALS[matIX]
					document.getElementById("materials").appendChild(materialListCopy)
				}
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
	var prev_query_keys = Object.keys(global.STORAGE_ITEMS)
	var item = data
    var ix = item.ix

    if (!prev_query_keys.includes(ix)) {
        global.STORAGE_ITEMS[ix] = item
        if (storageAvailable('localStorage')) {
            localStorage.setItem(ix, JSON.stringify(item));
        }
        prev_query_keys.push(ix)
        console.log(`added ${ix} to localStorage`)
    }
}


function notFoundError(jqXHR, textStatus, errorThrown) {
	notifyUser(`ERROR retrieving saved list: ${errorThrown}`)
	console.log('\n**error**\n')
	console.log(jqXHR)
	console.log(textStatus)
	console.log(errorThrown)
}
function toggleSort(e) {
	var desc = e.target.classList.toggle("desc")
	e.target.classList.toggle("asc", !desc)
	var order = (desc) ? "desc" : "asc"

	monkeyList.monkeyList.sort("recipe-name", {
		order: order
	});
}
var monkeyList = {
	monkeyList: '',
	options: '',
	init: function() {
		this.options = {
			valueNames: [
	            'recipe-name',
				{attr: 'data-ilevel', name: 'ilevel'},
				{attr: 'data-quality', name: 'rarity'},
			],
		};
		this.monkeyList = new List('recipe_list', this.options);
		this.handlers()
	},
	handlers: function() {

		$('.sorting-item').on('click', function(e) {

			var sortBySelection = (e.target.innerText == "Name") ? "recipe-name" : e.target.innerText
			// var selectionText = (sortBySelection.includes("name")) ? "Name" : (sortBySelection.includes("Level")) ? "iLevel" : sortBySelection
			$('#current_sort').text(e.target.innerText)
			var sortingOrder = $("#sorting_order")
			sortingOrder.removeClass('hidden').removeClass('untouchable')
			$('#sorting').addClass("remove-carrat")
			sortingOrder.find("span.glyphicon").removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom")

			monkeyList.monkeyList.sort(sortBySelection.toLowerCase(), {
				order: 'desc'
			});
		});

		var recipe_name_header = document.getElementById("recipe_name_header")

		recipe_name_header.addEventListener("click", toggleSort)



		$('#sorting_order').on('click', function(e) {

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
			monkeyList.monkeyList.sort(sortBySelection, {
				order: sort_order
			});

		});

		$('#search_bar').on('keyup', function() {
			var searchString = $(this).val();
			monkeyList.monkeyList.search(searchString);
		});
	},
	unhandlers: function() {
		$('.sorting-item').unbind()
		$('#sorting_order').unbind()
		$('#sorting').removeClass('remove-carrat')
		$('#sorting_order').addClass('hidden').addClass('untouchable')
		$('#current_sort').text('Sort')
		document.getElementById("recipe_name_header").removeEventListener("click", toggleSort)
	}
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
			removeElements(document.getElementById('list_container'));
			monkeyList.unhandlers()
			updateSelectedProf(prof);
			professionTool.recipeInd = 0;
			getRecipeList(prof);

			updateURL("/profession_tool", prof, document.location.search, {prof:prof})
		}
	})
}

function listInfoHandlers() {

	function checkBoxHandler(e) {
		if (e.target.matches(".check-list")) {
			var table = e.target.closest("table")
			var checked = e.target.checked

			if (e.target.matches(".master")) {

				table.querySelectorAll("tr.t1 .check-list").forEach(elem => {
					if (elem.checked != checked) {
						elem.click()
					}
				})
				return
			}

			var tr = e.target.closest("tr")
			var amountInput = tr.querySelector(".amount-input")
			amountInput.value = (checked) ? amountInput.max : 0
			tr.classList.toggle("obtained", checked)

			if (tr.getAttribute("data-target")) {
				tr.getAttribute("data-target").split(",").forEach(matIX => {
					var elem = table.querySelector(`tr[data-parent="${tr.getAttribute("data-ix")}"][data-ix="${matIX}"] .check-list`)
					if (elem.checked != checked) {
						elem.click()
					}
				})
			}

			if (tr.getAttribute("data-parent")) {
				var parentIX = tr.getAttribute("data-parent")
				var parentRow = tr.closest("table").querySelector(`tr.t1[data-ix="${parentIX}"][data-target]`)
				parentRow.querySelector(".amount-input").value = calculateCrafted(parentIX)

				if (checked == false) {
					e.target.closest("table").querySelector(".master.check-list").checked = false
					table.querySelector(`tr.t1[data-ix="${parentIX}"] .check-list`).checked = false
				} else if (parentRow.querySelector(".check-list").checked != Array.from(table.querySelectorAll(`[data-parent="${parentIX}"]`)).every(elem=>{ return elem.querySelector(".check-list").checked})) {
					parentRow.querySelector(".check-list").click()
				}
			}
		}
		return
	}

	function inputAmountHandler(e) {
		if (e.target.matches(".amount-input")) {
			var table = e.target.closest("table"),
				tr = e.target.closest("tr");

			var checkBox = tr.querySelector(".check-list"),
				ix = tr.getAttribute("data-ix");

			if (e.isTrusted) { //no endless loops pls
				// if child recalc parent
				if (tr.getAttribute("data-parent")) {
                    var parentIX = tr.getAttribute("data-parent")
					var parentElem = table.querySelector(`tr.t1[data-ix="${parentIX}"][data-target] .amount-input`)
					parentElem.value = calculateCrafted(parentIX)
					parentElem.dispatchEvent(new Event('input', { bubbles: true }));
				}

				// if parent recalc children
				if (tr.getAttribute("data-target")) {
					var recipe = professionTool.RECIPES.ALL[ix]

					tr.getAttribute("data-target").split(",").forEach(matIX=>{
						let elem = table.querySelector(`tr[data-parent="${tr.getAttribute("data-ix")}"][data-ix="${matIX}"] .amount-input`)
						elem.value = e.target.value * recipe[matIX] / professionTool.ITEMS[ix].step
						elem.dispatchEvent(new Event('input', { bubbles: true }));
					})

				}
			}

			if (e.target.value == e.target.max) {
				tr.classList.toggle("obtained", true);
				checkBox.checked = true
			} else {
				tr.classList.toggle("obtained", false)
				checkBox.checked = false
			}
		}
		return
	}

	function collapseToggle(e) {
		if (e.target.matches(".check-list, .amount-input")) {
			return
		}

		let tr = e.target.closest("tr")
		tr.classList.toggle("toggled");
		document.querySelectorAll(`.sub-material[data-parent="${tr.getAttribute("data-ix")}"]`).forEach(elem=>{
			elem.classList.toggle("row-collapsed")
		})
	}

	var craftedItemsTable = document.getElementById("crafted_items_table")
	craftedItemsTable.addEventListener("change", checkBoxHandler);
	craftedItemsTable.addEventListener("input", inputAmountHandler);

	var totalMaterialsTable = document.getElementById("total_materials_table")

	totalMaterialsTable.addEventListener("change", checkBoxHandler);
	totalMaterialsTable.addEventListener("input", inputAmountHandler);

	document.querySelectorAll(".collapse-toggle").forEach(elem => {
		elem.addEventListener("click", collapseToggle)
	})

}

function calculateCrafted(ix) {
	var recipe = professionTool.RECIPES.ALL[ix]
	return Math.min(...Array.from(Object.entries(recipe), (item)=>{ return Math.floor(document.querySelector(`tr[data-parent="${ix}"][data-ix="${item[0]}"] .amount-input`).value/item[1])}));
}

function recipeHandlers() {

	var recipeList = document.getElementById('recipe_list')

	recipeList.addEventListener('mouseover', function(e) {
		if (e.target.matches('.recipe-name, .recipe-image, .material-image')) {
			toolTipMouseover(e)
        }
	})

	recipeList.addEventListener('mousemove', function(e) {
		if (e.target.matches('.recipe-name, .recipe-image, .material-image')) {
			tooltip.updateCoords(e)
		}
	})

	recipeList.addEventListener('mouseleave', function(e) {
		tooltip.empty()
	}, true)

	recipeList.addEventListener('mousedown', function(e) {
		if (e.target.matches('.recipe-container, .recipe-image, .recipe-name')) {
			var multiplier = (e.shiftKey) ? 5 : 1
			multiplier = (e.which === 3) ? multiplier * (-1) : multiplier

			var dataContainer = e.target.closest('div.data-container')
			var ix = dataContainer.getAttribute("data-ix")
			var data;

			var step = professionTool.ITEMS[ix].step

			var amount = step * multiplier
			var textAmount = (!professionTool.CONSUMES[ix] && amount <= 0) ? 0 : amount
			updateCraftedAmount(ix, amount)
			combatText(e, textAmount)
		}
		return
	})
}

function sidebarHandlers() {
	var savedConsumeLists = document.getElementById('saved_consume_lists')
	if (savedConsumeLists) {
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
				clearCraftedList()
				getCraftedList(tempurl)
				// professionTool.get.consumeList(tempurl)
				history.pushState(null, null, tempurl)
				return
			}
		});
	}
}

function consumeHandlers() {

	var generateChecklistButton = document.getElementById("generate_checklist")
	generateChecklistButton.addEventListener("click", e=> {
		if (Object.keys(professionTool.CONSUMES).length) {
			updateListInfo()
		}
	})

	var totalsContainer = document.getElementById('totals_container')
	totalsContainer.addEventListener('mouseover', function(e) {
		if (e.target.matches('.consume-image, .material-image, .consume-name, .material-name')) {
			toolTipMouseover(e)
		}
	})

	totalsContainer.addEventListener('mouseleave', function(e) {
		tooltip.empty()
	}, true)


	totalsContainer.addEventListener('mousemove', function(e) {
		if (e.target.matches('.consume-image, .material-image, .consume-name, .material-name')) {
			tooltip.updateCoords(e)
		}
	})


	var consumesListContainer = document.getElementById('consumes')
	consumesListContainer.addEventListener('click', function(e) {
		if (e.target.matches('.add-button, .sub-button')) {
			var multiple = (e.shiftKey) ? 5 : 1

			var dataContainer = e.target.closest('div.data-container')
			var ix = dataContainer.getAttribute("data-ix")
			var step = professionTool.ITEMS[ix].step

			if (e.target.matches('.sub-button')) {
				multiple = multiple * (-1)
			}


			var amount = step*multiple
			// amount = ((amount + professionTool.CONSUMES[ix]) >= 0) ? (amount) : (professionTool.CONSUMES[ix] * -1)

			updateCraftedAmount(ix, amount)
			// professionTool.update.item(ix, multiple, step)
			combatText(e, amount)
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
		var src = `${global.static_url}js/professions/${prof}.min.js`
		addScript(prof, src, scriptLoaded, loadError)

	} else {
		buildRecipeListNew()
	}
}

function updateSelectedProf(prof) {
	var prevSelected = document.querySelectorAll('a.prof-filter.selected')
	if (prevSelected.length) {
		prevSelected[0].classList.remove('selected')
	}
	var selected = document.getElementById(`${prof}`)
	selected.classList.add('selected')
	professionTool.selected = prof
}

function loadError(oError) {
	throw new URIError("The script " + oError.target.src + " didn't load correctly.");
}

function scriptLoaded(prof) {

	professionTool.ITEMS = Object.assign(professionTool.ITEMS, materials)
	professionTool.ITEMS = Object.assign(professionTool.ITEMS, recipes)

	for (let [ix, item] of Object.entries(recipes)) {
		if (item.materials) {
			var newRecipe = Object.fromEntries([[ix, item.materials]]);
			professionTool.RECIPES.ALL = Object.assign(professionTool.RECIPES.ALL, newRecipe)
			// professionTool.RECIPES[prof] = Object.assign(professionTool.RECIPES[prof], newRecipe)
		}
	}

	professionTool.RECIPES[prof] = recipes
	professionTool.ITEMSETS = Object.assign(professionTool.ITEMSETS, itemsets)

	buildRecipeListNew()
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


function createRecipeElement(recipe, ix) {

	var row = create_element('div', 'row')
	var levelReq = (recipe.requirements) ? recipe.requirements.level : 1
	var dataContainer = create_element('div', 'col-7 recipe-container data-container rarity ilevel', '', '', {'data-ix': ix, 'data-quality': recipe.q, 'data-ilevel': levelReq})
	dataContainer.name = recipe.n

	row.appendChild(dataContainer)

	let imagePath = `${global.static_url}images/icons/large/${recipe.img}`

	recipeImage = create_element('img', 'icon-medium recipe-image', '', '', {"data-src": imagePath})
	recipeImage.alt = recipe.n

	dataContainer.appendChild(recipeImage)

	if (recipe.step > 1) {


		let stepContainer = stepCreator(recipe.step)
		dataContainer.appendChild(stepContainer)

	}

	var recipeNameSpan = create_element('span', `recipe-name q${recipe.q}`, '', recipe.n)
	var reagantList = create_element('div', 'col-5 reagent-list')

	dataContainer.appendChild(recipeNameSpan)
	row.appendChild(reagantList)

	for (let [matIX, matStep] of Object.entries(recipe.materials)) {

		var mat = professionTool.ITEMS[matIX]
		var matDataContainer = create_element('div', `reagent-list-container data-container q${mat.q}`, '', '', {'data-ix': matIX})
		matDataContainer.name = mat.n

		reagantList.appendChild(matDataContainer)

		let imagePath = `${global.static_url}images/icons/large/${mat.img}`;

		matImage = create_element('img', 'icon-medium material-image', '', '', {"data-src": imagePath})

		matImage.alt = mat.n
		matDataContainer.appendChild(matImage)

		if (matStep > 1) {
			let stepContainer = stepCreator(matStep)
			matDataContainer.appendChild(stepContainer)
		}
	}

	return row
}

function stepCreator(step) {
	var stepContainer = create_element('span', 'count-container'),
		div1 = create_element('span', 'step-amount', '', `${step}`),
		div2 = create_element('span', 'step-amount', 'color:black; bottom:1px; z-index:4;', step),
		div3 = create_element('span', 'step-amount', 'rgba(0,0,0,.9); bottom:2px; z-index:4;', step),
		div4 = create_element('span', 'step-amount', 'color:black; right:2px; z-index:4;', step);

	stepContainer.append(div1, div2, div3, div4)
	return stepContainer

}
// adds recipes elements to the page
function addRecipes() {

	var recipeListContainer = document.getElementById('list_container');
	for (let [ix, recipe] of Object.entries(professionTool.RECIPES[professionTool.selected])) {
		var row = createRecipeElement(recipe, ix)
		var elemObserver = new IntersectionObserver(showImage, professionTool.observer.config);
		elemObserver.observe(row);
		recipeListContainer.appendChild(row)
	}

	monkeyList.monkeyList.reIndex()
	monkeyList.monkeyList.update()
}

// NOTE: OLD
function buildRecipeList() {
	professionTool.recipeArr = Array.from(Object.entries(professionTool.RECIPES[professionTool.selected]))

	monkeyList.init()
	// TODO: calculate how many recipe elements would fit into the viewport (use dynamic value)
	var viewportSize = 15;
	addRecipes(viewportSize)
}

// NOTE: NEW
function buildRecipeListNew() {
	professionTool.recipeArr = Array.from(Object.entries(professionTool.RECIPES[professionTool.selected]))

	monkeyList.init()
	// TODO: calculate how many recipe elements would fit into the viewport (use dynamic value)
	addRecipes()
}


function showImage(entries, observer) {

	entries.forEach(entry => {
		if (entry.isIntersecting && entry.intersectionRatio > 0) {
			var row = entry.target,
				src = `${global.static_url}images/icon_border_2.png`;

			// load the images
			row.querySelectorAll("img").forEach(image => {
				image.setAttribute("src", src);

				bg = image.getAttribute("data-src");

				if (bg) {
					image.style.backgroundImage = `url('${bg}.jpg')`
				}
			})


			// Stop watching
			observer.unobserve(row);
		}
	})
}

function showElements(entries, observer) {


	for (var i = 0; i < entries.length; i++) {
		var io = entries[i];
		if (io.isIntersecting && io.intersectionRatio > 0) {
			addRecipes(15)
			// Stop watching
			observer.unobserve(io.target);
		}
	}
}

function combatText(e, t){
	let color = null
	var text = t
	if (t > 0) {
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
