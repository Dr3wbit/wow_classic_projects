
const utilities = {
	sanitize: function(str) {
	    return str.toLowerCase().replace(/\s+/g, '_')
	},
	titleCase: function(str) {
	    let strArr = str.replace(/\_/g, ' ').split(' ')
	    strArr.forEach(function(word, i) {
	        if (!(word=='of' || word=='the') && typeof(word)=='string'){
	            strArr[i] = word.charAt(0).toUpperCase() + word.slice(1)
	        }
	    })
	    return strArr.join(' ')
	},
	getTooltipPosition: function(e, tooltip) {
		let width = tooltip.width(), height = tooltip.height()
		this.coords = {}

		// coeffs measure aproximately the % of the visible and usable screen the cursor is at (aka visible bottom of page to bottom of class selection bar)
		let xCoeff = ($(e.target).offset().left/window.innerWidth)*100
		let distanceFromTop = $(e.target).offset().top - $(window).scrollTop()
		let yCoeff = (distanceFromTop/window.innerHeight)*100

		let left = 0, top = 0

		if (xCoeff > 50) {
			left = $(e.target).offset().left - 25 - width
		} else {
			left = $(e.target).offset().left + 45

		}
		if (yCoeff < 30) {
			top = $(e.target).offset().top + height/2 - 30

		}
		else if (yCoeff >= 30 && yCoeff < 75) {
			// sets tooltip vertically centered with talent
			let a = (height - 40)/2
			top = $(e.target).offset().top - (a+20)
		} else {
			let a = $(e.target).offset().top + 30
			top = a - height
		}
		this.coords.x = left
		this.coords.y = top
		return this.coords
	},
	bigdaddytooltip: function(e, ...args) {
		const targetElement = $(e.target)
		const tooltip = $("#tooltip")
		const elems = args[0]

		const container = $('<div/>', {
			class: 'tooltip-container',
		})

		elems.forEach(function(item) {
			container.append($('<div/>', {
				class: item.class,
				text: item.text,
			}))
		})

		tooltip.append(container)
		let coords = utilities.getTooltipPosition(e, tooltip)

		tooltip.attr("style", `top: ${coords.y}px; left: ${coords.x}px; visiblity: visible;`)

	}
}



// consumeTool.js
function updateTooltip(e) {
	const targetElement = $(e.target)
	const name = targetElement.closest($('.consume-block')).attr('name')
	let properName = ''

	if (name.startsWith('dirg')) {
		properName = "Dirge’s Kickin’ Chimaerok Chops"
	} else if(name == 'roids') {
		properName = "R.O.I.D.S."
	} else {
		properName = titleCase(name)
	}

	const tooltipElems = [{class: `title ${rarity}`,text: properName}]

	const thisConsume = allConsumes[name]


	const rarity = thisConsume.rarity

	if (thisConsume.bop) {
		tooltipElems.push({class: 'bop', text: "Binds when picked up",})
	}
	if (thisConsume.unique) {
		tooltipElems.push({class: 'unique', text: "Unique",})
	}

	let requirementText = ''
	if (name == 'goblin_rocket_boots') {
		requirementText = "Binds when equipped\nFeet\t\t\t\t\t\t\t\t\t\t    Cloth\n41 Armor\nDurability 35 / 35"
	} else {
		requirementText = (thisConsume.req) ? ((thisConsume.req.toString().startsWith('engi') || thisConsume.req.toString().startsWith('first')) ? titleCase(thisConsume.req.replace(/([a-zA-Z\_]+)(\d+)/, "$1 ($2)")) : `Requires Level ${thisConsume.req}`) : false
	}

	if (thisConsume.req || thisConsume.stats) {
		tooltipElems.push({class: 'requiredLevel', text: requirementText})
	}
	if (thisConsume.use) {
		tooltipElems.push({class: 'use', text: `Use: ${thisConsume.use}`})
	}
	if (thisConsume.description) {
		tooltipElems.push({class: 'description', text: `"${thisConsume.description}"`})
	}

	utilities.bigdaddytooltip(e, tooltipElems)
}
