const allConsumes = {
	greater_arcane_protection_potion: {
		url: 'https://classic.wowhead.com/item=13461',
		req: 48,
		use: 'Absorbs 1950 to 3251 arcane damage. Lasts 1 hr. (cooldown 2 min)'
	},
	swiftness_potion: {
		url: 'https://classic.wowhead.com/item=2459',
		req: 5,
		use: 'Increases run speed by 50% for 15 sec. (cooldown 2 min)'
	},
	lesser_invisibility_potion: {
		url: 'https://classic.wowhead.com/item=3823',
		req: 23,
		use: 'Gives the imbiber lesser invisibility for 15 sec. (cooldown 10 min)'
	},
	dense_weightstone: {
		url: 'https://classic.wowhead.com/item=12643',
		req: 35,
		use: 'Increase the damage of a blunt weapon by 8 for 30 minutes.'
	},
	grilled_squid: {
		url: 'https://classic.wowhead.com/item=13928',
		req: 35,
		use: 'Restores 874.8 health over 27 sec. Must remain seated while eating. If you eat for 10 seconds will also increase your Agility by 162 for 10 min.'
	},
	greater_frost_protection_potion: {
		url: 'https://classic.wowhead.com/item=13456',
		req: 48,
		use: 'Absorbs 1950 to 3251 frost damage. Lasts 1 hr. (cooldown 2 min)'
	},
	elixir_of_frost_power: {
		url: 'https://classic.wowhead.com/item=17708',
		req: 28,
		use: 'Increases spell frost damage by up to 15 for 30 min.'
	},
	juju_flurry: {
		use: "Increases the target's attack speed by 3% for 20 sec. (1 Min Cooldown)",
		bop: true,
	},
	greater_fire_protection_potion: {
		url: 'https://classic.wowhead.com/item=13457',
		req: 48,
		use: 'Absorbs 1950 to 3251 fire damage. Lasts 1 hr. (cooldown 2 min)'
	},
	greater_nature_protection_potion: {
		url: 'https://classic.wowhead.com/item=13458',
		req: 48,
		use: 'Absorbs 1950 to 3251 nature damage. Lasts 1 hr. (cooldown 2 min)'
	},
	invisibility_potion: {
		url: 'https://classic.wowhead.com/item=9172',
		req: 37,
		use: 'Gives the imbiber invisibility for 18 sec. (cooldown 10 min)'
	},
	elixir_of_fortitude: {
		url: 'https://classic.wowhead.com/item=3825',
		req: 25,
		use: 'Increases the player\'s maximum health by 120 for 1 hr.'
	},
	flask_of_supreme_power: {
		url: 'https://classic.wowhead.com/item=13512',
		req: 50,
		use: 'Increases damage done by magical spells and effects by up to 150 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.'
	},
	major_healing_potion: {
		url: 'https://classic.wowhead.com/item=13446',
		req: 45,
		use: 'Restores 1050 to 1751 health. (cooldown 2 min)'
	},
	smoked_desert_dumplings: {
		url: 'https://classic.wowhead.com/item=20452',
		req: 45,
		use: 'Restores 2148 health over 30 sec. Must remain seated while eating. If you spend at least 10 seconds eating you will become well fed and gain 20 Strength for 15 min.'
	},
	oil_of_immolation: {
		url: 'https://classic.wowhead.com/item=8956',
		req: 31,
		use: 'Does 50 fire damage to any enemies within a 5 yard radius around the caster every 3 seconds for 15 sec'
	},
	mighty_rage_potion: {
		url: 'https://classic.wowhead.com/item=13442',
		req: 46,
		use: 'Increases Rage by 45 to 346 and increases Strength by 60 for 20 sec. (cooldown 2 min)'
	},
	elixir_of_the_mongoose: {
		url: 'https://classic.wowhead.com/item=13452',
		req: 46,
		use: 'Increases Agility by 25 and chance to get a critical hit by 2% for 1 hr.'
	},
	juju_might: {
		use: 'Increases attack power by 40 for 10 min. (1 Min Cooldown)',
		bop: true,
	},
	goblin_rocket_boots: {
		url: 'https://classic.wowhead.com/item=7189',
		use: 'These dangerous looking boots significantly increase your run speed for 20 sec. They are prone to explode however, so use with caution. (cooldown 5 min)',
		rarity: 'uncommon',
		stats: true,
	},
	nightfin_soup: {
		url: 'https://classic.wowhead.com/item=13931',
		req: 35,
		use: 'Restores 874.8 health over 27 sec. Must remain seated while eating. Also restores 162 Mana every 5 seconds for 10 min.'
	},
	flask_of_the_titans: {
		url: 'https://classic.wowhead.com/item=13510',
		req: 50,
		use: "Increases the player's maximum health by 1200 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death."
	},
	arcane_bomb: {
		url: 'https://classic.wowhead.com/item=16040',
		req: 'engineering300',
		use: 'Drains 675 to 1126 mana from those in the blast radius and does 50% of the mana drained in damage to the target. Also Silences targets in the blast for 5 sec. (cooldown 1 min)'
	},
	dense_sharpening_stone: {
		url: 'https://classic.wowhead.com/item=12404',
		req: 35,
		use: 'Increase sharp weapon damage by 8 for 30 minutes.'
	},
	elixir_of_superior_defense: {
		url: 'https://classic.wowhead.com/item=13445',
		req: 43,
		use: 'Increases armor by 450 for 1 hr.'
	},
	major_rejuvenation_potion: {
		url: 'https://classic.wowhead.com/item=18253',
		req: 50,
		use: 'Restores 1440 to 1761 mana and health. (cooldown 2 min)'
	},
	greater_shadow_protection_potion: {
		url: 'https://classic.wowhead.com/item=13459',
		req: 48,
		use: 'Absorbs 1950 to 3251 shadow damage. Lasts 1 hr. (cooldown 2 min)'
	},
	juju_power: {
		use: "Increases the target's Strength by 30 for 30 min. (1 Min Cooldown)",
		bop: true,
	},
	elixir_of_shadow_power: {
		url: 'https://classic.wowhead.com/item=9264',
		req: 40,
		use: 'Increases spell shadow damage by up to 40 for 30 min.'
	},
	dirges_kickin_chimaerok_chops: {
		req: 55,
		use: 'Restores 2550 health over 30 sec.  Must remain seated while eating.  If you spend at least 10 seconds eating you will become well fed and gain 25 Stamina for 15 min.',
	},
	flask_of_distilled_wisdom: {
		url: 'https://classic.wowhead.com/item=13511',
		req: 50,
		use: 'Increases the player\'s maximum mana by 2000 for 2 hr. You can only have the effect of one flask at a time. This effect persists through death.'
	},
	dense_dynamite: {
		use: 'Inflicts 340 to 460 Fire damage in a 5 yard radius. (1 Min Cooldown)',
		req: 'engineering250',
		materials: {
			dense_blasting_powder: 2,
			runecloth: 3,
		},
	},
	greater_arcane_elixir: {
		url: 'https://classic.wowhead.com/item=13454',
		req: 47,
		use: 'Increases spell damage by up to 35 for 1 hr.'
	},
	heavy_runecloth_bandage: {
		url: 'https://classic.wowhead.com/item=14530',
		req: "first_aid225",
		use: 'Heals 2000 damage over 8 sec.'
	},
	greater_stoneshield_potion: {
		url: 'https://classic.wowhead.com/item=13455',
		req: 46,
		use: 'Increases armor by 2000 for 2 min. (cooldown 2 min)'
	},
	elemental_sharpening_stone: {
		url: 'https://classic.wowhead.com/item=18262',
		rarity: 'uncommon',
		req: 50,
		use: 'Increase critical chance on a melee weapon by 2% for 30 minutes.'
	},
	sagefish_delight: {},
	cerebral_cortex_compound: {
		url: 'https://classic.wowhead.com/item=8423',
		unique: true,
		description: '"Best Served Chilled"',
		use: 'Increases Intellect by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)'
	},
	living_action_potion: {
		url: 'https://classic.wowhead.com/item=20008',
		req: 47,
		use: 'Makes you immune to Stun and Movement Impairing effects for the next 5 sec. Also removes existing Stun and Movement Impairing effects. (cooldown 2 min)'
	},
	restorative_potion: {
		url: 'https://classic.wowhead.com/item=9030',
		req: 32,
		use: 'Removes 1 magic, curse, poison or disease effect on you every 5 seconds for 30 seconds. (cooldown 2 min)'
	},
	limited_invulnerability_potion: {
		url: 'https://classic.wowhead.com/item=3387',
		req: 45,
		use: 'Imbiber is immune to physical attacks for the next 6 sec. (cooldown 2 min)'
	},
	ground_scorpok_assay: {
		url: 'https://classic.wowhead.com/item=8412',
		unique: true,
		use: 'Increases Agility by 25 when consumed. Effect lasts for 60 minutes. (cooldown 1 hr)'
	},
	elixir_of_the_sages: {
		url: 'https://classic.wowhead.com/item=13447',
		req: 44,
		use: 'Increases Intellect and Spirit by 18 for 1 hr.'
	},
	major_mana_potion: {
		url: 'https://classic.wowhead.com/item=13444',
		req: 49,
		use: 'Restores 1350 to 2251 mana. (cooldown 2 min)'
	},
	runn_tum_tuber_surprise: {
		url: 'https://classic.wowhead.com/item=18254',
		req: 45,
		use: 'Restores 1933.2 health over 27 sec. Must remain seated while eating. Also increases your Intellect by 358 for 10 min.'
	},
	thorium_grenade: {
		url: 'https://classic.wowhead.com/item=15993',
		req: 'engineering260',
		use: 'Inflicts 300 to 501 Fire damage and stuns targets for 3 sec in a 3 yard radius. Any damage will break the effect. (cooldown 1 min)'
	},
	iron_grenade: {
		url: 'https://classic.wowhead.com/item=4390',
		req: 'engineering175',
		use: 'Inflicts 132 to 219 Fire damage and stuns targets for 3 sec in a 3 yard radius. Any damage will break the effect. (cooldown 1 min)'
	},
	free_action_potion: {
		url: 'https://classic.wowhead.com/item=5634',
		req: 20,
		use: 'Makes you immune to Stun and Movement Impairing effects for the next 30 sec. Does not remove effects already on the imbiber. (cooldown 2 min)'
	},
	goblin_sapper_charge: {
		url: 'https://classic.wowhead.com/item=10646',
		req: 'engineering205',
		use: 'Explodes when triggered dealing 450 to 751 Fire damage to all enemies nearby and 375 to 626 damage to you. (cooldown 5 min)'
	},
	elixir_of_the_giants: {},
	blinding_powder: {},
	flash_powder: {},
	elixir_of_firepower: {
		url: 'https://classic.wowhead.com/item=6373',
		req: 18,
		use: 'Increases spell fire damage by up to 10 for 30 min.'
	},
	elixir_of_greater_firepower: {
		url: 'https://classic.wowhead.com/item=21546',
		req: 40,
		use: 'Increases spell fire damage by up to 40 for 30 min.'
	},
	arcane_elixir: {
		url: 'https://classic.wowhead.com/item=9155',
		req: 37,
		use: 'Increases spell damage by up to 20 for 30 min.'
	},
	juju_ember: {
		use:"Increases Fire resistance by 15 for 10 min. (1 Min Cooldown)",
		bop: true,
	},
	roids: {
		use: "Increases Strength by 25 when consumed. Effect lasts for 60 minutes. (1 Hour Cooldown)",
		bop: true,
		description: "Robust Operational Imbue Derived From Snickerfang",

	}
}
