import React, { useState } from "react";
import { AnalysisResult } from "../types";
import { FileText, Copy, Check, Download, X } from "lucide-react";
import { calculateSentimentBreakdown } from "../utils/sentiment";

interface ExportReportModalProps {
  result: AnalysisResult;
  datasetName: string;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  result,
  datasetName,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const { posPct, neuPct, negPct } = calculateSentimentBreakdown(result.dataMetrics?.sentimentBreakdown);

  // Generate complete Markdown document
  const markdownText = `# Blinkit AI Review Discovery & Product Roadmap Report
**Dataset:** ${datasetName}  
**Analyzed Reviews:** ${result.dataMetrics?.totalReviewsAnalyzed || 100}  
**Confidence Score:** ${result.confidenceMetrics?.scorePercentage || 94}%  
**Generated On:** ${new Date().toLocaleDateString()}  

---

## Executive Summary
${result.executiveSummary}

---

## 1. Key Metrics & Sentiment Distribution
- **Total Feedback Ingested:** ${result.dataMetrics?.totalReviewsAnalyzed}
- **Positive Sentiment:** ${posPct}%
- **Neutral Sentiment:** ${neuPct}%
- **Negative Sentiment:** ${negPct}%

---

## 2. Recurring Themes & Clusters
${result.themes
  ?.map(
    (t) => `### ${t.title} (${t.count} mentions)
- **Sentiment:** ${t.sentiment}
- **Impact Level:** ${t.impactLevel}
- **Description:** ${t.description}
- **Representative Quote:** "${t.sampleQuotes?.[0] || 'N/A'}"
`
  )
  .join("\n")}

---

## 3. Top Pain Points & Customer Friction
${result.topPainPoints
  ?.map(
    (p, i) => `### ${i + 1}. ${p.title} [${p.severity?.toUpperCase()}]
- **Category:** ${p.category}
- **Frequency:** ${p.frequency} reviews
- **Description:** ${p.description}
- **Business Impact:** ${p.potentialBusinessImpact}
- **Sample Quote:** "${p.sampleQuotes?.[0] || 'N/A'}"
`
  )
  .join("\n")}

---

## 4. Customer Segments & User Personas
${result.customerSegments
  ?.map(
    (s) => `### Persona: ${s.segmentName} (${s.sizePercentage} of users)
- **Description:** ${s.description}
- **Primary Need:** ${s.primaryNeed}
- **Key Pain Point:** ${s.keyPainPoint}
- **Recommended Strategy:** ${s.recommendedFocus}
`
  )
  .join("\n")}

---

## 5. Product Opportunities & Prioritized Backlog
${result.productOpportunities
  ?.map(
    (o) => `### [${o.priority}] ${o.title}
- **Impact:** ${o.estimatedImpact} | **Effort:** ${o.estimatedEffort} | **Target Metric:** ${o.affectedMetric}
- **Problem Statement:** ${o.problemStatement}
- **Proposed Solution:** ${o.proposedSolution}
`
  )
  .join("\n")}

---

## 6. Suggested AI Features
${result.suggestedAIFeatures
  ?.map(
    (a) => `### AI Concept: ${a.featureName} ("${a.tagline}")
- **Target Segment:** ${a.targetUserSegment}
- **How It Works:** ${a.howItWorks}
- **KPI Lift:** ${a.expectedKPIImprovement}
`
  )
  .join("\n")}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownText], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Blinkit_PM_Review_Discovery_Report_${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 text-emerald-900 p-2.5 rounded-xl">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                PM Discovery Report (Markdown Format)
              </h3>
              <p className="text-xs text-slate-500">
                Ready for copying into Notion, Jira, Confluence, or Slack
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-yellow-300" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy Report"}
            </button>

            <button
              onClick={handleDownload}
              className="bg-yellow-400 hover:bg-yellow-300 text-emerald-950 text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download .md
            </button>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 font-bold p-1 rounded-lg text-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-6 overflow-y-auto bg-slate-900 text-slate-200 font-mono text-xs leading-relaxed">
          <pre className="whitespace-pre-wrap">{markdownText}</pre>
        </div>
      </div>
    </div>
  );
};
