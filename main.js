
$(document).ready(initializeApp)

function initializeApp(){
    applyClickHandlers();
    console.log('it happend')
}

function applyClickHandlers(){
    $(".itemslot").on('click', () => {
        console.log('you clicked me')
    })
}