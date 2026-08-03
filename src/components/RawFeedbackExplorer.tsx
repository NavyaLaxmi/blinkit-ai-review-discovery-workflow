import React, { useState } from "react";
import { FeedbackItem } from "../types";
import { Search, Filter, MessageSquare, Star, FileText } from "lucide-react";

interface RawFeedbackExplorerProps {
  items: FeedbackItem[];
}

export const RawFeedbackExplorer: React.FC<RawFeedbackExplorerProps> = ({ items }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState<string>("ALL");

  if (!items || items.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
        No raw feedback items available.
      </div>
    );
  }

  // Get distinct sources
  const sources = Array.from(new Set(items.map((i) => i.source || "Other")));

  const filtered = items.filter((item) => {
    const matchesSource =
      selectedSource === "ALL" || item.source === selectedSource;
    const matchesSearch =
      !searchTerm ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.author && item.author.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSource && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-700" />
            Raw Customer Feedback Explorer ({filtered.length} of {items.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Search and inspect verbatim feedback items ingested into the Gemini workflow
          </p>
        </div>

        {/* Search & Source Filter Bar */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-1.5 text-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-48 sm:w-60"
            />
          </div>

          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-medium focus:ring-2 focus:ring-emerald-500"
          >
            <option value="ALL">All Sources ({items.length})</option>
            {sources.map((src) => (
              <option key={src} value={src}>
                {src}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reviews Table / Cards */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
          {filtered.map((item, idx) => (
            <div key={item.id || idx} className="p-4 hover:bg-slate-50/80 transition text-xs space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-md text-[11px]">
                    {item.source}
                  </span>
                  {item.author && (
                    <span className="font-semibold text-slate-700">{item.author}</span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  {item.rating && (
                    <span className="text-amber-600 font-bold flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                      {item.rating}/5
                    </span>
                  )}
                  {item.date && <span>{item.date}</span>}
                </div>
              </div>

              <p className="text-slate-800 leading-relaxed font-normal">
                "{item.content}"
              </p>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs">
              No matching reviews found for "{searchTerm}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
