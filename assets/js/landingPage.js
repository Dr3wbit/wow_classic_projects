
$(document).ready(init)

function init(){
    $("#countdown")
    .countdown("2019/06/01", function(event) {
      $(this).text(
        event.strftime('%D days %H:%M:%S')
      );
    });
}