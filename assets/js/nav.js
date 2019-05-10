
const navBarData = {
    links: [
        { text: 'Specs & Guides', href: "specsAndGuides" },
        { text: 'Talent Calculator', href: "talent" },
        { text: 'Consumable Tool', href: "consumeTool" },
        { text: 'Enchant Tool', href: "enchantTool" },
        { text: 'Chat', href: "chat.html" }
    ]
}

$(document).ready(initializeApp)

function initializeApp() {
    createNav(navBarData)
}

function createNav(navBarData){
    const templateScript = Handlebars.templates.nav(navBarData);
    $('#nav-container').append(templateScript);
}
