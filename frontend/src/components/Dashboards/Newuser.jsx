import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Activity,
  Globe,
  Layers,
  Cpu,
  Plus,
  Building2,
  UserPlus,
  GitBranch,
  Zap,
} from "lucide-react";
import SystemModal from '../SystemModal/SystemModal';

const Newuser = () => {
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null); // 'org' | 'user' | 'branch' | null

  const closeModal = () => setModalType(null);

  // Simulate global data fetch
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 p-8 selection:bg-cyan-500/30">
      {/* HUD Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="flex items-center gap-2 text-cyan-500 mb-2">
            <Zap size={16} className="animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] font-black uppercase">
              System Core v2.5
            </span>
          </div>
          <h1 className="text-4xl font-extralight tracking-tight text-white">
            Global <span className="font-bold">Oversight</span>
          </h1>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">
            Network Status
          </p>
          <p className="text-sm font-mono text-cyan-400">0.0.2ms Latency</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-extralight tracking-tight text-white">
            System <span className="font-bold">Command</span>
          </h1>
          <p className="text-cyan-500/60 text-[10px] uppercase tracking-[0.3em] mt-1">
            Authorized Access Only
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <ActionButton
            onClick={() => setModalType("org")}
            icon={<Building2 size={16} />}
            label="New Org"
            color="cyan"
          />
          <ActionButton
            onClick={() => setModalType("branch")}
            icon={<GitBranch size={16} />}
            label="New Branch"
            color="purple"
          />
          <ActionButton
            onClick={() => setModalType("user")}
            icon={<UserPlus size={16} />}
            label="New User"
            color="blue"
          />
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-6 relative">
        {/* Top Cards */}
        <div className="col-span-12 lg:col-span-4">
          <CyberCard
            loading={loading}
            title="Live Node Traffic"
            icon={<Cpu size={18} />}
          >
            <div className="h-32 flex items-end gap-1 px-2">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-full bg-cyan-500/20 hover:bg-cyan-400 transition-all cursor-crosshair"
                  style={{ height: `${Math.random() * 100}%` }}
                />
              ))}
            </div>
          </CyberCard>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <CyberCard
            loading={loading}
            title="Active Session Clusters"
            icon={<Globe size={18} />}
          >
            <div className="space-y-4">
              <SessionRow
                user="Root_Admin"
                ip="104.21.4.1"
                location="Mumbai, IN"
                status="Encrypted"
              />
              <SessionRow
                user="Branch_Mgr_04"
                ip="172.67.13.2"
                location="London, UK"
                status="Active"
              />
            </div>
          </CyberCard>
        </div>

        {/* Bottom Section */}
        <div className="col-span-12">
          <CyberCard
            loading={loading}
            title="Compliance Neural Map"
            icon={<Layers size={18} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2">
              <StatusNode label="FOSCOS Sync" status="98%" />
              <StatusNode label="Audit Logs" status="Clear" />
              <StatusNode label="Data Parity" status="Synced" />
              <StatusNode label="Firewall" status="Stable" />
            </div>
          </CyberCard>
        </div>
      </div>

      {/* 🛡️ [2025-12-15] Security: Modal is rendered at the root level so it covers everything */}
      {modalType && (
        <SystemModal type={modalType} onClose={closeModal} />
      )}
    </div>
  );
};

// --- Futuristic UI Components (Cleanly Separated) ---

const CyberCard = ({ children, title, icon, loading }) => (
  <div className="relative group h-full">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/0 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
    <div className="relative bg-[#0d1420]/80 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden min-h-[160px] h-full flex flex-col">
      <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-cyan-400 opacity-70">{icon}</div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {title}
          </h3>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_cyan]"></div>
      </div>
      <div className="p-5 flex-grow">
        {loading ? <ShimmerLoader /> : children}
      </div>
    </div>
  </div>
);

const ShimmerLoader = () => (
  <div className="space-y-3">
    <div className="h-4 w-3/4 bg-white/5 rounded-full overflow-hidden relative">
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite]"></div>
    </div>
    <div className="h-4 w-1/2 bg-white/5 rounded-full overflow-hidden relative">
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.5s_infinite_0.2s]"></div>
    </div>
  </div>
);

const SessionRow = ({ user, ip, location, status }) => (
  <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors px-2 rounded-lg group">
    <div className="flex flex-col">
      <span className="text-sm font-mono text-cyan-100">{user}</span>
      <span className="text-[10px] text-slate-500">
        {location} • {ip}
      </span>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-[10px] font-mono text-cyan-500/70">{status}</span>
      <button className="opacity-0 group-hover:opacity-100 text-[10px] text-red-400 uppercase tracking-tighter transition-opacity border border-red-500/20 px-2 py-1 rounded hover:bg-red-500/10">
        Kill
      </button>
    </div>
  </div>
);

const StatusNode = ({ label, status }) => (
  <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-center">
    <p className="text-[10px] text-slate-500 uppercase mb-1">{label}</p>
    <p className="text-lg font-mono text-white">{status}</p>
  </div>
);

const ActionButton = ({ onClick, icon, label, color }) => {
    // Mapping Tailwind colors for proper rendering
    const colorClasses = {
        cyan: "text-cyan-400 group-hover:text-cyan-300",
        purple: "text-purple-400 group-hover:text-purple-300",
        blue: "text-blue-400 group-hover:text-blue-300"
    };

    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all active:scale-95 group`}
        >
            <div className={colorClasses[color] || "text-slate-400"}>
                {icon}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
            <Plus size={14} className="text-slate-500" />
        </button>
    );
};

export default Newuser;