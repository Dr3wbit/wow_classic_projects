let selectedData = {}
let materialArray = []

$(document).ready(initializeApp)

function initializeApp() {

	// $(".consume-form").submit(function(e) {
	// 	e.preventDefault()
	//
	// });
	applyClickHandlers();
	// $(".consume-form").on({
	// 	'change': (e) => {
	// 		$('.consume-form').submit(getMaterials(selectedData))
	// 	},
	// 	blur: (e) => {
	// 		$('.consume-form').submit(getMaterials(selectedData))
	// 	},
	//
	// })
	// $("#warrior").click()

	// $(".consume-input").on({
	// 	input: (e)=>{
	// 		let lengthLimit = 3
	// 		let currentInput = e.target.value
	// 		if (currentInput.length > lengthLimit){
	// 			$(e.target).val(currentInput.slice(0, lengthLimit))
	// 		}
	// 	}
	// })
}

function stepValidator(n, step) {
	return ((step*Math.round(n/step) >= 0) ? step*Math.round(n/step) : 0)
}

function applyClickHandlers() {
	selectionHandler()
	// materialsTooltip()
	recipesHandler()
}

function selectionHandler() {
	$('.prof-filter').on({
		click: e => {

			$('.prof-filter').removeClass('selected')
			$(e.target).addClass('selected')
			const profName = $(e.target)[0].id

			const profDataArr = []
			Object.entries(allConsumes).forEach(function(val, ind) {
				if (val[1].category == profName){
					if (!(val[1].name)) {
						val[1].name = utilities.titleCase(val[0])
					}
					profDataArr.push(val)
				}
			})
			const profDataObject = Object.fromEntries(profDataArr)
			populateConsumeBlocks(profDataObject)

			// $('.icon-container').on({
			// 	contextmenu: e => {
			// 		e.preventDefault()
			// 	},
			//
			// 	mouseenter: (e) => {
			// 		updateTooltip(e)
			// 	},
			// 	mouseleave: (e) => {
			// 		$("#tooltip").hide()
			// 		$("#tooltip").children().remove()
			// 	},
			//
            //     mousedown: (e) => {
            //         if (e.which === 1) {
			//
			// 			let input = $( e.target ).closest('.consume-block').find( $('input') ).first()
			// 			let step = input.attr('step')
			// 			input.val(function(i, val) {
			// 				return ( parseInt(val) || 0 ) + parseInt(step)
			// 			})
			// 			$(".consume-form").trigger('change')
			//
            //         } else if (e.which === 3){
			//
			// 				let input = $( e.target ).closest('.consume-block').find( $('input') ).first()
			// 				let step = input.attr('step')
			// 				input.val(function(i, val) {
			// 					return (parseInt(val) >= parseInt(step) ) ? parseInt(val) - parseInt(step) : 0
			// 				})
			// 				$(".consume-form").trigger('change')
            //         }
            //    }
			//
			// })
		},

	})
}

function recipesHandler() {
	$("#recipe_list").on({
		mouseenter: e => {
			$(".prof-item-recipe").on({
				mouseenter: e => {
					clearTooltip()
					// e.preventDefault()
					console.log('mouseenter')
					let name = $(e.target).attr('name')
					console.log('name: ', name)
					updatetooltip(e)
				},
				mouseleave: e => {
					console.log('mouseleave')
					// $("#tooltip").hide()
					// $("#tooltip").children().remove()
					clearTooltip()


				},
				mousedown: e => {
					console.log('mousedown')
					addItem()
				}
			})
		},
		mouseleave: e => {
			console.log('mouseleave')
			// $("#tooltip").hide()
			// $("#tooltip").children().remove()
			clearTooltip()

		}
	})
}

function populateConsumeBlocks(data) {
	let template = $('#consume-block-template').html();
	let templateScript = Handlebars.compile(template);
	let consume_html = templateScript(data);
	$('#recipe_list').html(consume_html);
}

function clearForm() {
	$('.consume-form').empty()
	$('#results').empty()
}

function clearTooltip() {
	$("#tooltip").empty()
	$("#tooltip").hide()
}

function addItem() {
	//
}

function updatetooltip(e) {
	const targetElement = $(e.target)
	console.log(targetElement)
	const name = targetElement.attr('name')
	const consumeObj = allConsumes[name]
	const properName = (allConsumes[name].name) ? allConsumes[name].name : utilities.titleCase(name)
	const rarity = consumeObj.rarity
	const tooltipElems = [{class: `title ${rarity}`, text: properName}]
	if (consumeObj.bop) {
		tooltipElems.push({class: 'bop', text: "Binds when picked up",})
	}
	if (consumeObj.unique) {
		tooltipElems.push({class: 'unique', text: "Unique",})
	}
	let requirementText = ''
	if (name == 'goblin_rocket_boots' || name == 'black_mageweave_boots') {
		requirementText = consumeObj.req
	} else {
		requirementText = (consumeObj.req) ? ((consumeObj.req.toString().startsWith('engi') || consumeObj.req.toString().startsWith('first')) ? utilities.titleCase(consumeObj.req.replace(/([a-zA-Z\_]+)(\d+)/, "$1 ($2)")) : `Requires Level ${consumeObj.req}`) : false
	}

	if (consumeObj.req || consumeObj.stats) {
		tooltipElems.push({class: 'requiredLevel', text: requirementText})
	}
	if (consumeObj.use) {
		tooltipElems.push({class: 'use', text: `Use: ${consumeObj.use}`})
	}
	if (consumeObj.description) {
		tooltipElems.push({class: 'description', text: `"${consumeObj.description}"`})
	}
	utilities.bigdaddytooltip(e, tooltipElems)
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

function getMaterials(data) {
	let materials = []
	const formValues = $('.consume-input')

	formValues.map((item) => {

		if (!(formValues[item].value)) {
			return
		} else {
			const name = formValues[item].attributes.name.value
			const consumeObject = allConsumes[name]
			const category = consumeObject.profession
			const inputValue = stepValidator(formValues[item].value, formValues[item].attributes.step.value)
			if (inputValue != formValues[item].value) {
				$(`.consume-input[name="${name}"]`).val( parseInt(inputValue) ).delay( 3000 )
			}
			materials.push({name:name, data:consumeObject, amount:inputValue})
		}
	})
	appendMaterials(materials)
}

function materialsTooltip() {
    $("#results").on({
        mouseenter: e => {
			// e.preventDefault()


			if ($(e.target).hasClass("consumes-list-item")) {

				$(e.target).find("span.consume-name").addClass('underlined')
				return false
			}
            const closestMat = $( e.target ).closest('.materials-list-item').find('.materials-name')
            let matName = closestMat.text()
			let name = utilities.sanitize(matName)
            if ((closestMat.hasClass('underlined')) || (matName=='Gold' || matName=='Silver')) {
                return
            } else {
                $("#results").find('.materials-name').removeClass('underlined')
                closestMat.addClass('underlined')
				$("#tooltip").children().remove()
				$("#tooltip").hide()
                const materialObject = allMaterials[name]
				let requirementText = ''
				if (name == 'goblin_rocket_boots' || name == 'black_mageweave_boots') {
					requirementText = materialObject.req
				} else {
					requirementText = (materialObject.req) ? ((materialObject.req.toString().startsWith('engi') || materialObject.req.toString().startsWith('first')) ? utilities.titleCase(materialObject.req.replace(/([a-zA-Z\_]+)(\d+)/, "$1 ($2)")) : `Requires Level ${materialObject.req}`) : null
				}

				const rarity = materialObject.rarity
				let properName = (materialObject.name) ? materialObject.name : matName

				const tooltipElems = [{class: `title ${rarity}`, text: matName}]
                if (materialObject.bop) {
                    tooltipElems.push({class:'bop', text: "Binds when picked up"})
                }
                if (materialObject.unique) {
                    tooltipElems.push({class: 'unique', text: "Unique",})
                }
				if (materialObject.req){
                    tooltipElems.push({class: 'requiredLevel', text: requirementText})
                }
                if (materialObject.use) {
                    tooltipElems.push({class: 'use', text: `Use: ${materialObject.use}`})
                }
                if (materialObject.description) {
                    tooltipElems.push({class: 'description', text:`"${materialObject.description}"`})
                }
				utilities.bigdaddytooltip(e, tooltipElems)
            }
        },
        mouseleave: e => {
            $("#results").find(".materials-name, .consume-name").removeClass('underlined')
            $("#tooltip").hide()
            $("#tooltip").children().remove()
        },
		'shown.bs.collapse': e=> {
			let targetID = $(e.target).attr('id').replace('_collapse', '')
			$(`#${targetID}`).find('span.plus').text('-')
		},
		'hidden.bs.collapse': e=> {

			let targetID = $(e.target).attr('id').replace('_collapse', '')

			$(`#${targetID}`).find('span.plus').text('+')
		},
    })
}

function appendMaterials(consumables) {

	let totalMaterialCount = {}
	consumables.forEach(function(consume) {
		let consumeItemElement = $(`#${consume.name}`)
		if (consumeItemElement.length) {
			consumeItemElement.find($('span.amount')).text(` [${consume.amount}]`)

			for (let [name, matsPer] of Object.entries(consume.data.materials)) {
				totalMaterialCount[name] = (!(totalMaterialCount[name])) ? Math.round(matsPer * consume.amount) : Math.round((matsPer * consume.amount) + totalMaterialCount[name])
				// console.log(totalMaterialCount)
				$(`.materials-list-item[name='${consume.name}_${name}']`).find($("span.amount")).text(`[${Math.round(matsPer * consume.amount)}]`)
			}
		} else {
			let consumeName = (consume.data.name) ? consume.data.name : utilities.titleCase(consume.name)
			let consumeElement = $('<a/>', {
				href: `#${consume.name}_collapse`,
				role: 'button',
				class: "consumes-list-item",
				id: `${consume.name}`,
			})
			consumeElement.attr("data-toggle", "collapse")

			consumeElement.append($('<span/> ', {
					class:`${consume.data.rarity} plus`,
					text: "+",
				})).append(" ").append($('<span/>', {
					class:`${consume.data.rarity} consume-name`,
					text: `${consumeName}`,
				})).append(" ").append($('<span/>', {
					class:`${consume.data.rarity} amount`,
					text:`[${consume.amount}]`,
				}))

			materialsListParent = $('<div/>', {
				class: 'materials-list collapse',
				id: `${consume.name}_collapse`,
			})


			for (let [name, matsPer] of Object.entries(consume.data.materials)) {
				let matObject = allMaterials[name]
				let category = matObject.category
				let rarity = matObject.rarity
				let properName = (matObject.name) ? matObject.name : utilities.titleCase(name)
				let imageName = (properName.endsWith("E'ko")) ? "eko" : name

				if (!(totalMaterialCount[name])) {
					totalMaterialCount[name] = Math.round(matsPer * consume.amount)
				} else {
					totalMaterialCount[name] = Math.round((matsPer * consume.amount) + totalMaterialCount[name])
				}
				let materialsListItemElement = $('<div/>', {
					class: 'materials-list-item',
					name: `${consume.name}_${name}`
				}).append($('<img/>', {
					class: 'icon-small',
					src: "assets/images/icons/small/icon_border.png",
					style: `background-image: url(assets/images/icons/small/materials/${category}/${imageName}.jpg);`,
				})).append($('<span/>', {
					text: `${properName}`,
					class: `materials-name ${rarity}`,
				})).append(" ").append($('<span/>', {
					text: `[${Math.round(matsPer * consume.amount)}]`,
					class: 'amount',
				}))
				materialsListParent.append(materialsListItemElement)
			}
			$('#results').append(consumeElement, materialsListParent)

		}
	})
	calculateTotals(totalMaterialCount)
}


function calculateTotals(totals) {


	let totalTitle = ($("#totalTitle").length) ? $("#totalTitle") : $('<div/>', {
		class: 'totalTitle',
		text: "Totals",
		id: 'totalTitle'
	})

	let divider = $("#totals-divider")

	if (!(divider.length)) {
		totalTitle.append($('<hr>', {
			id: "totals-divider",
		}))
	}

	for (let [name, value] of Object.entries(totals)) {

		let matElement = $(`div.materials-list-item[name='${name}']`)

		// already exists, update it
		if (matElement.length) {
			matElement.find($('span.amount')).text(` [${value}]`)
		} else {
			let matObject = allMaterials[name]
			let category = matObject.category
			let rarity = matObject.rarity
			let properName = (matObject.name) ? matObject.name : utilities.titleCase(name)
			let imageName = (properName.endsWith("E'ko")) ? "eko" : name

			let matElement = $('<div/>', {
				class: 'materials-list-item',
				name: `${name}`,
			}).append($('<img/>', {
				class: 'icon-small',
				src: "assets/images/icons/small/icon_border.png",
				style: `background-image: url(assets/images/icons/small/materials/${category}/${imageName}.jpg);`,
			})).append($('<span/>', {
				text: properName,
				class: `materials-name ${rarity}`,
			})).append(" ").append($('<span/>', {
				text: `[${value}]`,
				class: 'amount',
			}))

			totalTitle.append(matElement)
		}

	}
	$('#results').append(totalTitle)
}
