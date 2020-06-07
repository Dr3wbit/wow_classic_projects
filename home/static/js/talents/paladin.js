var classData = {
    "paladin": {
        "holy": {
            "n": "Holy",
            "blueprint": [
                [
                    0,
                    1,
                    1,
                    0
                ],
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
                    1
                ],
                [
                    0,
                    3,
                    1,
                    0
                ],
                [
                    0,
                    4,
                    1,
                    0
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
                    "n": "Divine Strength",
                    "img": "divine_strength",
                    "max": 5,
                    "d": [
                        "Increases your Strength by 2%.",
                        "Increases your Strength by 4%.",
                        "Increases your Strength by 6%.",
                        "Increases your Strength by 8%.",
                        "Increases your Strength by 10%."
                    ],
                    "x": 1,
                    "y": 0
                },
                {
                    "n": "Divine Intellect",
                    "img": "divine_intellect",
                    "max": 5,
                    "d": [
                        "Increases your total Intellect by 2%.",
                        "Increases your total Intellect by 4%.",
                        "Increases your total Intellect by 6%.",
                        "Increases your total Intellect by 8%.",
                        "Increases your total Intellect by 10%."
                    ],
                    "x": 2,
                    "y": 0
                },
                {
                    "n": "Spiritual Focus",
                    "img": "spiritual_focus",
                    "max": 5,
                    "d": [
                        "Gives your Flash of Light and Holy Light spells a 14% chance to not lose casting time when you take damage.",
                        "Gives your Flash of Light and Holy Light spells a 28% chance to not lose casting time when you take damage.",
                        "Gives your Flash of Light and Holy Light spells a 42% chance to not lose casting time when you take damage.",
                        "Gives your Flash of Light and Holy Light spells a 56% chance to not lose casting time when you take damage.",
                        "Gives your Flash of Light and Holy Light spells a 70% chance to not lose casting time when you take damage."
                    ],
                    "x": 1,
                    "y": 1
                },
                {
                    "n": "Improved Seal of Righteousness",
                    "img": "improved_seal_of_righteousness",
                    "max": 5,
                    "d": [
                        "Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 3%.",
                        "Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 6%.",
                        "Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 9%.",
                        "Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 12%.",
                        "Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 15%."
                    ],
                    "x": 2,
                    "y": 1
                },
                {
                    "n": "Healing Light",
                    "img": "healing_light",
                    "max": 3,
                    "d": [
                        "Increases the amount healed by your Holy Light and Flash of Light spells by 4%.",
                        "Increases the amount healed by your Holy Light and Flash of Light spells by 8%.",
                        "Increases the amount healed by your Holy Light and Flash of Light spells by 12%."
                    ],
                    "x": 0,
                    "y": 2
                },
                {
                    "n": "Consecration",
                    "img": "consecration",
                    "max": 1,
                    "d": [
                        "Consecrates the land beneath Paladin, doing 64 Holy damage over 8 sec to enemies who enter the area."
                    ],
                    "x": 1,
                    "y": 2
                },
                {
                    "n": "Improved Lay on Hands",
                    "img": "improved_lay_on_hands",
                    "max": 2,
                    "d": [
                        "Gives the target of your Lay on Hands spell a 15% bonus to their armor value from items for 2 min.  In addition, the cooldown for your Lay on Hands spell is reduced by 10 min.",
                        "Gives the target of your Lay on Hands spell a 30% bonus to their armor value from items for 2 min.  In addition, the cooldown for your Lay on Hands spell is reduced by 20 min."
                    ],
                    "x": 2,
                    "y": 2
                },
                {
                    "n": "Unyielding Faith",
                    "img": "unyielding_faith",
                    "max": 2,
                    "d": [
                        "Increases your chance to resist Fear and Disorient effects by an additional 5%.",
                        "Increases your chance to resist Fear and Disorient effects by an additional 10%."
                    ],
                    "x": 3,
                    "y": 2
                },
                {
                    "n": "Illumination",
                    "img": "illumination",
                    "max": 5,
                    "d": [
                        "After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 20% chance to gain Mana equal to the base cost of the spell.",
                        "After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 40% chance to gain Mana equal to the base cost of the spell.",
                        "After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 60% chance to gain Mana equal to the base cost of the spell.",
                        "After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 80% chance to gain Mana equal to the base cost of the spell.",
                        "After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 100% chance to gain Mana equal to the base cost of the spell."
                    ],
                    "x": 1,
                    "y": 3,
                    "unlocks": [
                        "Divine Favor"
                    ]
                },
                {
                    "n": "Improved Blessing of Wisdom",
                    "img": "improved_blessing_of_wisdom",
                    "max": 2,
                    "d": [
                        "Increases the effect of your Blessing of Wisdom spell by 10%.",
                        "Increases the effect of your Blessing of Wisdom spell by 20%."
                    ],
                    "x": 2,
                    "y": 3
                },
                {
                    "n": "Divine Favor",
                    "img": "divine_favor",
                    "max": 1,
                    "d": [
                        "When activated, gives your next Flash of Light, Holy Light, or Holy Shock spell a 100% critical effect chance."
                    ],
                    "x": 1,
                    "y": 4,
                    "locked": "Illumination",
                    "unlocks": [
                        "Holy Shock"
                    ]
                },
                {
                    "n": "Lasting Judgement",
                    "img": "lasting_judgement",
                    "max": 3,
                    "d": [
                        "Increases the duration of your Judgement of Light and Judgement of Wisdom by 10 sec.",
                        "Increases the duration of your Judgement of Light and Judgement of Wisdom by 20 sec.",
                        "Increases the duration of your Judgement of Light and Judgement of Wisdom by 30 sec."
                    ],
                    "x": 2,
                    "y": 4
                },
                {
                    "n": "Holy Power",
                    "img": "holy_power",
                    "max": 5,
                    "d": [
                        "Increases the critical effect chance of your Holy spells by 1%.",
                        "Increases the critical effect chance of your Holy spells by 2%.",
                        "Increases the critical effect chance of your Holy spells by 3%.",
                        "Increases the critical effect chance of your Holy spells by 4%.",
                        "Increases the critical effect chance of your Holy spells by 5%."
                    ],
                    "x": 2,
                    "y": 5
                },
                {
                    "n": "Holy Shock",
                    "img": "holy_shock",
                    "max": 1,
                    "d": [
                        "Blasts the target with Holy energy, causing 204 to 221 Holy damage to an enemy, or 204 to 221 healing to an ally."
                    ],
                    "x": 1,
                    "y": 6,
                    "locked": "Divine Favor"
                }
            ]
        },
        "protection": {
            "n": "Protection",
            "blueprint": [
                [
                    0,
                    1,
                    4,
                    0
                ],
                [
                    1,
                    1,
                    0,
                    1
                ],
                [
                    1,
                    1,
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
                    4,
                    1,
                    0
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
                    "n": "Improved Devotion Aura",
                    "img": "improved_devotion_aura",
                    "max": 5,
                    "d": [
                        "Increases the armor bonus of your Devotion Aura by 5%.",
                        "Increases the armor bonus of your Devotion Aura by 10%.",
                        "Increases the armor bonus of your Devotion Aura by 15%.",
                        "Increases the armor bonus of your Devotion Aura by 20%.",
                        "Increases the armor bonus of your Devotion Aura by 25%."
                    ],
                    "x": 1,
                    "y": 0
                },
                {
                    "n": "Redoubt",
                    "img": "redoubt",
                    "max": 5,
                    "d": [
                        "Increases your chance to block attacks with your shield by 6% after being the victim of a critical strike. Lasts 10 sec or 5 blocks.",
                        "Increases your chance to block attacks with your shield by 12% after being the victim of a critical strike. Lasts 10 sec or 5 blocks.",
                        "Increases your chance to block attacks with your shield by 18% after being the victim of a critical strike. Lasts 10 sec or 5 blocks.",
                        "Increases your chance to block attacks with your shield by 24% after being the victim of a critical strike. Lasts 10 sec or 5 blocks.",
                        "Increases your chance to block attacks with your shield by 30% after being the victim of a critical strike. Lasts 10 sec or 5 blocks."
                    ],
                    "x": 2,
                    "y": 0,
                    "unlocks": [
                        "Shield Specialization"
                    ]
                },
                {
                    "n": "Precision",
                    "img": "precision",
                    "max": 3,
                    "d": [
                        "Increases your chance to hit with melee weapons by 1%.",
                        "Increases your chance to hit with melee weapons by 2%.",
                        "Increases your chance to hit with melee weapons by 3%."
                    ],
                    "x": 0,
                    "y": 1
                },
                {
                    "n": "Guardian's Favor",
                    "img": "guardians_favor",
                    "max": 2,
                    "d": [
                        "Reduces the cooldown of your Blessing of Protection by 60 sec and increases the duration of your Blessing of Freedom by 3 sec.",
                        "Reduces the cooldown of your Blessing of Protection by 120 sec and increases the duration of your Blessing of Freedom by 6 sec."
                    ],
                    "x": 1,
                    "y": 1
                },
                {
                    "n": "Toughness",
                    "img": "toughness",
                    "max": 5,
                    "d": [
                        "Increases your armor value from items by 2%.",
                        "Increases your armor value from items by 4%.",
                        "Increases your armor value from items by 6%.",
                        "Increases your armor value from items by 8%.",
                        "Increases your armor value from items by 10%."
                    ],
                    "x": 3,
                    "y": 1
                },
                {
                    "n": "Blessing of Kings",
                    "img": "blessing_of_kings",
                    "max": 1,
                    "d": [
                        "Places a Blessing on the friendly target, increasing total stats by 10% for 5 min.  Players may only have one Blessing on them per Paladin at any one time."
                    ],
                    "x": 0,
                    "y": 2
                },
                {
                    "n": "Improved Righteous Fury",
                    "img": "improved_righteous_fury",
                    "max": 3,
                    "d": [
                        "Increases the amount of threat generated by your Righteous Fury spell by 17%.",
                        "Increases the amount of threat generated by your Righteous Fury spell by 34%.",
                        "Increases the amount of threat generated by your Righteous Fury spell by 51%."
                    ],
                    "x": 1,
                    "y": 2
                },
                {
                    "n": "Shield Specialization",
                    "img": "shield_specialization",
                    "max": 3,
                    "d": [
                        "Increases the amount of damage absorbed by your shield by 10%.",
                        "Increases the amount of damage absorbed by your shield by 20%.",
                        "Increases the amount of damage absorbed by your shield by 30%."
                    ],
                    "x": 2,
                    "y": 2,
                    "locked": "Redoubt"
                },
                {
                    "n": "Anticipation",
                    "img": "anticipation",
                    "max": 5,
                    "d": [
                        "Increases your Defense skill by 2.",
                        "Increases your Defense skill by 4.",
                        "Increases your Defense skill by 6.",
                        "Increases your Defense skill by 8.",
                        "Increases your Defense skill by 10."
                    ],
                    "x": 3,
                    "y": 2
                },
                {
                    "n": "Improved Hammer of Justice",
                    "img": "improved_hammer_of_justice",
                    "max": 3,
                    "d": [
                        "Decreases the cooldown of your Hammer of Justice spell by 5 sec.",
                        "Decreases the cooldown of your Hammer of Justice spell by 10 sec.",
                        "Decreases the cooldown of your Hammer of Justice spell by 15 sec."
                    ],
                    "x": 1,
                    "y": 3
                },
                {
                    "n": "Improved Concentration Aura",
                    "img": "improved_concentration_aura",
                    "max": 3,
                    "d": [
                        "Increases the effect of your Concentration Aura by an additional 5% and gives all group members affected by the aura an additional 5% chance to resist Silence and Interrupt effects.",
                        "Increases the effect of your Concentration Aura by an additional 10% and gives all group members affected by the aura an additional 10% chance to resist Silence and Interrupt effects.",
                        "Increases the effect of your Concentration Aura by an additional 15% and gives all group members affected by the aura an additional 15% chance to resist Silence and Interrupt effects."
                    ],
                    "x": 2,
                    "y": 3
                },
                {
                    "n": "Blessing of Sanctuary",
                    "img": "blessing_of_sanctuary",
                    "max": 1,
                    "d": [
                        "Places a Blessing on the friendly target, reducing damage dealt from all sources by up to 10 for 5 min.  In addition, when the target blocks a melee attack the attacker will take 14 Holy damage.  Players may only have one Blessing on them per Paladin at any one time."
                    ],
                    "x": 1,
                    "y": 4,
                    "unlocks": [
                        "Holy Shield"
                    ]
                },
                {
                    "n": "Reckoning",
                    "img": "reckoning",
                    "max": 5,
                    "d": [
                        "Gives you a 20% chance to gain an extra attack after being the victim of a critical strike.",
                        "Gives you a 40% chance to gain an extra attack after being the victim of a critical strike.",
                        "Gives you a 60% chance to gain an extra attack after being the victim of a critical strike.",
                        "Gives you a 80% chance to gain an extra attack after being the victim of a critical strike.",
                        "Gives you a 100% chance to gain an extra attack after being the victim of a critical strike."
                    ],
                    "x": 2,
                    "y": 4
                },
                {
                    "n": "One-Handed Weapon Specialization",
                    "img": "one_handed_weapon_specialization",
                    "max": 5,
                    "d": [
                        "Increases the damage you deal with one-handed melee weapons by 2%.",
                        "Increases the damage you deal with one-handed melee weapons by 4%.",
                        "Increases the damage you deal with one-handed melee weapons by 6%.",
                        "Increases the damage you deal with one-handed melee weapons by 8%.",
                        "Increases the damage you deal with one-handed melee weapons by 10%."
                    ],
                    "x": 2,
                    "y": 5
                },
                {
                    "n": "Holy Shield",
                    "img": "holy_shield",
                    "max": 1,
                    "d": [
                        "Increases chance to block by 30% for 10 sec, and deals 65 Holy damage for each attack blocked while active.  Damage caused by Holy Shield causes 20% additional threat.  Each block expends a charge.  4 charges."
                    ],
                    "x": 1,
                    "y": 6,
                    "locked": "Blessing of Sanctuary"
                }
            ]
        },
        "retribution": {
            "n": "Retribution",
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
                    5,
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
                    "n": "Improved Blessing of Might",
                    "img": "improved_blessing_of_might",
                    "max": 5,
                    "d": [
                        "Increases the melee attack power bonus of your Blessing of Might by 4%.",
                        "Increases the melee attack power bonus of your Blessing of Might by 8%.",
                        "Increases the melee attack power bonus of your Blessing of Might by 12%.",
                        "Increases the melee attack power bonus of your Blessing of Might by 16%.",
                        "Increases the melee attack power bonus of your Blessing of Might by 20%."
                    ],
                    "x": 1,
                    "y": 0
                },
                {
                    "n": "Benediction",
                    "img": "benediction",
                    "max": 5,
                    "d": [
                        "Reduces the Mana cost of your Judgement and Seal spells by 3%.",
                        "Reduces the Mana cost of your Judgement and Seal spells by 6%.",
                        "Reduces the Mana cost of your Judgement and Seal spells by 9%.",
                        "Reduces the Mana cost of your Judgement and Seal spells by 12%.",
                        "Reduces the Mana cost of your Judgement and Seal spells by 15%."
                    ],
                    "x": 2,
                    "y": 0
                },
                {
                    "n": "Improved Judgement",
                    "img": "improved_judgement",
                    "max": 2,
                    "d": [
                        "Decreases the cooldown of your Judgement spell by 1 sec.",
                        "Decreases the cooldown of your Judgement spell by 2 sec."
                    ],
                    "x": 0,
                    "y": 1
                },
                {
                    "n": "Improved Seal of the Crusader",
                    "img": "improved_seal_of_the_crusader",
                    "max": 3,
                    "d": [
                        "Increases the melee attack power bonus of your Seal of the Crusader and the Holy damage increase of your Judgement of the Crusader by 5%.",
                        "Increases the melee attack power bonus of your Seal of the Crusader and the Holy damage increase of your Judgement of the Crusader by 10%.",
                        "Increases the melee attack power bonus of your Seal of the Crusader and the Holy damage increase of your Judgement of the Crusader by 15%."
                    ],
                    "x": 1,
                    "y": 1
                },
                {
                    "n": "Deflection",
                    "img": "deflection",
                    "max": 5,
                    "d": [
                        "Increases your Parry chance by 1%.",
                        "Increases your Parry chance by 2%.",
                        "Increases your Parry chance by 3%.",
                        "Increases your Parry chance by 4%.",
                        "Increases your Parry chance by 5%."
                    ],
                    "x": 2,
                    "y": 1
                },
                {
                    "n": "Vindication",
                    "img": "vindication",
                    "max": 3,
                    "d": [
                        "Gives the Paladin's damaging melee attacks a chance to reduce the target's Strength and Agility by 5% for 10 sec.",
                        "Gives the Paladin's damaging melee attacks a chance to reduce the target's Strength and Agility by 10% for 10 sec.",
                        "Gives the Paladin's damaging melee attacks a chance to reduce the target's Strength and Agility by 15% for 10 sec."
                    ],
                    "x": 0,
                    "y": 2
                },
                {
                    "n": "Conviction",
                    "img": "conviction",
                    "max": 5,
                    "d": [
                        "Increases your chance to get a critical strike with melee weapons by 1%.",
                        "Increases your chance to get a critical strike with melee weapons by 2%.",
                        "Increases your chance to get a critical strike with melee weapons by 3%.",
                        "Increases your chance to get a critical strike with melee weapons by 4%.",
                        "Increases your chance to get a critical strike with melee weapons by 5%."
                    ],
                    "x": 1,
                    "y": 2,
                    "unlocks": [
                        "Vengeance"
                    ]
                },
                {
                    "n": "Seal of Command",
                    "img": "seal_of_command",
                    "max": 1,
                    "d": [
                        "Gives the Paladin a chance to deal additional Holy damage equal to 70% of normal weapon damage.  Only one Seal can be active on the Paladin at any one time.  Lasts 30 sec.\n\nUnleashing this Seal's energy will judge an enemy, instantly causing 46.5 to 55.5 Holy damage, 93 to 102 if the target is stunned or incapacitated."
                    ],
                    "x": 2,
                    "y": 2
                },
                {
                    "n": "Pursuit of Justice",
                    "img": "pursuit_of_justice",
                    "max": 2,
                    "d": [
                        "Increases movement and mounted movement speed by 4%.  This does not stack with other movement speed increasing effects.",
                        "Increases movement and mounted movement speed by 8%.  This does not stack with other movement speed increasing effects."
                    ],
                    "x": 3,
                    "y": 2
                },
                {
                    "n": "Eye for an Eye",
                    "img": "eye_for_an_eye",
                    "max": 2,
                    "d": [
                        "All spell criticals against you cause 15% of the damage taken to the caster as well.  The damage caused by Eye for an Eye will not exceed 50% of the Paladin's total health.",
                        "All spell criticals against you cause 30% of the damage taken to the caster as well.  The damage caused by Eye for an Eye will not exceed 50% of the Paladin's total health."
                    ],
                    "x": 0,
                    "y": 3
                },
                {
                    "n": "Improved Retribution Aura",
                    "img": "improved_retribution_aura",
                    "max": 2,
                    "d": [
                        "Increases the damage done by your Retribution Aura by 25%.",
                        "Increases the damage done by your Retribution Aura by 50%."
                    ],
                    "x": 2,
                    "y": 3
                },
                {
                    "n": "Two-Handed Weapon Specialization",
                    "img": "two_handed_weapon_specialization",
                    "max": 3,
                    "d": [
                        "Increases the damage you deal with two-handed melee weapons by 2%.",
                        "Increases the damage you deal with two-handed melee weapons by 4%.",
                        "Increases the damage you deal with two-handed melee weapons by 6%."
                    ],
                    "x": 0,
                    "y": 4
                },
                {
                    "n": "Sanctity Aura",
                    "img": "sanctity_aura",
                    "max": 1,
                    "d": [
                        "Increases Holy damage done by party members within 30 yards by 10%.  Players may only have one Aura on them per Paladin at any one time."
                    ],
                    "x": 2,
                    "y": 4
                },
                {
                    "n": "Vengeance",
                    "img": "vengeance",
                    "max": 5,
                    "d": [
                        "Gives you a 3% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.",
                        "Gives you a 6% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.",
                        "Gives you a 9% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.",
                        "Gives you a 12% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.",
                        "Gives you a 15% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability."
                    ],
                    "x": 1,
                    "y": 5,
                    "locked": "Conviction"
                },
                {
                    "n": "Repentance",
                    "img": "repentance",
                    "max": 1,
                    "d": [
                        "Puts the enemy target in a state of meditation, incapacitating them for up to 6 sec.  Any damage caused will awaken the target.  Only works against Humanoids."
                    ],
                    "x": 1,
                    "y": 6
                }
            ]
        }
    }
}
