// Helpers have to be declared below template scripts within the html page

Handlebars.registerHelper('sanitize', janitor);


Handlebars.registerHelper('className', function (str='') {

    let selected = $('.class-filter.selected').text()
	return janitor(selected)
});


function janitor(str) {
    return str.replace(" ", "_").toLowerCase()
}


// Handlebars.registerHelper('if', function(context, options) {
// 	if (context) {
// 		// console.log("context: ", context)
// 		return options.fn(this);
// 	} else {
// 		return options.inverse(this);
// 	}
// });
