
const navBarData = {
    links: [
        { text: 'Specs & Guides', href: "specsAndGuides.html" },
        { text: 'Talent Calculator', href: "talent.html" },
        { text: 'Consumable Tool', href: "consumeTool.html" },
        { text: 'Enchant Tool', href: "enchantTool.html" },
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