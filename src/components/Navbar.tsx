import React, { useState } from "react";
import { Sparkles, FileText, HelpCircle, ShieldCheck, RefreshCw, BarChart2 } from "lucide-react";

interface NavbarProps {
  onReset: () => void;
  hasResult: boolean;
  totalReviewsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onReset, hasResult, totalReviewsCount }) => {
  const [showGuideModal, setShowGuideModal] = useState(false);

  return (
    <>
      <header className="bg-emerald-900 border-b border-emerald-800 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-400 text-emerald-950 font-black p-2 rounded-xl flex items-center justify-center shadow-inner text-lg tracking-tight">
              ⚡ blink<span className="text-emerald-700">it</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
                  AI Review Discovery Workflow
                </h1>
                <span className="bg-emerald-800 text-yellow-300 text-xs px-2 py-0.5 rounded-full font-medium border border-emerald-700 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  Gemini 3.6 Flash
                </span>
              </div>
              <p className="text-xs text-emerald-300 font-medium">
                Product Management Customer Feedback Intelligence & Roadmap Discovery
              </p>
            </div>
          </div>

          {/* Action Header Items */}
          <div className="flex items-center space-x-3">
            {hasResult && (
              <button
                onClick={onReset}
                className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-700 transition flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-yellow-400" />
                New Analysis ({totalReviewsCount} items)
              </button>
            )}

            <button
              onClick={() => setShowGuideModal(true)}
              className="bg-yellow-400 hover:bg-yellow-300 text-emerald-950 text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-emerald-950" />
              How It Works
            </button>
          </div>
        </div>
      </header>

      {/* PM Workflow Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 text-slate-800">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-400 p-2 rounded-lg text-emerald-900">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Blinkit AI Review Discovery Workflow — How It Works
                  </h3>
                  <p className="text-xs text-slate-500">
                    How this tool transforms unstructured reviews into actionable product backlogs
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGuideModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg px-2"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-sm leading-relaxed text-slate-600">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5">
                <h4 className="font-bold text-emerald-900 text-sm flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Purpose for Product Managers
                </h4>
                <p className="text-xs text-emerald-800">
                  PMs spend hundreds of hours sifting through fragmented Play Store comments, Reddit threads, and NPS surveys. This workflow uses server-side Gemini AI to synthesize raw reviews into 10-minute delivery SLA pain points, customer motivations, category barriers, user personas, and prioritized feature roadmaps.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider">
                  Workflow Steps:
                </h4>
                <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700">
                  <li>
                    <strong className="text-slate-900">Upload or Select Dataset:</strong> Drag and drop CSV, TXT, PDF, or JSON feedback files from Play Store, App Store, Reddit, or surveys. Or pick pre-loaded Blinkit sample datasets.
                  </li>
                  <li>
                    <strong className="text-slate-900">Gemini Synthesis:</strong> Advanced LLM extraction groups reviews into thematic clusters, pain points, and customer segments.
                  </li>
                  <li>
                    <strong className="text-slate-900">PM Roadmap Generation:</strong> Get actionable P0/P1/P2 product opportunities and tailored quick-commerce AI concepts.
                  </li>
                  <li>
                    <strong className="text-slate-900">Export Report:</strong> Copy or download a formatted Markdown report ready for PRDs and stakeholder review.
                  </li>
                </ol>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowGuideModal(false)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
              >
                Got it, let's analyze
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
