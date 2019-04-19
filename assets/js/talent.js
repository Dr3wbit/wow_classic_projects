
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
    Handlebars.registerHelper('if', function(data, options) {
        if (data > 0) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    $('#talentCalc').html(talent_html);
    talentClickedHandler()
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
            const classData = combineTalents(selectedClass)  //use createTalents if we need to use jQuery
            const tableData = tableFormat[clickedID]
            let joinedData = Object.assign({}, tableData, {talents : classData});
            console.log(joinedData);
            populateTables(joinedData)
		},
	})
}

function talentClickedHandler(){
    $(".talent").on({
        contextmenu: e => {
            e.preventDefault()
        },
        mousedown: e => {
            const clickedTalent = $(e.target)
            const unlocks = clickedTalent.attr('unlocks')
            const locked = clickedTalent.attr('locked')
            const maxRank = clickedTalent.attr('maxRank')
            const requiredTalentPoints = clickedTalent.attr('requiredTalentPoints')
            clickedTalent.attr('value', function (index, originalValue) {
                const pointValue = parseInt(originalValue)

                if ( talentsPointsSpent < requiredTalentPoints){
                    console.log('you must have ' +requiredTalentPoints+ ' points in this tree to spec here')
                    return
                }
                if (locked === 'true'){
                    return
                }
                if (e.which === 1) {
                    if (pointValue < maxRank){
                        talentsPointsSpent++
                        return pointValue + 1
                    }
                }
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
            const value = clickedTalent.attr('value')
            checkForUnlock(unlocks, maxRank, value)
            console.log(clickedTalent.attr('name') +" : "+ value)
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