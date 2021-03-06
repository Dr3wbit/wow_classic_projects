var cdata = {
	"druid": {
		"balance": {
			"n": "Balance",
			"blueprint": [
                [
                    1,
                    6,
                    1,
                    0
                ],
                [
                    1,
                    4,
                    3,
                    1
                ],
                [
                    1,
                    0,
                    1,
                    1
                ],
                [
                    0,
                    1,
                    1,
                    0
                ],
                [
                    0,
                    3,
                    1,
                    0
                ],
                [
                    0,
                    1,
                    0,
                    0
                ],
                [
                    0,
                    1,
                    0,
                    0
                ]
            ],
			"talents": [
				{
					"n": "Improved Wrath",
					"img": "improved_wrath",
					"max": 5,
					"d": [
                        "Reduces the cast time of your Wrath spell by 0.1 sec.",
                        "Reduces the cast time of your Wrath spell by 0.2 sec.",
                        "Reduces the cast time of your Wrath spell by 0.3 sec.",
                        "Reduces the cast time of your Wrath spell by 0.4 sec.",
                        "Reduces the cast time of your Wrath spell by 0.5 sec."
                    ],
					"x": 0,
					"y": 0
                },
				{
					"n": "Nature's Grasp",
					"img": "natures_grasp",
					"max": 1,
					"d": [
                        "While active, any time an enemy strikes the caster they have a 35% chance to become afflicted by Entangling Roots (Rank 1).  Only useable outdoors.  1 charge.  Lasts 45 sec."
                    ],
					"x": 1,
					"y": 0,
					"unlocks": [
                        "Improved Nature's Grasp"
                    ]
                },
				{
					"n": "Improved Nature's Grasp",
					"img": "improved_natures_grasp",
					"max": 4,
					"d": [
                        "Increases the chance for your Nature's Grasp to entangle an enemy by 15%.",
                        "Increases the chance for your Nature's Grasp to entangle an enemy by 30%.",
                        "Increases the chance for your Nature's Grasp to entangle an enemy by 45%.",
                        "Increases the chance for your Nature's Grasp to entangle an enemy by 60%."
                    ],
					"x": 2,
					"y": 0,
					"locked": "Nature's Grasp"
                },
				{
					"n": "Improved Entangling Roots",
					"img": "improved_entangling_roots",
					"max": 3,
					"d": [
                        "Gives you a 40% chance to avoid interruption caused by damage while casting Entangling Roots.",
                        "Gives you a 70% chance to avoid interruption caused by damage while casting Entangling Roots.",
                        "Gives you a 100% chance to avoid interruption caused by damage while casting Entangling Roots."
                    ],
					"x": 0,
					"y": 1
                },
				{
					"n": "Improved Moonfire",
					"img": "improved_moonfire",
					"max": 5,
					"d": [
                        "Increases the damage and critical strike chance of your Moonfire spell by 2%.",
                        "Increases the damage and critical strike chance of your Moonfire spell by 4%.",
                        "Increases the damage and critical strike chance of your Moonfire spell by 6%.",
                        "Increases the damage and critical strike chance of your Moonfire spell by 8%.",
                        "Increases the damage and critical strike chance of your Moonfire spell by 10%."
                    ],
					"x": 1,
					"y": 1,
					"unlocks": [
                        "Vengeance"
                    ]
                },
				{
					"n": "Natural Weapons",
					"img": "natural_weapons",
					"max": 5,
					"d": [
                        "Increases the damage you deal with physical attacks in all forms by 2%.",
                        "Increases the damage you deal with physical attacks in all forms by 4%.",
                        "Increases the damage you deal with physical attacks in all forms by 6%.",
                        "Increases the damage you deal with physical attacks in all forms by 8%.",
                        "Increases the damage you deal with physical attacks in all forms by 10%."
                    ],
					"x": 2,
					"y": 1,
					"unlocks": [
                        "Omen of Clarity"
                    ]
                },
				{
					"n": "Natural Shapeshifter",
					"img": "natural_shapeshifter",
					"max": 3,
					"d": [
                        "Reduces the mana cost of all shapeshifting by 10%.",
                        "Reduces the mana cost of all shapeshifting by 20%.",
                        "Reduces the mana cost of all shapeshifting by 30%."
                    ],
					"x": 3,
					"y": 1
                },
				{
					"n": "Improved Thorns",
					"img": "improved_thorns",
					"max": 3,
					"d": [
                        "Increases damage caused by your Thorns spell by 25%.",
                        "Increases damage caused by your Thorns spell by 50%.",
                        "Increases damage caused by your Thorns spell by 75%."
                    ],
					"x": 0,
					"y": 2
                },
				{
					"n": "Omen of Clarity",
					"img": "omen_of_clarity",
					"max": 1,
					"d": [
                        "Imbues the Druid with natural energy.  Each of the Druid's melee attacks has a chance of causing the caster to enter a Clearcasting state.  The Clearcasting state reduces the Mana, Rage or Energy cost of your next damage or healing spell or offensive ability by 100%.  Lasts 10 min."
                    ],
					"x": 2,
					"y": 2,
					"locked": "Natural Weapons"
                },
				{
					"n": "Nature's Reach",
					"img": "natures_reach",
					"max": 2,
					"d": [
                        "Increases the range of your Wrath, Entangling Roots, Faerie Fire, Moonfire, Starfire, and Hurricane spells by 10%.",
                        "Increases the range of your Wrath, Entangling Roots, Faerie Fire, Moonfire, Starfire, and Hurricane spells by 20%."
                    ],
					"x": 3,
					"y": 2
                },
				{
					"n": "Vengeance",
					"img": "vengeance",
					"max": 5,
					"d": [
                        "Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 20%.",
                        "Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 40%.",
                        "Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 60%.",
                        "Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 80%.",
                        "Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 100%."
                    ],
					"x": 1,
					"y": 3,
					"locked": "Improved Moonfire"
                },
				{
					"n": "Improved Starfire",
					"img": "improved_starfire",
					"max": 5,
					"d": [
                        "Reduces the cast time of Starfire by 0.1 sec and has a 3% chance to stun the target for 3 sec.",
                        "Reduces the cast time of Starfire by 0.2 sec and has a 6% chance to stun the target for 3 sec.",
                        "Reduces the cast time of Starfire by 0.3 sec and has a 9% chance to stun the target for 3 sec.",
                        "Reduces the cast time of Starfire by 0.4 sec and has a 12% chance to stun the target for 3 sec.",
                        "Reduces the cast time of Starfire by 0.5 sec and has a 15% chance to stun the target for 3 sec."
                    ],
					"x": 2,
					"y": 3
                },
				{
					"n": "Nature's Grace",
					"img": "natures_grace",
					"max": 1,
					"d": [
                        "All spell criticals grace you with a blessing of nature, reducing the casting time of your next spell by 0.5 sec."
                    ],
					"x": 1,
					"y": 4,
					"unlocks": [
                        "Moonfury"
                    ]
                },
				{
					"n": "Moonglow",
					"img": "moonglow",
					"max": 3,
					"d": [
                        "Reduces the Mana cost of your Moonfire, Starfire, Wrath, Healing Touch, Regrowth and Rejuvenation spells by 3%.",
                        "Reduces the Mana cost of your Moonfire, Starfire, Wrath, Healing Touch, Regrowth and Rejuvenation spells by 6%.",
                        "Reduces the Mana cost of your Moonfire, Starfire, Wrath, Healing Touch, Regrowth and Rejuvenation spells by 9%."
                    ],
					"x": 2,
					"y": 4
                },
				{
					"n": "Moonfury",
					"img": "moonfury",
					"max": 5,
					"d": [
                        "Increases the damage done by your Starfire, Moonfire and Wrath spells by 2%.",
                        "Increases the damage done by your Starfire, Moonfire and Wrath spells by 4%.",
                        "Increases the damage done by your Starfire, Moonfire and Wrath spells by 6%.",
                        "Increases the damage done by your Starfire, Moonfire and Wrath spells by 8%.",
                        "Increases the damage done by your Starfire, Moonfire and Wrath spells by 10%."
                    ],
					"x": 1,
					"y": 5,
					"locked": "Nature's Grace"
                },
				{
					"n": "Moonkin Form",
					"img": "moonkin_form",
					"max": 1,
					"d": [
                        "Transforms the Druid into Moonkin Form.  While in this form the armor contribution from items is increased by 360% and all party members within 30 yards have their spell critical chance increased by 3%.  The Moonkin can only cast Balance spells while shapeshifted.\n\nThe act of shapeshifting frees the caster of Polymorph and Movement Impairing effects."
                    ],
					"x": 1,
					"y": 6
                }
            ]
		},
		"feral_combat": {
			"n": "Feral Combat",
			"blueprint": [
                [
                    0,
                    1,
                    1,
                    0
                ],
                [
                    1,
                    1,
                    1,
                    0
                ],
                [
                    1,
                    1,
                    [
                        3,
                        7
                    ],
                    0
                ],
                [
                    1,
                    4,
                    1,
                    1
                ],
                [
                    1,
                    0,
                    1,
                    0
                ],
                [
                    0,
                    1,
                    0,
                    0
                ],
                [
                    0,
                    1,
                    0,
                    0
                ]
            ],
			"talents": [
				{
					"n": "Ferocity",
					"img": "ferocity",
					"max": 5,
					"d": [
                        "Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 1 Rage or Energy.",
                        "Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 2 Rage or Energy.",
                        "Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 3 Rage or Energy.",
                        "Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 4 Rage or Energy.",
                        "Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 5 Rage or Energy."
                    ],
					"x": 1,
					"y": 0
                },
				{
					"n": "Feral Aggression",
					"img": "feral_aggression",
					"max": 5,
					"d": [
                        "Increases the Attack Power reduction of your Demoralizing Roar by 8% and the damage caused by your Ferocious Bite by 3%.",
                        "Increases the Attack Power reduction of your Demoralizing Roar by 16% and the damage caused by your Ferocious Bite by 6%.",
                        "Increases the Attack Power reduction of your Demoralizing Roar by 24% and the damage caused by your Ferocious Bite by 9%.",
                        "Increases the Attack Power reduction of your Demoralizing Roar by 32% and the damage caused by your Ferocious Bite by 12%.",
                        "Increases the Attack Power reduction of your Demoralizing Roar by 40% and the damage caused by your Ferocious Bite by 15%."
                    ],
					"x": 2,
					"y": 0
                },
				{
					"n": "Feral Instinct",
					"img": "feral_instinct",
					"max": 5,
					"d": [
                        "Increases threat caused in Bear and Dire Bear Form by 3% and reduces the chance enemies have to detect you while Prowling.",
                        "Increases threat caused in Bear and Dire Bear Form by 6% and reduces the chance enemies have to detect you while Prowling.",
                        "Increases threat caused in Bear and Dire Bear Form by 9% and reduces the chance enemies have to detect you while Prowling.",
                        "Increases threat caused in Bear and Dire Bear Form by 12% and reduces the chance enemies have to detect you while Prowling.",
                        "Increases threat caused in Bear and Dire Bear Form by 15% and reduces the chance enemies have to detect you while Prowling."
                    ],
					"x": 0,
					"y": 1
                },
				{
					"n": "Brutal Impact",
					"img": "brutal_impact",
					"max": 2,
					"d": [
                        "Increases the stun duration of your Bash and Pounce abilities by 0.5 sec.",
                        "Increases the stun duration of your Bash and Pounce abilities by 1 sec."
                    ],
					"x": 1,
					"y": 1
                },
				{
					"n": "Thick Hide",
					"img": "thick_hide",
					"max": 5,
					"d": [
                        "Increases your Armor contribution from items by 2%.",
                        "Increases your Armor contribution from items by 4%.",
                        "Increases your Armor contribution from items by 6%.",
                        "Increases your Armor contribution from items by 8%.",
                        "Increases your Armor contribution from items by 10%."
                    ],
					"x": 2,
					"y": 1
                },
				{
					"n": "Feline Swiftness",
					"img": "feline_swiftness",
					"max": 2,
					"d": [
                        "Increases your movement speed by 15% while outdoors in Cat Form and increases your chance to dodge while in Cat Form by 15%.",
                        "Increases your movement speed by 30% while outdoors in Cat Form and increases your chance to dodge while in Cat Form by 30%."
                    ],
					"x": 0,
					"y": 2
                },
				{
					"n": "Feral Charge",
					"img": "feral_charge",
					"max": 1,
					"d": [
                        "Causes you to charge an enemy, immobilizing and interrupting any spell being cast for 4 sec."
                    ],
					"x": 1,
					"y": 2
                },
				{
					"n": "Sharpened Claws",
					"img": "sharpened_claws",
					"max": 3,
					"d": [
                        "Increases your critical strike chance while in Bear, Dire Bear or Cat Form by 2%.",
                        "Increases your critical strike chance while in Bear, Dire Bear or Cat Form by 4%.",
                        "Increases your critical strike chance while in Bear, Dire Bear or Cat Form by 6%."
                    ],
					"x": 2,
					"y": 2,
					"unlocks": [
                        "Blood Frenzy",
                        "Primal Fury"
                    ]
                },
				{
					"n": "Improved Shred",
					"img": "improved_shred",
					"max": 2,
					"d": [
                        "Reduces the Energy cost of your Shred ability by 6.",
                        "Reduces the Energy cost of your Shred ability by 6."
                    ],
					"x": 0,
					"y": 3
                },
				{
					"n": "Predatory Strikes",
					"img": "predatory_strikes",
					"max": 3,
					"d": [
                        "Increases your melee attack power in Cat, Bear and Dire Bear Forms by 50% of your level.",
                        "Increases your melee attack power in Cat, Bear and Dire Bear Forms by 100% of your level.",
                        "Increases your melee attack power in Cat, Bear and Dire Bear Forms by 150% of your level."
                    ],
					"x": 1,
					"y": 3,
					"unlocks": [
                        "Heart of the Wild"
                    ]
                },
				{
					"n": "Blood Frenzy",
					"img": "blood_frenzy",
					"max": 2,
					"d": [
                        "Your critical strikes from Cat Form abilities that add combo points  have a 50% chance to add an additional combo point.",
                        "Your critical strikes from Cat Form abilities that add combo points  have a 100% chance to add an additional combo point."
                    ],
					"x": 2,
					"y": 3,
					"locked": "Sharpened Claws"
                },
				{
					"n": "Primal Fury",
					"img": "primal_fury",
					"max": 2,
					"d": [
                        "Gives you a 50% chance to gain an additional 5 Rage anytime you get a critical strike while in Bear and Dire Bear Form.",
                        "Gives you a 100% chance to gain an additional 5 Rage anytime you get a critical strike while in Bear and Dire Bear Form."
                    ],
					"x": 3,
					"y": 3,
					"locked": "Sharpened Claws"
                },
				{
					"n": "Savage Fury",
					"img": "savage_fury",
					"max": 2,
					"d": [
                        "Increases the damage caused by your Claw, Rake, Maul and Swipe abilities by 10%.",
                        "Increases the damage caused by your Claw, Rake, Maul and Swipe abilities by 20%."
                    ],
					"x": 0,
					"y": 4
                },
				{
					"n": "Faerie Fire (Feral)",
					"img": "faerie_fire_feral",
					"max": 1,
					"d": [
                        "Decrease the armor of the target by 175 for 40 sec.  While affected, the target cannot stealth or turn invisible."
                    ],
					"x": 2,
					"y": 4
                },
				{
					"n": "Heart of the Wild",
					"img": "heart_of_the_wild",
					"max": 5,
					"d": [
                        "Increases your Intellect by 4%.  In addition, while in Bear or Dire Bear Form your Stamina is increased by 4% and while in Cat Form your Strength is increased by 4%.",
                        "Increases your Intellect by 8%.  In addition, while in Bear or Dire Bear Form your Stamina is increased by 8% and while in Cat Form your Strength is increased by 8%.",
                        "Increases your Intellect by 12%.  In addition, while in Bear or Dire Bear Form your Stamina is increased by 12% and while in Cat Form your Strength is increased by 12%.",
                        "Increases your Intellect by 16%.  In addition, while in Bear or Dire Bear Form your Stamina is increased by 16% and while in Cat Form your Strength is increased by 16%.",
                        "Increases your Intellect by 20%.  In addition, while in Bear or Dire Bear Form your Stamina is increased by 20% and while in Cat Form your Strength is increased by 20%."
                    ],
					"x": 1,
					"y": 5,
					"locked": "Predatory Strikes"
                },
				{
					"n": "Leader of the Pack",
					"img": "leader_of_the_pack",
					"max": 1,
					"d": [
                        "While in Cat, Bear or Dire Bear Form, the Leader of the Pack increases ranged and melee critical chance of all party members within 45 yards by 3%."
                    ],
					"x": 1,
					"y": 6
                }
            ]
		},
		"restoration": {
			"n": "Restoration",
			"blueprint": [
                [
                    0,
                    1,
                    1,
                    0
                ],
                [
                    5,
                    1,
                    1,
                    0
                ],
                [
                    0,
                    1,
                    4,
                    1
                ],
                [
                    0,
                    5,
                    0,
                    1
                ],
                [
                    1,
                    0,
                    1,
                    1
                ],
                [
                    0,
                    0,
                    1,
                    0
                ],
                [
                    0,
                    1,
                    0,
                    0
                ]
            ],
			"talents": [
				{
					"n": "Improved Mark of the Wild",
					"img": "improved_mark_of_the_wild",
					"max": 5,
					"d": [
                        "Increases the effects of your Mark of the Wild and Gift of the Wild spells by 7%.",
                        "Increases the effects of your Mark of the Wild and Gift of the Wild spells by 14%.",
                        "Increases the effects of your Mark of the Wild and Gift of the Wild spells by 21%.",
                        "Increases the effects of your Mark of the Wild and Gift of the Wild spells by 28%.",
                        "Increases the effects of your Mark of the Wild and Gift of the Wild spells by 35%."
                    ],
					"x": 1,
					"y": 0
                },
				{
					"n": "Furor",
					"img": "furor",
					"max": 5,
					"d": [
                        "Gives you 20% chance to gain 10 Rage when you shapeshift into Bear and Dire Bear Form or 40 Energy when you shapeshift into Cat Form.",
                        "Gives you 40% chance to gain 10 Rage when you shapeshift into Bear and Dire Bear Form or 40 Energy when you shapeshift into Cat Form.",
                        "Gives you 60% chance to gain 10 Rage when you shapeshift into Bear and Dire Bear Form or 40 Energy when you shapeshift into Cat Form.",
                        "Gives you 80% chance to gain 10 Rage when you shapeshift into Bear and Dire Bear Form or 40 Energy when you shapeshift into Cat Form.",
                        "Gives you 100% chance to gain 10 Rage when you shapeshift into Bear and Dire Bear Form or 40 Energy when you shapeshift into Cat Form."
                    ],
					"x": 2,
					"y": 0
                },
				{
					"n": "Improved Healing Touch",
					"img": "improved_healing_touch",
					"max": 5,
					"d": [
                        "Reduces the cast time of your Healing Touch spell by 0.1 sec.",
                        "Reduces the cast time of your Healing Touch spell by 0.2 sec.",
                        "Reduces the cast time of your Healing Touch spell by 0.3 sec.",
                        "Reduces the cast time of your Healing Touch spell by 0.4 sec.",
                        "Reduces the cast time of your Healing Touch spell by 0.5 sec."
                    ],
					"x": 0,
					"y": 1,
					"unlocks": [
                        "Nature's Swiftness"
                    ]
                },
				{
					"n": "Nature's Focus",
					"img": "natures_focus",
					"max": 5,
					"d": [
                        "Gives you a 14% chance to avoid interruption caused by damage while casting the Healing Touch, Regrowth and Tranquility spells.",
                        "Gives you a 28% chance to avoid interruption caused by damage while casting the Healing Touch, Regrowth and Tranquility spells.",
                        "Gives you a 42% chance to avoid interruption caused by damage while casting the Healing Touch, Regrowth and Tranquility spells.",
                        "Gives you a 56% chance to avoid interruption caused by damage while casting the Healing Touch, Regrowth and Tranquility spells.",
                        "Gives you a 70% chance to avoid interruption caused by damage while casting the Healing Touch, Regrowth and Tranquility spells."
                    ],
					"x": 1,
					"y": 1
                },
				{
					"n": "Improved Enrage",
					"img": "improved_enrage",
					"max": 2,
					"d": [
                        "The Enrage ability now instantly generates 5 Rage.",
                        "The Enrage ability now instantly generates 10 Rage."
                    ],
					"x": 2,
					"y": 1
                },
				{
					"n": "Reflection",
					"img": "reflection",
					"max": 3,
					"d": [
                        "Allows 5% of your Mana regeneration to continue while casting.",
                        "Allows 10% of your Mana regeneration to continue while casting.",
                        "Allows 15% of your Mana regeneration to continue while casting."
                    ],
					"x": 1,
					"y": 2
                },
				{
					"n": "Insect Swarm",
					"img": "insect_swarm",
					"max": 1,
					"d": [
                        "The enemy target is swarmed by insects, decreasing their chance to hit by 2% and causing 66 Nature damage over 12 sec."
                    ],
					"x": 2,
					"y": 2,
					"unlocks": [
                        "Gift of Nature"
                    ]
                },
				{
					"n": "Subtlety",
					"img": "subtlety",
					"max": 5,
					"d": [
                        "Reduces the threat generated by your Healing spells by 4%.",
                        "Reduces the threat generated by your Healing spells by 8%.",
                        "Reduces the threat generated by your Healing spells by 12%.",
                        "Reduces the threat generated by your Healing spells by 16%.",
                        "Reduces the threat generated by your Healing spells by 20%."
                    ],
					"x": 3,
					"y": 2
                },
				{
					"n": "Tranquil Spirit",
					"img": "tranquil_spirit",
					"max": 5,
					"d": [
                        "Reduces the mana cost of your Healing Touch and Tranquility spells by 2%.",
                        "Reduces the mana cost of your Healing Touch and Tranquility spells by 4%.",
                        "Reduces the mana cost of your Healing Touch and Tranquility spells by 6%.",
                        "Reduces the mana cost of your Healing Touch and Tranquility spells by 8%.",
                        "Reduces the mana cost of your Healing Touch and Tranquility spells by 10%."
                    ],
					"x": 1,
					"y": 3,
					"unlocks": [
                        "Swiftmend"
                    ]
                },
				{
					"n": "Improved Rejuvenation",
					"img": "improved_rejuvenation",
					"max": 3,
					"d": [
                        "Increases the effect of your Rejuvenation spell by 5%.",
                        "Increases the effect of your Rejuvenation spell by 10%.",
                        "Increases the effect of your Rejuvenation spell by 15%."
                    ],
					"x": 3,
					"y": 3
                },
				{
					"n": "Nature's Swiftness",
					"img": "natures_swiftness",
					"max": 1,
					"d": [
                        "When activated, your next Nature spell becomes an instant cast spell."
                    ],
					"x": 0,
					"y": 4,
					"locked": "Improved Healing Touch"
                },
				{
					"n": "Gift of Nature",
					"img": "gift_of_nature",
					"max": 5,
					"d": [
                        "Increases the effect of all healing spells by 2%.",
                        "Increases the effect of all healing spells by 4%.",
                        "Increases the effect of all healing spells by 6%.",
                        "Increases the effect of all healing spells by 8%.",
                        "Increases the effect of all healing spells by 10%."
                    ],
					"x": 2,
					"y": 4,
					"locked": "Insect Swarm"
                },
				{
					"n": "Improved Tranquility",
					"img": "improved_tranquility",
					"max": 2,
					"d": [
                        "Reduces threat caused by Tranquility by 50%.",
                        "Reduces threat caused by Tranquility by 100%."
                    ],
					"x": 3,
					"y": 4
                },
				{
					"n": "Improved Regrowth",
					"img": "improved_regrowth",
					"max": 5,
					"d": [
                        "Increases the critical effect chance of your Regrowth spell by 10%.",
                        "Increases the critical effect chance of your Regrowth spell by 20%.",
                        "Increases the critical effect chance of your Regrowth spell by 30%.",
                        "Increases the critical effect chance of your Regrowth spell by 40%.",
                        "Increases the critical effect chance of your Regrowth spell by 50%."
                    ],
					"x": 2,
					"y": 5
                },
				{
					"n": "Swiftmend",
					"img": "swiftmend",
					"max": 1,
					"d": [
                        "Consumes a Rejuvenation or Regrowth effect on a friendly target to instantly heal them an amount equal to 12 sec. of Rejuvenation or 18 sec. of Regrowth."
                    ],
					"x": 1,
					"y": 6,
					"locked": "Tranquil Spirit"
                }
            ]
		}
	}
}
