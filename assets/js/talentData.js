const talentData = {
    classes: [
        {
            name: 'warlock',
            tree_talents: [{
                name: 'Affliction',
                talents: [{
                    name: "Suppression",
                    image: "suppression.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 0
                },
                {
                    name: "Improved Corruption",
                    image: "improved_corruption.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 0
                },
                {
                    name: "Improved Curse of Weakness",
                    image: "improved_curse_of_weakness.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 3,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Drain Soul",
                    image: "improved_drain_soul.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Life Tap",
                    image: "improved_life_tap.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Drain Life",
                    image: "improved_drain_life.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Curse of Agony",
                    image: "improved_curse_of_agony.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 3,
                    requiredTalentPoints: 10
                },
                {
                    name: "Fel Concentration",
                    image: "fel_concentration.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 10
                },
                {
                    name: "Amplify Curse",
                    image: "amplify_curse.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 1,
                    requiredTalentPoints: 10,
                    unlocks: "curse_of_exhaustion"
                },
                {
                    name: "Grim Reach",
                    image: "grim_reach.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 15
                },
                {
                    name: "Nightfall",
                    image: "nightfall.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 15
                },
                {
                    name: "Improved Drain Mana",
                    image: "improved_drain_mana.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 15
                },
                {
                    name: "Siphon Life",
                    image: "siphon_life.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 1,
                    requiredTalentPoints: 20,
                    unlocks: "shadow_mastery"
                },
                {
                    name: "Curse of Exhaustion",
                    image: "curse_of_exhaustion.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 1,
                    requiredTalentPoints: 20,
                    locked: "locked",
                    prereq: "amplify_curse",
                    unlocks: "improved_curse_of_exhaustion"
                },
                {
                    name: "Improved Curse of Exhaustion",
                    image: "curse_of_exhaustion.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 4,
                    requiredTalentPoints: 20,
                    prereq: "curse_of_exhaustion",
                    locked: "locked"
                },
                {
                    name: "Shadow Mastery",
                    image: "shadow_mastery.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 25,
                    locked: "locked"
                },
                {
                    name: "Dark Pact",
                    image: "dark_pact.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 30
                }]
            },
            {
                name: 'Demonology',
                talents: [{
                    i: 1221,
                   name: 'Improved Healthstone',
                   maxRank: 2,
                    s: [18692, 18693],
                    d: ['Increases the amount of Health restored by your Healthstone by 10%.', 'Increases the amount of Health restored by your Healthstone by 20%.'],
                    x: 0,
                    y: 0,
                    iconname: 'Improved Healthstone'
                }, {
                    i: 1222,
                   name: 'Improved Imp',
                   maxRank: 3,
                    s: [18694, 18695, 18696],
                    d: ["Increases the effect of your Imp's Firebolt, Fire Shield, and Blood Pact spells by 10%.", "Increases the effect of your Imp's Firebolt, Fire Shield, and Blood Pact spells by 20%.", "Increases the effect of your Imp's Firebolt, Fire Shield, and Blood Pact spells by 30%."],
                    x: 1,
                    y: 0,
                    iconname: 'Improved Imp'
                }, {
                    i: 1223,
                   name: 'Demonic Embrace',
                   maxRank: 5,
                    s: [18697, 18698, 18699, 18700, 18701],
                    d: ['Increases your total Stamina by 3% but reduces your total Spirit by 1%.', 'Increases your total Stamina by 6% but reduces your total Spirit by 2%.', 'Increases your total Stamina by 9% but reduces your total Spirit by 3%.', 'Increases your total Stamina by 12% but reduces your total Spirit by 4%.', 'Increases your total Stamina by 15% but reduces your total Spirit by 5%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Demonic Embrace'
                }, {
                    i: 1224,
                   name: 'Improved Health Funnel',
                   maxRank: 2,
                    s: [18703, 18704],
                    d: ['Increases the amount of Health transferred by your Health Funnel spell by 10%.', 'Increases the amount of Health transferred by your Health Funnel spell by 20%.'],
                    x: 0,
                    y: 1,
                    iconname: 'Demonic Embrace'
                }, {
                    i: 1225,
                   name: 'Improved Voidwalker',
                   maxRank: 3,
                    s: [18705, 18706, 18707],
                    d: ["Increases the effectiveness of your Voidwalker's Torment, Consume Shadows, Sacrifice and Suffering spells by 10%.", "Increases the effectiveness of your Voidwalker's Torment, Consume Shadows, Sacrifice and Suffering spells by 20%.", "Increases the effectiveness of your Voidwalker's Torment, Consume Shadows, Sacrifice and Suffering spells by 30%."],
                    x: 1,
                    y: 1,
                    iconname: 'Improved Voidwalker'
                }, {
                    i: 1242,
                   name: 'Fel Intellect',
                   maxRank: 5,
                    s: [18731, 18743, 18744, 18745, 18746],
                    d: ['Increases the maximum Mana of your Imp, Voidwalker, Succubus, and Felhunter by 3%.', 'Increases the maximum Mana of your Imp, Voidwalker, Succubus, and Felhunter by 6%.', 'Increases the maximum Mana of your Imp, Voidwalker, Succubus, and Felhunter by 9%.', 'Increases the maximum Mana of your Imp, Voidwalker, Succubus, and Felhunter by 12%.', 'Increases the maximum Mana of your Imp, Voidwalker, Succubus, and Felhunter by 15%.'],
                    x: 2,
                    y: 1,
                    iconname: 'Fel Intellect'
                }, {
                    i: 1243,
                   name: 'Improved Succubus',
                   maxRank: 3,
                    s: [18754, 18755, 18756],
                    d: ["Increases the effect of your Succubus' Lash of Pain and Soothing Kiss spells by 10%, and increases the duration of your Succubus\" Seduction and Lesser Invisibility spells by 10%.", 'Increases the effect of your Succubus' Lash of Pain and Soothing Kiss spells by 20%, and increases the duration of your Succubus\" Seduction and Lesser Invisibility spells by 20%.", 'Increases the effect of your Succubus' Lash of Pain and Soothing Kiss spells by 30%, and increases the duration of your Succubus\" Seduction and Lesser Invisibility spells by 30%.'],
                    x: 0,
                    y: 2,
                    iconname: 'Improved Succubus'
                }, {
                    i: 1226,
                   name: 'Fel Domination',
                   maxRank: 1,
                    s: [18708],
                    d: ['Your next Imp, Voidwalker, Succubus, or Felhunter Summon spell has its casting time reduced by 5.5 sec and its Mana cost reduced by 50%.'],
                    x: 1,
                    y: 2,
                    iconname: 'Fel Domination'
                }, {
                    i: 1241,
                   name: 'Fel Stamina',
                   maxRank: 5,
                    s: [18748, 18749, 18750, 18751, 18752],
                    d: ['Increases the maximum Health of your Imp, Voidwalker, Succubus, and Felhunter by 3%.', 'Increases the maximum Health of your Imp, Voidwalker, Succubus, and Felhunter by 6%.', 'Increases the maximum Health of your Imp, Voidwalker, Succubus, and Felhunter by 9%.', 'Increases the maximum Health of your Imp, Voidwalker, Succubus, and Felhunter by 12%.', 'Increases the maximum Health of your Imp, Voidwalker, Succubus, and Felhunter by 15%.'],
                    x: 2,
                    y: 2,
                    iconname: 'Fel Stamina'
                }, {
                    i: 1227,
                   name: 'Master Summoner',
                   maxRank: 2,
                    s: [18709, 18710],
                    d: ['Reduces the casting time of your Imp, Voidwalker, Succubus, and Felhunter Summoning spells by 2 sec and the Mana cost by 20%.', 'Reduces the casting time of your Imp, Voidwalker, Succubus, and Felhunter Summoning spells by 4 sec and the Mana cost by 40%.'],
                    x: 1,
                    y: 3,
                    r: [7, 1],
                    iconname: 'Master Summoner'
                }, {
                    i: 1262,
                   name: 'Unholy Power',
                   maxRank: 5,
                    s: [18769, 18770, 18771, 18772, 18773],
                    d: ["Increases the damage done by your Voidwalker, Succubus, and Felhunter's melee attacks by 4%.", "Increases the damage done by your Voidwalker, Succubus, and Felhunter's melee attacks by 8%.", "Increases the damage done by your Voidwalker, Succubus, and Felhunter's melee attacks by 12%.", "Increases the damage done by your Voidwalker, Succubus, and Felhunter's melee attacks by 16%.", "Increases the damage done by your Voidwalker, Succubus, and Felhunter's melee attacks by 20%."],
                    x: 2,
                    y: 3,
                    iconname: 'Unholy Power'
                }, {
                    i: 1283,
                   name: 'Improved Enslave Demon',
                   maxRank: 5,
                    s: [18821, 18822, 18823, 18824, 18825],
                    d: ['Reduces the Attack Speed and Casting Speed penalty of your Enslave Demon spell by 2% and reduces the resist chance by 2%.', 'Reduces the Attack Speed and Casting Speed penalty of your Enslave Demon spell by 4% and reduces the resist chance by 4%.', 'Reduces the Attack Speed and Casting Speed penalty of your Enslave Demon spell by 6% and reduces the resist chance by 6%.', 'Reduces the Attack Speed and Casting Speed penalty of your Enslave Demon spell by 8% and reduces the resist chance by 8%.', 'Reduces the Attack Speed and Casting Speed penalty of your Enslave Demon spell by 10% and reduces the resist chance by 10%.'],
                    x: 0,
                    y: 4,
                    iconname: 'Improved Enslave Demon'
                }, {
                    i: 1281,
                   name: 'Demonic Sacrifice',
                   maxRank: 1,
                    s: [18788],
                    d: ['When activated, sacrifices your summoned demon to grant you an effect that lasts 30 min.  The effect is canceled if any Demon is summoned.<br /><br />Imp: Increases your Fire damage by 15%.<br /><br />Voidwalker: Restores 3% of total Health every 4 sec.<br /><br />Succubus: Increases your Shadow damage by 15%.<br /><br />Felhunter: Restores 2% of total Mana every 4 sec.'],
                    x: 1,
                    y: 4,
                    iconname: 'Demonic Sacrifice'
                }, {
                    i: 1261,
                   name: 'Improved Firestone',
                   maxRank: 2,
                    s: [18767, 18768],
                    d: ['Increases the bonus Fire damage from Firestones and the Firestone effect by 15%.', 'Increases the bonus Fire damage from Firestones and the Firestone effect by 30%.'],
                    x: 3,
                    y: 4,
                    iconname: 'Improved Firestone'
                }, {
                    i: 1244,
                   name: 'Master Demonologist',
                   maxRank: 5,
                    s: [23785, 23822, 23823, 23824, 23825],
                    d: ['Grants both the Warlock and the summoned demon an effect as long as that demon is active.<br /><br />Imp - Reduces threat caused by 4%.<br /><br />Voidwalker - Reduces physical damage taken by 2%.<br /><br />Succubus - Increases all damage caused by 2%.<br /><br />Felhunter - Increases all resistances by .2 per level.', 'Grants both the Warlock and the summoned demon an effect as long as that demon is active.<br /><br />Imp - Reduces threat caused by 8%.<br /><br />Voidwalker - Reduces physical damage taken by 4%.<br /><br />Succubus - Increases all damage caused by 4%.<br /><br />Felhunter - Increases all resistances by .4 per level.', 'Grants both the Warlock and the summoned demon an effect as long as that demon is active.<br /><br />Imp - Reduces threat caused by 12%.<br /><br />Voidwalker - Reduces physical damage taken by 6%.<br /><br />Succubus - Increases all damage caused by 6%.<br /><br />Felhunter - Increases all resistances by .6 per level.', 'Grants both the Warlock and the summoned demon an effect as long as that demon is active.<br /><br />Imp - Reduces threat caused by 16%.<br /><br />Voidwalker - Reduces physical damage taken by 8%.<br /><br />Succubus - Increases all damage caused by 8%.<br /><br />Felhunter - Increases all resistances by .8 per level.', 'Grants both the Warlock and the summoned demon an effect as long as that demon is active.<br /><br />Imp - Reduces threat caused by 20%.<br /><br />Voidwalker - Reduces physical damage taken by 10%.<br /><br />Succubus - Increases all damage caused by 10%.<br /><br />Felhunter - Increases all resistances by 1 per level.'],
                    x: 2,
                    y: 5,
                    r: [10, 5],
                    iconname: 'Master Demonologist'
                }, {
                    i: 1282,
                   name: 'Soul Link',
                   maxRank: 1,
                    s: [19028],
                    d: ['When active, 30% of all damage taken by the caster is taken by your Imp, Voidwalker, Succubus, or Felhunter demon instead.  In addition, both the demon and master will inflict 3% more damage.  Lasts as long as the demon is active.'],
                    x: 1,
                    y: 6,
                    r: [12, 1],
                    iconname: 'Soul Link'
                }, {
                    i: 1263,
                   name: 'Improved Spellstone',
                   maxRank: 2,
                    s: [18774, 18775],
                    d: ['Increases the amount of damage absorbed by your Spellstone by 15%.', 'Increases the amount of damage absorbed by your Spellstone by 30%.'],
                    x: 2,
                    y: 6,
                    iconname: 'Improved Spellstone'
                }]
            },
            {
                name: 'Destruction',
                talents: [{
                    i: 944,
                   name: 'Improved Shadow Bolt',
                   maxRank: 5,
                    s: [17793, 17796, 17801, 17802, 17803],
                    d: ['Your Shadow Bolt critical strikes increase Shadow damage dealt to the target by 4% until 4 non-periodic damage sources are applied.  Effect lasts a maximum of 12 sec.', 'Your Shadow Bolt critical strikes increase Shadow damage dealt to the target by 8% until 4 non-periodic damage sources are applied.  Effect lasts a maximum of 12 sec.', 'Your Shadow Bolt critical strikes increase Shadow damage dealt to the target by 12% until 4 non-periodic damage sources are applied.  Effect lasts a maximum of 12 sec.', 'Your Shadow Bolt critical strikes increase Shadow damage dealt to the target by 16% until 4 non-periodic damage sources are applied.  Effect lasts a maximum of 12 sec.', 'Your Shadow Bolt critical strikes increase Shadow damage dealt to the target by 20% until 4 non-periodic damage sources are applied.  Effect lasts a maximum of 12 sec.'],
                    x: 1,
                    y: 0,
                    iconname: 'Improved Shadow Bolt'
                }, {
                    i: 941,
                   name: 'Cataclysm',
                   maxRank: 5,
                    s: [17778, 17779, 17780, 17781, 17782],
                    d: ['Reduces the Mana cost of your Destruction spells by 1%.', 'Reduces the Mana cost of your Destruction spells by 2%.', 'Reduces the Mana cost of your Destruction spells by 3%.', 'Reduces the Mana cost of your Destruction spells by 4%.', 'Reduces the Mana cost of your Destruction spells by 5%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Cataclysm'
                }, {
                    i: 943,
                   name: 'Bane',
                   maxRank: 5,
                    s: [17788, 17789, 17790, 17791, 17792],
                    d: ['Reduces the casting time of your Shadow Bolt and Immolate spells by 0.1 sec and your Soul Fire spell by 0.4 sec.', 'Reduces the casting time of your Shadow Bolt and Immolate spells by 0.2 sec and your Soul Fire spell by 0.8 sec.', 'Reduces the casting time of your Shadow Bolt and Immolate spells by 0.3 sec and your Soul Fire spell by 1.2 sec.', 'Reduces the casting time of your Shadow Bolt and Immolate spells by 0.4 sec and your Soul Fire spell by 1.6 sec.', 'Reduces the casting time of your Shadow Bolt and Immolate spells by 0.5 sec and your Soul Fire spell by 2 sec.'],
                    x: 1,
                    y: 1,
                    iconname: 'Bane'
                }, {
                    i: 982,
                   name: 'Aftermath',
                   maxRank: 5,
                    s: [18119, 18120, 18121, 18122, 18123],
                    d: ['Gives your Destruction spells a 2% chance to daze the target for 5 sec.', 'Gives your Destruction spells a 4% chance to daze the target for 5 sec.', 'Gives your Destruction spells a 6% chance to daze the target for 5 sec.', 'Gives your Destruction spells a 8% chance to daze the target for 5 sec.', 'Gives your Destruction spells a 10% chance to daze the target for 5 sec.'],
                    x: 2,
                    y: 1,
                    iconname: 'Aftermath'
                }, {
                    i: 983,
                   name: 'Improved Firebolt',
                   maxRank: 2,
                    s: [18126, 18127],
                    d: ["Reduces the casting time of your Imp's Firebolt spell by 0.5 sec.", "Reduces the casting time of your Imp's Firebolt spell by 1 sec."],
                    x: 0,
                    y: 2,
                    iconname: 'Improved Firebolt'
                }, {
                    i: 984,
                   name: 'Improved Lash of Pain',
                   maxRank: 2,
                    s: [18128, 18129],
                    d: ["Reduces the cooldown of your Succubus' Lash of Pain spell by 3 sec.", "Reduces the cooldown of your Succubus' Lash of Pain spell by 6 sec."],
                    x: 1,
                    y: 2,
                    iconname: 'Improved Lash of Pain'
                }, {
                    i: 981,
                   name: 'Devastation',
                   maxRank: 5,
                    s: [18130, 18131, 18132, 18133, 18134],
                    d: ['Increases the critical strike chance of your Destruction spells by 1%.', 'Increases the critical strike chance of your Destruction spells by 2%.', 'Increases the critical strike chance of your Destruction spells by 3%.', 'Increases the critical strike chance of your Destruction spells by 4%.', 'Increases the critical strike chance of your Destruction spells by 5%.'],
                    x: 2,
                    y: 2,
                    iconname: 'Devastation'
                }, {
                    i: 963,
                   name: 'Shadowburn',
                   maxRank: 1,
                    s: [17877],
                    d: ['Instantly blasts the target for 87 to 100 Shadow damage.  If the target dies within 5 sec of Shadowburn, and yields experience or honor, the caster gains a Soul Shard.'],
                    x: 3,
                    y: 2,
                    iconname: 'Shadowburn'
                }, {
                    i: 985,
                   name: 'Intensity',
                   maxRank: 2,
                    s: [18135, 18136],
                    d: ['Gives you a 35% chance to resist interruption caused by damage while channeling the Rain of Fire, Hellfire or Soul Fire spell.', 'Gives you a 70% chance to resist interruption caused by damage while channeling the Rain of Fire, Hellfire or Soul Fire spell.'],
                    x: 0,
                    y: 3,
                    iconname: 'Intensity'
                }, {
                    i: 964,
                   name: 'Destructive Reach',
                   maxRank: 2,
                    s: [17917, 17918],
                    d: ['Increases the range of your Destruction spells by 10%.', 'Increases the range of your Destruction spells by 20%.'],
                    x: 1,
                    y: 3,
                    iconname: 'Destructive Reach'
                }, {
                    i: 965,
                   name: 'Improved Searing Pain',
                   maxRank: 5,
                    s: [17927, 17929, 17930, 17931, 17932],
                    d: ['Increases the critical strike chance of your Searing Pain spell by 2%.', 'Increases the critical strike chance of your Searing Pain spell by 4%.', 'Increases the critical strike chance of your Searing Pain spell by 6%.', 'Increases the critical strike chance of your Searing Pain spell by 8%.', 'Increases the critical strike chance of your Searing Pain spell by 10%.'],
                    x: 3,
                    y: 3,
                    iconname: 'Spell_Fire_SoulBurn'
                }, {
                    i: 986,
                   name: 'Pyroclasm',
                   maxRank: 2,
                    s: [18096, 18073],
                    d: ['Gives your Rain of Fire, Hellfire, and Soul Fire spells a 13% chance to stun the target for 3 sec.', 'Gives your Rain of Fire, Hellfire, and Soul Fire spells a 26% chance to stun the target for 3 sec.'],
                    x: 0,
                    y: 4,
                    r: [8, 2],
                    iconname: 'Pyroclasm'
                }, {
                    i: 961,
                   name: 'Improved Immolate',
                   maxRank: 5,
                    s: [17815, 17833, 17834, 17835, 17836],
                    d: ['Increases the initial damage of your Immolate spell by 5%.', 'Increases the initial damage of your Immolate spell by 10%.', 'Increases the initial damage of your Immolate spell by 15%.', 'Increases the initial damage of your Immolate spell by 20%.', 'Increases the initial damage of your Immolate spell by 25%.'],
                    x: 1,
                    y: 4,
                    iconname: 'Improved Immolate'
                }, {
                    i: 967,
                   name: 'Ruin',
                   maxRank: 1,
                    s: [17959],
                    d: ['Increases the critical strike damage bonus of your Destruction spells by 100%.'],
                    x: 2,
                    y: 4,
                    r: [6, 5],
                    iconname: 'Ruin'
                }, {
                    i: 966,
                   name: 'Emberstorm',
                   maxRank: 5,
                    s: [17954, 17955, 17956, 17957, 17958],
                    d: ['Increases the damage done by your Fire spells by 2%.', 'Increases the damage done by your Fire spells by 4%.', 'Increases the damage done by your Fire spells by 6%.', 'Increases the damage done by your Fire spells by 8%.', 'Increases the damage done by your Fire spells by 10%.'],
                    x: 2,
                    y: 5,
                    iconname: 'Emberstorm'
                }, {
                    i: 968,
                   name: 'Conflagrate',
                   maxRank: 1,
                    s: [17962],
                    d: ['Ignites a target that is already afflicted by Immolate, dealing 240 to 307 Fire damage and consuming the Immolate spell.'],
                    x: 1,
                    y: 6,
                    r: [12, 5],
                    iconname: 'Conflagrate'
                }]
            }]

        },
        {
            name: 'mage',
            tree_talents: [{
                n: 'Arcane',
                t: [{
                    i: 74,
                    n: 'Arcane Subtlety',
                    maxRank: 2,
                    s: [11210, 12592],
                    d: ["Reduces your target's resistance to all your spells by 5 and reduces the threat caused by your Arcane spells by 20%.", "Reduces your target's resistance to all your spells by 10 and reduces the threat caused by your Arcane spells by 40%."],
                    x: 0,
                    y: 0,
                    iconname: 'Spell_Holy_DispelMagic'
                }, {
                    i: 76,
                    n: 'Arcane Focus',
                    maxRank: 5,
                    s: [11222, 12839, 12840, 12841, 12842],
                    d: ['Reduces the chance that the opponent can resist your Arcane spells by 2%.', 'Reduces the chance that the opponent can resist your Arcane spells by 4%.', 'Reduces the chance that the opponent can resist your Arcane spells by 6%.', 'Reduces the chance that the opponent can resist your Arcane spells by 8%.', 'Reduces the chance that the opponent can resist your Arcane spells by 10%.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Holy_Devotion'
                }, {
                    i: 80,
                    n: 'Improved Arcane Missiles',
                    maxRank: 5,
                    s: [11237, 12463, 12464, 16769, 16770],
                    d: ['Gives you a 20% chance to avoid interruption caused by damage while channeling Arcane Missiles.', 'Gives you a 40% chance to avoid interruption caused by damage while channeling Arcane Missiles.', 'Gives you a 60% chance to avoid interruption caused by damage while channeling Arcane Missiles.', 'Gives you a 80% chance to avoid interruption caused by damage while channeling Arcane Missiles.', 'Gives you a 100% chance to avoid interruption caused by damage while channeling Arcane Missiles.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Nature_StarFall'
                }, {
                    i: 78,
                    n: 'Wand Specialization',
                    maxRank: 2,
                    s: [6057, 6085],
                    d: ['Increases your damage with Wands by 13%.', 'Increases your damage with Wands by 25%.'],
                    x: 0,
                    y: 1,
                    iconname: 'INV_Wand_01'
                }, {
                    i: 1650,
                    n: 'Magic Absorption',
                    maxRank: 5,
                    s: [29441, 29444, 29445, 29446, 29447],
                    d: ['Increases all resistances by 2 and causes all spells you fully resist to restore 1% of your total mana.  1 sec. cooldown.', 'Increases all resistances by 4 and causes all spells you fully resist to restore 2% of your total mana.  1 sec. cooldown.', 'Increases all resistances by 6 and causes all spells you fully resist to restore 3% of your total mana.  1 sec. cooldown.', 'Increases all resistances by 8 and causes all spells you fully resist to restore 4% of your total mana.  1 sec. cooldown.', 'Increases all resistances by 10 and causes all spells you fully resist to restore 5% of your total mana.  1 sec. cooldown.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Nature_AstralRecalGroup'
                }, {
                    i: 75,
                    n: 'Arcane Concentration',
                    maxRank: 5,
                    s: [11213, 12574, 12575, 12576, 12577],
                    d: ['Gives you a 2% chance of entering a Clearcasting state after any damage spell hits a target.  The Clearcasting state reduces the mana cost of your next damage spell by 100%.', 'Gives you a 4% chance of entering a Clearcasting state after any damage spell hits a target.  The Clearcasting state reduces the mana cost of your next damage spell by 100%.', 'Gives you a 6% chance of entering a Clearcasting state after any damage spell hits a target.  The Clearcasting state reduces the mana cost of your next damage spell by 100%.', 'Gives you a 8% chance of entering a Clearcasting state after any damage spell hits a target.  The Clearcasting state reduces the mana cost of your next damage spell by 100%.', 'Gives you a 10% chance of entering a Clearcasting state after any damage spell hits a target.  The Clearcasting state reduces the mana cost of your next damage spell by 100%.'],
                    x: 2,
                    y: 1,
                    iconname: 'Spell_Shadow_ManaBurn'
                }, {
                    i: 82,
                    n: 'Magic Attunement',
                    maxRank: 2,
                    s: [11247, 12606],
                    d: ['Increases the effect of your Amplify Magic and Dampen Magic spells by 25%.', 'Increases the effect of your Amplify Magic and Dampen Magic spells by 50%.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Nature_AbolishMagic'
                }, {
                    i: 81,
                    n: 'Improved Arcane Explosion',
                    maxRank: 3,
                    s: [11242, 12467, 12469],
                    d: ['Increases the critical strike chance of your Arcane Explosion spell by an additional 2%.', 'Increases the critical strike chance of your Arcane Explosion spell by an additional 4%.', 'Increases the critical strike chance of your Arcane Explosion spell by an additional 6%.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Nature_WispSplode'
                }, {
                    i: 85,
                    n: 'Arcane Resilience',
                    maxRank: 1,
                    s: [28574],
                    d: ['Increases your armor by an amount equal to 50% of your Intellect.'],
                    x: 2,
                    y: 2,
                    iconname: 'Spell_Arcane_ArcaneResilience'
                }, {
                    i: 83,
                    n: 'Improved Mana Shield',
                    maxRank: 2,
                    s: [11252, 12605],
                    d: ['Decreases the mana lost per point of damage taken when Mana Shield is active by 10%.', 'Decreases the mana lost per point of damage taken when Mana Shield is active by 20%.'],
                    x: 0,
                    y: 3,
                    iconname: 'Spell_Shadow_DetectLesserInvisibility'
                }, {
                    i: 88,
                    n: 'Improved Counterspell',
                    maxRank: 2,
                    s: [11255, 12598],
                    d: ['Gives your Counterspell a 50% chance to silence the target for 4 sec.', 'Gives your Counterspell a 100% chance to silence the target for 4 sec.'],
                    x: 1,
                    y: 3,
                    iconname: 'Spell_Frost_IceShock'
                }, {
                    i: 1142,
                    n: 'Arcane Meditation',
                    maxRank: 3,
                    s: [18462, 18463, 18464],
                    d: ['Allows 5% of your Mana regeneration to continue while casting.', 'Allows 10% of your Mana regeneration to continue while casting.', 'Allows 15% of your Mana regeneration to continue while casting.'],
                    x: 3,
                    y: 3,
                    iconname: 'Spell_Shadow_SiphonMana'
                }, {
                    i: 86,
                    n: 'Presence of Mind',
                    maxRank: 1,
                    s: [12043],
                    d: ['When activated, your next Mage spell with a casting time less than 10 sec becomes an instant cast spell.'],
                    x: 1,
                    y: 4,
                    iconname: 'Spell_Nature_EnchantArmor'
                }, {
                    i: 77,
                    n: 'Arcane Mind',
                    maxRank: 5,
                    s: [11232, 12500, 12501, 12502, 12503],
                    d: ['Increases your maximum Mana by 2%.', 'Increases your maximum Mana by 4%.', 'Increases your maximum Mana by 6%.', 'Increases your maximum Mana by 8%.', 'Increases your maximum Mana by 10%.'],
                    x: 2,
                    y: 4,
                    r: [8, 1],
                    iconname: 'Spell_Shadow_Charm'
                }, {
                    i: 421,
                    n: 'Arcane Instability',
                    maxRank: 3,
                    s: [15058, 15059, 15060],
                    d: ['Increases your spell damage and critical strike chance by 1%.', 'Increases your spell damage and critical strike chance by 2%.', 'Increases your spell damage and critical strike chance by 3%.'],
                    x: 1,
                    y: 5,
                    r: [12, 1],
                    iconname: 'Spell_Shadow_Teleport'
                }, {
                    i: 87,
                    n: 'Arcane Power',
                    maxRank: 1,
                    s: [12042],
                    d: ['When activated, your spells deal 30% more damage while costing 30% more mana to cast.  This effect lasts 15 sec.'],
                    x: 1,
                    y: 6,
                    r: [14, 3],
                    iconname: 'Spell_Nature_Lightning'
                }]
            }, {
                n: 'Fire',
                t: [{
                    i: 26,
                    n: 'Improved Fireball',
                    maxRank: 5,
                    s: [11069, 12338, 12339, 12340, 12341],
                    d: ['Reduces the casting time of your Fireball spell by 0.1 sec.', 'Reduces the casting time of your Fireball spell by 0.2 sec.', 'Reduces the casting time of your Fireball spell by 0.3 sec.', 'Reduces the casting time of your Fireball spell by 0.4 sec.', 'Reduces the casting time of your Fireball spell by 0.5 sec.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Fire_FlameBolt'
                }, {
                    i: 30,
                    n: 'Impact',
                    maxRank: 5,
                    s: [11103, 12357, 12358, 12359, 12360],
                    d: ['Gives your Fire spells a 2% chance to stun the target for 2 sec.', 'Gives your Fire spells a 4% chance to stun the target for 2 sec.', 'Gives your Fire spells a 6% chance to stun the target for 2 sec.', 'Gives your Fire spells a 8% chance to stun the target for 2 sec.', 'Gives your Fire spells a 10% chance to stun the target for 2 sec.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Fire_MeteorStorm'
                }, {
                    i: 34,
                    n: 'Ignite',
                    maxRank: 5,
                    s: [11119, 11120, 12846, 12847, 12848],
                    d: ["Your critical strikes from Fire damage spells cause the target to burn for an additional 8% of your spell's damage over 4 sec.", "Your critical strikes from Fire damage spells cause the target to burn for an additional 16% of your spell's damage over 4 sec.", "Your critical strikes from Fire damage spells cause the target to burn for an additional 24% of your spell's damage over 4 sec.", "Your critical strikes from Fire damage spells cause the target to burn for an additional 32% of your spell's damage over 4 sec.", "Your critical strikes from Fire damage spells cause the target to burn for an additional 40% of your spell's damage over 4 sec."],
                    x: 0,
                    y: 1,
                    iconname: 'Spell_Fire_Incinerate'
                }, {
                    i: 28,
                    n: 'Flame Throwing',
                    maxRank: 2,
                    s: [11100, 12353],
                    d: ['Increases the range of your Fire spells by 3 yards.', 'Increases the range of your Fire spells by 6 yards.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Fire_Flare'
                }, {
                    i: 27,
                    n: 'Improved Fire Blast',
                    maxRank: 3,
                    s: [11078, 11080, 12342],
                    d: ['Reduces the cooldown of your Fire Blast spell by 0.5 sec.', 'Reduces the cooldown of your Fire Blast spell by 1 sec.', 'Reduces the cooldown of your Fire Blast spell by 1.5 sec.'],
                    x: 2,
                    y: 1,
                    iconname: 'Spell_Fire_Fireball'
                }, {
                    i: 1141,
                    n: 'Incinerate',
                    maxRank: 2,
                    s: [18459, 18460],
                    d: ['Increases the critical strike chance of your Fire Blast and Scorch spells by 2%.', 'Increases the critical strike chance of your Fire Blast and Scorch spells by 4%.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Fire_FlameShock'
                }, {
                    i: 31,
                    n: 'Improved Flamestrike',
                    maxRank: 3,
                    s: [11108, 12349, 12350],
                    d: ['Increases the critical strike chance of your Flamestrike spell by 5%.', 'Increases the critical strike chance of your Flamestrike spell by 10%.', 'Increases the critical strike chance of your Flamestrike spell by 15%.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Fire_SelfDestruct'
                }, {
                    i: 29,
                    n: 'Pyroblast',
                    maxRank: 1,
                    s: [11366],
                    d: ['Hurls an immense fiery boulder that causes 141 to 188 Fire damage and an additional 56 Fire damage over 12 sec.'],
                    x: 2,
                    y: 2,
                    iconname: 'Spell_Fire_Fireball02'
                }, {
                    i: 23,
                    n: 'Burning Soul',
                    maxRank: 2,
                    s: [11083, 12351],
                    d: ['Gives your Fire spells a 35% chance to not lose casting time when you take damage and reduces the threat caused by your Fire spells by 15%.', 'Gives your Fire spells a 70% chance to not lose casting time when you take damage and reduces the threat caused by your Fire spells by 30%.'],
                    x: 3,
                    y: 2,
                    iconname: 'Spell_Fire_Fire'
                }, {
                    i: 25,
                    n: 'Improved Scorch',
                    maxRank: 3,
                    s: [11095, 12872, 12873],
                    d: ['Your Scorch spells have a 33% chance to cause your target to be vulnerable to Fire damage.  This vulnerability increases the Fire damage dealt to your target by 3% and lasts 30 sec.  Stacks up to 30001 times.', 'Your Scorch spells have a 66% chance to cause your target to be vulnerable to Fire damage.  This vulnerability increases the Fire damage dealt to your target by 3% and lasts 30 sec.  Stacks up to 30001 times.', 'Your Scorch spells have a 100% chance to cause your target to be vulnerable to Fire damage.  This vulnerability increases the Fire damage dealt to your target by 3% and lasts 30 sec.  Stacks up to 30001 times.'],
                    x: 0,
                    y: 3,
                    iconname: 'Spell_Fire_SoulBurn'
                }, {
                    i: 24,
                    n: 'Improved Fire Ward',
                    maxRank: 2,
                    s: [11094, 13043],
                    d: ['Causes your Fire Ward to have a 10% chance to reflect Fire spells while active.', 'Causes your Fire Ward to have a 20% chance to reflect Fire spells while active.'],
                    x: 1,
                    y: 3,
                    iconname: 'Spell_Fire_FireArmor'
                }, {
                    i: 1639,
                    n: 'Master of Elements',
                    maxRank: 3,
                    s: [29074, 29075, 29076],
                    d: ['Your Fire and Frost spell criticals will refund 10% of their base mana cost.', 'Your Fire and Frost spell criticals will refund 20% of their base mana cost.', 'Your Fire and Frost spell criticals will refund 30% of their base mana cost.'],
                    x: 3,
                    y: 3,
                    iconname: 'Spell_Fire_MasterOfElements'
                }, {
                    i: 33,
                    n: 'Critical Mass',
                    maxRank: 3,
                    s: [11115, 11367, 11368],
                    d: ['Increases the critical strike chance of your Fire spells by 2%.', 'Increases the critical strike chance of your Fire spells by 4%.', 'Increases the critical strike chance of your Fire spells by 6%.'],
                    x: 1,
                    y: 4,
                    iconname: 'Spell_Nature_WispHeal'
                }, {
                    i: 32,
                    n: 'Blast Wave',
                    maxRank: 1,
                    s: [11113],
                    d: ['A wave of flame radiates outward from the caster, damaging all enemies caught within the blast for 154 to 187 Fire damage, and dazing them for 6 sec.'],
                    x: 2,
                    y: 4,
                    r: [7, 1],
                    iconname: 'Spell_Holy_Excorcism_02'
                }, {
                    i: 35,
                    n: 'Fire Power',
                    maxRank: 5,
                    s: [11124, 12378, 12398, 12399, 12400],
                    d: ['Increases the damage done by your Fire spells by 2%.', 'Increases the damage done by your Fire spells by 4%.', 'Increases the damage done by your Fire spells by 6%.', 'Increases the damage done by your Fire spells by 8%.', 'Increases the damage done by your Fire spells by 10%.'],
                    x: 2,
                    y: 5,
                    iconname: 'Spell_Fire_Immolation'
                }, {
                    i: 36,
                    n: 'Combustion',
                    maxRank: 1,
                    s: [11129],
                    d: ['When activated, this spell causes each of your Fire damage spell hits to increase your critical strike chance with Fire damage spells by 10%.  This effect lasts until you have caused 3 critical strikes with Fire spells.'],
                    x: 1,
                    y: 6,
                    r: [12, 3],
                    iconname: 'Spell_Fire_SealOfFire'
                }]
            }, {
                n: 'Frost',
                t: [{
                    i: 70,
                    n: 'Frost Warding',
                    maxRank: 2,
                    s: [11189, 28332],
                    d: ['Increases the armor and resistances given by your Frost Armor and Ice Armor spells by 15%.  In addition, gives your Frost Ward a 10% chance to reflect Frost spells and effects while active.', 'Increases the armor and resistances given by your Frost Armor and Ice Armor spells by 30%.  In addition, gives your Frost Ward a 20% chance to reflect Frost spells and effects while active.'],
                    x: 0,
                    y: 0,
                    iconname: 'Spell_Frost_FrostWard'
                }, {
                    i: 37,
                    n: 'Improved Frostbolt',
                    maxRank: 5,
                    s: [11070, 12473, 16763, 16765, 16766],
                    d: ['Reduces the casting time of your Frostbolt spell by 0.1 sec.', 'Reduces the casting time of your Frostbolt spell by 0.2 sec.', 'Reduces the casting time of your Frostbolt spell by 0.3 sec.', 'Reduces the casting time of your Frostbolt spell by 0.4 sec.', 'Reduces the casting time of your Frostbolt spell by 0.5 sec.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Frost_FrostBolt02'
                }, {
                    i: 1649,
                    n: 'Elemental Precision',
                    maxRank: 3,
                    s: [29438, 29439, 29440],
                    d: ['Reduces the chance that the opponent can resist your Frost and Fire spells by 2%.', 'Reduces the chance that the opponent can resist your Frost and Fire spells by 4%.', 'Reduces the chance that the opponent can resist your Frost and Fire spells by 6%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Ice_MagicDamage'
                }, {
                    i: 73,
                    n: 'Ice Shards',
                    maxRank: 5,
                    s: [11207, 12672, 15047, 15052, 15053],
                    d: ['Increases the critical strike damage bonus of your Frost spells by 20%.', 'Increases the critical strike damage bonus of your Frost spells by 40%.', 'Increases the critical strike damage bonus of your Frost spells by 60%.', 'Increases the critical strike damage bonus of your Frost spells by 80%.', 'Increases the critical strike damage bonus of your Frost spells by 100%.'],
                    x: 0,
                    y: 1,
                    iconname: 'Spell_Frost_IceShard'
                }, {
                    i: 38,
                    n: 'Frostbite',
                    maxRank: 3,
                    s: [11071, 12496, 12497],
                    d: ['Gives your Chill effects a 5% chance to freeze the target for 5 sec.', 'Gives your Chill effects a 10% chance to freeze the target for 5 sec.', 'Gives your Chill effects a 15% chance to freeze the target for 5 sec.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Frost_FrostArmor'
                }, {
                    i: 62,
                    n: 'Improved Frost Nova',
                    maxRank: 2,
                    s: [11165, 12475],
                    d: ['Reduces the cooldown of your Frost Nova spell by 2 sec.', 'Reduces the cooldown of your Frost Nova spell by 4 sec.'],
                    x: 2,
                    y: 1,
                    iconname: 'Spell_Frost_FreezingBreath'
                }, {
                    i: 65,
                    n: 'Permafrost',
                    maxRank: 3,
                    s: [11175, 12569, 12571],
                    d: ["Increases the duration of your Chill effects by 1 sec and reduces the target's speed by an additional 4%.", "Increases the duration of your Chill effects by 2 secs and reduces the target's speed by an additional 7%.", "Increases the duration of your Chill effects by 3 secs and reduces the target's speed by an additional 10%."],
                    x: 3,
                    y: 1,
                    iconname: 'Spell_Frost_Wisp'
                }, {
                    i: 61,
                    n: 'Piercing Ice',
                    maxRank: 3,
                    s: [11151, 12952, 12953],
                    d: ['Increases the damage done by your Frost spells by 2%.', 'Increases the damage done by your Frost spells by 4%.', 'Increases the damage done by your Frost spells by 6%.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Frost_Frostbolt'
                }, {
                    i: 69,
                    n: 'Cold Snap',
                    maxRank: 1,
                    s: [12472],
                    d: ['When activated, this spell finishes the cooldown on all of your Frost spells.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Frost_WizardMark'
                }, {
                    i: 63,
                    n: 'Improved Blizzard',
                    maxRank: 3,
                    s: [11185, 12487, 12488],
                    d: ["Adds a chill effect to your Blizzard spell.  This effect lowers the target's movement speed by 30%.  Lasts 2 sec.", "Adds a chill effect to your Blizzard spell.  This effect lowers the target's movement speed by 50%.  Lasts 2 sec.", "Adds a chill effect to your Blizzard spell.  This effect lowers the target's movement speed by 65%.  Lasts 2 sec."],
                    x: 3,
                    y: 2,
                    iconname: 'Spell_Frost_IceStorm'
                }, {
                    i: 741,
                    n: 'Arctic Reach',
                    maxRank: 2,
                    s: [16757, 16758],
                    d: ['Increases the range of your Frostbolt and Blizzard spells and the radius of your Frost Nova and Cone of Cold spells by 10%.', 'Increases the range of your Frostbolt and Blizzard spells and the radius of your Frost Nova and Cone of Cold spells by 20%.'],
                    x: 0,
                    y: 3,
                    iconname: 'Spell_Shadow_DarkRitual'
                }, {
                    i: 66,
                    n: 'Frost Channeling',
                    maxRank: 3,
                    s: [11160, 12518, 12519],
                    d: ['Reduces the mana cost of your Frost spells by 5% and reduces the threat caused by your Frost spells by 10%.', 'Reduces the mana cost of your Frost spells by 10% and reduces the threat caused by your Frost spells by 20%.', 'Reduces the mana cost of your Frost spells by 15% and reduces the threat caused by your Frost spells by 30%.'],
                    x: 1,
                    y: 3,
                    iconname: 'Spell_Frost_Stun'
                }, {
                    i: 67,
                    n: 'Shatter',
                    maxRank: 5,
                    s: [11170, 12982, 12983, 12984, 12985],
                    d: ['Increases the critical strike chance of all your spells against frozen targets by 10%.', 'Increases the critical strike chance of all your spells against frozen targets by 20%.', 'Increases the critical strike chance of all your spells against frozen targets by 30%.', 'Increases the critical strike chance of all your spells against frozen targets by 40%.', 'Increases the critical strike chance of all your spells against frozen targets by 50%.'],
                    x: 2,
                    y: 3,
                    r: [5, 2],
                    iconname: 'Spell_Frost_FrostShock'
                }, {
                    i: 72,
                    n: 'Ice Block',
                    maxRank: 1,
                    s: [11958],
                    d: ['You become encased in a block of ice, protecting you from all physical attacks and spells for 10 sec, but during that time you cannot attack, move or cast spells.'],
                    x: 1,
                    y: 4,
                    iconname: 'Spell_Frost_Frost'
                }, {
                    i: 64,
                    n: 'Improved Cone of Cold',
                    maxRank: 3,
                    s: [11190, 12489, 12490],
                    d: ['Increases the damage dealt by your Cone of Cold spell by 15%.', 'Increases the damage dealt by your Cone of Cold spell by 25%.', 'Increases the damage dealt by your Cone of Cold spell by 35%.'],
                    x: 2,
                    y: 4,
                    iconname: 'Spell_Frost_Glacier'
                }, {
                    i: 68,
                    n: "Winter's Chill",
                    maxRank: 5,
                    s: [11180, 28592, 28593, 28594, 28595],
                    d: ["Gives your Frost damage spells a 20% chance to apply the Winter's Chill effect, which increases the chance a Frost spell will critically hit the target by 2% for 15 sec.  Stacks up to 15001 times.", "Gives your Frost damage spells a 40% chance to apply the Winter's Chill effect, which increases the chance a Frost spell will critically hit the target by 2% for 15 sec.  Stacks up to 15001 times.", "Gives your Frost damage spells a 60% chance to apply the Winter's Chill effect, which increases the chance a Frost spell will critically hit the target by 2% for 15 sec.  Stacks up to 15001 times.", "Gives your Frost damage spells a 80% chance to apply the Winter's Chill effect, which increases the chance a Frost spell will critically hit the target by 2% for 15 sec.  Stacks up to 15001 times.", "Gives your Frost damage spells a 100% chance to apply the Winter's Chill effect, which increases the chance a Frost spell will critically hit the target by 2% for 15 sec.  Stacks up to 15001 times."],
                    x: 2,
                    y: 5,
                    iconname: 'Spell_Frost_ChillingBlast'
                }, {
                    i: 71,
                    n: 'Ice Barrier',
                    maxRank: 1,
                    s: [11426],
                    d: ['Instantly shields you, absorbing 438 damage.  Lasts 1 min.  While the shield holds, spells will not be interrupted.<br />'],
                    x: 1,
                    y: 6,
                    r: [13, 1],
                    iconname: 'Spell_Ice_Lament'
                }]
            }]
        },
        {
            name: 'druid',
            tree_talents:[{
                n: 'Balance',
                t: [{
                    i: 762,
                    n: 'Improved Wrath',
                    maxRank: 5,
                    s: [16814, 16815, 16816, 16817, 16818],
                    d: ['Reduces the cast time of your Wrath spell by 0.1 sec.', 'Reduces the cast time of your Wrath spell by 0.2 sec.', 'Reduces the cast time of your Wrath spell by 0.3 sec.', 'Reduces the cast time of your Wrath spell by 0.4 sec.', 'Reduces the cast time of your Wrath spell by 0.5 sec.'],
                    x: 0,
                    y: 0,
                    iconname: 'Spell_Nature_AbolishMagic'
                }, {
                    i: 761,
                    n: "Nature's Grasp",
                    maxRank: 1,
                    s: [16689],
                    d: ['While active, any time an enemy strikes the caster they have a 35% chance to become afflicted by Entangling Roots (Rank 1).  Only useable outdoors.  1 charge.  Lasts 45 sec.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Nature_NaturesWrath'
                }, {
                    i: 921,
                    n: "Improved Nature's Grasp",
                    maxRank: 4,
                    s: [17245, 17247, 17248, 17249],
                    d: ["Increases the chance for your Nature's Grasp to entangle an enemy by 15%.", "Increases the chance for your Nature's Grasp to entangle an enemy by 30%.", "Increases the chance for your Nature's Grasp to entangle an enemy by 45%.", "Increases the chance for your Nature's Grasp to entangle an enemy by 65%."],
                    x: 2,
                    y: 0,
                    r: [1, 1],
                    iconname: 'Spell_Nature_NaturesWrath'
                }, {
                    i: 787,
                    n: 'Improved Entangling Roots',
                    maxRank: 3,
                    s: [16918, 16919, 16920],
                    d: ['Gives you a 40% chance to avoid interruption caused by damage while casting Entangling Roots.', 'Gives you a 70% chance to avoid interruption caused by damage while casting Entangling Roots.', 'Gives you a 100% chance to avoid interruption caused by damage while casting Entangling Roots.'],
                    x: 0,
                    y: 1,
                    iconname: 'Spell_Nature_StrangleVines'
                }, {
                    i: 763,
                    n: 'Improved Moonfire',
                    maxRank: 5,
                    s: [16821, 16822, 16823, 16824, 16825],
                    d: ['Increases the damage and critical strike chance of your Moonfire spell by 2%.', 'Increases the damage and critical strike chance of your Moonfire spell by 4%.', 'Increases the damage and critical strike chance of your Moonfire spell by 6%.', 'Increases the damage and critical strike chance of your Moonfire spell by 8%.', 'Increases the damage and critical strike chance of your Moonfire spell by 10%.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Nature_StarFall'
                }, {
                    i: 791,
                    n: 'Natural Weapons',
                    maxRank: 5,
                    s: [16902, 16903, 16904, 16905, 16906],
                    d: ['Increases the damage you deal with physical attacks in all forms by 2%.', 'Increases the damage you deal with physical attacks in all forms by 4%.', 'Increases the damage you deal with physical attacks in all forms by 6%.', 'Increases the damage you deal with physical attacks in all forms by 8%.', 'Increases the damage you deal with physical attacks in all forms by 10%.'],
                    x: 2,
                    y: 1,
                    iconname: 'INV_Staff_01'
                }, {
                    i: 781,
                    n: 'Natural Shapeshifter',
                    maxRank: 3,
                    s: [16833, 16834, 16835],
                    d: ['Reduces the mana cost of all shapeshifting by 10%.', 'Reduces the mana cost of all shapeshifting by 20%.', 'Reduces the mana cost of all shapeshifting by 30%.'],
                    x: 3,
                    y: 1,
                    iconname: 'Spell_Nature_WispSplode'
                }, {
                    i: 782,
                    n: 'Improved Thorns',
                    maxRank: 3,
                    s: [16836, 16839, 16840],
                    d: ['Increases damage caused by your Thorns spell by 25%.', 'Increases damage caused by your Thorns spell by 50%.', 'Increases damage caused by your Thorns spell by 75%.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Nature_Thorns'
                }, {
                    i: 788,
                    n: 'Omen of Clarity',
                    maxRank: 1,
                    s: [16864],
                    d: ["Imbues the Druid with natural energy.  Each of the Druid's melee attacks has a chance of causing the caster to enter a Clearcasting state.  The Clearcasting state reduces the Mana, Rage or Energy cost of your next damage or healing spell or offensive ability by 100%.  Lasts 10 min."],
                    x: 2,
                    y: 2,
                    r: [5, 5],
                    iconname: 'Spell_Nature_CrystalBall'
                }, {
                    i: 764,
                    n: "Nature's Reach",
                    maxRank: 2,
                    s: [16819, 16820],
                    d: ['Increases the range of your Wrath, Entangling Roots, Faerie Fire, Moonfire, Starfire, and Hurricane spells by 10%.', 'Increases the range of your Wrath, Entangling Roots, Faerie Fire, Moonfire, Starfire, and Hurricane spells by 20%.'],
                    x: 3,
                    y: 2,
                    iconname: 'Spell_Nature_NatureTouchGrow'
                }, {
                    i: 792,
                    n: 'Vengeance',
                    maxRank: 5,
                    s: [16909, 16910, 16911, 16912, 16913],
                    d: ['Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 20%.', 'Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 40%.', 'Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 60%.', 'Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 80%.', 'Increases the critical strike damage bonus of your Starfire, Moonfire, and Wrath spells by 100%.'],
                    x: 1,
                    y: 3,
                    r: [4, 5],
                    iconname: 'Spell_Nature_Purge'
                }, {
                    i: 784,
                    n: 'Improved Starfire',
                    maxRank: 5,
                    s: [16850, 16923, 16924, 16925, 16926],
                    d: ['Reduces the cast time of Starfire by 0.1 sec and has a 3% chance to stun the target for 3 sec.', 'Reduces the cast time of Starfire by 0.2 sec and has a 6% chance to stun the target for 3 sec.', 'Reduces the cast time of Starfire by 0.3 sec and has a 9% chance to stun the target for 3 sec.', 'Reduces the cast time of Starfire by 0.4 sec and has a 12% chance to stun the target for 3 sec.', 'Reduces the cast time of Starfire by 0.5 sec and has a 15% chance to stun the target for 3 sec.'],
                    x: 2,
                    y: 3,
                    iconname: 'Spell_Arcane_StarFire'
                }, {
                    i: 789,
                    n: "Nature's Grace",
                    maxRank: 1,
                    s: [16880],
                    d: ['All spell criticals grace you with a blessing of nature, reducing the casting time of your next spell by 0.5 sec.'],
                    x: 1,
                    y: 4,
                    iconname: 'Spell_Nature_NaturesBlessing'
                }, {
                    i: 783,
                    n: 'Moonglow',
                    maxRank: 3,
                    s: [16845, 16846, 16847],
                    d: ['Reduces the Mana cost of your Moonfire, Starfire, Wrath, Healing Touch, Regrowth and Rejuvenation spells by 3%.', 'Reduces the Mana cost of your Moonfire, Starfire, Wrath, Healing Touch, Regrowth and Rejuvenation spells by 6%.', 'Reduces the Mana cost of your Moonfire, Starfire, Wrath, Healing Touch, Regrowth and Rejuvenation spells by 9%.'],
                    x: 2,
                    y: 4,
                    iconname: 'Spell_Nature_Sentinal'
                }, {
                    i: 790,
                    n: 'Moonfury',
                    maxRank: 5,
                    s: [16896, 16897, 16899, 16900, 16901],
                    d: ['Increases the damage done by your Starfire, Moonfire and Wrath spells by 2%.', 'Increases the damage done by your Starfire, Moonfire and Wrath spells by 4%.', 'Increases the damage done by your Starfire, Moonfire and Wrath spells by 6%.', 'Increases the damage done by your Starfire, Moonfire and Wrath spells by 8%.', 'Increases the damage done by your Starfire, Moonfire and Wrath spells by 10%.'],
                    x: 1,
                    y: 5,
                    r: [12, 1],
                    iconname: 'Spell_Nature_MoonGlow'
                }, {
                    i: 793,
                    n: 'Moonkin Form',
                    maxRank: 1,
                    s: [24858],
                    d: ['Transforms the Druid into Moonkin Form.  While in this form the armor contribution from items is increased by 360% and all party members within 30 yards have their spell critical chance increased by 3%.  The Moonkin can only cast Balance spells while shapeshifted.<br /><br />The act of shapeshifting frees the caster of Polymorph and Movement Impairing effects.'],
                    x: 1,
                    y: 6,
                    iconname: 'Spell_Nature_ForceOfNature'
                }]
            }, {
                n: 'Feral Combat',
                t: [{
                    i: 796,
                    n: 'Ferocity',
                    maxRank: 5,
                    s: [16934, 16935, 16936, 16937, 16938],
                    d: ['Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 1 Rage or Energy.', 'Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 2 Rage or Energy.', 'Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 3 Rage or Energy.', 'Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 4 Rage or Energy.', 'Reduces the cost of your Maul, Swipe, Claw, and Rake abilities by 5 Rage or Energy.'],
                    x: 1,
                    y: 0,
                    iconname: 'Ability_Hunter_Pet_Hyena'
                }, {
                    i: 795,
                    n: 'Feral Aggression',
                    maxRank: 5,
                    s: [16858, 16859, 16860, 16861, 16862],
                    d: ['Increases the Attack Power reduction of your Demoralizing Roar by 8% and the damage caused by your Ferocious Bite by 3%.', 'Increases the Attack Power reduction of your Demoralizing Roar by 16% and the damage caused by your Ferocious Bite by 6%.', 'Increases the Attack Power reduction of your Demoralizing Roar by 24% and the damage caused by your Ferocious Bite by 9%.', 'Increases the Attack Power reduction of your Demoralizing Roar by 32% and the damage caused by your Ferocious Bite by 12%.', 'Increases the Attack Power reduction of your Demoralizing Roar by 40% and the damage caused by your Ferocious Bite by 15%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Ability_Druid_DemoralizingRoar'
                }, {
                    i: 799,
                    n: 'Feral Instinct',
                    maxRank: 5,
                    s: [16947, 16948, 16949, 16950, 16951],
                    d: ['Increases threat caused in Bear and Dire Bear Form by 3% and reduces the chance enemies have to detect you while Prowling.', 'Increases threat caused in Bear and Dire Bear Form by 6% and reduces the chance enemies have to detect you while Prowling.', 'Increases threat caused in Bear and Dire Bear Form by 9% and reduces the chance enemies have to detect you while Prowling.', 'Increases threat caused in Bear and Dire Bear Form by 12% and reduces the chance enemies have to detect you while Prowling.', 'Increases threat caused in Bear and Dire Bear Form by 15% and reduces the chance enemies have to detect you while Prowling.'],
                    x: 0,
                    y: 1,
                    iconname: 'Ability_Ambush'
                }, {
                    i: 797,
                    n: 'Brutal Impact',
                    maxRank: 2,
                    s: [16940, 16941],
                    d: ['Increases the stun duration of your Bash and Pounce abilities by 0.5 sec.', 'Increases the stun duration of your Bash and Pounce abilities by 1 sec.'],
                    x: 1,
                    y: 1,
                    iconname: 'Ability_Druid_Bash'
                }, {
                    i: 794,
                    n: 'Thick Hide',
                    maxRank: 5,
                    s: [16929, 16930, 16931, 16932, 16933],
                    d: ['Increases your Armor contribution from items by 2%.', 'Increases your Armor contribution from items by 4%.', 'Increases your Armor contribution from items by 6%.', 'Increases your Armor contribution from items by 8%.', 'Increases your Armor contribution from items by 10%.'],
                    x: 2,
                    y: 1,
                    iconname: 'INV_Misc_Pelt_Bear_03'
                }, {
                    i: 807,
                    n: 'Feline Swiftness',
                    maxRank: 2,
                    s: [17002, 24866],
                    d: ['Increases your movement speed by 15% while outdoors in Cat Form and increases your chance to dodge while in Cat Form by 2%.', 'Increases your movement speed by 30% while outdoors in Cat Form and increases your chance to dodge while in Cat Form by 4%.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Nature_SpiritWolf'
                }, {
                    i: 804,
                    n: 'Feral Charge',
                    maxRank: 1,
                    s: [16979],
                    d: ['Causes you to charge an enemy, immobilizing and interrupting any spell being cast for 4 sec.'],
                    x: 1,
                    y: 2,
                    iconname: 'Ability_Hunter_Pet_Bear'
                }, {
                    i: 798,
                    n: 'Sharpened Claws',
                    maxRank: 3,
                    s: [16942, 16943, 16944],
                    d: ['Increases your critical strike chance while in Bear, Dire Bear or Cat Form by 2%.', 'Increases your critical strike chance while in Bear, Dire Bear or Cat Form by 4%.', 'Increases your critical strike chance while in Bear, Dire Bear or Cat Form by 6%.'],
                    x: 2,
                    y: 2,
                    iconname: 'INV_Misc_MonsterClaw_04'
                }, {
                    i: 802,
                    n: 'Improved Shred',
                    maxRank: 2,
                    s: [16966, 16968],
                    d: ['Reduces the Energy cost of your Shred ability by 6.', 'Reduces the Energy cost of your Shred ability by 12.'],
                    x: 0,
                    y: 3,
                    iconname: 'Spell_Shadow_VampiricAura'
                }, {
                    i: 803,
                    n: 'Predatory Strikes',
                    maxRank: 3,
                    s: [16972, 16974, 16975],
                    d: ['Increases your melee attack power in Cat, Bear and Dire Bear Forms by 50% of your level.', 'Increases your melee attack power in Cat, Bear and Dire Bear Forms by 100% of your level.', 'Increases your melee attack power in Cat, Bear and Dire Bear Forms by 150% of your level.'],
                    x: 1,
                    y: 3,
                    iconname: 'Ability_Hunter_Pet_Cat'
                }, {
                    i: 800,
                    n: 'Blood Frenzy',
                    maxRank: 2,
                    s: [16952, 16954],
                    d: ['Your critical strikes from Cat Form abilities that add combo points  have a 50% chance to add an additional combo point.', 'Your critical strikes from Cat Form abilities that add combo points  have a 100% chance to add an additional combo point.'],
                    x: 2,
                    y: 3,
                    r: [7, 3],
                    iconname: 'Ability_GhoulFrenzy'
                }, {
                    i: 801,
                    n: 'Primal Fury',
                    maxRank: 2,
                    s: [16958, 16961],
                    d: ['Gives you a 50% chance to gain an additional 5 Rage anytime you get a critical strike while in Bear and Dire Bear Form.', 'Gives you a 100% chance to gain an additional 5 Rage anytime you get a critical strike while in Bear and Dire Bear Form.'],
                    x: 3,
                    y: 3,
                    r: [7, 3],
                    iconname: 'Ability_Racial_Cannibalize'
                }, {
                    i: 805,
                    n: 'Savage Fury',
                    maxRank: 2,
                    s: [16998, 16999],
                    d: ['Increases the damage caused by your Claw, Rake, Maul and Swipe abilities by 10%.', 'Increases the damage caused by your Claw, Rake, Maul and Swipe abilities by 20%.'],
                    x: 0,
                    y: 4,
                    iconname: 'Ability_Druid_Ravage'
                }, {
                    i: 1162,
                    n: 'Faerie Fire (Feral)',
                    maxRank: 1,
                    s: [16857],
                    d: ['Decrease the armor of the target by 175 for 40 sec.  While affected, the target cannot stealth or turn invisible.'],
                    x: 2,
                    y: 4,
                    iconname: 'Spell_Nature_FaerieFire'
                }, {
                    i: 808,
                    n: 'Heart of the Wild',
                    maxRank: 5,
                    s: [17003, 17004, 17005, 17006, 24894],
                    d: ['Increases your Intellect by 4%.  In addition, while in Bear or Dire Bear Form your Stamina is increased by 4% and while in Cat Form your Strength is increased by 4%.', 'Increases your Intellect by 8%.  In addition, while in Bear or Dire Bear Form your Stamina is increased by 8% and while in Cat Form your Strength is increased by 8%.', 'Increases your Intellect by 12%.  In addition, while in Bear or Dire Bear Form your Stamina is increased by 12% and while in Cat Form your Strength is increased by 12%.', 'Increases your Intellect by 16%.  In addition, while in Bear or Dire Bear Form your Stamina is increased by 16% and while in Cat Form your Strength is increased by 16%.', 'Increases your Intellect by 20%.  In addition, while in Bear or Dire Bear Form your Stamina is increased by 20% and while in Cat Form your Strength is increased by 20%.'],
                    x: 1,
                    y: 5,
                    r: [9, 3],
                    iconname: 'Spell_Holy_BlessingOfAgility'
                }, {
                    i: 809,
                    n: 'Leader of the Pack',
                    maxRank: 1,
                    s: [17007],
                    d: ['While in Cat, Bear or Dire Bear Form, the Leader of the Pack increases ranged and melee critical chance of all party members within 45 yards by 3%.'],
                    x: 1,
                    y: 6,
                    iconname: 'Spell_Nature_UnyeildingStamina'
                }]
            }, {
                n: 'Restoration',
                t: [{
                    i: 821,
                    n: 'Improved Mark of the Wild',
                    maxRank: 5,
                    s: [17050, 17051, 17053, 17054, 17055],
                    d: ['Increases the effects of your Mark of the Wild and Gift of the Wild spells by 7%.', 'Increases the effects of your Mark of the Wild and Gift of the Wild spells by 14%.', 'Increases the effects of your Mark of the Wild and Gift of the Wild spells by 21%.', 'Increases the effects of your Mark of the Wild and Gift of the Wild spells by 28%.', 'Increases the effects of your Mark of the Wild and Gift of the Wild spells by 35%.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Nature_Regeneration'
                }, {
                    i: 822,
                    n: 'Furor',
                    maxRank: 5,
                    s: [17056, 17058, 17059, 17060, 17061],
                    d: ['Gives you 20% chance to gain 10 Rage when you shapeshift into Bear and Dire Bear Form or 40 Energy when you shapeshift into Cat Form.', 'Gives you 40% chance to gain 10 Rage when you shapeshift into Bear and Dire Bear Form or 40 Energy when you shapeshift into Cat Form.', 'Gives you 60% chance to gain 10 Rage when you shapeshift into Bear and Dire Bear Form or 40 Energy when you shapeshift into Cat Form.', 'Gives you 80% chance to gain 10 Rage when you shapeshift into Bear and Dire Bear Form or 40 Energy when you shapeshift into Cat Form.', 'Gives you 100% chance to gain 10 Rage when you shapeshift into Bear and Dire Bear Form or 40 Energy when you shapeshift into Cat Form.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Holy_BlessingOfStamina'
                }, {
                    i: 824,
                    n: 'Improved Healing Touch',
                    maxRank: 5,
                    s: [17069, 17070, 17071, 17072, 17073],
                    d: ['Reduces the cast time of your Healing Touch spell by 0.1 sec.', 'Reduces the cast time of your Healing Touch spell by 0.2 sec.', 'Reduces the cast time of your Healing Touch spell by 0.3 sec.', 'Reduces the cast time of your Healing Touch spell by 0.4 sec.', 'Reduces the cast time of your Healing Touch spell by 0.5 sec.'],
                    x: 0,
                    y: 1,
                    iconname: 'Spell_Nature_HealingTouch'
                }, {
                    i: 823,
                    n: "Nature's Focus",
                    maxRank: 5,
                    s: [17063, 17065, 17066, 17067, 17068],
                    d: ['Gives you a 14% chance to avoid interruption caused by damage while casting the Healing Touch, Regrowth and Tranquility spells.', 'Gives you a 28% chance to avoid interruption caused by damage while casting the Healing Touch, Regrowth and Tranquility spells.', 'Gives you a 42% chance to avoid interruption caused by damage while casting the Healing Touch, Regrowth and Tranquility spells.', 'Gives you a 56% chance to avoid interruption caused by damage while casting the Healing Touch, Regrowth and Tranquility spells.', 'Gives you a 70% chance to avoid interruption caused by damage while casting the Healing Touch, Regrowth and Tranquility spells.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Nature_HealingWaveGreater'
                }, {
                    i: 826,
                    n: 'Improved Enrage',
                    maxRank: 2,
                    s: [17079, 17082],
                    d: ['The Enrage ability now instantly generates 5 Rage.', 'The Enrage ability now instantly generates 10 Rage.'],
                    x: 2,
                    y: 1,
                    iconname: 'Ability_Druid_Enrage'
                }, {
                    i: 829,
                    n: 'Reflection',
                    maxRank: 3,
                    s: [17106, 17107, 17108],
                    d: ['Allows 5% of your Mana regeneration to continue while casting.', 'Allows 10% of your Mana regeneration to continue while casting.', 'Allows 15% of your Mana regeneration to continue while casting.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Frost_WindWalkOn'
                }, {
                    i: 827,
                    n: 'Insect Swarm',
                    maxRank: 1,
                    s: [5570],
                    d: ['The enemy target is swarmed by insects, decreasing their chance to hit by 2% and causing 66 Nature damage over 12 sec.'],
                    x: 2,
                    y: 2,
                    iconname: 'Spell_Nature_InsectSwarm'
                }, {
                    i: 841,
                    n: 'Subtlety',
                    maxRank: 5,
                    s: [17118, 17119, 17120, 17121, 17122],
                    d: ['Reduces the threat generated by your Healing spells by 4%.', 'Reduces the threat generated by your Healing spells by 8%.', 'Reduces the threat generated by your Healing spells by 12%.', 'Reduces the threat generated by your Healing spells by 16%.', 'Reduces the threat generated by your Healing spells by 20%.'],
                    x: 3,
                    y: 2,
                    iconname: 'Ability_EyeOfTheOwl'
                }, {
                    i: 843,
                    n: 'Tranquil Spirit',
                    maxRank: 5,
                    s: [24968, 24969, 24970, 24971, 24972],
                    d: ['Reduces the mana cost of your Healing Touch and Tranquility spells by 2%.', 'Reduces the mana cost of your Healing Touch and Tranquility spells by 4%.', 'Reduces the mana cost of your Healing Touch and Tranquility spells by 6%.', 'Reduces the mana cost of your Healing Touch and Tranquility spells by 8%.', 'Reduces the mana cost of your Healing Touch and Tranquility spells by 10%.'],
                    x: 1,
                    y: 3,
                    iconname: 'Spell_Holy_ElunesGrace'
                }, {
                    i: 830,
                    n: 'Improved Rejuvenation',
                    maxRank: 3,
                    s: [17111, 17112, 17113],
                    d: ['Increases the effect of your Rejuvenation spell by 5%.', 'Increases the effect of your Rejuvenation spell by 10%.', 'Increases the effect of your Rejuvenation spell by 15%.'],
                    x: 3,
                    y: 3,
                    iconname: 'Spell_Nature_Rejuvenation'
                }, {
                    i: 831,
                    n: "Nature's Swiftness",
                    maxRank: 1,
                    s: [17116],
                    d: ['When activated, your next Nature spell becomes an instant cast spell.'],
                    x: 0,
                    y: 4,
                    r: [2, 5],
                    iconname: 'Spell_Nature_RavenForm'
                }, {
                    i: 828,
                    n: 'Gift of Nature',
                    maxRank: 5,
                    s: [17104, 24943, 24944, 24945, 24946],
                    d: ['Increases the effect of all healing spells by 2%.', 'Increases the effect of all healing spells by 4%.', 'Increases the effect of all healing spells by 6%.', 'Increases the effect of all healing spells by 8%.', 'Increases the effect of all healing spells by 10%.'],
                    x: 2,
                    y: 4,
                    r: [6, 1],
                    iconname: 'Spell_Nature_ProtectionformNature'
                }, {
                    i: 842,
                    n: 'Improved Tranquility',
                    maxRank: 2,
                    s: [17123, 17124],
                    d: ['Reduces threat caused by Tranquility by 50%.', 'Reduces threat caused by Tranquility by 100%.'],
                    x: 3,
                    y: 4,
                    iconname: 'Spell_Nature_Tranquility'
                }, {
                    i: 825,
                    n: 'Improved Regrowth',
                    maxRank: 5,
                    s: [17074, 17075, 17076, 17077, 17078],
                    d: ['Increases the critical effect chance of your Regrowth spell by 10%.', 'Increases the critical effect chance of your Regrowth spell by 20%.', 'Increases the critical effect chance of your Regrowth spell by 30%.', 'Increases the critical effect chance of your Regrowth spell by 40%.', 'Increases the critical effect chance of your Regrowth spell by 50%.'],
                    x: 2,
                    y: 5,
                    iconname: 'Spell_Nature_ResistNature'
                }, {
                    i: 844,
                    n: 'Swiftmend',
                    maxRank: 1,
                    s: [18562],
                    d: ['Consumes a Rejuvenation or Regrowth effect on a friendly target to instantly heal them an amount equal to 12 sec. of Rejuvenation or 18 sec. of Regrowth.'],
                    x: 1,
                    y: 6,
                    r: [8, 5],
                    iconname: 'INV_Relics_IdolofRejuvenation'
                }]
            }]
        },
        {
            name: 'hunter',
            tree_talents:[{
                n: 'Beast Mastery',
                t: [{
                    i: 1382,
                    n: 'Improved Aspect of the Hawk',
                    maxRank: 5,
                    s: [19552, 19553, 19554, 19555, 19556],
                    d: ['While Aspect of the Hawk is active, all normal ranged attacks have a 1% chance of increasing ranged attack speed by 30% for 12 sec.', 'While Aspect of the Hawk is active, all normal ranged attacks have a 2% chance of increasing ranged attack speed by 30% for 12 sec.', 'While Aspect of the Hawk is active, all normal ranged attacks have a 3% chance of increasing ranged attack speed by 30% for 12 sec.', 'While Aspect of the Hawk is active, all normal ranged attacks have a 4% chance of increasing ranged attack speed by 30% for 12 sec.', 'While Aspect of the Hawk is active, all normal ranged attacks have a 5% chance of increasing ranged attack speed by 30% for 12 sec.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Nature_RavenForm'
                }, {
                    i: 1389,
                    n: 'Endurance Training',
                    maxRank: 5,
                    s: [19583, 19584, 19585, 19586, 19587],
                    d: ['Increases the Health of your pets by 3%.', 'Increases the Health of your pets by 6%.', 'Increases the Health of your pets by 9%.', 'Increases the Health of your pets by 12%.', 'Increases the Health of your pets by 15%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Nature_Reincarnation'
                }, {
                    i: 1624,
                    n: 'Improved Eyes of the Beast',
                    maxRank: 2,
                    s: [19557, 19558],
                    d: ['Increases the duration of your Eyes of the Beast by 30 sec.', 'Increases the duration of your Eyes of the Beast by 60 sec.'],
                    x: 0,
                    y: 1,
                    iconname: 'Ability_EyeOfTheOwl'
                }, {
                    i: 1381,
                    n: 'Improved Aspect of the Monkey',
                    maxRank: 5,
                    s: [19549, 19550, 19551, 24386, 24387],
                    d: ['Increases the Dodge bonus of your Aspect of the Monkey by 1%.', 'Increases the Dodge bonus of your Aspect of the Monkey by 2%.', 'Increases the Dodge bonus of your Aspect of the Monkey by 3%.', 'Increases the Dodge bonus of your Aspect of the Monkey by 4%.', 'Increases the Dodge bonus of your Aspect of the Monkey by 5%.'],
                    x: 1,
                    y: 1,
                    iconname: 'Ability_Hunter_AspectOfTheMonkey'
                }, {
                    i: 1395,
                    n: 'Thick Hide',
                    maxRank: 3,
                    s: [19609, 19610, 19612],
                    d: ['Increases the Armor rating of your pets by 10%.', 'Increases the Armor rating of your pets by 20%.', 'Increases the Armor rating of your pets by 30%.'],
                    x: 2,
                    y: 1,
                    iconname: 'INV_Misc_Pelt_Bear_03'
                }, {
                    i: 1625,
                    n: 'Improved Revive Pet',
                    maxRank: 2,
                    s: [24443, 19575],
                    d: ["Revive Pet's casting time is reduced by 3 sec, mana cost is reduced by 20%, and increases the health your pet returns with by an additional 15%.", "Revive Pet's casting time is reduced by 6 sec, mana cost is reduced by 40%, and increases the health your pet returns with by an additional 30%."],
                    x: 3,
                    y: 1,
                    iconname: 'Ability_Hunter_BeastSoothe'
                }, {
                    i: 1384,
                    n: 'Pathfinding',
                    maxRank: 2,
                    s: [19559, 19560],
                    d: ['Increases the speed bonus of your Aspect of the Cheetah and Aspect of the Pack by 3%.', 'Increases the speed bonus of your Aspect of the Cheetah and Aspect of the Pack by 6%.'],
                    x: 0,
                    y: 2,
                    iconname: 'Ability_Mount_JungleTiger'
                }, {
                    i: 1391,
                    n: 'Bestial Swiftness',
                    maxRank: 1,
                    s: [19596],
                    d: ['Increases the outdoor movement speed of your pets by 30%.'],
                    x: 1,
                    y: 2,
                    iconname: 'Ability_Druid_Dash'
                }, {
                    i: 1396,
                    n: 'Unleashed Fury',
                    maxRank: 5,
                    s: [19616, 19617, 19618, 19619, 19620],
                    d: ['Increases the damage done by your pets by 4%.', 'Increases the damage done by your pets by 8%.', 'Increases the damage done by your pets by 12%.', 'Increases the damage done by your pets by 16%.', 'Increases the damage done by your pets by 20%.'],
                    x: 2,
                    y: 2,
                    iconname: 'Ability_BullRush'
                }, {
                    i: 1385,
                    n: 'Improved Mend Pet',
                    maxRank: 2,
                    s: [19572, 19573],
                    d: ['Gives the Mend Pet spell a 15% chance of cleansing 1 Curse, Disease, Magic or Poison effect from the pet each tick.', 'Gives the Mend Pet spell a 50% chance of cleansing 1 Curse, Disease, Magic or Poison effect from the pet each tick.'],
                    x: 1,
                    y: 3,
                    iconname: 'Ability_Hunter_MendPet'
                }, {
                    i: 1393,
                    n: 'Ferocity',
                    maxRank: 5,
                    s: [19598, 19599, 19600, 19601, 19602],
                    d: ['Increases the critical strike chance of your pets by 3%.', 'Increases the critical strike chance of your pets by 6%.', 'Increases the critical strike chance of your pets by 9%.', 'Increases the critical strike chance of your pets by 12%.', 'Increases the critical strike chance of your pets by 15%.'],
                    x: 2,
                    y: 3,
                    iconname: 'INV_Misc_MonsterClaw_04'
                }, {
                    i: 1388,
                    n: 'Spirit Bond',
                    maxRank: 2,
                    s: [19578, 20895],
                    d: ['While your pet is active, you and your pet will regenerate 1% of total health every 10 sec.', 'While your pet is active, you and your pet will regenerate 2% of total health every 10 sec.'],
                    x: 0,
                    y: 4,
                    iconname: 'Ability_Druid_DemoralizingRoar'
                }, {
                    i: 1387,
                    n: 'Intimidation',
                    maxRank: 1,
                    s: [19577],
                    d: ['Command your pet to intimidate the target on the next successful melee attack, causing a high amount of threat and stunning the target for 3 sec.'],
                    x: 1,
                    y: 4,
                    iconname: 'Ability_Devour'
                }, {
                    i: 1390,
                    n: 'Bestial Discipline',
                    maxRank: 2,
                    s: [19590, 19592],
                    d: ['Increases the Focus regeneration of your pets by 10%.', 'Increases the Focus regeneration of your pets by 20%.'],
                    x: 3,
                    y: 4,
                    iconname: 'Spell_Nature_AbolishMagic'
                }, {
                    i: 1397,
                    n: 'Frenzy',
                    maxRank: 5,
                    s: [19621, 19622, 19623, 19624, 19625],
                    d: ['Gives your pet a 20% chance to gain a 30% attack speed increase for 8 sec after dealing a critical strike.', 'Gives your pet a 40% chance to gain a 30% attack speed increase for 8 sec after dealing a critical strike.', 'Gives your pet a 60% chance to gain a 30% attack speed increase for 8 sec after dealing a critical strike.', 'Gives your pet a 80% chance to gain a 30% attack speed increase for 8 sec after dealing a critical strike.', 'Gives your pet a 100% chance to gain a 30% attack speed increase for 8 sec after dealing a critical strike.'],
                    x: 2,
                    y: 5,
                    r: [10, 5],
                    iconname: 'INV_Misc_MonsterClaw_03'
                }, {
                    i: 1386,
                    n: 'Bestial Wrath',
                    maxRank: 1,
                    s: [19574],
                    d: ['Send your pet into a rage causing 50% additional damage for 18 sec.  While enraged, the beast does not feel pity or remorse or fear and it cannot be stopped unless killed.'],
                    x: 1,
                    y: 6,
                    r: [12, 1],
                    iconname: 'Ability_Druid_FerociousBite'
                }]
            }, {
                n: 'Marksmanship',
                t: [{
                    i: 1341,
                    n: 'Improved Concussive Shot',
                    maxRank: 5,
                    s: [19407, 19412, 19413, 19414, 19415],
                    d: ['Gives your Concussive Shot a 4% chance to stun the target for 3 sec.', 'Gives your Concussive Shot a 8% chance to stun the target for 3 sec.', 'Gives your Concussive Shot a 12% chance to stun the target for 3 sec.', 'Gives your Concussive Shot a 16% chance to stun the target for 3 sec.', 'Gives your Concussive Shot a 20% chance to stun the target for 3 sec.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Frost_Stun'
                }, {
                    i: 1342,
                    n: 'Efficiency',
                    maxRank: 5,
                    s: [19416, 19417, 19418, 19419, 19420],
                    d: ['Reduces the Mana cost of your Shots and Stings by 2%.', 'Reduces the Mana cost of your Shots and Stings by 4%.', 'Reduces the Mana cost of your Shots and Stings by 6%.', 'Reduces the Mana cost of your Shots and Stings by 8%.', 'Reduces the Mana cost of your Shots and Stings by 10%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Frost_WizardMark'
                }, {
                    i: 1343,
                    n: "Improved Hunter's Mark",
                    maxRank: 5,
                    s: [19421, 19422, 19423, 19424, 19425],
                    d: ["Increases the Ranged Attack Power bonus of your Hunter's Mark spell by 3%.", "Increases the Ranged Attack Power bonus of your Hunter's Mark spell by 6%.", "Increases the Ranged Attack Power bonus of your Hunter's Mark spell by 9%.", "Increases the Ranged Attack Power bonus of your Hunter's Mark spell by 12%.", "Increases the Ranged Attack Power bonus of your Hunter's Mark spell by 15%."],
                    x: 1,
                    y: 1,
                    iconname: 'Ability_Hunter_SniperShot'
                }, {
                    i: 1344,
                    n: 'Lethal Shots',
                    maxRank: 5,
                    s: [19426, 19427, 19429, 19430, 19431],
                    d: ['Increases your critical strike chance with ranged weapons by 1%.', 'Increases your critical strike chance with ranged weapons by 2%.', 'Increases your critical strike chance with ranged weapons by 3%.', 'Increases your critical strike chance with ranged weapons by 4%.', 'Increases your critical strike chance with ranged weapons by 5%.'],
                    x: 2,
                    y: 1,
                    iconname: 'Ability_SearingArrow'
                }, {
                    i: 1345,
                    n: 'Aimed Shot',
                    maxRank: 1,
                    s: [19434],
                    d: ['An aimed shot that increases ranged damage by 70.'],
                    x: 0,
                    y: 2,
                    iconname: 'INV_Spear_07'
                }, {
                    i: 1346,
                    n: 'Improved Arcane Shot',
                    maxRank: 5,
                    s: [19454, 19455, 19456, 19457, 19458],
                    d: ['Reduces the cooldown of your Arcane Shot by 0.2 sec.', 'Reduces the cooldown of your Arcane Shot by 0.4 sec.', 'Reduces the cooldown of your Arcane Shot by 0.6 sec.', 'Reduces the cooldown of your Arcane Shot by 0.8 sec.', 'Reduces the cooldown of your Arcane Shot by 1 sec.'],
                    x: 1,
                    y: 2,
                    iconname: 'Ability_ImpalingBolt'
                }, {
                    i: 1352,
                    n: 'Hawk Eye',
                    maxRank: 3,
                    s: [19498, 19499, 19500],
                    d: ['Increases the range of your ranged weapons by 2 yards.', 'Increases the range of your ranged weapons by 4 yards.', 'Increases the range of your ranged weapons by 6 yards.'],
                    x: 3,
                    y: 2,
                    iconname: 'Ability_TownWatch'
                }, {
                    i: 1348,
                    n: 'Improved Serpent Sting',
                    maxRank: 5,
                    s: [19464, 19465, 19466, 19467, 19468],
                    d: ['Increases the damage done by your Serpent Sting by 2%.', 'Increases the damage done by your Serpent Sting by 4%.', 'Increases the damage done by your Serpent Sting by 6%.', 'Increases the damage done by your Serpent Sting by 8%.', 'Increases the damage done by your Serpent Sting by 10%.'],
                    x: 1,
                    y: 3,
                    iconname: 'Ability_Hunter_Quickshot'
                }, {
                    i: 1349,
                    n: 'Mortal Shots',
                    maxRank: 5,
                    s: [19485, 19487, 19488, 19489, 19490],
                    d: ['Increases your ranged weapon critical strike damage bonus by 6%.', 'Increases your ranged weapon critical strike damage bonus by 12%.', 'Increases your ranged weapon critical strike damage bonus by 18%.', 'Increases your ranged weapon critical strike damage bonus by 24%.', 'Increases your ranged weapon critical strike damage bonus by 30%.'],
                    x: 2,
                    y: 3,
                    r: [3, 5],
                    iconname: 'Ability_PierceDamage'
                }, {
                    i: 1353,
                    n: 'Scatter Shot',
                    maxRank: 1,
                    s: [19503],
                    d: ['A short-range shot that deals 50% weapon damage and disorients the target for 4 sec.  Any damage caused will remove the effect.  Turns off your attack when used.'],
                    x: 0,
                    y: 4,
                    iconname: 'Ability_GolemStormBolt'
                }, {
                    i: 1347,
                    n: 'Barrage',
                    maxRank: 3,
                    s: [19461, 19462, 24691],
                    d: ['Increases the damage done by your Multi-Shot and Volley spells by 5%.', 'Increases the damage done by your Multi-Shot and Volley spells by 10%.', 'Increases the damage done by your Multi-Shot and Volley spells by 15%.'],
                    x: 1,
                    y: 4,
                    iconname: 'Ability_UpgradeMoonGlaive'
                }, {
                    i: 1351,
                    n: 'Improved Scorpid Sting',
                    maxRank: 3,
                    s: [19491, 19493, 19494],
                    d: ['Reduces the Stamina of targets affected by your Scorpid Sting by 10% of the amount of Strength reduced.', 'Reduces the Stamina of targets affected by your Scorpid Sting by 20% of the amount of Strength reduced.', 'Reduces the Stamina of targets affected by your Scorpid Sting by 30% of the amount of Strength reduced.'],
                    x: 2,
                    y: 4,
                    iconname: 'Ability_Hunter_CriticalShot'
                }, {
                    i: 1362,
                    n: 'Ranged Weapon Specialization',
                    maxRank: 5,
                    s: [19507, 19508, 19509, 19510, 19511],
                    d: ['Increases the damage you deal with ranged weapons by 1%.', 'Increases the damage you deal with ranged weapons by 2%.', 'Increases the damage you deal with ranged weapons by 3%.', 'Increases the damage you deal with ranged weapons by 4%.', 'Increases the damage you deal with ranged weapons by 5%.'],
                    x: 2,
                    y: 5,
                    iconname: 'INV_Weapon_Rifle_06'
                }, {
                    i: 1361,
                    n: 'Trueshot Aura',
                    maxRank: 1,
                    s: [19506],
                    d: ['Increases the attack power of party members within 45 yards by 50.  Lasts 30 min.'],
                    x: 1,
                    y: 6,
                    r: [10, 3],
                    iconname: 'Ability_TrueShot'
                }]
            }, {
                n: 'Survival',
                t: [{
                    i: 1623,
                    n: 'Monster Slaying',
                    maxRank: 3,
                    s: [24293, 24294, 24295],
                    d: ['Increases all damage caused against Beasts, Giants and Dragonkin targets by 1% and increases critical damage caused against Beasts, Giants and Dragonkin targets by an additional 1%.', 'Increases all damage caused against Beasts, Giants and Dragonkin targets by 2% and increases critical damage caused against Beasts, Giants and Dragonkin targets by an additional 2%.', 'Increases all damage caused against Beasts, Giants and Dragonkin targets by 3% and increases critical damage caused against Beasts, Giants and Dragonkin targets by an additional 3%.'],
                    x: 0,
                    y: 0,
                    iconname: 'INV_Misc_Head_Dragon_Black'
                }, {
                    i: 1301,
                    n: 'Humanoid Slaying',
                    maxRank: 3,
                    s: [19151, 19152, 19153],
                    d: ['Increases all damage caused against Humanoid targets by 1% and increases critical damage caused against Humanoid targets by an additional 1%.', 'Increases all damage caused against Humanoid targets by 2% and increases critical damage caused against Humanoid targets by an additional 2%.', 'Increases all damage caused against Humanoid targets by 3% and increases critical damage caused against Humanoid targets by an additional 3%.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Holy_PrayerOfHealing'
                }, {
                    i: 1311,
                    n: 'Deflection',
                    maxRank: 5,
                    s: [19295, 19297, 19298, 19301, 19300],
                    d: ['Increases your Parry chance by 1%.', 'Increases your Parry chance by 2%.', 'Increases your Parry chance by 3%.', 'Increases your Parry chance by 4%.', 'Increases your Parry chance by 5%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Ability_Parry'
                }, {
                    i: 1304,
                    n: 'Entrapment',
                    maxRank: 5,
                    s: [19184, 19387, 19388, 19389, 19390],
                    d: ['Gives your Immolation Trap, Frost Trap, and Explosive Trap a 5% chance to entrap the target, preventing them from moving for 5 sec.', 'Gives your Immolation Trap, Frost Trap, and Explosive Trap a 10% chance to entrap the target, preventing them from moving for 5 sec.', 'Gives your Immolation Trap, Frost Trap, and Explosive Trap a 15% chance to entrap the target, preventing them from moving for 5 sec.', 'Gives your Immolation Trap, Frost Trap, and Explosive Trap a 20% chance to entrap the target, preventing them from moving for 5 sec.', 'Gives your Immolation Trap, Frost Trap, and Explosive Trap a 25% chance to entrap the target, preventing them from moving for 5 sec.'],
                    x: 0,
                    y: 1,
                    iconname: 'Spell_Nature_StrangleVines'
                }, {
                    i: 1621,
                    n: 'Savage Strikes',
                    maxRank: 2,
                    s: [19159, 19160],
                    d: ['Increases the critical strike chance of Raptor Strike and Mongoose Bite by 10%.', 'Increases the critical strike chance of Raptor Strike and Mongoose Bite by 20%.'],
                    x: 1,
                    y: 1,
                    iconname: 'Ability_Racial_BloodRage'
                }, {
                    i: 1305,
                    n: 'Improved Wing Clip',
                    maxRank: 5,
                    s: [19228, 19232, 19233, 19234, 19235],
                    d: ['Gives your Wing Clip ability a 4% chance to immobilize the target for 5 sec.', 'Gives your Wing Clip ability a 8% chance to immobilize the target for 5 sec.', 'Gives your Wing Clip ability a 12% chance to immobilize the target for 5 sec.', 'Gives your Wing Clip ability a 16% chance to immobilize the target for 5 sec.', 'Gives your Wing Clip ability a 20% chance to immobilize the target for 5 sec.'],
                    x: 2,
                    y: 1,
                    iconname: 'Ability_Rogue_Trip'
                }, {
                    i: 1306,
                    n: 'Clever Traps',
                    maxRank: 2,
                    s: [19239, 19245],
                    d: ['Increases the duration of Freezing and Frost trap effects by 15% and the damage of Immolation and Explosive trap effects by 15%.', 'Increases the duration of Freezing and Frost trap effects by 30% and the damage of Immolation and Explosive trap effects by 30%.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Nature_TimeStop'
                }, {
                    i: 1622,
                    n: 'Survivalist',
                    maxRank: 5,
                    s: [19255, 19256, 19257, 19258, 19259],
                    d: ['Increases total health by 2%.', 'Increases total health by 4%.', 'Increases total health by 6%.', 'Increases total health by 8%.', 'Increases total health by 10%.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Shadow_Twilight'
                }, {
                    i: 1308,
                    n: 'Deterrence',
                    maxRank: 1,
                    s: [19263],
                    d: ['When activated, increases your Dodge and Parry chance by 25% for 10 sec.'],
                    x: 2,
                    y: 2,
                    iconname: 'Ability_Whirlwind'
                }, {
                    i: 1322,
                    n: 'Trap Mastery',
                    maxRank: 2,
                    s: [19376, 19377],
                    d: ['Decreases the chance enemies will resist trap effects by 5%.', 'Decreases the chance enemies will resist trap effects by 10%.'],
                    x: 0,
                    y: 3,
                    iconname: 'Ability_Ensnare'
                }, {
                    i: 1310,
                    n: 'Surefooted',
                    maxRank: 3,
                    s: [19290, 19294, 24283],
                    d: ['Increases hit chance by 1% and increases the chance movement impairing effects will be resisted by an additional 5%.', 'Increases hit chance by 2% and increases the chance movement impairing effects will be resisted by an additional 10%.', 'Increases hit chance by 3% and increases the chance movement impairing effects will be resisted by an additional 15%.'],
                    x: 1,
                    y: 3,
                    iconname: 'Ability_Kick'
                }, {
                    i: 1309,
                    n: 'Improved Feign Death',
                    maxRank: 2,
                    s: [19286, 19287],
                    d: ['Reduces the chance your Feign Death ability will be resisted by 2%.', 'Reduces the chance your Feign Death ability will be resisted by 4%.'],
                    x: 3,
                    y: 3,
                    iconname: 'Ability_Rogue_FeignDeath'
                }, {
                    i: 1321,
                    n: 'Killer Instinct',
                    maxRank: 3,
                    s: [19370, 19371, 19373],
                    d: ['Increases your critical strike chance with all attacks by 1%.', 'Increases your critical strike chance with all attacks by 2%.', 'Increases your critical strike chance with all attacks by 3%.'],
                    x: 1,
                    y: 4,
                    iconname: 'Spell_Holy_BlessingOfStamina'
                }, {
                    i: 1312,
                    n: 'Counterattack',
                    maxRank: 1,
                    s: [19306],
                    d: ["A strike that becomes active after parrying an opponent's attack.  This attack deals 40 damage and immobilizes the target for 5 sec.  Counterattack cannot be blocked, dodged, or parried."],
                    x: 2,
                    y: 4,
                    r: [8, 1],
                    iconname: 'Ability_Warrior_Challange'
                }, {
                    i: 1303,
                    n: 'Lightning Reflexes',
                    maxRank: 5,
                    s: [19168, 19180, 19181, 24296, 24297],
                    d: ['Increases your Agility by 3%.', 'Increases your Agility by 6%.', 'Increases your Agility by 9%.', 'Increases your Agility by 12%.', 'Increases your Agility by 15%.'],
                    x: 2,
                    y: 5,
                    iconname: 'Spell_Nature_Invisibilty'
                }, {
                    i: 1325,
                    n: 'Wyvern Sting',
                    maxRank: 1,
                    s: [19386],
                    d: ['A stinging shot that puts the target to sleep for 12 sec.  Any damage will cancel the effect.  When the target wakes up, the Sting causes 0 Nature damage over 12 sec.  Only usable out of combat.  Only one Sting per Hunter can be active on the target at a time.'],
                    x: 1,
                    y: 6,
                    r: [12, 3],
                    iconname: 'INV_Spear_02'
                }]
            }]
        },
        {
            name: 'paladin',
            tree_talents: [{
                n: 'Holy',
                t: [{
                    i: 1450,
                    n: 'Divine Strength',
                    maxRank: 5,
                    s: [20262, 20263, 20264, 20265, 20266],
                    d: ['Increases your Strength by 2%.', 'Increases your Strength by 4%.', 'Increases your Strength by 6%.', 'Increases your Strength by 8%.', 'Increases your Strength by 10%.'],
                    x: 1,
                    y: 0,
                    iconname: 'Ability_GolemThunderClap'
                }, {
                    i: 1449,
                    n: 'Divine Intellect',
                    maxRank: 5,
                    s: [20257, 20258, 20259, 20260, 20261],
                    d: ['Increases your total Intellect by 2%.', 'Increases your total Intellect by 4%.', 'Increases your total Intellect by 6%.', 'Increases your total Intellect by 8%.', 'Increases your total Intellect by 10%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Nature_Sleep'
                }, {
                    i: 1432,
                    n: 'Spiritual Focus',
                    maxRank: 5,
                    s: [20205, 20206, 20207, 20209, 20208],
                    d: ['Gives your Flash of Light and Holy Light spells a 14% chance to not lose casting time when you take damage.', 'Gives your Flash of Light and Holy Light spells a 28% chance to not lose casting time when you take damage.', 'Gives your Flash of Light and Holy Light spells a 42% chance to not lose casting time when you take damage.', 'Gives your Flash of Light and Holy Light spells a 56% chance to not lose casting time when you take damage.', 'Gives your Flash of Light and Holy Light spells a 70% chance to not lose casting time when you take damage.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Arcane_Blink'
                }, {
                    i: 1463,
                    n: 'Improved Seal of Righteousness',
                    maxRank: 5,
                    s: [20224, 20225, 20330, 20331, 20332],
                    d: ['Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 3%.', 'Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 6%.', 'Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 9%.', 'Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 12%.', 'Increases the damage done by your Seal of Righteousness and Judgement of Righteousness by 15%.'],
                    x: 2,
                    y: 1,
                    iconname: 'Ability_ThunderBolt'
                }, {
                    i: 1444,
                    n: 'Healing Light',
                    maxRank: 3,
                    s: [20237, 20238, 20239],
                    d: ['Increases the amount healed by your Holy Light and Flash of Light spells by 4%.', 'Increases the amount healed by your Holy Light and Flash of Light spells by 8%.', 'Increases the amount healed by your Holy Light and Flash of Light spells by 12%.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Holy_HolyBolt'
                }, {
                    i: 1435,
                    n: 'Consecration',
                    maxRank: 1,
                    s: [26573],
                    d: ['Consecrates the land beneath Paladin, doing 64 Holy damage over 8 sec to enemies who enter the area.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Holy_InnerFire'
                }, {
                    i: 1443,
                    n: 'Improved Lay on Hands',
                    maxRank: 2,
                    s: [20234, 20235],
                    d: ['Gives the target of your Lay on Hands spell a 15% bonus to their armor value from items for 2 min.  In addition, the cooldown for your Lay on Hands spell is reduced by 10 min.', 'Gives the target of your Lay on Hands spell a 30% bonus to their armor value from items for 2 min.  In addition, the cooldown for your Lay on Hands spell is reduced by 20 min.'],
                    x: 2,
                    y: 2,
                    iconname: 'Spell_Holy_LayOnHands'
                }, {
                    i: 1628,
                    n: 'Unyielding Faith',
                    maxRank: 2,
                    s: [9453, 25836],
                    d: ['Increases your chance to resist Fear and Disorient effects by an additional 5%.', 'Increases your chance to resist Fear and Disorient effects by an additional 10%.'],
                    x: 3,
                    y: 2,
                    iconname: 'Spell_Holy_UnyieldingFaith'
                }, {
                    i: 1461,
                    n: 'Illumination',
                    maxRank: 5,
                    s: [20210, 20212, 20213, 20214, 20215],
                    d: ['After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 20% chance to gain Mana equal to the base cost of the spell.', 'After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 40% chance to gain Mana equal to the base cost of the spell.', 'After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 60% chance to gain Mana equal to the base cost of the spell.', 'After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 80% chance to gain Mana equal to the base cost of the spell.', 'After getting a critical effect from your Flash of Light, Holy Light, or Holy Shock heal spell, gives you a 100% chance to gain Mana equal to the base cost of the spell.'],
                    x: 1,
                    y: 3,
                    iconname: 'Spell_Holy_GreaterHeal'
                }, {
                    i: 1446,
                    n: 'Improved Blessing of Wisdom',
                    maxRank: 2,
                    s: [20244, 20245],
                    d: ['Increases the effect of your Blessing of Wisdom spell by 10%.', 'Increases the effect of your Blessing of Wisdom spell by 20%.'],
                    x: 2,
                    y: 3,
                    iconname: 'Spell_Holy_SealOfWisdom'
                }, {
                    i: 1433,
                    n: 'Divine Favor',
                    maxRank: 1,
                    s: [20216],
                    d: ['When activated, gives your next Flash of Light, Holy Light, or Holy Shock spell a 100% critical effect chance.'],
                    x: 1,
                    y: 4,
                    r: [8, 5],
                    iconname: 'Spell_Holy_Heal'
                }, {
                    i: 1465,
                    n: 'Lasting Judgement',
                    maxRank: 3,
                    s: [20359, 20360, 20361],
                    d: ['Increases the duration of your Judgement of Light and Judgement of Wisdom by 10 sec.', 'Increases the duration of your Judgement of Light and Judgement of Wisdom by 20 sec.', 'Increases the duration of your Judgement of Light and Judgement of Wisdom by 30 sec.'],
                    x: 2,
                    y: 4,
                    iconname: 'Spell_Holy_HealingAura'
                }, {
                    i: 1627,
                    n: 'Holy Power',
                    maxRank: 5,
                    s: [5923, 5924, 5925, 5926, 25829],
                    d: ['Increases the critical effect chance of your Holy spells by 1%.', 'Increases the critical effect chance of your Holy spells by 2%.', 'Increases the critical effect chance of your Holy spells by 3%.', 'Increases the critical effect chance of your Holy spells by 4%.', 'Increases the critical effect chance of your Holy spells by 5%.'],
                    x: 2,
                    y: 5,
                    iconname: 'Spell_Holy_Power'
                }, {
                    i: 1502,
                    n: 'Holy Shock',
                    maxRank: 1,
                    s: [20473],
                    d: ['Blasts the target with Holy energy, causing 204 to 221 Holy damage to an enemy, or 204 to 221 healing to an ally.'],
                    x: 1,
                    y: 6,
                    r: [10, 1],
                    iconname: 'Spell_Holy_SearingLight'
                }]
            }, {
                n: 'Protection',
                t: [{
                    i: 1422,
                    n: 'Improved Devotion Aura',
                    maxRank: 5,
                    s: [20138, 20139, 20140, 20141, 20142],
                    d: ['Increases the armor bonus of your Devotion Aura by 5%.', 'Increases the armor bonus of your Devotion Aura by 10%.', 'Increases the armor bonus of your Devotion Aura by 15%.', 'Increases the armor bonus of your Devotion Aura by 20%.', 'Increases the armor bonus of your Devotion Aura by 25%.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Holy_DevotionAura'
                }, {
                    i: 1421,
                    n: 'Redoubt',
                    maxRank: 5,
                    s: [20127, 20130, 20135, 20136, 20137],
                    d: ['Increases your chance to block attacks with your shield by 6% after being the victim of a critical strike.  Lasts 10 sec or 5 blocks.', 'Increases your chance to block attacks with your shield by 12% after being the victim of a critical strike.  Lasts 10 sec or 5 blocks.', 'Increases your chance to block attacks with your shield by 18% after being the victim of a critical strike.  Lasts 10 sec or 5 blocks.', 'Increases your chance to block attacks with your shield by 24% after being the victim of a critical strike.  Lasts 10 sec or 5 blocks.', 'Increases your chance to block attacks with your shield by 30% after being the victim of a critical strike.  Lasts 10 sec or 5 blocks.'],
                    x: 2,
                    y: 0,
                    iconname: 'Ability_Defend'
                }, {
                    i: 1630,
                    n: 'Precision',
                    maxRank: 3,
                    s: [20189, 20192, 20193],
                    d: ['Increases your chance to hit with melee weapons by 1%.', 'Increases your chance to hit with melee weapons by 2%.', 'Increases your chance to hit with melee weapons by 3%.'],
                    x: 0,
                    y: 1,
                    iconname: 'Ability_Rogue_Ambush'
                }, {
                    i: 1425,
                    n: "Guardian's Favor",
                    maxRank: 2,
                    s: [20174, 20175],
                    d: ['Reduces the cooldown of your Blessing of Protection by 60 sec and increases the duration of your Blessing of Freedom by 3 sec.', 'Reduces the cooldown of your Blessing of Protection by 120 sec and increases the duration of your Blessing of Freedom by 6 sec.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Holy_SealOfProtection'
                }, {
                    i: 1423,
                    n: 'Toughness',
                    maxRank: 5,
                    s: [20143, 20144, 20145, 20146, 20147],
                    d: ['Increases your armor value from items by 2%.', 'Increases your armor value from items by 4%.', 'Increases your armor value from items by 6%.', 'Increases your armor value from items by 8%.', 'Increases your armor value from items by 10%.'],
                    x: 3,
                    y: 1,
                    iconname: 'Spell_Holy_Devotion'
                }, {
                    i: 1442,
                    n: 'Blessing of Kings',
                    maxRank: 1,
                    s: [20217],
                    d: ['Places a Blessing on the friendly target, increasing total stats by 10% for 5 min.  Players may only have one Blessing on them per Paladin at any one time.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Magic_MageArmor'
                }, {
                    i: 1501,
                    n: 'Improved Righteous Fury',
                    maxRank: 3,
                    s: [20468, 20469, 20470],
                    d: ['Increases the amount of threat generated by your Righteous Fury spell by 16%.', 'Increases the amount of threat generated by your Righteous Fury spell by 33%.', 'Increases the amount of threat generated by your Righteous Fury spell by 50%.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Holy_SealOfFury'
                }, {
                    i: 1424,
                    n: 'Shield Specialization',
                    maxRank: 3,
                    s: [20148, 20149, 20150],
                    d: ['Increases the amount of damage absorbed by your shield by 10%.', 'Increases the amount of damage absorbed by your shield by 20%.', 'Increases the amount of damage absorbed by your shield by 30%.'],
                    x: 2,
                    y: 2,
                    r: [1, 5],
                    iconname: 'INV_Shield_06'
                }, {
                    i: 1629,
                    n: 'Anticipation',
                    maxRank: 5,
                    s: [20096, 20097, 20098, 20099, 20100],
                    d: ['Increases your Defense skill by 2.', 'Increases your Defense skill by 4.', 'Increases your Defense skill by 6.', 'Increases your Defense skill by 8.', 'Increases your Defense skill by 10.'],
                    x: 3,
                    y: 2,
                    iconname: 'Spell_Magic_LesserInvisibilty'
                }, {
                    i: 1521,
                    n: 'Improved Hammer of Justice',
                    maxRank: 3,
                    s: [20487, 20488, 20489],
                    d: ['Decreases the cooldown of your Hammer of Justice spell by 5 sec.', 'Decreases the cooldown of your Hammer of Justice spell by 10 sec.', 'Decreases the cooldown of your Hammer of Justice spell by 15 sec.'],
                    x: 1,
                    y: 3,
                    iconname: 'Spell_Holy_SealOfMight'
                }, {
                    i: 1626,
                    n: 'Improved Concentration Aura',
                    maxRank: 3,
                    s: [20254, 20255, 20256],
                    d: ['Increases the effect of your Concentration Aura by an additional 5% and gives all group members affected by the aura an additional 5% chance to resist Silence and Interrupt effects.', 'Increases the effect of your Concentration Aura by an additional 10% and gives all group members affected by the aura an additional 10% chance to resist Silence and Interrupt effects.', 'Increases the effect of your Concentration Aura by an additional 15% and gives all group members affected by the aura an additional 15% chance to resist Silence and Interrupt effects.'],
                    x: 2,
                    y: 3,
                    iconname: 'Spell_Holy_MindSooth'
                }, {
                    i: 1431,
                    n: 'Blessing of Sanctuary',
                    maxRank: 1,
                    s: [20911],
                    d: ['Places a Blessing on the friendly target, reducing damage dealt from all sources by up to 10 for 5 min.  In addition, when the target blocks a melee attack the attacker will take 14 Holy damage.  Players may only have one Blessing on them per Paladin at any one time.'],
                    x: 1,
                    y: 4,
                    iconname: 'Spell_Nature_LightningShield'
                }, {
                    i: 1426,
                    n: 'Reckoning',
                    maxRank: 5,
                    s: [20177, 20179, 20181, 20180, 20182],
                    d: ['Gives you a 20% chance to gain an extra attack after being the victim of a critical strike.', 'Gives you a 40% chance to gain an extra attack after being the victim of a critical strike.', 'Gives you a 60% chance to gain an extra attack after being the victim of a critical strike.', 'Gives you a 80% chance to gain an extra attack after being the victim of a critical strike.', 'Gives you a 100% chance to gain an extra attack after being the victim of a critical strike.'],
                    x: 2,
                    y: 4,
                    iconname: 'Spell_Holy_BlessingOfStrength'
                }, {
                    i: 1429,
                    n: 'One-Handed Weapon Specialization',
                    maxRank: 5,
                    s: [20196, 20197, 20198, 20199, 20200],
                    d: ['Increases the damage you deal with one-handed melee weapons by 2%.', 'Increases the damage you deal with one-handed melee weapons by 4%.', 'Increases the damage you deal with one-handed melee weapons by 6%.', 'Increases the damage you deal with one-handed melee weapons by 8%.', 'Increases the damage you deal with one-handed melee weapons by 10%.'],
                    x: 2,
                    y: 5,
                    iconname: 'INV_Sword_20'
                }, {
                    i: 1430,
                    n: 'Holy Shield',
                    maxRank: 1,
                    s: [20925],
                    d: ['Increases chance to block by 30% for 10 sec, and deals 65 Holy damage for each attack blocked while active.  Damage caused by Holy Shield causes 20% additional threat.  Each block expends a charge.  4 charges.'],
                    x: 1,
                    y: 6,
                    r: [11, 1],
                    iconname: 'Spell_Holy_BlessingOfProtection'
                }]
            }, {
                n: 'Retribution',
                t: [{
                    i: 1401,
                    n: 'Improved Blessing of Might',
                    maxRank: 5,
                    s: [20042, 20045, 20046, 20047, 20048],
                    d: ['Increases the melee attack power bonus of your Blessing of Might by 4%.', 'Increases the melee attack power bonus of your Blessing of Might by 8%.', 'Increases the melee attack power bonus of your Blessing of Might by 12%.', 'Increases the melee attack power bonus of your Blessing of Might by 16%.', 'Increases the melee attack power bonus of your Blessing of Might by 20%.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Holy_FistOfJustice'
                }, {
                    i: 1407,
                    n: 'Benediction',
                    maxRank: 5,
                    s: [20101, 20102, 20103, 20104, 20105],
                    d: ['Reduces the Mana cost of your Judgement and Seal spells by 3%.', 'Reduces the Mana cost of your Judgement and Seal spells by 6%.', 'Reduces the Mana cost of your Judgement and Seal spells by 9%.', 'Reduces the Mana cost of your Judgement and Seal spells by 12%.', 'Reduces the Mana cost of your Judgement and Seal spells by 15%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Frost_WindWalkOn'
                }, {
                    i: 1631,
                    n: 'Improved Judgement',
                    maxRank: 2,
                    s: [25956, 25957],
                    d: ['Decreases the cooldown of your Judgement spell by 1 sec.', 'Decreases the cooldown of your Judgement spell by 2 sec.'],
                    x: 0,
                    y: 1,
                    iconname: 'Spell_Holy_RighteousFury'
                }, {
                    i: 1464,
                    n: 'Improved Seal of the Crusader',
                    maxRank: 3,
                    s: [20335, 20336, 20337],
                    d: ['Increases the melee attack power bonus of your Seal of the Crusader and the Holy damage increase of your Judgement of the Crusader by 5%.', 'Increases the melee attack power bonus of your Seal of the Crusader and the Holy damage increase of your Judgement of the Crusader by 10%.', 'Increases the melee attack power bonus of your Seal of the Crusader and the Holy damage increase of your Judgement of the Crusader by 15%.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Holy_HolySmite'
                }, {
                    i: 1403,
                    n: 'Deflection',
                    maxRank: 5,
                    s: [20060, 20061, 20062, 20063, 20064],
                    d: ['Increases your Parry chance by 1%.', 'Increases your Parry chance by 2%.', 'Increases your Parry chance by 3%.', 'Increases your Parry chance by 4%.', 'Increases your Parry chance by 5%.'],
                    x: 2,
                    y: 1,
                    iconname: 'Ability_Parry'
                }, {
                    i: 1633,
                    n: 'Vindication',
                    maxRank: 3,
                    s: [9452, 26016, 26021],
                    d: ["Gives the Paladin's damaging melee attacks a chance to reduce the target\"s Strength and Agility by 5% for 10 sec.", 'Gives the Paladin's damaging melee attacks a chance to reduce the target\"s Strength and Agility by 10% for 10 sec.", 'Gives the Paladin's damaging melee attacks a chance to reduce the target\"s Strength and Agility by 15% for 10 sec.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Holy_Vindication'
                }, {
                    i: 1411,
                    n: 'Conviction',
                    maxRank: 5,
                    s: [20117, 20118, 20119, 20120, 20121],
                    d: ['Increases your chance to get a critical strike with melee weapons by 1%.', 'Increases your chance to get a critical strike with melee weapons by 2%.', 'Increases your chance to get a critical strike with melee weapons by 3%.', 'Increases your chance to get a critical strike with melee weapons by 4%.', 'Increases your chance to get a critical strike with melee weapons by 5%.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Holy_RetributionAura'
                }, {
                    i: 1481,
                    n: 'Seal of Command',
                    maxRank: 1,
                    s: [20375],
                    d: ["Gives the Paladin a chance to deal additional Holy damage equal to 70% of normal weapon damage.  Only one Seal can be active on the Paladin at any one time.  Lasts 30 sec.<br /><br />Unleashing this Seal's energy will judge an enemy, instantly causing 46.5 to 55.5 Holy damage, 93 to 102 if the target is stunned or incapacitated."],
                    x: 2,
                    y: 2,
                    iconname: 'Ability_Warrior_InnerRage'
                }, {
                    i: 1634,
                    n: 'Pursuit of Justice',
                    maxRank: 2,
                    s: [26022, 26023],
                    d: ['Increases movement and mounted movement speed by 4%.  This does not stack with other movement speed increasing effects.', 'Increases movement and mounted movement speed by 8%.  This does not stack with other movement speed increasing effects.'],
                    x: 3,
                    y: 2,
                    iconname: 'Spell_Holy_PersuitofJustice'
                }, {
                    i: 1632,
                    n: 'Eye for an Eye',
                    maxRank: 2,
                    s: [9799, 25988],
                    d: ["All spell criticals against you cause 15% of the damage taken to the caster as well.  The damage caused by Eye for an Eye will not exceed 50% of the Paladin's total health.", "All spell criticals against you cause 30% of the damage taken to the caster as well.  The damage caused by Eye for an Eye will not exceed 50% of the Paladin's total health."],
                    x: 0,
                    y: 3,
                    iconname: 'Spell_Holy_EyeforanEye'
                }, {
                    i: 1405,
                    n: 'Improved Retribution Aura',
                    maxRank: 2,
                    s: [20091, 20092],
                    d: ['Increases the damage done by your Retribution Aura by 25%.', 'Increases the damage done by your Retribution Aura by 50%.'],
                    x: 2,
                    y: 3,
                    iconname: 'Spell_Holy_AuraOfLight'
                }, {
                    i: 1410,
                    n: 'Two-Handed Weapon Specialization',
                    maxRank: 3,
                    s: [20111, 20112, 20113],
                    d: ['Increases the damage you deal with two-handed melee weapons by 2%.', 'Increases the damage you deal with two-handed melee weapons by 4%.', 'Increases the damage you deal with two-handed melee weapons by 6%.'],
                    x: 0,
                    y: 4,
                    iconname: 'INV_Hammer_04'
                }, {
                    i: 1409,
                    n: 'Sanctity Aura',
                    maxRank: 1,
                    s: [20218],
                    d: ['Increases Holy damage done by party members within 30 yards by 10%.  Players may only have one Aura on them per Paladin at any one time.'],
                    x: 2,
                    y: 4,
                    iconname: 'Spell_Holy_MindVision'
                }, {
                    i: 1402,
                    n: 'Vengeance',
                    maxRank: 5,
                    s: [20049, 20056, 20057, 20058, 20059],
                    d: ['Gives you a 3% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.', 'Gives you a 6% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.', 'Gives you a 9% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.', 'Gives you a 12% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.', 'Gives you a 15% bonus to Physical and Holy damage you deal for 8 sec after dealing a critical strike from a weapon swing, spell, or ability.'],
                    x: 1,
                    y: 5,
                    r: [6, 5],
                    iconname: 'Ability_Racial_Avatar'
                }, {
                    i: 1441,
                    n: 'Repentance',
                    maxRank: 1,
                    s: [20066],
                    d: ['Puts the enemy target in a state of meditation, incapacitating them for up to 6 sec.  Any damage caused will awaken the target.  Only works against Humanoids.'],
                    x: 1,
                    y: 6,
                    iconname: 'Spell_Holy_PrayerOfHealing'
                }]
            }]
        },
        {
            name: 'priest',
            tree_talents: [{
                n: 'Discipline',
                t: [{
                    i: 342,
                    n: 'Unbreakable Will',
                    maxRank: 5,
                    s: [14522, 14788, 14789, 14790, 14791],
                    d: ['Increases your chance to resist Stun, Fear, and Silence effects by an additional 3%.', 'Increases your chance to resist Stun, Fear, and Silence effects by an additional 6%.', 'Increases your chance to resist Stun, Fear, and Silence effects by an additional 9%.', 'Increases your chance to resist Stun, Fear, and Silence effects by an additional 12%.', 'Increases your chance to resist Stun, Fear, and Silence effects by an additional 15%.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Magic_MageArmor'
                }, {
                    i: 345,
                    n: 'Wand Specialization',
                    maxRank: 5,
                    s: [14524, 14525, 14526, 14527, 14528],
                    d: ['Increases your damage with Wands by 5%.', 'Increases your damage with Wands by 10%.', 'Increases your damage with Wands by 15%.', 'Increases your damage with Wands by 20%.', 'Increases your damage with Wands by 25%.'],
                    x: 2,
                    y: 0,
                    iconname: 'INV_Wand_01'
                }, {
                    i: 352,
                    n: 'Silent Resolve',
                    maxRank: 5,
                    s: [14523, 14784, 14785, 14786, 14787],
                    d: ['Reduces the threat generated by your spells by 4%.', 'Reduces the threat generated by your spells by 8%.', 'Reduces the threat generated by your spells by 12%.', 'Reduces the threat generated by your spells by 16%.', 'Reduces the threat generated by your spells by 20%.'],
                    x: 0,
                    y: 1,
                    iconname: 'Spell_Nature_ManaRegenTotem'
                }, {
                    i: 344,
                    n: 'Improved Power Word: Fortitude',
                    maxRank: 2,
                    s: [14749, 14767],
                    d: ['Increases the effect of your Power Word: Fortitude and Prayer of Fortitude spells by 15%.', 'Increases the effect of your Power Word: Fortitude and Prayer of Fortitude spells by 30%.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Holy_WordFortitude'
                }, {
                    i: 343,
                    n: 'Improved Power Word: Shield',
                    maxRank: 3,
                    s: [14748, 14768, 14769],
                    d: ['Increases the damage absorbed by your Power Word: Shield by 5%.', 'Increases the damage absorbed by your Power Word: Shield by 10%.', 'Increases the damage absorbed by your Power Word: Shield by 15%.'],
                    x: 2,
                    y: 1,
                    iconname: 'Spell_Holy_PowerWordShield'
                }, {
                    i: 321,
                    n: 'Martyrdom',
                    maxRank: 2,
                    s: [14531, 14774],
                    d: ['Gives you a 50% chance to gain the Focused Casting effect that lasts for 6 sec after being the victim of a melee or ranged critical strike.  The Focused Casting effect prevents you from losing casting time when taking damage and increases resistance to Interrupt effects by 10%.', 'Gives you a 100% chance to gain the Focused Casting effect that lasts for 6 sec after being the victim of a melee or ranged critical strike.  The Focused Casting effect prevents you from losing casting time when taking damage and increases resistance to Interrupt effects by 20%.'],
                    x: 3,
                    y: 1,
                    iconname: 'Spell_Nature_Tranquility'
                }, {
                    i: 348,
                    n: 'Inner Focus',
                    maxRank: 1,
                    s: [14751],
                    d: ['When activated, reduces the Mana cost of your next spell by 100% and increases its critical effect chance by 25% if it is capable of a critical effect.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Frost_WindWalkOn'
                }, {
                    i: 347,
                    n: 'Meditation',
                    maxRank: 3,
                    s: [14521, 14776, 14777],
                    d: ['Allows 5% of your Mana regeneration to continue while casting.', 'Allows 10% of your Mana regeneration to continue while casting.', 'Allows 15% of your Mana regeneration to continue while casting.'],
                    x: 2,
                    y: 2,
                    iconname: 'Spell_Nature_Sleep'
                }, {
                    i: 346,
                    n: 'Improved Inner Fire',
                    maxRank: 3,
                    s: [14747, 14770, 14771],
                    d: ['Increases the Armor bonus of your Inner Fire spell by 10%.', 'Increases the Armor bonus of your Inner Fire spell by 20%.', 'Increases the Armor bonus of your Inner Fire spell by 30%.'],
                    x: 0,
                    y: 3,
                    iconname: 'Spell_Holy_InnerFire'
                }, {
                    i: 341,
                    n: 'Mental Agility',
                    maxRank: 5,
                    s: [14520, 14780, 14781, 14782, 14783],
                    d: ['Reduces the mana cost of your instant cast spells by 2%.', 'Reduces the mana cost of your instant cast spells by 4%.', 'Reduces the mana cost of your instant cast spells by 6%.', 'Reduces the mana cost of your instant cast spells by 8%.', 'Reduces the mana cost of your instant cast spells by 10%.'],
                    x: 1,
                    y: 3,
                    iconname: 'Ability_Hibernation'
                }, {
                    i: 350,
                    n: 'Improved Mana Burn',
                    maxRank: 2,
                    s: [14750, 14772],
                    d: ['Reduces the casting time of your Mana Burn spell by 0.25 secs.', 'Reduces the casting time of your Mana Burn spell by 0.5 sec.'],
                    x: 3,
                    y: 3,
                    iconname: 'Spell_Shadow_ManaBurn'
                }, {
                    i: 1201,
                    n: 'Mental Strength',
                    maxRank: 5,
                    s: [18551, 18552, 18553, 18554, 18555],
                    d: ['Increases your maximum Mana by 2%.', 'Increases your maximum Mana by 4%.', 'Increases your maximum Mana by 6%.', 'Increases your maximum Mana by 8%.', 'Increases your maximum Mana by 10%.'],
                    x: 1,
                    y: 4,
                    iconname: 'Spell_Nature_EnchantArmor'
                }, {
                    i: 351,
                    n: 'Divine Spirit',
                    maxRank: 1,
                    s: [14752],
                    d: ['Holy power infuses the target, increasing their Spirit by 17 for 30 min.'],
                    x: 2,
                    y: 4,
                    r: [7, 3],
                    iconname: 'Spell_Holy_DivineSpirit'
                }, {
                    i: 1202,
                    n: 'Force of Will',
                    maxRank: 5,
                    s: [18544, 18547, 18548, 18549, 18550],
                    d: ['Increases your spell damage by 1% and the critical strike chance of your offensive spells by 1%.', 'Increases your spell damage by 2% and the critical strike chance of your offensive spells by 2%.', 'Increases your spell damage by 3% and the critical strike chance of your offensive spells by 3%.', 'Increases your spell damage by 4% and the critical strike chance of your offensive spells by 4%.', 'Increases your spell damage by 5% and the critical strike chance of your offensive spells by 5%.'],
                    x: 2,
                    y: 5,
                    iconname: 'Spell_Nature_SlowingTotem'
                }, {
                    i: 322,
                    n: 'Power Infusion',
                    maxRank: 1,
                    s: [10060],
                    d: ['Infuses the target with power, increasing their spell damage and healing by 20%.  Lasts 15 sec.'],
                    x: 1,
                    y: 6,
                    r: [11, 5],
                    iconname: 'Spell_Holy_PowerInfusion'
                }]
            }, {
                n: 'Holy',
                t: [{
                    i: 410,
                    n: 'Healing Focus',
                    maxRank: 2,
                    s: [14913, 15012],
                    d: ['Gives you a 35% chance to avoid interruption caused by damage while casting any healing spell.', 'Gives you a 70% chance to avoid interruption caused by damage while casting any healing spell.'],
                    x: 0,
                    y: 0,
                    iconname: 'Spell_Holy_HealingFocus'
                }, {
                    i: 406,
                    n: 'Improved Renew',
                    maxRank: 3,
                    s: [14908, 15020, 17191],
                    d: ['Increases the amount healed by your Renew spell by 5%.', 'Increases the amount healed by your Renew spell by 10%.', 'Increases the amount healed by your Renew spell by 15%.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Holy_Renew'
                }, {
                    i: 401,
                    n: 'Holy Specialization',
                    maxRank: 5,
                    s: [14889, 15008, 15009, 15010, 15011],
                    d: ['Increases the critical effect chance of your Holy spells by 1%.', 'Increases the critical effect chance of your Holy spells by 2%.', 'Increases the critical effect chance of your Holy spells by 3%.', 'Increases the critical effect chance of your Holy spells by 4%.', 'Increases the critical effect chance of your Holy spells by 5%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Holy_SealOfSalvation'
                }, {
                    i: 411,
                    n: 'Spell Warding',
                    maxRank: 5,
                    s: [27900, 27901, 27902, 27903, 27904],
                    d: ['Reduces all spell damage taken by 2%.', 'Reduces all spell damage taken by 4%.', 'Reduces all spell damage taken by 6%.', 'Reduces all spell damage taken by 8%.', 'Reduces all spell damage taken by 10%.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Holy_SpellWarding'
                }, {
                    i: 1181,
                    n: 'Divine Fury',
                    maxRank: 5,
                    s: [18530, 18531, 18533, 18534, 18535],
                    d: ['Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.1 sec.', 'Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.2 sec.', 'Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.3 sec.', 'Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.4 sec.', 'Reduces the casting time of your Smite, Holy Fire, Heal and Greater Heal spells by 0.5 sec.'],
                    x: 2,
                    y: 1,
                    iconname: 'Spell_Holy_SealOfWrath'
                }, {
                    i: 442,
                    n: 'Holy Nova',
                    maxRank: 1,
                    s: [15237],
                    d: ['Causes an explosion of holy light around the caster, causing 28 to 33 Holy damage to all enemy targets within 10 yards and healing all party members within 10 yards for 52 to 61.  These effects cause no threat.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Holy_HolyNova'
                }, {
                    i: 1636,
                    n: 'Blessed Recovery',
                    maxRank: 3,
                    s: [27811, 27815, 27816],
                    d: ['After being struck by a melee or ranged critical hit, heal 8% of the damage taken over 6 sec.', 'After being struck by a melee or ranged critical hit, heal 16% of the damage taken over 6 sec.', 'After being struck by a melee or ranged critical hit, heal 25% of the damage taken over 6 sec.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Holy_BlessedRecovery'
                }, {
                    i: 361,
                    n: 'Inspiration',
                    maxRank: 3,
                    s: [14892, 15362, 15363],
                    d: ["Increases your target's armor by 8% for 15 sec after getting a critical effect from your Flash Heal, Heal, Greater Heal, or Prayer of Healing spell.", "Increases your target's armor by 16% for 15 sec after getting a critical effect from your Flash Heal, Heal, Greater Heal, or Prayer of Healing spell.", "Increases your target's armor by 25% for 15 sec after getting a critical effect from your Flash Heal, Heal, Greater Heal, or Prayer of Healing spell."],
                    x: 3,
                    y: 2,
                    iconname: 'Spell_Holy_LayOnHands'
                }, {
                    i: 1635,
                    n: 'Holy Reach',
                    maxRank: 2,
                    s: [27789, 27790],
                    d: ['Increases the range of your Smite and Holy Fire spells and the radius of your Prayer of Healing and Holy Nova spells by 10%.', 'Increases the range of your Smite and Holy Fire spells and the radius of your Prayer of Healing and Holy Nova spells by 20%.'],
                    x: 0,
                    y: 3,
                    iconname: 'Spell_Holy_Purify'
                }, {
                    i: 408,
                    n: 'Improved Healing',
                    maxRank: 3,
                    s: [14912, 15013, 15014],
                    d: ['Reduces the Mana cost of your Lesser Heal, Heal, and Greater Heal spells by 5%.', 'Reduces the Mana cost of your Lesser Heal, Heal, and Greater Heal spells by 10%.', 'Reduces the Mana cost of your Lesser Heal, Heal, and Greater Heal spells by 15%.'],
                    x: 1,
                    y: 3,
                    iconname: 'Spell_Holy_Heal02'
                }, {
                    i: 403,
                    n: 'Searing Light',
                    maxRank: 2,
                    s: [14909, 15017],
                    d: ['Increases the damage of your Smite and Holy Fire spells by 5%.', 'Increases the damage of your Smite and Holy Fire spells by 10%.'],
                    x: 2,
                    y: 3,
                    r: [4, 5],
                    iconname: 'Spell_Holy_SearingLightPriest'
                }, {
                    i: 413,
                    n: 'Improved Prayer of Healing',
                    maxRank: 2,
                    s: [14911, 15018],
                    d: ['Reduces the Mana cost of your Prayer of Healing spell by 10%.', 'Reduces the Mana cost of your Prayer of Healing spell by 20%.'],
                    x: 0,
                    y: 4,
                    iconname: 'Spell_Holy_PrayerOfHealing02'
                }, {
                    i: 1561,
                    n: 'Spirit of Redemption',
                    maxRank: 1,
                    s: [20711],
                    d: ['Upon death, the priest becomes the Spirit of Redemption for 10 sec.  The Spirit of Redemption cannot move, attack, be attacked or targeted by any spells or effects.  While in this form the priest can cast any healing spell free of cost.  When the effect ends, the priest dies.'],
                    x: 1,
                    y: 4,
                    iconname: 'INV_Enchant_EssenceEternalLarge'
                }, {
                    i: 402,
                    n: 'Spiritual Guidance',
                    maxRank: 5,
                    s: [14901, 15028, 15029, 15030, 15031],
                    d: ['Increases spell damage and healing by up to 5% of your total Spirit.', 'Increases spell damage and healing by up to 10% of your total Spirit.', 'Increases spell damage and healing by up to 15% of your total Spirit.', 'Increases spell damage and healing by up to 20% of your total Spirit.', 'Increases spell damage and healing by up to 25% of your total Spirit.'],
                    x: 2,
                    y: 4,
                    iconname: 'Spell_Holy_SpiritualGuidence'
                }, {
                    i: 404,
                    n: 'Spiritual Healing',
                    maxRank: 5,
                    s: [14898, 15349, 15354, 15355, 15356],
                    d: ['Increases the amount healed by your healing spells by 2%.', 'Increases the amount healed by your healing spells by 4%.', 'Increases the amount healed by your healing spells by 6%.', 'Increases the amount healed by your healing spells by 8%.', 'Increases the amount healed by your healing spells by 10%.'],
                    x: 2,
                    y: 5,
                    iconname: 'Spell_Nature_MoonGlow'
                }, {
                    i: 1637,
                    n: 'Lightwell',
                    maxRank: 1,
                    s: [724],
                    d: ['Creates a holy Lightwell near the priest.  Members of your raid or party can click the Lightwell to restore 0 health over 10 sec.  Being attacked cancels the effect.  Lightwell lasts for 0 sec or 5 charges.'],
                    x: 1,
                    y: 6,
                    r: [12, 1],
                    iconname: 'Spell_Holy_SummonLightwell'
                }]
            }, {
                n: 'Shadow',
                t: [{
                    i: 465,
                    n: 'Spirit Tap',
                    maxRank: 5,
                    s: [15270, 15335, 15336, 15337, 15338],
                    d: ['Gives you a 20% chance to gain a 100% bonus to your Spirit after killing a target that yields experience.  For the duration, your Mana will regenerate at a 50% rate while casting.  Lasts 15 sec.', 'Gives you a 40% chance to gain a 100% bonus to your Spirit after killing a target that yields experience.  For the duration, your Mana will regenerate at a 50% rate while casting.  Lasts 15 sec.', 'Gives you a 60% chance to gain a 100% bonus to your Spirit after killing a target that yields experience.  For the duration, your Mana will regenerate at a 50% rate while casting.  Lasts 15 sec.', 'Gives you a 80% chance to gain a 100% bonus to your Spirit after killing a target that yields experience.  For the duration, your Mana will regenerate at a 50% rate while casting.  Lasts 15 sec.', 'Gives you a 100% chance to gain a 100% bonus to your Spirit after killing a target that yields experience.  For the duration, your Mana will regenerate at a 50% rate while casting.  Lasts 15 sec.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Shadow_Requiem'
                }, {
                    i: 464,
                    n: 'Blackout',
                    maxRank: 5,
                    s: [15268, 15323, 15324, 15325, 15326],
                    d: ['Gives your Shadow damage spells a 2% chance to stun the target for 3 sec.', 'Gives your Shadow damage spells a 4% chance to stun the target for 3 sec.', 'Gives your Shadow damage spells a 6% chance to stun the target for 3 sec.', 'Gives your Shadow damage spells a 8% chance to stun the target for 3 sec.', 'Gives your Shadow damage spells a 10% chance to stun the target for 3 sec.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Shadow_GatherShadows'
                }, {
                    i: 466,
                    n: 'Shadow Affinity',
                    maxRank: 3,
                    s: [15318, 15272, 15320],
                    d: ['Reduces the threat generated by your Shadow spells by 8%.', 'Reduces the threat generated by your Shadow spells by 16%.', 'Reduces the threat generated by your Shadow spells by 25%.'],
                    x: 0,
                    y: 1,
                    iconname: 'Spell_Shadow_ShadowWard'
                }, {
                    i: 482,
                    n: 'Improved Shadow Word: Pain',
                    maxRank: 2,
                    s: [15275, 15317],
                    d: ['Increases the duration of your Shadow Word: Pain spell by 3 sec.', 'Increases the duration of your Shadow Word: Pain spell by 6 sec.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Shadow_ShadowWordPain'
                }, {
                    i: 463,
                    n: 'Shadow Focus',
                    maxRank: 5,
                    s: [15260, 15327, 15328, 15329, 15330],
                    d: ["Reduces your target's chance to resist your Shadow spells by 2%.", "Reduces your target's chance to resist your Shadow spells by 4%.", "Reduces your target's chance to resist your Shadow spells by 6%.", "Reduces your target's chance to resist your Shadow spells by 8%.", "Reduces your target's chance to resist your Shadow spells by 10%."],
                    x: 2,
                    y: 1,
                    iconname: 'Spell_Shadow_BurningSpirit'
                }, {
                    i: 542,
                    n: 'Improved Psychic Scream',
                    maxRank: 2,
                    s: [15392, 15448],
                    d: ['Reduces the cooldown of your Psychic Scream spell by 2 sec.', 'Reduces the cooldown of your Psychic Scream spell by 4 sec.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Shadow_PsychicScream'
                }, {
                    i: 481,
                    n: 'Improved Mind Blast',
                    maxRank: 5,
                    s: [15273, 15312, 15313, 15314, 15316],
                    d: ['Reduces the cooldown of your Mind Blast spell by 0.5 sec.', 'Reduces the cooldown of your Mind Blast spell by 1 sec.', 'Reduces the cooldown of your Mind Blast spell by 1.5 sec.', 'Reduces the cooldown of your Mind Blast spell by 2 sec.', 'Reduces the cooldown of your Mind Blast spell by 2.5 sec.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Shadow_UnholyFrenzy'
                }, {
                    i: 501,
                    n: 'Mind Flay',
                    maxRank: 1,
                    s: [15407],
                    d: ["Assault the target's mind with Shadow energy, causing 75 Shadow damage over 3 sec and slowing their movement speed by 50%."],
                    x: 2,
                    y: 2,
                    iconname: 'Spell_Shadow_SiphonMana'
                }, {
                    i: 483,
                    n: 'Improved Fade',
                    maxRank: 2,
                    s: [15274, 15311],
                    d: ['Decreases the cooldown of your Fade ability by 3 sec.', 'Decreases the cooldown of your Fade ability by 6 sec.'],
                    x: 1,
                    y: 3,
                    iconname: 'Spell_Magic_LesserInvisibilty'
                }, {
                    i: 881,
                    n: 'Shadow Reach',
                    maxRank: 3,
                    s: [17322, 17323, 17325],
                    d: ['Increases the range of your Shadow damage spells by 6%.', 'Increases the range of your Shadow damage spells by 13%.', 'Increases the range of your Shadow damage spells by 20%.'],
                    x: 2,
                    y: 3,
                    iconname: 'Spell_Shadow_ChillTouch'
                }, {
                    i: 461,
                    n: 'Shadow Weaving',
                    maxRank: 5,
                    s: [15257, 15331, 15332, 15333, 15334],
                    d: ['Your Shadow damage spells have a 20% chance to cause your target to be vulnerable to Shadow damage.  This vulnerability increases the Shadow damage dealt to your target by 3% and lasts 15 sec.  Stacks up to 15001 times.', 'Your Shadow damage spells have a 40% chance to cause your target to be vulnerable to Shadow damage.  This vulnerability increases the Shadow damage dealt to your target by 3% and lasts 15 sec.  Stacks up to 15001 times.', 'Your Shadow damage spells have a 60% chance to cause your target to be vulnerable to Shadow damage.  This vulnerability increases the Shadow damage dealt to your target by 3% and lasts 15 sec.  Stacks up to 15001 times.', 'Your Shadow damage spells have a 80% chance to cause your target to be vulnerable to Shadow damage.  This vulnerability increases the Shadow damage dealt to your target by 3% and lasts 15 sec.  Stacks up to 15001 times.', 'Your Shadow damage spells have a 100% chance to cause your target to be vulnerable to Shadow damage.  This vulnerability increases the Shadow damage dealt to your target by 3% and lasts 15 sec.  Stacks up to 15001 times.'],
                    x: 3,
                    y: 3,
                    iconname: 'Spell_Shadow_BlackPlague'
                }, {
                    i: 541,
                    n: 'Silence',
                    maxRank: 1,
                    s: [15487],
                    d: ['Silences the target, preventing them from casting spells for 5 sec.'],
                    x: 0,
                    y: 4,
                    r: [5, 2],
                    iconname: 'Spell_Shadow_ImpPhaseShift'
                }, {
                    i: 484,
                    n: 'Vampiric Embrace',
                    maxRank: 1,
                    s: [15286],
                    d: ['Afflicts your target with Shadow energy that causes all party members to be healed for 20% of any Shadow spell damage you deal for 1 min.'],
                    x: 1,
                    y: 4,
                    iconname: 'Spell_Shadow_UnsummonBuilding'
                }, {
                    i: 1638,
                    n: 'Improved Vampiric Embrace',
                    maxRank: 2,
                    s: [27839, 27840],
                    d: ['Increases the percentage healed by Vampiric Embrace by an additional 5%.', 'Increases the percentage healed by Vampiric Embrace by an additional 10%.'],
                    x: 2,
                    y: 4,
                    r: [12, 1],
                    iconname: 'Spell_Shadow_ImprovedVampiricEmbrace'
                }, {
                    i: 462,
                    n: 'Darkness',
                    maxRank: 5,
                    s: [15259, 15307, 15308, 15309, 15310],
                    d: ['Increases your Shadow spell damage by 2%.', 'Increases your Shadow spell damage by 4%.', 'Increases your Shadow spell damage by 6%.', 'Increases your Shadow spell damage by 8%.', 'Increases your Shadow spell damage by 10%.'],
                    x: 2,
                    y: 5,
                    iconname: 'Spell_Shadow_Twilight'
                }, {
                    i: 521,
                    n: 'Shadowform',
                    maxRank: 1,
                    s: [15473],
                    d: ['Assume a Shadowform, increasing your Shadow damage by 15% and reducing Physical damage done to you by 15%.  However, you may not cast Holy spells while in this form.'],
                    x: 1,
                    y: 6,
                    r: [12, 1],
                    iconname: 'Spell_Shadow_Shadowform'
                }]
            }]
        },
        {
            name: 'rogue',
            tree_talents: [{
                n: 'Assassination',
                t: [{
                    i: 276,
                    n: 'Improved Eviscerate',
                    maxRank: 3,
                    s: [14162, 14163, 14164],
                    d: ['Increases the damage done by your Eviscerate ability by 5%.', 'Increases the damage done by your Eviscerate ability by 10%.', 'Increases the damage done by your Eviscerate ability by 15%.'],
                    x: 0,
                    y: 0,
                    iconname: 'Ability_Rogue_Eviscerate'
                }, {
                    i: 272,
                    n: 'Remorseless Attacks',
                    maxRank: 2,
                    s: [14144, 14148],
                    d: ['After killing an opponent that yields experience or honor, gives you a 20% increased critical strike chance on your next Sinister Strike, Backstab, Ambush, or Ghostly Strike.  Lasts 20 sec.', 'After killing an opponent that yields experience or honor, gives you a 40% increased critical strike chance on your next Sinister Strike, Backstab, Ambush, or Ghostly Strike.  Lasts 20 sec.'],
                    x: 1,
                    y: 0,
                    iconname: 'Ability_FiegnDead'
                }, {
                    i: 270,
                    n: 'Malice',
                    maxRank: 5,
                    s: [14138, 14139, 14140, 14141, 14142],
                    d: ['Increases your critical strike chance by 1%.', 'Increases your critical strike chance by 2%.', 'Increases your critical strike chance by 3%.', 'Increases your critical strike chance by 4%.', 'Increases your critical strike chance by 5%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Ability_Racial_BloodRage'
                }, {
                    i: 273,
                    n: 'Ruthlessness',
                    maxRank: 3,
                    s: [14156, 14160, 14161],
                    d: ['Gives your finishing moves a 20% chance to add a combo point to your target.', 'Gives your finishing moves a 40% chance to add a combo point to your target.', 'Gives your finishing moves a 60% chance to add a combo point to your target.'],
                    x: 0,
                    y: 1,
                    iconname: 'Ability_Druid_Disembowel'
                }, {
                    i: 274,
                    n: 'Murder',
                    maxRank: 2,
                    s: [14158, 14159],
                    d: ['Increases all damage caused against Humanoid, Giant, Beast and Dragonkin targets by 1%.', 'Increases all damage caused against Humanoid, Giant, Beast and Dragonkin targets by 2%.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Shadow_DeathScream'
                }, {
                    i: 277,
                    n: 'Improved Slice and Dice',
                    maxRank: 3,
                    s: [14165, 14166, 14167],
                    d: ['Increases the duration of your Slice and Dice ability by 15%.', 'Increases the duration of your Slice and Dice ability by 30%.', 'Increases the duration of your Slice and Dice ability by 45%.'],
                    x: 3,
                    y: 1,
                    iconname: 'Ability_Rogue_SliceDice'
                }, {
                    i: 281,
                    n: 'Relentless Strikes',
                    maxRank: 1,
                    s: [14179],
                    d: ['Your finishing moves have a 1101000000% chance per combo point to restore 25 energy.'],
                    x: 0,
                    y: 2,
                    iconname: 'Ability_Warrior_DecisiveStrike'
                }, {
                    i: 278,
                    n: 'Improved Expose Armor',
                    maxRank: 2,
                    s: [14168, 14169],
                    d: ['Increases the armor reduced by your Expose Armor ability by 25%.', 'Increases the armor reduced by your Expose Armor ability by 50%.'],
                    x: 1,
                    y: 2,
                    iconname: 'Ability_Warrior_Riposte'
                }, {
                    i: 269,
                    n: 'Lethality',
                    maxRank: 5,
                    s: [14128, 14132, 14135, 14136, 14137],
                    d: ['Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Ghostly Strike, and Hemorrhage abilities by 6%.', 'Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Ghostly Strike, and Hemorrhage abilities by 12%.', 'Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Ghostly Strike, and Hemorrhage abilities by 18%.', 'Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Ghostly Strike, and Hemorrhage abilities by 24%.', 'Increases the critical strike damage bonus of your Sinister Strike, Gouge, Backstab, Ghostly Strike, and Hemorrhage abilities by 30%.'],
                    x: 2,
                    y: 2,
                    r: [2, 5],
                    iconname: 'Ability_CriticalStrike'
                }, {
                    i: 682,
                    n: 'Vile Poisons',
                    maxRank: 5,
                    s: [16513, 16514, 16515, 16719, 16720],
                    d: ['Increases the damage dealt by your poisons by 4% and gives your poisons an additional 8% chance to resist dispel effects.', 'Increases the damage dealt by your poisons by 8% and gives your poisons an additional 16% chance to resist dispel effects.', 'Increases the damage dealt by your poisons by 12% and gives your poisons an additional 24% chance to resist dispel effects.', 'Increases the damage dealt by your poisons by 16% and gives your poisons an additional 32% chance to resist dispel effects.', 'Increases the damage dealt by your poisons by 20% and gives your poisons an additional 40% chance to resist dispel effects.'],
                    x: 1,
                    y: 3,
                    iconname: 'Ability_Rogue_FeignDeath'
                }, {
                    i: 268,
                    n: 'Improved Poisons',
                    maxRank: 5,
                    s: [14113, 14114, 14115, 14116, 14117],
                    d: ['Increases the chance to apply poisons to your target by 2%.', 'Increases the chance to apply poisons to your target by 4%.', 'Increases the chance to apply poisons to your target by 6%.', 'Increases the chance to apply poisons to your target by 8%.', 'Increases the chance to apply poisons to your target by 10%.'],
                    x: 2,
                    y: 3,
                    iconname: 'Ability_Poisons'
                }, {
                    i: 280,
                    n: 'Cold Blood',
                    maxRank: 1,
                    s: [14177],
                    d: ['When activated, increases the critical strike chance of your next Sinister Strike, Backstab, Ambush, or Eviscerate by 100%.'],
                    x: 1,
                    y: 4,
                    iconname: 'Spell_Ice_Lament'
                }, {
                    i: 279,
                    n: 'Improved Kidney Shot',
                    maxRank: 3,
                    s: [14174, 14175, 14176],
                    d: ['While affected by your Kidney Shot ability, the target receives an additional 3% damage from all sources.', 'While affected by your Kidney Shot ability, the target receives an additional 6% damage from all sources.', 'While affected by your Kidney Shot ability, the target receives an additional 9% damage from all sources.'],
                    x: 2,
                    y: 4,
                    iconname: 'Ability_Rogue_KidneyShot'
                }, {
                    i: 283,
                    n: 'Seal Fate',
                    maxRank: 5,
                    s: [14186, 14190, 14193, 14194, 14195],
                    d: ['Your critical strikes from abilities that add combo points  have a 20% chance to add an additional combo point.', 'Your critical strikes from abilities that add combo points  have a 40% chance to add an additional combo point.', 'Your critical strikes from abilities that add combo points  have a 60% chance to add an additional combo point.', 'Your critical strikes from abilities that add combo points  have a 80% chance to add an additional combo point.', 'Your critical strikes from abilities that add combo points  have a 100% chance to add an additional combo point.'],
                    x: 1,
                    y: 5,
                    r: [11, 1],
                    iconname: 'Spell_Shadow_ChillTouch'
                }, {
                    i: 382,
                    n: 'Vigor',
                    maxRank: 1,
                    s: [14983],
                    d: ['Increases your maximum Energy by 10.'],
                    x: 1,
                    y: 6,
                    iconname: 'Spell_Nature_EarthBindTotem'
                }]
            }, {
                n: 'Combat',
                t: [{
                    i: 203,
                    n: 'Improved Gouge',
                    maxRank: 3,
                    s: [13741, 13793, 13792],
                    d: ['Increases the effect duration of your Gouge ability by 0.5 sec.', 'Increases the effect duration of your Gouge ability by 1 sec.', 'Increases the effect duration of your Gouge ability by 1.5 sec.'],
                    x: 0,
                    y: 0,
                    iconname: 'Ability_Gouge'
                }, {
                    i: 201,
                    n: 'Improved Sinister Strike',
                    maxRank: 2,
                    s: [13732, 13863],
                    d: ['Reduces the Energy cost of your Sinister Strike ability by 3.', 'Reduces the Energy cost of your Sinister Strike ability by 5.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Shadow_RitualOfSacrifice'
                }, {
                    i: 186,
                    n: 'Lightning Reflexes',
                    maxRank: 5,
                    s: [13712, 13788, 13789, 13790, 13791],
                    d: ['Increases your Dodge chance by 1%.', 'Increases your Dodge chance by 2%.', 'Increases your Dodge chance by 3%.', 'Increases your Dodge chance by 4%.', 'Increases your Dodge chance by 5%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Nature_Invisibilty'
                }, {
                    i: 202,
                    n: 'Improved Backstab',
                    maxRank: 3,
                    s: [13733, 13865, 13866],
                    d: ['Increases the critical strike chance of your Backstab ability by 10%.', 'Increases the critical strike chance of your Backstab ability by 20%.', 'Increases the critical strike chance of your Backstab ability by 30%.'],
                    x: 0,
                    y: 1,
                    iconname: 'Ability_BackStab'
                }, {
                    i: 187,
                    n: 'Deflection',
                    maxRank: 5,
                    s: [13713, 13853, 13854, 13855, 13856],
                    d: ['Increases your Parry chance by 1%.', 'Increases your Parry chance by 2%.', 'Increases your Parry chance by 3%.', 'Increases your Parry chance by 4%.', 'Increases your Parry chance by 5%.'],
                    x: 1,
                    y: 1,
                    iconname: 'Ability_Parry'
                }, {
                    i: 181,
                    n: 'Precision',
                    maxRank: 5,
                    s: [13705, 13832, 13843, 13844, 13845],
                    d: ['Increases your chance to hit with melee weapons by 1%.', 'Increases your chance to hit with melee weapons by 2%.', 'Increases your chance to hit with melee weapons by 3%.', 'Increases your chance to hit with melee weapons by 4%.', 'Increases your chance to hit with melee weapons by 5%.'],
                    x: 2,
                    y: 1,
                    iconname: 'Ability_Marksmanship'
                }, {
                    i: 204,
                    n: 'Endurance',
                    maxRank: 2,
                    s: [13742, 13872],
                    d: ['Reduces the cooldown of your Sprint and Evasion abilities by 45 sec.', 'Reduces the cooldown of your Sprint and Evasion abilities by 1.5 min.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Shadow_ShadowWard'
                }, {
                    i: 301,
                    n: 'Riposte',
                    maxRank: 1,
                    s: [14251],
                    d: ["A strike that becomes active after parrying an opponent's attack.  This attack deals 150% weapon damage and disarms the target for 6 sec."],
                    x: 1,
                    y: 2,
                    r: [4, 5],
                    iconname: 'Ability_Warrior_Challange'
                }, {
                    i: 222,
                    n: 'Improved Sprint',
                    maxRank: 2,
                    s: [13743, 13875],
                    d: ['Gives a 50% chance to remove all movement impairing effects when you activate your Sprint ability.', 'Gives a 100% chance to remove all movement impairing effects when you activate your Sprint ability.'],
                    x: 3,
                    y: 2,
                    iconname: 'Ability_Rogue_Sprint'
                }, {
                    i: 206,
                    n: 'Improved Kick',
                    maxRank: 2,
                    s: [13754, 13867],
                    d: ['Gives your Kick ability a 50% chance to silence the target for 2 sec.', 'Gives your Kick ability a 100% chance to silence the target for 2 sec.'],
                    x: 0,
                    y: 3,
                    iconname: 'Ability_Kick'
                }, {
                    i: 182,
                    n: 'Dagger Specialization',
                    maxRank: 5,
                    s: [13706, 13804, 13805, 13806, 13807],
                    d: ['Increases your chance to get a critical strike with Daggers by 1%.', 'Increases your chance to get a critical strike with Daggers by 2%.', 'Increases your chance to get a critical strike with Daggers by 3%.', 'Increases your chance to get a critical strike with Daggers by 4%.', 'Increases your chance to get a critical strike with Daggers by 5%.'],
                    x: 1,
                    y: 3,
                    iconname: 'INV_Weapon_ShortBlade_05'
                }, {
                    i: 221,
                    n: 'Dual Wield Specialization',
                    maxRank: 5,
                    s: [13715, 13848, 13849, 13851, 13852],
                    d: ['Increases the damage done by your offhand weapon by 10%.', 'Increases the damage done by your offhand weapon by 20%.', 'Increases the damage done by your offhand weapon by 30%.', 'Increases the damage done by your offhand weapon by 40%.', 'Increases the damage done by your offhand weapon by 50%.'],
                    x: 2,
                    y: 3,
                    r: [5, 5],
                    iconname: 'Ability_DualWield'
                }, {
                    i: 184,
                    n: 'Mace Specialization',
                    maxRank: 5,
                    s: [13709, 13800, 13801, 13802, 13803],
                    d: ['Increases your skill with Maces by 1, and gives you a 1% chance to stun your target for 3 sec with a mace.', 'Increases your skill with Maces by 2, and gives you a 2% chance to stun your target for 3 sec with a mace.', 'Increases your skill with Maces by 3, and gives you a 3% chance to stun your target for 3 sec with a mace.', 'Increases your skill with Maces by 4, and gives you a 4% chance to stun your target for 3 sec with a mace.', 'Increases your skill with Maces by 5, and gives you a 6% chance to stun your target for 3 sec with a mace.'],
                    x: 0,
                    y: 4,
                    iconname: 'INV_Mace_01'
                }, {
                    i: 223,
                    n: 'Blade Flurry',
                    maxRank: 1,
                    s: [13877],
                    d: ['Increases your attack speed by 20%.  In addition, attacks strike an additional nearby opponent.  Lasts 15 sec.'],
                    x: 1,
                    y: 4,
                    iconname: 'Ability_Warrior_PunishingBlow'
                }, {
                    i: 242,
                    n: 'Sword Specialization',
                    maxRank: 5,
                    s: [13960, 13961, 13962, 13963, 13964],
                    d: ['Gives you a 1% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 2% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 3% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 4% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 5% chance to get an extra attack on the same target after dealing damage with your Sword.'],
                    x: 2,
                    y: 4,
                    iconname: 'INV_Sword_27'
                }, {
                    i: 183,
                    n: 'Fist Weapon Specialization',
                    maxRank: 5,
                    s: [13707, 13966, 13967, 13968, 13969],
                    d: ['Increases your chance to get a critical strike with Fist Weapons by 1%.', 'Increases your chance to get a critical strike with Fist Weapons by 2%.', 'Increases your chance to get a critical strike with Fist Weapons by 3%.', 'Increases your chance to get a critical strike with Fist Weapons by 4%.', 'Increases your chance to get a critical strike with Fist Weapons by 5%.'],
                    x: 3,
                    y: 4,
                    iconname: 'INV_Gauntlets_04'
                }, {
                    i: 1703,
                    n: 'Weapon Expertise',
                    maxRank: 2,
                    s: [30919, 30920],
                    d: ['Increases your skill with Sword, Fist and Dagger weapons by 3.', 'Increases your skill with Sword, Fist and Dagger weapons by 5.'],
                    x: 1,
                    y: 5,
                    r: [13, 1],
                    iconname: 'Spell_Holy_BlessingOfStrength'
                }, {
                    i: 1122,
                    n: 'Aggression',
                    maxRank: 3,
                    s: [18427, 18428, 18429],
                    d: ['Increases the damage of your Sinister Strike and Eviscerate abilities by 2%.', 'Increases the damage of your Sinister Strike and Eviscerate abilities by 4%.', 'Increases the damage of your Sinister Strike and Eviscerate abilities by 6%.'],
                    x: 2,
                    y: 5,
                    iconname: 'Ability_Racial_Avatar'
                }, {
                    i: 205,
                    n: 'Adrenaline Rush',
                    maxRank: 1,
                    s: [13750],
                    d: ['Increases your Energy regeneration rate by 100% for 15 sec.'],
                    x: 1,
                    y: 6,
                    iconname: 'Spell_Shadow_ShadowWordDominate'
                }]
            }, {
                n: 'Subtlety',
                t: [{
                    i: 241,
                    n: 'Master of Deception',
                    maxRank: 5,
                    s: [13958, 13970, 13971, 13972, 13973],
                    d: ['Reduces the chance enemies have to detect you while in Stealth mode.', 'Reduces the chance enemies have to detect you while in Stealth mode.  More effective than Master of Deception (Rank 1).', 'Reduces the chance enemies have to detect you while in Stealth mode.  More effective than Master of Deception (Rank 2).', 'Reduces the chance enemies have to detect you while in Stealth mode.  More effective than Master of Deception (Rank 3).', 'Reduces the chance enemies have to detect you while in Stealth mode.  More effective than Master of Deception (Rank 4).'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Shadow_Charm'
                }, {
                    i: 261,
                    n: 'Opportunity',
                    maxRank: 5,
                    s: [14057, 14072, 14073, 14074, 14075],
                    d: ['Increases the damage dealt when striking from behind with your Backstab, Garrote, or Ambush abilities by 4%.', 'Increases the damage dealt when striking from behind with your Backstab, Garrote, or Ambush abilities by 8%.', 'Increases the damage dealt when striking from behind with your Backstab, Garrote, or Ambush abilities by 12%.', 'Increases the damage dealt when striking from behind with your Backstab, Garrote, or Ambush abilities by 16%.', 'Increases the damage dealt when striking from behind with your Backstab, Garrote, or Ambush abilities by 20%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Ability_Warrior_WarCry'
                }, {
                    i: 1700,
                    n: 'Sleight of Hand',
                    maxRank: 2,
                    s: [30892, 30893],
                    d: ['Reduces the chance you are critically hit by melee and ranged attacks by 1% and increases the threat reduction of your Feint ability by 10%.', 'Reduces the chance you are critically hit by melee and ranged attacks by 2% and increases the threat reduction of your Feint ability by 20%.'],
                    x: 0,
                    y: 1,
                    iconname: 'Ability_Rogue_Feint'
                }, {
                    i: 247,
                    n: 'Elusiveness',
                    maxRank: 2,
                    s: [13981, 14066],
                    d: ['Reduces the cooldown of your Vanish and Blind abilities by 45 sec.', 'Reduces the cooldown of your Vanish and Blind abilities by 1.5 min.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Magic_LesserInvisibilty'
                }, {
                    i: 244,
                    n: 'Camouflage',
                    maxRank: 5,
                    s: [13975, 14062, 14063, 14064, 14065],
                    d: ['Increases your speed while stealthed by 3% and reduces the cooldown of your Stealth ability by 1 sec.', 'Increases your speed while stealthed by 6% and reduces the cooldown of your Stealth ability by 2 sec.', 'Increases your speed while stealthed by 9% and reduces the cooldown of your Stealth ability by 3 sec.', 'Increases your speed while stealthed by 12% and reduces the cooldown of your Stealth ability by 4 sec.', 'Increases your speed while stealthed by 15% and reduces the cooldown of your Stealth ability by 5 sec.'],
                    x: 2,
                    y: 1,
                    iconname: 'Ability_Stealth'
                }, {
                    i: 245,
                    n: 'Initiative',
                    maxRank: 3,
                    s: [13976, 13979, 13980],
                    d: ['Gives you a 25% chance to add an additional combo point to your target when using your Ambush, Garrote, or Cheap Shot ability.', 'Gives you a 50% chance to add an additional combo point to your target when using your Ambush, Garrote, or Cheap Shot ability.', 'Gives you a 75% chance to add an additional combo point to your target when using your Ambush, Garrote, or Cheap Shot ability.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Shadow_Fumble'
                }, {
                    i: 303,
                    n: 'Ghostly Strike',
                    maxRank: 1,
                    s: [14278],
                    d: ['A strike that deals 125% weapon damage and increases your chance to dodge by 15% for 7 sec.  Awards 1 combo point.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Shadow_Curse'
                }, {
                    i: 263,
                    n: 'Improved Ambush',
                    maxRank: 3,
                    s: [14079, 14080, 14081],
                    d: ['Increases the critical strike chance of your Ambush ability by 15%.', 'Increases the critical strike chance of your Ambush ability by 30%.', 'Increases the critical strike chance of your Ambush ability by 45%.'],
                    x: 2,
                    y: 2,
                    iconname: 'Ability_Rogue_Ambush'
                }, {
                    i: 246,
                    n: 'Setup',
                    maxRank: 3,
                    s: [13983, 14070, 14071],
                    d: ['Gives you a 15% chance to add a combo point to your target after dodging their attack or fully resisting one of their spells.', 'Gives you a 30% chance to add a combo point to your target after dodging their attack or fully resisting one of their spells.', 'Gives you a 45% chance to add a combo point to your target after dodging their attack or fully resisting one of their spells.'],
                    x: 0,
                    y: 3,
                    iconname: 'Spell_Nature_MirrorImage'
                }, {
                    i: 262,
                    n: 'Improved Sap',
                    maxRank: 3,
                    s: [14076, 14094, 14095],
                    d: ['Gives you a 30% chance to return to stealth mode after using your Sap ability.', 'Gives you a 60% chance to return to stealth mode after using your Sap ability.', 'Gives you a 90% chance to return to stealth mode after using your Sap ability.'],
                    x: 1,
                    y: 3,
                    iconname: 'Ability_Sap'
                }, {
                    i: 1123,
                    n: 'Serrated Blades',
                    maxRank: 3,
                    s: [14171, 14172, 14173],
                    d: ["Causes your attacks to ignore 0 of your target's Armor and increases the damage dealt by your Rupture ability by 10%.  The amount of Armor reduced increases with your level.", "Causes your attacks to ignore 0 of your target's Armor and increases the damage dealt by your Rupture ability by 20%.  The amount of Armor reduced increases with your level.", "Causes your attacks to ignore 0 of your target's Armor and increases the damage dealt by your Rupture ability by 30%.  The amount of Armor reduced increases with your level."],
                    x: 2,
                    y: 3,
                    iconname: 'INV_Sword_17'
                }, {
                    i: 1701,
                    n: 'Heightened Senses',
                    maxRank: 2,
                    s: [30894, 30895],
                    d: ['Increases your Stealth detection and reduces the chance you are hit by spells and ranged attacks by 2%.', 'Increases your Stealth detection and reduces the chance you are hit by spells and ranged attacks by 4%.  More effective than Heightened Senses (Rank 1).'],
                    x: 0,
                    y: 4,
                    iconname: 'Ability_Ambush'
                }, {
                    i: 284,
                    n: 'Preparation',
                    maxRank: 1,
                    s: [14185],
                    d: ['When activated, this ability immediately finishes the cooldown on your other Rogue abilities.'],
                    x: 1,
                    y: 4,
                    iconname: 'Spell_Shadow_AntiShadow'
                }, {
                    i: 265,
                    n: 'Dirty Deeds',
                    maxRank: 2,
                    s: [14082, 14083],
                    d: ['Reduces the Energy cost of your Cheap Shot and Garrote abilities by 10.', 'Reduces the Energy cost of your Cheap Shot and Garrote abilities by 20.'],
                    x: 2,
                    y: 4,
                    iconname: 'Spell_Shadow_SummonSuccubus'
                }, {
                    i: 681,
                    n: 'Hemorrhage',
                    maxRank: 1,
                    s: [16511],
                    d: ['An instant strike that damages the opponent and causes the target to hemorrhage, increasing any Physical damage dealt to the target by up to 3.  Lasts 30 charges or 15 sec.  Awards 1 combo point.'],
                    x: 3,
                    y: 4,
                    r: [10, 3],
                    iconname: 'Spell_Shadow_LifeDrain'
                }, {
                    i: 1702,
                    n: 'Deadliness',
                    maxRank: 5,
                    s: [30902, 30903, 30904, 30905, 30906],
                    d: ['Increases your Attack Power by 2%.', 'Increases your Attack Power by 4%.', 'Increases your Attack Power by 6%.', 'Increases your Attack Power by 8%.', 'Increases your Attack Power by 10%.'],
                    x: 2,
                    y: 5,
                    iconname: 'INV_Weapon_Crossbow_11'
                }, {
                    i: 381,
                    n: 'Premeditation',
                    maxRank: 1,
                    s: [14183],
                    d: ['When used, adds 2 combo points to your target.  You must add to or use those combo points within 10 sec or the combo points are lost. '],
                    x: 1,
                    y: 6,
                    r: [12, 1],
                    iconname: 'Spell_Shadow_Possession'
                }]
            }]
        },
        {
            name: 'shaman'
            tree_talents: [{
                n: 'Elemental',
                t: [{
                    i: 564,
                    n: 'Convection',
                    maxRank: 5,
                    s: [16039, 16109, 16110, 16111, 16112],
                    d: ['Reduces the mana cost of your Shock, Lightning Bolt and Chain Lightning spells by 2%.', 'Reduces the mana cost of your Shock, Lightning Bolt and Chain Lightning spells by 4%.', 'Reduces the mana cost of your Shock, Lightning Bolt and Chain Lightning spells by 6%.', 'Reduces the mana cost of your Shock, Lightning Bolt and Chain Lightning spells by 8%.', 'Reduces the mana cost of your Shock, Lightning Bolt and Chain Lightning spells by 10%.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Nature_WispSplode'
                }, {
                    i: 563,
                    n: 'Concussion',
                    maxRank: 5,
                    s: [16035, 16105, 16106, 16107, 16108],
                    d: ['Increases the damage done by your Lightning Bolt, Chain Lightning and Shock spells by 1%.', 'Increases the damage done by your Lightning Bolt, Chain Lightning and Shock spells by 2%.', 'Increases the damage done by your Lightning Bolt, Chain Lightning and Shock spells by 3%.', 'Increases the damage done by your Lightning Bolt, Chain Lightning and Shock spells by 4%.', 'Increases the damage done by your Lightning Bolt, Chain Lightning and Shock spells by 5%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Fire_Fireball'
                }, {
                    i: 572,
                    n: "Earth's Grasp",
                    maxRank: 2,
                    s: [16043, 16130],
                    d: ['Increases the health of your Stoneclaw Totem by 25% and the radius of your Earthbind Totem by 10%.', 'Increases the health of your Stoneclaw Totem by 50% and the radius of your Earthbind Totem by 20%.'],
                    x: 0,
                    y: 1,
                    iconname: 'Spell_Nature_StoneClawTotem'
                }, {
                    i: 1640,
                    n: 'Elemental Warding',
                    maxRank: 3,
                    s: [28996, 28997, 28998],
                    d: ['Reduces damage taken from Fire, Frost and Nature effects by 4%.', 'Reduces damage taken from Fire, Frost and Nature effects by 7%.', 'Reduces damage taken from Fire, Frost and Nature effects by 10%.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Nature_SpiritArmor'
                }, {
                    i: 561,
                    n: 'Call of Flame',
                    maxRank: 3,
                    s: [16038, 16160, 16161],
                    d: ['Increases the damage done by your Fire Totems by 5%.', 'Increases the damage done by your Fire Totems by 10%.', 'Increases the damage done by your Fire Totems by 15%.'],
                    x: 2,
                    y: 1,
                    iconname: 'Spell_Fire_Immolation'
                }, {
                    i: 574,
                    n: 'Elemental Focus',
                    maxRank: 1,
                    s: [16164],
                    d: ['Gives you a 10% chance to enter a Clearcasting state after casting any Fire, Frost, or Nature damage spell.  The Clearcasting state reduces the mana cost of your next damage spell by 100%.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Shadow_ManaBurn'
                }, {
                    i: 575,
                    n: 'Reverberation',
                    maxRank: 5,
                    s: [16040, 16113, 16114, 16115, 16116],
                    d: ['Reduces the cooldown of your Shock spells by 0.2 sec.', 'Reduces the cooldown of your Shock spells by 0.4 sec.', 'Reduces the cooldown of your Shock spells by 0.6 sec.', 'Reduces the cooldown of your Shock spells by 0.8 sec.', 'Reduces the cooldown of your Shock spells by 1 sec.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Frost_FrostWard'
                }, {
                    i: 562,
                    n: 'Call of Thunder',
                    maxRank: 5,
                    s: [16041, 16117, 16118, 16119, 16120],
                    d: ['Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 1%.', 'Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 2%.', 'Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 3%.', 'Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 4%.', 'Increases the critical strike chance of your Lightning Bolt and Chain Lightning spells by an additional 6%.'],
                    x: 2,
                    y: 2,
                    iconname: 'Spell_Nature_CallStorm'
                }, {
                    i: 567,
                    n: 'Improved Fire Totems',
                    maxRank: 2,
                    s: [16086, 16544],
                    d: ['Reduces the delay before your Fire Nova Totem activates by 1 sec. and decreases the threat generated by your Magma Totem by 25%.', 'Reduces the delay before your Fire Nova Totem activates by 2 sec. and decreases the threat generated by your Magma Totem by 50%.'],
                    x: 0,
                    y: 3,
                    iconname: 'Spell_Fire_SealOfFire'
                }, {
                    i: 1642,
                    n: 'Eye of the Storm',
                    maxRank: 3,
                    s: [29062, 29064, 29065],
                    d: ['Gives you a 33% chance to gain the Focused Casting effect that lasts for 6 sec after being the victim of a melee or ranged critical strike.  The Focused Casting effect prevents you from losing casting time when taking damage.', 'Gives you a 66% chance to gain the Focused Casting effect that lasts for 6 sec after being the victim of a melee or ranged critical strike.  The Focused Casting effect prevents you from losing casting time when taking damage.', 'Gives you a 100% chance to gain the Focused Casting effect that lasts for 6 sec after being the victim of a melee or ranged critical strike.  The Focused Casting effect prevents you from losing casting time when taking damage.'],
                    x: 1,
                    y: 3,
                    iconname: 'Spell_Nature_EyeOfTheStorm'
                }, {
                    i: 1645,
                    n: 'Elemental Devastation',
                    maxRank: 3,
                    s: [30160, 29179, 29180],
                    d: ['Your offensive spell crits will increase your chance to get a critical strike with melee attacks by 3% for 10 sec.', 'Your offensive spell crits will increase your chance to get a critical strike with melee attacks by 6% for 10 sec.', 'Your offensive spell crits will increase your chance to get a critical strike with melee attacks by 9% for 10 sec.'],
                    x: 3,
                    y: 3,
                    iconname: 'Spell_Fire_ElementalDevastation'
                }, {
                    i: 1641,
                    n: 'Storm Reach',
                    maxRank: 2,
                    s: [28999, 29000],
                    d: ['Increases the range of your Lightning Bolt and Chain Lightning spells by 3 yards.', 'Increases the range of your Lightning Bolt and Chain Lightning spells by 6 yards.'],
                    x: 0,
                    y: 4,
                    iconname: 'Spell_Nature_StormReach'
                }, {
                    i: 565,
                    n: 'Elemental Fury',
                    maxRank: 1,
                    s: [16089],
                    d: ['Increases the critical strike damage bonus of your Searing, Magma, and Fire Nova Totems and your Fire, Frost, and Nature spells by 100%.'],
                    x: 1,
                    y: 4,
                    iconname: 'Spell_Fire_Volcano'
                }, {
                    i: 721,
                    n: 'Lightning Mastery',
                    maxRank: 5,
                    s: [16578, 16579, 16580, 16581, 16582],
                    d: ['Reduces the cast time of your Lightning Bolt and Chain Lightning spells by 0.2 sec.', 'Reduces the cast time of your Lightning Bolt and Chain Lightning spells by 0.4 sec.', 'Reduces the cast time of your Lightning Bolt and Chain Lightning spells by 0.6 sec.', 'Reduces the cast time of your Lightning Bolt and Chain Lightning spells by 0.8 sec.', 'Reduces the cast time of your Lightning Bolt and Chain Lightning spells by 1 sec.'],
                    x: 2,
                    y: 5,
                    r: [7, 5],
                    iconname: 'Spell_Lightning_LightningBolt01'
                }, {
                    i: 573,
                    n: 'Elemental Mastery',
                    maxRank: 1,
                    s: [16166],
                    d: ['When activated, this spell gives your next Fire, Frost, or Nature damage spell a 100% critical strike chance and reduces the mana cost by 100%.'],
                    x: 1,
                    y: 6,
                    r: [12, 1],
                    iconname: 'Spell_Nature_WispHeal'
                }]
            }, {
                n: 'Enhancement',
                t: [{
                    i: 614,
                    n: 'Ancestral Knowledge',
                    maxRank: 5,
                    s: [17485, 17486, 17487, 17488, 17489],
                    d: ['Increases your maximum Mana by 1%.', 'Increases your maximum Mana by 2%.', 'Increases your maximum Mana by 3%.', 'Increases your maximum Mana by 4%.', 'Increases your maximum Mana by 5%.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Shadow_GrimWard'
                }, {
                    i: 612,
                    n: 'Shield Specialization',
                    maxRank: 5,
                    s: [16253, 16298, 16299, 16300, 16301],
                    d: ['Increases your chance to block attacks with a shield by 1% and increases the amount blocked by 5%.', 'Increases your chance to block attacks with a shield by 2% and increases the amount blocked by 10%.', 'Increases your chance to block attacks with a shield by 3% and increases the amount blocked by 15%.', 'Increases your chance to block attacks with a shield by 4% and increases the amount blocked by 20%.', 'Increases your chance to block attacks with a shield by 5% and increases the amount blocked by 25%.'],
                    x: 2,
                    y: 0,
                    iconname: 'INV_Shield_06'
                }, {
                    i: 609,
                    n: 'Guardian Totems',
                    maxRank: 2,
                    s: [16258, 16293],
                    d: ['Increases the amount of damage reduced by your Stoneskin Totem and Windwall Totem by 10% and reduces the cooldown of your Grounding Totem by 1 sec.', 'Increases the amount of damage reduced by your Stoneskin Totem and Windwall Totem by 20% and reduces the cooldown of your Grounding Totem by 2 sec.'],
                    x: 0,
                    y: 1,
                    iconname: 'Spell_Nature_StoneSkinTotem'
                }, {
                    i: 613,
                    n: 'Thundering Strikes',
                    maxRank: 5,
                    s: [16255, 16302, 16303, 16304, 16305],
                    d: ['Improves your chance to get a critical strike with your weapon attacks by 1%.', 'Improves your chance to get a critical strike with your weapon attacks by 2%.', 'Improves your chance to get a critical strike with your weapon attacks by 3%.', 'Improves your chance to get a critical strike with your weapon attacks by 4%.', 'Improves your chance to get a critical strike with your weapon attacks by 5%.'],
                    x: 1,
                    y: 1,
                    iconname: 'Ability_ThunderBolt'
                }, {
                    i: 605,
                    n: 'Improved Ghost Wolf',
                    maxRank: 2,
                    s: [16262, 16287],
                    d: ['Reduces the cast time of your Ghost Wolf spell by 1 sec.', 'Reduces the cast time of your Ghost Wolf spell by 2 sec.'],
                    x: 2,
                    y: 1,
                    iconname: 'Spell_Nature_SpiritWolf'
                }, {
                    i: 607,
                    n: 'Improved Lightning Shield',
                    maxRank: 3,
                    s: [16261, 16290, 16291],
                    d: ['Increases the damage done by your Lightning Shield orbs by 5%.', 'Increases the damage done by your Lightning Shield orbs by 10%.', 'Increases the damage done by your Lightning Shield orbs by 15%.'],
                    x: 3,
                    y: 1,
                    iconname: 'Spell_Nature_LightningShield'
                }, {
                    i: 610,
                    n: 'Enhancing Totems',
                    maxRank: 2,
                    s: [16259, 16295],
                    d: ['Increases the effect of your Strength of Earth and Grace of Air Totems by 8%.', 'Increases the effect of your Strength of Earth and Grace of Air Totems by 15%.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Nature_EarthBindTotem'
                }, {
                    i: 617,
                    n: 'Two-Handed Axes and Maces',
                    maxRank: 1,
                    s: [16269],
                    d: ['Allows you to use Two-Handed Axes and Two-Handed Maces.'],
                    x: 2,
                    y: 2,
                    iconname: 'INV_Axe_10'
                }, {
                    i: 601,
                    n: 'Anticipation',
                    maxRank: 5,
                    s: [16254, 16271, 16272, 16273, 16274],
                    d: ['Increases your chance to dodge by an additional 1%.', 'Increases your chance to dodge by an additional 2%.', 'Increases your chance to dodge by an additional 3%.', 'Increases your chance to dodge by an additional 4%.', 'Increases your chance to dodge by an additional 5%.'],
                    x: 3,
                    y: 2,
                    iconname: 'Spell_Nature_MirrorImage'
                }, {
                    i: 602,
                    n: 'Flurry',
                    maxRank: 5,
                    s: [16256, 16281, 16282, 16283, 16284],
                    d: ['Increases your attack speed by 10% for your next 3 swings after dealing a critical strike.', 'Increases your attack speed by 15% for your next 3 swings after dealing a critical strike.', 'Increases your attack speed by 20% for your next 3 swings after dealing a critical strike.', 'Increases your attack speed by 25% for your next 3 swings after dealing a critical strike.', 'Increases your attack speed by 30% for your next 3 swings after dealing a critical strike.'],
                    x: 1,
                    y: 3,
                    r: [3, 5],
                    iconname: 'Ability_GhoulFrenzy'
                }, {
                    i: 615,
                    n: 'Toughness',
                    maxRank: 5,
                    s: [16252, 16306, 16307, 16308, 16309],
                    d: ['Increases your armor value from items by 2%.', 'Increases your armor value from items by 4%.', 'Increases your armor value from items by 6%.', 'Increases your armor value from items by 8%.', 'Increases your armor value from items by 10%.'],
                    x: 2,
                    y: 3,
                    iconname: 'Spell_Holy_Devotion'
                }, {
                    i: 1647,
                    n: 'Improved Weapon Totems',
                    maxRank: 2,
                    s: [29192, 29193],
                    d: ['Increases the melee attack power bonus of your Windfury Totem by 15% and increases the damage caused by your Flametongue Totem by 6%.', 'Increases the melee attack power bonus of your Windfury Totem by 30% and increases the damage caused by your Flametongue Totem by 12%.'],
                    x: 0,
                    y: 4,
                    iconname: 'Spell_Fire_EnchantWeapon'
                }, {
                    i: 611,
                    n: 'Elemental Weapons',
                    maxRank: 3,
                    s: [16266, 29079, 29080],
                    d: ['Increases the melee attack power bonus of your Rockbiter Weapon by 7%, your Windfury Weapon effect by 13% and increases the damage caused by your Flametongue Weapon and Frostbrand Weapon by 5%.', 'Increases the melee attack power bonus of your Rockbiter Weapon by 14%, your Windfury Weapon effect by 27% and increases the damage caused by your Flametongue Weapon and Frostbrand Weapon by 10%.', 'Increases the melee attack power bonus of your Rockbiter Weapon by 20%, your Windfury Weapon effect by 40% and increases the damage caused by your Flametongue Weapon and Frostbrand Weapon by 15%.'],
                    x: 1,
                    y: 4,
                    iconname: 'Spell_Fire_FlameTounge'
                }, {
                    i: 616,
                    n: 'Parry',
                    maxRank: 1,
                    s: [16268],
                    d: ['Gives a chance to parry enemy melee attacks.'],
                    x: 2,
                    y: 4,
                    iconname: 'Ability_Parry'
                }, {
                    i: 1643,
                    n: 'Weapon Mastery',
                    maxRank: 5,
                    s: [29082, 29084, 29086, 29087, 29088],
                    d: ['Increases the damage you deal with all weapons by 2%.', 'Increases the damage you deal with all weapons by 4%.', 'Increases the damage you deal with all weapons by 6%.', 'Increases the damage you deal with all weapons by 8%.', 'Increases the damage you deal with all weapons by 10%.'],
                    x: 2,
                    y: 5,
                    iconname: 'Ability_Hunter_SwiftStrike'
                }, {
                    i: 901,
                    n: 'Stormstrike',
                    maxRank: 1,
                    s: [17364],
                    d: ['Gives you an extra attack.  In addition, the next 2 sources of Nature damage dealt to the target are increased by 20%.  Lasts 12 sec.'],
                    x: 1,
                    y: 6,
                    r: [12, 3],
                    iconname: 'Spell_Holy_SealOfMight'
                }]
            }, {
                n: 'Restoration',
                t: [{
                    i: 586,
                    n: 'Improved Healing Wave',
                    maxRank: 5,
                    s: [16182, 16226, 16227, 16228, 16229],
                    d: ['Reduces the casting time of your Healing Wave spell by 0.1 sec.', 'Reduces the casting time of your Healing Wave spell by 0.2 sec.', 'Reduces the casting time of your Healing Wave spell by 0.3 sec.', 'Reduces the casting time of your Healing Wave spell by 0.4 sec.', 'Reduces the casting time of your Healing Wave spell by 0.5 sec.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Nature_MagicImmunity'
                }, {
                    i: 593,
                    n: 'Tidal Focus',
                    maxRank: 5,
                    s: [16179, 16214, 16215, 16216, 16217],
                    d: ['Reduces the Mana cost of your healing spells by 1%.', 'Reduces the Mana cost of your healing spells by 2%.', 'Reduces the Mana cost of your healing spells by 3%.', 'Reduces the Mana cost of your healing spells by 4%.', 'Reduces the Mana cost of your healing spells by 5%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Frost_ManaRecharge'
                }, {
                    i: 589,
                    n: 'Improved Reincarnation',
                    maxRank: 2,
                    s: [16184, 16209],
                    d: ['Reduces the cooldown of your Reincarnation spell by 10 min and increases the amount of health and mana you reincarnate with by an additional 10%.', 'Reduces the cooldown of your Reincarnation spell by 20 min and increases the amount of health and mana you reincarnate with by an additional 20%.'],
                    x: 0,
                    y: 1,
                    iconname: 'Spell_Nature_Reincarnation'
                }, {
                    i: 581,
                    n: 'Ancestral Healing',
                    maxRank: 3,
                    s: [16176, 16235, 16240],
                    d: ["Increases your target's armor value by 8% for 15 sec after getting a critical effect from one of your healing spells.", "Increases your target's armor value by 16% for 15 sec after getting a critical effect from one of your healing spells.", "Increases your target's armor value by 25% for 15 sec after getting a critical effect from one of your healing spells."],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Nature_UndyingStrength'
                }, {
                    i: 595,
                    n: 'Totemic Focus',
                    maxRank: 5,
                    s: [16173, 16222, 16223, 16224, 16225],
                    d: ['Reduces the Mana cost of your totems by 5%.', 'Reduces the Mana cost of your totems by 10%.', 'Reduces the Mana cost of your totems by 15%.', 'Reduces the Mana cost of your totems by 20%.', 'Reduces the Mana cost of your totems by 25%.'],
                    x: 2,
                    y: 1,
                    iconname: 'Spell_Nature_MoonGlow'
                }, {
                    i: 583,
                    n: "Nature's Guidance",
                    maxRank: 3,
                    s: [16180, 16196, 16198],
                    d: ['Increases your chance to hit with melee attacks and spells by 1%.', 'Increases your chance to hit with melee attacks and spells by 2%.', 'Increases your chance to hit with melee attacks and spells by 3%.'],
                    x: 0,
                    y: 2,
                    iconname: 'Spell_Frost_Stun'
                }, {
                    i: 587,
                    n: 'Healing Focus',
                    maxRank: 5,
                    s: [16181, 16230, 16232, 16233, 16234],
                    d: ['Gives you a 14% chance to avoid interruption caused by damage while casting any healing spell.', 'Gives you a 28% chance to avoid interruption caused by damage while casting any healing spell.', 'Gives you a 42% chance to avoid interruption caused by damage while casting any healing spell.', 'Gives you a 56% chance to avoid interruption caused by damage while casting any healing spell.', 'Gives you a 70% chance to avoid interruption caused by damage while casting any healing spell.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Nature_HealingWaveLesser'
                }, {
                    i: 582,
                    n: 'Totemic Mastery',
                    maxRank: 1,
                    s: [16189],
                    d: ['The radius of your totems that affect friendly targets is increased to 30 yd.'],
                    x: 2,
                    y: 2,
                    iconname: 'Spell_Nature_NullWard'
                }, {
                    i: 1646,
                    n: 'Healing Grace',
                    maxRank: 3,
                    s: [29187, 29189, 29191],
                    d: ['Reduces the threat generated by your healing spells by 5%.', 'Reduces the threat generated by your healing spells by 10%.', 'Reduces the threat generated by your healing spells by 15%.'],
                    x: 3,
                    y: 2,
                    iconname: 'Spell_Nature_HealingTouch'
                }, {
                    i: 588,
                    n: 'Restorative Totems',
                    maxRank: 5,
                    s: [16187, 16205, 16206, 16207, 16208],
                    d: ['Increases the effect of your Mana Spring and Healing Stream Totems by 5%.', 'Increases the effect of your Mana Spring and Healing Stream Totems by 10%.', 'Increases the effect of your Mana Spring and Healing Stream Totems by 15%.', 'Increases the effect of your Mana Spring and Healing Stream Totems by 20%.', 'Increases the effect of your Mana Spring and Healing Stream Totems by 25%.'],
                    x: 1,
                    y: 3,
                    iconname: 'Spell_Nature_ManaRegenTotem'
                }, {
                    i: 594,
                    n: 'Tidal Mastery',
                    maxRank: 5,
                    s: [16194, 16218, 16219, 16220, 16221],
                    d: ['Increases the critical effect chance of your healing and lightning spells by 1%.', 'Increases the critical effect chance of your healing and lightning spells by 2%.', 'Increases the critical effect chance of your healing and lightning spells by 3%.', 'Increases the critical effect chance of your healing and lightning spells by 4%.', 'Increases the critical effect chance of your healing and lightning spells by 5%.'],
                    x: 2,
                    y: 3,
                    iconname: 'Spell_Nature_Tranquility'
                }, {
                    i: 1648,
                    n: 'Healing Way',
                    maxRank: 3,
                    s: [29206, 29205, 29202],
                    d: ['Your Healing Wave spells have a 33% chance to increase the effect of subsequent Healing Wave spells on that target by 6% for 15 sec.  This effect will stack up to 15001 times.', 'Your Healing Wave spells have a 66% chance to increase the effect of subsequent Healing Wave spells on that target by 6% for 15 sec.  This effect will stack up to 15001 times.', 'Your Healing Wave spells have a 100% chance to increase the effect of subsequent Healing Wave spells on that target by 6% for 15 sec.  This effect will stack up to 15001 times.'],
                    x: 0,
                    y: 4,
                    iconname: 'Spell_Nature_HealingWay'
                }, {
                    i: 591,
                    n: "Nature's Swiftness",
                    maxRank: 1,
                    s: [16188],
                    d: ['When activated, your next Nature spell with a casting time less than 10 sec. becomes an instant cast spell.'],
                    x: 2,
                    y: 4,
                    iconname: 'Spell_Nature_RavenForm'
                }, {
                    i: 592,
                    n: 'Purification',
                    maxRank: 5,
                    s: [16178, 16210, 16211, 16212, 16213],
                    d: ['Increases the effectiveness of your healing spells by 2%.', 'Increases the effectiveness of your healing spells by 4%.', 'Increases the effectiveness of your healing spells by 6%.', 'Increases the effectiveness of your healing spells by 8%.', 'Increases the effectiveness of your healing spells by 10%.'],
                    x: 2,
                    y: 5,
                    iconname: 'Spell_Frost_WizardMark'
                }, {
                    i: 590,
                    n: 'Mana Tide Totem',
                    maxRank: 1,
                    s: [16190],
                    d: ['Summons a Mana Tide Totem with 5 health at the feet of the caster for 12 sec that restores 170 mana every 3 seconds to group members within 20 yards.'],
                    x: 1,
                    y: 6,
                    r: [9, 5],
                    iconname: 'Spell_Frost_SummonWaterElemental'
                }]
            }]
        },
        {
            name: 'warrior'
            tree_talents: [{
                n: 'Arms',
                t: [{
                    i: 124,
                    n: 'Improved Heroic Strike',
                    maxRank: 3,
                    s: [12282, 12663, 12664],
                    d: ['Reduces the cost of your Heroic Strike ability by 1 rage point.', 'Reduces the cost of your Heroic Strike ability by 2 rage points.', 'Reduces the cost of your Heroic Strike ability by 3 rage points.'],
                    x: 0,
                    y: 0,
                    iconname: 'Ability_Rogue_Ambush'
                }, {
                    i: 130,
                    n: 'Deflection',
                    maxRank: 5,
                    s: [16462, 16463, 16464, 16465, 16466],
                    d: ['Increases your Parry chance by 1%.', 'Increases your Parry chance by 2%.', 'Increases your Parry chance by 3%.', 'Increases your Parry chance by 4%.', 'Increases your Parry chance by 5%.'],
                    x: 1,
                    y: 0,
                    iconname: 'Ability_Parry'
                }, {
                    i: 127,
                    n: 'Improved Rend',
                    maxRank: 3,
                    s: [12286, 12658, 12659],
                    d: ['Increases the bleed damage done by your Rend ability by 15%.', 'Increases the bleed damage done by your Rend ability by 25%.', 'Increases the bleed damage done by your Rend ability by 35%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Ability_Gouge'
                }, {
                    i: 126,
                    n: 'Improved Charge',
                    maxRank: 2,
                    s: [12285, 12697],
                    d: ['Increases the amount of rage generated by your Charge ability by 3.', 'Increases the amount of rage generated by your Charge ability by 6.'],
                    x: 0,
                    y: 1,
                    iconname: 'Ability_Warrior_Charge'
                }, {
                    i: 641,
                    n: 'Tactical Mastery',
                    maxRank: 5,
                    s: [12295, 12676, 12677, 12678, 12679],
                    d: ['You retain up to 5 of your rage points when you change stances.', 'You retain up to 10 of your rage points when you change stances.', 'You retain up to 15 of your rage points when you change stances.', 'You retain up to 20 of your rage points when you change stances.', 'You retain up to 25 of your rage points when you change stances.'],
                    x: 1,
                    y: 1,
                    iconname: 'Spell_Nature_EnchantArmor'
                }, {
                    i: 128,
                    n: 'Improved Thunder Clap',
                    maxRank: 3,
                    s: [12287, 12665, 12666],
                    d: ['Reduces the cost of your Thunder Clap ability by 1 rage point.', 'Reduces the cost of your Thunder Clap ability by 2 rage points.', 'Reduces the cost of your Thunder Clap ability by 4 rage points.'],
                    x: 3,
                    y: 1,
                    iconname: 'Ability_ThunderClap'
                }, {
                    i: 131,
                    n: 'Improved Overpower',
                    maxRank: 2,
                    s: [12290, 12963],
                    d: ['Increases the critical strike chance of your Overpower ability by 25%.', 'Increases the critical strike chance of your Overpower ability by 50%.'],
                    x: 0,
                    y: 2,
                    iconname: 'INV_Sword_05'
                }, {
                    i: 137,
                    n: 'Anger Management',
                    maxRank: 1,
                    s: [12296],
                    d: ['Increases the time required for your rage to decay while out of combat by 30%.'],
                    x: 1,
                    y: 2,
                    r: [4, 5],
                    iconname: 'Spell_Holy_BlessingOfStamina'
                }, {
                    i: 121,
                    n: 'Deep Wounds',
                    maxRank: 3,
                    s: [12834, 12849, 12867],
                    d: ["Your critical strikes cause the opponent to bleed, dealing 20% of your melee weapon's average damage over 12 sec.", "Your critical strikes cause the opponent to bleed, dealing 40% of your melee weapon's average damage over 12 sec.", "Your critical strikes cause the opponent to bleed, dealing 60% of your melee weapon's average damage over 12 sec."],
                    x: 2,
                    y: 2,
                    r: [2, 3],
                    iconname: 'Ability_BackStab'
                }, {
                    i: 136,
                    n: 'Two-Handed Weapon Specialization',
                    maxRank: 5,
                    s: [12163, 12711, 12712, 12713, 12714],
                    d: ['Increases the damage you deal with two-handed melee weapons by 1%.', 'Increases the damage you deal with two-handed melee weapons by 2%.', 'Increases the damage you deal with two-handed melee weapons by 3%.', 'Increases the damage you deal with two-handed melee weapons by 4%.', 'Increases the damage you deal with two-handed melee weapons by 5%.'],
                    x: 1,
                    y: 3,
                    iconname: 'INV_Axe_09'
                }, {
                    i: 662,
                    n: 'Impale',
                    maxRank: 2,
                    s: [16493, 16494],
                    d: ['Increases the critical strike damage bonus of your abilities in Battle, Defensive, and Berserker stance by 10%.', 'Increases the critical strike damage bonus of your abilities in Battle, Defensive, and Berserker stance by 20%.'],
                    x: 2,
                    y: 3,
                    r: [8, 3],
                    iconname: 'Ability_SearingArrow'
                }, {
                    i: 132,
                    n: 'Axe Specialization',
                    maxRank: 5,
                    s: [12700, 12781, 12783, 12784, 12785],
                    d: ['Increases your chance to get a critical strike with Axes by 1%.', 'Increases your chance to get a critical strike with Axes by 2%.', 'Increases your chance to get a critical strike with Axes by 3%.', 'Increases your chance to get a critical strike with Axes by 4%.', 'Increases your chance to get a critical strike with Axes by 5%.'],
                    x: 0,
                    y: 4,
                    iconname: 'INV_Axe_06'
                }, {
                    i: 133,
                    n: 'Sweeping Strikes',
                    maxRank: 1,
                    s: [12292],
                    d: ['Your next 5 melee attacks strike an additional nearby opponent.'],
                    x: 1,
                    y: 4,
                    iconname: 'Ability_Rogue_SliceDice'
                }, {
                    i: 125,
                    n: 'Mace Specialization',
                    maxRank: 5,
                    s: [12284, 12701, 12702, 12703, 12704],
                    d: ['Gives you a 1% chance to stun your target for 3 sec with a Mace.', 'Gives you a 2% chance to stun your target for 3 sec with a Mace.', 'Gives you a 3% chance to stun your target for 3 sec with a Mace.', 'Gives you a 4% chance to stun your target for 3 sec with a Mace.', 'Gives you a 6% chance to stun your target for 3 sec with a Mace.'],
                    x: 2,
                    y: 4,
                    iconname: 'INV_Mace_01'
                }, {
                    i: 123,
                    n: 'Sword Specialization',
                    maxRank: 5,
                    s: [12281, 12812, 12813, 12814, 12815],
                    d: ['Gives you a 1% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 2% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 3% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 4% chance to get an extra attack on the same target after dealing damage with your Sword.', 'Gives you a 5% chance to get an extra attack on the same target after dealing damage with your Sword.'],
                    x: 3,
                    y: 4,
                    iconname: 'INV_Sword_27'
                }, {
                    i: 134,
                    n: 'Polearm Specialization',
                    maxRank: 5,
                    s: [12165, 12830, 12831, 12832, 12833],
                    d: ['Increases your chance to get a critical strike with Polearms by 1%.', 'Increases your chance to get a critical strike with Polearms by 2%.', 'Increases your chance to get a critical strike with Polearms by 3%.', 'Increases your chance to get a critical strike with Polearms by 4%.', 'Increases your chance to get a critical strike with Polearms by 5%.'],
                    x: 0,
                    y: 5,
                    iconname: 'INV_Weapon_Halbard_01'
                }, {
                    i: 129,
                    n: 'Improved Hamstring',
                    maxRank: 3,
                    s: [12289, 12668, 23695],
                    d: ['Gives your Hamstring ability a 5% chance to immobilize the target for 5 sec.', 'Gives your Hamstring ability a 10% chance to immobilize the target for 5 sec.', 'Gives your Hamstring ability a 15% chance to immobilize the target for 5 sec.'],
                    x: 2,
                    y: 5,
                    iconname: 'Ability_ShockWave'
                }, {
                    i: 135,
                    n: 'Mortal Strike',
                    maxRank: 1,
                    s: [12294],
                    d: ['A vicious strike that deals weapon damage plus 85 and wounds the target, reducing the effectiveness of any healing by 50% for 10 sec.'],
                    x: 1,
                    y: 6,
                    r: [12, 1],
                    iconname: 'Ability_Warrior_SavageBlow'
                }]
            }, {
                n: 'Fury',
                t: [{
                    i: 158,
                    n: 'Booming Voice',
                    maxRank: 5,
                    s: [12321, 12835, 12836, 12837, 12838],
                    d: ['Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 10%.', 'Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 20%.', 'Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 30%.', 'Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 40%.', 'Increases the area of effect and duration of your Battle Shout and Demoralizing Shout by 50%.'],
                    x: 1,
                    y: 0,
                    iconname: 'Spell_Nature_Purge'
                }, {
                    i: 157,
                    n: 'Cruelty',
                    maxRank: 5,
                    s: [12320, 12852, 12853, 12855, 12856],
                    d: ['Increases your chance to get a critical strike with melee weapons by 1%.', 'Increases your chance to get a critical strike with melee weapons by 2%.', 'Increases your chance to get a critical strike with melee weapons by 3%.', 'Increases your chance to get a critical strike with melee weapons by 4%.', 'Increases your chance to get a critical strike with melee weapons by 5%.'],
                    x: 2,
                    y: 0,
                    iconname: 'Ability_Rogue_Eviscerate'
                }, {
                    i: 161,
                    n: 'Improved Demoralizing Shout',
                    maxRank: 5,
                    s: [12324, 12876, 12877, 12878, 12879],
                    d: ['Increases the melee attack power reduction of your Demoralizing Shout by 8%.', 'Increases the melee attack power reduction of your Demoralizing Shout by 16%.', 'Increases the melee attack power reduction of your Demoralizing Shout by 24%.', 'Increases the melee attack power reduction of your Demoralizing Shout by 32%.', 'Increases the melee attack power reduction of your Demoralizing Shout by 40%.'],
                    x: 1,
                    y: 1,
                    iconname: 'Ability_Warrior_WarCry'
                }, {
                    i: 159,
                    n: 'Unbridled Wrath',
                    maxRank: 5,
                    s: [12322, 12999, 13000, 13001, 13002],
                    d: ['Gives you a 8% chance to generate an additional Rage point when you deal melee damage with a weapon.', 'Gives you a 16% chance to generate an additional Rage point when you deal melee damage with a weapon.', 'Gives you a 24% chance to generate an additional Rage point when you deal melee damage with a weapon.', 'Gives you a 32% chance to generate an additional Rage point when you deal melee damage with a weapon.', 'Gives you a 40% chance to generate an additional Rage point when you deal melee damage with a weapon.'],
                    x: 2,
                    y: 1,
                    iconname: 'Spell_Nature_StoneClawTotem'
                }, {
                    i: 166,
                    n: 'Improved Cleave',
                    maxRank: 3,
                    s: [12329, 12950, 20496],
                    d: ['Increases the bonus damage done by your Cleave ability by 40%.', 'Increases the bonus damage done by your Cleave ability by 80%.', 'Increases the bonus damage done by your Cleave ability by 120%.'],
                    x: 0,
                    y: 2,
                    iconname: 'Ability_Warrior_Cleave'
                }, {
                    i: 160,
                    n: 'Piercing Howl',
                    maxRank: 1,
                    s: [12323],
                    d: ['Causes all enemies near the warrior to be dazed, reducing movement speed by 50% for 6 sec.'],
                    x: 1,
                    y: 2,
                    iconname: 'Spell_Shadow_DeathScream'
                }, {
                    i: 661,
                    n: 'Blood Craze',
                    maxRank: 3,
                    s: [16487, 16489, 16492],
                    d: ['Regenerates 0% of your total Health over 6 sec after being the victim of a critical strike.', 'Regenerates 0% of your total Health over 6 sec after being the victim of a critical strike.', 'Regenerates 0% of your total Health over 6 sec after being the victim of a critical strike.'],
                    x: 2,
                    y: 2,
                    iconname: 'Spell_Shadow_SummonImp'
                }, {
                    i: 154,
                    n: 'Improved Battle Shout',
                    maxRank: 5,
                    s: [12318, 12857, 12858, 12860, 12861],
                    d: ['Increases the melee attack power bonus of your Battle Shout by 5%.', 'Increases the melee attack power bonus of your Battle Shout by 10%.', 'Increases the melee attack power bonus of your Battle Shout by 15%.', 'Increases the melee attack power bonus of your Battle Shout by 20%.', 'Increases the melee attack power bonus of your Battle Shout by 25%.'],
                    x: 3,
                    y: 2,
                    iconname: 'Ability_Warrior_BattleShout'
                }, {
                    i: 1581,
                    n: 'Dual Wield Specialization',
                    maxRank: 5,
                    s: [23584, 23585, 23586, 23587, 23588],
                    d: ['Increases the damage done by your offhand weapon by 5%.', 'Increases the damage done by your offhand weapon by 10%.', 'Increases the damage done by your offhand weapon by 15%.', 'Increases the damage done by your offhand weapon by 20%.', 'Increases the damage done by your offhand weapon by 25%.'],
                    x: 0,
                    y: 3,
                    iconname: 'Ability_DualWield'
                }, {
                    i: 1542,
                    n: 'Improved Execute',
                    maxRank: 2,
                    s: [20502, 20503],
                    d: ['Reduces the Rage cost of your Execute ability by 2.', 'Reduces the Rage cost of your Execute ability by 5.'],
                    x: 1,
                    y: 3,
                    iconname: 'INV_Sword_48'
                }, {
                    i: 155,
                    n: 'Enrage',
                    maxRank: 5,
                    s: [12317, 13045, 13046, 13047, 13048],
                    d: ['Gives you a 5% melee damage bonus for 12 sec up to a maximum of 12 swings after being the victim of a critical strike.', 'Gives you a 10% melee damage bonus for 12 sec up to a maximum of 12 swings after being the victim of a critical strike.', 'Gives you a 15% melee damage bonus for 12 sec up to a maximum of 12 swings after being the victim of a critical strike.', 'Gives you a 20% melee damage bonus for 12 sec up to a maximum of 12 swings after being the victim of a critical strike.', 'Gives you a 25% melee damage bonus for 12 sec up to a maximum of 12 swings after being the victim of a critical strike.'],
                    x: 2,
                    y: 3,
                    iconname: 'Spell_Shadow_UnholyFrenzy'
                }, {
                    i: 168,
                    n: 'Improved Slam',
                    maxRank: 5,
                    s: [12862, 12330, 20497, 20498, 20499],
                    d: ['Decreases the casting time of your Slam ability by 0.1 sec.', 'Decreases the casting time of your Slam ability by 0.2 sec.', 'Decreases the casting time of your Slam ability by 0.3 sec.', 'Decreases the casting time of your Slam ability by 0.4 sec.', 'Decreases the casting time of your Slam ability by 0.5 sec.'],
                    x: 0,
                    y: 4,
                    iconname: 'Ability_Warrior_DecisiveStrike'
                }, {
                    i: 165,
                    n: 'Death Wish',
                    maxRank: 1,
                    s: [12328],
                    d: ['When activated, increases your physical damage by 20% and makes you immune to Fear effects, but lowers your armor and all resistances by 20%.  Lasts 30 sec.'],
                    x: 1,
                    y: 4,
                    iconname: 'Spell_Shadow_DeathPact'
                }, {
                    i: 1543,
                    n: 'Improved Intercept',
                    maxRank: 2,
                    s: [20504, 20505],
                    d: ['Reduces the cooldown of your Intercept ability by 5 sec.', 'Reduces the cooldown of your Intercept ability by 10 sec.'],
                    x: 3,
                    y: 4,
                    iconname: 'Ability_Rogue_Sprint'
                }, {
                    i: 1541,
                    n: 'Improved Berserker Rage',
                    maxRank: 2,
                    s: [20500, 20501],
                    d: ['The Berserker Rage ability will generate 5 rage when used.', 'The Berserker Rage ability will generate 10 rage when used.'],
                    x: 0,
                    y: 5,
                    iconname: 'Spell_Nature_AncestralGuardian'
                }, {
                    i: 156,
                    n: 'Flurry',
                    maxRank: 5,
                    s: [12319, 12971, 12972, 12973, 12974],
                    d: ['Increases your attack speed by 10% for your next 3 swings after dealing a melee critical strike.', 'Increases your attack speed by 15% for your next 3 swings after dealing a melee critical strike.', 'Increases your attack speed by 20% for your next 3 swings after dealing a melee critical strike.', 'Increases your attack speed by 25% for your next 3 swings after dealing a melee critical strike.', 'Increases your attack speed by 30% for your next 3 swings after dealing a melee critical strike.'],
                    x: 2,
                    y: 5,
                    r: [10, 5],
                    iconname: 'Ability_GhoulFrenzy'
                }, {
                    i: 167,
                    n: 'Bloodthirst',
                    maxRank: 1,
                    s: [23881],
                    d: ['Instantly attack the target causing damage equal to 45% of your attack power.  In addition, the next 5 successful melee attacks will restore 10 health.  This effect lasts 8 sec.'],
                    x: 1,
                    y: 6,
                    r: [12, 1],
                    iconname: 'Spell_Nature_BloodLust'
                }]
            }, {
                n: 'Protection',
                t: [{
                    i: 1601,
                    n: 'Shield Specialization',
                    maxRank: 5,
                    s: [12298, 12724, 12725, 12726, 12727],
                    d: ['Increases your chance to block attacks with a shield by 1% and has a 20% chance to generate 1 rage when a block occurs.', 'Increases your chance to block attacks with a shield by 2% and has a 40% chance to generate 1 rage when a block occurs.', 'Increases your chance to block attacks with a shield by 3% and has a 60% chance to generate 1 rage when a block occurs.', 'Increases your chance to block attacks with a shield by 4% and has a 80% chance to generate 1 rage when a block occurs.', 'Increases your chance to block attacks with a shield by 5% and has a 100% chance to generate 1 rage when a block occurs.'],
                    x: 1,
                    y: 0,
                    iconname: 'INV_Shield_06'
                }, {
                    i: 138,
                    n: 'Anticipation',
                    maxRank: 5,
                    s: [12297, 12750, 12751, 12752, 12753],
                    d: ['Increases your Defense skill by 2.', 'Increases your Defense skill by 4.', 'Increases your Defense skill by 6.', 'Increases your Defense skill by 8.', 'Increases your Defense skill by 10.'],
                    x: 2,
                    y: 0,
                    iconname: 'Spell_Nature_MirrorImage'
                }, {
                    i: 142,
                    n: 'Improved Bloodrage',
                    maxRank: 2,
                    s: [12301, 12818],
                    d: ['Increases the instant Rage generated by your Bloodrage ability by 2.', 'Increases the instant Rage generated by your Bloodrage ability by 5.'],
                    x: 0,
                    y: 1,
                    iconname: 'Ability_Racial_BloodRage'
                }, {
                    i: 140,
                    n: 'Toughness',
                    maxRank: 5,
                    s: [12299, 12761, 12762, 12763, 12764],
                    d: ['Increases your armor value from items by 2%.', 'Increases your armor value from items by 4%.', 'Increases your armor value from items by 6%.', 'Increases your armor value from items by 8%.', 'Increases your armor value from items by 10%.'],
                    x: 2,
                    y: 1,
                    iconname: 'Spell_Holy_Devotion'
                }, {
                    i: 141,
                    n: 'Iron Will',
                    maxRank: 5,
                    s: [12300, 12959, 12960, 12961, 12962],
                    d: ['Increases your chance to resist Stun and Charm effects by an additional 3%.', 'Increases your chance to resist Stun and Charm effects by an additional 6%.', 'Increases your chance to resist Stun and Charm effects by an additional 9%.', 'Increases your chance to resist Stun and Charm effects by an additional 12%.', 'Increases your chance to resist Stun and Charm effects by an additional 15%.'],
                    x: 3,
                    y: 1,
                    iconname: 'Spell_Magic_MageArmor'
                }, {
                    i: 153,
                    n: 'Last Stand',
                    maxRank: 1,
                    s: [12975],
                    d: ['When activated, this ability temporarily grants you 30% of your maximum hit points for 20 seconds.  After the effect expires, the hit points are lost.'],
                    x: 0,
                    y: 2,
                    r: [2, 2],
                    iconname: 'Spell_Holy_AshesToAshes'
                }, {
                    i: 145,
                    n: 'Improved Shield Block',
                    maxRank: 3,
                    s: [12945, 12307, 12944],
                    d: ['Allows your Shield Block ability to block an additional attack and increases the duration by 0.5 second.', 'Allows your Shield Block ability to block an additional attack and increases the duration by 1 second.', 'Allows your Shield Block ability to block an additional attack and increases the duration by 2 seconds.'],
                    x: 1,
                    y: 2,
                    r: [0, 5],
                    iconname: 'Ability_Defend'
                }, {
                    i: 147,
                    n: 'Improved Revenge',
                    maxRank: 3,
                    s: [12797, 12799, 12800],
                    d: ['Gives your Revenge ability a 15% chance to stun the target for 3 sec.', 'Gives your Revenge ability a 30% chance to stun the target for 3 sec.', 'Gives your Revenge ability a 45% chance to stun the target for 3 sec.'],
                    x: 2,
                    y: 2,
                    iconname: 'Ability_Warrior_Revenge'
                }, {
                    i: 144,
                    n: 'Defiance',
                    maxRank: 5,
                    s: [12303, 12788, 12789, 12791, 12792],
                    d: ['Increases the threat generated by your attacks by 3% while in Defensive Stance.', 'Increases the threat generated by your attacks by 6% while in Defensive Stance.', 'Increases the threat generated by your attacks by 9% while in Defensive Stance.', 'Increases the threat generated by your attacks by 12% while in Defensive Stance.', 'Increases the threat generated by your attacks by 15% while in Defensive Stance.'],
                    x: 3,
                    y: 2,
                    iconname: 'Ability_Warrior_InnerRage'
                }, {
                    i: 146,
                    n: 'Improved Sunder Armor',
                    maxRank: 3,
                    s: [12308, 12810, 12811],
                    d: ['Reduces the cost of your Sunder Armor ability by 1 rage point.', 'Reduces the cost of your Sunder Armor ability by 2 rage points.', 'Reduces the cost of your Sunder Armor ability by 3 rage points.'],
                    x: 0,
                    y: 3,
                    iconname: 'Ability_Warrior_Sunder'
                }, {
                    i: 151,
                    n: 'Improved Disarm',
                    maxRank: 3,
                    s: [12313, 12804, 12807],
                    d: ['Increases the duration of your Disarm ability by 1 secs.', 'Increases the duration of your Disarm ability by 2 secs.', 'Increases the duration of your Disarm ability by 3 secs.'],
                    x: 1,
                    y: 3,
                    iconname: 'Ability_Warrior_Disarm'
                }, {
                    i: 143,
                    n: 'Improved Taunt',
                    maxRank: 2,
                    s: [12302, 12765],
                    d: ['Reduces the cooldown of your Taunt ability by 1 sec.', 'Reduces the cooldown of your Taunt ability by 2 sec.'],
                    x: 2,
                    y: 3,
                    iconname: 'Spell_Nature_Reincarnation'
                }, {
                    i: 150,
                    n: 'Improved Shield Wall',
                    maxRank: 2,
                    s: [12312, 12803],
                    d: ['Increases the effect duration of your Shield Wall ability by 3 secs.', 'Increases the effect duration of your Shield Wall ability by 5 secs.'],
                    x: 0,
                    y: 4,
                    iconname: 'Ability_Warrior_ShieldWall'
                }, {
                    i: 152,
                    n: 'Concussion Blow',
                    maxRank: 1,
                    s: [12809],
                    d: ['Stuns the opponent for 5 sec.'],
                    x: 1,
                    y: 4,
                    iconname: 'Ability_ThunderBolt'
                }, {
                    i: 149,
                    n: 'Improved Shield Bash',
                    maxRank: 2,
                    s: [12311, 12958],
                    d: ['Gives your Shield Bash ability a 50% chance to silence the target for 3 sec.', 'Gives your Shield Bash ability a 100% chance to silence the target for 3 sec.'],
                    x: 2,
                    y: 4,
                    iconname: 'Ability_Warrior_ShieldBash'
                }, {
                    i: 702,
                    n: 'One-Handed Weapon Specialization',
                    maxRank: 5,
                    s: [16538, 16539, 16540, 16541, 16542],
                    d: ['Increases the damage you deal with One-Handed Melee weapons by 2%.', 'Increases the damage you deal with One-Handed Melee weapons by 4%.', 'Increases the damage you deal with One-Handed Melee weapons by 6%.', 'Increases the damage you deal with One-Handed Melee weapons by 8%.', 'Increases the damage you deal with One-Handed Melee weapons by 10%.'],
                    x: 2,
                    y: 5,
                    iconname: 'INV_Sword_20'
                }, {
                    i: 148,
                    n: 'Shield Slam',
                    maxRank: 1,
                    s: [23922],
                    d: ['Slam the target with your shield, causing 225 to 236 damage, modified by your shield block value, and has a 50% chance of dispelling 1 magic effect on the target.  Also causes a high amount of threat.'],
                    x: 1,
                    y: 6,
                    r: [13, 1],
                    iconname: 'INV_Shield_05'
                }]
            }]
        }
    ]
}
