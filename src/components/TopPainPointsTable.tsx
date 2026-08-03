import React, { useState } from "react";
import { PainPoint } from "../types";
import { AlertCircle, TrendingDown, Users, DollarSign, MessageSquare, ChevronDown, ChevronUp, ShieldAlert } from "lucide-react";

interface TopPainPointsTableProps {
  painPoints: PainPoint[];
}

export const TopPainPointsTable: React.FC<TopPainPointsTableProps> = ({ painPoints }) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    painPoints?.[0]?.id || null
  );

  if (!painPoints || painPoints.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
        No pain points identified.
      </div>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getSeverityBadge = (severity: string) => {
    const sev = severity?.toLowerCase() || "high";
    if (sev.includes("crit")) {
      return (
        <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
          <ShieldAlert className="w-3 h-3 text-rose-600" />
          Critical
        </span>
      );
    }
    if (sev.includes("high")) {
      return (
        <span className="bg-orange-100 text-orange-800 border border-orange-300 text-[11px] font-bold px-2 py-0.5 rounded-full">
          High Severity
        </span>
      );
    }
    return (
      <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[11px] font-semibold px-2 py-0.5 rounded-full">
        Medium Severity
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600" />
          Top Pain Points & Customer Friction Points ({painPoints.length})
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Frequently reported issues ranked by severity, business impact, and affected customer segments
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="divide-y divide-slate-200">
          {painPoints.map((item, idx) => {
            const isExpanded = expandedId === item.id;

            return (
              <div
                key={item.id || idx}
                className={`p-5 transition ${
                  isExpanded ? "bg-amber-50/30" : "hover:bg-slate-50/80"
                }`}
              >
                {/* Main Pain Point Row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getSeverityBadge(item.severity)}

                      <span className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-md border border-slate-200">
                        {item.category || "App UX"}
                      </span>

                      {item.frequency && (
                        <span className="text-xs text-slate-500 font-medium">
                          Reported in <strong className="text-slate-800">{item.frequency} reviews</strong>
                        </span>
                      )}
                    </div>

                    <h4 className="font-bold text-slate-900 text-base">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer self-start md:self-center"
                  >
                    <span>{isExpanded ? "Hide Details" : "View PM Impact"}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </button>
                </div>

                {/* Expanded Details Section */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    {/* Potential Business Impact */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
                      <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5 text-rose-700 mb-1">
                        <TrendingDown className="w-4 h-4" />
                        Potential Business & Revenue Impact:
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {item.potentialBusinessImpact}
                      </p>

                      {item.affectedUserSegments && item.affectedUserSegments.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
                          <span className="font-semibold text-slate-500 text-[11px]">
                            Affected Segments:
                          </span>
                          {item.affectedUserSegments.map((seg, sIdx) => (
                            <span
                              key={sIdx}
                              className="bg-yellow-100 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-md"
                            >
                              {seg}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Customer Verbatim Quotes */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs">
                      <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5 text-emerald-800 mb-1">
                        <MessageSquare className="w-4 h-4 text-yellow-600" />
                        Verbatim Customer Quotes:
                      </span>

                      {item.sampleQuotes && item.sampleQuotes.length > 0 ? (
                        <div className="space-y-1.5 mt-2">
                          {item.sampleQuotes.map((quote, qIdx) => (
                            <div
                              key={qIdx}
                              className="italic text-slate-600 border-l-2 border-rose-400 pl-2 text-[11px]"
                            >
                              "{quote}"
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-400 italic">No quotes available.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
