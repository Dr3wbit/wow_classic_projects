
const consumes = {

    all: {

        arcane_bomb: {
            name: 'Arcane Bomb',
            effect: 'Use: Drains 675 to 1126 mana from those in the blast radius and does 50% of the mana drained in damage to the target. Also Silences targets in the blast for 5 sec. (cooldown 1 min)',
            img: 'assets/images/arcane_bomb.jpg',
            materials: {
                delicate_arcanite_converter: 1,
                thorium_bar: 3,
                runecloth: 1,
            },
        },

        greater_arcane_protection_potion: {
            name: 'Greater Arcane Protection Potion',
            effect: 'Use: Absorbs 1950 to 3251 arcane damage. Lasts 1 hr. (cooldown 2 min)',
            img: 'assets/images/greater_arcane_protection_potion.jpg',
            materials: {
                dream_dust: 1,
                dreamfoil: 1,
                crystal_vial: 1,
            },
        },

        // dense dynamite makes 2 per craft
        dense_dynamite: {
            name: 'Dense Dynamite',
            effect: 'Use: Inflicts 340 to 461 Fire damage in a 5 yard radius. (cooldown 1 min)',
            img: 'assets/images/dense_dynamite.jpg',
            materials: {
                dense_blasting_powder: 2,
                runecloth: 3,
            },
        },

        // makes 5 chops
        dirges_kickin_chimaerok_chops: {
            name: 'Dirge\’s Kickin\’ Chimaerok Chops',
            effect: 'Use: Restores 2550 health over 30 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 25 Stamina for 15 min.',
            img: 'assets/images/dirges_kickin_chimaerok_chops.jpg',
            materials: {
                hot_spices: 1,
                goblin_rocket_fuel: 1,
                deeprock_salt: 1,
                Chimaerok_tenderloin: 1,
            },
        },

        elixir_of_fortitude: {
            name: 'Elixir of Fortitude',
            effect: 'Use: Increases the player\'s maximum health by 120 for 1 hr.',
            img: 'assets/images/elixir_of_fortitude.jpg',
            materials: {
                wild_steelbloom: 1,
                goldthorn: 1,
                leaded_vial: 1,
            },
        },

        greater_fire_protection_potion: {
            name: 'Greater Fire Protection Potion',
            effect: 'Use: Absorbs 1950 to 3251 fire damage. Lasts 1 hr. (cooldown 2 min)',
            img: 'assets/images/greater_fire_protection_potion.jpg',
            materials: {
                elemental_fire: 1,
                dreamfoil: 1,
                crystal_vial: 1,
            },
        },
        flask_of_the_titans: {
            name: 'Flask of the Titans',
            effect: 'Use: Increases the player\'s maximum health by 1200 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.',
            img: 'assets/images/flask_of_the_titans.jpg',
            materials: {
                gromsblood: 30,
                stonescale_oil: 10,
                black_lotus: 1,
                crystal_vial: 1,
            },
        },

        free_action_potion: {
            name: 'Free Action Potion',
            effect: 'Use: Makes you immune to Stun and Movement Impairing effects for the next 30 sec. Does not remove effects already on the imbiber. (cooldown 2 min)',
            img: 'assets/images/free_action_potion.jpg',
            materials: {
                blackmouth_oil: 2,
                stranglekelp: 1,
                leaded_vial: 1,
            },
        },
        goblin_sapper_charge: {
            name: 'Goblin Sapper Charge',
            effect: 'Use: Explodes when triggered dealing 450 to 751 Fire damage to all enemies nearby and 375 to 626 damage to you. (cooldown 5 min)',
            img: 'assets/images/goblin_sapper_charge.jpg',
            materials: {
                mageweave_cloth: 1,
                solid_blasting_powder: 3,
                unstable_trigger: 1,
            },
        },
        invisibility_potion: {
            name: 'Invisibility Potion',
            effect: 'Use: Gives the imbiber invisibility for 18 sec. (cooldown 10 min)',
            img: 'assets/images/invisibility_potion.jpg',
            materials: {
                ghost_mushroom: 1,
                sungrass: 1,
                crystal_vial: 1,
            },
        },
        heavy_runecloth_bandage: {
            name: 'Heavy Runecloth Bandage',
            effect: 'Use: Heals 2000 damage over 8 sec.',
            img: 'assets/images/heavy_runecloth_bandage.jpg',
            materials: {
                runecloth: 2,
            },
        },

        // IG makes 2
        iron_grenade: {
            name: 'Iron Grenade',
            effect: 'Use: Inflicts 132 to 219 Fire damage and stuns targets for 3 sec in a 3 yard radius. Any damage will break the effect. (cooldown 1 min)',
            img: 'assets/images/iron_grenade.jpg',
            materials: {
                iron_bar: 1,
                heavy_blasting_powder: 1,
                silk_cloth: 1,
            },
        },

        lesser_invisibility_potion: {
            name: 'Lesser Invisibility Potion',
            effect: 'Use: Gives the imbiber invisibility for 15 sec. (cooldown 10 min)',
            img: 'assets/images/lesser_invisibility_potion.jpg',
            materials: {
                fadeleaf: 1,
                wild_steelbloom: 1,
                leaded_vial: 1,
            },
        },

        limited_invulnerability_potion: {
            name: 'Limited Invulnerability Potion',
            effect: 'Use: Imbiber is immune to physical attacks for the next 6 sec. (cooldown 2 min)',
            img: 'assets/images/limited_invulnerability_potion.jpg',
            materials: {
                blindweed: 2,
                ghost_mushroom: 1,
                crystal_vial: 1,
            },
        },

        major_healing_potion: {
            name: 'Major Healing Potion',
            effect: 'Use: Restores 1050 to 1751 health. (cooldown 2 min)',
            img: 'assets/images/major_healing_potion.jpg',
            materials: {
                golden_sansam: 2,
                moutain_silversage: 1,
                crystal_vial: 1,
            },
        },
        greater_nature_protection_potion: {
            name: 'Greater Nature Protection Potion',
            effect: 'Use: Absorbs 1950 to 3251 nature damage. Lasts 1 hr. (cooldown 2 min)',
            img: 'assets/images/greater_nature_protection_potion.jpg',
            materials: {
                elemental_earth: 1,
                dreamfoil: 1,
                crystal_vial: 1,
            },
        },
        oil_of_immolation: {
            name: 'Oil of Immolation',
            effect: 'Use: Does 50 fire damage to any enemies within a 5 yard radius around the caster every 3 seconds for 15 sec',
            img: 'assets/images/oil_of_immolation.jpg',
            materials: {
                firebloom: 1,
                goldthorn: 1,
                crystal_vial: 1,
            },
        },
        restorative_potion: {
            name: 'Restorative Potion',
            effect: 'Use: Removes 1 magic, curse, poison or disease effect on you every 5 seconds for 30 seconds. (cooldown 2 min)',
            img: 'assets/images/restorative_potion.jpg',
            materials: {
                elemental_earth: 1,
                goldthorn: 1,
                crystal_vial: 1,
            },
        },
        greater_shadow_protection_potion: {
            name: 'Greater Shadow Protection Potion',
            effect: 'Use: Absorbs 1950 to 3251 shadow damage. Lasts 1 hr. (cooldown 2 min)',
            img: 'assets/images/greater_shadow_protection_potion.jpg',
            materials: {
                shadow_oil: 1,
                dreamfoil: 1,
                crystal_vial: 1,
            },
        },
        swiftness_potion: {
            name: 'Swiftness Potion',
            effect: 'Use: Increases run speed by 50% for 15 sec. (cooldown 2 min)',
            img: 'assets/images/swiftness_potion.jpg',
            materials: {
                swiftthistle: 1,
                briarthorn: 1,
                empty_vial: 1,
            },
        },
    },

    warrior: {

        dense_sharpening_stone: {
            name: 'Dense Sharpening Stone',
            effect: 'Use: Increase sharp weapon damage by 8 for 30 minutes.',
            img: 'assets/images/dense_sharpening_stone.jpg',
            materials: {
                dense_stone: 1
            },
        },

        dense_weightstone: {
            name: 'Dense Weightstone',
            effect: 'Use: Increase the damage of a blunt weapon by 8 for 30 minutes.',
            img: 'assets/images/dense_weightstone.jpg',
            materials: {
                dense_stone: 1,
                runecloth: 1
            },
        },

        elemental_sharpening_stone: {
            name: 'Elemental Sharpening Stone',
            effect: 'Use: Increase critical chance on a melee weapon by 2% for 30 minutes.',
            img: 'assets/images/elemental_sharpening_stone.jpg',
            materials: {
                elemental_earth: 2,
                dense_stone: 3
            },
        },

        elixir_of_the_mongoose: {
            name: 'Elixir of the Mongoose',
            effect: 'Use: Increases Agility by 25 and chance to get a critical hit by 2% for 1 hr.',
            img: 'assets/images/elixir_of_the_mongoose.jpg',
            materials: {
                mountain_silversage: 2,
                plaguebloom: 2,
                crystal_vial: 1
            },
        },

        elixir_of_superior_defense: {
            name: 'Elixir of Superior Defense',
            effect: 'Use: Increases armor by 450 for 1 hr.',
            img: 'assets/images/elixir_of_superior_defense.jpg',
            materials: {
                stonescale_oil: 2,
                sungrass: 1,
                crystal_vial: 1
            },
        },

        greater_stoneshield_potion: {
            name: 'Greater Stoneshield Potion',
            effect: 'Use: Increases armor by 2000 for 2 min. (cooldown 2 min)',
            img: 'assets/images/greater_stoneshield_potion.jpg',
            materials: {
                stonescale_oil: 3,
                thorium_ore: 1,
                crystal_vial: 1
            },
        },

        juju_flurry: {
            name: 'Juju Flurry',
            effect: 'Use: Increases the target\'s attack speed by 3% for 20 sec. (cooldown 1 min)',
            img: 'assets/images/juju_flurry.jpg',
            materials: {
                'frostsaber_e\'ko': 3
            },
        },

        juju_might: {
            name: 'Juju Might',
            effect: 'Use: Increases attack power by 40 for 10 min. (cooldown 1 min)',
            img: 'assets/images/juju_might.jpg',
            materials: {
                'frosmaul_e\'ko': 3
            },
        },

        juju_power: {
            name: 'Juju Power',
            effect: 'Use: Increases the target\'s Strength by 30 for 30 min. (cooldown 1 min)',
            img: 'assets/images/juju_power.jpg',
            materials: {
                'winterfall_e\'ko': 3
            },
        },

        mighty_rage_potion: {
            name: 'Mighty Rage Potion',
            effect: 'Use: Increases Rage by 45 to 346 and increases Strength by 60 for 20 sec. (cooldown 2 min)',
            img: 'assets/images/mighty_rage_potion.jpg',
            materials: {
                gromsblood: 3,
                crystal_vial: 1
            },
        },

        'R.O.I.D.S.': {
            name: 'R.O.I.D.S.',
            effect: 'Use: Increases Strength by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
            img: 'assets/images/R.O.I.D.S..jpg',
            materials: {
                snickerfang_jowl: 3,
                blasted_boar_lung: 2,
                scorpid_pincer: 1
            },
        },

        smoked_desert_dumplings: {
            name: 'Smoked Desert Dumplings',
            effect: 'Use: Restores 2148 health over 30 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 20 Strength for 15 min.',
            img: 'assets/images/smoked_desert_dumplings.jpg',
            materials: {
                sandworm_meat: 1,
                soothing_spices: 1
            },
        },
    },

}
