import React, { useState, useEffect } from "react";
import { Sparkles, Loader2, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";

interface LoadingScreenProps {
  totalItemsCount: number;
  datasetName: string;
}

const ANALYSIS_STEPS = [
  { id: 1, text: "Parsing and normalizing review dataset..." },
  { id: 2, text: "Sending feedback to Gemini 3.6 Flash model..." },
  { id: 3, text: "Extracting recurring themes, pain points, and category barriers..." },
  { id: 4, text: "Clustering user personas and shopping habit patterns..." },
  { id: 5, text: "Synthesizing PM product opportunities & AI feature ideas..." },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  totalItemsCount,
  datasetName,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < ANALYSIS_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-16 px-4 text-center">
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl relative overflow-hidden">
        {/* Animated Top Glow Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-yellow-400 via-emerald-500 to-yellow-400 animate-pulse" />

        {/* Pulsing Icon */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 bg-yellow-300/40 rounded-full animate-ping" />
          <div className="relative w-20 h-20 bg-emerald-900 border-2 border-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
            <Cpu className="w-9 h-9 text-yellow-400 animate-pulse" />
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">
          Analyzing Customer Feedback with Gemini AI
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Processing <span className="font-bold text-slate-800">{totalItemsCount} reviews</span> from <span className="font-bold text-slate-800">{datasetName}</span>
        </p>

        {/* Step Progress Checklist */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3.5 text-left mb-6">
          {ANALYSIS_STEPS.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={step.id} className="flex items-center gap-3">
                <div className="shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 text-yellow-600 animate-spin" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-300 text-[10px] font-bold text-slate-400 flex items-center justify-center">
                      {step.id}
                    </div>
                  )}
                </div>

                <span
                  className={`text-xs font-semibold ${
                    isDone
                      ? "text-slate-800"
                      : isCurrent
                      ? "text-emerald-900 font-bold"
                      : "text-slate-400"
                  }`}
                >
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Blinkit SLA Footer Note */}
        <div className="inline-flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-900 text-[11px] font-medium px-3.5 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          Converting raw text into PM actionable insights & roadmaps...
        </div>
      </div>
    </div>
  );
};
