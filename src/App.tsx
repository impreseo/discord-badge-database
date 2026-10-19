/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import badgeJson from "../data/badges.json";
import categoriesJson from "../data/categories.json";
import historyJson from "../data/history.json";
import sourcesJson from "../data/sources.json";

import { Navbar, NavTab } from "./components/Navbar";
import { BadgeCard } from "./components/BadgeCard";
import { BadgeDetailModal } from "./components/BadgeDetailModal";
import { BitmaskCalculator } from "./components/BitmaskCalculator";
import { ProfileSimulator } from "./components/ProfileSimulator";
import { TimelineView } from "./components/TimelineView";
import { DocsReader } from "./components/DocsReader";
import { ExportModal } from "./components/ExportModal";

import { filterBadges, BadgeItem, FilterOptions } from "./utils/filter";
import {
  Search,
  SlidersHorizontal,
  Shield,
  Sparkles,
  CheckCircle,
  Clock,
  Archive,
  RefreshCw,
  LayoutGrid,
  ListFilter,
  Layers,
  ArrowRight
} from "lucide-react";

interface CategorySection {
  id: string;
  title: string;
  icon: string;
  description: string;
  filterFn: (b: BadgeItem) => boolean;
}

const CATEGORY_SECTIONS: CategorySection[] = [
  {
    id: "user",
    title: "Official User Profile Badges",
    icon: "👤",
    description: "Account flags and achievements displayed directly on Discord user profile cards and popouts.",
    filterFn: (b) => b.category === "user",
  },
  {
    id: "nitro",
    title: "Discord Nitro & Subscriptions",
    icon: "💎",
    description: "Active Nitro subscriber status and progressive tenure milestone badges (Bronze through Opal).",
    filterFn: (b) => b.category === "nitro",
  },
  {
    id: "boosts",
    title: "Server Boosting Milestones",
    icon: "🚀",
    description: "Consecutive boosting tenure badges earned by supporting community Discord servers.",
    filterFn: (b) => b.category === "boosts",
  },
  {
    id: "applications",
    title: "Bot & Application Badges",
    icon: "🤖",
    description: "Developer flags for bots supporting slash commands, AutoMod rules, and premium features.",
    filterFn: (b) => b.category === "applications",
  },
  {
    id: "servers",
    title: "Server Badges & Crown",
    icon: "🏰",
    description: "Guild verification emblems, partner house badges, community levels, boost tiers, and owner crowns.",
    filterFn: (b) => b.category === "servers" && !b.id.startsWith("guild_tag_"),
  },
  {
    id: "special",
    title: "Special System Flairs & Tags",
    icon: "✨",
    description: "Message and user flairs including Official, System, Verified App, Beta, and AI Clyde indicators.",
    filterFn: (b) => b.category === "special",
  },
  {
    id: "legacy",
    title: "Legacy & Hall of Fame Archive",
    icon: "📜",
    description: "Retired moderator exams, original Nitro rockets, early emblems, and documented historical anomalies.",
    filterFn: (b) => b.category === "legacy",
  },
  {
    id: "events",
    title: "Event-Exclusive & Collectibles",
    icon: "🎉",
    description: "Limited-time collectibles, quest completion rewards, lootbox clowns, and Discord Orbs experiments.",
    filterFn: (b) => b.category === "events" || b.category === "experiments",
  },
  {
    id: "progression",
    title: "Activity & Progression Badges",
    icon: "📈",
    description: "Tiered progression systems for account age, game time, game variety, streaming, and gifting.",
    filterFn: (b) => b.category === "progression",
  },
  {
    id: "clan_tags",
    title: "Guild Clan Tag Icons",
    icon: "🏷️",
    description: "41 customizable server clan tag emblems and role badges (Guild Tags 1 through 41).",
    filterFn: (b) => b.id.startsWith("guild_tag_"),
  },
];

export default function App() {
  const allBadges = useMemo(() => badgeJson.badges as BadgeItem[], []);
  const allHistory = useMemo(() => historyJson.events, []);
  const allSources = useMemo(() => sourcesJson.sources, []);
  const categories = useMemo(() => categoriesJson.categories, []);
  const statuses = useMemo(() => categoriesJson.statuses, []);

  // Navigation State
  const [activeTab, setActiveTab] = useState<NavTab>("explorer");

  // View mode: categorized sections vs flat grid
  const [viewMode, setViewMode] = useState<"categorized" | "grid">("categorized");

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState<FilterOptions["sortBy"]>("featured");
  const [hasFlagOnly, setHasFlagOnly] = useState(false);

  // Modals
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Filtered Badges
  const filteredBadges = useMemo(() => {
    return filterBadges(allBadges, {
      searchQuery,
      category: selectedCategory === "all" ? undefined : selectedCategory === "clan_tags" ? undefined : selectedCategory,
      status: selectedStatus,
      sortBy,
      hasFlagOnly,
    }).filter((b) => {
      if (selectedCategory === "clan_tags") {
        return b.id.startsWith("guild_tag_");
      }
      if (selectedCategory === "servers") {
        return b.category === "servers" && !b.id.startsWith("guild_tag_");
      }
      return true;
    });
  }, [allBadges, searchQuery, selectedCategory, selectedStatus, sortBy, hasFlagOnly]);

  // Aggregate stats
  const stats = useMemo(() => {
    const obtainable = allBadges.filter((b) => b.status === "obtainable").length;
    const retired = allBadges.filter((b) => b.status === "retired" || b.status === "historical_only").length;
    const experimental = allBadges.filter((b) => b.status === "experimental").length;
    const flagged = allBadges.filter((b) => b.discord_flag_decimal !== null).length;
    return { obtainable, retired, experimental, flagged, total: allBadges.length };
  }, [allBadges]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSortBy("featured");
    setHasFlagOnly(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] text-[#e2e8f0] flex flex-col font-sans">
      {/* Top Bar Contract Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenExport={() => setIsExportOpen(true)}
        totalBadges={allBadges.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "explorer" && (
          <div className="space-y-6">
            {/* KPI Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#121622] rounded-xl border border-[#1f2638]">
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">Cataloged Badges & Icons</span>
                <span className="text-2xl font-bold text-white font-mono tabular-nums">{stats.total}</span>
                <span className="text-[11px] text-slate-400 block">10 distinct categories</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">Currently Obtainable</span>
                <span className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">{stats.obtainable}</span>
                <span className="text-[11px] text-slate-400 block">Active earning pathways</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">Retired &amp; Historical</span>
                <span className="text-2xl font-bold text-rose-400 font-mono tabular-nums">{stats.retired}</span>
                <span className="text-[11px] text-slate-400 block">Permanently archived</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-400 block font-medium">Public API Bitmask Flags</span>
                <span className="text-2xl font-bold text-[#5865f2] font-mono tabular-nums">{stats.flagged}</span>
                <span className="text-[11px] text-slate-400 block">Decoded user &amp; app flags</span>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="p-4 bg-[#121622] rounded-xl border border-[#1f2638] space-y-4">
              {/* Row 1: Search, View Mode & Sort */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="search"
                    placeholder="Search by badge name, ID, requirement, threshold, or alias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#181f2f] border border-[#273248] rounded-lg pl-10 pr-4 py-2 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-[#5865f2]"
                  />
                </div>

                <div className="flex items-center gap-3 shrink-0 flex-wrap">
                  {/* View Mode Toggle */}
                  <div className="flex items-center p-0.5 rounded-lg bg-[#181f2f] border border-[#273248]">
                    <button
                      onClick={() => setViewMode("categorized")}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        viewMode === "categorized"
                          ? "bg-[#5865f2] text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                      title="Group badges into organized categories"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Categorized</span>
                    </button>
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        viewMode === "grid"
                          ? "bg-[#5865f2] text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                      title="Show flat sortable grid"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>Flat Grid</span>
                    </button>
                  </div>

                  {/* Flag Toggle */}
                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasFlagOnly}
                      onChange={(e) => setHasFlagOnly(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-[#5865f2] focus:ring-0 cursor-pointer"
                    />
                    <span className="whitespace-nowrap">API Flags Only</span>
                  </label>

                  {/* Sort By Selector */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as FilterOptions["sortBy"])}
                      className="bg-[#181f2f] border border-[#273248] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-[#5865f2]"
                    >
                      <option value="featured">Featured / Importance</option>
                      <option value="name_asc">Name (A–Z)</option>
                      <option value="name_desc">Name (Z–A)</option>
                      <option value="date_desc">First Observed (Newest)</option>
                      <option value="date_asc">First Observed (Oldest)</option>
                      <option value="flag_asc">Bitwise Flag Value</option>
                      <option value="status">Rarity / Status</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 2: Category Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-slate-500 text-xs mr-1 shrink-0">Category:</span>
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 font-medium ${
                    selectedCategory === "all"
                      ? "bg-[#5865f2] text-white"
                      : "bg-[#181f2f] text-slate-400 hover:text-slate-200"
                  }`}
                >
                  All ({allBadges.length})
                </button>
                {[
                  { id: "user", label: "👤 User", count: allBadges.filter((b) => b.category === "user").length },
                  { id: "nitro", label: "💎 Nitro", count: allBadges.filter((b) => b.category === "nitro").length },
                  { id: "boosts", label: "🚀 Boosting", count: allBadges.filter((b) => b.category === "boosts").length },
                  { id: "applications", label: "🤖 Bot & Apps", count: allBadges.filter((b) => b.category === "applications").length },
                  { id: "servers", label: "🏰 Servers", count: allBadges.filter((b) => b.category === "servers" && !b.id.startsWith("guild_tag_")).length },
                  { id: "special", label: "✨ Special Flairs", count: allBadges.filter((b) => b.category === "special").length },
                  { id: "legacy", label: "📜 Legacy & Fame", count: allBadges.filter((b) => b.category === "legacy").length },
                  { id: "events", label: "🎉 Events", count: allBadges.filter((b) => b.category === "events" || b.category === "experiments").length },
                  { id: "progression", label: "📈 Progression", count: allBadges.filter((b) => b.category === "progression").length },
                  { id: "clan_tags", label: "🏷️ Clan Tags", count: allBadges.filter((b) => b.id.startsWith("guild_tag_")).length },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap shrink-0 font-medium ${
                      selectedCategory === c.id
                        ? "bg-[#5865f2] text-white"
                        : "bg-[#181f2f] text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {c.label} ({c.count})
                  </button>
                ))}
              </div>

              {/* Row 3: Status Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-slate-500 text-xs mr-1 shrink-0">Status:</span>
                <button
                  onClick={() => setSelectedStatus("all")}
                  className={`px-2.5 py-0.5 rounded transition-colors whitespace-nowrap shrink-0 ${
                    selectedStatus === "all"
                      ? "bg-slate-700 text-white font-medium"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  All Statuses
                </button>
                {statuses.map((s) => {
                  const count = allBadges.filter((b) => b.status === s.id).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStatus(s.id)}
                      className={`px-2.5 py-0.5 rounded transition-colors whitespace-nowrap shrink-0 ${
                        selectedStatus === s.id
                          ? "bg-slate-700 text-white font-medium"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {s.label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>
                Showing <strong className="text-white font-mono tabular-nums">{filteredBadges.length}</strong> of{" "}
                <span className="font-mono tabular-nums">{allBadges.length}</span> badges
                {(searchQuery || selectedCategory !== "all" || selectedStatus !== "all" || hasFlagOnly) && (
                  <span className="ml-2 text-[#5865f2] font-semibold">(Filtered)</span>
                )}
              </span>

              {(searchQuery || selectedCategory !== "all" || selectedStatus !== "all" || hasFlagOnly) && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-[#5865f2] hover:text-[#7983f5] font-medium"
                >
                  <RefreshCw className="w-3 h-3" /> Reset all filters
                </button>
              )}
            </div>

            {/* Content Rendering: Categorized View vs Flat Grid */}
            {filteredBadges.length > 0 ? (
              viewMode === "categorized" ? (
                <div className="space-y-10">
                  {CATEGORY_SECTIONS.map((section) => {
                    const sectionBadges = filteredBadges.filter(section.filterFn);
                    if (sectionBadges.length === 0) return null;

                    return (
                      <section key={section.id} id={`sec-${section.id}`} className="space-y-4">
                        {/* Section Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1f2638] pb-3">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl" role="img" aria-label={section.title}>
                              {section.icon}
                            </span>
                            <div>
                              <h2 className="text-base font-bold text-white flex items-center gap-2">
                                {section.title}
                                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1e2638] text-slate-300 font-mono font-medium">
                                  {sectionBadges.length}
                                </span>
                              </h2>
                              <p className="text-xs text-slate-400">{section.description}</p>
                            </div>
                          </div>
                        </div>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {sectionBadges.map((badge) => (
                            <BadgeCard key={badge.id} badge={badge} onSelect={setSelectedBadge} />
                          ))}
                        </div>
                      </section>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredBadges.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} onSelect={setSelectedBadge} />
                  ))}
                </div>
              )
            ) : (
              <div className="p-12 text-center bg-[#121622] rounded-xl border border-[#1f2638] space-y-3">
                <Shield className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-sm font-bold text-white">No matching badges found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try adjusting your search query, selecting "All" categories, or resetting active status filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 text-xs font-semibold bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Bitmask Calculator */}
        {activeTab === "calculator" && <BitmaskCalculator />}

        {/* Tab 3: Profile Simulator */}
        {activeTab === "simulator" && <ProfileSimulator allBadges={allBadges} />}

        {/* Tab 4: Historical Timeline */}
        {activeTab === "timeline" && <TimelineView events={allHistory} />}

        {/* Tab 5: Documentation & Methodology */}
        {activeTab === "docs" && <DocsReader sources={allSources} />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#1a2130] bg-[#0c1017] py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">Discord Badge Knowledgebase</span>
            <span>·</span>
            <span>Independent Open Source Research Archive</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("docs")}
              className="hover:text-slate-300 transition-colors"
            >
              Methodology &amp; Sources
            </button>
            <button
              onClick={() => setIsExportOpen(true)}
              className="hover:text-slate-300 transition-colors"
            >
              Export JSON/CSV
            </button>
            <span>v2.2.0</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BadgeDetailModal badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
      {isExportOpen && <ExportModal onClose={() => setIsExportOpen(false)} badges={allBadges} />}
    </div>
  );
}
