

let materialArray = [];

$(document).ready(initializeApp)

function initializeApp() {
    applyClickHandlers();
}

function applyClickHandlers() {
    $(".enchantable").on({
        click: e => {
            $(".enchantable").removeClass('focus')
            $(".enchantHolder").empty()
            const clickedSlot = $(e.target)
            clickedSlot.addClass('focus')
            findSlot(clickedSlot)
        },

    })
    materialsTooltip()
    // iconHover()

}

function findSlot(selection) {
    const slot = selection.attr("id")
    const dataObject = enchants[slot]
    const dataKeys = Object.keys(enchants[slot])
    const enchantData = getenchantData(dataObject, dataKeys, slot)
    $('.enchantHolder').append($('<div/>', {
        text: slot.toUpperCase(),
        class: 'enchant-slot-title'
    }))
    $('.enchantHolder').append(enchantData)
}

function getenchantData(dataObject, dataKeys, slot) {
    console.log('dataObject: ', dataObject)
    console.log('dataKeys: ', dataKeys)

    let slotEnchants = null
    let enchantToAppend = []
    for (let i = 0; i < dataKeys.length; i++) {
        slotEnchants = $('<div/>', {
            class: 'enchantOption',
            text: titleCase(dataKeys[i]) + " : " + dataObject[dataKeys[i]].effect,
        }).on({
            click: e => {
                $('.enchantOption').removeClass('focus')
                const clickedEnchant = $(e.target)
                clickedEnchant.addClass('focus')
                $('<div/>', {
                    class: 'enchantInfo',
                    text: slot.toUpperCase() + " : " + dataObject[dataKeys[i]].effect,
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
        console.log(material[i])
        console.log(counts[material[i]])
        let matCat = allMaterials[material[i]].category

        let imageType = (!(material[i]=='gold' || material[i]=='silver')) ? 'jpg' : 'gif'

        let materialsContainer = $('<div/>', {
            class: 'materials-list',
        }).append($('<img/>', {
            class: 'icon-small',
            src: "assets/images/icons/small/icon_border.png",
            style: `background-image: url(assets/images/icons/small/materials/${matCat}/${material[i]}.${imageType});`,
        })).append($('<span/>', {
            text: `${counts[material[i]]}`,
            class: 'amount',
        })).append($('<span/>', {
            text: `${counts[material[i]]}`,
            style: "position:absolute; white-space:nowrap; color: black; left: 14px; top: 8px; font-size: 11px; z-index: 4; pointer-events: none;"
        })).append($('<span/>', {
            text: titleCase(material[i]),
            class: `materials-name rarity ${allMaterials[material[i]].rarity}`,
        })).append($('<div/>', {
            class: 'tooltip-container',
        }))

        materialsToAppend.push(materialsContainer)
    }
    $('.results').append(materialsToAppend)
}



function materialsTooltip() {
    $(".results").on({
        mouseenter: e => {
            const closestMat = $( e.target ).closest('.materials-list').find('.materials-name')
            let closestTooltip = $( e.target ).closest( $('.materials-list')).find('div.tooltip-container')

            let matName = closestMat.text()

            if ((closestMat.hasClass('underlined')) || (matName=='Gold' || matName=='Silver')) {
                return
            } else {
                $(".results").find('.materials-name').removeClass('underlined')
                //
                closestMat.addClass('underlined')
                $(".results").find( $('div.tooltip-container') ).children().remove()



                const thisMat = allMaterials[sanitize(matName)]


                const rarity = thisMat.rarity

                const BoP = (thisMat.bop) ? $('<div/>', {
                    class: 'bop',
                    text: "Binds when picked up",
                }) : null

                const unique = (thisMat.unique) ? $('<div/>', {
                    class: 'unique',
                    text: "Unique",
                }) : null

                const requiredLevel = (thisMat.req) ? $('<div/>', {
                    class: 'requiredLevel',
                    text: `Requires Level ${thisMat.req}`,
                }) : null

                const use = (thisMat.use) ? $('<div/>', {
                    class: 'use',
                    text: `Use: ${thisMat.use}`,
                }) : null

                const description = (thisMat.description) ? $('<div/>', {
                    class: 'description',
                    text: `"${thisMat.description}"`,
                }) : null

                closestTooltip.append($('<div/>', {
                    class: 'enchant-tooltip',
                 }).append($('<div/>', {
                    class: `title ${rarity}`,
                    text: matName,
                })).append(BoP).append(unique).append(requiredLevel).append(use).append(description)
            )

            }
        },
        mouseleave: e => {
            $(".results").find('.materials-name').removeClass('underlined')
            $(".results").find( $('div.tooltip-container') ).children().remove()

            // const targetMaterial = $( e.target ).closest('.materials-list').find('div.tooltip-container')
            // targetMaterial.children().remove()
        }
    })
}

function titleCase(str){
    let strArr = str.replace(/\_/g, ' ').split(' ')
    strArr.forEach(function(word, i) {
        if (!(word=='of' || word=='the') && typeof(word)=='string'){
            strArr[i] = word.charAt(0).toUpperCase() + word.slice(1)
        }
    })
    return strArr.join(' ')
}

function sanitize(str) {
    return str.toLowerCase().replace(/\s+/g, '_')
}

// function iconHover() {
//     $(".materials-name").on({
//         mouseover: e => {
//             console.log($(e.target))
//
//             let mat = $( e.target ).closest('.materials-list').find('.materials-name')
//             mat.attr('style', "text-decoration: underline;")
//
//         }
//     })
// }
