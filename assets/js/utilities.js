
const utilities = {
	sanitize: function(str) {
	    return str.toLowerCase().replace(/\s+/g, '_').replace("'", "")
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
		let element = $(e.target)
		let span = element.find('span')

		this.coords = {}

		// coeffs measure aproximately the % of the visible and usable screen the cursor is at (aka visible bottom of page to bottom of class selection bar)
		let xCoeff = (element.offset().left/window.innerWidth)*100
		let distanceFromTop = element.offset().top - $(window).scrollTop()
		let yCoeff = (distanceFromTop/window.innerHeight)*100
		let left = 0, top = 0

		// let header = ($("#talentHeader").length) ? $("#talentHeader") : $("div.page-title")

		let header = ($("#talentHeader").length) ? $("#talentHeader") : $("#prof_header")
		let selectionElement = ($("#class_selection").length) ? $("#class_selection") : $("#prof_selection")


		if (xCoeff <= 50) { //left half of page
			if (span.length) {
				left = Math.round(span.offset().left + span.width() + 25)
			} else {
				left = Math.round(element.offset().left) + element.width() + 5
			}
		} else {
			left = Math.round(element.offset().left) - 25 - tooltip.width()
		}


		if (yCoeff < 30) {
			top = Math.max(header.position().top, selectionElement.position().top) + 35
			let percDiff = Math.round((1 - top/element.offset().top)*100)
			if (percDiff >= 10) {
				top = Math.floor(element.offset().top)
			}
		}
		else if (yCoeff >= 30 && yCoeff < 70) {
			// sets tooltip vertically centered with talent
			// NOTE: not good for talent calc as the elements resize
			// let a = (height - 40)/2
			// top = $(e.target).offset().top - (a+20)
			top = Math.floor(element.offset().top) - 20
		} else {
			let a = Math.floor(element.offset().top) + 30
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
