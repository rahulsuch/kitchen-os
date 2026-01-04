import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, Folder, ShieldCheck, Download, 
  Eye, MoreVertical, UploadCloud, Search, 
  ChevronRight, Lock, HardDrive
} from "lucide-react";

const FoscosVault = () => {
  const [dragActive, setDragActive] = useState(false);

  const files = [
    { name: "Central_License_2025.pdf", size: "2.4 MB", date: "Dec 12, 2025", type: "License", encrypted: true },
    { name: "Audit_Report_Q3.docx", size: "1.1 MB", date: "Oct 28, 2025", type: "Report", encrypted: true },
    { name: "Water_Test_Analysis.pdf", size: "890 KB", date: "Nov 05, 2025", type: "Compliance", encrypted: false },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Vault Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <VaultStat icon={<Lock size={20} />} label="Encrypted Assets" value="128" color="cyan" />
        <VaultStat icon={<HardDrive size={20} />} label="Vault Storage" value="42% Used" color="purple" />
        <VaultStat icon={<ShieldCheck size={20} />} label="Integrity Check" value="Pass" color="blue" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar: Folder Structure */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <div className="p-4 bg-black/90 border border-white/10 rounded-2xl">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">Directories</h3>
            <div className="space-y-1">
              <FolderItem label="Annual Returns" count="12" active />
              <FolderItem label="Premises Layout" count="4" />
              <FolderItem label="Medical Fitness" count="28" />
              <FolderItem label="Water Analysis" count="8" />
            </div>
          </div>
        </div>

        {/* Main Content: File Explorer */}
        <div className="col-span-12 lg:col-span-9 space-y-6">
          {/* Action Bar */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0d121b]/90 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs text-slate-200 font-mono">
              <span className="hover:text-cyan-400 cursor-pointer">Vault</span>
              <ChevronRight size={12} />
              <span className="text-white">Compliance_2025</span>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-100" size={14} />
                <input 
                  type="text" 
                  placeholder="Scan metadata..." 
                  className="w-full bg-white/10 text-white/900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs focus:border-cyan-500/50 focus:text-white/100 outline-none transition-all"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold transition-all">
                <UploadCloud size={16} />
                <span>Upload</span>
              </button>
            </div>
          </div>

          {/* Drag & Drop Zone */}
          <div 
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            className={`relative border-2 border-dashed rounded-3xl p-8 transition-all duration-500 group ${
              dragActive ? 'border-cyan-500 bg-cyan-500/10' : 'border-white/5 bg-transparent'
            }`}
          >
            <div className="space-y-4">
              {files.map((file, idx) => (
                <FileRow key={idx} file={file} />
              ))}
            </div>

            {/* Micro-interaction: Hidden Upload Overlay */}
            <AnimatePresence>
              {dragActive && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-cyan-900/40 backdrop-blur-sm flex items-center justify-center rounded-3xl"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                      <UploadCloud size={32} className="text-white animate-bounce" />
                    </div>
                    <p className="text-white font-bold tracking-widest uppercase text-sm">Release to Secure</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Sub-components ---

const VaultStat = ({ icon, label, value, color }) => (
  <div className="bg-[#0d121b]/90 border border-white/10 p-5 rounded-2xl backdrop-blur-md hover:border-white/20 transition-all group">
    <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{label}</p>
    <h4 className="text-2xl font-light text-white mt-1">{value}</h4>
  </div>
);

const FolderItem = ({ label, count, active }) => (
  <div className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
    active ? 'bg-cyan-500/10 text-cyan-400' : 'hover:bg-white/5 text-slate-400'
  }`}>
    <div className="flex items-center gap-3">
      <Folder size={18} className={active ? 'fill-cyan-400/20' : ''} />
      <span className="text-xs font-medium">{label}</span>
    </div>
    <span className="text-[10px] opacity-50 font-mono">{count}</span>
  </div>
);

const FileRow = ({ file }) => (
  <div className="group flex items-center justify-between p-4 rounded-2xl bg-[#0d121b]/90 border border-white/5 hover:border-cyan-500/30 hover:bg-white/5 transition-all">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white/5 rounded-xl text-slate-400 group-hover:text-cyan-400 transition-colors">
        <FileText size={20} />
      </div>
      <div>
        <h4 className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{file.name}</h4>
        <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500 font-mono uppercase">
          <span>{file.size}</span>
          <span>•</span>
          <span>{file.date}</span>
          {file.encrypted && (
            <span className="flex items-center gap-1 text-emerald-500/70">
              <Lock size={10} /> Encrypted
            </span>
          )}
        </div>
      </div>
    </div>
    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
      <VaultAction icon={<Eye size={14} />} label="View" />
      <VaultAction icon={<Download size={14} />} label="Get" />
      <VaultAction icon={<MoreVertical size={14} />} label="Options" />
    </div>
  </div>
);

const VaultAction = ({ icon, label }) => (
  <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all flex flex-col items-center gap-1">
    {icon}
    <span className="text-[8px] uppercase tracking-tighter">{label}</span>
  </button>
);

export default FoscosVault;