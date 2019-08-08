
$(document).ready(event_handlers());

function build_consume_list(url, name) {
    var search = url.search
    var path = url.pathname
    $.ajax({
        url: `${path}${search}`,
        dataType: 'html',
        success: function (data) {
            $("#totals_container").html(data);
            update_url('', search)
        }
    });
}


function event_handlers() {

    $(".side-bar-toggle").on({
        click: e => {
            let bool = $('.saved').hasClass('side-min')
            let windowWidth = window.innerWidth
            // console.log(windowWidth)
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

    // prevent right context menu on main content
    $('.mainContent').on({
        contextmenu: e => {
            e.preventDefault()
        },
    })

    $(".spec-list-item").on({
        click: e => {
            var list_name = $(e.target).attr('name');
            var wow_class = ($(e.target).attr('data-wowclass')) ? $(e.target).attr('data-wowclass') : ''
            $(".spec-list-item").removeClass("selected")
            $(e.target).addClass("selected")
            if (wow_class) {
                update_class(wow_class, list_name)
            } else {
                let href = $(e.target).attr("href")
                let url = new URL(href = href, base = document.location.origin)
                build_consume_list(url, list_name)
            }
        }
    });

    $(".trashcan").on({
        click: e => {
            e.stopPropagation()
            var $data = {}
            if ($(e.target).attr("data-wowclass")) {
                $data['wow_class'] = $(e.target).attr("data-wowclass")
            }
            var $name = $(e.target).val();
            $data['name'] = $name
            var $thisURL = '/ajax/delete_list/'

            $.ajax({
                method: "POST",
                url: $thisURL,
                data: $data,
                success: trashCanSuccess,
                error: trashCanError,
            })
        }
    });
}

function trashCanSuccess(data, textStatus, jqXHR) {
    console.log(data)
    let list_name = data.name.toString()
    let list_item = $(`.spec-list-item[name="${list_name}"]`).closest(".spec-container");

    list_item.hide(800, function () {
        $(this).remove()
    })

    // list_item.empty().remove()

    let message = data.message.toString() // <--------------- NOTE: HERE
    notifyUser(message)
    console.log('\n**success**\n')
    console.log(data.message.toString())
    console.log('data: ', data)
    console.log('status: ', textStatus)
    console.log(jqXHR)
    // $myForm.reset(); // reset form data
}

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

function notifyUser(message) {
    let notificationContainer = ($("<div/>", {
        class: "notification-container",
        text: message,
    }))
    $(".navbar").append(notificationContainer)
    setTimeout(() => { $(".notification-container").remove() }, 5000);
}

function future_tooltip(e, which=0) {
    var data;
    switch (which) {
		case 0:
			// ajax_tooltip
            // do stuff
		case 1:
			// which = talent_calc
		    // ajax_tooltip
            // do stuff
		case 2:
			// which = consume_tool
            // ajax_tooltip
            // do stuff
        case 3:
            // which = enchant_tool
            // ajax_tooltip
            // do stuff

	}
}

function clearTooltip() {
	$("#tooltip_container").empty()
	$("#tooltip_container").hide()
}

function tooltip_v2(e, static=false, which=0) {
	const targetElement = $(e.target);
	const name = (targetElement.attr('name')) ? targetElement.attr('name') : targetElement.parent().attr('name');
    var tooltipElems = [];

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
        case 2:
            var thisObj = (allConsumes[name]) ? allConsumes[name] : allMaterials[name]
            const properName = (thisObj.name) ? thisObj.name : titleCase(name)
            const rarity = thisObj.rarity
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
            const slot = $("div.itemslot.enchantable.focus").attr("id")
            const enchant = allEnchants[slot][name]
            tooltipElems.push({class: "title spell", text: `Enchant ${titleCase(slot)} - ${titleCase(name)}`})
            tooltipElems.push({class: "description", text: enchant.description})
            break
    }
	tooltipElems.push(static)
	bigdaddytooltip(e, name, tooltipElems)
}

function update_tooltip(e) {

	const tooltip = $("#tooltip_container")
	var x = e.pageX - 30
	var y = e.pageY - tooltip.outerHeight(true)

	if (x + 10 + tooltip.outerWidth(true) > window.innerWidth) {
		x = (x - tooltip.outerWidth(true) + 10)
	}
    if (y)
    tooltip.attr("style", `left: ${x}px; top: ${y}px; visiblity: visible;`)
}

function get_tooltip_pos(e, static) {
    var tooltip = $("#tooltip_container")

    this.coords = {}
    let offset = $(e.target).offset()

    var x = 0
    var y = 0
    if (static) {
        x = $(e.target).offset().left + 35
        y = $(e.target).offset().top - Math.max(tooltip.outerHeight(true), 35)
    } else {
        x = e.pageX - 30
        y = e.pageY - tooltip.outerHeight(true)
    }

    if (x + 10 + tooltip.outerWidth(true) > window.innerWidth) {
        x = (x - tooltip.outerWidth(true) + 10)
    }

    this.coords.x = x
    this.coords.y = y
    return this.coords
}

function bigdaddytooltip(e, name, ...args) {
    var tooltip_container = $("#tooltip_container")
    var elems = args[0]

    var image_name = static_url+`images/icons/consumes/${name}.jpg`
    var border_image = static_url+"images/icon_border_2.png"
    var static = elems.pop()
    var image = (!static) ? $('<img/>', {
        class: 'icon-medium',
        src: `${border_image}`,
        style: `margin-top: 4px; pointer-events: none; float: left; background-image: url(${image_name})`
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
    let coords = get_tooltip_pos(e, static)
    tooltip_container.attr("style", `left: ${coords.x}px; top: ${coords.y}px; visibility: visible;`)
}

function combatText(e, text){
    let color = null
    if (text >= 0)
    {text = "+" + text
    color = "rgba(30,255,0,0.95)"
}else{
    color = "red"
}
    let timeStamp = $.now();
    let uniqueID = `${e.pageX}${e.pageY}${timeStamp}`
    let notificationContainer = ($("<div/>", {
        class: "floating-container",
        id: uniqueID,
        text: text,
        style: `left: ${e.pageX}px; top: ${e.pageY}px; color: ${color}`
    }))
    $(document.body).append(notificationContainer)
    setTimeout(() => { $(`#${uniqueID}`).remove() }, 2900);

}

function sanitize(str) {
    return str.toLowerCase().replace(/\s+/g, '_').replace("'", "")
}

function titleCase(str) {
    let strArr = str.replace(/\_/g, ' ').split(' ')
    strArr.forEach(function(word, i) {
        if (!(word=='of' || word=='the') && typeof(word)=='string'){
            strArr[i] = word.charAt(0).toUpperCase() + word.slice(1)
        }
    })
    return strArr.join(' ')
}
