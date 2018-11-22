

$(document).ready(initializeApp)

function initializeApp() {
    applyClickHandlers();
    getInitialData();
}

function applyClickHandlers() {
    $('.class-filter').on({
        click: e => {
            $('.class-filter').removeClass('selected')
            const clickedFilter = $(e.target)
            clickedFilter.addClass('selected')
        },
    })
}

function getInitialData() {

}