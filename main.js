

var materialArray = [];

$(document).ready(initializeApp)

function initializeApp() {
    applyClickHandlers();
    $('[data-toggle="tooltip"]').tooltip()
}

function applyClickHandlers() {
    $(".enchantable").on({
        click: e => {
        $(".enchantable").removeClass('focus')
        $(".rightSideBar").empty()
        const clickedSlot = $(e.target)
        clickedSlot.addClass('focus')
        findSlot(clickedSlot)
        },
   })
}

function findSlot(selection) {
    const slot = selection.attr("id");
    const dataObject = enchants[slot]
    const dataKeys = Object.keys(enchants[slot])
    enchantData = getenchantData(dataObject, dataKeys, slot)
    $('.rightSideBar').append($('<div/>', {
        text: slot,
        class: 'enchant-slot-title'
    }))
    $('.rightSideBar').append(enchantData)
    $('[data-toggle="tooltip"]').tooltip()

}

function getenchantData(dataObject, dataKeys, slot){
    slotEnchants = null
    enchantToAppend = []
    for (let i=0; i < dataKeys.length; i++){
        slotEnchants = $('<div/>', {
            class: 'enchantOption',
            text: dataObject[dataKeys[i]].name,
            'data-toggle': "tooltip",
            title: dataObject[dataKeys[i]].effect,
            'data-placement' : "right"
        }).on({
            click: e => {
                $('.enchantOption').removeClass('focus')
                const clickedEnchant = $(e.target)
                clickedEnchant.addClass('focus')
                $('<div/>', {
                    class: 'enchantInfo',
                    text: slot + ": " + dataObject[dataKeys[i]].effect
                }).appendTo('.selected-enchant')

                const enchantMaterials = dataObject[dataKeys[i]].materials

                const materialKeys = Object.getOwnPropertyNames(enchantMaterials);
                for(let j =0; j< materialKeys.length; j++){
                    const materialAmmount = dataObject[dataKeys[i]].materials[materialKeys[j]]
                    for(let x = 0; x < materialAmmount; x++){
                        materialArray.push(materialKeys[j])
                    }
                }
                console.log(materialArray)
                






                // for (let prop in enchantMaterials) {
                //     if (enchantMaterials.hasOwnProperty(prop)) {
                //       let innerObj = {};
                //       innerObj[prop] = enchantMaterials[prop];
                //       materialArray.push(innerObj)
                //     }
                //   }
                //   console.log(materialArray);
            }
        })
        enchantToAppend.push(slotEnchants)
    }
    return enchantToAppend
}

function clearData() {
    $(".rightSideBar").empty()
    $(".selected-enchant").empty()
    $('.results').empty()
    $(".enchantable").removeClass('focus')
    materialArray = []
}

function calculateData(){
    let counts = {};
    materialArray.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
    console.log(JSON.stringify(counts))
    $('.results').text(JSON.stringify(counts))
}