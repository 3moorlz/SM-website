const DEFAULT_STAFF_ACCOUNTS = [
  {
    "code": "G660$9!2kL",
    "name": "G660",
    "minecraftUsername": "G660",
    "rank": "Owner",
    "isSuperAdmin": true,
    "note": "Server Owner"
  },
  {
    "code": "KALZ!9$8vM",
    "name": "Kalz",
    "minecraftUsername": "UknUnc",
    "discordId": "993814255105228881",
    "rank": "Developer",
    "isSuperAdmin": true,
    "note": "Developer"
  },
  {
    "code": "VAPO$8!2wK",
    "name": "Vaporeon",
    "minecraftUsername": "mysticvprn",
    "discordId": "1394669727787384852",
    "rank": "Developer",
    "isSuperAdmin": false,
    "note": "Lead Plugin Dev"
  },
  {
    "code": "FRUIT$3!9P",
    "name": "Fruitifly",
    "minecraftUsername": "Fruitifly",
    "rank": "Manager",
    "isSuperAdmin": false,
    "note": "Manager"
  },
  {
    "code": "YEH!9$2mQ4",
    "name": "Yehosy",
    "minecraftUsername": "Yehosy",
    "rank": "Manager",
    "isSuperAdmin": false,
    "note": "Manager"
  },
  {
    "code": "TUFF$7!8vL",
    "name": "Lifes_Tuff",
    "minecraftUsername": "Lifes_Tuff",
    "rank": "Sr. Admin",
    "isSuperAdmin": false,
    "note": "Senior Administrator"
  },
  {
    "code": "FVS!8$2kP9",
    "name": "FvsionNova",
    "minecraftUsername": "FvsionNova",
    "rank": "Admin",
    "isSuperAdmin": false,
    "note": "Administrator"
  },
  {
    "code": "NON$9!4wL2",
    "name": "JustTheNon",
    "minecraftUsername": "JustTheNon",
    "rank": "Admin",
    "isSuperAdmin": false,
    "note": "Administrator"
  },
  {
    "code": "NIX!7$8vM3",
    "name": "Nixeron_",
    "minecraftUsername": "Nixeron_",
    "rank": "Admin",
    "isSuperAdmin": false,
    "note": "Administrator"
  },
  {
    "code": "POT!8$3wQ9",
    "name": "BilliePotatoe",
    "minecraftUsername": "BilliePotatoe",
    "rank": "Mod",
    "isSuperAdmin": false,
    "note": "Moderator"
  },
  {
    "code": "ABLE$7!9vK",
    "name": "AbleSquirrel",
    "minecraftUsername": "AbleSquirrel",
    "rank": "Mod",
    "isSuperAdmin": false,
    "note": "Moderator"
  },
  {
    "code": "FRIT!9$2wL",
    "name": "Fritsyy",
    "minecraftUsername": "Fritsyy",
    "rank": "Mod",
    "isSuperAdmin": false,
    "note": "Moderator"
  },
  {
    "code": "CENS$8!7vP",
    "name": "Censorr_",
    "minecraftUsername": "Censorr_",
    "rank": "Jr. Mod",
    "isSuperAdmin": false,
    "note": "Junior Moderator"
  },
  {
    "code": "NYX!9$3wM8",
    "name": "RaccoonNyx",
    "minecraftUsername": "RaccoonNyx",
    "rank": "Jr. Mod",
    "isSuperAdmin": false,
    "note": "Junior Moderator"
  }
];

const DEFAULT_STAFF_DOCUMENTS = [
  {
    "id": 539,
    "section": "rules",
    "rank_name": null,
    "title": "General Staff Handbook",
    "content": "### 1. CORE STAFF STANDARD\n\nStaff are expected to protect the server, help players, enforce rules consistently, and use\ntheir access only for legitimate staff purposes.\n\nBeing staff does not make a player exempt from server rules.\n\nEvery staff member is expected to:\n- act calmly and professionally\n- avoid escalating arguments unnecessarily\n- use the least amount of authority needed to resolve a situation\n- make decisions based on evidence and server policy\n- document important actions clearly\n- respect rank boundaries and escalation procedures\n- protect private staff and player information\n- avoid using staff tools for personal benefit\n- accept review of their actions by higher staff\n\nStaff permissions exist to support server operations and moderation.\nThey are not personal perks.\n\n### 2. PROFESSIONAL CONDUCT\n\nStaff should remain professional in:\n- public Minecraft chat\n- Discord\n- tickets\n- staff chat\n- voice channels\n- private messages related to staff work\n- appeals\n- reports\n- interactions with other staff\n\nStaff should not:\n- insult or mock players while acting as staff\n- threaten punishments they cannot or should not issue\n- argue publicly about internal staff decisions\n- flex permissions or rank for status\n- provoke players into breaking rules\n- intentionally embarrass a player during moderation\n- use staff channels for constant unrelated drama\n- create hostile staff-vs-player situations\n- retaliate against criticism, reports, or appeals\n\nA player being rude does not justify unprofessional staff behavior.\n\n### 3. USE OF STAFF PERMISSIONS\n\nOnly use a staff command or feature when there is a legitimate staff reason.\n\nExamples of legitimate reasons:\n- investigating a report\n- observing suspected cheating\n- reviewing player history\n- inspecting inventory during an authorized case\n- performing an approved rollback\n- recovering lost/corrupted player data\n- administering an SM Suite system\n- performing an approved server operation\n\nExamples of improper use:\n- checking inventories out of curiosity\n- vanishing to spy on unrelated private activity\n- teleporting for personal convenience when the command is meant for staff work\n- giving yourself or friends items/keys/currency\n- using WorldEdit or admin tools for personal survival projects without authorization\n- changing permissions to bypass your rank\n- using rollback or recovery tools to benefit yourself or friends\n- running high-impact commands simply to test them on production without approval\n\nIf you are unsure whether a command is appropriate, ask a higher rank first.\n\n### 4. LEAST-PRIVILEGE RULE\n\nUse the lowest-impact tool that can safely solve the problem.\n\nExamples:\n- do not ban when a warning or mute is the correct punishment\n- do not rollback an entire area when a smaller targeted rollback is enough\n- do not enter maintenance mode for a minor player-specific issue\n- do not change permissions when a normal staff workflow already solves the issue\n- do not use hierarchy bypass unless the staff-management case actually requires it\n\nHaving access to a stronger tool does not mean it should be the first option.\n\n### 5. PUNISHMENT STANDARDS\n\nPunishments should:\n- match the current server punishment policy\n- use the correct SMStaff punishment command\n- include a clear and useful reason\n- be based on confirmed behavior or sufficient evidence\n- consider relevant prior offenses where the policy requires escalation\n- avoid unnecessary severity\n\nDo not create punishments just to \"teach someone a lesson.\"\n\nDo not punish a player because:\n- you personally dislike them\n- they criticized you\n- they beat you in-game\n- they argued with your friend\n- another staff member told you to punish them without enough context\n- you assume an anti-cheat alert automatically proves cheating\n\nIf you do not have enough evidence, investigate or escalate.\n\n### 6. CASE QUALITY AND REASONS\n\nSMStaff records moderation cases and history.\n\nWrite reasons so another staff member can understand what happened later.\n\nGood reason:\n  \"Repeated chat spam after warning\"\n\nBad reason:\n  \"annoying\"\n\nGood reason:\n  \"Combat cheat confirmed after observation + Grim alerts\"\n\nBad reason:\n  \"hacks\"\n\nImportant cases should contain enough context that a later appeal reviewer or manager can\nunderstand why the action was taken.\n\n### 7. EVIDENCE\n\nEvidence should be relevant, understandable, and connected to the rule violation.\n\nUseful evidence may include:\n- direct staff observation\n- server logs\n- SMAudit records\n- SMStaff history/case data\n- CoreProtect data\n- GrimAC alerts plus staff observation\n- screenshots or recordings\n- player reports with supporting context\n- transaction/recovery records\n- inventory/Ender Chest findings\n- system diagnostics\n\nDo not fabricate, alter, or selectively misrepresent evidence.\n\nDo not delete evidence because it makes a staff action look incorrect.\n\n### 8. ANTI-CHEAT ALERTS\n\nAnti-cheat alerts are investigative signals.\n\nThey should not automatically be treated as undeniable proof.\n\nWhen possible:\n1. review the alerts\n2. observe the player\n3. check patterns/context\n4. rule out obvious false-positive situations\n5. escalate if the case exceeds your rank\n6. punish only when the evidence meets the server's standard\n\nStaff should be especially careful with unusual movement, latency, combat mechanics, or new\ngame-version behavior that could cause false positives.\n\n### 9. REPORTS\n\nReports should be handled efficiently and without unnecessary delay.\n\nWhen handling a report:\n1. read the report carefully\n2. check the target's history if relevant\n3. observe or inspect the situation\n4. take action only if justified\n5. document the outcome\n6. escalate if the required action exceeds your rank\n\nDo not close reports just to clear the queue.\n\nDo not ignore reports involving friends or staff members.\nEscalate conflicts of interest.\n\n### 10. TICKETS\n\nTreat tickets as support cases, not arguments.\n\nStaff should:\n- read the full issue before responding\n- avoid making the player repeat information already provided\n- ask only for information actually needed\n- route the ticket to the correct department/rank\n- keep internal staff discussion out of the player's view\n- document important actions or decisions\n- avoid promising outcomes that require higher approval\n\nIf a ticket becomes abusive, staff may enforce Discord/server rules while still keeping the\nsupport process professional.\n\n### 11. APPEALS\n\nAppeals should be reviewed on the facts of the case.\n\nDo not deny an appeal simply because:\n- you issued the original punishment\n- the player criticized the punishment\n- the player has a poor reputation\n- another staff member says \"just deny it\" without review\n\nWhen reviewing an appeal:\n- inspect the original case\n- review evidence\n- verify the punishment matched policy\n- consider whether new information changes the case\n- escalate reversals that exceed your authority\n\nIf you issued the punishment and the appeal is disputed or sensitive, a different qualified\nstaff member should review it when practical.\n\n### 12. CONFLICTS OF INTEREST\n\nDo not personally control a case when your relationship to the player could affect your judgment.\n\nExamples:\n- close friend\n- enemy/rival\n- teammate\n- staff dispute you are personally involved in\n- player who recently argued with you\n- issue involving your own items, money, base, or account\n\nIn these cases:\n- preserve evidence\n- explain the conflict in staff chat\n- hand the case to another qualified staff member\n\n### 13. STAFF-ON-STAFF CASES\n\nStaff misconduct should be escalated through the staff hierarchy.\n\nDo not:\n- cover for another staff member\n- delete or hide evidence\n- start a public argument with the staff member\n- use unrelated admin tools to retaliate\n- leak the internal investigation\n\nPreserve:\n- relevant logs\n- case records\n- screenshots/recordings\n- staff-chat context\n- audit records\n\nThen escalate to the appropriate management rank.\n\n### 14. STAFF CHAT\n\nStaff chat is for staff coordination.\n\nAppropriate uses:\n- asking for assistance\n- reporting active incidents\n- escalating a case\n- sharing relevant evidence/context\n- coordinating server operations\n- announcing important staff-side information\n\nAvoid:\n- constant unrelated spam\n- harassment\n- leaking player private information without a staff reason\n- arguing endlessly about personal issues\n- insulting players who cannot see or respond\n- posting credentials, tokens, webhook URLs, or other secrets\n\nImportant operational decisions should be communicated clearly enough that other staff understand\nwhat is happening.\n\n### 15. CONFIDENTIALITY AND PRIVACY\n\nStaff may have access to information normal players cannot see.\n\nDo not publicly leak:\n- staff-only discussions\n- private reports/tickets\n- player personal information\n- IP addresses\n- internal audit data\n- private staff role IDs\n- server credentials\n- bot tokens\n- webhook URLs\n- API keys\n- database credentials\n- internal security controls\n- exploit-sensitive recovery information\n\nOnly share sensitive information with staff who actually need it for the task.\n\n### 16. STAFF MODE\n\nStaff mode is for moderation/investigation.\n\nUse it when the workflow benefits from the protected staff environment.\n\nStaff mode should not be used:\n- as a survival advantage\n- to move personal items\n- to gain combat advantages\n- to scout bases for personal benefit\n- to interfere with players without a staff reason\n\nExit staff mode cleanly so normal inventory/state restoration can complete correctly.\n\nIf staff-mode inventory restoration appears wrong:\n- stop\n- do not keep toggling repeatedly\n- preserve the current state\n- report/escalate the issue\n\n### 17. VANISH AND SPECTATE\n\nVanish and spectate are investigative tools.\n\nAppropriate:\n- observing suspected cheating\n- monitoring an active report\n- verifying rule violations\n- investigating behavior without alerting the target\n\nNot appropriate:\n- spying on players for entertainment\n- gathering survival information for yourself/friends\n- interfering in PvP while hidden\n- intentionally frightening or trolling players\n- leaking private base information obtained through staff access\n\n### 18. INVENTORY AND ENDER CHEST INSPECTION\n\nInventory access is sensitive.\n\nUse /invsee or /endersee only when relevant to:\n- a moderation investigation\n- item duplication/exploit investigation\n- approved recovery work\n- another legitimate staff task\n\nDo not:\n- remove items without authority\n- take items for yourself\n- rearrange inventories unnecessarily\n- inspect players randomly\n- use inventory information for personal gameplay advantage\n\nOffline SMStaff edits are staged REMOVE_ONLY where supported.\nDo not represent the system as unrestricted offline inventory editing.\n\n### 19. COREPROTECT / ROLLBACKS\n\nBefore a rollback:\n1. determine what happened\n2. identify the correct player/time/area scope\n3. preview or inspect where supported\n4. use the smallest safe rollback\n5. verify the result\n\nDo not run broad rollbacks because they are faster.\n\nA bad rollback can damage legitimate player work.\n\nIf the affected scope is unclear, escalate rather than guessing.\n\n### 20. INVENTORY ROLLBACK / RECOVERY\n\nRecovery systems should restore legitimate player state, not create value.\n\nBefore restoring:\n- confirm the loss actually occurred\n- determine the correct snapshot/state\n- ensure the same items/value were not already recovered another way\n- avoid duplicate compensation\n\nAfter restoring:\n- verify the result\n- document the recovery if significant\n\n### 21. ECONOMY, ITEMS, CRATES, DASHES, AND STORE VALUE\n\nAnything that creates, removes, restores, or transfers value requires extra care.\n\nThis includes:\n- Vault money\n- Dashes / PlayerPoints\n- crate keys\n- spawners\n- rank items\n- auction/order transactions\n- store deliveries\n- recovery compensation\n\nNever:\n- give value to yourself without an approved reason\n- compensate a friend outside normal procedure\n- duplicate compensation because multiple staff handled the same issue\n- \"test\" production grants on a real player without a rollback plan\n\nHigh-value mistakes should be reported immediately rather than hidden.\n\n### 22. STORE / SMFLUXBRIDGE INCIDENTS\n\nStore delivery problems can involve real purchases.\n\nTreat them carefully.\n\nFor uncertain SMFluxBridge deliveries:\n- review the journal/state\n- confirm whether the command actually executed\n- confirm the player's current received items/rank/value\n- compare with the store/order information available to authorized staff\n- only then choose a recovery resolution\n\nDo not mark a delivery as success, retry, or failed based on a guess.\n\nDo not blindly retry an uncertain command; duplicate delivery may result.\n\n### 23. SMPVP / COMBAT ADMINISTRATION\n\nSMPVP administrative tools should be used for diagnosis and approved configuration/operation.\n\nDo not use bypass simply to avoid normal combat restrictions for personal gameplay.\n\nWhen changing PvP mode/configuration:\n- understand the production impact\n- use approved management/technical procedure\n- verify behavior after the change\n- review SMAudit/diagnostics for failures\n\n### 24. WORLD EDIT / WORLDGUARD\n\nWorldEdit, FAWE, and WorldGuard can make large changes quickly.\n\nBefore large changes:\n- confirm the correct world/region\n- verify selection boundaries\n- take an appropriate backup when needed\n- avoid editing near unrelated player builds unless required\n- coordinate with builders/leadership\n\nDo not use broad edit tools for personal gameplay advantages.\n\n### 25. SERVER OPERATIONS\n\nMaintenance, backups, restarts, module controls, and migrations can affect the entire server.\n\nBefore a high-impact operation:\n- understand why it is needed\n- verify the command and target\n- communicate with relevant staff\n- back up when appropriate\n- avoid unnecessary production testing\n\nAfter:\n- verify system status\n- verify affected plugins/features\n- check for errors/incidents\n- confirm maintenance is off when work is complete\n\nDo not assume \"command accepted\" means \"operation completed successfully.\"\n\n### 26. UNCERTAIN OR PARTIALLY COMPLETED OPERATIONS\n\nIf a punishment, transaction, inventory edit, migration, backup, or other operation may have\npartially completed:\n\nDO NOT blindly repeat it.\n\nInstead:\n1. preserve the current state\n2. check history/audit/diagnostics\n3. determine what actually committed\n4. use the proper recovery workflow\n5. escalate if uncertain\n\nBlind retries can create:\n- duplicate punishments\n- duplicate items\n- duplicate payments\n- corrupted state\n- repeated migrations\n- additional data loss\n\n### 27. ESCALATION\n\nEscalation is expected when:\n- the required command is above your rank\n- the evidence is unclear\n- the case involves a staff member\n- the case involves a major exploit\n- a rollback/recovery could affect many players\n- the issue involves store/payment value\n- the issue involves server-wide configuration\n- an operation is in an uncertain state\n- you have a conflict of interest\n- you are not confident the action is safe\n\nEscalating is not failure.\nGuessing with high-impact permissions is worse.\n\n### 28. CHAIN OF COMMAND\n\nUse the staff hierarchy for escalation.\n\nNormal moderation progression:\nTrainee\n-> Helper\n-> Jr Mod\n-> Mod\n-> Sr Mod\n-> Trial Admin\n-> Admin\n-> Sr Admin\n-> Trial Manager\n-> Manager\n\nSpecialized/leadership branches include:\n- Promotional Manager\n- Ticket Manager\n- Staff Manager\n- Informatics\n- Developers\n- Server Lead\n- Owner\n\nBuilder is a specialized staff role and is not part of the moderation punishment ladder.\n\nUse the branch that matches the issue:\n- moderation/staff issue -> moderation leadership / Staff Manager\n- technical SM Suite issue -> Informatics / Developers\n- major server leadership issue -> Server Lead / Owner\n- support/ticket issue -> Ticket Manager / appropriate department\n\n### 29. DO NOT BYPASS YOUR RANK\n\nDo not try to gain access by:\n- asking another staff member to run an action you are not authorized to request\n- using unrelated plugin commands as a workaround\n- changing your own group or permissions\n- requesting OP to bypass LuckPerms\n- abusing a wildcard or technical tool to recreate a restricted command\n\nRank restrictions are intentional.\n\nIf you need higher authority for a legitimate case, escalate.\n\n### 30. ALTERNATE ACCOUNTS\n\nDo not use an alternate account to:\n- evade staff accountability\n- hide staff actions\n- bypass rank restrictions\n- test punishments on unsuspecting players\n- gain unfair survival/PvP advantages through staff knowledge\n\nApproved test accounts may be used for legitimate testing when authorized.\n\n### 31. STAFF ACTIVITY AND AVAILABILITY\n\nStaff should remain reasonably active for the expectations of their rank.\n\nIf you will be unavailable for an extended period:\n- notify the appropriate leadership when required\n- do not pretend to be actively handling cases you cannot follow up on\n- hand off ongoing important cases before leaving\n\nExact inactivity thresholds and leave procedures may be maintained separately by staff leadership.\n\n### 32. STAFF ACCOUNT SECURITY\n\nProtect accounts with staff access.\n\nStaff should:\n- use strong unique passwords where applicable\n- enable available account security features\n- protect Discord accounts\n- avoid sharing login/session codes\n- never share staff account access\n- report suspected compromise immediately\n\nIf a staff account may be compromised:\n- notify leadership immediately\n- stop using sensitive staff commands\n- secure the affected account\n- review recent staff actions/audit history\n\n### 33. STAFF DISCORD BRIDGE / REMOTE COMMANDS\n\nRemote commands are still staff commands.\n\nThe same rules apply whether a command is issued:\n- in Minecraft\n- through an approved Discord staff bridge\n- through another authorized staff interface\n\nDo not assume Discord execution makes an action less accountable.\n\nThe linked Minecraft account's permissions and hierarchy remain authoritative.\n\n### 34. PUBLIC COMMUNICATION DURING INCIDENTS\n\nDuring outages, exploits, maintenance, or major incidents:\n- avoid speculation\n- do not blame a player/staff member before facts are confirmed\n- do not leak security-sensitive details\n- give players only information that is confirmed and appropriate\n- allow authorized leadership to make major announcements when necessary\n\nInternal technical detail does not need to be public.\n\n### 35. MISTAKES\n\nIf you make a staff mistake:\n- report it quickly\n- explain exactly what happened\n- do not hide or delete evidence\n- do not make additional risky changes trying to cover it up\n- help with recovery\n\nPromptly reported mistakes are easier to fix than hidden mistakes.\n\n### 36. ABUSE OF STAFF ACCESS\n\nStaff access abuse includes, but is not limited to:\n- personal item/currency grants\n- leaking private information\n- unfair PvP/survival advantages\n- unauthorized permission changes\n- false punishments\n- retaliatory punishments\n- unauthorized rollbacks\n- destructive WorldEdit use\n- unauthorized store/recovery actions\n- hiding evidence\n- abusing vanish/inventory inspection\n- bypassing rank restrictions\n\nAbuse may result in:\n- permission removal\n- demotion\n- suspension\n- removal from staff\n- player punishment where applicable\n\nThe exact consequence is determined by leadership based on severity and evidence.\n\n### 37. ACCOUNTABILITY\n\nStaff actions may be logged through:\n- SMStaff case records\n- SMAudit\n- plugin audit systems\n- server logs\n- Discord staff systems\n- CoreProtect\n- transaction/recovery records\n\nStaff should assume high-impact actions can be reviewed later.\n\nThis is intentional and protects both players and staff.\n\n### 38. FINAL STAFF PRINCIPLE\n\nUse your rank to solve problems, not create them.\n\nWhen deciding what to do:\n1. confirm the facts\n2. check your authority\n3. choose the lowest-impact correct action\n4. document it clearly\n5. verify the result\n6. escalate when needed\n\nAccuracy, consistency, and accountability matter more than acting quickly just to look active.",
    "sort_order": 1
  },
  {
    "id": 540,
    "section": "handbook",
    "rank_name": "Trainee",
    "title": "Trainee Staff Handbook",
    "content": "Trainee is the entry point into the moderation team. The rank exists to learn the server's moderation workflow while safely assisting with reports, gathering context, and communicating findings to higher staff. Trainee has no punishment authority.\n\n### What you should normally handle\n- Review incoming reports and collect the basic facts.\n- Use /inspect, /history, and /warnings to understand a player's current moderation context.\n- Observe suspicious behavior and document what happened.\n- Use staff chat to ask for help or pass findings to the appropriate moderator.\n- Assist players with straightforward questions that do not require a punishment or administrative action.\n\n### Normal workflow\n1. Open the relevant report or player context.\n2. Check history, warnings, and live inspection information.\n3. Observe the situation directly when possible.\n4. Summarize the issue clearly in staff chat.\n5. Hand the case to a rank with the required action permission.\n6. Remain available to provide the context you gathered.\n\n### Escalate when\n- A warning, kick, mute, ban, freeze, inventory inspection, or other enforcement action is needed.\n- You are unsure whether the behavior actually violates a rule.\n- The case involves staff misconduct, exploitation, major cheating, economy/item duplication, or server security.\n- The player asks for an appeal/reversal that you cannot process.\n\n### Primary tools for this rank\n- /staff — staff panel\n- /staffchat or /sc — private staff communication\n- /history <player> — moderation history\n- /warnings <player> — warning information\n- /inspect <player> — live/player moderation information\n- /reports — report workflow\n\n### Rank-specific notes\n- Do not attempt to create punishment workarounds using unrelated commands.\n- Your value at this rank is accurate triage and context gathering, not punishment volume.\n- SMAudit recognizes Trainee as staff for applicable staff activity logging.",
    "sort_order": 1
  },
  {
    "id": 541,
    "section": "permissions",
    "rank_name": "Trainee",
    "title": "Trainee Commands & Permissions",
    "content": "- **LuckPerms weight:** 200\n- **Parents:** member\n\n### Rank summary\nEntry-level staff access focused on observation, reports, investigation, and staff communication. No punishment authority.\n\n### Inherited access\n- Member player access (details deferred to Connected Rank / Inheritance documentation).\n\n### Commands / permissions / features\n#### `/staff`\n- **Permission:** `smstaff.panel`\n- **Purpose:** Open the SMStaff staff panel.\n\n#### `/staffchat, /sc`\n- **Permission:** `smstaff.staffchat`\n- **Purpose:** Private staff communication.\n\n#### `/history <player>`\n- **Permission:** `smstaff.history`\n- **Purpose:** Review player moderation/history data.\n\n#### `/warnings <player>`\n- **Permission:** `smstaff.warnings`\n- **Purpose:** Review a player's warnings.\n\n#### `/inspect <player>`\n- **Permission:** `smstaff.inspect`\n- **Purpose:** Use the SMStaff player inspection workflow.\n\n#### `/reports`\n- **Permission:** `smstaff.reports`\n- **Purpose:** Access the SMStaff reports workflow.\n\nStaff recognition / staff workflow access\n- **Permission:** `smstaff.staff`\n- **Purpose:** Marks the rank for applicable SMStaff staff functionality.\n\n### Restrictions / intentionally unavailable access\n- /warn: smstaff.warn = false\n- /kick: smstaff.kick unavailable\n- /mute, /tempmute, /unmute: SMStaff mute permissions unavailable\n- /ban, /tempban, /unban: SMStaff ban permissions unavailable\n- /freeze, /unfreeze, /ss: Unavailable\n- /invsee, /endersee: Unavailable\n- /staffmode, /vanish, /spectate: Unavailable\n- Hierarchy bypass: smstaff.hierarchy.bypass unavailable\n\n### Operational / plugin notes\n- SMAudit recognizes trainee as a staff group for staff activity classification/routing.\n\n### Source-of-truth basis\n- Final SMSMP LuckPerms audit completed before this documentation pass.\n- Production SMStaff permission/command mapping.\n- Production SM Suite configs, testing guides, and validated command families.\n- Legacy permissions explicitly disabled during the audit are not presented as usable features.",
    "sort_order": 1
  },
  {
    "id": 542,
    "section": "handbook",
    "rank_name": "Helper",
    "title": "Helper Staff Handbook",
    "content": "Helper is the first rank allowed to take a direct moderation action. It extends Trainee triage responsibilities with warnings and anti-cheat alert visibility.\n\n### What you should normally handle\n- Everything a Trainee handles.\n- Issue warnings when the situation clearly fits a warning-level response.\n- Watch GrimAC alerts and use them as an investigative signal.\n- Gather context for suspected cheating before escalating to higher moderation.\n\n### Normal workflow\n1. Review the report, player history, warnings, and live context.\n2. If the case is clearly warning-level, issue the warning through SMStaff with a useful reason.\n3. If Grim alerts are involved, observe the player and collect enough context for a higher rank.\n4. Record or communicate anything important that the next moderator needs to know.\n5. Escalate immediately when a stronger action is required.\n\n### Escalate when\n- A kick, mute, ban, freeze, inventory check, or rollback is needed.\n- Anti-cheat alerts appear serious enough to require enforcement beyond a warning.\n- The evidence is ambiguous or could be a false positive.\n- The case involves repeated offenses beyond your normal warning authority.\n\n### Primary tools for this rank\n- All Trainee investigation/report tools\n- /warn — SMStaff warning\n- GrimAC alerts — alert visibility\n\n### Rank-specific notes\n- Grim alerts are evidence to investigate, not automatic proof by themselves.\n- Warnings should use clear reasons so later staff can understand the case history.",
    "sort_order": 2
  },
  {
    "id": 543,
    "section": "permissions",
    "rank_name": "Helper",
    "title": "Helper Commands & Permissions",
    "content": "- **LuckPerms weight:** 250\n- **Parents:** sentinel, trainee\n\n### Rank summary\nFirst punishment-capable rank. Adds warnings and anti-cheat alert visibility while retaining the Trainee investigation toolkit.\n\n### Inherited access\n- All Trainee staff tools.\n- Sentinel player-rank inheritance (details deferred).\n\n### Commands / permissions / features\n#### `/warn <player> ...`\n- **Permission:** `smstaff.warn`\n- **Purpose:** Issue warnings through SMStaff.\n\nGrim anti-cheat alerts\n- **Permission:** `grim.alerts`\n- **Purpose:** Receive/see GrimAC alert output.\n\n### Restrictions / intentionally unavailable access\n- Kick/mute/ban commands: Not unlocked yet.\n- Inventory inspection: Not unlocked yet.\n- Freeze/SS: Not unlocked yet.\n\n### Source-of-truth basis\n- Final SMSMP LuckPerms audit completed before this documentation pass.\n- Production SMStaff permission/command mapping.\n- Production SM Suite configs, testing guides, and validated command families.\n- Legacy permissions explicitly disabled during the audit are not presented as usable features.",
    "sort_order": 2
  },
  {
    "id": 544,
    "section": "handbook",
    "rank_name": "Jr. Mod",
    "title": "Jr. Mod Staff Handbook",
    "content": "Jr Mod handles routine active moderation. It adds kick, mute, temporary mute, unmute, and staff-note capabilities while still escalating bans and higher-risk investigations.\n\n### What you should normally handle\n- Routine chat and behavior enforcement requiring warnings, kicks, or mutes.\n- Temporary removal of disruptive players from the server with /kick.\n- Temporary or permanent chat mutes within the server's punishment policy.\n- Add useful staff notes when context should remain attached to a player.\n- Review prior cases before deciding whether an offense is escalating.\n\n### Normal workflow\n1. Confirm the offense and check existing history/warnings.\n2. Choose the least severe action that matches the approved punishment policy.\n3. Use SMStaff punishment commands so the case is recorded correctly.\n4. Add a staff note when future moderators need non-punishment context.\n5. Re-check the case/history if the situation continues.\n6. Escalate to Mod or higher when a ban or advanced investigation is required.\n\n### Escalate when\n- A ban/tempban is needed.\n- Inventory, Ender Chest, rollback, freeze/SS, or server-side investigation is required.\n- The case involves high-value item/economy abuse.\n- You are dealing with staff misconduct or a case involving someone above your hierarchy.\n\n### Primary tools for this rank\n- All Helper/Trainee tools\n- /kick\n- /mute\n- /tempmute\n- /unmute\n- /notes\n\n### Rank-specific notes\n- Use the SMStaff punishment system rather than legacy Essentials/LightBans moderation commands.\n- Notes are for useful staff context; they are not a substitute for a real punishment case when enforcement occurred.",
    "sort_order": 3
  },
  {
    "id": 545,
    "section": "permissions",
    "rank_name": "Jr. Mod",
    "title": "Jr. Mod Commands & Permissions",
    "content": "- **LuckPerms weight:** 300\n- **Parents:** crusader, helper\n\n### Rank summary\nAdds core low-level moderation actions: kick, mute, unmute, and staff notes.\n\n### Inherited access\n- All Helper and Trainee staff tools.\n- Crusader player-rank inheritance (details deferred).\n\n### Commands / permissions / features\n#### `/kick <player> ...`\n- **Permission:** `smstaff.kick`\n- **Purpose:** Kick a player through SMStaff.\n\n#### `/mute <player> ...`\n- **Permission:** `smstaff.mute`\n- **Purpose:** Mute a player.\n\n#### `/tempmute <player> ...`\n- **Permission:** `smstaff.mute`\n- **Purpose:** Temporarily mute a player.\n\n#### `/unmute <player>`\n- **Permission:** `smstaff.unmute`\n- **Purpose:** Remove an SMStaff mute.\n\n#### `/notes ...`\n- **Permission:** `smstaff.notes`\n- **Purpose:** Use SMStaff staff notes.\n\n### Restrictions / intentionally unavailable access\n- Legacy Essentials moderation: essentials.kick / mute / warn = false\n- Legacy LightBans moderation: kick/mute/notes/unmute/warn/warnings = false\n- Ban: smstaff.ban not unlocked yet.\n- Freeze: smstaff.freeze not unlocked yet.\n\n### Source-of-truth basis\n- Final SMSMP LuckPerms audit completed before this documentation pass.\n- Production SMStaff permission/command mapping.\n- Production SM Suite configs, testing guides, and validated command families.\n- Legacy permissions explicitly disabled during the audit are not presented as usable features.",
    "sort_order": 3
  },
  {
    "id": 546,
    "section": "handbook",
    "rank_name": "Mod",
    "title": "Mod Staff Handbook",
    "content": "Mod is the core independent moderation rank. It can handle normal bans, staff-mode investigation, vanish, spectating, and approved Discord-side staff tools.\n\n### What you should normally handle\n- Most normal player moderation from warning through ban.\n- Investigate players while hidden using vanish/staff mode where appropriate.\n- Spectate suspicious players without unnecessarily interfering.\n- Use the Discord staff bridge for approved allowlisted tasks while the linked Minecraft account is online.\n- Resolve ordinary moderation cases without requiring an Admin unless the case needs higher-level tools.\n\n### Normal workflow\n1. Review report/history/warnings and confirm the situation.\n2. Use staff mode, vanish, or spectate when observation is needed.\n3. Apply the appropriate SMStaff punishment with a clear reason.\n4. Verify the case appears correctly in history.\n5. Escalate technical, inventory, rollback, freeze/SS, or staff-management issues.\n\n### Escalate when\n- Inventory or Ender Chest inspection is required.\n- A freeze/screenshare workflow is needed.\n- Rollback/recovery or server administration is needed.\n- The target is a staff member you cannot properly act on through normal hierarchy.\n- The incident involves a possible exploit, duplication, or technical failure.\n\n### Primary tools for this rank\n- All Jr Mod/Helper/Trainee tools\n- /ban\n- /tempban\n- /unban\n- /staffmode\n- /vanish\n- /spectate\n- SMStaff Discord /mccommand for approved roots\n- Discord staff-list and player-info features\n\n### Rank-specific notes\n- Remote Discord commands still use the linked Minecraft account's LuckPerms and hierarchy checks.\n- Staff mode protects/restores the normal inventory through its recovery snapshot system; exit staff mode cleanly.",
    "sort_order": 4
  },
  {
    "id": 547,
    "section": "permissions",
    "rank_name": "Mod",
    "title": "Mod Commands & Permissions",
    "content": "- **LuckPerms weight:** 350\n- **Parents:** champion, jrmod\n\n### Rank summary\nFull day-to-day moderator tier. Adds bans, staff mode, vanish, spectate, and Discord staff bridge features.\n\n### Inherited access\n- All Jr Mod / Helper / Trainee tools.\n- Champion player-rank inheritance (details deferred).\n\n### Commands / permissions / features\n#### `/ban <player> ...`\n- **Permission:** `smstaff.ban`\n- **Purpose:** Ban a player through SMStaff.\n\n#### `/tempban <player> ...`\n- **Permission:** `smstaff.ban`\n- **Purpose:** Temporarily ban a player.\n\n#### `/unban <player>`\n- **Permission:** `smstaff.unban`\n- **Purpose:** Remove an SMStaff ban.\n\n#### `/staffmode`\n- **Permission:** `smstaff.staffmode`\n- **Purpose:** Toggle the SMStaff staff-mode workflow.\n\n#### `/vanish`\n- **Permission:** `smstaff.vanish`\n- **Purpose:** Toggle SMStaff vanish.\n\nSee vanished staff/players where supported\n- **Permission:** `smstaff.vanish.see`\n- **Purpose:** Visibility permission for SMStaff vanish.\n\n#### `/spectate <player>`\n- **Permission:** `smstaff.spectate`\n- **Purpose:** Use SMStaff spectate.\n\nDiscord /mccommand feature\n- **Permission:** `smstaff.discord.command`\n- **Purpose:** Run allowlisted staff commands from the linked Discord session, still subject to LP.\n\nDiscord staff list\n- **Permission:** `smstaff.discord.stafflist`\n- **Purpose:** Use the SMStaff Discord staff-list feature.\n\nDiscord player info\n- **Permission:** `smstaff.discord.playerinfo`\n- **Purpose:** Use the SMStaff Discord player-info feature.\n\n#### `/ping, /seen`\n- **Permission:** `Essentials permissions`\n- **Purpose:** Basic Essentials player-status utilities granted to Mod.\n\n### Restrictions / intentionally unavailable access\n- Legacy Essentials ban/history/unban: Explicitly false\n- Legacy LightBans ban/history/unban: Explicitly false\n- /invsee: Not unlocked until Sr Mod.\n- /freeze: Not unlocked until Admin.\n\n### Operational / plugin notes\n- SMStaff Discord remote commands never bypass the linked Minecraft account's normal LuckPerms checks.\n\n### Source-of-truth basis\n- Final SMSMP LuckPerms audit completed before this documentation pass.\n- Production SMStaff permission/command mapping.\n- Production SM Suite configs, testing guides, and validated command families.\n- Legacy permissions explicitly disabled during the audit are not presented as usable features.",
    "sort_order": 4
  },
  {
    "id": 548,
    "section": "handbook",
    "rank_name": "Sr. Mod",
    "title": "Sr. Mod Staff Handbook",
    "content": "Sr Mod is the senior investigation-focused moderator. It adds inventory and Ender Chest inspection plus teleport capability for cases that need closer in-game investigation.\n\n### What you should normally handle\n- Everything handled by Mod.\n- Inspect online inventories when a moderation case justifies it.\n- Inspect Ender Chests through the SMStaff/SMEnderChest integration.\n- Use teleport access for legitimate moderation/investigation needs.\n- Handle more complex evidence gathering before escalating to Admin.\n\n### Normal workflow\n1. Start with the normal report/history/inspection workflow.\n2. Use vanish/staff mode/spectate first when passive observation is enough.\n3. Use /invsee or /endersee when item-level evidence is relevant.\n4. Document what matters to the case before closing the inspection.\n5. Apply normal Mod-level punishment if appropriate.\n6. Escalate to Admin if a freeze/SS, offline edit, CoreProtect investigation, or crate/admin action is needed.\n\n### Escalate when\n- A freeze or screenshare is required.\n- Offline inventory modification is needed.\n- CoreProtect lookup/inspection beyond your available tools is required.\n- Rollback or recovery is needed.\n- The case involves a large exploit/economy incident.\n\n### Primary tools for this rank\n- All Mod and lower-rank tools\n- /invsee\n- /endersee\n- /tp\n\n### Rank-specific notes\n- Inventory access is investigative power and should be used only for staff work.\n- Do not rely on legacy InvSeePlusPlus/Essentials invsee permissions; SMStaff is the intended system.",
    "sort_order": 5
  },
  {
    "id": 549,
    "section": "permissions",
    "rank_name": "Sr. Mod",
    "title": "Sr. Mod Commands & Permissions",
    "content": "- **LuckPerms weight:** 400\n- **Parents:** ascendant, mod\n\n### Rank summary\nSenior moderation tier. Adds direct inventory/Ender Chest inspection and Essentials teleport capability.\n\n### Inherited access\n- All Mod and lower staff tools.\n- Ascendant player-rank inheritance (details deferred).\n\n### Commands / permissions / features\n#### `/invsee <player>`\n- **Permission:** `smstaff.invsee`\n- **Purpose:** Inspect an online player's inventory through SMStaff.\n\n#### `/endersee <player>`\n- **Permission:** `smstaff.endersee`\n- **Purpose:** Inspect a player's Ender Chest through SMStaff.\n\n#### `/tp ...`\n- **Permission:** `essentials.tp`\n- **Purpose:** Essentials teleport access.\n\n### Restrictions / intentionally unavailable access\n- Legacy Essentials /invsee: essentials.invsee = false\n- InvSeePlusPlus open inventory: invseeplusplus.openinv = false\n- SuperVanish legacy nodes: supervanish.vanish / sv.use = false\n- /freeze: Still not unlocked.\n\n### Source-of-truth basis\n- Final SMSMP LuckPerms audit completed before this documentation pass.\n- Production SMStaff permission/command mapping.\n- Production SM Suite configs, testing guides, and validated command families.\n- Legacy permissions explicitly disabled during the audit are not presented as usable features.",
    "sort_order": 5
  },
  {
    "id": 550,
    "section": "handbook",
    "rank_name": "Trial Admin",
    "title": "Trial Admin Staff Handbook",
    "content": "Trial Admin is an evaluation tier between senior moderation and full administration. It intentionally does not add a large new command surface; the purpose is to prove judgment and consistency with Sr Mod-level tools before receiving Admin powers.\n\n### What you should normally handle\n- Handle Sr Mod-level cases independently.\n- Assist Admins with larger investigations by gathering and organizing evidence.\n- Practice escalation and handoff quality for cases that require administrative tools.\n- Serve as a senior moderation presence when lower staff need guidance.\n\n### Normal workflow\n1. Handle the case using inherited Sr Mod tools.\n2. Identify early whether the issue will require Admin-only capability.\n3. Gather the evidence/context so the Admin receiving the case does not need to restart the investigation.\n4. Escalate with a concise summary and remain available for follow-up.\n\n### Escalate when\n- Any Admin-only action is required, including freeze/SS or offline edits.\n- Rollback/recovery is needed.\n- Operational server changes are required.\n- The case concerns staff management above your authority.\n\n### Primary tools for this rank\n- All Sr Mod and lower staff tools\n\n### Rank-specific notes\n- Trial Admin is a responsibility/evaluation step, not a permission shortcut.\n- Website copy should emphasize readiness for Admin rather than pretending the rank unlocks tools it does not have.",
    "sort_order": 6
  },
  {
    "id": 551,
    "section": "permissions",
    "rank_name": "Trial Admin",
    "title": "Trial Admin Commands & Permissions",
    "content": "- **LuckPerms weight:** 450\n- **Parents:** ascendant, srmod\n\n### Rank summary\nAdministrative evaluation tier. Inherits Sr Mod capabilities but intentionally adds no major direct operational permission surface.\n\n### Inherited access\n- All Sr Mod and lower staff tools.\n- Ascendant player-rank inheritance (details deferred).\n\n### Commands / permissions / features\nNo major new direct command/permission surface at this rank.\n\n### Restrictions / intentionally unavailable access\n- /freeze / /ss / offline editing: Not unlocked until Admin.\n- Higher rollback/audit administration: Not unlocked until Sr Admin.",
    "sort_order": 6
  },
  {
    "id": 552,
    "section": "handbook",
    "rank_name": "Admin",
    "title": "Admin Staff Handbook",
    "content": "Admin is the first rank equipped for high-impact moderation investigations. It adds freeze/screenshare workflows, offline removal-only inventory editing, CoreProtect investigation tools, advanced teleport utilities, and crate key administration.\n\n### What you should normally handle\n- Complex cheating/exploit investigations requiring a freeze or SS workflow.\n- CoreProtect inspection/lookup for block or container incidents.\n- Supported offline inventory removal when an investigated player is offline.\n- Administrative teleporting needed for investigations.\n- Approved crate key give/take actions.\n- Support lower moderators on difficult or sensitive cases.\n\n### Normal workflow\n1. Confirm the incident and review the existing moderation context.\n2. Freeze/SS only when the case actually requires that workflow.\n3. Use CoreProtect inspect/lookup/near when world-history evidence is relevant.\n4. For offline inventory action, stage only the supported removal and verify the pending edit applies correctly when the player joins.\n5. Use crate key actions only for an approved administrative reason.\n6. Escalate to Sr Admin when rollback/recovery or broader audit administration is required.\n\n### Escalate when\n- A CoreProtect rollback is needed.\n- InventoryRollbackPlus recovery is needed.\n- Complex audit/incident review requires SMAudit administration.\n- The problem appears to be server-wide or plugin-related rather than a player-only moderation case.\n- An action may have partially committed or entered an uncertain recovery state.\n\n### Primary tools for this rank\n- All Trial Admin/Sr Mod and lower tools\n- /freeze\n- /unfreeze\n- /ss\n- SMStaff offline edit workflow\n- CoreProtect inspect / lookup / near / help\n- /tphere\n- /tppos\n- ExcellentCrates key give/take\n\n### Rank-specific notes\n- Offline editing is staged REMOVE_ONLY; SMStaff does not directly rewrite offline player .dat files.\n- If a punishment or inventory operation appears uncertain, do not blindly repeat it. Review the current state and diagnostics first.",
    "sort_order": 7
  },
  {
    "id": 553,
    "section": "permissions",
    "rank_name": "Admin",
    "title": "Admin Commands & Permissions",
    "content": "- **LuckPerms weight:** 500\n- **Parents:** ascendant, trialadmin\n\n### Rank summary\nFirst full administrative moderation tier. Adds freeze/SS, offline inventory editing, CoreProtect inspection tools, advanced teleport utilities, and crate key administration.\n\n### Inherited access\n- All Trial Admin / Sr Mod / lower staff tools.\n- Ascendant player-rank inheritance (details deferred).\n\n### Commands / permissions / features\n#### `/freeze <player>`\n- **Permission:** `smstaff.freeze`\n- **Purpose:** Freeze a player through SMStaff.\n\n#### `/unfreeze <player>`\n- **Permission:** `smstaff.unfreeze`\n- **Purpose:** Remove an SMStaff freeze.\n\n#### `/ss <player> ...`\n- **Permission:** `smstaff.ss`\n- **Purpose:** Use the SMStaff screenshare/SS workflow.\n\nOffline inventory edit workflow\n- **Permission:** `smstaff.offlineedit`\n- **Purpose:** Stage supported offline inventory removals.\n\n#### `/smstaff status`\n- **Permission:** `smstaff.status`\n- **Purpose:** View SMStaff operational status.\n\nCoreProtect help\n- **Permission:** `coreprotect.help`\n- **Purpose:** Access CoreProtect help.\n\nCoreProtect inspect\n- **Permission:** `coreprotect.inspect`\n- **Purpose:** Inspect block/container activity.\n\nCoreProtect lookup\n- **Permission:** `coreprotect.lookup`\n- **Purpose:** Run CoreProtect lookup queries.\n\nCoreProtect near\n- **Permission:** `coreprotect.near`\n- **Purpose:** Review nearby CoreProtect activity.\n\n#### `/itemdb`\n- **Permission:** `essentials.itemdb`\n- **Purpose:** Essentials item database lookup.\n\n#### `/tphere`\n- **Permission:** `essentials.tphere`\n- **Purpose:** Teleport another player to the admin.\n\n#### `/tppos`\n- **Permission:** `essentials.tppos`\n- **Purpose:** Teleport to coordinates.\n\nExcellentCrates key give\n- **Permission:** `ExcellentCrates key-give permission`\n- **Purpose:** Grant crate keys where permitted.\n\nExcellentCrates key take\n- **Permission:** `ExcellentCrates key-take permission`\n- **Purpose:** Remove crate keys where permitted.\n\n### Restrictions / intentionally unavailable access\n- DonutOrders admin: donutorders.admin = false\n- Legacy staff.chat / staff.mode / StaffPlus staffmode / SV vanish: Explicitly false\n- Legacy Essentials Ender Chest grant: Removed/unset\n- CoreProtect rollback: Not unlocked until Sr Admin.\n\n### Operational / plugin notes\n- SMStaff offline inventory edits are staged and REMOVE_ONLY; they do not directly rewrite offline player .dat files.\n\n### Source-of-truth basis\n- Final SMSMP LuckPerms audit completed before this documentation pass.\n- Production SMStaff permission/command mapping.\n- Production SM Suite configs, testing guides, and validated command families.\n- Legacy permissions explicitly disabled during the audit are not presented as usable features.",
    "sort_order": 7
  },
  {
    "id": 554,
    "section": "handbook",
    "rank_name": "Sr. Admin",
    "title": "Sr. Admin Staff Handbook",
    "content": "Sr Admin is the recovery and advanced-investigation tier. It adds CoreProtect rollback, InventoryRollbackPlus, Grim profile access, SMAudit administration, stronger teleport/key recovery tools, and vanish-others capability.\n\n### What you should normally handle\n- Serious griefing or inventory-loss investigations requiring rollback/recovery.\n- Review and perform approved CoreProtect rollbacks.\n- Use InventoryRollbackPlus for supported inventory recovery work.\n- Review Grim profiles as part of advanced anti-cheat investigations.\n- Inspect SMAudit incidents/routes/diagnostics when a moderation or plugin action failed.\n- Assist Admins with complex cases and recovery decisions.\n\n### Normal workflow\n1. Establish exactly what state is wrong before changing anything.\n2. Use lookups/history/incident data to define the scope.\n3. For rollback/recovery, target only the affected data/time/player scope.\n4. Verify the result after the operation.\n5. Check SMAudit for unexpected failures.\n6. Escalate to management when the issue requires maintenance, backup, module changes, or broad server operations.\n\n### Escalate when\n- Maintenance mode or backup coordination is needed.\n- A suite module needs administrative changes beyond your permissions.\n- WorldEdit/WorldGuard or broad technical operations are required.\n- FluxStore command recovery or SMPVP administrative changes are involved.\n- The incident affects many players or could have financial/store consequences.\n\n### Primary tools for this rank\n- All Admin and lower tools\n- CoreProtect rollback\n- InventoryRollbackPlus\n- Grim profile\n- SMAudit admin command family\n- SMAdmin diagnostics\n- Vanish others\n- ExcellentCrates key reset\n- Teleport-others capability\n\n### Rank-specific notes\n- Rollback is a recovery tool, not a first-response button. Confirm scope before committing.\n- Use SMAudit to verify what happened and whether a failed operation may already have committed.",
    "sort_order": 8
  },
  {
    "id": 555,
    "section": "permissions",
    "rank_name": "Sr. Admin",
    "title": "Sr. Admin Commands & Permissions",
    "content": "- **LuckPerms weight:** 550\n- **Parents:** admin, immortal\n\n### Rank summary\nAdds rollback/recovery capability, broad InventoryRollbackPlus access, audit administration, Grim profiles, vanish-others, and stronger crate/teleport controls.\n\n### Inherited access\n- All Admin and lower staff tools.\n- Immortal player-rank inheritance (details deferred).\n\n### Commands / permissions / features\nInventoryRollbackPlus command set\n- **Permission:** `inventoryrollbackplus.*`\n- **Purpose:** Full granted IRP recovery/rollback command family.\n\nCoreProtect rollback\n- **Permission:** `coreprotect.rollback`\n- **Purpose:** Perform CoreProtect rollbacks.\n\nTeleport others\n- **Permission:** `essentials.tp.others`\n- **Purpose:** Use permitted Essentials teleport actions on other players.\n\nExcellentCrates key reset\n- **Permission:** `ExcellentCrates key-reset permission`\n- **Purpose:** Reset crate key state where supported.\n\nGrim profile\n- **Permission:** `grim.profile`\n- **Purpose:** View GrimAC player profile information.\n\n#### `/smaudit ...`\n- **Permission:** `smaudit.admin`\n- **Purpose:** Administrative access to SMAudit status/routes/diagnostics/incidents/retry/test/reload features.\n\nSMAdmin diagnostics\n- **Permission:** `smadmin.diagnostics`\n- **Purpose:** Access SMAdmin diagnostic functions.\n\nVanish others\n- **Permission:** `smstaff.vanish.others`\n- **Purpose:** Control SMStaff vanish for other players where the command supports it.\n\n### Restrictions / intentionally unavailable access\n- DiscordSRV admin: discordsrv.admin = false\n- General SM Suite module administration: Broader access begins at Manager/Informatics depending on subsystem.\n\n### Source-of-truth basis\n- Final SMSMP LuckPerms audit completed before this documentation pass.\n- Production SMStaff permission/command mapping.\n- Production SM Suite configs, testing guides, and validated command families.\n- Legacy permissions explicitly disabled during the audit are not presented as usable features.",
    "sort_order": 8
  },
  {
    "id": 556,
    "section": "handbook",
    "rank_name": "Trial Manager",
    "title": "Trial Manager Staff Handbook",
    "content": "Trial Manager is the first server-operations management tier. It adds controlled backup and maintenance access while retaining the Sr Admin recovery toolkit.\n\n### What you should normally handle\n- Coordinate maintenance windows when approved.\n- Create backups before risky approved operations.\n- Help oversee serious incidents that may require taking the server into maintenance.\n- Support Sr Admins during recovery while learning management-level operational procedure.\n\n### Normal workflow\n1. Determine whether the issue truly requires maintenance or a backup.\n2. If a backup is needed, start it and wait for confirmed completion.\n3. If maintenance is needed, enable it with a clear reason and verify its state.\n4. Coordinate the required work with the appropriate technical/management staff.\n5. Disable maintenance when the work is complete and verify normal state.\n\n### Escalate when\n- Module toggles, world editing, broad technical plugin administration, or FluxStore/SMPVP admin work is required.\n- A restart or migration is required outside your granted command surface.\n- The issue is unresolved after backup/maintenance preparation.\n\n### Primary tools for this rank\n- All Sr Admin and lower tools\n- /smadmin backup\n- /smmaintenance on\n- /smmaintenance status\n- /smmaintenance off\n\n### Rank-specific notes\n- SMAdmin maintenance state persists; always verify the final state.\n- Backups report success only after the backup operation completes. Do not assume a started backup is already safe.",
    "sort_order": 9
  },
  {
    "id": 557,
    "section": "permissions",
    "rank_name": "Trial Manager",
    "title": "Trial Manager Commands & Permissions",
    "content": "- **LuckPerms weight:** 600\n- **Parents:** sradmin, immortal\n\n### Rank summary\nFirst management tier. Adds production backup and maintenance controls while retaining Sr Admin recovery/audit access.\n\n### Inherited access\n- All Sr Admin and lower staff tools.\n- Immortal player-rank inheritance (details deferred).\n\n### Commands / permissions / features\n#### `/smadmin backup <label>`\n- **Permission:** `smadmin.backup`\n- **Purpose:** Create an SMAdmin backup.\n\n#### `/smmaintenance on <reason>`\n- **Permission:** `smadmin.maintenance`\n- **Purpose:** Enable maintenance mode.\n\n#### `/smmaintenance status`\n- **Permission:** `smadmin.maintenance`\n- **Purpose:** Review maintenance state.\n\n#### `/smmaintenance off`\n- **Permission:** `smadmin.maintenance`\n- **Purpose:** Disable maintenance mode.\n\n### Restrictions / intentionally unavailable access\n- Full Manager toolset: Not unlocked until Manager.\n- SMStaff hierarchy bypass: Not granted.\n\n### Operational / plugin notes\n- SMAdmin production policy performs safety checks around backups/maintenance; website guide should tell staff to use these controls deliberately.\n\n### Source-of-truth basis\n- Final SMSMP LuckPerms audit completed before this documentation pass.\n- Production SMStaff permission/command mapping.\n- Production SM Suite configs, testing guides, and validated command families.\n- Legacy permissions explicitly disabled during the audit are not presented as usable features.",
    "sort_order": 9
  },
  {
    "id": 558,
    "section": "handbook",
    "rank_name": "Builder",
    "title": "Builder Staff Handbook",
    "content": "Builder is a specialized staff role for server building responsibilities. It is not part of the moderation/management inheritance ladder and does not receive SMStaff punishment powers.\n\n### What you should normally handle\n- Perform build work assigned by leadership.\n- Coordinate build changes with the relevant world/region administrators when protected areas or technical tooling is required.\n- Report player-rule or moderation issues to the moderation team instead of acting as a moderator.\n- Use staff communication channels only if separately granted/available through the final staff configuration.\n\n### Normal workflow\n1. Confirm the build task and affected area.\n2. Coordinate protection/region needs with an authorized WorldGuard/management rank.\n3. Complete and verify the build work.\n4. Report any technical/world issue that requires administrative tools you do not possess.\n\n### Escalate when\n- A player punishment or moderation action is required.\n- Freeze, ban, inventory inspection, hierarchy action, or staff management is required.\n- WorldEdit/WorldGuard/admin tooling is required but not explicitly granted to Builder.\n- The work affects production systems outside the assigned build scope.\n\n### Primary tools for this rank\n- Builder-specific operational permissions are limited by the actual LP grants.\n- Immortal player-rank inheritance is documented later, not in this handbook.\n\n### Rank-specific notes\n- Final LP verification confirmed Builder does not inherit smstaff.ban, smstaff.freeze, or smstaff.hierarchy.bypass.\n- SMAudit can still classify Builder as staff for applicable activity routing.\n- Keep Builder visually separate from the moderation progression on the website.",
    "sort_order": 10
  },
  {
    "id": 559,
    "section": "permissions",
    "rank_name": "Builder",
    "title": "Builder Commands & Permissions",
    "content": "- **LuckPerms weight:** 625\n- **Parents:** immortal\n\n### Rank summary\nSpecialized build role, not part of the moderation/management inheritance ladder. Builder receives Immortal player access but no SMStaff punishment/admin permissions.\n\n### Inherited access\n- Immortal player-rank inheritance (details deferred to Connected Rank / Inheritance documentation).\n\n### Commands / permissions / features\nNo major new direct command/permission surface at this rank.\n\n### Restrictions / intentionally unavailable access\n- /ban and other SMStaff punishments: Not inherited.\n- /freeze: Not inherited.\n- SMStaff hierarchy bypass: Not inherited.\n- Management/technical admin toolsets: Not inherited.\n\n### Operational / plugin notes\n- SMAudit recognizes Builder as a staff group for staff classification/routing.\n- Final LP verification showed Builder does not inherit smstaff.ban, smstaff.freeze, or smstaff.hierarchy.bypass.",
    "sort_order": 10
  },
  {
    "id": 560,
    "section": "handbook",
    "rank_name": "Manager",
    "title": "Manager Staff Handbook",
    "content": "Manager is the broad operational administration tier. It combines staff leadership-level moderation access with SM Suite administration, world tooling, anti-cheat administration, rollback systems, performance diagnostics, SMPVP administration, and SMFluxBridge administration.\n\n### What you should normally handle\n- Coordinate major server incidents and multi-plugin issues.\n- Use SM Suite administrative commands to inspect/reload supported systems.\n- Perform WorldEdit/FAWE and WorldGuard work when operationally required.\n- Use CoreProtect, InventoryRollbackPlus, GrimAC, and spark for advanced investigation/recovery.\n- Administer SMPVP configuration/state through its approved commands.\n- Review and recover SMFluxBridge delivery state when needed.\n- Use BetterRTP administrative functions where appropriate.\n\n### Normal workflow\n1. Identify the affected system and inspect its status before changing it.\n2. Collect diagnostics/audit context first.\n3. Take a backup or enter maintenance when the operation warrants it and your available workflow supports it.\n4. Perform the smallest targeted change that addresses the problem.\n5. Verify the result through plugin status, SMAudit, and direct gameplay/operational checks.\n6. For uncertain transaction/delivery states, confirm the real player/store state before resolving.\n7. Escalate permission-structure or hierarchy changes that Manager is intentionally blocked from performing.\n\n### Escalate when\n- A LuckPerms editor/group-permission/user-parent change is required.\n- SMStaff hierarchy bypass is required.\n- Owner/Server Lead authorization is needed for a high-risk or policy-level decision.\n- A change could affect production data beyond the manager's confidence or recovery plan.\n\n### Primary tools for this rank\n- All Trial Manager/Sr Admin and lower tools\n- Broad current SM Suite administration\n- SMFluxBridge status/reload/reconnect/fetch/journal/resolve/diagnosetest\n- SMPVP status/inspect/reload/mode/diagnosetest\n- CoreProtect broad administration\n- FAWE / WorldEdit\n- WorldGuard\n- GrimAC administrative tools\n- InventoryRollbackPlus\n- spark\n- BetterRTP administration\n- LuckPerms user-info read access\n\n### Rank-specific notes\n- Manager intentionally does NOT have smpvp.bypass or smstaff.hierarchy.bypass.\n- Manager intentionally cannot use LuckPerms editor/group-permission/user-parent mutation surfaces.\n- For SMFluxBridge resolve, never mark success/retry/failed by guess. Establish whether the command actually committed first.",
    "sort_order": 11
  },
  {
    "id": 561,
    "section": "permissions",
    "rank_name": "Manager",
    "title": "Manager Commands & Permissions",
    "content": "- **LuckPerms weight:** 650\n- **Parents:** trialmanager, immortal\n\n### Rank summary\nHigh-trust operational manager tier with broad server administration, world tooling, diagnostics, marketplace administration, SMPVP administration, and FluxStore bridge administration.\n\n### Inherited access\n- All Trial Manager / Sr Admin / lower staff tools.\n- Immortal player-rank inheritance (details deferred).\n\n### Commands / permissions / features\nSM Suite admin command families\n- **Permission:** `Audited current SM Suite admin roots`\n- **Purpose:** Operational administration across the currently granted SM Suite modules.\n\n#### `/smfluxbridge status`\n- **Permission:** `smfluxbridge.admin`\n- **Purpose:** Review FluxStore bridge state.\n\n#### `/smfluxbridge reload`\n- **Permission:** `smfluxbridge.admin`\n- **Purpose:** Reload bridge configuration.\n\n#### `/smfluxbridge reconnect`\n- **Permission:** `smfluxbridge.admin`\n- **Purpose:** Reconnect the bridge.\n\n#### `/smfluxbridge fetch`\n- **Permission:** `smfluxbridge.admin`\n- **Purpose:** Request pending FluxStore commands.\n\n#### `/smfluxbridge journal [page]`\n- **Permission:** `smfluxbridge.admin`\n- **Purpose:** Review the local delivery journal.\n\n#### `/smfluxbridge resolve <id> <success|retry|failed>`\n- **Permission:** `smfluxbridge.admin`\n- **Purpose:** Manually resolve an uncertain FluxStore delivery after verification.\n\n#### `/smfluxbridge diagnosetest`\n- **Permission:** `smfluxbridge.admin`\n- **Purpose:** Run a safe synthetic diagnostic.\n\n#### `/smpvp status`\n- **Permission:** `smpvp.admin`\n- **Purpose:** Review SMPVP state.\n\n#### `/smpvp inspect <player>`\n- **Permission:** `smpvp.admin`\n- **Purpose:** Inspect player combat/PvP state.\n\n#### `/smpvp reload`\n- **Permission:** `smpvp.admin`\n- **Purpose:** Reload SMPVP configuration.\n\n#### `/smpvp mode ...`\n- **Permission:** `smpvp.admin`\n- **Purpose:** Use authorized SMPVP mode controls.\n\n#### `/smpvp diagnosetest`\n- **Permission:** `smpvp.admin`\n- **Purpose:** Run SMPVP synthetic diagnostics.\n\nCoreProtect full operational family\n- **Permission:** `coreprotect.*`\n- **Purpose:** Broad CoreProtect administration.\n\nFAWE / WorldEdit command family\n- **Permission:** `fawe.* / worldedit.*`\n- **Purpose:** Broad build/world editing capability.\n\nWorldGuard command family\n- **Permission:** `worldguard.*`\n- **Purpose:** Broad region/protection administration.\n\nGrimAC command family\n- **Permission:** `grimac.*`\n- **Purpose:** Broad anti-cheat administrative capability.\n\nInventoryRollbackPlus command family\n- **Permission:** `inventoryrollbackplus.*`\n- **Purpose:** Broad rollback/recovery capability.\n\nspark command family\n- **Permission:** `spark.*`\n- **Purpose:** Performance profiling/diagnostic capability.\n\nBetterRTP administration\n- **Permission:** `BetterRTP admin permission`\n- **Purpose:** Administrative RTP controls.\n\nLuckPerms user information\n- **Permission:** `luckperms.user.info`\n- **Purpose:** Read user permission/group information without unrestricted escalation rights.\n\n### Restrictions / intentionally unavailable access\n- SMPVP gameplay bypass: smpvp.bypass = false\n- SMStaff hierarchy bypass: smstaff.hierarchy.bypass = false\n- LuckPerms editor: luckperms.editor = false\n- LuckPerms group permission mutation: luckperms.group.permission = false\n- LuckPerms user parent mutation: luckperms.user.parent = false\n- Legacy zAuctionHouse wildcard: zauctionhouse.* = false\n- Legacy CaveExplorer admin: caveexplorer.admin = false\n\n### Operational / plugin notes\n- Manager is intentionally operationally powerful but cannot arbitrarily escalate ranks/permissions through the restricted LuckPerms surfaces.\n- FluxStore /smfluxbridge resolve is a high-impact recovery command; website text should require verification before using retry/success/failed.\n\n### Source-of-truth basis\n- Final SMSMP LuckPerms audit completed before this documentation pass.\n- Production SMStaff permission/command mapping.\n- Production SM Suite configs, testing guides, and validated command families.\n- Legacy permissions explicitly disabled during the audit are not presented as usable features.",
    "sort_order": 11
  },
  {
    "id": 562,
    "section": "handbook",
    "rank_name": "Promotional Manager",
    "title": "Promotional Manager Staff Handbook",
    "content": "Promotional Manager is a specialized Manager branch. Its operational command authority is inherited from Manager; the specialized department responsibilities should be defined by leadership separately rather than invented in the command system.\n\n### What you should normally handle\n- Perform Manager-level server operations when required.\n- Carry out the specialized Promotional Manager responsibilities assigned by leadership.\n- Coordinate with Staff Manager, Ticket Manager, and technical leadership when an issue crosses departments.\n\n### Normal workflow\n1. Use the normal Manager operational workflow for technical/server actions.\n2. For department-specific work, follow the procedures defined by leadership for this branch.\n3. Escalate cross-department or hierarchy-sensitive decisions rather than using unrelated technical authority.\n\n### Escalate when\n- A decision requires Staff Manager hierarchy authority.\n- Technical work requires Informatics/Developers specialization.\n- The exact promotional-management policy is not defined in the current technical source material.\n\n### Primary tools for this rank\n- All Manager and lower-rank operational tools\n\n### Rank-specific notes\n- The technical/LuckPerms source does not define the exact non-command duties of Promotional Manager.\n- Department-specific procedures will be maintained as leadership finalizes organizational responsibilities.",
    "sort_order": 12
  },
  {
    "id": 563,
    "section": "permissions",
    "rank_name": "Promotional Manager",
    "title": "Promotional Manager Commands & Permissions",
    "content": "- **LuckPerms weight:** 700\n- **Parents:** manager, immortal\n\n### Rank summary\nSpecialized management branch. No extra direct operational permission nodes were required; it inherits the Manager toolset.\n\n### Inherited access\n- All Manager and lower staff tools.\n- Immortal player-rank inheritance (details deferred).\n\n### Commands / permissions / features\nNo major new direct command/permission surface at this rank.\n\n### Restrictions / intentionally unavailable access\n- SMStaff hierarchy bypass: Not directly granted by this rank.\n- Additional technical overrides: Not added merely because of the Promotional Manager title.",
    "sort_order": 12
  },
  {
    "id": 564,
    "section": "handbook",
    "rank_name": "Ticket Manager",
    "title": "Ticket Manager Staff Handbook",
    "content": "Ticket Manager is a specialized Manager branch centered on support/ticket leadership. Its operational server command authority is inherited from Manager; exact ticket procedures belong to the later staff-policy documentation.\n\n### What you should normally handle\n- Oversee difficult support/ticket cases within the responsibilities assigned by leadership.\n- Use Manager-level operational tools when a ticket requires legitimate server-side investigation.\n- Coordinate escalations from support staff to moderation, technical staff, or leadership.\n\n### Normal workflow\n1. Identify whether the ticket is a support, moderation, technical, store, or account issue.\n2. Use only the relevant Manager-level tools needed to investigate.\n3. Route the case to the correct department when it leaves ticket/support scope.\n4. Keep the handoff clear so the next staff member has the facts needed to continue.\n\n### Escalate when\n- Staff hierarchy action is required.\n- Technical changes require Informatics/Developer ownership.\n- The issue involves policy/ownership decisions above Manager scope.\n\n### Primary tools for this rank\n- All Manager and lower-rank operational tools\n\n### Rank-specific notes\n- The technical source material confirms the Manager inheritance but does not define a complete ticket SOP.\n- Detailed ticket etiquette, response standards, closure rules, and templates should live in the later general/rank handbook policy layer.",
    "sort_order": 13
  },
  {
    "id": 565,
    "section": "permissions",
    "rank_name": "Ticket Manager",
    "title": "Ticket Manager Commands & Permissions",
    "content": "- **LuckPerms weight:** 750\n- **Parents:** manager, immortal\n\n### Rank summary\nSpecialized management branch for ticket/support leadership. Operational permissions inherit from Manager with no additional direct command surface required.\n\n### Inherited access\n- All Manager and lower staff tools.\n- Immortal player-rank inheritance (details deferred).\n\n### Commands / permissions / features\nNo major new direct command/permission surface at this rank.\n\n### Restrictions / intentionally unavailable access\n- SMStaff hierarchy bypass: Not directly granted by this rank.\n- Additional technical overrides: Not added merely because of the Ticket Manager title.",
    "sort_order": 13
  },
  {
    "id": 566,
    "section": "handbook",
    "rank_name": "Staff Manager",
    "title": "Staff Manager Staff Handbook",
    "content": "Staff Manager is the staff-structure leadership tier. It inherits Manager operations and intentionally adds SMStaff hierarchy bypass for legitimate staff-management cases.\n\n### What you should normally handle\n- Oversee moderation staff escalation and hierarchy-sensitive cases.\n- Intervene when normal SMStaff hierarchy prevents a legitimate staff-management action.\n- Review difficult staff-related moderation situations.\n- Coordinate with management/leadership on promotions, demotions, or staff discipline according to server policy.\n- Retain Manager-level operational ability for server incidents.\n\n### Normal workflow\n1. Determine whether the issue is a normal player case or a staff-management case.\n2. For normal player cases, use the standard moderation/Manager workflow.\n3. For staff cases, gather the same evidence/history expected for any serious action.\n4. Use hierarchy bypass only when the management case legitimately requires it.\n5. Escalate top-level staff or policy decisions to Server Lead/Owner when necessary.\n\n### Escalate when\n- The case involves Server Lead/Owner authority.\n- A technical code/plugin issue belongs to Informatics/Developers.\n- A LuckPerms structural change is required beyond your granted mutation permissions.\n\n### Primary tools for this rank\n- All Manager and lower-rank tools\n- SMStaff hierarchy bypass\n\n### Rank-specific notes\n- Hierarchy bypass is a targeted staff-management capability, not permission to ignore moderation accountability.\n- Staff-management policy details will be finalized in the general and rank-specific policy handbooks.",
    "sort_order": 14
  },
  {
    "id": 567,
    "section": "permissions",
    "rank_name": "Staff Manager",
    "title": "Staff Manager Commands & Permissions",
    "content": "- **LuckPerms weight:** 800\n- **Parents:** manager, immortal\n\n### Rank summary\nStaff leadership branch. Inherits Manager operations and intentionally adds SMStaff hierarchy bypass.\n\n### Inherited access\n- All Manager and lower staff tools.\n- Immortal player-rank inheritance (details deferred).\n\n### Commands / permissions / features\nSMStaff hierarchy override/bypass\n- **Permission:** `smstaff.hierarchy.bypass`\n- **Purpose:** Allows Staff Manager to bypass normal SMStaff hierarchy restrictions when managing staff cases/actions.\n\n### Restrictions / intentionally unavailable access\n- LuckPerms unrestricted escalation: Manager-level LP mutation restrictions remain unless explicitly overridden higher.",
    "sort_order": 14
  },
  {
    "id": 568,
    "section": "handbook",
    "rank_name": "Informatics",
    "title": "Informatics Staff Handbook",
    "content": "Informatics is the deep SM Suite technical-administration branch. It is responsible for diagnosing and operating first-party systems, including high-impact recovery/override functions that are not appropriate for routine management.\n\n### What you should normally handle\n- Investigate failures across SM Suite modules.\n- Administer SMCore, SMAudit, SMAdmin, SMCommands, SMPortals, SMDashShop, SMCaveExplorer, SMOrders, SMAuctions, SMStreaks, SMEnderChest, and SMTutorial where granted.\n- Handle supported transaction/recovery states.\n- Use Ender Chest overflow/capacity/override tooling for legitimate recovery/admin work.\n- Use tutorial force/reset/location controls when maintaining onboarding.\n- Assist Managers with plugin-level incidents.\n\n### Normal workflow\n1. Start with status, diagnostics, and SMAudit evidence.\n2. Determine whether player data/transactions are already committed before attempting recovery.\n3. Take the appropriate backup/checkpoint for high-impact changes.\n4. Use the narrowest module-specific admin/recovery command available.\n5. Verify the post-change state in both the plugin and SMAudit.\n6. Escalate code defects or build changes to Developers.\n\n### Escalate when\n- A code/JAR change is required.\n- A permission hierarchy change is required above the technical module layer.\n- Owner/Server Lead authorization is needed for a high-risk production decision.\n- The state is uncertain and cannot be safely resolved from available evidence.\n\n### Primary tools for this rank\n- All Staff Manager/Manager and lower tools\n- SMCore administration\n- SMAudit administration\n- SMAdmin administration\n- SMCommands / SMPortals administration\n- SMDashShop administration + transaction resolution\n- SMCaveExplorer administration\n- SMOrders administration + supported bypasses\n- SMAuctions administration + supported bypasses\n- SMStreaks administration\n- SMEnderChest capacity/overflow/override administration\n- SMTutorial admin/force/reset/location controls\n\n### Rank-specific notes\n- Transaction resolution and storage overrides are high-impact recovery tools.\n- Do not blindly replay a failed transaction, inventory edit, migration, or other possibly committed operation.",
    "sort_order": 15
  },
  {
    "id": 569,
    "section": "permissions",
    "rank_name": "Informatics",
    "title": "Informatics Commands & Permissions",
    "content": "- **LuckPerms weight:** 850\n- **Parents:** staffmanager, immortal\n\n### Rank summary\nDeep SM Suite technical-administration branch. Adds explicit first-party plugin administration and high-impact override/recovery permissions.\n\n### Inherited access\n- All Staff Manager / Manager / lower staff tools.\n- Immortal player-rank inheritance (details deferred).\n\n### Commands / permissions / features\n#### `/smadmin ...`\n- **Permission:** `smadmin.admin`\n- **Purpose:** SMAdmin administration.\n\n#### `/smaudit ...`\n- **Permission:** `smaudit.admin`\n- **Purpose:** SMAudit administration.\n\n#### `/smcore ...`\n- **Permission:** `smcore.admin`\n- **Purpose:** SMCore administration.\n\n#### `/smcommands ...`\n- **Permission:** `smcommands.admin`\n- **Purpose:** SMCommands administration.\n\n#### `/smportal ...`\n- **Permission:** `smportals.admin`\n- **Purpose:** SMPortals administration.\n\n#### `/smdashshop ...`\n- **Permission:** `smdashshop.admin`\n- **Purpose:** SMDashShop administration.\n\nSMDashShop transaction resolution\n- **Permission:** `smdashshop.transaction.resolve`\n- **Purpose:** Resolve supported Dash Shop transaction/recovery states.\n\n#### `/smcaveexplorer ...`\n- **Permission:** `smcaveexplorer.admin`\n- **Purpose:** SMCaveExplorer administration.\n\n#### `/smorders ...`\n- **Permission:** `smorders.admin`\n- **Purpose:** SMOrders administration.\n\nSMOrders limit bypass\n- **Permission:** `smorders.bypass.limit`\n- **Purpose:** Bypass normal order listing limits for administration/testing.\n\nSMOrders parallel/legacy bypass\n- **Permission:** `smorders.bypass.parallel`\n- **Purpose:** Authorized parallel/test access where supported.\n\n#### `/smauctions ...`\n- **Permission:** `smauctions.admin`\n- **Purpose:** SMAuctions administration.\n\nSMAuctions limit bypass\n- **Permission:** `smauctions.bypass.limit`\n- **Purpose:** Bypass normal auction listing limits for administration/testing.\n\nSMAuctions parallel/legacy bypass\n- **Permission:** `smauctions.bypass.parallel`\n- **Purpose:** Authorized parallel/test access where supported.\n\n#### `/smstreaks ...`\n- **Permission:** `smstreaks.admin`\n- **Purpose:** SMStreaks administration.\n\nSMEnderChest capacity administration\n- **Permission:** `smenderchest.admin.capacity`\n- **Purpose:** Administrative capacity controls.\n\nSMEnderChest overflow administration\n- **Permission:** `smenderchest.admin.overflow`\n- **Purpose:** Overflow/recovery controls.\n\nSMEnderChest override\n- **Permission:** `smenderchest.admin.override`\n- **Purpose:** High-level Ender Chest override capability.\n\n#### `/smtutorial ...`\n- **Permission:** `smtutorial.admin`\n- **Purpose:** SMTutorial administration.\n\nSMTutorial force controls\n- **Permission:** `smtutorial.admin.force`\n- **Purpose:** Force supported tutorial actions.\n\nSMTutorial location controls\n- **Permission:** `smtutorial.admin.locations`\n- **Purpose:** Manage tutorial locations.\n\nSMTutorial reset controls\n- **Permission:** `smtutorial.admin.reset`\n- **Purpose:** Reset tutorial state where supported.\n\n### Restrictions / intentionally unavailable access\n- No additional rank-specific restriction note beyond inherited policy.",
    "sort_order": 15
  },
  {
    "id": 570,
    "section": "handbook",
    "rank_name": "Developer",
    "title": "Developer Staff Handbook",
    "content": "Developers is the technical implementation branch. It inherits the Staff Manager/Manager operational stack and adds explicit core-suite administrative access and SMStaff reload capability.\n\n### What you should normally handle\n- Investigate plugin-level defects and implementation issues.\n- Use SMCore/SMAudit/SMAdmin information to reproduce and diagnose problems.\n- Reload supported SMStaff configuration when appropriate.\n- Coordinate with Informatics for production state/recovery and with Server Lead/Owner for high-impact deployment decisions.\n- Maintain the technical correctness of first-party systems within the responsibilities assigned by leadership.\n\n### Normal workflow\n1. Reproduce or identify the problem using diagnostics and audit data.\n2. Separate configuration/state issues from actual code defects.\n3. Preserve relevant logs/diagnostics before changing or restarting systems.\n4. Apply or coordinate the smallest safe technical fix.\n5. Validate the fix against the real production/staging behavior.\n6. Hand production recovery/state work to Informatics/management when appropriate.\n\n### Escalate when\n- The decision is organizational/policy rather than technical.\n- Production authority beyond your permission scope is required.\n- A Server Lead/Owner decision is required for rollout, rollback, or high-risk change.\n\n### Primary tools for this rank\n- All Staff Manager/Manager and lower tools\n- SMCore admin\n- SMAudit admin\n- SMAdmin admin\n- SMStaff reload\n\n### Rank-specific notes\n- The canonical LuckPerms group is 'developers' (plural).\n- Do not document nonexistent singular 'developer' as a real LP group.",
    "sort_order": 16
  },
  {
    "id": 571,
    "section": "permissions",
    "rank_name": "Developer",
    "title": "Developer Commands & Permissions",
    "content": "- **LuckPerms weight:** 900\n- **Parents:** staffmanager, immortal\n\n### Rank summary\nDeveloper branch. Inherits the Staff Manager/Manager operational stack and adds explicit core-suite administration plus SMStaff reload access.\n\n### Inherited access\n- All Staff Manager / Manager / lower staff tools.\n- Immortal player-rank inheritance (details deferred).\n\n### Commands / permissions / features\n#### `/smadmin ...`\n- **Permission:** `smadmin.admin`\n- **Purpose:** SMAdmin administration.\n\n#### `/smaudit ...`\n- **Permission:** `smaudit.admin`\n- **Purpose:** SMAudit administration.\n\n#### `/smcore ...`\n- **Permission:** `smcore.admin`\n- **Purpose:** SMCore administration.\n\n#### `/smstaff reload`\n- **Permission:** `smstaff.reload`\n- **Purpose:** Reload supported SMStaff configuration.\n\n### Restrictions / intentionally unavailable access\n- Canonical LP group name: developers (plural). There is no LuckPerms group named developer.\n- LuckPerms unrestricted escalation: Manager-level restrictions remain unless explicitly overridden higher.",
    "sort_order": 16
  },
  {
    "id": 572,
    "section": "handbook",
    "rank_name": "Server Lead",
    "title": "Server Lead Staff Handbook",
    "content": "Server Lead is the highest staff leadership tier below Owner. It inherits the Developers -> Staff Manager -> Manager stack and adds full SMStaff administration.\n\n### What you should normally handle\n- Coordinate the staff team and major server operations.\n- Take ownership of severe cross-department incidents.\n- Use full SMStaff administrative access for legitimate leadership actions.\n- Coordinate technical, moderation, management, and recovery work.\n- Act as the primary escalation point below Owner for high-impact operational or staff issues.\n\n### Normal workflow\n1. Identify which department owns the incident.\n2. Assign or coordinate the appropriate staff/technical response.\n3. Use leadership-level SMStaff administration when normal hierarchy is insufficient.\n4. Ensure high-impact changes have an appropriate backup/recovery plan.\n5. Verify the server and affected systems after resolution.\n6. Escalate only final ownership/policy decisions requiring Owner authority.\n\n### Escalate when\n- Global wildcard/Owner-only authority is required.\n- The decision affects ownership-level business, payment, legal, or irreversible server direction.\n- An explicit inherited false permission still blocks a required action that only Owner should override.\n\n### Primary tools for this rank\n- All Developers / Staff Manager / Manager and lower tools\n- Full SMStaff administration\n\n### Rank-specific notes\n- Server Lead is deliberately distinct from Owner: it is extremely powerful but not configured with the global '*' permission wildcard.\n- Where a lower inherited explicit false exists, it remains effective unless explicitly overridden.",
    "sort_order": 17
  },
  {
    "id": 573,
    "section": "permissions",
    "rank_name": "Server Lead",
    "title": "Server Lead Commands & Permissions",
    "content": "- **LuckPerms weight:** 950\n- **Parents:** developers, immortal\n\n### Rank summary\nTop leadership tier below Owner. Inherits the Developers -> Staff Manager -> Manager stack and adds full SMStaff administrative access.\n\n### Inherited access\n- All Developers / Staff Manager / Manager / lower staff tools.\n- Immortal player-rank inheritance (details deferred).\n\n### Commands / permissions / features\nFull SMStaff administration\n- **Permission:** `smstaff.admin`\n- **Purpose:** Administrative access across the SMStaff system, subject to any explicit command safety design.\n\n### Restrictions / intentionally unavailable access\n- Owner global wildcard: Not granted; Server Lead remains permission-scoped rather than '*' full-control.\n- LuckPerms lower-rank false restrictions: Remain effective unless an explicit higher-rank true override exists.",
    "sort_order": 17
  },
  {
    "id": 574,
    "section": "handbook",
    "rank_name": "Owner",
    "title": "Owner Staff Handbook",
    "content": "Owner is the final authority for Spear & Mace SMP. The role has global permission-based access and is designed to operate without remaining OP during normal server operation.\n\n### What you should normally handle\n- Final operational and staff escalation decisions.\n- Resolve permission/hierarchy issues that intentionally exceed Manager/Server Lead authority.\n- Perform or authorize the highest-risk server changes.\n- Coordinate leadership, technical, store, moderation, and recovery decisions.\n- Use global access only when the task actually requires Owner-level authority.\n\n### Normal workflow\n1. Determine whether the issue can safely be delegated to the appropriate staff branch.\n2. If Owner action is required, review the relevant status/audit/backup context first.\n3. Use the smallest necessary command/permission change or operational action.\n4. Verify the result.\n5. Return normal ownership/security state after temporary changes.\n\n### Escalate when\n- Owner is the terminal escalation point; external/provider support may be needed when the issue lies outside the Minecraft server itself.\n\n### Primary tools for this rank\n- Global '*' permission access\n- All inherited staff/management/developer tools\n- Direct SMPVP bypass override\n- Direct LuckPerms editor/group-permission/user-parent overrides\n\n### Rank-specific notes\n- Owner is intended to remain deopped in normal operation while using LuckPerms-based authority.\n- A third-party plugin that hard-codes isOp() can still behave differently; that is outside the normal permission model.",
    "sort_order": 18
  },
  {
    "id": 575,
    "section": "permissions",
    "rank_name": "Owner",
    "title": "Owner Commands & Permissions",
    "content": "- **LuckPerms weight:** 1000\n- **Parents:** serverlead, immortal\n\n### Rank summary\nHighest authority. Owner is configured for global permission-based access while remaining deopped for normal operation.\n\n### Inherited access\n- All Server Lead / Developers / management / staff permissions.\n- Immortal player-rank inheritance (details deferred).\n\n### Commands / permissions / features\nGlobal permission wildcard\n- **Permission:** `* = true`\n- **Purpose:** Full permission-based access across SM Suite and other plugins.\n\nSMPVP bypass override\n- **Permission:** `smpvp.bypass = true`\n- **Purpose:** Direct Owner override so inherited Manager false does not block Owner.\n\nLuckPerms editor override\n- **Permission:** `luckperms.editor = true`\n- **Purpose:** Direct Owner override.\n\nLuckPerms group permission override\n- **Permission:** `luckperms.group.permission = true`\n- **Purpose:** Direct Owner override.\n\nLuckPerms user-parent override\n- **Permission:** `luckperms.user.parent = true`\n- **Purpose:** Direct Owner override.\n\nAll permission-based plugin command families\n- **Permission:** `*`\n- **Purpose:** Owner does not need individual per-plugin wildcard grants when the plugin respects Bukkit/LuckPerms permissions.\n\n### Restrictions / intentionally unavailable access\n- No additional rank-specific restriction note beyond inherited policy.\n\n### Operational / plugin notes\n- Owner is designed to operate without staying OP.\n- If a third-party plugin hard-codes an isOp() check instead of a permission node, that specific plugin behavior is outside LuckPerms; SM Suite is designed around permission checks.\n\n### Source-of-truth basis\n- Final SMSMP LuckPerms audit completed before this documentation pass.\n- Production SMStaff permission/command mapping.\n- Production SM Suite configs, testing guides, and validated command families.\n- Legacy permissions explicitly disabled during the audit are not presented as usable features.",
    "sort_order": 18
  },
  {
    "id": 576,
    "section": "plugins",
    "rank_name": null,
    "title": "Connected Staff Rank & Inheritance Architecture",
    "content": "### Overview\nSpearMace SMP uses a unified inheritance model where staff members inherit perks and privileges from corresponding paid/donor player ranks as well as cumulative tools from lower staff tiers.\n\n### Paid / Donor Rank Inheritance Mapping\nStaff ranks automatically receive the perks, cosmetics, claim allowances, and queue priorities of their mapped player donor ranks:\n\n- **Trainee** → Inherits **Member**\n- **Helper** → Inherits **Sentinel**\n- **Jr. Mod** → Inherits **Crusader**\n- **Mod** → Inherits **Champion**\n- **Sr. Mod / Trial Admin / Admin** → Inherits **Ascendant**\n- **Sr. Admin / Trial Manager / Manager & Leadership / Builder** → Inherits **Immortal** *(Full Store/Donor Perks)*\n\n### Staff Hierarchy & Moderation Priority\nSMStaff enforces hierarchy levels to regulate moderation authority (higher tiers moderate lower tiers):\n\n| Rank Tier | SMStaff Level | Inherited Staff Toolset | Connected Donor Tier |\n| :--- | :---: | :--- | :--- |\n| **Owner** | 100 | Full global administration & bypass overrides | Immortal |\n| **Server Lead** | 95 | Full SMStaff admin suite & system controls | Immortal |\n| **Developers** | 90 | Core suite admin, reload & diagnostic controls | Immortal |\n| **Informatics** | 88 | Comprehensive first-party SMSuite administration | Immortal |\n| **Staff Manager** | 85 | Manager toolset + SMStaff hierarchy bypass | Immortal |\n| **Ticket / Promo Manager** | 80–82 | Manager operational administration suite | Immortal |\n| **Manager** | 75 | Server backups, world administration & diagnostics | Immortal |\n| **Trial Manager** | 70 | Maintenance controls & backup utilities | Immortal |\n| **Sr. Admin** | 65 | CoreProtect rollbacks, audit & IRP recovery | Immortal |\n| **Admin** | 60 | Freeze/SS, offline inventory edits & crate admin | Ascendant |\n| **Trial Admin** | 55 | Sr. Mod evaluation tier with Ascendant perks | Ascendant |\n| **Sr. Mod** | 50 | In-game inventory/Ender Chest inspect & teleport | Ascendant |\n| **Mod** | 45 | Bans, unbans, vanish, spectate & staff mode | Champion |\n| **Jr. Mod** | 40 | Mutes, kicks, temp-mutes & staff notes | Crusader |\n| **Helper** | 30 | Warnings & anti-cheat alert visibility | Sentinel |\n| **Trainee** | 20 | Staff panel, reports & inspection tools | Member |\n| **Builder** | 0 | Specialized builder identity (No moderation tools) | Immortal |",
    "sort_order": 1
  },
  {
    "id": 577,
    "section": "plugins",
    "rank_name": null,
    "title": "SMSuite Ecosystem Overview",
    "content": "### SMSuite Architecture\nThe SpearMace ecosystem utilizes modular server architecture including:\n- **SMFluxBridge**: Real-time FluxStore store synchronizer and purchase delivery.\n- **SMAudit**: Automated security monitoring, IP tracking, and verification webhook logging.\n- **SMCommands**: In-game moderation utilities and custom rank permission handlers.",
    "sort_order": 2
  }
];

function getStaffAccounts() {
  try {
    const saved = localStorage.getItem("sm_staff_accounts");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const kalz = parsed.find(a => a.code === 'KALZ!9$8vM' || a.name === 'Kalz');
        if (kalz) {
          kalz.name = 'Kalz';
          kalz.minecraftUsername = 'UknUnc';
          kalz.rank = 'Developer';
          kalz.isSuperAdmin = true;
        }
        const g660 = parsed.find(a => a.code === 'G660$9!2kL' || a.name === 'G660');
        if (g660) {
          g660.name = 'G660';
          g660.minecraftUsername = 'G660';
          g660.rank = 'Owner';
          g660.isSuperAdmin = true;
        }
        const riceIdx = parsed.findIndex(a => a.code === 'RICE$7!9vP' || a.name === 'Rice');
        if (riceIdx !== -1) {
          parsed.splice(riceIdx, 1);
        }
        const vapo = parsed.find(a => a.code === 'VAPO$8!2wK');
        if (vapo) {
          vapo.isSuperAdmin = false;
        }
        const fritsyy = parsed.find(a => a.name === 'Fritsyy' || a.minecraftUsername === 'Fritsyy');
        if (fritsyy) {
          fritsyy.rank = 'Mod';
        }
        const nyx = parsed.find(a => a.name === 'RaccoonNyx' || a.minecraftUsername === 'RaccoonNyx');
        if (nyx) {
          nyx.rank = 'Jr. Mod';
        }
        saveStaffAccounts(parsed);
        return parsed;
      }
    }
  } catch (e) {}
  try {
    localStorage.setItem("sm_staff_accounts", JSON.stringify(DEFAULT_STAFF_ACCOUNTS));
  } catch (e) {}
  return DEFAULT_STAFF_ACCOUNTS;
}

function saveStaffAccounts(accounts) {
  try {
    localStorage.setItem("sm_staff_accounts", JSON.stringify(accounts));
  } catch (e) {}
}

function getStaffDocuments() {
  try {
    const saved = localStorage.getItem("sm_staff_documents");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        parsed.forEach(doc => {
          if (doc.content) {
            doc.content = doc.content.replace(/\n*### Website note for Kali[\s\S]*$/i, '');
            doc.content = doc.content.replace(/\n*### Website implementation notes for Kali[\s\S]*$/i, '');
            doc.content = doc.content.replace(/\n*END OF FILE\s*$/i, '');
            doc.content = doc.content.trim();
          }
        });
        return parsed;
      }
    }
  } catch (e) {}
  return DEFAULT_STAFF_DOCUMENTS;
}

function saveStaffDocuments(docs) {
  try {
    localStorage.setItem("sm_staff_documents", JSON.stringify(docs));
  } catch (e) {}
}
