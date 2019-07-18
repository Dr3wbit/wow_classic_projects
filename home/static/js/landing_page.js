
$(document).ready(init)

function init(){
    $(".countdown")
    .countdown("2019/08/26", function(event) {
      $(this).text(
        event.strftime('%D days %H:%M:%S')
      );
    });
}