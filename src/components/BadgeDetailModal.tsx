import React from "react";
import type { BadgeItem } from "../utils/filter";
import { resolveAssetPath } from "../utils/assets";
import { X, ExternalLink, Download, Shield, Calendar, Binary, Tag, Info, CheckCircle2 } from "lucide-react";

interface BadgeDetailModalProps {
  badge: BadgeItem | null;
  onClose: () => void;
}

export const BadgeDetailModal: React.FC<BadgeDetailModalProps> = ({ badge, onClose }) => {
  if (!badge) return null;

  const [imgError, setImgError] = React.useState(false);
  const assetPath = resolveAssetPath(badge.current_asset_id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-badge-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#121622] border border-[#232c3f] rounded-2xl shadow-2xl overflow-y-auto flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#121622]/95 backdrop-blur border-b border-[#1f2638]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#182030] flex items-center justify-center p-2 shrink-0">
              {assetPath && !imgError ? (
                <img
                  src={assetPath}
                  alt={badge.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain filter drop-shadow"
                />
              ) : (
                <Shield className="w-5 h-5 text-[#5865f2]" />
              )}
            </div>
            <div>
              <h2 id="modal-badge-title" className="text-lg font-bold text-white">
                {badge.name}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="capitalize">{badge.category}</span>
                <span aria-hidden="true">·</span>
                <span>{badge.subcategory.replace(/_/g, " ")}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[11px] text-[#5865f2]">{badge.id}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Main Visual & Key Stats */}
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start p-4 bg-[#181f2f] rounded-xl border border-[#232c40]">
            <div className="w-24 h-24 rounded-2xl bg-[#0f131c] flex items-center justify-center p-3 shrink-0 shadow-inner">
              {assetPath && !imgError ? (
                <img
                  src={assetPath}
                  alt={badge.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              ) : (
                <Shield className="w-10 h-10 text-[#5865f2]" />
              )}
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="px-2.5 py-1 rounded text-xs font-semibold bg-[#5865f2]/20 text-[#8ea1e1] border border-[#5865f2]/30 uppercase tracking-wider">
                  {badge.status.replace(/_/g, " ")}
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  Confidence: {badge.confidence.replace(/_/g, " ")}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed pt-1">
                {badge.description}
              </p>

              {assetPath && (
                <div className="pt-2 flex items-center justify-center sm:justify-start gap-3">
                  <a
                    href={assetPath}
                    download={`${badge.id}.${assetPath.endsWith(".png") ? "png" : "svg"}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#232d42] hover:bg-[#2c3752] text-white rounded-lg transition-colors border border-[#34405a]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download Original Asset ({assetPath.endsWith(".png") ? "PNG" : "SVG"})
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Earning Method & Requirements */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#5865f2]" /> Earning Protocol & Requirements
            </h4>
            <div className="p-4 bg-[#151a26] rounded-xl border border-[#1f2738] space-y-3 text-sm">
              <p className="text-slate-200 leading-relaxed font-normal">
                {badge.earning_method}
              </p>

              {badge.eligibility_requirements && badge.eligibility_requirements.length > 0 && (
                <div className="pt-2 border-t border-[#1e2535]">
                  <span className="text-xs font-semibold text-slate-400 block mb-2">
                    Documented Eligibility Rules:
                  </span>
                  <ul className="space-y-1.5">
                    {badge.eligibility_requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Technical API Bitfield & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Technical API Flags */}
            <div className="p-4 bg-[#151a26] rounded-xl border border-[#1f2738] space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5 text-[#5865f2]" /> Discord API Flags
              </h4>
              {badge.discord_flag_decimal !== null && badge.discord_flag_decimal !== undefined ? (
                <div className="space-y-1 text-xs font-mono tabular-nums">
                  <div className="flex justify-between py-1 border-b border-[#1f2638]">
                    <span className="text-slate-400">Decimal:</span>
                    <span className="text-white font-bold">{badge.discord_flag_decimal}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#1f2638]">
                    <span className="text-slate-400">Hexadecimal:</span>
                    <span className="text-[#5865f2] font-bold">{badge.discord_flag_hex}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Bit Position:</span>
                    <span className="text-emerald-400 font-bold">1 &lt;&lt; {badge.discord_flag_bit}</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic py-2">
                  No direct public user flag bitmask assigned in Discord API (managed via client metadata or server role).
                </p>
              )}
            </div>

            {/* Historical Chronology */}
            <div className="p-4 bg-[#151a26] rounded-xl border border-[#1f2738] space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#5865f2]" /> Chronology & Dates
              </h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between py-1 border-b border-[#1f2638]">
                  <span className="text-slate-400">First Observed:</span>
                  <span className="text-white font-mono tabular-nums">{badge.first_observed_at || "Historical"}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1f2638]">
                  <span className="text-slate-400">Official Release:</span>
                  <span className="text-slate-300 font-mono tabular-nums">{badge.official_release_date || "Rolling"}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Retirement Date:</span>
                  <span className="text-rose-400 font-mono tabular-nums">
                    {badge.retirement_date || "Active / Never"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Forensic Archival Notes */}
          {badge.notes && badge.notes.length > 0 && (
            <div className="p-4 bg-[#151a26] rounded-xl border border-[#1f2738] space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-amber-400" /> Archival & Historical Notes
              </h4>
              <ul className="space-y-1">
                {badge.notes.map((note, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-slate-500 font-mono">·</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Aliases & Sources */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#1f2638] text-xs text-slate-400">
            {badge.aliases && badge.aliases.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-slate-500" />
                <span>Aliases: {badge.aliases.join(", ")}</span>
              </div>
            )}
            <div className="tabular-nums font-mono text-[11px]">
              Last verified: {badge.last_verified_at}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
