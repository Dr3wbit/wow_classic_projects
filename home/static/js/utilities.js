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
	getTooltipPosition: function(targetElement, tooltip) {
		let width = tooltip.width(), height = tooltip.height()
		let element = targetElement
		let spans = element.find('span')
		console.log('offset left: ', element.offset().left, ' offset left: ', element.offset().top)

		this.coords = {}
		// console.log('offset left: ', element.offset().left)
		// console.log('offset left: ', element.offset().top)

		// console.log('tooltip position', tooltip.position())

		// coeffs measure aproximately the % of the visible and usable screen
		// the cursor is at (aka visible bottom of page to bottom of class selection bar)
		let xCoeff = (element.offset().left/window.innerWidth)*100
		let distanceFromTop = element.offset().top - $(window).scrollTop()
		let yCoeff = (distanceFromTop/window.innerHeight)*100
		let left = 0, top = 0

		// let header = ($("#talentHeader").length) ? $("#talentHeader") : $("div.page-title")

		let header = ($("#talentHeader").length) ? $("#talentHeader") : ($(".prof-header").length) ? $(".prof-header") : $("#class_selection")
		let selectionElement = ($("#class_selection").length) ? $("#class_selection") : $("#prof_selection")
		//checks to see if tooltip would collide with right side of page
		if ((tooltip.width()+element.width()+element.offset().left+20) > window.innerWidth){
			left = Math.round(element.offset().left) - 30 - tooltip.width()
		} else {
			left = Math.round(element.offset().left) + element.width() + 5
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
	bigdaddytooltip: function(targetElement, ...args) {
		const tooltip_container = $("#tooltip_container")
		const tooltip = $('<div/>', {
			class: 'tooltip-container',
			id: "tooltip",
			style: "float: right;"
		})

		const elems = args[0]
		elems.forEach(function(item) {
			tooltip.append($('<div/>', {
				class: item.class,
				text: item.text,
			}))
		})

		tooltip_container.append(tooltip)

		let coords = utilities.getTooltipPosition(targetElement, tooltip_container)

		tooltip_container.attr("style", `top: ${coords.y}px; left: ${coords.x}px; visiblity: visible;`)
	}
}


const utilities_v2 = {
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
		let pageY = e.pageY
		let pageX = e.pageX

		let width = tooltip.width(), height = tooltip.height()
		let element = $(e.target)
		let spans = element.find('span')

		this.coords = {}
		console.log('offset left: ', element.offset().left, ' offset left: ', element.offset().top)

		// console.log('tooltip position', tooltip.position())

		// coeffs measure aproximately the % of the visible and usable screen
		// the cursor is at (aka visible bottom of page to bottom of class selection bar)
		let xCoeff = (element.offset().left/window.innerWidth)*100
		let distanceFromTop = element.offset().top - $(window).scrollTop()
		let yCoeff = (distanceFromTop/window.innerHeight)*100
		let left = 0, top = 0

		// let header = ($("#talentHeader").length) ? $("#talentHeader") : $("div.page-title")

		let header = ($("#talentHeader").length) ? $("#talentHeader") : ($(".prof-header").length) ? $(".prof-header") : $("#class_selection")
		let selectionElement = ($("#class_selection").length) ? $("#class_selection") : $("#prof_selection")
		//checks to see if tooltip would collide with right side of page
		if ((tooltip.width()+element.width()+element.offset().left+20) > window.innerWidth){
			left = Math.round(element.offset().left) - 30 - tooltip.width()
		} else {
			left = Math.round(element.offset().left) + element.width() + 5
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
		this.coords.x = pageX+15
		this.coords.y = pageY
		return this.coords
	},
	bigdaddytooltip: function(e, ...args) {
		const name = $(e.target).attr("name")
		const tooltip_container = $("#tooltip_container")
		const elems = args[0]

		const image = (name) ? $('<img/>', {
			class: 'icon-medium',
			src: "http://127.0.0.1:8000/static/images/icon_border_2.png",
			style: `margin-top: 5px; pointer-events: none; float: left; background-image: url(http://127.0.0.1:8000/static/images/icons/consumes/${name}.jpg)`
		}) : null
		// const p = $('<p/>', {
		// 	class: 'image-container'
		// })
		// p.append(image)

		const tooltip = $('<div/>', {
			class: 'tooltip-container',
			id: "tooltip",
			style: "float: right;"
		})

		elems.forEach(function(item) {
			tooltip.append($('<div/>', {
				class: item.class,
				text: item.text,
			}))
		})

		tooltip_container.append(image, tooltip)

		var x = 0
		var y = 0

		if (image) {
			x = e.pageX + 15
			y = e.pageY - 25
		} else {
			x = $(e.target).offset().left + 45
			y = $(e.target).offset().top - 45
		}
		// utilities_v2.getTooltipPosition(e, tooltip_container)

		tooltip_container.attr("style", `left: ${x}px; top: ${y}px; visiblity: visible;`)
	}
}
