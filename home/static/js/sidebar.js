$(document).ready(function() {
	sidebar_handlers()
});


var selectedList;

function sidebar_handlers() {

	var savedLists = document.getElementById('saved_lists')
	savedLists.addEventListener('click', function(e) {
		if (e.target.matches('.trashcan')) {
			var data = {}
			var infoContainer = e.target.closest("div.info-container")
			var href = infoContainer.querySelector('a.saved-list-link').href


			var link = new URL(href = infoContainer.querySelector('a.saved-list-link').href)
			data["hash"] = link.search
			data["name"] = infoContainer.querySelector("div.spec-list-item").getAttribute("name")

			if (link.pathname.includes("talent_calc")) {
				data['wow_class'] = true
			}

			$.ajax({
				method: "POST",
				url: '/ajax/delete_list/',
				data: data,
				success: trashCanSuccess,
				error: trashCanError,
			})
		} else if (e.target.matches('.saved-list-icon')) {

			$('#icon_choice_modal').modal('toggle')

			var ix = e.target.getAttribute('data-ix')
			selectedList = e.target.parentElement.parentElement.id
			var queue = (selectedList == 'saved_specs') ? 1 : 2

			load_icons(1, ix, queue)
		}
	})

	var modal = document.getElementById('icon_choice_modal')
	modal.addEventListener('click', function(e) {
		if (e.target.matches('#save_icon_button')) {
			e.preventDefault()
			var img = document.querySelector('.icon-selection.selected')
			if (img) {
				update_icon(img.getAttribute('data-img'))
			}
		}
	})

}

function load_icons(page = 1, ix = null, queue = null) {
	var data = {}

	if (ix) {
		data['ix'] = ix
	}
	if (queue) {
		data['queue'] = queue
	}

	data['page'] = page

	$.ajax({
		method: "GET",
		url: "/ajax/icon_list/",
		// dataType: 'html',
		data: data,
		success: function(data) {
			$("#modal_body").html(data)
		},
	})
}

function update_icon(img) {
	var data = {}
	if (img) {
		data['img'] = img
	} else {
		return false
	}

	$.ajax({
		method: "POST",
		url: "/ajax/update_icon/",
		dataType: 'json',
		data: data,
		success: update_icon_success,
		error: update_icon_error,
	})
}

function update_icon_success(data) {
	notifyUser(data.message)
	let image = `${global.static_url}images/icons/large/${data.img}.jpg`

	var parent = document.getElementById(selectedList).querySelector(`.saved-list-icon[data-ix="${data.id}"]`)
	parent.style.cssText = `background-image: url('${image}')`

	$('#icon_choice_modal').modal('hide')
}

function update_icon_error(data) {
	console.log('data: ', data)
	notifyUser(data.message)
	$('#icon_choice_modal').modal('hide')

}
