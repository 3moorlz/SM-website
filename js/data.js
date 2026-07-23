const DISCORD_URL = 'https://discord.smsmp.net/';
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

const KEYS = [
  { id: 'sentinel', name: 'Sentinel Key', image: 'assets/sentinel_key.webp', singlePrice: 0.29, packPrice: 1.19, saveText: 'Save $0.26', singleId: 'd041b0b3-07b2-44a0-9b80-1cacae690d6b', packId: '{PENDING_ID}' },
  { id: 'crusader', name: 'Crusader Key', image: 'assets/crusader_key.webp', singlePrice: 0.79, packPrice: 3.39, saveText: 'Save $0.56', singleId: 'a87c1e80-bb2d-4dff-ad22-93a912ab6e21', packId: '{PENDING_ID}' },
  { id: 'champion', name: 'Champion Key', image: 'assets/champion_key.webp', singlePrice: 1.49, packPrice: 3.39, saveText: 'Save $0.96', singleId: '9e4a6932-9342-4b24-a9e1-c41b41e01ac7', packId: '{PENDING_ID}' },
  { id: 'ascendant', name: 'Ascendant Key', image: 'assets/ascendant_key.webp', singlePrice: 2.99, packPrice: 12.99, saveText: 'Save $1.96', singleId: 'e3c3c88f-1650-4de2-91f6-305376158544', packId: '{PENDING_ID}' },
  { id: 'seasonal', name: 'Seasonal Key', image: 'assets/immortal_key.png', singlePrice: 5.99, packPrice: 24.99, saveText: 'Save $4.96', singleId: 'da4a57c5-9e42-471a-a106-69c16491bdf3', packId: '{PENDING_ID}' }
];

const BUNDLES = [
  { id: 'starter-bundle', name: 'Explorer Bundle', price: 4.99, image: 'assets/money.webp', value: '~2,375 Dashes Value', packageId: '6cc1e29b-c3ea-41f9-84f8-4a26a1e4dacb', items: ['10x Sentinel keys', '5x Crusader keys', '100 Dashes'] },
  { id: 'warrior-bundle', name: 'Adventurer Bundle', price: 9.99, image: 'assets/money.webp', value: '~8,100 Dashes Value', packageId: 'd7d91f4b-ef9f-47e3-9f8e-3707199d2c28', items: ['10x Sentinel keys', '10x Crusader keys', '3x Champion keys', '250 Dashes', '1x Rabbit spawner'] },
  { id: 'champion-bundle', name: 'Champion Bundle', price: 19.99, image: 'assets/money.webp', value: '~16,850 Dash Value', packageId: '31c90fdb-fab1-4312-9d4d-93306f172159', items: ['10x Crusader keys', '10x Champion keys', '3x Ascendant keys', '600 Dashes', '1x Sheep spawner'] },
  { id: 'ascendant-bundle', name: 'Ascendant Bundle', price: 34.99, image: 'assets/money.webp', value: '~32,200 Dash Value', packageId: '8d44c1b7-07e8-4e59-a96d-db6d37c9cb13', items: ['10x Champion keys', '10x Ascendant keys', '2x Seasonal keys', '1.2k Dashes', '1x Cow spawner'] },
  { id: 'ultimate-bundle', name: 'Season 1 Ultimate Bundle', price: 49.99, image: 'assets/money.webp', value: '84,500 Dashes Value', packageId: '7175b35d-16e3-4614-8ace-20fa884a139c', items: ['20x Sentinel keys', '15x Crusader keys', '10x Champion keys', '5x Ascendant keys', '3x Seasonal keys', '2.5k Dashes', '1x Iron Golem Spawner'] }
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
