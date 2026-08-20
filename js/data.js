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
    badge: 'assets/ranks/immortal.webp',
    accent: '#22d3ee',
    accentGlow: 'rgba(34, 211, 238, 0.4)',
    lifetimePrice: 19.99,
    monthlyPrice: 3.95,
    lifetimePackageId: '9e918365-e6dd-44de-aa17-262d48ac8dc8',
    monthlyPackageId: '93487ca5-0ea1-4f2d-a778-e02975adbe4c',
    monthlyNote: '$5.99 after first month',
    bestDeal: true,
    perks: [
      '14 Homes',
      'Maximum Ender Chest (6 rows / 54 slots)',
      '40 Auction listings (up to 20 days)',
      '20 Order queues (up to 20 days)',
      'Daily 100-Dash Streak track',
      'Immortal Kit & Prefix',
      'Custom name color & /nickname',
      'Premium JoinMessagePlus announcements',
      'Message cooldown bypass',
      '/feed (refill hunger)',
      '/anvil & /craft & /workbench',
      '/disposal (trash inventory)',
      '/ec (remote Ender Chest access)',
      'Includes all perks from previous ranks'
    ],
  },
  {
    id: 'ascendant',
    name: 'Ascendant',
    badge: 'assets/ranks/ascendant.webp',
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
      'Expanded Ender Chest (5 rows / 45 slots)',
      '30 Auction listings (up to 14 days)',
      '15 Order queues (up to 14 days)',
      'Daily 75-Dash Streak track',
      'Ascendant Kit & Prefix',
      'Message cooldown bypass',
      'Custom name color & /nickname',
      '/feed (refill hunger)',
      '/anvil & /craft & /workbench',
      '/disposal (trash inventory)',
      '/ec (remote Ender Chest access)',
      'Includes all Champion perks'
    ],
  },
  {
    id: 'champion',
    name: 'Champion',
    badge: 'assets/ranks/champion.webp',
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
      'Expanded Ender Chest (4 rows / 36 slots)',
      '25 Auction listings (up to 10 days)',
      '12 Order queues (up to 10 days)',
      'Daily 55-Dash Streak track',
      'Champion Kit & Prefix',
      'Nickname & Chat color customization',
      'VIP Message cooldown treatment',
      '/feed (refill hunger)',
      '/anvil & /craft & /workbench',
      '/disposal (trash inventory)',
      '/ec (remote Ender Chest access)',
      'Includes all Crusader perks'
    ],
  },
  {
    id: 'crusader',
    name: 'Crusader',
    badge: 'assets/ranks/crusader.webp',
    accent: '#3ecf6e',
    accentGlow: 'rgba(62, 207, 110, 0.35)',
    lifetimePrice: 5.99,
    monthlyPrice: null,
    lifetimePackageId: '4a66f9b4-a99d-440a-bf3b-5eb5d02c301c',
    monthlyPackageId: 'e28d4be6-25f0-466a-bc07-d7d8e27c191a',
    monthlyNote: null,
    bestDeal: false,
    perks: [
      '7 Homes',
      '/ec (remote Ender Chest command access)',
      '20 Auction listings (up to 7 days)',
      '10 Order queues (up to 7 days)',
      'Daily 40-Dash Streak track',
      'Crusader Kit & Prefix',
      '/feed (refill hunger)',
      '/anvil & /craft & /workbench',
      '/disposal (trash inventory)',
      'Colored chat formatting',
      'Includes all Sentinel perks'
    ],
  },
  {
    id: 'sentinel',
    name: 'Sentinel',
    badge: 'assets/ranks/sentinel.webp',
    accent: '#a8b2c0',
    accentGlow: 'rgba(168, 178, 192, 0.35)',
    lifetimePrice: 2.99,
    monthlyPrice: null,
    lifetimePackageId: '487e07e9-5663-4ce0-9780-10ef40f12d7e',
    monthlyPackageId: '006f76c3-1d03-4ae3-95ad-ba10815eb07d',
    monthlyNote: null,
    bestDeal: false,
    perks: [
      '5 Homes',
      '/anvil (portable anvil GUI)',
      '/craft & /workbench (portable crafting)',
      '/disposal (trash inventory)',
      '/feed (refill hunger)',
      'Colored chat formatting',
      '15 Auction listings (up to 5 days)',
      '7 Order queues (up to 5 days)',
      'Daily 30-Dash Streak track',
      'Sentinel Kit & Prefix',
      'Includes all Member baseline access'
    ],
  },
];
const STAFF_MEMBERS = [
  { role: 'Owner', name: 'G660', head: 'G660', icon: 'unused/serverlead.webp', subtitle: 'Server Owner' },
  { role: 'Developer', name: 'Kali', head: 'UknUnc', icon: 'unused/dev.webp', subtitle: 'Web Branch' },
  { role: 'Developer', name: 'Vaporeon', head: null, icon: 'unused/dev.webp', subtitle: 'Plugin Branch' },
  { role: 'Manager', name: 'Fruitifly', head: 'Fruitifly', icon: 'unused/manager.webp' },
  { role: 'Sr. Admin', name: 'Lifes_Tuff', head: 'Lifes_Tuff', icon: 'unused/SrAdmin.webp' },
  { role: 'Admin', name: 'FvsionNova', head: 'FvsionNova', icon: 'unused/Admin.webp' },
  { role: 'Admin', name: 'Nixeron_', head: 'Nixeron_', icon: 'unused/Admin.webp' },
  { role: 'Mod', name: 'BilliePotatoe', head: 'BilliePotatoe', icon: 'unused/mod.webp' },
  { role: 'Mod', name: 'AbleSquirrel', head: 'AbleSquirrel', icon: 'unused/mod.webp' },
  { role: 'Mod', title: 'Builders', name: 'Fritsyy', head: 'Fritsyy', icon: 'unused/mod.webp' },
  { role: 'Jr. Mod', name: 'Censorr_', head: 'Censorr_', icon: 'unused/JrMod.webp' },
  { role: 'Jr. Mod', title: 'Builders', name: 'RaccoonNyx', head: 'RaccoonNyx', icon: 'unused/JrMod.webp' }
];
const COMPARISON_ROWS = [
  { label: 'Homes', values: ['14', '12', '9', '7', '5'] },
  { label: 'Auction Listings', values: ['40 (20 days)', '30 (14 days)', '25 (10 days)', '20 (7 days)', '15 (5 days)'] },
  { label: 'Order Queues', values: ['20 (20 days)', '15 (14 days)', '12 (10 days)', '10 (7 days)', '7 (5 days)'] },
  { label: 'Ender Chest', values: ['6 rows (54 slots)', '5 rows (45 slots)', '4 rows (36 slots)', '3 rows (27 slots)', '3 rows (27 slots)'] },
  { label: 'Daily Streak Track', values: ['100 Dashes', '75 Dashes', '55 Dashes', '40 Dashes', '30 Dashes'] },
  { label: 'Kit Access', values: ['Immortal', 'Ascendant', 'Champion', 'Crusader', 'Sentinel'] },
  { label: '/ec Remote Command', values: ['✓', '✓', '✓', '✓', '—'] },
  { label: '/feed (Refill Hunger)', values: ['✓', '✓', '✓', '✓', '✓'] },
  { label: '/anvil (Portable Anvil)', values: ['✓', '✓', '✓', '✓', '✓'] },
  { label: '/craft & /workbench', values: ['✓', '✓', '✓', '✓', '✓'] },
  { label: '/disposal (Trash GUI)', values: ['✓', '✓', '✓', '✓', '✓'] },
  { label: 'Colored Chat', values: ['✓', '✓', '✓', '✓', '✓'] },
  { label: '/nickname & Name Color', values: ['✓', '✓', '✓', '—', '—'] },
  { label: 'Message Cooldown', values: ['Bypass', 'Bypass', 'VIP Tier', 'Standard', 'Standard'] },
  { label: 'Join Announcements', values: ['Premium<br>JoinMessagePlus', '—', '—', '—', '—'] },
];
const KIT_PERKS = [
  { label: '/craft & /workbench', values: [true, true, true, true, true] },
  { label: '/anvil', values: [true, true, true, true, true] },
  { label: '/disposal', values: [true, true, true, true, true] },
  { label: '/feed', values: [true, true, true, true, true] },
  { label: 'Colored Chat', values: [true, true, true, true, true] },
  { label: '/ec (Remote Ender Chest)', values: [true, true, true, true, false] },
  { label: 'Nickname & Custom Color', values: [true, true, true, false, false] },
  { label: 'VIP Message Cooldown', values: [true, true, true, false, false] },
  { label: 'Message Cooldown Bypass', values: [true, true, false, false, false] },
  { label: 'JoinMessagePlus', values: [true, false, false, false, false] },
];
const HOME_FEATURES = [
  { icon: '⚔', title: 'Where your work is rewarded', text: 'Grind money and kills to rank up. You do not need to spend money to climb.' },
  { icon: '🏆', title: 'Competitive Leaderboards', text: 'Track kills, money, playtime, and streaks. See where you stand.' },
  { icon: '🔥', title: 'Daily Streak Rewards', text: 'Log in, keep your streak, and pick up better kit rewards as it grows.' },
  { icon: '⏱', title: 'Playtime Milestones', text: 'The longer you play, the more milestone rewards you unlock.' },
  { icon: '💰', title: 'Player-Driven Economy', text: 'Run shops, list auctions, fill orders. The market moves because players move it.' },
  { icon: '🗡', title: 'Competitive PvP (The Pit)', text: 'Fight in The Pit when you want raw PvP without the usual survival overhead.' },
];
const PATHWAY_RANKS = [
  { id: 'server_lead', label: 'Server Lead', tier: 'lead', colorClass: 'rank-purple', icon: 'unused/serverlead.webp', requiresTrial: false, overview: 'The top of the staff pathway. Server Leads set overall direction for the staff team and sign off on major decisions.' },
  { id: 'promotional_manager', label: 'Promotional Manager', tier: 'management', colorClass: 'rank-blue', icon: 'unused/manager.webp', requiresTrial: true, overview: 'Runs the staff promotion process — reviewing performance, running trials, and recommending rank changes.' },
  { id: 'staff_manager', label: 'Staff Manager', tier: 'management', colorClass: 'rank-blue', icon: 'unused/manager.webp', requiresTrial: true, overview: 'Manages the entire staff team\'s day-to-day operations, schedules, and internal standards.' },
  { id: 'ticket_manager', label: 'Ticket Manager', tier: 'management', colorClass: 'rank-blue', icon: 'unused/manager.webp', requiresTrial: true, overview: 'Owns the support ticket system end-to-end — staffing it, setting standards, and resolving escalations.' },
  { id: 'manager', label: 'Manager', tier: 'management', colorClass: 'rank-blue', icon: 'unused/manager.webp', requiresTrial: true, overview: 'Full management access. Oversees staff performance, training, and the overall health of the server.' },
  { id: 'sr_admin', label: 'Sr. Admin', tier: 'admin', colorClass: 'rank-green', icon: 'unused/SrAdmin.webp', requiresTrial: false, overview: 'The senior-most administrative rank before management. Runs day-to-day operations across the Admin and Mod teams.' },
  { id: 'admin', label: 'Admin', tier: 'admin', colorClass: 'rank-green', icon: 'unused/Admin.webp', requiresTrial: true, overview: 'Administrative access to server tools. Oversees moderation quality and handles escalations Mods can\'t resolve.' },
  { id: 'sr_mod', label: 'Sr. Mod', tier: 'mod', colorClass: 'rank-orange', icon: 'unused/SrMod.webp', requiresTrial: false, overview: 'Mentors the Mod team and takes point on harder enforcement calls and appeals.' },
  { id: 'mod', label: 'Mod', tier: 'mod', colorClass: 'rank-orange', icon: 'unused/mod.webp', requiresTrial: false, overview: 'Full moderation permissions. Enforces the rules, runs investigations, and keeps the server fair.' },
  { id: 'jr_mod', label: 'Jr. Mod', tier: 'mod', colorClass: 'rank-orange', icon: 'unused/JrMod.webp', requiresTrial: false, overview: 'Newly trusted with light moderation tools — basic chat and in-game rule enforcement.' },
  { id: 'helper', label: 'Helper', tier: 'mod', colorClass: 'rank-orange', icon: 'unused/Helper.webp', requiresTrial: false, overview: 'Frontline support in chat and the help queue. Helpers answer questions and flag issues for the Mod team.' },
  { id: 'trainee', label: 'Trainee', tier: 'mod', colorClass: 'rank-orange', icon: 'unused/support.webp', requiresTrial: false, overview: 'The first step onto the team. Trainees learn the ropes under close supervision before earning full Helper permissions.' },
  { id: 'informatics', label: 'Informatics', tier: 'dev', colorClass: 'rank-red', icon: 'unused/informatics.webp', requiresTrial: true, overview: 'Handles server data, configs, and technical documentation that keep systems running smoothly.' },
  { id: 'developer', label: 'Developer', tier: 'dev', colorClass: 'rank-red', icon: 'unused/dev.webp', requiresTrial: true, overview: 'Builds and maintains the plugins, systems, and tools that power the server.' },
  { id: 'builders', label: 'Builders', tier: 'special', colorClass: 'rank-teal', icon: 'unused/builder.webp', requiresTrial: true, overview: 'A title, not a rank. Permissions come from whatever staff rank the person actually holds.' }
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
  { id: 'sentinel', name: 'Sentinel Key', image: 'assets/keys/sentinel_key.webp', packImage: 'assets/keys/sentinelpack.png', singlePrice: 0.29, packPrice: 1.19, saveText: 'Save $0.26', singleId: 'd041b0b3-07b2-44a0-9b80-1cacae690d6b', packId: '0d037be7-6e50-4ff3-847d-b9be9cb1a04e' },
  { id: 'crusader', name: 'Crusader Key', image: 'assets/keys/crusader_key.webp', packImage: 'assets/keys/crusaderpack.png', singlePrice: 0.79, packPrice: 3.39, saveText: 'Save $0.56', singleId: 'a87c1e80-bb2d-4dff-ad22-93a912ab6e21', packId: 'bad9f413-a1ed-4c48-9244-44c191cee941' },
  { id: 'champion', name: 'Champion Key', image: 'assets/keys/champion_key.webp', packImage: 'assets/keys/championpack.png', singlePrice: 1.49, packPrice: 6.49, saveText: 'Save $0.96', singleId: '9e4a6932-9342-4b24-a9e1-c41b41e01ac7', packId: 'ab4bf262-0ea4-4da8-95ab-326848be2f3b' },
  { id: 'ascendant', name: 'Ascendant Key', image: 'assets/keys/ascendant_key.webp', packImage: 'assets/keys/ascendantpack.png', singlePrice: 2.99, packPrice: 12.99, saveText: 'Save $1.96', singleId: 'e3c3c88f-1650-4de2-91f6-305376158544', packId: '946a5fa9-54fb-4e18-8fff-56a98ed2c213' },
  { id: 'seasonal', name: 'Seasonal Key', image: 'assets/keys/seasonal_key.png', packImage: 'assets/keys/seasonalpack.png', singlePrice: 5.99, packPrice: 24.99, saveText: 'Save $4.96', singleId: 'da4a57c5-9e42-471a-a106-69c16491bdf3', packId: 'cf314ba2-d41a-484a-8dde-f6fa73966a0c' }
];
const BUNDLES = [
  { id: 'starter-bundle', name: 'Sentinel Bundle', price: 4.99, image: 'assets/misc/sentinelbundle.png', value: '(Save $1.30) (Worth $6.29)', packageId: '6cc1e29b-c3ea-41f9-84f8-4a26a1e4dacb', items: ['10x Sentinel Keys', '5x Crusader Keys'] },
  { id: 'warrior-bundle', name: 'Crusader Bundle', price: 9.99, image: 'assets/misc/crusaderbundle.png', value: '(Save $3.98) (Worth ~8,100 dashes)', packageId: 'd7d91f4b-ef9f-47e3-9f8e-3707199d2c28', items: ['10x Sentinel Keys', '10x Crusader Keys', '3x Champion Keys', '250 Dashes', '1x Rabbit Spawner'] },
  { id: 'champion-bundle', name: 'Champion Bundle', price: 19.99, image: 'assets/misc/championbundle.png', value: '(Save $9.37) (Worth ~16,850 Dashes)', packageId: '31c90fdb-fab1-4312-9d4d-93306f172159', items: ['10x Crusader Keys', '10x Champion Keys', '3x Ascendant Keys', '1x Booster Potion', '600 Dashes', '1x Sheep Spawner'] },
  { id: 'ascendant-bundle', name: 'Ascendant Bundle', price: 34.99, image: 'assets/misc/ascendantbundle.png', value: '(Save $17.90) (Worth ~32,200 Dashes)', packageId: '8d44c1b7-07e8-4e59-a96d-db6d37c9cb13', items: ['10x Champion Keys', '10x Ascendant Keys', '2x Seasonal Keys', '1x Universal Potion', '1.2k Dashes', '1x Cow Spawner'] },
  { id: 'ultimate-bundle', name: 'Season 1 Ultimate Bundle', price: 49.99, image: 'assets/misc/seasonalbundle.png', value: '(Save $36.03) (Worth ~84,500 Dashes) (Best value)', packageId: '7175b35d-16e3-4614-8ace-20fa884a139c', items: ['20x Crusader Keys', '15x Champion Keys', '10x Ascendant Keys', '3x Seasonal Keys', '2x Booster Potions', '2x Universal Potions', '2.5k Dashes', '1x Iron Golem Spawner'] }
];
const CRATES = [
  { id: 'sentinel-crate', name: 'Sentinel Crate', image: 'assets/keys/sentinel_key.webp' },
  { id: 'crusader-crate', name: 'Crusader Crate', image: 'assets/keys/crusader_key.webp' },
  { id: 'champion-crate', name: 'Champion Crate', image: 'assets/keys/champion_key.webp' },
  { id: 'ascendant-crate', name: 'Ascendant Crate', image: 'assets/keys/ascendant_key.webp' },
  { id: 'seasonal-crate', name: 'Seasonal Crate', image: 'assets/keys/seasonal_key.png' },
];
const STORE_CATEGORIES = ['ranks', 'keys', 'bundles'];

const MC_USERNAME_RE = /^[A-Za-z0-9_]{3,16}$/;
