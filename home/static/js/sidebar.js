$(document).ready(function() {
	sidebar_handlers()
});

function sidebar_handlers() {
	$(".saved-list-icon").on({
		click: e=> {
			$('#icon_choice_modal').modal('toggle')
			let ix = $(e.target).attr("data-ix")
			let queue = ($(e.target).parent().parent().attr("id")=="saved_specs") ? 1 : 2

			load_icons(1, ix, queue)
		},
		mouseenter: e=> {
			$(e.target).append($('<a/>', {
				class: "btn btn-sm edit-image untouchable",
			}).append($('<span/>', {
				class: "glyphicon glyphicon-pencil untouchable",
			})))
		},
		mouseleave: e=> {
			$(".edit-image").remove()
		}
	})

	$("#save_icon_button").on({
		click: e=> {
			e.preventDefault()
			var img = $(".icon-selection.selected").attr("data-img")
			if (img) {
				update_icon(img)

			}
		}
	})
}

function load_icons(page=1, ix=null, queue=null) {
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
	let image_prefix = static_url+"images/icons/large/"
	var id = data.id
	var img_text = ""
	var parent;
	if (data.queue_type == 1) {
		parent = $("#saved_specs")
		img_text = "class/"
	} else {
		parent = $("#saved_consume_lists")
	}

	img_text = image_prefix+img_text+data.img+".jpg"
	parent.find($(`.saved-list-icon[data-ix="${data.id}"]`)).css("background-image", `url('${img_text}')`)
	$('#icon_choice_modal').modal('hide')

}

function update_icon_error(data) {
	notifyUser(data.message)
	$('#icon_choice_modal').modal('hide')

}
