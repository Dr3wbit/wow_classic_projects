
const consumes = [
    {
        name: 'all',
        data: [
            {
                name: 'Alchemy',
                data: [
                    {
                        name: 'Greater Arcane Protection Potion',
                        effect: 'Use: Absorbs 1950 to 3251 arcane damage. Lasts 1 hr. (cooldown 2 min)',
                        img: 'greater_arcane_protection_potion.jpg',
                        materials: {
                            dream_dust: 1,
                            dreamfoil: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Greater Fire Protection Potion',
                        effect: 'Use: Absorbs 1950 to 3251 fire damage. Lasts 1 hr. (cooldown 2 min)',
                        img: 'greater_fire_protection_potion.jpg',
                        materials: {
                            elemental_fire: 1,
                            dreamfoil: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Greater Nature Protection Potion',
                        effect: 'Use: Absorbs 1950 to 3251 nature damage. Lasts 1 hr. (cooldown 2 min)',
                        img: 'greater_nature_protection_potion.jpg',
                        materials: {
                            elemental_earth: 1,
                            dreamfoil: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Greater Shadow Protection Potion',
                        effect: 'Use: Absorbs 1950 to 3251 shadow damage. Lasts 1 hr. (cooldown 2 min)',
                        img: 'greater_shadow_protection_potion.jpg',
                        materials: {
                            shadow_oil: 1,
                            dreamfoil: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Greater Frost Protection Potion',
                        effect: 'Use: Absorbs 1950 to 3251 frost damage. Lasts 1 hr. (cooldown 2 min)',
                        img: 'greater_frost_protection_potion.jpg',
                        materials: {
                            elemental_water: 1,
                            dreamfoil: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Elixir of Fortitude',
                        effect: 'Use: Increases the player\'s maximum health by 120 for 1 hr.',
                        img: 'elixir_of_fortitude.jpg',
                        materials: {
                            wild_steelbloom: 1,
                            goldthorn: 1,
                            leaded_vial: 1,
                        },
                    },
                    {
                        name: 'Flask of the Titans',
                        effect: 'Use: Increases the player\'s maximum health by 1200 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.',
                        img: 'flask_of_the_titans.jpg',
                        materials: {
                            gromsblood: 30,
                            stonescale_oil: 10,
                            black_lotus: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Free Action Potion',
                        effect: 'Use: Makes you immune to Stun and Movement Impairing effects for the next 30 sec. Does not remove effects already on the imbiber. (cooldown 2 min)',
                        img: 'free_action_potion.jpg',
                        materials: {
                            blackmouth_oil: 2,
                            stranglekelp: 1,
                            leaded_vial: 1,
                        },
                    },
                    {
                        name: 'Living Action Potion',
                        effect: 'Use: Makes you immune to Stun and Movement Impairing effects for the next 5 sec. Also removes existing Stun and Movement Impairing effects. (cooldown 2 min)',
                        img: 'living_action_potion.jpg',
                        materials: {
                            icecap: 2,
                            mountain_silversage: 2,
                            heart_of_the_wild: 2,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Limited Invulnerability Potion',
                        effect: 'Use: Imbiber is immune to physical attacks for the next 6 sec. (cooldown 2 min)',
                        img: 'limited_invulnerability_potion.jpg',
                        materials: {
                            blindweed: 2,
                            ghost_mushroom: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Major Healing Potion',
                        effect: 'Use: Restores 1050 to 1751 health. (cooldown 2 min)',
                        img: 'major_healing_potion.jpg',
                        materials: {
                            golden_sansam: 2,
                            mountain_silversage: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Restorative Potion',
                        effect: 'Use: Removes 1 magic, curse, poison or disease effect on you every 5 seconds for 30 seconds. (cooldown 2 min)',
                        img: 'restorative_potion.jpg',
                        materials: {
                            elemental_earth: 1,
                            goldthorn: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Swiftness Potion',
                        effect: 'Use: Increases run speed by 50% for 15 sec. (cooldown 2 min)',
                        img: 'swiftness_potion.jpg',
                        materials: {
                            swiftthistle: 1,
                            briarthorn: 1,
                            empty_vial: 1,
                        },
                    },
                    {
                        name: 'Invisibility Potion',
                        effect: 'Use: Gives the imbiber invisibility for 18 sec. (cooldown 10 min)',
                        img: 'invisibility_potion.jpg',
                        materials: {
                            ghost_mushroom: 1,
                            sungrass: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Lesser Invisibility Potion',
                        effect: 'Use: Gives the imbiber invisibility for 15 sec. (cooldown 10 min)',
                        img: 'lesser_invisibility_potion.jpg',
                        materials: {
                            fadeleaf: 1,
                            wild_steelbloom: 1,
                            leaded_vial: 1,
                        },
                    },
                    {
                        name: 'Oil of Immolation',
                        effect: 'Use: Does 50 fire damage to any enemies within a 5 yard radius around the caster every 3 seconds for 15 sec',
                        img: 'oil_of_immolation.jpg',
                        materials: {
                            firebloom: 1,
                            goldthorn: 1,
                            crystal_vial: 1,
                        },
                    },
                ],
            },
            {
                name: 'Engineering',
                data: [
                    {
                        name: 'Arcane Bomb',
                        effect: 'Use: Drains 675 to 1126 mana from those in the blast radius and does 50% of the mana drained in damage to the target. Also Silences targets in the blast for 5 sec. (cooldown 1 min)',
                        img: 'arcane_bomb.jpg',
                        materials: {
                            delicate_arcanite_converter: 1,
                            thorium_bar: 3,
                            runecloth: 1,
                        },
                    },
                    {
                        // dense dynamite makes 2 per craft
                        name: 'Dense Dynamite',
                        effect: 'Use: Inflicts 340 to 461 Fire damage in a 5 yard radius. (cooldown 1 min)',
                        img: 'dense_dynamite.jpg',
                        materials: {
                            dense_blasting_powder: 1,
                            runecloth: 1.5,
                        },
                        step: 2,
                    },
                    {
                        name: 'Goblin Sapper Charge',
                        effect: 'Use: Explodes when triggered dealing 450 to 751 Fire damage to all enemies nearby and 375 to 626 damage to you. (cooldown 5 min)',
                        img: 'goblin_sapper_charge.jpg',
                        materials: {
                            mageweave_cloth: 1,
                            solid_blasting_powder: 3,
                            unstable_trigger: 1,
                        },
                    },
                    {
                        //IG makes 2-4, averaged to 3
                        name: 'Iron Grenade',
                        effect: 'Use: Inflicts 132 to 219 Fire damage and stuns targets for 3 sec in a 3 yard radius. Any damage will break the effect. (cooldown 1 min)',
                        img: 'iron_grenade.jpg',
                        materials: {
                            iron_bar: 0.33,
                            heavy_blasting_powder: 0.33,
                            silk_cloth: 0.33,
                        },
                        step: 3,
                    },
                    {
                        //TG makes 3
                        name: 'Thorium Grenade',
                        effect: 'Use: Inflicts 300 to 501 Fire damage and stuns targets for 3 sec in a 3 yard radius. Any damage will break the effect. (cooldown 1 min)',
                        img: 'thorium_grenade.jpg',
                        materials: {
                            thorium_widget: 0.33,
                            thorium_bar: 1,
                            dense_blasting_powder: 1,
                            runecloth: 1,
                        },
                        step: 3,
                    },
                    {
                        name: 'Goblin Rocket Boots',
                        effect: 'Use: These dangerous looking boots significantly increase your run speed by 70% for 20 sec. They are prone to explode however, so use with caution. (cooldown 5 min)',
                        img: 'goblin_rocket_boots.jpg',
                        materials: {
                            black_mageweave_boots: 1,
                            mithril_tube: 2,
                            heavy_leather: 4,
                            goblin_rocket_fuel: 2,
                            unstable_trigger: 1,
                        },
                    },
                ],
            },
            {
                name: 'Cooking',
                data: [
                    {
                        //makes 5 Chops
                        name: 'Dirge\’s Kickin\’ Chimaerok Chops',
                        effect: 'Use: Restores 2550 health over 30 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 25 Stamina for 15 min.',
                        img: 'dirges_kickin_chimaerok_chops.jpg',
                        materials: {
                            hot_spices: 0.2,
                            goblin_rocket_fuel: 0.2,
                            deeprock_salt: 0.2,
                            chimaerok_tenderloin: 0.2,
                        },
                    },
                ],
            },
            {
                name: 'Blacksmithing',
                data: [

                ],
            },
            {
                name: 'Other',
                data: [
                    {
                        name: 'Heavy Runecloth Bandage',
                        effect: 'Use: Heals 2000 damage over 8 sec.',
                        img: 'heavy_runecloth_bandage.jpg',
                        materials: {
                            runecloth: 2,
                        },
                    },
                ],
            },
        ]
    },
    {
        name: 'warrior',
        data: [
            {
                name: 'Alchemy',
                data: [
                    {
                        name: 'Elixir of the Mongoose',
                        effect: 'Use: Increases Agility by 25 and chance to get a critical hit by 2% for 1 hr.',
                        img: 'elixir_of_the_mongoose.jpg',
                        materials: {
                            mountain_silversage: 2,
                            plaguebloom: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Elixir of Superior Defense',
                        effect: 'Use: Increases armor by 450 for 1 hr.',
                        img: 'elixir_of_superior_defense.jpg',
                        materials: {
                            stonescale_oil: 2,
                            sungrass: 1,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Greater Stoneshield Potion',
                        effect: 'Use: Increases armor by 2000 for 2 min. (cooldown 2 min)',
                        img: 'greater_stoneshield_potion.jpg',
                        materials: {
                            stonescale_oil: 3,
                            thorium_ore: 1,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Mighty Rage Potion',
                        effect: 'Use: Increases Rage by 45 to 346 and increases Strength by 60 for 20 sec. (cooldown 2 min)',
                        img: 'mighty_rage_potion.jpg',
                        materials: {
                            gromsblood: 3,
                            crystal_vial: 1
                        },
                    },
                ],
            },
            {
                name: 'Engineering',
                data: [

                ],
            },
            {
                name: 'Cooking',
                data: [
                    {
                        name: 'Smoked Desert Dumplings',
                        effect: 'Use: Restores 2148 health over 30 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 20 Strength for 15 min.',
                        img: 'smoked_desert_dumplings.jpg',
                        materials: {
                            sandworm_meat: 1,
                            soothing_spices: 1
                        },
                    },
                ],
            },
            {
                name: 'Blacksmithing',
                data: [
                    {
                        name: 'Dense Sharpening Stone',
                        effect: 'Use: Increase sharp weapon damage by 8 for 30 minutes.',
                        img: 'dense_sharpening_stone.jpg',
                        materials: {
                            dense_stone: 1
                        },
                    },
                    {
                        name: 'Dense Weightstone',
                        effect: 'Use: Increase the damage of a blunt weapon by 8 for 30 minutes.',
                        img: 'dense_weightstone.jpg',
                        materials: {
                            dense_stone: 1,
                            runecloth: 1
                        },
                    },
                    {
                        name: 'Elemental Sharpening Stone',
                        effect: 'Use: Increase critical chance on a melee weapon by 2% for 30 minutes.',
                        img: 'elemental_sharpening_stone.jpg',
                        materials: {
                            elemental_earth: 2,
                            dense_stone: 3
                        },
                    },
                ],
            },
            {
                name: 'Other',
                data: [
                    {
                        name: 'Juju Flurry',
                        effect: 'Use: Increases the target\'s attack speed by 3% for 20 sec. (cooldown 1 min)',
                        img: 'juju_flurry.jpg',
                        materials: {
                            'frostsaber_e\'ko': 3
                        },
                    },

                    {
                        name: 'Juju Might',
                        effect: 'Use: Increases attack power by 40 for 10 min. (cooldown 1 min)',
                        img: 'juju_might.jpg',
                        materials: {
                            'frosmaul_e\'ko': 3
                        },
                    },
                    {
                        name: 'Juju Power',
                        effect: 'Use: Increases the target\'s Strength by 30 for 30 min. (cooldown 1 min)',
                        img: 'juju_power.jpg',
                        materials: {
                            'winterfall_e\'ko': 3
                        },
                    },
                    {
                        name: 'R.O.I.D.S.',
                        effect: 'Use: Increases Strength by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
                        img: 'R.O.I.D.S..jpg',
                        materials: {
                            snickerfang_jowl: 3,
                            blasted_boar_lung: 2,
                            scorpid_pincer: 1
                        },
                    },
                ],
            },
        ]
    },
    {
        name: 'rogue',
        data: [
            {
                name: 'Alchemy',
                data: [
                    {
                        name: 'Elixir of the Mongoose',
                        effect: 'Use: Increases Agility by 25 and chance to get a critical hit by 2% for 1 hr.',
                        img: 'elixir_of_the_mongoose.jpg',
                        materials: {
                            mountain_silversage: 2,
                            plaguebloom: 2,
                            crystal_vial: 1
                        },
                    },
                ],
            },
            {
                name: 'Engineering',
                data: [

                ],
            },
            {
                name: 'Cooking',
                data: [
                    {
                        name: 'Grilled Squid',
                        effect: 'Use: Restores 874.8 health over 27 sec. Must remain seated while eating. If you eat for 10 seconds will also increase your Agility by 162 for 10 min. ',
                        img: 'grilled_squid.jpg',
                        materials: {
                            winter_squid: 1,
                            soothing_spices: 1,
                        },
                    },
                ],
            },
            {
                name: 'Blacksmithing',
                data: [

                ],
            },
            {
                name: 'Other',
                data: [
                    {
                        name: 'Juju Flurry',
                        effect: 'Use: Increases the target\'s attack speed by 3% for 20 sec. (cooldown 1 min)',
                        img: 'juju_flurry.jpg',
                        materials: {
                            'frostsaber_e\'ko': 3
                        },
                    },

                    {
                        name: 'Juju Might',
                        effect: 'Use: Increases attack power by 40 for 10 min. (cooldown 1 min)',
                        img: 'juju_might.jpg',
                        materials: {
                            'frosmaul_e\'ko': 3
                        },
                    },

                    {
                        name: 'Juju Power',
                        effect: 'Use: Increases the target\'s Strength by 30 for 30 min. (cooldown 1 min)',
                        img: 'juju_power.jpg',
                        materials: {
                            'winterfall_e\'ko': 3
                        },
                    },
                    {
                        name: 'Ground Scorpok Assay',
                        effect: 'Use: Increases Agility by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
                        img: 'ground_scorpok_assay.jpg',
                        materials: {
                            scorpok_pincer: 3,
                            vulture_gizzard: 2,
                            blasted_boar_lung: 1
                        },
                    },
                ],
            },
        ]
    },
    {
        name: 'hunter',
        data: [
            {
                name: 'Alchemy',
                data: [
                    {
                        name: 'Major Rejuvenation Potion',
                        effect: 'Use: Restores 1440 to 1761 mana and health. (cooldown 2 min)',
                        img: 'major_rejuvenation_potion.jpg',
                        materials: {
                            heart_of_the_wild: 1,
                            golden_sansam: 4,
                            dreamfoil: 4,
                            imbued_vial: 1,
                        },
                    },
                    {
                        name: 'Major Mana Potion',
                        effect: 'Use: Restores 1350 to 2251 mana. (cooldown 2 min)',
                        img: 'major_mana_potion.jpg',
                        materials: {
                            dreamfoil: 3,
                            icecap: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Elixir of the Mongoose',
                        effect: 'Use: Increases Agility by 25 and chance to get a critical hit by 2% for 1 hr.',
                        img: 'elixir_of_the_mongoose.jpg',
                        materials: {
                            mountain_silversage: 2,
                            plaguebloom: 2,
                            crystal_vial: 1
                        },
                    },
                ],
            },
            {
                name: 'Engineering',
                data: [

                ],
            },
            {
                name: 'Cooking',
                data: [
                    {
                        name: 'Grilled Squid',
                        effect: 'Use: Restores 874.8 health over 27 sec. Must remain seated while eating. If you eat for 10 seconds will also increase your Agility by 162 for 10 min. ',
                        img: 'grilled_squid.jpg',
                        materials: {
                            winter_squid: 1,
                            soothing_spices: 1,
                        },
                    },
                    {
                        name: 'Sagefish Delight',
                        effect: 'Use: Restores 0 health and 0 mana over 21 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 6 Mana every 5 seconds for 15 min.',
                        img: 'sagefish_delight.jpg',
                        materials: {
                            raw_greater_sagefish: 1,
                            hot_spices: 1,
                        },
                    },
                ],
            },
            {
                name: 'Blacksmithing',
                data: [

                ],
            },
            {
                name: 'Other',
                data: [
                    {
                        name: 'Juju Flurry',
                        effect: 'Use: Increases the target\'s attack speed by 3% for 20 sec. (cooldown 1 min)',
                        img: 'juju_flurry.jpg',
                        materials: {
                            'frostsaber_e\'ko': 3
                        },
                    },
                    {
                        name: 'Juju Might',
                        effect: 'Use: Increases attack power by 40 for 10 min. (cooldown 1 min)',
                        img: 'juju_might.jpg',
                        materials: {
                            'frosmaul_e\'ko': 3
                        },
                    },
                    {
                        name: 'Juju Power',
                        effect: 'Use: Increases the target\'s Strength by 30 for 30 min. (cooldown 1 min)',
                        img: 'juju_power.jpg',
                        materials: {
                            'winterfall_e\'ko': 3
                        },
                    },
                    {
                        name: 'Ground Scorpok Assay',
                        effect: 'Use: Increases Agility by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
                        img: 'ground_scorpok_assay.jpg',
                        materials: {
                            scorpok_pincer: 3,
                            vulture_gizzard: 2,
                            blasted_boar_lung: 1
                        },
                    },
                ],
            },
        ]
    },
    {
        name: 'priest',
        data: [
            {
                name: 'Alchemy',
                data: [
                    {
                        name: 'Major Rejuvenation Potion',
                        effect: 'Use: Restores 1440 to 1761 mana and health. (cooldown 2 min)',
                        img: 'major_rejuvenation_potion.jpg',
                        materials: {
                            heart_of_the_wild: 1,
                            golden_sansam: 4,
                            dreamfoil: 4,
                            imbued_vial: 1,
                        },
                    },
                    {
                        name: 'Major Mana Potion',
                        effect: 'Use: Restores 1350 to 2251 mana. (cooldown 2 min)',
                        img: 'major_mana_potion.jpg',
                        materials: {
                            dreamfoil: 3,
                            icecap: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Flask of Supreme Power',
                        effect: 'Use: Increases damage done by magical spells and effects by up to 150 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.',
                        img: 'flask_of_supreme_power.jpg',
                        materials: {
                            dreamfoil: 30,
                            mountain_silversage: 10,
                            black_lotus: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Flask of Distilled Wisdom',
                        effect: 'Use: Increases the player\'s maximum mana by 2000 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.',
                        img: 'flask_of_distilled_wisdom.jpg',
                        materials: {
                            dreamfoil: 30,
                            icecap: 10,
                            black_lotus: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Elixir of the Sages',
                        effect: 'Increases Intellect and Spirit by 18 for 1 hr.',
                        img: 'elixir_of_the_sages.jpg',
                        materials: {
                            dreamfoil: 1,
                            plaguebloom: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Elixir of Shadow Power',
                        effect: 'Use: Increases spell shadow damage by up to 40 for 30 min.',
                        img: 'elixir_of_shadow_power.jpg',
                        materials: {
                            ghost_mushroom: 3,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Greater Arcane Elixir',
                        effect: 'Use: Increases spell damage by up to 35 for 1 hr.',
                        img: 'greater_arcane_elixir.jpg',
                        materials: {
                            dreamfoil: 2,
                            mountain_silversage: 1,
                            crystal_vial: 1
                        },
                    },
                ],
            },
            {
                name: 'Engineering',
                data: [

                ],
            },
            {
                name: 'Cooking',
                data: [
                    {
                        name: 'Sagefish Delight',
                        effect: 'Use: Restores 0 health and 0 mana over 21 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 6 Mana every 5 seconds for 15 min.',
                        img: 'sagefish_delight.jpg',
                        materials: {
                            raw_greater_sagefish: 1,
                            hot_spices: 1,
                        },
                    },
                    {
                        name: 'Nightfin Soup',
                        effect: 'Use: Restores 874.8 health over 27 sec. Must remain seated while eating. Also restores 162 Mana every 5 seconds for 10 min.',
                        img: 'nightfin_soup.jpg',
                        materials: {
                            raw_nightfin_snapper: 1,
                            refreshing_spring_water: 1,
                        },
                    },
                    {
                        name: 'Runn Tum Tuber Surprise',
                        effect: 'Use: Restores 1933.2 health over 27 sec. Must remain seated while eating. Also increases your Intellect by 358 for 10 min.',
                        img: 'runn_tum_tuber_surprise.jpg',
                        materials: {
                            runn_tum_tuber: 1,
                            soothing_spices: 1,
                        },
                    },
                ],
            },
            {
                name: 'Blacksmithing',
                data: [

                ],
            },
            {
                name: 'Other',
                data: [
                    {
                        name: 'Cerebral Cortex Compound',
                        effect: 'Use: Increases Intellect by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
                        img: 'cerebral_cortex_compound.jpg',
                        materials: {
                            basilisk_brain: 10,
                            vulture_gizzard: 2,
                        },
                    },
                ],
            },
        ]
    },
    {
        name: 'warlock',
        data: [
            {
                name: 'Alchemy',
                data: [
                    {
                        name: 'Major Rejuvenation Potion',
                        effect: 'Use: Restores 1440 to 1761 mana and health. (cooldown 2 min)',
                        img: 'major_rejuvenation_potion.jpg',
                        materials: {
                            heart_of_the_wild: 1,
                            golden_sansam: 4,
                            dreamfoil: 4,
                            imbued_vial: 1,
                        },
                    },

                    {
                        name: 'Major Mana Potion',
                        effect: 'Use: Restores 1350 to 2251 mana. (cooldown 2 min)',
                        img: 'major_mana_potion.jpg',
                        materials: {
                            dreamfoil: 3,
                            icecap: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Flask of Supreme Power',
                        effect: 'Use: Increases damage done by magical spells and effects by up to 150 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.',
                        img: 'flask_of_supreme_power.jpg',
                        materials: {
                            dreamfoil: 30,
                            mountain_silversage: 10,
                            black_lotus: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Elixir of Shadow Power',
                        effect: 'Use: Increases spell shadow damage by up to 40 for 30 min.',
                        img: 'elixir_of_shadow_power.jpg',
                        materials: {
                            ghost_mushroom: 3,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Greater Arcane Elixir',
                        effect: 'Use: Increases spell damage by up to 35 for 1 hr.',
                        img: 'greater_arcane_elixir.jpg',
                        materials: {
                            dreamfoil: 2,
                            mountain_silversage: 1,
                            crystal_vial: 1
                        },
                    },
                ],
            },
            {
                name: 'Engineering',
                data: [

                ],
            },
            {
                name: 'Cooking',
                data: [
                    {
                        name: 'Sagefish Delight',
                        effect: 'Use: Restores 0 health and 0 mana over 21 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 6 Mana every 5 seconds for 15 min.',
                        img: 'sagefish_delight.jpg',
                        materials: {
                            raw_greater_sagefish: 1,
                            hot_spices: 1,
                        },
                    },
                    {
                        name: 'Nightfin Soup',
                        effect: 'Use: Restores 874.8 health over 27 sec. Must remain seated while eating. Also restores 162 Mana every 5 seconds for 10 min.',
                        img: 'nightfin_soup.jpg',
                        materials: {
                            raw_nightfin_snapper: 1,
                            refreshing_spring_water: 1,
                        },
                    },
                    {
                        name: 'Runn Tum Tuber Surprise',
                        effect: 'Use: Restores 1933.2 health over 27 sec. Must remain seated while eating. Also increases your Intellect by 358 for 10 min.',
                        img: 'runn_tum_tuber_surprise.jpg',
                        materials: {
                            runn_tum_tuber: 1,
                            soothing_spices: 1,
                        },
                    },
                ],
            },
            {
                name: 'Blacksmithing',
                data: [

                ],
            },
            {
                name: 'Other',
                data: [
                    {
                        name: 'Cerebral Cortex Compound',
                        effect: 'Use: Increases Intellect by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
                        img: 'cerebral_cortex_compound.jpg',
                        materials: {
                            basilisk_brain: 10,
                            vulture_gizzard: 2,
                        },
                    },
                ],
            },
        ]
    },
    {
        name: 'mage',
        data: [
            {
                name: 'Alchemy',
                data: [
                    {
                        name: 'Major Rejuvenation Potion',
                        effect: 'Use: Restores 1440 to 1761 mana and health. (cooldown 2 min)',
                        img: 'major_rejuvenation_potion.jpg',
                        materials: {
                            heart_of_the_wild: 1,
                            golden_sansam: 4,
                            dreamfoil: 4,
                            imbued_vial: 1,
                        },
                    },
                    {
                        name: 'Major Mana Potion',
                        effect: 'Use: Restores 1350 to 2251 mana. (cooldown 2 min)',
                        img: 'major_mana_potion.jpg',
                        materials: {
                            dreamfoil: 3,
                            icecap: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Flask of Supreme Power',
                        effect: 'Use: Increases damage done by magical spells and effects by up to 150 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.',
                        img: 'flask_of_supreme_power.jpg',
                        materials: {
                            dreamfoil: 30,
                            mountain_silversage: 10,
                            black_lotus: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Elixir of Frost Power',
                        effect: 'Use: Increases spell frost damage by up to 15 for 30 min.',
                        img: 'elixir_of_frost_power.jpg',
                        materials: {
                            wintersbite: 2,
                            'khadgar\'s_whisker': 1,
                            leaded_vial: 1
                        },
                    },
                    {
                        name: 'Greater Arcane Elixir',
                        effect: 'Use: Increases spell damage by up to 35 for 1 hr.',
                        img: 'greater_arcane_elixir.jpg',
                        materials: {
                            dreamfoil: 2,
                            mountain_silversage: 1,
                            crystal_vial: 1
                        },
                    },
                ],
            },
            {
                name: 'Engineering',
                data: [

                ],
            },
            {
                name: 'Cooking',
                data: [
                    {
                        name: 'Sagefish Delight',
                        effect: 'Use: Restores 0 health and 0 mana over 21 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 6 Mana every 5 seconds for 15 min.',
                        img: 'sagefish_delight.jpg',
                        materials: {
                            raw_greater_sagefish: 1,
                            hot_spices: 1,
                        },
                    },
                    {
                        name: 'Nightfin Soup',
                        effect: 'Use: Restores 874.8 health over 27 sec. Must remain seated while eating. Also restores 162 Mana every 5 seconds for 10 min.',
                        img: 'nightfin_soup.jpg',
                        materials: {
                            raw_nightfin_snapper: 1,
                            refreshing_spring_water: 1,
                        },
                    },
                    {
                        name: 'Runn Tum Tuber Surprise',
                        effect: 'Use: Restores 1933.2 health over 27 sec. Must remain seated while eating. Also increases your Intellect by 358 for 10 min.',
                        img: 'runn_tum_tuber_surprise.jpg',
                        materials: {
                            runn_tum_tuber: 1,
                            soothing_spices: 1,
                        },
                    },
                ],
            },
            {
                name: 'Blacksmithing',
                data: [

                ],
            },
            {
                name: 'Other',
                data: [
                    {
                        name: 'Cerebral Cortex Compound',
                        effect: 'Use: Increases Intellect by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
                        img: 'cerebral_cortex_compound.jpg',
                        materials: {
                            basilisk_brain: 10,
                            vulture_gizzard: 2,
                        },
                    },
                ],
            },
        ]
    },
    {
        name: 'druid',
        data: [
            {
                name: 'Alchemy',
                data: [
                    {
                        name: 'Major Rejuvenation Potion',
                        effect: 'Use: Restores 1440 to 1761 mana and health. (cooldown 2 min)',
                        img: 'major_rejuvenation_potion.jpg',
                        materials: {
                            heart_of_the_wild: 1,
                            golden_sansam: 4,
                            dreamfoil: 4,
                            imbued_vial: 1,
                        },
                    },
                    {
                        name: 'Major Mana Potion',
                        effect: 'Use: Restores 1350 to 2251 mana. (cooldown 2 min)',
                        img: 'major_mana_potion.jpg',
                        materials: {
                            dreamfoil: 3,
                            icecap: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Elixir of the Sages',
                        effect: 'Increases Intellect and Spirit by 18 for 1 hr.',
                        img: 'elixir_of_the_sages.jpg',
                        materials: {
                            dreamfoil: 1,
                            plaguebloom: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Greater Arcane Elixir',
                        effect: 'Use: Increases spell damage by up to 35 for 1 hr.',
                        img: 'greater_arcane_elixir.jpg',
                        materials: {
                            dreamfoil: 2,
                            mountain_silversage: 1,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Elixir of the Mongoose',
                        effect: 'Use: Increases Agility by 25 and chance to get a critical hit by 2% for 1 hr.',
                        img: 'elixir_of_the_mongoose.jpg',
                        materials: {
                            mountain_silversage: 2,
                            plaguebloom: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Flask of Supreme Power',
                        effect: 'Use: Increases damage done by magical spells and effects by up to 150 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.',
                        img: 'flask_of_supreme_power.jpg',
                        materials: {
                            dreamfoil: 30,
                            mountain_silversage: 10,
                            black_lotus: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Flask of Distilled Wisdom',
                        effect: 'Use: Increases the player\'s maximum mana by 2000 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.',
                        img: 'flask_of_distilled_wisdom.jpg',
                        materials: {
                            dreamfoil: 30,
                            icecap: 10,
                            black_lotus: 1,
                            crystal_vial: 1,
                        },
                    },

                ],
            },
            {
                name: 'Engineering',
                data: [

                ],
            },
            {
                name: 'Cooking',
                data: [
                    {
                        name: 'Grilled Squid',
                        effect: 'Use: Restores 874.8 health over 27 sec. Must remain seated while eating. If you eat for 10 seconds will also increase your Agility by 162 for 10 min. ',
                        img: 'grilled_squid.jpg',
                        materials: {
                            winter_squid: 1,
                            soothing_spices: 1,
                        },
                    },
                    {
                        name: 'Sagefish Delight',
                        effect: 'Use: Restores 0 health and 0 mana over 21 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 6 Mana every 5 seconds for 15 min.',
                        img: 'sagefish_delight.jpg',
                        materials: {
                            raw_greater_sagefish: 1,
                            hot_spices: 1,
                        },
                    },
                    {
                        name: 'Nightfin Soup',
                        effect: 'Use: Restores 874.8 health over 27 sec. Must remain seated while eating. Also restores 162 Mana every 5 seconds for 10 min.',
                        img: 'nightfin_soup.jpg',
                        materials: {
                            raw_nightfin_snapper: 1,
                            refreshing_spring_water: 1,
                        },
                    },
                    {
                        name: 'Runn Tum Tuber Surprise',
                        effect: 'Use: Restores 1933.2 health over 27 sec. Must remain seated while eating. Also increases your Intellect by 358 for 10 min.',
                        img: 'runn_tum_tuber_surprise.jpg',
                        materials: {
                            runn_tum_tuber: 1,
                            soothing_spices: 1,
                        },
                    },
                ],
            },
            {
                name: 'Blacksmithing',
                data: [
                    {
                        name: 'Elemental Sharpening Stone',
                        effect: 'Use: Increase critical chance on a melee weapon by 2% for 30 minutes.',
                        img: 'elemental_sharpening_stone.jpg',
                        materials: {
                            elemental_earth: 2,
                            dense_stone: 3
                        },
                    },
                ],
            },
            {
                name: 'Other',
                data: [
                    {
                        name: 'Juju Flurry',
                        effect: 'Use: Increases the target\'s attack speed by 3% for 20 sec. (cooldown 1 min)',
                        img: 'juju_flurry.jpg',
                        materials: {
                            'frostsaber_e\'ko': 3
                        },
                    },
                    {
                        name: 'Juju Might',
                        effect: 'Use: Increases attack power by 40 for 10 min. (cooldown 1 min)',
                        img: 'juju_might.jpg',
                        materials: {
                            'frosmaul_e\'ko': 3
                        },
                    },
                    {
                        name: 'Juju Power',
                        effect: 'Use: Increases the target\'s Strength by 30 for 30 min. (cooldown 1 min)',
                        img: 'juju_power.jpg',
                        materials: {
                            'winterfall_e\'ko': 3
                        },
                    },
                    {
                        name: 'Ground Scorpok Assay',
                        effect: 'Use: Increases Agility by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
                        img: 'ground_scorpok_assay.jpg',
                        materials: {
                            scorpok_pincer: 3,
                            vulture_gizzard: 2,
                            blasted_boar_lung: 1
                        },
                    },
                    {
                        name: 'Cerebral Cortex Compound',
                        effect: 'Use: Increases Intellect by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
                        img: 'cerebral_cortex_compound.jpg',
                        materials: {
                            basilisk_brain: 10,
                            vulture_gizzard: 2,
                        },
                    },
                ],
            },
        ]
    },
    {
        name: 'paladin',
        data: [
            {
                name: 'Alchemy',
                data: [
                    {
                        name: 'Elixir of the Mongoose',
                        effect: 'Use: Increases Agility by 25 and chance to get a critical hit by 2% for 1 hr.',
                        img: 'elixir_of_the_mongoose.jpg',
                        materials: {
                            mountain_silversage: 2,
                            plaguebloom: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Elixir of Superior Defense',
                        effect: 'Use: Increases armor by 450 for 1 hr.',
                        img: 'elixir_of_superior_defense.jpg',
                        materials: {
                            stonescale_oil: 2,
                            sungrass: 1,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Greater Stoneshield Potion',
                        effect: 'Use: Increases armor by 2000 for 2 min. (cooldown 2 min)',
                        img: 'greater_stoneshield_potion.jpg',
                        materials: {
                            stonescale_oil: 3,
                            thorium_ore: 1,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Major Rejuvenation Potion',
                        effect: 'Use: Restores 1440 to 1761 mana and health. (cooldown 2 min)',
                        img: 'major_rejuvenation_potion.jpg',
                        materials: {
                            heart_of_the_wild: 1,
                            golden_sansam: 4,
                            dreamfoil: 4,
                            imbued_vial: 1,
                        },
                    },
                    {
                        name: 'Major Mana Potion',
                        effect: 'Use: Restores 1350 to 2251 mana. (cooldown 2 min)',
                        img: 'major_mana_potion.jpg',
                        materials: {
                            dreamfoil: 3,
                            icecap: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Flask of Supreme Power',
                        effect: 'Use: Increases damage done by magical spells and effects by up to 150 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.',
                        img: 'flask_of_supreme_power.jpg',
                        materials: {
                            dreamfoil: 30,
                            mountain_silversage: 10,
                            black_lotus: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Flask of Distilled Wisdom',
                        effect: 'Use: Increases the player\'s maximum mana by 2000 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.',
                        img: 'flask_of_distilled_wisdom.jpg',
                        materials: {
                            dreamfoil: 30,
                            icecap: 10,
                            black_lotus: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Elixir of the Sages',
                        effect: 'Increases Intellect and Spirit by 18 for 1 hr.',
                        img: 'elixir_of_the_sages.jpg',
                        materials: {
                            dreamfoil: 1,
                            plaguebloom: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Greater Arcane Elixir',
                        effect: 'Use: Increases spell damage by up to 35 for 1 hr.',
                        img: 'greater_arcane_elixir.jpg',
                        materials: {
                            dreamfoil: 2,
                            mountain_silversage: 1,
                            crystal_vial: 1
                        },
                    },

                ],
            },
            {
                name: 'Engineering',
                data: [

                ],
            },
            {
                name: 'Cooking',
                data: [
                    {
                        name: 'Smoked Desert Dumplings',
                        effect: 'Use: Restores 2148 health over 30 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 20 Strength for 15 min.',
                        img: 'smoked_desert_dumplings.jpg',
                        materials: {
                            sandworm_meat: 1,
                            soothing_spices: 1
                        },
                    },
                    {
                        name: 'Sagefish Delight',
                        effect: 'Use: Restores 0 health and 0 mana over 21 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 6 Mana every 5 seconds for 15 min.',
                        img: 'sagefish_delight.jpg',
                        materials: {
                            raw_greater_sagefish: 1,
                            hot_spices: 1,
                        },
                    },
                    {
                        name: 'Nightfin Soup',
                        effect: 'Use: Restores 874.8 health over 27 sec. Must remain seated while eating. Also restores 162 Mana every 5 seconds for 10 min.',
                        img: 'nightfin_soup.jpg',
                        materials: {
                            raw_nightfin_snapper: 1,
                            refreshing_spring_water: 1,
                        },
                    },
                    {
                        name: 'Runn Tum Tuber Surprise',
                        effect: 'Use: Restores 1933.2 health over 27 sec. Must remain seated while eating. Also increases your Intellect by 358 for 10 min.',
                        img: 'runn_tum_tuber_surprise.jpg',
                        materials: {
                            runn_tum_tuber: 1,
                            soothing_spices: 1,
                        },
                    },
                ],
            },
            {
                name: 'Blacksmithing',
                data: [
                    {
                        name: 'Dense Sharpening Stone',
                        effect: 'Use: Increase sharp weapon damage by 8 for 30 minutes.',
                        img: 'dense_sharpening_stone.jpg',
                        materials: {
                            dense_stone: 1
                        },
                    },
                    {
                        name: 'Dense Weightstone',
                        effect: 'Use: Increase the damage of a blunt weapon by 8 for 30 minutes.',
                        img: 'dense_weightstone.jpg',
                        materials: {
                            dense_stone: 1,
                            runecloth: 1
                        },
                    },
                    {
                        name: 'Elemental Sharpening Stone',
                        effect: 'Use: Increase critical chance on a melee weapon by 2% for 30 minutes.',
                        img: 'elemental_sharpening_stone.jpg',
                        materials: {
                            elemental_earth: 2,
                            dense_stone: 3
                        },
                    },
                ],
            },
            {
                name: 'Other',
                data: [
                    {
                        name: 'Juju Flurry',
                        effect: 'Use: Increases the target\'s attack speed by 3% for 20 sec. (cooldown 1 min)',
                        img: 'juju_flurry.jpg',
                        materials: {
                            'frostsaber_e\'ko': 3
                        },
                    },
                    {
                        name: 'Juju Might',
                        effect: 'Use: Increases attack power by 40 for 10 min. (cooldown 1 min)',
                        img: 'juju_might.jpg',
                        materials: {
                            'frosmaul_e\'ko': 3
                        },
                    },
                    {
                        name: 'Juju Power',
                        effect: 'Use: Increases the target\'s Strength by 30 for 30 min. (cooldown 1 min)',
                        img: 'juju_power.jpg',
                        materials: {
                            'winterfall_e\'ko': 3
                        },
                    },
                    {
                        name: 'R.O.I.D.S.',
                        effect: 'Use: Increases Strength by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
                        img: 'R.O.I.D.S..jpg',
                        materials: {
                            snickerfang_jowl: 3,
                            blasted_boar_lung: 2,
                            scorpid_pincer: 1
                        },
                    },
                    {
                        name: 'Cerebral Cortex Compound',
                        effect: 'Use: Increases Intellect by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
                        img: 'cerebral_cortex_compound.jpg',
                        materials: {
                            basilisk_brain: 10,
                            vulture_gizzard: 2,
                        },
                    },
                ],
            },
        ]
    },
    {
        name: 'shaman',
        data: [
            {
                name: 'Alchemy',
                data: [
                    {
                        name: 'Elixir of the Mongoose',
                        effect: 'Use: Increases Agility by 25 and chance to get a critical hit by 2% for 1 hr.',
                        img: 'elixir_of_the_mongoose.jpg',
                        materials: {
                            mountain_silversage: 2,
                            plaguebloom: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Elixir of Superior Defense',
                        effect: 'Use: Increases armor by 450 for 1 hr.',
                        img: 'elixir_of_superior_defense.jpg',
                        materials: {
                            stonescale_oil: 2,
                            sungrass: 1,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Greater Stoneshield Potion',
                        effect: 'Use: Increases armor by 2000 for 2 min. (cooldown 2 min)',
                        img: 'greater_stoneshield_potion.jpg',
                        materials: {
                            stonescale_oil: 3,
                            thorium_ore: 1,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Major Rejuvenation Potion',
                        effect: 'Use: Restores 1440 to 1761 mana and health. (cooldown 2 min)',
                        img: 'major_rejuvenation_potion.jpg',
                        materials: {
                            heart_of_the_wild: 1,
                            golden_sansam: 4,
                            dreamfoil: 4,
                            imbued_vial: 1,
                        },
                    },
                    {
                        name: 'Major Mana Potion',
                        effect: 'Use: Restores 1350 to 2251 mana. (cooldown 2 min)',
                        img: 'major_mana_potion.jpg',
                        materials: {
                            dreamfoil: 3,
                            icecap: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Flask of Supreme Power',
                        effect: 'Use: Increases damage done by magical spells and effects by up to 150 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.',
                        img: 'flask_of_supreme_power.jpg',
                        materials: {
                            dreamfoil: 30,
                            mountain_silversage: 10,
                            black_lotus: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Flask of Distilled Wisdom',
                        effect: 'Use: Increases the player\'s maximum mana by 2000 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.',
                        img: 'flask_of_distilled_wisdom.jpg',
                        materials: {
                            dreamfoil: 30,
                            icecap: 10,
                            black_lotus: 1,
                            crystal_vial: 1,
                        },
                    },
                    {
                        name: 'Elixir of the Sages',
                        effect: 'Increases Intellect and Spirit by 18 for 1 hr.',
                        img: 'elixir_of_the_sages.jpg',
                        materials: {
                            dreamfoil: 1,
                            plaguebloom: 2,
                            crystal_vial: 1
                        },
                    },
                    {
                        name: 'Greater Arcane Elixir',
                        effect: 'Use: Increases spell damage by up to 35 for 1 hr.',
                        img: 'greater_arcane_elixir.jpg',
                        materials: {
                            dreamfoil: 2,
                            mountain_silversage: 1,
                            crystal_vial: 1
                        },
                    },
                ],
            },
            {
                name: 'Engineering',
                data: [

                ],
            },
            {
                name: 'Cooking',
                data: [
                    {
                        name: 'Smoked Desert Dumplings',
                        effect: 'Use: Restores 2148 health over 30 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 20 Strength for 15 min.',
                        img: 'smoked_desert_dumplings.jpg',
                        materials: {
                            sandworm_meat: 1,
                            soothing_spices: 1
                        },
                    },
                    {
                        name: 'Sagefish Delight',
                        effect: 'Use: Restores 0 health and 0 mana over 21 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 6 Mana every 5 seconds for 15 min.',
                        img: 'sagefish_delight.jpg',
                        materials: {
                            raw_greater_sagefish: 1,
                            hot_spices: 1,
                        },
                    },
                    {
                        name: 'Nightfin Soup',
                        effect: 'Use: Restores 874.8 health over 27 sec. Must remain seated while eating. Also restores 162 Mana every 5 seconds for 10 min.',
                        img: 'nightfin_soup.jpg',
                        materials: {
                            raw_nightfin_snapper: 1,
                            refreshing_spring_water: 1,
                        },
                    },
                    {
                        name: 'Runn Tum Tuber Surprise',
                        effect: 'Use: Restores 1933.2 health over 27 sec. Must remain seated while eating. Also increases your Intellect by 358 for 10 min.',
                        img: 'runn_tum_tuber_surprise.jpg',
                        materials: {
                            runn_tum_tuber: 1,
                            soothing_spices: 1,
                        },
                    },
                ],
            },
            {
                name: 'Blacksmithing',
                data: [
                    {
                        name: 'Dense Sharpening Stone',
                        effect: 'Use: Increase sharp weapon damage by 8 for 30 minutes.',
                        img: 'dense_sharpening_stone.jpg',
                        materials: {
                            dense_stone: 1
                        },
                    },
                    {
                        name: 'Dense Weightstone',
                        effect: 'Use: Increase the damage of a blunt weapon by 8 for 30 minutes.',
                        img: 'dense_weightstone.jpg',
                        materials: {
                            dense_stone: 1,
                            runecloth: 1
                        },
                    },
                    {
                        name: 'Elemental Sharpening Stone',
                        effect: 'Use: Increase critical chance on a melee weapon by 2% for 30 minutes.',
                        img: 'elemental_sharpening_stone.jpg',
                        materials: {
                            elemental_earth: 2,
                            dense_stone: 3
                        },
                    },
                ],
            },
            {
                name: 'Other',
                data: [
                    {
                        name: 'Juju Flurry',
                        effect: 'Use: Increases the target\'s attack speed by 3% for 20 sec. (cooldown 1 min)',
                        img: 'juju_flurry.jpg',
                        materials: {
                            'frostsaber_e\'ko': 3
                        },
                    },
                    {
                        name: 'Juju Might',
                        effect: 'Use: Increases attack power by 40 for 10 min. (cooldown 1 min)',
                        img: 'juju_might.jpg',
                        materials: {
                            'frosmaul_e\'ko': 3
                        },
                    },
                    {
                        name: 'Juju Power',
                        effect: 'Use: Increases the target\'s Strength by 30 for 30 min. (cooldown 1 min)',
                        img: 'juju_power.jpg',
                        materials: {
                            'winterfall_e\'ko': 3
                        },
                    },
                    {
                        name: 'R.O.I.D.S.',
                        effect: 'Use: Increases Strength by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
                        img: 'R.O.I.D.S..jpg',
                        materials: {
                            snickerfang_jowl: 3,
                            blasted_boar_lung: 2,
                            scorpid_pincer: 1
                        },
                    },
                    {
                        name: 'Cerebral Cortex Compound',
                        effect: 'Use: Increases Intellect by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
                        img: 'cerebral_cortex_compound.jpg',
                        materials: {
                            basilisk_brain: 10,
                            vulture_gizzard: 2,
                        },
                    },
                ],
            },
        ]
    },
]
