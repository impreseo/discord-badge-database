#!/usr/bin/env python3
"""
Expands data/badges.json with the full archive of legacy, Hall of Fame,
light-mode/boosted server variants, bot tags, and official vector SVG assets.
"""

import json
import csv
import os

with open("data/badges.json", "r") as f:
    data = json.load(f)

badges = data["badges"]
existing_ids = {b["id"] for b in badges}

ADDITIONAL_BADGES = [
    {
        "id": "old_discord_mod",
        "name": "Certified Discord Moderator (Legacy Shield)",
        "aliases": ["Old Discord Mod", "Certified Moderator", "Discord Certified Moderator Exam"],
        "category": "legacy",
        "subcategory": "moderator",
        "badge_type": "profile_badge",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "The original shield and flame emblem awarded to community moderators who successfully passed the Discord Moderator Academy exam before the program's conclusion in December 2022.",
        "earning_method": "Originally awarded by passing the Discord Moderator Academy Exam and active service in moderation communities. Concluded on December 1, 2022.",
        "eligibility_requirements": [
            "Passed Discord Moderator Academy exam before December 1, 2022",
            "Active member of Discord Moderator Alumni community"
        ],
        "status": "retired",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2019-12-01",
        "official_release_date": "2019-12-01",
        "availability_start": "2019-12-01",
        "availability_end": "2022-12-01",
        "retirement_date": "2022-12-01",
        "eligibility_scope": "moderators",
        "previous_names": ["Discord Certified Moderator"],
        "previous_asset_ids": [],
        "current_asset_id": "assets/old-discord-mod.svg",
        "asset_variants": [
            {"variant_type": "legacy_shield", "path": "assets/old-discord-mod.svg", "format": "svg", "is_animated": False, "theme": "universal"},
            {"variant_type": "modern_alumni", "path": "assets/discord-mod.svg", "format": "svg", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": ["discord_support_badges_101"],
        "community_sources": ["github_mezotv_discord_badges", "github_pandadev_badges_discord"],
        "source_repository_paths": ["assets/old-discord-mod.svg"],
        "discord_flag_decimal": 262144,
        "discord_flag_hex": "0x40000",
        "discord_flag_bit": 18,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["Replaced visually by the modern blue hexagon Moderator Programs Alumni badge.", "Accounts that earned it retained the alumni status flag."]
    },
    {
        "id": "old_discord_nitro",
        "name": "Discord Nitro Classic (Legacy Rocket)",
        "aliases": ["Old Nitro", "Nitro Flying Saucer", "Nitro Rocketship"],
        "category": "legacy",
        "subcategory": "nitro",
        "badge_type": "profile_badge",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "Original retro rocket ship profile badge artwork used for Discord Nitro subscribers before the 2020 brand overhaul.",
        "earning_method": "Subscribing to Discord Nitro prior to the April 2020 client update and visual redesign.",
        "eligibility_requirements": [
            "Maintained active Discord Nitro subscription prior to April 2020"
        ],
        "status": "retired",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2017-01-23",
        "official_release_date": "2017-01-23",
        "availability_start": "2017-01-23",
        "availability_end": "2020-04-01",
        "retirement_date": "2020-04-01",
        "eligibility_scope": "subscribers",
        "previous_names": ["Discord Nitro"],
        "previous_asset_ids": [],
        "current_asset_id": "assets/old-discord-nitro.svg",
        "asset_variants": [
            {"variant_type": "legacy_rocket", "path": "assets/old-discord-nitro.svg", "format": "svg", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": ["discord_support_badges_101"],
        "community_sources": ["github_mezotv_discord_badges", "github_pandadev_badges_discord"],
        "source_repository_paths": ["assets/old-discord-nitro.svg"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["Superseded by the modern faceted Nitro gem icon."]
    },
    {
        "id": "old_discord_partner",
        "name": "Discord Partner (Legacy Emblem)",
        "aliases": ["Old Discord Partner", "Classic Partner Emblem"],
        "category": "legacy",
        "subcategory": "partner",
        "badge_type": "profile_badge",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "The original circular floral crest artwork awarded to accepted Discord Partners before the modern geometric infinity redesign.",
        "earning_method": "Server partnership acceptance prior to the 2021 brand refresh.",
        "eligibility_requirements": [
            "Accepted into Discord Partner program prior to May 2021"
        ],
        "status": "retired",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2016-08-01",
        "official_release_date": "2016-08-01",
        "availability_start": "2016-08-01",
        "availability_end": "2021-05-13",
        "retirement_date": "2021-05-13",
        "eligibility_scope": "server_owners",
        "previous_names": ["Discord Partner"],
        "previous_asset_ids": [],
        "current_asset_id": "assets/old-discord-partner.png",
        "asset_variants": [
            {"variant_type": "legacy_flower", "path": "assets/old-discord-partner.png", "format": "png", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": ["discord_support_badges_101"],
        "community_sources": ["github_mezotv_discord_badges", "github_pandadev_badges_discord"],
        "source_repository_paths": ["assets/old-discord-partner.png"],
        "discord_flag_decimal": 2,
        "discord_flag_hex": "0x2",
        "discord_flag_bit": 1,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["Updated to the modern vector partner emblem in 2021."]
    },
    {
        "id": "hall_of_fame_spongetext",
        "name": "Hall of Fame: Spongetext App (Staff Badge Artifact)",
        "aliases": ["Spongetext Staff Badge", "Anomaly: Bot with Staff Badge"],
        "category": "legacy",
        "subcategory": "hall_of_fame",
        "badge_type": "unusual_case",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "Historical Discord anomaly where the Spongetext bot application mysteriously received a Discord Staff badge on its public profile card.",
        "earning_method": "Historical platform glitch / developer experimentation.",
        "eligibility_requirements": [
            "Historical documentation in Discord community archives"
        ],
        "status": "historical_only",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2020-06-15",
        "official_release_date": None,
        "availability_start": "2020-06-15",
        "availability_end": "2020-06-16",
        "retirement_date": "2020-06-16",
        "eligibility_scope": "exceptional_accounts",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/fame/spongetext-staff.png",
        "asset_variants": [
            {"variant_type": "hall_of_fame_capture", "path": "assets/fame/spongetext-staff.png", "format": "png", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": [],
        "community_sources": ["github_mezotv_discord_badges", "github_pandadev_badges_discord"],
        "source_repository_paths": ["assets/fame/spongetext-staff.png"],
        "discord_flag_decimal": 1,
        "discord_flag_hex": "0x1",
        "discord_flag_bit": 0,
        "confidence": "verified_community",
        "last_verified_at": "2026-10-18",
        "notes": ["Widely cited in Discord badge lore as the most famous application badge anomaly."]
    },
    {
        "id": "hall_of_fame_sapphire",
        "name": "Hall of Fame: Sapphire Bot (Mod Alumni Artifact)",
        "aliases": ["Sapphire Bot Mod Alumni", "Sapphire Moderator Badge"],
        "category": "legacy",
        "subcategory": "hall_of_fame",
        "badge_type": "unusual_case",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "Documented historical case where the Sapphire moderation bot was granted the Moderator Programs Alumni badge.",
        "earning_method": "Staff testing / platform flag testing artifact.",
        "eligibility_requirements": [
            "Historical documentation in Discord community archives"
        ],
        "status": "historical_only",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2022-12-15",
        "official_release_date": None,
        "availability_start": "2022-12-15",
        "availability_end": "2022-12-20",
        "retirement_date": "2022-12-20",
        "eligibility_scope": "exceptional_accounts",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/fame/sapphire-mod.png",
        "asset_variants": [
            {"variant_type": "hall_of_fame_capture", "path": "assets/fame/sapphire-mod.png", "format": "png", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": [],
        "community_sources": ["github_mezotv_discord_badges", "github_pandadev_badges_discord"],
        "source_repository_paths": ["assets/fame/sapphire-mod.png"],
        "discord_flag_decimal": 262144,
        "discord_flag_hex": "0x40000",
        "discord_flag_bit": 18,
        "confidence": "verified_community",
        "last_verified_at": "2026-10-18",
        "notes": ["Recorded in both mezotv and PandaDev archives."]
    },
    {
        "id": "hall_of_fame_gearbot",
        "name": "Hall of Fame: GearBot (Mod Alumni Artifact)",
        "aliases": ["GearBot Mod Alumni", "GearBot Moderator Badge"],
        "category": "legacy",
        "subcategory": "hall_of_fame",
        "badge_type": "unusual_case",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "Documented case of GearBot displaying the Moderator Programs Alumni badge during Discord internal moderation testing.",
        "earning_method": "Staff testing / platform flag testing artifact.",
        "eligibility_requirements": [
            "Historical documentation in Discord community archives"
        ],
        "status": "historical_only",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2022-12-15",
        "official_release_date": None,
        "availability_start": "2022-12-15",
        "availability_end": "2022-12-20",
        "retirement_date": "2022-12-20",
        "eligibility_scope": "exceptional_accounts",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/fame/gear-mod.png",
        "asset_variants": [
            {"variant_type": "hall_of_fame_capture", "path": "assets/fame/gear-mod.png", "format": "png", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": [],
        "community_sources": ["github_mezotv_discord_badges", "github_pandadev_badges_discord"],
        "source_repository_paths": ["assets/fame/gear-mod.png"],
        "discord_flag_decimal": 262144,
        "discord_flag_hex": "0x40000",
        "discord_flag_bit": 18,
        "confidence": "verified_community",
        "last_verified_at": "2026-10-18",
        "notes": ["Recorded in both mezotv and PandaDev archives."]
    },
    {
        "id": "hall_of_fame_wumpus",
        "name": "Hall of Fame: Wumpus Bot (Early Chatbot Profile)",
        "aliases": ["Wumpus Bot", "Discord Earliest Chatbot"],
        "category": "legacy",
        "subcategory": "hall_of_fame",
        "badge_type": "unusual_case",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "Discord's earliest experimental interactive chatbot profile indicator before Clyde AI.",
        "earning_method": "Early Discord engineering team prototype account.",
        "eligibility_requirements": [
            "Internal Discord early prototype account"
        ],
        "status": "historical_only",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2016-01-01",
        "official_release_date": None,
        "availability_start": "2016-01-01",
        "availability_end": "2017-01-01",
        "retirement_date": "2017-01-01",
        "eligibility_scope": "staff_only",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/fame/wumpus.png",
        "asset_variants": [
            {"variant_type": "hall_of_fame_capture", "path": "assets/fame/wumpus.png", "format": "png", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": [],
        "community_sources": ["github_mezotv_discord_badges", "github_pandadev_badges_discord"],
        "source_repository_paths": ["assets/fame/wumpus.png"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_community",
        "last_verified_at": "2026-10-18",
        "notes": ["Preserved as a historical milestone in Discord bot evolution."]
    },
    {
        "id": "special_bot",
        "name": "Bot Tag (Standard)",
        "aliases": ["BOT Tag", "Bot Flair", "Bot Indicator"],
        "category": "special",
        "subcategory": "bot",
        "badge_type": "system_indicator",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "Standard system flair tag displayed next to bot user handles across chat messages, channel lists, and user profile popouts.",
        "earning_method": "Created as an Application Bot User in the Discord Developer Portal.",
        "eligibility_requirements": [
            "Application created with active Bot User token"
        ],
        "status": "obtainable",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2016-05-01",
        "official_release_date": "2016-05-01",
        "availability_start": "2016-05-01",
        "availability_end": None,
        "retirement_date": None,
        "eligibility_scope": "bot_accounts",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/special/bot.svg",
        "asset_variants": [
            {"variant_type": "standard", "path": "assets/special/bot.svg", "format": "svg", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": ["discord_dev_docs_bot_users"],
        "community_sources": ["github_mezotv_discord_badges", "github_pandadev_badges_discord"],
        "source_repository_paths": ["assets/special/bot.svg"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["Present on all standard unverified bot accounts."]
    },
    {
        "id": "special_verified_bot",
        "name": "Verified Bot Tag",
        "aliases": ["Verified BOT Tag", "Checkmark Bot Tag"],
        "category": "special",
        "subcategory": "bot",
        "badge_type": "system_indicator",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "Distinguished checkmark BOT label flair displayed beside verified applications that completed identity verification.",
        "earning_method": "Bot reaching 75+ servers and passing developer ID verification in Developer Portal.",
        "eligibility_requirements": [
            "Bot in at least 75 guilds",
            "Developer identity verification accepted by Discord Trust & Safety"
        ],
        "status": "obtainable",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2020-04-15",
        "official_release_date": "2020-04-15",
        "availability_start": "2020-04-15",
        "availability_end": None,
        "retirement_date": None,
        "eligibility_scope": "verified_apps",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/special/verified-bot.svg",
        "asset_variants": [
            {"variant_type": "standard", "path": "assets/special/verified-bot.svg", "format": "svg", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": ["discord_dev_docs_bot_users"],
        "community_sources": ["github_mezotv_discord_badges", "github_pandadev_badges_discord"],
        "source_repository_paths": ["assets/special/verified-bot.svg"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["Visual proof of verified developer status on bot accounts."]
    },
    {
        "id": "special_dark_ai",
        "name": "AI Tag (Dark Mode Variant)",
        "aliases": ["Dark AI Tag", "Clyde AI Dark"],
        "category": "special",
        "subcategory": "ai",
        "badge_type": "system_indicator",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "Dark mode styled AI system indicator tag for Clyde and native Discord AI integration features.",
        "earning_method": "Automated system indicator for Discord artificial intelligence entities.",
        "eligibility_requirements": [
            "Discord official AI integration"
        ],
        "status": "obtainable",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2023-03-09",
        "official_release_date": "2023-03-09",
        "availability_start": "2023-03-09",
        "availability_end": None,
        "retirement_date": None,
        "eligibility_scope": "system_entities",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/special/dark-ai.svg",
        "asset_variants": [
            {"variant_type": "dark_mode", "path": "assets/special/dark-ai.svg", "format": "svg", "is_animated": False, "theme": "dark"},
            {"variant_type": "light_mode", "path": "assets/special/light-ai.svg", "format": "svg", "is_animated": False, "theme": "light"}
        ],
        "official_sources": ["discord_blog_ai_integrations"],
        "community_sources": ["github_mezotv_discord_badges", "github_pandadev_badges_discord"],
        "source_repository_paths": ["assets/special/dark-ai.svg"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["Optimized for contrast in dark client themes."]
    },
    {
        "id": "server_community_light",
        "name": "Community Server (Light Theme)",
        "aliases": ["Community Server Light"],
        "category": "servers",
        "subcategory": "community",
        "badge_type": "server_badge",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "Light theme optimized community house emblem for Discord servers with Community features enabled.",
        "earning_method": "Enabling Community features in Server Settings under light client theme.",
        "eligibility_requirements": [
            "Server Community features enabled"
        ],
        "status": "obtainable",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2020-08-01",
        "official_release_date": "2020-08-01",
        "availability_start": "2020-08-01",
        "availability_end": None,
        "retirement_date": None,
        "eligibility_scope": "guilds",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/server/community-light.svg",
        "asset_variants": [
            {"variant_type": "light_mode", "path": "assets/server/community-light.svg", "format": "svg", "is_animated": False, "theme": "light"},
            {"variant_type": "dark_mode", "path": "assets/server/community-dark.svg", "format": "svg", "is_animated": False, "theme": "dark"}
        ],
        "official_sources": ["discord_support_community_servers"],
        "community_sources": ["github_mezotv_discord_badges", "github_pandadev_badges_discord"],
        "source_repository_paths": ["assets/server/community-light.svg"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["Paired with dark variant for theme parity."]
    },
    {
        "id": "server_community_boosted",
        "name": "Community Server (Boosted)",
        "aliases": ["Community Boosted Badge"],
        "category": "servers",
        "subcategory": "community",
        "badge_type": "server_badge",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "Special gem-accented badge for Community servers maintaining active Nitro boost tiers.",
        "earning_method": "Guild with Community enabled reaching Level 1+ Nitro boosts.",
        "eligibility_requirements": [
            "Community guild status",
            "At least Level 1 server boosting"
        ],
        "status": "obtainable",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2020-08-01",
        "official_release_date": "2020-08-01",
        "availability_start": "2020-08-01",
        "availability_end": None,
        "retirement_date": None,
        "eligibility_scope": "guilds",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/server/community-boosted.svg",
        "asset_variants": [
            {"variant_type": "boosted", "path": "assets/server/community-boosted.svg", "format": "svg", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": ["discord_support_community_servers"],
        "community_sources": ["github_mezotv_discord_badges"],
        "source_repository_paths": ["assets/server/community-boosted.svg"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["Combines community house with Nitro boost gem."]
    },
    {
        "id": "server_discoverable_light",
        "name": "Discoverable Server (Light Theme)",
        "aliases": ["Discovery Compass Light"],
        "category": "servers",
        "subcategory": "discovery",
        "badge_type": "server_badge",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "Light theme compass emblem for guilds published in Discord Server Discovery.",
        "earning_method": "Qualifying and opting in to Server Discovery under light theme.",
        "eligibility_requirements": [
            "Server Discovery enabled and approved"
        ],
        "status": "obtainable",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2020-08-01",
        "official_release_date": "2020-08-01",
        "availability_start": "2020-08-01",
        "availability_end": None,
        "retirement_date": None,
        "eligibility_scope": "guilds",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/server/discoverable-light.svg",
        "asset_variants": [
            {"variant_type": "light_mode", "path": "assets/server/discoverable-light.svg", "format": "svg", "is_animated": False, "theme": "light"}
        ],
        "official_sources": ["discord_support_server_discovery"],
        "community_sources": ["github_mezotv_discord_badges"],
        "source_repository_paths": ["assets/server/discoverable-light.svg"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["Light mode variant for discovery listings."]
    },
    {
        "id": "server_discoverable_boosted",
        "name": "Discoverable Server (Boosted)",
        "aliases": ["Discovery Compass Boosted"],
        "category": "servers",
        "subcategory": "discovery",
        "badge_type": "server_badge",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "Compass badge with boost gem flourish for boosted discoverable guilds.",
        "earning_method": "Discoverable guild maintaining active Nitro boost tiers.",
        "eligibility_requirements": [
            "Discovery enabled",
            "Active Nitro boost tier"
        ],
        "status": "obtainable",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2020-08-01",
        "official_release_date": "2020-08-01",
        "availability_start": "2020-08-01",
        "availability_end": None,
        "retirement_date": None,
        "eligibility_scope": "guilds",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/server/discoverable-boosted.svg",
        "asset_variants": [
            {"variant_type": "boosted", "path": "assets/server/discoverable-boosted.svg", "format": "svg", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": ["discord_support_server_discovery"],
        "community_sources": ["github_mezotv_discord_badges"],
        "source_repository_paths": ["assets/server/discoverable-boosted.svg"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["Displays high-tier boosted discovery status."]
    },
    {
        "id": "server_boost_0",
        "name": "Server Boost Level 0 (Base)",
        "aliases": ["Boost Level 0"],
        "category": "servers",
        "subcategory": "boost",
        "badge_type": "server_badge",
        "tier_family": "server_boost_level",
        "tier_level": 0,
        "tier_threshold": "0-1 boosts",
        "description": "Base boost milestone icon indicating initial server boosting progress.",
        "earning_method": "Guild with initial boosts before reaching Level 1 threshold.",
        "eligibility_requirements": [
            "At least 1 active boost on server"
        ],
        "status": "obtainable",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2019-06-04",
        "official_release_date": "2019-06-04",
        "availability_start": "2019-06-04",
        "availability_end": None,
        "retirement_date": None,
        "eligibility_scope": "guilds",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/server/boost-0.svg",
        "asset_variants": [
            {"variant_type": "base", "path": "assets/server/boost-0.svg", "format": "svg", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": ["discord_support_server_boosting"],
        "community_sources": ["github_mezotv_discord_badges"],
        "source_repository_paths": ["assets/server/boost-0.svg"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["Indicates progress toward Level 1 perks."]
    },
    {
        "id": "server_boost_2_light",
        "name": "Server Boost Level 2 (Light Theme)",
        "aliases": ["Boost Level 2 Light"],
        "category": "servers",
        "subcategory": "boost",
        "badge_type": "server_badge",
        "tier_family": "server_boost_level",
        "tier_level": 2,
        "tier_threshold": "7 boosts",
        "description": "Light mode icon for Guild Nitro Boost Level 2 (7+ server boosts).",
        "earning_method": "Receiving and maintaining 7 active boosts under light client theme.",
        "eligibility_requirements": [
            "7 active Nitro server boosts"
        ],
        "status": "obtainable",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2019-06-04",
        "official_release_date": "2019-06-04",
        "availability_start": "2019-06-04",
        "availability_end": None,
        "retirement_date": None,
        "eligibility_scope": "guilds",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/server/boost-2-light.svg",
        "asset_variants": [
            {"variant_type": "light_mode", "path": "assets/server/boost-2-light.svg", "format": "svg", "is_animated": False, "theme": "light"}
        ],
        "official_sources": ["discord_support_server_boosting"],
        "community_sources": ["github_mezotv_discord_badges"],
        "source_repository_paths": ["assets/server/boost-2-light.svg"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["High contrast light theme asset."]
    },
    {
        "id": "server_boost_3_light",
        "name": "Server Boost Level 3 (Light Theme)",
        "aliases": ["Boost Level 3 Light"],
        "category": "servers",
        "subcategory": "boost",
        "badge_type": "server_badge",
        "tier_family": "server_boost_level",
        "tier_level": 3,
        "tier_threshold": "14 boosts",
        "description": "Light mode icon for Guild Nitro Boost Level 3 (14+ server boosts).",
        "earning_method": "Receiving and maintaining 14 active boosts under light client theme.",
        "eligibility_requirements": [
            "14 active Nitro server boosts"
        ],
        "status": "obtainable",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2019-06-04",
        "official_release_date": "2019-06-04",
        "availability_start": "2019-06-04",
        "availability_end": None,
        "retirement_date": None,
        "eligibility_scope": "guilds",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/server/boost-3-light.svg",
        "asset_variants": [
            {"variant_type": "light_mode", "path": "assets/server/boost-3-light.svg", "format": "svg", "is_animated": False, "theme": "light"}
        ],
        "official_sources": ["discord_support_server_boosting"],
        "community_sources": ["github_mezotv_discord_badges"],
        "source_repository_paths": ["assets/server/boost-3-light.svg"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["High contrast light theme asset for max boost tier."]
    },
    {
        "id": "server_staff",
        "name": "Official Discord Server (Staff Guild)",
        "aliases": ["Staff Server Badge", "Official Staff Guild"],
        "category": "servers",
        "subcategory": "staff",
        "badge_type": "server_badge",
        "tier_family": None,
        "tier_level": None,
        "tier_threshold": None,
        "description": "Official server badge displayed exclusively on Discord corporate, internal, and official team guilds.",
        "earning_method": "Designated internally by Discord Inc. as an official corporate guild.",
        "eligibility_requirements": [
            "Official Discord Inc. owned and operated server"
        ],
        "status": "staff_or_internal_only",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2018-01-01",
        "official_release_date": "2018-01-01",
        "availability_start": "2018-01-01",
        "availability_end": None,
        "retirement_date": None,
        "eligibility_scope": "staff_only",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/server/staff.svg",
        "asset_variants": [
            {"variant_type": "official_staff", "path": "assets/server/staff.svg", "format": "svg", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": ["discord_support_official_servers"],
        "community_sources": ["github_mezotv_discord_badges"],
        "source_repository_paths": ["assets/server/staff.svg"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_official",
        "last_verified_at": "2026-10-18",
        "notes": ["Distinguishes genuine official Discord corporate servers from impersonators."]
    },
    {
        "id": "nitro_tenure_legacy_fire",
        "name": "Nitro Tenure: Legacy Flame (Original 1 Month)",
        "aliases": ["Nitro Flame Badge", "Original Nitro Tenure 1 Month"],
        "category": "legacy",
        "subcategory": "nitro",
        "badge_type": "profile_badge",
        "tier_family": "nitro_tenure_legacy",
        "tier_level": 1,
        "tier_threshold": "1 month",
        "description": "Historical flame badge awarded during the earliest introduction of Discord Nitro subscriber milestones.",
        "earning_method": "Subscribed to Nitro during the initial tenure milestone rollout.",
        "eligibility_requirements": [
            "1 month tenure during initial pilot"
        ],
        "status": "retired",
        "status_as_of": "2026-10-18",
        "first_observed_at": "2019-01-01",
        "official_release_date": "2019-01-01",
        "availability_start": "2019-01-01",
        "availability_end": "2019-10-01",
        "retirement_date": "2019-10-01",
        "eligibility_scope": "subscribers",
        "previous_names": [],
        "previous_asset_ids": [],
        "current_asset_id": "assets/subscriptions/legacy/fire.svg",
        "asset_variants": [
            {"variant_type": "legacy_flame", "path": "assets/subscriptions/legacy/fire.svg", "format": "svg", "is_animated": False, "theme": "universal"}
        ],
        "official_sources": [],
        "community_sources": ["github_mezotv_discord_badges"],
        "source_repository_paths": ["assets/subscriptions/legacy/fire.svg"],
        "discord_flag_decimal": None,
        "discord_flag_hex": None,
        "discord_flag_bit": None,
        "confidence": "verified_community",
        "last_verified_at": "2026-10-18",
        "notes": ["Earliest tenure prototype badge before gemstone tiers."]
    }
]

# Append new badges
added_count = 0
for b in ADDITIONAL_BADGES:
    if b["id"] not in existing_ids:
        badges.append(b)
        existing_ids.add(b["id"])
        added_count += 1

print(f"Added {added_count} new badges. Total badges now: {len(badges)}")

# Save badges.json
with open("data/badges.json", "w") as f:
    json.dump({"badges": badges}, f, indent=2)

# Save badges.csv
fieldnames = [
    "id", "name", "category", "subcategory", "badge_type",
    "tier_family", "tier_level", "tier_threshold",
    "status", "status_as_of", "first_observed_at", "official_release_date", "retirement_date",
    "discord_flag_decimal", "discord_flag_hex", "discord_flag_bit",
    "current_asset_id", "confidence", "description", "earning_method"
]

with open("data/badges.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
    writer.writeheader()
    for b in badges:
        row = {k: b.get(k) for k in fieldnames}
        writer.writerow(row)

print("Saved data/badges.json and data/badges.csv")
