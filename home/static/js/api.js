// var prev_query_keys = Object.keys(localStorage)
var prev_query_keys = Object.keys(global.STORAGE_ITEMS)
var ALL_ITEMS = Object.assign({}, global.STORAGE_ITEMS)

$("#prof_loader").on({
    click: e=> {
        $.ajax({
            url: '/ajax/prof_loader/',
            data: {
                'prof': 'Enchanting',
            },
            dataType: 'json',
            success: createTable,
            complete: init_list_searching
        });
    }
})

function init_list_searching(response) {
    var monkeyList = new List('profession-table', {
      valueNames: ['consume-name', 'yellow-skillup'],
    });
    monkeyList.on('sortComplete', function(e) {
        // TODO: change glyphicon
    })
    monkeyList.on('searchComplete', function(e) {
        // TODO: change glyphicon
    })
}

function createTable(data) {
    var tbody = document.getElementById("tbody123")
    var table = tbody.closest("table")

    data.forEach(function (recipe) {
        var tablerow = create_element('tr')
        tbody.appendChild(tablerow)

        var td = create_element('td', 'recipe', "text-align: left;")
        tablerow.appendChild(td)

        var recipe_container = create_element('div', `recipe-container data-container q${recipe.quality}`, '', '', {'data-ix': recipe.ix})
        td.appendChild(recipe_container)

        var image_name = global.static_url+`images/icons/large/${recipe.img}.jpg`
        var recipe_img_el = create_element('img', 'icon-medium recipe-image', `background-image: url(${image_name});`)
        recipe_container.appendChild(recipe_img_el)

        recipe_img_el.src = global.static_url+"images/icon_border_2.png"
        recipe_img_el.addEventListener("mouseover", tooltip.init)
        recipe_img_el.addEventListener("mouseleave", tooltip.mouseleaveCleanup)

        var recipe_name_el = create_element('span', 'consume-name', 'margin-left: 5px;', recipe.name)
        recipe_container.appendChild(recipe_name_el)

        recipe_name_el.addEventListener("mouseover", tooltip.init)
        recipe_name_el.addEventListener("mouseleave", tooltip.mouseleaveCleanup)

        var mats_td = create_element('td', 'reagant-list')
        tablerow.appendChild(mats_td)

        recipe.mats.forEach(function (mat) {
            var mat_container = create_element('div', 'data-container', 'display: inline-block;', '', {'data-ix': mat.ix})
            mats_td.appendChild(mat_container)

            var mat_image_name = global.static_url+`images/icons/large/${mat.img}.jpg`
            var mat_img = create_element('img', 'icon-medium', `background-image: url(${mat_image_name});`)
            mat_container.appendChild(mat_img)

            mat_img.addEventListener("mouseover", tooltip.init)
            mat_img.addEventListener("mouseleave", tooltip.mouseleaveCleanup)

            mat_img.src = global.static_url+"images/icon_border_2.png"

            if (mat.step > 1) {
                var count_container = create_element('span', 'count-container')
                mat_container.appendChild(count_container)

                var div1 = create_element('span', 'material-count', '', mat.step)
                var div2 = create_element('span', 'material-count', 'color:black; bottom:1px; z-index:4;', mat.step)
                var div3 = create_element('span', 'material-count', 'rgba(0,0,0,.9); bottom:2px; z-index:4;', mat.step)
                var div4 = create_element('span', 'material-count', 'color:black; right:2px; z-index:4;', mat.step)
                count_container.appendChild(div1)
                count_container.appendChild(div2)
                count_container.appendChild(div3)
                count_container.appendChild(div4)

            }


        })
        var skillup_td = create_element('td', 'skillup')
        tablerow.appendChild(skillup_td)

        var grey = create_element('span', 'grey-skillup', 'color: #808080; font-weight: bold; margin-left: 5px;', recipe.skillups.grey)
        var green = create_element('span', 'green-skillup', 'color: #40BF40; font-weight: bold; margin-left: 5px;', recipe.skillups.green)
        var yellow = create_element('span', 'yellow-skillup', 'color: #FF0; font-weight: bold; margin-left: 5px;', recipe.skillups.yellow)

        skillup_td.appendChild(yellow)
        skillup_td.appendChild(green)
        skillup_td.appendChild(grey)
    })
}
