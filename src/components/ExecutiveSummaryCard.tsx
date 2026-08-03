import React from "react";
import { FileText, AlertCircle, TrendingUp, Sparkles, Target, Lightbulb } from "lucide-react";

interface ExecutiveSummaryCardProps {
  summaryText: string;
  topPainPointTitle?: string;
  topOpportunityTitle?: string;
}

export const ExecutiveSummaryCard: React.FC<ExecutiveSummaryCardProps> = ({
  summaryText,
  topPainPointTitle,
  topOpportunityTitle,
}) => {
  return (
    <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800 relative overflow-hidden mb-8">
      {/* Background Accent */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-800/80">
        <div className="flex items-center gap-2.5">
          <div className="bg-yellow-400 text-emerald-950 p-2 rounded-xl font-bold shadow-inner">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white tracking-tight">
              Executive Summary
            </h3>
            <p className="text-xs text-emerald-300">
              High-level PM Synthesis & Customer Behavior Takeaways
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-800/80 border border-emerald-700 text-yellow-300 text-xs px-3 py-1 rounded-full font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          Blinkit PM Brief
        </span>
      </div>

      {/* Main Executive Summary Text */}
      <div className="prose prose-invert max-w-none text-sm text-emerald-50 leading-relaxed whitespace-pre-line space-y-3">
        {summaryText}
      </div>

      {/* Highlights Grid Bar */}
      <div className="mt-6 pt-5 border-t border-emerald-800/80 grid grid-cols-1 md:grid-cols-2 gap-4">
        {topPainPointTitle && (
          <div className="bg-emerald-900/60 border border-emerald-700/60 rounded-2xl p-4 flex items-start gap-3">
            <div className="bg-rose-500/20 text-rose-300 p-2 rounded-xl shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                Top Customer Friction Alert
              </span>
              <p className="text-xs font-bold text-white mt-0.5">
                {topPainPointTitle}
              </p>
            </div>
          </div>
        )}

        {topOpportunityTitle && (
          <div className="bg-emerald-900/60 border border-emerald-700/60 rounded-2xl p-4 flex items-start gap-3">
            <div className="bg-yellow-400/20 text-yellow-300 p-2 rounded-xl shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4 text-yellow-300" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-300">
                Primary Product Opportunity
              </span>
              <p className="text-xs font-bold text-white mt-0.5">
                {topOpportunityTitle}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
