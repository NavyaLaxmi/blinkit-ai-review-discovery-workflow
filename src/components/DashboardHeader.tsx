import React from "react";
import {
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2,
  FileText,
  Sparkles,
  Layers,
  Zap,
  Printer,
} from "lucide-react";
import { AnalysisResult } from "../types";
import { calculateSentimentBreakdown } from "../utils/sentiment";

interface DashboardHeaderProps {
  result: AnalysisResult;
  datasetName: string;
  onOpenExportModal: () => void;
  onExportJSON: () => void;
  onPrintReport: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  result,
  datasetName,
  onOpenExportModal,
  onExportJSON,
  onPrintReport,
}) => {
  const { dataMetrics } = result;
  const { posPct, neuPct, negPct } = calculateSentimentBreakdown(dataMetrics?.sentimentBreakdown);

  return (
    <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* Top Title & Export Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-yellow-400 text-emerald-950 font-bold text-xs px-2.5 py-0.5 rounded-full">
                Blinkit PM Intelligence
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Dataset: <span className="font-bold text-slate-800">{datasetName}</span>
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Review Discovery & Product Roadmap Dashboard
            </h2>
          </div>

          {/* Export & Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onOpenExportModal}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              Export PM Report (Markdown)
            </button>

            <button
              onClick={onExportJSON}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition border border-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              JSON Data
            </button>

            <button
              onClick={onPrintReport}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition border border-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print / PDF
            </button>
          </div>
        </div>

        {/* Key Metrics KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* KPI 1 */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
              <span>Reviews Analyzed</span>
              <Layers className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              {dataMetrics.totalReviewsAnalyzed}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
              <span className="font-semibold text-emerald-700">Multi-source</span> Play Store, Reddit, Survey
            </div>
          </div>

          {/* KPI 2 */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
              <span>Primary Themes</span>
              <BarChart3 className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              {result.themes?.length || 0} Clusters
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {result.topPainPoints?.length || 0} critical pain points
            </div>
          </div>

          {/* KPI 3 */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
              <span>PM Opportunities</span>
              <Zap className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              {result.productOpportunities?.length || 0} Features
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">
              {result.productOpportunities?.filter((p) => p.priority === "P0").length || 0} P0 Priority
            </div>
          </div>

          {/* KPI 4 */}
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
            <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1">
              <span>Analysis Confidence</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-700">
              {result.confidenceMetrics?.scorePercentage || dataMetrics.overallConfidenceScore || 92}%
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Gemini 3.6 Flash confidence
            </div>
          </div>
        </div>

        {/* Sentiment Distribution Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 text-xs">Sentiment Breakdown:</span>
            <div className="flex items-center gap-3">
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Positive ({posPct}%)
              </span>
              <span className="text-slate-600 font-bold flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                Neutral ({neuPct}%)
              </span>
              <span className="text-rose-600 font-bold flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                Negative ({negPct}%)
              </span>
            </div>
          </div>

          {/* Source distribution badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {dataMetrics.sourceBreakdown?.map((src) => (
              <span
                key={src.source}
                className="bg-slate-100 text-slate-700 text-[11px] px-2.5 py-0.5 rounded-md border border-slate-200 shrink-0 font-medium"
              >
                {src.source}: {src.count} ({src.percentage})
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
