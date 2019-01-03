
let materialArray = []
let selectedData = null

$(document).ready(initializeApp)

function initializeApp() {
    $(".consume-form").submit(function (e) {
        e.preventDefault();
    });
    applyClickHandlers();
    $(".consume-form").on('keyup', () => {
        $('.consume-form').submit()
    })
}

function applyClickHandlers() {
    $('.class-filter').on({
        click: e => {
            $('.class-filter').removeClass('selected')
            const clickedFilter = $(e.target)
            clickedFilter.addClass('selected')
            const clickedID = clickedFilter[0].id
            selectedData = { ...consumes[clickedID], ...consumes['all'] }
            clearForm()
            getData()
        },
    })
}

function clearForm() {
    $('.consume-form').empty()
}


function getData() {
    const dataObject = selectedData
    const dataKeys = Object.keys(dataObject)
    const consumeData = createConsumeBlocks(dataObject, dataKeys)
    $('.consume-form').append(consumeData)
}

function createConsumeBlocks(dataObject, dataKeys) {
    let consumeBlock = null
    let consumesToAppend = []
    for (let i = 0; i < dataKeys.length; i++) {
        consumeBlock = $('<div/>', {
            class: 'consume-block',
        }).append(
            consumeImg = $('<img/>', {
                class: 'consume-img',
                src: 'assets/images/icon_border_2.png',
            }).css("background-image", 'url('+ dataObject[dataKeys[i]].img +')'),
            consumeName = $('<div/>', {
                class: 'consume-title',
                text: dataObject[dataKeys[i]].name
            }).append(
                consumeInput = $('<input/>', {
                    class: 'consume-input',
                    name: dataKeys[i],
                    type: 'number',
                    placeholder: 'Amount',
                    maxLength: 3,
                    oninput: "if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                }),
            )
        )
        consumesToAppend.push(consumeBlock)
    }
    return consumesToAppend
}

function getMaterials() {
    materialArray = []
    const dataObject = selectedData
    const dataKeys = Object.keys(dataObject)
    const formValues = $('.consume-input')
    for (let i = 0; i < formValues.length; i++) {
        const consumeMaterials = dataObject[dataKeys[i]].materials
        const materialKeys = Object.getOwnPropertyNames(consumeMaterials);
        for (let j = 0; j < materialKeys.length; j++) {
            const materialAmmount = dataObject[dataKeys[i]].materials[materialKeys[j]] * formValues[i].value
            for (let x = 0; x < materialAmmount; x++) {
                materialArray.push(materialKeys[j])
            }
        }
    }
    calculateData();
}

function calculateData() {
    $('.results').empty()
    let materialsToAppend = []
    let counts = {};
    materialArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    let material = Object.keys(counts)
    for (let i = 0; i < material.length; i++) {
        let totalMaterialCount = $('<div/>', {
            class: 'total-materials',
            text: material[i].replace(/_/g, " ") + ": " + counts[material[i]]
        })
        materialsToAppend.push(totalMaterialCount)
    }
    $('.results').append(materialsToAppend)
}