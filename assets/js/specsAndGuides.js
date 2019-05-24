$(document).ready(initializeApp)

function initializeApp() {

	applyClickHandlers()
	$(window).scroll(() => {
		if ($(document).scrollTop() > 88.2) {
			$('.content-selection-container').css('top', '130px')
		}
		});
}


function applyClickHandlers() {
	const defaultSelection = $('#warrior')
	defaultSelection.addClass('selected')
	populateData(context.classes[0]);
	const classMarker = $('<div/>', {
		class: 'classMarker',
	})
	const classMarkerGhost = $('<div/>', {
		class: 'classMarkerGhost',
	})
	defaultSelection.append(classMarker)

	$('.class-filter').on({
		click: e => {
			$('.class-filter').children().remove()
			$('.class-filter').removeClass('selected')
			const clickedFilter = $(e.target)
			clickedFilter.append(classMarker)
			clickedFilter.addClass('selected')
			const clickedID = clickedFilter[0].id
			const selectedClass = context.classes.find(function(a) {
				return a.name == clickedID;
			});
			$(window).scrollTop(120);
			populateData(selectedClass);
		},

		mouseenter: e => {
			const hoveredFilter = $(e.target)
			if(hoveredFilter.hasClass('selected')){
				return
			}else{
				hoveredFilter.append(classMarkerGhost)
			}
		},
		mouseleave: e => {
			$('.classMarkerGhost').remove()
		}
	})
}

function populateData(data) {
	let template = $('#handlebars-demo').html();
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
