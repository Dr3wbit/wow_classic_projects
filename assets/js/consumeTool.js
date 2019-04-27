let selectedData = {}
let materialArray = []

$(document).ready(initializeApp)

function initializeApp() {
    $(".consume-form").submit(function (e) {
        e.preventDefault();
    });
    applyClickHandlers();
    $(".consume-form").on('keyup', (e) => {
        $('.consume-form').submit(getMaterials(e, selectedData))
    })
}

function applyClickHandlers() {
    $('.class-filter').on({
        click: e => {
            $('.class-filter').removeClass('selected')
            const clickedFilter = $(e.target)
            clickedFilter.addClass('selected')
            const clickedID = clickedFilter[0].id
            const defaultData = consumes.find((a) => {
                return a.name == "all"
            })
            const classData = consumes.find((a) => {
                return a.name == clickedID;
            })
            const fullData = combineData(defaultData.data, classData.data)
            selectedData = fullData
            clearForm()
            populateConsumeBlocks({ professions: fullData })
        },
    })
}

function clearForm() {
    $('.consume-form').empty()
}

function combineData(defaultData, classData) {
    let combinedData = []
    defaultData.map((item, index) => {
        combinedData.push({ name: item.name, data: item.data.concat(classData[index].data) })
    })
    const cleanedData = removeEmptyCategory(combinedData)
    return cleanedData
}

function removeEmptyCategory(dataToClean) {
    let refinedData = []
    dataToClean.map((item) => {
        if (item.data.length > 0) {
            refinedData.push(item)
        }
    })
    return refinedData
}

function populateConsumeBlocks(data) {
    console.log(data)

    //Retrieve the template data from the HTML .
    let template = $('#consume-block-template').html();
    //Compile the template data into a function
    let templateScript = Handlebars.compile(template);

    let consume_html = templateScript(data);
    $('#consume-form').html(consume_html);




}


// function getData() {
//     const dataObject = selectedData
//     const dataKeys = Object.keys(dataObject)
//     const consumeData = createConsumeBlocks(dataObject, dataKeys)
//     $('.consume-form').append(consumeData)
// }

// function createConsumeBlocks(dataObject, dataKeys) {
//     let consumeBlock = null
//     let consumesToAppend = []
//     for (let i = 0; i < dataKeys.length; i++) {
//         consumeBlock = $('<div/>', {
//             class: 'consume-block',
//         }).append(
//             iconContainer = $('<div/>', {
//                 class: 'icon-container'
//             }).on({ 
//                 mouseenter: (e) =>{
//                     $(e.currentTarget.children[1]).removeClass('tooltip-hidden')
//                     },
//                mouseleave: (e) =>{
//                     $(e.currentTarget.children[1]).addClass('tooltip-hidden')
//                     }
//             })
//             .append(
//                 consumeImg = $('<img/>', {
//                     class: 'consume-img',
//                     src: 'assets/images/icon_border_2.png',
//                 }).css("background-image", 'url(assets/images/consumes/'+ dataObject[dataKeys[i]].img +')')
//             )
//             .append(
//                 tooltip = $('<div/>', {
//                     class: 'consume-tooltip tooltip-hidden',
//                     text: dataObject[dataKeys[i]].effect
//                 }),
//             ),
//             consumeName = $('<div/>', {
//                 class: 'consume-title',
//                 text: dataObject[dataKeys[i]].name
//             }).append(
//                 consumeInput = $('<input/>', {
//                     class: 'consume-input',
//                     name: dataKeys[i],
//                     type: 'number',
//                     placeholder: 'Amount',
//                     maxLength: 3,
//                     oninput: "if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
//                 }),
//             )
//         )
//         consumesToAppend.push(consumeBlock)
//     }
//     return consumesToAppend
// }

function getMaterials(e, data) {
    const targetProfession = e.target.attributes.category.value
    const targetItem = e.target.name
    const inputValue = e.target.value
    const profession = data.find((a) => {
        return a.name == targetProfession
    })
    const item = profession.data.find((a) => {
        return a.name == targetItem
    })

    let materialsToAppend = []
    Object.keys(item.materials).map(key => {
        materialsToAppend.push({[key] : item.materials[key]*inputValue})
    });
    console.log({[item.name] : materialsToAppend})







//     materialArray = []
//     console.log(data)
//     const formValues = $('.consume-input')
//     console.log(formValues)
//     for (let i = 0; i < formValues.length; i++) {
//         const name = formValues[i].attributes.name.value
//     const materials = findMaterials(name, data)
// }

    //     const consumeMaterials = data[dataKeys[i]].materials
    //     const materialKeys = Object.getOwnPropertyNames(consumeMaterials);
    //     for (let j = 0; j < materialKeys.length; j++) {
    //         const materialAmmount = dataObject[dataKeys[i]].materials[materialKeys[j]] * formValues[i].value
    //         for (let x = 0; x < materialAmmount; x++) {
    //             materialArray.push(materialKeys[j])
    //         }
    //     }


}

function findMaterials(name, data){
    
}



function calculateData() {
    $('.results').empty()
    let materialsToAppend = []
    let counts = {};
    materialArray.forEach((x)=>{ counts[x] = (counts[x] || 0) + 1; });
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