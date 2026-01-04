import {CyberCard} from "../CyberCard/CyberCard";
import { Activity } from "lucide-react";

const DailyLogs = () => (
  <CyberCard title="System Chronology" icon={<Activity size={18} />}>
    <div className="space-y-6 relative before:absolute before:inset-0 before:left-[11px] before:w-[1px] before:bg-white/10">
      {[
        {
          time: "09:42:01",
          event: "Node Cluster Alpha Sync",
          status: "Success",
          type: "system",
        },
        {
          time: "10:15:30",
          event: "Manual Log Entry: Branch 04",
          status: "Pending",
          type: "user",
        },
      ].map((log, i) => (
        <div key={i} className="relative pl-8 group">
          <div className="absolute left-0 top-1 w-[24px] h-[24px] rounded-full bg-[#0d121b] border border-cyan-500/50 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono text-cyan-400/70">{log.time}</p>
              <h4 className="text-sm text-slate-200 group-hover:text-white transition-colors">
                {log.event}
              </h4>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded border border-white/5 bg-[#295f4e] text-slate-100 uppercase tracking-tighter">
              {log.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  </CyberCard>
);

export default DailyLogs;