
$(document).ready(event_handlers());

function build_consume_list(url, name) {
    var search = url.search
    var path = url.pathname
    $.ajax({
        url: `${path}${search}`,
        dataType: 'html',
        success: function (data) {
            $("#totals_container").html(data);
            update_url('', search)
        }
    });
}


function event_handlers() {

    $(".floating-combat-text").on({


        click: e => {
            console.log(e.which)
            let timeStamp = $.now();
            let uniqueID = `${e.pageX}${e.pageY}${timeStamp}`
            let notificationContainer = ($("<div/>", {
                class: "floating-container",
                id: uniqueID,
                text: "+1",
                style: `left: ${e.pageX}px; top: ${e.pageY}px`
            }))
            $(document.body).append(notificationContainer)
            setTimeout(() => { $(`#${uniqueID}`).remove() }, 2900);

        }
    });


    $(".side-bar-toggle").on({
        click: e => {
            let bool = $('.saved').hasClass('side-min')
            let windowWidth = window.innerWidth
            console.log(windowWidth)
            if (window.innerWidth <= 992) {
                $('.mainBody').css({ 'padding-left': '15px' })
                if (bool) {
                    $('.saved').removeClass('side-min')
                    $('.custom-saves').css({ 'display': 'block' })
                    $('.side-bar-toggle').removeClass('flip-background')
                    $('.mainBody').append($('<div/>', {
                        class : "black-out"
                    }))

                } else {
                    $('.saved').addClass('side-min')
                    $('.custom-saves').css({ 'display': 'none' })
                    $('.side-bar-toggle').addClass('flip-background')
                    $('.black-out').remove()
                }
            } else {
                if (bool) {
                    $('.saved').removeClass('side-min')
                    $('.mainBody').css({ 'padding-left': '265px' })
                    $('.custom-saves').css({ 'display': 'block' })
                    $('.side-bar-toggle').removeClass('flip-background')
                    $('.black-out').remove()

                } else {
                    $('.saved').addClass('side-min')
                    $('.mainBody').css({ 'padding-left': '15px' })
                    $('.custom-saves').css({ 'display': 'none' })
                    $('.side-bar-toggle').addClass('flip-background')
                    $('.black-out').remove()
                }
            }

        }
    });

    // prevent right context menu on main content
    $('.mainContent').on({
        contextmenu: e => {
            e.preventDefault()
        },
    })

    $(".spec-list-item").on({
        click: e => {
            var list_name = $(e.target).attr('name');
            var wow_class = ($(e.target).attr('data-wowclass')) ? $(e.target).attr('data-wowclass') : ''
            $(".spec-list-item").removeClass("selected")
            $(e.target).addClass("selected")
            if (wow_class) {
                update_class(wow_class, list_name)
            } else {
                let href = $(e.target).attr("href")
                let url = new URL(href = href, base = document.location.origin)
                build_consume_list(url, list_name)
            }
        }
    });

    $(".trashcan").on({
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
}

function trashCanSuccess(data, textStatus, jqXHR) {
    let list_name = data.name.toString()
    let list_item = $(`.spec-list-item[name="${list_name}"]`).closest(".spec-container");

    list_item.hide(800, function () {
        $(this).remove()
    })

    // list_item.empty().remove()

    let message = data.message.toString() // <--------------- NOTE: HERE
    notifyUser(message)
    console.log('\n**success**\n')
    console.log(data.message.toString())
    console.log('data: ', data)
    console.log('status: ', textStatus)
    console.log(jqXHR)
    // $myForm.reset(); // reset form data
}

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
            // Does this cookie string begin with the name we want?
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
    // these HTTP methods do not require CSRF protection
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
    $(".navbar").append(notificationContainer)
    setTimeout(() => { $(".notification-container").remove() }, 5000);
}
