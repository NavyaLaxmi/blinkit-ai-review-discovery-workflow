import React from "react";
import { AIFeature } from "../types";
import { Sparkles, Bot, Cpu, CheckCircle2, Zap, ArrowRight, Layers } from "lucide-react";

interface SuggestedAIFeaturesViewProps {
  aiFeatures: AIFeature[];
}

export const SuggestedAIFeaturesView: React.FC<SuggestedAIFeaturesViewProps> = ({ aiFeatures }) => {
  if (!aiFeatures || aiFeatures.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
        No AI features generated.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-600" />
            Suggested AI Features & Innovation Roadmap ({aiFeatures.length})
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Next-gen AI capabilities designed to eliminate customer friction and unlock new revenue streams
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {aiFeatures.map((feature, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-emerald-800/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="bg-yellow-400 text-emerald-950 font-black text-[11px] px-2.5 py-0.5 rounded-full shadow-2xs">
                  AI Solution #{idx + 1}
                </span>

                <span className="bg-emerald-800/80 border border-emerald-700 text-yellow-300 text-[11px] font-bold px-2 py-0.5 rounded-md">
                  Feasibility: {feature.feasibility || "High"}
                </span>
              </div>

              <h4 className="text-lg font-black text-white mb-0.5 flex items-center gap-2">
                <Bot className="w-5 h-5 text-yellow-400 shrink-0" />
                {feature.featureName}
              </h4>

              <p className="text-xs font-bold text-yellow-300 mb-3 italic">
                "{feature.tagline}"
              </p>

              <p className="text-xs text-slate-200 leading-relaxed mb-4">
                {feature.description}
              </p>

              <div className="space-y-2.5 text-xs bg-emerald-900/40 p-3.5 rounded-xl border border-emerald-800/60 mb-4">
                <div>
                  <span className="font-bold text-yellow-400 block mb-0.5 text-[11px]">
                    How It Works:
                  </span>
                  <p className="text-emerald-100 text-[11px] leading-relaxed">
                    {feature.howItWorks}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-emerald-300 block mb-0.5 text-[11px]">
                    Target User Segment:
                  </span>
                  <p className="text-slate-300 text-[11px]">
                    {feature.targetUserSegment}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-yellow-400" />
                Expected KPI Lift:
              </span>
              <span className="bg-yellow-400 text-emerald-950 font-black text-xs px-2.5 py-0.5 rounded-lg">
                {feature.expectedKPIImprovement}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
