

let selectedClass = null
let selectedInformation = null

$(document).ready(initializeApp)

function initializeApp() {
    applyClickHandlers();
    pullDefaultData();
    //add auto scroll to top
}

function applyClickHandlers() {
    $('.class-filter').on({
        click: e => {
            $('.class-filter').removeClass('selected')
            const clickedFilter = $(e.target)
            clickedFilter.addClass('selected')
            const clickedID = clickedFilter[0].id
            selectedClass = { ...specsAndGuidesData[clickedID] }
            clearForm()
            if (selectedInformation != null){
                pullSelectedInformation()
            }
        },
    })

    $('.information-selection').on({
        click: e => {
            clearForm()
            $('.information-selection').removeClass('selected')
            const clickedFilter = $(e.target)
            clickedFilter.addClass('selected')
            const clickedID = clickedFilter[0].id
            selectedInformation = { ...selectedClass[clickedID] }
            const informationBlock = createInformationBlock(selectedInformation);
            $('.information-container').append(informationBlock)
        },
    })
}

function pullDefaultData() {
    $('#warrior, #pve_specs').addClass('selected')
    selectedClass = { ...specsAndGuidesData['warrior'] }
    selectedInformation = { ...selectedClass['pve_specs'] }
    const informationBlock = createInformationBlock(selectedInformation);
    $('.information-container').append(informationBlock)
}

function pullSelectedInformation(){
    previouslySelectedInformation = $('.information-selection.selected')[0].id
    selectedInformation = { ...selectedClass[previouslySelectedInformation] }
            const informationBlock = createInformationBlock(selectedInformation);
            $('.information-container').append(informationBlock)
}

function createInformationBlock(subData) {
    let informationBlock = null
    let informationToAppend = []
    let descriptionBlock = null
    let descriptionToAppend = []
    const dataKeys = Object.keys(subData)
    for (let i = 0; i < dataKeys.length; i++) {
        descriptionToAppend = []
        for (let j = 0; j < subData[dataKeys[i]].description.length; j++) {
            descriptionBlock = $('<li/>', {
                class: 'description-text',
                text: subData[dataKeys[i]].description[j]
            })
            descriptionToAppend.push(descriptionBlock)
        }

        informationBlock = $('<div/>', {
            class: 'information-block row'
        })
            .append($('<div/>', {
                class: 'col-3',
            })
                .append($('<div/>', {
                    class: 'content-description'
                })
                    .append($('<div/>', {
                        class: 'content-title',
                        text: subData[dataKeys[i]].name
                    }))
                    .append($('<div/>', {
                        class: 'content-text'
                    })
                        .append($('<ul/>', {
                            class: 'content-list' + i
                        }).append(descriptionToAppend)
                        )
                    )
                ),
                $('<div/>', {
                    class: 'col-9'
                })
                    //TODO not always gunna be an image fix DOM Creation
                    .append(
                        $('<div/>', {
                            class: 'content',
                        }).css("background-image", 'url(' + subData[dataKeys[i]].image + ')'),
                    )
            )
        informationToAppend.push(informationBlock)
    }
    return informationToAppend

}

function clearForm() {
    $('.information-container').empty()
}
