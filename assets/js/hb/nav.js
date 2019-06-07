
const navBarData = {
    links: [
        { text: 'Specs & Guides', href: "specsAndGuides" },
        { text: 'Talent Calculator', href: "talent" },
        { text: 'Consumable Tool', href: "consumeTool" },
        { text: 'Enchant Tool', href: "enchantTool" },
        { text: 'Contact', href: "contact" },
    ]
}

$(document).ready(initializeApp)

function initializeApp() {
    createNav(navBarData)
    applyPageSelection()
}

function createNav(navBarData){
    const templateScript = Handlebars.templates.nav(navBarData);
    $('#nav-container').append(templateScript);
}

function applyPageSelection(){
    let pageLocation = window.location.pathname
    if(pageLocation === '/' | pageLocation === '/index'){
        let currentPage = $('.navbar-brand')
        currentPage.addClass('nav-item-selected')
    }else{
        let saniLocation = pageLocation.replace(/\//g,'');
        let currentPage = $('.nav-link[href= '+ saniLocation +']')
        currentPage.addClass('nav-link-selected')
        currentPage.parent().addClass('nav-item-selected')
    }
    
}
