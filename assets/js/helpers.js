// Helpers have to be declared below template scripts within the html page

Handlebars.registerHelper('lower', function (str) {
	return str.toLowerCase()
});


Handlebars.registerHelper('className', function (str='') {
    let selected = $('.class-filter.selected').text().toLowerCase()
	return selected
});
