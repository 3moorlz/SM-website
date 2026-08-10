
const T = { iron: 'var(--iron)', copper: 'var(--copper)', diamond: 'var(--diamond)', netherite: 'var(--netherite)', amber: 'var(--amber)', cash: 'var(--success)', key: 'var(--purple-mid)', cyan: 'var(--cyan)' };

const ITEM_API = 'https://api.minecraftitems.xyz/api/item';
function itemImgUrl(id, size = 4) { return `${ITEM_API}/${id}/size=${size}`; }

function slotMedia(entry) {
  if (entry.customAsset) {
    if (entry.name && entry.name.includes('Money Note')) {
      return `<img src="../assets/kitscrates/paper.png" alt="${entry.name}" loading="lazy" onerror="this.parentElement.classList.add('img-missing')">`;
    }
    return `<img src="${entry.customAsset}" alt="${entry.name}" loading="lazy" onerror="this.parentElement.classList.add('img-missing')">`;
  }

  let f = entry.name.toLowerCase().replace(/ /g, '_');

  if (f.includes('iron_pickaxe_(')) f = 'iron_pickaxe';
  if (f.includes('netherite_axe8')) f = 'netherite_axe';
  if (f.includes('netherite_spear_(')) f = 'netherite_spear';

  const overrides = {
    'steak': 'cooked_beef',
    'windcharges': 'wind_charge',
    'ender_pearls': 'ender_pearl',
    'enderpearl': 'ender_pearl',
    'experience_bottles': 'experience_bottle',
    'golden_apples': 'golden_apple',
    'golden_carrots': 'golden_carrot',
    'iron_blocks': 'iron_block',
    'iron_ingots': 'iron_ingot',
    'diamond_blocks': 'diamond_block',
    'netherite_upgrade': 'netherite_upgrade_smithing_template',
    'chainmail_armor': 'chainmail_chestplate',
  };
  
  if (f.includes('spawner')) {
    f = 'spawner';
  } else if (overrides[f]) {
    f = overrides[f];
  }
  
  return `<img src="../assets/kitscrates/${f}.png" alt="${entry.name}" loading="lazy" onerror="this.parentElement.classList.add('img-missing')">`;
}

const CARDS = [
  { id: 'immortal_kit', name: 'Immortal Kit', tier: 'var(--cyan)', emblemAsset: '../assets/ranks/immortal_banner.png', meta: '17 items', crate: false },
  { id: 'ascendant_kit', name: 'Ascendant Kit', tier: 'var(--purple-mid)', emblemAsset: '../assets/ranks/ascendant_banner.png', meta: '15 items', crate: false },
  { id: 'champion_kit', name: 'Champion Kit', tier: 'var(--amber)', emblemAsset: '../assets/ranks/champion_banner.png', meta: '15 items', crate: false },
  { id: 'crusader_kit', name: 'Crusader Kit', tier: 'var(--success)', emblemAsset: '../assets/ranks/crusader_banner.png', meta: '13 items', crate: false },
  { id: 'sentinel_kit', name: 'Sentinel Kit', tier: 'var(--text)', emblemAsset: '../assets/ranks/sentinel_banner.png', meta: '14 items', crate: false },
  { id: 'member_kit', name: 'Member Kit', tier: 'var(--iron)', emblemAsset: '../assets/ranks/member.png', meta: '14 items', crate: false },
  { id: 'seasonal_crate', name: 'Seasonal Crate', tier: 'var(--cyan)', emblemAsset: '../assets/keys/immortal_key.png', meta: '12 possible drops', crate: true },
  { id: 'ascendant_crate', name: 'Ascendant Crate', tier: 'var(--purple-mid)', emblemAsset: '../assets/keys/ascendant_key.webp', meta: '14 possible drops', crate: true },
  { id: 'champion_crate', name: 'Champion Crate', tier: 'var(--amber)', emblemAsset: '../assets/keys/champion_key.webp', meta: '15 possible drops', crate: true },
  { id: 'crusader_crate', name: 'Crusader Crate', tier: 'var(--success)', emblemAsset: '../assets/keys/crusader_key.webp', meta: '13 possible drops', crate: true },
  { id: 'sentinel_crate', name: 'Sentinel Crate', tier: 'var(--text)', emblemAsset: '../assets/keys/sentinel_key.webp', meta: '13 possible drops', crate: true },
];

const KIT_CRATE_DATA = {
  "member_kit": {
    "label": "Member Kit",
    "hasChance": false,
    "items": [
      {
        "name": "Chainmail Helmet",
        "qty": 1,
        "ench": [
          [
            "Curse of Vanishing",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "chainmail_helmet"
      },
      {
        "name": "Chainmail Chestplate",
        "qty": 1,
        "ench": [
          [
            "Curse of Vanishing",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "chainmail_chestplate"
      },
      {
        "name": "Chainmail Leggings",
        "qty": 1,
        "ench": [
          [
            "Curse of Vanishing",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "chainmail_leggings"
      },
      {
        "name": "Chainmail Boots",
        "qty": 1,
        "ench": [
          [
            "Curse of Vanishing",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "chainmail_boots"
      },
      {
        "name": "Stone Sword",
        "qty": 1,
        "ench": [
          [
            "Curse of Vanishing",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "stone_sword"
      },
      {
        "name": "Stone Pickaxe",
        "qty": 1,
        "ench": [
          [
            "Curse of Vanishing",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "stone_pickaxe"
      },
      {
        "name": "Stone Spear",
        "qty": 1,
        "ench": [
          [
            "Curse of Vanishing",
            ""
          ]
        ],
        "tier": T.iron,
        "custom": true,
        "fallbackId": "trident"
      },
      {
        "name": "Stone Axe",
        "qty": 1,
        "ench": [
          [
            "Curse of Vanishing",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "stone_axe"
      },
      {
        "name": "Mace",
        "qty": 1,
        "ench": [
          [
            "Unenchanted",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "mace"
      },
      {
        "name": "Steak",
        "qty": 8,
        "ench": [],
        "tier": T.amber,
        "id": "cooked_beef"
      },
      {
        "name": "Windcharges",
        "qty": 16,
        "ench": [],
        "tier": T.cyan,
        "id": "wind_charge"
      }
    ]
  },
  "sentinel_kit": {
    "label": "Sentinel Kit",
    "hasChance": false,
    "items": [
      {
        "name": "Iron Helmet",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "II"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_helmet"
      },
      {
        "name": "Iron Chestplate",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "II"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_chestplate"
      },
      {
        "name": "Iron Leggings",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "II"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_leggings"
      },
      {
        "name": "Iron Boots",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "II"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_boots"
      },
      {
        "name": "Iron Sword",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "II"
          ],
          [
            "Unbreaking",
            "I"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_sword"
      },
      {
        "name": "Iron Spear",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "II"
          ],
          [
            "Lunge",
            "I"
          ],
          [
            "Looting",
            "I"
          ],
          [
            "Unbreaking",
            "I"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "custom": true,
        "fallbackId": "trident"
      },
      {
        "name": "Iron Pickaxe",
        "qty": 1,
        "ench": [
          [
            "Efficiency",
            "II"
          ],
          [
            "Fortune",
            "I"
          ],
          [
            "Unbreaking",
            "I"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_pickaxe"
      },
      {
        "name": "Iron Axe",
        "qty": 1,
        "ench": [
          [
            "Efficiency",
            "II"
          ],
          [
            "Sharpness",
            "II"
          ],
          [
            "Unbreaking",
            "I"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_axe"
      },
      {
        "name": "Iron Shovel",
        "qty": 1,
        "ench": [
          [
            "Efficiency",
            "II"
          ],
          [
            "Unbreaking",
            "I"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_shovel"
      },
      {
        "name": "Mace",
        "qty": 1,
        "ench": [
          [
            "Density",
            "I"
          ],
          [
            "Windburst",
            "I"
          ]
        ],
        "tier": T.iron,
        "id": "mace"
      },
      {
        "name": "Iron Shovel",
        "qty": 1,
        "ench": [],
        "tier": T.iron,
        "id": "iron_shovel"
      },
      {
        "name": "Steak",
        "qty": 16,
        "ench": [],
        "tier": T.amber,
        "id": "cooked_beef"
      },
      {
        "name": "Windcharges",
        "qty": 32,
        "ench": [],
        "tier": T.cyan,
        "id": "wind_charge"
      },
      {
        "name": "Ender Pearls",
        "qty": 4,
        "ench": [],
        "tier": T.cyan,
        "id": "ender_pearl"
      }
    ]
  },
  "crusader_kit": {
    "label": "Crusader Kit",
    "hasChance": false,
    "items": [
      {
        "name": "Iron Helmet",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_helmet"
      },
      {
        "name": "Iron Chestplate",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_chestplate"
      },
      {
        "name": "Iron Leggings",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_leggings"
      },
      {
        "name": "Iron Boots",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_boots"
      },
      {
        "name": "Iron Sword",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "III"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_sword"
      },
      {
        "name": "Iron Spear",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "III"
          ],
          [
            "Lunge",
            "II"
          ],
          [
            "Knockback",
            "I"
          ],
          [
            "Looting",
            "II"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "custom": true,
        "fallbackId": "trident"
      },
      {
        "name": "Iron Pickaxe (Efficiency 3, Fortune 2, Unbreaking 2, Mending_",
        "qty": 1,
        "ench": [],
        "tier": T.iron,
        "id": "iron_pickaxe_(efficiency_3,_fortune_2,_unbreaking_2,_mending_"
      },
      {
        "name": "Iron Axe",
        "qty": 1,
        "ench": [
          [
            "Efficiency",
            "III"
          ],
          [
            "Sharpness",
            "III"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "iron_axe"
      },
      {
        "name": "Mace",
        "qty": 1,
        "ench": [
          [
            "Density",
            "II"
          ],
          [
            "Windburst",
            "I"
          ]
        ],
        "tier": T.iron,
        "id": "mace"
      },
      {
        "name": "Steak",
        "qty": 16,
        "ench": [],
        "tier": T.amber,
        "id": "cooked_beef"
      },
      {
        "name": "Golden Apples",
        "qty": 16,
        "ench": [],
        "tier": T.amber,
        "id": "golden_apple"
      },
      {
        "name": "Windcharges",
        "qty": 32,
        "ench": [],
        "tier": T.cyan,
        "id": "wind_charge"
      },
      {
        "name": "Ender Pearls",
        "qty": 8,
        "ench": [],
        "tier": T.cyan,
        "id": "ender_pearl"
      }
    ]
  },
  "champion_kit": {
    "label": "Champion Kit",
    "hasChance": false,
    "items": [
      {
        "name": "Diamond Helmet",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_helmet"
      },
      {
        "name": "Diamond Chestplate",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_chestplate"
      },
      {
        "name": "Diamond Leggings",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_leggings"
      },
      {
        "name": "Diamond Boots",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Feather Falling",
            "III"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_boots"
      },
      {
        "name": "Diamond Sword",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "IV"
          ],
          [
            "Sweeping Edge",
            "II"
          ],
          [
            "Looting",
            "II"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_sword"
      },
      {
        "name": "Diamond Spear",
        "qty": 1,
        "ench": [
          [
            "Lunge",
            "II"
          ],
          [
            "Sharpness",
            "IV"
          ],
          [
            "Knockback",
            "I"
          ],
          [
            "Looting",
            "II"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "custom": true,
        "fallbackId": "trident"
      },
      {
        "name": "Diamond Pickaxe",
        "qty": 1,
        "ench": [
          [
            "Fortune",
            "II"
          ],
          [
            "Efficiency",
            "IV"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_pickaxe"
      },
      {
        "name": "Diamond Axe",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "IV"
          ],
          [
            "Efficiency",
            "IV"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_axe"
      },
      {
        "name": "Mace",
        "qty": 1,
        "ench": [
          [
            "Density",
            "IV"
          ],
          [
            "Windburst",
            "I"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "mace"
      },
      {
        "name": "Mace",
        "qty": 1,
        "ench": [
          [
            "Breach",
            "II"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "mace"
      },
      {
        "name": "Golden Apples",
        "qty": 32,
        "ench": [],
        "tier": T.amber,
        "id": "golden_apple"
      },
      {
        "name": "Steak",
        "qty": 24,
        "ench": [],
        "tier": T.amber,
        "id": "cooked_beef"
      },
      {
        "name": "Windcharges",
        "qty": 48,
        "ench": [],
        "tier": T.cyan,
        "id": "wind_charge"
      },
      {
        "name": "Experience Bottles",
        "qty": 32,
        "ench": [],
        "tier": T.cyan,
        "id": "experience_bottle"
      },
      {
        "name": "Ender Pearls",
        "qty": 8,
        "ench": [],
        "tier": T.cyan,
        "id": "ender_pearl"
      }
    ]
  },
  "ascendant_kit": {
    "label": "Ascendant Kit",
    "hasChance": false,
    "items": [
      {
        "name": "Diamond Helmet",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Respiration",
            "III"
          ],
          [
            "Aqua Affinity",
            ""
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_helmet"
      },
      {
        "name": "Diamond Chestplate",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_chestplate"
      },
      {
        "name": "Diamond Leggings",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Swift Sneak",
            "II"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_leggings"
      },
      {
        "name": "Diamond Boots",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Feather Falling",
            "IV"
          ],
          [
            "Soul Speed",
            "II"
          ],
          [
            "Depth Strider",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_boots"
      },
      {
        "name": "Diamond Sword",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "V"
          ],
          [
            "Fire Aspect",
            "I"
          ],
          [
            "Looting",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_sword"
      },
      {
        "name": "Diamond Spear",
        "qty": 1,
        "ench": [
          [
            "Lunge",
            "II"
          ],
          [
            "Sharpness",
            "V"
          ],
          [
            "Knockback",
            "I"
          ],
          [
            "Looting",
            "III"
          ],
          [
            "Fire Aspect",
            "II"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "custom": true,
        "fallbackId": "trident"
      },
      {
        "name": "Diamond Pickaxe",
        "qty": 1,
        "ench": [
          [
            "Silk Touch",
            ""
          ],
          [
            "Efficiency",
            "V"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_pickaxe"
      },
      {
        "name": "Diamond Axe",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "V"
          ],
          [
            "Efficiency",
            "V"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_axe"
      },
      {
        "name": "Mace",
        "qty": 1,
        "ench": [
          [
            "Density",
            "IV"
          ],
          [
            "Windburst",
            "I"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "mace"
      },
      {
        "name": "Mace",
        "qty": 1,
        "ench": [
          [
            "Breach",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "mace"
      },
      {
        "name": "Golden Apples",
        "qty": 48,
        "ench": [],
        "tier": T.amber,
        "id": "golden_apple"
      },
      {
        "name": "Golden Carrots",
        "qty": 32,
        "ench": [],
        "tier": T.amber,
        "id": "golden_carrots"
      },
      {
        "name": "Windcharges",
        "qty": 64,
        "ench": [],
        "tier": T.cyan,
        "id": "wind_charge"
      },
      {
        "name": "Experience Bottles",
        "qty": 64,
        "ench": [],
        "tier": T.cyan,
        "id": "experience_bottle"
      },
      {
        "name": "Ender Pearls",
        "qty": 16,
        "ench": [],
        "tier": T.cyan,
        "id": "ender_pearl"
      }
    ]
  },
  "immortal_kit": {
    "label": "Immortal Kit",
    "hasChance": false,
    "items": [
      {
        "name": "Netherite Helmet",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Respiration",
            "III"
          ],
          [
            "Aqua Affinity",
            ""
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.netherite,
        "id": "netherite_helmet"
      },
      {
        "name": "Netherite Chestplate",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.netherite,
        "id": "netherite_chestplate"
      },
      {
        "name": "Netherite Leggings",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Swift Sneak",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.netherite,
        "id": "netherite_leggings"
      },
      {
        "name": "Netherite Boots",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Feather Falling",
            "IV"
          ],
          [
            "Soul Speed",
            "III"
          ],
          [
            "Depth Strider",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.netherite,
        "id": "netherite_boots"
      },
      {
        "name": "Netherite Sword",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "V"
          ],
          [
            "Sweeping Edge",
            "III"
          ],
          [
            "Fire Aspect",
            "II"
          ],
          [
            "Looting",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.netherite,
        "id": "netherite_sword"
      },
      {
        "name": "Netherite Spear",
        "qty": 1,
        "ench": [
          [
            "Lunge",
            "III"
          ],
          [
            "Sharpness",
            "V"
          ],
          [
            "Knockback",
            "II"
          ],
          [
            "Looting",
            "III"
          ],
          [
            "Fire Aspect",
            "II"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.netherite,
        "custom": true,
        "fallbackId": "trident"
      },
      {
        "name": "Netherite Pickaxe",
        "qty": 1,
        "ench": [
          [
            "Silk Touch",
            ""
          ],
          [
            "Efficiency",
            "V"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.netherite,
        "id": "netherite_pickaxe"
      },
      {
        "name": "Netherite Pickaxe",
        "qty": 1,
        "ench": [
          [
            "Fortune",
            "III"
          ],
          [
            "Efficiency",
            "V"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.netherite,
        "id": "netherite_pickaxe"
      },
      {
        "name": "Netherite Axe",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "V"
          ],
          [
            "Efficiency",
            "V"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.netherite,
        "id": "netherite_axe"
      },
      {
        "name": "Mace",
        "qty": 1,
        "ench": [
          [
            "Density",
            "V"
          ],
          [
            "Windburst",
            "I"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "mace"
      },
      {
        "name": "Mace",
        "qty": 1,
        "ench": [
          [
            "Breach",
            "IV"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "mace"
      },
      {
        "name": "Shield",
        "qty": 1,
        "ench": [
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.iron,
        "id": "shield"
      },
      {
        "name": "Golden Apples",
        "qty": 64,
        "ench": [],
        "tier": T.amber,
        "id": "golden_apple"
      },
      {
        "name": "Golden Carrots",
        "qty": 64,
        "ench": [],
        "tier": T.amber,
        "id": "golden_carrots"
      },
      {
        "name": "Windcharges",
        "qty": 128,
        "ench": [],
        "tier": T.cyan,
        "id": "wind_charge"
      },
      {
        "name": "Experience Bottles",
        "qty": 128,
        "ench": [],
        "tier": T.cyan,
        "id": "experience_bottle"
      },
      {
        "name": "Ender Pearls",
        "qty": 32,
        "ench": [],
        "tier": T.cyan,
        "id": "ender_pearl"
      }
    ]
  },
  "sentinel_crate": {
    "label": "Sentinel Crate",
    "hasChance": true,
    "items": [
      {
        "name": "Steak",
        "qty": 16,
        "ench": [],
        "chance": 7.692,
        "tier": T.amber,
        "id": "cooked_beef"
      },
      {
        "name": "Iron Ingots",
        "qty": 8,
        "ench": [],
        "chance": 7.692,
        "tier": T.iron,
        "id": "iron_ingots"
      },
      {
        "name": "Copper Helmet",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.copper,
        "custom": true,
        "fallbackId": "iron_helmet"
      },
      {
        "name": "Copper Chestplate",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.copper,
        "custom": true,
        "fallbackId": "iron_chestplate"
      },
      {
        "name": "Copper Leggings",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.copper,
        "custom": true,
        "fallbackId": "iron_leggings"
      },
      {
        "name": "Copper Boots",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.copper,
        "custom": true,
        "fallbackId": "iron_boots"
      },
      {
        "name": "Copper Sword",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.copper,
        "custom": true,
        "fallbackId": "iron_sword"
      },
      {
        "name": "Copper Axe",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "II"
          ]
        ],
        "chance": 7.692,
        "tier": T.copper,
        "custom": true,
        "fallbackId": "iron_axe"
      },
      {
        "name": "Copper Spear",
        "qty": 1,
        "ench": [
          [
            "Lunge",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.copper,
        "custom": true,
        "fallbackId": "trident"
      },
      {
        "name": "Copper Pickaxe",
        "qty": 1,
        "ench": [
          [
            "Silk Touch",
            ""
          ]
        ],
        "chance": 7.692,
        "tier": T.copper,
        "custom": true,
        "fallbackId": "iron_axe"
      },
      {
        "name": "5K Money Note",
        "qty": 1,
        "ench": [],
        "chance": 7.692,
        "tier": T.cash,
        "customAsset": "../assets/misc/money.webp"
      },
      {
        "name": "Crusader Key",
        "qty": 1,
        "ench": [],
        "chance": 7.692,
        "tier": T.key,
        "customAsset": "../assets/keys/crusader_key.webp"
      },
      {
        "name": "Rabbit Spawner",
        "qty": 1,
        "ench": [],
        "chance": 7.692,
        "tier": T.cyan,
        "id": "spawner"
      }
    ]
  },
  "crusader_crate": {
    "label": "Crusader Crate",
    "hasChance": true,
    "items": [
      {
        "name": "Golden Apples",
        "qty": 8,
        "ench": [],
        "chance": 7.692,
        "tier": T.amber,
        "id": "golden_apple"
      },
      {
        "name": "Iron Blocks",
        "qty": 2,
        "ench": [],
        "chance": 7.692,
        "tier": T.iron,
        "id": "iron_blocks"
      },
      {
        "name": "Iron Helmet",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "II"
          ],
          [
            "Unbreaking",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.iron,
        "id": "iron_helmet"
      },
      {
        "name": "Iron Chestplate",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "II"
          ],
          [
            "Unbreaking",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.iron,
        "id": "iron_chestplate"
      },
      {
        "name": "Iron Leggings",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "II"
          ],
          [
            "Unbreaking",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.iron,
        "id": "iron_leggings"
      },
      {
        "name": "Iron Boots",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "II"
          ],
          [
            "Unbreaking",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.iron,
        "id": "iron_boots"
      },
      {
        "name": "Iron Sword",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "II"
          ],
          [
            "Unbreaking",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.iron,
        "id": "iron_sword"
      },
      {
        "name": "Iron Axe",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "II"
          ],
          [
            "Unbreaking",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.iron,
        "id": "iron_axe"
      },
      {
        "name": "Iron Pickaxe",
        "qty": 1,
        "ench": [
          [
            "Silk Touch",
            ""
          ],
          [
            "Unbreaking",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.iron,
        "id": "iron_pickaxe"
      },
      {
        "name": "Iron Spear",
        "qty": 1,
        "ench": [
          [
            "Lunge",
            "I"
          ],
          [
            "Sharpness",
            "II"
          ],
          [
            "Unbreaking",
            "I"
          ]
        ],
        "chance": 7.692,
        "tier": T.iron,
        "custom": true,
        "fallbackId": "trident"
      },
      {
        "name": "7.5K Money Note",
        "qty": 1,
        "ench": [],
        "chance": 7.692,
        "tier": T.cash,
        "customAsset": "../assets/misc/money.webp"
      },
      {
        "name": "Champion Key",
        "qty": 1,
        "ench": [],
        "chance": 7.692,
        "tier": T.key,
        "customAsset": "../assets/keys/champion_key.webp"
      },
      {
        "name": "Sheep Spawner",
        "qty": 1,
        "ench": [],
        "chance": 7.692,
        "tier": T.cyan,
        "id": "spawner"
      }
    ]
  },
  "champion_crate": {
    "label": "Champion Crate",
    "hasChance": true,
    "items": [
      {
        "name": "Enderpearl",
        "qty": 2,
        "ench": [],
        "chance": 6.667,
        "tier": T.cyan,
        "id": "ender_pearl"
      },
      {
        "name": "Diamond Block",
        "qty": 2,
        "ench": [],
        "chance": 6.667,
        "tier": T.diamond,
        "id": "diamond_block"
      },
      {
        "name": "Diamond Helmet",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "III"
          ],
          [
            "Respiration",
            "II"
          ],
          [
            "Aqua Affinity",
            ""
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 6.667,
        "tier": T.diamond,
        "id": "diamond_helmet"
      },
      {
        "name": "Diamond Chestplate",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "III"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 6.667,
        "tier": T.diamond,
        "id": "diamond_chestplate"
      },
      {
        "name": "Diamond Leggings",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "III"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 6.667,
        "tier": T.diamond,
        "id": "diamond_leggings"
      },
      {
        "name": "Diamond Boots",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "III"
          ],
          [
            "Feather Falling",
            "III"
          ],
          [
            "Depth Strider",
            "II"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 6.667,
        "tier": T.diamond,
        "id": "diamond_boots"
      },
      {
        "name": "Diamond Sword",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "IV"
          ],
          [
            "Sweeping Edge",
            "II"
          ],
          [
            "Fire Aspect",
            "I"
          ],
          [
            "Looting",
            "II"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 6.667,
        "tier": T.diamond,
        "id": "diamond_sword"
      },
      {
        "name": "Diamond Axe",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "IV"
          ],
          [
            "Efficiency",
            "IV"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 6.667,
        "tier": T.diamond,
        "id": "diamond_axe"
      },
      {
        "name": "Diamond Spear",
        "qty": 1,
        "ench": [
          [
            "Lunge",
            "II"
          ],
          [
            "Sharpness",
            "IV"
          ],
          [
            "Fire Aspect",
            "I"
          ],
          [
            "Looting",
            "II"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 6.667,
        "tier": T.diamond,
        "custom": true,
        "fallbackId": "trident"
      },
      {
        "name": "Diamond Pickaxe",
        "qty": 1,
        "ench": [
          [
            "Silk Touch",
            ""
          ],
          [
            "Efficiency",
            "IV"
          ],
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 6.667,
        "tier": T.diamond,
        "id": "diamond_pickaxe"
      },
      {
        "name": "10K Money Note",
        "qty": 1,
        "ench": [],
        "chance": 6.667,
        "tier": T.cash,
        "customAsset": "../assets/misc/money.webp"
      },
      {
        "name": "Ascendant Key",
        "qty": 1,
        "ench": [],
        "chance": 6.667,
        "tier": T.key,
        "customAsset": "../assets/keys/ascendant_key.webp"
      },
      {
        "name": "Cow Spawner",
        "qty": 1,
        "ench": [],
        "chance": 6.667,
        "tier": T.cyan,
        "id": "spawner"
      },
      {
        "name": "Elytra",
        "qty": 1,
        "ench": [
          [
            "Unbreaking",
            "I"
          ]
        ],
        "chance": 6.667,
        "tier": T.iron,
        "id": "elytra"
      },
      {
        "name": "Totem Of Undying",
        "qty": 1,
        "ench": [],
        "chance": 6.667,
        "tier": T.iron,
        "id": "totem_of_undying"
      }
    ]
  },
  "ascendant_crate": {
    "label": "Ascendant Crate",
    "hasChance": true,
    "items": [
      {
        "name": "Ender Pearls",
        "qty": 8,
        "ench": [],
        "chance": 7.143,
        "tier": T.cyan,
        "id": "ender_pearl"
      },
      {
        "name": "Netherite Upgrade",
        "qty": 1,
        "ench": [],
        "chance": 7.143,
        "tier": T.netherite,
        "id": "netherite_upgrade_smithing_template"
      },
      {
        "name": "Diamond Helmet",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Respiration",
            "III"
          ],
          [
            "Aqua Affinity",
            ""
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 7.143,
        "tier": T.diamond,
        "id": "diamond_helmet"
      },
      {
        "name": "Diamond Chestplate",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 7.143,
        "tier": T.diamond,
        "id": "diamond_chestplate"
      },
      {
        "name": "Diamond Leggings",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 7.143,
        "tier": T.diamond,
        "id": "diamond_leggings"
      },
      {
        "name": "Diamond Boots",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Feather Falling",
            "IV"
          ],
          [
            "Depth Strider",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 7.143,
        "tier": T.diamond,
        "id": "diamond_boots"
      },
      {
        "name": "Diamond Sword",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "V"
          ],
          [
            "Sweeping Edge",
            "III"
          ],
          [
            "Fire Aspect",
            "II"
          ],
          [
            "Looting",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 7.143,
        "tier": T.diamond,
        "id": "diamond_sword"
      },
      {
        "name": "Diamond Axe",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "V"
          ],
          [
            "Efficiency",
            "V"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "tier": T.diamond,
        "id": "diamond_axe"
      },
      {
        "name": "Diamond Spear",
        "qty": 1,
        "ench": [
          [
            "Lunge",
            "III"
          ],
          [
            "Sharpness",
            "V"
          ],
          [
            "Fire Aspect",
            "II"
          ],
          [
            "Knockback",
            "I"
          ],
          [
            "Looting",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 7.143,
        "tier": T.diamond,
        "custom": true,
        "fallbackId": "trident"
      },
      {
        "name": "Diamond Pickaxe",
        "qty": 1,
        "ench": [
          [
            "Silk Touch",
            ""
          ],
          [
            "Efficiency",
            "V"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 7.143,
        "tier": T.diamond,
        "id": "diamond_pickaxe"
      },
      {
        "name": "15K Money Note",
        "qty": 1,
        "ench": [],
        "chance": 7.143,
        "tier": T.cash,
        "customAsset": "../assets/misc/money.webp"
      },
      {
        "name": "Seasonal Key",
        "qty": 1,
        "ench": [],
        "chance": 7.143,
        "tier": T.key,
        "customAsset": "../assets/keys/immortal_key.png"
      },
      {
        "name": "Skeleton Spawner",
        "qty": 1,
        "ench": [],
        "chance": 7.143,
        "tier": T.cyan,
        "id": "spawner"
      },
      {
        "name": "Elytra",
        "qty": 1,
        "ench": [
          [
            "Unbreaking",
            "II"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 7.143,
        "tier": T.iron,
        "id": "elytra"
      }
    ]
  },
  "seasonal_crate": {
    "label": "Seasonal Crate",
    "hasChance": true,
    "items": [
      {
        "name": "Netherite Helmet",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Respiration",
            "III"
          ],
          [
            "Aqua Affinity",
            ""
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 8.333,
        "tier": T.netherite,
        "id": "netherite_helmet"
      },
      {
        "name": "Netherite Chestplate",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 8.333,
        "tier": T.netherite,
        "id": "netherite_chestplate"
      },
      {
        "name": "Netherite Leggings",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Swift Sneak",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 8.333,
        "tier": T.netherite,
        "id": "netherite_leggings"
      },
      {
        "name": "Netherite Boots",
        "qty": 1,
        "ench": [
          [
            "Protection",
            "IV"
          ],
          [
            "Feather Falling",
            "IV"
          ],
          [
            "Depth Strider",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 8.333,
        "tier": T.netherite,
        "id": "netherite_boots"
      },
      {
        "name": "Netherite Sword",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "V"
          ],
          [
            "Sweeping Edge",
            "III"
          ],
          [
            "Fire Aspect",
            "II"
          ],
          [
            "Knockback",
            "I"
          ],
          [
            "Looting",
            "III"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 8.333,
        "tier": T.netherite,
        "id": "netherite_sword"
      },
      {
        "name": "Netherite Axe8.333%Netherite Spear (Lunge 3, Sharpness 5, Fire Aspect 2, Knockback 1, Looting 3, Unbreaking3, Mending)",
        "qty": 1,
        "ench": [
          [
            "Sharpness",
            "V"
          ],
          [
            "Silk Touch",
            ""
          ],
          [
            "Efficiency",
            "V"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 8.333,
        "tier": T.netherite,
        "custom": true,
        "fallbackId": "trident"
      },
      {
        "name": "Netherite Pickaxe",
        "qty": 1,
        "ench": [
          [
            "Silk Touch",
            ""
          ],
          [
            "Efficiency",
            "V"
          ],
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 8.333,
        "tier": T.netherite,
        "id": "netherite_pickaxe"
      },
      {
        "name": "30K Money Note",
        "qty": 1,
        "ench": [],
        "chance": 8.333,
        "tier": T.cash,
        "customAsset": "../assets/misc/money.webp"
      },
      {
        "name": "Seasonal Key",
        "qty": 1,
        "ench": [],
        "chance": 8.333,
        "tier": T.key,
        "customAsset": "../assets/keys/immortal_key.png"
      },
      {
        "name": "Warden Spawner",
        "qty": 1,
        "ench": [],
        "chance": 8.333,
        "tier": T.cyan,
        "id": "spawner"
      },
      {
        "name": "Elytra",
        "qty": 1,
        "ench": [
          [
            "Unbreaking",
            "III"
          ],
          [
            "Mending",
            ""
          ]
        ],
        "chance": 8.333,
        "tier": T.iron,
        "id": "elytra"
      }
    ]
  }
};

const kitsGrid = document.getElementById('kitsGrid');
const cratesGrid = document.getElementById('cratesGrid');
const tooltip = document.getElementById('tooltip');
let pinnedSlot = null;

Object.keys(KIT_CRATE_DATA).forEach(key => {
  const d = KIT_CRATE_DATA[key];
  const modalHTML = `
<div class="modal preview-modal hidden" id="${key}-modal" role="dialog" aria-modal="true" aria-labelledby="${key}-title">
  <div class="modal-backdrop" data-preview-close="${key}"></div>
  <div class="modal-panel embed-modal">
    <button type="button" class="modal-close" data-preview-close="${key}" aria-label="Close">&times;</button>
    <div class="modal-header">
      <h2 id="${key}-title">${d.label}</h2>
      <span class="modal-meta">${d.items.length} items</span>
    </div>
    <div class="slot-grid" data-slot-grid="${key}"></div>
  </div>
</div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
});

CARDS.forEach(c => {
  const el = document.createElement('div');
  el.className = 'kit-card';
  el.style.setProperty('--tier', c.tier);
  el.innerHTML = `
    ${c.crate ? '<span class="tag-crate">Crate</span>' : '<span class="tag-rank">Rank</span>'}
    <div class="kit-emblem"><img src="${c.emblemAsset}" alt="${c.name}"></div>
    <h3>${c.name}</h3>
    <div class="kit-meta">${c.meta}</div>
    <button class="kit-preview-btn">Preview</button>`;

  const emblemImg = el.querySelector('.kit-emblem img');
  if (emblemImg) {
    emblemImg.addEventListener('error', () => {
      emblemImg.closest('.kit-emblem').classList.add('img-missing');
      emblemImg.remove();
    });
  }

  el.addEventListener('click', () => {
    openModal(c.id);
  });
  
  if (c.crate && cratesGrid) {
    cratesGrid.appendChild(el);
  } else if (!c.crate && kitsGrid) {
    kitsGrid.appendChild(el);
  }
});

function openModal(key) {
  const modal = document.getElementById(`${key}-modal`);
  if (!modal) return;
  modal.classList.remove('hidden');
  
  const grid = modal.querySelector(`[data-slot-grid="${key}"]`);
  if (grid.innerHTML.trim() === '') {
    renderGrid(key, grid);
  }
}

document.addEventListener('click', e => {
  const closeBtn = e.target.closest('[data-preview-close]');
  if (closeBtn) {
    const key = closeBtn.getAttribute('data-preview-close');
    const modal = document.getElementById(`${key}-modal`);
    if (modal) modal.classList.add('hidden');
    if (pinnedSlot) { pinnedSlot.classList.remove('pinned'); pinnedSlot = null; hideTip(); }
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
      modal.classList.add('hidden');
    });
    if (pinnedSlot) { pinnedSlot.classList.remove('pinned'); pinnedSlot = null; hideTip(); }
  }
});

function renderGrid(key, gridEl) {
  const d = KIT_CRATE_DATA[key];
  gridEl.innerHTML = '';
  const totalSlots = Math.max(18, Math.ceil(d.items.length / 9) * 9);
  
  for (let i = 0; i < totalSlots; i++) {
    const item = d.items[i];
    const slot = document.createElement('div');
    slot.className = 'slot' + (item ? '' : ' empty') + (item && item.custom ? ' is-custom' : '');
    if (item) {
      slot.style.setProperty('--tier', item.tier);
      slot.innerHTML = slotMedia(item) + (item.qty > 1 ? `<span class="qty">${item.qty}</span>` : '');

      const img = slot.querySelector('img');
      if (img) img.addEventListener('error', () => slot.classList.add('img-missing'));

      slot.addEventListener('mouseenter', () => { if (!pinnedSlot) showTip(item, slot); });
      slot.addEventListener('mouseleave', () => { if (!pinnedSlot) hideTip(); });
      slot.addEventListener('click', (e) => {
        e.stopPropagation();
        if (pinnedSlot === slot) { slot.classList.remove('pinned'); hideTip(); pinnedSlot = null; return; }
        if (pinnedSlot) pinnedSlot.classList.remove('pinned');
        pinnedSlot = slot;
        slot.classList.add('pinned');
        showTip(item, slot);
      });
    }
    gridEl.appendChild(slot);
  }
}

function showTip(item, slot) {
  let html = `<div class="t-name">${item.name}</div>`;
  if (item.ench && item.ench.length) {
    html += `<div class="t-ench">` + item.ench.map(e => `${e[0]}${e[1] ? ' '+e[1] : ''}`).join('<br>') + `</div>`;
  }
  if (item.chance !== undefined) {
    html += `<div class="t-chance">&raquo; Drop chance: ${item.chance}%</div>`;
  }
  if (item.qty > 1) {
    html += `<div class="t-qty">Qty: ${item.qty}</div>`;
  }

  tooltip.innerHTML = html;
  
  const r = slot.getBoundingClientRect();
  let top = r.top - 8;
  let left = r.left + r.width / 2;
  tooltip.style.left = left + 'px';
  tooltip.style.top = top + 'px';
  tooltip.style.transform = 'translate(-50%, -100%)';
  tooltip.classList.add('show');
  
  requestAnimationFrame(() => {
    const tr = tooltip.getBoundingClientRect();
    if (tr.left < 8) tooltip.style.left = (8 + tr.width/2) + 'px';
    if (tr.right > window.innerWidth - 8) tooltip.style.left = (window.innerWidth - 8 - tr.width/2) + 'px';
    if (tr.top < 8) { tooltip.style.top = (r.bottom + 8) + 'px'; tooltip.style.transform = 'translate(-50%, 0)'; }
  });
}

function hideTip() { tooltip.classList.remove('show'); }

document.addEventListener('click', () => {
  if (pinnedSlot) { pinnedSlot.classList.remove('pinned'); pinnedSlot = null; hideTip(); }
});
