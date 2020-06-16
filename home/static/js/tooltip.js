var tooltip = {
    coords: {x:'', y:''},
    dimensions: {w: '', h:''},
    static: false,
    rectangle: '',
    dad: document.getElementById("tooltip_container"),
    init: function(e) {
        tooltip.empty()

        if (tooltip.static) {
            var rectangle = e.target.getBoundingClientRect()
            tooltip.rectangle = rectangle
            tooltip.coords.x = Math.ceil(rectangle.right) - 3
            tooltip.coords.y = Math.ceil(rectangle.top) + 7 + window.scrollY

        } else {
            tooltip.coords.x = e.pageX
            tooltip.coords.y = e.pageY
        }
    },
    empty: function() {
        while (this.dad.firstChild) {
            this.dad.removeChild(this.dad.firstChild);
        }
        tooltip.dad.style.cssText = `visibility: hidden;`
    },
    hide: function() {
        for (let i = 0; i < this.dad.children.length; i++) {
            this.dad.children[i].hidden = true
        }
    },
    addMousemove: function(e) {
        e.target.addEventListener('mousemove', tooltip.updateCoords)
    },
    updateCoords: function(e) {
        tooltip.coords.x = tooltip.coords.x + e.movementX
        tooltip.coords.y = tooltip.coords.y + e.movementY
        // tooltip.checkDimensions()
        tooltip.setPosition(tooltip.coords.x, tooltip.coords.y)
    },
    setPosition: function(x=this.coords.x, y=this.coords.y) {
        tooltip.dad.style.cssText = `left: ${x}px; top: ${y}px; visibility: visible; white-space: pre-wrap`
    },
    getDimensions: function(element, msg='') {
        var message = `${msg} offset Width:${element.offsetWidth}, Height:${element.offsetHeight}, Top:${element.offsetTop}, Left:${element.offsetLeft}`
        console.log(message)
        message = `${msg} client  Width:${element.clientWidth}, Height:${element.clientHeight}`
        console.log(message)
    },
    checkDimensions: function() {

        if ((tooltip.dad.offsetWidth + tooltip.coords.x) > window.screen.availWidth) {

            if (tooltip.static) {
                tooltip.coords.x = tooltip.rectangle.left + 3 - tooltip.dad.offsetWidth
            } else {
                tooltip.coords.x -= tooltip.dad.offsetWidth - 45
            }
        }

        if (tooltip.dad.offsetHeight > tooltip.rectangle.top) {
            tooltip.coords.y = tooltip.rectangle.bottom + window.scrollY
        }
    },
    mouseleaveCleanup: function(e) {
        tooltip.empty()
        e.target.removeEventListener('mousemove', tooltip.updateCoords)
    },

    create: function(response) {
        var data = (response.responseJSON) ? response.responseJSON : response
        var container = create_element('div', 'tooltip-container', 'white-space: pre-wrap;')
        container.id = 'tooltip'

    	if (data.img) {
    		let image_name = static_url+`images/icons/large/${data.img}.jpg`
            style = `pointer-events: none; background-image: url(${image_name})`

    		var img = create_element('img', 'icon-medium', style)
            img.id = 'tooltip_image'
    		img.src = static_url+"images/icon_border_2.png"
    		tooltip.dad.appendChild(img)
    	}

    	var title = create_element('div', 'title', 'clear: both; margin-right: 5px; padding-right: 5px; width: 100%;', `${data.n}`)
        if (data.q) {
            title.classList.add(`q${data.q}`)
        }
        container.appendChild(title)

        if (data.spent >= 0) {


            var descriptionText = '',
                footerText = '',
                footerClass = '';

            var rank = create_element('div', 'rank', '', `Rank ${data.spent}/${data.max}`)
            container.appendChild(rank)
            if (data.locked) {
                var lockedText = ''
                var lockedTalent = data.tree.talents.find(x => x.n == data.locked)
                if (lockedTalent.spent != lockedTalent.max) {
                    var plural = (lockedTalent.max-lockedTalent.spent > 1) ? 's' : ''
                    lockedText = `Requires ${lockedTalent.max-lockedTalent.spent} point${plural} in ${lockedTalent.n}`
                    var lockedReq = create_element('div', 'req', '', lockedText)
                    container.appendChild(lockedReq)
                }
            }

            if (data.spent == 0) {
                if (data.tree.spent < data.y*5) {
                    data.tree.n
                    var req = create_element('div', 'req', '', `Requires ${data.y*5} points spent in ${data.tree.n} Talents`)
                    container.appendChild(req)
                } else {
                    footerText = 'Click to learn'
                    footerClass = 'learn'
                }
                descriptionText = data.d[0]
                var description = create_element('div', 'description', '', descriptionText)
                container.appendChild(description)

            } else {
                descriptionText = data.d[data.spent-1]
                var description = create_element('div', 'description', '', descriptionText)
                container.appendChild(description)

                if (data.spent == data.max) {
                    footerText = 'Right-click to unlearn'
                    footerClass = 'unlearn'
                }

                else if (data.max != 1) {
                    var nextRank = create_element('div', 'next', '', '\nNext Rank:')
                    var nextDescription = create_element('div', 'description', '', `${data.d[data.spent]}`)
                    container.appendChild(nextRank)
                    container.appendChild(nextDescription)
                }
            }
            var tooltipFooter = create_element('div', footerClass, '', footerText)
            container.appendChild(tooltipFooter)
        }

    	if ((data.slot && data.q > 1) || (data.bop)) {
    		var bop_text = (data.bop) ? "Binds when picked up" : "Binds when equipped"
    		var bop_elem = create_element('div', 'bop', '', `${bop_text}`)
    		container.appendChild(bop_elem)
    	}

    	if (data.quest_item) {
    		var quest_item = create_element('div', 'unique', 'padding-right: 5px; margin-right: 5px;', "Quest Item")
    		container.appendChild(quest_item)
    	}

    	if (data.unique) {
    		var unique = create_element('div', 'unique', 'padding-right: 5px; margin-right: 5px;', "Unique")
    		container.appendChild(unique)
    	}

    	if (data.slot) {
    		var slot_text = (data.slot == 'Bag') ? `${data.slots} Slot Bag` : data.slot
    		var slot = create_element('div', 'slot', 'float:left; margin-right: 5px; padding-right: 5px;', `${slot_text}\n`)
    		container.appendChild(slot)
    	}

    	if (data.proficiency) {
    		var proficiency = create_element('div', 'proficiency', 'float: right; clear: right;', `${data.proficiency}`)
    		container.appendChild(proficiency)
    	}

    	if (data.damage) {
    		var damage_text = ""
    		data.damage.forEach(function(x) {
    			damage_text += `${x}\n`
    		})
    		var damage = create_element('div', 'damage', 'float: left; clear:left; margin-right: 10px; padding-right: 10px', damage_text)
    		container.appendChild(damage)
    	}

    	if (data.speed) {
    		var speed = create_element('div', 'speed', 'float: right; clear: right; margin-left: 10px; padding-left: 10px', `Speed ${data.speed}`)
    		container.appendChild(speed)
    	}

    	if (data.dps) {
    		var dps = create_element('div', 'dps', 'clear: both;', `(${data.dps} damage per second)`)
    		container.appendChild(dps)

    	}

    	if (data.armor) {
    		var armor = create_element('div', 'armor', 'clear: both;', `${data.armor} Armor`)
    		container.appendChild(armor)
    	}

    	if (data.stats) {
    		var stat_text = ""
    		for (let [key, val] of Object.entries(data.stats)) {
    			let some_text = `${val} ${key}\n`

    			if (key!='Block') {
    				some_text = "+"+some_text
    			}
    			stat_text += some_text
    		}
    		var stats = create_element('div', 'stats', "float: left; clear: both", `${stat_text}`)
    		container.appendChild(stats)

    	}

    	if (data.resists) {
    		var resist_text = ""
    		for (let [key, val] of Object.entries(data.resists)) {
    			resist_text += `+${val} ${key} Resist\n`
    		}
    		var resists = create_element('div', 'resists', "float: left; clear: both", `${resist_text}`)
    		container.appendChild(resists)
    	}


    	if (data.durability) {
    		var durability = create_element('div', 'durability', 'clear: both;', `Durability ${data.durability} / ${data.durability}`)
    		container.appendChild(durability)
    	}

    	if (data.requirements) {
    		var requirements = create_element('div', 'requirements', 'clear: both;')

    		for (let [key, val] of Object.entries(data.requirements)) {
    			if (key == "level") {
    				requirements.appendChild(create_element('div', 'required_level', '', `Required Level: ${val}`))
    			} else if (key == "class") {
    				var class_reqs = create_element('div', 'class_text', '', "Classes: ")

    				let first_class_name = val.shift()
    				let class_span = create_element('span', `${first_class_name.toLowerCase()}`, '', `${first_class_name}`)

    				class_reqs.appendChild(class_span)

    				val.forEach(function(class_name) {
    					class_reqs.appendChild(create_element('span', '', '', ', '))
    					class_reqs.appendChild(create_element('span', `${class_name.toLowerCase()}`, '', `${class_name}`))
    				})

    				val.unshift(first_class_name)

    			requirements.appendChild(class_reqs)
    			} else if (key == "rank") {
    				let rank_req = create_element('div', 'required_rank', '', `Requires ${val}`)
    				requirements.appendChild(rank_req)
    			} else if (key=='profession') {
    				for (let [k, v] of Object.entries(val)) {
    					var req_text = "Requires "+titleCase(k)
    					if (professionTool.PROFS.includes(k.toString())) {
    						req_text += ` (${v})`
    					}
    					let prof_req = create_element('div', 'required_prof', '', req_text)
    					requirements.appendChild(prof_req)
    				}
    			}
    		}
    		requirements.appendChild(create_element('div', '', 'clear: both;'))
    		container.appendChild(requirements)
    	}

    	if (data.equips) {
    		var equips = create_element('div', 'use q2', 'clear: both; font-size: 13px')

    		data.equips.forEach(function(x) {
                var str = (x.startsWith('Equip:')) ? x : `Equip: ${x}`
    			equips.appendChild(create_element('div', 'use q2', 'clear: both; font-size: 13px', str))
    		})

    		container.appendChild(equips)

    	}

    	if (data.procs) {
    		var procs = create_element('div', 'use q2', 'clear: both; font-size: 13px')
    		data.procs.forEach(function(x) {
    			procs.appendChild(create_element('div', 'use q2', 'clear: both; font-size: 13px', `${x}`))
    		})
    		container.appendChild(procs)
    	}


    	if (data.use) {
    		var use = create_element('div', 'use q2', 'clear: both; font-size: 13px', `Use: ${data.use}`)
    		container.appendChild(use)
    	}

    	if (data.description) {
            var descriptionText = ''
            if (data.spent) {
                return
            }
            descriptionText = `"${data.description}"`
    		var description = create_element('div', 'description', 'clear: both;', descriptionText)
    		container.appendChild(description)
    	}

    	if (data.itemset) {
    		var itemset = professionTool.ITEMSETS[data.itemset]
    		var itemset_text = `${itemset.n} (0/${itemset.items.length})`
    		var itemset_elem = create_element('div', 'description', 'clear: both;', `\n${itemset_text}`)
    		itemset.items.forEach(function(name) {
    			itemset_elem.appendChild(create_element('div', 'q0', 'text-indent: 8px;', `${name}\n`))
    		})
    		itemset_elem.appendChild(create_element('div', '', '', `\n`))
    		itemset.bonuses.forEach(function(bonus) {
    			itemset_elem.appendChild(create_element('div', 'q0', '', `${bonus}\n`))
    		})
    		container.appendChild(itemset_elem)
    	}

    	tooltip.dad.appendChild(container)
        if (tooltip.static) {
            tooltip.coords.x = (Math.ceil(tooltip.rectangle.right) - 3) - (tooltip.dad.offsetWidth - container.offsetWidth) + 5
            tooltip.coords.y = Math.ceil(tooltip.rectangle.top) + 7 + window.scrollY - tooltip.dad.offsetHeight - 5
        } else {
            tooltip.coords.x = tooltip.coords.x - (tooltip.dad.offsetWidth - container.offsetWidth) + 5
            tooltip.coords.y = tooltip.coords.y - (tooltip.dad.offsetHeight - 5)

        }
        // tooltip.checkDimensions()
        tooltip.setPosition(tooltip.coords.x, tooltip.coords.y)
    }
}
