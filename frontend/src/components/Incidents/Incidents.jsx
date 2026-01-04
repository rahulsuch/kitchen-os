import { CyberCard } from "../CyberCard/CyberCard";
import { ShieldAlert, Zap, Layers } from "lucide-react";

const Incidents = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="md:col-span-2">
      <CyberCard title="Active Incidents" icon={<ShieldAlert size={18} />}>
        {/* Urgent Red-Bordered Item */}
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 flex gap-4 items-center">
          <div className="p-3 rounded-lg bg-red-500/10 text-red-500 animate-pulse">
            <Zap size={20} />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-bold">
              Unauthorized API Access Attempt
            </h4>
            <p className="text-xs text-red-400/70">
              Source: IP 182.xx.xx.xx • 2 minutes ago
            </p>
          </div>
          <button className="px-4 py-2 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors">
            ISOLATE
          </button>
        </div>
      </CyberCard>
    </div>
    <div className="md:col-span-1">
      <CyberCard title="Risk Level" icon={<Layers size={18} />}>
        <div className="text-center py-10">
          <div className="inline-block relative">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-white/5"
              />
              <circle
                cx="64"
                cy="64"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="364"
                strokeDashoffset="100"
                className="text-cyan-500 transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-light text-white">Low</span>
              <span className="text-[10px] text-slate-500 uppercase">
                System Risk
              </span>
            </div>
          </div>
        </div>
      </CyberCard>
    </div>
  </div>
);

export default Incidents;
