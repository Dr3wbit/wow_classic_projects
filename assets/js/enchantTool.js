

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
            text: dataObject[dataKeys[i]].name + " : " + dataObject[dataKeys[i]].effect,
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
                    text: '✘',
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

        let materialsContainer = $('<div/>', {
            class: 'icon-small',
            text: `${counts[material[i]]}`,

            // src: "assets/images/icons/small/icon_border.png",
            style: `background-image: url(assets/images/icons/small/materials/enchanting/${material[i]}.jpg); color: magenta;`,
        }).append($('<span/>', {
            text: material[i],
            class: 'totalMaterials',
            // text: 'count '+material[i].replace(/_/g, " ") + ": " + counts[material[i]]
        }))

        // .append('<div/>', {
        //     text: `count ${counts[material[i]]}`,
        //     // class: 'totalMaterials',
        //     // text: 'count '+material[i].replace(/_/g, " ") + ": " + counts[material[i]]
        // })
        // materialsContainer = materialsContainer.wrapAll("<div class='new' />")

        materialsToAppend.push(materialsContainer)
    }
    $('.results').append(materialsToAppend)
}
