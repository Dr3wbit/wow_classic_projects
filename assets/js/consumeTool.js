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
	const classMarker = $('<div/>', {
		class: 'classMarker',
	})
	const classMarkerGhost = $('<div/>', {
		class: 'classMarkerGhost',
	})
	$('.class-filter').on({
		click: e => {
			$('.class-filter').removeClass('selected')
			const clickedFilter = $(e.target)
			clickedFilter.append(classMarker)
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
		mouseenter: e => {
			const hoveredFilter = $(e.target)
			if(hoveredFilter.hasClass('selected')){
				return
			}else{
				hoveredFilter.append(classMarkerGhost)
			}
		},
		mouseleave: e => {
			$('.classMarkerGhost').remove()
		}
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
			text: item.name + ' : ' + item.amount
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
	let counts = {};
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
