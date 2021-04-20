$(document).ready(function() {
	indexHandlers()
});

var monkeyList;

function getSavedLists() {
	var data = {}
	$.ajax({
		method: "GET",
		url: '/ajax/saved_lists/',
		data: data,
		dataType: 'json',
		success: loadSavedLists,
		complete: initListObj,
	});
}

function initListObj(response) {

	var listOptions = {
		valueNames: [
            'name', 'wowclass', 'tags', 'feed-desc',
			{attr: 'data-rating', name: 'rating'},
			{attr: 'data-created', name: 'created' },
         ],
	};

	monkeyList = new List('saved_list_container', listOptions);
	tagListCorrector(monkeyList)
	paginate.init(3, monkeyList, document.getElementById('pagination_container'))

	monkeyList.on('filterComplete', function() {
		paginate.postFilter();
	});

	monkeyList.on('searchComplete', function() {
		paginate.postFilter();
	});
}

var paginate = {
	list: '',
	container: '',
	currentPage: 1,
	navsShown: 5,
	pages: '',
	pageRange: {start:0, end:0},
	perPage: '',
	init: function(itemsPerPage = 5, listObj = monkeyList, container, options = {}) {
		// TODO: store per-page preference in localStorage
		this.removePageNavs()
		this.list = listObj
		this.container = container
		this.perPage = itemsPerPage
		this.list.pagination = true

		this.updateVars()
		this.writePageNavs()
	},
	updateVars: function(options = {}) {
		for (let [key, val] of Object.entries(options)) {
			this[key] = val
		}
		this.list.page = this.perPage
		this.pages = Math.ceil(this.list.matchingItems.length / this.perPage)

		let navsPer = Math.floor((this.container.offsetWidth - 48) / 11)
		this.navsShown = (navsPer <= this.pages) ? navsPer : this.pages;

		this.pageRange.start = this.currentPage
		this.pageRange.end = (this.pageRange.start + this.navsShown <= this.pages) ? this.pageRange.start + this.navsShown : this.pages;

		this.list.update()
	},
	writePageNavs: function(options = {}) {

		let firstPageLink = create_element('a', 'page-nav first-page navlink', '', "«"), //"&laquo;"
			prevPageLink = create_element('a', 'page-nav prev-page navlink', '', "❮"),
			nextPageLink = create_element('a', 'page-nav prev-page navlink', '', "❯"),
			lastPageLink = create_element('a', 'page-nav last-page navlink', '', "»"); //"&raquo;"

		firstPageLink.addEventListener('click', function(e) {
			e.preventDefault()
			paginate.changePage(e, 'firstPage')
		});
		prevPageLink.addEventListener('click', function(e) {
			e.preventDefault()
			paginate.changePage(e, 'prevPage')
		});
		nextPageLink.addEventListener('click', function(e) {
			e.preventDefault()
			paginate.changePage(e,'nextPage')
		});
		lastPageLink.addEventListener('click', function(e) {
			e.preventDefault()
			paginate.changePage(e, 'lastPage')
		});

		this.container.append(firstPageLink, prevPageLink)

		let i = this.pageRange.start,
			end = this.pageRange.end;

		for (i; i <= end; i++) {

			let pageLink = create_element('a', 'page-nav navlink', '', i);
			if (i == paginate.currentPage) {
				pageLink.classList.toggle('active', true)
			}
			pageLink.addEventListener('click', function(e) {
				e.preventDefault()
				if (!e.target.matches(".active")) {
					paginate.changePage(e)
				}
			});
			this.container.append(pageLink)
		}
		this.container.append(nextPageLink, lastPageLink)
	},
	updatePageRange: function() {
		let width = this.container.offsetWidth
		let navsPer = Math.floor((width - 48) / 11);
		this.navsShown = (navsPer <= this.pages) ? navsPer : this.pages;
		let pageNavShownMedian = Math.floor(this.navsShown / 2)

		if (this.currentPage >= this.pageRange.end) {
			this.pageRange.end = (this.currentPage + pageNavShownMedian <= this.pages) ? this.pageRange.end + pageNavShownMedian : this.pages;
			this.pageRange.start = (this.pageRange.end - this.navsShown > 0) ? this.pageRange.end - this.navsShown : 1
		}
		else if (this.currentPage <= this.pageRange.start) {
			this.pageRange.start = (this.currentPage - pageNavShownMedian >= 1) ? this.currentPage - pageNavShownMedian : 1;
			this.pageRange.end = (this.pageRange.start + this.navsShown <= this.pages) ? this.pageRange.start + this.navsShown : this.pages
		}
	},

	changePage: function(e, option = '') {

		switch (option) {
			case 'prevPage':
				paginate.currentPage = (paginate.currentPage > 1) ? paginate.currentPage - 1 : 1
				break;
			case 'nextPage':
				paginate.currentPage = (paginate.currentPage < paginate.pages) ? paginate.currentPage + 1 : paginate.pages
				break;
			case 'lastPage':
				paginate.currentPage = paginate.pages;
				break;
			case 'firstPage':
				paginate.currentPage = 1;
				break;
			default:
				paginate.currentPage = parseInt(e.target.innerText)
		}

		paginate.updatePageRange()

		document.querySelectorAll('.page-nav.active').forEach(nav=>{
			nav.classList.toggle('active', false)
		})

		let start = ((this.currentPage - 1) * this.list.page) + 1
		this.list.show(start, this.list.page)

		this.resetPageNavs()

	},
	removePageNavs: function(options = {}) {
		this.list.i = 1
		document.querySelectorAll('#pagination_container > a.page-nav').forEach(pageNav => {
			pageNav.remove()
		})
	},
	resetPageNavs: function(options = {}) { //for convenience
		this.removePageNavs()
		this.writePageNavs()
	},
	postFilter: function(options = {}) {
		paginate.currentPage = 1
		paginate.updateVars()
		paginate.updatePageRange()
		paginate.resetPageNavs()
	}
}

// hack fix for storing array of tags as values for list.js lookups
function tagListCorrector(listObj) {
	listObj.items.forEach(function(item) {
		item._values.tags = []

		var elem = item.elm
		var tags = $(elem).find("div.tags > div.feed-tag")
		tags.each(function(index) {
			item._values.tags.push($(this).text())
		})
	})
}

function indexHandlers() {
	getSavedLists()


	var selectionHeader = document.querySelector('.selection-header')

	selectionHeader.addEventListener('click', e=>{
        var target = e.target
		if (target.matches('.filter-box')) {

			target.classList.toggle('filter-selected');
            var filterValue = target.getAttribute('name')
			var filterList = {};

			document.querySelectorAll('.filter-selected').forEach(item=>{
				var category = item.closest('.filter-container').getAttribute('name'),
                    name = item.getAttribute('name');

				if (!Object.keys(filterList).includes(category)) {
                    filterList[category] = []
                }
                filterList[category].push(name)
			});

            monkeyList.filter(function(item) {
    			var truth = false
    			Object.keys(filterList).forEach(function(category) {
    				var itemArr = Array.isArray(item.values()[category]) ? item.values()[category] : [item.values()[category]]
    				itemArr.forEach(function(filterValue) {
    					if (filterList[category].includes(filterValue)) {
    						truth = true
    						return
    					} else {
    						return
    					}
    				})

    			});
    			return truth
    		});

            if (monkeyList.matchingItems.length <= 0) {
    			monkeyList.filter()
    		}
            e.stopPropagation()
		} else if (target.matches('.items-per-page')){
            var itemsPerPage = parseInt(target.innerText)
			paginate.currentPage = 1
            paginate.updateVars({
                perPage: itemsPerPage
            })
            paginate.resetPageNavs()
            monkeyList.update()
        } else if (target.matches('.sorting-item')){

            var sortBySelection = target.innerText,
                sorting = document.getElementById('sorting'),
                sortOrder = document.getElementById('sorting_order');

            sorting.innerText = sortBySelection;

            sortOrder.classList.remove('hidden','untouchable');

			var glyphicon = sortOrder.querySelector('span.glyphicon');
            glyphicon.classList.replace('glyphicon-triangle-top', 'glyphicon-triangle-bottom');

            monkeyList.sort(sortBySelection.toLowerCase(), {
                order: 'desc'
            });
        } else if (target.matches('#sorting_order')){

            var glyphTriangle = target.querySelector('span.glyphicon'),
                sortBySelection = document.getElementById('sorting').innerText.toLowerCase(),
                sortOrder = 'desc';


            if (glyphTriangle.classList.contains('glyphicon-triangle-bottom')) {
                glyphTriangle.classList.replace('glyphicon-triangle-bottom', 'glyphicon-triangle-top')
                sortOrder = 'asc'
            } else {
                glyphTriangle.classList.replace('glyphicon-triangle-top', 'glyphicon-triangle-bottom')
            }

            monkeyList.sort(sortBySelection, {
                order: sortOrder
            });

        } else if (target.matches('#reset_filters')) {
            document.querySelectorAll('.filter-selected').forEach(elem=>{
                elem.classList.remove('filter-selected')
            })
            monkeyList.filter()
        }

	});

    var resetFilters = document.getElementById('reset_filters')
    resetFilters.addEventListener('submit', e=>{
        e.preventDefault()
    })

    var searchBar = document.getElementById('search_bar')
    searchBar.addEventListener('keyup', e=>{
        monkeyList.search(e.target.value);
    });

	var mouseEnterEvent = new MouseEvent('mouseenter', {
		'view': window, 'bubbles': false, 'cancelable': true
	});
	var mouseLeaveEvent = new MouseEvent('mouseleave', {
		'view': window, 'bubbles': false, 'cancelable': true
	})

	var sorting = document.getElementById('sorting')
	var sortingOrder = document.getElementById('sorting_order')

	sortingOrder.addEventListener('mouseenter', e=>{
		e.target.closest('.secondary-navbar-item').style.backgroundColor = '#222222'

	})

	sortingOrder.addEventListener('mouseleave', e=>{
		e.target.closest('.secondary-navbar-item').style.backgroundColor = 'initial'

	})


	sorting.addEventListener('mouseenter', e=>{
		sortingOrder.dispatchEvent(mouseEnterEvent)
	})
	sorting.addEventListener('mouseleave', e=>{
		sortingOrder.dispatchEvent(mouseLeaveEvent)
	})

	window.addEventListener("orientationchange", e=>{
		window.setTimeout(function() {
			paginate.updateVars()
			paginate.updatePageRange()
	  		paginate.resetPageNavs()
		}, 250);
	});

	searchBar.addEventListener("blur", e=> {
		if (!e.target.value) {
			searchBar.classList.toggle("show", false)
		}
	})

	document.getElementById("search_bar_trigger").addEventListener("click", e=>{
		document.getElementById("search_bar").classList.toggle("show", true)
		document.getElementById("search_bar").focus()
	})

}

function deleteRating(d) {
	var data = {
		id: d.id,
		wow_class: d.wow_class
	}
	$.ajax({
		method: "POST",
		url: '/ajax/delete_rating/',
		data: data,
		dataType: 'json',
		success: deleteRatingSuccess,
		complete: deleteRatingComplete
	});
}


// x
function ratingSubmitted(response) {
	var msg = response.responseJSON.message
	notifyUser(msg)
}

// x
function updateRating(data) {
	var container;
	if (data.wow_class) {
		container = $(`div.saved-list-item[data-ix='${data.id}'][data-wowclass="${data.wow_class}"]`)
	} else {
		container = $(`div.saved-list-item[data-ix='${data.id}']`)
	}
	let width = data.average_rating * 20

	let star_limiter = container.find("div.star-limiter")
	star_limiter.css('width', `${width}%`)

	let stars = container.find($(".glyphicon"))
	stars.unbind()
	stars.removeClass("glyphicon-star-empty").addClass("glyphicon-star")
	container.find("div.star-box").removeClass("can-vote")
	container.find("div.star-bg").removeClass("can-vote")
	let ratingsCount = container.find($("span.ratings-count"))

	ratingsCount.text(`(${data.num_ratings})`)

}

// x
function ratingError(data) {
	notifyUser(data.message)
}

// x
function starHandler() {
	$(".glyphicon-star-empty").on({
		mouseenter: star.mouseenter,
		mouseleave: star.mouseleave,
		mousedown: star.mousedown
	});
}

// x
var star = {
	mouseenter: function(e) {
		var target = $(e.target)
        // var emptyStars = target.closest('div.longbar').querySelector('.glyphicon-star-empty')
        // var index = emptyStars

		var empty_stars = target.closest($("div.longbar")).find($(".glyphicon-star-empty"))
		var index = empty_stars.index(target) + 1
		for (var i = 0; i < index; i++) {
			$(empty_stars[i]).removeClass("glyphicon-star-empty").addClass("glyphicon-star gold")
		}
	},
	mouseleave: function(e) {
		let target = $(e.target)
		let longbar = target.closest($("div.longbar"))
		let stars = longbar.find($(".glyphicon"))
		stars.removeClass("glyphicon-star gold").addClass("glyphicon-star-empty")
	},
	mousedown: function(e) {
		var target = $(e.target)
		let longbar = target.closest($("div.longbar"))

		let stars = longbar.find($(".glyphicon"))

		stars.unbind()
		var rating = longbar.find($(".glyphicon-star")).length
		var container = target.closest($(".saved-list-item"))
		var id = container.attr("data-ix")
		var wow_class = (container.attr("data-wowclass")) ? container.attr("data-wowclass") : ''

		var data = {
			id: id,
			rating: rating
		}

        if (wow_class) {
            data['wow_class'] = wow_class
        }

        $.ajax({
    		method: "POST",
    		url: '/ajax/save_rating/',
    		data: data,
    		dataType: 'json',
    		success: updateRating,
    		error: ratingError,
    		complete: ratingSubmitted
    	});

	}
}

function loadSavedLists(data) {
	var imagePrefix = `${global.static_url}images/icons/large/`
	var savedListContainer = document.getElementById("saved_list_container")
	var listContainer = document.getElementById("list_object")

	var iconBorderPath = `${global.static_url}images/icon_border_2.png`

	data.saved_lists.forEach(function(savedList) {
		var hasWoWClass = (savedList.wow_class) ? true : false
		var savedListType = (hasWoWClass) ? 'spec' : 'cl'
		var savedListURL = (hasWoWClass) ? `/talent_calc/${savedList.wow_class.toLowerCase()}?u=${savedList.uid}&${savedList.hash}` : `/profession_tool?${savedList.hash}`

		var listItem = create_element('div', 'col-12 saved-list-item', '', '', {"data-ix":savedList.ix})
		if (hasWoWClass) {
			listItem.setAttribute("data-wowclass", savedList.wow_class)
		}
		listContainer.appendChild(listItem)


		var feedItem = create_element('div', 'feed-item row mt-5')
		listItem.appendChild(feedItem)

		var col = create_element('div', 'col')
		feedItem.appendChild(col)

		var imageSuffix = (hasWoWClass) ? (savedList.wow_class).toLowerCase() : 'profession_tool_image'
		var imagePath = `${imagePrefix}mini_spec/${imageSuffix}.png`
		var imageStyle = `background-image: url('${imagePath}')`

		var listImageContainer = create_element('div', 'list-image', imageStyle)
		col.appendChild(listImageContainer)

		var listIconContainer = create_element('div', 'list-icon untouchable')
		listImageContainer.appendChild(listIconContainer)

		var listIconStyle = `background-image: url('${imagePrefix}${savedList.img}')`
		var listIcon = create_element('img', 'class-icon', listIconStyle)
		listIcon.src = iconBorderPath
		listIconContainer.appendChild(listIcon)

		var iconLink = create_element('a', '', 'position:absolute; height:125px; width:180px;')
		iconLink.href = savedListURL
		listImageContainer.appendChild(iconLink)

		var row = create_element('div', 'row')
		col.appendChild(row)

		var descTitleTagsContainer = create_element('div', 'col-md-8 col-12')
		feedItem.appendChild(descTitleTagsContainer)

		var fakeHeader = create_element('div', 'row feed-header')
		descTitleTagsContainer.appendChild(fakeHeader)

		var titleContainer = create_element('div', 'row feed-content')
		descTitleTagsContainer.appendChild(titleContainer)

		feedTitle = create_element('div', 'col-8 feed-title')
		titleContainer.appendChild(feedTitle)

		var col4 = create_element('div', 'col-4')
		titleContainer.appendChild(col4)

		var titleLink = create_element('a')
		titleLink.href = savedListURL
		feedTitle.appendChild(titleLink)

		var titleSpan = create_element('span', 'name', '', savedList.name)
		titleLink.appendChild(titleSpan)

		var descriptionCont = create_element('div', 'row feed-content')
		descTitleTagsContainer.appendChild(descriptionCont)

		var feedDescription = create_element('div', 'col-12 feed-desc', '', savedList.description)
		descriptionCont.appendChild(feedDescription)

		var dividerElem = create_element('div', 'row feed-content')
		descTitleTagsContainer.appendChild(dividerElem)

		var lineElement = create_element('hr', 'm-2', 'border-bottom:1px solid white; width:100%; margin-top:0; margin-bottom:0;')
		dividerElem.appendChild(lineElement)

		var tagsContainer = create_element('div', 'row tags feed-content')
		descTitleTagsContainer.appendChild(tagsContainer)

		savedList.tags.forEach(function(tag) {
			var tagElem = create_element('div', 'feed-tag', '', tag)
			tagsContainer.appendChild(tagElem)
		})

		var emptyRow = create_element('div', 'row feed-content')
		descTitleTagsContainer.appendChild(emptyRow)

		var feedFooter = create_element('div', 'col-12 row feed-footer')
		feedItem.appendChild(feedFooter)

		var wowClassFooter = create_element('div', 'col-md-4 col-12')
		var ratingContainer = create_element('div', 'col-md-3 col-12')
		var dateCreatedContainer = create_element('div', 'col-md-5 col-12 text-left')

		feedFooter.appendChild(wowClassFooter)
		feedFooter.appendChild(ratingContainer)
		feedFooter.appendChild(dateCreatedContainer)

		if (hasWoWClass) {
			var wowClassName = create_element('span', `wowclass ${savedList.wow_class.toLowerCase()}`, '', `${savedList.wow_class}`)
			var talentPoints = create_element('span', '', 'font-size:90%;', ` ${savedList.spec}`)

			wowClassFooter.appendChild(wowClassName)
			wowClassFooter.appendChild(talentPoints)
		}

		var ratingContainerJr = create_element('div', 'ratings-container mx-auto')
		ratingContainer.appendChild(ratingContainerJr)

		var starBoxRating = create_element('div', 'star-box rating')

		var starBoxBackground = (savedList.can_vote) ? create_element('div', 'star-bg can-vote') : create_element('div', 'star-bg');
		var ratingsCount = create_element('span', `ratings-count ${savedListType}`)

		ratingContainerJr.append(starBoxRating)
		ratingContainerJr.append(starBoxBackground)
		ratingContainerJr.append(ratingsCount)

		var dataRating = document.createAttribute("data-rating");
		dataRating.value = savedList.rating
		starBoxRating.setAttributeNode(dataRating)

		var width = (savedList.can_vote) ? 0 : savedList.rating * 20
		var starLimiter = create_element('div', 'star-limiter', `width: ${width}%`)
		starBoxRating.appendChild(starLimiter)

		var longBar = create_element('div', 'longbar')
		starLimiter.appendChild(longBar)

		var starClass = 'glyphicon glyphicon-star'
		if (savedList.can_vote) {
			starClass = 'glyphicon glyphicon-star-empty'
		}
		var starGlyphIcon = create_element('span', starClass)
		longBar.appendChild(starGlyphIcon)

		for (i = 0; i < 4; i++) {
			var starGlyphDupe = starGlyphIcon.cloneNode()
			longBar.appendChild(starGlyphDupe)
		}

		var longBarDupe = longBar.cloneNode(true)
		starBoxBackground.appendChild(longBarDupe)


		var ratingsCountElem = create_element('span', '', '', `(${savedList.ratings_count})`)

		ratingsCount.append(ratingsCountElem)

		var createdBy = create_element('span', '', '', "Created by ")
		var userNameSpan = create_element('span', 'fix-me', '', savedList.username)

		dateCreatedContainer.append(createdBy, userNameSpan)
		var dateTime = new Date(savedList.created)

		var createdOn = create_element('span', 'created', '', ` on ${dateTime.toLocaleString()}`)
		dateCreatedContainer.appendChild(createdOn)

		var dataCreated = document.createAttribute("data-created");
		dataCreated.value = dateTime.valueOf()
		createdOn.setAttributeNode(dataCreated)
	})

	starHandler()
}
