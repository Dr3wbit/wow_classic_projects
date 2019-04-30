const talentData = {
	classes: [
		{
			name: 'warlock',
			tree_talents: [
				{
					name: 'Affliction',
					talents: [{
							name: "Suppression",
							image: "suppression.jpg",
							x: 2,
							y: function() {
								return this.x * this.invested
							},
							description: function() {
								return `Reduces the chance for enemies to resist your Affliction spells by ${this.y()}%.`
							},
							maxRank: 5,
				},
						{
							name: "Improved Corruption",
							image: "improved_corruption.jpg",
							x: 0.4,
							y: function() {
								return parseFloat(this.x * this.invested).toFixed(1)
							}, // issue: prints 2 as 2.0
							description: function() {
								return `Reduces the casting time of your Corruption spell by ${this.y()} sec.`
							},

							maxRank: 5,

				},
						{
							name: "Improved Curse of Weakness",
							image: "improved_curse_of_weakness.jpg",
							x: 6.6666666,
							y: function() {
								return Math.round(this.x * this.invested - 0.333333)
							},
							description: function() {
								return `Increases the effect of your Curse of Weakness by ${this.y()}%.`
							},
							maxRank: 3,
				},
						{
							name: "Improved Drain Soul",
							image: "improved_drain_soul.jpg",
							x: 50,
							y: function() {
								return this.x * this.invested
							},
							description: function() {
								return `Gives you a ${this.y()}% chance to get a 100% increase to your Mana regeneration for 10 sec if the target is killed by you while you drain its soul.  In addition your Mana may continue to regenerate while casting at 50% of normal.`
							},
							maxRank: 2,
				},
						{
							name: "Improved Life Tap",
							image: "improved_life_tap.jpg",
							x: 10,
							y: function() {
								return this.x * this.invested
							},
							description: function() {
								return `Increases the amount of Mana awarded by your Life Tap spell by ${this.y()}%.`
							},
							maxRank: 2,
				},
						{
							name: "Improved Drain Life",
							image: "improved_drain_life.jpg",
							x: 2,
							y: function() {
								return this.x * this.invested
							},
							description: function() {
								return `Increases the Health drained by your Drain Life spell by ${this.y()}%.`
							},
							maxRank: 5,
				},
						{
							name: "Improved Curse of Agony",
							image: "improved_curse_of_agony.jpg",
							x: 2,
							y: function() {
								return this.x * this.invested
							},
							description: function() {
								return `Increases the damage done by your Curse of Agony by ${this.y()}%.`
							},
							maxRank: 3,
				},
						{
							name: "Fel Concentration",
							image: "fel_concentration.jpg",
							x: 14,
							y: function() {
								return this.x * this.invested
							},
							description: function() {
								return `Gives you a ${this.y()}% chance to avoid interruption caused by damage while channeling the Drain Life, Drain Mana, or Drain Soul spell.`
							},
							maxRank: 5,
				},
						{
							name: "Amplify Curse",
							image: "amplify_curse.jpg",
							description: function() {
								return `Increases the effect of your next Curse of Weakness or Curse of Agony by 50%, or your next Curse of Exhaustion by 20%.  Lasts 30 sec.`
							},
							maxRank: 1,
							unlocks: "Curse of Exhaustion"
				},
						{
							name: "Grim Reach",
							image: "grim_reach.jpg",
							x: 10,
							y: function() {
								return this.x * this.invested
							},
							description: function() {
								return `Increases the range of your Affliction spells by ${this.y()}%.`
							},
							maxRank: 2,
				},
						{
							name: "Nightfall",
							image: "nightfall.jpg",
							x: 2,
							y: function() {
								return this.x * this.invested
							},
							description: function() {
								return `Gives your Corruption and Drain Life spells a ${this.y()}% chance to cause you to enter a Shadow Trance state after damaging the opponent.  The Shadow Trance state reduces the casting time of your next Shadow Bolt spell by 100%.`
							},
							maxRank: 2,
				},
						{
							name: "Improved Drain Mana",
							image: "improved_drain_mana.jpg",
							x: 15,
							y: function() {
								return this.x * this.invested
							},
							description: function() {
								return `Causes ${this.y()}% of the Mana drained by your Drain Mana spell to damage the opponent.`
							},
							maxRank: 2,
				},
						{
							name: "Siphon Life",
							image: "siphon_life.jpg",
							description: function() {
								return `Transfers 15 health from the target to the caster every 3 sec.  Lasts 30 sec.`
							},
							maxRank: 1,
							unlocks: "Shadow Mastery"
				},
						{
							name: "Curse of Exhaustion",
							image: "curse_of_exhaustion.jpg",
							description: function() {
								return `Reduces the target's movement speed by 10% for 12 sec.  Only one Curse per Warlock can be active on any one target.`
							},
							maxRank: 1,
							locked: "locked",
							prereq: "amplify_curse",
							unlocks: "Improved Curse of Exhaustion"
				},
						{
							name: "Improved Curse of Exhaustion",
							image: "curse_of_exhaustion.jpg",
							x: 5,
							y: function() {
								return this.x * this.invested
							},
							description: function() {
								return `Increases the speed reduction of your Curse of Exhaustion by ${this.y()}%.`
							},
							maxRank: 4,
							prereq: "curse_of_exhaustion",
							locked: "locked"
				},
						{
							name: "Shadow Mastery",
							image: "shadow_mastery.jpg",
							x: 2,
							y: function() {
								return this.x * this.invested
							},
							description: function() {
								return `Increases the damage dealt or life drained by your Shadow spells by ${this.y()}%.`
							},
							maxRank: 5,
							locked: "locked"
				},
						{
							name: "Dark Pact",
							image: "dark_pact.jpg",
							description: function() {
								return `Drains 150 of your pet's Mana, returning 100% to you.`
							},
							maxRank: 1,
				}]
			},
				{
					name: 'Demonology',
					talents: [{
						name: 'Improved Healthstone',
						maxRank: 2,
						x: 2,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Increases the amount of Health restored by your Healthstone by ${this.y()}%.`
						},
						image: "improved_healthstone.jpg"
				}, {
						name: 'Improved Imp',
						maxRank: 3,
						x: 10,
						description: function() {
							return `Increases the effect of your Imp's Firebolt, Fire Shield, and Blood Pact spells by ${this.y()}%.`
						},
						image: "improved_imp.jpg"
				}, {
						name: 'Demonic Embrace',
						maxRank: 5,
						x: [3, 1],
						y: function() {
							return [this.x[0] * this.invested, this.x[1] * this.invested]
						},
						description: function() {
							return `Increases your total Stamina by ${this.y()[0]}% but reduces your total Spirit by ${this.y()[1]}%.`
						},
						image: "demonic_embrace.jpg"
				}, {
						name: 'Improved Health Funnel',
						maxRank: 2,
						x: 10,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Increases the amount of Health transferred by your Health Funnel spell by ${this.y()}%.`
						},
						description: ['Increases the amount of Health transferred by your Health Funnel spell by 10%.', 'Increases the amount of Health transferred by your Health Funnel spell by 20%.'],
						image: "demonic_embrace.jpg"
				}, {
						name: 'Improved Voidwalker',
						maxRank: 3,
						x: 10,
						description: function() {
							return `Increases the effectiveness of your Voidwalker's Torment, Consume Shadows, Sacrifice and Suffering spells by ${this.y()}%.`
						},
						image: "improved_voidwalker.jpg"
				}, {
						name: 'Fel Intellect',
						maxRank: 5,
						x: 3,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Increases the maximum Mana of your Imp, Voidwalker, Succubus, and Felhunter by ${this.y()}%.`
						},
						image: "fel_intellect.jpg"
				}, {
						name: 'Improved Succubus',
						maxRank: 3,
						x: 10,
						description: function() {
							return `Increases the effect of your Succubus' Lash of Pain and Soothing Kiss spells by 10%, and increases the duration of your Succubus' Seduction and Lesser Invisibility spells by 10%.`
						},
						description: ["Increases the effect of your Succubus' Lash of Pain and Soothing Kiss spells by 10%, and increases the duration of your Succubus' Seduction and Lesser Invisibility spells by 10%.", "Increases the effect of your Succubus' Lash of Pain and Soothing Kiss spells by 20%, and increases the duration of your Succubus' Seduction and Lesser Invisibility spells by 20%.", "Increases the effect of your Succubus' Lash of Pain and Soothing Kiss spells by 30%, and increases the duration of your Succubus' Seduction and Lesser Invisibility spells by 30%."],
						image: "improved_succubus.jpg"
				}, {
						name: 'Fel Domination',
						maxRank: 1,
						description: function() {
							return `Your next Imp, Voidwalker, Succubus, or Felhunter Summon spell has its casting time reduced by 5.5 sec and its Mana cost reduced by 50%.`
						},
						image: "fel_domination.jpg"
				}, {
						name: 'Fel Stamina',
						maxRank: 5,
						x: 3,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Increases the maximum Health of your Imp, Voidwalker, Succubus, and Felhunter by ${this.y()}%.`
						},
						image: "fel_stamina.jpg"
				}, {
						name: 'Master Summoner',
						maxRank: 2,
						x: [2, 20],
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Reduces the casting time of your Imp, Voidwalker, Succubus, and Felhunter Summoning spells by 2 sec and the Mana cost by 20%.`
						},
						description: ['Reduces the casting time of your Imp, Voidwalker, Succubus, and Felhunter Summoning spells by 2 sec and the Mana cost by 20%.', 'Reduces the casting time of your Imp, Voidwalker, Succubus, and Felhunter Summoning spells by 4 sec and the Mana cost by 40%.'],
						r: [7, 1],
						locked: "locked",
						image: "master_summoner.jpg"
				}, {
						name: 'Unholy Power',
						maxRank: 5,
						x: 4,
						description: function() {
							return `Increases the damage done by your Voidwalker, Succubus, and Felhunter's melee attacks by ${this.y()}%.`
						},
						image: "unholy_power.jpg"
				}, {
						name: 'Improved Enslave Demon',
						x: 2,
						maxRank: 5,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Reduces the Attack Speed and Casting Speed penalty of your Enslave Demon spell by ${this.y()}% and reduces the resist chance by ${this.y()}%.`
						},
						image: "improved_enslave_demon.jpg"
				}, {
//NOTE
						name: 'Demonic Sacrifice',
						maxRank: 1,
						description: ['When activated, sacrifices your summoned demon to grant you an effect that lasts 30 min.  The effect is canceled if any Demon is summoned.\n\nImp: Increases your Fire damage by 15%.\n\nVoidwalker: Restores 3% of total Health every 4 sec.\n\nSuccubus: Increases your Shadow damage by 15%.\n\nFelhunter: Restores 2% of total Mana every 4 sec.'],
						image: "demonic_sacrifice.jpg"
				}, {

						name: 'Improved Firestone',
						maxRank: 2,
						x: 15,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Increases the bonus Fire damage from Firestones and the Firestone effect by ${this.y()}%.`
						},
						image: "improved_firestone.jpg"
				}, {
//NOTE
						name: 'Master Demonologist',
						maxRank: 5,
						description: ['Grants both the Warlock and the summoned demon an effect as long as that demon is active.\nImp - Reduces threat caused by 4%.\n\nVoidwalker - Reduces physical damage taken by 2%.\n\nSuccubus - Increases all damage caused by 2%.\n\nFelhunter - Increases all resistances by .2 per level.', 'Grants both the Warlock and the summoned demon an effect as long as that demon is active.\n\nImp - Reduces threat caused by 8%.\n\nVoidwalker - Reduces physical damage taken by 4%.\n\nSuccubus - Increases all damage caused by 4%.\n\nFelhunter - Increases all resistances by .4 per level.', 'Grants both the Warlock and the summoned demon an effect as long as that demon is active.\n\nImp - Reduces threat caused by 12%.\n\nVoidwalker - Reduces physical damage taken by 6%.\n\nSuccubus - Increases all damage caused by 6%.\n\nFelhunter - Increases all resistances by .6 per level.', 'Grants both the Warlock and the summoned demon an effect as long as that demon is active.\n\nImp - Reduces threat caused by 16%.\n\nVoidwalker - Reduces physical damage taken by 8%.\n\nSuccubus - Increases all damage caused by 8%.\n\nFelhunter - Increases all resistances by .8 per level.', 'Grants both the Warlock and the summoned demon an effect as long as that demon is active.\n\nImp - Reduces threat caused by 20%.\n\nVoidwalker - Reduces physical damage taken by 10%.\n\nSuccubus - Increases all damage caused by 10%.\n\nFelhunter - Increases all resistances by 1 per level.'],
						r: [10, 5],
						locked: "locked",
						image: "master_demonologist.jpg"
				}, {
						name: 'Soul Link',
						maxRank: 1,
						description: function() {
							return `When active, 30% of all damage taken by the caster is taken by your Imp, Voidwalker, Succubus, or Felhunter demon instead.  In addition, both the demon and master will inflict 3% more damage.  Lasts as long as the demon is active.`
						},
						r: [12, 1],
						locked: "locked",
						image: "soul_link.jpg"
				}, {
						name: 'Improved Spellstone',
						x: 15,
						maxRank: 2,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Increases the amount of damage absorbed by your Spellstone by ${this.y()}%.`
						},
						image: "improved_spellstone.jpg"
				}]
			},
				{
					name: 'Destruction',
					talents: [{
						name: 'Improved Shadow Bolt',
						maxRank: 5,
						x: 4,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Your Shadow Bolt critical strikes increase Shadow damage dealt to the target by ${this.y()}% until 4 non-periodic damage sources are applied.  Effect lasts a maximum of 12 sec.`
						},
						image: "improved_shadow_bolt.jpg"
				}, {
						name: 'Cataclysm',
						x: 1,
						maxRank: 5,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Reduces the Mana cost of your Destruction spells by ${this.y()}%.`
						},
						image: "cataclysm.jpg"
				}, {
						name: 'Bane',
						maxRank: 5,
						x: [0.1, 0.4],
						y: function() {
							return [this.x[0] * this.invested, this.x[1] * this.invested]
						},
						description: function() {
							return `Reduces the casting time of your Shadow Bolt and Immolate spells by ${this.y()[0]} sec and your Soul Fire spell by ${this.y()[1]} sec.`
						},
						image: "bane.jpg"
				}, {
						name: 'Aftermath',
						maxRank: 5,
						x: 2,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Gives your Destruction spells a ${this.y()}% chance to daze the target for 5 sec.`
						},
						image: "aftermath.jpg"
				}, {
						name: 'Improved Firebolt',
						maxRank: 2,
						x: 0.5,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Reduces the casting time of your Imp's Firebolt spell by ${this.y()} sec.`
						},
						image: "improved_firebolt.jpg"
				}, {
						name: 'Improved Lash of Pain',
						x: 3,
						maxRank: 2,
						description: function() {
							return `Reduces the cooldown of your Succubus' Lash of Pain spell by ${this.y()} sec.`
						},
						image: "improved_lash_of_pain.jpg"
				}, {
						name: 'Devastation',
						maxRank: 5,
						x: 1,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Increases the critical strike chance of your Destruction spells by ${this.y()}%.`
						},
						image: "devastation.jpg"
				}, {
						name: 'Shadowburn',
						maxRank: 1,
						description: function() {
							return `Instantly blasts the target for 87 to 100 Shadow damage.  If the target dies within 5 sec of Shadowburn, and yields experience or honor, the caster gains a Soul Shard.`
						},
						image: "shadowburn.jpg"
				}, {
						name: 'Intensity',
						maxRank: 2,
						x: 35,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Gives you a ${this.y()}% chance to resist interruption caused by damage while channeling the Rain of Fire, Hellfire or Soul Fire spell.`
						},
						image: "intensity.jpg"
				}, {
						name: 'Destructive Reach',
						maxRank: 2,
						x: 10,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Increases the range of your Destruction spells by ${this.y()}%.`
						},
						image: "destructive_reach.jpg"
				}, {
						name: 'Improved Searing Pain',
						maxRank: 5,
						x: 2,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Increases the critical strike chance of your Searing Pain spell by ${this.y()}%.`
						},
						image: "improved_searing_pain.jpg"
				}, {
						name: 'Pyroclasm',
						maxRank: 2,
						x: 13,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Gives your Rain of Fire, Hellfire, and Soul Fire spells a ${this.y()}% chance to stun the target for 3 sec.`
						},
						r: [8, 2],
						locked: "locked",
						image: "pyroclasm.jpg"
				}, {
						name: 'Improved Immolate',
						maxRank: 5,
						x: 5,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Increases the initial damage of your Immolate spell by ${this.y()}%.`
						},
						image: "improved_immolate.jpg"
				}, {
						name: 'Ruin',
						maxRank: 1,
						description: function() {
							return `Increases the critical strike damage bonus of your Destruction spells by 100%.`
						},
						r: [6, 5],
						locked: "locked",
						image: "ruin.jpg"
				}, {
						name: 'Emberstorm',
						maxRank: 5,
						x: 2,
						y: function() {
							return this.x * this.invested
						},
						description: function() {
							return `Increases the damage done by your Fire spells by ${this.y()}%.`
						},
						image: "emberstorm.jpg"
				}, {
						name: 'Conflagrate',
						maxRank: 1,
						description: function() {
							return `Ignites a target that is already afflicted by Immolate, dealing 240 to 307 Fire damage and consuming the Immolate spell.`
						},
						r: [12, 5],
						locked: "locked",
						image: "conflagrate.jpg"
				}]
			}]

		},
		{
			name: 'mage',
			tree_talents: [{
				name: 'Arcane',
				talents: [{
					name: 'Arcane Subtlety',
					maxRank: 2,
					x: [5,20],
					y: function() {
						return [this.x[0] * this.invested, this.x[1] * this.invested]
					},
					description: function() {
						return `Reduces your target's resistance to all your spells by ${this.y()[0]} and reduces the threat caused by your Arcane spells by ${this.y()[1]}%.`
					},
					image: "arcane_subtlety.jpg"
				}, {
					name: 'Arcane Focus',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the chance that the opponent can resist your Arcane spells by ${this.y()}%.`
					},
					image: "arcane_focus.jpg"
				}, {
					name: 'Improved Arcane Missiles',
					maxRank: 5,
					x: 20,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a ${this.y()}% chance to avoid interruption caused by damage while channeling Arcane Missiles.`
					},
					image: "improved_arcane_missiles.jpg"
				}, {
					name: 'Wand Specialization',
					maxRank: 2,
					x: 12.5,
					y: function() {
						return Math.ceil(this.x * this.invested)
					},
					description: function() {
						return `Increases your damage with Wands by ${this.y()}%.`
					},
					image: "wand_specialization.jpg"
				}, {
					name: 'Magic Absorption',
					maxRank: 5,
					x: [2,1],
					y: function() {
						return [this.x[0] * this.invested, this.x[1] * this.invested]
					},
					description: function() {
						return `Increases all resistances by ${this.y()[0]} and causes all spells you fully resist to restore ${this.y()[1]}% of your total mana.  1 sec. cooldown.`
					},
					image: "magic_absorption.jpg"
				}, {
					name: 'Arcane Concentration',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a ${this.y()}% chance of entering a Clearcasting state after any damage spell hits a target.  The Clearcasting state reduces the mana cost of your next damage spell by 100%.`
					},
					image: "arcane_concentration.jpg"
				}, {
					name: 'Magic Attunement',
					maxRank: 2,
					x: 25,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the effect of your Amplify Magic and Dampen Magic spells by ${this.y()}%.`
					},
					image: "magic_attunement.jpg"
				}, {
					name: 'Improved Arcane Explosion',
					maxRank: 3,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike chance of your Arcane Explosion spell by an additional ${this.y()}%.`
					},
					image: "improved_arcane_explosion.jpg"
				}, {
					name: 'Arcane Resilience',
					maxRank: 1,
					description: function() {
						return `Increases your armor by an amount equal to 50% of your Intellect.`
					},
					image: "arcane_resilience.jpg"
				}, {
					name: 'Improved Mana Shield',
					maxRank: 2,
					x: 10,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Decreases the mana lost per point of damage taken when Mana Shield is active by ${this.y()}%.`
					},
					image: "improved_mana_shield.jpg"
				}, {
					name: 'Improved Counterspell',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Counterspell a 50% chance to silence the target for 4 sec.`
					},
					description: ['Gives your Counterspell a 50% chance to silence the target for 4 sec.', 'Gives your Counterspell a 100% chance to silence the target for 4 sec.'],
					image: "improved_counterspell.jpg"
				}, {
					name: 'Arcane Meditation',
					maxRank: 3,
					x: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Allows ${this.y()}% of your Mana regeneration to continue while casting.`
					},
					image: "arcane_meditation.jpg"
				}, {
					name: 'Presence of Mind',
					maxRank: 1,
					description: function() {
						return `When activated, your next Mage spell with a casting time less than 10 sec becomes an instant cast spell.`
					},
					image: "presence_of_mind.jpg"
				}, {
					name: 'Arcane Mind',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your maximum Mana by ${this.y()}%.`
					},
					r: [8, 1],
					locked: "locked",
					image: "arcane_mind.jpg"
				}, {
					name: 'Arcane Instability',
					maxRank: 3,
					x: 1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your spell damage and critical strike chance by ${this.y()}%.`
					},
					r: [12, 1],
					locked: "locked",
					image: "arcane_instability.jpg"
				}, {
					name: 'Arcane Power',
					maxRank: 1,
					description: function() {
						return `When activated, your spells deal 30% more damage while costing 30% more mana to cast.  This effect lasts 15 sec.`
					},
					r: [14, 3],
					locked: "locked",
					image: "arcane_power.jpg"
				}]
			}, {
				name: 'Fire',
				talents: [{
					name: 'Improved Fireball',
					x: 0.1,
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the casting time of your Fireball spell by ${this.y()} sec.`
					},
					image: "improved_fireball.jpg"
				}, {
					name: 'Impact',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Fire spells a ${this.y()}% chance to stun the target for 2 sec.`
					},
					image: "impact.jpg"
				}, {
					name: 'Ignite',
					maxRank: 5,
					x: 8,
					description: function() {
						return `Your critical strikes from Fire damage spells cause the target to burn for an additional ${this.y()}% of your spell's damage over 4 sec.`
					},
					image: "ignite.jpg"
				}, {
					name: 'Flame Throwing',
					maxRank: 2,
					x: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the range of your Fire spells by ${this.y()} yards.`
					},
					image: "flame_throwing.jpg"
				}, {
					name: 'Improved Fire Blast',
					maxRank: 3,
					x: 0.5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cooldown of your Fire Blast spell by ${this.y()} sec.`
					},
					image: "improved_fire_blast.jpg"
				}, {
					name: 'Incinerate',
					maxRank: 2,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike chance of your Fire Blast and Scorch spells by ${this.y()}%.`
					},
					image: "incinerate.jpg"
				}, {
					name: 'Improved Flamestrike',
					maxRank: 3,
					x: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike chance of your Flamestrike spell by ${this.y()}%.`
					},
					image: "improved_flamestrike.jpg"
				}, {
					name: 'Pyroblast',
					maxRank: 1,
					description: function() {
						return `Hurls an immense fiery boulder that causes 141 to 188 Fire damage and an additional 56 Fire damage over 12 sec.`
					},
					image: "pyroblast.jpg"
				}, {
					name: 'Burning Soul',
					x: 35,
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Fire spells a 35% chance to not lose casting time when you take damage and reduces the threat caused by your Fire spells by 15%.`
					},
					description: ['Gives your Fire spells a 35% chance to not lose casting time when you take damage and reduces the threat caused by your Fire spells by 15%.', 'Gives your Fire spells a 70% chance to not lose casting time when you take damage and reduces the threat caused by your Fire spells by 30%.'],
					image: "burning_soul.jpg"
				}, {
					name: 'Improved Scorch',
					x: 33.34,
					maxRank: 3,
					y: function() {
						return Math.floor(this.x) * this.invested
					},
					description: function() {
						return `Your Scorch spells have a ${this.y()}% chance to cause your target to be vulnerable to Fire damage.  This vulnerability increases the Fire damage dealt to your target by 3% and lasts 30 sec.  Stacks up to 3 times.`
					},
					image: "improved_scorch.jpg"
				}, {
					name: 'Improved Fire Ward',
					maxRank: 2,
					x: 10,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Causes your Fire Ward to have a ${this.y()}% chance to reflect Fire spells while active.`
					},
					image: "improved_fire_ward.jpg"
				}, {
					name: 'Master of Elements',
					maxRank: 3,
					x: 10,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Your Fire and Frost spell criticals will refund ${this.y()}% of their base mana cost.`
					},
					image: "master_of_elements.jpg"
				}, {
					name: 'Critical Mass',
					maxRank: 3,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike chance of your Fire spells by 2%.`
					},
					description: ['Increases the critical strike chance of your Fire spells by 2%.', 'Increases the critical strike chance of your Fire spells by 4%.', 'Increases the critical strike chance of your Fire spells by 6%.'],
					image: "critical_mass.jpg"
				}, {
					name: 'Blast Wave',
					maxRank: 1,
					description: function() {
						return `A wave of flame radiates outward from the caster, damaging all enemies caught within the blast for 154 to 187 Fire damage, and dazing them for 6 sec.`
					},
					r: [7, 1],
					locked: "locked",

					image: "blast_wave.jpg"
				}, {
					name: 'Fire Power',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your Fire spells by ${this.y()}%.`
					},
					image: "fire_power.jpg"
				}, {
					name: 'Combustion',
					maxRank: 1,
					description: function() {
						return `When activated, this spell causes each of your Fire damage spell hits to increase your critical strike chance with Fire damage spells by 10%.  This effect lasts until you have caused 3 critical strikes with Fire spells.`
					},
					r: [12, 3],
					locked: "locked",
					image: "combustion.jpg"
				}]
			}, {
				name: 'Frost',
				talents: [{
					name: 'Frost Warding',
					maxRank: 2,
					x: [15,10],
					y: function() {
						return [this.x[0] * this.invested, this.x[1] * this.invested]
					},
					description: function() {
						return `Increases the armor and resistances given by your Frost Armor and Ice Armor spells by ${this.y()[0]}%.  In addition, gives your Frost Ward a ${this.y()[0]}% chance to reflect Frost spells and effects while active.`
					},
					image: "frost_warding.jpg"
				}, {
					name: 'Improved Frostbolt',
					maxRank: 5,
					x: 0.1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the casting time of your Frostbolt spell by 0.1 sec.`
					},
					description: ['Reduces the casting time of your Frostbolt spell by 0.1 sec.', 'Reduces the casting time of your Frostbolt spell by 0.2 sec.', 'Reduces the casting time of your Frostbolt spell by 0.3 sec.', 'Reduces the casting time of your Frostbolt spell by 0.4 sec.', 'Reduces the casting time of your Frostbolt spell by 0.5 sec.'],
					image: "improved_frostbolt.jpg"
				}, {
					name: 'Elemental Precision',
					maxRank: 3,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the chance that the opponent can resist your Frost and Fire spells by ${this.y()}%.`
					},
					image: "elemental_precision.jpg"
				}, {
					name: 'Ice Shards',
					maxRank: 5,
					x: 20,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike damage bonus of your Frost spells by ${this.y()}%.`
					},
					image: "ice_shards.jpg"
				}, {
					name: 'Frostbite',
					maxRank: 3,
					x: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Chill effects a ${this.y()}% chance to freeze the target for 5 sec.`
					},
					image: "frostbite.jpg"
				}, {
					name: 'Improved Frost Nova',
					maxRank: 2,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cooldown of your Frost Nova spell by ${this.y()} sec.`
					},
					image: "improved_frost_nova.jpg"
				}, {
					name: 'Permafrost',
					maxRank: 3,
					x: [1, 3.33],
					y: function() {
						return [this.x[0] * this.invested, Math.ceil(this.x[1]) * this.invested]
					},
					description: function() {
						return `Increases the duration of your Chill effects by 1 sec and reduces the target's speed by an additional 4%.`
					},
					image: "permafrost.jpg"
				}, {
					name: 'Piercing Ice',
					maxRank: 3,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your Frost spells by ${this.y()}%.`
					},
					image: "piercing_ice.jpg"
				}, {
					name: 'Cold Snap',
					maxRank: 1,
					description: function() {
						return `When activated, this spell finishes the cooldown on all of your Frost spells.`
					},
					image: "cold_snap.jpg"
				}, {
//NOTE
					name: 'Improved Blizzard',
					maxRank: 3,
					description: function() {
						return `Adds a chill effect to your Blizzard spell.  This effect lowers the target's movement speed by 30%.  Lasts 2 sec.`
					},
					description: ["Adds a chill effect to your Blizzard spell.  This effect lowers the target's movement speed by 30%.  Lasts 2 sec.", "Adds a chill effect to your Blizzard spell.  This effect lowers the target's movement speed by 50%.  Lasts 2 sec.", "Adds a chill effect to your Blizzard spell.  This effect lowers the target's movement speed by 65%.  Lasts 2 sec."],
					image: "improved_blizzard.jpg"
				}, {
					name: 'Arctic Reach',
					maxRank: 2,
					x: 10,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the range of your Frostbolt and Blizzard spells and the radius of your Frost Nova and Cone of Cold spells by ${this.y()}%.`
					},
					image: "arctic_reach.jpg"
				}, {
					name: 'Frost Channeling',
					maxRank: 3,
					x: [5,10],
					y: function() {
						return this.x[0] * this.invested, this.x[1] * this.invested
					},
					description: function() {
						return `Reduces the mana cost of your Frost spells by 5% and reduces the threat caused by your Frost spells by 10%.`
					},
					image: "frost_channeling.jpg"
				}, {
					name: 'Shatter',
					maxRank: 5,
					x: 10,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike chance of all your spells against frozen targets by ${this.y()}%.`
					},
					r: [5, 2],
					locked: "locked",
					image: "shatter.jpg"
				}, {
					name: 'Ice Block',
					maxRank: 1,
					description: function() {
						return `You become encased in a block of ice, protecting you from all physical attacks and spells for 10 sec, but during that time you cannot attack, move or cast spells.`
					},
					image: "ice_block.jpg"
				}, {
					name: 'Improved Cone of Cold',
					maxRank: 3,

					x: 10,
					y: function() {
						return (this.x * this.invested)+5
					},
					description: function() {
						return `Increases the damage dealt by your Cone of Cold spell by ${this.y()}%.`
					},
					image: "improved_cone_of_cold.jpg"
				}, {
//NOTE
					name: "Winter's Chill",
					maxRank: 5,
					x: 20,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Frost damage spells a ${this.y()}% chance to apply the Winter's Chill effect, which increases the chance a Frost spell will critically hit the target by 2% for 15 sec.  Stacks up to 5 times.`
					},
					image: "winters_chill.jpg"
				}, {
					name: 'Ice Barrier',
					maxRank: 1,
					description: function() {
						return `Instantly shields you, absorbing 438 damage.  Lasts 1 min.  While the shield holds, spells will not be interrupted.`
					},
					r: [13, 1],
					locked: "locked",
					image: "ice_barrier.jpg"
				}]
			}]
		},
		{
			name: 'druid',
			tree_talents: [{
				name: 'Balance',
				talents: [{
					name: 'Improved Wrath',
					maxRank: 5,
					x: 0.1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cast time of your Wrath spell by 0.1 sec.`
					},
					description: ['Reduces the cast time of your Wrath spell by 0.1 sec.', 'Reduces the cast time of your Wrath spell by 0.2 sec.', 'Reduces the cast time of your Wrath spell by 0.3 sec.', 'Reduces the cast time of your Wrath spell by 0.4 sec.', 'Reduces the cast time of your Wrath spell by 0.5 sec.'],
					image: "improved_wrath.jpg"
				}, {
					name: "Nature's Grasp",
					maxRank: 1,
					description: ['While active, any time an enemy strikes the caster they have a 35% chance to become afflicted by Entangling Roots (Rank 1).  Only useable outdoors.  1 charge.  Lasts 45 sec.'],
					image: "natures_grasp.jpg"
				}, {
					name: "Improved Nature's Grasp",
					maxRank: 4,
					x: 15,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the chance for your Nature's Grasp to entangle an enemy by ${this.y()}%.`
					},
					r: [1, 1],
					locked: "locked",
					image: "improved_natures_grasp.jpg"
				}, {
					name: 'Improved Entangling Roots',
					x: 3.33,

					maxRank: 3,
					y: function() {
						return Math.ceil(this.x)* 10 * this.invested
					},

					description: function() {
						return `Gives you a ${this.y()}% chance to avoid interruption caused by damage while casting Entangling Roots.`
					},
					image: "improved_entangling_roots.jpg"
				}, {
					name: 'Improved Moonfire',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage and critical strike chance of your Moonfire spell by ${this.y()}%.`
					},
					image: "improved_moonfire.jpg"
				}, {
					name: 'Natural Weapons',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage you deal with physical attacks in all forms by ${this.y()}%.`
					},
					image: "natural_weapons.jpg"
				}, {
					name: 'Natural Shapeshifter',
					maxRank: 3,
					x: 10,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the mana cost of all shapeshifting by ${this.y()}%.`
					},
					image: "natural_shapeshifter.jpg"
				}, {
					name: 'Improved Thorns',
					maxRank: 3,
					x: 25,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases damage caused by your Thorns spell by ${this.y()}%.`
					},
					image: "improved_thorns.jpg"
				}, {
					name: 'Omen of Clarity',
					maxRank: 1,
					description: function() {
						return `Imbues the Druid with natural energy.  Each of the Druid's melee attacks has a chance of causing the caster to enter a Clearcasting state.  The Clearcasting state reduces the Mana, Rage or Energy cost of your next damage or healing spell or offensive ability by 100%.  Lasts 10 min.`
					},
					r: [5, 5],
					locked: "locked",
					image: "omen_of_clarity.jpg"
				}, {
					name: "Nature's Reach",
					maxRank: 2,
					x: 10,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the range of your Wrath, Entangling Roots, Faerie Fire, Moonfire, Starfire, and Hurricane spells by ${this.y()}%.`
					},
					image: "natures_reach.jpg"
				}, {
					name: 'Vengeance',
					maxRank: 5,
					x: 20,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by ${this.y()}%.`
					},
					r: [4, 5],
					locked: "locked",
					image: "vengeance.jpg"
				}, {
					name: 'Improved Starfire',
					maxRank: 5,
					x: [0.1, 3],
					y: function() {
						return [this.x[0] * this.invested, this.x[1] * this.invested]
					},
					description: function() {
						return `Reduces the cast time of Starfire by ${this.y()[0]} sec and has a ${this.y()[1]}% chance to stun the target for 3 sec.`
					},
					image: "improved_starfire.jpg"
				}, {
					name: "Nature's Grace",
					maxRank: 1,
					description: function() {
						return `All spell criticals grace you with a blessing of nature, reducing the casting time of your next spell by 0.5 sec.`
					},
					image: "natures_grace.jpg"
				}, {
					name: 'Moonglow',
					maxRank: 3,
					x: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the Mana cost of your Moonfire, Starfire, Wrath, Healing Touch, Regrowth and Rejuvenation spells by ${this.y()}%.`
					},
					image: "moonglow.jpg"
				}, {
					name: 'Moonfury',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your Starfire, Moonfire and Wrath spells by ${this.y()}%.`
					},
					r: [12, 1],
					locked: "locked",
					image: "moonfury.jpg"
				}, {
// NOTE
					name: 'Moonkin Form',
					maxRank: 1,
					description: ['Transforms the Druid into Moonkin Form.  While in this form the armor contribution from items is increased by 360% and all party members within 30 yards have their spell critical chance increased by 3%.  The Moonkin can only cast Balance spells while shapeshifted.\n\nThe act of shapeshifting frees the caster of Polymorph and Movement Impairing effects.'],
					image: "moonkin_form.jpg"
				}]
			}, {
				name: 'Feral Combat',
				talents: [{
					name: 'Ferocity',
					maxRank: 5,
					x: 1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by ${this.y()} Rage or Energy.`
					},
					image: "ferocity.jpg"
				}, {
					name: 'Feral Aggression',
					maxRank: 5,
					x: [8, 3],
					y: function() {
						return [this.x[0] * this.invested, this.x[1] * this.invested]
					},
					description: function() {
						return `Increases the Attack Power reduction of your Demoralizing Roar by ${this.y()[0]}% and the damage caused by your Ferocious Bite by ${this.y()[1]}%.`
					},
					image: "feral_aggression.jpg"
				}, {
					name: 'Feral Instinct',
					maxRank: 5,
					x: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases threat caused in Bear and Dire Bear Form by ${this.y()}% and reduces the chance enemies have to detect you while Prowling.`
					},
					image: "feral_instinct.jpg"
				}, {
					name: 'Brutal Impact',
					maxRank: 2,
					x: 0.5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the stun duration of your Bash and Pounce abilities by 0.5 sec.`
					},
					description: ['Increases the stun duration of your Bash and Pounce abilities by 0.5 sec.', 'Increases the stun duration of your Bash and Pounce abilities by 1 sec.'],
					image: "brutal_impact.jpg"
				}, {
					name: 'Thick Hide',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your Armor contribution from items by ${this.y()}%.`
					},
					image: "thick_hide.jpg"
				}, {
					name: 'Feline Swiftness',
					maxRank: 2,
					x: [15,2],
					y: function() {
						return [this.x[0] * this.invested,  this.x[1] * this.invested]
					},
					description: function() {
						return `Increases your movement speed by ${this.y()[0]}% while outdoors in Cat Form and increases your chance to dodge while in Cat Form by ${this.y()[0]}%.`
					},
					image: "feline_swiftness.jpg"
				}, {
					name: 'Feral Charge',
					maxRank: 1,
					description: function() {
						return `Causes you to charge an enemy, immobilizing and interrupting any spell being cast for 4 sec.`
					},
					image: "feral_charge.jpg"
				}, {
					name: 'Sharpened Claws',
					maxRank: 3,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your critical strike chance while in Bear, Dire Bear or Cat Form by ${this.y()}%.`
					},
					image: "sharpened_claws.jpg"
				}, {
					name: 'Improved Shred',
					maxRank: 2,
					x: 12,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the Energy cost of your Shred ability by 6.`
					},
					description: ['Reduces the Energy cost of your Shred ability by 6.', 'Reduces the Energy cost of your Shred ability by 12.'],
					image: "improved_shred.jpg"
				}, {
					name: 'Predatory Strikes',
					maxRank: 3,
					x: 50,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your melee attack power in Cat, Bear and Dire Bear Forms by ${this.y()}% of your level.`
					},
					image: "predatory_strikes.jpg"
				}, {
					name: 'Blood Frenzy',
					maxRank: 2,
					x: 50,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Your critical strikes from Cat Form abilities that add combo points  have a ${this.y()}% chance to add an additional combo point.`
					},
					r: [7, 3],
					locked: "locked",
					image: "blood_frenzy.jpg"
				}, {
					name: 'Primal Fury',
					maxRank: 2,
					x: 50,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a ${this.y()}% chance to gain an additional 5 Rage anytime you get a critical strike while in Bear and Dire Bear Form.`
					},
					r: [7, 3],
					locked: "locked",
					image: "primal_fury.jpg"
				}, {
					name: 'Savage Fury',
					maxRank: 2,
					x: 10,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage caused by your Claw, Rake, Maul and Swipe abilities by ${this.y()}%.`
					},
					image: "savage_fury.jpg"
				}, {
					name: 'Faerie Fire (Feral)',
					maxRank: 1,
					description: function() {
						return `Decrease the armor of the target by 175 for 40 sec.  While affected, the target cannot stealth or turn invisible.`
					},
					image: "faerie_fire_feral.jpg"
				}, {
					name: 'Heart of the Wild',
					x: 4,
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						let v = this.y()
						return `Increases your Intellect by ${v}%.  In addition, while in Bear or Dire Bear Form your Stamina is increased by ${v}% and while in Cat Form your Strength is increased by ${v}%.`
					},
					r: [9, 3],
					locked: "locked",
					image: "heart_of_the_wild.jpg"
				}, {
					name: 'Leader of the Pack',
					maxRank: 1,
					description: function() {
						return `While in Cat, Bear or Dire Bear Form, the Leader of the Pack increases ranged and melee critical chance of all party members within 45 yards by 3%.`
					},
					image: "leader_of_the_pack.jpg"
				}]
			}, {
				name: 'Restoration',
				talents: [{
					name: 'Improved Mark of the Wild',
					maxRank: 5,
					x: 7,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the effects of your Mark of the Wild and Gift of the Wild spells by ${this.y()}%.`
					},
					image: "improved_mark_of_the_wild.jpg"
				}, {
					name: 'Furor',
					maxRank: 5,
					x: 20,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you ${this.y()}% chance to gain 10 Rage when you shapeshift into Bear and Dire Bear Form or 40 Energy when you shapeshift into Cat Form.`
					},
					image: "furor.jpg"
				}, {
					name: 'Improved Healing Touch',
					maxRank: 5,
					x: 0.1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cast time of your Healing Touch spell by 0.1 sec.`
					},
					description: ['Reduces the cast time of your Healing Touch spell by 0.1 sec.', 'Reduces the cast time of your Healing Touch spell by 0.2 sec.', 'Reduces the cast time of your Healing Touch spell by 0.3 sec.', 'Reduces the cast time of your Healing Touch spell by 0.4 sec.', 'Reduces the cast time of your Healing Touch spell by 0.5 sec.'],
					image: "improved_healing_touch.jpg"
				}, {
					name: "Nature's Focus",
					maxRank: 5,
					x: 14,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a ${this.y()}% chance to avoid interruption caused by damage while casting the Healing Touch, Regrowth and Tranquility spells.`
					},
					image: "natures_focus.jpg"
				}, {
					name: 'Improved Enrage',
					maxRank: 2,
					x: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `The Enrage ability now instantly generates ${this.y()} Rage.`
					},
					image: "improved_enrage.jpg"
				}, {
					name: 'Reflection',
					maxRank: 3,
					x: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Allows ${this.y()}% of your Mana regeneration to continue while casting.`
					},
					image: "reflection.jpg"
				}, {
					name: 'Insect Swarm',
					maxRank: 1,
					description: function() {
						return `The enemy target is swarmed by insects, decreasing their chance to hit by 2% and causing 66 Nature damage over 12 sec.`
					},
					image: "insect_swarm.jpg"
				}, {
					name: 'Subtlety',
					maxRank: 5,
					x: 4,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the threat generated by your Healing spells by ${this.y()}%.`
					},
					image: "subtlety.jpg"
				}, {
					name: 'Tranquil Spirit',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the mana cost of your Healing Touch and Tranquility spells by ${this.y()}%.`
					},
					image: "tranquil_spirit.jpg"
				}, {
					name: 'Improved Rejuvenation',
					maxRank: 3,
					x: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the effect of your Rejuvenation spell by ${this.y()}%.`
					},
					image: "improved_rejuvenation.jpg"
				}, {
					name: "Nature's Swiftness",
					maxRank: 1,
					description: function() {
						return `When activated, your next Nature spell becomes an instant cast spell.`
					},
					r: [2, 5],
					locked: "locked",
					image: "natures_swiftness.jpg"
				}, {
					name: 'Gift of Nature',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the effect of all healing spells by ${this.y()}%.`
					},
					r: [6, 1],
					locked: "locked",
					image: "gift_of_nature.jpg"
				}, {
					name: 'Improved Tranquility',
					maxRank: 2,
					x: 50,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces threat caused by Tranquility by ${this.y()}%.`
					},
					image: "improved_tranquility.jpg"
				}, {
					name: 'Improved Regrowth',
					maxRank: 5,
					x: 10,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical effect chance of your Regrowth spell by ${this.y()}%.`
					},
					image: "improved_regrowth.jpg"
				}, {
					name: 'Swiftmend',
					maxRank: 1,
					description: function() {
						return `Consumes a Rejuvenation or Regrowth effect on a friendly target to instantly heal them an amount equal to 12 sec. of Rejuvenation or 18 sec. of Regrowth.`
					},
					r: [8, 5],
					locked: "locked",
					image: "swiftmend.jpg"
				}]
			}]
		},
		{
			name: 'hunter',
			tree_talents: [{
				name: 'Beast Mastery',
				talents: [{
					name: 'Improved Aspect of the Hawk',
					maxRank: 5,
					x: 1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `While Aspect of the Hawk is active, all normal ranged attacks have a ${this.y()}% chance of increasing ranged attack speed by 30% for 12 sec.`
					},
					image: "improved_aspect_of_the_hawk.jpg"
				}, {
					name: 'Endurance Training',
					maxRank: 5,
					x: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the Health of your pets by ${this.y()}%.`
					},
					image: "endurance_training.jpg"
				}, {
					name: 'Improved Eyes of the Beast',
					maxRank: 2,
					x: 30,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the duration of your Eyes of the Beast by ${this.y()} sec.`
					},
					image: "improved_eyes_of_the_beast.jpg"
				}, {
					name: 'Improved Aspect of the Monkey',
					maxRank: 5,
					x: 1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the Dodge bonus of your Aspect of the Monkey by ${this.y()}%.`
					},
					image: "improved_aspect_of_the_monkey.jpg"
				}, {
					name: 'Thick Hide',
					maxRank: 3,
					x: 10,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the Armor rating of your pets by ${this.y()}%.`
					},
					image: "thick_hide.jpg"
				}, {
					name: 'Improved Revive Pet',
					maxRank: 2,
					x: [3,20,15],
					y: function() {
						return [this.x[0] * this.invested, this.x[1] * this.invested, this.x[2] * this.invested]
					},
					description: function() {
						return `Revive Pet's casting time is reduced by ${this.y()[0]} sec, mana cost is reduced by ${this.y()[1]}%, and increases the health your pet returns with by an additional ${this.y()[2]}%.`
					},
					image: "improved_revive_pet.jpg"
				}, {
					name: 'Pathfinding',
					maxRank: 2,
					x: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the speed bonus of your Aspect of the Cheetah and Aspect of the Pack by ${this.y()}%.`
					},
					image: "pathfinding.jpg"
				}, {
					name: 'Bestial Swiftness',
					maxRank: 1,
					description: function() {
						return `Increases the outdoor movement speed of your pets by 30%.`
					},
					image: "bestial_swiftness.jpg"
				}, {
					name: 'Unleashed Fury',
					maxRank: 5,
					x: 4,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your pets by ${this.y()}%.`
					},
					image: "unleashed_fury.jpg"
				}, {
// NOTE
					name: 'Improved Mend Pet',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives the Mend Pet spell a 15% chance of cleansing 1 Curse, Disease, Magic or Poison effect from the pet each tick.`
					},
					description: ['Gives the Mend Pet spell a 15% chance of cleansing 1 Curse, Disease, Magic or Poison effect from the pet each tick.', 'Gives the Mend Pet spell a 50% chance of cleansing 1 Curse, Disease, Magic or Poison effect from the pet each tick.'],
					image: "improved_mend_pet.jpg"
				}, {
					name: 'Ferocity',
					maxRank: 5,
					x: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike chance of your pets by ${this.y()}%.`
					},
					image: "ferocity.jpg"
				}, {
					name: 'Spirit Bond',
					maxRank: 2,
					x: 1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `While your pet is active, you and your pet will regenerate ${this.y()}% of total health every 10 sec.`
					},
					image: "spirit_bond.jpg"
				}, {
					name: 'Intimidation',
					maxRank: 1,
					description: function() {
						return `Command your pet to intimidate the target on the next successful melee attack, causing a high amount of threat and stunning the target for 3 sec.`
					},
					image: "intimidation.jpg"
				}, {
					name: 'Bestial Discipline',
					maxRank: 2,
					x: 10,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the Focus regeneration of your pets by ${this.y()}%.`
					},
					image: "bestial_discipline.jpg"
				}, {
					name: 'Frenzy',
					maxRank: 5,
					x: 20,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your pet a ${this.y()}% chance to gain a 30% attack speed increase for 8 sec after dealing a critical strike.`
					},
					r: [10, 5],
					locked: "locked",
					image: "frenzy.jpg"
				}, {
					name: 'Bestial Wrath',
					maxRank: 1,
					description: function() {
						return `Send your pet into a rage causing 50% additional damage for 18 sec.  While enraged, the beast does not feel pity or remorse or fear and it cannot be stopped unless killed.`
					},
					r: [12, 1],
					locked: "locked",
					image: "bestial_wrath.jpg"
				}]
			}, {
				name: 'Marksmanship',
				talents: [{
					name: 'Improved Concussive Shot',
					maxRank: 5,
					x: 4,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Concussive Shot a ${this.y()}% chance to stun the target for 3 sec.`
					},
					image: "improved_concussive_shot.jpg"
				}, {
					name: 'Efficiency',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the Mana cost of your Shots and Stings by ${this.y()}%.`
					},
					image: "efficiency.jpg"
				}, {
					name: "Improved Hunter's Mark",
					maxRank: 5,
					x: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the Ranged Attack Power bonus of your Hunter's Mark spell by ${this.y()}%.`
					},
					image: "improved_hunters_mark.jpg"
				}, {
					name: 'Lethal Shots',
					maxRank: 5,
					x: 1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your critical strike chance with ranged weapons by ${this.y()}%.`
					},
					image: "lethal_shots.jpg"
				}, {
					name: 'Aimed Shot',
					maxRank: 1,
					description: function() {
						return `An aimed shot that increases ranged damage by 70.`
					},
					image: "aimed_shot.jpg"
				}, {
					name: 'Improved Arcane Shot',
					maxRank: 5,
					x: 0.2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cooldown of your Arcane Shot by 0.2 sec.`
					},
					description: ['Reduces the cooldown of your Arcane Shot by 0.2 sec.', 'Reduces the cooldown of your Arcane Shot by 0.4 sec.', 'Reduces the cooldown of your Arcane Shot by 0.6 sec.', 'Reduces the cooldown of your Arcane Shot by 0.8 sec.', 'Reduces the cooldown of your Arcane Shot by 1 sec.'],
					image: "improved_arcane_shot.jpg"
				}, {
					name: 'Hawk Eye',
					maxRank: 3,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the range of your ranged weapons by ${this.y()} yards.`
					},
					image: "hawk_eye.jpg"
				}, {
					name: 'Improved Serpent Sting',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your Serpent Sting by ${this.y()}%.`
					},
					image: "improved_serpent_sting.jpg"
				}, {
					name: 'Mortal Shots',
					maxRank: 5,
					x: 6,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your ranged weapon critical strike damage bonus by ${this.y()}%.`
					},
					r: [3, 5],
					locked: "locked",
					image: "mortal_shots.jpg"
				}, {
					name: 'Scatter Shot',
					maxRank: 1,
					description: function() {
						return `A short-range shot that deals 50% weapon damage and disorients the target for 4 sec.  Any damage caused will remove the effect.  Turns off your attack when used.`
					},
					image: "scatter_shot.jpg"
				}, {
					name: 'Barrage',
					maxRank: 3,
					x: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your Multi-Shot and Volley spells by 5%.`
					},
					description: ['Increases the damage done by your Multi-Shot and Volley spells by 5%.', 'Increases the damage done by your Multi-Shot and Volley spells by 10%.', 'Increases the damage done by your Multi-Shot and Volley spells by 15%.'],
					image: "barrage.jpg"
				}, {
					name: 'Improved Scorpid Sting',
					maxRank: 3,
					x: 10,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the Stamina of targets affected by your Scorpid Sting by ${this.y()}% of the amount of Strength reduced.`
					},
					image: "improved_scorpid_sting.jpg"
				}, {
					name: 'Ranged Weapon Specialization',
					maxRank: 5,
					x: 1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage you deal with ranged weapons by ${this.y()}%.`
					},
					image: "ranged_weapon_specialization.jpg"
				}, {
					name: 'Trueshot Aura',
					maxRank: 1,
					description: function() {
						return `Increases the attack power of party members within 45 yards by 50.  Lasts 30 min.`
					},
					r: [10, 3],
					locked: "locked",
					image: "trueshot_aura.jpg"
				}]
			}, {
				name: 'Survival',
				talents: [{
					name: 'Monster Slaying',
					maxRank: 3,
					x: 1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						let v = this.y()
						return `Increases all damage caused against Beasts, Giants and Dragonkin targets by ${v}% and increases critical damage caused against Beasts, Giants and Dragonkin targets by an additional ${v}%.`
					},
					image: "monster_slaying.jpg"
				}, {
					name: 'Humanoid Slaying',
					maxRank: 3,
					x: 1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						let v = this.y()

						return `Increases all damage caused against Humanoid targets by ${v}% and increases critical damage caused against Humanoid targets by an additional ${v}%.`
					},
					image: "humanoid_slaying.jpg"
				}, {
					name: 'Deflection',
					maxRank: 5,
					x: 1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your Parry chance by ${this.y()}%.`
					},
					image: "deflection.jpg"
				}, {
					name: 'Entrapment',
					maxRank: 5,
					x: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Immolation Trap, Frost Trap, and Explosive Trap a ${this.y()}% chance to entrap the target, preventing them from moving for 5 sec.`
					},
					image: "entrapment.jpg"
				}, {
					name: 'Savage Strikes',
					maxRank: 2,
					x: 10,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike chance of Raptor Strike and Mongoose Bite by ${this.y()}%.`
					},
					image: "savage_strikes.jpg"
				}, {
					name: 'Improved Wing Clip',
					maxRank: 5,
					x: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Wing Clip ability a 4% chance to immobilize the target for 5 sec.`
					},
					description: ['Gives your Wing Clip ability a 4% chance to immobilize the target for 5 sec.', 'Gives your Wing Clip ability a 8% chance to immobilize the target for 5 sec.', 'Gives your Wing Clip ability a 12% chance to immobilize the target for 5 sec.', 'Gives your Wing Clip ability a 16% chance to immobilize the target for 5 sec.', 'Gives your Wing Clip ability a 20% chance to immobilize the target for 5 sec.'],
					image: "improved_wing_clip.jpg"
				}, {
					name: 'Clever Traps',
					maxRank: 2,
					x: 15,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						let v = this.y()
						return `Increases the duration of Freezing and Frost trap effects by ${v}% and the damage of Immolation and Explosive trap effects by ${v}%.`
					},
					image: "clever_traps.jpg"
				}, {
					name: 'Survivalist',
					maxRank: 5,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases total health by ${this.y()}%.`
					},
					image: "survivalist.jpg"
				}, {
					name: 'Deterrence',
					maxRank: 1,
					description: function() {
						return `When activated, increases your Dodge and Parry chance by 25% for 10 sec.`
					},
					image: "deterrence.jpg"
				}, {
					name: 'Trap Mastery',
					maxRank: 2,
					x: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Decreases the chance enemies will resist trap effects by ${this.y()}%.`
					},
					image: "trap_mastery.jpg"
				}, {
					name: 'Surefooted',
					maxRank: 3,
					x: [1,5],
					y: function() {
						return [this.x * this.invested,this.x * this.invested]
					},
					description: function() {
						return `Increases hit chance by ${this.y()[0]}% and increases the chance movement impairing effects will be resisted by an additional ${this.y()[1]}%.`
					},
					image: "surefooted.jpg"
				}, {
					name: 'Improved Feign Death',
					maxRank: 2,
					x: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the chance your Feign Death ability will be resisted by ${this.y()}%.`
					},
					image: "improved_feign_death.jpg"
				}, {
					name: 'Killer Instinct',
					maxRank: 3,
					x: 1,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your critical strike chance with all attacks by ${this.y()}%.`
					},
					image: "killer_instinct.jpg"
				}, {
					name: 'Counterattack',
					maxRank: 1,
					description: function() {
						return `A strike that becomes active after parrying an opponent's attack.  This attack deals 40 damage and immobilizes the target for 5 sec.  Counterattack cannot be blocked, dodged, or parried.`
					},
					r: [8, 1],
					locked: "locked",
					image: "counterattack.jpg"
				}, {
					name: 'Lightning Reflexes',
					maxRank: 5,
					x: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your Agility by ${this.y()}%.`
					},
					image: "lightning_reflexes.jpg"
				}, {
					name: 'Wyvern Sting',
					maxRank: 1,
					description: function() {
						return `A stinging shot that puts the target to sleep for 12 sec.  Any damage will cancel the effect.  When the target wakes up, the Sting causes 0 Nature damage over 12 sec.  Only usable out of combat.  Only one Sting per Hunter can be active on the target at a time.`
					},
					r: [12, 3],
					locked: "locked",
					image: "wyvern_sting.jpg"
				}]
			}]
		},
		{
			name: 'paladin',
			tree_talents: [{
				name: 'Holy',
				talents: [{
					name: 'Divine Strength',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your Strength by 2%.`
					},
					description: ['Increases your Strength by 2%.', 'Increases your Strength by 4%.', 'Increases your Strength by 6%.', 'Increases your Strength by 8%.', 'Increases your Strength by 10%.'],
					image: "divine_strength.jpg"
				}, {
					name: 'Divine Intellect',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your total Intellect by 2%.`
					},
					description: ['Increases your total Intellect by 2%.', 'Increases your total Intellect by 4%.', 'Increases your total Intellect by 6%.', 'Increases your total Intellect by 8%.', 'Increases your total Intellect by 10%.'],
					image: "divine_intellect.jpg"
				}, {
					name: 'Spiritual Focus',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Flash of Light and Holy Light spells a 14% chance to not lose casting time when you take damage.`
					},
					description: ['Gives your Flash of Light and Holy Light spells a 14% chance to not lose casting time when you take damage.', 'Gives your Flash of Light and Holy Light spells a 28% chance to not lose casting time when you take damage.', 'Gives your Flash of Light and Holy Light spells a 42% chance to not lose casting time when you take damage.', 'Gives your Flash of Light and Holy Light spells a 56% chance to not lose casting time when you take damage.', 'Gives your Flash of Light and Holy Light spells a 70% chance to not lose casting time when you take damage.'],
					image: "spiritual_focus.jpg"
				}, {
					name: 'Improved Seal of Righteousness',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 3%.`
					},
					description: ['Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 3%.', 'Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 6%.', 'Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 9%.', 'Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 12%.', 'Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 15%.'],
					image: "improved_seal_of_righteousness.jpg"
				}, {
					name: 'Healing Light',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the amount healed by your Holy Light and Flash of Light spells by 4%.`
					},
					description: ['Increases the amount healed by your Holy Light and Flash of Light spells by 4%.', 'Increases the amount healed by your Holy Light and Flash of Light spells by 8%.', 'Increases the amount healed by your Holy Light and Flash of Light spells by 12%.'],
					image: "healing_light.jpg"
				}, {
					name: 'Consecration',
					maxRank: 1,
					description: function() {
						return `Consecrates the land beneath Paladin, doing 64 Holy damage over 8 sec to enemies who enter the area.`
					},
					description: ['Consecrates the land beneath Paladin, doing 64 Holy damage over 8 sec to enemies who enter the area.'],
					image: "consecration.jpg"
				}, {
					name: 'Improved Lay on Hands',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives the target of your Lay on Hands spell a 15% bonus to their armor value from items for 2 min.  In addition, the cooldown for your Lay on Hands spell is reduced by 10 min.`
					},
					description: ['Gives the target of your Lay on Hands spell a 15% bonus to their armor value from items for 2 min.  In addition, the cooldown for your Lay on Hands spell is reduced by 10 min.', 'Gives the target of your Lay on Hands spell a 30% bonus to their armor value from items for 2 min.  In addition, the cooldown for your Lay on Hands spell is reduced by 20 min.'],
					image: "improved_lay_on_hands.jpg"
				}, {
					name: 'Unyielding Faith',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to resist Fear and Disorient effects by an additional 5%.`
					},
					description: ['Increases your chance to resist Fear and Disorient effects by an additional 5%.', 'Increases your chance to resist Fear and Disorient effects by an additional 10%.'],
					image: "unyielding_faith.jpg"
				}, {
					name: 'Illumination',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 20% chance to gain Mana equal to the base cost of the spell.`
					},
					description: ['After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 20% chance to gain Mana equal to the base cost of the spell.', 'After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 40% chance to gain Mana equal to the base cost of the spell.', 'After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 60% chance to gain Mana equal to the base cost of the spell.', 'After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 80% chance to gain Mana equal to the base cost of the spell.', 'After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 100% chance to gain Mana equal to the base cost of the spell.'],
					image: "illumination.jpg"
				}, {
					name: 'Improved Blessing of Wisdom',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the effect of your Blessing of Wisdom spell by 10%.`
					},
					description: ['Increases the effect of your Blessing of Wisdom spell by 10%.', 'Increases the effect of your Blessing of Wisdom spell by 20%.'],
					image: "improved_blessing_of_wisdom.jpg"
				}, {
					name: 'Divine Favor',
					maxRank: 1,
					description: function() {
						return `When activated, gives your next Flash of Light, Holy Light, or Holy Shock spell a 100% critical effect chance.`
					},
					description: ['When activated, gives your next Flash of Light, Holy Light, or Holy Shock spell a 100% critical effect chance.'],
					r: [8, 5],
					locked: "locked",
					image: "divine_favor.jpg"
				}, {
					name: 'Lasting Judgement',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the duration of your Judgement of Light and Judgement of Wisdom by 10 sec.`
					},
					description: ['Increases the duration of your Judgement of Light and Judgement of Wisdom by 10 sec.', 'Increases the duration of your Judgement of Light and Judgement of Wisdom by 20 sec.', 'Increases the duration of your Judgement of Light and Judgement of Wisdom by 30 sec.'],
					image: "lasting_judgement.jpg"
				}, {
					name: 'Holy Power',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical effect chance of your Holy spells by 1%.`
					},
					description: ['Increases the critical effect chance of your Holy spells by 1%.', 'Increases the critical effect chance of your Holy spells by 2%.', 'Increases the critical effect chance of your Holy spells by 3%.', 'Increases the critical effect chance of your Holy spells by 4%.', 'Increases the critical effect chance of your Holy spells by 5%.'],
					image: "holy_power.jpg"
				}, {
					name: 'Holy Shock',
					maxRank: 1,
					description: function() {
						return `Blasts the target with Holy energy, causing 204 to 221 Holy damage to an enemy, or 204 to 221 healing to an ally.`
					},
					description: ['Blasts the target with Holy energy, causing 204 to 221 Holy damage to an enemy, or 204 to 221 healing to an ally.'],
					r: [10, 1],
					locked: "locked",
					image: "holy_shock.jpg"
				}]
			}, {
				name: 'Protection',
				talents: [{
					name: 'Improved Devotion Aura',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the armor bonus of your Devotion Aura by 5%.`
					},
					description: ['Increases the armor bonus of your Devotion Aura by 5%.', 'Increases the armor bonus of your Devotion Aura by 10%.', 'Increases the armor bonus of your Devotion Aura by 15%.', 'Increases the armor bonus of your Devotion Aura by 20%.', 'Increases the armor bonus of your Devotion Aura by 25%.'],
					image: "improved_devotion_aura.jpg"
				}, {
					name: 'Redoubt',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to block attacks with your shield by 6% after being the victim of a critical strike.  Lasts 10 sec or 5 blocks.`
					},
					description: ['Increases your chance to block attacks with your shield by 6% after being the victim of a critical strike.  Lasts 10 sec or 5 blocks.', 'Increases your chance to block attacks with your shield by 12% after being the victim of a critical strike.  Lasts 10 sec or 5 blocks.', 'Increases your chance to block attacks with your shield by 18% after being the victim of a critical strike.  Lasts 10 sec or 5 blocks.', 'Increases your chance to block attacks with your shield by 24% after being the victim of a critical strike.  Lasts 10 sec or 5 blocks.', 'Increases your chance to block attacks with your shield by 30% after being the victim of a critical strike.  Lasts 10 sec or 5 blocks.'],
					image: "redoubt.jpg"
				}, {
					name: 'Precision',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to hit with melee weapons by 1%.`
					},
					description: ['Increases your chance to hit with melee weapons by 1%.', 'Increases your chance to hit with melee weapons by 2%.', 'Increases your chance to hit with melee weapons by 3%.'],
					image: "precision.jpg"
				}, {
					name: "Guardian's Favor",
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cooldown of your Blessing of Protection by 60 sec and increases the duration of your Blessing of Freedom by 3 sec.`
					},
					description: ['Reduces the cooldown of your Blessing of Protection by 60 sec and increases the duration of your Blessing of Freedom by 3 sec.', 'Reduces the cooldown of your Blessing of Protection by 120 sec and increases the duration of your Blessing of Freedom by 6 sec.'],
					image: "guardians_favor.jpg"
				}, {
					name: 'Toughness',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your armor value from items by 2%.`
					},
					description: ['Increases your armor value from items by 2%.', 'Increases your armor value from items by 4%.', 'Increases your armor value from items by 6%.', 'Increases your armor value from items by 8%.', 'Increases your armor value from items by 10%.'],
					image: "toughness.jpg"
				}, {
					name: 'Blessing of Kings',
					maxRank: 1,
					description: function() {
						return `Places a Blessing on the friendly target, increasing total stats by 10% for 5 min.  Players may only have one Blessing on them per Paladin at any one time.`
					},
					description: ['Places a Blessing on the friendly target, increasing total stats by 10% for 5 min.  Players may only have one Blessing on them per Paladin at any one time.'],
					image: "blessing_of_kings.jpg"
				}, {
					name: 'Improved Righteous Fury',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the amount of threat generated by your Righteous Fury spell by 16%.`
					},
					description: ['Increases the amount of threat generated by your Righteous Fury spell by 16%.', 'Increases the amount of threat generated by your Righteous Fury spell by 33%.', 'Increases the amount of threat generated by your Righteous Fury spell by 50%.'],
					image: "improved_righteous_fury.jpg"
				}, {
					name: 'Shield Specialization',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the amount of damage absorbed by your shield by 10%.`
					},
					description: ['Increases the amount of damage absorbed by your shield by 10%.', 'Increases the amount of damage absorbed by your shield by 20%.', 'Increases the amount of damage absorbed by your shield by 30%.'],
					r: [1, 5],
					locked: "locked",
					image: "shield_specialization.jpg"
				}, {
					name: 'Anticipation',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your Defense skill by 2.`
					},
					description: ['Increases your Defense skill by 2.', 'Increases your Defense skill by 4.', 'Increases your Defense skill by 6.', 'Increases your Defense skill by 8.', 'Increases your Defense skill by 10.'],
					image: "anticipation.jpg"
				}, {
					name: 'Improved Hammer of Justice',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Decreases the cooldown of your Hammer of Justice spell by 5 sec.`
					},
					description: ['Decreases the cooldown of your Hammer of Justice spell by 5 sec.', 'Decreases the cooldown of your Hammer of Justice spell by 10 sec.', 'Decreases the cooldown of your Hammer of Justice spell by 15 sec.'],
					image: "improved_hammer_of_justice.jpg"
				}, {
					name: 'Improved Concentration Aura',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the effect of your Concentration Aura by an additional 5% and gives all group members affected by the aura an additional 5% chance to resist Silence and Interrupt effects.`
					},
					description: ['Increases the effect of your Concentration Aura by an additional 5% and gives all group members affected by the aura an additional 5% chance to resist Silence and Interrupt effects.', 'Increases the effect of your Concentration Aura by an additional 10% and gives all group members affected by the aura an additional 10% chance to resist Silence and Interrupt effects.', 'Increases the effect of your Concentration Aura by an additional 15% and gives all group members affected by the aura an additional 15% chance to resist Silence and Interrupt effects.'],
					image: "improved_concentration_aura.jpg"
				}, {
					name: 'Blessing of Sanctuary',
					maxRank: 1,
					description: function() {
						return `Places a Blessing on the friendly target, reducing damage dealt from all sources by up to 10 for 5 min.  In addition, when the target blocks a melee attack the attacker will take 14 Holy damage.  Players may only have one Blessing on them per Paladin at any one time.`
					},
					description: ['Places a Blessing on the friendly target, reducing damage dealt from all sources by up to 10 for 5 min.  In addition, when the target blocks a melee attack the attacker will take 14 Holy damage.  Players may only have one Blessing on them per Paladin at any one time.'],
					image: "blessing_of_sanctuary.jpg"
				}, {
					name: 'Reckoning',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 20% chance to gain an extra attack after being the victim of a critical strike.`
					},
					description: ['Gives you a 20% chance to gain an extra attack after being the victim of a critical strike.', 'Gives you a 40% chance to gain an extra attack after being the victim of a critical strike.', 'Gives you a 60% chance to gain an extra attack after being the victim of a critical strike.', 'Gives you a 80% chance to gain an extra attack after being the victim of a critical strike.', 'Gives you a 100% chance to gain an extra attack after being the victim of a critical strike.'],
					image: "reckoning.jpg"
				}, {
					name: 'One-Handed Weapon Specialization',
					maxRank: 5,
					description: ['Increases the damage you deal with one-handed melee weapons by 2%.', 'Increases the damage you deal with one-handed melee weapons by 4%.', 'Increases the damage you deal with one-handed melee weapons by 6%.', 'Increases the damage you deal with one-handed melee weapons by 8%.', 'Increases the damage you deal with one-handed melee weapons by 10%.'],
					image: "one_handed_weapon_specialization.jpg"
				}, {
					name: 'Holy Shield',
					maxRank: 1,
					description: function() {
						return `Increases chance to block by 30% for 10 sec, and deals 65 Holy damage for each attack blocked while active.  Damage caused by Holy Shield causes 20% additional threat.  Each block expends a charge.  4 charges.`
					},
					description: ['Increases chance to block by 30% for 10 sec, and deals 65 Holy damage for each attack blocked while active.  Damage caused by Holy Shield causes 20% additional threat.  Each block expends a charge.  4 charges.'],
					r: [11, 1],
					locked: "locked",
					image: "holy_shield.jpg"
				}]
			}, {
				name: 'Retribution',
				talents: [{
					name: 'Improved Blessing of Might',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the melee attack power bonus of your Blessing of Might by 4%.`
					},
					description: ['Increases the melee attack power bonus of your Blessing of Might by 4%.', 'Increases the melee attack power bonus of your Blessing of Might by 8%.', 'Increases the melee attack power bonus of your Blessing of Might by 12%.', 'Increases the melee attack power bonus of your Blessing of Might by 16%.', 'Increases the melee attack power bonus of your Blessing of Might by 20%.'],
					image: "improved_blessing_of_might.jpg"
				}, {
					name: 'Benediction',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the Mana cost of your Judgement and Seal spells by 3%.`
					},
					description: ['Reduces the Mana cost of your Judgement and Seal spells by 3%.', 'Reduces the Mana cost of your Judgement and Seal spells by 6%.', 'Reduces the Mana cost of your Judgement and Seal spells by 9%.', 'Reduces the Mana cost of your Judgement and Seal spells by 12%.', 'Reduces the Mana cost of your Judgement and Seal spells by 15%.'],
					image: "benediction.jpg"
				}, {
					name: 'Improved Judgement',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Decreases the cooldown of your Judgement spell by 1 sec.`
					},
					description: ['Decreases the cooldown of your Judgement spell by 1 sec.', 'Decreases the cooldown of your Judgement spell by 2 sec.'],
					image: "improved_judgement.jpg"
				}, {
					name: 'Improved Seal of the Crusader',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the melee attack power bonus of your Seal of the Crusader and the Holy damage increase of your Judgement of the Crusader by 5%.`
					},
					description: ['Increases the melee attack power bonus of your Seal of the Crusader and the Holy damage increase of your Judgement of the Crusader by 5%.', 'Increases the melee attack power bonus of your Seal of the Crusader and the Holy damage increase of your Judgement of the Crusader by 10%.', 'Increases the melee attack power bonus of your Seal of the Crusader and the Holy damage increase of your Judgement of the Crusader by 15%.'],
					image: "improved_seal_of_the_crusader.jpg"
				}, {
					name: 'Deflection',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your Parry chance by 1%.`
					},
					description: ['Increases your Parry chance by 1%.', 'Increases your Parry chance by 2%.', 'Increases your Parry chance by 3%.', 'Increases your Parry chance by 4%.', 'Increases your Parry chance by 5%.'],
					image: "deflection.jpg"
				}, {
					name: 'Vindication',
					maxRank: 3,
					description: function() {
						return `Gives the Paladin's damaging melee attacks a chance to reduce the target's Strength and Agility by 5% for 10 sec.`
					},
					description: ["Gives the Paladin's damaging melee attacks a chance to reduce the target's Strength and Agility by 5% for 10 sec.", "Gives the Paladin's damaging melee attacks a chance to reduce the target's Strength and Agility by 10% for 10 sec.", "Gives the Paladin's damaging melee attacks a chance to reduce the target's Strength and Agility by 15% for 10 sec."],
					image: "vindication.jpg"
				}, {
					name: 'Conviction',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to get a critical strike with melee weapons by 1%.`
					},
					description: ['Increases your chance to get a critical strike with melee weapons by 1%.', 'Increases your chance to get a critical strike with melee weapons by 2%.', 'Increases your chance to get a critical strike with melee weapons by 3%.', 'Increases your chance to get a critical strike with melee weapons by 4%.', 'Increases your chance to get a critical strike with melee weapons by 5%.'],
					image: "conviction.jpg"
				}, {
					name: 'Seal of Command',
					maxRank: 1,
					description: ["Gives the Paladin a chance to deal additional Holy damage equal to 70% of normal weapon damage.  Only one Seal can be active on the Paladin at any one time.  Lasts 30 sec.\n\nUnleashing this Seal's energy will judge an enemy, instantly causing 46.5 to 55.5 Holy damage, 93 to 102 if the target is stunned or incapacitated."],
					image: "seal_of_command.jpg"
				}, {
					name: 'Pursuit of Justice',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases movement and mounted movement speed by 4%.  This does not stack with other movement speed increasing effects.`
					},
					description: ['Increases movement and mounted movement speed by 4%.  This does not stack with other movement speed increasing effects.', 'Increases movement and mounted movement speed by 8%.  This does not stack with other movement speed increasing effects.'],
					image: "pursuit_of_justice.jpg"
				}, {
					name: 'Eye for an Eye',
					maxRank: 2,
					description: function() {
						return `All spell criticals against you cause 15% of the damage taken to the caster as well.  The damage caused by Eye for an Eye will not exceed 50% of the Paladin's total health.`
					},
					description: ["All spell criticals against you cause 15% of the damage taken to the caster as well.  The damage caused by Eye for an Eye will not exceed 50% of the Paladin's total health.", "All spell criticals against you cause 30% of the damage taken to the caster as well.  The damage caused by Eye for an Eye will not exceed 50% of the Paladin's total health."],
					image: "eye_for_an_eye.jpg"
				}, {
					name: 'Improved Retribution Aura',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your Retribution Aura by 25%.`
					},
					description: ['Increases the damage done by your Retribution Aura by 25%.', 'Increases the damage done by your Retribution Aura by 50%.'],
					image: "improved_retribution_aura.jpg"
				}, {
					name: 'Two-Handed Weapon Specialization',
					maxRank: 3,
					description: ['Increases the damage you deal with two-handed melee weapons by 2%.', 'Increases the damage you deal with two-handed melee weapons by 4%.', 'Increases the damage you deal with two-handed melee weapons by 6%.'],
					image: "two_handed_weapon_specialization.jpg"
				}, {
					name: 'Sanctity Aura',
					maxRank: 1,
					description: function() {
						return `Increases Holy damage done by party members within 30 yards by 10%.  Players may only have one Aura on them per Paladin at any one time.`
					},
					description: ['Increases Holy damage done by party members within 30 yards by 10%.  Players may only have one Aura on them per Paladin at any one time.'],
					image: "sanctity_aura.jpg"
				}, {
					name: 'Vengeance',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 3% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.`
					},
					description: ['Gives you a 3% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.', 'Gives you a 6% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.', 'Gives you a 9% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.', 'Gives you a 12% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.', 'Gives you a 15% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.'],
					r: [6, 5],
					locked: "locked",
					image: "vengeance.jpg"
				}, {
					name: 'Repentance',
					maxRank: 1,
					description: function() {
						return `Puts the enemy target in a state of meditation, incapacitating them for up to 6 sec.  Any damage caused will awaken the target.  Only works against Humanoids.`
					},
					description: ['Puts the enemy target in a state of meditation, incapacitating them for up to 6 sec.  Any damage caused will awaken the target.  Only works against Humanoids.'],
					image: "repentance.jpg"
				}]
			}]
		},
		{
			name: 'priest',
			tree_talents: [{
				name: 'Discipline',
				talents: [{
					name: 'Unbreakable Will',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to resist Stun, Fear, and Silence effects by an additional 3%.`
					},
					description: ['Increases your chance to resist Stun, Fear, and Silence effects by an additional 3%.', 'Increases your chance to resist Stun, Fear, and Silence effects by an additional 6%.', 'Increases your chance to resist Stun, Fear, and Silence effects by an additional 9%.', 'Increases your chance to resist Stun, Fear, and Silence effects by an additional 12%.', 'Increases your chance to resist Stun, Fear, and Silence effects by an additional 15%.'],
					image: "unbreakable_will.jpg"
				}, {
					name: 'Wand Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your damage with Wands by 5%.`
					},
					description: ['Increases your damage with Wands by 5%.', 'Increases your damage with Wands by 10%.', 'Increases your damage with Wands by 15%.', 'Increases your damage with Wands by 20%.', 'Increases your damage with Wands by 25%.'],
					image: "wand_specialization.jpg"
				}, {
					name: 'Silent Resolve',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the threat generated by your spells by 4%.`
					},
					description: ['Reduces the threat generated by your spells by 4%.', 'Reduces the threat generated by your spells by 8%.', 'Reduces the threat generated by your spells by 12%.', 'Reduces the threat generated by your spells by 16%.', 'Reduces the threat generated by your spells by 20%.'],
					image: "silent_resolve.jpg"
				}, {
					name: 'Improved Power Word: Fortitude',
					maxRank: 2,
					description: ['Increases the effect of your Power Word: Fortitude and Prayer of Fortitude spells by 15%.', 'Increases the effect of your Power Word: Fortitude and Prayer of Fortitude spells by 30%.'],
					image: "improved_power_word_fortitude.jpg"
				}, {
					name: 'Improved Power Word: Shield',
					maxRank: 3,
					description: ['Increases the damage absorbed by your Power Word: Shield by 5%.', 'Increases the damage absorbed by your Power Word: Shield by 10%.', 'Increases the damage absorbed by your Power Word: Shield by 15%.'],
					image: "improved_power_word_shield.jpg"
				}, {
					name: 'Martyrdom',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 50% chance to gain the Focused Casting effect that lasts for 6 sec after being the victim of a melee or ranged critical strike.  The Focused Casting effect prevents you from losing casting time when taking damage and increases resistance to Interrupt effects by 10%.`
					},
					description: ['Gives you a 50% chance to gain the Focused Casting effect that lasts for 6 sec after being the victim of a melee or ranged critical strike.  The Focused Casting effect prevents you from losing casting time when taking damage and increases resistance to Interrupt effects by 10%.', 'Gives you a 100% chance to gain the Focused Casting effect that lasts for 6 sec after being the victim of a melee or ranged critical strike.  The Focused Casting effect prevents you from losing casting time when taking damage and increases resistance to Interrupt effects by 20%.'],
					image: "martyrdom.jpg"
				}, {
					name: 'Inner Focus',
					maxRank: 1,
					description: function() {
						return `When activated, reduces the Mana cost of your next spell by 100% and increases its critical effect chance by 25% if it is capable of a critical effect.`
					},
					description: ['When activated, reduces the Mana cost of your next spell by 100% and increases its critical effect chance by 25% if it is capable of a critical effect.'],
					image: "inner_focus.jpg"
				}, {
					name: 'Meditation',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Allows 5% of your Mana regeneration to continue while casting.`
					},
					description: ['Allows 5% of your Mana regeneration to continue while casting.', 'Allows 10% of your Mana regeneration to continue while casting.', 'Allows 15% of your Mana regeneration to continue while casting.'],
					image: "meditation.jpg"
				}, {
					name: 'Improved Inner Fire',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the Armor bonus of your Inner Fire spell by 10%.`
					},
					description: ['Increases the Armor bonus of your Inner Fire spell by 10%.', 'Increases the Armor bonus of your Inner Fire spell by 20%.', 'Increases the Armor bonus of your Inner Fire spell by 30%.'],
					image: "improved_inner_fire.jpg"
				}, {
					name: 'Mental Agility',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the mana cost of your instant cast spells by 2%.`
					},
					description: ['Reduces the mana cost of your instant cast spells by 2%.', 'Reduces the mana cost of your instant cast spells by 4%.', 'Reduces the mana cost of your instant cast spells by 6%.', 'Reduces the mana cost of your instant cast spells by 8%.', 'Reduces the mana cost of your instant cast spells by 10%.'],
					image: "mental_agility.jpg"
				}, {
					name: 'Improved Mana Burn',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the casting time of your Mana Burn spell by 0.25 secs.`
					},
					description: ['Reduces the casting time of your Mana Burn spell by 0.25 secs.', 'Reduces the casting time of your Mana Burn spell by 0.5 sec.'],
					image: "improved_mana_burn.jpg"
				}, {
					name: 'Mental Strength',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your maximum Mana by 2%.`
					},
					description: ['Increases your maximum Mana by 2%.', 'Increases your maximum Mana by 4%.', 'Increases your maximum Mana by 6%.', 'Increases your maximum Mana by 8%.', 'Increases your maximum Mana by 10%.'],
					image: "mental_strength.jpg"
				}, {
					name: 'Divine Spirit',
					maxRank: 1,
					description: function() {
						return `Holy power infuses the target, increasing their Spirit by 17 for 30 min.`
					},
					description: ['Holy power infuses the target, increasing their Spirit by 17 for 30 min.'],
					r: [7, 3],
					locked: "locked",
					image: "divine_spirit.jpg"
				}, {
					name: 'Force of Will',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your spell damage by 1% and the critical strike chance of your offensive spells by 1%.`
					},
					description: ['Increases your spell damage by 1% and the critical strike chance of your offensive spells by 1%.', 'Increases your spell damage by 2% and the critical strike chance of your offensive spells by 2%.', 'Increases your spell damage by 3% and the critical strike chance of your offensive spells by 3%.', 'Increases your spell damage by 4% and the critical strike chance of your offensive spells by 4%.', 'Increases your spell damage by 5% and the critical strike chance of your offensive spells by 5%.'],
					image: "force_of_will.jpg"
				}, {
					name: 'Power Infusion',
					maxRank: 1,
					description: function() {
						return `Infuses the target with power, increasing their spell damage and healing by 20%.  Lasts 15 sec.`
					},
					description: ['Infuses the target with power, increasing their spell damage and healing by 20%.  Lasts 15 sec.'],
					r: [11, 5],
					locked: "locked",
					image: "power_infusion.jpg"
				}]
			}, {
				name: 'Holy',
				talents: [{
					name: 'Healing Focus',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 35% chance to avoid interruption caused by damage while casting any healing spell.`
					},
					description: ['Gives you a 35% chance to avoid interruption caused by damage while casting any healing spell.', 'Gives you a 70% chance to avoid interruption caused by damage while casting any healing spell.'],
					image: "healing_focus.jpg"
				}, {
					name: 'Improved Renew',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the amount healed by your Renew spell by 5%.`
					},
					description: ['Increases the amount healed by your Renew spell by 5%.', 'Increases the amount healed by your Renew spell by 10%.', 'Increases the amount healed by your Renew spell by 15%.'],
					image: "improved_renew.jpg"
				}, {
					name: 'Holy Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical effect chance of your Holy spells by 1%.`
					},
					description: ['Increases the critical effect chance of your Holy spells by 1%.', 'Increases the critical effect chance of your Holy spells by 2%.', 'Increases the critical effect chance of your Holy spells by 3%.', 'Increases the critical effect chance of your Holy spells by 4%.', 'Increases the critical effect chance of your Holy spells by 5%.'],
					image: "holy_specialization.jpg"
				}, {
					name: 'Spell Warding',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces all spell damage taken by 2%.`
					},
					description: ['Reduces all spell damage taken by 2%.', 'Reduces all spell damage taken by 4%.', 'Reduces all spell damage taken by 6%.', 'Reduces all spell damage taken by 8%.', 'Reduces all spell damage taken by 10%.'],
					image: "spell_warding.jpg"
				}, {
					name: 'Divine Fury',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.1 sec.`
					},
					description: ['Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.1 sec.', 'Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.2 sec.', 'Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.3 sec.', 'Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.4 sec.', 'Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.5 sec.'],
					image: "divine_fury.jpg"
				}, {
					name: 'Holy Nova',
					maxRank: 1,
					description: function() {
						return `Causes an explosion of holy light around the caster, causing 28 to 33 Holy damage to all enemy targets within 10 yards and healing all party members within 10 yards for 52 to 61.  These effects cause no threat.`
					},
					description: ['Causes an explosion of holy light around the caster, causing 28 to 33 Holy damage to all enemy targets within 10 yards and healing all party members within 10 yards for 52 to 61.  These effects cause no threat.'],
					image: "holy_nova.jpg"
				}, {
					name: 'Blessed Recovery',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `After being struck by a melee or ranged critical hit, heal 8% of the damage taken over 6 sec.`
					},
					description: ['After being struck by a melee or ranged critical hit, heal 8% of the damage taken over 6 sec.', 'After being struck by a melee or ranged critical hit, heal 16% of the damage taken over 6 sec.', 'After being struck by a melee or ranged critical hit, heal 25% of the damage taken over 6 sec.'],
					image: "blessed_recovery.jpg"
				}, {
					name: 'Inspiration',
					maxRank: 3,
					description: function() {
						return `Increases your target's armor by 8% for 15 sec after getting a critical effect from your Flash Heal, Heal, Greater Heal, or Prayer of Healing spell.`
					},
					description: ["Increases your target's armor by 8% for 15 sec after getting a critical effect from your Flash Heal, Heal, Greater Heal, or Prayer of Healing spell.", "Increases your target's armor by 16% for 15 sec after getting a critical effect from your Flash Heal, Heal, Greater Heal, or Prayer of Healing spell.", "Increases your target's armor by 25% for 15 sec after getting a critical effect from your Flash Heal, Heal, Greater Heal, or Prayer of Healing spell."],
					image: "inspiration.jpg"
				}, {
					name: 'Holy Reach',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the range of your Smite and Holy Fire spells and the radius of your Prayer of Healing and Holy Nova spells by 10%.`
					},
					description: ['Increases the range of your Smite and Holy Fire spells and the radius of your Prayer of Healing and Holy Nova spells by 10%.', 'Increases the range of your Smite and Holy Fire spells and the radius of your Prayer of Healing and Holy Nova spells by 20%.'],
					image: "holy_reach.jpg"
				}, {
					name: 'Improved Healing',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the Mana cost of your Lesser Heal, Heal, and Greater Heal spells by 5%.`
					},
					description: ['Reduces the Mana cost of your Lesser Heal, Heal, and Greater Heal spells by 5%.', 'Reduces the Mana cost of your Lesser Heal, Heal, and Greater Heal spells by 10%.', 'Reduces the Mana cost of your Lesser Heal, Heal, and Greater Heal spells by 15%.'],
					image: "improved_healing.jpg"
				}, {
					name: 'Searing Light',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage of your Smite and Holy Fire spells by 5%.`
					},
					description: ['Increases the damage of your Smite and Holy Fire spells by 5%.', 'Increases the damage of your Smite and Holy Fire spells by 10%.'],
					r: [4, 5],
					locked: "locked",
					image: "searing_light.jpg"
				}, {
					name: 'Improved Prayer of Healing',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the Mana cost of your Prayer of Healing spell by 10%.`
					},
					description: ['Reduces the Mana cost of your Prayer of Healing spell by 10%.', 'Reduces the Mana cost of your Prayer of Healing spell by 20%.'],
					image: "improved_prayer_of_healing.jpg"
				}, {
					name: 'Spirit of Redemption',
					maxRank: 1,
					description: function() {
						return `Upon death, the priest becomes the Spirit of Redemption for 10 sec.  The Spirit of Redemption cannot move, attack, be attacked or targeted by any spells or effects.  While in this form the priest can cast any healing spell free of cost.  When the effect ends, the priest dies.`
					},
					description: ['Upon death, the priest becomes the Spirit of Redemption for 10 sec.  The Spirit of Redemption cannot move, attack, be attacked or targeted by any spells or effects.  While in this form the priest can cast any healing spell free of cost.  When the effect ends, the priest dies.'],
					image: "spirit_of_redemption.jpg"
				}, {
					name: 'Spiritual Guidance',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases spell damage and healing by up to 5% of your total Spirit.`
					},
					description: ['Increases spell damage and healing by up to 5% of your total Spirit.', 'Increases spell damage and healing by up to 10% of your total Spirit.', 'Increases spell damage and healing by up to 15% of your total Spirit.', 'Increases spell damage and healing by up to 20% of your total Spirit.', 'Increases spell damage and healing by up to 25% of your total Spirit.'],
					image: "spiritual_guidance.jpg"
				}, {
					name: 'Spiritual Healing',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the amount healed by your healing spells by 2%.`
					},
					description: ['Increases the amount healed by your healing spells by 2%.', 'Increases the amount healed by your healing spells by 4%.', 'Increases the amount healed by your healing spells by 6%.', 'Increases the amount healed by your healing spells by 8%.', 'Increases the amount healed by your healing spells by 10%.'],
					image: "spiritual_healing.jpg"
				}, {
					name: 'Lightwell',
					maxRank: 1,
					description: function() {
						return `Creates a holy Lightwell near the priest.  Members of your raid or party can click the Lightwell to restore 0 health over 10 sec.  Being attacked cancels the effect.  Lightwell lasts for 0 sec or 5 charges.`
					},
					description: ['Creates a holy Lightwell near the priest.  Members of your raid or party can click the Lightwell to restore 0 health over 10 sec.  Being attacked cancels the effect.  Lightwell lasts for 0 sec or 5 charges.'],
					r: [12, 1],
					locked: "locked",
					image: "lightwell.jpg"
				}]
			}, {
				name: 'Shadow',
				talents: [{
					name: 'Spirit Tap',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 20% chance to gain a 100% bonus to your Spirit after killing a target that yields experience.  For the duration, your Mana will regenerate at a 50% rate while casting.  Lasts 15 sec.`
					},
					description: ['Gives you a 20% chance to gain a 100% bonus to your Spirit after killing a target that yields experience.  For the duration, your Mana will regenerate at a 50% rate while casting.  Lasts 15 sec.', 'Gives you a 40% chance to gain a 100% bonus to your Spirit after killing a target that yields experience.  For the duration, your Mana will regenerate at a 50% rate while casting.  Lasts 15 sec.', 'Gives you a 60% chance to gain a 100% bonus to your Spirit after killing a target that yields experience.  For the duration, your Mana will regenerate at a 50% rate while casting.  Lasts 15 sec.', 'Gives you a 80% chance to gain a 100% bonus to your Spirit after killing a target that yields experience.  For the duration, your Mana will regenerate at a 50% rate while casting.  Lasts 15 sec.', 'Gives you a 100% chance to gain a 100% bonus to your Spirit after killing a target that yields experience.  For the duration, your Mana will regenerate at a 50% rate while casting.  Lasts 15 sec.'],
					image: "spirit_tap.jpg"
				}, {
					name: 'Blackout',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Shadow damage spells a 2% chance to stun the target for 3 sec.`
					},
					description: ['Gives your Shadow damage spells a 2% chance to stun the target for 3 sec.', 'Gives your Shadow damage spells a 4% chance to stun the target for 3 sec.', 'Gives your Shadow damage spells a 6% chance to stun the target for 3 sec.', 'Gives your Shadow damage spells a 8% chance to stun the target for 3 sec.', 'Gives your Shadow damage spells a 10% chance to stun the target for 3 sec.'],
					image: "blackout.jpg"
				}, {
					name: 'Shadow Affinity',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the threat generated by your Shadow spells by 8%.`
					},
					description: ['Reduces the threat generated by your Shadow spells by 8%.', 'Reduces the threat generated by your Shadow spells by 16%.', 'Reduces the threat generated by your Shadow spells by 25%.'],
					image: "shadow_affinity.jpg"
				}, {
					name: 'Improved Shadow Word: Pain',
					maxRank: 2,
					description: ['Increases the duration of your Shadow Word: Pain spell by 3 sec.', 'Increases the duration of your Shadow Word: Pain spell by 6 sec.'],
					image: "improved_shadow_word_pain.jpg"
				}, {
					name: 'Shadow Focus',
					maxRank: 5,
					description: function() {
						return `Reduces your target's chance to resist your Shadow spells by 2%.`
					},
					description: ["Reduces your target's chance to resist your Shadow spells by 2%.", "Reduces your target's chance to resist your Shadow spells by 4%.", "Reduces your target's chance to resist your Shadow spells by 6%.", "Reduces your target's chance to resist your Shadow spells by 8%.", "Reduces your target's chance to resist your Shadow spells by 10%."],
					image: "shadow_focus.jpg"
				}, {
					name: 'Improved Psychic Scream',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cooldown of your Psychic Scream spell by 2 sec.`
					},
					description: ['Reduces the cooldown of your Psychic Scream spell by 2 sec.', 'Reduces the cooldown of your Psychic Scream spell by 4 sec.'],
					image: "improved_psychic_scream.jpg"
				}, {
					name: 'Improved Mind Blast',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cooldown of your Mind Blast spell by 0.5 sec.`
					},
					description: ['Reduces the cooldown of your Mind Blast spell by 0.5 sec.', 'Reduces the cooldown of your Mind Blast spell by 1 sec.', 'Reduces the cooldown of your Mind Blast spell by 1.5 sec.', 'Reduces the cooldown of your Mind Blast spell by 2 sec.', 'Reduces the cooldown of your Mind Blast spell by 2.5 sec.'],
					image: "improved_mind_blast.jpg"
				}, {
					name: 'Mind Flay',
					maxRank: 1,
					description: function() {
						return `Assault the target's mind with Shadow energy, causing 75 Shadow damage over 3 sec and slowing their movement speed by 50%.`
					},
					description: ["Assault the target's mind with Shadow energy, causing 75 Shadow damage over 3 sec and slowing their movement speed by 50%."],
					image: "mind_flay.jpg"
				}, {
					name: 'Improved Fade',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Decreases the cooldown of your Fade ability by 3 sec.`
					},
					description: ['Decreases the cooldown of your Fade ability by 3 sec.', 'Decreases the cooldown of your Fade ability by 6 sec.'],
					image: "improved_fade.jpg"
				}, {
					name: 'Shadow Reach',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the range of your Shadow damage spells by 6%.`
					},
					description: ['Increases the range of your Shadow damage spells by 6%.', 'Increases the range of your Shadow damage spells by 13%.', 'Increases the range of your Shadow damage spells by 20%.'],
					image: "shadow_reach.jpg"
				}, {
					name: 'Shadow Weaving',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Your Shadow damage spells have a 20% chance to cause your target to be vulnerable to Shadow damage.  This vulnerability increases the Shadow damage dealt to your target by 3% and lasts 15 sec.  Stacks up to 15001 times.`
					},
					description: ['Your Shadow damage spells have a 20% chance to cause your target to be vulnerable to Shadow damage.  This vulnerability increases the Shadow damage dealt to your target by 3% and lasts 15 sec.  Stacks up to 15001 times.', 'Your Shadow damage spells have a 40% chance to cause your target to be vulnerable to Shadow damage.  This vulnerability increases the Shadow damage dealt to your target by 3% and lasts 15 sec.  Stacks up to 15001 times.', 'Your Shadow damage spells have a 60% chance to cause your target to be vulnerable to Shadow damage.  This vulnerability increases the Shadow damage dealt to your target by 3% and lasts 15 sec.  Stacks up to 15001 times.', 'Your Shadow damage spells have a 80% chance to cause your target to be vulnerable to Shadow damage.  This vulnerability increases the Shadow damage dealt to your target by 3% and lasts 15 sec.  Stacks up to 15001 times.', 'Your Shadow damage spells have a 100% chance to cause your target to be vulnerable to Shadow damage.  This vulnerability increases the Shadow damage dealt to your target by 3% and lasts 15 sec.  Stacks up to 15001 times.'],
					image: "shadow_weaving.jpg"
				}, {
					name: 'Silence',
					maxRank: 1,
					description: function() {
						return `Silences the target, preventing them from casting spells for 5 sec.`
					},
					description: ['Silences the target, preventing them from casting spells for 5 sec.'],
					r: [5, 2],
					locked: "locked",
					image: "silence.jpg"
				}, {
					name: 'Vampiric Embrace',
					maxRank: 1,
					description: function() {
						return `Afflicts your target with Shadow energy that causes all party members to be healed for 20% of any Shadow spell damage you deal for 1 min.`
					},
					description: ['Afflicts your target with Shadow energy that causes all party members to be healed for 20% of any Shadow spell damage you deal for 1 min.'],
					image: "vampiric_embrace.jpg"
				}, {
					name: 'Improved Vampiric Embrace',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the percentage healed by Vampiric Embrace by an additional 5%.`
					},
					description: ['Increases the percentage healed by Vampiric Embrace by an additional 5%.', 'Increases the percentage healed by Vampiric Embrace by an additional 10%.'],
					r: [12, 1],
					locked: "locked",
					image: "improved_vampiric_embrace.jpg"
				}, {
					name: 'Darkness',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your Shadow spell damage by 2%.`
					},
					description: ['Increases your Shadow spell damage by 2%.', 'Increases your Shadow spell damage by 4%.', 'Increases your Shadow spell damage by 6%.', 'Increases your Shadow spell damage by 8%.', 'Increases your Shadow spell damage by 10%.'],
					image: "darkness.jpg"
				}, {
					name: 'Shadowform',
					maxRank: 1,
					description: function() {
						return `Assume a Shadowform, increasing your Shadow damage by 15% and reducing Physical damage done to you by 15%.  However, you may not cast Holy spells while in this form.`
					},
					description: ['Assume a Shadowform, increasing your Shadow damage by 15% and reducing Physical damage done to you by 15%.  However, you may not cast Holy spells while in this form.'],
					r: [12, 1],
					locked: "locked",
					image: "shadowform.jpg"
				}]
			}]
		},
		{
			name: 'rogue',
			tree_talents: [{
				name: 'Assassination',
				talents: [{
					name: 'Improved Eviscerate',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your Eviscerate ability by 5%.`
					},
					description: ['Increases the damage done by your Eviscerate ability by 5%.', 'Increases the damage done by your Eviscerate ability by 10%.', 'Increases the damage done by your Eviscerate ability by 15%.'],
					image: "improved_eviscerate.jpg"
				}, {
					name: 'Remorseless Attacks',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `After killing an opponent that yields experience or honor, gives you a 20% increased critical strike chance on your next Sinister Strike, Backstab, Ambush, or Ghostly Strike.  Lasts 20 sec.`
					},
					description: ['After killing an opponent that yields experience or honor, gives you a 20% increased critical strike chance on your next Sinister Strike, Backstab, Ambush, or Ghostly Strike.  Lasts 20 sec.', 'After killing an opponent that yields experience or honor, gives you a 40% increased critical strike chance on your next Sinister Strike, Backstab, Ambush, or Ghostly Strike.  Lasts 20 sec.'],
					image: "remorseless_attacks.jpg"
				}, {
					name: 'Malice',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your critical strike chance by 1%.`
					},
					description: ['Increases your critical strike chance by 1%.', 'Increases your critical strike chance by 2%.', 'Increases your critical strike chance by 3%.', 'Increases your critical strike chance by 4%.', 'Increases your critical strike chance by 5%.'],
					image: "malice.jpg"
				}, {
					name: 'Ruthlessness',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your finishing moves a 20% chance to add a combo point to your target.`
					},
					description: ['Gives your finishing moves a 20% chance to add a combo point to your target.', 'Gives your finishing moves a 40% chance to add a combo point to your target.', 'Gives your finishing moves a 60% chance to add a combo point to your target.'],
					image: "ruthlessness.jpg"
				}, {
					name: 'Murder',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases all damage caused against Humanoid, Giant, Beast and Dragonkin targets by 1%.`
					},
					description: ['Increases all damage caused against Humanoid, Giant, Beast and Dragonkin targets by 1%.', 'Increases all damage caused against Humanoid, Giant, Beast and Dragonkin targets by 2%.'],
					image: "murder.jpg"
				}, {
					name: 'Improved Slice and Dice',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the duration of your Slice and Dice ability by 15%.`
					},
					description: ['Increases the duration of your Slice and Dice ability by 15%.', 'Increases the duration of your Slice and Dice ability by 30%.', 'Increases the duration of your Slice and Dice ability by 45%.'],
					image: "improved_slice_and_dice.jpg"
				}, {
					name: 'Relentless Strikes',
					maxRank: 1,
					description: function() {
						return `Your finishing moves have a 1101000000% chance per combo point to restore 25 energy.`
					},
					description: ['Your finishing moves have a 1101000000% chance per combo point to restore 25 energy.'],
					image: "relentless_strikes.jpg"
				}, {
					name: 'Improved Expose Armor',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the armor reduced by your Expose Armor ability by 25%.`
					},
					description: ['Increases the armor reduced by your Expose Armor ability by 25%.', 'Increases the armor reduced by your Expose Armor ability by 50%.'],
					image: "improved_expose_armor.jpg"
				}, {
					name: 'Lethality',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Ghostly Strike, and Hemorrhage abilities by 6%.`
					},
					description: ['Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Ghostly Strike, and Hemorrhage abilities by 6%.', 'Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Ghostly Strike, and Hemorrhage abilities by 12%.', 'Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Ghostly Strike, and Hemorrhage abilities by 18%.', 'Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Ghostly Strike, and Hemorrhage abilities by 24%.', 'Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Ghostly Strike, and Hemorrhage abilities by 30%.'],
					r: [2, 5],
					locked: "locked",
					image: "lethality.jpg"
				}, {
					name: 'Vile Poisons',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage dealt by your poisons by 4% and gives your poisons an additional 8% chance to resist dispel effects.`
					},
					description: ['Increases the damage dealt by your poisons by 4% and gives your poisons an additional 8% chance to resist dispel effects.', 'Increases the damage dealt by your poisons by 8% and gives your poisons an additional 16% chance to resist dispel effects.', 'Increases the damage dealt by your poisons by 12% and gives your poisons an additional 24% chance to resist dispel effects.', 'Increases the damage dealt by your poisons by 16% and gives your poisons an additional 32% chance to resist dispel effects.', 'Increases the damage dealt by your poisons by 20% and gives your poisons an additional 40% chance to resist dispel effects.'],
					image: "vile_poisons.jpg"
				}, {
					name: 'Improved Poisons',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the chance to apply poisons to your target by 2%.`
					},
					description: ['Increases the chance to apply poisons to your target by 2%.', 'Increases the chance to apply poisons to your target by 4%.', 'Increases the chance to apply poisons to your target by 6%.', 'Increases the chance to apply poisons to your target by 8%.', 'Increases the chance to apply poisons to your target by 10%.'],
					image: "improved_poisons.jpg"
				}, {
					name: 'Cold Blood',
					maxRank: 1,
					description: function() {
						return `When activated, increases the critical strike chance of your next Sinister Strike, Backstab, Ambush, or Eviscerate by 100%.`
					},
					description: ['When activated, increases the critical strike chance of your next Sinister Strike, Backstab, Ambush, or Eviscerate by 100%.'],
					image: "cold_blood.jpg"
				}, {
					name: 'Improved Kidney Shot',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `While affected by your Kidney Shot ability, the target receives an additional 3% damage from all sources.`
					},
					description: ['While affected by your Kidney Shot ability, the target receives an additional 3% damage from all sources.', 'While affected by your Kidney Shot ability, the target receives an additional 6% damage from all sources.', 'While affected by your Kidney Shot ability, the target receives an additional 9% damage from all sources.'],
					image: "improved_kidney_shot.jpg"
				}, {
					name: 'Seal Fate',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Your critical strikes from abilities that add combo points  have a 20% chance to add an additional combo point.`
					},
					description: ['Your critical strikes from abilities that add combo points  have a 20% chance to add an additional combo point.', 'Your critical strikes from abilities that add combo points  have a 40% chance to add an additional combo point.', 'Your critical strikes from abilities that add combo points  have a 60% chance to add an additional combo point.', 'Your critical strikes from abilities that add combo points  have a 80% chance to add an additional combo point.', 'Your critical strikes from abilities that add combo points  have a 100% chance to add an additional combo point.'],
					r: [11, 1],
					locked: "locked",
					image: "seal_fate.jpg"
				}, {
					name: 'Vigor',
					maxRank: 1,
					description: function() {
						return `Increases your maximum Energy by 10.`
					},
					description: ['Increases your maximum Energy by 10.'],
					image: "vigor.jpg"
				}]
			}, {
				name: 'Combat',
				talents: [{
					name: 'Improved Gouge',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the effect duration of your Gouge ability by 0.5 sec.`
					},
					description: ['Increases the effect duration of your Gouge ability by 0.5 sec.', 'Increases the effect duration of your Gouge ability by 1 sec.', 'Increases the effect duration of your Gouge ability by 1.5 sec.'],
					image: "improved_gouge.jpg"
				}, {
					name: 'Improved Sinister Strike',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the Energy cost of your Sinister Strike ability by 3.`
					},
					description: ['Reduces the Energy cost of your Sinister Strike ability by 3.', 'Reduces the Energy cost of your Sinister Strike ability by 5.'],
					image: "improved_sinister_strike.jpg"
				}, {
					name: 'Lightning Reflexes',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your Dodge chance by 1%.`
					},
					description: ['Increases your Dodge chance by 1%.', 'Increases your Dodge chance by 2%.', 'Increases your Dodge chance by 3%.', 'Increases your Dodge chance by 4%.', 'Increases your Dodge chance by 5%.'],
					image: "lightning_reflexes.jpg"
				}, {
					name: 'Improved Backstab',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike chance of your Backstab ability by 10%.`
					},
					description: ['Increases the critical strike chance of your Backstab ability by 10%.', 'Increases the critical strike chance of your Backstab ability by 20%.', 'Increases the critical strike chance of your Backstab ability by 30%.'],
					image: "improved_backstab.jpg"
				}, {
					name: 'Deflection',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your Parry chance by 1%.`
					},
					description: ['Increases your Parry chance by 1%.', 'Increases your Parry chance by 2%.', 'Increases your Parry chance by 3%.', 'Increases your Parry chance by 4%.', 'Increases your Parry chance by 5%.'],
					image: "deflection.jpg"
				}, {
					name: 'Precision',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to hit with melee weapons by 1%.`
					},
					description: ['Increases your chance to hit with melee weapons by 1%.', 'Increases your chance to hit with melee weapons by 2%.', 'Increases your chance to hit with melee weapons by 3%.', 'Increases your chance to hit with melee weapons by 4%.', 'Increases your chance to hit with melee weapons by 5%.'],
					image: "precision.jpg"
				}, {
					name: 'Endurance',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cooldown of your Sprint and Evasion abilities by 45 sec.`
					},
					description: ['Reduces the cooldown of your Sprint and Evasion abilities by 45 sec.', 'Reduces the cooldown of your Sprint and Evasion abilities by 1.5 min.'],
					image: "endurance.jpg"
				}, {
					name: 'Riposte',
					maxRank: 1,
					description: function() {
						return `A strike that becomes active after parrying an opponent's attack.  This attack deals 150% weapon damage and disarms the target for 6 sec.`
					},
					description: ["A strike that becomes active after parrying an opponent's attack.  This attack deals 150% weapon damage and disarms the target for 6 sec."],
					r: [4, 5],
					locked: "locked",
					image: "riposte.jpg"
				}, {
					name: 'Improved Sprint',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives a 50% chance to remove all movement impairing effects when you activate your Sprint ability.`
					},
					description: ['Gives a 50% chance to remove all movement impairing effects when you activate your Sprint ability.', 'Gives a 100% chance to remove all movement impairing effects when you activate your Sprint ability.'],
					image: "improved_sprint.jpg"
				}, {
					name: 'Improved Kick',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Kick ability a 50% chance to silence the target for 2 sec.`
					},
					description: ['Gives your Kick ability a 50% chance to silence the target for 2 sec.', 'Gives your Kick ability a 100% chance to silence the target for 2 sec.'],
					image: "improved_kick.jpg"
				}, {
					name: 'Dagger Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to get a critical strike with Daggers by 1%.`
					},
					description: ['Increases your chance to get a critical strike with Daggers by 1%.', 'Increases your chance to get a critical strike with Daggers by 2%.', 'Increases your chance to get a critical strike with Daggers by 3%.', 'Increases your chance to get a critical strike with Daggers by 4%.', 'Increases your chance to get a critical strike with Daggers by 5%.'],
					image: "dagger_specialization.jpg"
				}, {
					name: 'Dual Wield Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your offhand weapon by 10%.`
					},
					description: ['Increases the damage done by your offhand weapon by 10%.', 'Increases the damage done by your offhand weapon by 20%.', 'Increases the damage done by your offhand weapon by 30%.', 'Increases the damage done by your offhand weapon by 40%.', 'Increases the damage done by your offhand weapon by 50%.'],
					r: [5, 5],
					locked: "locked",
					image: "dual_wield_specialization.jpg"
				}, {
					name: 'Mace Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your skill with Maces by 1, and gives you a 1% chance to stun your target for 3 sec with a mace.`
					},
					description: ['Increases your skill with Maces by 1, and gives you a 1% chance to stun your target for 3 sec with a mace.', 'Increases your skill with Maces by 2, and gives you a 2% chance to stun your target for 3 sec with a mace.', 'Increases your skill with Maces by 3, and gives you a 3% chance to stun your target for 3 sec with a mace.', 'Increases your skill with Maces by 4, and gives you a 4% chance to stun your target for 3 sec with a mace.', 'Increases your skill with Maces by 5, and gives you a 6% chance to stun your target for 3 sec with a mace.'],
					image: "mace_specialization.jpg"
				}, {
					name: 'Blade Flurry',
					maxRank: 1,
					description: function() {
						return `Increases your attack speed by 20%.  In addition, attacks strike an additional nearby opponent.  Lasts 15 sec.`
					},
					description: ['Increases your attack speed by 20%.  In addition, attacks strike an additional nearby opponent.  Lasts 15 sec.'],
					image: "blade_flurry.jpg"
				}, {
					name: 'Sword Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 1% chance to get an extra attack on the same target after dealing damage with your Sword.`
					},
					description: ['Gives you a 1% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 2% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 3% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 4% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 5% chance to get an extra attack on the same target after dealing damage with your Sword.'],
					image: "sword_specialization.jpg"
				}, {
					name: 'Fist Weapon Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to get a critical strike with Fist Weapons by 1%.`
					},
					description: ['Increases your chance to get a critical strike with Fist Weapons by 1%.', 'Increases your chance to get a critical strike with Fist Weapons by 2%.', 'Increases your chance to get a critical strike with Fist Weapons by 3%.', 'Increases your chance to get a critical strike with Fist Weapons by 4%.', 'Increases your chance to get a critical strike with Fist Weapons by 5%.'],
					image: "fist_weapon_specialization.jpg"
				}, {
					name: 'Weapon Expertise',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your skill with Sword, Fist and Dagger weapons by 3.`
					},
					description: ['Increases your skill with Sword, Fist and Dagger weapons by 3.', 'Increases your skill with Sword, Fist and Dagger weapons by 5.'],
					r: [13, 1],
					locked: "locked",
					image: "weapon_expertise.jpg"
				}, {
					name: 'Aggression',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage of your Sinister Strike and Eviscerate abilities by 2%.`
					},
					description: ['Increases the damage of your Sinister Strike and Eviscerate abilities by 2%.', 'Increases the damage of your Sinister Strike and Eviscerate abilities by 4%.', 'Increases the damage of your Sinister Strike and Eviscerate abilities by 6%.'],
					image: "aggression.jpg"
				}, {
					name: 'Adrenaline Rush',
					maxRank: 1,
					description: function() {
						return `Increases your Energy regeneration rate by 100% for 15 sec.`
					},
					description: ['Increases your Energy regeneration rate by 100% for 15 sec.'],
					image: "adrenaline_rush.jpg"
				}]
			}, {
				name: 'Subtlety',
				talents: [{
					name: 'Master of Deception',
					maxRank: 5,
					description: ['Reduces the chance enemies have to detect you while in Stealth mode.', 'Reduces the chance enemies have to detect you while in Stealth mode.  More effective than Master of Deception (Rank 1).', 'Reduces the chance enemies have to detect you while in Stealth mode.  More effective than Master of Deception (Rank 2).', 'Reduces the chance enemies have to detect you while in Stealth mode.  More effective than Master of Deception (Rank 3).', 'Reduces the chance enemies have to detect you while in Stealth mode.  More effective than Master of Deception (Rank 4).'],
					image: "master_of_deception.jpg"
				}, {
					name: 'Opportunity',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage dealt when striking from behind with your Backstab, Garrote, or Ambush abilities by 4%.`
					},
					description: ['Increases the damage dealt when striking from behind with your Backstab, Garrote, or Ambush abilities by 4%.', 'Increases the damage dealt when striking from behind with your Backstab, Garrote, or Ambush abilities by 8%.', 'Increases the damage dealt when striking from behind with your Backstab, Garrote, or Ambush abilities by 12%.', 'Increases the damage dealt when striking from behind with your Backstab, Garrote, or Ambush abilities by 16%.', 'Increases the damage dealt when striking from behind with your Backstab, Garrote, or Ambush abilities by 20%.'],
					image: "opportunity.jpg"
				}, {
					name: 'Sleight of Hand',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the chance you are critically hit by melee and ranged attacks by 1% and increases the threat reduction of your Feint ability by 10%.`
					},
					description: ['Reduces the chance you are critically hit by melee and ranged attacks by 1% and increases the threat reduction of your Feint ability by 10%.', 'Reduces the chance you are critically hit by melee and ranged attacks by 2% and increases the threat reduction of your Feint ability by 20%.'],
					image: "sleight_of_hand.jpg"
				}, {
					name: 'Elusiveness',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cooldown of your Vanish and Blind abilities by 45 sec.`
					},
					description: ['Reduces the cooldown of your Vanish and Blind abilities by 45 sec.', 'Reduces the cooldown of your Vanish and Blind abilities by 1.5 min.'],
					image: "elusiveness.jpg"
				}, {
					name: 'Camouflage',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your speed while stealthed by 3% and reduces the cooldown of your Stealth ability by 1 sec.`
					},
					description: ['Increases your speed while stealthed by 3% and reduces the cooldown of your Stealth ability by 1 sec.', 'Increases your speed while stealthed by 6% and reduces the cooldown of your Stealth ability by 2 sec.', 'Increases your speed while stealthed by 9% and reduces the cooldown of your Stealth ability by 3 sec.', 'Increases your speed while stealthed by 12% and reduces the cooldown of your Stealth ability by 4 sec.', 'Increases your speed while stealthed by 15% and reduces the cooldown of your Stealth ability by 5 sec.'],
					image: "camouflage.jpg"
				}, {
					name: 'Initiative',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 25% chance to add an additional combo point to your target when using your Ambush, Garrote, or Cheap Shot ability.`
					},
					description: ['Gives you a 25% chance to add an additional combo point to your target when using your Ambush, Garrote, or Cheap Shot ability.', 'Gives you a 50% chance to add an additional combo point to your target when using your Ambush, Garrote, or Cheap Shot ability.', 'Gives you a 75% chance to add an additional combo point to your target when using your Ambush, Garrote, or Cheap Shot ability.'],
					image: "initiative.jpg"
				}, {
					name: 'Ghostly Strike',
					maxRank: 1,
					description: function() {
						return `A strike that deals 125% weapon damage and increases your chance to dodge by 15% for 7 sec.  Awards 1 combo point.`
					},
					description: ['A strike that deals 125% weapon damage and increases your chance to dodge by 15% for 7 sec.  Awards 1 combo point.'],
					image: "ghostly_strike.jpg"
				}, {
					name: 'Improved Ambush',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike chance of your Ambush ability by 15%.`
					},
					description: ['Increases the critical strike chance of your Ambush ability by 15%.', 'Increases the critical strike chance of your Ambush ability by 30%.', 'Increases the critical strike chance of your Ambush ability by 45%.'],
					image: "improved_ambush.jpg"
				}, {
					name: 'Setup',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 15% chance to add a combo point to your target after dodging their attack or fully resisting one of their spells.`
					},
					description: ['Gives you a 15% chance to add a combo point to your target after dodging their attack or fully resisting one of their spells.', 'Gives you a 30% chance to add a combo point to your target after dodging their attack or fully resisting one of their spells.', 'Gives you a 45% chance to add a combo point to your target after dodging their attack or fully resisting one of their spells.'],
					image: "setup.jpg"
				}, {
					name: 'Improved Sap',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 30% chance to return to stealth mode after using your Sap ability.`
					},
					description: ['Gives you a 30% chance to return to stealth mode after using your Sap ability.', 'Gives you a 60% chance to return to stealth mode after using your Sap ability.', 'Gives you a 90% chance to return to stealth mode after using your Sap ability.'],
					image: "improved_sap.jpg"
				}, {
					name: 'Serrated Blades',
					maxRank: 3,
					description: function() {
						return `Causes your attacks to ignore 0 of your target's Armor and increases the damage dealt by your Rupture ability by 10%.  The amount of Armor reduced increases with your level.`
					},
					description: ["Causes your attacks to ignore 0 of your target's Armor and increases the damage dealt by your Rupture ability by 10%.  The amount of Armor reduced increases with your level.", "Causes your attacks to ignore 0 of your target's Armor and increases the damage dealt by your Rupture ability by 20%.  The amount of Armor reduced increases with your level.", "Causes your attacks to ignore 0 of your target's Armor and increases the damage dealt by your Rupture ability by 30%.  The amount of Armor reduced increases with your level."],
					image: "serrated_blades.jpg"
				}, {
					name: 'Heightened Senses',
					maxRank: 2,
					description: ['Increases your Stealth detection and reduces the chance you are hit by spells and ranged attacks by 2%.', 'Increases your Stealth detection and reduces the chance you are hit by spells and ranged attacks by 4%.  More effective than Heightened Senses (Rank 1).'],
					image: "heightened_senses.jpg"
				}, {
					name: 'Preparation',
					maxRank: 1,
					description: function() {
						return `When activated, this ability immediately finishes the cooldown on your other Rogue abilities.`
					},
					description: ['When activated, this ability immediately finishes the cooldown on your other Rogue abilities.'],
					image: "preparation.jpg"
				}, {
					name: 'Dirty Deeds',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the Energy cost of your Cheap Shot and Garrote abilities by 10.`
					},
					description: ['Reduces the Energy cost of your Cheap Shot and Garrote abilities by 10.', 'Reduces the Energy cost of your Cheap Shot and Garrote abilities by 20.'],
					image: "dirty_deeds.jpg"
				}, {
					name: 'Hemorrhage',
					maxRank: 1,
					description: function() {
						return `An instant strike that damages the opponent and causes the target to hemorrhage, increasing any Physical damage dealt to the target by up to 3.  Lasts 30 charges or 15 sec.  Awards 1 combo point.`
					},
					description: ['An instant strike that damages the opponent and causes the target to hemorrhage, increasing any Physical damage dealt to the target by up to 3.  Lasts 30 charges or 15 sec.  Awards 1 combo point.'],
					r: [10, 3],
					locked: "locked",
					image: "hemorrhage.jpg"
				}, {
					name: 'Deadliness',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your Attack Power by 2%.`
					},
					description: ['Increases your Attack Power by 2%.', 'Increases your Attack Power by 4%.', 'Increases your Attack Power by 6%.', 'Increases your Attack Power by 8%.', 'Increases your Attack Power by 10%.'],
					image: "deadliness.jpg"
				}, {
					name: 'Premeditation',
					maxRank: 1,
					description: function() {
						return `When used, adds 2 combo points to your target.  You must add to or use those combo points within 10 sec or the combo points are lost. `
					},
					description: ['When used, adds 2 combo points to your target.  You must add to or use those combo points within 10 sec or the combo points are lost. '],
					r: [12, 1],
					locked: "locked",
					image: "premeditation.jpg"
				}]
			}]
		},
		{
			name: 'shaman',
			tree_talents: [{
				name: 'Elemental',
				talents: [{
					name: 'Convection',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the mana cost of your Shock, Lightning Bolt and Chain Lightning spells by 2%.`
					},
					description: ['Reduces the mana cost of your Shock, Lightning Bolt and Chain Lightning spells by 2%.', 'Reduces the mana cost of your Shock, Lightning Bolt and Chain Lightning spells by 4%.', 'Reduces the mana cost of your Shock, Lightning Bolt and Chain Lightning spells by 6%.', 'Reduces the mana cost of your Shock, Lightning Bolt and Chain Lightning spells by 8%.', 'Reduces the mana cost of your Shock, Lightning Bolt and Chain Lightning spells by 10%.'],
					image: "convection.jpg"
				}, {
					name: 'Concussion',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your Lightning Bolt, Chain Lightning and Shock spells by 1%.`
					},
					description: ['Increases the damage done by your Lightning Bolt, Chain Lightning and Shock spells by 1%.', 'Increases the damage done by your Lightning Bolt, Chain Lightning and Shock spells by 2%.', 'Increases the damage done by your Lightning Bolt, Chain Lightning and Shock spells by 3%.', 'Increases the damage done by your Lightning Bolt, Chain Lightning and Shock spells by 4%.', 'Increases the damage done by your Lightning Bolt, Chain Lightning and Shock spells by 5%.'],
					image: "concussion.jpg"
				}, {
					name: "Earth's Grasp",
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the health of your Stoneclaw Totem by 25% and the radius of your Earthbind Totem by 10%.`
					},
					description: ['Increases the health of your Stoneclaw Totem by 25% and the radius of your Earthbind Totem by 10%.', 'Increases the health of your Stoneclaw Totem by 50% and the radius of your Earthbind Totem by 20%.'],
					image: "earths_grasp.jpg"
				}, {
					name: 'Elemental Warding',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces damage taken from Fire, Frost and Nature effects by 4%.`
					},
					description: ['Reduces damage taken from Fire, Frost and Nature effects by 4%.', 'Reduces damage taken from Fire, Frost and Nature effects by 7%.', 'Reduces damage taken from Fire, Frost and Nature effects by 10%.'],
					image: "elemental_warding.jpg"
				}, {
					name: 'Call of Flame',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your Fire Totems by 5%.`
					},
					description: ['Increases the damage done by your Fire Totems by 5%.', 'Increases the damage done by your Fire Totems by 10%.', 'Increases the damage done by your Fire Totems by 15%.'],
					image: "call_of_flame.jpg"
				}, {
					name: 'Elemental Focus',
					maxRank: 1,
					description: function() {
						return `Gives you a 10% chance to enter a Clearcasting state after casting any Fire, Frost, or Nature damage spell.  The Clearcasting state reduces the mana cost of your next damage spell by 100%.`
					},
					description: ['Gives you a 10% chance to enter a Clearcasting state after casting any Fire, Frost, or Nature damage spell.  The Clearcasting state reduces the mana cost of your next damage spell by 100%.'],
					image: "elemental_focus.jpg"
				}, {
					name: 'Reverberation',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cooldown of your Shock spells by 0.2 sec.`
					},
					description: ['Reduces the cooldown of your Shock spells by 0.2 sec.', 'Reduces the cooldown of your Shock spells by 0.4 sec.', 'Reduces the cooldown of your Shock spells by 0.6 sec.', 'Reduces the cooldown of your Shock spells by 0.8 sec.', 'Reduces the cooldown of your Shock spells by 1 sec.'],
					image: "reverberation.jpg"
				}, {
					name: 'Call of Thunder',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 1%.`
					},
					description: ['Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 1%.', 'Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 2%.', 'Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 3%.', 'Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 4%.', 'Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 6%.'],
					image: "call_of_thunder.jpg"
				}, {
					name: 'Improved Fire Totems',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the delay before your Fire Nova Totem activates by 1 sec. and decreases the threat generated by your Magma Totem by 25%.`
					},
					description: ['Reduces the delay before your Fire Nova Totem activates by 1 sec. and decreases the threat generated by your Magma Totem by 25%.', 'Reduces the delay before your Fire Nova Totem activates by 2 sec. and decreases the threat generated by your Magma Totem by 50%.'],
					image: "improved_fire_totems.jpg"
				}, {
					name: 'Eye of the Storm',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 33% chance to gain the Focused Casting effect that lasts for 6 sec after being the victim of a melee or ranged critical strike.  The Focused Casting effect prevents you from losing casting time when taking damage.`
					},
					description: ['Gives you a 33% chance to gain the Focused Casting effect that lasts for 6 sec after being the victim of a melee or ranged critical strike.  The Focused Casting effect prevents you from losing casting time when taking damage.', 'Gives you a 66% chance to gain the Focused Casting effect that lasts for 6 sec after being the victim of a melee or ranged critical strike.  The Focused Casting effect prevents you from losing casting time when taking damage.', 'Gives you a 100% chance to gain the Focused Casting effect that lasts for 6 sec after being the victim of a melee or ranged critical strike.  The Focused Casting effect prevents you from losing casting time when taking damage.'],
					image: "eye_of_the_storm.jpg"
				}, {
					name: 'Elemental Devastation',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Your offensive spell crits will increase your chance to get a critical strike with melee attacks by 3% for 10 sec.`
					},
					description: ['Your offensive spell crits will increase your chance to get a critical strike with melee attacks by 3% for 10 sec.', 'Your offensive spell crits will increase your chance to get a critical strike with melee attacks by 6% for 10 sec.', 'Your offensive spell crits will increase your chance to get a critical strike with melee attacks by 9% for 10 sec.'],
					image: "elemental_devastation.jpg"
				}, {
					name: 'Storm Reach',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the range of your Lightning Bolt and Chain Lightning spells by 3 yards.`
					},
					description: ['Increases the range of your Lightning Bolt and Chain Lightning spells by 3 yards.', 'Increases the range of your Lightning Bolt and Chain Lightning spells by 6 yards.'],
					image: "storm_reach.jpg"
				}, {
					name: 'Elemental Fury',
					maxRank: 1,
					description: function() {
						return `Increases the critical strike damage bonus of your Searing, Magma, and Fire Nova Totems and your Fire, Frost, and Nature spells by 100%.`
					},
					description: ['Increases the critical strike damage bonus of your Searing, Magma, and Fire Nova Totems and your Fire, Frost, and Nature spells by 100%.'],
					image: "elemental_fury.jpg"
				}, {
					name: 'Lightning Mastery',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cast time of your Lightning Bolt and Chain Lightning spells by 0.2 sec.`
					},
					description: ['Reduces the cast time of your Lightning Bolt and Chain Lightning spells by 0.2 sec.', 'Reduces the cast time of your Lightning Bolt and Chain Lightning spells by 0.4 sec.', 'Reduces the cast time of your Lightning Bolt and Chain Lightning spells by 0.6 sec.', 'Reduces the cast time of your Lightning Bolt and Chain Lightning spells by 0.8 sec.', 'Reduces the cast time of your Lightning Bolt and Chain Lightning spells by 1 sec.'],
					r: [7, 5],
					locked: "locked",
					image: "lightning_mastery.jpg"
				}, {
					name: 'Elemental Mastery',
					maxRank: 1,
					description: function() {
						return `When activated, this spell gives your next Fire, Frost, or Nature damage spell a 100% critical strike chance and reduces the mana cost by 100%.`
					},
					description: ['When activated, this spell gives your next Fire, Frost, or Nature damage spell a 100% critical strike chance and reduces the mana cost by 100%.'],
					r: [12, 1],
					locked: "locked",
					image: "elemental_mastery.jpg"
				}]
			}, {
				name: 'Enhancement',
				talents: [{
					name: 'Ancestral Knowledge',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your maximum Mana by 1%.`
					},
					description: ['Increases your maximum Mana by 1%.', 'Increases your maximum Mana by 2%.', 'Increases your maximum Mana by 3%.', 'Increases your maximum Mana by 4%.', 'Increases your maximum Mana by 5%.'],
					image: "ancestral_knowledge.jpg"
				}, {
					name: 'Shield Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to block attacks with a shield by 1% and increases the amount blocked by 5%.`
					},
					description: ['Increases your chance to block attacks with a shield by 1% and increases the amount blocked by 5%.', 'Increases your chance to block attacks with a shield by 2% and increases the amount blocked by 10%.', 'Increases your chance to block attacks with a shield by 3% and increases the amount blocked by 15%.', 'Increases your chance to block attacks with a shield by 4% and increases the amount blocked by 20%.', 'Increases your chance to block attacks with a shield by 5% and increases the amount blocked by 25%.'],
					image: "shield_specialization.jpg"
				}, {
					name: 'Guardian Totems',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the amount of damage reduced by your Stoneskin Totem and Windwall Totem by 10% and reduces the cooldown of your Grounding Totem by 1 sec.`
					},
					description: ['Increases the amount of damage reduced by your Stoneskin Totem and Windwall Totem by 10% and reduces the cooldown of your Grounding Totem by 1 sec.', 'Increases the amount of damage reduced by your Stoneskin Totem and Windwall Totem by 20% and reduces the cooldown of your Grounding Totem by 2 sec.'],
					image: "guardian_totems.jpg"
				}, {
					name: 'Thundering Strikes',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Improves your chance to get a critical strike with your weapon attacks by 1%.`
					},
					description: ['Improves your chance to get a critical strike with your weapon attacks by 1%.', 'Improves your chance to get a critical strike with your weapon attacks by 2%.', 'Improves your chance to get a critical strike with your weapon attacks by 3%.', 'Improves your chance to get a critical strike with your weapon attacks by 4%.', 'Improves your chance to get a critical strike with your weapon attacks by 5%.'],
					image: "thundering_strikes.jpg"
				}, {
					name: 'Improved Ghost Wolf',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cast time of your Ghost Wolf spell by 1 sec.`
					},
					description: ['Reduces the cast time of your Ghost Wolf spell by 1 sec.', 'Reduces the cast time of your Ghost Wolf spell by 2 sec.'],
					image: "improved_ghost_wolf.jpg"
				}, {
					name: 'Improved Lightning Shield',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your Lightning Shield orbs by 5%.`
					},
					description: ['Increases the damage done by your Lightning Shield orbs by 5%.', 'Increases the damage done by your Lightning Shield orbs by 10%.', 'Increases the damage done by your Lightning Shield orbs by 15%.'],
					image: "improved_lightning_shield.jpg"
				}, {
					name: 'Enhancing Totems',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the effect of your Strength of Earth and Grace of Air Totems by 8%.`
					},
					description: ['Increases the effect of your Strength of Earth and Grace of Air Totems by 8%.', 'Increases the effect of your Strength of Earth and Grace of Air Totems by 15%.'],
					image: "enhancing_totems.jpg"
				}, {
					name: 'Two-Handed Axes and Maces',
					maxRank: 1,
					description: ['Allows you to use Two-Handed Axes and Two-Handed Maces.'],
					image: "two_handed_axes_and_maces.jpg"
				}, {
					name: 'Anticipation',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to dodge by an additional 1%.`
					},
					description: ['Increases your chance to dodge by an additional 1%.', 'Increases your chance to dodge by an additional 2%.', 'Increases your chance to dodge by an additional 3%.', 'Increases your chance to dodge by an additional 4%.', 'Increases your chance to dodge by an additional 5%.'],
					image: "anticipation.jpg"
				}, {
					name: 'Flurry',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your attack speed by 10% for your next 3 swings after dealing a critical strike.`
					},
					description: ['Increases your attack speed by 10% for your next 3 swings after dealing a critical strike.', 'Increases your attack speed by 15% for your next 3 swings after dealing a critical strike.', 'Increases your attack speed by 20% for your next 3 swings after dealing a critical strike.', 'Increases your attack speed by 25% for your next 3 swings after dealing a critical strike.', 'Increases your attack speed by 30% for your next 3 swings after dealing a critical strike.'],
					r: [3, 5],
					locked: "locked",
					image: "flurry.jpg"
				}, {
					name: 'Toughness',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your armor value from items by 2%.`
					},
					description: ['Increases your armor value from items by 2%.', 'Increases your armor value from items by 4%.', 'Increases your armor value from items by 6%.', 'Increases your armor value from items by 8%.', 'Increases your armor value from items by 10%.'],
					image: "toughness.jpg"
				}, {
					name: 'Improved Weapon Totems',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the melee attack power bonus of your Windfury Totem by 15% and increases the damage caused by your Flametongue Totem by 6%.`
					},
					description: ['Increases the melee attack power bonus of your Windfury Totem by 15% and increases the damage caused by your Flametongue Totem by 6%.', 'Increases the melee attack power bonus of your Windfury Totem by 30% and increases the damage caused by your Flametongue Totem by 12%.'],
					image: "improved_weapon_totems.jpg"
				}, {
					name: 'Elemental Weapons',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the melee attack power bonus of your Rockbiter Weapon by 7%, your Windfury Weapon effect by 13% and increases the damage caused by your Flametongue Weapon and Frostbrand Weapon by 5%.`
					},
					description: ['Increases the melee attack power bonus of your Rockbiter Weapon by 7%, your Windfury Weapon effect by 13% and increases the damage caused by your Flametongue Weapon and Frostbrand Weapon by 5%.', 'Increases the melee attack power bonus of your Rockbiter Weapon by 14%, your Windfury Weapon effect by 27% and increases the damage caused by your Flametongue Weapon and Frostbrand Weapon by 10%.', 'Increases the melee attack power bonus of your Rockbiter Weapon by 20%, your Windfury Weapon effect by 40% and increases the damage caused by your Flametongue Weapon and Frostbrand Weapon by 15%.'],
					image: "elemental_weapons.jpg"
				}, {
					name: 'Parry',
					maxRank: 1,
					description: function() {
						return `Gives a chance to parry enemy melee attacks.`
					},
					description: ['Gives a chance to parry enemy melee attacks.'],
					image: "parry.jpg"
				}, {
					name: 'Weapon Mastery',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage you deal with all weapons by 2%.`
					},
					description: ['Increases the damage you deal with all weapons by 2%.', 'Increases the damage you deal with all weapons by 4%.', 'Increases the damage you deal with all weapons by 6%.', 'Increases the damage you deal with all weapons by 8%.', 'Increases the damage you deal with all weapons by 10%.'],
					image: "weapon_mastery.jpg"
				}, {
					name: 'Stormstrike',
					maxRank: 1,
					description: function() {
						return `Gives you an extra attack.  In addition, the next 2 sources of Nature damage dealt to the target are increased by 20%.  Lasts 12 sec.`
					},
					description: ['Gives you an extra attack.  In addition, the next 2 sources of Nature damage dealt to the target are increased by 20%.  Lasts 12 sec.'],
					r: [12, 3],
					locked: "locked",
					image: "stormstrike.jpg"
				}]
			}, {
				name: 'Restoration',
				talents: [{
					name: 'Improved Healing Wave',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the casting time of your Healing Wave spell by 0.1 sec.`
					},
					description: ['Reduces the casting time of your Healing Wave spell by 0.1 sec.', 'Reduces the casting time of your Healing Wave spell by 0.2 sec.', 'Reduces the casting time of your Healing Wave spell by 0.3 sec.', 'Reduces the casting time of your Healing Wave spell by 0.4 sec.', 'Reduces the casting time of your Healing Wave spell by 0.5 sec.'],
					image: "improved_healing_wave.jpg"
				}, {
					name: 'Tidal Focus',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the Mana cost of your healing spells by 1%.`
					},
					description: ['Reduces the Mana cost of your healing spells by 1%.', 'Reduces the Mana cost of your healing spells by 2%.', 'Reduces the Mana cost of your healing spells by 3%.', 'Reduces the Mana cost of your healing spells by 4%.', 'Reduces the Mana cost of your healing spells by 5%.'],
					image: "tidal_focus.jpg"
				}, {
					name: 'Improved Reincarnation',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cooldown of your Reincarnation spell by 10 min and increases the amount of health and mana you reincarnate with by an additional 10%.`
					},
					description: ['Reduces the cooldown of your Reincarnation spell by 10 min and increases the amount of health and mana you reincarnate with by an additional 10%.', 'Reduces the cooldown of your Reincarnation spell by 20 min and increases the amount of health and mana you reincarnate with by an additional 20%.'],
					image: "improved_reincarnation.jpg"
				}, {
					name: 'Ancestral Healing',
					maxRank: 3,
					description: function() {
						return `Increases your target's armor value by 8% for 15 sec after getting a critical effect from one of your healing spells.`
					},
					description: ["Increases your target's armor value by 8% for 15 sec after getting a critical effect from one of your healing spells.", "Increases your target's armor value by 16% for 15 sec after getting a critical effect from one of your healing spells.", "Increases your target's armor value by 25% for 15 sec after getting a critical effect from one of your healing spells."],
					image: "ancestral_healing.jpg"
				}, {
					name: 'Totemic Focus',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the Mana cost of your totems by 5%.`
					},
					description: ['Reduces the Mana cost of your totems by 5%.', 'Reduces the Mana cost of your totems by 10%.', 'Reduces the Mana cost of your totems by 15%.', 'Reduces the Mana cost of your totems by 20%.', 'Reduces the Mana cost of your totems by 25%.'],
					image: "totemic_focus.jpg"
				}, {
					name: "Nature's Guidance",
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to hit with melee attacks and spells by 1%.`
					},
					description: ['Increases your chance to hit with melee attacks and spells by 1%.', 'Increases your chance to hit with melee attacks and spells by 2%.', 'Increases your chance to hit with melee attacks and spells by 3%.'],
					image: "natures_guidance.jpg"
				}, {
					name: 'Healing Focus',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 14% chance to avoid interruption caused by damage while casting any healing spell.`
					},
					description: ['Gives you a 14% chance to avoid interruption caused by damage while casting any healing spell.', 'Gives you a 28% chance to avoid interruption caused by damage while casting any healing spell.', 'Gives you a 42% chance to avoid interruption caused by damage while casting any healing spell.', 'Gives you a 56% chance to avoid interruption caused by damage while casting any healing spell.', 'Gives you a 70% chance to avoid interruption caused by damage while casting any healing spell.'],
					image: "healing_focus.jpg"
				}, {
					name: 'Totemic Mastery',
					maxRank: 1,
					description: function() {
						return `The radius of your totems that affect friendly targets is increased to 30 yd.`
					},
					description: ['The radius of your totems that affect friendly targets is increased to 30 yd.'],
					image: "totemic_mastery.jpg"
				}, {
					name: 'Healing Grace',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the threat generated by your healing spells by 5%.`
					},
					description: ['Reduces the threat generated by your healing spells by 5%.', 'Reduces the threat generated by your healing spells by 10%.', 'Reduces the threat generated by your healing spells by 15%.'],
					image: "healing_grace.jpg"
				}, {
					name: 'Restorative Totems',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the effect of your Mana Spring and Healing Stream Totems by 5%.`
					},
					description: ['Increases the effect of your Mana Spring and Healing Stream Totems by 5%.', 'Increases the effect of your Mana Spring and Healing Stream Totems by 10%.', 'Increases the effect of your Mana Spring and Healing Stream Totems by 15%.', 'Increases the effect of your Mana Spring and Healing Stream Totems by 20%.', 'Increases the effect of your Mana Spring and Healing Stream Totems by 25%.'],
					image: "restorative_totems.jpg"
				}, {
					name: 'Tidal Mastery',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical effect chance of your healing and lightning spells by 1%.`
					},
					description: ['Increases the critical effect chance of your healing and lightning spells by 1%.', 'Increases the critical effect chance of your healing and lightning spells by 2%.', 'Increases the critical effect chance of your healing and lightning spells by 3%.', 'Increases the critical effect chance of your healing and lightning spells by 4%.', 'Increases the critical effect chance of your healing and lightning spells by 5%.'],
					image: "tidal_mastery.jpg"
				}, {
					name: 'Healing Way',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Your Healing Wave spells have a 33% chance to increase the effect of subsequent Healing Wave spells on that target by 6% for 15 sec.  This effect will stack up to 15001 times.`
					},
					description: ['Your Healing Wave spells have a 33% chance to increase the effect of subsequent Healing Wave spells on that target by 6% for 15 sec.  This effect will stack up to 15001 times.', 'Your Healing Wave spells have a 66% chance to increase the effect of subsequent Healing Wave spells on that target by 6% for 15 sec.  This effect will stack up to 15001 times.', 'Your Healing Wave spells have a 100% chance to increase the effect of subsequent Healing Wave spells on that target by 6% for 15 sec.  This effect will stack up to 15001 times.'],
					image: "healing_way.jpg"
				}, {
					name: "Nature's Swiftness",
					maxRank: 1,
					description: function() {
						return `When activated, your next Nature spell with a casting time less than 10 sec. becomes an instant cast spell.`
					},
					description: ['When activated, your next Nature spell with a casting time less than 10 sec. becomes an instant cast spell.'],
					image: "natures_swiftness.jpg"
				}, {
					name: 'Purification',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the effectiveness of your healing spells by 2%.`
					},
					description: ['Increases the effectiveness of your healing spells by 2%.', 'Increases the effectiveness of your healing spells by 4%.', 'Increases the effectiveness of your healing spells by 6%.', 'Increases the effectiveness of your healing spells by 8%.', 'Increases the effectiveness of your healing spells by 10%.'],
					image: "purification.jpg"
				}, {
					name: 'Mana Tide Totem',
					maxRank: 1,
					description: function() {
						return `Summons a Mana Tide Totem with 5 health at the feet of the caster for 12 sec that restores 170 mana every 3 seconds to group members within 20 yards.`
					},
					description: ['Summons a Mana Tide Totem with 5 health at the feet of the caster for 12 sec that restores 170 mana every 3 seconds to group members within 20 yards.'],
					r: [9, 5],
					locked: "locked",
					image: "mana_tide_totem.jpg"
				}]
			}]
		},
		{
			name: 'warrior',
			tree_talents: [{
				name: 'Arms',
				talents: [{
					name: 'Improved Heroic Strike',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cost of your Heroic Strike ability by 1 rage point.`
					},
					description: ['Reduces the cost of your Heroic Strike ability by 1 rage point.', 'Reduces the cost of your Heroic Strike ability by 2 rage points.', 'Reduces the cost of your Heroic Strike ability by 3 rage points.'],
					image: "improved_heroic_strike.jpg"
				}, {
					name: 'Deflection',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your Parry chance by 1%.`
					},
					description: ['Increases your Parry chance by 1%.', 'Increases your Parry chance by 2%.', 'Increases your Parry chance by 3%.', 'Increases your Parry chance by 4%.', 'Increases your Parry chance by 5%.'],
					image: "deflection.jpg"
				}, {
					name: 'Improved Rend',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the bleed damage done by your Rend ability by 15%.`
					},
					description: ['Increases the bleed damage done by your Rend ability by 15%.', 'Increases the bleed damage done by your Rend ability by 25%.', 'Increases the bleed damage done by your Rend ability by 35%.'],
					image: "improved_rend.jpg"
				}, {
					name: 'Improved Charge',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the amount of rage generated by your Charge ability by 3.`
					},
					description: ['Increases the amount of rage generated by your Charge ability by 3.', 'Increases the amount of rage generated by your Charge ability by 6.'],
					image: "improved_charge.jpg"
				}, {
					name: 'Tactical Mastery',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `You retain up to 5 of your rage points when you change stances.`
					},
					description: ['You retain up to 5 of your rage points when you change stances.', 'You retain up to 10 of your rage points when you change stances.', 'You retain up to 15 of your rage points when you change stances.', 'You retain up to 20 of your rage points when you change stances.', 'You retain up to 25 of your rage points when you change stances.'],
					image: "tactical_mastery.jpg"
				}, {
					name: 'Improved Thunder Clap',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cost of your Thunder Clap ability by 1 rage point.`
					},
					description: ['Reduces the cost of your Thunder Clap ability by 1 rage point.', 'Reduces the cost of your Thunder Clap ability by 2 rage points.', 'Reduces the cost of your Thunder Clap ability by 4 rage points.'],
					image: "improved_thunder_clap.jpg"
				}, {
					name: 'Improved Overpower',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike chance of your Overpower ability by 25%.`
					},
					description: ['Increases the critical strike chance of your Overpower ability by 25%.', 'Increases the critical strike chance of your Overpower ability by 50%.'],
					image: "improved_overpower.jpg"
				}, {
					name: 'Anger Management',
					maxRank: 1,
					description: function() {
						return `Increases the time required for your rage to decay while out of combat by 30%.`
					},
					description: ['Increases the time required for your rage to decay while out of combat by 30%.'],
					r: [4, 5],
					locked: "locked",
					image: "anger_management.jpg"
				}, {
					name: 'Deep Wounds',
					maxRank: 3,
					description: function() {
						return `Your critical strikes cause the opponent to bleed, dealing 20% of your melee weapon's average damage over 12 sec.`
					},
					description: ["Your critical strikes cause the opponent to bleed, dealing 20% of your melee weapon's average damage over 12 sec.", "Your critical strikes cause the opponent to bleed, dealing 40% of your melee weapon's average damage over 12 sec.", "Your critical strikes cause the opponent to bleed, dealing 60% of your melee weapon's average damage over 12 sec."],
					r: [2, 3],
					locked: "locked",
					image: "deep_wounds.jpg"
				}, {
					name: 'Two-Handed Weapon Specialization',
					maxRank: 5,
					description: ['Increases the damage you deal with two-handed melee weapons by 1%.', 'Increases the damage you deal with two-handed melee weapons by 2%.', 'Increases the damage you deal with two-handed melee weapons by 3%.', 'Increases the damage you deal with two-handed melee weapons by 4%.', 'Increases the damage you deal with two-handed melee weapons by 5%.'],
					image: "two_handed_weapon_specialization.jpg"
				}, {
					name: 'Impale',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the critical strike damage bonus of your abilities in Battle, Defensive, and Berserker stance by 10%.`
					},
					description: ['Increases the critical strike damage bonus of your abilities in Battle, Defensive, and Berserker stance by 10%.', 'Increases the critical strike damage bonus of your abilities in Battle, Defensive, and Berserker stance by 20%.'],
					r: [8, 3],
					locked: "locked",
					image: "impale.jpg"
				}, {
					name: 'Axe Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to get a critical strike with Axes by 1%.`
					},
					description: ['Increases your chance to get a critical strike with Axes by 1%.', 'Increases your chance to get a critical strike with Axes by 2%.', 'Increases your chance to get a critical strike with Axes by 3%.', 'Increases your chance to get a critical strike with Axes by 4%.', 'Increases your chance to get a critical strike with Axes by 5%.'],
					image: "axe_specialization.jpg"
				}, {
					name: 'Sweeping Strikes',
					maxRank: 1,
					description: function() {
						return `Your next 5 melee attacks strike an additional nearby opponent.`
					},
					description: ['Your next 5 melee attacks strike an additional nearby opponent.'],
					image: "sweeping_strikes.jpg"
				}, {
					name: 'Mace Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 1% chance to stun your target for 3 sec with a Mace.`
					},
					description: ['Gives you a 1% chance to stun your target for 3 sec with a Mace.', 'Gives you a 2% chance to stun your target for 3 sec with a Mace.', 'Gives you a 3% chance to stun your target for 3 sec with a Mace.', 'Gives you a 4% chance to stun your target for 3 sec with a Mace.', 'Gives you a 6% chance to stun your target for 3 sec with a Mace.'],
					image: "mace_specialization.jpg"
				}, {
					name: 'Sword Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 1% chance to get an extra attack on the same target after dealing damage with your Sword.`
					},
					description: ['Gives you a 1% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 2% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 3% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 4% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 5% chance to get an extra attack on the same target after dealing damage with your Sword.'],
					image: "sword_specialization.jpg"
				}, {
					name: 'Polearm Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to get a critical strike with Polearms by 1%.`
					},
					description: ['Increases your chance to get a critical strike with Polearms by 1%.', 'Increases your chance to get a critical strike with Polearms by 2%.', 'Increases your chance to get a critical strike with Polearms by 3%.', 'Increases your chance to get a critical strike with Polearms by 4%.', 'Increases your chance to get a critical strike with Polearms by 5%.'],
					image: "polearm_specialization.jpg"
				}, {
					name: 'Improved Hamstring',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Hamstring ability a 5% chance to immobilize the target for 5 sec.`
					},
					description: ['Gives your Hamstring ability a 5% chance to immobilize the target for 5 sec.', 'Gives your Hamstring ability a 10% chance to immobilize the target for 5 sec.', 'Gives your Hamstring ability a 15% chance to immobilize the target for 5 sec.'],
					image: "improved_hamstring.jpg"
				}, {
					name: 'Mortal Strike',
					maxRank: 1,
					description: function() {
						return `A vicious strike that deals weapon damage plus 85 and wounds the target, reducing the effectiveness of any healing by 50% for 10 sec.`
					},
					description: ['A vicious strike that deals weapon damage plus 85 and wounds the target, reducing the effectiveness of any healing by 50% for 10 sec.'],
					r: [12, 1],
					locked: "locked",
					image: "mortal_strike.jpg"
				}]
			}, {
				name: 'Fury',
				talents: [{
					name: 'Booming Voice',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 10%.`
					},
					description: ['Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 10%.', 'Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 20%.', 'Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 30%.', 'Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 40%.', 'Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 50%.'],
					image: "booming_voice.jpg"
				}, {
					name: 'Cruelty',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to get a critical strike with melee weapons by 1%.`
					},
					description: ['Increases your chance to get a critical strike with melee weapons by 1%.', 'Increases your chance to get a critical strike with melee weapons by 2%.', 'Increases your chance to get a critical strike with melee weapons by 3%.', 'Increases your chance to get a critical strike with melee weapons by 4%.', 'Increases your chance to get a critical strike with melee weapons by 5%.'],
					image: "cruelty.jpg"
				}, {
					name: 'Improved Demoralizing Shout',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the melee attack power reduction of your Demoralizing Shout by 8%.`
					},
					description: ['Increases the melee attack power reduction of your Demoralizing Shout by 8%.', 'Increases the melee attack power reduction of your Demoralizing Shout by 16%.', 'Increases the melee attack power reduction of your Demoralizing Shout by 24%.', 'Increases the melee attack power reduction of your Demoralizing Shout by 32%.', 'Increases the melee attack power reduction of your Demoralizing Shout by 40%.'],
					image: "improved_demoralizing_shout.jpg"
				}, {
					name: 'Unbridled Wrath',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 8% chance to generate an additional Rage point when you deal melee damage with a weapon.`
					},
					description: ['Gives you a 8% chance to generate an additional Rage point when you deal melee damage with a weapon.', 'Gives you a 16% chance to generate an additional Rage point when you deal melee damage with a weapon.', 'Gives you a 24% chance to generate an additional Rage point when you deal melee damage with a weapon.', 'Gives you a 32% chance to generate an additional Rage point when you deal melee damage with a weapon.', 'Gives you a 40% chance to generate an additional Rage point when you deal melee damage with a weapon.'],
					image: "unbridled_wrath.jpg"
				}, {
					name: 'Improved Cleave',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the bonus damage done by your Cleave ability by 40%.`
					},
					description: ['Increases the bonus damage done by your Cleave ability by 40%.', 'Increases the bonus damage done by your Cleave ability by 80%.', 'Increases the bonus damage done by your Cleave ability by 120%.'],
					image: "improved_cleave.jpg"
				}, {
					name: 'Piercing Howl',
					maxRank: 1,
					description: function() {
						return `Causes all enemies near the warrior to be dazed, reducing movement speed by 50% for 6 sec.`
					},
					description: ['Causes all enemies near the warrior to be dazed, reducing movement speed by 50% for 6 sec.'],
					image: "piercing_howl.jpg"
				}, {
					name: 'Blood Craze',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Regenerates 0% of your total Health over 6 sec after being the victim of a critical strike.`
					},
					description: ['Regenerates 0% of your total Health over 6 sec after being the victim of a critical strike.', 'Regenerates 0% of your total Health over 6 sec after being the victim of a critical strike.', 'Regenerates 0% of your total Health over 6 sec after being the victim of a critical strike.'],
					image: "blood_craze.jpg"
				}, {
					name: 'Improved Battle Shout',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the melee attack power bonus of your Battle Shout by 5%.`
					},
					description: ['Increases the melee attack power bonus of your Battle Shout by 5%.', 'Increases the melee attack power bonus of your Battle Shout by 10%.', 'Increases the melee attack power bonus of your Battle Shout by 15%.', 'Increases the melee attack power bonus of your Battle Shout by 20%.', 'Increases the melee attack power bonus of your Battle Shout by 25%.'],
					image: "improved_battle_shout.jpg"
				}, {
					name: 'Dual Wield Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the damage done by your offhand weapon by 5%.`
					},
					description: ['Increases the damage done by your offhand weapon by 5%.', 'Increases the damage done by your offhand weapon by 10%.', 'Increases the damage done by your offhand weapon by 15%.', 'Increases the damage done by your offhand weapon by 20%.', 'Increases the damage done by your offhand weapon by 25%.'],
					image: "dual_wield_specialization.jpg"
				}, {
					name: 'Improved Execute',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the Rage cost of your Execute ability by 2.`
					},
					description: ['Reduces the Rage cost of your Execute ability by 2.', 'Reduces the Rage cost of your Execute ability by 5.'],
					image: "improved_execute.jpg"
				}, {
					name: 'Enrage',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives you a 5% melee damage bonus for 12 sec up to a maximum of 12 swings after being the victim of a critical strike.`
					},
					description: ['Gives you a 5% melee damage bonus for 12 sec up to a maximum of 12 swings after being the victim of a critical strike.', 'Gives you a 10% melee damage bonus for 12 sec up to a maximum of 12 swings after being the victim of a critical strike.', 'Gives you a 15% melee damage bonus for 12 sec up to a maximum of 12 swings after being the victim of a critical strike.', 'Gives you a 20% melee damage bonus for 12 sec up to a maximum of 12 swings after being the victim of a critical strike.', 'Gives you a 25% melee damage bonus for 12 sec up to a maximum of 12 swings after being the victim of a critical strike.'],
					image: "enrage.jpg"
				}, {
					name: 'Improved Slam',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Decreases the casting time of your Slam ability by 0.1 sec.`
					},
					description: ['Decreases the casting time of your Slam ability by 0.1 sec.', 'Decreases the casting time of your Slam ability by 0.2 sec.', 'Decreases the casting time of your Slam ability by 0.3 sec.', 'Decreases the casting time of your Slam ability by 0.4 sec.', 'Decreases the casting time of your Slam ability by 0.5 sec.'],
					image: "improved_slam.jpg"
				}, {
					name: 'Death Wish',
					maxRank: 1,
					description: function() {
						return `When activated, increases your physical damage by 20% and makes you immune to Fear effects, but lowers your armor and all resistances by 20%.  Lasts 30 sec.`
					},
					description: ['When activated, increases your physical damage by 20% and makes you immune to Fear effects, but lowers your armor and all resistances by 20%.  Lasts 30 sec.'],
					image: "death_wish.jpg"
				}, {
					name: 'Improved Intercept',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cooldown of your Intercept ability by 5 sec.`
					},
					description: ['Reduces the cooldown of your Intercept ability by 5 sec.', 'Reduces the cooldown of your Intercept ability by 10 sec.'],
					image: "improved_intercept.jpg"
				}, {
					name: 'Improved Berserker Rage',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `The Berserker Rage ability will generate 5 rage when used.`
					},
					description: ['The Berserker Rage ability will generate 5 rage when used.', 'The Berserker Rage ability will generate 10 rage when used.'],
					image: "improved_berserker_rage.jpg"
				}, {
					name: 'Flurry',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your attack speed by 10% for your next 3 swings after dealing a melee critical strike.`
					},
					description: ['Increases your attack speed by 10% for your next 3 swings after dealing a melee critical strike.', 'Increases your attack speed by 15% for your next 3 swings after dealing a melee critical strike.', 'Increases your attack speed by 20% for your next 3 swings after dealing a melee critical strike.', 'Increases your attack speed by 25% for your next 3 swings after dealing a melee critical strike.', 'Increases your attack speed by 30% for your next 3 swings after dealing a melee critical strike.'],
					r: [10, 5],
					locked: "locked",
					image: "flurry.jpg"
				}, {
					name: 'Bloodthirst',
					maxRank: 1,
					description: function() {
						return `Instantly attack the target causing damage equal to 45% of your attack power.  In addition, the next 5 successful melee attacks will restore 10 health.  This effect lasts 8 sec.`
					},
					description: ['Instantly attack the target causing damage equal to 45% of your attack power.  In addition, the next 5 successful melee attacks will restore 10 health.  This effect lasts 8 sec.'],
					r: [12, 1],
					locked: "locked",
					image: "bloodthirst.jpg"
				}]
			}, {
				name: 'Protection',
				talents: [{
					name: 'Shield Specialization',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to block attacks with a shield by 1% and has a 20% chance to generate 1 rage when a block occurs.`
					},
					description: ['Increases your chance to block attacks with a shield by 1% and has a 20% chance to generate 1 rage when a block occurs.', 'Increases your chance to block attacks with a shield by 2% and has a 40% chance to generate 1 rage when a block occurs.', 'Increases your chance to block attacks with a shield by 3% and has a 60% chance to generate 1 rage when a block occurs.', 'Increases your chance to block attacks with a shield by 4% and has a 80% chance to generate 1 rage when a block occurs.', 'Increases your chance to block attacks with a shield by 5% and has a 100% chance to generate 1 rage when a block occurs.'],
					image: "shield_specialization.jpg"
				}, {
					name: 'Anticipation',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your Defense skill by 2.`
					},
					description: ['Increases your Defense skill by 2.', 'Increases your Defense skill by 4.', 'Increases your Defense skill by 6.', 'Increases your Defense skill by 8.', 'Increases your Defense skill by 10.'],
					image: "anticipation.jpg"
				}, {
					name: 'Improved Bloodrage',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the instant Rage generated by your Bloodrage ability by 2.`
					},
					description: ['Increases the instant Rage generated by your Bloodrage ability by 2.', 'Increases the instant Rage generated by your Bloodrage ability by 5.'],
					image: "improved_bloodrage.jpg"
				}, {
					name: 'Toughness',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your armor value from items by 2%.`
					},
					description: ['Increases your armor value from items by 2%.', 'Increases your armor value from items by 4%.', 'Increases your armor value from items by 6%.', 'Increases your armor value from items by 8%.', 'Increases your armor value from items by 10%.'],
					image: "toughness.jpg"
				}, {
					name: 'Iron Will',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases your chance to resist Stun and Charm effects by an additional 3%.`
					},
					description: ['Increases your chance to resist Stun and Charm effects by an additional 3%.', 'Increases your chance to resist Stun and Charm effects by an additional 6%.', 'Increases your chance to resist Stun and Charm effects by an additional 9%.', 'Increases your chance to resist Stun and Charm effects by an additional 12%.', 'Increases your chance to resist Stun and Charm effects by an additional 15%.'],
					image: "iron_will.jpg"
				}, {
					name: 'Last Stand',
					maxRank: 1,
					description: function() {
						return `When activated, this ability temporarily grants you 30% of your maximum hit points for 20 seconds.  After the effect expires, the hit points are lost.`
					},
					description: ['When activated, this ability temporarily grants you 30% of your maximum hit points for 20 seconds.  After the effect expires, the hit points are lost.'],
					r: [2, 2],
					locked: "locked",
					image: "last_stand.jpg"
				}, {
					name: 'Improved Shield Block',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Allows your Shield Block ability to block an additional attack and increases the duration by 0.5 second.`
					},
					description: ['Allows your Shield Block ability to block an additional attack and increases the duration by 0.5 second.', 'Allows your Shield Block ability to block an additional attack and increases the duration by 1 second.', 'Allows your Shield Block ability to block an additional attack and increases the duration by 2 seconds.'],
					r: [0, 5],
					locked: "locked",
					image: "improved_shield_block.jpg"
				}, {
					name: 'Improved Revenge',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Revenge ability a 15% chance to stun the target for 3 sec.`
					},
					description: ['Gives your Revenge ability a 15% chance to stun the target for 3 sec.', 'Gives your Revenge ability a 30% chance to stun the target for 3 sec.', 'Gives your Revenge ability a 45% chance to stun the target for 3 sec.'],
					image: "improved_revenge.jpg"
				}, {
					name: 'Defiance',
					maxRank: 5,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the threat generated by your attacks by 3% while in Defensive Stance.`
					},
					description: ['Increases the threat generated by your attacks by 3% while in Defensive Stance.', 'Increases the threat generated by your attacks by 6% while in Defensive Stance.', 'Increases the threat generated by your attacks by 9% while in Defensive Stance.', 'Increases the threat generated by your attacks by 12% while in Defensive Stance.', 'Increases the threat generated by your attacks by 15% while in Defensive Stance.'],
					image: "defiance.jpg"
				}, {
					name: 'Improved Sunder Armor',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cost of your Sunder Armor ability by 1 rage point.`
					},
					description: ['Reduces the cost of your Sunder Armor ability by 1 rage point.', 'Reduces the cost of your Sunder Armor ability by 2 rage points.', 'Reduces the cost of your Sunder Armor ability by 3 rage points.'],
					image: "improved_sunder_armor.jpg"
				}, {
					name: 'Improved Disarm',
					maxRank: 3,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the duration of your Disarm ability by 1 secs.`
					},
					description: ['Increases the duration of your Disarm ability by 1 secs.', 'Increases the duration of your Disarm ability by 2 secs.', 'Increases the duration of your Disarm ability by 3 secs.'],
					image: "improved_disarm.jpg"
				}, {
					name: 'Improved Taunt',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Reduces the cooldown of your Taunt ability by 1 sec.`
					},
					description: ['Reduces the cooldown of your Taunt ability by 1 sec.', 'Reduces the cooldown of your Taunt ability by 2 sec.'],
					image: "improved_taunt.jpg"
				}, {
					name: 'Improved Shield Wall',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Increases the effect duration of your Shield Wall ability by 3 secs.`
					},
					description: ['Increases the effect duration of your Shield Wall ability by 3 secs.', 'Increases the effect duration of your Shield Wall ability by 5 secs.'],
					image: "improved_shield_wall.jpg"
				}, {
					name: 'Concussion Blow',
					maxRank: 1,
					description: function() {
						return `Stuns the opponent for 5 sec.`
					},
					description: ['Stuns the opponent for 5 sec.'],
					image: "concussion_blow.jpg"
				}, {
					name: 'Improved Shield Bash',
					maxRank: 2,
					y: function() {
						return this.x * this.invested
					},
					description: function() {
						return `Gives your Shield Bash ability a 50% chance to silence the target for 3 sec.`
					},
					description: ['Gives your Shield Bash ability a 50% chance to silence the target for 3 sec.', 'Gives your Shield Bash ability a 100% chance to silence the target for 3 sec.'],
					image: "improved_shield_bash.jpg"
				}, {
					name: 'One-Handed Weapon Specialization',
					maxRank: 5,
					description: ['Increases the damage you deal with One-Handed Melee weapons by 2%.', 'Increases the damage you deal with One-Handed Melee weapons by 4%.', 'Increases the damage you deal with One-Handed Melee weapons by 6%.', 'Increases the damage you deal with One-Handed Melee weapons by 8%.', 'Increases the damage you deal with One-Handed Melee weapons by 10%.'],
					image: "one_handed_weapon_specialization.jpg"
				}, {
					name: 'Shield Slam',
					maxRank: 1,
					description: function() {
						return `Slam the target with your shield, causing 225 to 236 damage, modified by your shield block value, and has a 50% chance of dispelling 1 magic effect on the target.  Also causes a high amount of threat.`
					},
					description: ['Slam the target with your shield, causing 225 to 236 damage, modified by your shield block value, and has a 50% chance of dispelling 1 magic effect on the target.  Also causes a high amount of threat.'],
					r: [13, 1],
					locked: "locked",
					image: "shield_slam.jpg"
				}]
			}]
		}
	]
}
