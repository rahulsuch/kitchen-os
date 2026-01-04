import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  UserPlus, 
  GraduationCap, 
  BadgeCheck, 
  Clock, 
  MoreHorizontal,
  Filter,
  Mail,
  Smartphone
} from "lucide-react";

const StaffDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const staff = [
    { id: "STF-001", name: "Aarav Sharma", role: "Head Chef", training: "FoSTaC Advance", status: "Certified", score: 94, joined: "2023-05-10" },
    { id: "STF-002", name: "Priya Patel", role: "Kitchen Supervisor", training: "FoSTaC Basic", status: "Renewal Due", score: 88, joined: "2023-08-15" },
    { id: "STF-003", name: "Rohan Das", role: "Food Handler", training: "In-Progress", status: "Pending", score: 45, joined: "2024-01-20" },
    { id: "STF-004", name: "Sanya Malhotra", role: "Quality Manager", training: "FoSTaC Advance", status: "Certified", score: 98, joined: "2022-11-05" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="space-y-6"
    >
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StaffMetric label="Total Personnel" value="42" icon={<Users size={20}/>} />
        <StaffMetric label="FoSTaC Certified" value="38" icon={<BadgeCheck size={20}/>} color="text-cyan-400" />
        <StaffMetric label="Training Pending" value="04" icon={<Clock size={20}/>} color="text-amber-400" />
      </div>

      <div className="bg-[#0d121b]/50 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
        {/* Table Toolbar */}
        <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search by name, ID, or certification..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:border-cyan-500/50 outline-none transition-all"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 transition-all">
              <Filter size={16} /> Filter
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-cyan-600 text-white rounded-xl text-xs font-bold hover:bg-cyan-500 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <UserPlus size={16} /> Onboard Staff
            </button>
          </div>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                <th className="px-6 py-4">Operator Details</th>
                <th className="px-6 py-4">Role / Dept</th>
                <th className="px-6 py-4">FoSTaC Training</th>
                <th className="px-6 py-4">Compliance Score</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {staff.map((member) => (
                <tr key={member.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 flex items-center justify-center text-cyan-400 font-bold text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">{member.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{member.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">{member.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <GraduationCap size={14} className="text-cyan-500" />
                        <span className="text-xs text-slate-200">{member.training}</span>
                      </div>
                      <span className={`text-[9px] font-bold uppercase ${
                        member.status === 'Certified' ? 'text-emerald-400' : 
                        member.status === 'Pending' ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32">
                      <div className="flex justify-between text-[10px] mb-1 font-mono">
                        <span className="text-slate-500">Integrity</span>
                        <span className="text-white">{member.score}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${member.score}%` }}
                          className={`h-full ${member.score > 80 ? 'bg-cyan-500' : 'bg-amber-500'}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <Mail size={14} />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

// --- Sub-components ---

const StaffMetric = ({ label, value, icon, color = "text-white" }) => (
  <div className="bg-[#0d121b]/50 border border-white/10 p-5 rounded-2xl flex items-center gap-4">
    <div className={`p-3 rounded-xl bg-white/5 ${color.replace('text', 'bg')}/10 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{label}</p>
      <h4 className={`text-2xl font-mono ${color}`}>{value}</h4>
    </div>
  </div>
);

export default StaffDashboard;