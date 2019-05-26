
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
}


function bigdaddytooltip(e) {
	const targetElement = $(e.target)
}


function updateTooltip(e) {
	const targetTalent = $(e.target)
	const name = targetTalent.attr('name')
	const tree = targetTalent.closest('div.talentTable')[0].id

	const found = classData.trees.find(function (x) {
		return x.name == tree
	})

	const j = targetTalent.attr('data-j')
	const k = targetTalent.attr('data-k')

	const talentObj = found.data[j][k]
	const talentCopy = Object.assign({}, talentObj)
	const requiredTalentPoints = talentObj.requiredTalentPoints

	let description
	let next_rank = true
	let req_text = ''
	let tooltipFooter = {}

	const locked = $(e.target).hasClass('locked')

	if (talentObj.invested == 0) {
		next_rank = false
		talentCopy.invested++
		tooltipFooter.text = 'Click to learn'
		tooltipFooter.color = 'learn'
		description = talentCopy.description()
	}

	if (talentObj.maxRank == 1) {
		next_rank = false
		talentCopy.invested = talentCopy.maxRank
		description = talentCopy.description()
	}

	if (talentObj.invested == talentObj.maxRank) {
		tooltipFooter.text = 'Right-click to unlearn'
		tooltipFooter.color = 'unlearn'

		next_rank = false
		description = talentCopy.description()
	}

	if (talentObj.maxRank > 1 && talentObj.invested > 0 && next_rank) {
		talentCopy.invested++
		// description = talent.description() + "\n\nNext Rank:\n" + talentCopy.description()
		description = talentObj.description()

	}
	if (talentPointsSpent[tree].total() < requiredTalentPoints) {
		req_text = `Requires ${requiredTalentPoints} points in ${tree} Talents`
	}

	if (locked) {
		const coords = talentCopy.locked
		const prereq = Object.assign({}, found.data[coords[0]][coords[1]])
		const points_remaining = prereq.maxRank - prereq.invested
		const plural = (points_remaining > 1) ? 's' : ''
		req_text = `Requires ${points_remaining} point${plural} in ${prereq.name}\n` + req_text  //Figure out how to get the talent and points needed to unlock for this text
	}

	const tooltipContainer = $("#tooltip")

	let top = 0
	let left = $(e.target).offset().left + 45
	let distanceFromTop = $(e.target).offset().top - $(window).scrollTop()

	const next_rank_ele = (next_rank) ? $('<div/>', {
		class: 'next',
		text: "\nNext Rank:\n",
	}).append($('<div/>', {
		class: 'description',
		text: talentCopy.description(),
	})) : (req_text || talentPointsSpent.hardLocked || (talentPointsSpent.softLocked && tooltipFooter.color == 'learn')) ? null : $('<div/>', {
		class: tooltipFooter.color,
		text: tooltipFooter.text,
	})

	const testElem = $('<div/>', {
		class: 'tooltip-container',
		})
		.append($('<div/>', {
			class: 'title',
			text: name,
		}))
		.append($('<div/>', {
			class: 'rank',
			text: "Rank " + talentObj.invested + "/" + talentObj.maxRank,
		}))
		.append($('<div/>', {
			class: 'req',
			text: req_text,
		}))
		.append($('<div/>', {
			class: 'description',
			text: description,
		}))
		.append(next_rank_ele)

	tooltipContainer.append(testElem)

	let windowCoefficient = window.innerHeight/$(e.target).offset().top

	if (windowCoefficient < 1.3) {
		let a = $(e.target).offset().top + 45
		top = a - tooltipContainer.height()
	}
	else if (windowCoefficient >= 1.3 && windowCoefficient < 2) {
		// set tooltip vertically centered with talent
		let a = (tooltipContainer.height() - 40)/2
		top = $(e.target).offset().top - (a+20)
	} else {
		top = $(e.target).offset().top + 10
	}

	tooltipContainer.attr("style", `top: ${top}px; left: ${left}px; visiblity: visible;`)

}


function showEnchantEffect() {
    $('.enchantHolder').on({
        mouseenter: e=> {
            const tooltipContainer = $("#tooltip")
            const targetEnchant = $(e.target)
            let a = targetEnchant.text()
            let matched = a.match(/([\w\s]+):/)

            if (matched) {
                const selection = $("div.itemslot.enchantable.focus")
                const slot = selection.attr("id")

                const b = sanitize(matched[1].trim())

                const thisEnch = enchants[slot][b]

                const enchName = titleCase(b)
                const slotName = titleCase(slot.toLowerCase())

                let title = $('<div/>', {
                   class: `tooltip-container title spell`,
                   text: `Enchant ${slotName} - ${enchName}`,
                   style: 'display: block; visibility: hidden;'
                })

                const offset = title.offset()
                tooltipContainer.attr("style", `top: ${e.pageY}px; left: ${e.pageX}px;`)
                tooltipContainer.append(title)
                e.stopPropagation()
                const width = tooltipContainer.width()


                tooltipContainer.attr("style", `top: ${e.pageY}px; left: ${e.pageX}px; max-width: ${width*1.1+10}px; visibility: visible;`)

                title.attr("style", "visibility: visible;")
                tooltipContainer.append($('<div/>', {
                    class: 'description',
                    text: thisEnch.description,
                    style: 'max-width: inherit; font-size: 12px;'
                }))
            }
        },
        mouseleave: e=>  {
            $("#tooltip").children().remove()
            $("#tooltip").hide()
        }
    })
}

function materialsTooltip() {
    $(".results").on({
        mouseenter: e => {

            const closestMat = $( e.target ).closest('.materials-list').find('.materials-name')
            const tooltipContainer = $("#tooltip")

            let matName = closestMat.text()

            if ((closestMat.hasClass('underlined')) || (matName=='Gold' || matName=='Silver')) {
                return
            } else {
                $(".results").find('.materials-name').removeClass('underlined')

                closestMat.addClass('underlined')
                tooltipContainer.children().remove()
                tooltipContainer.attr("style", `top: ${e.pageY}px; left: ${e.pageX}px; visiblity: visible;`)
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


                tooltipContainer.append($('<div/>', {
                    class: 'tooltip-container',
                    }).append($('<div/>', {
                    class: `title ${rarity}`,
                    text: matName,
                    })).append(BoP).append(unique).append(requiredLevel).append(use).append(description)
                )
                let distanceFromTop = tooltipContainer.offset().top - $(window).scrollTop()
            }
        },
        mouseleave: e => {
            $(".results").find('.materials-name').removeClass('underlined')
            $("#tooltip").hide()
            $("#tooltip").children().remove()

        }
    })
}
