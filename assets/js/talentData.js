const talentData = {
    classes: [
        {
            name: 'warlock',
            tree_talents: [{
                name: 'Affliction',
                talents: [{
                    name: "Supression",
                    image: "warlock/suppresion.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 0
                },
                {
                    name: "Improved Corruption",
                    image: "warlock/improved_corruption.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 0
                },
                {
                    name: "Improved Curse of Weakness",
                    image: "warlock/improved_curse_of_weakness.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 3,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Drain Soul",
                    image: "warlock/improved_drain_soul.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Life Tap",
                    image: "warlock/improved_life_tap.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Drain Life",
                    image: "warlock/improved_drain_life.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Curse of Agony",
                    image: "warlock/improved_curse_of_agony.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 3,
                    requiredTalentPoints: 10
                },
                {
                    name: "Fel Concentration",
                    image: "warlock/fel_concentration.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 10
                },
                {
                    name: "Amplify Curse",
                    image: "warlock/amplify_curse.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 1,
                    requiredTalentPoints: 10,
                    unlocks: "curse_of_exhaustion"
                },
                {
                    name: "Grim Reach",
                    image: "warlock/grim_reach.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 15
                },
                {
                    name: "Nightfall",
                    image: "warlock/nightfall.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 15
                },
                {
                    name: "Improved Drain Mana",
                    image: "warlock/improved_drain_mana.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 15
                },
                {
                    name: "Siphon Life",
                    image: "warlock/siphon_life.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 1,
                    requiredTalentPoints: 20,
                    unlocks: "shadow_mastery"
                },
                {
                    name: "Curse of Exhaustion",
                    image: "warlock/curse_of_exhaustion.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 1,
                    requiredTalentPoints: 20,
                    locked: true,
                    unlocks: "improved_curse_of_exhaustion"
                },
                {
                    name: "Improved Curse of Exhaustion",
                    image: "warlock/curse_of_exhaustion.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 4,
                    requiredTalentPoints: 20,
                    locked: true
                },
                {
                    name: "Shadow Mastery",
                    image: "warlock/shadow_mastery.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 25,
                    locked: true
                },
                {
                    name: "Dark Pact",
                    image: "warlock/dark_pact.jpg",
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
                    name: "Supression",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 0
                },
                {
                    name: "Improved Corruption",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 0
                },
                {
                    name: "Improved Curse of Weakness",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 3,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Drain Soul",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Life Tap",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Drain Life",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Curse of Agony",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 3,
                    requiredTalentPoints: 10
                },
                {
                    name: "Fel Concentration",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 10
                },
                {
                    name: "Amplify Curse",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 1,
                    requiredTalentPoints: 10,
                    unlocks: "curse_of_exhaustion"
                },
                {
                    name: "Grim Reach",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 15
                },
                {
                    name: "Nightfall",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 15
                },
                {
                    name: "Improved Drain Mana",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 15
                },
                {
                    name: "Siphon Life",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 1,
                    requiredTalentPoints: 20,
                    unlocks: "shadow_mastery"
                },
                {
                    name: "Curse of Exhaustion",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 1,
                    requiredTalentPoints: 20,
                    locked: true,
                    unlocks: "improved_curse_of_exhaustion"
                },
                {
                    name: "Improved Curse of Exhaustion",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 4,
                    requiredTalentPoints: 20,
                    locked: true
                },
                {
                    name: "Shadow Mastery",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 25,
                    locked: true
                },
                {
                    name: "Dark Pact",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 30
                }]
            },
            {
                name: 'Destruction',
                talents: [{
                    name: "Supression",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 0
                },
                {
                    name: "Improved Corruption",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 0
                },
                {
                    name: "Improved Curse of Weakness",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 3,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Drain Soul",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Life Tap",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Drain Life",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 5
                },
                {
                    name: "Improved Curse of Agony",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 3,
                    requiredTalentPoints: 10
                },
                {
                    name: "Fel Concentration",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 10
                },
                {
                    name: "Amplify Curse",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 1,
                    requiredTalentPoints: 10,
                    unlocks: "curse_of_exhaustion"
                },
                {
                    name: "Grim Reach",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 15
                },
                {
                    name: "Nightfall",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 15
                },
                {
                    name: "Improved Drain Mana",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 2,
                    requiredTalentPoints: 15
                },
                {
                    name: "Siphon Life",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 1,
                    requiredTalentPoints: 20,
                    unlocks: "shadow_mastery"
                },
                {
                    name: "Curse of Exhaustion",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 1,
                    requiredTalentPoints: 20,
                    locked: true,
                    unlocks: "improved_curse_of_exhaustion"
                },
                {
                    name: "Improved Curse of Exhaustion",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 4,
                    requiredTalentPoints: 20,
                    locked: true
                },
                {
                    name: "Shadow Mastery",
                    image: "test_icon.jpg",
                    description:
                        "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    invested: 0,
                    maxRank: 5,
                    requiredTalentPoints: 25,
                    locked: true
                }]
            }]

        }
    ]
}