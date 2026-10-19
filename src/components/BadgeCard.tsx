import React from "react";
import type { BadgeItem } from "../utils/filter";
import { ExternalLink, Sparkles } from "lucide-react";

interface BadgeCardProps {
  badge: BadgeItem;
  onSelect: (badge: BadgeItem) => void;
}

const STATUS_CONFIG: Record<
  string,
  { label: string; textClass: string; bgClass: string; borderClass: string }
> = {
  obtainable: {
    label: "Obtainable",
    textClass: "text-emerald-400",
    bgClass: "bg-emerald-500/10",
    borderClass: "border-emerald-500/20",
  },
  conditionally_obtainable: {
    label: "Conditional",
    textClass: "text-sky-400",
    bgClass: "bg-sky-500/10",
    borderClass: "border-sky-500/20",
  },
  limited_time: {
    label: "Limited Time",
    textClass: "text-amber-400",
    bgClass: "bg-amber-500/10",
    borderClass: "border-amber-500/20",
  },
  retired: {
    label: "Retired",
    textClass: "text-rose-400",
    bgClass: "bg-rose-500/10",
    borderClass: "border-rose-500/20",
  },
  historical_only: {
    label: "Historical",
    textClass: "text-purple-400",
    bgClass: "bg-purple-500/10",
    borderClass: "border-purple-500/20",
  },
  staff_or_internal_only: {
    label: "Staff Only",
    textClass: "text-indigo-400",
    bgClass: "bg-indigo-500/10",
    borderClass: "border-indigo-500/20",
  },
  experimental: {
    label: "Experimental",
    textClass: "text-violet-400",
    bgClass: "bg-violet-500/10",
    borderClass: "border-violet-500/20",
  },
  announced_upcoming: {
    label: "Upcoming",
    textClass: "text-teal-400",
    bgClass: "bg-teal-500/10",
    borderClass: "border-teal-500/20",
  },
  unconfirmed: {
    label: "Unconfirmed",
    textClass: "text-slate-400",
    bgClass: "bg-slate-500/10",
    borderClass: "border-slate-500/20",
  },
  unknown: {
    label: "Unknown",
    textClass: "text-slate-400",
    bgClass: "bg-slate-500/10",
    borderClass: "border-slate-500/20",
  },
};

export const BadgeCard: React.FC<BadgeCardProps> = ({ badge, onSelect }) => {
  const statusInfo = STATUS_CONFIG[badge.status] || STATUS_CONFIG.unknown;
  const assetPath = badge.current_asset_id ? `/${badge.current_asset_id.replace(/^\//, "")}` : null;
  const [imgError, setImgError] = React.useState(false);

  return (
    <div
      onClick={() => onSelect(badge)}
      className="group relative flex flex-col justify-between p-4 bg-[#121722] hover:bg-[#161c2a] border border-[#1e2638] hover:border-[#2d374d] rounded-xl cursor-pointer transition-all duration-200"
    >
      <div>
        {/* Top bar: Asset and Status indicator */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="relative w-12 h-12 rounded-lg bg-[#181f2f] border border-[#222b3e] flex items-center justify-center p-1.5 group-hover:scale-105 group-hover:border-[#5865f2]/40 transition-all shrink-0">
            {assetPath && !imgError ? (
              <img
                src={assetPath}
                alt={badge.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#5865f2]">
                <Sparkles className="w-5 h-5 text-slate-400" />
              </div>
            )}
          </div>

          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${statusInfo.bgClass} ${statusInfo.textClass} ${statusInfo.borderClass}`}
          >
            {statusInfo.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-white group-hover:text-[#5865f2] transition-colors line-clamp-1">
          {badge.name}
        </h3>

        {/* Clean unboxed metadata with bullet separators (anti-pill discipline) */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1 mb-2">
          <span className="capitalize">{badge.category}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="truncate max-w-[130px]">{badge.subcategory.replace(/_/g, " ")}</span>
          {badge.first_observed_at && (
            <>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="tabular-nums">{badge.first_observed_at.substring(0, 4)}</span>
            </>
          )}
        </div>

        {/* Short requirement description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {badge.description}
        </p>
      </div>

      {/* Card Footer: Technical Flag and Inspect button */}
      <div className="pt-3 mt-3 border-t border-[#1a2232] flex items-center justify-between text-xs">
        {badge.discord_flag_decimal !== null && badge.discord_flag_decimal !== undefined ? (
          <span className="text-[11px] font-mono tabular-nums text-slate-400">
            Flag: <span className="text-[#5865f2] font-semibold">{badge.discord_flag_hex || `1<<${badge.discord_flag_bit}`}</span>
          </span>
        ) : (
          <span className="text-[11px] text-slate-500 italic">No bitmask flag</span>
        )}

        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 group-hover:text-white transition-colors">
          Inspect <ExternalLink className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
