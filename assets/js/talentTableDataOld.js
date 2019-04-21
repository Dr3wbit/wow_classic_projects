
const tableFormat = {
	druid: {
		trees: [
			{
				name: 'Balance',
				data: [
					[1, 1, 1, 0],
					[1, 1, 1, 1],
					[1, 0, 1, 1],
					[0, 1, 1, 0],
					[0, 1, 1, 0],
					[0, 1, 0, 0],
					[0, 1, 0, 0]
				]
			},
			{
				name: 'Feral Combat',
				data: [
					[0, 1, 1, 0],
					[1, 1, 1, 0],
					[1, 1, 1, 0],
					[1, 1, 1, 1],
					[1, 0, 1, 0],
					[0, 1, 0, 0],
					[0, 1, 0, 0]
				]
			},
			{
				name: 'Restoration',
				data: [
					[0, 1, 1, 0],
					[1, 1, 1, 0],
					[0, 1, 1, 1],
					[0, 1, 0, 1],
					[1, 0, 1, 1],
					[0, 0, 1, 0],
					[0, 1, 0, 0]
				]
			}
		]
	},
	hunter: {
		trees: [{
			name: 'Beast Mastery',
			data: [
				[0, 1, 1, 0],
				[1, 1, 1, 1],
				[1, 1, 1, 0],
				[0, 1, 1, 0],
				[1, 1, 0, 1],
				[0, 0, 1, 0],
				[0, 1, 0, 0]
			]
		},
		{
			name: 'Marksmanship',
			data: [
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[1, 1, 0, 1],
				[0, 1, 1, 0],
				[1, 1, 1, 0],
				[0, 0, 1, 0],
				[0, 1, 0, 0]
			]
		},
		{
			name: 'Survival',
			data: [
				[1, 1, 1, 0],
				[1, 1, 1, 0],
				[1, 1, 1, 0],
				[1, 1, 0, 1],
				[0, 1, 1, 0],
				[0, 0, 1, 0],
				[0, 1, 0, 0]
			]
		}
		]
	},
	mage: {
		trees: [
			{
				name: 'Arcane',
				data: [
					[1, 1, 1, 0],
					[1, 1, 1, 0],
					[1, 1, 1, 0],
					[0, 1, 0, 1],
					[0, 1, 1, 0],
					[0, 1, 0, 0],
					[0, 1, 0, 0]
				]
			},
			{
				name: 'Fire',
				data: [
					[0, 1, 1, 0],
					[1, 1, 1, 0],
					[1, 1, 1, 1],
					[1, 1, 0, 1],
					[0, 1, 1, 0],
					[0, 0, 1, 0],
					[0, 1, 0, 0]
				]
			},
			{
				name: 'Frost',
				data: [
					[1, 1, 1, 0],
					[1, 1, 1, 1],
					[1, 1, 0, 1],
					[1, 1, 1, 0],
					[0, 1, 1, 0],
					[0, 0, 1, 0],
					[0, 1, 0, 0]
				]
			},

		]
	},
	paladin: {
		trees: [
			{
				name: 'Holy',
				data: [
					[0, 1, 1, 0],
					[0, 1, 1, 0],
					[1, 1, 1, 1],
					[0, 1, 1, 0],
					[0, 1, 1, 0],
					[0, 0, 1, 0],
					[0, 1, 0, 0]
				]
			},
			{
				name: 'Protection',
				data: [
					[0, 1, 1, 0],
					[1, 1, 0, 1],
					[1, 1, 1, 1],
					[0, 1, 1, 0],
					[0, 1, 1, 0],
					[0, 0, 1, 0],
					[0, 1, 0, 0]
				]
			},
			{
				name: 'Retribution',
				data: [
					[0, 1, 1, 0],
					[1, 1, 1, 0],
					[1, 1, 1, 1],
					[1, 0, 1, 0],
					[1, 0, 1, 0],
					[0, 1, 0, 0],
					[0, 1, 0, 0]
				]
			},

		]
	},
	priest: {
		trees: [
			{
				name: 'Dicipline',
				data: [
					[0, 1, 1, 0],
					[1, 1, 1, 1],
					[0, 1, 1, 0],
					[1, 1, 0, 1],
					[0, 1, 1, 0],
					[0, 0, 1, 0],
					[0, 1, 0, 0]
				]
			},
			{
				name: 'Holy',
				data: [
					[1, 1, 1, 0],
					[0, 1, 1, 0],
					[1, 1, 0, 1],
					[1, 1, 1, 0],
					[1, 1, 1, 0],
					[0, 0, 1, 0],
					[0, 1, 0, 0]
				]
			},
			{
				name: 'Shadow',
				data: [
					[0, 1, 1, 0],
					[1, 1, 1, 0],
					[1, 1, 1, 0],
					[0, 1, 1, 1],
					[1, 1, 1, 0],
					[0, 0, 1, 0],
					[0, 1, 0, 0]
				]
			},
		]
	},

	rogue: {
		trees: [
			{
				name: 'Assassination',
				data: [
					[1, 1, 1, 0],
					[1, 1, 0, 1],
					[1, 1, 1, 0],
					[0, 1, 1, 0],
					[0, 1, 1, 0],
					[0, 1, 0, 0],
					[0, 1, 0, 0]
				]
			},
			{
				name: 'Combat',
				data: [
					[1, 1, 1, 0],
					[1, 1, 1, 0],
					[1, 1, 0, 1],
					[1, 1, 1, 0],
					[1, 1, 1, 1],
					[0, 1, 1, 0],
					[0, 1, 0, 0]
				]
			},
			{
				name: 'Sublety',
				data: [
					[0, 1, 1, 0],
					[1, 1, 1, 0],
					[1, 1, 1, 0],
					[1, 1, 1, 0],
					[1, 1, 1, 1],
					[0, 0, 1, 0],
					[0, 1, 0, 0]
				]
			},
		]
	},
	shaman: {
		trees: [
			{
				name: 'Elemental',
				data: [
					[0, 1, 1, 0],
					[1, 1, 1, 0],
					[1, 1, 1, 0],
					[1, 1, 0, 1],
					[1, 1, 0, 0],
					[0, 0, 1, 0],
					[0, 1, 0, 0]
				]
			},
			{
				name: 'Enhancement',
				data: [
					[0, 1, 1, 0],
					[1, 1, 1, 1],
					[1, 0, 1, 1],
					[0, 1, 1, 0],
					[1, 1, 1, 0],
					[0, 0, 1, 0],
					[0, 1, 0, 0]
				]
			},
			{
				name: 'Restoration',
				data: [
					[0, 1, 1, 0],
					[1, 1, 1, 0],
					[1, 1, 1, 1],
					[0, 1, 1, 0],
					[1, 0, 1, 0],
					[0, 0, 1, 0],
					[0, 1, 0, 0]
				]
			},
		]
	},
	warlock: {
	  trees: [
	    {
	      name: 'Affliction',
	      data: [
	        [
	          0,
	          {
	            name: 'Supression',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 0
	          },
	          {
	            name: 'Improved Corruption',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 0
	          },
	          0
	        ],
	        [
	          {
	            name: 'Improved Curse of Weakness',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 3,
	            requiredTalentPoints: 5
	          },
	          {
	            name: 'Improved Drain Soul',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 5
	          },
	          {
	            name: 'Improved Life Tap',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 5
	          },
	          {
	            name: 'Improved Drain Life',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 5
	          }
	        ],
	        [
	          {
	            name: 'Improved Curse of Agony',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 3,
	            requiredTalentPoints: 10
	          },
	          {
	            name: 'Fel Concentration',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 10
	          },
	          {
	            name: 'Amplify Curse',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 1,
	            requiredTalentPoints: 10,
	            unlocks: 'curse_of_exhaustion'
	          },
	          0
	        ],
	        [
	          {
	            name: 'Grim Reach',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 15
	          },
	          {
	            name: 'Nightfall',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 15
	          },
	          0,
	          {
	            name: 'Improved Drain Mana',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 15
	          }
	        ],
	        [
	          0,
	          {
	            name: 'Siphon Life',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 1,
	            requiredTalentPoints: 20,
	            unlocks: 'shadow_mastery'
	          },
	          {
	            name: 'Curse of Exhaustion',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 1,
	            requiredTalentPoints: 20,
	            locked: true,
	            unlocks: 'improved_curse_of_exhaustion'
	          },
	          {
	            name: 'Improved Curse of Exhaustion',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 4,
	            requiredTalentPoints: 20,
	            locked: true
	          }
	        ],
	        [
	          0,
	          {
	            name: 'Shadow Mastery',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 25,
	            locked: true
	          },
	          0,
	          0
	        ],
	        [
	          0,
	          {
	            name: 'Dark Pact',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 30
	          },
	          0,
	          0
	        ]
	      ]
	    },
	    {
	      name: 'Demonology',
	      data: [
	        [
	          {
	            name: 'Supression',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 0
	          },
	          {
	            name: 'Improved Corruption',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 0
	          },
	          {
	            name: 'Improved Curse of Weakness',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 3,
	            requiredTalentPoints: 5
	          },
	          0
	        ],
	        [
	          {
	            name: 'Improved Drain Soul',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 5
	          },
	          {
	            name: 'Improved Life Tap',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 5
	          },
	          {
	            name: 'Improved Drain Life',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 5
	          },
	          0
	        ],
	        [
	          {
	            name: 'Improved Curse of Agony',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 3,
	            requiredTalentPoints: 10
	          },
	          {
	            name: 'Fel Concentration',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 10
	          },
	          {
	            name: 'Amplify Curse',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 1,
	            requiredTalentPoints: 10,
	            unlocks: 'curse_of_exhaustion'
	          },
	          0
	        ],
	        [
	          0,
	          {
	            name: 'Grim Reach',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 15
	          },
	          {
	            name: 'Nightfall',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 15
	          },
	          0
	        ],
	        [
	          {
	            name: 'Improved Drain Mana',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 15
	          },
	          {
	            name: 'Siphon Life',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 1,
	            requiredTalentPoints: 20,
	            unlocks: 'shadow_mastery'
	          },
	          0,
	          {
	            name: 'Curse of Exhaustion',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 1,
	            requiredTalentPoints: 20,
	            locked: true,
	            unlocks: 'improved_curse_of_exhaustion'
	          }
	        ],
	        [
	          0,
	          0,
	          {
	            name: 'Improved Curse of Exhaustion',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 4,
	            requiredTalentPoints: 20,
	            locked: true
	          },
	          0
	        ],
	        [
	          0,
	          {
	            name: 'Shadow Mastery',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 25,
	            locked: true
	          },
	          {
	            name: 'Dark Pact',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 30
	          },
	          0
	        ]
	      ]
	    },
	    {
	      name: 'Destruction',
	      data: [
	        [
	          0,
	          {
	            name: 'Supression',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 0
	          },
	          {
	            name: 'Improved Corruption',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 0
	          },
	          0
	        ],
	        [
	          0,
	          {
	            name: 'Improved Curse of Weakness',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 3,
	            requiredTalentPoints: 5
	          },
	          {
	            name: 'Improved Drain Soul',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 5
	          },
	          0
	        ],
	        [
	          {
	            name: 'Improved Life Tap',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 5
	          },
	          {
	            name: 'Improved Drain Life',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 5
	          },
	          {
	            name: 'Improved Curse of Agony',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 3,
	            requiredTalentPoints: 10
	          },
	          {
	            name: 'Fel Concentration',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 10
	          }
	        ],
	        [
	          {
	            name: 'Amplify Curse',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 1,
	            requiredTalentPoints: 10,
	            unlocks: 'curse_of_exhaustion'
	          },
	          {
	            name: 'Grim Reach',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 15
	          },
	          0,
	          {
	            name: 'Nightfall',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 15
	          }
	        ],
	        [
	          {
	            name: 'Improved Drain Mana',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 2,
	            requiredTalentPoints: 15
	          },
	          {
	            name: 'Siphon Life',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 1,
	            requiredTalentPoints: 20,
	            unlocks: 'shadow_mastery'
	          },
	          {
	            name: 'Curse of Exhaustion',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 1,
	            requiredTalentPoints: 20,
	            locked: true,
	            unlocks: 'improved_curse_of_exhaustion'
	          },
	          0
	        ],
	        [
	          0,
	          0,
	          {
	            name: 'Improved Curse of Exhaustion',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 4,
	            requiredTalentPoints: 20,
	            locked: true
	          },
	          0
	        ],
	        [
	          0,
	          {
	            name: 'Shadow Mastery',
	            image: 'test_icon.jpg',
	            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
	            invested: 0,
	            maxRank: 5,
	            requiredTalentPoints: 25,
	            locked: true
	          },
	          0,
	          0
	        ]
	      ]
	    }
	  ]
	},
	warrior: {
		trees: [{
			name: 'Arms',
			data: [
				[1, 1, 1, 0],
				[1, 1, 0, 1],
				[1, 1, 1, 0],
				[0, 1, 1, 0],
				[1, 1, 1, 1],
				[1, 0, 1, 0],
				[0, 1, 0, 0]
			]
		},
		{
			name: 'Fury',
			data: [
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[1, 1, 1, 1],
				[1, 1, 1, 0],
				[1, 1, 0, 1],
				[1, 0, 1, 0],
				[0, 1, 0, 0]
			]
		},
		{
			name: 'Protection',
			data: [
				[0, 1, 1, 0],
				[1, 0, 1, 1],
				[1, 1, 1, 1],
				[1, 1, 1, 0],
				[1, 1, 1, 0],
				[0, 0, 1, 0],
				[0, 1, 0, 0]
			]
		},
		]
	}
};
