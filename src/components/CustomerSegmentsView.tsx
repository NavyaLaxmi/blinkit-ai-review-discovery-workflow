import React from "react";
import { CustomerSegment } from "../types";
import { Users, Target, HeartHandshake, Lightbulb, ArrowUpRight } from "lucide-react";

interface CustomerSegmentsViewProps {
  segments: CustomerSegment[];
}

export const CustomerSegmentsView: React.FC<CustomerSegmentsViewProps> = ({ segments }) => {
  if (!segments || segments.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-500">
        No customer segments extracted.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Users className="w-5 h-5 text-emerald-700" />
          Discovered Customer Segments & User Personas ({segments.length})
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Identified behavioral segments based on ordering frequency, category preferences, and pain point sensitivity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {segments.map((segment, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-emerald-300 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="bg-yellow-400 text-emerald-950 font-black text-xs px-2.5 py-0.5 rounded-full shadow-2xs">
                  {segment.sizePercentage || "15-20%"} of users
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                  Segment #{idx + 1}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-base mb-1.5">
                {segment.segmentName}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {segment.description}
              </p>

              <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                <div>
                  <span className="font-bold text-emerald-900 flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-emerald-600" />
                    Primary Need:
                  </span>
                  <p className="text-slate-700 text-[11px] mt-0.5">
                    {segment.primaryNeed}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-rose-900 flex items-center gap-1">
                    <HeartHandshake className="w-3.5 h-3.5 text-rose-500" />
                    Key Pain Point:
                  </span>
                  <p className="text-slate-700 text-[11px] mt-0.5">
                    {segment.keyPainPoint}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 bg-emerald-50/60 p-3 rounded-xl">
              <span className="font-extrabold text-emerald-950 text-xs flex items-center gap-1 mb-1">
                <Lightbulb className="w-3.5 h-3.5 text-yellow-600" />
                PM Recommended Focus:
              </span>
              <p className="text-emerald-900 text-[11px] font-medium leading-relaxed">
                {segment.recommendedFocus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
