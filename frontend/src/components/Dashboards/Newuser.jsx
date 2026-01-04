import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Search,
  Bell,
  Command,
  ChevronRight,
} from "lucide-react";
import SystemModal from "../SystemModal/SystemModal";
import { CyberCard } from "../CyberCard/CyberCard";

const SuperAdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Dynamic Background Mesh */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <main className="relative z-10 max-w-[1600px] mx-auto p-6 lg:p-10">
        {/* Top Navigation Bar */}
        <nav className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                <ShieldAlert className="text-cyan-400" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight text-white">
                  Command <span className="text-cyan-400">Center</span>
                </h1>
                <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                  System Instance: 04-X
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
              <Command size={14} className="text-slate-500" />
              <span className="text-[11px] font-medium">
                Search Protocol...
              </span>
              <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-400">
                ⌘K
              </span>
            </div>
            <div className="relative">
              <Bell
                size={20}
                className="text-slate-400 hover:text-white cursor-pointer transition-colors"
              />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full border-2 border-[#05070a]"></span>
            </div>
          </div>
        </nav>

        {/* Action Header */}
        <motion.section
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-light text-white mb-1">
              Infrastructure
            </h2>
            <p className="text-sm text-slate-500">
              Deploy new nodes to the neural network.
            </p>
          </div>
          <div className="lg:col-span-3 flex flex-wrap md:justify-end gap-3 self-center">
            <QuickAction
              onClick={() => setModalType("org")}
              icon={<Building2 size={18} />}
              label="Organization"
              color="cyan"
            />
            <QuickAction
              onClick={() => setModalType("branch")}
              icon={<GitBranch size={18} />}
              label="Branch Office"
              color="purple"
            />
            <QuickAction
              onClick={() => setModalType("user")}
              icon={<UserPlus size={18} />}
              label="System Operator"
              color="blue"
            />
          </div>
        </motion.section>

        {/* Dashboard Grid */}
        <motion.div
          variants={containerVars}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-12 gap-6"
        >
          {/* Node Traffic - Custom Chart UX */}
          <motion.div variants={itemVars} className="col-span-12 lg:col-span-4">
            <CyberCard
              title="Network Load"
              icon={<Activity size={18} />}
              badge="Live"
            >
              <div className="h-40 flex items-end gap-1.5 pt-4">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${20 + Math.random() * 80}%` }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1.5,
                      delay: i * 0.05,
                    }}
                    className="flex-1 bg-gradient-to-t from-cyan-600/40 to-cyan-400/80 rounded-t-sm"
                  />
                ))}
              </div>
              <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase">
                <span>00:00</span>
                <span className="text-cyan-400/70 text-xs">94.2 mb/s avg</span>
                <span>23:59</span>
              </div>
            </CyberCard>
          </motion.div>

          {/* Active Sessions - Enhanced List UX */}
          <motion.div variants={itemVars} className="col-span-12 lg:col-span-8">
            <CyberCard title="Terminal Access Logs" icon={<Globe size={18} />}>
              <div className="space-y-1">
                <SessionRow
                  user="Root_Admin"
                  ip="104.21.4.1"
                  loc="Mumbai, IN"
                  ping="12ms"
                />
                <SessionRow
                  user="Branch_Mgr_04"
                  ip="172.67.13.2"
                  loc="London, UK"
                  ping="142ms"
                />
                <SessionRow
                  user="Dev_Internal"
                  ip="192.168.1.45"
                  loc="Remote"
                  ping="4ms"
                  isLocal
                />
              </div>
              <button className="w-full mt-4 py-2 text-[11px] text-slate-500 border border-dashed border-white/10 rounded-lg hover:border-cyan-500/40 hover:text-cyan-400 transition-all">
                View All Security Logs
              </button>
            </CyberCard>
          </motion.div>

          {/* Status Nodes */}
          <motion.div
            variants={itemVars}
            className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <StatusTile label="Sync Health" value="99.9%" trend="+0.2%" />
            <StatusTile label="Active Clusters" value="14" trend="Stable" />
            <StatusTile
              label="Threat Mitigation"
              value="Filtered"
              trend="Active"
            />
            <StatusTile label="System Latency" value="0.04ms" trend="-10%" />
          </motion.div>
        </motion.div>

        {/* 🛡️ Security Implementation: Root Level Modal */}
        <AnimatePresence>
          {modalType && (
            <SystemModal type={modalType} onClose={() => setModalType(null)} />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const SessionRow = ({ user, ip, loc, ping, isLocal }) => (
  <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] transition-all">
    <div className="flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
          isLocal
            ? "bg-blue-500/10 border-blue-500/20 text-blue-400"
            : "bg-white/5 border-white/10 text-slate-400"
        }`}
      >
        <Cpu size={18} />
      </div>
      <div>
        <h4 className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
          {user}
        </h4>
        <p className="text-[11px] text-slate-500 font-mono">
          {loc} • {ip}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <span className="text-[10px] font-mono text-slate-500">{ping}</span>
      <ChevronRight
        size={14}
        className="text-slate-600 group-hover:text-white transition-all transform group-hover:translate-x-1"
      />
    </div>
  </div>
);

const QuickAction = ({ onClick, icon, label, color }) => {
  const colors = {
    cyan: "border-cyan-500/20 text-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10",
    purple:
      "border-purple-500/20 text-purple-400 bg-purple-500/5 hover:bg-purple-500/10",
    blue: "border-blue-500/20 text-blue-400 bg-blue-500/5 hover:bg-blue-500/10",
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-2.5 rounded-xl border transition-all active:scale-95 group ${colors[color]}`}
    >
      {icon}
      <span className="text-xs font-bold uppercase tracking-wider">
        {label}
      </span>
      <Plus
        size={16}
        className="opacity-40 group-hover:opacity-100 group-hover:rotate-90 transition-all"
      />
    </button>
  );
};

const StatusTile = ({ label, value, trend }) => (
  <div className="bg-white/5 border border-white/5 p-5 rounded-2xl hover:bg-white/[0.08] transition-colors">
    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-2">
      {label}
    </p>
    <div className="flex items-end justify-between">
      <h4 className="text-2xl font-light text-white">{value}</h4>
      <span className="text-[10px] text-cyan-500 font-mono bg-cyan-500/10 px-1.5 py-0.5 rounded">
        {trend}
      </span>
    </div>
  </div>
);

export default SuperAdminDashboard;
