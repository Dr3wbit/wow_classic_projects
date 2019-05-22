$(document).ready(initializeApp)

function initializeApp() {

	applyClickHandlers()
	$('#warrior').addClass('selected')
	populateData(context.classes[0]);
	//sticky nav color change
	$(window).scroll(() => {
		if ($(document).scrollTop() > 88.2) {
			$('.content-selection-container').css('top', '130px')
		}
		});
}


function applyClickHandlers() {
	$('.class-filter').on({
		click: e => {
			$('.class-filter').removeClass('selected')
			const clickedFilter = $(e.target)
			clickedFilter.addClass('selected')
			const clickedID = clickedFilter[0].id
			const selectedClass = context.classes.find(function(a) {
				return a.name == clickedID;
			});
			$(window).scrollTop(120);
			populateData(selectedClass);
		},
	})
}

function populateData(data) {
	console.log(data)

	//Retrieve the template data from the HTML .
	let template = $('#handlebars-demo').html();
	//Compile the template data into a function
	let templateScript = Handlebars.compile(template);

	const pve = Object.assign({}, data);
	const pvp = Object.assign({}, data);

	pve.specs = pve.specs.filter(function(a) {
		return a.focus == 'PvE';
	})
	pvp.specs = pvp.specs.filter(function(a) {
		return a.focus == 'PvP';
	})

	let pve_html = templateScript(pve);
	$('#pve_specs').html(pve_html);

	let pvp_html = templateScript(pvp);
	$('#pvp_specs').html(pvp_html);

}
