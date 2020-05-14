$(document).ready(function() {
    indexHandlers()
 });

 var monkeyList;
 var user = {auth:false, staff: false, super:false},
     i = 1,
     currentPage = 1;

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
         success: savedListBuilder,
         complete: initListObj,
     });
 }

 function setUserType(data) {
     user.auth = data.auth
     user.staff = data.staff
     user.super = data.super
 }

 function initListObj(response) {

     // var page = 3
     var listOptions = {
         valueNames: [
             'name',
             'wowclass',
             'tags',
             'feed-desc',
             { attr: 'data-rating', name: 'rating' },
             { attr: 'data-created', name: 'created' },
         ],
    };


    monkeyList = new List('saved_list_container', listOptions);
    tagListCorrector(monkeyList)

    paginate.init(3, monkeyList, document.getElementById('pagination_container'))
 }

var paginate = {

    init: function(per=5, listObj=monkeyList, parentElem, options) {

        // TODO: store per-page preference in localStorage
        var paginationCont = parentElem,
            pages = Math.ceil(listObj.items.length/per),
            self = this,
            x;

        for (var n = 0; n < pages; n++) {
            x = n+1

            var nextPageBtn = document.querySelector('a.page-nav.next-page')
            var pageLink = create_element('a', 'page-nav', '', x)
            pageLink.href = ""

            if (x == 1) {
                pageLink.classList.add('active')
            }

            pageLink.addEventListener('click', function(e) {
                e.preventDefault()
                self.changePage(e, listObj)
            });
            nextPageBtn.insertAdjacentElement('beforebegin', pageLink)
        }

        this.update(listObj, per)
    },
    update: function(listObj, per=5, options) {
        listObj.page = per
        listObj.pagination = true
        listObj.update()
    },
    changePage: function(e, listObj) {
        // e.preventDefault()
        document.getElementsByClassName('page-nav active')[0].classList.remove('active')
        e.target.classList.add('active')
        var n = ((parseInt(e.target.innerText) - 1) * listObj.page ) + 1
        listObj.show(n, listObj.page)
    },

    reset: function(listObj) {
        listObj.i = 1
        var pageNumberNavs = document.getElementsByClassName('page-nav')
        var n = pageNumberNavs.length-1
        for (var i = 1; i < n; i++) {
            var elem = pageNumberNavs[1]
            if ((i != 0) || (i != (n-1))) {
                elem.remove()
            }
        }

    }
}


function resetFilters() {
    monkeyList.filter()
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
     // $("#test_form").on({
     //     submit: e => {
     //         e.preventDefault()
     //     }
     // });


     $('.filter-dropdown-container').on({
         click: e => {
             e.stopPropagation()
         }
     });

     $('.filter-box').on('click', function() {
        var target = $(this),
            val = target.attr('name');

        target.toggleClass('filter-selected');

        var filterList = {};
        $(".filter-selected").each(function(index) {
            var category = $(this).closest(".filter-container").attr("name"),
                name = $(this).attr("name");

            if (!Object.keys(filterList).includes(category)) {
                filterList[category] = []
            }

            filterList[category].push(name)
        });

        monkeyList.filter(function(item) {
            var truth = false
            Object.keys(filterList).forEach(function(category) {
                var itemArr = Array.isArray(item.values()[category]) ? item.values()[category] : [item.values()[category]]
                itemArr.forEach(function(val) {
                    if (filterList[category].includes(val)) {
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
            resetFilters()
            $('.no-result').hide()
        }
    });

     $('#search_bar').on('keyup', function() {
         var searchString = $(this).val();
         monkeyList.search(searchString);
     });

     $('.items-per-page').on('click', function(e) {
         var x = parseInt(this.innerText)
         paginate.reset(monkeyList)
         paginate.init(x)

         console.log('monkeyList: ', monkeyList)

     })

     $('.sorting-item').on('click', function() {
         var sortBySelection = $(this).text()
         $('#sorting').text(sortBySelection)
         var sortingOrder = $("#sorting_order")
         sortingOrder.removeClass("hidden").removeClass("untouchable")
         $('#sorting').addClass("removeCarrat")
         sortingOrder.find("span.glyphicon").removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom")

         monkeyList.sort(sortBySelection.toLowerCase(), {order: 'desc'});


     });

     $("#sorting_order").on('click', function() {
         var glyph_triangle = $(this).find("span.glyphicon")
         var sort_order;
         var sortBySelection = $('#sorting').text().toLowerCase()
         if (glyph_triangle.hasClass("glyphicon-triangle-bottom")) {
             sort_order = 'asc'
             glyph_triangle.removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-top")
         } else {
             sort_order = 'desc'
             glyph_triangle.removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom")
         }
         monkeyList.sort(sortBySelection, {order: sort_order});

     });

     $('#reset_filters').on({
         click: e => {
             $('.filter-selected').removeClass('filter-selected')
             resetFilters()

             let tags = $.map($(".filter-selected"), x => x.innerText)

             $('.applied-filter-container').text(tags)
         },
         submit: e => {
             e.preventDefault()
         }
     });

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

    list_item.hide(800, function () {
        $(this).remove()
    })

    let message = data.message.toString() // <--------------- NOTE: HERE
    notifyUser(message)
    console.log('\n**success**\n')
    console.log(data.message.toString())
    console.log('data: ', data)
    console.log('status: ', textStatus)
    console.log(jqXHR)
    // $myForm.reset(); // reset form data
 }

 function flagError(jqXHR, textStatus, errorThrown) {
    notifyUser(errorThrown)
    console.log('\n**error**\n')
    console.log(jqXHR)
    console.log(textStatus)
    console.log(errorThrown)
 }

function flagHandlers() {
    $(".flag-item").on({
       click: e=> {
           var target = $(e.target)
           var container = target.closest($(".saved-list-item"))

           var wow_class = (container.attr("data-wowclass")) ? container.attr("data-wowclass") : '',
               id = container.attr("data-ix"),
               uid = container.attr("data-uid");

           var data = {
               wow_class: wow_class,
               id: id,
               uid: uid
           }

           $.ajax({
               method: "POST",
               url: '/ajax/flag_list/',
               data: data,
               success: flagSuccess,
               error: flagError,
           })
       }
   });

    $("a.remove-rating").on({
        click: ratingRemover
    });
}

function ratingRemover(e) {
    e.preventDefault()
    var target = $(e.target)
    var container = target.closest($(".saved-list-item"))
    // var container = target.closest($(".ratings-container"))
    var id = container.attr("data-ix")
    var wow_class = (container.attr("data-wowclass")) ? container.attr("data-wowclass") : ''

    var data = {
        wow_class: wow_class,
        id: id,
    }
    deleteRating(data)
}

function rateSavedList(d) {
    var spec = (d.wow_class) ? 1 : 0
    var rating = d.rating
    var id = d.id
    $.ajax({
        method: "POST",
        url: '/ajax/save_rating/',
        data: {
            'value': rating,
            'id': id,
            'spec': spec,
        },
        dataType: 'json',
        success: updateRating,
        error: ratingError,
        complete: ratingSubmitted
    });
}

function ratingSubmitted(response) {
    var msg = response.responseJSON.message
    notifyUser(msg)
}

function updateRating(data) {

    var container;
    if (data.wow_class) {
        container = $(`div.saved-list-item[data-ix='${data.id}'][data-wowclass="${data.wow_class}"]`)
    } else {
        container = $(`div.saved-list-item[data-ix='${data.id}']`)
    }
    let width = data.average_rating*20

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

function ratingError(data) {
    notifyUser(data.message)
}

function starHandler() {
    $(".glyphicon-star-empty").on({
        mouseenter: star.mouseenter,
        mouseleave: star.mouseleave,
        mousedown: star.mousedown
    });
}

var star = {
    mouseenter: function(e) {
        var target = $(e.target)
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
        var wow_class = (container.attr("data-wowclass")) ? container.attr("data-wowclass") : 0
        var data = {
            wow_class: wow_class,
            id: id,
            rating: rating
        }
        rateSavedList(data)
    }
}

function savedListBuilder(data) {
    var imagePrefix = static_url+'images/icons/large/'
    var savedListContainer = document.getElementById("saved_list_container")
    var listContainer = document.getElementById("list_object")

    var iconBorderPath = static_url+'images/icon_border_2.png'

    data.saved_lists.forEach(function (savedList) {
        var hasWoWClass = (savedList.wow_class) ? true : false
        var savedListType = (hasWoWClass) ? 'spec' : 'cl'
        var savedListURL = (hasWoWClass) ? `/tc/${savedList.ix}?${savedList.hash}` : `/pt/${savedList.ix}?${savedList.hash}`

        var listItem = create_element('div', 'col-12 saved-list-item')
        listContainer.appendChild(listItem)

        var dataUID = document.createAttribute("data-uid");
        dataUID.value = savedList.uid
        listItem.setAttributeNode(dataUID)

        var dataIX = document.createAttribute("data-ix");
        dataIX.value = savedList.ix
        listItem.setAttributeNode(dataIX)

        if (hasWoWClass) {
            var wowClass = document.createAttribute("data-wowclass");
            wowClass.value = savedList.wow_class
            listItem.setAttributeNode(wowClass)
        }

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
            var wowClassName = create_element('span', `wowclass ${savedList.wow_class.toLowerCase()}`, '', savedList.wow_class)
            var talentPoints = create_element('span', '', '', savedList.spec)

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

        var width = (savedList.can_vote) ? 0 : savedList.rating*20
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

        for (i=0;i<4;i++) {
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

        var createdOn = create_element('span', 'created', '',  ` on ${dateTime.toLocaleString()}`)
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
    if (user.auth) {
        starHandler()
        if (user.staff || user.super) {
            flagHandlers()
        }
    }
}
