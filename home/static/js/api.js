var coords = {'x':0, 'y':0}
var previous_ix = 0
// var prev_query_keys = Object.keys(localStorage)
var prev_query_keys = Object.keys(all_items)

$("#prof_loader").on({
    click: e=> {
        $.ajax({
            url: '/ajax/prof_loader/',
            data: {
                'prof': 'Enchanting',
            },
            dataType: 'json',
            success: prof_receiver,
            complete: init_list_searching
        });
    }
})

function init_list_searching(response) {
    var monkeyList = new List('profession-table', {
      valueNames: ['consume-name', 'yellow-skillup'],
    });
    monkeyList.on('sortComplete', function(e) {
        console.log('sort complete: ', e)
        // TODO: change icon
    })
    monkeyList.on('searchComplete', function(e) {
        console.log('search complete: ', e)
        // TODO: change icon
    })
}

function empty_tooltip() {

    var tooltip_container = document.getElementById("tooltip_container")

    while (tooltip_container.firstChild) {
        tooltip_container.removeChild(tooltip_container.firstChild);
    }
}

function remove_children(node) {
    for (let i = 0; i < node.children.length; i++) {
        node.children.forEach(function(child) {

        })
        node.children[i].remove()
    }
}

function hide_tooltip() {
    var tooltip_container = document.getElementById("tooltip_container")
    for (let i = 0; i < tooltip_container.children.length; i++) {
        tooltip_container.children[i].hidden = true
    }
}

function unhide_tooltip() {
    var tooltip_container = document.getElementById("tooltip_container")
    for (let i = 0; i < tooltip_container.children.length; i++) {
        tooltip_container.children[i].hidden = false
    }
}

function add_mousemove(e) {

    var target = e.target
    target.addEventListener('mousemove', update_tooltip_coords)
}

function update_tooltip_coords(e) {

    coords.x = coords.x + e.movementX
    coords.y = coords.y + e.movementY
    position_tooltip(coords.x, coords.y)
}

function position_tooltip(x, y) {

    var tooltip_container = document.getElementById("tooltip_container")
    tooltip_container.style.cssText = `left: ${x}px; top: ${y}px; visibility: visible;`
}

function mouseleave_cleanup(e) {

    empty_tooltip()
    e.target.removeEventListener('mousemove', update_tooltip_coords)
}

function tooltip_init(e) {

    empty_tooltip()
    add_mousemove(e)
    var target = e.target
    var parent = target.closest('div.data-container')
    var ix = parent.getAttribute("data-ix")
    coords.x = e.pageX
    coords.y = e.pageY

    if (prev_query_keys.includes(ix)) {
        var data = all_items[ix]

        API_create_tooltip(data)
        update_tooltip_coords(e)
    } else {
        var data = {}
        data['ix'] = ix
        $.ajax({
            method: "GET",
            url: '/ajax/get_item_info/',
            data: data,
            dataType: 'json',
            success: API_create_tooltip,
            complete: save_item_query,
        })
    }
}

function save_item_query(data) {

    var ix = data.responseJSON.ix
    var item = data.responseJSON

    if (!prev_query_keys.includes(ix)) {
        all_items[ix] = item
        if (storageAvailable('localStorage')) {
            localStorage.setItem(ix, JSON.stringify(item));
        }
        prev_query_keys.push(ix)
        console.log(`added ${ix}`)
    }
}

function prof_receiver(data) {
    var tbody = document.getElementById("tbody123")
    var table = tbody.closest("table")

    console.log('data: ', data)
    data.forEach(function (recipe) {
        var tablerow = create_element('tr')
        tbody.appendChild(tablerow)

        var td = create_element('td', 'recipe', "text-align: left;")
        tablerow.appendChild(td)

        var recipe_container = create_element('div', `recipe-container data-container q${recipe.quality}`)
        td.appendChild(recipe_container)

        var image_name = static_url+`images/icons/large/${recipe.img}.jpg`
        var recipe_img_el = create_element('img', 'icon-medium recipe-image', `background-image: url(${image_name});`)
        recipe_container.appendChild(recipe_img_el)

        recipe_img_el.src = static_url+"images/icon_border_2.png"
        recipe_img_el.addEventListener("mouseover", tooltip_init)
        recipe_img_el.addEventListener("mouseleave", mouseleave_cleanup)

        var ix = document.createAttribute("data-ix");
        ix.value = recipe.ix
        recipe_container.setAttributeNode(ix)

        var recipe_name_el = create_element('span', 'consume-name', 'margin-left: 5px;', recipe.name)
        recipe_container.appendChild(recipe_name_el)

        recipe_name_el.addEventListener("mouseover", tooltip_init)
        recipe_name_el.addEventListener("mouseleave", mouseleave_cleanup)

        var mats_td = create_element('td', 'reagant-list')
        tablerow.appendChild(mats_td)

        recipe.mats.forEach(function (mat) {
            var mat_container = create_element('div', 'data-container', 'display: inline-block;')
            mats_td.appendChild(mat_container)

            var mat_image_name = static_url+`images/icons/large/${mat.img}.jpg`
            var mat_img = create_element('img', 'icon-medium', `background-image: url(${mat_image_name});`)
            mat_container.appendChild(mat_img)

            mat_img.addEventListener("mouseover", tooltip_init)
            mat_img.addEventListener("mouseleave", mouseleave_cleanup)


            var mat_ix = document.createAttribute("data-ix");
            mat_ix.value = mat.ix
            mat_container.setAttributeNode(mat_ix)
            mat_img.src = static_url+"images/icon_border_2.png"

            if (mat.step > 1) {
                var count_container = create_element('span', 'count-container')
                mat_container.appendChild(count_container)

                var div1 = create_element('span', 'material-count', '', mat.step)
                var div2 = create_element('span', 'material-count', 'color:black; bottom:1px; z-index:4;', mat.step)
                var div3 = create_element('span', 'material-count', 'rgba(0,0,0,.9); bottom:2px; z-index:4;', mat.step)
                var div4 = create_element('span', 'material-count', 'color:black; right:2px; z-index:4;', mat.step)
                count_container.appendChild(div1)
                count_container.appendChild(div2)
                count_container.appendChild(div3)
                count_container.appendChild(div4)

            }


        })
        var skillup_td = create_element('td', 'skillup')
        tablerow.appendChild(skillup_td)

        var grey = create_element('span', 'grey-skillup', 'color: #808080; font-weight: bold; margin-left: 5px;', recipe.skillups.grey)
        var green = create_element('span', 'green-skillup', 'color: #40BF40; font-weight: bold; margin-left: 5px;', recipe.skillups.green)
        var yellow = create_element('span', 'yellow-skillup', 'color: #FF0; font-weight: bold; margin-left: 5px;', recipe.skillups.yellow)

        skillup_td.appendChild(yellow)
        skillup_td.appendChild(green)
        skillup_td.appendChild(grey)


    })
}

// old reliable
// function prof_receiver(data) {
//     var tbody = document.getElementById("tbody123")
//     var table = tbody.closest("table")
//
//     console.log('data: ', data)
//     data.forEach(function (recipe) {
//         var tablerow = create_element('tr')
//         var td = create_element('td', 'recipe', "text-align: left;")
//
//         var recipe_container = create_element('div', `recipe-container data-container q${recipe.quality}`)
//         var image_name = static_url+`images/icons/large/${recipe.img}.jpg`
//         var recipe_img_el = create_element('img', 'icon-medium recipe-image', `background-image: url(${image_name});`)
//         recipe_img_el.src = static_url+"images/icon_border_2.png"
//         recipe_img_el.addEventListener("mouseover", tooltip_init)
//         recipe_img_el.addEventListener("mouseleave", mouseleave_cleanup)
//
//         var ix = document.createAttribute("data-ix");
//         ix.value = recipe.ix
//         recipe_container.setAttributeNode(ix)
//
//         var recipe_name_el = create_element('span', 'consume-name', 'margin-left: 5px;', recipe.name)
//
//         recipe_name_el.addEventListener("mouseover", tooltip_init)
//         recipe_name_el.addEventListener("mouseleave", mouseleave_cleanup)
//
//         recipe_container.appendChild(recipe_img_el)
//         recipe_container.appendChild(recipe_name_el)
//         td.appendChild(recipe_container)
//         tablerow.appendChild(td)
//
//         var mats_td = create_element('td', 'reagant-list')
//
//         recipe.mats.forEach(function (mat) {
//             var mat_container = create_element('div', 'data-container', 'display: inline-block;')
//             var mat_image_name = static_url+`images/icons/large/${mat.img}.jpg`
//             var mat_img = create_element('img', 'icon-medium', `background-image: url(${mat_image_name});`)
//             mat_img.addEventListener("mouseover", tooltip_init)
//             mat_img.addEventListener("mouseleave", mouseleave_cleanup)
//
//
//             var mat_ix = document.createAttribute("data-ix");
//             mat_ix.value = mat.ix
//             mat_container.setAttributeNode(mat_ix)
//             mat_img.src = static_url+"images/icon_border_2.png"
//             mat_container.appendChild(mat_img)
//
//             if (mat.step > 1) {
//                 var count_container = create_element('span', 'count-container')
//                 var div1 = create_element('span', 'material-count', '', mat.step)
//                 var div2 = create_element('span', 'material-count', 'color:black; bottom:1px; z-index:4;', mat.step)
//                 var div3 = create_element('span', 'material-count', 'rgba(0,0,0,.9); bottom:2px; z-index:4;', mat.step)
//                 var div4 = create_element('span', 'material-count', 'color:black; right:2px; z-index:4;', mat.step)
//                 count_container.appendChild(div1)
//                 count_container.appendChild(div2)
//                 count_container.appendChild(div3)
//                 count_container.appendChild(div4)
//
//                 mat_container.appendChild(count_container)
//             }
//
//             mats_td.appendChild(mat_container)
//
//         })
//         var skillup_td = create_element('td', 'skillup')
//
//         var grey = create_element('span', 'grey-skillup', 'color: #808080; font-weight: bold; margin-left: 5px;', recipe.skillups.grey)
//         var green = create_element('span', 'green-skillup', 'color: #40BF40; font-weight: bold; margin-left: 5px;', recipe.skillups.green)
//         var yellow = create_element('span', 'yellow-skillup', 'color: #FF0; font-weight: bold; margin-left: 5px;', recipe.skillups.yellow)
//
//         skillup_td.appendChild(yellow)
//         skillup_td.appendChild(green)
//         skillup_td.appendChild(grey)
//
//
//         tablerow.appendChild(mats_td)
//         tablerow.appendChild(skillup_td)
//
//         tbody.appendChild(tablerow)
//
//
//     })
// }


function API_create_tooltip(data) {

	var tooltip_container = document.getElementById("tooltip_container")
	var tooltip = create_element('div', 'tooltip-container', "float: right; white-space: pre-wrap;", '', 'tooltip')

	if (data.img) {
		let image_name = static_url+`images/icons/large/${data.img}.jpg`
		style = `pointer-events: none; float: left; background-image: url(${image_name})`
		var img = create_element('img', 'icon-medium', style, '', "tooltip_img")
		img.src = static_url+"images/icon_border_2.png"
		tooltip_container.appendChild(img)
	}

	var title = create_element('div', `title q${data.quality}`, 'clear: both; margin-right: 5px; padding-right: 5px; width: 100%;', `${data.name}`)
	tooltip.appendChild(title)

	if ((data.slot && data.q > 1) || (data.bop)) {
		var bop_text = (data.bop) ? "Binds when picked up" : "Binds when equipped"
		var bop_elem = create_element('div', 'bop', '', `${bop_text}`)
		tooltip.appendChild(bop_elem)
	}

	if (data.quest_item) {
		var quest_item = create_element('div', 'unique', 'padding-right: 5px; margin-right: 5px;', "Quest Item")
		tooltip.appendChild(quest_item)
	}

	if (data.unique) {
		var unique = create_element('div', 'unique', 'padding-right: 5px; margin-right: 5px;', "Unique")
		tooltip.appendChild(unique)
	}

	if (data.slot) {
		var slot_text = (data.slot == 'Bag') ? `${data.slots} Slot Bag` : data.slot
		var slot = create_element('div', 'slot', 'float:left; margin-right: 5px; padding-right: 5px;', `${slot_text}\n`)
		tooltip.appendChild(slot)
	}

	if (data.proficiency) {
		var proficiency = create_element('div', 'proficiency', 'float: right; clear: right;', `${data.proficiency}`)
		tooltip.appendChild(proficiency)
	}

	if (data.damage) {
		var damage_text = ""
		data.damage.forEach(function(x) {
			damage_text += `${x}\n`
		})
		var damage = create_element('div', 'damage', 'float: left; clear:left; margin-right: 10px; padding-right: 10px', damage_text)
		tooltip.appendChild(damage)
	}

	if (data.speed) {
		var speed = create_element('div', 'speed', 'float: right; clear: right; margin-left: 10px; padding-left: 10px', `Speed ${data.speed}`)
		tooltip.appendChild(speed)
	}

	if (data.dps) {
		var dps = create_element('div', 'dps', 'clear: both;', `(${data.dps} damage per second)`)
		tooltip.appendChild(dps)

	}

	if (data.armor) {
		var armor = create_element('div', 'armor', 'clear: both;', `${data.armor} Armor`)
		tooltip.appendChild(armor)
	}

	if (data.stats) {
		var stat_text = ""
		// var _stats = looseJsonParse(data.stats)
		for (let [key, val] of Object.entries(data.stats)) {
			let some_text = `${val} ${key}\n`

			if (key!='Block') {
				some_text = "+"+some_text
			}
			stat_text += some_text
		}
		var stats = create_element('div', 'stats', "float: left; clear: both", `${stat_text}`)
		tooltip.appendChild(stats)

	}

	if (data.resists) {
		var resist_text = ""
		// var _resists = looseJsonParse(data.resists)
		for (let [key, val] of Object.entries(data.resists)) {
			resist_text += `+${val} ${key} Resist\n`
		}
		var resists = create_element('div', 'resists', "float: left; clear: both", `${resist_text}`)
		tooltip.appendChild(resists)
	}


	if (data.durability) {
		var durability = create_element('div', 'durability', 'clear: both;', `Durability ${data.durability} / ${data.durability}`)
		tooltip.appendChild(durability)
	}

	if (data.requirements) {
		// var _requirements = looseJsonParse(data.requirements)
		var requirements = create_element('div', 'requirements', 'clear: both;')

		for (let [key, val] of Object.entries(data.requirements)) {
			if (key == "level") {
				requirements.appendChild(create_element('div', 'required_level', '', `Required Level: ${val}`))
			} else if (key == "class") {
				var class_reqs = create_element('div', 'class_text', '', "Classes: ")

				let first_class_name = val.shift()
				let class_span = create_element('span', `${first_class_name.toLowerCase()}`, '', `${first_class_name}`)

				class_reqs.appendChild(class_span)

				val.forEach(function(class_name) {
					class_reqs.appendChild(create_element('span', '', '', ', '))

					class_reqs.appendChild(create_element('span', `${class_name.toLowerCase()}`, '', `${class_name}`))
				})

				val.unshift(first_class_name)

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
		// var _equips = looseJsonParse(data.equips)
		var equips = create_element('div', 'use q2', 'clear: both; font-size: 13px')

		data.equips.forEach(function(x) {
			equips.appendChild(create_element('div', 'use q2', 'clear: both; font-size: 13px', `${x}`))
		})

		tooltip.appendChild(equips)

	}

	if (data.procs) {
		// var _procs = looseJsonParse(data.procs)
		var procs = create_element('div', 'use q2', 'clear: both; font-size: 13px')
		data.procs.forEach(function(x) {
			procs.appendChild(create_element('div', 'use q2', 'clear: both; font-size: 13px', `${x}`))
		})
		tooltip.appendChild(procs)
	}


	if (data.use) {
		var use = create_element('div', 'use q2', 'clear: both; font-size: 13px', `Use: ${data.use}`)
		tooltip.appendChild(use)
	}

	if (data.description) {
		var description = create_element('div', 'description', 'clear: both;', `"${data.description}"`)
		tooltip.appendChild(description)
	}

	if (data.itemset) {
		var itemset = ALL_ITEMSETS[data.itemset]
		// let num_items =
		var itemset_text = `${itemset.n} (0/${itemset.items.length})`
		var itemset_elem = create_element('div', 'description', 'clear: both;', `\n${itemset_text}`)
		itemset.items.forEach(function(name) {
			itemset_elem.appendChild(create_element('div', 'q0', 'text-indent: 8px;', `${name}\n`))
		})
		itemset_elem.appendChild(create_element('div', '', '', `\n`))
		itemset.bonuses.forEach(function(bonus) {
			itemset_elem.appendChild(create_element('div', 'q0', '', `${bonus}\n`))
		})
		tooltip.appendChild(itemset_elem)
	}
	tooltip_container.appendChild(tooltip)
	tooltip_container.style.cssText = `left: ${coords.x}px; top: ${coords.y}px; white-space: pre-wrap`
    // tooltip_container.attr("style", `left: ${coords.x}px; top: ${coords.y}px; visibility: visible;`)
}
