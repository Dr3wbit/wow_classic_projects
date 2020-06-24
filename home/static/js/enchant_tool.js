
var allEnchants = enchants;
let materialArray = [];

$(document).ready(initializeApp)

function initializeApp() {
    applyClickHandlers()
    initialFilter()
    materialsTooltip()
    showEnchantEffect()
}

function applyClickHandlers() {
    radioOption()
    enchantOption()

}

function initialFilter() {
    $('#endGameRadio').click()
}

function enchantOption() {
    $(".enchantable").on({
        click: e => {
            $(".enchantable").removeClass('focus')
            $(".enchantHolder").empty()
            const clickedSlot = $(e.target)
            clickedSlot.addClass('focus')
            const filter = $('.filterApplied').val()
            findSlot(clickedSlot, filter)
        },
    })
}

function radioOption() {
    $(".form-check-input").on({
        click: e => {
            $(".form-check-input").removeClass('filterApplied')
            $(e.target).addClass('filterApplied')
            let clickedSlot = $(".enchantable.focus")
            if(clickedSlot.length > 0){
                $(".enchantHolder").empty()
                findSlot(clickedSlot, e.target.value)
            }
        }
    })
}

function findSlot(selection, filter) {
    const slot = selection.attr("id")
    const dataObject = allEnchants[slot]
    let dataKeys = []

    if (filter === "end_game"){
        dataKeys = Object.keys(allEnchants[slot])
        let filteredKeys = []
        dataKeys.forEach(key => {
            if(dataObject[key].end_game){
                filteredKeys.push(key)
            }
        })
        dataKeys = filteredKeys
    }else{
        dataKeys = Object.keys(allEnchants[slot])
    }
    const enchantData = getenchantData(dataObject, dataKeys, slot)
    $('.enchantHolder').append($('<div/>', {
        text: slot.toUpperCase(),
        class: 'enchant-slot-title'
    }))
    $('.enchantHolder').append(enchantData)
}

function getenchantData(dataObject, dataKeys, slot) {
    let slotEnchants = null
    let enchantToAppend = []
    for (let i = 0; i < dataKeys.length; i++) {
        slotEnchants = $('<div/>', {
            class: 'enchantOption',
            name: dataKeys[i],
            text: utilities.titleCase(dataKeys[i]) + " : " + dataObject[dataKeys[i]].effect,
        }).on({
            click: e => {
                let mod = false
                $('.enchantOption').removeClass('focus')
                const clickedEnchant = $(e.target)
                clickedEnchant.addClass('focus')
                let text = slot.toUpperCase() + " : " +dataObject[dataKeys[i]].effect
                if (dataObject[dataKeys[i]].two_handed === true) {
                    text = "[2H] " + slot.toUpperCase() + " : " +dataObject[dataKeys[i]].effect
                }
                $('<div/>', {
                    class: 'enchantInfo',
                }).append($('<span/>', {
                    text: text
                })).prepend($('<button/>', {
                    class: 'delete',
                    enchantData: dataKeys[i],
                    itemslot: slot

                }).on({
                    click: e => {
                        removeEnchant(e.target.attributes.enchantData.value, e.target.attributes.itemslot.value)
                        $(e.target).parent().remove();
                    }
                })).appendTo('.selected-enchant')

                const enchantMaterials = dataObject[dataKeys[i]].materials

                const materialKeys = Object.getOwnPropertyNames(enchantMaterials);
                for (let j = 0; j < materialKeys.length; j++) {
                    const materialAmmount = dataObject[dataKeys[i]].materials[materialKeys[j]]
                    for (let x = 0; x < materialAmmount; x++) {
                        materialArray.push(materialKeys[j])
                    }
                }
                calculateData()
            }
        })
        enchantToAppend.push(slotEnchants)
    }
    return enchantToAppend
}

function removeEnchant(enchant, slot) {
    let materialsToDelete = []

    const enchantMaterialsToRemove = allEnchants[slot][enchant].materials

    const materialKeys = Object.getOwnPropertyNames(enchantMaterialsToRemove);
    for (let i = 0; i < materialKeys.length; i++) {
        const materialAmmount = enchantMaterialsToRemove[materialKeys[i]]
        for (let j = 0; j < materialAmmount; j++) {
            materialsToDelete.push(materialKeys[i])
        }
    }

    for (let i = 0; i < materialsToDelete.length; i++) {
        for (let j = 0; j < materialArray.length; j++) {
            if (materialsToDelete[i] === materialArray[j]) {
                materialArray.splice(j, 1)
                break;
            }
        }
    }
    calculateData()
}

function clearData() {
    $(".enchantHolder").empty()
    $(".selected-enchant").empty()
    $('.results').empty()
    $(".enchantable").removeClass('focus')
    materialArray = []
}

function calculateData() {
    $('.results').empty()
    let materialsToAppend = []
    let counts = {};
    materialArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    let material = Object.keys(counts)
    for (let i = 0; i < material.length; i++) {
        let matCat = allMaterials[material[i]].category

        let imageType = (!(material[i]=='gold' || material[i]=='silver')) ? 'jpg' : 'gif'

        let materialsContainer = $('<div/>', {
            class: 'materials-list-item',
            name: `${material[i]}`,
        }).append($('<img/>', {
            class: 'icon-small material-image',
            src: "static/images/icons/small/icon_border.png",
            style: `background-image: url(static/images/icons/small/${material[i]}.${imageType});`,
        }).on({
            mouseenter: e => {
                clear_tooltip()
                tooltip_v2(e, false, 2)
            },
            mouseleave: e => {
                clear_tooltip()
            },
            mousemove: e => {
                move_tooltip(e)
            }
        })).append($('<span/>', {
            text: utilities.titleCase(material[i]),
            class: `materials-name rarity ${allMaterials[material[i]].rarity}`,
        }).on({
            mouseenter: e => {
                clear_tooltip()
                tooltip_v2(e, false, 2)
            },
            mouseleave: e => {

                clear_tooltip()
            },
            mousemove: e => {
                move_tooltip(e)
            }
        })).append($('<span/>', {
            text: ` [${counts[material[i]]}]`,
            class: 'amount',
        }))

        materialsToAppend.push(materialsContainer)
    }
    $('.results').append(materialsToAppend)
}


function materialsTooltip() {
    $(".materials-name, .material-image").on({
        mouseenter: e => {
            clear_tooltip()
            tooltip_v2(e, false, 2)
        },
        mouseleave: e => {
            clear_tooltip()
        },
        mousemove: e => {
            move_tooltip(e)
        }
    });
}

function showEnchantEffect() {
    $('.enchantHolder').on({
        mouseenter: e=> {
            clear_tooltip()
            tooltip_v2(e, false, 3)
        },
        mousemove: e=> {
            move_tooltip(e)
        },
        mouseleave: e=>  {
            clear_tooltip()
        }
    })
}

function move_tooltip(e, staticK=false) {
	let pageY = e.pageY
	let pageX = e.pageX+15
	var coords = get_tooltip_pos(e, staticK)
    const tooltip = $("#tooltip_container")
    tooltip.attr("style", `top: ${coords.y}px; left: ${coords.x}px; visibility: visible; display:block;`)
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
			let border_image = global.static_url+"images/icon_border_2.png"
			let ench_img_name = ENCHANT_IMAGES[thisObj.name]

			let image_name = global.static_url+`images/icons/large/${ench_img_name}.jpg`

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


// used by tooltip_v2
function bigdaddytooltip(e, name, ...args) {
	var tooltip_container = $("#tooltip_container")
	var elems = args[0]
	// let image_name = static_url+`images/icons/medium/materials/${thisObj.name}.jpg`

	var ench_img_name = name;
	if (ENCHANT_IMAGES) {
		ench_img_name = (ENCHANT_IMAGES[name]) ? ENCHANT_IMAGES[name] : name
	}

	var image_name = global.static_url+`images/icons/large/${ench_img_name}.jpg`
	var border_image = global.static_url+"images/icon_border_2.png"
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
