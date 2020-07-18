$(document).ready(function() {
	global_event_handlers()
});

window.addEventListener('load', function(e) {
	var sidenavExpanded = parseInt(sessionStorage.getItem("sidenavToggle"))
	if (Number.isInteger(sidenavExpanded)) {
		var sidenav = document.querySelector('.sidebar-toggle')
		if ((sidenav.classList.contains('shown') && sidenavExpanded == 0) || (!sidenav.classList.contains('shown') && sidenavExpanded == 1)) {
			sidenav.click()
		}
	}
});


var global = {
	static_url: "",
	STORAGE_ITEMS: {},
}

function setStorageItems() {
	if (storageAvailable('localStorage')) {
		var keys = Object.keys(localStorage)
		keys.forEach(function(ix) {
			global.STORAGE_ITEMS[ix] = JSON.parse(localStorage.getItem(ix))
		})
	}
}

function info_display(id, caller) {
	$.ajax({
		type: "POST",
		url: "/ajax/savedlist_info/",
		data: {
			'id':id,
			'caller': caller
		},
		// dataType: 'html',
		success: function (data) {
			$("#saved_list_info").html(data);
		}
	});
}


function global_event_handlers() {


    if (window.innerWidth <= 992) {
        $('#mainBody').css({ 'padding-left': '15px' })
        $('#saved_lists').removeClass('minimized')
        // $('.custom-saves').css({ 'display': 'block' })
        $('.sidebar-toggle').removeClass('flip-background')

        $('#mainBody').append($('<div/>', {
            class : "black-out"
        }))
    }

	var sideNav = document.querySelector('.sidebar-toggle')


	// sideNav.addEventListener('click', e => {
	// 	e.target.classList.toggle('shown')
	// 	if (e.isTrusted) {
	// 		if (e.target.classList.contains('shown')) {
	// 			sessionStorage.setItem("sidenavToggle", 1)
	// 		} else {
	// 			sessionStorage.setItem("sidenavToggle", 0)
	// 		}
	// 	}
	// })

    $(".sidebar-toggle").on({
        click: e => {

            let bool = $('#saved_lists').hasClass('minimized')
            let windowWidth = window.innerWidth
            if (window.innerWidth <= 992) {
                $('.mainBody').css({ 'padding-left': '15px' })
                if (bool) {
                    $('#saved_lists').removeClass('minimized')
                    // $('.custom-saves').css({ 'display': 'block' })
                    // $('.sidebar-toggle').removeClass('flip-background')
                    $('#mainBody').append($('<div/>', {
                        class : "black-out"
                    }))

                } else {
                    $('#saved_lists').addClass('minimized')
                    // $('.custom-saves').css({ 'display': 'none' })
                    // $('.sidebar-toggle').addClass('flip-background')
                    $('.black-out').remove()
                }
            } else {
                if (bool) {
                    $('#saved_lists').removeClass('minimized')
					$('#mainBody').removeClass('depad').addClass('padleft')
                    // $('.mainBody').css({ 'padding-left': '265px' })
                    // $('.custom-saves').css({ 'display': 'block' })
                    // $('.sidebar-toggle').removeClass('flip-background')
                    $('.black-out').remove()

                } else {
                    $('#saved_lists').addClass('minimized')
					$('#mainBody').removeClass('padleft').addClass('depad')
                    // $('.mainBody').css({ 'padding-left': '15px' })
                    // $('.custom-saves').css({ 'display': 'none' })
                    // $('.sidebar-toggle').addClass('flip-background')
                    $('.black-out').remove()
                }
            }

        }
    });

	document.addEventListener('keyup', e=>{
		if (e.which == 27) {
			var savedLists = document.getElementById('saved_lists')
			if (!savedLists.classList.contains('minimized')) {
				document.querySelector('.sidebar-toggle-button').click()
			}
		}
	})

}

function updateURL(path, subPath='', search='', state=null) {
	this.path = (Boolean(subPath)) ? path + "/" + subPath : path
	this.path = (Boolean(search)) ? this.path + search : this.path
	history.pushState(state, subPath, this.path)
}

//sidebar functionality
function trashCanSuccess(data, textStatus, jqXHR) {
	console.log('data: ', data)
	let list_name = data.name.toString()
	let list_item = $(`.spec-list-item[name="${list_name}"]`).closest(".spec-container");

	list_item.hide(800, function () {
		$(this).remove()
	})

	let message = data.message.toString()
	notifyUser(message)
	console.log('\n**success**\n')
	console.log(data.message.toString())
	console.log('data: ', data)
	console.log('status: ', textStatus)
	console.log(jqXHR)
}

//sidebar functionality
function trashCanError(jqXHR, textStatus, errorThrown) {
	notifyUser(errorThrown)
	console.log('\n**error**\n')
	console.log(jqXHR)
	console.log(textStatus)
	console.log(errorThrown)
}

function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim();
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}

var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
	return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
	beforeSend: function (xhr, settings) {
		if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
			xhr.setRequestHeader("X-CSRFToken", csrftoken);
		}
	}
});

// convenience function, used everywhere as callback
function notifyUser(message) {
	let notificationContainer = ($("<div/>", {
		class: "notification-container",
		text: message,
	}))
	$("body").append(notificationContainer)
	setTimeout(() => { $(".notification-container").remove() }, 4500);
}

// convenience function, used everywhere
// creates element, textnodes, and attributes, attaches textnode/attributes, returns created element
function create_element(tag, class_name, style, text, dataAttrs={}) {
	var elem = document.createElement(`${tag}`)
	if (class_name) {
		elem.className = class_name
	}

	if (style) {
		elem.style.cssText = style
	}

	if (text) {
		var content = document.createTextNode(`${text}`);
		elem.appendChild(content)
	}

	if (dataAttrs) {
		for (let [key, val] of Object.entries(dataAttrs)) {
			var dataItem = document.createAttribute(`${key}`);
			dataItem.value = val
			elem.setAttributeNode(dataItem)
        }
	}

	return elem
}

// used everywhere
function sanitize(str) {
	return str.toLowerCase().replace(/\s+/g, '_').replace("'", "")
}

// used everywhere
function titleCase(str) {
	let strArr = str.replace(/\_/g, ' ').split(' ')
	strArr.forEach(function(word, i) {
		if (!(word=='of' || word=='the') && typeof(word)=='string'){
			strArr[i] = word.charAt(0).toUpperCase() + word.slice(1)
		}
	})
	return strArr.join(' ')
}

function pageLoadSpeed() {
	var pageNav = performance.getEntriesByType("navigation")[0];

	// Request time only (excluding unload, redirects, DNS, and connection time)
	var requestTime = pageNav.responseStart - pageNav.requestStart;
	console.log('Request time only: ', requestResponseTime)

	// Response time only (download)
	var responseTime = pageNav.responseEnd - pageNav.responseStart;

	console.log('Response time only (download): ', responseTime)

	// Request + response time
	var requestResponseTime = pageNav.responseEnd - pageNav.requestStart;

	console.log('Request + response time: ', requestResponseTime)
}
