$(document).ready(function() {
    saveFormHandlers()
})

function saveFormHandlers() {


    $(".saved-list-form").on({
    	submit: e => {
            e.preventDefault()
    		if (window.location.pathname.includes("talent_calc")) {
                //
    		} else {
    			if (Object.keys(professionTool.CONSUMES) < 1) {
    				alert('cant save empty list idiot')
    				return false
    			} else {
    				updateConsumeInputs()
    			}
    		}
    		var violations = oversized_words()

    		if (violations.length) {
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

            var data = serialize(form)

    		$.ajax({
    			method: "POST",
    			url: window.location.href,
    			data: data,
    			success: savedListSuccess,
    			error: savedListError,
    		})
    	}
    })
}

function updateConsumeInputs() {
    var allConsumes = document.getElementById("all_consumes")
    removeElements(allConsumes)

    for (let [consume, amount] of Object.entries(professionTool.CONSUMES)) {
        let consumeInput = create_element("input", '', '', '', {"name":"spent", "value": `${consume},${amount}`, "type": "hidden"})
        allConsumes.append(consumeInput)
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


function savedListSuccess(data, textStatus, jqXHR) {
    console.log("DATA: \n", data)

	if (data.created || !data.list_info) {
        data.list_info = {'name': data.name, 'tags': data.tags, 'description':data.description,
            'updated': data.updated, 'user': data.username
        }

        // check if savedList exists on page via name
        let savedList = document.querySelector(`.spec-list-item[name='${data.name}']`)
        if (savedList && data.wow_class) {
            // edit if so
            savedList.classList.toggle("selected", true);
            let savedListLink = savedList.querySelector("a.saved-list-link")
            savedListLink.href = `/talent_calc/${data.wow_class}?u=${data.uid}&${data.hash}`
            let specInfo = savedList.closest(".spec-container").querySelector(".spec-info")
            specInfo.querySelectorAll('span')[0].className = `wow-class ${data.wow_class.toLowerCase()}`
            specInfo.querySelectorAll('span')[0].innerText = titleCase(data.wow_class)
            specInfo.querySelectorAll('span')[1].innerText = pointsSpentTotal()
        } else {
            // else add it
            appendSavedList(data)
        }

	}

    updateListInfo(data)
    var currentProfession = document.querySelector('a.prof-filter.selected')
    if (currentProfession) {
        var prof = currentProfession.id
        if (data.hash) {
            var hash = `?${data.hash}`
            updateURL("/profession_tool", prof, hash, {prof:prof})
        }
    } else {
        let search = `?u=${data.uid}&${data.hash}`
        updateURL("/talent_calc", data.wow_class, search)
    }
	var message = data['message']
	notifyUser(message)

}

function savedListError(jqXHR, textStatus, errorThrown) {
	notifyUser(errorThrown)
	console.log(jqXHR)
	console.log(textStatus)
	console.log(errorThrown)
}

// appends saved list to sidebar
function appendSavedList(data) {

    var imagePrefix = "images/icons/large/"

    var container, infoSpan,
        listContainer = create_element('div', 'spec-container'),
        iconPath = `${global.static_url}${imagePrefix}${data.img}`;
    var savedListIcon = create_element('div', 'saved-list-icon', `background-image: url('${iconPath}');`, '', {'data-ix': data.id}),
        infoContainer = create_element('div', 'info-container'),
        specInfo = create_element('div', 'spec-info'),
        specListItem = create_element('div', 'spec-list-item progress-bar-striped progress-bar-animated', '', data.name, {'name': data.name}),
        editImage = create_element('a', 'btn-sm edit-image untouchable'),
        editGlyph = create_element('span', 'glyphicon untouchable'),
        savedListName = create_element('span', 'saved-list-name'),
        savedListLink = create_element('a', 'saved-list-link'),
        trashCan = create_element('button', 'btn btn-sm float-right trashcan', '', '', {'name': 'delete', 'title':'Delete', 'value': data.name, 'type': 'button'}),
        glyphIcon = create_element('span', 'glyphicon glyphicon-trash glyphicon-custom');


    if (data.wow_class) {
        container = document.getElementById('saved_specs')
        infoSpan = create_element('span', `wow-class ${data.wow_class}`, '', titleCase(data.wow_class))

        var allottedTalents = create_element('span', '', 'font-size:90%;', ` (${data.spent[3]}/${data.spent[4]}/${data.spent[5]})`)
        specInfo.appendChild(allottedTalents)
        savedListLink.href = `/talent_calc/${data.wow_class}?u=${data.uid}&${data.hash}`

    } else {

        container = document.getElementById('saved_consume_lists')
        infoSpan = create_element('span', '', '', data.profs.join(', '))
        savedListLink.href = `/profession_tool?${data.hash}`
    }

    specInfo.insertBefore(infoSpan, specInfo.firstChild)

    container.appendChild(listContainer)
    listContainer.appendChild(savedListIcon)
    savedListIcon.appendChild(editImage)
    editImage.appendChild(editGlyph)
    listContainer.appendChild(infoContainer)
    infoContainer.appendChild(specInfo)
    infoContainer.appendChild(specListItem)
    specListItem.appendChild(savedListName)
    savedListName.appendChild(savedListLink)
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
