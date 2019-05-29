const enchants = {
	boots: {
		agility: {
			materials: {
				greater_nether_essence: 2,
			},
			description: 'Permanently enchant boots to give +5 Agility.',
			effect: 'Agility +5'
		},
		greater_agility: {
			filter: "end_game",
			materials: {
				greater_eternal_essence: 8,
			},
			description: 'Permanently enchant boots to give +7 Agility.',
			effect: 'Agility +7'
		},
		greater_stamina: {
			filter: "end_game",
			materials: {
				dream_dust: 10,
			},
			description: 'Permanently enchant boots to give +7 Stamina.',
			effect: 'Stamina +7'
		},
		lesser_agility: {
			materials: {
				soul_dust: 1,
				lesser_mystic_essence: 1,
			},
			description: 'Permanently enchant boots to give +3 Agility.',
			effect: 'Agility +3'
		},
		lesser_spirit: {
			materials: {
				greater_mystic_essence: 1,
				lesser_mystic_essence: 2,
			},
			description: 'Permanently enchant boots to give +3 Spirit.',
			effect: 'Spirit +3'
		},
		lesser_stamina: {
			materials: {
				soul_dust: 4,
			},
			description: 'Permanently enchant boots to give +3 Stamina.',
			effect: 'Stamina +3'
		},
		minor_agility: {
			materials: {
				strange_dust: 6,
				lesser_astral_essence: 2,
			},
			description: 'Permanently enchant a pair of boots so they increase the wearer\'s Agility by 1.',
			effect: 'Agility +1'
		},
		minor_speed: {
			filter: "end_game",
			materials: {
				small_radiant_shard: 1,
				aquamarine: 1,
				lesser_nether_essence: 1,
			},
			description: 'Permanently enchant boots to give a slight movement speed increase.',
			effect: 'Minor Speed'
		},
		minor_stamina: {
			materials: {
				strange_dust: 8,
			},
			description: 'Permanently enchant a pair of boots so they increase the wearer\'s Stamina by 1.',
			effect: 'Stamina +1'
		},
		spirit: {
			filter: "end_game",
			materials: {
				greater_eternal_essence: 2,
				lesser_eternal_essence: 1,
			},
			description: 'Permanently enchant boots to give +5 Spirit.',
			effect: 'Spirit +5'
		},
		stamina: {
			materials: {
				vision_dust: 5,
			},
			description: 'Permanently enchant boots to give +5 Stamina.',
			effect: 'Stamina +5'
		}
	},
	bracer: {
		deflection: {
			filter: "end_game",
			materials: {
				greater_nether_essence: 1,
				dream_dust: 2,
			},
			description: 'Permanently enchants bracers to give +3 Defense.',
			effect: 'Defense +3'
		},
		greater_intellect: {
			filter: "end_game",
			materials: {
				lesser_eternal_essence: 3,
			},
			description: 'Permanently enchants bracers to give +7 Intellect.',
			effect: 'Intellect +7'
		},
		greater_spirit: {
			filter: "end_game",
			materials: {
				lesser_nether_essence: 3,
				vision_dust: 1,
			},
			description: 'Permanently enchants bracers to give +7 Spirit.',
			effect: 'Spirit +7'
		},
		greater_stamina: {
			materials: {
				dream_dust: 5,
			},
			description: 'Permanently enchants bracers to give +7 Stamina.',
			effect: 'Stamina +7'
		},
		greater_strength: {
			materials: {
				dream_dust: 2,
				greater_nether_essence: 1,
			},
			description: 'Permanently enchants bracers to give +7 Strength.',
			effect: 'Strength +7'
		},
		healing_power: {
			filter: "end_game",
			materials: {
				large_brilliant_shard: 2,
				illusion_dust: 20,
				greater_eternal_essence: 4,
				living_essence: 6,
			},
			description: 'Permanently enchants bracers to increase the effects of your healing spells by 24.',
			effect: 'Healing Spells +24'
		},
		intellect: {
			materials: {
				lesser_nether_essence: 2,
			},
			description: 'Permanently enchants bracers to give +5 Intellect.',
			effect: 'Intellect +5'
		},
		lesser_deflection: {
			materials: {
				lesser_mystic_essence: 1,
				soul_dust: 2,
			},
			description: 'Permanently enchants bracers to give +2 Defense.',
			effect: 'Defense +2'
		},
		lesser_intellect: {
			materials: {
				greater_astral_essence: 2,
			},
			description: 'Permanently enchant a bracer so it increases the wearer\'s Intellect by 3.',
			effect: 'Intellect +3'
		},
		lesser_spirit: {
			materials: {
				lesser_astral_essence: 2,
			},
			description: 'Permanently enchant a bracer so it increases the wearer\'s Spirit by 3.',
			effect: 'Spirit +3'
		},
		lesser_stamina: {
			materials: {
				soul_dust: 2,
			},
			description: 'Permanently enchant a bracer so it increases the wearer\'s Stamina by 3.',
			effect: 'Stamina +3'
		},
		lesser_strength: {
			materials: {
				soul_dust: 2,
			},
			description: 'Permanently enchant a bracer so it increases the wearer\'s Strength by 3.',
			effect: 'Strength +3'
		},
		mana_regeneration: {
			materials: {
				illusion_dust: 16,
				greater_eternal_essence: 4,
				essence_of_water: 2,
			},
			description: 'Permanently enchants bracers to restore 4 mana every 5 seconds.',
			effect: '4 mp5'
		},
		minor_agility: {
			materials: {
				strange_dust: 2,
				greater_magic_essence: 1,
			},
			description: 'Permanently enchant bracers so they increase the wearer\'s Agility by 1.',
			effect: 'Agility +1'
		},
		minor_deflect: {
			materials: {
				lesser_magic_essence: 1,
				strange_dust: 1,
			},
			description: 'Permanently enchant bracers so that the defense skill of the wearer is increased by 1.',
			effect: 'Defense +1'
		},
		minor_health: {
			materials: {
				strange_dust: 1,
			},
			description: 'Permanently enchant bracers to increase the health of the wearer by 5.',
			effect: 'Health +5'
		},
		minor_spirit: {
			materials: {
				lesser_magic_essence: 2,
			},
			description: 'Permanently enchant bracers so they increase the wearer\'s Spirit by 1.',
			effect: 'Spirit +1'
		},
		minor_stamina: {
			materials: {
				strange_dust: 3,
			},
			description: 'Permanently enchant bracers so they increase the wearer\'s Stamina by 1.',
			effect: 'Stamina +1'
		},
		minor_strength: {
			materials: {
				strange_dust: 5,
			},
			description: 'Permanently enchant bracers so they increase the wearer\'s Strength by 1.',
			effect: 'Strength +1'
		},
		spirit: {
			materials: {
				lesser_mystic_essence: 1,
			},
			description: 'Permanently enchants bracers to give +5 Spirit.',
			effect: 'Spirit +5'
		},
		stamina: {
			materials: {
				soul_dust: 6,
			},
			description: 'Permanently enchants bracers to give +5 Stamina.',
			effect: 'Stamina +5'
		},
		strength: {
			materials: {
				vision_dust: 1,
			},
			description: 'Permanently enchants bracers to give +5 Strength.',
			effect: 'Strength +5'
		},
		superior_spirit: {
			filter: "end_game",
			materials: {
				lesser_eternal_essence: 3,
				dream_dust: 10,
			},
			description: 'Permanently enchants bracers to give +9 Spirit.',
			effect: 'Spirit +9'
		},
		superior_stamina: {
			filter: "end_game",
			materials: {
				illusion_dust: 15,
			},
			description: 'Permanently enchants bracers to give +9 Stamina.',
			effect: 'Stamina +9'
		},
		superior_strength: {
			filter: "end_game",
			materials: {
				illusion_dust: 6,
				greater_eternal_essence: 6,
			},
			description: 'Permanently enchants bracers to give +9 Strength.',
			effect: 'Strength +9'
		}
	},
	cloak: {
		defense: {
			materials: {
				small_glowing_shard: 1,
				soul_dust: 3,
			},
			description: 'Permanently enchant a cloak to give 30 additional armor.',
			effect: 'Armor +30'
		},
		dodge: {
			filter: "end_game",
			materials: {
				nexus_crystal: 3,
				large_brilliant_shard: 8,
				guardian_stone: 8,
			},
			description: 'Permanently enchant a cloak to give a 1% chance to dodge.',
			effect: '1% dodge'
		},
		fire_resistance: {
			materials: {
				lesser_mystic_essence: 1,
				elemental_fire: 1,
			},
			description: 'Permanently enchant a cloak to give 7 Fire Resistance.',
			effect: 'Fire Resistance +7'
		},
		greater_defense: {
			materials: {
				vision_dust: 3,
			},
			description: 'Permanently enchant a cloak to give 50 additional armor.',
			effect: 'Armor +50'
		},
		greater_fire_resistance: {
			filter: "end_game",
			materials: {
				nexus_crystal: 3,
				large_brilliant_shard: 8,
				essence_of_fire: 4,
			},
			description: 'Permanently enchant a cloak to give 15 fire resistance.',
			effect: 'Fire Resistance +15'
		},
		greater_nature_resistance: {
			filter: "end_game",
			materials: {
				nexus_crystal: 2,
				large_brilliant_shard: 8,
				living_essence: 4,
			},
			description: 'Permanently enchant a cloak to give 15 nature resistance.',
			effect: 'Nature Resistance +15'
		},
		greater_resistance: {
			filter: "end_game",
			materials: {
				lesser_eternal_essence: 2,
				heart_of_fire: 1,
				core_of_earth: 1,
				globe_of_water: 1,
				breath_of_wind: 1,
				ichor_of_undeath: 1,
			},
			description: 'Permanently enchant a cloak to give 5 to all resistances.',
			effect: 'All Resistance +5'
		},
		lesser_agility: {
			filter: "end_game",
			materials: {
				lesser_nether_essence: 2,
			},
			description: 'Permanently enchant a cloak to give 3 Agility.',
			effect: 'Agility +3'
		},
		lesser_fire_resistance: {
			materials: {
				fire_oil: 1,
				lesser_astral_essence: 1,
			},
			description: 'Permanently enchant a cloak so that it increases resistance to fire by 5.',
			effect: 'Fire Resistance +3'
		},
		lesser_protection: {
			materials: {
				strange_dust: 6,
				small_glimmering_shard: 1,
			},
			description: 'Permanently enchant a cloak to increase armor by 20.',
			effect: 'Armor +20'
		},
		lesser_shadow_resistance: {
			materials: {
				greater_astral_essence: 1,
				shadow_protection_potion: 1,
			},
			description: 'Permanently enchant a cloak so that it increases resistance to shadow by 10.',
			effect: 'Shadow Resistance +10'
		},
		minor_agility: {
			materials: {
				lesser_astral_essence: 1,
			},
			description: 'Permanently enchant a cloak to grant +1 Agility.',
			effect: 'Agility +1'
		},
		minor_protection: {
			materials: {
				strange_dust: 3,
				greater_magic_essence: 1,
			},
			description: 'Enchant a cloak to provide 10 additional points of armor.',
			effect: 'Armor +10'
		},
		minor_resistance: {
			materials: {
				strange_dust: 1,
				lesser_magic_essence: 2,
			},
			description: 'Permanently enchant a cloak so that it increases the resistance to all schools of magic by 1.',
			effect: 'All Resistance +1'
		},
		resistance: {
			filter: "end_game",
			materials: {
				lesser_nether_essence: 1,
			},
			description: 'Permanently enchant a cloak to give 3 to all resistances.',
			effect: 'All Resistance +3'
		},
		stealth: {
			materials: {
				nexus_crystal: 3,
				large_brilliant_shard: 8,
				black_lotus: 2,
			},
			description: 'Permanently enchant a cloak to give a increase to stealth.',
			effect: 'Stealth'
		},
		subtlety: {
			filter: "end_game",
			materials: {
				nexus_crystal: 4,
				large_brilliant_shard: 6,
				black_diamond: 2,
			},
			description: 'Permanently enchant a cloak to decrease threat caused by the wearer by 2%.',
			effect: 'Subtlety'
		},
		superior_defense: {
			filter: "end_game",
			materials: {
				illusion_dust: 8,
			},
			description: 'Permanently enchant a cloak to give 70 additional armor.',
			effect: 'Armor +70'
		}
	},
	shield: {
		frost_resistance: {
			materials: {
				filter: "end_game",
				large_radiant_shard: 1,
				frost_oil: 1,
			},
			description: 'Permanently enchant a shield to give +8 Frost Resistance.',
			effect: 'Frost Resistance +8'
		},
		greater_spirit: {
			materials: {
				greater_nether_essence: 1,
				dream_dust: 2,
			},
			description: 'Permanently enchant a shield to give +7 Spirit.',
			effect: 'Spirit +7'
		},
		greater_stamina: {
			filter: "end_game",
			materials: {
				dream_dust: 10,
			},
			description: 'Permanently enchant a shield to give +7 Stamina.',
			effect: 'Stamina +7'
		},
		lesser_block: {
			filter: "end_game",
			materials: {
				greater_mystic_essence: 2,
				vision_dust: 2,
				large_glowing_shard: 1,
			},
			description: 'Permanently enchant a shield to give +2% chance to block.',
			effect: '2% Block'
		},
		lesser_protection: {
			materials: {
				lesser_astral_essence: 1,
				strange_dust: 1,
				small_glimmering_shard: 1,
			},
			description: 'Permanently enchant a shield to increase its armor by 30.',
			effect: 'Armor +30'
		},
		lesser_spirit: {
			materials: {
				lesser_astral_essence: 2,
				strange_dust: 4,
			},
			description: 'Permanently enchant a shield to give 3 spirit.',
			effect: 'Spirit +3'
		},
		lesser_stamina: {
			materials: {
				lesser_mystic_essence: 1,
				soul_dust: 1,
			},
			description: 'Permanently enchant a shield to give 3 Stamina.',
			effect: 'Stamina +3'
		},
		minor_stamina: {
			materials: {
				lesser_astral_essence: 1,
				strange_dust: 2,
			},
			description: 'Permanently enchant a shield so that it increases the Stamina of the bearer by 1.',
			effect: 'Stamina +1'
		},
		spirit: {
			materials: {
				greater_mystic_essence: 1,
				vision_dust: 1,
			},
			description: 'Permanently enchant a shield to give 5 Spirit.',
			effect: 'Spirit +5'
		},
		stamina: {
			materials: {
				vision_dust: 5,
			},
			description: 'Permanently enchant a shield to give +5 Stamina.',
			effect: 'Stamina +5'
		},
		superior_spirit: {
			materials: {
				greater_eternal_essence: 2,
				illusion_dust: 4,
			},
			description: 'Permanently enchant a shield to give +9 Spirit.',
			effect: 'Spirit +9'
		}
	},
	chest: {
		greater_health: {
			materials: {
				soul_dust: 3,
			},
			description: 'Permanently enchant a piece of chest armor to give +35 health.',
			effect: 'Health +35'
		},
		greater_mana: {
			materials: {
				greater_mystic_essence: 1,
			},
			description: 'Permanently enchant a piece of chest armor to give +50 mana.',
			effect: 'Mana +50'
		},
		greater_stats: {
			filter: "end_game",
			materials: {
				large_brilliant_shard: 4,
				illusion_dust: 15,
				greater_eternal_essence: 10,
			},
			description: 'Permanently enchant a piece of chest armor to grant +4 to all stats.',
			effect: '+4 All Stats'
		},
		health: {
			materials: {
				strange_dust: 4,
				lesser_astral_essence: 1,
			},
			description: 'Permanently enchant a piece of chest armor to increase the health of the wearer by 25.',
			effect: 'Health +25'
		},
		lesser_absorption: {
			materials: {
				strange_dust: 2,
				greater_astral_essence: 1,
				large_glimmering_shard: 1,
			},
			description: 'Enchant a piece of chest armor so it has a 5% chance per hit of giving you 25 points of damage absorption.',
			effect: 'Lesser Absorption'
		},
		lesser_health: {
			materials: {
				strange_dust: 2,
				lesser_magic_essence: 2,
			},
			description: 'Permanently enchant a piece of chest armor so that it increases the health of the wearer by 15.',
			effect: 'Health +15'
		},
		lesser_mana: {
			materials: {
				greater_magic_essence: 1,
				lesser_magic_essence: 1,
			},
			description: 'Permanently enchant a piece of chest armor so that it increases the mana of the wearer by 20.',
			effect: 'Mana +20'
		},
		lesser_stats: {
			materials: {
				greater_mystic_essence: 2,
				vision_dust: 2,
				large_glowing_shard: 1,
			},
			description: 'Permanently enchant a piece of chest armor to grant +2 to all stats.',
			effect: '+2 All Stats'
		},
		major_health: {
			filter: "end_game",
			materials: {
				illusion_dust: 6,
				small_brilliant_shard: 1,
			},
			description: 'Permanently enchant a piece of chest armor to grant +100 health.',
			effect: 'Health +100'
		},
		major_mana: {
			filter: "end_game",
			materials: {
				greater_eternal_essence: 3,
				small_brilliant_shard: 1,
			},
			description: 'Permanently enchant a piece of chest armor to give +100 mana.',
			effect: 'Mana +100'
		},
		mana: {
			materials: {
				greater_astral_essence: 1,
				lesser_astral_essence: 2,
			},
			description: 'Permanently enchant a piece of chest armor to increase the mana of the wearer by 30.',
			effect: 'Mana +30'
		},
		minor_absorption: {
			materials: {
				strange_dust: 2,
				lesser_magic_essence: 1,
			},
			description: 'Enchant a piece of chest armor so it has a 2% chance per hit of giving you 10 points of damage absorption.',
			effect: 'Minor Absorption'
		},
		minor_health: {
			materials: {
				strange_dust: 1,
			},
			description: 'Permanently enchant a piece of chest armor so that it increases the health of the wearer by 5.',
			effect: 'Health +5'
		},
		minor_mana: {
			materials: {
				lesser_magic_essence: 1,
			},
			description: 'Permanently enchant a piece of chest armor so that it increases the mana of the wearer by 5.',
			effect: 'Mana +5'
		},
		minor_stats: {
			materials: {
				greater_astral_essence: 1,
				soul_dust: 1,
				large_glimmering_shard: 1,
			},
			description: 'Permanently enchant a piece of chest armor to grant +1 to all stats.',
			effect: '+1 All Stats'
		},
		stats: {
			materials: {
				filter: "end_game",
				large_radiant_shard: 1,
				dream_dust: 3,
				greater_nether_essence: 2,
			},
			description: 'Permanently enchant a piece of chest armor to grant +3 to all stats.',
			effect: '+3 All Stats'
		},
		superior_health: {
			materials: {
				vision_dust: 6,
			},
			description: 'Permanently enchant a piece of chest armor to grant +50 health.',
			effect: 'Health +50'
		},
		superior_mana: {
			materials: {
				greater_nether_essence: 1,
				lesser_nether_essence: 2,
			},
			description: 'Permanently enchant a piece of chest armor to give +65 mana.',
			effect: 'Mana +65'
		}
	},
	gloves: {
		advanced_herbalism: {
			materials: {
				vision_dust: 3,
				sungrass: 3,
			},
			description: 'Permanently enchant gloves to grant +5 herbalism skill.',
			effect: 'Herbalism +5'
		},
		advanced_mining: {
			materials: {
				vision_dust: 3,
				truesilver_bar: 3,
			},
			description: 'Permanently enchant gloves to grant +5 mining skill.',
			effect: 'Mining +5'
		},
		agility: {
			materials: {
				lesser_nether_essence: 1,
				vision_dust: 1,
			},
			description: 'Permanently enchant gloves to grant +5 Agility.',
			effect: 'Agility +5'
		},
		fire_power: {
			filter: "end_game",
			materials: {
				nexus_crystal: 2,
				large_brilliant_shard: 10,
				essence_of_fire: 4,
			},
			description: 'Permanently enchant gloves to increase fire damage by up to 20.',
			effect: 'Fire Damage +20'
		},
		fishing: {
			materials: {
				soul_dust: 1,
				blackmouth_oil: 3,
			},
			description: 'Permanently enchant gloves to grant +2 fishing skill.',
			effect: 'Fishing +2'
		},
		frost_power: {
			filter: "end_game",
			materials: {
				nexus_crystal: 3,
				large_brilliant_shard: 10,
				essence_of_water: 4,
			},
			description: 'Permanently enchant gloves to increase frost damage by up to 20.',
			effect: 'Frost Damage +20'
		},
		greater_agility: {
			filter: "end_game",
			materials: {
				lesser_eternal_essence: 3,
				illusion_dust: 3,
			},
			description: 'Permanently enchant gloves to grant +7 Agility.',
			effect: 'Agility +7'
		},
		greater_strength: {
			filter: "end_game",
			materials: {
				greater_eternal_essence: 4,
				illusion_dust: 4,
			},
			description: 'Permanently enchant gloves to grant +7 Strength.',
			effect: 'Strength +7'
		},
		healing_power: {
			filter: "end_game",
			materials: {
				nexus_crystal: 3,
				large_brilliant_shard: 8,
				righteous_orb: 1,
			},
<<<<<<< HEAD
			description: 'Permanently enchant gloves to increase the caster\'s healing spells by up to 30.',
			effect: 'Healing Spells +30'
=======
			description: "Permanently enchant gloves to increase the caster's healing spells by up to 30.",
			effect: 'Healing Power'
>>>>>>> 91dfd77bc5e4ec269ee8d2185d92548cf5510507
		},
		herbalism: {
			materials: {
				soul_dust: 1,
				kingsblood: 3,
			},
			description: 'Permanently enchant gloves to grant +2 herbalism skill.',
			effect: 'Herbalism +2'
		},
		mining: {
			materials: {
				soul_dust: 1,
				iron_ore: 3,
			},
			description: 'Permanently enchant gloves to grant +2 mining skill.',
			effect: 'Mining +2'
		},
		minor_haste: {
			materials: {
				large_radiant_shard: 2,
				wildvine: 2,
			},
			description: 'Permanently enchant gloves to grant a +1% attack speed bonus.',
			effect: 'Minor Haste'
		},
		riding_skill: {
			filter: "end_game",
			materials: {
				large_radiant_shard: 2,
				dream_dust: 3,
			},
			description: 'Permanently enchant gloves to grant a minor movement bonus while mounted.',
			effect: 'Riding Skill'
		},
		shadow_power: {
			filter: "end_game",
			materials: {
				nexus_crystal: 3,
				large_brilliant_shard: 10,
				essence_of_undeath: 6,
			},
			description: 'Permanently enchant gloves to increase shadow damage by up to 20.',
			effect: 'Shadow Damage +20'
		},
		skinning: {
			materials: {
				vision_dust: 1,
				green_whelp_scale: 3,
			},
			description: 'Permanently enchant gloves to grant +5 skinning skill.',
			effect: 'Skinning +5'
		},
		strength: {
			materials: {
				lesser_nether_essence: 2,
				vision_dust: 3,
			},
			description: 'Permanently enchant gloves to grant +5 Strength.',
			effect: 'Strength +5'
		},
		superior_agility: {
			filter: "end_game",
			materials: {
				nexus_crystal: 3,
				large_brilliant_shard: 8,
				essence_of_air: 4,
			},
			description: 'Permanently enchant gloves to increase agility by 15.',
			effect: 'Agility +15'
		},
		threat: {
			filter: "end_game",
			materials: {
				nexus_crystal: 4,
				large_brilliant_shard: 6,
				larval_acid: 8,
			},
			description: 'Permanently enchant gloves to increase threat from all attacks and spells by 2%.',
			effect: '2% Threat'
		}
	},
	weapon: {
		agility: {
			filter: "end_game",
			materials: {
				large_brilliant_shard: 6,
				greater_eternal_essence: 6,
				illusion_dust: 4,
				essence_of_air: 2,
			},
			description: 'Permanently enchant a melee weapon to grant +15 Agility.',
			effect: 'Agility +15'
		},
		crusader: {
			filter: "end_game",
			materials: {
				large_brilliant_shard: 4,
				righteous_orb: 2,
			},
			description: 'Permanently enchant a melee weapon so that often when attacking in melee it heals for 75 to 126 and increases Strength by 100 for 15 sec.',
			effect: 'Crusader'
		},
		demonslaying: {
			materials: {
				small_radiant_shard: 1,
				dream_dust: 2,
				elixir_of_demonslaying: 1,
			},
			description: 'Permanently enchant a melee weapon to have a chance of stunning and doing heavy damage to demons.',
			effect: 'Demonslaying'
		},
		fiery_weapon: {
			materials: {
				small_radiant_shard: 4,
				essence_of_fire: 1,
			},
			description: 'Permanently enchant a melee weapon to often strike for 40 additional fire damage.',
			effect: 'Fiery'
		},
		greater_striking: {
			materials: {
				large_radiant_shard: 2,
				greater_nether_essence: 2,
			},
			description: 'Permanently enchant a Melee Weapon to do 4 additional points of damage.',
			effect: '+4 Damage'
		},
		icy_chill: {
			filter: "end_game",
			materials: {
				small_brilliant_shard: 4,
				essence_of_water: 1,
				essence_of_air: 1,
				icecap: 1,
			},
			description: 'Permanently enchant a melee weapon to often chill the target reducing their movement and attack speed.',
			effect: 'Icy Chill'
		},
		lesser_beastslayer: {
			materials: {
				lesser_mystic_essence: 1,
				large_fang: 2,
				small_glowing_shard: 1,
			},
			description: 'Permanently enchant a Melee Weapon to do 6 additional points of damage to Beasts.',
			effect: 'Lesser Beastslayer'
		},
		lesser_elemental_slayer: {
			materials: {
				lesser_mystic_essence: 1,
				elemental_earth: 1,
				small_glowing_shard: 1,
			},
			description: 'Permanently enchant a Melee Weapon to do 6 additional damage against Elementals.',
			effect: 'Lesser Elemental Slayer'
		},
		lesser_striking: {
			materials: {
				soul_dust: 2,
				large_glimmering_shard: 1,
			},
			description: 'Permanently enchant a Melee Weapon to do 2 additional points of damage.',
			effect: '+2 Damage'
		},
		lifestealing: {
			materials: {
				large_brilliant_shard: 6,
				essence_of_undeath: 6,
				living_essence: 6,
			},
			description: 'Permanently enchant a melee weapon to often steal life from the enemy and give it to the wielder.',
			effect: 'Lifestealing'
		},
		mighty_intellect: {
			filter: "end_game",
			materials: {
				large_brilliant_shard: 15,
				greater_eternal_essence: 12,
				illusion_dust: 20,
			},
			description: 'Permanently enchant a melee weapon to grant +22 Intellect.',
			effect: 'Intellect +22'
		},
		mighty_spirit: {
			filter: "end_game",
			materials: {
				large_brilliant_shard: 10,
				greater_eternal_essence: 8,
				illusion_dust: 15,
			},
			description: 'Permanently enchant a melee weapon to grant +20 Spirit.',
			effect: 'Spirit +20'
		},
		minor_beastslayer: {
			materials: {
				strange_dust: 4,
				greater_magic_essence: 2,
			},
			description: 'Permanently enchant a Melee Weapon to do 2 additional points of damage to Beasts.',
			effect: 'Minor Beastslayer'
		},
		minor_striking: {
			materials: {
				strange_dust: 2,
				greater_magic_essence: 1,
				small_glimmering_shard: 1,
			},
			description: 'Permanently enchant a Melee Weapon to do 1 additional point of damage.',
			effect: '+1 Damage'
		},
		strength: {
			filter: "end_game",
			materials: {
				large_brilliant_shard: 6,
				greater_eternal_essence: 6,
				illusion_dust: 4,
				essence_of_earth: 2,
			},
			description: 'Permanently enchant a melee weapon to grant +15 strength.',
			effect: '+15 Strength'
		},
		striking: {
			materials: {
				greater_mystic_essence: 2,
				large_glowing_shard: 1,
			},
			description: 'Permanently enchant a Melee Weapon to do 3 additional points of damage.',
			effect: '+3 Damage'
		},
		superior_striking: {
			filter: "end_game",
			materials: {
				large_brilliant_shard: 2,
				greater_eternal_essence: 10,
			},
			description: 'Permanently enchant a Melee Weapon to do 5 additional points of damage.',
			effect: '+5 Damage'
		},
		unholy_weapon: {
			materials: {
				large_brilliant_shard: 4,
				essence_of_undeath: 4,
			},
			description: 'Permanently enchant a melee weapon to often inflict a curse on the target reducing their melee damage.',
			effect: 'Unholy'
		},
		winters_might: {
			materials: {
				greater_mystic_essence: 3,
				vision_dust: 3,
				large_glowing_shard: 1,
				wintersbite: 2,
			},
			description: 'Permanently enchant a weapon to grant up to 7 additional frost damage when casting frost spells.',
			effect: "Frost Damage +7"
		},
		agility_2h: {
			filter: "end_game",
			two_handed: true,
			materials: {
				large_brilliant_shard: 10,
				greater_eternal_essence: 6,
				illusion_dust: 14,
				essence_of_air: 4,
			},
			description: 'Permanently enchant a two-handed melee weapon to grant +25 Agility.',
			effect: 'Agility +25'
		},
		greater_impact: {
			two_handed: true,
			materials: {
				large_radiant_shard: 2,
				dream_dust: 2,
			},
			description: 'Permanently enchant a two-handed melee weapon to do +7 damage.',
			effect: '+7 Damage'
		},
		impact: {
			two_handed: true,
			materials: {
				vision_dust: 4,
				large_glowing_shard: 1,
			},
			description: 'Permanently enchant a Two-handed Melee Weapon to do 5 additional points of damage.',
			effect: '+5 Damage'
		},
		lesser_impact: {
			two_handed: true,
			materials: {
				soul_dust: 3,
				large_glimmering_shard: 1,
			},
			description: 'Permanently enchant a Two-handed Melee Weapon to do 3 additional points of damage.',
			effect: '+3 Damage'
		},
		lesser_intellect: {
			two_handed: true,
			materials: {
				greater_magic_essence: 3,
			},
			description: 'Permanently enchant a Two-Handed Melee Weapon to add 3 to intellect.',
			effect: 'Intellect +3'
		},
		lesser_spirit: {
			two_handed: true,
			materials: {
				lesser_astral_essence: 1,
				strange_dust: 6,
			},
			description: 'Permanently enchant a Two-Handed Melee Weapon to add 3 to Spirit.',
			effect: 'Spirit +3'
		},
		major_intellect: {
			two_handed: true,
			filter: "end_game",
			materials: {
				greater_eternal_essence: 12,
				large_brilliant_shard: 2,
			},
			description: 'Permanently enchant a Two-Handed Melee Weapon to add 9 to intellect.',
			effect: 'Intellect +9'
		},
		major_spirit: {
			two_handed: true,
			filter: "end_game",
			materials: {
				greater_eternal_essence: 12,
				large_brilliant_shard: 2,
			},
			description: 'Permanently enchant a Two-Handed Melee Weapon to add 9 to Spirit.',
			effect: 'Spirit +9'
		},
		minor_impact: {
			two_handed: true,
			materials: {
				strange_dust: 4,
				small_glimmering_shard: 1,
			},
			description: 'Permanently enchant a Two-Handed Melee Weapon to do 2 additional points of damage.',
			effect: 'Damage +2'
		},
		superior_impact: {
			two_handed: true,
			filter: "end_game",
			materials: {
				large_brilliant_shard: 4,
				illusion_dust: 10,
			},
			description: 'Permanently enchant a two-handed melee weapon to do +9 damage.',
			effect: 'Damage +9'
		}
	},

	head: {

		arcanum_of_focus: {
			filter: "end_game",
			name: 'Arcanum of Focus',
			effect: '+8 Spell DMG/HEAL',
			materials: {
				libram_of_focus: 1,
				pristine_black_diamond: 1,
				large_brilliant_shard: 4,
				skin_of_shadow: 2
			}
		},

		lesser_arcanum_of_constitution: {
			filter: "end_game",
			name: 'Arcanum of Constitution',
			effect: '+100 Health',
			materials: {
				black_diamond: 1,
				lung_juice_cocktail: 1,
				libram_of_constitution: 1,
				night_dragons_breath: 4,
				gold: 30
			}
		},

		lesser_arcanum_of_rumination: {
			filter: "end_game",
			name: 'Arcanum of Rumination',
			effect: '+150 Mana',
			materials: {
				black_diamond: 1,
				black_blood_of_the_tormented: 1,
				gizzard_gum: 1,
				libram_of_rumination: 1,
				gold: 30
			},
			description: 'Permanently adds 150 mana to a leg or head slot item. Does not stack with other enchantments for the selected equipment slot.'
		},

		lesser_arcanum_of_voracity: {
			filter: "end_game",
			name: 'Arcanum of Voracity',
			effect: '+8 to Single Stat',
			materials: {
				black_diamond: 1,
				libram_of_voracity: 1,
				whipper_root_tuber: 4,
				crystal_force: 4,
				gold: 30
			}
		},

		lesser_arcanum_of_resilience: {
			filter: "end_game",
			name: 'Arcanum of Resilience',
			effect: '+20 Fire Resistance',
			materials: {
				black_diamond: 1,
				crystal_spire: 4,
				burning_essence: 1,
				libram_of_resilience: 1,
				gold: 30
			}
		}
	},

	legs: {

		arcanum_of_focus: {
			filter: "end_game",
			name: 'Arcanum of Focus',
			effect: '+8 Spell DMG/HEAL',
			materials: {
				libram_of_focus: 1,
				pristine_black_diamond: 1,
				large_brilliant_shard: 4,
				skin_of_shadow: 2
			}
		},

		lesser_arcanum_of_constitution: {
			filter: "end_game",
			name: 'Arcanum of Constitution',
			effect: '+100 Health',
			materials: {
				black_diamond: 1,
				lung_juice_cocktail: 1,
				libram_of_constitution: 1,
				night_dragons_breath: 4,
				gold: 30
			}
		},

		lesser_arcanum_of_rumination: {
			filter: "end_game",
			name: 'Arcanum of Rumination',
			effect: '+150 Mana',
			materials: {
				black_diamond: 1,
				black_blood_of_the_tormented: 1,
				gizzard_gum: 1,
				libram_of_rumination: 1,
				gold: 30
			},
			description: 'Permanently adds 150 mana to a leg or head slot item. Does not stack with other enchantments for the selected equipment slot.'
		},

		lesser_arcanum_of_voracity: {
			filter: "end_game",
			name: 'Arcanum of Voracity',
			effect: '+8 to Single Stat',
			materials: {
				black_diamond: 1,
				libram_of_voracity: 1,
				whipper_root_tuber: 4,
				crystal_force: 4,
				gold: 30
			}
		},

		lesser_arcanum_of_resilience: {
			filter: "end_game",
			name: 'Arcanum of Resilience',
			effect: '+20 Fire Resistance',
			materials: {
				black_diamond: 1,
				crystal_spire: 4,
				burning_essence: 1,
				libram_of_resilience: 1,
				gold: 30
			}
		}
	}
}

const materials = {
	black_diamond: {
		rarity: 'uncommon'
	},
	black_lotus: {
		rarity: 'uncommon',
		stack: 10
	},
	righteous_orb: {
		rarity: 'uncommon',
		stack: 10
	},
	golden_pearl: {
		rarity: 'uncommon',
		stack: 10
	},
	living_essence: {
		rarity: 'uncommon',
		stack: 10
	},
	essence_of_undeath: {
		rarity: 'uncommon',
		stack: 10
	},
	essence_of_fire: {
		rarity: 'uncommon',
		stack: 10
	},
	essence_of_water: {
		rarity: 'uncommon',
		stack: 10
	},
	essence_of_earth: {
		rarity: 'uncommon',
		stack: 10
	},
	essence_of_air: {
		rarity: 'uncommon',
		stack: 10
	},
	lesser_nether_essence: {
		rarity: 'uncommon',
		stack: 10,
		use: 'Turn three lesser nether essences into a greater one.'
	},
	greater_nether_essence: {
		rarity: 'uncommon',
		stack: 10,
		use: 'Turn a greater nether essence into three lesser ones.'
	},
	lesser_eternal_essence: {
		rarity: 'uncommon',
		stack: 10,
		use: 'Turn three lesser eternal essences into a greater one.'
	},
	greater_eternal_essence: {
		rarity: 'uncommon',
		stack: 10,
		use: 'Turn a greater eternal essence into three lesser ones.'
	},
	vision_dust: {
		rarity: 'common',
		stack: 20
	},
	dream_dust: {
		rarity: 'common',
		stack: 20
	},
	illusion_dust: {
		rarity: 'common',
		stack: 20
	},

	small_radiant_shard: {
		rarity: 'rare',
		stack: 20
	},
	large_radiant_shard: {
		rarity: 'rare',
		stack: 20
	},
	large_brilliant_shard: {
		rarity: 'rare',
		stack: 20
	},
	small_brilliant_shard: {
		rarity: 'rare',
		stack: 20
	},
	nexus_crystal: {
		rarity: 'epic',
		stack: 20
	}
}
