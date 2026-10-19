import React, { useState, useMemo } from "react";
import type { BadgeItem } from "../utils/filter";
import { UserCheck, Sparkles, RefreshCw, Palette, Search, Layers, Check } from "lucide-react";

interface ProfileSimulatorProps {
  allBadges: BadgeItem[];
}

const PRESET_LOADOUTS: Array<{
  name: string;
  badgeIds: string[];
  bannerColor: string;
  displayName: string;
  handle: string;
  status: string;
}> = [
  {
    name: "Staff & Partner",
    badgeIds: ["discord_staff", "partnered_server_owner", "hypesquad_events", "early_supporter", "active_developer", "discord_nitro", "boost_tier_24_months"],
    bannerColor: "#5865f2",
    displayName: "Discord Admin",
    handle: "staff_lead",
    status: "Building Discord experiences 🛠️",
  },
  {
    name: "2016 Veteran",
    badgeIds: ["early_supporter", "old_discord_mod", "old_discord_nitro", "legacy_username", "hypesquad_balance"],
    bannerColor: "#3ba55c",
    displayName: "Classic User",
    handle: "veteran_2016",
    status: "Been here since day one ✨",
  },
  {
    name: "Max Nitro Booster",
    badgeIds: ["discord_nitro", "boost_tier_24_months", "nitro_tenure_opal", "server_boost_level_3"],
    bannerColor: "#eb459e",
    displayName: "Hyperspace",
    handle: "boost_queen",
    status: "72+ months consecutive Nitro subscriber 🚀",
  },
  {
    name: "Developer & Bug Hunter",
    badgeIds: ["active_developer", "bug_hunter_tier_2", "early_verified_bot_developer", "supports_commands", "uses_automod"],
    bannerColor: "#faa61a",
    displayName: "Bot Architect",
    handle: "code_ninja",
    status: "100+ active slash commands & auto-mod rules 🤖",
  },
  {
    name: "Hall of Fame Artifacts",
    badgeIds: ["hall_of_fame_spongetext", "hall_of_fame_sapphire", "golden_hypesquad_balance", "koth_hypesquad_balance", "hall_of_fame_wumpus"],
    bannerColor: "#fee75c",
    displayName: "Badge Archivist",
    handle: "lore_keeper",
    status: "Preserving anomalous Discord history 🏛️",
  },
  {
    name: "Quests & Collectibles",
    badgeIds: ["quest_completion", "orbs_apprentice", "lootbox_clown_2024", "last_meadow_online"],
    bannerColor: "#ed4245",
    displayName: "Quest Champion",
    handle: "collector",
    status: "Completed Discord quests & April Fools events 🎯",
  },
];

const SafeBadgeIcon: React.FC<{ badge: BadgeItem; className?: string; fallbackSize?: string }> = ({
  badge,
  className = "w-4 h-4 object-contain filter drop-shadow",
  fallbackSize = "w-3 h-3 text-slate-500",
}) => {
  const [error, setError] = useState(false);
  const asset = badge.current_asset_id ? `/${badge.current_asset_id.replace(/^\//, "")}` : null;

  if (!asset || error) {
    return <Sparkles className={fallbackSize} />;
  }

  return (
    <img
      src={asset}
      alt={badge.name}
      onError={() => setError(true)}
      className={className}
    />
  );
};

export const ProfileSimulator: React.FC<ProfileSimulatorProps> = ({ allBadges }) => {
  const [displayName, setDisplayName] = useState("Discord Explorer");
  const [handle, setHandle] = useState("discord_archivist");
  const [statusText, setStatusText] = useState("Researching badges since 2015 🛡️");
  const [bannerColor, setBannerColor] = useState("#5865f2");
  const [hoveredBadge, setHoveredBadge] = useState<BadgeItem | null>(null);

  // Badge Drawer Controls
  const [badgeSearch, setBadgeSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Selected badge IDs
  const [selectedBadgeIds, setSelectedBadgeIds] = useState<string[]>([
    "discord_staff",
    "partnered_server_owner",
    "early_supporter",
    "hypesquad_bravery",
    "active_developer",
    "discord_nitro",
    "boost_tier_24_months",
  ]);

  const selectedBadges = useMemo(() => {
    return selectedBadgeIds
      .map((id) => allBadges.find((b) => b.id === id))
      .filter((b): b is BadgeItem => Boolean(b));
  }, [selectedBadgeIds, allBadges]);

  const toggleBadge = (id: string) => {
    if (selectedBadgeIds.includes(id)) {
      setSelectedBadgeIds(selectedBadgeIds.filter((bId) => bId !== id));
    } else {
      setSelectedBadgeIds([...selectedBadgeIds, id]);
    }
  };

  const applyPreset = (preset: typeof PRESET_LOADOUTS[0]) => {
    setSelectedBadgeIds(preset.badgeIds);
    setBannerColor(preset.bannerColor);
    setDisplayName(preset.displayName);
    setHandle(preset.handle);
    setStatusText(preset.status);
  };

  const handleReset = () => {
    setSelectedBadgeIds([
      "discord_staff",
      "early_supporter",
      "hypesquad_bravery",
      "active_developer",
      "discord_nitro",
    ]);
    setDisplayName("Discord Explorer");
    setHandle("discord_archivist");
    setStatusText("Researching badges since 2015 🛡️");
    setBannerColor("#5865f2");
    setBadgeSearch("");
    setFilterCategory("all");
  };

  // Filtered badges in drawer
  const availableBadges = useMemo(() => {
    let list = allBadges;

    if (filterCategory === "user") list = list.filter((b) => b.category === "user");
    else if (filterCategory === "nitro") list = list.filter((b) => b.category === "nitro" || b.category === "boosts");
    else if (filterCategory === "legacy") list = list.filter((b) => b.category === "legacy");
    else if (filterCategory === "apps") list = list.filter((b) => b.category === "applications" || b.category === "special");
    else if (filterCategory === "servers") list = list.filter((b) => b.category === "servers" && !b.id.startsWith("guild_tag_"));
    else if (filterCategory === "clan_tags") list = list.filter((b) => b.id.startsWith("guild_tag_"));
    else if (filterCategory === "progression") list = list.filter((b) => b.category === "progression");
    else if (filterCategory === "events") list = list.filter((b) => b.category === "events");

    if (badgeSearch.trim()) {
      const q = badgeSearch.toLowerCase().trim();
      list = list.filter((b) =>
        b.name.toLowerCase().includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.aliases?.some((a) => a.toLowerCase().includes(q))
      );
    }

    return list;
  }, [allBadges, filterCategory, badgeSearch]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1f2638] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#5865f2]" /> Interactive Discord Profile Badge Simulator
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Simulate how any combination of official, legacy, or progressive badges renders on a Discord user profile card.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedBadgeIds([])}
            className="px-3 py-1.5 text-xs font-semibold bg-[#181f2f] hover:bg-[#20293d] text-slate-400 hover:text-white rounded-lg transition-colors border border-[#2b364e]"
          >
            Clear All
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#1d2536] hover:bg-[#252f44] text-slate-300 rounded-lg transition-colors border border-[#2b364e] shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Default</span>
          </button>
        </div>
      </div>

      {/* Preset Loadouts Bar */}
      <div className="p-3 bg-[#121622] rounded-xl border border-[#20283a] space-y-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
          ⚡ One-Click Preset Loadouts:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {PRESET_LOADOUTS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="px-3 py-1.5 rounded-lg bg-[#181f2f] hover:bg-[#232c40] text-slate-200 hover:text-white border border-[#2a3449] whitespace-nowrap text-xs font-medium transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>{preset.name}</span>
              <span className="text-[10px] text-slate-400 font-mono">({preset.badgeIds.length})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Customization Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-[#121622] p-5 rounded-xl border border-[#20283a]">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Card Attributes & Profile Text
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                maxLength={32}
                className="w-full bg-[#181f2f] border border-[#2a3449] rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-[#5865f2]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Unique Handle (@username)
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                maxLength={32}
                className="w-full bg-[#181f2f] border border-[#2a3449] rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-[#5865f2]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                About Me / Status Text
              </label>
              <textarea
                value={statusText}
                onChange={(e) => setStatusText(e.target.value)}
                rows={2}
                maxLength={120}
                className="w-full bg-[#181f2f] border border-[#2a3449] rounded-lg px-3 py-2 text-xs font-medium text-white focus:outline-none focus:border-[#5865f2] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" /> Banner Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bannerColor}
                  onChange={(e) => setBannerColor(e.target.value)}
                  className="w-8 h-8 rounded border border-[#2a3449] bg-transparent cursor-pointer"
                />
                <div className="flex items-center gap-1.5 flex-wrap">
                  {["#5865f2", "#eb459e", "#57f287", "#fee75c", "#ed4245", "#23272a"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setBannerColor(c)}
                      style={{ backgroundColor: c }}
                      className="w-6 h-6 rounded-full border border-black/30 hover:scale-110 transition-transform"
                      title={c}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Badge Selector with Search & Categories */}
          <div className="pt-2 border-t border-[#1f2638] space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                Equip Badges ({selectedBadgeIds.length} active)
              </label>
              <span className="text-[11px] text-slate-500 font-mono">
                {availableBadges.length} available
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="search"
                placeholder="Search badges (e.g. staff, nitro, boost)..."
                value={badgeSearch}
                onChange={(e) => setBadgeSearch(e.target.value)}
                className="w-full bg-[#181f2f] border border-[#2a3449] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5865f2]"
              />
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px]">
              {[
                { id: "all", label: "All" },
                { id: "user", label: "👤 User" },
                { id: "nitro", label: "💎 Nitro/Boost" },
                { id: "legacy", label: "📜 Legacy/Fame" },
                { id: "apps", label: "🤖 Apps & Flairs" },
                { id: "servers", label: "🏰 Servers" },
                { id: "events", label: "🎉 Events" },
                { id: "progression", label: "📈 Progression" },
                { id: "clan_tags", label: "🏷️ Clan Tags" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setFilterCategory(c.id)}
                  className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap shrink-0 font-medium ${
                    filterCategory === c.id
                      ? "bg-[#5865f2] text-white"
                      : "bg-[#181f2f] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Badges List */}
            <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
              {availableBadges.map((b) => {
                const isSelected = selectedBadgeIds.includes(b.id);
                const asset = b.current_asset_id ? `/${b.current_asset_id.replace(/^\//, "")}` : null;
                return (
                  <button
                    key={b.id}
                    onClick={() => toggleBadge(b.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors border text-left ${
                      isSelected
                        ? "bg-[#5865f2]/20 border-[#5865f2]/50 text-white"
                        : "bg-[#161c28] border-[#222a3b] text-slate-400 hover:text-slate-200 hover:bg-[#1a2130]"
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-5 h-5 rounded bg-[#0f131a] border border-[#222b3e] flex items-center justify-center p-0.5 shrink-0">
                        <SafeBadgeIcon badge={b} className="w-full h-full object-contain" fallbackSize="w-3 h-3 text-slate-500" />
                      </div>
                      <span className="truncate">{b.name}</span>
                    </div>
                    <span
                      className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded shrink-0 ml-1 ${
                        isSelected
                          ? "bg-[#5865f2] text-white font-bold"
                          : "bg-black/30 text-slate-500"
                      }`}
                    >
                      {isSelected ? "Equipped" : "+ Add"}
                    </span>
                  </button>
                );
              })}
              {availableBadges.length === 0 && (
                <div className="p-4 text-center text-xs text-slate-500 italic">
                  No badges match your search.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Discord Profile Card Mockup (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-[360px] bg-[#232428] rounded-2xl shadow-2xl overflow-hidden border border-[#111214] font-sans">
            {/* Discord Header Banner */}
            <div
              style={{ backgroundColor: bannerColor }}
              className="h-28 w-full relative transition-colors duration-300"
            />

            {/* Profile Avatar & Badges Bar */}
            <div className="px-4 pb-4 relative">
              <div className="flex justify-between items-end -mt-10 mb-3">
                {/* Avatar with status circle */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-[#1e1f22] p-1.5 shadow-md">
                    <div className="w-full h-full rounded-full bg-[#5865f2] flex items-center justify-center text-white text-2xl font-bold shadow-inner">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  {/* Green online dot */}
                  <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#23a55a] border-4 border-[#232428]" />
                </div>

                {/* Badge Container Box */}
                <div className="bg-[#111214] rounded-lg p-1.5 flex items-center flex-wrap gap-1.5 max-w-[210px] border border-black/30 shadow-inner min-h-[36px]">
                  {selectedBadges.length > 0 ? (
                    selectedBadges.map((badge) => {
                      const asset = badge.current_asset_id
                        ? `/${badge.current_asset_id.replace(/^\//, "")}`
                        : null;
                      return (
                        <div
                          key={badge.id}
                          onMouseEnter={() => setHoveredBadge(badge)}
                          onMouseLeave={() => setHoveredBadge(null)}
                          className="w-5 h-5 flex items-center justify-center cursor-pointer hover:scale-125 transition-transform"
                          title={badge.name}
                        >
                          <SafeBadgeIcon badge={badge} className="w-4 h-4 object-contain filter drop-shadow" fallbackSize="w-3.5 h-3.5 text-[#5865f2]" />
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-[10px] text-slate-500 italic px-1">No badges equipped</span>
                  )}
                </div>
              </div>

              {/* Username & Tag */}
              <div className="bg-[#111214] rounded-xl p-3 space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide leading-tight">
                    {displayName}
                  </h3>
                  <div className="text-xs text-[#b5bac1] font-medium font-sans">
                    @{handle}
                  </div>
                </div>

                {/* Custom Status */}
                <div className="text-xs text-[#dbdee1] border-t border-[#1f2023] pt-2.5">
                  {statusText}
                </div>

                {/* Member Since Simulation */}
                <div className="border-t border-[#1f2023] pt-2.5 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-[#b5bac1] tracking-wider">
                    Discord Member Since
                  </div>
                  <div className="text-xs text-[#dbdee1]">
                    May 13, 2015
                  </div>
                </div>
              </div>

              {/* Live Tooltip Display */}
              <div className="mt-3 min-h-[36px] flex items-center justify-center">
                {hoveredBadge ? (
                  <div className="bg-black/90 text-white text-[11px] px-3 py-1.5 rounded-lg shadow-lg border border-white/10 animate-fade-in flex items-center gap-1.5">
                    <span className="font-semibold text-white">{hoveredBadge.name}</span>
                    <span className="text-slate-400">·</span>
                    <span className="text-[#5865f2] capitalize font-mono">{hoveredBadge.category}</span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-500 italic">
                    Hover over any badge icon above to inspect title
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
