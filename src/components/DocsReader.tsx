import React, { useState } from "react";
import { BookOpen, ShieldCheck, FileText, ExternalLink, Database, CheckCircle2 } from "lucide-react";

interface SourceItem {
  id: string;
  title: string;
  url: string;
  source_tier: string;
  publisher: string;
  published_date: string;
  notes: string;
}

interface DocsReaderProps {
  sources: SourceItem[];
}

export const DocsReader: React.FC<DocsReaderProps> = ({ sources }) => {
  const [docSection, setDocSection] = useState<string>("methodology");

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1f2638] pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#5865f2]" /> Knowledgebase Documentation & Verification Methodology
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Evidence standards, citation hierarchy, and investigative principles governing the Discord Badge Knowledgebase.
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 border-b border-[#1f2638] pb-2 overflow-x-auto">
        <button
          onClick={() => setDocSection("methodology")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            docSection === "methodology"
              ? "bg-[#5865f2] text-white"
              : "bg-[#151a26] text-slate-400 hover:text-slate-200"
          }`}
        >
          Verification Methodology & Tiers
        </button>
        <button
          onClick={() => setDocSection("sources")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            docSection === "sources"
              ? "bg-[#5865f2] text-white"
              : "bg-[#151a26] text-slate-400 hover:text-slate-200"
          }`}
        >
          Primary Sources Index ({sources.length})
        </button>
        <button
          onClick={() => setDocSection("disclaimer")}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            docSection === "disclaimer"
              ? "bg-[#5865f2] text-white"
              : "bg-[#151a26] text-slate-400 hover:text-slate-200"
          }`}
        >
          Legal & Fair Use
        </button>
      </div>

      {/* Content Panels */}
      {docSection === "methodology" && (
        <div className="space-y-6 text-sm text-slate-300 leading-relaxed bg-[#121622] p-6 rounded-xl border border-[#20283a]">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Evidence Hierarchy Standards
          </h3>
          <p>
            To prevent misinformation and speculative claims, this digital archive classifies all data points according to a 4-tier evidentiary pyramid:
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-4 bg-[#161c28] rounded-lg border border-[#242e42] space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Tier 1 — Official Evidence
              </span>
              <p className="text-xs text-slate-300">
                Official Discord Help Center articles, Discord Developer Portal documentation, official Discord Blog announcements, and corporate terms of service.
              </p>
            </div>

            <div className="p-4 bg-[#161c28] rounded-lg border border-[#242e42] space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block">
                Tier 2 — Direct Technical Evidence
              </span>
              <p className="text-xs text-slate-300">
                Public client asset endpoints (<code className="text-emerald-300 font-mono">cdn.discordapp.com</code>), public REST API JSON bitfield schemas (<code className="text-emerald-300 font-mono">user.public_flags</code>), and client asset bundle inspection.
              </p>
            </div>

            <div className="p-4 bg-[#161c28] rounded-lg border border-[#242e42] space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block">
                Tier 3 — Established Community Repositories
              </span>
              <p className="text-xs text-slate-300">
                Maintained digital archives with verifiable commit histories, notably <strong className="text-white">mezotv/discord-badges</strong> and <strong className="text-white">PandaDevOfficial/badges-discord</strong>.
              </p>
            </div>

            <div className="p-4 bg-[#161c28] rounded-lg border border-[#242e42] space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 block">
                Tier 4 — Unverified Reports & Rumors
              </span>
              <p className="text-xs text-slate-300">
                Datamined unused asset strings, Reddit speculation, and unverified screenshots. Kept strictly segregated under <code className="font-mono text-xs">unconfirmed</code> status until corroborated.
              </p>
            </div>
          </div>
        </div>
      )}

      {docSection === "sources" && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            Cataloged official support articles, developer bitfield specifications, and verified community databases:
          </div>
          <div className="grid grid-cols-1 gap-3">
            {sources.map((src) => (
              <div
                key={src.id}
                className="p-4 bg-[#121622] rounded-xl border border-[#20283a] hover:border-[#2f3b55] transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {src.title}
                  </h4>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#5865f2] hover:text-[#7983f5] transition-colors flex items-center gap-1 text-xs shrink-0 font-medium"
                  >
                    Open Source <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span className="text-emerald-400 font-semibold">{src.source_tier}</span>
                  <span>·</span>
                  <span>{src.publisher}</span>
                  <span>·</span>
                  <span>{src.published_date}</span>
                </div>
                <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                  {src.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {docSection === "disclaimer" && (
        <div className="p-6 bg-[#121622] rounded-xl border border-[#20283a] space-y-4 text-sm text-slate-300 leading-relaxed">
          <h3 className="text-base font-bold text-white">
            Intellectual Property & Fair Use Statement
          </h3>
          <p>
            This application and digital archive is an educational and digital preservation project. All Discord names, brand assets, product marks, and badge iconography are the exclusive property of <strong>Discord Inc.</strong>
          </p>
          <p>
            The inclusion of badge artwork, flag definitions, and historical screenshots constitutes fair-use transformative commentary, academic archiving, and technical documentation.
          </p>
          <div className="p-4 bg-[#161c28] rounded-lg border border-[#242e42] text-xs space-y-2">
            <span className="font-bold text-slate-200 block">Security and Compliance Notice</span>
            <p className="text-slate-400">
              This repository strictly prohibits and does not facilitate unauthorized badge generation, token abuse, API spoofing, account cracking, or attempts to circumvent Discord's award systems. Discord badges cannot be transferred between accounts except via official server ownership transfers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
