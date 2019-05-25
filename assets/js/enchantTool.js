

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
    showEnchantEffect()
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
        }))

        materialsToAppend.push(materialsContainer)
    }
    $('.results').append(materialsToAppend)
}



function materialsTooltip() {
    $(".results").on({
        mouseenter: e => {

            const closestMat = $( e.target ).closest('.materials-list').find('.materials-name')
            const tooltipContainer = $("#tooltip")

            let matName = closestMat.text()

            if ((closestMat.hasClass('underlined')) || (matName=='Gold' || matName=='Silver')) {
                return
            } else {
                $(".results").find('.materials-name').removeClass('underlined')

                closestMat.addClass('underlined')
                tooltipContainer.children().remove()
                tooltipContainer.attr("style", `top: ${e.pageY}px; left: ${e.pageX}px; visiblity: visible;`)
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


                tooltipContainer.append($('<div/>', {
                    class: 'tooltip-container',
                    }).append($('<div/>', {
                    class: `title ${rarity}`,
                    text: matName,
                    })).append(BoP).append(unique).append(requiredLevel).append(use).append(description)
                )
                let distanceFromTop = tooltipContainer.offset().top - $(window).scrollTop()
            }
        },
        mouseleave: e => {
            $(".results").find('.materials-name').removeClass('underlined')
            $("#tooltip").hide()
            $("#tooltip").children().remove()

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


function showEnchantEffect() {
    $('.enchantHolder').on({
        mouseenter: e=> {
            const tooltipContainer = $("#tooltip")
            const targetEnchant = $(e.target)
            let a = targetEnchant.text()
            let matched = a.match(/([\w\s]+):/)

            if (matched) {
                const selection = $("div.itemslot.enchantable.focus")
                const slot = selection.attr("id")

                const b = sanitize(matched[1].trim())

                const thisEnch = enchants[slot][b]

                const enchName = titleCase(b)
                const slotName = titleCase(slot.toLowerCase())

                let title = $('<div/>', {
                   class: `tooltip-container title spell`,
                   text: `Enchant ${slotName} - ${enchName}`,
                   style: 'display: block; visibility: hidden;'
                })

                const offset = title.offset()
                tooltipContainer.attr("style", `top: ${e.pageY}px; left: ${e.pageX}px;`)
                tooltipContainer.append(title)
                e.stopPropagation()
                const width = tooltipContainer.width()


                tooltipContainer.attr("style", `top: ${e.pageY}px; left: ${e.pageX}px; max-width: ${width*1.1+10}px; visibility: visible;`)

                title.attr("style", "visibility: visible;")
                tooltipContainer.append($('<div/>', {
                    class: 'description',
                    text: thisEnch.description,
                    style: 'max-width: inherit; font-size: 12px;'
                }))
            }
        },
        mouseleave: e=>  {
            $("#tooltip").children().remove()
            $("#tooltip").hide()
        }
    })
}
