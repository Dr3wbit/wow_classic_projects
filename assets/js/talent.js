
let talentsPointsSpent = 0

$(document).ready(initializeApp)

function initializeApp() {
    applyClickHandlers();
}

function applyClickHandlers() {
    classSelectionHandler()
    talentClickedHandler()
}

function populateTables(classData){
    //Retrieve the template data from the HTML .
	let template = $('#handlebars-demo2').html();
	//Compile the template data into a function
    let templateScript = Handlebars.compile(template);

    let talent_html = templateScript(classData);
    Handlebars.registerHelper('if', function(context, options) {
        if (context) {
            // console.log("context: ", context)
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    $('#talentCalc').html(talent_html);
    talentClickedHandler()
}

//~~~~~~~~~~~////////KEEP THIS////////~~~~~~~~~~//

// function createTalents(data) {
//     if(data){                       //only warlock has data
//        const talentList = combineTalents(data)
//        let talentsToAppend = []
//     for (let talentIterator = 0; talentIterator < talentList.length; talentIterator++) {
//         let data = talentList[0]
//         talent = $('<div/>', {
//             value: 0,
//             class: 'talent',
//             name: data.name,
//             description: data.description,
//             maxRank: data.maxRank,
//             requiredTalentPoints: data.requiredTalentPoints,
//             unlocks: data.unlocks,
//             locked: data.locked
//         })
//         if (data.locked){
//             talent.addClass('locked')
//         }
//         talentsToAppend.push(talent)
//     }
//     return talentsToAppend
//     }
// }

function classSelectionHandler(){
    $('.class-filter').on({
		click: e => {
			$('.class-filter').removeClass('selected')
			const clickedFilter = $(e.target)
			clickedFilter.addClass('selected')
			const clickedID = clickedFilter[0].id
			const selectedClass = talentData.classes.find(function(a) {
				return a.name == clickedID;
            })
            const tableData = tableFormat[clickedID]
            const combinedTalents = combineTalents(selectedClass)
            const finalData = mapTalentsToTableData(tableData.trees, combinedTalents)
            console.log({trees: finalData});
            populateTables({trees: finalData})
		},
	})
}

function mapTalentsToTableData(tableData, talents){
    let spellIterator = 0
    for(let treeIterator = 0; treeIterator < tableData.length; treeIterator++){
        for(let rowIterator = 0; rowIterator < tableData[treeIterator].data.length; rowIterator++){
            for(let talentIterator = 0; talentIterator < tableData[treeIterator].data[rowIterator].length; talentIterator++){
                const slot = tableData[treeIterator].data[rowIterator][talentIterator]
                if (slot != 0){
                    tableData[treeIterator].data[rowIterator].splice(talentIterator, 1, talents[spellIterator])
                    spellIterator++
                }
            }
        }
    }
    return tableData
}

function combineTalents(data){
    if(data){
        data = data.tree_talents
    let combinedTalents = []
    for(let treeIterator = 0; treeIterator < data.length; treeIterator++){
        for(let talentIterator = 0; talentIterator < data[treeIterator].talents.length; talentIterator++)
        combinedTalents.push(data[treeIterator].talents[talentIterator])
    }
    return combinedTalents
    }
}

function talentClickedHandler(){
    $(".talent").on({
        //for talent tooltips on hover?
        contextmenu: e => {
            e.preventDefault()
        },

        mousedown: e => {
            const clickedTalent = $(e.target)
            console.log("e: ", e)

            // console.log("spentpoints: ", $(".spentPoints").attr('val'))
            console.log("clickedTalent.children: ", clickedTalent.children())

            // console.log("clickedTalent.dataset: ", clickedTalent.dataset)

            const unlocks = clickedTalent.attr('data-unlocks')
            const locked = clickedTalent.attr('data-locked')
            const maxRank = clickedTalent.attr('data-maxrank')

            // not accessible through dataset, unsure why
            // const maxRank = clickedTalent.dataset.maxrank

            console.log(maxRank)
            const requiredTalentPoints = clickedTalent.attr('data-requiredtalentpoints')
            clickedTalent.attr('points', function (index, val=0) {
                const pointValue = parseInt(val)

                if ( talentsPointsSpent < requiredTalentPoints){
                    console.log('you must have ' +requiredTalentPoints+ ' points in this tree to spec here')
                    return
                }
                if (locked === 'true'){
                    return
                }

                // normal click
                if (e.which === 1) {
                    if (pointValue < maxRank){
                        talentsPointsSpent++
                        return pointValue + 1
                    }
                }

                // right click
                else if (e.which === 3) {
                    if (pointValue == maxRank && unlocks){
                        const unspecable = checkIfAbleToUnspec(clickedTalent)
                        if (unspecable === true){
                            console.log('you must unspec ' + unlocks)
                            return
                        }
                    }
                    if (pointValue > 0){
                        talentsPointsSpent--
                        return pointValue - 1
                    }
                }
            })
            const points = clickedTalent.attr('points')
            $
            checkForUnlock(unlocks, maxRank, points)
            clickedTalent.children()[0].innerText = ((points !== undefined)? points : 0)
            console.log(clickedTalent.attr('name') +" : "+ points)
        }
    })
}

function checkForUnlock(unlocks, maxRank, value) {
    if (unlocks && value === maxRank){
        const talentReference = unlocks
        $('#'+ talentReference).attr('locked', function (index, originalValue) {
            return false
        })
        $('#'+ talentReference).removeClass('locked')
        console.log(talentReference + " is Unlocked.")
    }
    else if (unlocks && value !== maxRank){
        const talentReference = unlocks
        $('#'+ talentReference).attr('locked', function (index, originalValue) {
            return true
        })
        $('#'+ talentReference).addClass('locked')
        console.log(talentReference + " is locked.")
    }
}

function checkIfAbleToUnspec (clickedTalent) {
    let talent = clickedTalent.attr('unlocks')
    let value = $('#' + talent).attr('value')
    if (value !== '0'){
        return true
    }
}
