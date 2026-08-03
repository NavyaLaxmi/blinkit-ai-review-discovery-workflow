import React, { useState } from "react";
import { ProductOpportunity } from "../types";
import { Zap, CheckCircle2, TrendingUp, AlertCircle, ArrowUpRight, Filter } from "lucide-react";

interface ProductOpportunitiesViewProps {
  opportunities: ProductOpportunity[];
}

export const ProductOpportunitiesView: React.FC<ProductOpportunitiesViewProps> = ({ opportunities }) => {
  const [selectedPriority, setSelectedPriority] = useState<string>("ALL");

  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
        No product opportunities generated.
      </div>
    );
  }

  const filtered = selectedPriority === "ALL"
    ? opportunities
    : opportunities.filter((o) => o.priority === selectedPriority);

  const getPriorityBadge = (p: string) => {
    if (p === "P0") {
      return (
        <span className="bg-rose-500 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-2xs">
          P0 — Critical Roadmap
        </span>
      );
    }
    if (p === "P1") {
      return (
        <span className="bg-yellow-400 text-emerald-950 font-bold text-xs px-2.5 py-1 rounded-full">
          P1 — High Priority
        </span>
      );
    }
    return (
      <span className="bg-slate-200 text-slate-800 font-semibold text-xs px-2.5 py-1 rounded-full">
        P2 — Medium Priority
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-700" />
            Product Manager Opportunities & Roadmap Backlog ({opportunities.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Prioritized feature backlog synthesized directly from customer feedback patterns
          </p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-xl text-xs font-semibold">
          <span className="text-slate-400 pl-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Priority:
          </span>
          {["ALL", "P0", "P1", "P2"].map((pri) => (
            <button
              key={pri}
              onClick={() => setSelectedPriority(pri)}
              className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                selectedPriority === pri
                  ? "bg-emerald-800 text-white font-bold"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {pri}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:border-emerald-300 transition space-y-4"
          >
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                {getPriorityBadge(item.priority)}

                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-md">
                  Impact: {item.estimatedImpact}
                </span>

                <span className="bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold px-2.5 py-0.5 rounded-md">
                  Effort: {item.estimatedEffort}
                </span>
              </div>

              <span className="text-xs font-bold text-emerald-900 bg-yellow-100 border border-yellow-300 px-3 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
                Target Metric: {item.affectedMetric}
              </span>
            </div>

            {/* Title */}
            <h4 className="text-lg font-bold text-slate-900">
              {item.title}
            </h4>

            {/* Problem Statement & Proposed Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-rose-50/50 border border-rose-200/80 p-3.5 rounded-xl">
                <span className="font-bold text-rose-900 block mb-1">
                  Problem Statement:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {item.problemStatement}
                </p>
              </div>

              <div className="bg-emerald-50/50 border border-emerald-200/80 p-3.5 rounded-xl">
                <span className="font-bold text-emerald-900 block mb-1">
                  Proposed Solution & Feature Spec:
                </span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {item.proposedSolution}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
