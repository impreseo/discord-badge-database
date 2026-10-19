import React, { useState } from "react";
import { X, Download, FileJson, FileSpreadsheet, FileCode, Copy, Check } from "lucide-react";
import type { BadgeItem } from "../utils/filter";

interface ExportModalProps {
  badges: BadgeItem[];
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ badges, onClose }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ total: badges.length, badges }, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "discord_badges_master.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadCSV = () => {
    // Generate CSV string
    const headers = ["id", "name", "category", "subcategory", "status", "discord_flag_decimal", "description"];
    const rows = badges.map((b) => [
      `"${b.id}"`,
      `"${b.name.replace(/"/g, '""')}"`,
      `"${b.category}"`,
      `"${b.subcategory}"`,
      `"${b.status}"`,
      b.discord_flag_decimal ?? "",
      `"${b.description.replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "discord_badges_master.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(badges, null, 2));
    setCopiedType("json");
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#121622] border border-[#232c3f] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f2638]">
          <h2 id="export-modal-title" className="text-base font-bold text-white flex items-center gap-2">
            <Download className="w-4 h-4 text-[#5865f2]" /> Export Knowledgebase Dataset
          </h2>
          <button
            onClick={onClose}
            aria-label="Close export modal"
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-300 leading-relaxed">
            Download or copy the verified master dataset ({badges.length} records) formatted for programmatic research, bots, and analytics:
          </p>

          <div className="space-y-3">
            {/* JSON Option */}
            <div className="p-4 bg-[#161c28] border border-[#242e42] rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileJson className="w-6 h-6 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Full JSON Database</div>
                  <div className="text-[11px] text-slate-400">Structured format with schemas & flags</div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyJSON}
                  className="px-2.5 py-1.5 text-xs bg-[#202737] hover:bg-[#283246] text-slate-200 rounded-lg transition-colors flex items-center gap-1 font-medium"
                >
                  {copiedType === "json" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === "json" ? "Copied" : "Copy"}</span>
                </button>
                <button
                  onClick={handleDownloadJSON}
                  className="px-3 py-1.5 text-xs bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-lg transition-colors font-semibold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* CSV Option */}
            <div className="p-4 bg-[#161c28] border border-[#242e42] rounded-xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="w-6 h-6 text-sky-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">Tabular CSV Spreadsheet</div>
                  <div className="text-[11px] text-slate-400">Import directly into Excel or Google Sheets</div>
                </div>
              </div>
              <button
                onClick={handleDownloadCSV}
                className="px-3 py-1.5 text-xs bg-[#5865f2] hover:bg-[#4752c4] text-white rounded-lg transition-colors font-semibold flex items-center gap-1 shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 font-mono">
            Direct file path: <span className="text-slate-400">/data/badges.json</span> &amp; <span className="text-slate-400">/data/badges.csv</span>
          </div>
        </div>
      </div>
    </div>
  );
};
