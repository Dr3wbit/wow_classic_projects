
$(document).ready(global_event_handlers());

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


function clearTooltip() {
	$("#tooltip_container").empty()
	$("#tooltip_container").hide()
}



function future_tooltip(e, which=0, staticK=false) {
	const targetElement = $(e.target);
	const name = (targetElement.attr('name')) ? targetElement.attr('name') : (targetElement.parent().attr('name')) ? targetElement.parent().attr('name') : targetElement.parent().parent().attr('name')
	var e = e
	var $name = name
	var $which = which
	var $data = {}
	$data['name'] = $name
	$data['which'] = $which
	if (staticK) {
		$data['static'] = staticK
	}
	$.ajax({
		method: "GET",
		url: `/ajax/tooltip`,
		data: $data,
		dataType: 'json',
		success: function(data) {
			create_tooltip_v2(data, e)
		}
	})
}

function update_tooltip(e, staticK=false) {

	var tooltip_container = $("#tooltip_container")
	var tooltip = $("#tooltip")
	var coords = get_tooltip_pos(e, staticK)
	tooltip_container.attr("style", `left: ${coords.x}px; top: ${coords.y}px; white-space: pre-wrap`)
}

function get_tooltip_pos(e, staticK=false) {

	var tooltip_container = $("#tooltip_container")
	var tooltip = $("#tooltip")
	this.coords = {}
	var x = 0
	var y = 0
	if (staticK) {
		x = $(e.target).offset().left + $( e.target ).outerWidth(true)
		y = $(e.target).offset().top - tooltip.outerHeight()

	} else {
		x = e.pageX - 30
		y = e.pageY - tooltip_container.outerHeight(true)
	}

	if (x + 10 + tooltip_container.outerWidth(true) > window.innerWidth) {
		x = (x - tooltip_container.outerWidth(true) + 25)
	}
	if (y + 60 - tooltip_container.outerHeight() < 0) {
		y = (y + tooltip_container.outerHeight(true))
		//
	}
	this.coords.x = x
	this.coords.y = y
	return this.coords

}

function get_dimensions(elem) {
	console.log('getting dimensions for: ')
	console.log(elem)
	console.log('tooltip_container outerheight:', elem.outerHeight(true))
	console.log('tooltip_container outerwidth:', elem.outerWidth(true))
	console.log('tooltip_container width:', elem.width())
	console.log('tooltip_container height:', elem.height())
	console.log('tooltip outerheight:', elem.outerHeight(true))
	console.log('tooltip outerwidth:', elem.outerWidth(true))
	console.log('tooltip offsetHeight:', elem.offsetHeight)
	console.log('tooltip offsetWidth:', elem.offsetWidth)
}

function create_tooltip_v2(data, e) {
	const tooltip_container = document.getElementById("tooltip_container")
	const tooltip = create_element('div', 'tooltip-container', "float: right; white-space: pre-wrap;", '', 'tooltip')

	if (data.image_name) {
		let image_name = static_url+`images/icons/large/${data.image_name}.jpg`
		style = `margin-top: 4px; pointer-events: none; float: left; background-image: url(${image_name})`
		var img = create_element('img', 'icon-medium', style, '', "tooltip_img")
		img.src = static_url+"images/icon_border_2.png"
		tooltip_container.appendChild(img)
	}

	const title = create_element('div', `title q${data.quality}`, 'clear: both; margin-right: 5px; padding-right: 5px; width: 100%;', `${data.name}`)
	tooltip.appendChild(title)

	if ((data.slot || data.bop) && (data.quality > 1)) {
		const bop_text = (data.bop) ? "Binds when picked up" : "Binds when equipped"
		const bop_elem = create_element('div', 'bop', '', `${bop_text}`)
		tooltip.appendChild(bop_elem)
	}

	if (data.unique) {
		const unique = create_element('div', 'unique', 'padding-right: 5px; margin-right: 5px;', "Unique")
		tooltip.appendChild(unique)
	}

	if (data.slot) {
		const slot = create_element('div', 'slot', 'float:left; margin-right: 5px; padding-right: 5px;', `${data.slot}\n`)
		tooltip.appendChild(slot)
	}

	if (data.proficiency) {
		const proficiency = create_element('div', 'proficiency', 'float: right; clear: right;', `${data.proficiency}`)
		tooltip.appendChild(proficiency)
	}

	if (data.damage) {
		var damage_text = ""
		data.damage.forEach(function(x) {
			damage_text += `${x}\n`
		})
		const damage = create_element('div', 'damage', 'float: left; clear:left; margin-right: 10px; padding-right: 10px', damage_text)
		tooltip.appendChild(damage)
	}

	if (data.speed) {
		const speed = create_element('div', 'speed', 'float: right; clear: right; margin-left: 10px; padding-left: 10px', `Speed ${data.speed}`)
		tooltip.appendChild(speed)
	}

	if (data.dps) {
		const dps = create_element('div', 'dps', 'clear: both;', `(${data.dps} damage per second)`)
		tooltip.appendChild(dps)

	}

	if (data.armor) {
		const armor = create_element('div', 'armor', 'clear: both;', `${data.armor} Armor`)
		tooltip.appendChild(armor)
	}

	if (data.stats) {
		var stat_text = ""
		for (let [key, val] of Object.entries(data.stats)) {
			let some_text = `${val} ${key}\n`

			if (key!='Block') {
				some_text = "+"+some_text
			}
			stat_text += some_text
		}
		const stats = create_element('div', 'stats', "float: left; clear: both", `${stat_text}`)
		tooltip.appendChild(stats)

	}

	if (data.resists) {
		var resist_text = ""
		for (let [key, val] of Object.entries(data.resists)) {
			resist_text += `+${val} ${key} Resist\n`
		}
		const resists = create_element('div', 'resists', "float: left; clear: both", `${resist_text}`)
		tooltip.appendChild(resists)
	}


	if (data.durability) {
		const durability = create_element('div', 'durability', 'clear: both;', `Durability ${data.durability} / ${data.durability}`)
		tooltip.appendChild(durability)

	}

	if (data.requirements) {
		var requirements = create_element('div', 'requirements', 'clear: both;')

		for (let [key, val] of Object.entries(data.requirements)) {
			if (key == "level") {
				requirements.appendChild(create_element('div', 'required_level', '', `Required Level: ${val}`))
			} else if (key == "classes") {
				var class_reqs = create_element('div', `${class_text}`, '', "Classes: ")

				let class_name = val.pop()
				let class_span = create_element('span', `${class_name}`, '', `${class_name}`)

				class_reqs.appendChild(class_span)

				val.forEach(function(class_name) {
					class_reqs.appendChild(create_element('span', `${class_name}`, '', `, ${class_name}`))
				})

			requirements.appendChild(class_reqs)
			} else if (key == "rank") {
				let rank_req = create_element('div', 'required_rank', '', `Requires ${val}`)
				requirements.appendChild(rank_req)
			} else if (key=='profession') {
				for (let [k, v] of Object.entries(val)) {
					var req_text = "Requires "+titleCase(k)
					if (ALL_PROFS.includes(k.toString())) {
						req_text += ` (${v})`
					}
					let prof_req = create_element('div', 'required_prof', '', req_text)
					requirements.appendChild(prof_req)
				}
			}
		}
		requirements.appendChild(create_element('div', '', 'clear: both;'))
		tooltip.appendChild(requirements)
	}

	if (data.equips) {
		var equips = create_element('div', 'use q2', 'clear: both; font-size: 13px')

		data.equips.forEach(function(x) {
			equips.appendChild(create_element('div', 'use q2', 'clear: both; font-size: 13px', `Equip: ${x}`))
		})

		tooltip.appendChild(equips)

	}

	if (data.procs) {
		var procs = create_element('div', 'use q2', 'clear: both; font-size: 13px')
		data.procs.forEach(function(x) {
			procs.appendChild(create_element('div', 'use q2', 'clear: both; font-size: 13px', `Chance on Hit: ${x}`))
		})
		tooltip.appendChild(procs)
	}


	if (data.use) {
		const use = create_element('div', 'use q2', 'clear: both; font-size: 13px', `Use: ${data.use}`)
		tooltip.appendChild(use)
	}

	if (data.description) {
		const description = create_element('div', 'description', 'clear: both;', `"${data.description}"`)
		tooltip.appendChild(description)
	}

	tooltip_container.appendChild(tooltip)

	var coords = get_tooltip_pos(e, Boolean(data.image_name))

	tooltip_container.style.cssText = `left: ${coords.x}px; top: ${coords.y}px; white-space: pre-wrap`

}

function create_element(tag, class_name, style, text, id) {
	var elem = document.createElement(`${tag}`)
	if (id) {
		elem.id = id
	}

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
	return elem
}

function create_tooltip(data) {
	// console.time('jquery create_tooltip')

	const tooltip_container = $("#tooltip_container")
	const img = data.img

	const tooltip = $('<div/>', {
		class: 'tooltip-container',
		id: "tooltip",
		style: "float: right; white-space: pre-wrap;"
	})

	var image_name = static_url+`images/icons/large/${img}.jpg`

	const image = (img) ? $('<img/>', {
		class: 'icon-medium',
		src: static_url+"images/icon_border_2.png",
		style: `margin-top: 4px; pointer-events: none; float: left; background-image: url(${image_name})`
	}) : null

	tooltip.append($('<div/>', {
		class: `title q${data.quality}`,
		text: `${data.name}`,
		style: 'clear: both; margin-right: 5px; width: 100%;'
	}))

	const bop_text = (data.bop) ? "Binds when picked up" : "Binds when equipped"
	const bop = ((!data.slot) && !(data.bop) && (data.quality > 1)) ? null : $('<div/>', {
		class: 'bop',
		text: `${bop_text}`,
		style: 'margin-right: 5px; padding-right: 5px;'
	})

	const unique = (data.unique) ? $('<div/>', {
		class: 'unique',
		text: "Unique"
	}) : null

	const slot = (data.slot) ? $('<div/>', {
		class: 'slot',
		text: `${data.slot}\n`,
		style: 'float:left;'
	}) : null

	const proficiency = (data.proficiency) ? $('<div/>', {
		class: 'proficiency',
		text: `${data.proficiency}`,
		style: 'float: right; clear: right;'
	}) : null

	var damage_text = ""
	data.damage.forEach(function(x) {
		damage_text += `${x}\n`
	})

	const damage = (data.damage) ? $('<div/>', {
		class: 'damage',
		text: `${damage_text}`,
		style: 'float: left; clear:left; margin-right: 10px; padding-right: 5px'
	}) : null

	const speed = (data.speed) ? $('<div/>', {
		class: 'speed',
		text: `Speed ${data.speed}`,
		style: 'float: right; clear: right; margin-left: 10px; padding-left: 5px'
	}) : null

	const dps = (data.dps) ? $('<div/>', {
		class: 'dps',
		text: `(${data.dps} damage per second)`,
		style: 'clear: both;'
	}) : null

	const armor = (data.armor) ? $('<div/>', {
		class: 'armor',
		text: `${data.armor} Armor`,
		style: 'clear: both;'

		// style: 'float: left; clear: right;'
	}) : null

	var stat_text = ""
	if (data.stats) {
		for (let [key, val] of Object.entries(data.stats)) {
			if (key=='Block') {
				stat_text += `${val} ${key}\n`
			} else {
				stat_text += `+${val} ${key}\n`
			}
		}
	}
	const stats = (data.stats) ? $('<div/>', {
		class: 'armor',
		text: `${stat_text}`,
		style: "float: left; clear: both"
	}) : null

	var resist_text = ""
	if (data.resists) {
		for (let [key, val] of Object.entries(data.resists)) {
			resist_text += `+${val} ${key} Resist\n`
		}
	}
	const resists = (data.resists) ? $('<div/>', {
		class: 'armor',
		text: `${resist_text}`,
		style: "float: left; clear: both"
	}) : null

	const durability = (data.durability) ? $('<div/>', {
		class: 'durability',
		text: `Durability ${data.durability} / ${data.durability}`,
		style: 'clear: both;'
	}) : null

	var requirements = (data.requirements) ? $('<div/>', {
		class: 'requirements',
		style: 'clear: both;'
	}) : null

	if (data.requirements) {
		for (let [key, val] of Object.entries(data.requirements)) {
			if (key.toString() == "level") {
				requirements.append($('<div/>', {
					class: 'required_level',
					text: `Required Level: ${val}`
				}))
			} else if (key.toString() == "classes") {
				if (val.length > 1) {
					val.forEach(function(class_name) {
						requirements.append($('<div/>', {
							class: `${class_name}`,
							text: `Classes: ${val}`
						}), ",")
					})
				} else {
					requirements.append($('<div/>', {
						class: `${class_name}`,
						text: `Classes: ${val[0]}`
					}), ",")
				}

			} else if (key=='rank') {
				requirements.append($('<div/>', {
					class: 'required_rank',
					text: `Requires ${val}`,
				}))
			} else if (key=='profession') {
				for (let [k, v] of Object.entries(val)) {
					var req_text = "Requires "+titleCase(k)
					if (ALL_PROFS.includes(k.toString())) {
						req_text += ` (${v})`
					requirements.append($('<div/>', {
						class: 'required_rank',
						text: req_text,
						}))
					}
				}
			}
		}
		requirements.append($('<div/>', {
			style: `clear: both;`
		}))

	}

	const equips = (data.equips) ? $('<div/>', {
		class: 'use q2',
		style: 'clear: both; font-size: 13px'
	}) : null

	if (data.equips) {
		data.equips.forEach(function(x) {
			equips.append($('<div/>', {
				class: 'use q2',
				text: `Equip: ${x}`,
				style: 'clear: both;'
			}))
		})
	}

	const procs = (data.procs) ? $('<div/>', {
		class: 'use q2',
		style: 'clear: both; font-size: 13px'
	}) : null

	if (data.procs) {
		data.procs.forEach(function(x) {
			procs.append($('<div/>', {
				class: 'use q2',
				text: `Chance on Hit: ${x}`,
				style: 'clear: both;'
			}))
		})
	}

	const use = (data.use) ? $('<div/>', {
		class: 'use q2',
		text: `Use: ${data.use}`,
		style: 'clear: both; font-size: 13px'
	}) : null

	const description = (data.description) ? $('<div/>', {
		class: 'description',
		text: `"${data.description}"`,
		style: 'clear: both;'
	}) : null

	tooltip.append(bop, unique, slot, proficiency, armor, damage, speed, dps, stats, resists, durability, requirements,equips, procs, use, description)

	tooltip_container.append(image, tooltip)

	// console.timeEnd('jquery create_tooltip')

	// tooltip_container.attr("style", `left: ${x}px; top: ${y}px; visiblity: visible;`)
	// var t1 = performance.now();

	// console.log("Call to create_tooltip took " + (t1 - t0) + " milliseconds.")
}


function tooltip_v2(e, staticK=false, which=0) {
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
	tooltipElems.push(staticK)
	bigdaddytooltip(e, name, tooltipElems)
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
	let notificationContainer = create_element('div', "floating-container", `left: ${e.pageX}px; top: ${e.pageY}px; color: ${color}`, text, uniqueID)
	// let notificationContainer = ($("<div/>", {
	//     class: "floating-container",
	//     id: uniqueID,
	//     text: text,
	//     style: `left: ${e.pageX}px; top: ${e.pageY}px; color: ${color}`
	// }))
	document.body.appendChild(notificationContainer)

	// $( e.target ).append(notificationContainer)
	// console.log('target: ', $( e.target ))
	// console.log('position: ', $( e.pageX ), $(e.pageY))

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


function bigdaddytooltip(e, name, ...args) {
	var tooltip_container = $("#tooltip_container")
	var elems = args[0]

	var image_name = static_url+`images/icons/consumes/${name}.jpg`
	var border_image = static_url+"images/icon_border_2.png"
	var staticK = elems.pop()
	var image = (!staticK) ? $('<img/>', {
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
	let coords = update_tooltip(e, staticK)
	tooltip_container.attr("style", `left: ${coords.x}px; top: ${coords.y}px;`)
}

// function update_tooltip(e) {
//
// 	const tooltip = $("#tooltip_container")
// 	var x = e.pageX - 30
// 	var y = e.pageY - tooltip.outerHeight(true)
//
// 	if (x + 10 + tooltip.outerWidth(true) > window.innerWidth) {
// 		x = (x - tooltip.outerWidth(true) + 10)
// 	}
//     if (y) {
//         //
//     }
//     tooltip.attr("style", `left: ${x}px; top: ${y}px; visiblity: visible;`)
// }
