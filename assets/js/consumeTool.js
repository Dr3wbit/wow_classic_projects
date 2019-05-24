let selectedData = {}
let materialArray = []

$(document).ready(initializeApp)

function initializeApp() {
	$(".consume-form").submit(function(e) {
		e.preventDefault()

	});
	applyClickHandlers();
	$(".consume-form").on({
		'change': (e) => {
			// console.log("this: ", $( e.target ) )
			$('.consume-form').submit(getMaterials(selectedData))
		},
		blur: (e) => {
			$('.consume-form').submit(getMaterials(selectedData))
		},
		// 'keyup': (e) => {
		// 	// console.log("this: ", $( e.target ) )
		// 	$('.consume-form').submit(getMaterials(selectedData))
		// }
	})
	$("#warrior").click()
}

function stepValidator(n, step) {
	return ((step*Math.round(n/step) >= 0) ? step*Math.round(n/step) : 0)
}


function applyClickHandlers() {
	$('.class-filter').on({
		click: e => {
			$('.class-filter').removeClass('selected')
			const clickedFilter = $(e.target)
			clickedFilter.addClass('selected')
			const clickedID = clickedFilter[0].id
			const defaultData = consumes.find((a) => {
				return a.name == "all"
			})
			const classData = consumes.find((a) => {
				return a.name == clickedID;
			})
			const fullData = combineData(defaultData.data, classData.data)
			selectedData = fullData
			clearForm()
			populateConsumeBlocks({
				professions: fullData
			})

			$('.icon-container').on({
				contextmenu: e => {
					e.preventDefault()
				},

				mouseenter: (e) => {
					$(e.currentTarget.children[1]).removeClass('tooltip-hidden')
				},
				mouseleave: (e) => {
					$(e.currentTarget.children[1]).addClass('tooltip-hidden')
				},

                mousedown: (e) => {

					// e.preventDefault()


                    if (e.which === 1) {

						let input = $( e.target ).closest('.consume-block').find( $('input') ).first()
						let step = input.attr('step')
						input.val(function(i, val) {
							return ( parseInt(val) || 0 ) + parseInt(step)
						})
						$(".consume-form").trigger('change')

                    } else if (e.which === 3){

							let input = $( e.target ).closest('.consume-block').find( $('input') ).first()
							let step = input.attr('step')
							input.val(function(i, val) {
								return (parseInt(val) >= parseInt(step) ) ? parseInt(val) - parseInt(step) : 0
							})
							$(".consume-form").trigger('change')
							// console.log(typeof($(e.target).closest('.consume-block')))

                    }
               }

			})
		},
	})
}



function clearForm() {
	$('.consume-form').empty()
	$('.results').empty()
}

function combineData(defaultData, classData) {
	let combinedData = []
	defaultData.map((item, index) => {
		combinedData.push({
			name: item.name,
			data: item.data.concat(classData[index].data)
		})
	})
	const cleanedData = removeEmptyCategory(combinedData)
	return cleanedData
}

function removeEmptyCategory(dataToClean) {
	let refinedData = []
	dataToClean.map((item) => {
		if (item.data.length > 0) {
			refinedData.push(item)
		}
	})
	return refinedData
}

function populateConsumeBlocks(data) {
	let template = $('#consume-block-template').html();
	let templateScript = Handlebars.compile(template);
	let consume_html = templateScript(data);
	$('#consume-form').html(consume_html);
}

function getMaterials(data) {
	let materials = []
	const formValues = $('.consume-input')
	formValues.map((item) => {
		const name = formValues[item].attributes.name.value
		const category = formValues[item].attributes.category.value
		let inp2 = formValues[item].value
		const inputValue = stepValidator(formValues[item].value, formValues[item].attributes.step.value)
		if (inputValue != formValues[item].value) {

			$(`.consume-input[name="${name}"]`).val( parseInt(inputValue) ).delay( 3000 )
			console.log('test')
		}

		materials.push(findMaterials(name, category, data, inputValue))
	})
	appendMaterials(materials)
}

function findMaterials(name, category, data, inputValue) {
	const profession = data.find((a) => {
		return a.name == category
	})
	const item = profession.data.find((a) => {
		return a.name == name
	})
	let materialsToAppend = []
	Object.keys(item.materials).map(key => {
		materialsToAppend.push({
			[key]: Math.ceil(item.materials[key] * inputValue)
		})
	});
	return {
		name: [item.name],
		materials: materialsToAppend,
		amount: inputValue
	}
}

function appendMaterials(materials) {
	$('.results').empty()
	let totalMaterialCount = []
	materials.forEach((item) => {
		let resultConsume = $('<div/>', {
			class: 'result-consume',
			text: item.name + ' : ' + item.amount,
		})


		let materialsToAppend = []
		for (let mats in item.materials) {
			key = Object.keys(item.materials[mats])
			let resultMaterials = $('<div/>', {
				class: 'total-materials',
				text: key.toString().replace(/_/g, " ") + ": " + Object.values(item.materials[mats])
			})
			if (Object.values(item.materials[mats]) > 0) {
				materialsToAppend.push(resultMaterials)
				totalMaterialCount.push(item.materials[mats])
			}
		}
		if (materialsToAppend.length > 0) {
			resultConsume.append(materialsToAppend)
			$('.results').append(resultConsume)
		}
	})
	calculateTotals(totalMaterialCount)
}

function calculateTotals(materialTotals) {
	let materialsTotalsToAppend = []
	materialTotals.forEach((material) => {
		let key = Object.keys(material)
		let value = Object.values(material)
		for (let i = 0; i < value; i++) {
			materialsTotalsToAppend.push(key)
		}
	})
	let materialsToAppend = []
	let counts = {}
	materialsTotalsToAppend.forEach(function(x) {
		counts[x] = (counts[x] || 0) + 1;
	});
	let material = Object.keys(counts)
	let totalTitle = $('<div/>', {
		class: 'totalTitle',
		text: "Totals"
	})
	for (let i = 0; i < material.length; i++) {
		let totalMaterialCount = $('<div/>', {
			class: 'total-materials',
			text: material[i].replace(/_/g, " ") + ": " + counts[material[i]]
		})
		materialsToAppend.push(totalMaterialCount)
		totalTitle.append(totalMaterialCount)
	}
	$('.results').append(totalTitle)
}

function titleCase(s){
    const spaceRE = /\_/g
    let a = s.replace(spaceRE, ' ')
    let strArr = a.split(' ')
    strArr.forEach(function(word, i) {
        if (word != ('of' || 'the') && typeof(word)=='string'){
            strArr[i] = word.charAt(0).toUpperCase() + word.slice(1)
        }
    })
    return strArr.join(' ')

}

function materialsTooltip() {
    $(".results").on({
        mouseenter: e => {
            const closestMat = $( e.target ).closest('.materials-list').find('.materials-name')
            let closestTooltip = $( e.target ).closest( $('.materials-list')).find('div.tooltip-container')

            let matName = closestMat.text()

            if ((closestMat.hasClass('underlined')) || (matName=='Gold' || matName=='Silver')) {
                return
            } else {
                $(".results").find('.materials-name').removeClass('underlined')
                //
                closestMat.addClass('underlined')
                $(".results").find( $('div.tooltip-container') ).children().remove()



                const thisMat = allMaterials[sanitize(matName)]


                const rarity = thisMat.rarity

                const BoP = (thisMat.bop) ? $('<div/>', {
                    class: 'bop',
                    text: "Binds when picked up",
                }) : null

                const unique = (thisMat.unique) ? $('<div/>', {
                    class: 'unique',
                    text: "Unique",
                }) : null

                const requiredLevel = (thisMat.req) ? $('<div/>', {
                    class: 'requiredLevel',
                    text: `Requires Level ${thisMat.req}`,
                }) : null

                const use = (thisMat.use) ? $('<div/>', {
                    class: 'use',
                    text: `Use: ${thisMat.use}`,
                }) : null

                const description = (thisMat.description) ? $('<div/>', {
                    class: 'description',
                    text: `"${thisMat.description}"`,
                }) : null

                closestTooltip.append($('<div/>', {
                    class: 'consume-tooltip',
                 }).append($('<div/>', {
                    class: `title ${rarity}`,
                    text: matName,
                })).append(BoP).append(unique).append(requiredLevel).append(use).append(description)
            )

            }
        },
        mouseleave: e => {
            $(".results").find('.materials-name').removeClass('underlined')
            $(".results").find( $('div.tooltip-container') ).children().remove()

            // const targetMaterial = $( e.target ).closest('.materials-list').find('div.tooltip-container')
            // targetMaterial.children().remove()
        }
    })
}
