$(document).ready(function() {
	global_event_handlers()
});


function info_display(id, caller) {
	$.ajax({
		type: "POST",
		url: "/ajax/savedlist_info/",
		data: {
			'id':id,
			'caller': caller
		},
		// dataType: 'html',
		success: function (data) {
			$("#saved_list_info").html(data);
		}
	});
}


function global_event_handlers() {


    if (window.innerWidth <= 992) {
        $('.mainBody').css({ 'padding-left': '15px' })
        $('.saved').removeClass('side-min')
        $('.custom-saves').css({ 'display': 'block' })
        $('.side-bar-toggle').removeClass('flip-background')
        $('.mainBody').append($('<div/>', {
            class : "black-out"
        }))
    }
    $(".side-bar-toggle").on({
        click: e => {
            let bool = $('.saved').hasClass('side-min')
            let windowWidth = window.innerWidth
            if (window.innerWidth <= 992) {
                $('.mainBody').css({ 'padding-left': '15px' })
                if (bool) {
                    $('.saved').removeClass('side-min')
                    $('.custom-saves').css({ 'display': 'block' })
                    $('.side-bar-toggle').removeClass('flip-background')
                    $('.mainBody').append($('<div/>', {
                        class : "black-out"
                    }))

                } else {
                    $('.saved').addClass('side-min')
                    $('.custom-saves').css({ 'display': 'none' })
                    $('.side-bar-toggle').addClass('flip-background')
                    $('.black-out').remove()
                }
            } else {
                if (bool) {
                    $('.saved').removeClass('side-min')
                    $('.mainBody').css({ 'padding-left': '265px' })
                    $('.custom-saves').css({ 'display': 'block' })
                    $('.side-bar-toggle').removeClass('flip-background')
                    $('.black-out').remove()

                } else {
                    $('.saved').addClass('side-min')
                    $('.mainBody').css({ 'padding-left': '15px' })
                    $('.custom-saves').css({ 'display': 'none' })
                    $('.side-bar-toggle').addClass('flip-background')
                    $('.black-out').remove()
                }
            }

        }
    });

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


    // $(".trashcan").on({
    //     click: e => {
    //         e.stopPropagation()
    //         var $data = {}
    //         if ($(e.target).attr("data-wowclass")) {
    //             $data['wow_class'] = $(e.target).attr("data-wowclass")
    //         }
    //         var $name = $(e.target).val();
    //         $data['name'] = $name
    //         var $thisURL = '/ajax/delete_list/'
	//
    //         $.ajax({
    //             method: "POST",
    //             url: $thisURL,
    //             data: $data,
    //             success: trashCanSuccess,
    //             error: trashCanError,
    //         })
    //     }
    // });
}

function updateURL(path, subPath='', search='') {
	this.path = path
	this.path = (Boolean(subPath)) ? path + "/" + subPath : path
	this.path = (Boolean(search)) ? subPath + search : subPath
	history.pushState(null, subPath, this.path)
}

//sidebar functionality
function trashCanSuccess(data, textStatus, jqXHR) {
	let list_name = data.name.toString()
	let list_item = $(`.spec-list-item[name="${list_name}"]`).closest(".spec-container");

	list_item.hide(800, function () {
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

//sidebar functionality
function trashCanError(jqXHR, textStatus, errorThrown) {
	notifyUser(errorThrown)
	console.log('\n**error**\n')
	console.log(jqXHR)
	console.log(textStatus)
	console.log(errorThrown)
}

function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim();
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
	return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
	beforeSend: function (xhr, settings) {
		if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
			xhr.setRequestHeader("X-CSRFToken", csrftoken);
		}
	}
});

// convenience function, used everywhere as callback
function notifyUser(message) {
	let notificationContainer = ($("<div/>", {
		class: "notification-container",
		text: message,
	}))
	$("body").append(notificationContainer)
	setTimeout(() => { $(".notification-container").remove() }, 4500);
}

// used by enchant_tool.js and talent.js
function clear_tooltip() {
	$("#tooltip_container").empty()
	$("#tooltip_container").hide()
}

// used by old tooltip
function looseJsonParse(obj){
    return Function('"use strict";return (' + obj + ')')();
}

// used by enchant_tool.js
function get_tooltip_pos(e, staticK=false) {

	var tooltip_container = $("#tooltip_container")
	var tooltip = $("#tooltip")
	this.coords = {}
	var y = 0
	var x = 0

	if (staticK) {
		x = $(e.target).offset().left - 5 + $( e.target ).outerWidth(true)
		y = $(e.target).offset().top + 5 - tooltip_container.outerHeight(true)

	} else {
		x = e.pageX - 40
		y = e.pageY - tooltip_container.outerHeight()
	}

	if (x + 10 + tooltip_container.outerWidth(true) > window.innerWidth) {
		x = x - tooltip_container.outerWidth() + 40
	}

	if (e.pageY - tooltip_container.outerHeight() < 0) {
		y = (y + tooltip_container.outerHeight(true))
		//
	}
	this.coords.x = x
	this.coords.y = y
	return this.coords
}

// sometimes used by old tooltip
function get_dimensions(elem) {
	console.log('getting dimensions for: ')
	console.log(elem)
	console.log('width:', elem.width())
	console.log('height:', elem.height())
	console.log('outerheight:', elem.outerHeight(true))
	console.log('outerwidth:', elem.outerWidth(true))
	console.log('offsetHeight:', elem.offsetHeight)
	console.log('offsetWidth:', elem.offsetWidth)
}

// convenience function, used everywhere
// creates element, textnodes, and attributes, attaches textnode/attributes, returns created element
function create_element(tag, class_name, style, text, dataAttrs={}) {
	var elem = document.createElement(`${tag}`)
	if (class_name) {
		elem.className = class_name
	}

	if (style) {
		elem.style.cssText = style
	}

	if (text) {
		var content = document.createTextNode(`${text}`);
		elem.appendChild(content)
	}

	if (dataAttrs) {
		for (let [key, val] of Object.entries(dataAttrs)) {
			var dataItem = document.createAttribute(`${key}`);
			dataItem.value = val
			elem.setAttributeNode(dataItem)
        }
	}

	return elem
}

// used by enchant_tool.js and talent.js
function tooltip_v2(e, staticK=false, which=0) {
	const targetElement = $(e.target);
	var name = (targetElement.attr('name')) ? targetElement.attr('name') : targetElement.parent().attr('name');
	var tooltipElems = [];
	var recipe = false;

	switch (which) {

		// reserved, index?
		case 0:
			//

		// for talents
		case 1:
			const tree = titleCase(targetElement.closest('div.talentTable')[0].id)
			const found = classData.trees.find(function (x) {
				return x.name == tree
			})

			const j = targetElement.attr('data-j')
			const k = targetElement.attr('data-k')

			const talentObj = found.data[j][k]
			const talentCopy = Object.assign({}, talentObj)
			const requiredTalentPoints = talentObj.requiredTalentPoints

			var description;
			var next_rank = true
			var req_text = ''
			var tooltipFooter = {}

			const locked = $(e.target).hasClass('locked')

			if (talentObj.invested == 0) {
				next_rank = false
				talentCopy.invested++
				tooltipFooter.text = 'Click to learn'
				tooltipFooter.color = 'learn'
				description = talentCopy.description()
			}

			if (talentObj.maxRank == 1) {
				next_rank = false
				talentCopy.invested = talentCopy.maxRank
				description = talentCopy.description()
			}

			if (talentObj.invested == talentObj.maxRank) {
				tooltipFooter.text = 'Right-click to unlearn'
				tooltipFooter.color = 'unlearn'

				next_rank = false
				description = talentCopy.description()
			}

			if (talentObj.maxRank > 1 && talentObj.invested > 0 && next_rank) {
				talentCopy.invested++
				// description = talent.description() + "\n\nNext Rank:\n" + talentCopy.description()
				description = talentObj.description()

			}
			if (talentPointsSpent[tree].total() < requiredTalentPoints) {
				req_text = `Requires ${requiredTalentPoints} points in ${tree} Talents`
			}

			if (locked) {
				const testName = talentCopy.locked
				var testEle = $(`img.talent[name="${testName}"]`)
				let j = testEle.attr('data-j')
				let k = testEle.attr('data-k')
				const prereq = Object.assign({}, found.data[j][k])

				const points_remaining = prereq.maxRank - prereq.invested
				const plural = (points_remaining > 1) ? 's' : ''
				req_text = `Requires ${points_remaining} point${plural} in ${prereq.name}\n` + req_text
			}

			tooltipElems = [
				{class: 'title', text: name},
				{class: 'rank', text: "Rank " + talentObj.invested + "/" + talentObj.maxRank},
				{class: 'req', text: req_text},
				{class: 'description', text: description} ]

			if (next_rank) {
				tooltipElems.push({class: 'next', text: "\nNext Rank:\n"})
				tooltipElems.push({class: 'description', text: talentCopy.description()})

			} else if (!(req_text || talentPointsSpent.hardLocked || (talentPointsSpent.softLocked && tooltipFooter.color == 'learn'))) {
				tooltipElems.push({class: tooltipFooter.color, text: tooltipFooter.text})
			}
			break
		// for displaying items (consumes, materials, etc.)
		// NOTE: Enchant tool is the only template still using this
		case 2:
			var thisObj = (allConsumes[name]) ? allConsumes[name] : allMaterials[name]
			const properName = (thisObj.name) ? thisObj.name : titleCase(name)
			const rarity = thisObj.rarity
			let border_image = static_url+"images/icon_border_2.png"
			let ench_img_name = ENCHANT_IMAGES[thisObj.name]

			let image_name = static_url+`images/icons/large/${ench_img_name}.jpg`

			var image = (!staticK) ? $('<img/>', {
				class: 'icon-medium',
				src: `${border_image}`,
				style: `margin-top: 4px; pointer-events: none; float: left; background-image: url(${image_name})`
			}) : null

			tooltipElems = [{class: `title ${rarity}`, text: properName}]
			if (thisObj.bop) {
				tooltipElems.push({class: 'bop', text: "Binds when picked up"})
			}
			if (thisObj.unique) {
				tooltipElems.push({class: 'unique', text: "Unique"})
			}
			var requirementText = ''
			if (name == 'goblin_rocket_boots' || name == 'black_mageweave_boots') {
				requirementText = thisObj.req
			} else {
				requirementText = (thisObj.req) ? ((thisObj.req.toString().startsWith('engi') || thisObj.req.toString().startsWith('first')) ? titleCase(thisObj.req.replace(/([a-zA-Z\_]+)(\d+)/, "$1 ($2)")) : `Requires Level ${thisObj.req}`) : false
			}

			if (thisObj.req || thisObj.stats) {
				tooltipElems.push({class: 'requiredLevel', text: requirementText})
			}
			if (thisObj.use) {
				tooltipElems.push({class: 'use', text: `Use: ${thisObj.use}`})
			}
			if (thisObj.description) {
				tooltipElems.push({class: 'description', text: `"${thisObj.description}"`})
			}
			break

		// enchant recipes
		case 3:
			recipe = true;
			const slot = $("div.itemslot.enchantable.focus").attr("id")
			const enchant = allEnchants[slot][name]
			tooltipElems.push({class: "title spell", text: `Enchant ${titleCase(slot)} - ${titleCase(name)}`})
			tooltipElems.push({class: "description", text: enchant.description})
			break
	}

	tooltipElems.push(staticK)

	if (recipe) {
		name="spell_holy_greaterheal"
	}
	bigdaddytooltip(e, name, tooltipElems)
	$('#tooltip_container').css({'visibility':'visible'})
}

// used everywhere
function sanitize(str) {
	return str.toLowerCase().replace(/\s+/g, '_').replace("'", "")
}

// used everywhere
function titleCase(str) {
	let strArr = str.replace(/\_/g, ' ').split(' ')
	strArr.forEach(function(word, i) {
		if (!(word=='of' || word=='the') && typeof(word)=='string'){
			strArr[i] = word.charAt(0).toUpperCase() + word.slice(1)
		}
	})
	return strArr.join(' ')
}

// used by tooltip_v2
function bigdaddytooltip(e, name, ...args) {
	var tooltip_container = $("#tooltip_container")
	var elems = args[0]
	// let image_name = static_url+`images/icons/medium/materials/${thisObj.name}.jpg`

	var ench_img_name = name;
	if (ENCHANT_IMAGES) {
		ench_img_name = (ENCHANT_IMAGES[name]) ? ENCHANT_IMAGES[name] : name
	}

	var image_name = static_url+`images/icons/large/${ench_img_name}.jpg`
	var border_image = static_url+"images/icon_border_2.png"
	var staticK = elems.pop()
	var image = (!staticK) ? $('<img/>', {
		class: 'icon-medium',
		src: `${border_image}`,
		style: `padding-top: 0; margin-top: 2px; pointer-events: none; float: left; background-image: url(${image_name})`
	}) : null

	var tooltip = $('<div/>', {
		class: 'tooltip-container',
		id: "tooltip",
		style: "float: right;"
	})

	elems.forEach(function(item) {
		tooltip.append($('<div/>', {
			class: item.class,
			text: item.text,
		}))
	})

	tooltip_container.append(image, tooltip)
	let coords = get_talent_tooltip_pos(e, staticK, true)
	tooltip_container.attr("style", `left: ${coords.x}px; top: ${coords.y}px;`)
}

// used by bigdaddytooltip
function get_talent_tooltip_pos(e, staticK=false, tc=false) {

	var tooltip_container = $("#tooltip_container")
	var tooltip = $("#tooltip")
	this.coords = {}
	var y = 0
	var x = 0

	if (staticK) {
		x = $(e.target).offset().left + $( e.target ).outerWidth(true)
		y = $(e.target).offset().top - tooltip_container.outerHeight()

	} else {
		x = e.pageX - 45
		y = e.pageY - tooltip_container.outerHeight(true)
	}

	if (x + 10 + tooltip_container.outerWidth(true) > window.innerWidth) {
		x = x - tooltip_container.outerWidth(true) - $(e.target).outerWidth(true)
	}

	if (y + 120 - tooltip_container.outerHeight() < 0) {
		if (tc) {
			y = y + Math.abs(y + 120 - tooltip_container.outerHeight())
		} else {
			y = (y + tooltip_container.outerHeight(true))
		}
		//
	}

	this.coords.x = x
	this.coords.y = y
	return this.coords
}
