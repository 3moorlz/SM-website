const SMSUITE_DATA = [
  {
    id: "smcore",
    icon: "assets/smsuite/smcore.png",
    name: "SMCore",
    version: "v1.2.0",
    isCore: true,
    group: "core",
    tagline: "Our server's core plugin that keeps the SM Suite ecosystem running smoothly.",
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
    `
  },
  {
    id: "smaudit",
    icon: "assets/smsuite/smaudit.png", 
    name: "SMAudit™",
    version: "v1.2.0",
    isCore: true,
    group: "core",
    tagline: "Keeps a detailed log of everything happening on the server.",
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
    `
  },
  {
    id: "smai",
    icon: "assets/smsuite/smai.png",
    name: "SMAi<sup style=\"font-size: 0.6em; font-weight: 700; margin-left: 0.05rem;\">SM</sup>",
    isCore: true,
    group: "core",
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
    `
  },
  {
    id: "smcommands",
    icon: "assets/smsuite/smcommands.png",
    name: "SMCommands",
    version: "v1.2.0",
    isCore: false,
    group: "player",
    tagline: "A custom made commands system to keep commands used by everyday players cleaner.",
    content: `
      <p><strong>SMCommands</strong> brings focused, quality-of-life utilities to the SpearMace SMP experience. It manages safe teleporting and protected warmups.</p>
      <p>When you teleport, this system ensures you are safely routed and protected during warmups. It’s fully integrated with our audit systems to ensure you never lose out on safe travel due to server restarts or issues.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/pit</code> &mdash; Teleport directly to the Pit.</li>
      </ul>
    `
  },
  {
    id: "smportals",
    icon: "assets/smsuite/smportals.png",
    name: "SMPortals",
    version: "v1.2.0",
    isCore: false,
    group: "player",
    tagline: "Walk through custom portals to quickly go into where you want.",
    content: `
      <p><strong>SMPortals</strong> powers the immersive, physical portal network across the server. Instead of relying purely on commands, you can just walk right into a portal to be seamlessly transitioned to different worlds or regions.</p>
      <p>The system natively handles all permissions, teleport delays, and safety checks to ensure you never spawn inside blocks or take unfair damage. It makes traveling feel like a natural part of the world.</p>
      <p><strong>Staff Commands:</strong></p>
      <ul>
        <li><code>/smportal</code> &mdash; Manage portal creation, linking, and cooldowns.</li>
      </ul>
    `
  },
  {
    id: "smdashshop",
    icon: "assets/smsuite/smdashshop.png",
    name: "SMDashShop",
    version: "v1.2.0",
    isCore: false,
    group: "player",
    tagline: "Spend your earned Dashes on items.",
    content: `
      <p><strong>SMDashShop</strong> is our permanent storefront where you can spend <strong>Dashes</strong>—our unique progression currency. It’s a reliable place to turn your hard-earned activity into highly valuable rewards.</p>
      <p>You can purchase everything from rank keys to premium gameplay items. Best of all, every transaction is heavily protected by our core systems, ensuring you never lose your Dashes or items if the server lags or restarts during a purchase.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/dashshop</code> (or <code>/dshop</code>) &mdash; Open the Dash marketplace.</li>
        <li><code>/dashshop balance</code> &mdash; View your current Dash balance.</li>
      </ul>
    `
  },
  {
    id: "smcaveexplorer",
    icon: "assets/smsuite/smcaveexplorer.png",
    name: "SMCaveExplorer",
    version: "v1.0.0",
    isCore: false,
    group: "player",
    tagline: "Discover new items and rotating trades every week.",
    content: `
      <p><strong>SMCaveExplorer</strong> is a dynamic, rotating merchant that offers completely different themed trades depending on the day of the week. It keeps the economy fresh and gives you a reason to check back regularly.</p>
      <p>Trades can include rare keys, unique value exchanges, and special daily rewards. Stock is carefully controlled, and transactions are strictly logged to ensure fair play and robust economy balancing.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/caveexplorer</code> (or <code>/caveshop</code>) &mdash; View the merchant's daily offers.</li>
      </ul>
    `
  },
  {
    id: "smorders",
    icon: "assets/smsuite/smorders.png",
    name: "SMOrders",
    version: "v1.3.0",
    isCore: false,
    group: "player",
    tagline: "Request the exact items you need, and let others fill the order.",
    content: `
      <p><strong>SMOrders</strong> is a fully player-driven buy-order marketplace. Instead of scrolling through shops hoping to find what you want, you can put up a public request for the exact items you need and offer a cash bounty for them.</p>
      <p>Other players can instantly fulfill your requests and claim the bounty. It creates a fantastic demand-driven economy where gatherers always have a clear, profitable way to sell their loot.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/orders</code> (or <code>/buyorders</code>) &mdash; Open the order marketplace to request or fulfill items.</li>
      </ul>
    `
  },
  {
    id: "smauctions",
    icon: "assets/smsuite/smauctions.png",
    name: "SMAuctions",
    version: "v1.3.0",
    isCore: false,
    group: "player",
    tagline: "A custom made auction house system",
    content: `
      <p><strong>SMAuctions</strong> is our highly competitive player-to-player auction house. Whether you want to list items for an instant buyout or start a bidding war, this system handles it perfectly.</p>
      <p>It includes smart escrow handling, safe outbid refunds, and anti-snipe extensions so auctions are always fair. Higher ranks unlock additional auction capacity and longer listing durations, giving you a serious edge in the market.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/ah</code> (or <code>/auction</code>) &mdash; Open the main auction house interface.</li>
      </ul>
    `
  },
  {
    id: "smstreaks",
    icon: "assets/smsuite/smstreaks.png",
    name: "SMStreaks",
    version: "v1.0.0",
    isCore: false,
    group: "player",
    tagline: "Earn daily rewards just for playing actively.",
    content: `
      <p><strong>SMStreaks</strong> rewards you for consistent, active participation on the server. By meeting a daily active-play requirement, you build up a streak that unlocks increasingly better rewards over time.</p>
      <p>We’ve also included a 'Streak Saver' system, so if you happen to miss a single day, you won't lose months of progress. It's the ultimate way to get rewarded just for enjoying the server on a daily basis.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/streak</code> (or <code>/daily</code>) &mdash; Open your daily streak interface.</li>
        <li><code>/streak claim</code> &mdash; Claim your eligible daily rewards.</li>
      </ul>
    `
  },
  {
    id: "smenderchest",
    icon: "assets/smsuite/smenderchest.png",
    name: "SMEnderChest",
    version: "v1.0.1",
    isCore: false,
    group: "player",
    tagline: "For staff team to be able to easily view ender chests",
    content: `
      <p><strong>SMEnderChest</strong> takes the vanilla 27-slot Ender Chest and turns it into a fully progression-aware storage vault. As you rank up on the server, your private storage capacity naturally expands.</p>
      <p>The system is incredibly safe—if your rank changes or your capacity drops, it utilizes a protected overflow storage system to ensure your valuable items are never silently deleted or lost.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/enderchest</code> (or <code>/ec</code>) &mdash; Open your expanded storage.</li>
        <li><code>/enderchest overflow</code> &mdash; Access protected overflow items.</li>
      </ul>
    `
  },
  {
    id: "smtutorial",
    icon: "assets/smsuite/smtutorials.png",
    name: "SMTutorial",
    version: "v1.2.0",
    isCore: false,
    group: "player",
    tagline: "An interactive guide to get you started on the server.",
    content: `
      <p><strong>SMTutorial</strong> is a fully interactive, guided flow designed to teach new players exactly how SpearMace SMP works. From the Dash Shop to the Pit, it walks you through our custom systems step by step.</p>
      <p>Using NPC interactions, guided teleports, and custom titles, it ensures nobody is left confused about how to progress. Complete the tutorial to get a strong grasp on the server and earn a few starter rewards along the way!</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/tutorial start</code> &mdash; Begin the interactive guide.</li>
        <li><code>/tutorial resume</code> &mdash; Pick up where you left off.</li>
        <li><code>/smtutorial bindnpc</code> &mdash; Bind the tutorial to an NPC (Admin).</li>
      </ul>
    `
  },
  {
    id: "smstaff",
    icon: "assets/smsuite/smstaff.png",
    name: "SMStaff",
    version: "v1.2.1",
    isCore: false,
    group: "staff",
    tagline: "A custom made staff moderation system.",
    content: `
      <p><strong>SMStaff</strong> is our comprehensive moderation and operations toolkit. It integrates case-based punishments, player reports, Discord bridges, and accountability logging into one seamless workflow.</p>
      <p>Every single punishment is logged as a distinct case, ensuring total transparency and fairness. Staff can safely spectate, inspect inventories, and review moderation history, knowing every action is being tracked securely by SMAudit.</p>
      <p><strong>Staff Commands:</strong></p>
      <ul>
        <li><code>/staff</code> &mdash; Open the main control panel.</li>
        <li><code>/staffmode</code> &mdash; Toggle protected staff mode with inventory snapshots.</li>
        <li><code>/report</code> &mdash; Allows players to quickly report rule-breakers.</li>
      </ul>
    `
  },
  {
    id: "smadmin",
    icon: "assets/smsuite/smadmin.png",
    name: "SMAdmin",
    version: "v1.0.0",
    isCore: false,
    group: "staff",
    tagline: "Staff commands available to the higher ups",
    content: `
      <p><strong>SMAdmin</strong> centralizes the most critical server operations into a controlled, safe environment for authorized administrators. It replaces messy ad-hoc commands with streamlined, recoverable workflows.</p>
      <p>Whether we're initiating a controlled server restart, toggling maintenance mode, or creating backup checkpoints before major updates, SMAdmin ensures the server remains perfectly stable and highly observable during sensitive operations.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/smadmin backup</code> &mdash; Run a controlled backup.</li>
        <li><code>/smrestart</code> &mdash; Safely start a restart countdown.</li>
        <li><code>/smmaintenance</code> &mdash; Toggle maintenance mode on or off.</li>
      </ul>
    `
  },
  {
    id: "smac",
    name: "SMAC",
    version: "Coming Soon",
    isCore: false,
    group: "upcoming",
    tagline: "Our custom built anti-cheat system.",
    content: null
  },
  {
    id: "smfluxbridge",
    icon: "assets/smsuite/SMFluxBridge.png",
    name: "SMFluxBridge",
    version: "v1.2.2",
    isCore: false,
    group: "communicators",
    tagline: "Seamlessly connects our in-game systems with the web store and external APIs.",
    content: `
      <p><strong>SMFluxBridge</strong> is our reliable third-party bridge between SpearMace SMP and FluxStore. It ensures purchases are delivered safely and subscriptions stay in sync.</p>
      <p>It includes a robust Discord integration for securely linking your Minecraft account to Discord to receive subscription reminders and roles.</p>
      <p><strong>Commands:</strong></p>
      <ul>
        <li><code>/subscription</code> &mdash; View synchronized status and live renewal timer.</li>
        <li><code>/discordlink</code> &mdash; Securely link your Minecraft account to Discord.</li>
      </ul>
    `
  },
  {
    id: "smessentials",
    icon: "",
    name: "SMEssentials™",
    version: "Coming Soon",
    isCore: false,
    group: "upcoming",
    tagline: "The essential suite of commands, homes, and spawn tools custom-built for SpearMace.",
    content: null
  },
  {
    id: "smeconomy",
    icon: "assets/smsuite/smsuite.png",
    name: "SMEconomy™",
    version: "Coming Soon",
    isCore: false,
    group: "upcoming",
    tagline: "A custom made economy system.",
    content: null
  }
];