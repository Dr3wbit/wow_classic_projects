$(document).ready(function() {
	indexHandlers()
});

var user = { auth: false,
		staff: false,
		super: false
	}, // x
	i = 1,
	monkeyList;

// x
function getUserInfo() {
	var data = {}
	$.ajax({
		method: "GET",
		url: '/ajax/user_info/',
		data: data,
		dataType: 'json',
		success: setUserType,
	});
}

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

// x
function setUserType(data) {
	user.auth = data.auth
	user.staff = data.staff
	user.super = data.super
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
	perPage: '',
	pages: '',
	init: function(itemsPerPage = 5, listObj = monkeyList, container, options = {}) {
		// TODO: store per-page preference in localStorage
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
		this.list.update()
	},
	writePageNavs: function(options = {}) {
		this.currentPage = 1
		var self = this
		for (var n = 0; n < this.pages; n++) {

			var x = n + 1,
				pageLink = create_element('a', 'page-nav navlink', '', x);

			pageLink.href = ""

			if (x == self.currentPage) {
				pageLink.classList.add('active')
			}
			pageLink.addEventListener('click', function(e) {
				e.preventDefault()
				self.changePage(e)
			});
			this.container.appendChild(pageLink)
		}

		this.nextPageCheck()
		this.prevPageCheck()

	},
	nextPageCheck: function() {
		var elem = document.getElementsByClassName('page-nav next-page'),
			self = this;
		if ((elem.length == 0) && (this.currentPage != this.pages)) {
			var nextPageLink = create_element('a', 'page-nav next-page navlink', '', "»"); //"&raquo;"
			nextPageLink.href = ""
			nextPageLink.addEventListener('click', function(e) {
				e.preventDefault()
				self.changePage(e, {
					nextPage: true
				})
			});
			this.container.appendChild(nextPageLink)
		} else if ((elem.length) && (this.currentPage == this.pages)) {
			elem.item(0).remove()
		}
	},
	prevPageCheck: function() {
		var elem = document.getElementsByClassName('page-nav prev-page'),
			self = this;
		if ((elem.length == 0) && (this.currentPage != 1)) {
			var prevPageLink = create_element('a', 'page-nav prev-page navlink', '', "«"); //"&laquo;"
			prevPageLink.href = ""
			prevPageLink.addEventListener('click', function(e) {
				e.preventDefault()
				self.changePage(e, {
					prevPage: true
				})
			});
			this.container.insertBefore(prevPageLink, this.container.firstElementChild)
		} else if ((elem.length) && (this.currentPage == 1)) {
			elem.item(0).remove()
		}
	},
	changePage: function(e, options = {}) {
		this.currentPage = (options['nextPage']) ? this.currentPage + 1 : (options['prevPage']) ? this.currentPage - 1 : parseInt(e.target.innerText)


		var activeNavs = document.querySelectorAll('.page-nav.active')

		if (activeNavs.length) {
			activeNavs[0].classList.toggle('active')
		}

		var pageNumberNavs = document.querySelectorAll('a.page-nav:not(.prev-page):not(.next-page)')
		pageNumberNavs[this.currentPage - 1].classList.add('active')
		var start = ((this.currentPage - 1) * this.list.page) + 1
		this.list.show(start, this.list.page)

		this.prevPageCheck()
		this.nextPageCheck()

		if (this.currentPage <= 1) {
			this.currentPage = 1
			return false
		} else if (this.currentPage >= this.pages) {
			this.currentPage = this.pages
			return false
		}

	},
	removePageNavs: function(options = {}) {
		this.list.i = 1
		var pageNavs = document.querySelectorAll('a.page-nav')
		for (var i = 0; i < pageNavs.length; i++) {
			pageNavs[i].remove()
		}
	},
	resetPageNavs: function(options = {}) { //for convenience
		this.removePageNavs()
		this.writePageNavs()
	},
	postFilter: function(options = {}) {
		paginate.updateVars()
		paginate.resetPageNavs()
	}
}

// hacky function to allow list.js to store an array of tags as values
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
	getUserInfo()
	getSavedLists()


	var selectionHeader = document.querySelector('.selection-header')

	selectionHeader.addEventListener('click', e=>{
		// e.stopPropagation()
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
            paginate.updateVars({
                perPage: itemsPerPage
            })
            paginate.resetPageNavs()
            monkeyList.update()
        } else if (target.matches('.sorting-item')){

            var sortBySelection = target.innerText,
                sorting = document.getElementById('sorting'),
                sortOrder = document.getElementById('sorting_order');

            sorting.innerText = sortBySelection

            sortOrder.classList.remove('hidden','untouchable')

            // var glyphicon = sortOrder.querySelector('span.glyphicon')
            // glyphicon.classList.replace('glyphicon-triangle-top', 'glyphicon-triangle-bottom')

			var glyphicon = sortOrder.closest('span.glyphicon')
            glyphicon.classList.replace('glyphicon-triangle-top', 'glyphicon-triangle-bottom')

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

function deleteRatingComplete(response) {
	var data = response.responseJSON
	var container = $(`.saved-list-item[data-ix='${data.ix}'][data-uid='${data.uid}']`);
	var stars = container.find($('div.star-bg > div.longbar > span.glyphicon-star, div.star-limiter > div.longbar > span.glyphicon-star'))
	stars.removeClass("glyphicon-star gold").addClass("glyphicon-star-empty")

	stars.bind({
		'mouseenter': star.mouseenter,
		'mouseleave': star.mouseleave,
		'mousedown': star.mousedown
	});

	var starLimiter = container.find($('div.star-limiter'))
	starLimiter.css('width', `${data.average_rating}%`)
	var ratingsCount = container.find($("span.ratings-count"))
	ratingsCount.remove('a')
	ratingsCount.text(`(${data.num_ratings})`)
}

function deleteRatingSuccess(data) {
	notifyUser(data.message)
}

function flagSuccess(data, textStatus, jqXHR) {
	let uid = data.uid.toString()
	let ix = data.ix.toString()

	let list_item = $(`.saved-list-item[data-ix='${ix}'][data-uid='${uid}']`);

	list_item.hide(800, function() {
		$(this).remove()
	})

	let message = data.message.toString()
	notifyUser(message)
	console.log('\n**success**\n')
	console.log(data.message.toString())
	console.log('data: ', data)
	console.log('status: ', textStatus)
	console.log(jqXHR)
}

function flagError(jqXHR, textStatus, errorThrown) {
	notifyUser(errorThrown)
	console.log('\n**error**\n')
	console.log(jqXHR)
	console.log(textStatus)
	console.log(errorThrown)
}

function flagHandlers() {

    var savedListContainer = document.getElementById('saved_list_container')

    savedListContainer.addEventListener('click', e=>{
        var target = e.target,
            container = e.target.closest('.saved-list-item');

        var wowClass = (container.getAttribute('data-wowclass')) ? container.getAttribute('data-wowclass') : '',
            id = container.getAttribute('data-ix'),
            uid = container.getAttribute('data-uid');

        var data = {
            ix: id,
            uid: uid
        }

        if (wowClass) {
            data['wow_class'] = wowClass
        }

        if (target.matches('.flag-item')) {
            $.ajax({
				method: "POST",
				url: '/ajax/flag_list/',
				data: data,
                dataType: 'json',
				success: flagSuccess,
				error: flagError,
			});

        } else if (target.matches('a.remove-rating')) {
            $.ajax({
        		method: "POST",
        		url: '/ajax/delete_rating/',
        		data: data,
        		dataType: 'json',
        		success: deleteRatingSuccess,
        		complete: deleteRatingComplete
        	});
        }
    });
}

// x
function ratingRemover(e) {
	e.preventDefault()
	var target = $(e.target)
	var container = target.closest($(".saved-list-item"))
	var id = container.attr("data-ix")
	var wow_class = (container.attr("data-wowclass")) ? container.attr("data-wowclass") : ''

	var data = {
		wow_class: wow_class,
		id: id,
	}
	deleteRating(data)
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

	var star_limiter = container.find("div.star-limiter")
	star_limiter.css('width', `${width}%`)

	var stars = container.find($(".glyphicon"))
	stars.unbind()
	stars.removeClass("glyphicon-star-empty").addClass("glyphicon-star")
	container.find("div.star-box").removeClass("rating-vote")
	container.find("div.star-bg").removeClass("rating-vote")
	var ratingsCount = container.find($("span.ratings-count"))

	if (user.super || user.staff) {
		ratingsCount.text('')
		var ratingRemoverLink = create_element('a', "remove-rating", '', `(${data.num_ratings})`)
		ratingRemoverLink.href = ''
		ratingRemoverLink.addEventListener('click', ratingRemover)
		ratingsCount.append(ratingRemoverLink)
	} else {
		ratingsCount.text(`(${data.num_ratings})`)
	}
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
		var savedListURL = (hasWoWClass) ? `/talent_calc/${savedList.wow_class}?${savedList.hash}` : `/profession_tool?${savedList.hash}`

		var listItem = create_element('div', 'col-12 saved-list-item')
		listContainer.appendChild(listItem)

        if (user.staff || user.super) {
            var dataUID = document.createAttribute("data-uid");
            dataUID.value = savedList.uid
            listItem.setAttributeNode(dataUID)
        }

		var dataIX = document.createAttribute("data-ix");
		dataIX.value = savedList.ix
		listItem.setAttributeNode(dataIX)

		// if (hasWoWClass) {
		//     var wowClass = document.createAttribute("data-wowclass");
		//     wowClass.value = savedList.wow_class
		//     listItem.setAttributeNode(wowClass)
		// }

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
		var starBoxBackground = create_element('div', 'star-bg rating-vote')
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

		if (savedList.voted && (user.staff || user.super)) {
			var ratingsCountElem = create_element('a', 'remove-rating', '', `(${savedList.ratings_count})`)
			ratingsCountElem.href = ""
		} else {
			var ratingsCountElem = create_element('span', '', '', `(${savedList.ratings_count})`)
		}

		ratingsCount.append(ratingsCountElem)

		var createdBy = create_element('span', '', '', 'Created by ')
		dateCreatedContainer.appendChild(createdBy)

		var createdByUser = create_element('a', '', '', savedList.disc_username)
		createdByUser.href = ''
		createdByUser.addEventListener('click', function(e) {
			e.preventDefault()
		})

		dateCreatedContainer.appendChild(createdByUser)
		var dateTime = new Date(savedList.created)

		var createdOn = create_element('span', 'created', '', ` on ${dateTime.toLocaleString()}`)
		dateCreatedContainer.appendChild(createdOn)

		var dataCreated = document.createAttribute("data-created");
		dataCreated.value = dateTime.valueOf()
		createdOn.setAttributeNode(dataCreated)

		if (user.staff || user.super) {
			var flagButton = create_element('button', 'btn btn-sm float-right flag-item')
			dateCreatedContainer.appendChild(flagButton)

			flagButton.title = 'Flag'
			flagButton.type = 'Button'

			var spanGlyph = create_element('span', 'glyphicon glyphicon-flag untouchable')
			flagButton.appendChild(spanGlyph)
		}


	})

	// x
	if (user.auth) {
		starHandler()
		if (user.staff || user.super) {
			flagHandlers()
		}
	}
}
