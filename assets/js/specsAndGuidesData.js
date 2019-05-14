
const context = {
	classes: [
		{
			name: "warrior",
			specs: [{
					focus: "PvE",
					name: "example1",
					image: "assets/images/test_spec_image.png",
					description: ['1Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
					},
				{
					focus: "PvE",
					name: "example2",
					image: "assets/images/test_spec_image.png",
					description: ['2Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
					}, {
					focus: "PvP",
					name: "example1",
					image: "assets/images/test_spec_image.png",
					description: ['1Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
					}, {
					focus: "PvP",
					name: "example2",
					image: "assets/images/test_spec_image.png",
					description: ['2Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.']

		  }],
			raid_consumes: {},
			pvp_consumes: {},
			preraid_bis: {},
			bis: {},
			gft: {},
		},
		{
			name: "mage",
			specs: [{
					focus: "PvE",
					name: "Winter's Chill",
					image: "assets/images/specs/winters_chill_pve.png",
					description: ['This is a utility raid spec to buff the rest of the mages within the raid you will always want one for the 10% crit buff from Winter’s Chill.',
						  'The spec has several talent points that you can shift around so it can still be used for things such as AoE farming or PvP if you desire.',
						  'While this spec is generally what you get the newest/undergeared mage to play it can still provide reasonable DPS is played properly'],
					  },
				{
					focus: "PvE",
					name: "Arcane Frost",
					image: "assets/images/specs/arcane_frost_pve.png",
					description: ['This is the primary raiding spec that all mages within a guild should be running with the exception of a single Winter’s Chill Mage.',
						  'The spec provides you with Arcane Power which is a 3 minute CD (Cannot stack with Power Infusion)and all relevant frost damage talents to provide the most potential damage.',
						  'Depending on your needs within your raid team you can shift points around pretty easily (EG: 2/2 Wand Specialization or Arctic Reach instead of Magic Absorption)'],
					  },
						{
					focus: "PvE",
					name: "AoE Farm",
					image: "assets/images/specs/aoe_farm_pve.png",
					description: ['This spec will often be what you spec into outside of your normal raid time for solo farming the slows provided can cause you to be able to fight more mobs than any other class in the game.',
						  'Typically mages will use this spec to solo AoE farm trash within instances like Dire Maul, BRD, and Zul’gurub.',
						  'Mages will often use this spec for leveling so they can AoE farm mobs which will often provide more XP an hour than normal questing would.'],
					  },
						{
					focus: "PvP",
					name: "Basic Frost",
					image: "assets/images/specs/frost_pvp.png",
					description: ['This is the traditional mage PvP spec which can be used to “shatter combo” people and do incredible damage within a handful of globals.',
						  'Your primary role in this spec is to control the enemy team. With rank 1 Blizzard casts you can dramatically slow down the entire enemy team for significant amounts of time so that your team can respond in time.',
						  'A player in this spec can also “spin” a flag and keep enemy players from capturing a base for upwards of 30+ second solo due to the tankiness provided from Ice Barrier and using two Ice Blocks in a row with Cold Snap.'],
					},
					{
					focus: "PvP",
					name: "Elemental",
					image: "assets/images/specs/ele_pvp.png",
					description: ['This spec is often used to AoE bomb the enemy raid and allows you to decimate an large group of enemies with just a handful of globals. Given its AoE capabilities the spec is still very strong within 1v1 scenarios.',
						  'A primary drawback from running with this spec is that it doesn’t have great mana sustain and can run out of mana rather quickly as well as losing Ice Barrier.',
						  'It is usually suggested that you have a notable amount of gear with this spec with a reasonable amount of crit on it so you get some ignite damage rolling on enemies.'],
				},
				{
					focus: "PvP",
					name: "POM Pyro",
					image: "assets/images/specs/pom_pyro_pvp.png",
					description: ['Often referred to as “3 Minute Mage” this spec effectively gives the player the ability to kill someone every 3 minutes nearly instantly by using Arcane Power to cast Pyro and then use Presence of Mind to fire off another.',
						  'This spec is often considered a meme and in reality it’s not very effective within most battlegrounds unless your goal is to focus one person in particular every 3 minutes or to make a PvP montage video.']

		  		}],
				raid_consumes: {},
				pvp_consumes: {},
				preraid_bis: {},
				bis: {},
				gft: {},

		},
		{
			name: "druid",
			specs: [{

				name: "Swiftmend",
				focus: "PvE",
				image: "assets/images/specs/swiftmend_pve.png",
				description: ['Traditional cookiecutter deep restoration spec. Recommended to only run one swiftmend druid per raid and for solo druid in raids.',
						  'Swiftmend spec adds an extra “oh crap” button which synergizes well with a second druid running the Regrowth spec because you can consume the other druids HoTs with swiftmend.',
						  'This spec also isn’t terrible in PVP, great if you want to heal and support.'],
					}, {
				name: "Moonglow",
				focus: "PvE",
				image: "assets/images/specs/moonglow_pve.png",
				description: ['The Moonglow spec as the name suggests takes moonglow which further reduces the manacost of all your healing spells by an additional 9%. Great through all content.',
						  'Recommended to run this spec or Regrowth if you have a Swiftmend druid in the raid already and if you struggle on mana in your raids. Also recommended in the very early stages of the game when gear isn’t great yet.',
						  'Moonglow spec takes some balance talents so running gear with spell power gives you decent damage in PVP and you keep the ability to heal aswell.'],
					}, {
				name: "Regrowth",
				focus: "PvE",
				image: "assets/images/specs/regrowth_pve.png",
				description: ['The Regrowth spec is a very high HPS spec but it consumes mana VERY quickly. Recommended spec for Blackwing Lair and even AQ40.',
						  'The build revolves around the talents improved regrowth which adds 50% crit chance to your regrowths and the talent Nature’s Grace which reduces the cast time of your next nature spell by 0.5 seconds to pump out lots of regrowths at the expense of lots of mana.',
						  'Like moonglow this spec also takes some of the deeper talents in the balance tree so you can dish out decent damage in PVP.'],
					}, {
				name: "Feral",
				focus: "PvE",
				image: "assets/images/specs/feral_pve.png",
				description: ['Normal cat spec for doing dps in catform. Great single target damage, can compete with rogues and even fury warriors.',
						  'Recommended to also work on a tanking set and tank if the situation calls for it. You have all the core talents for tanking except 15% extra threat which you can alternatively pick up instead of Feral Aggression if you find that you often tank for your guild.',
						  'Very important to always bring FULL consumes and to get every beneficial world buff. You also have to farm Gnomeregan for Manual Crowd Pummelers, they are mandatory if you want to be able to compete on DPS meters and show everyone what you are made of. Typically you need 1 per boss but adjust to your fight lengths.'],
				}, {
				name: "Swiftmend Flagcarry",
				focus: "PvP",
				image: "assets/images/specs/swiftmend_flagcarry_pvp.png",
				description: ['Traditional Warsong Gulch flagcarry spec. Gives you great sustain with instant heals consuming your own HoTs and ultimately makes you hard to take down.',
						  'There are some variations to the spec that you can make depending on the enemy composition or personal preference. As an example you might want to put points into Thick hide instead of Feral Instinct if your gear lacks armor.',
						  'This spec is also great for world PVP and dueling. Your goal is to kite people while you keep Dots running and outlast your opponents with heals.'],
					}, {
				name: "Balance Hybrid",
				focus: "PvP",
				image: "assets/images/specs/balance_hybrid_pvp.png",
				description: ['This balance hybrid spec is great at dishing out damage with spell power gear and gives you control with the usage of feral charge, very unforgiving due to the lack of Nature’s Swiftness but very satisfying to play. Great spec to iron out mistakes.',
						  'A variation of this spec is to remove the points in feral and continue down to Nature’s Swiftness in restoration giving you the “oh crap” button back but giving you less control due to losing Feral Charge.',
						  'Ideally you would want to incorporate 3% spell hit with this gear but it can be very hard to obtain items with hit on them.'],
					}, {
				name: "HotW Feral",
				focus: "PvP",
				image: "assets/images/specs/hotw_feral_pvp.png",
				description: ['One of the two feral specs. Takes Nature’s Swiftness for extra survivability and utility. You can do great damage in cat and even surprisingly good damage in bear with some lucky crits.',
						  'With this spec you can also kite people with dots like Swiftmend and you can throw heals in fights if its needed.',
						  'For this spec you do want to get some of the hybrid gear going, PVP set is great since it has damage stats and intellect to support powershifting and healing, Tier 2.5 is also great for this. Ideally you want to grab 5% melee hit to avoid missing.']

			}],
			raid_consumes: {},
			pvp_consumes: {},
			preraid_bis: {},
			bis: {},
			gft: {},
		},
		{
			name: "paladin",
			specs: [{
				focus: 'PvE',
				name: "example1",
				image: "assets/images/test_spec_image.png",
				description: ['1Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvE',
				name: "example2",
				image: "assets/images/test_spec_image.png",
				description: ['2Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvP',
				name: "example1",
				image: "assets/images/test_spec_image.png",
				description: ['1Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvP',
				name: "example2",
				image: "assets/images/test_spec_image.png",
				description: ['2Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.']
		  }],
			raid_consumes: {},
			pvp_consumes: {},
			preraid_bis: {},
			bis: {},
			gft: {},

		},
		{
			focus: 'PvE',
			name: "shaman",
			specs: [{
				name: "example1",
				image: "assets/images/test_spec_image.png",
				description: ['1Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvE',

				name: "example2",
				image: "assets/images/test_spec_image.png",
				description: ['2Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvP',

				name: "example1",
				image: "assets/images/test_spec_image.png",
				description: ['1Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvP',

				name: "example2",
				image: "assets/images/test_spec_image.png",
				description: ['2Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.']
		  }],
			raid_consumes: {},
			pvp_consumes: {},
			preraid_bis: {},
			bis: {},
			gft: {},

		},
		{
			focus: 'PvE',

			name: "warlock",
			specs: [{
				name: "SM Ruin",
				image: "assets/images/specs/sm_ruin_pvp.png",
				description: ['This spec is commonly refered to as the "Imp Spec" because each raid usually has only one of these locks in the tank group for the imp stamina buff.',
						  'This spec is great for all around use as you are able to both PVE and PVP decently.',
						  'This spec produces the 2nd highest pve DPS rivaled only by the "DS ruin" spec.'],
			}, {
				focus: 'PvE',

				name: "DS Ruin",
				image: "assets/images/specs/ds_ruin_pve.png",
				description: ['This spec is a "Glass Cannon" because you have the highest shadowbolt damage at the cost of sacraficing your succubus.',
						  'Every warlock in a raid setting should be this spec except for the one Sm Ruin lock in the tank group.',
						  'Huge shadowbolt crits but terrible at any PVP.'],
			}, {
				focus: 'PvP',

				name: "SM Ruin",
				image: "assets/images/specs/sm_ruin_pvp.png",
				description: ['This spec is commonly refered to as the "Imp Spec" because each raid usually has only one of these locks in the tank group for the imp stamina buff.',
						  'This spec is great for all around use as you are able to both PVE and PVP decently.',
						  'This spec produces the 2nd highest pve DPS rivaled only by the "DS ruin" spec.'],
			}, {
				focus: 'PvP',

				name: "Soul Link",
				image: "assets/images/specs/soul_link_pvp.png",
				description: ['This is warlock spec has the most survivability in a 1v1 situation.',
						  'Very tanky spec but not very much damage output.',
						  'Great for defending flags or 1v1 battles. Lacks any real damage burst.'],
			}, {
				focus: 'PvP',

				name: "Conflag Nightfall",
				image: "assets/images/specs/conflag_nightfall_pvp.png",
				description: ['Warlock burst spec with the addition of conflagrate.',
						  'Great PVP burst damage with instant spell casts capable of insaine damage.',
						  'Not great in PvE situations due to fire resistant mobs.']
		  }],
			raid_consumes: {},
			pvp_consumes: {},
			preraid_bis: {},
			bis: {},
			gft: {},
		},
		{
			focus: 'PvE',

			name: "priest",
			specs: [{
				name: "example1",
				image: "assets/images/test_spec_image.png",
				description: ['1Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvE',

				name: "example2",
				image: "assets/images/test_spec_image.png",
				description: ['2Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvP',

				name: "example1",
				image: "assets/images/test_spec_image.png",
				description: ['1Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvP',

				name: "example2",
				image: "assets/images/test_spec_image.png",
				description: ['2Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.']
		  }],
			raid_consumes: {},
			pvp_consumes: {},
			preraid_bis: {},
			bis: {},
			gft: {},
		},
		{
			name: "hunter",
			specs: [{
				focus: 'PvE',

				name: "example1",
				image: "assets/images/test_spec_image.png",
				description: ['1Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvE',

				name: "example2",
				image: "assets/images/test_spec_image.png",
				description: ['2Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvP',

				name: "example1",
				image: "assets/images/test_spec_image.png",
				description: ['1Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvP',

				name: "example2",
				image: "assets/images/test_spec_image.png",
				description: ['2Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.']
		  }],
			raid_consumes: {},
			pvp_consumes: {},
			preraid_bis: {},
			bis: {},
			gft: {},
		},
		{
			name: "rogue",
			specs: [{
				focus: 'PvE',
				name: "example1",
				image: "assets/images/test_spec_image.png",
				description: ['1Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvE',

				name: "example2",
				image: "assets/images/test_spec_image.png",
				description: ['2Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvP',

				name: "example1",
				image: "assets/images/test_spec_image.png",
				description: ['1Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.'],
			}, {
				focus: 'PvP',

				name: "example2",
				image: "assets/images/test_spec_image.png",
				description: ['2Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
						  'Repellendus, necessitatibus similique velit modi enim consequuntur sequi eaquead!',
						  'Libero magni autem temporibus eius dolores sit et ipsa exercitationem corporisfacere.']
		  }],
			raid_consumes: {},
			pvp_consumes: {},
			preraid_bis: {},
			bis: {},
			gft: {},}]};
