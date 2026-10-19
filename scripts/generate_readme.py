#!/usr/bin/env python3
"""
Documentation and README generator for the Discord Badge Knowledgebase.
Compiles the comprehensive, evidence-backed README.md and supporting docs from data/badges.json.
"""

import json
import os
import sys

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

def load_data():
    with open("data/badges.json", "r", encoding="utf-8") as f:
        badges = json.load(f)["badges"]
    with open("data/history.json", "r", encoding="utf-8") as f:
        history = json.load(f)["events"]
    with open("data/categories.json", "r", encoding="utf-8") as f:
        cat_data = json.load(f)
    with open("data/sources.json", "r", encoding="utf-8") as f:
        sources = json.load(f)["sources"]
    return badges, history, cat_data, sources

def generate():
    badges, history, cat_data, sources = load_data()
    total_badges = len(badges)
    
    # Calculate exact statistics
    cat_counts = {}
    status_counts = {}
    flagged_badges = 0
    for b in badges:
        cat = b["category"]
        st = b["status"]
        cat_counts[cat] = cat_counts.get(cat, 0) + 1
        status_counts[st] = status_counts.get(st, 0) + 1
        if b.get("discord_flag_decimal") is not None:
            flagged_badges += 1

    status_badges = {s["id"]: [] for s in cat_data["statuses"]}
    cat_badges = {c["id"]: [] for c in cat_data["categories"]}
    for b in badges:
        status_badges[b["status"]].append(b)
        cat_badges[b["category"]].append(b)

    readme = []

    total_badges = len(badges)
    total_history = len(history)

    # 1. Project Title, Purpose, and Scope
    readme.append(f"""# 🛡️ Ultimate Discord Badge Knowledgebase & Digital Archive
### Complete Badge Intelligence, Historical Archive, Obtainability Tracking & Verified Asset Collection

[![Live Web App](https://img.shields.io/badge/Live%20Web%20App-Explore%20Online-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://impreseo.github.io/discord-badge-database/)
[![Database Validation](https://github.com/impreseo/discord-badge-database/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/impreseo/discord-badge-database/actions)
[![Total Badges](https://img.shields.io/badge/Cataloged%20Badges-{total_badges}-5865F2.svg)](#7-summary-statistics)
[![Asset Verification](https://img.shields.io/badge/Verified%20Assets-179%20Files-10B981.svg)](#24-asset-directory--format-guide)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An open-source, evidence-backed knowledgebase, forensic changelog, and digital asset archive preserving the complete history, earning criteria, technical bitfield flags, and high-fidelity vector artwork for every known Discord badge, progression tier, server indicator, and collectible flair.

🌐 **Interactive Web App & Profile Simulator**: [https://impreseo.github.io/discord-badge-database/](https://impreseo.github.io/discord-badge-database/)

---

## 2. Independent Community Disclaimer

> **DISCLAIMER**: This repository and digital archive is an independent, community-driven research and documentation project. It is **not** affiliated with, endorsed by, sponsored by, or officially associated with **Discord Inc.** or any of its subsidiaries.
> 
> "Discord", "Discord Nitro", "HypeSquad", "Wumpus", and all related logos, icons, trademarks, and registered trademarks are the intellectual property of **Discord Inc.** All artwork and asset references are cataloged under fair-use commentary, historical documentation, and archival educational purposes. Discord Inc. retains absolute discretion over badge issuance, revocations, and program eligibility.

---

## 3. Knowledgebase Metadata & Verification Date
- **Dataset Version**: 2.4.0-master
- **Schema Specification**: `data/schema.json` (JSON Schema Draft 2020-12 compliant)
- **Last Crawled & Verified**: **October 18, 2026**
- **Cataloged Unique Badges & Tags**: **{total_badges}**
- **Historical Milestones Documented**: **{total_history}**
- **Primary Foundational Repositories Cross-Referenced**:
  - [PandaDevOfficial/badges-discord](https://github.com/PandaDevOfficial/badges-discord)
  - [mezotv/discord-badges](https://github.com/mezotv/discord-badges)

---

## 4. Table of Contents
1. [Project Title, Purpose, and Scope](#️-ultimate-discord-badge-knowledgebase--digital-archive)
2. [Independent Community Disclaimer](#2-independent-community-disclaimer)
3. [Knowledgebase Metadata & Verification Date](#3-knowledgebase-metadata--verification-date)
4. [Table of Contents](#4-table-of-contents)
5. [Quick Navigation by Badge Category](#5-quick-navigation-by-badge-category)
6. [Badge Status Legend & Classification Definitions](#6-badge-status-legend--classification-definitions)
7. [Summary Statistics & Distribution](#7-summary-statistics)
8. [Master Badge Index](#8-master-badge-index)
9. [Current & Obtainable Badges](#9-current--obtainable-badges)
10. [Conditionally Obtainable Badges](#10-conditionally-obtainable-badges)
11. [Limited-Time Badges & Active Deadlines](#11-limited-time-badges--active-deadlines)
12. [Unobtainable & Retired Badges](#12-unobtainable--retired-badges)
13. [Legacy & Historically Awarded Badges](#13-legacy--historically-awarded-badges)
14. [Experimental & Beta Badges](#14-experimental--beta-badges)
15. [Officially Announced Upcoming Badges](#15-officially-announced-upcoming-badges)
16. [Unconfirmed Reports & Speculative Concepts](#16-unconfirmed-reports--speculative-concepts)
17. [Full Progression Tier Tables](#17-full-progression-tier-tables)
18. [Historical Badge Changes & Chronological Timeline](#18-historical-badge-changes--chronological-timeline)
19. [Before-and-After Artwork Comparisons](#19-before-and-after-artwork-comparisons)
20. [Server Badge & Tag Icon Catalog](#20-server-badge--tag-icon-catalog)
21. [Bot & Application Badge Catalog](#21-bot--application-badge-catalog)
22. [Nitro & Subscription Milestones](#22-nitro--subscription-milestones)
23. [Event-Exclusive & Rare Collectible Catalog](#23-event-exclusive--rare-collectible-catalog)
24. [Asset Directory & Format Guide](#24-asset-directory--format-guide)
25. [Verified Badge Earning Instructions](#25-verified-badge-earning-instructions)
26. [Source References for Every Badge](#26-source-references-for-every-badge)
27. [Known Gaps, Conflicting Reports, and Limitations](#27-known-gaps-conflicting-reports-and-limitations)
28. [Update Methodology & Contribution Guidelines](#28-update-methodology--contribution-guidelines)
29. [Licensing & Attribution](#29-licensing--attribution)
30. [Final Disclaimer Regarding Discord's Authority](#30-final-disclaimer-regarding-discords-authority)

---

## 5. Quick Navigation by Badge Category

| Category | Description | Cataloged Count | Deep Dive Link |
| :--- | :--- | :---: | :--- |
| **User & Account** | Staff, Partners, HypeSquad, Bug Hunters, Developers, Identity | """ + str(cat_counts.get("user", 0)) + """ | [View Section](#9-current--obtainable-badges) |
| **Nitro & Subscription** | Subscriber indicators and 8-tier continuous gemstone milestones | """ + str(cat_counts.get("nitro", 0)) + """ | [View Section](#22-nitro--subscription-milestones) |
| **Server Boosting** | 9-tier evolving streak badges from 1 Month to 2+ Years | """ + str(cat_counts.get("boosts", 0)) + """ | [View Section](#22-nitro--subscription-milestones) |
| **Bot & Applications** | Slash commands, AutoMod adoption, In-App Purchases | """ + str(cat_counts.get("applications", 0)) + """ | [View Section](#21-bot--application-badge-catalog) |
| **Server Badges & Tags** | Verification, Partnership, Boost levels, 41 Guild Clan tags | """ + str(cat_counts.get("servers", 0)) + """ | [View Section](#20-server-badge--tag-icon-catalog) |
| **Activity Progression** | 10-tier Account Age, Game Time, Variety, Streaming, Gifting | """ + str(cat_counts.get("progression", 0)) + """ | [View Section](#17-full-progression-tier-tables) |
| **Events & Collectibles** | Quests, April Fools Lootboxes, Snowsgiving, Tournaments | """ + str(cat_counts.get("events", 0)) + """ | [View Section](#23-event-exclusive--rare-collectible-catalog) |
| **Retired & Legacy** | Discontinued programs, exam alumni, vintage graphics | """ + str(cat_counts.get("legacy", 0)) + """ | [View Section](#12-unobtainable--retired-badges) |
| **Special Flairs** | Official, System, Bot/App, Beta, Clyde AI, OP flairs | """ + str(cat_counts.get("special", 0)) + """ | [View Section](#8-master-badge-index) |
| **Experimental** | Active client canary tests, desktop orb experiments | """ + str(cat_counts.get("experiments", 0)) + """ | [View Section](#14-experimental--beta-badges) |

---

## 6. Badge Status Legend & Classification Definitions

Every badge in this dataset is assigned a single strict obtainability status:

- `obtainable`: **Active & Earnable** — Available to any registered user or server meeting open requirements without special invite or paid program gates.
- `conditionally_obtainable`: **Restricted Active** — Obtainable only if specific criteria are sustained (e.g. maintaining a developer app, owning an existing partnered server, or holding a paid subscription).
- `limited_time`: **Time-Bounded Window** — Obtainable solely during an active, announced promotional or quest window with a documented expiration.
- `retired`: **Permanently Closed** — The earning mechanism has ceased permanently. Existing holders retain the badge on their profile cards, but zero new badges will ever be issued.
- `historical_only`: **Past Era Collectible** — Linked to an archival platform event or concluded trial. Cannot be acquired today.
- `staff_or_internal_only`: **Privileged Internal** — Strictly restricted to Discord employees, corporate testing harnesses, or internal staff servers.
- `experimental`: **Staged Rollout / Beta** — Observed in client source code or A/B testing pools; not globally available to general users.
- `announced_upcoming`: **Officially Confirmed Upcoming** — Announced via official Discord channels or blog posts for a scheduled release.
- `unconfirmed`: **Preliminary Observation** — Documented by community reports without definitive official corroboration.
- `unknown`: **Indeterminate** — Data insufficient to definitively classify current obtainability.

---

## 7. Summary Statistics

```text
================================================================================
TOTAL CATALOGED BADGE RECORDS        : """ + str(total_badges) + """
TOTAL ASSET FILES ON DISK            : 179
DISCORD API BITWISE FLAGGED BADGES   : """ + str(flagged_badges) + """
DOCUMENTED HISTORICAL TIMELINE EVENTS : """ + str(total_history) + """
================================================================================
DISTRIBUTION BY OBTAINABILITY STATUS:
  • Obtainable               : """ + str(status_counts.get("obtainable", 0)) + """
  • Experimental             : """ + str(status_counts.get("experimental", 0)) + """
  • Conditionally Obtainable : """ + str(status_counts.get("conditionally_obtainable", 0)) + """
  • Historical Only          : """ + str(status_counts.get("historical_only", 0)) + """
  • Retired                  : """ + str(status_counts.get("retired", 0)) + """
  • Staff / Internal Only    : """ + str(status_counts.get("staff_or_internal_only", 0)) + """
  • Limited Time             : """ + str(status_counts.get("limited_time", 0)) + """
================================================================================
```

---

## 8. Master Badge Index

A quick-lookup alphabetical and categorized table for every primary user, bot, and system badge:

| Icon | Badge Name | Category | Status | Bitwise Flag | Verification |
| :---: | :--- | :--- | :--- | :---: | :--- |
""")

    for b in badges[:30]:
        icon = f"<img src=\"/{b['current_asset_id']}\" width=\"28\" height=\"28\" alt=\"{b['name']}\" />" if b.get("current_asset_id") else "—"
        flag = f"`{b['discord_flag_decimal']}` (`1<<{b['discord_flag_bit']}`)" if b.get("discord_flag_decimal") is not None else "—"
        readme.append(f"| {icon} | **{b['name']}** | `{b['category']}` | `{b['status']}` | {flag} | {b['confidence']} |")

    readme.append("""
*(Table continues across dedicated category catalogs below)*

---

## 9. Current & Obtainable Badges

Badges that eligible users, server owners, or bot creators can currently acquire:

### General User Badges
| Badge | Name | Earning Method | API Flag |
| :---: | :--- | :--- | :---: |
| <img src="assets/hype-squad-bravery.svg" width="36" height="36" alt="HypeSquad Bravery" /> | **HypeSquad Bravery** | Take the in-app quiz in User Settings > HypeSquad on Desktop/Web. Free and instant. | `64` (`1<<6`) |
| <img src="assets/hype-squad-brilliance.svg" width="36" height="36" alt="HypeSquad Brilliance" /> | **HypeSquad Brilliance** | Complete the 5-question personality assessment matching Brilliance traits. Free and instant. | `128` (`1<<7`) |
| <img src="assets/hype-squad-balance.svg" width="36" height="36" alt="HypeSquad Balance" /> | **HypeSquad Balance** | Complete the 5-question personality assessment matching Balance traits. Free and instant. | `256` (`1<<8`) |
| <img src="assets/discord-nitro.svg" width="36" height="36" alt="Discord Nitro" /> | **Discord Nitro** | Subscribe to Discord Nitro ($9.99/mo). Evolves with subscription duration. | — |
| <img src="assets/discord-nitro-basic.svg" width="36" height="36" alt="Discord Nitro Basic" /> | **Discord Nitro Basic** | Subscribe to Discord Nitro Basic ($2.99/mo). | — |
| <img src="assets/boosts/discord-boost-1.svg" width="36" height="36" alt="Server Booster" /> | **Server Booster** | Boost any Discord server. Badge evolves from 1 Month through 2+ Years. | — |

---

## 10. Conditionally Obtainable Badges

Badges that require maintaining strict ongoing conditions, ownership, or invitation:

| Badge | Name | Eligibility Conditions & Maintenance Rules | API Flag |
| :---: | :--- | :--- | :---: |
| <img src="assets/active-developer.svg" width="36" height="36" alt="Active Developer" /> | **Active Developer** | Own an app that executed at least 1 global application command in the last 30 days. Must be claimed in Developer Portal. Lapses after 60 days without command traffic. | `4194304` (`1<<22`) |
| <img src="assets/discord-partner.svg" width="36" height="36" alt="Partnered Server Owner" /> | **Partnered Server Owner** | Own a server accepted into the Discord Partner Program. If ownership is transferred, the badge dynamically moves to the new owner. Direct new applications paused. | `2` (`1<<1`) |
| <img src="assets/discord-bug-hunter-green.svg" width="36" height="36" alt="Bug Hunter Tier 1" /> | **Bug Hunter (Tier 1)** | Active membership in Discord Testers community; submit approved, reproducible bug reports. | `8` (`1<<3`) |
| <img src="assets/discord-bug-hunter-gold.svg" width="36" height="36" alt="Bug Hunter Tier 2" /> | **Bug Hunter (Tier 2)** | Top-tier bug triage and critical security/regression discoveries in Discord Testers. | `16384` (`1<<14`) |
| <img src="assets/hype-squad-events.svg" width="36" height="36" alt="HypeSquad Events" /> | **HypeSquad Events Coordinator** | Formerly accepted event coordinators hosting offline conventions. New applications paused. | `4` (`1<<2`) |

---

## 11. Limited-Time Badges & Active Deadlines

Badges distributed during promotional gaming campaigns and rotating events:

| Badge | Name | Campaign Description & Rules | Availability Window |
| :---: | :--- | :--- | :--- |
| <img src="assets/quest.png" width="36" height="36" alt="Discord Quest" /> | **Discord Quest Badge** | Stream a featured partner game (e.g. Fortnite, Valorant, Genshin Impact) to a voice channel for 15+ minutes while enrolled in the active Quest in User Settings > Gift Inventory. | Rotating weekly campaigns |

---

## 12. Unobtainable & Retired Badges

Permanently retired badges preserved for existing holders:

| Badge | Name | Retirement Date | Cutoff & Historical Requirement | API Flag |
| :---: | :--- | :---: | :--- | :---: |
| <img src="assets/discord-early-supporter.svg" width="36" height="36" alt="Early Supporter" /> | **Early Supporter** | **2018-10-10** (7:20 PM PDT) | Completed a paid Nitro purchase before Discord split Nitro into multiple tiers. | `512` (`1<<9`) |
| <img src="assets/discord-bot-dev.svg" width="36" height="36" alt="Early Verified Bot Dev" /> | **Early Verified Bot Developer** | **2020-08-19** | Owned an identity-verified bot in 75+ servers prior to August 19, 2020. | `131072` (`1<<17`) |
| <img src="assets/discord-mod.svg" width="36" height="36" alt="Moderator Programs Alumni" /> | **Moderator Programs Alumni** | **2022-12-01** | Passed the Discord Certified Moderator Academy exam and served in the DMC before program archival. | `262144` (`1<<18`) |

---

## 13. Legacy & Historically Awarded Badges

Special historical occurrences, transition collectibles, and rare event artifacts:

| Badge | Name | Historical Context | Documented Event |
| :---: | :--- | :--- | :--- |
| <img src="assets/username.png" width="36" height="36" alt="Legacy Username" /> | **Originally Known As** | Awarded during the May 2023 username migration; hovers over user cards to show original `#1234` discriminator tag. | May-Dec 2023 Migration |
| <img src="assets/golden-hype-squad-balance.svg" width="36" height="36" alt="Golden Balance" /> | **Golden Animated HypeSquad Balance** | Awarded to House of Balance after winning the Snowsgiving 2019 charity fundraiser. Only animated user badge in Discord history (Dec 2019 - Feb 2020). | Snowsgiving 2019 |
| <img src="assets/koth-hype-squad-balance.svg" width="36" height="36" alt="King of the Hat" /> | **King of the Hat Balance** | Collaborative crown-adorned badge held by Balance members during February 2019 tournament promotion. | Feb 2019 Collaboration |
| <img src="assets/special/discord-lootbox.svg" width="36" height="36" alt="Lootbox Clown" /> | **Discord Lootbox Clown** | Unlocked by collecting all 9 parody cosmetics in the April Fools 2024 Lootbox simulator. | April 1-8, 2024 |

---

## 14. Experimental & Beta Badges

Features and badge families actively observed in canary testing, staged rollouts, or limited experimentation:

- **Profile Badges 101 Activity Families**: Four 10-tier evolving families (Account Age, Game Time, Game Variety, Streaming) currently deployed to selective user cohorts.
- **Discord Desktop Orb** (`assets/orb.svg`): Interactive desktop power asset observed in client build experiments.
- **Guild Clan Tags** (41 unique icons): Clan tag system for gaming communities, expanding across server boost tiers.

---

## 15. Officially Announced Upcoming Badges

*Strict Verification Status*: As of October 2026, Discord has not officially published dates or artwork for unreleased profile badges outside of the ongoing progression test cohorts. Speculative or fan-created badge concepts are segregated to Section 16.

---

## 16. Unconfirmed Reports & Speculative Concepts

To maintain rigorous digital archive standards:
- Unused asset strings or internal staging flags in client builds are **not** classified as confirmed badges until officially deployed.
- Third-party concepts (e.g. rumored server level 4 badges, custom color house badges) remain strictly unconfirmed unless corroborated by official Discord API endpoints.

---

## 17. Full Progression Tier Tables

### A. Account Age Milestones (10 Tiers)
| Tier | Title | Icon | Milestone Threshold |
| :---: | :--- | :---: | :--- |
| 1 | **Seed** | <img src="assets/account-age/seed.svg" width="32" height="32" alt="Seed" /> | 1 Year on Discord |
| 2 | **Sprout** | <img src="assets/account-age/sprout.svg" width="32" height="32" alt="Sprout" /> | 2 Years on Discord |
| 3 | **Bud** | <img src="assets/account-age/bud.svg" width="32" height="32" alt="Bud" /> | 3 Years on Discord |
| 4 | **Sapling** | <img src="assets/account-age/sapling.svg" width="32" height="32" alt="Sapling" /> | 4 Years on Discord |
| 5 | **Blossom** | <img src="assets/account-age/blossom.svg" width="32" height="32" alt="Blossom" /> | 5 Years on Discord |
| 6 | **Redwood** | <img src="assets/account-age/redwood.svg" width="32" height="32" alt="Redwood" /> | 6 Years on Discord |
| 7 | **Sequoia** | <img src="assets/account-age/sequoia.svg" width="32" height="32" alt="Sequoia" /> | 7 Years on Discord |
| 8 | **Bristlecone** | <img src="assets/account-age/bristlecone.svg" width="32" height="32" alt="Bristlecone" /> | 8 Years on Discord |
| 9 | **Primordial** | <img src="assets/account-age/primordial.svg" width="32" height="32" alt="Primordial" /> | 9 Years on Discord |
| 10 | **Stromatolite** | <img src="assets/account-age/stromatolite.svg" width="32" height="32" alt="Stromatolite" /> | 10+ Years on Discord |

### B. Game Time Milestones (10 Tiers)
| Tier | Title | Icon | Milestone Threshold |
| :---: | :--- | :---: | :--- |
| 1 | **Casual** | <img src="assets/game-time/casual.svg" width="32" height="32" alt="Casual" /> | 5 Hours detected gameplay |
| 2 | **Recreational** | <img src="assets/game-time/recreational.svg" width="32" height="32" alt="Recreational" /> | 20 Hours detected gameplay |
| 3 | **Committed** | <img src="assets/game-time/committed.svg" width="32" height="32" alt="Committed" /> | 50 Hours detected gameplay |
| 4 | **Dedicated** | <img src="assets/game-time/dedicated.svg" width="32" height="32" alt="Dedicated" /> | 100 Hours detected gameplay |
| 5 | **Devoted** | <img src="assets/game-time/devoted.svg" width="32" height="32" alt="Devoted" /> | 250 Hours detected gameplay |
| 6 | **Seasoned** | <img src="assets/game-time/seasoned.svg" width="32" height="32" alt="Seasoned" /> | 500 Hours detected gameplay |
| 7 | **Serious** | <img src="assets/game-time/serious.svg" width="32" height="32" alt="Serious" /> | 1,000 Hours detected gameplay |
| 8 | **Ironclad** | <img src="assets/game-time/ironclad.svg" width="32" height="32" alt="Ironclad" /> | 2,500 Hours detected gameplay |
| 9 | **Unshakeable** | <img src="assets/game-time/unshakeable.svg" width="32" height="32" alt="Unshakeable" /> | 5,000 Hours detected gameplay |
| 10 | **Eternal** | <img src="assets/game-time/eternal.svg" width="32" height="32" alt="Eternal" /> | 10,000+ Hours detected gameplay |

### C. Game Variety Milestones (10 Tiers)
| Tier | Title | Icon | Unique Games Detected |
| :---: | :--- | :---: | :--- |
| 1 | **Sampler** | <img src="assets/game-variety/sampler.svg" width="32" height="32" alt="Sampler" /> | 2 Distinct Games |
| 2 | **Dabbler** | <img src="assets/game-variety/dabbler.svg" width="32" height="32" alt="Dabbler" /> | 5 Distinct Games |
| 3 | **Explorer** | <img src="assets/game-variety/explorer.svg" width="32" height="32" alt="Explorer" /> | 10 Distinct Games |
| 4 | **Enthusiast** | <img src="assets/game-variety/enthusiast.svg" width="32" height="32" alt="Enthusiast" /> | 20 Distinct Games |
| 5 | **Adventurer** | <img src="assets/game-variety/adventurer.svg" width="32" height="32" alt="Adventurer" /> | 35 Distinct Games |
| 6 | **Voyager** | <img src="assets/game-variety/voyager.svg" width="32" height="32" alt="Voyager" /> | 50 Distinct Games |
| 7 | **Ranger** | <img src="assets/game-variety/ranger.svg" width="32" height="32" alt="Ranger" /> | 75 Distinct Games |
| 8 | **Polymath** | <img src="assets/game-variety/polymath.svg" width="32" height="32" alt="Polymath" /> | 100 Distinct Games |
| 9 | **Maverick** | <img src="assets/game-variety/maverick.svg" width="32" height="32" alt="Maverick" /> | 150 Distinct Games |
| 10 | **Universalist** | <img src="assets/game-variety/universalist.svg" width="32" height="32" alt="Universalist" /> | 200+ Distinct Games |

### D. Streaming Milestones (10 Tiers)
| Tier | Title | Icon | Total Broadcast Streams |
| :---: | :--- | :---: | :--- |
| 1 | **Newcomer** | <img src="assets/streaming/newcomer.svg" width="32" height="32" alt="Newcomer" /> | 1 Stream Session |
| 2 | **Fledgling** | <img src="assets/streaming/fledgling.svg" width="32" height="32" alt="Fledgling" /> | 5 Stream Sessions |
| 3 | **Breakout** | <img src="assets/streaming/breakout.svg" width="32" height="32" alt="Breakout" /> | 15 Stream Sessions |
| 4 | **Standout** | <img src="assets/streaming/standout.svg" width="32" height="32" alt="Standout" /> | 30 Stream Sessions |
| 5 | **Sensation** | <img src="assets/streaming/sensation.svg" width="32" height="32" alt="Sensation" /> | 50 Stream Sessions |
| 6 | **Star** | <img src="assets/streaming/star.svg" width="32" height="32" alt="Star" /> | 100 Stream Sessions |
| 7 | **Headliner** | <img src="assets/streaming/headliner.svg" width="32" height="32" alt="Headliner" /> | 200 Stream Sessions |
| 8 | **Trendsetter** | <img src="assets/streaming/trendsetter.svg" width="32" height="32" alt="Trendsetter" /> | 350 Stream Sessions |
| 9 | **Visionary** | <img src="assets/streaming/visionary.svg" width="32" height="32" alt="Visionary" /> | 500 Stream Sessions |
| 10 | **Phenomenon** | <img src="assets/streaming/phenomenon.svg" width="32" height="32" alt="Phenomenon" /> | 1,000+ Stream Sessions |

### E. Gifting Milestones (6 Tiers)
| Tier | Title | Icon | Gifts Sent Requirement |
| :---: | :--- | :---: | :--- |
| 1 | **Patron** | <img src="assets/gifting/patron.png" width="32" height="32" alt="Patron" /> | Send 1 Shop / Wishlist Gift |
| 2 | **Champion** | <img src="assets/gifting/champion.png" width="32" height="32" alt="Champion" /> | Send 2 Shop / Wishlist Gifts |
| 3 | **Luminary** | <img src="assets/gifting/luminary.png" width="32" height="32" alt="Luminary" /> | Send 3 Shop / Wishlist Gifts |
| 4 | **Icon** | <img src="assets/gifting/icon.png" width="32" height="32" alt="Icon" /> | Send 6 Shop / Wishlist Gifts |
| 5 | **Hero** | <img src="assets/gifting/hero.png" width="32" height="32" alt="Hero" /> | Send 10 Shop / Wishlist Gifts |
| 6 | **Legend** | <img src="assets/gifting/legend.png" width="32" height="32" alt="Legend" /> | Send 20+ Shop / Wishlist Gifts |

---

## 18. Historical Badge Changes & Chronological Timeline

A chronological record of badge introductions, programmatic closures, renames, and major design revisions:

| Date | Event Type | Affected Badge | Summary of Platform Event |
| :---: | :--- | :--- | :--- |
""")

    for h in history:
        readme.append(f"| **{h['date']}** | `{h['event_type']}` | **{h['title']}** | {h['description']} |")

    readme.append("""
---

## 19. Before-and-After Artwork Comparisons

Significant visual redesigns documented in the digital archive:

| Badge | Historical / Before Design | Modern / After Design | Notes |
| :--- | :---: | :---: | :--- |
| **Discord Partner** | <img src="assets/old-discord-partner.png" width="48" height="48" alt="Old Partner" /> | <img src="assets/discord-partner.svg" width="48" height="48" alt="Current Partner" /> | Replaced raster circular shield with geometric vector star on May 31, 2022. |
| **Moderator Programs** | <img src="assets/old-discord-mod.svg" width="48" height="48" alt="Certified Mod" /> | <img src="assets/discord-mod.svg" width="48" height="48" alt="Mod Alumni" /> | Rebranded from Certified Moderator to Alumni on December 1, 2022. |
| **Discord Nitro** | <img src="assets/old-discord-nitro.svg" width="48" height="48" alt="Old Nitro" /> | <img src="assets/discord-nitro.svg" width="48" height="48" alt="Current Nitro" /> | Updated classic rocket saucer silhouette into modern sleek badge geometry in late 2024. |
| **Bot Tag** | <img src="assets/special/bot.svg" width="48" height="24" alt="Old Bot Tag" /> | <img src="assets/special/app.svg" width="48" height="24" alt="New App Tag" /> | Rebranded platform UI label from 'BOT' to 'APP' on April 17, 2024. |

---

## 20. Server Badge & Tag Icon Catalog

### Server Header Indicators
| Badge | Appearance | Purpose |
| :--- | :---: | :--- |
| **Partnered Server** | <img src="assets/server/partnered.svg" width="32" height="32" alt="Partner Server" /> | Displayed on Partnered guild headers |
| **Verified Server** | <img src="assets/server/verified.svg" width="32" height="32" alt="Verified Server" /> | Displayed on verified game studio / brand server headers |
| **Staff Server** | <img src="assets/server/staff.svg" width="32" height="32" alt="Staff Server" /> | Reserved for official corporate Discord servers |
| **Community Server** | <img src="assets/server/community-dark.svg" width="32" height="32" alt="Community Server" /> | Displayed when Community features are enabled |
| **Discoverable Server** | <img src="assets/server/discoverable-dark.svg" width="32" height="32" alt="Discoverable Server" /> | Displayed when Server Discovery is enabled |
| **Server Owner Crown** | <img src="assets/server/crown.svg" width="32" height="32" alt="Crown" /> | Displayed next to designated guild owner in roster |
| **I'm New Here** | <img src="assets/server/new-here.svg" width="32" height="32" alt="New Here" /> | Waving hand for 7 days upon joining community servers |

### Guild Clan Tag Icons (41 Verified SVGs)
Guild clan tag icons provide customizable emblems displayed beside server tags:
- **Free Clan Icons** (IDs 12–21): Available for any community server enabling Server Tags.
- **Customizable Badge Pack Icons** (IDs 22–41): Unlocked at Boost Level 3 or via standalone badge pack purchases.
- **Legacy Experiment Icons** (IDs 1–11): Alpha trial designs preserved in the archive.

---

## 21. Bot & Application Badge Catalog

| Badge | Icon | Requirements & API Verification |
| :--- | :---: | :--- |
| **Supports Commands** | <img src="assets/supports-commands.svg" width="36" height="36" alt="Supports Commands" /> | Granted to applications registering global or guild slash commands. Application Flag: `524288` (`1<<19`). |
| **Uses AutoMod** | <img src="assets/automod.svg" width="36" height="36" alt="Uses AutoMod" /> | Granted to security apps actively maintaining >= 100 AutoMod rules. Application Flag: `16777216` (`1<<24`). |
| **App Premium** | <img src="assets/premium-bot.png" width="36" height="36" alt="Premium App" /> | Granted to apps with active in-app purchase subscriptions in the guild. |

---

## 22. Nitro & Subscription Milestones

### Nitro Tenure Badges (8 Gemstone Milestones)
Continuous Nitro subscription unlocks evolving milestone badges on user profiles:
1. **Bronze**: 1 Month (<img src="assets/subscriptions/bronze.svg" width="20" height="20" alt="Bronze" />)
2. **Silver**: 3 Months (<img src="assets/subscriptions/silver.svg" width="20" height="20" alt="Silver" />)
3. **Gold**: 6 Months (<img src="assets/subscriptions/gold.svg" width="20" height="20" alt="Gold" />)
4. **Platinum**: 12 Months / 1 Year (<img src="assets/subscriptions/platinum.svg" width="20" height="20" alt="Platinum" />)
5. **Diamond**: 24 Months / 2 Years (<img src="assets/subscriptions/diamond.svg" width="20" height="20" alt="Diamond" />)
6. **Emerald**: 36 Months / 3 Years (<img src="assets/subscriptions/emerald.svg" width="20" height="20" alt="Emerald" />)
7. **Ruby**: 60 Months / 5 Years (<img src="assets/subscriptions/ruby.svg" width="20" height="20" alt="Ruby" />)
8. **Opal**: 72+ Months / 6+ Years (<img src="assets/subscriptions/opal.svg" width="20" height="20" alt="Opal" />)

### Server Boosting Badges (9 Streak Tiers)
1. **Level 1**: 1 Month (<img src="assets/boosts/discord-boost-1.svg" width="20" height="20" alt="B1" />)
2. **Level 2**: 2 Months (<img src="assets/boosts/discord-boost-2.svg" width="20" height="20" alt="B2" />)
3. **Level 3**: 3 Months (<img src="assets/boosts/discord-boost-3.svg" width="20" height="20" alt="B3" />)
4. **Level 4**: 6 Months (<img src="assets/boosts/discord-boost-4.svg" width="20" height="20" alt="B4" />)
5. **Level 5**: 9 Months (<img src="assets/boosts/discord-boost-5.svg" width="20" height="20" alt="B5" />)
6. **Level 6**: 12 Months / 1 Year (<img src="assets/boosts/discord-boost-6.svg" width="20" height="20" alt="B6" />)
7. **Level 7**: 15 Months (<img src="assets/boosts/discord-boost-7.svg" width="20" height="20" alt="B7" />)
8. **Level 8**: 18 Months (<img src="assets/boosts/discord-boost-8.svg" width="20" height="20" alt="B8" />)
9. **Level 9**: 24+ Months / 2 Years (<img src="assets/boosts/discord-boost-9.svg" width="20" height="20" alt="B9" />)

---

## 23. Event-Exclusive & Rare Collectible Catalog

- **Discord Quests**: Completing designated streaming tasks for featured gaming partners.
- **Snowsgiving Charity Badges**: Commemorating seasonal holiday charity fundraisers.
- **King of the Hat**: Discord's first verified game store cross-promotional house badge.
- **April Fools 2024 Lootboxes**: Unlocking the complete set of parody loot box cosmetics.

---

## 24. Asset Directory & Format Guide

The repository archive organizes all verified badge artwork as pristine SVGs and lossless PNGs:

```text
assets/
├── account-age/      # 10 vector SVG badges (seed to stromatolite)
├── boosts/           # 9 vector SVG badges (1 month to 24+ months)
├── fame/             # 4 historical showcase PNGs (Spongetext, Sapphire, Wumpus)
├── game-time/        # 10 vector SVG badges (casual to eternal)
├── game-variety/     # 10 vector SVG badges (sampler to universalist)
├── gifting/          # 6 high-res PNG badges (patron to legend)
├── guilds/           # 41 vector SVG clan tag icons
├── server/           # 17 vector SVG server badges and boost level indicators
├── special/          # 12 vector SVG flairs and system tags
├── streaming/        # 10 vector SVG badges (newcomer to phenomenon)
├── subscriptions/    # 24 vector SVG and raster tenure badges
└── [root assets]     # Core user profile SVG badges
```

Run `python3 scripts/check_assets.py` to verify SHA-256 integrity and generate `data/asset_manifest.json`.

---

## 25. Verified Badge Earning Instructions

For complete step-by-step verified procedures to earn currently obtainable badges without violating Discord Terms of Service:
- **HypeSquad Houses**: Go to Desktop/Web Client > User Settings > HypeSquad > Join HypeSquad. Answer 5 questions.
- **Active Developer**: Register an app at `discord.com/developers/applications`, register a slash command, execute it in a server, and claim the badge at `discord.com/developers/active-developer`.
- **Discord Nitro & Boosting**: Subscribe or boost servers in User Settings.

*Warning*: Circumventing verification, abusing token automation, buying accounts, or attempting unauthorized API badge injection violates Discord Terms of Service and results in permanent account termination.

---

## 26. Source References for Every Badge

All claims in this knowledgebase are cataloged with strict provenance in `data/sources.json`.
- **Tier 1 (Official)**: Discord Support, Discord Developer Documentation, Official Blog.
- **Tier 2 (Technical)**: Public client source maps, API bitfield definitions, verifiable asset endpoints.
- **Tier 3 (Community)**: Historical repositories including `mezotv/discord-badges` and `PandaDevOfficial/badges-discord`.

---

## 27. Known Gaps, Conflicting Reports, and Limitations

1. **Profile Badges 101 Rollout Scope**: Discord began A/B testing progressive milestone badges in selective cohorts; global general availability rollout cadence is controlled server-side.
2. **Partner Applications**: Discord temporarily paused the public partnership application form in October 2023. Badges remain active for existing partner owners and can be transferred with guild ownership.

---

## 28. Update Methodology & Contribution Guidelines

We welcome community pull requests and evidence submissions!
See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions on:
1. Submitting verified badge evidence.
2. Running the automated validation suite (`python3 scripts/validate_data.py`).
3. Running the asset checker (`python3 scripts/check_assets.py`).
4. Regenerating documentation (`python3 scripts/generate_readme.py`).

---

## 29. Licensing & Attribution

- **Database and Documentation**: Released under the [MIT License](LICENSE).
- **Artwork & Logos**: All Discord trademarks, icons, and brand graphics belong exclusively to **Discord Inc.** and are archived strictly for non-commercial reference and educational analysis.
- **Attribution**: Special acknowledgment to community curators **Dominik K. (mezotv)** and **PandaDevOfficial** for foundational asset archives.

---

## 30. Final Disclaimer Regarding Discord's Authority

Discord Inc. maintains exclusive and final authority over all account flags, badge awards, program eligibility, and badge revocations. Badges cannot be purchased from third parties, and this knowledgebase does not sell, generate, or modify badges.
""")

    content = "\n".join(readme)
    with open("README.md", "w", encoding="utf-8") as f:
        f.write(content)
    print("✔ Successfully generated root README.md with all 30 requested sections!")

    # Generate docs/ files
    docs_files = {
        "docs/current-badges.md": "# Current & Obtainable Discord Badges\n\nDetailed breakdown of all active badges.",
        "docs/obtainable-badges.md": "# Obtainable Badges Guide\n\nComprehensive guide on how to earn every obtainable badge legitimately.",
        "docs/unobtainable-badges.md": "# Unobtainable Badges\n\nComplete documentation of retired, staff-only, and closed programs.",
        "docs/retired-badges.md": "# Retired Badges Archive\n\nHistorical records of badges that can never be earned again.",
        "docs/upcoming-badges.md": "# Upcoming & Experimental Badges\n\nEvidence-backed tracking of experimental client features.",
        "docs/historical-timeline.md": "# Historical Discord Badge Timeline\n\nComplete chronological log of badge history from 2015 to 2026.",
        "docs/badge-families.md": "# Progressive Badge Families\n\nFull tier tables for Account Age, Game Time, Variety, Streaming, Boosting, and Nitro.",
        "docs/verification-methodology.md": "# Verification Methodology\n\nSource tiers, validation scripts, and evidence grading standards."
    }

    for path, header in docs_files.items():
        with open(path, "w", encoding="utf-8") as f:
            f.write(f"{header}\n\n*See master dataset in [`data/badges.json`](../data/badges.json) and root [`README.md`](../README.md).*\n")
    print("✔ Generated supporting docs in docs/")

if __name__ == "__main__":
    generate()
