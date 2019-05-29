

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
    const dataObject = enchants[slot]
    let dataKeys = []

    if (filter === "end_game"){
        dataKeys = Object.keys(enchants[slot])
        let filteredKeys = []
        dataKeys.forEach(key => {
            if(dataObject[key].filter === "end_game"){
                filteredKeys.push(key)
            }
        })
        dataKeys = filteredKeys
    }else{
        dataKeys = Object.keys(enchants[slot])
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
                    text: text
                }).prepend($('<button/>', {
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

    const enchantMaterialsToRemove = enchants[slot][enchant].materials

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
            class: 'materials-list',
        }).append($('<img/>', {
            class: 'icon-small',
            src: "assets/images/icons/small/icon_border.png",
            style: `background-image: url(assets/images/icons/small/materials/${matCat}/${material[i]}.${imageType});`,
        })).append($('<span/>', {
            text: utilities.titleCase(material[i]),
            class: `materials-name rarity ${allMaterials[material[i]].rarity}`,
        })).append($('<span/>', {
            text: ` [${counts[material[i]]}]`,
            class: 'amount',
        }))

        materialsToAppend.push(materialsContainer)
    }
    $('.results').append(materialsToAppend)
}
// NOTE !old
//
// function calculateData() {
//     $('.results').empty()
//     let materialsToAppend = []
//     let counts = {};
//     materialArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
//     let material = Object.keys(counts)
//     for (let i = 0; i < material.length; i++) {
//         let matCat = allMaterials[material[i]].category
//
//         let imageType = (!(material[i]=='gold' || material[i]=='silver')) ? 'jpg' : 'gif'
//
//         let materialsContainer = $('<div/>', {
//             class: 'materials-list',
//         }).append($('<img/>', {
//             class: 'icon-small',
//             src: "assets/images/icons/small/icon_border.png",
//             style: `background-image: url(assets/images/icons/small/materials/${matCat}/${material[i]}.${imageType});`,
//         })).append($('<span/>', {
//             text: `${counts[material[i]]}`,
//             class: 'amount',
//         })).append($('<span/>', {
//             text: `${counts[material[i]]}`,
//             style: "position:absolute; white-space:nowrap; color: black; left: 14px; top: 8px; font-size: 11px; z-index: 4; pointer-events: none;"
//         })).append($('<span/>', {
//             text: utilities.titleCase(material[i]),
//             class: `materials-name rarity ${allMaterials[material[i]].rarity}`,
//         }))
//
//         materialsToAppend.push(materialsContainer)
//     }
//     $('.results').append(materialsToAppend)
// }



function materialsTooltip() {
    $(".results").on({
        mouseenter: e => {

            const closestMat = $( e.target ).closest('.materials-list').find('.materials-name')
            let matName = closestMat.text()

            if ((closestMat.hasClass('underlined')) || (matName=='Gold' || matName=='Silver')) {
                return
            } else {
                $(".results").find('.materials-name').removeClass('underlined')
                closestMat.addClass('underlined')
				$("#tooltip").children().remove()
				$("#tooltip").hide()
                const thisMat = allMaterials[utilities.sanitize(matName)]

				const rarity = thisMat.rarity
				const tooltipElems = [{class: `title ${rarity}`, text: matName}]
                if (thisMat.bop) {
                    tooltipElems.push({class:'bop', text: "Binds when picked up"})
                }
                if (thisMat.unique) {
                    tooltipElems.push({class: 'unique', text: "Unique",})
                }
				if (thisMat.req){
                    tooltipElems.push({class: 'requiredLevel', text: `Requires Level ${thisMat.req}`})
                }
                if (thisMat.use) {
                    tooltipElems.push({class: 'use', text: `Use: ${thisMat.use}`})
                }
                if (thisMat.description) {
                    tooltipElems.push({class: 'description', text:`"${thisMat.description}"`})
                }

				utilities.bigdaddytooltip(e, tooltipElems)
            }
        },
        mouseleave: e => {
            $(".results").find('.materials-name').removeClass('underlined')
            $("#tooltip").hide()
            $("#tooltip").children().remove()

        }
    })
}

function showEnchantEffect() {
    $('.enchantHolder').on({
        mouseenter: e=> {
        	const tooltipElems = []
        	const targetEnchant = $(e.target)
        	let a = targetEnchant.text()
        	let matched = a.match(/([\w\s]+):/)
        	if (matched) {
        		const selection = $("div.itemslot.enchantable.focus")
        		const slot = selection.attr("id")
        		const b = utilities.sanitize(matched[1].trim())
        		const thisEnch = enchants[slot][b]
        		const enchName = utilities.titleCase(b)
        		const slotName = utilities.titleCase(slot.toLowerCase())
        		tooltipElems.push({class: "title spell", text: `Enchant ${slotName} - ${enchName}`,})
        		tooltipElems.push({class: "description", text: thisEnch.description})
        		utilities.bigdaddytooltip(e, tooltipElems)
        	}
        },
        mouseleave: e=>  {
            $("#tooltip").children().remove()
            $("#tooltip").hide()
        }
    })
}
