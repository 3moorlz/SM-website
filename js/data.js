const DISCORD_URL = 'https://discord.gg/qUWUjSndMW';
const SUPPORT_DISCORD_URL = 'https://discord.gg/93D5Jt8jEr';
const CONTACT_EMAIL = 'SpearMaceSMP@gmail.com';
const IP_PLACEHOLDER = 'play.smsmp.net';

const CHECKOUT_LIFETIME_URL = 'https://smsmp.fluxstore.net/category/{PENDING_LIFETIME_CAT_ID}';
const CHECKOUT_MONTHLY_URL = 'https://smsmp.fluxstore.net/category/{PENDING_MONTHLY_CAT_ID}';
const CHECKOUT_KEYS_URL_NOT_LIVE_YET = 'https://smsmp.fluxstore.net/category/{PENDING_KEYS_CAT_ID}';
const CHECKOUT_BUNDLES_URL_NOT_LIVE_YET = 'https://smsmp.fluxstore.net/category/{PENDING_BUNDLES_CAT_ID}';

const RANKS = [
  {
    id: 'immortal',
    name: 'Immortal',
    badge: 'assets/immortal.webp',
    accent: '#22d3ee',
    accentGlow: 'rgba(34, 211, 238, 0.4)',
    lifetimePrice: 19.99,
    monthlyPrice: 3.99,
    lifetimePackageId: '9e918365-e6dd-44de-aa17-262d48ac8dc8',
    monthlyPackageId: '93487ca5-0ea1-4f2d-a778-e02975adbe4c',
    monthlyNote: '$5.99 after first month',
    bestDeal: true,
    perks: [
      '14 Homes',
      'No chat cooldown',
      '40 Auction listings',
      '20 Order queues',
      'Immortal streak rewards',
      'Immortal kit',
      'Custom name color',
      '/nickname',
      '/craft',
      '/anvil',
      '/ec',
      '8 Row ender chest',
      'Auction insta buy',
      'Weekly streak saver',
      '10 Weekly {Placeholder} crate keys',
      'Priority queue',
      'Crate quick open',
    ],
  },
  {
    id: 'ascendant',
    name: 'Ascendant',
    badge: 'assets/ascendant.webp',
    accent: '#9333ea',
    accentGlow: 'rgba(147, 51, 234, 0.35)',
    lifetimePrice: 13.99,
    monthlyPrice: 4.99,
    lifetimePackageId: 'faea1eb4-4bda-4f1f-b9cc-9440681e1a6c',
    monthlyPackageId: '1998a720-7d62-4f07-ae90-356d1d64d59a',
    monthlyNote: null,
    bestDeal: false,
    perks: [
      '12 Homes',
      'No chat cooldown',
      '30 Auction listings',
      '15 Order queues',
      'Ascendant streak rewards',
      'Ascendant kit',
      'Custom name color',
      '/nickname',
      '/craft',
      '/anvil',
      '/ec',
      'Double chest size ender chest (6 rows)',
      'Auction insta buy',
      'Bi-Weekly streak saver',
      '8 Weekly {Placeholder} crate keys',
      'Priority queue',
      'Crate quick open',
    ],
  },
  {
    id: 'champion',
    name: 'Champion',
    badge: 'assets/champion.webp',
    accent: '#f0c040',
    accentGlow: 'rgba(240, 192, 64, 0.35)',
    lifetimePrice: 9.99,
    monthlyPrice: 3.99,
    lifetimePackageId: '5ceed1d6-aabd-4dee-8183-995961ef586d',
    monthlyPackageId: '2453da05-e1c9-4ac7-999b-30e0335d9c3c',
    monthlyNote: null,
    bestDeal: false,
    perks: [
      '9 Homes',
      'No chat cooldown',
      '25 Auction listings',
      '12 Order queues',
      'Champion streak rewards',
      'Champion kit',
      'Custom name color',
      '/nickname',
      '/craft',
      '/anvil',
      '/ec',
      '+ 2 Rows in ender chest',
      'Auction insta buy',
      'Monthly streak saver',
      '6 Weekly {Placeholder} crate keys',
      'Priority queue',
      'Crate quick open',
    ],
  },
  {
    id: 'crusader',
    name: 'Crusader',
    badge: 'assets/crusader.webp',
    accent: '#3ecf6e',
    accentGlow: 'rgba(62, 207, 110, 0.35)',
    lifetimePrice: 5.99,
    monthlyPrice: null,
    lifetimePackageId: '4a66f9b4-a99d-440a-bf3b-5eb5d02c301c',
    monthlyNote: null,
    bestDeal: false,
    perks: [
      '7 Homes',
      'No chat cooldown',
      '20 Auction listings',
      '10 Order queues',
      'Crusader streak rewards',
      'Crusader kit',
      '/craft',
      '/anvil',
      '/ec',
      '+ 1 Row in ender chest',
      'Auction insta buy',
      'Monthly streak saver',
      '4 Weekly {Placeholder} crate keys',
      'Priority queue',
      'Crate quick open',
    ],
  },
  {
    id: 'sentinel',
    name: 'Sentinel',
    badge: 'assets/sentinel.webp',
    accent: '#a8b2c0',
    accentGlow: 'rgba(168, 178, 192, 0.35)',
    lifetimePrice: 2.99,
    monthlyPrice: null,
    lifetimePackageId: '487e07e9-5663-4ce0-9780-10ef40f12d7e',
    monthlyNote: null,
    bestDeal: false,
    perks: [
      '5 Homes',
      '15 Auction listings',
      '7 Order queues',
      'Sentinel streak rewards',
      'Sentinel kit',
      '/craft',
      '/anvil',
      '2 Weekly {Placeholder} crate keys',
      'Priority queue',
      'Crate quick open',
    ],
  },
];

const STAFF_MEMBERS = [
  { role: 'Developer', name: 'UknUnc', head: 'UknUnc', icon: 'dev.webp' },
  { role: 'Manager', name: 'Fruitifly', head: 'Fruitifly', icon: 'manager.webp' },
  { role: 'Manager', name: 'Yehosy', head: 'Yehosy', icon: 'manager.webp' },
  { role: 'Sr. Admin', name: 'Lifes_Tuff', head: 'Lifes_Tuff', icon: 'SrAdmin.webp' },
  { role: 'Admin', name: 'FvsionNova', head: 'FvsionNova', icon: 'Admin.webp' },
  { role: 'Admin', name: 'JustTheNon', head: 'JustTheNon', icon: 'Admin.webp' },
  { role: 'Admin', name: 'IllusionsEU', head: 'IllusionsEU', icon: 'Admin.webp' },
  { role: 'Admin', name: 'Nixeron_', head: 'Nixeron_', icon: 'Admin.webp' },
  { role: 'Mod', name: 'BilliePotatoe', head: 'BilliePotatoe', icon: 'mod.webp' },
  { role: 'Mod', name: 'AbleSquirrel', head: 'AbleSquirrel', icon: 'mod.webp' },
  { role: 'Mod', title: 'Builders', name: 'Fritsyy', head: 'Fritsyy', icon: 'mod.webp' },
  { role: 'Jr. Mod', name: 'Censorr_', head: 'Censorr_', icon: 'JrMod.webp' },
  { role: 'Jr. Mod', title: 'Builders', name: 'RaccoonNyx', head: 'RaccoonNyx', icon: 'JrMod.webp' }
];

const COMPARISON_ROWS = [
  { label: 'Homes', values: ['14', '12', '9', '7', '5'] },
  { label: 'Auction Listings', values: ['40', '30', '25', '20', '15'] },
  { label: 'Order Queues', values: ['20', '15', '12', '10', '7'] },
  { label: 'Chat Cooldown', values: ['None', 'None', 'None', 'None', 'Yes'] },
  { label: 'Streak Rewards & Kit', values: ['Immortal', 'Ascendant', 'Champion', 'Crusader', 'Sentinel'] },
  { label: 'Weekly {Placeholder} Crate Keys', values: ['10', '8', '6', '4', '2'] },
  { label: 'Ender Chest', values: ['8 rows', '6 rows', '+2 rows', '+1 row', '—'] },
  { label: 'Streak Saver', values: ['Weekly', 'Bi-weekly', 'Monthly', 'Monthly', '—'] },
  { label: 'Auction Insta-buy', values: ['✓', '✓', '✓', '✓', '—'] },
  { label: 'Custom Name Color', values: ['✓', '✓', '✓', '—', '—'] },
  { label: 'Priority Queue', values: ['✓', '✓', '✓', '✓', '✓'] },
  { label: 'Crate Quick Open', values: ['✓', '✓', '✓', '✓', '✓'] },
];

const KIT_PERKS = [
  { label: '/craft', values: [true, true, true, true, true] },
  { label: '/anvil', values: [true, true, true, true, true] },
  { label: '/ec', values: [true, true, true, true, false] },
  { label: '/nickname', values: [true, true, true, false, false] },
  { label: 'No Chat Cooldown', values: [true, true, true, true, false] },
  { label: 'Auction Insta-buy', values: [true, true, true, true, false] },
  { label: 'Streak Saver', values: [true, true, true, true, false] },
  { label: 'Priority Queue', values: [true, true, true, true, true] },
  { label: 'Crate Quick Open', values: [true, true, true, true, true] },
];

const HOME_FEATURES = [
  { icon: '⚔', title: 'Earn Ranks Through Gameplay', text: 'Grind money and kills to rank up. You do not need to spend money to climb.' },
  { icon: '🏆', title: 'Competitive Leaderboards', text: 'Track kills, money, playtime, and streaks. See where you stand.' },
  { icon: '🔥', title: 'Daily Streak Rewards', text: 'Log in, keep your streak, and pick up better kit rewards as it grows.' },
  { icon: '⏱', title: 'Playtime Milestones', text: 'The longer you play, the more milestone rewards you unlock.' },
  { icon: '💰', title: 'Player-Driven Economy', text: 'Run shops, list auctions, fill orders. The market moves because players move it.' },
  { icon: '🗡', title: 'Competitive PvP (The Pit)', text: 'Fight in The Pit when you want raw PvP without the usual survival overhead.' },
];

const PATHWAY_RANKS = [
  { id: 'server_lead', label: 'Server Lead', tier: 'lead', colorClass: 'rank-purple', icon: 'serverlead.webp', requiresTrial: false, overview: 'The top of the staff pathway. Server Leads set overall direction for the staff team and sign off on major decisions.' },
  { id: 'promotional_manager', label: 'Promotional Manager', tier: 'management', colorClass: 'rank-blue', icon: 'manager.webp', requiresTrial: true, overview: 'Runs the staff promotion process — reviewing performance, running trials, and recommending rank changes.' },
  { id: 'staff_manager', label: 'Staff Manager', tier: 'management', colorClass: 'rank-blue', icon: 'manager.webp', requiresTrial: true, overview: 'Manages the entire staff team\'s day-to-day operations, schedules, and internal standards.' },
  { id: 'ticket_manager', label: 'Ticket Manager', tier: 'management', colorClass: 'rank-blue', icon: 'manager.webp', requiresTrial: true, overview: 'Owns the support ticket system end-to-end — staffing it, setting standards, and resolving escalations.' },
  { id: 'manager', label: 'Manager', tier: 'management', colorClass: 'rank-blue', icon: 'manager.webp', requiresTrial: true, overview: 'Full management access. Oversees staff performance, training, and the overall health of the server.' },
  { id: 'sr_admin', label: 'Sr. Admin', tier: 'admin', colorClass: 'rank-green', icon: 'SrAdmin.webp', requiresTrial: false, overview: 'The senior-most administrative rank before management. Runs day-to-day operations across the Admin and Mod teams.' },
  { id: 'admin', label: 'Admin', tier: 'admin', colorClass: 'rank-green', icon: 'Admin.webp', requiresTrial: true, overview: 'Administrative access to server tools. Oversees moderation quality and handles escalations Mods can\'t resolve.' },
  { id: 'sr_mod', label: 'Sr. Mod', tier: 'mod', colorClass: 'rank-orange', icon: 'SrMod.webp', requiresTrial: false, overview: 'Mentors the Mod team and takes point on harder enforcement calls and appeals.' },
  { id: 'mod', label: 'Mod', tier: 'mod', colorClass: 'rank-orange', icon: 'mod.webp', requiresTrial: false, overview: 'Full moderation permissions. Enforces the rules, runs investigations, and keeps the server fair.' },
  { id: 'jr_mod', label: 'Jr. Mod', tier: 'mod', colorClass: 'rank-orange', icon: 'JrMod.webp', requiresTrial: false, overview: 'Newly trusted with light moderation tools — basic chat and in-game rule enforcement.' },
  { id: 'helper', label: 'Helper', tier: 'mod', colorClass: 'rank-orange', icon: 'Helper.webp', requiresTrial: false, overview: 'Frontline support in chat and the help queue. Helpers answer questions and flag issues for the Mod team.' },
  { id: 'trainee', label: 'Trainee', tier: 'mod', colorClass: 'rank-orange', icon: 'staff.webp', requiresTrial: false, overview: 'The first step onto the team. Trainees learn the ropes under close supervision before earning full Helper permissions.' },
  { id: 'informatics', label: 'Informatics', tier: 'dev', colorClass: 'rank-red', icon: 'informatics.webp', requiresTrial: true, overview: 'Handles server data, configs, and technical documentation that keep systems running smoothly.' },
  { id: 'developer', label: 'Developer', tier: 'dev', colorClass: 'rank-red', icon: 'dev.webp', requiresTrial: true, overview: 'Builds and maintains the plugins, systems, and tools that power the server.' },
  { id: 'builders', label: 'Builders', tier: 'special', colorClass: 'rank-teal', icon: 'builder.webp', requiresTrial: true, overview: 'A title, not a rank. Permissions come from whatever staff rank the person actually holds.' }
];

const PATHWAY_EDGES = [
  { from: 'trainee', to: 'helper', type: 'direct' },
  { from: 'helper', to: 'jr_mod', type: 'direct' },
  { from: 'jr_mod', to: 'mod', type: 'direct' },
  { from: 'mod', to: 'sr_mod', type: 'direct' },
  { from: 'sr_mod', to: 'admin', type: 'direct' },
  { from: 'admin', to: 'sr_admin', type: 'direct' },
  { from: 'sr_admin', to: 'manager', type: 'direct' },
  { from: 'manager', to: 'promotional_manager', type: 'direct', group: 'manager-fork' },
  { from: 'manager', to: 'ticket_manager', type: 'direct', group: 'manager-fork' },
  { from: 'manager', to: 'staff_manager', type: 'direct', group: 'manager-fork' },
  { from: 'manager', to: 'builders', type: 'potential' },
  { from: 'ticket_manager', to: 'server_lead', type: 'potential' },
  { from: 'promotional_manager', to: 'server_lead', type: 'potential', bidirectional: true },
  { from: 'staff_manager', to: 'server_lead', type: 'potential', bidirectional: true },
  { from: 'staff_manager', to: 'informatics', type: 'potential' },
  { from: 'informatics', to: 'developer', type: 'potential' }
];

const KEYS = [
  { id: 'sentinel', name: 'Sentinel Key', image: 'assets/sentinel_key.webp', packImage: 'assets/sentinelpack.png', singlePrice: 0.29, packPrice: 1.19, saveText: 'Save $0.26', singleId: 'd041b0b3-07b2-44a0-9b80-1cacae690d6b', packId: '0d037be7-6e50-4ff3-847d-b9be9cb1a04e' },
  { id: 'crusader', name: 'Crusader Key', image: 'assets/crusader_key.webp', packImage: 'assets/crusaderpack.png', singlePrice: 0.79, packPrice: 3.39, saveText: 'Save $0.56', singleId: 'a87c1e80-bb2d-4dff-ad22-93a912ab6e21', packId: 'bad9f413-a1ed-4c48-9244-44c191cee941' },
  { id: 'champion', name: 'Champion Key', image: 'assets/champion_key.webp', packImage: 'assets/championpack.png', singlePrice: 1.49, packPrice: 6.49, saveText: 'Save $0.96', singleId: '9e4a6932-9342-4b24-a9e1-c41b41e01ac7', packId: 'ab4bf262-0ea4-4da8-95ab-326848be2f3b' },
  { id: 'ascendant', name: 'Ascendant Key', image: 'assets/ascendant_key.webp', packImage: 'assets/ascendantpack.png', singlePrice: 2.99, packPrice: 12.99, saveText: 'Save $1.96', singleId: 'e3c3c88f-1650-4de2-91f6-305376158544', packId: '946a5fa9-54fb-4e18-8fff-56a98ed2c213' },
  { id: 'seasonal', name: 'Seasonal Key', image: 'assets/immortal_key.png', packImage: 'assets/seasonalpack.png', singlePrice: 5.99, packPrice: 24.99, saveText: 'Save $4.96', singleId: 'da4a57c5-9e42-471a-a106-69c16491bdf3', packId: 'cf314ba2-d41a-484a-8dde-f6fa73966a0c' }
];

const BUNDLES = [
  { id: 'starter-bundle', name: 'Sentinel Bundle', price: 4.99, image: 'assets/starterbundle.png', value: '(Save $1.30) (Worth $6.29)', packageId: '6cc1e29b-c3ea-41f9-84f8-4a26a1e4dacb', items: ['10x Sentinel Keys', '5x Crusader Keys'] },
  { id: 'warrior-bundle', name: 'Warrior Bundle', price: 9.99, image: 'assets/warriorbundle.png', value: '(Save $3.98) (Worth ~8,100 dashes)', packageId: 'd7d91f4b-ef9f-47e3-9f8e-3707199d2c28', items: ['10x Sentinel Keys', '10x Crusader Keys', '3x Champion Keys', '250 Dashes', '1x Rabbit Spawner'] },
  { id: 'champion-bundle', name: 'Champion Bundle', price: 19.99, image: 'assets/championbundle.png', value: '(Save $9.37) (Worth ~16,850 Dashes)', packageId: '31c90fdb-fab1-4312-9d4d-93306f172159', items: ['10x Crusader Keys', '10x Champion Keys', '3x Ascendant Keys', '600 Dashes', '1x Sheep Spawner'] },
  { id: 'ascendant-bundle', name: 'Ascendant Bundle', price: 34.99, image: 'assets/ascendantbundle.png', value: '(Save $17.90) (Worth ~32,200 Dashes)', packageId: '8d44c1b7-07e8-4e59-a96d-db6d37c9cb13', items: ['10x Champion Keys', '10x Ascendant Keys', '2x Seasonal Keys', '1.2k Dashes', '1x Cow Spawner'] },
  { id: 'ultimate-bundle', name: 'Season 1 Ultimate Bundle', price: 49.99, image: 'assets/seasonalbundle.png', value: '(Save $36.03) (Worth ~84,500 Dashes) (Best value)', packageId: '7175b35d-16e3-4614-8ace-20fa884a139c', items: ['20x Crusader Keys', '15x Champion Keys', '10x Ascendant Keys', '3x Seasonal Keys', '2.5k Dashes', '1x Iron Golem Spawner'] }
];

const CRATES = [
  { id: 'sentinel-crate', name: 'Sentinel Crate', image: 'assets/sentinel_key.webp' },
  { id: 'crusader-crate', name: 'Crusader Crate', image: 'assets/crusader_key.webp' },
  { id: 'champion-crate', name: 'Champion Crate', image: 'assets/champion_key.webp' },
  { id: 'ascendant-crate', name: 'Ascendant Crate', image: 'assets/ascendant_key.webp' },
  { id: 'seasonal-crate', name: 'Seasonal Crate', image: 'assets/immortal_key.png' },
];

const STORE_CATEGORIES = ['ranks', 'keys', 'bundles'];

const MC_USERNAME_RE = /^[A-Za-z0-9_]{3,16}$/;
