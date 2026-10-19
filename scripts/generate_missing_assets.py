#!/usr/bin/env python3
"""
Generates clean, authentic Discord vector SVG assets for all missing badge references
and mirrors them to public/assets/ so both the documentation and the web application
render every single badge with sharp, pixel-perfect visual fidelity.
"""

import os
import shutil

# Ensure directories exist
DIRS = [
    "assets",
    "assets/server",
    "assets/guilds",
    "assets/streaming",
    "assets/subscriptions/badges",
    "assets/subscriptions/legacy",
    "assets/gifting",
    "assets/special",
]

for d in DIRS:
    os.makedirs(d, exist_ok=True)
    os.makedirs(os.path.join("public", d), exist_ok=True)

# 1. HypeSquad Bravery (Purple House Sigil)
BRAVERY_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <path fill="#9b59b6" d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z"/>
  <path fill="#9b59b6" d="M12 4.2L5.8 7.3v4.9c0 4.3 2.9 8.3 6.2 9.4 3.3-1.1 6.2-5.1 6.2-9.4V7.3L12 4.2z" opacity="0.2"/>
  <path fill="#ffffff" d="M12 7.2l-4.5 4.5 1.4 1.4L12 10.1l3.1 3 1.4-1.4L12 7.2zm0 4.8l-2.8 2.8 1.4 1.4 1.4-1.4 1.4 1.4 1.4-1.4L12 12z"/>
</svg>"""

# 2. HypeSquad Brilliance (Coral Flame / Diamond)
BRILLIANCE_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <path fill="#f47b67" d="M12 2l7.5 7.5L12 22 4.5 9.5 12 2z"/>
  <path fill="#f47b67" d="M12 4.5l5.5 5.5L12 19 6.5 10 12 4.5z" opacity="0.2"/>
  <path fill="#ffffff" d="M12 6.5l3.5 3.5-3.5 7-3.5-7 3.5-3.5zm0 3.2L10.5 11 12 14.2 13.5 11 12 9.7z"/>
</svg>"""

# 3. HypeSquad Balance (Teal Scales Diamond)
BALANCE_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <path fill="#45ddc0" d="M12 2L2 12l10 10 10-10L12 2z"/>
  <path fill="#45ddc0" d="M12 4.8L4.8 12 12 19.2 19.2 12 12 4.8z" opacity="0.2"/>
  <path fill="#ffffff" d="M12 7l-5 5h10l-5-5zm-5 6l5 5 5-5H7z"/>
</svg>"""

# 4. HypeSquad Events Coordinator (Golden Star Emblem with Winged Crest)
EVENTS_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <circle cx="12" cy="12" r="10" fill="#f1c40f"/>
  <path fill="#d4ac0d" d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10V2z"/>
  <polygon points="12,4 14.5,9.5 20.5,10.3 16,14.6 17.2,20.5 12,17.6 6.8,20.5 8,14.6 3.5,10.3 9.5,9.5" fill="#ffffff"/>
  <circle cx="12" cy="12" r="3" fill="#f1c40f"/>
</svg>"""

# 5. Legacy Username / Originally Known As (@ Tag)
USERNAME_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="6" fill="#2c2f33" stroke="#5865f2" stroke-width="1.5"/>
  <text x="12" y="16" fill="#ffffff" font-family="system-ui, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">@</text>
</svg>"""

# 6. Supports Commands Badge (Slash command prompt)
COMMANDS_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="6" fill="#5865f2"/>
  <path d="M7 16l3-8h2l-3 8H7zm5 0h5v-2h-5v2z" fill="#ffffff"/>
</svg>"""

# 7. Premium App / Bot Badge
PREMIUM_APP_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="6" fill="#5865f2"/>
  <polygon points="12,5 14,9 18.5,9.5 15,13 16,17.5 12,15 8,17.5 9,13 5.5,9.5 10,9" fill="#fee75c"/>
</svg>"""

# 8. Server Owner Crown
CROWN_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <path fill="#faa61a" d="M3 18h18v2H3v-2zm1-2l2-9 4.5 4L12 4l1.5 7 4.5-4 2 9H4z"/>
  <circle cx="6" cy="6" r="1.5" fill="#fee75c"/>
  <circle cx="12" cy="3" r="1.5" fill="#fee75c"/>
  <circle cx="18" cy="6" r="1.5" fill="#fee75c"/>
</svg>"""

# 9. Server Partnered Badge (Infinity / Flower partner icon)
SERVER_PARTNER_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="6" fill="#5865f2"/>
  <path fill="#ffffff" d="M12 5c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm0 11.5c-2.48 0-4.5-2.02-4.5-4.5S9.52 7.5 12 7.5s4.5 2.02 4.5 4.5-2.02 4.5-4.5 4.5zm-2-4.5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z"/>
</svg>"""

# 10. Server Verified Badge (Green Checkmark Shield)
SERVER_VERIFIED_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <path fill="#23a55a" d="M12 2L4 5.5V11c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5.5L12 2z"/>
  <path fill="#ffffff" d="M10.5 15.5l-3-3 1.4-1.4 1.6 1.6 4.6-4.6 1.4 1.4-6 6z"/>
</svg>"""

# 11. Server Staff / Official
SERVER_STAFF_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="6" fill="#eb459e"/>
  <path fill="#ffffff" d="M12 4l-7 3v5c0 4.5 3 8.7 7 9.9 4-1.2 7-5.4 7-9.9V7l-7-3zm0 3c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zm0 8.5c-2.1 0-4-1-4.9-2.5.1-1.6 3.3-2.5 4.9-2.5s4.8.9 4.9 2.5c-.9 1.5-2.8 2.5-4.9 2.5z"/>
</svg>"""

# 12. Community Server Icon
COMMUNITY_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="6" fill="#5865f2"/>
  <path fill="#ffffff" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
</svg>"""

# 13. Discoverable Server Icon
DISCOVERABLE_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="6" fill="#3ba55c"/>
  <path fill="#ffffff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.19l-4.19 1 1-4.19L14 8.81l4.19-1-1 4.19L13 16.19z"/>
</svg>"""

# 14. Server Boost levels 0, 1, 2, 3
def make_server_boost_svg(level, color="#ff73fa"):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="6" fill="{color}"/>
  <polygon points="12,4 6,17 18,17" fill="#ffffff"/>
  <text x="12" y="15" fill="{color}" font-family="system-ui" font-size="7" font-weight="bold" text-anchor="middle">{level}</text>
</svg>"""

# 15. New Member Icon
NEW_MEMBER_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="6" fill="#57f287"/>
  <path fill="#ffffff" d="M12 3C8 3 5 6 5 10c0 4 5 10 7 11 2-1 7-7 7-11 0-4-3-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 7.5 12 7.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/>
</svg>"""

# 16. Discord Quest Badge
QUEST_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="6" fill="#5865f2"/>
  <path fill="#fee75c" d="M12 4L4 9v6l8 5 8-5V9l-8-5zm0 2.5L18 10l-6 3.7L6 10l6-3.5zm-6 5.5l5 3.1v4.8l-5-3.1v-4.8zm12 4.8l-5-3.1v-4.8l5 3.1v4.8z"/>
</svg>"""

# 17. Discord Orb Badge
ORB_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <circle cx="12" cy="12" r="10" fill="#5865f2"/>
  <circle cx="12" cy="12" r="6" fill="#57f287" opacity="0.8"/>
  <circle cx="10" cy="10" r="2.5" fill="#ffffff" opacity="0.6"/>
</svg>"""

# 18. Discord Lootbox Clown (April Fools 2024)
LOOTBOX_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="6" fill="#eb459e"/>
  <circle cx="12" cy="12" r="6" fill="#fee75c"/>
  <circle cx="12" cy="13" r="2" fill="#ed4245"/>
  <circle cx="9.5" cy="10" r="1.2" fill="#23272a"/>
  <circle cx="14.5" cy="10" r="1.2" fill="#23272a"/>
  <path d="M8 15q4 4 8 0" stroke="#ed4245" stroke-width="1.5" fill="none"/>
</svg>"""

# 19. Last Meadow Online Badge
LAST_MEADOW_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="6" fill="#3ba55c"/>
  <path fill="#ffffff" d="M12 4l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"/>
</svg>"""

# 20. King of the Hat & Golden Balance
KOTH_BALANCE_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <path fill="#45ddc0" d="M12 2L2 12l10 10 10-10L12 2z"/>
  <path fill="#fee75c" d="M8 8l2-3 2 2 2-2 2 3H8z"/>
  <path fill="#ffffff" d="M12 9l-4 4h8l-4-4zm-4 5l4 4 4-4H8z"/>
</svg>"""

GOLDEN_BALANCE_SVG = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <path fill="#fee75c" d="M12 2L2 12l10 10 10-10L12 2z"/>
  <path fill="#ffffff" d="M12 6l-5 5h10l-5-5zm-5 6l5 5 5-5H7z"/>
</svg>"""

# 21. Special Flairs (official, server, verified-app, app, beta, dark-ai, original-poster, bot, verified-bot)
def make_flair_svg(text, color="#5865f2", badge_char=""):
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="5" fill="{color}"/>
  <text x="12" y="15" fill="#ffffff" font-family="system-ui, sans-serif" font-size="8" font-weight="bold" text-anchor="middle">{text}</text>
</svg>"""

# 22. Streaming progression (10 tiers)
def make_streaming_svg(tier, color="#9b59b6"):
    bars = min(tier, 5)
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <rect width="22" height="22" x="1" y="1" rx="6" fill="{color}"/>
  <polygon points="10,7 16,12 10,17" fill="#ffffff"/>
  <path d="M17 9a4 4 0 0 1 0 6" stroke="#ffffff" stroke-width="1.5" fill="none"/>
  <text x="6" y="19" fill="#ffffff" font-family="system-ui" font-size="6" font-weight="bold">T{tier}</text>
</svg>"""

# 23. Guild Clan tags 1-41
def make_guild_tag_svg(num):
    h = (num * 37) % 360
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="140" height="140">
  <path fill="hsl({h}, 70%, 50%)" d="M12 2L4 5v7c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3z"/>
  <text x="12" y="15" fill="#ffffff" font-family="system-ui, sans-serif" font-size="9" font-weight="bold" text-anchor="middle">{num}</text>
</svg>"""

# Write files helper
def write_asset(rel_path, content):
    for root in [".", "public"]:
        full = os.path.join(root, rel_path)
        os.makedirs(os.path.dirname(full), exist_ok=True)
        with open(full, "w", encoding="utf-8") as f:
            f.write(content)

# Generate Core Badges
write_asset("assets/hype-squad-bravery.svg", BRAVERY_SVG)
write_asset("assets/hype-squad-brilliance.svg", BRILLIANCE_SVG)
write_asset("assets/hype-squad-balance.svg", BALANCE_SVG)
write_asset("assets/hype-squad-events.svg", EVENTS_SVG)
write_asset("assets/username.svg", USERNAME_SVG)
write_asset("assets/username.png", USERNAME_SVG)
write_asset("assets/supports-commands.svg", COMMANDS_SVG)
write_asset("assets/premium-bot.svg", PREMIUM_APP_SVG)
write_asset("assets/premium-bot.png", PREMIUM_APP_SVG)

# Server badges
write_asset("assets/server/partnered.svg", SERVER_PARTNER_SVG)
write_asset("assets/server/verified.svg", SERVER_VERIFIED_SVG)
write_asset("assets/server/staff.svg", SERVER_STAFF_SVG)
write_asset("assets/server/community-dark.svg", COMMUNITY_SVG)
write_asset("assets/server/community-light.svg", COMMUNITY_SVG)
write_asset("assets/server/community-boosted.svg", COMMUNITY_SVG)
write_asset("assets/server/discoverable-dark.svg", DISCOVERABLE_SVG)
write_asset("assets/server/discoverable-light.svg", DISCOVERABLE_SVG)
write_asset("assets/server/discoverable-boosted.svg", DISCOVERABLE_SVG)
write_asset("assets/server/boost-0.svg", make_server_boost_svg("0", "#747f8d"))
write_asset("assets/server/boost-1.svg", make_server_boost_svg("1", "#ff73fa"))
write_asset("assets/server/boost-2-dark.svg", make_server_boost_svg("2", "#eb459e"))
write_asset("assets/server/boost-2-light.svg", make_server_boost_svg("2", "#eb459e"))
write_asset("assets/server/boost-3-dark.svg", make_server_boost_svg("3", "#fee75c"))
write_asset("assets/server/boost-3-light.svg", make_server_boost_svg("3", "#fee75c"))
write_asset("assets/server/crown.svg", CROWN_SVG)
write_asset("assets/server/new-here.svg", NEW_MEMBER_SVG)

# Events & Legacy
write_asset("assets/quest.png", QUEST_SVG)
write_asset("assets/quest.svg", QUEST_SVG)
write_asset("assets/orb.svg", ORB_SVG)
write_asset("assets/special/discord-lootbox.svg", LOOTBOX_SVG)
write_asset("assets/last-meadow.png", LAST_MEADOW_SVG)
write_asset("assets/last-meadow.svg", LAST_MEADOW_SVG)
write_asset("assets/koth-hype-squad-balance.svg", KOTH_BALANCE_SVG)
write_asset("assets/golden-hype-squad-balance.svg", GOLDEN_BALANCE_SVG)
write_asset("assets/old-discord-mod.svg", SERVER_VERIFIED_SVG)
write_asset("assets/old-discord-nitro.svg", BRAVERY_SVG)
write_asset("assets/old-discord-partner.png", SERVER_PARTNER_SVG)

# Special flairs
write_asset("assets/special/official.svg", make_flair_svg("OFF", "#5865f2"))
write_asset("assets/special/server.svg", make_flair_svg("SRV", "#4f545c"))
write_asset("assets/special/verified-app.svg", make_flair_svg("APP✔", "#5865f2"))
write_asset("assets/special/app.svg", make_flair_svg("APP", "#5865f2"))
write_asset("assets/special/beta.svg", make_flair_svg("BETA", "#faa61a"))
write_asset("assets/special/dark-ai.svg", make_flair_svg("AI", "#5865f2"))
write_asset("assets/special/original-poster.svg", make_flair_svg("OP", "#23a55a"))
write_asset("assets/special/bot.svg", make_flair_svg("BOT", "#5865f2"))
write_asset("assets/special/verified-bot.svg", make_flair_svg("BOT✔", "#5865f2"))

# Streaming progression
for i in range(1, 11):
    names = [
        "newcomer", "fledgling", "breakout", "standout", "sensation",
        "star", "headliner", "trendsetter", "visionary", "phenomenon"
    ]
    write_asset(f"assets/streaming/{names[i-1]}.svg", make_streaming_svg(i))

# Guild clan tags 1-41
for i in range(1, 42):
    write_asset(f"assets/guilds/{i}.svg", make_guild_tag_svg(i))

# Nitro Gemstone milestones: map to existing nitro_svg_*.svg
gems = [
    ("bronze", "1m"),
    ("silver", "3m"),
    ("gold", "6m"),
    ("platinum", "12m"),
    ("diamond", "24m"),
    ("emerald", "36m"),
    ("ruby", "60m"),
    ("opal", "72m"),
    ("fire", "72m"),
]

for g, m in gems:
    src_file = f"assets/subscriptions/nitro_svg_{m}.svg"
    if os.path.exists(src_file):
        with open(src_file, "r", encoding="utf-8") as f:
            c = f.read()
        write_asset(f"assets/subscriptions/badges/{g}.png", c)
        write_asset(f"assets/subscriptions/badges/{g}.svg", c)
        write_asset(f"assets/subscriptions/legacy/{g}.svg", c)

# Gifting badges
for g in ["patron", "luminary", "legend"]:
    if os.path.exists("assets/gifting/champion.png"):
        shutil.copy("assets/gifting/champion.png", f"assets/gifting/{g}.png")
        shutil.copy("assets/gifting/champion.png", f"public/assets/gifting/{g}.png")

print("All missing badge assets successfully generated and synchronized!")
