const SMSUITE_CHANGELOG_DATA = {
  "SMAdmin": {
    "name": "SMAdmin",
    "displayName": "SMAdmin\u2122",
    "versions": [
      {
        "version": "1.1.0",
        "title": "SMAdmin 1.1.0 Changelog",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMAdmin-1.1.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMAdmin 1.1.0 Changelog\n\n**Release:** 1.1.0  \n**Phase:** SM Suite Phase 2C \u2014 Staff/Admin Diagnostics Retrofit  \n**Requires:** SMCore 1.2.1  \n**Optional integration:** SMAudit  \n**Author:** G660 & Vaporeon  \n**Website:** https://smsmp.net\n\n## Diagnostics and incident reporting\n\n- Added SMCore 1.2.1 operation-level diagnostics throughout SMAdmin.\n- Added diagnostic coverage for startup/shutdown, commands, backups, maintenance state, module state persistence, dynamic module enable/disable, module reloads, migrations, restart countdowns, pre-restart backups, save-all/checkpoint operations, restart command dispatch, and local diagnostics report saving.\n- Added `/smadmin diagnosetest`, a safe synthetic diagnostic that changes no maintenance, restart, backup, module, or configuration state.\n- Removed legacy `SMCore ErrorService` calls from SMAdmin failure paths.\n\n## Module toggle reliability\n\n- `modules.yml` desired state must now be persisted successfully **before** SMAdmin attempts to change a plugin's runtime enabled/disabled state.\n- If `modules.yml` cannot be saved, the in-memory desired-state change is rolled back and the runtime plugin is not intentionally toggled.\n- Dynamic enable/disable failures report both the persisted desired state and actual runtime state for reconciliation.\n- Startup application of persisted disabled modules now emits explicit diagnostics if Bukkit does not reach the requested runtime state.\n- Reload and migration dispatch failures include module target, safe command root, runtime state, and whether an apply operation may require manual review before retrying.\n- Migration apply failures are deliberately not retried automatically.\n\n## Maintenance-mode reliability\n\n- Maintenance enable/disable is now treated as successful only after `state.yml` is durably saved.\n- If state persistence fails, the requested in-memory transition is rolled back and the command fails instead of falsely reporting success.\n- Online-player kick-task failures after maintenance enable are diagnosed while maintenance/login protection remains active.\n- Maintenance login enforcement failures emit CRITICAL diagnostics because admission state is security-relevant.\n- Stale persisted maintenance state cleanup is diagnosed if the server is configured not to persist maintenance across restarts but `state.yml` cannot be updated.\n\n## Backup reliability\n\n- Database checkpoint failure before a suite backup now emits a CRITICAL diagnostic and the backup is not started.\n- Asynchronous backup write failures are explicitly diagnosed.\n- A backup is not considered successful unless a completed backup file is returned.\n- Failure to schedule the asynchronous backup task is diagnosed and the `running` state is safely released.\n- Concurrent backup requests are rejected with a diagnostic while the existing backup continues.\n- Manual backup and pre-migration backup callers add operation context to backup failures.\n\n## Restart safety\n\n- Pre-restart backup failures now emit CRITICAL diagnostics in addition to normal audit events.\n- Restart countdown ticks run through a guarded task; an unexpected countdown exception cancels the countdown instead of allowing restart execution from an unknown scheduler state.\n- Database checkpoint / player save / `save-all flush` failures immediately before restart now emit CRITICAL diagnostics.\n- Configured restart-command exceptions or unhandled dispatches are diagnosed with only the command root.\n- Existing fallback-to-shutdown behavior remains configurable; diagnostics state whether fallback shutdown will be used or the server will remain running.\n\n## Diagnostics reports\n\n- Local `/smadmin diagnostics save` failures now use the shared diagnostics incident system with directory/file/recovery context.\n\n## Startup cleanup\n\n- Existing `messages.yml`, `modules.yml`, and `state.yml` are preserved without Bukkit's misleading `Could not save ... already exists` warnings.\n- `/smadmin` usage/tab completion now includes `diagnosetest`.\n\n## Compatibility\n\n- No production configuration tuning is included in this release.\n- Existing `config.yml`, `messages.yml`, `modules.yml`, and `state.yml` are unchanged from SMAdmin 1.0.0.\n- Static API comparison found **0 removed public/protected signatures** versus SMAdmin 1.0.0.\n- Compiled for Java 21 bytecode and intended for the current Purpur 1.21.11 / Java 25 server.\n"
      },
      {
        "version": "1.0.0",
        "title": "SMAdmin\u2122 1.0.0 \u2014 RECONSTRUCTED CHANGELOG",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMAdmin-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMAdmin\u2122 1.0.0 \u2014 RECONSTRUCTED CHANGELOG\n\n**RECONSTRUCTED:** No dedicated historical changelog file for this exact build was recovered.\n\n- Initial recovered SMAdmin release providing centralized administration, feature/status controls, backup/restart/maintenance orchestration, and protected core-module handling.\n"
      }
    ]
  },
  "SMAuctions": {
    "name": "SMAuctions",
    "displayName": "SMAuctions\u2122",
    "versions": [
      {
        "version": "1.3.0",
        "title": "SMAuctions 1.3.0 \u2014 Interaction Cleanup",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMAuctions-1.3.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMAuctions 1.3.0 \u2014 Interaction Cleanup\n\n## Scope\n\nThis release cleans up the player-facing Auction House interaction layer while\npreserving the validated SMAuctions 1.2.0 transaction/recovery engine.\n\nNo auction database schema, repository transaction logic, Vault handling,\nescrow logic, bid refund logic, expiration processing, item codec, or recovery\nmodel was changed.\n\n## Browse / navigation\n\n- Previous/Next buttons are visibly disabled when there is no page to move to.\n- Auction details now return to the player's previous Auction House view instead\n  of forcing the global browse view.\n- Search, page, sort, and My Auctions state are preserved while navigating.\n- My Auctions now shows active listings / rank limit and listing duration.\n- Collection Vault and Money Recovery buttons show pending entry counts.\n- Inventory transitions are deferred to the next server tick instead of\n  replacing inventories inside the same click event.\n\n## Search\n\nThe Search GUI button now works directly:\n\n1. click Search;\n2. type the query privately in chat;\n3. the message is intercepted and is not broadcast;\n4. type `clear` to remove the active search;\n5. type `cancel` to exit the prompt.\n\nThe existing `/ah search <text>` command remains supported.\n\n## Guided auction creation\n\nThe Sell Held Stack button now starts a guided creation flow:\n\n1. hold the exact stack to list;\n2. click Sell Held Stack;\n3. type buy-now price;\n4. type starting bid or `none`;\n5. review the existing listing confirmation GUI;\n6. confirm once.\n\nThe item is not removed during chat input. The existing AuctionService still\nre-checks the held item at commit time before removing it.\n\n## Buy Now safety\n\nGUI Buy Now now opens a review/confirmation screen before money is withdrawn.\nThe confirmation holder has a one-shot guard so click spam cannot submit the\nsame confirmation twice.\n\nThe explicit `/ah buy <id>` command remains available for command-oriented use.\n\n## Bidding\n\nThe Place Bid GUI button now works directly:\n\n1. click Place Bid;\n2. the GUI closes and privately prompts for a bid in chat;\n3. current minimum and buy-now prices are shown;\n4. a valid bid opens a confirmation screen;\n5. escrow changes only after confirmation.\n\nThe one-shot confirmation guard prevents repeated GUI submission.\nThe existing `/ah bid <id> <amount>` command remains supported.\n\n## Cancellation\n\nSeller cancellation now uses a confirmation screen when initiated from the GUI.\nAuctions with an existing valid bid show cancellation as locked rather than\npresenting a clickable destructive action.\n\n## Collection / recovery\n\n- Collection Vault Back returns to the previous Auction House state.\n- Claim Money Recovery reopens the relevant view cleanly.\n- Collection claim behavior and money-recovery transaction logic are unchanged.\n\n## Compatibility\n\n- Java 21 bytecode.\n- Purpur 1.21.11 target.\n- SMCore 1.2.1 / SMAudit 1.1.1 compatible.\n- Existing 1.2.0 public/protected API preserved.\n- No LuckPerms changes required.\n"
      },
      {
        "version": "1.2.0",
        "title": "RECONSTRUCTED \u2014 SMAuctions 1.2.0 Archive Notes",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMAuctions-1.2.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 SMAuctions 1.2.0 Archive Notes\nEvidence: recovered JAR/source and preserved original release documentation.\n- 1.0.0: initial recovered SM auction-house module.\n- 1.1.0: Economy Audit Retrofit.\n- 1.2.0: Phase 2A Economy Diagnostics retrofit.\n- 1.3.0: Interaction Cleanup release with guided chat sell/bid/search and collection/money recovery UX.\n"
      },
      {
        "version": "1.1.0",
        "title": "RECONSTRUCTED \u2014 SMAuctions 1.1.0 Archive Notes",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMAuctions-1.1.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 SMAuctions 1.1.0 Archive Notes\nEvidence: recovered JAR/source and preserved original release documentation.\n- 1.0.0: initial recovered SM auction-house module.\n- 1.1.0: Economy Audit Retrofit.\n- 1.2.0: Phase 2A Economy Diagnostics retrofit.\n- 1.3.0: Interaction Cleanup release with guided chat sell/bid/search and collection/money recovery UX.\n"
      },
      {
        "version": "1.0.0",
        "title": "RECONSTRUCTED \u2014 SMAuctions 1.0.0 Archive Notes",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMAuctions-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 SMAuctions 1.0.0 Archive Notes\nEvidence: recovered JAR/source and preserved original release documentation.\n- 1.0.0: initial recovered SM auction-house module.\n- 1.1.0: Economy Audit Retrofit.\n- 1.2.0: Phase 2A Economy Diagnostics retrofit.\n- 1.3.0: Interaction Cleanup release with guided chat sell/bid/search and collection/money recovery UX.\n"
      }
    ]
  },
  "SMAudit": {
    "name": "SMAudit",
    "displayName": "SMAudit\u2122",
    "versions": [
      {
        "version": "1.2.0",
        "title": "SMAudit\u2122 1.2.0 \u2014 Route Architecture v2",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMAudit-1.2.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMAudit\u2122 1.2.0 \u2014 Route Architecture v2\n\n## Purpose\n\nThis release completes the dedicated SMAudit route restructuring/splitting phase.\n\nThe previous detail categories remain compatible, but SMAudit now also emits eight\npurpose-built primary streams:\n\n- gameplay\n- staff\n- administration\n- transactions\n- moderation\n- security\n- configuration\n- errors\n\nThese primary streams match the intended completed-suite audit model while\npreserving fine-grained routes for servers that want additional Discord channels.\n\n## Primary-stream classification\n\n### gameplay\nOrdinary player-facing activity such as chat/session activity, GUIs, teleports,\nshop/market activity, streaks, tutorial activity, Ender Chest activity, and other\nplayer-system interactions.\n\nPure plugin lifecycle/config/admin/diagnostic events are not routed to gameplay\nunless they also have a concrete gameplay signal.\n\n### staff\nStaff-authored activity, staff chat/commands/sessions, and SMStaff operational\nrecords.\n\n### administration\nSMAdmin and other explicit administrative/control-plane actions such as restart,\nmaintenance, backup, and administrative operations.\n\n### transactions\nExisting economy/market/reward/claim/escrow/payout transaction classification is\nretained and promoted as a primary stream.\n\n### moderation\nPunishments, cases, reports, freeze/screenshare activity, staff notes, inventory\ninspection, and related moderation workflows.\n\n### security\nExplicit security events plus anti-cheat/violation detail categories.\n\n### configuration\nConfiguration changes, reloads, migrations, module/plugin lifecycle changes, and\nfeature-control changes.\n\n### errors\nFAILED events and diagnostic incidents. The dedicated `diagnostics` detail route\ncontinues to exist.\n\n## Detail-route compatibility\n\nAll existing categories remain available, including:\n\n- chat.all / chat.staff\n- commands.all / commands.staff\n- sessions.all / sessions.staff\n- punishments.*\n- anticheat.*\n- gui.*\n- orders / auctions / shops\n- portals / teleports\n- streaks / tutorial\n- admin-actions / staff-actions\n- config-changes / plugin-lifecycle\n- diagnostics / uncategorized\n\nA new `enderchest` detail route is included.\n\n## Route-file compatibility fix\n\nRouteService now understands BOTH:\n\n1. older literal dotted route keys such as `chat.all`, and\n2. normal nested YAML such as:\n\n   routes:\n     chat:\n       all:\n         enabled: true\n\nRoute status now recursively discovers nested detail routes instead of only\nchecking the first YAML level.\n\n## Operator UX\n\n`/smaudit routes` now shows:\n\n1. the eight primary streams first, then\n2. detail/compatibility routes.\n\nThe startup banner also reports how many of the eight primary streams currently\nhave valid destinations.\n\n## Safety / compatibility\n\n- Existing webhook URLs are not embedded in this release.\n- Existing routes are not deleted.\n- On startup, missing route-schema-v2 entries are added disabled.\n- No database migration.\n- No SMCore API change.\n- No public/protected SMAudit API signatures removed.\n- Existing delivery queue, retry, incident, redaction, spool, and diagnostic\n  behavior is preserved.\n"
      },
      {
        "version": "1.1.1",
        "title": "SMAudit 1.1.1 \u2014 Production Configuration Rollout",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMAudit-1.1.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMAudit 1.1.1 \u2014 Production Configuration Rollout\n\n## Scope\n\nProduction configuration/redaction pass for SMAudit 1.1.1.\n\nNo Java code changed. Keep the validated `SMAudit-1.1.1.jar`.\n\n## Production settings retained\n\n- LuckPerms staff-track and primary-group detection remain enabled.\n- OP alone does not classify a player as staff.\n- Generic permission-based staff detection remains disabled.\n- Chat, command, session/world-change, kick, and SM GUI activity capture remains enabled.\n- IP address and coordinate inclusion remain disabled.\n- Delivery remains batched and asynchronous with bounded retry.\n- Emergency spool remains enabled at 2 MB per file.\n- Final delivery/queue overflow warnings remain enabled.\n\n## Redactions\n\nThe existing command and text redaction policy is retained so authentication\narguments and password/token/secret/webhook/API-key-like values are sanitized.\n\n## routes.yml\n\nThe production package intentionally does **not** replace `routes.yml`.\n\nThe live file contains the actual webhook routing and secret Discord webhook\nURLs. Current runtime evidence already shows SMAudit 1.1.1 connected to SMCore\nwith working route delivery.\n\nRoute/category restructuring is deliberately deferred to the dedicated\nSMAudit routing phase.\n\n## Credential handling\n\nA previously supplied routes file contained live Discord webhook credentials.\nThose URLs should be rotated/recreated before launch. New values should be\nentered only into the server-local routes file and should not be pasted into\nchat or documentation.\n\n## Final permission audit\n\nExact staff group names and inheritance remain subject to the final LuckPerms\nexport review. This config pass does not prematurely redesign staff detection.\n"
      },
      {
        "version": "1.1.0",
        "title": "SMAudit 1.1.0 \u2014 Incident & Self-Diagnostics Engine",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMAudit-1.1.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMAudit 1.1.0 \u2014 Incident & Self-Diagnostics Engine\n\nAuthors: G660 & Vaporeon  \nWebsite: https://smsmp.net\n\n## Added\n\n- Diagnostic incident engine for SM Suite failures.\n- Duplicate grouping and webhook flood suppression.\n- Incident first/last occurrence, occurrence count and suppressed duplicate count.\n- Threshold updates at 5, 25, 100 and 500 occurrences by default.\n- Quiet summaries after an incident stops repeating.\n- Persistent incident history under `plugins/SMAudit/incidents/history.tsv`, including cause/fix metadata for search after restart.\n- `/smaudit diagnostics`, `/smaudit incidents`, `/smaudit incident <id>` and `/smaudit diagnose test`.\n- Console WARN/ERROR capture using both a live Java logging handler and `logs/latest.log` tailing.\n- One-time startup-log import so failures emitted before SMAudit enables are diagnosed instead of lost.\n- Multiline console/stack context capture with secret redaction.\n- Automatic enrichment of existing SM plugin `FAILED` audit events through the SMCore diagnostic engine.\n- Rich Discord diagnostic formatting: incident, severity, component, operation, diagnostic code, confidence, failure, likely cause, suggested fix, occurrence counts, exception/environment, local report and bounded console context.\n- Delivery-failure diagnostics for failed webhook destinations, including redacted remote response information where available.\n- Protection against diagnostic loops: a failing webhook is excluded from routing its own failure incident; queue-overflow diagnostics are local-only.\n- Optional `diagnostics` route while preserving the existing `errors` route.\n\n## Console noise filtering\n\nRoutine file-exists messages and common update-check banners are ignored. Actual WARN/ERROR records remain eligible for diagnosis. Third-party errors may be included because a failing dependency can break an SM Suite feature.\n\n## Compatibility\n\n- Existing SMAudit route structure remains valid.\n- Existing live webhook routes are not overwritten.\n- Existing `redactions.yml` remains valid; built-in SMCore redaction applies even before custom rules.\n- Existing staff-detection configuration is preserved.\n- No database migration is required.\n"
      },
      {
        "version": "1.0.4",
        "title": "v1.0.4",
        "date": "2026-08-15",
        "subCategory": null,
        "jarFileName": "SMAudit-1.0.4.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "RECONSTRUCTED ARCHIVE DOCUMENT\n==============================\n\nThis file was generated during the 2026-08-15 historical recovery pass because an original\nstandalone document for this exact SMAudit build was not recovered. It is derived only from\nrecovered binaries, exact JAR resources, recovered contemporaneous source snapshots, original\nrelease notes/evidence, and source/binary differences. It is NOT an original historical release file.\n\nSMAudit 1.0.4 \u2014 SMTutorial audit compatibility\n\nExact recovered source comparison against 1.0.3 shows:\n- a new tutorial audit route can be appended disabled when missing;\n- events from SMTutorial are classified into tutorial;\n- SMTutorial GUI telemetry is labeled as SMTutorial;\n- the default routes resource includes tutorial.\n\nExisting routes are preserved rather than intentionally replaced.\n"
      },
      {
        "version": "1.0.3",
        "title": "v1.0.3",
        "date": "2026-08-15",
        "subCategory": null,
        "jarFileName": "SMAudit-1.0.3.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "RECONSTRUCTED ARCHIVE DOCUMENT\n==============================\n\nThis file was generated during the 2026-08-15 historical recovery pass because an original\nstandalone document for this exact SMAudit build was not recovered. It is derived only from\nrecovered binaries, exact JAR resources, recovered contemporaneous source snapshots, original\nrelease notes/evidence, and source/binary differences. It is NOT an original historical release file.\n\nSMAudit 1.0.3 \u2014 SMStaff GUI identification compatibility\n\nExact recovered source comparison against 1.0.2 shows the SMAudit-side change is the addition\nof SMStaff to the first-party GUI identification mapping. This lets raw SM GUI activity from\nSMStaff be labeled as SMStaff rather than falling through to a generic module label.\n\nNo evidence of a database migration or route-schema replacement was found for this build.\n"
      },
      {
        "version": "1.0.2",
        "title": "SMAudit-1.0.2.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMAudit-1.0.2.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMAudit-1.0.2.jar\n**Purpose**\n> Companion compatibility update for SMStreaks.\n\n**Changed**\n- Added first-class `streaks` audit category\n- Correctly identifies SMStreaks GUI holders as `SMStreaks`\n- Automatically appends a disabled `routes.streaks` block to existing routes.yml without replacing any configured webhooks\n- Preserves all SMAudit 1.0.1 staff track/group detection behavior\n"
      },
      {
        "version": "1.0.1",
        "title": "SMAudit-1.0.0.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMAudit-1.0.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMAudit-1.0.0.jar\n\n**Purpose**\n> Routes structured SM Suite and server activity records into categorized Discord webhooks without unlimited local logs.\n\n**Added**\n- Multiple webhooks per category.\n- General and staff-only chat routes.\n- General and staff-only command routes.\n- General and staff-only join, quit, kick, and world-change routes.\n- General, staff-issued, and staff-targeted punishment routes.\n- General and staff-specific future anti-cheat routes.\n- Raw open, click, and close telemetry for all `net.smsmp.*` GUI holders.\n- Transactions, Orders, Auctions, Shops, Portals, Teleports, Admin, Staff, Config, Lifecycle, Error, and Security routes.\n- Permission, operator, and reflected LuckPerms-group staff detection.\n- Sensitive command and token redaction.\n- Mention suppression.\n- Per-webhook ordered queues.\n- Webhook batching and asynchronous workers.\n- Discord 429 handling and exponential retries.\n- URL-safe destination identifiers in console warnings.\n- Capped emergency spool that does not store webhook URLs.\n- `/smaudit status`, `/smaudit routes`, `/smaudit reload`, `/smaudit test`, and `/smaudit retry`.\n- Authors: G660 & Vaporeon.\n"
      },
      {
        "version": "1.0.0",
        "title": "SMAudit-1.0.0.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMAudit-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMAudit-1.0.0.jar\n\n**Purpose**\n> Routes structured SM Suite and server activity records into categorized Discord webhooks without unlimited local logs.\n\n**Added**\n- Multiple webhooks per category.\n- General and staff-only chat routes.\n- General and staff-only command routes.\n- General and staff-only join, quit, kick, and world-change routes.\n- General, staff-issued, and staff-targeted punishment routes.\n- General and staff-specific future anti-cheat routes.\n- Raw open, click, and close telemetry for all `net.smsmp.*` GUI holders.\n- Transactions, Orders, Auctions, Shops, Portals, Teleports, Admin, Staff, Config, Lifecycle, Error, and Security routes.\n- Permission, operator, and reflected LuckPerms-group staff detection.\n- Sensitive command and token redaction.\n- Mention suppression.\n- Per-webhook ordered queues.\n- Webhook batching and asynchronous workers.\n- Discord 429 handling and exponential retries.\n- URL-safe destination identifiers in console warnings.\n- Capped emergency spool that does not store webhook URLs.\n- `/smaudit status`, `/smaudit routes`, `/smaudit reload`, `/smaudit test`, and `/smaudit retry`.\n- Authors: G660 & Vaporeon.\n"
      }
    ]
  },
  "SMCaveExplorer": {
    "name": "SMCaveExplorer",
    "displayName": "SMCaveExplorer\u2122",
    "versions": [
      {
        "version": "1.2.1",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.2.1 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.2.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.2.1 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- net/smsmp/caveexplorer/CaveExplorerPlugin.class\n- plugin.yml\n"
      },
      {
        "version": "1.2.0",
        "title": "SM Suite Phase 2B Player-State Diagnostics \u2014 1.2.0",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMCaveExplorer-1.2.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SM Suite Phase 2B Player-State Diagnostics \u2014 1.2.0\n\nAuthor: G660 & Vaporeon  \nWebsite: https://smsmp.net\n\n## Updated modules\n\n- SMCaveExplorer 1.2.0 (live baseline: 1.0.1)\n- SMStreaks 1.2.0 (live baseline: 1.0.0)\n- SMEnderChest 1.2.0 (live baseline: 1.0.1)\n\nRequires SMCore 1.2.1+. SMAudit 1.1.1+ is recommended for incident routing/history.\n\n## Shared diagnostics contract\n\nAll three modules now send operation-level failures through SMCore diagnostics with module/component/operation context, player context when available, exception/root-cause data, recovery state, and local incident reports. Each module has a safe administrator-only `diagnosetest` command. Existing YAML gameplay values are unchanged.\n\n### SMCaveExplorer 1.2.0\n\n- Added diagnostic boundaries for startup, commands, migration, purchase preparation, PlayerPoints debit, transaction state persistence, reward delivery, command rewards, purchase-limit counters, completion state, and recovery/refund failures.\n- A Dash debit must be persisted as `DEBITED` before reward delivery. If that marker cannot be persisted, SMCaveExplorer attempts an automatic Dash refund and stops before granting a reward.\n- A PlayerPoints exception during debit is treated as an uncertain outcome and moved to manual review rather than being mislabeled as a clean payment failure.\n- Item/command reward failures that may have partially executed are never automatically refunded; they are moved to review to prevent double compensation.\n- If a reward succeeds but daily/global purchase counters fail, the incident is CRITICAL and explicitly warns against refunding because the reward is already delivered.\n- Removed harmless `messages.yml already exists` / `trades.yml already exists` startup WARN noise.\n- Added `/smcaveexplorer diagnosetest`.\n\n### SMStreaks 1.2.0\n\n- Added operation-level diagnostics for startup, commands, PlaceholderAPI integration, active-time persistence, qualification persistence, reward delivery, claim creation/finalization, and claim recovery.\n- Fixed active-time flush behavior: pending seconds are no longer cleared before the database write succeeds. Failed batches remain in memory for retry while the server stays running.\n- Changed reward claim delivery to an at-most-once transaction model: an existing claim transaction is never automatically reused for reward delivery.\n- Existing `PENDING` claims are included in the staff review queue/count, and interrupted PENDING claims are still converted to REVIEW on startup.\n- Daily claim completion now atomically marks the daily reward claimed and the claim transaction COMPLETE in one SQLite transaction.\n- Milestone claim completion now atomically records the milestone and completes its transaction.\n- Partial reward failures (Dashes, Vault money, Streak Savers, items, or commands) lock the claim for manual review rather than risking duplicate automatic delivery.\n- Added detailed partial-reward context to diagnostics.\n- Removed harmless `messages.yml already exists` / `rewards.yml already exists` startup WARN noise.\n- Added `/smstreaks diagnosetest`.\n\n### SMEnderChest 1.2.0\n\n- Added diagnostics for startup, commands, GUI/storage loading, close saves, overflow withdrawal persistence, item serialization/deserialization, and SMStaff/ServicesManager API reads/writes.\n- Extra-slot items are now fully serialized before the destructive database replace transaction begins. A serialization failure aborts before DELETE, preserving the previous stored contents.\n- A corrupt/unreadable stored item now aborts the load instead of silently omitting it. This prevents a later GUI save from accidentally deleting the unreadable row.\n- Database save failures are transactionally rolled back where possible and reported as CRITICAL with explicit item-loss/duplication reconciliation guidance.\n- Existing public SMEnderChest API methods, including `saveExtraItems`, are retained.\n- Added `/smenderchest diagnosetest`.\n\n## Compatibility\n\n- Java 21 bytecode (class major 65), compatible with the current Java 25 server runtime.\n- No existing public/protected signatures were removed versus the live baseline JARs.\n- Existing config/messages/rewards/trades YAML contents are unchanged (plugin.yml version/usage metadata updated only).\n- No database schema-breaking migration is introduced.\n\n## Not changed\n\n- Reward prices, Cave Explorer rotations, streak balancing, rank reward tracks, Ender Chest row permissions, or production configuration values.\n- SMCore 1.2.1 / SMAudit 1.1.1.\n"
      },
      {
        "version": "1.2.0",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.2.0 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.2.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.2.0 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- net/smsmp/caveexplorer/CaveExplorerPlugin.class\n- plugin.yml\n"
      },
      {
        "version": "1.1.9",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.9 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.1.9.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.9 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- net/smsmp/caveexplorer/CaveExplorerPlugin.class\n- plugin.yml\n"
      },
      {
        "version": "1.1.8",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.8 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.1.8.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.8 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- net/smsmp/caveexplorer/CaveExplorerPlugin.class\n- plugin.yml\n"
      },
      {
        "version": "1.1.7",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.7 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.1.7.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.7 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- net/smsmp/caveexplorer/CaveExplorerPlugin.class\n- plugin.yml\n"
      },
      {
        "version": "1.1.6",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.6 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.1.6.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.6 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- net/smsmp/caveexplorer/CaveExplorerPlugin.class\n- plugin.yml\n"
      },
      {
        "version": "1.1.5",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.5 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.1.5.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.5 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- net/smsmp/caveexplorer/CaveExplorerPlugin.class\n- plugin.yml\n"
      },
      {
        "version": "1.1.4",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.4 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.1.4.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.4 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- net/smsmp/caveexplorer/CaveExplorerPlugin.class\n- plugin.yml\n"
      },
      {
        "version": "1.1.3",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.3 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.1.3.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.3 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- net/smsmp/caveexplorer/CaveExplorerPlugin$PlayerPointsBridge.class\n- net/smsmp/caveexplorer/CaveExplorerPlugin$PurchaseRecord.class\n- net/smsmp/caveexplorer/CaveExplorerPlugin$ShopSession.class\n- net/smsmp/caveexplorer/CaveExplorerPlugin$TradeDefinition.class\n- net/smsmp/caveexplorer/CaveExplorerPlugin.class\n- plugin.yml\n"
      },
      {
        "version": "1.1.2",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.2 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.1.2.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.2 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- config.yml\n- net/smsmp/caveexplorer/CaveExplorerPlugin$PlayerPointsBridge.class\n- net/smsmp/caveexplorer/CaveExplorerPlugin$PurchaseRecord.class\n- net/smsmp/caveexplorer/CaveExplorerPlugin$ShopSession.class\n- net/smsmp/caveexplorer/CaveExplorerPlugin$TradeDefinition.class\n- net/smsmp/caveexplorer/CaveExplorerPlugin.class\n- plugin.yml\n"
      },
      {
        "version": "1.1.1",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.1 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.1.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.1 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- net/smsmp/caveexplorer/CaveExplorerPlugin.class\n- plugin.yml\n"
      },
      {
        "version": "1.1.0",
        "title": "RECONSTRUCTED \u2014 SMCaveExplorer 1.1.0 Changelog",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMCaveExplorer-1.1.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 SMCaveExplorer 1.1.0 Changelog\nDerived from the recovered Economy Audit Retrofit 1.1.0 source/release snapshot and exact source lineage.\n\n- Added structured semantic audit coverage around Cave Explorer operations.\n- Preserved established gameplay/storage behavior while improving event context and result reporting.\n- This was part of the SM Suite economy audit retrofit alongside SMDashShop, SMOrders and SMAuctions.\n"
      },
      {
        "version": "1.1.0",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.0 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.1.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.1.0 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- config.yml\n- net/smsmp/caveexplorer/CaveExplorerPlugin$PlayerPointsBridge.class\n- net/smsmp/caveexplorer/CaveExplorerPlugin$PurchaseRecord.class\n- net/smsmp/caveexplorer/CaveExplorerPlugin$ShopSession.class\n- net/smsmp/caveexplorer/CaveExplorerPlugin$TradeDefinition.class\n- net/smsmp/caveexplorer/CaveExplorerPlugin.class\n- plugin.yml\n"
      },
      {
        "version": "1.0.2",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.0.2 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.0.2.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.0.2 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- plugin.yml\n"
      },
      {
        "version": "1.0.1",
        "title": "SMCaveExplorer-1.0.0.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMCaveExplorer-1.0.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMCaveExplorer-1.0.1.jar\n\n- Fixed weekday detection returning abbreviated names such as `thu` on Java 21 when using `Locale.ROOT`.\n- Weekday rotation now uses the stable enum name (`thursday`), matching `trades.yml`.\n- No migration is required. Existing trade configuration and purchase data are preserved.\n\n# SMCaveExplorer-1.0.0.jar\n\n**Purpose**\nDaily rotating Cave Explorer merchant rebuilt on SMCore.\n\n**Added**\n- Seven configurable weekday rotations\n- Twenty-one migrated live trades\n- PlayerPoints/Dashes payments\n- Purchase confirmation GUI\n- Per-player daily limits\n- Global daily stock\n- Exact America/Chicago rotation handling\n- Safe transaction records and automatic item-reward refunds\n- Staff review queue for uncertain command rewards\n- Legacy CaveExplorer config and purchase-data migration\n- Test-day controls\n- Parallel admin-only testing while CaveExplorer is installed\n- SMCore audit, webhook, error, backup and performance integration\n- Author: G660 & Vaporeon\n- Purpur 1.21.11 and Java 21 support\n"
      },
      {
        "version": "1.0.1",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.0.1 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.0.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.0.1 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nChanged entries:\n- net/smsmp/caveexplorer/CaveExplorerPlugin.class\n- plugin.yml\n"
      },
      {
        "version": "1.0.0",
        "title": "SMCaveExplorer-1.0.0.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMCaveExplorer-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMCaveExplorer-1.0.0.jar\n\n**Purpose**\nDaily rotating Cave Explorer merchant rebuilt on SMCore.\n\n**Added**\n- Seven configurable weekday rotations\n- Twenty-one migrated live trades\n- PlayerPoints/Dashes payments\n- Purchase confirmation GUI\n- Per-player daily limits\n- Global daily stock\n- Exact America/Chicago rotation handling\n- Safe transaction records and automatic item-reward refunds\n- Staff review queue for uncertain command rewards\n- Legacy CaveExplorer config and purchase-data migration\n- Test-day controls\n- Parallel admin-only testing while CaveExplorer is installed\n- SMCore audit, webhook, error, backup and performance integration\n- Author: G660 & Vaporeon\n- Purpur 1.21.11 and Java 21 support\n"
      },
      {
        "version": "1.0.0",
        "title": "RECONSTRUCTED \u2014 Legacy CaveExplorer 1.0.0 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy CaveExplorer",
        "jarFileName": "SMCaveExplorer-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy CaveExplorer 1.0.0 Changelog\nThis is not an original historical changelog. It is generated from recovered JAR contents and adjacent-build comparison.\n\nInitial recovered legacy CaveExplorer build in this archive.\n"
      }
    ]
  },
  "SMCommands": {
    "name": "SMCommands",
    "displayName": "SMCommands\u2122",
    "versions": [
      {
        "version": "1.2.0",
        "title": "SMCommands 1.2.0 Changelog",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMCommands-1.2.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMCommands 1.2.0 Changelog\n\n## Diagnostics & reliability\n- Added operation-level SMCore diagnostics for `/afk`, `/pit`, RTP routing, warmup execution, scheduled AFK reward ticks, timer lookups, payout dispatch, legacy effect migration, and command-handler failures.\n- Added contextual incident metadata including player/UUID, operation, command, world, payout amount/multiplier, cooldown state, recovery state, and module version.\n- Replaced legacy `ErrorService` reporting on teleport/AFK failures with the SMCore 1.2.1 diagnostic incident pipeline.\n- Rejected or throwing teleport/RTP commands now create explicit incidents instead of only a normal audit event.\n- Rejected or throwing AFK payout commands now clearly mark payout state as failed/uncertain and intentionally avoid unsafe automatic compensation.\n- Scheduler failures record state and keep the AFK scheduler alive for subsequent ticks.\n\n## Administration\n- Added `/smcommands diagnosetest` for a safe synthetic diagnostic. It does not teleport players or award/remove Dashes.\n- Added `diagnosetest` to tab completion/help.\n\n## Startup cleanup\n- `messages.yml` is now copied only when missing, removing the harmless `already exists` startup warning while preserving existing files.\n\n## Compatibility\n- Gameplay configuration and messages are unchanged from 1.1.0.\n- Existing public/protected Java API signatures are preserved.\n- Built for Java 21 and intended for SMCore 1.2.1 + SMAudit 1.1.1.\n"
      },
      {
        "version": "1.1.0",
        "title": "SMCommands 1.1.0 \u2014 Audit Retrofit",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMCommands-1.1.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "RECONSTRUCTED ARCHIVE DOCUMENT\n==============================\nThis document was generated during historical recovery because a standalone original document was not recovered.\nIt is based on recovered binaries, source snapshots, embedded defaults, release bundles, and contemporaneous evidence.\nIt is intentionally labeled RECONSTRUCTED and should not be mistaken for an original release note.\n\n# SMCommands 1.1.0 \u2014 Audit Retrofit\n\nExact recovered source comparison against 1.0.0 shows changes only in SMCommandsPlugin.java, AfkRewardService.java, TeleportService.java, and config.yml.\n\nReconstructed release changes:\n- Expanded structured audit publishing through SMCore/SMAudit.\n- Added audit records for denied admin commands and admin teleport cancellation.\n- Added explicit teleport-denied events for disabled commands, missing permissions, existing pending teleports, and cooldown rejection.\n- Enriched teleport request/complete/cancel and RTP events with result/state fields.\n- Added AFK payout failure audit and enriched successful payout metadata.\n- Audit payloads gain schemaVersion=1 and actor world/rounded XYZ context.\n- Config logging event toggles expanded for module enable/disable, admin events, teleport denied, and AFK payout failure.\n- Gameplay behavior, messages, command permissions, and plugin command surface remained otherwise unchanged from 1.0.0.\n- Built as the SMCommands/SMPortals 1.1.0 audit retrofit checkpoint.\n"
      },
      {
        "version": "1.0.0",
        "title": "SMCommands 1.0.0 \u2014 Reconstructed Changelog",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMCommands-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "RECONSTRUCTED ARCHIVE DOCUMENT\n==============================\nThis document was generated during historical recovery because a standalone original document was not recovered.\nIt is based on recovered binaries, source snapshots, embedded defaults, release bundles, and contemporaneous evidence.\nIt is intentionally labeled RECONSTRUCTED and should not be mistaken for an original release note.\n\n# SMCommands 1.0.0 \u2014 Reconstructed Changelog\n\nInitial SMCommands checkpoint release.\n\nRecovered feature set:\n- `/afk` and `/pit` teleport commands with warmup, movement/damage cancellation, and cooldown support.\n- BetterRTP routing hook present but disabled by default because BetterRTP native overrides were preferred.\n- AFK Dash reward engine with PlayerPoints command dispatch, timer integration, booster/universal multiplier support, payout message, and rotating actionbar.\n- Legacy DashShop detection suspends AFK rewards during staged migration to prevent duplicate payouts.\n- Legacy effect timer migration support for final SMDashShop cutover.\n- SMCore audit, performance, timer, and error service integration.\n- Admin `/smcommands` status/reload/cancel/migrate surface.\n- Java 21 / Purpur 1.21.11 target; SMCore 1.0.1 checkpoint pairing.\n"
      }
    ]
  },
  "SMCore": {
    "name": "SMCore",
    "displayName": "SMCore\u2122",
    "versions": [
      {
        "version": "1.2.1",
        "title": "SMCore 1.2.1 \u2014 Production Configuration Rollout",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMCore-1.2.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMCore 1.2.1 \u2014 Production Configuration Rollout\n\n## Scope\n\nConfiguration-only production pass for SMCore 1.2.1.\n\nNo Java code changed. Continue using the existing validated\n`SMCore-1.2.1.jar`.\n\n## Production configuration\n\nThe established SMCore configuration is retained:\n\n- SQLite database using `sm-suite.db`\n- console logging enabled\n- file logging enabled\n- SMCore backups enabled\n- backup retention set to 20\n- performance monitoring enabled\n\nNo speculative tuning was added.\n\n## Data preservation\n\nThis rollout replaces only `config.yml`.\n\nDo not delete or replace:\n- the shared SQLite database;\n- diagnostics reports;\n- fallback/spool data;\n- backup data;\n- any other live operational state.\n\n## Core role\n\nSMCore remains the shared SM Suite foundation for database access, health,\naudit publishing, diagnostics, performance visibility, backups, and module\ninteroperability.\n\nSMAudit 1.1.1 remains the production consumer/router for the SMCore audit bus.\n"
      },
      {
        "version": "1.2.0",
        "title": "SMCore 1.2.0 \u2014 Diagnostic Foundation",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMCore-1.2.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMCore 1.2.0 \u2014 Diagnostic Foundation\n\nAuthors: G660 & Vaporeon  \nWebsite: https://smsmp.net\n\n## Added\n\n- Shared SM Suite diagnostic service (`SMCoreAPI.diagnostics()`) for current and future SM plugins.\n- Structured failure contract with severity, component, operation, reason, diagnostic code, likely cause, confidence, suggested fix, exception/root-cause details, thread, server/Java environment, module version and a bounded plugin snapshot.\n- Sanitized full local diagnostic reports under `plugins/SMCore/diagnostics/reports/`.\n- Deterministic self-diagnosis rules for common Discord, Paper/plugin, configuration, dependency, database, HTTP/rate-limit, YAML and compatibility failures.\n- Built-in secret sanitizer for Discord webhooks/tokens, authorization values, API credentials, JWT-like values, query credentials, JDBC passwords and diagnostic IP addresses.\n- Persistent diagnostic fallback spool. Important failure events are preserved when SMAudit is unavailable and replayed after SMAudit subscribes again.\n- `/smcore diagnostics` health/status command.\n- `/smcore diagnose test` safe synthetic diagnostic test.\n- Backup failures now create a diagnostic incident.\n- Legacy ErrorService failures are bridged into the diagnostic system.\n- Existing `FAILED` SM audit events can be enriched with self-diagnosis metadata without requiring every plugin to be rebuilt immediately.\n\n## Compatibility\n\n- Existing SMCore 1.1.x public API methods are retained.\n- The original nine-argument `SMCoreAPI` constructor is retained for binary compatibility.\n- No database reset or migration is required.\n- Existing `plugins/SMCore/config.yml`, database and backups are preserved. Missing 1.2.0 settings are added automatically.\n\n## Reliability\n\n- SMCore startup failures fall back to a local bootstrap diagnostic even if the audit bus cannot start.\n- Diagnostic plugin enumeration is restricted to the primary server thread.\n- Routine audit buffering remains bounded; failure diagnostics receive persistent fallback storage.\n"
      },
      {
        "version": "1.1.0",
        "title": "SMCore-1.1.0.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMCore-1.1.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMCore-1.1.0.jar\n\n**Purpose**\n> Introduces the shared structured audit bus used by SMAudit and every current/future SM plugin.\n\n**Changed**\n- Removed routine audit console spam.\n- Stopped writing new records to the unlimited `logs/audit.log` file.\n- Added immutable `AuditEvent` records.\n- Added subscriber registration and removal API.\n- Added bounded RAM-only startup/failure buffer.\n- Added oldest-first buffer eviction with dropped-event counters.\n- Added console modes: `off`, `critical`, and `all`.\n- Added audit subscriber, buffered, and dropped counts to `/smcore health`.\n- Preserved the SMCore 1.0.x `audit().log(...)` API for binary compatibility.\n- Preserved all databases, timers, backups, items, permissions, errors, and performance services.\n- Authors: G660 & Vaporeon.\n"
      },
      {
        "version": "1.0.2",
        "title": "v1.0.2",
        "date": "2026-08-15",
        "subCategory": null,
        "jarFileName": "SMCore-1.0.2.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "RECONSTRUCTED ARCHIVE DOCUMENT\n==============================\n\nThis file was generated during the 2026-08-15 historical recovery pass because an original\nstandalone document for this exact build was not recovered. It is derived only from recovered\nSMCore binaries, embedded default resources, recovered source where available, original release\nnotes where available, and observed binary/source diffs. It must not be represented as an\noriginal historical release file.\n\nSMCore 1.0.2 \u2014 database health-state fix\n\nRecovered binary comparison:\n- The only SMCore class changed from 1.0.1 is DatabaseService.\n- Successful database queries explicitly restore the service healthy flag.\n- Exceptions are inspected for an SQLException in the cause chain.\n- Only SQL-caused failures mark the database unhealthy.\n- Non-SQL exceptions raised by caller/result-processing logic are reported separately as\n  database-operation / database result processing failures without falsely declaring the\n  SQLite connection unhealthy.\n\nWhy this mattered:\nA downstream marketplace callback can throw a non-SQL exception while using DatabaseService.\n1.0.2 separates that application/result-processing failure from an actual database failure.\n\nResources:\n- plugin.yml reports 1.0.2.\n- The bundled config.yml comment still says v1.0.1; this archive preserves that exact historical\n  resource instead of silently rewriting it.\n"
      },
      {
        "version": "1.0.1",
        "title": "v1.0.1",
        "date": "2026-08-15",
        "subCategory": null,
        "jarFileName": "SMCore-1.0.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "RECONSTRUCTED ARCHIVE DOCUMENT\n==============================\n\nThis file was generated during the 2026-08-15 historical recovery pass because an original\nstandalone document for this exact build was not recovered. It is derived only from recovered\nSMCore binaries, embedded default resources, recovered source where available, original release\nnotes where available, and observed binary/source diffs. It must not be represented as an\noriginal historical release file.\n\nSMCore 1.0.1 \u2014 backup reliability + authorship update\n\nConfirmed source/binary differences from 1.0.0:\n- Author metadata changed from G660 to G660 & Vaporeon.\n- /smcore backup now checkpoints SQLite before creating the suite backup.\n- Backup output is written through a temporary ZIP and moved into place, using an atomic move\n  when supported and a safe replacement fallback otherwise.\n- Backup creation excludes nested backup directories and SQLite WAL/SHM/lock side files.\n- Backup retention now prunes older ZIPs according to backups.keep.\n- The command reports the actual created backup filename.\n- Backup failures are caught and reported to the player while ErrorService records the failure.\n- DatabaseService gained an explicit WAL checkpoint operation.\n\nNo gameplay-system migration is implied by this maintenance release.\n"
      },
      {
        "version": "1.0.0",
        "title": "v1.0.0",
        "date": "2026-08-15",
        "subCategory": null,
        "jarFileName": "SMCore-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "RECONSTRUCTED ARCHIVE DOCUMENT\n==============================\n\nThis file was generated during the 2026-08-15 historical recovery pass because an original\nstandalone document for this exact build was not recovered. It is derived only from recovered\nSMCore binaries, embedded default resources, recovered source where available, original release\nnotes where available, and observed binary/source diffs. It must not be represented as an\noriginal historical release file.\n\nSMCore 1.0.0 \u2014 Foundation release\n\nRecovered role/features:\n- First production-oriented SM Suite foundation.\n- Public SMCore.getAPI() service gateway.\n- SQLite persistence in WAL mode.\n- Persistent timers.\n- Permission numeric/duration resolution.\n- Shared custom-item tagging and item delivery helpers.\n- Console/file/Discord audit pipeline.\n- Bounded asynchronous webhook queue.\n- Error reports with runtime/plugin context.\n- SM Suite ZIP backup manager.\n- Performance timing counters.\n- Dependency/plugin health diagnostics.\n\nCommands:\n- /smcore status\n- /smcore health\n- /smcore reload\n- /smcore performance\n- /smcore backup [label]\n\nMetadata:\n- plugin version 1.0.0\n- original author metadata: G660\n- website: https://smsmp.net\n"
      }
    ]
  },
  "SMDashShop": {
    "name": "SMDashShop",
    "displayName": "SMDashShop\u2122",
    "versions": [
      {
        "version": "1.2.0",
        "title": "SM Suite Phase 2A Economy Diagnostics \u2014 1.2.0",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMDashShop-1.2.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SM Suite Phase 2A Economy Diagnostics \u2014 1.2.0\n\nAuthor: G660 & Vaporeon  \nWebsite: https://smsmp.net\n\n## Updated modules\n\n- SMOrders 1.2.0\n- SMAuctions 1.2.0\n- SMDashShop 1.2.0\n\nRequires the live diagnostics foundation:\n\n- SMCore 1.2.1+\n- SMAudit 1.1.1+ recommended for incident routing/history\n\n## What changed\n\n### Shared reliability contract\n\nAll three economy modules now send operation-level failures into the SMCore diagnostic service. Diagnostic events carry the module, component, operation, player context when available, exception/root context, transaction/order/auction/product context, recovery state, and an explicit description of whether money/items could have been lost or duplicated.\n\nEach plugin also has:\n\n- a plugin-enable CRITICAL diagnostic boundary;\n- a command execution diagnostic boundary;\n- GUI/event diagnostic boundaries for high-risk user actions;\n- safer scheduled-task error reporting where applicable;\n- an administrator-only synthetic `diagnosetest` command that changes no gameplay state;\n- resource initialization that checks file existence before `saveResource`, removing the harmless `already exists` WARN spam for these modules.\n\nExisting YAML data/configuration formats are unchanged.\n\n### SMOrders 1.2.0\n\n- Added detailed diagnostics around order creation escrow withdrawal, opening persistence, automatic refunds, and Money Recovery fallback.\n- Added fulfillment diagnostics around item removal, transaction state, database application, seller payment, and recovery queue behavior.\n- Reliability correction: when `ITEMS_REMOVED` cannot be persisted after removing seller items, the removed items are restored before the operation stops.\n- Added diagnostics for order cancellation, deliveries, money claims, expired-order refund processing, and compensation failures.\n- If a money claim is deposited but cannot be marked paid, SMOrders attempts a compensating withdrawal before allowing a retry; failure to compensate is CRITICAL.\n- If delivery items are given but claim persistence fails, the incident is CRITICAL and explicitly flags duplication risk.\n- Scheduled expiration sweep and join recovery checks now have diagnostic boundaries.\n- New safe test: `/smorders diagnosetest`.\n\n### SMAuctions 1.2.0\n\n- Added detailed diagnostics around listing creation, buy-now payment, bids, cancellation, collections, seller/bidder money claims, and expiration processing.\n- Listing creation failures after item removal restore the listed item.\n- Buy/bid database failures after Vault withdrawal attempt automatic refund and record refund outcome.\n- Reliability correction: once a buy is committed in the auction database, later transaction-marker or payout failures never automatically refund the buyer. This avoids a buyer receiving both the auction item and refunded money.\n- Reliability correction: once a bid is committed, later marker failure never automatically refunds the committed bidder.\n- Money-claim persistence failures attempt compensation before the claim remains retryable.\n- Collection persistence failure after item delivery is CRITICAL and flags duplication risk.\n- Scheduled expiration sweep and join recovery checks now have diagnostic boundaries.\n- New safe test: `/smauctions diagnosetest`.\n\n### SMDashShop 1.2.0\n\n- Added diagnostics around product loading, transaction preparation, PlayerPoints debit, reward grants, purchase limits, transaction-state persistence, and custom-item actions.\n- A successful Dash debit must now have its `DEBITED` transaction state persisted before reward delivery. If that state cannot be persisted, the plugin attempts an automatic Dash refund and stops.\n- Reward grant failures after a debit attempt automatic Dash refund and record the exact recovery result.\n- Reliability rule: once a reward is successfully granted, SMDashShop never performs an automatic refund because the reward may be irreversible. Persistence failure after reward grant is instead marked for manual review with duplication/repeat-purchase risk noted.\n- Purchase-limit persistence failure after reward delivery is CRITICAL.\n- Added diagnostic boundaries for GUI clicks, custom consumables, and the 3x3 Drill event.\n- Invalid or duplicate shop products skipped during reload now create a diagnostic warning.\n- New safe test: `/smdashshop diagnosetest`.\n\n## Compatibility validation\n\nStatic validation against the existing 1.1.0 JARs found no removed public/protected API signatures:\n\n- SMOrders: 10 top-level public classes checked, 0 missing classes, 0 lost signatures.\n- SMAuctions: 10 checked, 0 missing, 0 lost signatures.\n- SMDashShop: 9 checked, 0 missing, 0 lost signatures.\n\nAll three builds target Java 21 bytecode (class major version 65) and are suitable for the current Java 25 server runtime.\n\n## Not changed\n\n- Existing production YAML values.\n- Existing SQLite schema/data formats.\n- Rank/permission model.\n- Marketplace/shop pricing or gameplay balancing.\n- SMCore 1.2.1 and SMAudit 1.1.1 themselves.\n"
      },
      {
        "version": "1.1.0",
        "title": "RECONSTRUCTED \u2014 SMDashShop 1.1.0 Changelog",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMDashShop-1.1.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 SMDashShop 1.1.0 Changelog\n\nThis document was reconstructed from the recovered **original 1.1.0 Economy Audit Retrofit\ndocument** and exact recovered SMDashShop 1.0.0 \u2192 1.1.0 source differences. It is NOT an\noriginal standalone changelog.\n\n## Purpose\n\nSMDashShop 1.1.0 is the economy-audit retrofit release. Gameplay and persisted database formats\nwere intentionally preserved while semantic audit coverage was expanded.\n\n## Confirmed changes\n\n- Structured audit context upgraded to `schemaVersion=2`.\n- Player world and rounded x/y/z coordinates added to audit context.\n- Semantic shop-open denial events added.\n- Confirmation GUI open/accept/cancel/invalid/close-button events added.\n- Purchase denial auditing added for:\n  - permission denial\n  - purchase-limit denial\n  - insufficient Dashes\n- Purchase failure events gained explicit result/recovery context.\n- Successful purchases emit explicit `SUCCESS` result context.\n- Purchase error events improved.\n- Existing raw SMAudit SM-GUI telemetry remains independent of these semantic events.\n- `config.yml`, `messages.yml`, and `shop.yml` remained unchanged from 1.0.0.\n- Authors remain G660 & Vaporeon.\n\n## Compatibility\n\nThe release was designed as an audit/observability retrofit rather than a gameplay or storage\nmigration.\n"
      },
      {
        "version": "1.0.8",
        "title": "RECONSTRUCTED \u2014 Legacy DashShop 1.0.8 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy DashShop",
        "jarFileName": "SMDashShop-1.0.8.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy DashShop 1.0.8 Changelog\n\nThis is **RECONSTRUCTED**, not an original historical changelog.\n\nEvidence basis:\n- recovered JAR and embedded resources;\n- class-level binary introspection and adjacent-build resource comparison;\n- adjacent verified legacy builds.\n\n## Recovered / reconstructed change state\n\n\nBinary/resource reconstruction:\n- Added 3x3 Drill expiration system.\n- Drill expires 7 days after purchase.\n- Persisted expiry timestamp under drill_expires_at PDC key.\n- Inventory/ender-chest/stored drill expiry checks and cleanup.\n- Inventory-open handling removes expired drills.\n- This became the legacy checkpoint retained during SMDashShop 1.0.0 parallel migration.\n"
      },
      {
        "version": "1.0.7",
        "title": "RECONSTRUCTED \u2014 Legacy DashShop 1.0.7 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy DashShop",
        "jarFileName": "SMDashShop-1.0.7.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy DashShop 1.0.7 Changelog\n\nThis is **RECONSTRUCTED**, not an original historical changelog.\n\nEvidence basis:\n- recovered JAR and embedded resources;\n- class-level binary introspection and adjacent-build resource comparison;\n- adjacent verified legacy builds.\n\n## Recovered / reconstructed change state\n\n\nBinary/resource reconstruction:\n- config-version 3.\n- Warden spawner weekly limit removed (NONE / -1).\n- Action-bar AFK reward/effect status.\n- BetterRTP integration behavior and RTP command handling.\n- Survival-mode handling around RTP.\n- Improved effect timer formatting/context.\n- Improved custom potion/item consumption handling.\n"
      },
      {
        "version": "1.0.6",
        "title": "RECONSTRUCTED \u2014 Legacy DashShop 1.0.6 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy DashShop",
        "jarFileName": "SMDashShop-1.0.6.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy DashShop 1.0.6 Changelog\n\nThis is **RECONSTRUCTED**, not an original historical changelog.\n\nEvidence basis:\n- recovered JAR and embedded resources;\n- class-level binary introspection and adjacent-build resource comparison;\n- adjacent verified legacy builds.\n\n## Recovered / reconstructed change state\n\n\nBinary reconstruction:\n- Inventory reward-delivery compatibility/safety adjustment.\n- The previous Inventory.addItem-related implementation changed.\n- Exact source for this build was not recovered, so this description is intentionally conservative.\n"
      },
      {
        "version": "1.0.5",
        "title": "RECONSTRUCTED \u2014 Legacy DashShop 1.0.5 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy DashShop",
        "jarFileName": "SMDashShop-1.0.5.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy DashShop 1.0.5 Changelog\n\nThis is **RECONSTRUCTED**, not an original historical changelog.\n\nEvidence basis:\n- recovered JAR and embedded resources;\n- class-level binary introspection and adjacent-build resource comparison;\n- adjacent verified legacy builds.\n\n## Recovered / reconstructed change state\n\n\nBinary reconstruction:\n- Bukkit API compatibility adjustment around InventoryClickEvent.getWhoClicked / HumanEntity handling.\n- No major gameplay/config change identified.\n"
      },
      {
        "version": "1.0.4",
        "title": "RECONSTRUCTED \u2014 Legacy DashShop 1.0.4 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy DashShop",
        "jarFileName": "SMDashShop-1.0.4.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy DashShop 1.0.4 Changelog\n\nThis is **RECONSTRUCTED**, not an original historical changelog.\n\nEvidence basis:\n- recovered JAR and embedded resources;\n- class-level binary introspection and adjacent-build resource comparison;\n- adjacent verified legacy builds.\n\n## Recovered / reconstructed change state\n\n\nBinary/resource reconstruction:\n- Major GUI/configuration pass; config-version 2.\n- Category-based GUI and confirmation preview.\n- Improved keys/spawners/special-items organization.\n- Click/drag protection improvements.\n- Sentinel key presentation changed to white candle.\n- Crusader key presentation changed to lime/green.\n- Immortal Key removed from the legacy permanent catalog.\n- New GUI strings/category handling.\n"
      },
      {
        "version": "1.0.3",
        "title": "RECONSTRUCTED \u2014 Legacy DashShop 1.0.3 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy DashShop",
        "jarFileName": "SMDashShop-1.0.3.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy DashShop 1.0.3 Changelog\n\nThis is **RECONSTRUCTED**, not an original historical changelog.\n\nEvidence basis:\n- recovered JAR and embedded resources;\n- class-level binary introspection and adjacent-build resource comparison;\n- adjacent verified legacy builds.\n\n## Recovered / reconstructed change state\n\n\nBinary/source-lineage reconstruction:\n- Bukkit API compatibility adjustment around Player.openInventory return handling.\n- No material gameplay/configuration change identified.\n"
      },
      {
        "version": "1.0.2",
        "title": "RECONSTRUCTED \u2014 Legacy DashShop 1.0.2 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy DashShop",
        "jarFileName": "SMDashShop-1.0.2.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy DashShop 1.0.2 Changelog\n\nThis is **RECONSTRUCTED**, not an original historical changelog.\n\nEvidence basis:\n- recovered JAR and embedded resources;\n- class-level binary introspection and adjacent-build resource comparison;\n- adjacent verified legacy builds.\n\n## Recovered / reconstructed change state\n\n\nBinary/source-lineage reconstruction:\n- Tiny Bukkit API compatibility adjustment around ItemStack.setItemMeta return handling.\n- No material gameplay/configuration change identified.\n"
      },
      {
        "version": "1.0.1",
        "title": "RECONSTRUCTED \u2014 Legacy DashShop 1.0.1 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy DashShop",
        "jarFileName": "SMDashShop-1.0.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy DashShop 1.0.1 Changelog\n\nThis is **RECONSTRUCTED**, not an original historical changelog.\n\nEvidence basis:\n- recovered JAR and embedded resources;\n- recovered original source;\n- adjacent verified legacy builds.\n\n## Recovered / reconstructed change state\n\n\nConfirmed from recovered 1.0.0 \u2192 1.0.1 source:\n- Added `/dashshop balance`.\n- Teleport behavior uses Multiverse `mvtp` with fallback direct teleport.\n- Handles teleport delay 0 explicitly.\n- Pit portal uses the shared teleport helper.\n- Added purchaseBusy guard with delayed release to reduce duplicate purchases.\n- Potion activation message uses configured duration instead of a hard-coded 30 minutes.\n- plugin.yml usage updated to `/dashshop [balance]`.\n"
      },
      {
        "version": "1.0.0",
        "title": "SMDashShop-1.0.0.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMDashShop-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMDashShop-1.0.0.jar\n\n**Purpose**\n> Replaces the permanent DashShop with a modular SM Suite version while preserving the current products, Dashes currency, custom items, limits and purchase flow.\n\n**Added**\n- 15 current Dash Shop products preserved\n- PlayerPoints/Dashes payment integration\n- Configurable 54-slot shop and confirmation GUI\n- Separate `config.yml`, `messages.yml` and `shop.yml`\n- Daily, weekly and monthly purchase limits using the SMCore database\n- Atomic purchase state tracking with transaction IDs\n- Automatic refunds when a reward fails before completion\n- Manual review queue for interrupted or uncertain transactions\n- `/smdashshop transactions` and `/smdashshop resolve`\n- Legacy purchase-limit and effect-timer migration\n- Idempotent migration that never reduces existing values\n- Legacy DashShop parallel testing mode\n- Legacy custom-item compatibility using old PDC tags\n- SMCore timer integration for Booster and Universal effects\n- 3x3 Drill with protection-event compatibility and blocked-material controls\n- Admin item-give and limit-reset tools\n- Configurable messages, products, prices, commands, slots, limits and permissions\n- SMCore audit, webhook, error-report and performance integration\n- Author: G660 & Vaporeon\n\n**Important**\n- While `DashShop-1.0.8.jar` remains installed, use `/smdashshop:dashshop` to test the new GUI.\n- The new custom-item engine suspends itself during parallel testing to prevent duplicate potion or drill handling.\n- Do not remove the legacy plugin or run the final migration until the parallel tests pass.\n"
      },
      {
        "version": "1.0.0",
        "title": "RECONSTRUCTED \u2014 Legacy DashShop 1.0.0 Changelog",
        "date": "Release Build",
        "subCategory": "Legacy DashShop",
        "jarFileName": "SMDashShop-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 Legacy DashShop 1.0.0 Changelog\n\nThis is **RECONSTRUCTED**, not an original historical changelog.\n\nEvidence basis:\n- recovered JAR and embedded resources;\n- recovered original source;\n- adjacent verified legacy builds.\n\n## Recovered / reconstructed change state\n\n\nInitial recovered legacy DashShop baseline.\n- Permanent Dash Shop implementation predating SMDashShop.\n- Player commands included /dashshop, /afk and /pit.\n- AFK rewards and custom DashShop items were handled in the legacy plugin.\n- Original source and original install instructions were recovered.\n"
      }
    ]
  },
  "SMEnderChest": {
    "name": "SMEnderChest",
    "displayName": "SMEnderChest\u2122",
    "versions": [
      {
        "version": "1.2.4",
        "title": "SMEnderChest 1.2.4 \u2014 Combat & Anti-Dupe Maintenance",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMEnderChest-1.2.4.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Purpur 1.21.11 / Java 21",
        "content": "# SMEnderChest 1.2.4 Maintenance\n\n- Fixed `/ec` access while combat-tagged through direct SMPvP integration.\n- Added server-authoritative Ender Chest inventory processing.\n- Added anti-duplication protections for inventory transactions (shift click, hotbar swap, offhand swap, double click collection, drag transactions, creative clone/drop).\n- Immediate persistence for accepted inventory changes.\n- Respects command cancellation from other SM Suite modules including SMPoi.\n"
      },
      {
        "version": "1.2.0",
        "title": "SMEnderChest 1.2.0 \u2014 Production Configuration Rollout",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMEnderChest-1.2.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMEnderChest 1.2.0 \u2014 Production Configuration Rollout\n\n## Scope\n\nConfiguration-only production rollout for **SMEnderChest 1.2.0**.\n\nNo Java code changed in this pass. Continue using the already validated\n`SMEnderChest-1.2.0.jar`.\n\n## Approved production rank capacity\n\nOnly the top three paid ranks receive expanded Ender Chest storage:\n\n- Member \u2014 27 total slots (0 extra rows)\n- Sentinel \u2014 27 total slots (0 extra rows)\n- Crusader \u2014 27 total slots (0 extra rows)\n- Champion \u2014 36 total slots (1 extra row)\n- Ascendant \u2014 45 total slots (2 extra rows)\n- Immortal \u2014 54 total slots (3 extra rows)\n\nThis supersedes the earlier development default where Crusader also had an\nextra row.\n\n## Access behavior retained\n\n- Physical Ender Chest interception remains enabled.\n- `/enderchest` and `/ec` interception remains enabled.\n- SMEnderChest remains the authoritative expanded-storage experience.\n- Protected overflow remains enabled by the existing 1.2.0 code.\n- Trusted SMStaff integration remains unchanged.\n\n## Reliability retained\n\nNo 1.2.0 reliability logic is changed by this configuration rollout.\n\nThe existing binary continues to:\n- validate/decode stored extra items before destructive replacement;\n- abort load on corrupt/unreadable stored data rather than overwrite it;\n- preserve inaccessible items in protected overflow when capacity drops;\n- expose trusted storage integration for SMStaff;\n- emit operation-level diagnostics through SMCore/SMAudit.\n\n## Config cleanup\n\nRemoved the old `settings.audit-item-details` key from the production config\nbecause SMEnderChest 1.2.0 does not consume it at runtime.\n\n## LuckPerms\n\nNo new `smenderchest.rows.*` grants are required for the paid-rank rollout;\nthe plugin can resolve the approved capacities from player primary groups.\n\nInherited row permissions, especially on staff groups, are deferred to the\nfinal suite-wide permissions/rank-perks audit.\n"
      },
      {
        "version": "1.0.1",
        "title": "RECONSTRUCTED \u2014 SMEnderChest 1.0.1 Changelog",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMEnderChest-1.0.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 SMEnderChest 1.0.1 Changelog\nNo standalone exact 1.0.1 source/changelog package was recovered. This summary is based on the original 1.0.1 JAR and direct comparison to 1.0.0.\n\nChanged JAR entries:\n- net/smsmp/smenderchest/SMEnderChestPlugin.class\n- net/smsmp/smenderchest/api/SMEnderChestAPI.class\n- plugin.yml\nAdded entries:\n- none\nRemoved entries:\n- none\n\nProduction/runtime logs confirm 1.0.1 was the deployed pre-Phase2B checkpoint. Exact behavioral details beyond the recovered binary are not asserted.\n"
      },
      {
        "version": "1.0.0",
        "title": "SMEnderChest\u2122 1.0.0 \u2014 RECONSTRUCTED CHANGELOG",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMEnderChest-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMEnderChest\u2122 1.0.0 \u2014 RECONSTRUCTED CHANGELOG\n\n**RECONSTRUCTED:** No dedicated historical changelog file for this exact build was recovered.\n\n- Initial recovered SMEnderChest release introducing controlled Ender Chest access, rank-sized storage, persistence, overflow safety, and staff/admin inspection support.\n"
      }
    ]
  },
  "SMFluxBridge": {
    "name": "SMFluxBridge",
    "displayName": "SMFluxBridge\u2122",
    "versions": [
      {
        "version": "1.2.5",
        "title": "SMFluxBridge\u2122 1.2.5 \u2014 Source & Supply-Chain Update",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMFluxBridge-1.2.5.jar",
        "sourceZip": "SMFluxBridge-Historical-Archive-1.2.5.zip",
        "downloadUrl": "../smplugins/smfluxbridge/SMFluxBridge-Historical-Archive-1.2.5.zip",
        "sha256": "171ccf39aa693d2f7efef3106d887c1ffcd82aa7e3aa96749ab974729048bdae",
        "fileSize": "6.1 MB",
        "channel": "Release",
        "target": "Purpur 1.21.11 / Java 21+",
        "content": "# SMFluxBridge\u2122 1.2.5 \u2014 Source & Supply-Chain Update\n\n## Added / Changed\n- Sanitized historical release archives and source code published for public inspection.\n- Relocated SignalR and HTTP client runtime dependencies under internal namespace (`gg.fluxstore.shaded.*`) to eliminate classpath collisions.\n- Hardened command execution journal with strict duplicate delivery suppression.\n- Retains root console command safety filters (`stop`, `restart`, `reload`, `op`, `deop`).\n\n## File Verification\n- **Archive SHA-256:** `171ccf39aa693d2f7efef3106d887c1ffcd82aa7e3aa96749ab974729048bdae`\n- **JAR SHA-256:** `d5b3254da2ecd0539203864758acceebbbce13b4e895667215b31a81ede1dcfd`\n- **Source SHA-256:** `1b2766d91ee609a3729c62d02c0e33454906bd7d89e6c3a653ecb4f8b9528678`\n"
      },
      {
        "version": "1.2.4",
        "title": "SMFluxBridge\u2122 1.2.4 \u2014 Dependency Shading Update",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMFluxBridge-1.2.4.jar",
        "sourceZip": "SMFluxBridge-Historical-Archive-1.2.4.zip",
        "downloadUrl": "../smplugins/smfluxbridge/SMFluxBridge-Historical-Archive-1.2.4.zip",
        "sha256": "a3f165f6a6f6124c0de178613ae88d74b4575d289d72cbec903b5cd25ab69125",
        "fileSize": "6.1 MB",
        "channel": "Release",
        "target": "Purpur 1.21.11 / Java 21+",
        "content": "# SMFluxBridge\u2122 1.2.4 \u2014 Dependency Shading Update\n\n## Changed\n- Relocated SignalR runtime dependencies to prevent library collisions on Purpur 1.21.11.\n- Retains verified one-to-one Minecraft UUID \u2194 Discord User ID identity registry.\n\n## Verification\n- **Archive SHA-256:** `a3f165f6a6f6124c0de178613ae88d74b4575d289d72cbec903b5cd25ab69125`\n"
      },
      {
        "version": "1.2.3",
        "title": "SMFluxBridge\u2122 1.2.3 \u2014 Gateway Lifecycle Polish",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMFluxBridge-1.2.3.jar",
        "sourceZip": "SMFluxBridge-Historical-Archive-1.2.3.zip",
        "downloadUrl": "../smplugins/smfluxbridge/SMFluxBridge-Historical-Archive-1.2.3.zip",
        "sha256": "820f5320431d8bb85497b0cdaad4362182119e238308ae95f474ddfc44b3ee0a",
        "fileSize": "6.1 MB",
        "channel": "Release",
        "target": "Purpur 1.21.11 / Java 21+",
        "content": "# SMFluxBridge\u2122 1.2.3 \u2014 Gateway Lifecycle Polish\n\n## Fixed\n- Refined Discord Gateway reconnection backoff and heartbeat retry handling.\n- Staff `/linkedaccount` slash lookups now respond with ephemeral flag 64.\n\n## Verification\n- **Archive SHA-256:** `820f5320431d8bb85497b0cdaad4362182119e238308ae95f474ddfc44b3ee0a`\n"
      },
      {
        "version": "1.2.2",
        "title": "SMFluxBridge\u2122 1.2.2 \u2014 FluxStore SignalR Reference-Parity Hotfix",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMFluxBridge-1.2.2.jar",
        "sourceZip": "SMFluxBridge-Historical-Archive-1.2.2.zip",
        "downloadUrl": "../smplugins/smfluxbridge/SMFluxBridge-Historical-Archive-1.2.2.zip",
        "sha256": "80446a3c003f1f61f698ce4fe8fa613b031e29c9bf0ad39791825654aff4c17b",
        "fileSize": "6.1 MB",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMFluxBridge\u2122 1.2.2 \u2014 FluxStore SignalR Reference-Parity Hotfix\n\n## Fixed\n- Matched connection mechanics to official FluxStore plugin reference implementation.\n- Preserves cookies set during SignalR negotiation and reuses them for WebSocket upgrade.\n- Appends negotiated SignalR connection token verbatim as `id` query parameter.\n- Carries negotiate `accessToken` into WebSocket Authorization header.\n- Authenticate payload includes `pluginVersion`, `serverSoftware`, `onlinePlayers`, and `maxPlayers`.\n\n## Verification\n- **Archive SHA-256:** `80446a3c003f1f61f698ce4fe8fa613b031e29c9bf0ad39791825654aff4c17b`\n"
      },
      {
        "version": "1.2.1",
        "title": "SMFluxBridge\u2122 1.2.1 \u2014 SignalR Handshake Diagnostics Hotfix",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMFluxBridge-1.2.1.jar",
        "sourceZip": "SMFluxBridge-Historical-Archive-1.2.1.zip",
        "downloadUrl": "../smplugins/smfluxbridge/SMFluxBridge-Historical-Archive-1.2.1.zip",
        "sha256": "c50bcd5aebfdbf939b7960573a6dcbe845ab38debc786e6ce69f128d48b42af5",
        "fileSize": "6.1 MB",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMFluxBridge\u2122 1.2.1 \u2014 SignalR Handshake Diagnostics Hotfix\n\n## Changed\n- WebSocket upgrade failures now retain HTTP handshake status in diagnostics/status output.\n- Sanitized logged endpoint to scheme + host + path only.\n- SignalR User-Agent updated to SMFluxBridge/1.2.1.\n\n## Verification\n- **Archive SHA-256:** `c50bcd5aebfdbf939b7960573a6dcbe845ab38debc786e6ce69f128d48b42af5`\n"
      },
      {
        "version": "1.2.0",
        "title": "SMFluxBridge\u2122 1.2.0 \u2014 Linked Identity Release",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMFluxBridge-1.2.0.jar",
        "sourceZip": "SMFluxBridge-Historical-Archive-1.2.0.zip",
        "downloadUrl": "../smplugins/smfluxbridge/SMFluxBridge-Historical-Archive-1.2.0.zip",
        "sha256": "179ed91f71c2455af794b281daeab48aa19eddccee5658b561d0fe1bb4c1cb2d",
        "fileSize": "6.1 MB",
        "channel": "Release",
        "target": "Purpur 1.21.11 / Java 21 / SMCore 1.2.1",
        "content": "# SMFluxBridge\u2122 1.2.0 \u2014 Linked Identity Release\n\n## Added\n- Persistent one-to-one Minecraft UUID \u2194 Discord User ID identity registry.\n- In-game staff `/linkedaccount <IGN>` and Discord guild `/linkedaccount` slash command.\n- Minimal Discord Gateway connection with non-privileged GUILDS intent.\n- Automatic configurable `Linked Account` Discord role grant on verified link.\n- `/smfluxbridge linksync` to reconcile roles across all known links.\n- Read-only `SMFluxBridgeAPI` with `isLinked`, `getByMinecraft`, and `getByDiscord`.\n- Safe synthetic subscription notification tests.\n\n## Verification\n- **Archive SHA-256:** `179ed91f71c2455af794b281daeab48aa19eddccee5658b561d0fe1bb4c1cb2d`\n"
      },
      {
        "version": "1.1.1",
        "title": "SMFluxBridge\u2122 1.1.1 \u2014 Discord DM Diagnostics Hotfix",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMFluxBridge-1.1.1.jar",
        "sourceZip": "SMFluxBridge-Historical-Archive-1.1.1.zip",
        "downloadUrl": "../smplugins/smfluxbridge/SMFluxBridge-Historical-Archive-1.1.1.zip",
        "sha256": "1ac1daf1c02c8558a701c4c9846bee03a112729218e6bab73426ce0ceeebb0a7",
        "fileSize": "6.1 MB",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMFluxBridge\u2122 1.1.1 \u2014 Discord DM Diagnostics Hotfix\n\n## Fixed\n- Discord DM channel creation failures capture sanitized HTTP status and error codes.\n- `/discordlink` reports sanitized failure details to requesting players.\n- Console records concise sanitized diagnostic lines for failed link-code DMs.\n\n## Verification\n- **Archive SHA-256:** `1ac1daf1c02c8558a701c4c9846bee03a112729218e6bab73426ce0ceeebb0a7`\n"
      },
      {
        "version": "1.1.0",
        "title": "SMFluxBridge\u2122 1.1.0 \u2014 Subscription Lifecycle & Discord Alerts",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMFluxBridge-1.1.0.jar",
        "sourceZip": "SMFluxBridge-Historical-Archive-1.1.0.zip",
        "downloadUrl": "../smplugins/smfluxbridge/SMFluxBridge-Historical-Archive-1.1.0.zip",
        "sha256": "06af4e23d1640255ea3c6c23d59f85b96b122e63ec105bde6cf4024861bb0932",
        "fileSize": "6.1 MB",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMFluxBridge\u2122 1.1.0 \u2014 Subscription Lifecycle & Discord Alerts\n\n## Added\n- FluxStore subscription REST synchronization using API-key authentication.\n- Configurable reminder thresholds (30d, 14d, 7d, 3d, 1d, 12h, 1h).\n- `/subscription` player command for live renewal countdown.\n- Secure `/discordlink` DM-code verification flow with SHA-256 hashed codes.\n- Discord DM renewal and lifecycle notifications.\n\n## Verification\n- **Archive SHA-256:** `06af4e23d1640255ea3c6c23d59f85b96b122e63ec105bde6cf4024861bb0932`\n"
      },
      {
        "version": "1.0.1",
        "title": "SMFluxBridge\u2122 1.0.1 \u2014 SignalR Connection Stability Hotfix",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMFluxBridge-1.0.1.jar",
        "sourceZip": "SMFluxBridge-Historical-Archive-1.0.1.zip",
        "downloadUrl": "../smplugins/smfluxbridge/SMFluxBridge-Historical-Archive-1.0.1.zip",
        "sha256": "d5dfcfc1cff1034907ed2103918764f517b85012bec3039476312f9e7ec344d1",
        "fileSize": "6.1 MB",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMFluxBridge\u2122 1.0.1 \u2014 SignalR Connection Stability Hotfix\n\n## Fixed\n- Protocol-level SignalR keepalive ping frames to prevent idle timeout.\n- Stale-WebSocket callback protection and one-shot disconnect handling.\n- Validates combined server key shape locally without logging credentials.\n\n## Verification\n- **Archive SHA-256:** `d5dfcfc1cff1034907ed2103918764f517b85012bec3039476312f9e7ec344d1`\n"
      },
      {
        "version": "1.0.0",
        "title": "SMFluxBridge\u2122 1.0.0 \u2014 Initial Release",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMFluxBridge-1.0.0.jar",
        "sourceZip": "SMFluxBridge-Historical-Archive-1.0.0.zip",
        "downloadUrl": "../smplugins/smfluxbridge/SMFluxBridge-Historical-Archive-1.0.0.zip",
        "sha256": "1dcb530f88ea62d0a6fb19e83e00fc37228251a9c94ffa3d80a7f0cad4dc8a9f",
        "fileSize": "6.1 MB",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMFluxBridge\u2122 1.0.0 \u2014 Initial Release\n\n## Added\n- First-party game-side FluxStore bridge for SM Suite.\n- SignalR/WebSocket protocol implementation with exponential backoff reconnects.\n- Durable `journal.yml` command journal for duplicate purchase prevention.\n- Blocked destructive console roots (`stop`, `restart`, `reload`, `op`, `deop`).\n\n## Verification\n- **Archive SHA-256:** `1dcb530f88ea62d0a6fb19e83e00fc37228251a9c94ffa3d80a7f0cad4dc8a9f`\n"
      }
    ]
  },
  "SMOrders": {
    "name": "SMOrders",
    "displayName": "SMOrders\u2122",
    "versions": [
      {
        "version": "1.3.0",
        "title": "SMOrders 1.3.0 \u2014 Marketplace Interaction Cleanup",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMOrders-1.3.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMOrders 1.3.0 \u2014 Marketplace Interaction Cleanup\n\n**Author:** G660 & Vaporeon  \n**Website:** https://smsmp.net\n\n## Scope\n\nSMOrders 1.3.0 is the interaction-cleanup release for the buy-order marketplace.\nIt improves how players browse, search, create, fulfill, cancel, and recover order\nitems/money without changing the established economy policy or transaction model.\n\n## Guided Orders GUI\n\nThe bottom navigation row now behaves as an actual control surface instead of\nprimarily pointing players back to commands:\n\n- **Search** starts private chat input from the GUI.\n- **Create Order** starts a guided amount/price setup from the exact item held in\n  the player's main hand.\n- **Money Recovery** shows the current pending claim count.\n- **My Orders** shows active-order capacity and the resolved listing duration.\n- **Delivery Vault** shows the current unclaimed delivery-entry count.\n- unavailable previous/next page controls are visibly disabled.\n\nThe existing command interface remains available and compatible.\n\n## Private chat input\n\nWhen a Search/Create prompt is active, the player's next chat response is\ncancelled from normal chat and consumed as marketplace UI input.\n\n- Search accepts normal text.\n- `clear` removes the current search.\n- `cancel` exits a search/create prompt without changing marketplace state.\n- Create setup asks for total amount, then price per item, then opens the normal\n  creation confirmation GUI.\n\nNo escrow or marketplace transaction begins during the chat-input stages.\n\n## Safer transactional interaction\n\nFulfillment and player cancellation now receive dedicated confirmation screens\nbefore state-changing service calls run.\n\nConfirmation holders are one-shot: once Confirm or Cancel is accepted, repeated\nclick events from the same inventory cannot submit the action twice.\n\nThe existing SMOrders 1.2.0 transaction implementation remains unchanged:\n`OrderService` and `OrderRepository` were carried forward byte-for-source without\nmodification in this release.\n\n## Navigation fixes\n\n- Opening an order from **My Orders** and pressing Back now returns to **My\n  Orders**, preserving the player's previous browse mode/search/sort/page.\n- Page state is clamped before querying a page, preventing an empty stale page\n  when the number of market results shrinks.\n- GUI-to-GUI transitions are deferred to the next server tick to avoid replacing\n  inventories from inside the same click event.\n- Order details clearly distinguish closed orders, self-owned orders, and orders\n  where the seller has no exact matching items.\n\n## Commands retained\n\nNo player/admin command was removed. Existing `/orders` search/sort/create/\nfulfill/my/deliveries/claimmoney/cancel/info flows remain available.\n\n## Production policy unchanged\n\nRank limits/durations remain:\n\n- Member \u2014 3 / 3d\n- Sentinel \u2014 7 / 5d\n- Crusader \u2014 10 / 7d\n- Champion \u2014 12 / 10d\n- Ascendant \u2014 15 / 14d\n- Immortal \u2014 20 / 20d\n\nNo LuckPerms changes are required specifically for 1.3.0.\n\n## Database / reliability\n\n- No database schema migration.\n- No changes to escrow, fulfillment application, delivery persistence, seller\n  payment recovery, cancellation refund, expiration, or transaction-resolution\n  algorithms.\n- Existing SMCore/SMAudit diagnostics remain active.\n"
      },
      {
        "version": "1.2.0",
        "title": "RECONSTRUCTED \u2014 SMOrders 1.2.0 Archive Notes",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMOrders-1.2.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 SMOrders 1.2.0 Archive Notes\nThis document exists to guarantee a self-contained version summary when a standalone original changelog was not recovered.\nEvidence basis: recovered JAR, source package, adjacent source lineage, and any original release documentation stored beside this file.\nVersion role:\n- 1.0.0: initial recovered SMOrders module.\n- 1.0.1: early patch release.\n- 1.1.0: Economy Audit Retrofit.\n- 1.2.0: Phase 2A Economy Diagnostics retrofit.\n- 1.3.0: Interaction Cleanup release with guided chat search/create and recovery UX.\n"
      },
      {
        "version": "1.1.0",
        "title": "RECONSTRUCTED \u2014 SMOrders 1.1.0 Archive Notes",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMOrders-1.1.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 SMOrders 1.1.0 Archive Notes\nThis document exists to guarantee a self-contained version summary when a standalone original changelog was not recovered.\nEvidence basis: recovered JAR, source package, adjacent source lineage, and any original release documentation stored beside this file.\nVersion role:\n- 1.0.0: initial recovered SMOrders module.\n- 1.0.1: early patch release.\n- 1.1.0: Economy Audit Retrofit.\n- 1.2.0: Phase 2A Economy Diagnostics retrofit.\n- 1.3.0: Interaction Cleanup release with guided chat search/create and recovery UX.\n"
      },
      {
        "version": "1.0.1",
        "title": "SMOrders-1.0.1.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMOrders-1.0.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMOrders-1.0.1.jar\n\n## Fixed\n- Fixed cancellation/recovery claims failing when SQLite returned `source_order_id` as an Integer instead of a Long.\n- Cancellation now completes the queued refund claim without throwing an InventoryClickEvent error.\n- SMCore database health is no longer marked unhealthy by non-SQL result-mapping exceptions.\n- SMCore database health still becomes unhealthy for genuine SQL or connection failures.\n\n## Upgrade\n- Replace SMCore 1.0.1 with SMCore 1.0.2.\n- Replace SMOrders 1.0.0 with SMOrders 1.0.1.\n- Keep all existing plugin data folders and `sm-suite.db`.\n"
      },
      {
        "version": "1.0.0",
        "title": "RECONSTRUCTED \u2014 SMOrders 1.0.0 Archive Notes",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMOrders-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# RECONSTRUCTED \u2014 SMOrders 1.0.0 Archive Notes\nThis document exists to guarantee a self-contained version summary when a standalone original changelog was not recovered.\nEvidence basis: recovered JAR, source package, adjacent source lineage, and any original release documentation stored beside this file.\nVersion role:\n- 1.0.0: initial recovered SMOrders module.\n- 1.0.1: early patch release.\n- 1.1.0: Economy Audit Retrofit.\n- 1.2.0: Phase 2A Economy Diagnostics retrofit.\n- 1.3.0: Interaction Cleanup release with guided chat search/create and recovery UX.\n"
      }
    ]
  },
  "SMPortals": {
    "name": "SMPortals",
    "displayName": "SMPortals\u2122",
    "versions": [
      {
        "version": "1.2.0",
        "title": "SMPortals 1.2.0 Changelog",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMPortals-1.2.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMPortals 1.2.0 Changelog\n\n## Diagnostics & reliability\n- Added operation-level SMCore diagnostics for portal loading, admin command failures, destination resolution, portal execution, destination command dispatch, and failed safe/direct teleports.\n- Portal incidents now include portal name, player/UUID, destination type/world, source location, safe-teleport state, pending count, loaded portal count, and recovery state where relevant.\n- Invalid portal files are still isolated so one bad portal does not prevent other portal definitions from loading, but now generate a rich incident report.\n- Destination rejection records that cooldown was not committed and the player should remain at the source unless a downstream command partially executed.\n- Command-destination rejection is explicitly reported so multi-command portal sequences can be reviewed for partial completion.\n- Replaced legacy `ErrorService` reporting with the SMCore 1.2.1 diagnostic incident pipeline.\n\n## Administration\n- Added `/smportal diagnosetest`, which emits a safe synthetic incident without modifying a portal or teleporting anyone.\n- Added `diagnosetest` to tab completion.\n\n## Startup cleanup\n- `messages.yml` is copied only when missing, removing the harmless existing-resource warning while preserving current server files.\n\n## Compatibility\n- Portal/config/message behavior remains compatible with 1.1.0.\n- Existing public/protected Java API signatures are preserved.\n- Built for Java 21 and intended for SMCore 1.2.1 + SMAudit 1.1.1.\n"
      },
      {
        "version": "1.1.0",
        "title": "SMPortals 1.1.0 \u2014 Audit Retrofit",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMPortals-1.1.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "RECONSTRUCTED ARCHIVE DOCUMENT\n==============================\nGenerated during historical recovery because a valid standalone original document for this version was not recovered.\nBased on recovered JARs, source snapshots, embedded defaults, release bundles, and contemporaneous evidence.\n\n# SMPortals 1.1.0 \u2014 Audit Retrofit\n\nExact source comparison shows changes in SMPortalsPlugin.java, PortalExecutionService.java, and config.yml. The retrofit expanded structured SMCore/SMAudit event coverage, including module lifecycle, portal enter/request/use/cancel/denied/failed, portal command execution, edit lifecycle, migration, admin reload, admin denial/failure, plus richer result/context metadata. Gameplay portal configuration remained otherwise compatible.\n"
      },
      {
        "version": "1.0.0",
        "title": "SMPortals-1.0.0.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMPortals-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMPortals-1.0.0.jar\n**Purpose**\n> Configurable multi-portal engine for Spear & Mace SMP.\n\n**Added**\n- Unlimited named portals stored in individual YAML files\n- Cuboid position selection\n- Multiverse, world-spawn, exact-location and command destinations\n- Per-portal permissions, cooldowns and delays\n- Leave-region and damage cancellation\n- Safe direct-location validation\n- Configurable messages, titles, action bars, sounds and particles\n- Portal status, list, info, reload and deletion commands\n- Legacy DashShop Pit portal importer\n- Migration-safe disabled imports\n- SMCore audit logging, performance counters and error reports\n- Author: G660 & Vaporeon\n\n**Dependencies**\n- SMCore\n"
      }
    ]
  },
  "SMPVP": {
    "name": "SMPVP",
    "displayName": "SMPVP\u2122",
    "versions": [
      {
        "version": "1.0.4",
        "title": "SMPVP\u2122 1.0.4 \u2014 RECONSTRUCTED CHANGELOG",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMPVP-1.0.4.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "                # SMPVP\u2122 1.0.4 \u2014 RECONSTRUCTED CHANGELOG\n\n                **RECONSTRUCTED:** No dedicated historical changelog file for this exact build was recovered.\n                This changelog is derived from the preserved archive summary/binary-diff evidence.\n\n                # RECONSTRUCTED \u2014 SMPVP 1.0.4 Archive Summary\n\nThis is a supplemental archive document, not an original historical file.\n\nRecovered role: permission hotfix release; latest recovered SMPVP build.\n\nThe original release/patch package is preserved byte-for-byte in `Release-Packages/`.\nOriginal package documentation is also unpacked under `Original-Package-Contents/` for easy review.\n\nRECONSTRUCTED \u2014 Compiled binary difference from previous recovered build\nPrevious: SMPVP-1.0.3.jar\nCurrent: SMPVP-1.0.4.jar\n\nChanged classes:\n- net/smsmp/smpvp/command/SMPVPCommand.class\n\nAdded classes:\n- net/smsmp/smpvp/patch/PermissionGate.class\n\nRemoved classes:\n- none\n"
      },
      {
        "version": "1.0.3",
        "title": "SMPVP\u2122 1.0.3 \u2014 RECONSTRUCTED CHANGELOG",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMPVP-1.0.3.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "                # SMPVP\u2122 1.0.3 \u2014 RECONSTRUCTED CHANGELOG\n\n                **RECONSTRUCTED:** No dedicated historical changelog file for this exact build was recovered.\n                This changelog is derived from the preserved archive summary/binary-diff evidence.\n\n                # RECONSTRUCTED \u2014 SMPVP 1.0.3 Archive Summary\n\nThis is a supplemental archive document, not an original historical file.\n\nRecovered role: direct-damage hotfix release.\n\nThe original release/patch package is preserved byte-for-byte in `Release-Packages/`.\nOriginal package documentation is also unpacked under `Original-Package-Contents/` for easy review.\n\nRECONSTRUCTED \u2014 Compiled binary difference from previous recovered build\nPrevious: SMPVP-1.0.2.jar\nCurrent: SMPVP-1.0.3.jar\n\nChanged classes:\n- net/smsmp/smpvp/patch/RocketMaceNeutralizer$QualifiedHit.class\n- net/smsmp/smpvp/patch/RocketMaceNeutralizer$SmashAttempt.class\n- net/smsmp/smpvp/patch/RocketMaceNeutralizer.class\n\nAdded classes:\n- none\n\nRemoved classes:\n- net/smsmp/smpvp/patch/RocketMaceNeutralizer$NeutralizedDeath.class\n"
      },
      {
        "version": "1.0.2",
        "title": "SMPVP\u2122 1.0.2 \u2014 RECONSTRUCTED CHANGELOG",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMPVP-1.0.2.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "                # SMPVP\u2122 1.0.2 \u2014 RECONSTRUCTED CHANGELOG\n\n                **RECONSTRUCTED:** No dedicated historical changelog file for this exact build was recovered.\n                This changelog is derived from the preserved archive summary/binary-diff evidence.\n\n                # RECONSTRUCTED \u2014 SMPVP 1.0.2 Archive Summary\n\nThis is a supplemental archive document, not an original historical file.\n\nRecovered role: hotfix release.\n\nThe original release/patch package is preserved byte-for-byte in `Release-Packages/`.\nOriginal package documentation is also unpacked under `Original-Package-Contents/` for easy review.\n\nRECONSTRUCTED \u2014 Compiled binary difference from previous recovered build\nPrevious: SMPVP-1.0.1.jar\nCurrent: SMPVP-1.0.2.jar\n\nChanged classes:\n- net/smsmp/smpvp/listener/SMPVPListener.class\n- net/smsmp/smpvp/patch/ProductionFixes.class\n- net/smsmp/smpvp/patch/RocketMaceNeutralizer$SmashAttempt.class\n- net/smsmp/smpvp/patch/RocketMaceNeutralizer.class\n\nAdded classes:\n- net/smsmp/smpvp/patch/RocketMaceNeutralizer$QualifiedHit.class\n\nRemoved classes:\n- none\n"
      },
      {
        "version": "1.0.1",
        "title": "SMPVP\u2122 1.0.1 \u2014 RECONSTRUCTED CHANGELOG",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMPVP-1.0.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "                # SMPVP\u2122 1.0.1 \u2014 RECONSTRUCTED CHANGELOG\n\n                **RECONSTRUCTED:** No dedicated historical changelog file for this exact build was recovered.\n                This changelog is derived from the preserved archive summary/binary-diff evidence.\n\n                # RECONSTRUCTED \u2014 SMPVP 1.0.1 Archive Summary\n\nThis is a supplemental archive document, not an original historical file.\n\nRecovered role: production patch release.\n\nThe original release/patch package is preserved byte-for-byte in `Release-Packages/`.\nOriginal package documentation is also unpacked under `Original-Package-Contents/` for easy review.\n\nRECONSTRUCTED \u2014 Compiled binary difference from previous recovered build\nPrevious: SMPVP-1.0.0.jar\nCurrent: SMPVP-1.0.1.jar\n\nChanged classes:\n- net/smsmp/smpvp/patch/ProductionFixes.class\n- net/smsmp/smpvp/service/KillAbuseService$Pair.class\n- net/smsmp/smpvp/service/KillAbuseService.class\n\nAdded classes:\n- net/smsmp/smpvp/patch/RocketMaceNeutralizer$NeutralizedDeath.class\n- net/smsmp/smpvp/patch/RocketMaceNeutralizer$SmashAttempt.class\n- net/smsmp/smpvp/patch/RocketMaceNeutralizer.class\n\nRemoved classes:\n- none\n"
      },
      {
        "version": "1.0.0-RC1",
        "title": "SMPVP\u2122 1.0.0-RC1",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMPVP-1.0.0-RC1.jar",
        "fileSize": "N/A",
        "channel": "Beta",
        "target": "Paper 1.20.4+",
        "content": "# SMPVP\u2122 1.0.0-RC1\n\nInitial shadow-first migration release replacing the combined responsibilities of PvPManager and CombatLog.\n\n## Core combat state\n- Single authoritative 15-second combat-session service.\n- Direct and projectile PvP tagging, refresh, expiry, opponent context.\n- Ender-pearl land tagging and wind-charge refresh support.\n- Ignored-world support (`afk`, `spawn` by default).\n- Actionbar or bossbar display support, hidden by default while in SHADOW to avoid fighting legacy UI.\n\n## Firework / elytra / mace protection\n- Uses Paper/Purpur `PlayerElytraBoostEvent` to create an actual rocket-assist context only after a boost survives cancellation.\n- Tracks context age, world, start/max/min altitude, altitude gain, velocity, gliding/ground state.\n- Context persists while airborne and clears after configurable consecutive grounded ticks, committed teleport, world change, death/respawn, or hard timeout.\n- Uses `EntityAttemptSmashAttackEvent` and requires a vanilla-valid smash attempt with a mace and player target by default.\n- In SHADOW: audits the decision only.\n- In ENFORCE: denies the smash result without estimating/reversing damage.\n- Firework boosts can be blocked while already combat-tagged without consuming the rocket.\n- Optional full gliding block remains separate and disabled by default.\n\n## Escape / movement controls\n- Cause-based combat teleport policy for command, plugin, ender pearl, consumable effect, portals, spectator and unknown teleports.\n- Command whitelist/blacklist mode.\n- Optional riptide, mending, flight, gamemode and elytra-glide restrictions.\n- WorldGuard reflection integration with fail-open behavior, anti-border-hop detection/pushback and temporary client-side purple-glass boundary marker.\n\n## Combat logging / abuse\n- Logout punishment recognizes Paper quit reasons; KICKED is excluded by default.\n- Kill-on-logout enforcement exists but is inert in SHADOW.\n- Rolling killer\u2192victim anti-kill-abuse window.\n- RC1 default has kick-only punishment; no automatic ban from movement or kill-abuse detectors.\n\n## Migration safety\n- SHADOW mode is default.\n- ENFORCE safety lock while PvPManager or CombatLog remains enabled.\n- `/smpvp status`, `/smpvp inspect`, `/smpvp mode`, `/smpvp reload`, `/smpvp newbie`, `/smpvp pvp`, `/smpvp diagnosetest`.\n- SMCore diagnostics and structured SMAudit categories.\n"
      },
      {
        "version": "1.0.0",
        "title": "SMPVP\u2122 1.0.0 \u2014 RECONSTRUCTED CHANGELOG",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMPVP-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "                # SMPVP\u2122 1.0.0 \u2014 RECONSTRUCTED CHANGELOG\n\n                **RECONSTRUCTED:** No dedicated historical changelog file for this exact build was recovered.\n                This changelog is derived from the preserved archive summary/binary-diff evidence.\n\n                # RECONSTRUCTED \u2014 SMPVP 1.0.0 Archive Summary\n\nThis is a supplemental archive document, not an original historical file.\n\nRecovered role: initial production cutover release.\n\nThe original release/patch package is preserved byte-for-byte in `Release-Packages/`.\nOriginal package documentation is also unpacked under `Original-Package-Contents/` for easy review.\n\nRECONSTRUCTED \u2014 Compiled binary difference from previous recovered build\nPrevious: SMPVP-1.0.0-RC1.jar\nCurrent: SMPVP-1.0.0.jar\n\nChanged classes:\n- net/smsmp/smpvp/command/SMPVPCommand.class\n- net/smsmp/smpvp/listener/SMPVPListener.class\n- net/smsmp/smpvp/service/CombatSessionService.class\n- net/smsmp/smpvp/service/KillAbuseService.class\n\nAdded classes:\n- net/smsmp/smpvp/patch/ProductionFixes.class\n\nRemoved classes:\n- none\n"
      }
    ]
  },
  "SMStaff": {
    "name": "SMStaff",
    "displayName": "SMStaff\u2122",
    "versions": [
      {
        "version": "1.2.1",
        "title": "SMStaff 1.2.1 \u2014 Dedicated Punishment Logging",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMStaff-1.2.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMStaff 1.2.1 \u2014 Dedicated Punishment Logging\n\n**Author:** G660 & Vaporeon  \n**Website:** https://smsmp.net\n\n## Added\n\n- Added a **dedicated Discord punishment-log system** that is separate from normal SMAudit/staff/general webhook traffic.\n- Added a distinct Discord embed for every successful:\n  - Warning\n  - Permanent mute\n  - Temporary mute\n  - Unmute\n  - Kick\n  - Permanent ban\n  - Temporary ban\n  - Unban\n- Each punishment embed records:\n  - Case number\n  - Offense number\n  - Target player and UUID\n  - Issuing staff member and UUID\n  - Punishment type\n  - Duration or permanent status\n  - Reason\n  - Source: in-game, Discord remote command, or server console\n  - Discord actor identity when the action came through the SMStaff Discord bridge\n  - Result/status\n  - Timestamp\n- Added configurable per-action embed colors.\n- Added optional role mention support for the dedicated punishment channel.\n- Added `/smstaff punishmenttest` for a safe webhook/embed test that creates **no punishment and no moderation case**.\n- `/smstaff status` now reports whether the dedicated punishment log is configured.\n\n## Offense numbering\n\n- New punitive actions (`WARN`, `MUTE`, `KICK`, `BAN`) receive a sequential offense number for that player.\n- The offense number is the player's total disciplinary-action sequence across those four punishment types.\n- `UNMUTE` and `UNBAN` do **not** increment the offense number; they retain the offense number of the original punishment and reference the original case.\n- Existing pre-1.2.1 cases remain compatible. When an older punishment has no stored offense number, SMStaff derives the sequence from case history.\n\n## Audit / case-history improvements\n\n- Punishment audit payloads now include offense number, duration label, command source, Discord actor details when applicable, and dedicated-log configuration state.\n- Punishment events continue to go through the normal SMCore/SMAudit audit pipeline for cross-suite history, while the new dedicated webhook provides the clean moderation-case embed requested for staff use.\n- New punishment audit category: `punishments.dedicated`.\n- `/history` now shows offense number and command source when available.\n- `/smstaff case <id>` now shows offense number, source, Discord actor when applicable, and related/original case for reversals.\n\n## Discord bridge integration\n\n- Remote `/mccommand` moderation actions are explicitly tagged as `DISCORD` rather than looking like ordinary in-game commands.\n- The linked Minecraft staff identity remains the authoritative issuer, while the Discord username/user ID is also retained for traceability.\n- The stable SMStaff 1.1.6/1.2.0 Gateway lifecycle remains intact: fatal close suppression, reconnect backoff, RESUME, heartbeat handling, duplicate protection, and IDENTIFY circuit breaker were preserved.\n\n## Reliability\n\n- Dedicated punishment webhook delivery occurs asynchronously and never blocks the moderation action.\n- A webhook failure does **not** roll back or duplicate the punishment.\n- HTTP 429/5xx and transient delivery failures receive one bounded retry.\n- Permanent webhook failure emits a detailed SMCore diagnostic with case/offense context and recovery state.\n- The webhook URL itself is never placed into the diagnostic context.\n\n## Configuration\n\nA new top-level `punishment-logging` section is available. Existing live config files are not overwritten; merge the provided `SMStaff-1.2.1-PUNISHMENT-LOG-CONFIG.yml` section into the current `plugins/SMStaff/config.yml`.\n\n## Compatibility\n\n- No database schema migration is required.\n- New case metadata is stored in the existing `metadata` column.\n- Existing SMStaff cases and Discord links/sessions remain compatible.\n- No public/protected method signatures from SMStaff 1.2.0 were removed.\n- Target bytecode: Java 21.\n- Runtime target: Purpur 1.21.11 / Java 25.\n"
      },
      {
        "version": "1.2.0",
        "title": "SMStaff 1.2.0 Changelog",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMStaff-1.2.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMStaff 1.2.0 Changelog\n\n**Release:** 1.2.0  \n**Phase:** SM Suite Phase 2C \u2014 Staff/Admin Diagnostics Retrofit  \n**Requires:** SMCore 1.2.1  \n**Optional integrations:** SMAudit, LuckPerms, SMEnderChest, LiteBans  \n**Author:** G660 & Vaporeon  \n**Website:** https://smsmp.net\n\n## Diagnostics and incident reporting\n\n- Added SMCore 1.2.1 operation-level diagnostics throughout SMStaff.\n- Added failure context for command execution, startup/shutdown, player-state recovery, moderation persistence, Discord Gateway/API operations, staff chat, staff mode, vanish, offline inventory edits, expanded Ender Chest saves, command routing, GUI actions, and freeze enforcement.\n- Diagnostics include the affected component/operation, player or target context where appropriate, recovery state, exception/root-cause context, server/plugin environment from SMCore, and an incident ID/local report through the existing diagnostics foundation.\n- Added `/smstaff diagnosetest` for a safe synthetic diagnostic. The test does not change moderation, inventory, Discord, freeze, report, or punishment state.\n- Removed legacy `SMCore ErrorService` reporting calls from SMStaff failure paths in favor of the richer diagnostics service.\n\n## Discord bridge reliability visibility\n\nThe proven SMStaff 1.1.6 Gateway lifecycle remains intact. This release adds diagnostics around it without removing the existing safety controls.\n\n- Added explicit diagnostics for missing Discord configuration, bridge startup failures, WebSocket connection failures, heartbeat ACK timeouts, Gateway payload failures, interaction failures, HTTP/deferred-response failures, and socket errors.\n- Fatal Gateway closes remain non-reconnectable for codes **4004 and 4010\u20134014**.\n- The existing IDENTIFY circuit breaker remains in place and now emits a CRITICAL diagnostic when it activates.\n- Existing reconnect backoff, RESUME support, heartbeat handling, stale-socket protection, duplicate interaction protection, and stable-session reset behavior remain present.\n- Remote Minecraft command failures log the allowed command **root** rather than exposing a full potentially sensitive command string.\n- No Discord bot token or webhook URL is intentionally placed in diagnostic context; SMCore redaction remains an additional safety layer.\n\n## Staff-mode and vanish safety\n\n- Staff-mode entry now serializes and persists the complete recovery snapshot **before** clearing or replacing the player's inventory.\n- A failure before snapshot persistence leaves the normal inventory intentionally untouched.\n- If a later staff-mode setup step fails after the snapshot is stored, the recovery snapshot remains available for manual recovery/retry.\n- Staff-mode exit now decodes all stored inventory payloads before clearing the active staff-mode inventory, preventing a corrupt recovery payload from causing a destructive clear.\n- The stored staff-mode snapshot is cleared only after successful restoration.\n- Staff-mode shutdown recovery now diagnoses individual restore failures rather than silently discarding recovery context.\n- Vanish persistence/runtime-visibility failures now emit CRITICAL diagnostics because database state and live visibility could disagree.\n\n## Moderation and reports\n\n- Freeze/screen-share now persists its case before the target freeze state is changed.\n- If freeze-state persistence fails after the case is created, the incident clearly records that the case exists but the target was not intentionally notified/frozen.\n- Unfreeze failures distinguish between a freeze-state clear failure and a later failure to create the UNFREEZE case.\n- Staff note persistence failures now emit operation-level diagnostics.\n- Player-report creation failures do not consume the report cooldown unless the report was confirmed stored.\n- Report-resolution failures now report the possibility that a database commit may have occurred before an exception.\n- Punishment creation now requires case persistence before applying the punishment state.\n- Punishment reversal failures distinguish between failure to deactivate the punishment and failure to record the reversal case after the target was already unbanned/unmuted.\n\n## Offline inventory / Ender Chest safety\n\n- Offline inventory/Ender Chest read failures now identify target, scope, and recovery state.\n- Staged offline edits now serialize both original and staged payloads before the pending edit is persisted.\n- A staging failure does not modify the offline player's saved `.dat` data.\n- Pending edit loading/application failures are diagnosed and pending rows are retained or marked FAILED when possible for review.\n- Failure to mark a failed edit is separately reported so a row that may remain PENDING is visible.\n- Expanded online Ender Chest moderation saves now persist SMEnderChest extra slots before intentionally mutating vanilla slots, avoiding a vanilla mutation when the extra-slot API save fails before that point.\n- Expanded Ender Chest save failures are treated as manual-review conditions rather than retried blindly.\n\n## Enforcement / GUI / routing diagnostics\n\n- Added explicit diagnostics around ban login checks, mute/staff-chat checks, frozen-player movement/teleport/damage/command enforcement, frozen-player disconnect automation, and player join recovery.\n- Added diagnostics around SMStaff GUI click failures and report GUI actions.\n- Namespaced command-ownership routing now reports failed/exceptional dispatch instead of silently cancelling the original command with no explanation.\n\n## Startup cleanup and metadata\n\n- Existing `messages.yml` is preserved without Bukkit's misleading `Could not save ... already exists` startup warning.\n- `messages.yml` remains optional at runtime; a genuinely missing embedded resource is now diagnosed while SMStaff continues with built-in/default messaging.\n- `smstaff.offlineedit` is now explicitly declared in `plugin.yml` while remaining a child of `smstaff.admin`.\n- `/smstaff` usage/tab completion includes `diagnosetest`.\n\n## Compatibility\n\n- No intentional gameplay/config tuning is included in this diagnostics release.\n- Existing `config.yml` and `messages.yml` are unchanged from SMStaff 1.1.6.\n- Static API comparison found **0 removed public/protected signatures** versus SMStaff 1.1.6.\n- Compiled for Java 21 bytecode and intended for the current Purpur 1.21.11 / Java 25 server.\n"
      },
      {
        "version": "1.1.6",
        "title": "SMStaff v1.1.6",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMStaff-1.1.6.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMStaff v1.1.6\n\nAuthors: G660 & Vaporeon  \nWebsite: https://smsmp.net\n\n## Hotfix\n- Fixes SMStaff v1.1.5 failing during enable because `messages.yml` was omitted from the built JAR.\n- Restores the embedded `messages.yml` resource.\n- Makes startup resilient: if `messages.yml` is ever missing from a future package, SMStaff now logs a warning and continues with built-in/default messages instead of disabling the entire plugin.\n- Retains all Discord Gateway/session/reconnect fixes introduced in v1.1.5.\n- No database migration and no production config migration required.\n"
      },
      {
        "version": "1.1.5",
        "title": "SMStaff-1.0.0.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMStaff-1.1.5.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# Recovered changelog source 1: ORIGINAL-CHANGELOG-SMSTAFF-v1.0.1.md\n\n# SMStaff-1.0.1.jar\n\n**Purpose**\nBug-fix patch for SMStaff staff mode, freeze/SS movement handling, vanish tools, and compatibility with FAWE staff-tool conflicts.\n\n## Fixed\n- Freeze and /ss no longer rubber-band players by repeatedly teleporting them back every movement tick.\n- Frozen players who were caught jumping/in the air are allowed to fall naturally to the ground, preventing false \"flying\" kicks.\n- Frozen players still cannot walk, jump upward, teleport, use blocked commands, or take damage.\n- Staff-mode Compass is now fully consumed by SMStaff so FAWE cannot use it as a navigation/teleport compass.\n- Packed Ice Freeze Tool can no longer be placed as a block.\n- Freeze Tool now only toggles freeze when right-clicking a player.\n- Feather now reliably toggles SMStaff vanish on right-click.\n- Redstone Block now reliably exits staff mode on right-click without needing to place it.\n- All tagged SMStaff tools now cancel vanilla/other-plugin interactions before those plugins can act.\n- Added a block-place safety handler so tagged staff tools cannot be placed even if another plugin changes interaction order.\n\n## Unchanged\n- Stored staff inventory/recovery system.\n- Moderation cases and database schema.\n- LiteBans / StaffPlus parallel command ownership.\n- SMAudit integration.\n- Permissions and hierarchy.\n\n**Authors:** G660 & Vaporeon\n\n---\n\n# Recovered changelog source 2: ORIGINAL-CHANGELOG-SMSTAFF-v1.1.0.md\n\n# SMStaff-1.1.0.jar\n\n**Purpose**\n> Adds the secure Discord staff-command bridge to the existing SMStaff moderation system.\n\n## Added\n- Discord Gateway client built directly into SMStaff; no extra bot software or coding tools required.\n- Guild-scoped slash commands:\n  - `/login code:<code>`\n  - `/logout`\n  - `/whoami`\n  - `/mccommand command:<command>`\n  - `/stafflist`\n  - `/playerinfo player:<name>`\n- In-game `/smstaff discord code` command creates a one-time staff login code.\n- In-game `/smstaff discord status` displays bridge/link status.\n- In-game `/smstaff discord unlink` revokes the Discord link and active session.\n- One Discord account \u2194 one Minecraft staff identity binding.\n- PBKDF2-HMAC-SHA256 staff-code hashing with unique random salt.\n- Raw staff login codes are never persisted in SQLite, config files, console logs or SMAudit records.\n- Expiring one-time login codes.\n- Expiring Discord authentication sessions.\n- Persistent session/link storage in SMCore SQLite.\n- Login brute-force throttling and temporary lockouts.\n- Staff status re-validated against the Minecraft/LuckPerms hierarchy before each authenticated Discord action.\n- Remote commands execute as the linked **online Minecraft player**, preserving LuckPerms and SMStaff hierarchy protections.\n- Configurable command allowlist and hard denylist.\n- Per-command Minecraft permission checks before remote execution.\n- Dangerous command roots blocked by default (`stop`, `restart`, `reload`, `op`, `deop`, LuckPerms/admin/core commands, execute, etc.).\n- Discord interaction responses are ephemeral.\n- Discord mentions are disabled in bot responses.\n- Automatic guild slash-command registration on bridge startup.\n- Automatic Gateway reconnect and heartbeat handling.\n- Full SMCore \u2192 SMAudit events for login success/failure, logout, link revocation, command request/denial/execution, player information requests and Gateway state.\n- `/smstaff status` now displays Discord bridge and session state.\n\n## Security model\n- The bot token is never included in audit payloads.\n- Environment-variable bot token is preferred; config token is available as a host-panel fallback.\n- Discord login alone is not enough: the linked Minecraft account must still resolve as staff.\n- `/mccommand` requires an authenticated, non-expired Discord session.\n- `/mccommand` requires the linked Minecraft staff account to be online by default.\n- Commands run through the real player sender rather than console, so normal server permissions continue to apply.\n\n## Compatibility\n- Java 21\n- Purpur 1.21.11\n- SMCore 1.1.0\n- SMAudit 1.0.3+\n- Vault / LuckPerms\n- Existing SMStaff 1.0.1 database and config are preserved.\n- No destructive migration is required.\n\n**Author:** G660 & Vaporeon  \n**Website:** https://smsmp.net\n\n---\n\n# Recovered changelog source 3: ORIGINAL-CHANGELOG-SMSTAFF-v1.1.1.md\n\n# SMStaff-1.1.1.jar\n\n## Purpose\nPatch release expanding staff inventory inspection to players who are offline while preserving the stable 1.1.0 moderation and Discord-control systems.\n\n## Added\n- `/invsee <player>` now supports offline players with saved player data.\n- `/endersee <player>` now supports offline players with saved player data.\n- Offline inventory snapshots preserve modern Minecraft item data through the server's own ItemStack codec, including names, lore, enchantments and data components when the server can decode them.\n- Offline inventory view includes normal inventory, hotbar, armor and offhand.\n- Offline Ender Chest view includes all 27 Ender Chest slots.\n- Offline-name tab completion for `/invsee` and `/endersee`.\n- Structured SMAudit data now records whether the target was online/offline and whether the view was read-only.\n- Hierarchy protection also applies to offline staff accounts.\n\n## Safety\n- Offline snapshots are intentionally read-only in v1.1.1.\n- SMStaff does not rewrite player `.dat` files for inspection.\n- Online player inventories remain live like previous versions.\n- Existing SMStaff database/configuration data is retained.\n\n## Compatibility\n- Java 21\n- Purpur 1.21.11\n- SMCore 1.1.0\n- SMAudit 1.0.3\n- Author: G660 & Vaporeon\n\n---\n\n# Recovered changelog source 4: ORIGINAL-CHANGELOG-SMSTAFF-v1.1.2.md\n\n# SMStaff-1.1.2.jar\n\n## Discord Staff Control polish\n- Keeps the complete SMStaff 1.1.1 offline `/invsee` and `/endersee` support.\n- Adds Discord feature permission nodes: `smstaff.discord.command`, `smstaff.discord.stafflist`, and `smstaff.discord.playerinfo`.\n- Remote `/mccommand` now has two permission gates: SMStaff's Discord permission plus the real permission required by the Minecraft command.\n- Expands the configurable remote allowlist to the staff/admin roots of the current SM Suite.\n- Adds full-command prefix denials so dangerous subcommands can stay blocked even when an SM Suite root is allowed.\n- Remote command responses can now be posted into the Discord channel where the slash command was used instead of only being ephemeral.\n- `/history`, `/warnings`, read-only `/notes`, `/smstaff status`, and `/smstaff case` mirror useful result data back into Discord after execution.\n- `/login` and security-sensitive authentication responses remain ephemeral.\n- Existing bot token, application ID, guild ID, staff links, sessions, cases, inventories, and database data are preserved.\n\n## Offline inventory\n- Offline `/invsee` and `/endersee` from 1.1.1 are retained.\n- Offline snapshots remain read-only to avoid unsafe writes to player `.dat` files.\n\n## Security\n- Discord commands still execute as the linked ONLINE Minecraft player.\n- The linked player must still be recognized as staff.\n- LuckPerms/SMStaff permission checks still apply.\n- Root denylist and full-command prefix denylist override the allowlist.\n- SMAudit continues to record login, command request, denial, execution, and identity details without exposing staff codes or the bot token.\n\n---\n\n# Recovered changelog source 5: ORIGINAL-CHANGELOG-SMSTAFF-v1.1.3.md\n\n# SMStaff-1.1.3.jar\n\n## Purpose\nSMEnderChest integration, staged offline inventory moderation, and staff-chat Discord mirroring.\n\n## Added\n- `/endersee <player>` now supports the full 54-slot SMEnderChest storage surface, including expanded/overflow slots.\n- Online expanded Ender Chest staff edits save through the SMEnderChest API instead of touching its database directly.\n- Offline `/invsee` and `/endersee` are no longer direct `.dat` edits.\n- Offline item removals are staged in SMCore SQLite and applied one tick after the target next joins.\n- Only the newest pending edit for each target/scope remains active; previous pending snapshots are retained as `SUPERSEDED` history.\n- Original and intended inventory snapshots are retained for recovery/audit history.\n- Failed join-time applications are marked `FAILED` and reported through SMCore error reporting.\n- New `smstaff.offlineedit` permission.\n- Dedicated staff-chat Discord webhook mirroring with configurable webhook and bot display name.\n- Staff-chat mirror includes Minecraft name + primary LuckPerms group and suppresses Discord mentions.\n- Extensive SMAudit events for offline view, staged removal, staged snapshot, application, failure, expanded Ender saves, and staff-chat mirroring.\n\n## Safety model\nOffline moderation is intentionally REMOVE_ONLY in this release. Staff can click an offline target item to stage its removal, but cannot inject/rearrange items while the target is absent. This avoids direct writes to offline player `.dat` files and prevents the inspection GUI from becoming an item duplication path.\n\n# SMEnderChest-1.0.1.jar\n\n## Integration patch\n- Adds trusted SM Suite API support for replacing plugin-managed extra Ender Chest storage.\n- SMStaff uses the public service API; it does not reach into SMEnderChest database tables.\n- No player-facing storage format change.\n- Existing SMEnderChest configuration and stored items remain compatible.\n\n---\n\n# Recovered changelog source 6: ORIGINAL-CHANGELOG-SMSTAFF.md\n\n# SMStaff-1.0.0.jar\n\n**Purpose**\n> First full in-game moderation/staff-management replacement layer for LiteBans + StaffPlus/Staff++. Built on SMCore with structured SMAudit events and persistent SQLite state.\n\n**Moderation**\n- Permanent + temporary bans\n- Permanent + temporary mutes\n- Warns and warning history\n- Kicks with persistent case IDs\n- Unban / unmute reversals recorded as new cases\n- Duration parser (`30m`, `2h`, `7d`, `1w2d`, etc.)\n- Login-time ban enforcement\n- Chat-time mute enforcement\n- `/history`, `/warnings`, `/notes`, `/smstaff case <id>`\n- LuckPerms/Vault primary-group hierarchy protection\n\n**Staff tools**\n- `/staff` control GUI\n- Protected `/staffmode` with inventory snapshot + crash/reload recovery\n- Staff-mode inspect/freeze/vanish tools\n- `/staffchat`\n- `/vanish`\n- `/freeze`, `/unfreeze`, `/ss`\n- Freeze movement/teleport/command restrictions\n- Frozen-player disconnect security audit\n- `/invsee`, `/endersee`, `/inspect`, `/spectate`\n- Spectate return-state restoration\n\n**Reports**\n- Public `/report <player> <reason>`\n- Configurable report cooldown\n- Staff `/reports` GUI\n- List/detail/resolve workflow\n- Persistent report IDs and resolution history\n\n**Safety / migration**\n- Detects LiteBans + StaffPlus/Staff++\n- `command-ownership.mode: AUTO` leaves legacy command ownership alone while legacy staff plugins are enabled\n- After legacy plugins are removed, normal `/ban`, `/kick`, `/freeze`, `/staff`, etc. are forcibly routed to SMStaff even if Essentials also provides commands\n- Full database storage inside the SMCore SQLite database\n- No destructive legacy migration required on the development server\n\n**Audit**\n- Punishment issuer/target/staff metadata\n- Staff actions, hierarchy denials, reports, freeze disconnects, GUI actions and failures\n- All structured through SMCore -> SMAudit\n\n**Deferred intentionally**\n- Discord `/login` staff authentication + remote authorized command bridge is reserved for SMStaff 1.1.x after the in-game moderation cutover passes. It will use hashed staff codes, expiring sessions, revocation, allowlists/denylists and SMAudit logging.\n\n**Author**\n- G660 & Vaporeon\n"
      },
      {
        "version": "1.1.4",
        "title": "SMStaff-1.0.0.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMStaff-1.1.4.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# Recovered changelog source 1: ORIGINAL-CHANGELOG-SMSTAFF-v1.0.1.md\n\n# SMStaff-1.0.1.jar\n\n**Purpose**\nBug-fix patch for SMStaff staff mode, freeze/SS movement handling, vanish tools, and compatibility with FAWE staff-tool conflicts.\n\n## Fixed\n- Freeze and /ss no longer rubber-band players by repeatedly teleporting them back every movement tick.\n- Frozen players who were caught jumping/in the air are allowed to fall naturally to the ground, preventing false \"flying\" kicks.\n- Frozen players still cannot walk, jump upward, teleport, use blocked commands, or take damage.\n- Staff-mode Compass is now fully consumed by SMStaff so FAWE cannot use it as a navigation/teleport compass.\n- Packed Ice Freeze Tool can no longer be placed as a block.\n- Freeze Tool now only toggles freeze when right-clicking a player.\n- Feather now reliably toggles SMStaff vanish on right-click.\n- Redstone Block now reliably exits staff mode on right-click without needing to place it.\n- All tagged SMStaff tools now cancel vanilla/other-plugin interactions before those plugins can act.\n- Added a block-place safety handler so tagged staff tools cannot be placed even if another plugin changes interaction order.\n\n## Unchanged\n- Stored staff inventory/recovery system.\n- Moderation cases and database schema.\n- LiteBans / StaffPlus parallel command ownership.\n- SMAudit integration.\n- Permissions and hierarchy.\n\n**Authors:** G660 & Vaporeon\n\n---\n\n# Recovered changelog source 2: ORIGINAL-CHANGELOG-SMSTAFF-v1.1.0.md\n\n# SMStaff-1.1.0.jar\n\n**Purpose**\n> Adds the secure Discord staff-command bridge to the existing SMStaff moderation system.\n\n## Added\n- Discord Gateway client built directly into SMStaff; no extra bot software or coding tools required.\n- Guild-scoped slash commands:\n  - `/login code:<code>`\n  - `/logout`\n  - `/whoami`\n  - `/mccommand command:<command>`\n  - `/stafflist`\n  - `/playerinfo player:<name>`\n- In-game `/smstaff discord code` command creates a one-time staff login code.\n- In-game `/smstaff discord status` displays bridge/link status.\n- In-game `/smstaff discord unlink` revokes the Discord link and active session.\n- One Discord account \u2194 one Minecraft staff identity binding.\n- PBKDF2-HMAC-SHA256 staff-code hashing with unique random salt.\n- Raw staff login codes are never persisted in SQLite, config files, console logs or SMAudit records.\n- Expiring one-time login codes.\n- Expiring Discord authentication sessions.\n- Persistent session/link storage in SMCore SQLite.\n- Login brute-force throttling and temporary lockouts.\n- Staff status re-validated against the Minecraft/LuckPerms hierarchy before each authenticated Discord action.\n- Remote commands execute as the linked **online Minecraft player**, preserving LuckPerms and SMStaff hierarchy protections.\n- Configurable command allowlist and hard denylist.\n- Per-command Minecraft permission checks before remote execution.\n- Dangerous command roots blocked by default (`stop`, `restart`, `reload`, `op`, `deop`, LuckPerms/admin/core commands, execute, etc.).\n- Discord interaction responses are ephemeral.\n- Discord mentions are disabled in bot responses.\n- Automatic guild slash-command registration on bridge startup.\n- Automatic Gateway reconnect and heartbeat handling.\n- Full SMCore \u2192 SMAudit events for login success/failure, logout, link revocation, command request/denial/execution, player information requests and Gateway state.\n- `/smstaff status` now displays Discord bridge and session state.\n\n## Security model\n- The bot token is never included in audit payloads.\n- Environment-variable bot token is preferred; config token is available as a host-panel fallback.\n- Discord login alone is not enough: the linked Minecraft account must still resolve as staff.\n- `/mccommand` requires an authenticated, non-expired Discord session.\n- `/mccommand` requires the linked Minecraft staff account to be online by default.\n- Commands run through the real player sender rather than console, so normal server permissions continue to apply.\n\n## Compatibility\n- Java 21\n- Purpur 1.21.11\n- SMCore 1.1.0\n- SMAudit 1.0.3+\n- Vault / LuckPerms\n- Existing SMStaff 1.0.1 database and config are preserved.\n- No destructive migration is required.\n\n**Author:** G660 & Vaporeon  \n**Website:** https://smsmp.net\n\n---\n\n# Recovered changelog source 3: ORIGINAL-CHANGELOG-SMSTAFF-v1.1.1.md\n\n# SMStaff-1.1.1.jar\n\n## Purpose\nPatch release expanding staff inventory inspection to players who are offline while preserving the stable 1.1.0 moderation and Discord-control systems.\n\n## Added\n- `/invsee <player>` now supports offline players with saved player data.\n- `/endersee <player>` now supports offline players with saved player data.\n- Offline inventory snapshots preserve modern Minecraft item data through the server's own ItemStack codec, including names, lore, enchantments and data components when the server can decode them.\n- Offline inventory view includes normal inventory, hotbar, armor and offhand.\n- Offline Ender Chest view includes all 27 Ender Chest slots.\n- Offline-name tab completion for `/invsee` and `/endersee`.\n- Structured SMAudit data now records whether the target was online/offline and whether the view was read-only.\n- Hierarchy protection also applies to offline staff accounts.\n\n## Safety\n- Offline snapshots are intentionally read-only in v1.1.1.\n- SMStaff does not rewrite player `.dat` files for inspection.\n- Online player inventories remain live like previous versions.\n- Existing SMStaff database/configuration data is retained.\n\n## Compatibility\n- Java 21\n- Purpur 1.21.11\n- SMCore 1.1.0\n- SMAudit 1.0.3\n- Author: G660 & Vaporeon\n\n---\n\n# Recovered changelog source 4: ORIGINAL-CHANGELOG-SMSTAFF-v1.1.2.md\n\n# SMStaff-1.1.2.jar\n\n## Discord Staff Control polish\n- Keeps the complete SMStaff 1.1.1 offline `/invsee` and `/endersee` support.\n- Adds Discord feature permission nodes: `smstaff.discord.command`, `smstaff.discord.stafflist`, and `smstaff.discord.playerinfo`.\n- Remote `/mccommand` now has two permission gates: SMStaff's Discord permission plus the real permission required by the Minecraft command.\n- Expands the configurable remote allowlist to the staff/admin roots of the current SM Suite.\n- Adds full-command prefix denials so dangerous subcommands can stay blocked even when an SM Suite root is allowed.\n- Remote command responses can now be posted into the Discord channel where the slash command was used instead of only being ephemeral.\n- `/history`, `/warnings`, read-only `/notes`, `/smstaff status`, and `/smstaff case` mirror useful result data back into Discord after execution.\n- `/login` and security-sensitive authentication responses remain ephemeral.\n- Existing bot token, application ID, guild ID, staff links, sessions, cases, inventories, and database data are preserved.\n\n## Offline inventory\n- Offline `/invsee` and `/endersee` from 1.1.1 are retained.\n- Offline snapshots remain read-only to avoid unsafe writes to player `.dat` files.\n\n## Security\n- Discord commands still execute as the linked ONLINE Minecraft player.\n- The linked player must still be recognized as staff.\n- LuckPerms/SMStaff permission checks still apply.\n- Root denylist and full-command prefix denylist override the allowlist.\n- SMAudit continues to record login, command request, denial, execution, and identity details without exposing staff codes or the bot token.\n\n---\n\n# Recovered changelog source 5: ORIGINAL-CHANGELOG-SMSTAFF-v1.1.3.md\n\n# SMStaff-1.1.3.jar\n\n## Purpose\nSMEnderChest integration, staged offline inventory moderation, and staff-chat Discord mirroring.\n\n## Added\n- `/endersee <player>` now supports the full 54-slot SMEnderChest storage surface, including expanded/overflow slots.\n- Online expanded Ender Chest staff edits save through the SMEnderChest API instead of touching its database directly.\n- Offline `/invsee` and `/endersee` are no longer direct `.dat` edits.\n- Offline item removals are staged in SMCore SQLite and applied one tick after the target next joins.\n- Only the newest pending edit for each target/scope remains active; previous pending snapshots are retained as `SUPERSEDED` history.\n- Original and intended inventory snapshots are retained for recovery/audit history.\n- Failed join-time applications are marked `FAILED` and reported through SMCore error reporting.\n- New `smstaff.offlineedit` permission.\n- Dedicated staff-chat Discord webhook mirroring with configurable webhook and bot display name.\n- Staff-chat mirror includes Minecraft name + primary LuckPerms group and suppresses Discord mentions.\n- Extensive SMAudit events for offline view, staged removal, staged snapshot, application, failure, expanded Ender saves, and staff-chat mirroring.\n\n## Safety model\nOffline moderation is intentionally REMOVE_ONLY in this release. Staff can click an offline target item to stage its removal, but cannot inject/rearrange items while the target is absent. This avoids direct writes to offline player `.dat` files and prevents the inspection GUI from becoming an item duplication path.\n\n# SMEnderChest-1.0.1.jar\n\n## Integration patch\n- Adds trusted SM Suite API support for replacing plugin-managed extra Ender Chest storage.\n- SMStaff uses the public service API; it does not reach into SMEnderChest database tables.\n- No player-facing storage format change.\n- Existing SMEnderChest configuration and stored items remain compatible.\n\n---\n\n# Recovered changelog source 6: ORIGINAL-CHANGELOG-SMSTAFF.md\n\n# SMStaff-1.0.0.jar\n\n**Purpose**\n> First full in-game moderation/staff-management replacement layer for LiteBans + StaffPlus/Staff++. Built on SMCore with structured SMAudit events and persistent SQLite state.\n\n**Moderation**\n- Permanent + temporary bans\n- Permanent + temporary mutes\n- Warns and warning history\n- Kicks with persistent case IDs\n- Unban / unmute reversals recorded as new cases\n- Duration parser (`30m`, `2h`, `7d`, `1w2d`, etc.)\n- Login-time ban enforcement\n- Chat-time mute enforcement\n- `/history`, `/warnings`, `/notes`, `/smstaff case <id>`\n- LuckPerms/Vault primary-group hierarchy protection\n\n**Staff tools**\n- `/staff` control GUI\n- Protected `/staffmode` with inventory snapshot + crash/reload recovery\n- Staff-mode inspect/freeze/vanish tools\n- `/staffchat`\n- `/vanish`\n- `/freeze`, `/unfreeze`, `/ss`\n- Freeze movement/teleport/command restrictions\n- Frozen-player disconnect security audit\n- `/invsee`, `/endersee`, `/inspect`, `/spectate`\n- Spectate return-state restoration\n\n**Reports**\n- Public `/report <player> <reason>`\n- Configurable report cooldown\n- Staff `/reports` GUI\n- List/detail/resolve workflow\n- Persistent report IDs and resolution history\n\n**Safety / migration**\n- Detects LiteBans + StaffPlus/Staff++\n- `command-ownership.mode: AUTO` leaves legacy command ownership alone while legacy staff plugins are enabled\n- After legacy plugins are removed, normal `/ban`, `/kick`, `/freeze`, `/staff`, etc. are forcibly routed to SMStaff even if Essentials also provides commands\n- Full database storage inside the SMCore SQLite database\n- No destructive legacy migration required on the development server\n\n**Audit**\n- Punishment issuer/target/staff metadata\n- Staff actions, hierarchy denials, reports, freeze disconnects, GUI actions and failures\n- All structured through SMCore -> SMAudit\n\n**Deferred intentionally**\n- Discord `/login` staff authentication + remote authorized command bridge is reserved for SMStaff 1.1.x after the in-game moderation cutover passes. It will use hashed staff codes, expiring sessions, revocation, allowlists/denylists and SMAudit logging.\n\n**Author**\n- G660 & Vaporeon\n"
      },
      {
        "version": "1.1.3",
        "title": "SMEnderChest-1.0.1.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMStaff-1.1.3.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMStaff-1.1.3.jar\n\n## Purpose\nSMEnderChest integration, staged offline inventory moderation, and staff-chat Discord mirroring.\n\n## Added\n- `/endersee <player>` now supports the full 54-slot SMEnderChest storage surface, including expanded/overflow slots.\n- Online expanded Ender Chest staff edits save through the SMEnderChest API instead of touching its database directly.\n- Offline `/invsee` and `/endersee` are no longer direct `.dat` edits.\n- Offline item removals are staged in SMCore SQLite and applied one tick after the target next joins.\n- Only the newest pending edit for each target/scope remains active; previous pending snapshots are retained as `SUPERSEDED` history.\n- Original and intended inventory snapshots are retained for recovery/audit history.\n- Failed join-time applications are marked `FAILED` and reported through SMCore error reporting.\n- New `smstaff.offlineedit` permission.\n- Dedicated staff-chat Discord webhook mirroring with configurable webhook and bot display name.\n- Staff-chat mirror includes Minecraft name + primary LuckPerms group and suppresses Discord mentions.\n- Extensive SMAudit events for offline view, staged removal, staged snapshot, application, failure, expanded Ender saves, and staff-chat mirroring.\n\n## Safety model\nOffline moderation is intentionally REMOVE_ONLY in this release. Staff can click an offline target item to stage its removal, but cannot inject/rearrange items while the target is absent. This avoids direct writes to offline player `.dat` files and prevents the inspection GUI from becoming an item duplication path.\n\n# SMEnderChest-1.0.1.jar\n\n## Integration patch\n- Adds trusted SM Suite API support for replacing plugin-managed extra Ender Chest storage.\n- SMStaff uses the public service API; it does not reach into SMEnderChest database tables.\n- No player-facing storage format change.\n- Existing SMEnderChest configuration and stored items remain compatible.\n"
      },
      {
        "version": "1.1.2",
        "title": "SMStaff-1.1.2.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMStaff-1.1.2.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMStaff-1.1.2.jar\n\n## Discord Staff Control polish\n- Keeps the complete SMStaff 1.1.1 offline `/invsee` and `/endersee` support.\n- Adds Discord feature permission nodes: `smstaff.discord.command`, `smstaff.discord.stafflist`, and `smstaff.discord.playerinfo`.\n- Remote `/mccommand` now has two permission gates: SMStaff's Discord permission plus the real permission required by the Minecraft command.\n- Expands the configurable remote allowlist to the staff/admin roots of the current SM Suite.\n- Adds full-command prefix denials so dangerous subcommands can stay blocked even when an SM Suite root is allowed.\n- Remote command responses can now be posted into the Discord channel where the slash command was used instead of only being ephemeral.\n- `/history`, `/warnings`, read-only `/notes`, `/smstaff status`, and `/smstaff case` mirror useful result data back into Discord after execution.\n- `/login` and security-sensitive authentication responses remain ephemeral.\n- Existing bot token, application ID, guild ID, staff links, sessions, cases, inventories, and database data are preserved.\n\n## Offline inventory\n- Offline `/invsee` and `/endersee` from 1.1.1 are retained.\n- Offline snapshots remain read-only to avoid unsafe writes to player `.dat` files.\n\n## Security\n- Discord commands still execute as the linked ONLINE Minecraft player.\n- The linked player must still be recognized as staff.\n- LuckPerms/SMStaff permission checks still apply.\n- Root denylist and full-command prefix denylist override the allowlist.\n- SMAudit continues to record login, command request, denial, execution, and identity details without exposing staff codes or the bot token.\n"
      },
      {
        "version": "1.1.1",
        "title": "SMStaff-1.1.1.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMStaff-1.1.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMStaff-1.1.1.jar\n\n## Purpose\nPatch release expanding staff inventory inspection to players who are offline while preserving the stable 1.1.0 moderation and Discord-control systems.\n\n## Added\n- `/invsee <player>` now supports offline players with saved player data.\n- `/endersee <player>` now supports offline players with saved player data.\n- Offline inventory snapshots preserve modern Minecraft item data through the server's own ItemStack codec, including names, lore, enchantments and data components when the server can decode them.\n- Offline inventory view includes normal inventory, hotbar, armor and offhand.\n- Offline Ender Chest view includes all 27 Ender Chest slots.\n- Offline-name tab completion for `/invsee` and `/endersee`.\n- Structured SMAudit data now records whether the target was online/offline and whether the view was read-only.\n- Hierarchy protection also applies to offline staff accounts.\n\n## Safety\n- Offline snapshots are intentionally read-only in v1.1.1.\n- SMStaff does not rewrite player `.dat` files for inspection.\n- Online player inventories remain live like previous versions.\n- Existing SMStaff database/configuration data is retained.\n\n## Compatibility\n- Java 21\n- Purpur 1.21.11\n- SMCore 1.1.0\n- SMAudit 1.0.3\n- Author: G660 & Vaporeon\n"
      },
      {
        "version": "1.1.0",
        "title": "SMStaff-1.1.0.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMStaff-1.1.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMStaff-1.1.0.jar\n\n**Purpose**\n> Adds the secure Discord staff-command bridge to the existing SMStaff moderation system.\n\n## Added\n- Discord Gateway client built directly into SMStaff; no extra bot software or coding tools required.\n- Guild-scoped slash commands:\n  - `/login code:<code>`\n  - `/logout`\n  - `/whoami`\n  - `/mccommand command:<command>`\n  - `/stafflist`\n  - `/playerinfo player:<name>`\n- In-game `/smstaff discord code` command creates a one-time staff login code.\n- In-game `/smstaff discord status` displays bridge/link status.\n- In-game `/smstaff discord unlink` revokes the Discord link and active session.\n- One Discord account \u2194 one Minecraft staff identity binding.\n- PBKDF2-HMAC-SHA256 staff-code hashing with unique random salt.\n- Raw staff login codes are never persisted in SQLite, config files, console logs or SMAudit records.\n- Expiring one-time login codes.\n- Expiring Discord authentication sessions.\n- Persistent session/link storage in SMCore SQLite.\n- Login brute-force throttling and temporary lockouts.\n- Staff status re-validated against the Minecraft/LuckPerms hierarchy before each authenticated Discord action.\n- Remote commands execute as the linked **online Minecraft player**, preserving LuckPerms and SMStaff hierarchy protections.\n- Configurable command allowlist and hard denylist.\n- Per-command Minecraft permission checks before remote execution.\n- Dangerous command roots blocked by default (`stop`, `restart`, `reload`, `op`, `deop`, LuckPerms/admin/core commands, execute, etc.).\n- Discord interaction responses are ephemeral.\n- Discord mentions are disabled in bot responses.\n- Automatic guild slash-command registration on bridge startup.\n- Automatic Gateway reconnect and heartbeat handling.\n- Full SMCore \u2192 SMAudit events for login success/failure, logout, link revocation, command request/denial/execution, player information requests and Gateway state.\n- `/smstaff status` now displays Discord bridge and session state.\n\n## Security model\n- The bot token is never included in audit payloads.\n- Environment-variable bot token is preferred; config token is available as a host-panel fallback.\n- Discord login alone is not enough: the linked Minecraft account must still resolve as staff.\n- `/mccommand` requires an authenticated, non-expired Discord session.\n- `/mccommand` requires the linked Minecraft staff account to be online by default.\n- Commands run through the real player sender rather than console, so normal server permissions continue to apply.\n\n## Compatibility\n- Java 21\n- Purpur 1.21.11\n- SMCore 1.1.0\n- SMAudit 1.0.3+\n- Vault / LuckPerms\n- Existing SMStaff 1.0.1 database and config are preserved.\n- No destructive migration is required.\n\n**Author:** G660 & Vaporeon  \n**Website:** https://smsmp.net\n"
      },
      {
        "version": "1.0.1",
        "title": "SMStaff-1.0.1.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMStaff-1.0.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMStaff-1.0.1.jar\n\n**Purpose**\nBug-fix patch for SMStaff staff mode, freeze/SS movement handling, vanish tools, and compatibility with FAWE staff-tool conflicts.\n\n## Fixed\n- Freeze and /ss no longer rubber-band players by repeatedly teleporting them back every movement tick.\n- Frozen players who were caught jumping/in the air are allowed to fall naturally to the ground, preventing false \"flying\" kicks.\n- Frozen players still cannot walk, jump upward, teleport, use blocked commands, or take damage.\n- Staff-mode Compass is now fully consumed by SMStaff so FAWE cannot use it as a navigation/teleport compass.\n- Packed Ice Freeze Tool can no longer be placed as a block.\n- Freeze Tool now only toggles freeze when right-clicking a player.\n- Feather now reliably toggles SMStaff vanish on right-click.\n- Redstone Block now reliably exits staff mode on right-click without needing to place it.\n- All tagged SMStaff tools now cancel vanilla/other-plugin interactions before those plugins can act.\n- Added a block-place safety handler so tagged staff tools cannot be placed even if another plugin changes interaction order.\n\n## Unchanged\n- Stored staff inventory/recovery system.\n- Moderation cases and database schema.\n- LiteBans / StaffPlus parallel command ownership.\n- SMAudit integration.\n- Permissions and hierarchy.\n\n**Authors:** G660 & Vaporeon\n"
      },
      {
        "version": "1.0.0",
        "title": "SMStaff-1.0.0.jar",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMStaff-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMStaff-1.0.0.jar\n\n**Purpose**\n> First full in-game moderation/staff-management replacement layer for LiteBans + StaffPlus/Staff++. Built on SMCore with structured SMAudit events and persistent SQLite state.\n\n**Moderation**\n- Permanent + temporary bans\n- Permanent + temporary mutes\n- Warns and warning history\n- Kicks with persistent case IDs\n- Unban / unmute reversals recorded as new cases\n- Duration parser (`30m`, `2h`, `7d`, `1w2d`, etc.)\n- Login-time ban enforcement\n- Chat-time mute enforcement\n- `/history`, `/warnings`, `/notes`, `/smstaff case <id>`\n- LuckPerms/Vault primary-group hierarchy protection\n\n**Staff tools**\n- `/staff` control GUI\n- Protected `/staffmode` with inventory snapshot + crash/reload recovery\n- Staff-mode inspect/freeze/vanish tools\n- `/staffchat`\n- `/vanish`\n- `/freeze`, `/unfreeze`, `/ss`\n- Freeze movement/teleport/command restrictions\n- Frozen-player disconnect security audit\n- `/invsee`, `/endersee`, `/inspect`, `/spectate`\n- Spectate return-state restoration\n\n**Reports**\n- Public `/report <player> <reason>`\n- Configurable report cooldown\n- Staff `/reports` GUI\n- List/detail/resolve workflow\n- Persistent report IDs and resolution history\n\n**Safety / migration**\n- Detects LiteBans + StaffPlus/Staff++\n- `command-ownership.mode: AUTO` leaves legacy command ownership alone while legacy staff plugins are enabled\n- After legacy plugins are removed, normal `/ban`, `/kick`, `/freeze`, `/staff`, etc. are forcibly routed to SMStaff even if Essentials also provides commands\n- Full database storage inside the SMCore SQLite database\n- No destructive legacy migration required on the development server\n\n**Audit**\n- Punishment issuer/target/staff metadata\n- Staff actions, hierarchy denials, reports, freeze disconnects, GUI actions and failures\n- All structured through SMCore -> SMAudit\n\n**Deferred intentionally**\n- Discord `/login` staff authentication + remote authorized command bridge is reserved for SMStaff 1.1.x after the in-game moderation cutover passes. It will use hashed staff codes, expiring sessions, revocation, allowlists/denylists and SMAudit logging.\n\n**Author**\n- G660 & Vaporeon\n"
      }
    ]
  },
  "SMStreaks": {
    "name": "SMStreaks",
    "displayName": "SMStreaks\u2122",
    "versions": [
      {
        "version": "1.2.0",
        "title": "SMStreaks 1.2.0 \u2014 Production Configuration Rollout",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMStreaks-1.2.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMStreaks 1.2.0 \u2014 Production Configuration Rollout\n\n## Scope\n\nThis is a **configuration-only production rollout** for SMStreaks 1.2.0.\n\nNo Java code or plugin binary changed in this pass. Continue using the already\nvalidated `SMStreaks-1.2.0.jar`.\n\n## Production policy\n\n- Daily streak qualification requires 60 minutes of active play.\n- Reset timezone is `America/Chicago`.\n- The `afk` world is excluded from active-time qualification.\n- Five minutes of inactivity stops active-time accumulation.\n- Spectator time does not count.\n- Activity progress is flushed on the configured short interval.\n- Streak Savers remain enabled and protect at most one missed day per gap.\n- Pending qualified rewards remain claimable.\n- Maximum pending daily rewards delivered in one click remains bounded.\n\n## Reward tracks\n\nProduction progression remains:\n\n- Member \u2014 20 Dashes/day\n- Sentinel \u2014 30 Dashes/day\n- Crusader \u2014 40 Dashes/day\n- Champion \u2014 55 Dashes/day\n- Ascendant \u2014 75 Dashes/day\n- Immortal \u2014 100 Dashes/day\n\nExisting consecutive-streak and lifetime milestones are retained.\n\n## Reliability\n\nThis configuration does not change SMStreaks 1.2.0 transaction safeguards.\n\nThe existing 1.2.0 code remains responsible for:\n\n- at-most-once reward claim protection;\n- atomic daily qualification/finalization;\n- atomic milestone finalization;\n- preservation of pending active seconds until persistence succeeds;\n- REVIEW_REQUIRED handling for uncertain reward outcomes;\n- SMCore/SMAudit diagnostic incident reporting.\n\n## Permissions\n\nReward-track selection continues to use the existing LuckPerms/track model.\n\nCurrent staff-role inheritance may grant paid-rank Streak tracks. That behavior\nis intentionally **not changed in this rollout** and is scheduled for the final\nsuite-wide permissions/rank-perks audit.\n\n## Files changed\n\n- `plugins/SMStreaks/config.yml`\n- `plugins/SMStreaks/messages.yml`\n- `plugins/SMStreaks/rewards.yml`\n\n## Files not changed\n\n- `SMStreaks-1.2.0.jar`\n- SMStreaks database/player progression data\n- SMCore\n- SMAudit\n"
      },
      {
        "version": "1.0.0",
        "title": "SMStreaks\u2122 1.0.0 \u2014 RECONSTRUCTED CHANGELOG",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMStreaks-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMStreaks\u2122 1.0.0 \u2014 RECONSTRUCTED CHANGELOG\n\n**RECONSTRUCTED:** No dedicated historical changelog file for this exact build was recovered.\n\n- Initial recovered SMStreaks release introducing daily streak tracking, claim/status commands, configurable rank rewards, persistence, and SM Suite audit integration.\n"
      }
    ]
  },
  "SMTutorial": {
    "name": "SMTutorial",
    "displayName": "SMTutorial\u2122",
    "versions": [
      {
        "version": "1.2.3",
        "title": "SMTutorial-1.2.3.jar \u2014 Listener Priority Fix",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMTutorial-1.2.3.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Purpur 1.21.11 / Java 21",
        "content": "# SMTutorial-1.2.3.jar\n\n- Force click listener to take priority over WH.\n"
      },
      {
        "version": "1.2.2",
        "title": "SMTutorial-1.2.2.jar \u2014 Purpur 1.21.11 GUI Fix",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMTutorial-1.2.2.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Purpur 1.21.11 / Java 21",
        "content": "# SMTutorial-1.2.2.jar\n\n- Fixed the live `NoSuchMethodError` when SMTutorial builds GUI items on Purpur 1.21.11.\n- Updated `ItemStack#setItemMeta(ItemMeta)` handling for the 1.21.11 API.\n- Improved Tutorial Citizens NPC interaction reliability inside protected Spawn regions.\n"
      },
      {
        "version": "1.2.1",
        "title": "SMTutorial\u2122 1.2.1 \u2014 Purpur 1.21.11 Binary Compatibility Hotfix",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMTutorial-1.2.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMTutorial\u2122 1.2.1 \u2014 Purpur 1.21.11 Binary Compatibility Hotfix\n\n## Fixed\n- Corrected the Bukkit `FileConfiguration` invocation shape used by SMTutorial 1.2.0.\n- Fixes startup failure:\n  `IncompatibleClassChangeError: Found class org.bukkit.configuration.file.FileConfiguration, but interface was expected`.\n\n## Preserved\n- All SMTutorial 1.2.0 interaction-cleanup behavior.\n- Status-aware Citizens tutorial menu.\n- Start / Resume / Replay flow.\n- NPC click debounce and `smtutorial.use` check.\n- `/smtutorial bindnpc` click-to-bind workflow.\n- 12-step tutorial order.\n- Existing configured locations and production configuration.\n- Tutorial progress database schema and stored progress.\n- Reward reliability semantics.\n- SMCore diagnostics and SMAudit integration.\n\n## Compatibility\n- Target: Purpur 1.21.11.\n- Java classfile major 65 / Java 21.\n- SMCore 1.2.1.\n- No database migration.\n- No production config migration.\n"
      },
      {
        "version": "1.2.0",
        "title": "SMTutorial 1.2.0 \u2014 NPC / Interaction Cleanup",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMTutorial-1.2.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMTutorial 1.2.0 \u2014 NPC / Interaction Cleanup\n\n## Scope\n\nThis is a code release for the interaction-cleanup phase.\n\nKeep SMCore 1.2.1 and SMAudit 1.1.1. Replace SMTutorial 1.1.0 with\n`SMTutorial-1.2.0.jar`.\n\n## Citizens NPC flow\n\nThe Tutorial NPC no longer immediately starts, resumes, or restarts a tutorial\nthe instant it is right-clicked.\n\nRight-clicking the configured Citizens NPC now opens a status-aware Tutorial\nGuide menu:\n\n- never started -> **Start Tutorial**\n- in progress -> **Resume Tutorial**\n- completed/skipped -> **Replay Tutorial**\n\nThis prevents a completed player from accidentally resetting progress simply\nby interacting with the NPC.\n\nA 750 ms configurable NPC interaction debounce prevents rapid/double interaction\nevents from repeatedly reopening the menu.\n\nNPC interaction now also enforces `smtutorial.use` before opening the tutorial\nflow.\n\n## Easier NPC binding\n\n`/smtutorial bindnpc` may now be run with no name by an in-game admin.\n\nThe command enters one-click binding mode. Right-click the intended Citizens NPC\nand SMTutorial saves its readable display name as the configured Tutorial NPC.\n\nThe existing `/smtutorial bindnpc <citizens-name>` syntax remains supported.\n\n## Tutorial GUI cleanup\n\n- GUI navigation closes the current inventory and performs the requested\n  navigation one tick later.\n- This avoids close/reopen behavior inside the same InventoryClickEvent.\n- Previous Step is visibly disabled on step 1.\n- Finish is distinguished from ordinary Next navigation.\n- NPC menu clicks and closes receive their own structured audit events.\n\n## Resume semantics\n\n`/tutorial resume` no longer silently restarts a completed or skipped tutorial.\n\nCompleted/skipped players are told to use `/tutorial restart` explicitly.\nA never-started player may still use `/tutorial resume` to begin normally.\n\n## Previously inert settings now honored\n\n- `settings.reopen-gui-after-step`\n- `settings.teleport-before-message`\n\nProduction keeps both enabled.\n\n## Compatibility\n\n- Existing tutorial database schema is unchanged.\n- Existing 12-step tutorial order is unchanged.\n- Existing server-specific tutorial LOCATION values remain compatible.\n- No public/protected method from SMTutorial 1.1.0 was removed.\n- Java 21 bytecode.\n"
      },
      {
        "version": "1.1.0",
        "title": "SMTutorial 1.1.0 Changelog",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMTutorial-1.1.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "# SMTutorial 1.1.0 Changelog\n\n## Diagnostics & reliability\n- Added operation-level SMCore diagnostics around startup, commands, tutorial progress database reads/writes, schema setup, step configuration, tutorial teleports/fallbacks, PlaceholderAPI formatting, configuration saves, and completion reward delivery.\n- Startup database/schema failure now emits a diagnostic before disabling the plugin rather than relying on a raw stack trace.\n- Progress load/save failures carry player UUID, step and recovery-state context and abort the caller instead of silently continuing.\n- Missing tutorial step configuration and teleport/fallback failures now generate actionable incidents.\n- Completion reward command rejection/exception is recorded as a manual-review condition. SMTutorial does not blindly retry an uncertain reward outcome, avoiding accidental duplicate rewards.\n- PlaceholderAPI formatting failures fall back to raw tutorial text while recording an incident when PlaceholderAPI is installed.\n- Location/NPC configuration save failures clearly report that the in-memory value may not survive restart.\n\n## Administration\n- Added `/smtutorial diagnosetest` for a safe synthetic diagnostic with no tutorial progress mutation.\n- Added `diagnosetest` to help/tab completion.\n\n## Startup cleanup\n- `messages.yml` is copied only when missing, removing the harmless existing-resource warning.\n\n## Compatibility\n- Tutorial order, steps, rewards, messages and gameplay YAML remain unchanged from 1.0.0.\n- Existing public/protected Java API signatures are preserved.\n- Built for Java 21 and intended for SMCore 1.2.1 + SMAudit 1.1.1.\n"
      },
      {
        "version": "1.0.0",
        "title": "SMTutorial\u2122 1.0.0 \u2014 RECONSTRUCTED CHANGELOG",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMTutorial-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Paper 1.20.4+",
        "content": "                # SMTutorial\u2122 1.0.0 \u2014 RECONSTRUCTED CHANGELOG\n\n                **RECONSTRUCTED:** No dedicated historical changelog file for this exact build was recovered.\n                This changelog is derived from the preserved archive summary/binary-diff evidence.\n\n                # RECONSTRUCTED \u2014 SMTutorial 1.0.0 Archive Summary\nThis supplemental summary is not an original historical document.\nVersion role: initial tutorial module.\n"
      }
    ]
  },
  "SMChat": {
    "name": "SMChat",
    "displayName": "SMChat\u2122",
    "versions": [
      {
        "version": "1.0.2",
        "title": "SMChat-1.0.2.jar \u2014 Purpur 1.21.11 Fix",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMChat-1.0.2.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Purpur 1.21.11 / Java 21",
        "content": "# SMChat-1.0.2.jar\n\n- Fixed the `PluginManager.registerEvents` runtime linkage failure.\n- Restored successful startup on Purpur 1.21.11.\n- Rank-based chat cooldowns now function correctly in production.\n- Verified Member, Sentinel, Crusader, Champion cooldown behavior.\n- Completely removed dependency on MessageCooldownPRO.\n\n### Current Production Cooldown Tiers:\n- **Member:** 5 seconds\n- **Sentinel:** 3 seconds\n- **Crusader:** 2 seconds\n- **Champion:** 1 second\n- **Ascendant:** no cooldown (bypass)\n- **Immortal:** no cooldown (bypass)\n"
      },
      {
        "version": "1.0.1",
        "title": "SMChat-1.0.1.jar \u2014 Modern Chat Event Migration Pass",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMChat-1.0.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Purpur 1.21.11 / Java 21",
        "content": "# SMChat-1.0.1.jar\n\n- Attempted migration from the deprecated Bukkit chat event to Paper/Purpur's modern chat event.\n- Testing exposed a runtime API linkage problem.\n- Build correctly failed closed rather than interfering with live chat.\n- Superseded by 1.0.2.\n"
      },
      {
        "version": "1.0.0",
        "title": "SMChat-1.0.0.jar \u2014 First-Party Chat Cooldown System",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMChat-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Purpur 1.21.11 / Java 21",
        "content": "# SMChat-1.0.0.jar\n\n- Introduced first-party rank-based chat cooldown handling.\n- Replaced the previous MessageCooldownPRO system.\n- Added configurable cooldown tiers.\n- Added permission-driven rank handling.\n- Added `/smchat reload`.\n- Preserved EssentialsXChat formatting.\n- Kept ZCommandCooldown separate for command cooldown handling.\n"
      }
    ]
  },
  "SMPoi": {
    "name": "SMPoi",
    "displayName": "SMPoi\u2122",
    "versions": [
      {
        "version": "1.0.2",
        "title": "SMPOI 1.0.2 \u2014 Container Loot Restocking Update",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMPOI-1.0.2.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Purpur 1.21.11 / Java 21",
        "content": "# SMPOI 1.0.2\n\n- Expanded managed loot container support from normal chests to Bukkit Container implementations.\n- Managed POI loot can now use:\n  - Chests\n  - Trapped Chests\n  - Barrels\n  - Shulker Boxes\n- Preserved automatic/manual loot restocking.\n- Verified:\n  - POI registration\n  - entry notification\n  - command restrictions\n  - red border system\n  - chest registration\n  - fully empty chest restocking\n  - partially emptied chest restocking\n- WorldGuard chest access configured so players can access POI loot containers without allowing terrain modification.\n"
      },
      {
        "version": "1.0.1",
        "title": "SMPOI 1.0.1 \u2014 Command Interception Priority",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMPOI-1.0.1.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Purpur 1.21.11 / Java 21",
        "content": "# SMPOI 1.0.1\n\n- Changed POI command interception priority so restricted commands are cancelled before downstream plugins process them.\n- Fixed interoperability with `/ec` and SMEnderChest.\n"
      },
      {
        "version": "1.0.0",
        "title": "SMPOI 1.0.0 \u2014 Initial Release",
        "date": "Release Build",
        "subCategory": null,
        "jarFileName": "SMPOI-1.0.0.jar",
        "fileSize": "N/A",
        "channel": "Release",
        "target": "Purpur 1.21.11 / Java 21",
        "content": "# SMPOI 1.0.0\n\n- Point of interest registration, red border system, and entry notifications.\n- SMCore audit and diagnostics integration.\n"
      }
    ]
  }
};
