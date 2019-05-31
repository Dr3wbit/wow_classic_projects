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
			$('.consume-form').submit(getMaterials(selectedData))
		},
		blur: (e) => {
			$('.consume-form').submit(getMaterials(selectedData))
		},

	})
	$("#warrior").click()

	$(".consume-input").on({
		input: (e)=>{
			let lengthLimit = 3
			let currentInput = e.target.value
			if (currentInput.length > lengthLimit){
				$(e.target).val(currentInput.slice(0, lengthLimit))
			}
		}
	})
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

			const classDataTest = []

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
					// $(e.currentTarget.children[1]).removeClass('tooltip-hidden')
					updateTooltip(e)
				},
				mouseleave: (e) => {
					// $(e.currentTarget.children[1]).addClass('tooltip-hidden')
					$("#tooltip").hide()
					$("#tooltip").children().remove()
				},

                mousedown: (e) => {
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

	materialsTooltip()
	// consumeItemEventHandler()
}

function clearForm() {
	$('.consume-form').empty()
	$('#results').empty()
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
	console.log('data: ', data)

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
	console.log('consumables: ', materials)
	appendMaterials(materials)
}


// function materialsTooltip() {
// 	$("#materials-list-item").on({
// 		mouseenter: e => {
//
//
// 			$( e.target).find('.materials-name').addClass('underlined')
//
// 			const materialObject = allMaterials[name]
// 			let requirementText = ''
// 			if (name == 'goblin_rocket_boots' || name == 'black_mageweave_boots') {
// 				requirementText = materialObject.req
// 			} else {
// 				requirementText = (materialObject.req) ? ((materialObject.req.toString().startsWith('engi') || materialObject.req.toString().startsWith('first')) ? utilities.titleCase(materialObject.req.replace(/([a-zA-Z\_]+)(\d+)/, "$1 ($2)")) : `Requires Level ${materialObject.req}`) : null
// 			}
//
// 			const rarity = materialObject.rarity
// 			let properName = (materialObject.name) ? materialObject.name : matName
//
// 			const tooltipElems = [{class: `title ${rarity}`, text: matName}]
// 			if (materialObject.bop) {
// 				tooltipElems.push({class:'bop', text: "Binds when picked up"})
// 			}
// 			if (materialObject.unique) {
// 				tooltipElems.push({class: 'unique', text: "Unique",})
// 			}
// 			if (materialObject.req){
// 				tooltipElems.push({class: 'requiredLevel', text: requirementText})
// 			}
// 			if (materialObject.use) {
// 				tooltipElems.push({class: 'use', text: `Use: ${materialObject.use}`})
// 			}
// 			if (materialObject.description) {
// 				tooltipElems.push({class: 'description', text:`"${materialObject.description}"`})
// 			}
// 			utilities.bigdaddytooltip(e, tooltipElems)
//
// 		},
// 		mouseleave: e => {
//             $("#results").find('.materials-name').removeClass('underlined')
//             $("#tooltip").hide()
//             $("#tooltip").children().remove()
// 		}
// 	})
// }
//
function materialsTooltip() {
    $("#results").on({
        mouseenter: e => {
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
            $("#results").find('.materials-name').removeClass('underlined')
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

			// materialsListParent.insertAfter(consumeElement)

			// consumeElement.append(materialsListParent)
			$('#results').append(consumeElement, materialsListParent)

		}
	})
	calculateTotals(totalMaterialCount)
}


function calculateTotals(totals) {

	let totalsElement = $("#totalMaterials")

	let totalTitle = ($("#totalTitle").length) ? $("#totalTitle") : $('<div/>', {
		class: 'totalTitle',
		text: "Totals",
		id: 'totalTitle'
	})

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


function updateTooltip(e) {
	const targetElement = $(e.target)
	const name = targetElement.closest($('.consume-block')).attr('name')
	const consumeObj = allConsumes[name]
	const properName = (allConsumes[name].name) ? allConsumes[name].name : utilities.titleCase(name)
	const rarity = consumeObj.rarity
	const tooltipElems = [{class: `title ${rarity}`,text: properName}]
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
//
// function consumeItemEventHandler() {
//
// 	$('.materials-list').on({
// 		mouseenter: e=> {
// 			console.log('mouseenter')
//
// 			$(e.target).find($('span.consume-name')).addClass('underline')
// 			$(e.target).find($('span.plus')).addClass('blue')
// 		},
// 		mouseleave: e=> {
// 			console.log('mouseleave')
//
// 			$(e.target).find($('span.consume-name')).removeClass('underline')
// 			$(e.target).find($('span.plus')).removeClass('blue')
//
// 		},
// 		'shown.bs.collapse': e=> {
// 			console.log('shown')
// 			$(e.target).find($('span.plus')).text('+')
// 		},
// 		'hidden.bs.collapse': e=> {
// 			console.log('hidden')
//
// 			$(e.target).find($('span.plus')).removeClass('-')
// 		},
// 	})
// }
