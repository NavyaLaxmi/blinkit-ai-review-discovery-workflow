import React, { useState } from "react";
import { ThemeCluster } from "../types";
import { Layers, MessageSquare, AlertCircle, TrendingUp, CheckCircle, Quote, ChevronDown, ChevronUp } from "lucide-react";

interface ThemesAndClustersViewProps {
  themes: ThemeCluster[];
}

export const ThemesAndClustersView: React.FC<ThemesAndClustersViewProps> = ({ themes }) => {
  const [expandedThemeId, setExpandedThemeId] = useState<string | null>(
    themes?.[0]?.id || null
  );

  if (!themes || themes.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
        No thematic clusters identified.
      </div>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedThemeId(expandedThemeId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-700" />
            Recurring Themes & Cluster Discovery ({themes.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Feedback clustered by topic similarity, volume, and customer impact level
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {themes.map((theme) => {
          const isExpanded = expandedThemeId === theme.id;

          const isNegative =
            theme.sentiment?.toLowerCase().includes("neg") ||
            theme.sentiment?.toLowerCase().includes("crit");
          const isPositive =
            theme.sentiment?.toLowerCase().includes("pos");

          return (
            <div
              key={theme.id}
              className={`bg-white border rounded-2xl p-5 transition-all shadow-xs ${
                isExpanded
                  ? "border-emerald-600 ring-2 ring-emerald-500/20 shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {/* Header Badge & Title */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isNegative
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : isPositive
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    {theme.sentiment || "Mixed"}
                  </span>

                  <span className="bg-yellow-100 text-yellow-900 border border-yellow-300 text-[11px] font-bold px-2 py-0.5 rounded-full">
                    {theme.count} mentions
                  </span>

                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    Impact: {theme.impactLevel || "High"}
                  </span>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 text-base mb-1.5">
                {theme.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {theme.description}
              </p>

              {/* Sample User Quotes Section */}
              {theme.sampleQuotes && theme.sampleQuotes.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => toggleExpand(theme.id)}
                    className="w-full flex items-center justify-between text-xs font-bold text-emerald-800 hover:text-emerald-900 py-1 cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Quote className="w-3.5 h-3.5 text-yellow-600" />
                      View Customer Quotes ({theme.sampleQuotes.length})
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 space-y-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                      {theme.sampleQuotes.map((quote, qIdx) => (
                        <div
                          key={qIdx}
                          className="italic text-slate-700 border-l-2 border-yellow-400 pl-2.5 py-1 text-xs"
                        >
                          "{quote}"
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
