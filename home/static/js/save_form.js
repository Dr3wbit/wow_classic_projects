$(document).ready(function() {
    save_form_handlers()
})

function save_form_handlers() {

    $(".saved-list-form").on({
    	submit: e => {
    		if (window.location.pathname.includes("talent_calc")) {
    			update_tree_inputs()
    		} else {
    			if (Object.keys(my_consume_list) < 1) {
    				alert('cant save empty list idiot')
    				return false
    			} else {
    				update_consume_inputs()
    			}
    		}
    		e.preventDefault()

    		var violations = oversized_words()

    		if (violations.length) {

    			//NOTE DO A MESSAGE

    			var message = (violations.length > 1) ? `Unable to save list, the following ${violations.length} words are too long:\n` : `Unable to save list, the following word is too long:\n`

    			message += violations.join('\n')
    			console.log(message)
    			notifyUser(message)
    			return false
    		}

    		// console.log($myForm.serialize())
    		var $myForm = $(".saved-list-form")
    		// var $thisURL = $myForm.attr('data-url') || window.location.href
    		var $thisURL = window.location.href
    		var $formData = $myForm.serialize()

    		console.log("DATA: ", $formData, $thisURL, $myForm)
    		$.ajax({
    			method: "POST",
    			url: $thisURL,
    			data: $formData,
    			success: savedListSuccess,
    			error: savedListError,
    		})
    	}
    })
}

function update_consume_inputs() {

	var all_consumes = $("#all_consumes")
	for (let [profname, v] of Object.entries(my_consume_list)) {
		for (let [crafted, amount] of Object.entries(v)) {
			all_consumes.append($('<input/>', {
				name: "spent",
				value: `${crafted},${amount}`,
				type: 'hidden'
			}))
		}
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
		append_list_item(data)
	}
	let message = data['message']
	notifyUser(message)
	console.log(data)
	console.log(textStatus)
	console.log(jqXHR)
}

function savedListError(jqXHR, textStatus, errorThrown) {
	notifyUser(errorThrown)
	console.log(jqXHR)
	console.log(textStatus)
	console.log(errorThrown)
}

function append_list_item(data) {
	let path = document.location.pathname
	let re = /^([^/]*\/[^/]*\/).*$/g;
	let filtered_path = re.exec(path)
	let wow_class = data.wow_class
	let name = data.name
	let icon = (wow_class) ? `class/${wow_class}.jpg` : `inv_misc_book_09.jpg`
	let spec_cont = $("<div/>", {
		class: "spec-container",
	})
	let spec_info = $("<div/>", {
		class: "spec-info",
	})
	let info_cont = $("<div/>", {
		class: "info-container",
	})
	let save_icon = $("<div/>", {
		class: "saved-list-icon",
		style: `background-image: url('/static/images/icons/large/${icon}')`
	})

	let child_text = (wow_class) ? `${utilities.titleCase(wow_class)}` : `${name}`
	let spec_info_child = $("<span/>", {
		text: child_text,
	})
	if (wow_class) {
		spec_info_child.addClass(`${wow_class}`)
		spec_info.append(spec_info_child, ' ', $("<span/>", {
			style: "font-size: 90%;",
			text: `(${data.spent[3]}/${data.spent[4]}/${data.spent[5]})`,
		}))
	} else {
		spec_info.append(spec_info_child)
	}

	let spec_item = $("<div/>", {
		class: "spec-list-item progress-bar-striped progress-bar-animated",
		name: name,
		text: name,
		style: "position: relative;",
		href: `${filtered_path[1]}${data.id}?${data.hash}`,
		'data-ix': data.id
	})
	if (wow_class) {
		spec_item.attr("data-wowclass", wow_class)
	}

	let trashcan = ($("<button/>", {
		class: "btn btn-sm float-right trashcan",
		name: "delete",
		value: name,
		type: "button",
		title: "Delete"
	})).on({
		click: e => {
			e.stopPropagation()
			var $data = {}
			if ($(e.target).attr("data-wowclass")) {
				$data['wow_class'] = $(e.target).attr("data-wowclass")
			}
			var $name = $(e.target).val();
			$data['name'] = $name
			var $thisURL = '/ajax/delete_list/'

			$.ajax({
				method: "POST",
				url: $thisURL,
				data: $data,
				success: trashCanSuccess,
				error: trashCanError,
			})
		}
	});

	trashcan.append($("<span/>", {
		class: "glyphicon glyphicon-trash glyphicon-custom"
	}))

	spec_item.on({
		click: e => {
			var list_name = $(e.target).attr('name');
			var wow_class = ($(e.target).attr('data-wowclass')) ? $(e.target).attr('data-wowclass') : ''
			let href = $(e.target).attr("href")
			let id = $(e.target).attr('data-ix')
			let tempurl = new URL(href = href, base = document.location.origin)
			let search = tempurl.search
			let url = new URL(document.location.origin.toString())
			url.search = search
			if (wow_class) {
				// url.pathname = `talent_calc/${wow_class}`
				update_class(wow_class, id)
			} else {
				let prof_elem = $('a.prof-filter.selected')
				let path = (prof_elem.length) ? `/profession_tool/${prof_elem.attr('id')}/${id}` : `/profession_tool/${id}`
				console.log('path: ', path)
				console.log('url: ', url)
				url.pathname = path
				build_consume_list(url, id)
			}
		}
	});

	spec_item.append(trashcan)
	info_cont.append(spec_info, spec_item)
	spec_cont.append(save_icon, info_cont)

	if (wow_class) {
		$("#saved_specs").append(spec_cont)
	} else {
		$("#saved_consume_lists").append(spec_cont)
	}

	setTimeout(() => {
		$(".selected.spec-list-item").removeClass("selected")
		$(".progress-bar-striped.progress-bar-animated.spec-list-item").addClass("selected").removeClass("progress-bar-striped progress-bar-animated")
		$(".selected.spec-list-item").click()
	}, 2000)
}
