import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Calendar, 
  Download, 
  Filter, 
  RefreshCcw, 
  ExternalLink,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

const CertificatesDashboard = () => {
  const [filter, setFilter] = useState("all");

  const certificates = [
    { id: 1, name: "FOSCOS Central License", status: "Active", expiry: "2026-12-15", progress: 85, type: "Legal" },
    { id: 2, name: "Fire Safety Clearance", status: "Expiring Soon", expiry: "2025-01-10", progress: 12, type: "Safety" },
    { id: 3, name: "ISO 22000:2018", status: "Active", expiry: "2027-05-20", progress: 92, type: "Quality" },
    { id: 4, name: "Water Analysis Report", status: "Expired", expiry: "2024-11-30", progress: 0, type: "Compliance" },
  ];

  const containerVars = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <motion.div variants={containerVars} initial="hidden" animate="visible" className="space-y-8">
      
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-light text-white">Credential <span className="font-bold">Matrix</span></h2>
          <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">Validating System Compliance</p>
        </div>
        
        <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl">
          {['all', 'active', 'expiring', 'expired'].map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tighter transition-all ${
                filter === t ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MiniStat label="Total Assets" value="24" icon={<Award size={16}/>} />
        <MiniStat label="Compliant" value="18" icon={<CheckCircle2 size={16}/>} color="text-emerald-400" />
        <MiniStat label="Action Required" value="04" icon={<AlertTriangle size={16}/>} color="text-amber-400" />
        <MiniStat label="Critical/Expired" value="02" icon={<RefreshCcw size={16}/>} color="text-red-400" />
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <motion.div key={cert.id} variants={itemVars}>
            <CertificateCard cert={cert} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// --- Sub-components ---

const CertificateCard = ({ cert }) => {
  const isCritical = cert.status === "Expired" || cert.status === "Expiring Soon";
  
  return (
    <div className="relative group bg-[#0d121b]/50 border border-white/10 rounded-2xl p-6 backdrop-blur-md hover:border-cyan-500/40 transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${isCritical ? 'text-amber-400' : 'text-cyan-400'}`}>
          <Award size={24} />
        </div>
        <div className="flex flex-col items-end">
          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded ${
            cert.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 
            cert.status === 'Expired' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'
          }`}>
            {cert.status}
          </span>
          <span className="text-[10px] text-slate-500 font-mono mt-2 uppercase">{cert.type}</span>
        </div>
      </div>

      <h3 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors mb-4">
        {cert.name}
      </h3>

      <div className="flex items-center gap-6 mb-6">
        {/* Visual Gauge */}
        <div className="relative w-16 h-16">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/5" />
            <circle 
              cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" 
              strokeDasharray="175.9" 
              strokeDashoffset={175.9 - (175.9 * cert.progress) / 100}
              className={`${cert.progress < 20 ? 'text-red-500' : 'text-cyan-500'} transition-all duration-1000`} 
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">{cert.progress}%</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar size={12} />
            <span className="text-[11px] font-mono">Expires: {cert.expiry}</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed">
            Automatic renewal protocol {cert.progress > 50 ? 'on standby' : 'active'}.
          </p>
        </div>
      </div>

      <div className="flex gap-2 pt-4 border-t border-white/5">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[10px] font-bold uppercase transition-all">
          <Download size={12} /> Download
        </button>
        <button className="p-2 bg-cyan-500/10 hover:bg-cyan-500 text-cyan-400 hover:text-white border border-cyan-500/20 rounded-lg transition-all">
          <ExternalLink size={14} />
        </button>
      </div>
    </div>
  );
};

const MiniStat = ({ label, value, icon, color = "text-slate-400" }) => (
  <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between">
    <div>
      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">{label}</p>
      <p className={`text-xl font-mono mt-1 ${color}`}>{value}</p>
    </div>
    <div className="opacity-20">{icon}</div>
  </div>
);

export default CertificatesDashboard;

