$(document).ready(function() {
	global_event_handlers()

});

window.addEventListener('load', function(e) {
	var sidebarState = sessionStorage.getItem("sidebarState")
	sidebarState = parseInt(sidebarState)
	if (!toggleSidebar(Boolean(sidebarState)) && (window.innerWidth <= 992)) {
		blackOut.add()
	}
	// setTimeout(()=> {
	// 	if (!toggleSidebar(Boolean(sidebarState)) && (window.innerWidth <= 992)) {
	// 		blackOut.add()
	// 	}
	// }, 500)

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
		success: function (data) {
			$("#saved_list_info").html(data);
		}
	});
}


function global_event_handlers() {

	var sidebarToggle = document.getElementById("sidebar_toggle");

	sidebarToggle.addEventListener("click", e => {
		var savedLists = document.getElementById("saved_lists");
		savedLists.classList.toggle("animated", true);

		var customSaves = document.getElementById("custom-saves")
		customSaves.classList.toggle("animated", true);

		var sidebarState = toggleSidebar()
		if (!sidebarState) {
			if (window.innerWidth <= 992) {
				blackOut.add()
			} else {
			}
		} else {
			blackOut.remove()
		}

		sidebarState = (sidebarState) ? 1 : 0; //convert to int for easier storage
		sessionStorage.setItem("sidebarState", sidebarState)

	});

	// adds esc as hotkey to close sidebar
	document.addEventListener('keyup', e=>{
		if (e.which == 27) {
			toggleSidebar(true)
			blackOut.remove()
			e.stopPropagation()
		}
	});

}

function toggleSidebar(forceMin=undefined) {
	document.body.classList.toggle("preload", false);

	var savedLists = document.getElementById("saved_lists");
	var toggled = savedLists.classList.toggle("minimized", forceMin);

	savedLists.classList.toggle("expanded", !toggled);

	var customSaves = document.getElementById("custom-saves")
	customSaves.classList.toggle("expanded", !toggled);

	if (window.window.innerWidth > 992) {
		// document.getElementById("mainBody").classList.toggle("depad", toggled)
		// document.getElementById("mainBody").classList.toggle("padleft", !toggled)
	}

	return toggled
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

function notifyUser(message) {
	let notificationContainer = ($("<div/>", {
		class: "notification-container",
		text: message,
	}))
	$("body").append(notificationContainer)
	setTimeout(() => { $(".notification-container").remove() }, 4500);
}

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


var blackOut = {
	add: ()=> {
		var mainBody = document.getElementById("mainBody")
		var elem = create_element("div", "black-out")
		elem.addEventListener("click", e=> {
			toggleSidebar(true)
			e.target.remove()
		});
		mainBody.appendChild(elem);
	},
	remove: ()=> {
		document.querySelectorAll('.black-out').forEach(elem=>{
			elem.remove();
		})
	}
}
