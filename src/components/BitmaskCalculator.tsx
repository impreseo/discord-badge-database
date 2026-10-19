import React, { useState } from "react";
import { DISCORD_USER_FLAGS, decodeUserFlags, calculateBitmask, hasFlag } from "../utils/flags";
import { Binary, Check, Copy, RefreshCw, Sparkles, HelpCircle } from "lucide-react";

export const BitmaskCalculator: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("4194817"); // Staff + Early Supporter + Active Dev
  const [copied, setCopied] = useState(false);

  // Parse decimal or hex
  const parseMask = (val: string): number => {
    const trimmed = val.trim();
    if (!trimmed) return 0;
    if (trimmed.startsWith("0x") || trimmed.startsWith("0X")) {
      const parsed = parseInt(trimmed, 16);
      return isNaN(parsed) ? 0 : parsed;
    }
    const parsed = parseInt(trimmed, 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  const currentBitmask = parseMask(inputValue);
  const activeFlags = decodeUserFlags(currentBitmask);

  const handleToggleFlag = (decimal: number) => {
    let nextBitmask: number;
    if (hasFlag(currentBitmask, decimal)) {
      nextBitmask = currentBitmask & ~decimal;
    } else {
      nextBitmask = currentBitmask | decimal;
    }
    setInputValue(nextBitmask.toString(10));
  };

  const handlePreset = (decimals: number[]) => {
    const mask = calculateBitmask(decimals);
    setInputValue(mask.toString(10));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentBitmask.toString(10));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1f2638] pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Binary className="w-5 h-5 text-[#5865f2]" /> Discord Public Flags Bitmask Calculator & Decoder
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Decode raw integer values from the Discord REST API (<code className="text-xs text-[#5865f2] font-mono">user.public_flags</code>) into active badges, or select badges to generate bitmask integers.
        </p>
      </div>

      {/* Input / Output Console */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Input box */}
        <div className="md:col-span-2 p-5 bg-[#121622] border border-[#20283a] rounded-xl space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Enter Decimal Bitmask or Hex Value
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. 4194817 or 0x400201"
              className="flex-1 bg-[#181f2f] border border-[#2b354c] rounded-lg px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-[#5865f2] tabular-nums"
            />
            <button
              onClick={handleCopy}
              className="px-3.5 py-2.5 bg-[#232c3f] hover:bg-[#2c3750] text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
              title="Copy decimal"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={() => setInputValue("0")}
              className="px-3 py-2.5 bg-[#232c3f] hover:bg-[#2c3750] text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shrink-0"
              title="Reset to 0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>

          {/* Quick Presets */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 text-xs">Presets:</span>
            <button
              onClick={() => handlePreset([1, 512, 4194304])}
              className="px-2.5 py-1 rounded bg-[#1a2232] hover:bg-[#222c42] text-slate-300 border border-[#273248] transition-colors"
            >
              Staff + Early Supporter + Active Dev
            </button>
            <button
              onClick={() => handlePreset([4194304])}
              className="px-2.5 py-1 rounded bg-[#1a2232] hover:bg-[#222c42] text-slate-300 border border-[#273248] transition-colors"
            >
              Active Dev Only (4194304)
            </button>
            <button
              onClick={() => handlePreset([2, 512])}
              className="px-2.5 py-1 rounded bg-[#1a2232] hover:bg-[#222c42] text-slate-300 border border-[#273248] transition-colors"
            >
              Partner + Early Supporter (514)
            </button>
            <button
              onClick={() => handlePreset([131072, 262144])}
              className="px-2.5 py-1 rounded bg-[#1a2232] hover:bg-[#222c42] text-slate-300 border border-[#273248] transition-colors"
            >
              Legacy Dev + Mod Alumni
            </button>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="p-5 bg-[#121622] border border-[#20283a] rounded-xl flex flex-col justify-between space-y-4">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Computed Values
            </span>
            <div className="mt-3 space-y-2 text-xs font-mono tabular-nums">
              <div className="flex justify-between py-1 border-b border-[#1d2535]">
                <span className="text-slate-400">Decimal:</span>
                <span className="text-white font-bold">{currentBitmask}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1d2535]">
                <span className="text-slate-400">Hexadecimal:</span>
                <span className="text-[#5865f2] font-bold">
                  0x{currentBitmask.toString(16).toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Active Badges:</span>
                <span className="text-emerald-400 font-bold">{activeFlags.length}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-[#181f2f] rounded-lg text-[11px] text-slate-400 leading-relaxed">
            API Payload: <code className="text-emerald-300 font-mono">"public_flags": {currentBitmask}</code>
          </div>
        </div>
      </div>

      {/* Flag Checkbox Matrix */}
      <div className="bg-[#121622] border border-[#20283a] rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">
            Discord User Flag Bitfield Matrix (Toggle to calculate)
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            {activeFlags.length} of {DISCORD_USER_FLAGS.length} selected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DISCORD_USER_FLAGS.map((f) => {
            const active = hasFlag(currentBitmask, f.decimal);
            return (
              <button
                key={f.decimal}
                onClick={() => handleToggleFlag(f.decimal)}
                className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                  active
                    ? "bg-[#5865f2]/15 border-[#5865f2]/40 text-white shadow-sm shadow-[#5865f2]/10"
                    : "bg-[#161c28] border-[#222a3b] text-slate-300 hover:border-[#2f3a52]"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center mt-0.5 shrink-0 border transition-colors ${
                    active
                      ? "bg-[#5865f2] border-[#5865f2] text-white"
                      : "bg-[#10141d] border-slate-700 text-transparent"
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold truncate">{f.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      1&lt;&lt;{f.bit}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    {f.description}
                  </div>
                  <div className="text-[10px] font-mono text-[#5865f2] mt-1 tabular-nums">
                    {f.decimal} ({f.hex})
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Technical FAQ Box */}
      <div className="p-4 bg-[#141824] rounded-xl border border-[#222a3c] flex items-start gap-3 text-xs text-slate-400 leading-relaxed">
        <HelpCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-200 block mb-1">
            How Bitwise Public Flags Work in the Discord API
          </span>
          Discord packs user badges into binary bits within a single 32-bit integer field named <code className="font-mono text-slate-300">public_flags</code>.
          To test whether a user has a badge, compute <code className="font-mono text-slate-300">(user.public_flags &amp; (1 &lt;&lt; bit)) === (1 &lt;&lt; bit)</code>. Note that badges without flags (such as Nitro subscription tenure or Server Booster levels) are transmitted through separate member and subscription endpoints.
        </div>
      </div>
    </div>
  );
};
