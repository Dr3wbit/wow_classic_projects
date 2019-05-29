const allConsumes = {
	greater_arcane_protection_potion: {
		url: 'https://classic.wowhead.com/item=13461',
		req: 48,
		use: 'Absorbs 1950 to 3251 arcane damage. Lasts 1 hr. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			dream_dust: 1,
			dreamfoil: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	swiftness_potion: {
		url: 'https://classic.wowhead.com/item=2459',
		req: 5,
		use: 'Increases run speed by 50% for 15 sec. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			swiftthistle: 1,
			briarthorn: 1,
			empty_vial: 1,
		},
		profession: 'alchemy',
	},
	lesser_invisibility_potion: {
		url: 'https://classic.wowhead.com/item=3823',
		req: 23,
		use: 'Gives the imbiber lesser invisibility for 15 sec. (cooldown 10 min)',
		rarity: 'common',
		materials: {
			fadeleaf: 1,
			wild_steelbloom: 1,
			leaded_vial: 1,
		},
		profession: 'alchemy',
	},
	dense_weightstone: {
		url: 'https://classic.wowhead.com/item=12643',
		req: 35,
		use: 'Increase the damage of a blunt weapon by 8 for 30 minutes.',
		rarity: 'common',
		materials: {
			dense_stone: 1,
			runecloth: 1,
		},
		profession: 'blacksmithing',
	},
	grilled_squid: {
		url: 'https://classic.wowhead.com/item=13928',
		req: 35,
		use: 'Restores 874.8 health over 27 sec. Must remain seated while eating. If you eat for 10 seconds will also increase your Agility by 10 for 10 min.',
		rarity: 'common',
		materials: {
			winter_squid: 1,
			soothing_spices: 1,
		},
		profession: 'cooking',
	},
	greater_frost_protection_potion: {
		url: 'https://classic.wowhead.com/item=13456',
		req: 48,
		use: 'Absorbs 1950 to 3251 frost damage. Lasts 1 hr. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			elemental_water: 1,
			dreamfoil: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	elixir_of_frost_power: {
		url: 'https://classic.wowhead.com/item=17708',
		req: 28,
		use: 'Increases spell frost damage by up to 15 for 30 min.',
		rarity: 'common',
		materials: {
			wintersbite: 2,
			khadgars_whisker: 1,
			leaded_vial: 1,
		},
		profession: 'alchemy',
	},
	juju_flurry: {
		use: "Increases the target's attack speed by 3% for 20 sec. (1 Min Cooldown)",
		bop: true,
        profession: 'quest',
        materials: {
            frostsaber_eko: 1
        },
        step: 3
	},
	greater_fire_protection_potion: {
		url: 'https://classic.wowhead.com/item=13457',
		req: 48,
		use: 'Absorbs 1950 to 3251 fire damage. Lasts 1 hr. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			elemental_fire: 1,
			dreamfoil: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	greater_nature_protection_potion: {
		url: 'https://classic.wowhead.com/item=13458',
		req: 48,
		use: 'Absorbs 1950 to 3251 nature damage. Lasts 1 hr. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			elemental_earth: 1,
			dreamfoil: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	invisibility_potion: {
		url: 'https://classic.wowhead.com/item=9172',
		req: 37,
		use: 'Gives the imbiber invisibility for 18 sec. (cooldown 10 min)',
		rarity: 'common',
		materials: {
			ghost_mushroom: 1,
			sungrass: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	elixir_of_fortitude: {
		url: 'https://classic.wowhead.com/item=3825',
		req: 25,
		use: "Increases the player's maximum health by 120 for 1 hr.",
		rarity: 'common',
		materials: {
			wild_steelbloom: 1,
			goldthorn: 1,
			leaded_vial: 1,
		},
		profession: 'alchemy',
	},
	flask_of_supreme_power: {
		url: 'https://classic.wowhead.com/item=13512',
		req: 50,
		use: 'Increases damage done by magical spells and effects by up to 150 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.',
		rarity: 'common',
		materials: {
			dreamfoil: 30,
			mountain_silversage: 10,
			black_lotus: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	major_healing_potion: {
		url: 'https://classic.wowhead.com/item=13446',
		req: 45,
		use: 'Restores 1050 to 1751 health. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			golden_sansam: 2,
			mountain_silversage: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	smoked_desert_dumplings: {
		url: 'https://classic.wowhead.com/item=20452',
		req: 45,
		use: 'Restores 2148 health over 30 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 20 Strength for 15 min.',
		rarity: 'common',
		materials: {
			sandworm_meat: 1,
			soothing_spices: 1,
		},
		profession: 'cooking',
	},
	oil_of_immolation: {
		url: 'https://classic.wowhead.com/item=8956',
		req: 31,
		use: 'Does 50 fire damage to any enemies within a 5 yard radius around the caster every 3 seconds for 15 sec',
		rarity: 'common',
		materials: {
			firebloom: 1,
			goldthorn: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	mighty_rage_potion: {
		url: 'https://classic.wowhead.com/item=13442',
		req: 46,
		use: 'Increases Rage by 45 to 346 and increases Strength by 60 for 20 sec. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			gromsblood: 3,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	elixir_of_the_mongoose: {
		url: 'https://classic.wowhead.com/item=13452',
		req: 46,
		use: 'Increases Agility by 25 and chance to get a critical hit by 2% for 1 hr.',
		rarity: 'common',
		materials: {
			mountain_silversage: 2,
			plaguebloom: 2,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	juju_might: {
		use: 'Increases attack power by 40 for 10 min. (1 Min Cooldown)',
		bop: true,
        profession: 'quest',
        materials: {
            frostmaul_eko: 1
        },
        step: 3
	},
	goblin_rocket_boots: {
		url: 'https://classic.wowhead.com/item=7189',
		req: "Binds when equipped\nFeet\t\t\t\t\t\t\t\t\t\t    Cloth\n41 Armor\nDurability 35 / 35",
		use: 'These dangerous looking boots significantly increase your run speed for 20 sec. They are prone to explode however, so use with caution. (cooldown 5 min)',
		rarity: 'uncommon',
		stats: true,
		materials: {
			black_mageweave_boots: 1,
			mithril_tube: 2,
			heavy_leather: 4,
			goblin_rocket_fuel: 2,
			unstable_trigger: 1,
		},
		profession: 'engineering',
	},
	nightfin_soup: {
		url: 'https://classic.wowhead.com/item=13931',
		req: 35,
		use: 'Restores 874.8 health over 27 sec. Must remain seated while eating. Also restores 8 Mana every 5 seconds for 10 min.',
		rarity: 'common',
		materials: {
			raw_nightfin_snapper: 1,
			refreshing_spring_water: 1,
		},
		profession: 'cooking',
	},
	flask_of_the_titans: {
		url: 'https://classic.wowhead.com/item=13510',
		req: 50,
		use: "Increases the player's maximum health by 1200 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.",
		rarity: 'common',
		materials: {
			gromsblood: 30,
			stonescale_oil: 10,
			black_lotus: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	arcane_bomb: {
		url: 'https://classic.wowhead.com/item=16040',
		req: 'engineering_300',
		use: 'Drains 675 to 1126 mana from those in the blast radius and does 50% of the mana drained in damage to the target. Also Silences targets in the blast for 5 sec. (cooldown 1 min)',
		rarity: 'common',
		materials: {
			delicate_arcanite_converter: 1,
			thorium_bar: 3,
			runecloth: 1,
		},
		profession: 'engineering',
	},
	dense_sharpening_stone: {
		url: 'https://classic.wowhead.com/item=12404',
		req: 35,
		use: 'Increase sharp weapon damage by 8 for 30 minutes.',
		rarity: 'common',
		materials: {
			dense_stone: 1,
		},
		profession: 'blacksmithing',
	},
	elixir_of_superior_defense: {
		url: 'https://classic.wowhead.com/item=13445',
		req: 43,
		use: 'Increases armor by 450 for 1 hr.',
		rarity: 'common',
		materials: {
			stonescale_oil: 2,
			sungrass: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	major_rejuvenation_potion: {
		url: 'https://classic.wowhead.com/item=18253',
		req: 50,
		use: 'Restores 1440 to 1761 mana and health. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			heart_of_the_wild: 1,
			golden_sansam: 4,
			dreamfoil: 4,
			imbued_vial: 1,
		},
		profession: 'alchemy',
	},
	greater_shadow_protection_potion: {
		url: 'https://classic.wowhead.com/item=13459',
		req: 48,
		use: 'Absorbs 1950 to 3251 shadow damage. Lasts 1 hr. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			shadow_oil: 1,
			dreamfoil: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	juju_power: {
		use: "Increases the target's Strength by 30 for 30 min. (1 Min Cooldown)",
		bop: true,
        profession: 'quest',
        materials: {
            winterfall_eko: 1
        },
        step: 3
	},
	elixir_of_shadow_power: {
		url: 'https://classic.wowhead.com/item=9264',
		req: 40,
		use: 'Increases spell shadow damage by up to 40 for 30 min.',
		rarity: 'common',
		materials: {
			ghost_mushroom: 3,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	dirges_kickin_chimaerok_chops: {
		req: 55,
		use: 'Restores 2550 health over 30 sec.  Must remain seated while eating.  If you spend at least 10 seconds eating you will become well fed and gain 25 Stamina for 15 min.',
        profession: 'cooking',
        name: "Dirge’s Kickin’ Chimaerok Chops",
		materials: {
			hot_spices: 0.2,
			goblin_rocket_fuel: 0.2,
			deeprock_salt: 0.2,
			chimaerok_tenderloin: 0.2,
		},
		step: 5
    },
	flask_of_distilled_wisdom: {
		url: 'https://classic.wowhead.com/item=13511',
		req: 50,
		use: "Increases the player's maximum mana by 2000 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.",
		rarity: 'common',
		materials: {
			dreamfoil: 30,
			icecap: 10,
			black_lotus: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	dense_dynamite: {
		use: 'Inflicts 340 to 460 Fire damage in a 5 yard radius. (1 Min Cooldown)',
		req: 'engineering250',
		materials: {
			dense_blasting_powder: 1,
			runecloth: 1.5,
		},
        profession: 'engineering',
        step: 2
	},
	greater_arcane_elixir: {
		url: 'https://classic.wowhead.com/item=13454',
		req: 47,
		use: 'Increases spell damage by up to 35 for 1 hr.',
		rarity: 'common',
		materials: {
			dreamfoil: 3,
			mountain_silversage: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	heavy_runecloth_bandage: {
		url: 'https://classic.wowhead.com/item=14530',
		req: 'first_aid225',
		use: 'Heals 2000 damage over 8 sec.',
		rarity: 'common',
		materials: {
			runecloth: 2,
		},
		profession: 'first aid',
	},
	greater_stoneshield_potion: {
		url: 'https://classic.wowhead.com/item=13455',
		req: 46,
		use: 'Increases armor by 2000 for 2 min. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			stonescale_oil: 3,
            crystal_vial: 1,
			thorium_ore: 1,
		},
		profession: 'alchemy',
	},
	elemental_sharpening_stone: {
		url: 'https://classic.wowhead.com/item=18262',
		rarity: 'common',
		req: 50,
		use: 'Increase critical chance on a melee weapon by 2% for 30 minutes.',
		materials: {
			elemental_earth: 2,
			dense_stone: 3,
		},
		profession: 'blacksmithing',
	},
	sagefish_delight: {
		url: 'https://classic.wowhead.com/item=21217',
		req: 30,
		use: 'Restores 0 health and 0 mana over 21 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 6 Mana every 5 seconds for 15 min.',
		materials: {
			raw_greater_sagefish: 1,
            hot_spices: 1,
		},
		profession: 'cooking',
		rarity: 'common',
	},
	cerebral_cortex_compound: {
		url: 'https://classic.wowhead.com/item=8423',
		unique: true,
		description: '"Best Served Chilled"',
		use: 'Increases Intellect by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
		rarity: 'common',
		materials: {
			basilisk_brain: 10,
			vulture_gizzard: 2
		}
	},
	living_action_potion: {
		url: 'https://classic.wowhead.com/item=20008',
		req: 47,
		use: 'Makes you immune to Stun and Movement Impairing effects for the next 5 sec. Also removes existing Stun and Movement Impairing effects. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			icecap: 2,
			mountain_silversage: 2,
			heart_of_the_wild: 2,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	restorative_potion: {
		url: 'https://classic.wowhead.com/item=9030',
		req: 32,
		use: 'Removes 1 magic, curse, poison or disease effect on you every 5 seconds for 30 seconds. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			elemental_earth: 1,
			goldthorn: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	limited_invulnerability_potion: {
		url: 'https://classic.wowhead.com/item=3387',
		req: 45,
		use: 'Imbiber is immune to physical attacks for the next 6 sec. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			blindweed: 2,
			ghost_mushroom: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	ground_scorpok_assay: {
		url: 'https://classic.wowhead.com/item=8412',
		unique: true,
		use: 'Increases Agility by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)',
		rarity: 'common',
        profession: 'quest',
		materials: {
			scorpok_pincer: 3,
			vulture_gizzard: 2,
			blasted_boar_lung: 1
		}
	},
	elixir_of_the_sages: {
		url: 'https://classic.wowhead.com/item=13447',
		req: 44,
		use: 'Increases Intellect and Spirit by 18 for 1 hr.',
		rarity: 'common',
		materials: {
			dreamfoil: 1,
			plaguebloom: 2,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	major_mana_potion: {
		url: 'https://classic.wowhead.com/item=13444',
		req: 49,
		use: 'Restores 1350 to 2251 mana. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			dreamfoil: 3,
			icecap: 2,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	runn_tum_tuber_surprise: {
		url: 'https://classic.wowhead.com/item=18254',
		req: 45,
		use: 'Restores 1933.2 health over 27 sec. Must remain seated while eating. Also increases your Intellect by 358 for 10 min.',
		rarity: 'common',
		materials: {
			runn_tum_tuber: 1,
			soothing_spices: 1,
		},
		profession: 'cooking',
	},
	thorium_grenade: {
		url: 'https://classic.wowhead.com/item=15993',
		req: 'engineering_260',
		use: 'Inflicts 300 to 501 Fire damage and stuns targets for 3 sec in a 3 yard radius. Any damage will break the effect. (cooldown 1 min)',
		rarity: 'common',
		materials: {
			thorium_widget: 0.33,
			thorium_bar: 1,
			dense_blasting_powder: 1,
			runecloth: 1,
		},
		profession: 'engineering',
        step: 3
	},
	iron_grenade: {
		url: 'https://classic.wowhead.com/item=4390',
		req: 'engineering_175',
		use: 'Inflicts 132 to 219 Fire damage and stuns targets for 3 sec in a 3 yard radius. Any damage will break the effect. (cooldown 1 min)',
		rarity: 'common',
		materials: {
			iron_bar: 0.34,
			heavy_blasting_powder: 0.34,
			silk_cloth: 0.34,
		},
		profession: 'engineering',
        step: 3
	},
	free_action_potion: {
		url: 'https://classic.wowhead.com/item=5634',
		req: 20,
		use: 'Makes you immune to Stun and Movement Impairing effects for the next 30 sec. Does not remove effects already on the imbiber. (cooldown 2 min)',
		rarity: 'common',
		materials: {
			blackmouth_oil: 2,
			stranglekelp: 1,
			leaded_vial: 1,
		},
		profession: 'alchemy',
	},
	goblin_sapper_charge: {
		url: 'https://classic.wowhead.com/item=10646',
		req: 'engineering_205',
		use: 'Explodes when triggered dealing 450 to 751 Fire damage to all enemies nearby and 375 to 626 damage to you. (cooldown 5 min)',
		rarity: 'common',
		materials: {
			mageweave_cloth: 1,
			solid_blasting_powder: 3,
			unstable_trigger: 1,
		},
		profession: 'engineering',
	},
	elixir_of_the_giants: {},
	blinding_powder: {
		url: 'https://classic.wowhead.com/item=5530',
		req: 34,
		use: '',
		materials: {
			fadeleaf: 0.33
		},
		rarity: 'common',
		step: 3
	},
	flash_powder: {},
	elixir_of_firepower: {
		url: 'https://classic.wowhead.com/item=6373',
		req: 18,
		use: 'Increases spell fire damage by up to 10 for 30 min.',
		rarity: 'common',
		materials: {
			fire_oil: 2,
			kingsblood: 1,
			leaded_vial: 1,
		},
		profession: 'alchemy',
	},
	elixir_of_greater_firepower: {
		url: 'https://classic.wowhead.com/item=21546',
		req: 40,
		use: 'Increases spell fire damage by up to 40 for 30 min.',
		rarity: 'common',
		materials: {
			fire_oil: 3,
			firebloom: 3,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	arcane_elixir: {
		url: 'https://classic.wowhead.com/item=9155',
		req: 37,
		use: 'Increases spell damage by up to 20 for 30 min.',
		rarity: 'common',
		materials: {
			blindweed: 1,
			goldthorn: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	juju_ember: {
		use: 'Increases Fire resistance by 15 for 10 min. (1 Min Cooldown)',
		bop: true,
        profession: 'quest',
        materials: {
            shardtooth_eko: 1
        },
        step: 3
	},
	roids: {
		use: 'Increases Strength by 25 when consumed. Effect lasts for 60 minutes. (1 Hour Cooldown)',
		bop: true,
		description: 'Robust Operational Imbue Derived From Snickerfang',
        profession: 'quest',
        name: "R.O.I.D.S.",
        materials: {
            snickerfang_jowl: 3,
            blasted_boar_lung: 2,
            scorpok_pincer: 1,
        }

	},
	dragonbreath_chili: {
		url: 'https://classic.wowhead.com/item=12217',
		req: 35,
		use: 'Occasionally belch flame at enemies struck in melee for the next 10 min.',
		rarity: 'common',
		materials: {
			mystery_meat: 1,
			small_flame_sac: 1,
		},
		profession: 'cooking',
	},
	brilliant_mana_oil: {
		url: 'https://classic.wowhead.com/item=20748',
		req: 45,
		description: '5 charges',
		use: 'While applied to target weapon it restores 12 mana to the caster every 5 seconds and increases the effect of healing spells by up to 25. Lasts for 30 minutes.\n5 charges',
		rarity: 'common',
		materials: {
			large_brilliant_shard: 2,
			purple_lotus: 3,
			imbued_vial: 1,
		},
		profession: 'enchanting',
	},
	gift_of_arthas: {
		url: 'https://classic.wowhead.com/item=9088',
		req: 38,
		use: 'Increases resistance to shadow by 10. If an enemy strikes the imbiber, the attacker has a 30% chance of being inflicted with disease that increases their damage taken by 8 for 3 min. Lasts for 30 min.',
		rarity: 'common',
		materials: {
			arthas_tears: 1,
			blindweed: 1,
			crystal_vial: 1,
		},
		profession: 'alchemy',
	},
	major_trolls_blood_potion: {
        req: 53,
        use: "Regenerate 20 health every 5 sec for 1 hr.",
        rarity: "common",
        materials: {
            gromsblood: 1,
            plaguebloom: 2,
            crystal_vial: 1
        },
        profession: 'alchemy',
        name: "Major Troll's Blood Potion"
    },
	blessed_sunfruit: {
		url: 'https://classic.wowhead.com/item=13810',
		req: 45,
		rep: "Requires Argent Dawn - Revered",
		use: 'Restores 1933.2 health over 27 sec. Must remain seated while eating. Also increases your Strength by 10 for 10 min.',
		rarity: 'common',
		materials: {
			gold: 1,
		},
        profession: 'vendor',
		step: 5
	},
	monster_omelete: {
        req: 40,
        use: "Restores 1392 health over 30 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 12 Stamina and Spirit for 15 min.",
        materials: {
            giant_egg: 1,
            soothing_spices: 2,
        },
        profession: 'cooking',
    },
	spiced_chili_crab: {
		url: 'https://classic.wowhead.com/item=12216',
		req: 40,
		use: 'Restores 1392 health over 30 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 12 Stamina and Spirit for 15 min.',
		materials: {
			tender_crab_meat: 1,
			hot_spices: 2,
		},
		profession: 'cooking',
	},
	juju_escape: {
		rarity: 'common',
        bop: true,
        profession: 'quest',
        materials: {
            ice_thistle_eko: 1
        },
        step: 3
	},
	juju_chill: {
		rarity: 'common',
        bop: true,
        profession: 'quest',
        use: "Increase Frost resistance by 15 for 10 min. (1 Min Cooldown)",
        materials: {
            chillwind_eko: 1,
        },
        step: 3
	},
}
