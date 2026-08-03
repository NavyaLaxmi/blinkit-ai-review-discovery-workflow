import React from "react";
import { Motivation, HabitPattern, DiscoveryPattern, CategoryBarrier } from "../types";
import { ShoppingBag, Search, ShieldAlert, Compass, Activity, ArrowRight, CheckCircle2 } from "lucide-react";

interface BehaviorAndBarriersViewProps {
  motivations: Motivation[];
  habits: HabitPattern[];
  discoveryPatterns: DiscoveryPattern[];
  categoryBarriers: CategoryBarrier[];
}

export const BehaviorAndBarriersView: React.FC<BehaviorAndBarriersViewProps> = ({
  motivations,
  habits,
  discoveryPatterns,
  categoryBarriers,
}) => {
  return (
    <div className="space-y-8">
      {/* 1. Motivations & Shopping Habits */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Motivations */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-700" />
            User Motivations & Drivers
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Primary triggers that lead users to open the Blinkit app
          </p>

          <div className="space-y-3">
            {motivations?.map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                  <span>{item.motivation}</span>
                  <span className="bg-yellow-400 text-emerald-950 px-2 py-0.5 rounded-full text-[11px]">
                    {item.percentage || "High"}
                  </span>
                </div>
                <p className="text-slate-600 mb-2">{item.description}</p>
                {item.keyDrivers && item.keyDrivers.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] font-semibold text-slate-500">Drivers:</span>
                    {item.keyDrivers.map((d, dIdx) => (
                      <span key={dIdx} className="bg-white border text-slate-700 text-[10px] px-2 py-0.5 rounded-md font-medium">
                        {d}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Habits */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-700" />
            Observed Shopping Habits
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Ordering cadence, basket composition, and reorder routines
          </p>

          <div className="space-y-3">
            {habits?.map((habit, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                  <span>{habit.habit}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-md">
                    {habit.frequencyTag || "Daily"}
                  </span>
                </div>
                <p className="text-slate-600">{habit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Product Discovery & Category Exploration Barriers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Discovery Patterns */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
            <Search className="w-5 h-5 text-yellow-600" />
            Product Discovery Behaviour
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            How users find items, search regional brands, and navigate replacement options
          </p>

          <div className="space-y-3">
            {discoveryPatterns?.map((dp, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl text-xs space-y-1.5">
                <span className="font-bold text-slate-900 text-xs block">
                  {dp.pattern}
                </span>
                <p className="text-rose-700 font-medium text-[11px]">
                  <strong>Friction:</strong> {dp.frictionPoint}
                </p>
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-2 rounded-lg text-[11px] font-semibold flex items-start gap-1">
                  <ArrowRight className="w-3.5 h-3.5 shrink-0 text-emerald-600 mt-0.5" />
                  <span><strong>PM Takeaway:</strong> {dp.pmTakeaway}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Exploration Barriers */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            Category Exploration Barriers
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Hesitations stopping users from trying non-core categories (Fresh Produce, Meat, Electronics, Skincare)
          </p>

          <div className="space-y-3">
            {categoryBarriers?.map((cb, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs">
                    Category: {cb.category}
                  </span>
                  <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Barrier
                  </span>
                </div>
                <p className="font-bold text-slate-800">{cb.barrier}</p>
                <p className="text-slate-600"><strong>Root Cause:</strong> {cb.rootCause}</p>
                <p className="text-rose-600 italic">"{cb.userFrustration}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
