$(document).ready(initializeApp)

function initializeApp() {
	applyClickHandlers()
	scrollSpyOffset()
	updateBackground()
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
			const selectedClass = context.classes.find(function (a) {
				return a.name == clickedID;
			});
			populateData(selectedClass);
			$('html, body').animate({
				scrollTop: 94.5
			}, 800, function () { 
				return window.history.pushState(null, null, '#pve_specs');
			})
		},

		mouseenter: e => {
			const hoveredFilter = $(e.target)
			if (hoveredFilter.hasClass('selected')) {
				return
			} else {
				hoveredFilter.append(classMarkerGhost)
			}
		},
		mouseleave: e => {
			$('.classMarkerGhost').remove()
		}
	})
}

function scrollSpyOffset() {
	let navOffset = $('.navbar').height() + $('#class_selection').height() + 10;
	$('.list-group-item').click(function (e) {
		var href = $(this).attr('href');
			e.preventDefault();
			$('html, body').animate({
				scrollTop: $(href).offset().top - navOffset
			}, 800, function () { 
				return window.history.pushState(null, null, href);
			})
	});
}

function updateBackground(){
	$(window).on('activate.bs.scrollspy', function () {
				$('.list-group-item').parent().removeClass('selected')
				$('.active').parent().addClass('selected')
	});
}

function populateData(data) {
	let template = $('#handlebars-demo').html();
	let templateScript = Handlebars.compile(template);

	const pve = Object.assign({}, data);
	const pvp = Object.assign({}, data);

	pve.specs = pve.specs.filter(function (a) {
		return a.focus == 'PvE';
	})
	pvp.specs = pvp.specs.filter(function (a) {
		return a.focus == 'PvP';
	})

	let pve_html = templateScript(pve);
	$('#pve_specs').html(pve_html);

	let pvp_html = templateScript(pvp);
	$('#pvp_specs').html(pvp_html);

}
