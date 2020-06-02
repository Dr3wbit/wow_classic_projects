$(document).ready(function() {
    save_form_handlers()
})

function save_form_handlers() {

    $(".saved-list-form").on({
    	submit: e => {
            e.preventDefault()
    		if (window.location.pathname.includes("talent_calc")) {
    			update_tree_inputs()
    		} else {
    			if (Object.keys(professionTool.CONSUMES) < 1) {
    				alert('cant save empty list idiot')
    				return false
    			} else {
    				update_consume_inputs()
    			}
    		}
    		var violations = oversized_words()

    		if (violations.length) {
    			//NOTE DO A MESSAGE
    			var message = (violations.length > 1) ? `Unable to save list, the following ${violations.length} words are too long:\n` : `Unable to save list, the following word is too long:\n`

    			message += violations.join('\n')
    			notifyUser(message)
    			return false
    		}

            var form = document.querySelector('.saved-list-form')

            var description = form.querySelector('#id_description').value
            var name = form.querySelector('#id_name').value

            name = name.split(/\s+/).join(' ').trim()
            description = description.split(/\s+/).join(' ').trim()

            form.querySelector('#id_description').value = description
            form.querySelector('#id_name').value = name

    		// var $thisURL = $myForm.attr('data-url') || window.location.href
    		var myURL = window.location.href
    		// var $formData = $myForm.serialize()

            var data = serialize(form)

    		// console.log("DATA: ", $formData, $thisURL, $myForm)
    		$.ajax({
    			method: "POST",
    			url: myURL,
    			data: data,
    			success: savedListSuccess,
    			error: savedListError,
    		})
    	}
    })
}

function update_consume_inputs() {

	var all_consumes = $("#all_consumes")
    for (let [consume, amount] of Object.entries(professionTool.CONSUMES)) {
        all_consumes.append($('<input/>', {
            name: "spent",
            value: `${consume},${amount}`,
            type: 'hidden'
        }))
    }
}

function oversized_words(max_length = 20) {
	var description = $("#id_description").val().split(/\s/)
	var violations = []

	description.forEach(function(x) {
		if (x.length > max_length) {
			violations.push(x);
		}
	})
	return violations
}

function update_tree_inputs() {
	$("#tree0").val(`${talentPointsSpent.treeNames[0]},${talentPointsSpent[talentPointsSpent.treeNames[0]].total()}`)
	$("#tree1").val(`${talentPointsSpent.treeNames[1]},${talentPointsSpent[talentPointsSpent.treeNames[1]].total()}`)
	$("#tree2").val(`${talentPointsSpent.treeNames[2]},${talentPointsSpent[talentPointsSpent.treeNames[2]].total()}`)
	$("#list_hash").val(urlBuilder())
}


function savedListSuccess(data, textStatus, jqXHR) {
	if (data.created) {
		appendSavedConsumeList(data)
	}
    var prof = ''
    var currentProfession = document.querySelector('a.prof-filter.selected')
    if (currentProfession) {
        prof = currentProfession.id
    }
	var message = data['message']
	notifyUser(message)
    if (data.hash) {
        var hash = `?${data.hash}`
        updateURL(prof, hash)
    }

}

function savedListError(jqXHR, textStatus, errorThrown) {
	notifyUser(errorThrown)
	console.log(jqXHR)
	console.log(textStatus)
	console.log(errorThrown)
}
//
// function append_list_item(data) {
//     console.log('data: ', data)
// 	let path = document.location.pathname
// 	let re = /^([^/]*\/[^/]*\/).*$/g;
// 	let filtered_path = re.exec(path)
// 	let wow_class = data.wow_class
// 	let name = data.name
// 	let icon = (wow_class) ? `class/${wow_class}.jpg` : `inv_misc_book_09.jpg`
// 	let spec_cont = $("<div/>", {
// 		class: "spec-container",
// 	})
// 	let spec_info = $("<div/>", {
// 		class: "spec-info",
// 	})
// 	let info_cont = $("<div/>", {
// 		class: "info-container",
// 	})
// 	let save_icon = $("<div/>", {
// 		class: "saved-list-icon",
// 		style: `background-image: url('/static/images/icons/large/${icon}')`
// 	})
//
// 	let child_text = (wow_class) ? `${utilities.titleCase(wow_class)}` : `${name}`
// 	let spec_info_child = $("<span/>", {
// 		text: child_text,
// 	})
// 	if (wow_class) {
// 		spec_info_child.addClass(`${wow_class}`)
// 		spec_info.append(spec_info_child, ' ', $("<span/>", {
// 			style: "font-size: 90%;",
// 			text: `(${data.spent[3]}/${data.spent[4]}/${data.spent[5]})`,
// 		}))
// 	} else {
// 		spec_info.append(spec_info_child)
// 	}
//
// 	let spec_item = $("<div/>", {
// 		class: "spec-list-item progress-bar-striped progress-bar-animated",
// 		name: name,
// 		text: name,
// 		style: "position: relative;",
// 		href: `${filtered_path[1]}${data.id}?${data.hash}`,
// 		'data-ix': data.id
// 	})
// 	if (wow_class) {
// 		spec_item.attr("data-wowclass", wow_class)
// 	}
//
// 	let trashcan = ($("<button/>", {
// 		class: "btn btn-sm float-right trashcan",
// 		name: "delete",
// 		value: name,
// 		type: "button",
// 		title: "Delete"
// 	}))
//
// 	trashcan.append($("<span/>", {
// 		class: "glyphicon glyphicon-trash glyphicon-custom"
// 	}))
//
//
// 	spec_item.append(trashcan)
// 	info_cont.append(spec_info, spec_item)
// 	spec_cont.append(save_icon, info_cont)
//
// 	if (wow_class) {
// 		$("#saved_specs").append(spec_cont)
// 	} else {
// 		$("#saved_consume_lists").append(spec_cont)
// 	}
//
// 	setTimeout(() => {
// 		$(".selected.spec-list-item").removeClass("selected")
// 		$(".progress-bar-striped.progress-bar-animated.spec-list-item").addClass("selected").removeClass("progress-bar-striped progress-bar-animated")
// 		$(".selected.spec-list-item").click()
// 	}, 2000)
// }

function appendSavedConsumeList(data) {
    var imagePrefix = "images/icons/large/"

    var consumeList = document.getElementById('saved_consume_lists')

    var listContainer = create_element('div', 'spec-container')
    consumeList.appendChild(listContainer)

    var iconPath = static_url + imagePrefix + data.img

    var savedListIcon = create_element('div', 'saved-list-icon', `background-image: url('${iconPath}');`, '', {'data-ix': data.id})
    listContainer.appendChild(savedListIcon)

    var infoContainer = create_element('div', 'info-container')
    listContainer.appendChild(infoContainer)

    var specInfo = create_element('div', 'spec-info')
    infoContainer.appendChild(specInfo)

    var profsUsedSpan = create_element('span', '', '', data.profs.join(', '))
    specInfo.appendChild(profsUsedSpan)

    var specListItem = create_element('div', 'spec-list-item progress-bar-striped progress-bar-animated', '', data.name)
    specListItem.name = data.name

    infoContainer.appendChild(specListItem)


    var savedListName = create_element('span', 'saved-list-name')

    specListItem.appendChild(savedListName)

    var savedListLink = create_element('a', 'saved-list-link')
    savedListLink.href = `/profession_tool?${data.hash}`

    savedListName.appendChild(savedListLink)


    var trashCan = create_element('button', 'btn btn-sm float-right trashcan', '', '', {'name': 'delete', 'title':'Delete', 'value': data.name, 'type': 'button'})
    var glyphIcon = create_element('span', 'glyphicon glyphicon-trash glyphicon-custom')

    trashCan.appendChild(glyphIcon)

    specListItem.appendChild(trashCan)

    setTimeout(() => {
		$(".selected.spec-list-item").removeClass("selected")
		$(".progress-bar-striped.progress-bar-animated.spec-list-item").addClass("selected").removeClass("progress-bar-striped progress-bar-animated")
		// $(".selected.spec-list-item").click()
	}, 2000)
}

var serialize = function (form) {

	// Setup our serialized data
	var serialized = [];

	// Loop through each field in the form
	for (var i = 0; i < form.elements.length; i++) {

		var field = form.elements[i];

		// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
		if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

		// If a multi-select, get all selections
		if (field.type === 'select-multiple') {
			for (var n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue;
				serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
			}
		}

		// Convert field data to a query string
		else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
			serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
		}
	}

	return serialized.join('&');

};
