$(document).ready(function() {
    index_handlers()
 });

 var monkeyList;
 var user = {auth:false, staff: false, super:false};

 function get_user_info() {
     var data = {}
     $.ajax({
         method: "GET",
         url: '/ajax/user_info/',
         data: data,
         dataType: 'json',
         success: set_user_type,
     });
 }
 function get_saved_lists() {
     var data = {}
     $.ajax({
         method: "GET",
         url: '/ajax/saved_lists/',
         data: data,
         dataType: 'json',
         success: bomberman64,
     });
 }

 function set_user_type(data) {
     user.auth = data.auth
     user.staff = data.staff
     user.super = data.super
     console.log(user)
 }

 function init_list_obj() {
    monkeyList = new List('saved_list_container', {
       valueNames: [
           'name',
           'wowclass',
           'tags',
           'feed-desc',
           {attr: 'data-rating', name: 'rating'},
           {attr: 'data-created', name: 'created'},
       ],
     });
 }

function reset_filters() {
    monkeyList.filter()
}

// hacky function to allow list.js to store an array of tags as values
function tag_list_corrector(listObj) {
    listObj.items.forEach(function(item) {
        item._values.tags = []

        var elem = item.elm
        var tags = $(elem).find("div.tags > div.feed-tag")
        tags.each(function(index) {
            item._values.tags.push($(this).text())
        })

    })
}

 function index_handlers() {
     init_list_obj()
     get_user_info()
     tag_list_corrector(monkeyList)
     get_saved_lists()
     $("#test_form").on({
         submit: e => {
             e.preventDefault()
         }
     });

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

        console.log('filterList: ', filterList)

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

        console.log('matching items: ', monkeyList.matchingItems)

        if (monkeyList.matchingItems.length <= 0) {
            reset_filters()
            $('.no-result').hide()
        }
    });

     $('#search_bar').on('keyup', function() {
         var searchString = $(this).val();
         monkeyList.search(searchString);
     });


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
             reset_filters()

             let tags = $.map($(".filter-selected"), x => x.innerText)

             $('.applied-filter-container').text(tags)
         },
         submit: e => {
             e.preventDefault()
         }
     });

     if (user.auth) {
         star_handler()

         if (user.staff || user.super) {
             $(".flag-item").on({
        	 	click: e=> {
        	 		var $data = {}
        	 		if ($(e.target).attr("data-wowclass")) {
        	 			$data['wow_class'] = $(e.target).attr("data-wowclass")
        	 		}

        	 		$data['uid']= $(e.target).attr('data-uid')
        	 		$data['ix'] = $(e.target).attr('data-ix')

        	 		console.log('data: ', $data)

        	 		$.ajax({
        	 			method: "POST",
        	 			url: '/ajax/flag_list/',
        	 			data: $data,
        	 			success: flag_success,
        	 			error: flag_error,
        	 		})
        	 	}
        	 })

             $("a.remove-rating").on({
                 click: e => {
                     e.preventDefault()
                     var target = $(e.target)

                     var container = target.closest($(".ratings-container"))
                     var id = container.attr("data-id")
                     var wow_class = (container.attr("data-wowclass")) ? container.attr("data-wowclass") : ''

                     var data = {
                         wow_class: wow_class,
                         id: id,
                     }
                     delete_rating(data)

                 }
             })

             function delete_rating(d) {
                 var spec = (d.wow_class) ? true : false
                 var id = d.id
                 $.ajax({
                     method: "POST",
                     url: '/ajax/delete_rating/',
                     data: {
                         'id': id,
                         'spec': spec,
                     },
                     dataType: 'json',
                     success: delete_rating_success
                 });
             }

             function delete_rating_success(data) {
                 notifyUser(data.message)
             }

             function flag_success(data, textStatus, jqXHR) {
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

             function flag_error(jqXHR, textStatus, errorThrown) {
             	notifyUser(errorThrown)
             	console.log('\n**error**\n')
             	console.log(jqXHR)
             	console.log(textStatus)
             	console.log(errorThrown)
             }

         }
     }

 }

 function star_handler() {
     $(".glyphicon-star-empty").on({
         mouseenter: e => {
             var target = $(e.target)
             var empty_stars = target.closest($("div.longbar")).find($(".glyphicon-star-empty"))
             var index = empty_stars.index(target) + 1
             for (var i = 0; i < index; i++) {
                 $(empty_stars[i]).removeClass("glyphicon-star-empty").addClass("glyphicon-star gold")
             }
         },
         mouseleave: e => {
             let target = $(e.target)
             let longbar = target.closest($("div.longbar"))
             let stars = longbar.find($(".glyphicon"))
             stars.removeClass("glyphicon-star gold").addClass("glyphicon-star-empty")
         },
         mousedown: e => {
             // need some sort of confirmation here

             var target = $(e.target)
             let longbar = target.closest($("div.longbar"))
             let stars = longbar.find($(".glyphicon"))
             stars.unbind()
             var rating = longbar.find($(".glyphicon-star")).length
             var container = target.closest($(".ratings-container"))
             var id = container.attr("data-id")
             var wow_class = (container.attr("data-wowclass")) ? container.attr("data-wowclass") : 0
             var data = {
                 wow_class: wow_class,
                 id: id,
                 rating: rating
             }
             rate_saved_list(data)
         }
     });
 }


function rate_saved_list(d) {
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
        success: update_rating,
        error: rating_error,
    });
}

function update_rating(data) {
    //
    var ratings_container;
    if (data.wow_class) {
        ratings_container = $(`div.ratings-container[data-id='${data.id}'][data-wowclass="${data.wow_class}"]`)
    } else {
        ratings_container = $(`div.ratings-container[data-id='${data.id}']`)
    }
    let width = data.average_rating*20

    var star_limiter = ratings_container.find("div.star-limiter")
    star_limiter.css('width', `${width}%`)

    var stars = ratings_container.find($(".glyphicon"))
    stars.unbind()
    stars.removeClass("glyphicon-star-empty").addClass("glyphicon-star")
    ratings_container.find("div.star-box").removeClass("rating-vote")
    ratings_container.find("div.star-bg").removeClass("rating-vote")
    ratings_container.find($(".ratings-count")).text(`(${data.num_ratings})`)

}

function rating_error(data) {
    notifyUser(data.message)
}


function bomberman64(data) {
    var list_container = document.getElementById("saved_list_container")

    console.log('data: ', data)
    return

    data.forEach(function (recipe) {
        var tablerow = create_element('tr')
        var td = create_element('td', 'recipe', "text-align: left;")

        var recipe_container = create_element('div', `recipe-container data-container q${recipe.quality}`)
        var image_name = static_url+`images/icons/large/${recipe.img}.jpg`
        var recipe_img_el = create_element('img', 'icon-medium recipe-image', `background-image: url(${image_name});`)
        recipe_img_el.src = static_url+"images/icon_border_2.png"
        recipe_img_el.addEventListener("mouseover", tooltip_init)
        recipe_img_el.addEventListener("mouseleave", mouseleave_cleanup)

        var ix = document.createAttribute("data-ix");
        ix.value = recipe.ix
        recipe_container.setAttributeNode(ix)

        var recipe_name_el = create_element('span', 'consume-name', 'margin-left: 5px;', recipe.name)

        recipe_name_el.addEventListener("mouseover", tooltip_init)
        recipe_name_el.addEventListener("mouseleave", mouseleave_cleanup)

        recipe_container.appendChild(recipe_img_el)
        recipe_container.appendChild(recipe_name_el)
        td.appendChild(recipe_container)
        tablerow.appendChild(td)

        var mats_td = create_element('td', 'reagant-list')

        recipe.mats.forEach(function (mat) {
            var mat_container = create_element('div', 'data-container', 'display: inline-block;')
            var mat_image_name = static_url+`images/icons/large/${mat.img}.jpg`
            var mat_img = create_element('img', 'icon-medium', `background-image: url(${mat_image_name});`)
            mat_img.addEventListener("mouseover", tooltip_init)
            mat_img.addEventListener("mouseleave", mouseleave_cleanup)


            var mat_ix = document.createAttribute("data-ix");
            mat_ix.value = mat.ix
            mat_container.setAttributeNode(mat_ix)
            mat_img.src = static_url+"images/icon_border_2.png"
            mat_container.appendChild(mat_img)

            if (mat.step > 1) {
                var count_container = create_element('span', 'count-container')
                var div1 = create_element('span', 'material-count', '', mat.step)
                var div2 = create_element('span', 'material-count', 'color:black; bottom:1px; z-index:4;', mat.step)
                var div3 = create_element('span', 'material-count', 'rgba(0,0,0,.9); bottom:2px; z-index:4;', mat.step)
                var div4 = create_element('span', 'material-count', 'color:black; right:2px; z-index:4;', mat.step)
                count_container.appendChild(div1)
                count_container.appendChild(div2)
                count_container.appendChild(div3)
                count_container.appendChild(div4)

                mat_container.appendChild(count_container)
            }

            mats_td.appendChild(mat_container)

        })
        var skillup_td = create_element('td', 'skillup')

        var grey = create_element('span', 'grey-skillup', 'color: #808080; font-weight: bold; margin-left: 5px;', recipe.skillups.grey)
        var green = create_element('span', 'green-skillup', 'color: #40BF40; font-weight: bold; margin-left: 5px;', recipe.skillups.green)
        var yellow = create_element('span', 'yellow-skillup', 'color: #FF0; font-weight: bold; margin-left: 5px;', recipe.skillups.yellow)

        skillup_td.appendChild(yellow)
        skillup_td.appendChild(green)
        skillup_td.appendChild(grey)


        tablerow.appendChild(mats_td)
        tablerow.appendChild(skillup_td)

        tbody.appendChild(tablerow)


    })
}
