


const navBarData = {
    links: [
        { text: 'Enchant Tool', href: "enchantTool.html" },
        { text: 'Consumable Tool', href: "consumeTool.html" },
        { text: 'Specs & Guides', href: "specsAndGuides.html" },
        { text: 'Talent Calculator', href: "talent.html" },
        { text: 'About', href: "about.html" }
    ]
}

$(document).ready(initializeApp)

function initializeApp() {
    createNav(navBarData)
}

function createNav(navBarData){
    //Retrieve the template data from the HTML .
	let template = $('#nav-template').html();
	//Compile the template data into a function
    let templateScript = Handlebars.compile(template);
    let talent_html = templateScript(navBarData);
    $('#nav-container').html(talent_html);
}