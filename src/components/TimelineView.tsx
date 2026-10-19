import React, { useState } from "react";
import { History, Calendar, Sparkles, Filter } from "lucide-react";

interface TimelineEvent {
  date: string;
  event_type: string;
  badge_id: string;
  title: string;
  description: string;
}

interface TimelineViewProps {
  events: TimelineEvent[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({ events }) => {
  const [filterType, setFilterType] = useState<string>("all");

  const eventTypes = ["all", "launch", "redesign", "rename_and_closure", "migration", "event_award", "experiment"];

  const filteredEvents = events.filter((e) => {
    if (filterType === "all") return true;
    return e.event_type === filterType;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1f2638] pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-[#5865f2]" /> Discord Badge Historical Chronology (2015–2026)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Forensic timeline of major badge introductions, program closures, visual overhauls, and rare platform events.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-slate-500 mr-1" />
          {eventTypes.map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-2.5 py-1 text-xs rounded-lg transition-colors capitalize ${
                filterType === t
                  ? "bg-[#5865f2] text-white font-semibold"
                  : "bg-[#161c28] text-slate-400 hover:text-slate-200 border border-[#222a3b]"
              }`}
            >
              {t.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 border-l border-[#222c40] space-y-8 my-6">
        {filteredEvents.map((evt, idx) => {
          return (
            <div key={idx} className="relative group">
              {/* Dot on timeline line */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#121622] border-2 border-[#5865f2] group-hover:scale-125 transition-transform shadow" />

              <div className="p-4 bg-[#121622] border border-[#20283a] rounded-xl hover:border-[#2f3b55] transition-colors space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#5865f2]" />
                    <span className="text-xs font-mono font-bold text-slate-200 tabular-nums">
                      {evt.date}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono font-semibold bg-[#182030] text-[#8ea1e1] border border-[#27354f]">
                      {evt.event_type.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-[#5865f2] transition-colors">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {evt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
