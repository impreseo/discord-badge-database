import React from "react";
import { Shield, Search, Binary, UserCheck, History, BookOpen, Download } from "lucide-react";

export type NavTab = "explorer" | "calculator" | "simulator" | "timeline" | "docs";

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenExport: () => void;
  totalBadges: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenExport,
  totalBadges,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0e121b]/95 backdrop-blur border-b border-[#1f2633]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#5865f2] flex items-center justify-center text-white shadow-sm shadow-[#5865f2]/20">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <button
              onClick={() => onTabChange("explorer")}
              className="text-left font-bold text-sm sm:text-base tracking-tight text-white hover:text-[#5865f2] transition-colors whitespace-nowrap shrink-0"
            >
              Discord Badge Knowledgebase
            </button>
          </div>

          {/* Zone 2: Navigation Links for Desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <button
              onClick={() => onTabChange("explorer")}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === "explorer" ? "text-white font-semibold" : "hover:text-slate-200"
              }`}
            >
              <Search className="w-4 h-4" />
              Badge Explorer
            </button>
            <button
              onClick={() => onTabChange("calculator")}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === "calculator" ? "text-white font-semibold" : "hover:text-slate-200"
              }`}
            >
              <Binary className="w-4 h-4" />
              Bitmask Calculator
            </button>
            <button
              onClick={() => onTabChange("simulator")}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === "simulator" ? "text-white font-semibold" : "hover:text-slate-200"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Profile Simulator
            </button>
            <button
              onClick={() => onTabChange("timeline")}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === "timeline" ? "text-white font-semibold" : "hover:text-slate-200"
              }`}
            >
              <History className="w-4 h-4" />
              Timeline
            </button>
            <button
              onClick={() => onTabChange("docs")}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                activeTab === "docs" ? "text-white font-semibold" : "hover:text-slate-200"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Documentation
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-[#5865f2] hover:bg-[#4752c4] rounded-lg transition-colors shadow-sm shadow-[#5865f2]/20 whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
              <span className="bg-black/20 px-1.5 py-0.2 rounded text-[10px] font-mono tabular-nums">
                {totalBadges}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Subnav (Visible on mobile/tablet screens only) */}
        <nav className="flex md:hidden items-center gap-1 overflow-x-auto pb-2.5 pt-1 border-t border-[#1a2130] text-xs">
          <button
            onClick={() => onTabChange("explorer")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              activeTab === "explorer" ? "bg-[#5865f2] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Explorer
          </button>
          <button
            onClick={() => onTabChange("calculator")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              activeTab === "calculator" ? "bg-[#5865f2] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Calculator
          </button>
          <button
            onClick={() => onTabChange("simulator")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              activeTab === "simulator" ? "bg-[#5865f2] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Simulator
          </button>
          <button
            onClick={() => onTabChange("timeline")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              activeTab === "timeline" ? "bg-[#5865f2] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => onTabChange("docs")}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
              activeTab === "docs" ? "bg-[#5865f2] text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            Docs
          </button>
        </nav>
      </div>
    </header>
  );
};
