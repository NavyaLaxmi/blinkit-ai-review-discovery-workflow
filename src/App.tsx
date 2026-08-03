/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { FileUploadSection } from "./components/FileUploadSection";
import { LoadingScreen } from "./components/LoadingScreen";
import { DashboardHeader } from "./components/DashboardHeader";
import { ExecutiveSummaryCard } from "./components/ExecutiveSummaryCard";
import { ThemesAndClustersView } from "./components/ThemesAndClustersView";
import { TopPainPointsTable } from "./components/TopPainPointsTable";
import { CustomerSegmentsView } from "./components/CustomerSegmentsView";
import { BehaviorAndBarriersView } from "./components/BehaviorAndBarriersView";
import { ProductOpportunitiesView } from "./components/ProductOpportunitiesView";
import { SuggestedAIFeaturesView } from "./components/SuggestedAIFeaturesView";
import { RawFeedbackExplorer } from "./components/RawFeedbackExplorer";
import { ExportReportModal } from "./components/ExportReportModal";
import { FeedbackItem, AnalysisResult } from "./types";
import {
  FileText,
  Layers,
  AlertCircle,
  Users,
  ShoppingBag,
  Zap,
  Sparkles,
  Search,
  AlertTriangle,
} from "lucide-react";

export default function App() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [datasetName, setDatasetName] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "summary" | "themes" | "pain_points" | "segments" | "behavior" | "opportunities" | "ai_features" | "raw_explorer"
  >("summary");
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  // Trigger analysis with server API
  const handleStartAnalysis = async (items: FeedbackItem[], name: string) => {
    setFeedbackItems(items);
    setDatasetName(name);
    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/analyze-reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviews: items, datasetName: name }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to analyze feedback dataset.");
      }

      setAnalysisResult(data.result);
      setActiveTab("summary");
    } catch (err: any) {
      console.error("Analysis Error:", err);
      setErrorMessage(err.message || "An unexpected error occurred while communicating with Gemini AI.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFeedbackItems([]);
    setDatasetName("");
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const handleExportJSON = () => {
    if (!analysisResult) return;
    const jsonStr = JSON.stringify(analysisResult, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Blinkit_PM_Analysis_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col antialiased selection:bg-yellow-300 selection:text-emerald-950">
      <Navbar
        onReset={handleReset}
        hasResult={!!analysisResult}
        totalReviewsCount={feedbackItems.length}
      />

      <main className="flex-1 pb-16">
        {/* Error Banner */}
        {errorMessage && (
          <div className="max-w-5xl mx-auto my-6 px-4">
            <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 flex items-start gap-3 shadow-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">Analysis Failed</h4>
                <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
                <button
                  onClick={() => handleStartAnalysis(feedbackItems, datasetName)}
                  className="mt-2 text-xs font-bold text-rose-900 underline hover:text-rose-950 cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* State 1: Upload or Select Dataset */}
        {!isAnalyzing && !analysisResult && (
          <FileUploadSection
            onStartAnalysis={handleStartAnalysis}
            isAnalyzing={isAnalyzing}
          />
        )}

        {/* State 2: Gemini Progress Loading Screen */}
        {isAnalyzing && (
          <LoadingScreen
            totalItemsCount={feedbackItems.length}
            datasetName={datasetName}
          />
        )}

        {/* State 3: Analysis Dashboard */}
        {!isAnalyzing && analysisResult && (
          <div>
            <DashboardHeader
              result={analysisResult}
              datasetName={datasetName}
              onOpenExportModal={() => setShowExportModal(true)}
              onExportJSON={handleExportJSON}
              onPrintReport={handlePrintReport}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
              {/* Dashboard Navigation Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 border-b border-slate-200 text-xs font-bold no-scrollbar">
                {[
                  { id: "summary", label: "Executive Summary", icon: FileText },
                  { id: "themes", label: "Themes & Clusters", icon: Layers, count: analysisResult.themes?.length },
                  { id: "pain_points", label: "Top Pain Points", icon: AlertCircle, count: analysisResult.topPainPoints?.length },
                  { id: "segments", label: "Customer Segments", icon: Users, count: analysisResult.customerSegments?.length },
                  { id: "behavior", label: "Behavior & Barriers", icon: ShoppingBag },
                  { id: "opportunities", label: "Product Opportunities", icon: Zap, count: analysisResult.productOpportunities?.length },
                  { id: "ai_features", label: "AI Features", icon: Sparkles, count: analysisResult.suggestedAIFeatures?.length },
                  { id: "raw_explorer", label: "Raw Reviews Explorer", icon: Search, count: feedbackItems.length },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-3.5 py-2 rounded-xl transition flex items-center gap-2 shrink-0 cursor-pointer ${
                        isActive
                          ? "bg-emerald-900 text-yellow-300 shadow-xs"
                          : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-yellow-400" : "text-emerald-700"}`} />
                      <span>{tab.label}</span>
                      {tab.count !== undefined && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            isActive
                              ? "bg-yellow-400 text-emerald-950 font-black"
                              : "bg-slate-100 text-slate-600 border border-slate-200"
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Tab Content */}
              {activeTab === "summary" && (
                <div className="space-y-8">
                  <ExecutiveSummaryCard
                    summaryText={analysisResult.executiveSummary}
                    topPainPointTitle={analysisResult.topPainPoints?.[0]?.title}
                    topOpportunityTitle={analysisResult.productOpportunities?.[0]?.title}
                  />

                  <ThemesAndClustersView themes={analysisResult.themes} />
                  <TopPainPointsTable painPoints={analysisResult.topPainPoints} />
                </div>
              )}

              {activeTab === "themes" && (
                <ThemesAndClustersView themes={analysisResult.themes} />
              )}

              {activeTab === "pain_points" && (
                <TopPainPointsTable painPoints={analysisResult.topPainPoints} />
              )}

              {activeTab === "segments" && (
                <CustomerSegmentsView segments={analysisResult.customerSegments} />
              )}

              {activeTab === "behavior" && (
                <BehaviorAndBarriersView
                  motivations={analysisResult.userMotivations}
                  habits={analysisResult.shoppingHabits}
                  discoveryPatterns={analysisResult.productDiscoveryBehaviour}
                  categoryBarriers={analysisResult.categoryExplorationBarriers}
                />
              )}

              {activeTab === "opportunities" && (
                <ProductOpportunitiesView opportunities={analysisResult.productOpportunities} />
              )}

              {activeTab === "ai_features" && (
                <SuggestedAIFeaturesView aiFeatures={analysisResult.suggestedAIFeatures} />
              )}

              {activeTab === "raw_explorer" && (
                <RawFeedbackExplorer items={feedbackItems} />
              )}
            </div>
          </div>
        )}
      </main>

      {/* Export Report Modal */}
      {showExportModal && analysisResult && (
        <ExportReportModal
          result={analysisResult}
          datasetName={datasetName}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}
