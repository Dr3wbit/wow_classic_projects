

let selectedClass = null
let selectedInformation = null

$(document).ready(initializeApp)

function initializeApp() {
    applyClickHandlers();
}

function applyClickHandlers() {
    $('.class-filter').on({
        click: e => {
            $('.class-filter').removeClass('selected')
            $('.information-selection').removeClass('selected')
            const clickedFilter = $(e.target)
            clickedFilter.addClass('selected')
            const clickedID = clickedFilter[0].id
            selectedClass = { ...specsAndGuidesData[clickedID] }
            clearForm()
            $('.information-container').append($('<h1/>', {
                text: 'Select a Side Option',
            })).css("color", "azure")

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
            console.log(selectedInformation)
            const informationBlock = createInformationBlock(selectedInformation);
            $('.information-container').append(informationBlock)
        },
    })
}

function createInformationBlock(subData) {
    let informationBlock = null
    let informationToAppend = []
    const dataKeys = Object.keys(subData)
    console.log(dataKeys)
    for (let i = 0; i < dataKeys.length; i++) {

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
                        })
                            .append($('<li/>', {
                                text: subData[dataKeys[i]].description[0]
                            }))
                            .append($('<li/>', {
                                text: subData[dataKeys[i]].description[1]
                            }))
                            .append($('<li/>', {
                                text: subData[dataKeys[i]].description[2]
                            })))
                    )

                ),

                $('<div/>', {
                    class: 'col-9'
                })
                    .append(
                        $('<div/>', {
                            class: 'content',
                        }).css("background-image", 'url(' + subData[dataKeys[i]].image + ')'),
                    )
            )

        // for (let j = 0; j < subData[dataKeys[i]].description.length; j++){

        // $('<li/>', {
        //         text: subData[dataKeys[i]].description[i]
        //     }).appendTo($('.content-list' + i))
        // }

        informationToAppend.push(informationBlock)
    }


    return informationToAppend

}

function clearForm() {
    $('.information-container').empty()
}
