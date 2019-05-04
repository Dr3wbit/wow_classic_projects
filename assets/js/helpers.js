// Helpers have to be declared below template scripts within the html page

Handlebars.registerHelper('sanitize', janitor);


Handlebars.registerHelper('className', function (str='') {
    let selected = $('.class-filter.selected').text()
	return janitor(selected)
});

Handlebars.registerHelper('needsExtraDiv', function(item){
    // console.log("testHelper: ", item)
    if (item == "talentcalc-arrow rightdown"){
        return true
    }
    else {
        return false
    }
});

Handlebars.registerHelper('multipleArrows', function(tl){
    // console.log("testHelper: ", item)
    let talent_list = (tl == undefined) ? 2 : 1
    if (talent_list > 1) {
        console.log("multiple arrows is true")
        console.log(tl)
        return true
    }
    else {
        console.log("multiple arrows is false")
        console.log(tl)
        return false
    }
});


function janitor(str) {
    return str.replace(" ", "_").toLowerCase()
}


Handlebars.registerHelper('arr', function() {
  // Covnert arguments to array, ommiting the last item, which is the options obect
  return Array.prototype.slice.call(arguments,0,-1);
})


// Handlebars.registerHelper('if', function(context, options) {
// 	if (context) {
// 		// console.log("context: ", context)
// 		return options.fn(this);
// 	} else {
// 		return options.inverse(this);
// 	}
// });
