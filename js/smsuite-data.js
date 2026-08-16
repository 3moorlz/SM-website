const SMSUITE_DATA = [
  {
    id: "smcore",
    icon: "assets/smsuite/smcore.png",
    name: "SMCore",
    version: "v1.2.0",
    isCore: true,
    group: "core",
    category: "Core Framework",
    tagline: "Central foundation powering the entire SM Suite platform and shared APIs.",
    content: `
      <p><strong>SMCore</strong> is the foundation powering the entire SM Suite™ platform. Rather than having every plugin invent its own database, logging, and error reporting systems, SMCore provides a unified, powerful backbone for them all.</p>
      <p>It seamlessly handles shared services, tracks overall plugin health, orchestrates safe backups, and generates detailed diagnostics whenever something goes wrong. This makes our server ecosystem incredibly stable, easy to maintain, and safe to expand upon without risking data loss.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/smcore status</code> &mdash; Check suite status.</li>
        <li><code>/smcore health</code> &mdash; View detailed health metrics.</li>
        <li><code>/smcore diagnostics</code> &mdash; Review diagnostic reports.</li>
        <li><code>/smcore backup</code> &mdash; Trigger a core-supported safe backup.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.2.0 — Diagnostic Foundation",
        date: "July 2026",
        notes: [
          "Added `/smcore diagnostics` report generator with automated log inspection.",
          "Real-time runtime health metrics monitor (`/smcore health`).",
          "Automatic SQLite to MySQL schema migrations and zero-downtime backup framework.",
          "Performance monitor (`/smcore performance`) and dependency verification hooks."
        ]
      },
      {
        version: "v1.1.0 — Unified Framework",
        date: "June 2026",
        notes: [
          "Unified startup banner & configuration headers across all suite plugins.",
          "Shared player cache optimizations and scheduler timer manager.",
          "Automatic config upgrades and migration framework."
        ]
      },
      {
        version: "v1.0.0 — Genesis Release",
        date: "May 2026",
        notes: [
          "Central control API (`SMCore.getAPI()`) for every SM custom plugin.",
          "Cross-plugin event communication and shared Vault / LuckPerms / PlaceholderAPI hooks.",
          "Shared SQLite database layer with optional MySQL support.",
          "Shared Discord webhook manager with configurable events and audit logging.",
          "Shared GUI animation framework, pagination, searching & filtering utilities.",
          "Shared custom item registry & serialization."
        ]
      }
    ]
  },
  {
    id: "smaudit",
    icon: "assets/smsuite/smaudit.png",
    name: "SMAudit™",
    version: "v1.2.0",
    isCore: true,
    group: "core",
    category: "Audit & Security",
    tagline: "Keeps an immutable, tamper-proof audit trail of everything happening on the server.",
    content: `
      <p><strong>SMAudit</strong> is our custom accountability and tracking system. It securely receives events from all other SM plugins and routes them into structured logs, making it easy to see exactly what happened, when it happened, and who triggered it.</p>
      <p>Whether it's tracking marketplace transactions, staff moderation actions, or catching backend operational failures, SMAudit keeps a permanent, tamper-proof history. It actively feeds this incident data to SMAi so the server can intelligently diagnose issues.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/smaudit status</code> &mdash; Check audit system status.</li>
        <li><code>/smaudit incidents</code> &mdash; List recent server incidents.</li>
        <li><code>/smaudit incident &lt;id&gt;</code> &mdash; Inspect a specific incident.</li>
        <li><code>/smaudit retry</code> &mdash; Retry failed delivery events.</li>
        <li><code>/smaudit routes</code> &mdash; View configured audit streams.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.2.0 — Stream Routing Update",
        date: "July 2026",
        notes: [
          "Primary stream classification (Economy, Moderation, Teleport, Auth, Core).",
          "Discord webhook batch routing with intelligent rate-limit dampening.",
          "Detail route compatibility fix and operator UX command enhancements."
        ]
      },
      {
        version: "v1.1.0 — Console Noise Filtering",
        date: "June 2026",
        notes: [
          "Console noise filtering for high-frequency gameplay events.",
          "SMAi real-time anomaly stream dispatching.",
          "Tamper-proof event serialization and recovery retry queues."
        ]
      },
      {
        version: "v1.0.0 — Initial Release",
        date: "May 2026",
        notes: [
          "Core audit engine receiving events from SMStaff, SMOrders, SMAuctions, and SMFluxBridge.",
          "Configurable webhook destinations per severity level."
        ]
      }
    ]
  },
  {
    id: "smai",
    icon: "assets/smsuite/smai.png",
    name: "SMAi<sup style=\"font-size: 0.6em; font-weight: 700; margin-left: 0.05rem;\">SM</sup>",
    isCore: true,
    group: "core",
    category: "AI Caretaker",
    tagline: "Our handmade AI system that detects server and plugin issues and automatically fixes them.",
    content: `
      <p><strong>SMAi<sup style="font-size: 0.6em; font-weight: 700; margin-left: 0.05rem;">SM</sup></strong> is our completely handmade AI caretaker that constantly monitors the health of the server. It actively detects server anomalies, identifies plugin issues, and automatically executes safe fixes before they escalate.</p>
      <p>Instead of just logging errors, SMAi understands how our plugins interact. If a transaction fails or a critical task stalls, SMAi correlates the data, identifies the root cause, and coordinates a safe, reversible repair workflow to automatically fix it without human intervention.</p>
      <p><strong>Features:</strong></p>
      <ul>
        <li>Automated root-cause analysis for complex server issues.</li>
        <li>Safe, reversible self-repair workflows for approved problems.</li>
        <li>Validates that fixes actually worked post-repair.</li>
        <li>Escalates highly ambiguous or risky situations to human staff.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.0.0 — Autonomous Engine",
        date: "July 2026",
        notes: [
          "Automated anomaly correlation with SMAudit structured incident logs.",
          "Self-healing workflows for transaction stalls and cache desyncs.",
          "Post-repair validation checks and safe escalation to on-duty staff."
        ]
      }
    ]
  },
  {
    id: "smpvp",
    icon: "assets/smsuite/smpvp.png",
    name: "SMPvP™",
    version: "v1.0.0",
    isCore: false,
    group: "player",
    category: "Combat & PvP",
    tagline: "Our custom built combat management and PvP enforcement system.",
    content: `
      <p><strong>SMPvP</strong> is our production combat engine designed specifically for SpearMace SMP. It replaces legacy PvP wrappers with a high-performance, deterministic combat loop.</p>
      <p>It provides non-bypassable combat tagging, newbie protection, combat logging prevention, rocket/elytra/mace PvP balance, and seamless WorldGuard region awareness.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/smpvp status</code> &mdash; Check your active combat tag and timer.</li>
        <li><code>/smpvp pvp [on|off]</code> &mdash; Toggle personal PvP state in safe regions.</li>
        <li><code>/smpvp newbie</code> &mdash; Check newbie protection status.</li>
        <li><code>/smpvp inspect &lt;player&gt;</code> &mdash; Inspect combat state (Staff).</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.0.0 — Production Build",
        date: "August 15, 2026",
        notes: [
          "Promoted to first production build after comprehensive SHADOW testing by staff team.",
          "Removed automatic OP access; all combat permissions controlled explicitly via LuckPerms.",
          "Newbie protection system with customizable immunity timer and `/smpvp newbie` command.",
          "Personal PvP toggle system (`/smpvp pvp [on|off]`) for designated safe zones.",
          "Anti-kill abuse mitigation and repeated target farming detection.",
          "WorldGuard combat integration with strict region flag enforcement.",
          "Rocket, elytra, and mace PvP balancing mechanics to prevent combat exploits."
        ]
      },
      {
        version: "v1.0.0-RC1 — Combat Core Test",
        date: "August 2026",
        notes: [
          "Core combat tagging state engine with non-bypassable disconnect punishment.",
          "Firework / elytra combat lockout mechanics.",
          "Escape and movement controls during active combat."
        ]
      }
    ]
  },
  {
    id: "smstaff",
    icon: "assets/smsuite/smstaff.png",
    name: "SMStaff",
    version: "v1.2.1",
    isCore: false,
    group: "staff",
    category: "Staff Operations",
    tagline: "Comprehensive case-based staff moderation and accountability toolkit.",
    content: `
      <p><strong>SMStaff</strong> is our comprehensive moderation and operations toolkit. It integrates case-based punishments, player reports, Discord bridges, and accountability logging into one seamless workflow.</p>
      <p>Every single punishment is logged as a distinct case, ensuring total transparency and fairness. Staff can safely spectate, inspect inventories, and review moderation history, knowing every action is being tracked securely by SMAudit.</p>
      <p><strong>Staff Commands:</strong></p>
      <ul>
        <li><code>/staff</code> &mdash; Open the main control panel.</li>
        <li><code>/staffmode</code> &mdash; Toggle protected staff mode with inventory snapshots.</li>
        <li><code>/report</code> &mdash; Allows players to quickly report rule-breakers.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.2.1 — Case History & Safety",
        date: "July 2026",
        notes: [
          "Sequential case numbering for all server infractions and punishments.",
          "Target player offense history lookup and auto-escalation tracking.",
          "Audit retry reliability and snapshot integrity verification."
        ]
      },
      {
        version: "v1.2.0 — Moderation Suite Rewrite",
        date: "July 2026",
        notes: [
          "Discord remote staff command bridge with two-way channel sync.",
          "Protected `/staffmode` with hotbar tool presets and zero inventory loss guarantee.",
          "Integrated `/report` workflow routing player reports to online staff."
        ]
      },
      {
        version: "v1.1.5 — Offline Inspection",
        date: "June 2026",
        notes: [
          "Offline inventory and Ender Chest inspection tools for investigation.",
          "Rollback safety checkpoints with SMAudit verification."
        ]
      },
      {
        version: "v1.0.0 — Initial Release",
        date: "May 2026",
        notes: [
          "Case-based moderation workflow for kicks, mutes, bans, and warnings."
        ]
      }
    ]
  },
  {
    id: "smorders",
    icon: "assets/smsuite/smorders.png",
    name: "SMOrders",
    version: "v1.3.0",
    isCore: false,
    group: "player",
    category: "Player Economy",
    tagline: "Request the exact items you need, and let others fill the order.",
    content: `
      <p><strong>SMOrders</strong> is a fully player-driven buy-order marketplace. Instead of scrolling through shops hoping to find what you want, you can put up a public request for the exact items you need and offer a cash bounty for them.</p>
      <p>Other players can instantly fulfill your requests and claim the bounty. It creates a fantastic demand-driven economy where gatherers always have a clear, profitable way to sell their loot.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/orders</code> (or <code>/buyorders</code>) &mdash; Open the order marketplace to request or fulfill items.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.3.0 — Guided GUI & Chat Hook",
        date: "July 2026",
        notes: [
          "Interactive guided order creation interface with step-by-step quantity/pricing.",
          "Private chat input hooks preventing chat pollution while setting prices.",
          "Safer transactional interaction and instant cancellation refund returns.",
          "Database concurrency optimizations for simultaneous fulfillment."
        ]
      },
      {
        version: "v1.0.0 — Order Marketplace",
        date: "May 2026",
        notes: [
          "Initial buy-order system allowing players to post item requests with cash bounties.",
          "Rank-tiered order limits and active listing durations."
        ]
      }
    ]
  },
  {
    id: "smauctions",
    icon: "assets/smsuite/smauctions.png",
    name: "SMAuctions",
    version: "v1.3.0",
    isCore: false,
    group: "player",
    category: "Player Economy",
    tagline: "A custom made auction house system with instant buyout and anti-snipe bidding.",
    content: `
      <p><strong>SMAuctions</strong> is our highly competitive player-to-player auction house. Whether you want to list items for an instant buyout or start a bidding war, this system handles it perfectly.</p>
      <p>It includes smart escrow handling, safe outbid refunds, and anti-snipe extensions so auctions are always fair. Higher ranks unlock additional auction capacity and longer listing durations, giving you a serious edge in the market.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/ah</code> (or <code>/auction</code>) &mdash; Open the main auction house interface.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.3.0 — Guided Auction & Anti-Snipe",
        date: "July 2026",
        notes: [
          "Guided auction creation GUI with item preview and private chat input.",
          "Anti-snipe timer extension when bids are placed in closing seconds.",
          "Safe escrow handling with automatic, instant refund on outbid.",
          "Collection vault for expired and cancelled auction items."
        ]
      },
      {
        version: "v1.0.0 — Competitive AH",
        date: "May 2026",
        notes: [
          "Initial auction house with Buy-Now listings and public bidding wars.",
          "Rank progression integrations for listing caps and duration tiers."
        ]
      }
    ]
  },
  {
    id: "smdashshop",
    icon: "assets/smsuite/smdashshop.png",
    name: "SMDashShop",
    version: "v1.2.0",
    isCore: false,
    group: "player",
    category: "Progression Shop",
    tagline: "Spend your earned Dashes on items, drill pickaxes, and keys.",
    content: `
      <p><strong>SMDashShop</strong> is our permanent storefront where you can spend <strong>Dashes</strong>—our unique progression currency. It’s a reliable place to turn your hard-earned activity into highly valuable rewards.</p>
      <p>You can purchase everything from rank keys to premium gameplay items. Best of all, every transaction is heavily protected by our core systems, ensuring you never lose your Dashes or items if the server lags or restarts during a purchase.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/dashshop</code> (or <code>/dshop</code>) &mdash; Open the Dash marketplace.</li>
        <li><code>/dashshop balance</code> &mdash; View your current Dash balance.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.2.0 — Shop Polish & Decay Engine",
        date: "July 2026",
        notes: [
          "Category overhaul and purchase confirmation menus.",
          "7-day decay timer for 3x3 Drill Pickaxes with offline chunk rendering optimization.",
          "Closed storage loopholes (bundles, shulkers, item frames, ender chests)."
        ]
      },
      {
        version: "v1.0.8 — Shard Boosters & Hotbar HUD",
        date: "Early 2026",
        notes: [
          "Added hotbar timer for 2x AFK shard multipliers and universal shard potions.",
          "Daily and weekly purchase limits per product.",
          "Decayed item packet spoof protection."
        ]
      },
      {
        version: "v1.0.0 — Java Rewrite",
        date: "May 2026",
        notes: [
          "Replaced legacy Skript Dash system with high-performance Java plugin.",
          "PlayerPoints and Multiverse integrations with webhook transaction logging."
        ]
      }
    ]
  },
  {
    id: "smcaveexplorer",
    icon: "assets/smsuite/smcaveexplorer.png",
    name: "SMCaveExplorer",
    version: "v1.1.9",
    isCore: false,
    group: "player",
    category: "Dynamic Merchant",
    tagline: "Discover new items and rotating trades every week.",
    content: `
      <p><strong>SMCaveExplorer</strong> is a dynamic, rotating merchant that offers completely different themed trades depending on the day of the week. It keeps the economy fresh and gives you a reason to check back regularly.</p>
      <p>Trades can include rare keys, unique value exchanges, and special daily rewards. Stock is carefully controlled, and transactions are strictly logged to ensure fair play and robust economy balancing.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/caveexplorer</code> (or <code>/caveshop</code>) &mdash; View the merchant's daily offers.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.1.9 — Stability & Bugfix",
        date: "Early 2026",
        notes: [
          "Fixed `Bukkit.getConsoleSender()` return exception.",
          "Eliminated ghost item duplicate exploits during high-latency transactions.",
          "Countdown cycle UI timer fixes."
        ]
      },
      {
        version: "v1.0.0 — Initial Release",
        date: "Early 2026",
        notes: [
          "Cycleable daily merchant reading Dashes as currency.",
          "Vault and EssentialsX integrations with force-cycle admin controls."
        ]
      }
    ]
  },
  {
    id: "smcommands",
    icon: "assets/smsuite/smcommands.png",
    name: "SMCommands",
    version: "v1.2.0",
    isCore: false,
    group: "player",
    category: "Player Utilities",
    tagline: "A custom made commands system to keep commands used by everyday players cleaner.",
    content: `
      <p><strong>SMCommands</strong> brings focused, quality-of-life utilities to the SpearMace SMP experience. It manages safe teleporting and protected warmups.</p>
      <p>When you teleport, this system ensures you are safely routed and protected during warmups. It’s fully integrated with our audit systems to ensure you never lose out on safe travel due to server restarts or issues.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/pit</code> &mdash; Teleport directly to the Pit.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.2.0 — Safe Navigation Update",
        date: "July 2026",
        notes: [
          "Protected teleport warmups with damage and movement cancellation handlers.",
          "`/pit` direct arena routing overriding vanilla command conflicts.",
          "Startup cleanup and performance optimizations."
        ]
      },
      {
        version: "v1.0.0 — Initial Release",
        date: "May 2026",
        notes: [
          "Custom player command suite built on SMCore framework."
        ]
      }
    ]
  },
  {
    id: "smportals",
    icon: "assets/smsuite/smportals.png",
    name: "SMPortals",
    version: "v1.2.0",
    isCore: false,
    group: "player",
    category: "World Navigation",
    tagline: "Walk through custom portals to seamlessly transition between worlds.",
    content: `
      <p><strong>SMPortals</strong> powers the immersive, physical portal network across the server. Instead of relying purely on commands, you can just walk right into a portal to be seamlessly transitioned to different worlds or regions.</p>
      <p>The system natively handles all permissions, teleport delays, and safety checks to ensure you never spawn inside blocks or take unfair damage. It makes traveling feel like a natural part of the world.</p>
      <p><strong>Staff Commands:</strong></p>
      <ul>
        <li><code>/smportal</code> &mdash; Manage portal creation, linking, and cooldowns.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.2.0 — World Routing Update",
        date: "July 2026",
        notes: [
          "Smooth interworld transitions with obstruction safety checking.",
          "Configurable entry delay and teleport cooldown prevention.",
          "Portal linking management tools (`/smportal`)."
        ]
      },
      {
        version: "v1.0.0 — Initial Release",
        date: "May 2026",
        notes: [
          "Physical portal architecture replacing legacy portals."
        ]
      }
    ]
  },
  {
    id: "smstreaks",
    icon: "assets/smsuite/smstreaks.png",
    name: "SMStreaks",
    version: "v1.0.0",
    isCore: false,
    group: "player",
    category: "Progression & Streaks",
    tagline: "Earn daily rewards and progressive Dash payouts just for playing actively.",
    content: `
      <p><strong>SMStreaks</strong> rewards you for consistent, active participation on the server. By meeting a daily active-play requirement, you build up a streak that unlocks increasingly better rewards over time.</p>
      <p>We’ve also included a 'Streak Saver' system, so if you happen to miss a single day, you won't lose months of progress. It's the ultimate way to get rewarded just for enjoying the server on a daily basis.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/streak</code> (or <code>/daily</code>) &mdash; Open your daily streak interface.</li>
        <li><code>/streak claim</code> &mdash; Claim your eligible daily rewards.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.0.0 — Production Release",
        date: "May 2026",
        notes: [
          "Daily active play qualification tracker.",
          "Progressive Dash payout tracks: Member (20), Sentinel (30), Crusader (40), Champion (55), Ascendant (75), Immortal (100).",
          "Streak Saver mechanism preserving active streak progress."
        ]
      }
    ]
  },
  {
    id: "smenderchest",
    icon: "assets/smsuite/smenderchest.png",
    name: "SMEnderChest",
    version: "v1.0.1",
    isCore: false,
    group: "player",
    category: "Player Storage",
    tagline: "Progression-aware storage vault scaling up to 54 slots with overflow recovery.",
    content: `
      <p><strong>SMEnderChest</strong> takes the vanilla 27-slot Ender Chest and turns it into a fully progression-aware storage vault. As you rank up on the server, your private storage capacity naturally expands.</p>
      <p>The system is incredibly safe—if your rank changes or your capacity drops, it utilizes a protected overflow storage system to ensure your valuable items are never silently deleted or lost.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/enderchest</code> (or <code>/ec</code>) &mdash; Open your expanded storage.</li>
        <li><code>/enderchest overflow</code> &mdash; Access protected overflow items.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.0.1 — Integration Patch",
        date: "June 2026",
        notes: [
          "Smooth LuckPerms rank inheritance storage scaling (27 to 54 slots / 3 to 6 rows).",
          "Protected overflow recovery vault (`/ec overflow`) preventing item loss during rank transitions.",
          "Command interceptor ensuring `/ec` respects server storage permissions."
        ]
      },
      {
        version: "v1.0.0 — Storage Engine",
        date: "June 2026",
        notes: [
          "Custom multi-row Ender Chest storage architecture."
        ]
      }
    ]
  },
  {
    id: "smtutorial",
    icon: "assets/smsuite/smtutorials.png",
    name: "SMTutorial",
    version: "v1.2.0",
    isCore: false,
    group: "player",
    category: "Player Onboarding",
    tagline: "An interactive guided NPC onboarding flow to get you started on the server.",
    content: `
      <p><strong>SMTutorial</strong> is a fully interactive, guided flow designed to teach new players exactly how SpearMace SMP works. From the Dash Shop to the Pit, it walks you through our custom systems step by step.</p>
      <p>Using NPC interactions, guided teleports, and custom titles, it ensures nobody is left confused about how to progress. Complete the tutorial to get a strong grasp on the server and earn a few starter rewards along the way!</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/tutorial start</code> &mdash; Begin the interactive guide.</li>
        <li><code>/tutorial resume</code> &mdash; Pick up where you left off.</li>
        <li><code>/smtutorial bindnpc</code> &mdash; Bind the tutorial to an NPC (Admin).</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.2.0 — Citizens NPC Integration",
        date: "July 2026",
        notes: [
          "Citizens NPC interactive binding flow (`/smtutorial bindnpc`).",
          "Guided teleports, custom title broadcasts, and progress resumption semantics.",
          "Tutorial GUI cleanup and starter reward dispatching."
        ]
      },
      {
        version: "v1.0.0 — Initial Release",
        date: "June 2026",
        notes: [
          "Interactive onboarding tutorial flow for newly registered players."
        ]
      }
    ]
  },
  {
    id: "smadmin",
    icon: "assets/smsuite/smadmin.png",
    name: "SMAdmin",
    version: "v1.0.0",
    isCore: false,
    group: "staff",
    category: "Server Administration",
    tagline: "Centralizes critical server operations, restart countdowns, and maintenance mode.",
    content: `
      <p><strong>SMAdmin</strong> centralizes the most critical server operations into a controlled, safe environment for authorized administrators. It replaces messy ad-hoc commands with streamlined, recoverable workflows.</p>
      <p>Whether we're initiating a controlled server restart, toggling maintenance mode, or creating backup checkpoints before major updates, SMAdmin ensures the server remains perfectly stable and highly observable during sensitive operations.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/smadmin backup</code> &mdash; Run a controlled backup.</li>
        <li><code>/smrestart</code> &mdash; Safely start a restart countdown.</li>
        <li><code>/smmaintenance</code> &mdash; Toggle maintenance mode on or off.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.0.0 — Production Build",
        date: "May 2026",
        notes: [
          "Safe restart countdown manager (`/smrestart`) with automatic broadcast alerts.",
          "Server maintenance mode (`/smmaintenance`) with whitelist bypass.",
          "On-demand server data checkpoints and safe snapshot creation (`/smadmin backup`)."
        ]
      }
    ]
  },
  {
    id: "smfluxbridge",
    icon: "assets/smsuite/SMFluxBridge.png",
    name: "SMFluxBridge",
    version: "v1.2.2",
    isCore: false,
    group: "communicators",
    category: "Store & Discord Bridge",
    tagline: "Seamlessly connects our in-game systems with the web store and Discord.",
    content: `
      <p><strong>SMFluxBridge</strong> is our reliable third-party bridge between SpearMace SMP and FluxStore. It ensures purchases are delivered safely and subscriptions stay in sync.</p>
      <p>It includes a robust Discord integration for securely linking your Minecraft account to Discord to receive subscription reminders and roles.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/subscription</code> &mdash; View synchronized status and live renewal timer.</li>
        <li><code>/discordlink</code> &mdash; Securely link your Minecraft account to Discord.</li>
      </ul>
    `,
    changelog: [
      {
        version: "v1.2.2 — SignalR Parity Hotfix",
        date: "August 2026",
        notes: [
          "FluxStore SignalR reference-parity hotfix for real-time order delivery.",
          "Preserved Discord DM delivery diagnostics and automated role grants."
        ]
      },
      {
        version: "v1.2.0 — Linked Identity Release",
        date: "July 2026",
        notes: [
          "In-game Discord account verification (`/discordlink`).",
          "Automated Ticket Tool integration for donor priority tickets.",
          "Live subscription status and renewal countdowns (`/subscription`)."
        ]
      },
      {
        version: "v1.1.0 — Lifecycle Alerts",
        date: "June 2026",
        notes: [
          "Subscription expiration warnings and automatic role sync.",
          "Webhook event dispatcher for store checkout events."
        ]
      },
      {
        version: "v1.0.0 — Initial Bridge",
        date: "May 2026",
        notes: [
          "Real-time FluxStore purchase delivery protocol with duplicate protection."
        ]
      }
    ]
  },
  {
    id: "smac",
    name: "SMAC",
    version: "Coming Soon",
    isCore: false,
    group: "upcoming",
    category: "Anti-Cheat",
    tagline: "Our custom built anti-cheat system.",
    content: null,
    changelog: []
  },
  {
    id: "smessentials",
    icon: "",
    name: "SMEssentials™",
    version: "Coming Soon",
    isCore: false,
    group: "upcoming",
    category: "Core Utilities",
    tagline: "The essential suite of commands, homes, and spawn tools custom-built for SpearMace.",
    content: null,
    changelog: []
  },
  {
    id: "smeconomy",
    icon: "assets/smsuite/smsuite.png",
    name: "SMEconomy™",
    version: "Coming Soon",
    isCore: false,
    group: "upcoming",
    category: "Economy Engine",
    tagline: "A custom made economy system.",
    content: null,
    changelog: []
  }
];
