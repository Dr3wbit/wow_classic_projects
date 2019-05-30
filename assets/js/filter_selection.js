
const classDataNames = {
    classes: [
        { name: 'warrior', upper: 'Warrior' },
        { name: 'mage', upper: 'Mage' },
        { name: 'druid', upper: 'Druid' },
        { name: 'paladin', upper: 'Paladin' },
        { name: 'shaman', upper: 'Shaman' },
        { name: 'warlock', upper: 'Warlock' },
        { name: 'priest', upper: 'Priest' },
        { name: 'hunter', upper: 'Hunter' },
        { name: 'rogue', upper: 'Rogue' },
    ]
}

$(document).ready(initializeApp)

function initializeApp() {
    createClasses(classDataNames)
}

function createClasses(classDataNames){
    const templateScript = Handlebars.templates.filter_selection(classDataNames);
    $('#main-container').prepend(templateScript);
}
