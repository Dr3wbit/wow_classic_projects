
$(document).ready(initializeApp)

function initializeApp() {
    applyClickHandlers();
}

function applyClickHandlers() {
    $(".enchantable").on('click', e => {
        const clickedSlot = $(e.target)
        findSlot(clickedSlot)
    })
}

function findSlot(selection) {
    const slot = selection.attr("id");
    const dataObject = enchants[slot]
    const compiledData = Object.keys(enchants[slot]);
    if (compiledData === "undefined") return
    console.log(compiledData)

}

function enchantData(compiledData){
    slotEnchants = null
    enchantToAppend = []
    for (let i=0; i < compiledData.length; i++){
        slotEnchants = $('<div/>', {
            title: compiledData[i],
        })
        enchantToAppend.push(slotEnchants)
    }
    return enchantToAppend
}
