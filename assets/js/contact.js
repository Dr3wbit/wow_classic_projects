

$(document).ready(init)

function init() {
    var form = $('#ajax-contact');
    var formMessages = $('#form-messages');
    $(form).submit(function (e) {
        e.preventDefault();

        var formData = $(form).serializeArray()
        var formatedData = ({
            name: formData[0].value,
            subject: formData[1].value,
            message: formData[2].value,
        })

        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formatedData
        })
            .done(function (response) {
                $(formMessages).removeClass('alert alert-danger');
                $(formMessages).addClass('alert alert-success');
                $(formMessages).text('Message Sent!');
                $('#name').val('');
                $('#subject').val('');
                $('#message').val('');
            })
            .fail(function (data) {
                $(formMessages).removeClass('alert alert-success');
                $(formMessages).addClass('alert alert-danger');
                if (data.responseText !== '') {
                    $(formMessages).text(data.responseText);
                } else {
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
    });
}
