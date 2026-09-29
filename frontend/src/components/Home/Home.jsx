import React from 'react';
import { ShieldCheck, AlertTriangle, Clock, FileWarning, Sparkles, ArrowRight, Building2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ComplianceChart from '../../utils/ComplianceChart';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const isEnterpriseAdmin = user?.role === 'enterpriseadmin' || user?.role === 'superadmin';

  return (
    <div className="space-y-6">
      {/* ENTERPRISE SETUP NUDGE BANNER */}
      {isEnterpriseAdmin && (
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 p-5 rounded-2xl border border-cyan-500/20 shadow-lg text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
              <Sparkles size={24} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                Setup Incomplete
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                Complete your Business & Operations Profile
              </h3>
              <p className="text-xs text-slate-400">
                Configure your service models (Cloud Kitchen/Dine-In), Swiggy/Zomato integrations, and compliance details.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/organization-settings')}
            className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-cyan-500/20 whitespace-nowrap active:scale-95"
          >
            Complete Setup
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* SECTION 1: KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Compliance Score" value="94%" color="text-emerald-600" icon={<ShieldCheck />} />
        <StatCard title="Pending Logs" value="3" color="text-amber-600" icon={<Clock />} />
        <StatCard title="Critical Issues" value="0" color="text-slate-400" icon={<AlertTriangle />} />
        <StatCard title="Days to Audit" value="12" color="text-blue-600" icon={<FileWarning />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SECTION 2: DAILY PROGRESS (Large) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Today's Schedule 4 Progress</h3>
          <div className="space-y-4">
            <ProgressItem label="Morning Hygiene Check" time="08:00 AM" status="Completed" />
            <ProgressItem label="Fridge Temperature Log" time="11:00 AM" status="Pending" isUrgent />
            <ProgressItem label="Evening Sanitation" time="08:00 PM" status="Scheduled" />
          </div>
        </div>

        {/* SECTION 3: LICENSE WATCH (Small) */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Regulatory Alerts</h3>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
            <p className="text-sm font-bold text-amber-800">FSSAI License Renewal</p>
            <p className="text-xs text-amber-700 mt-1">Your FoSCoS license expires in 24 days. Start renewal process now.</p>
          </div>
        </div>
      </div>
        <ComplianceChart />

    </div>
  );
};

// Reusable Small Components
const StatCard = ({ title, value, color, icon }) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
    <div className={`p-3 bg-slate-50 rounded-lg ${color}`}>{icon}</div>
  </div>
);

const ProgressItem = ({ label, time, status, isUrgent }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100">
    <div>
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <p className="text-xs text-slate-500">{time}</p>
    </div>
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
      status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
      isUrgent ? 'bg-amber-100 text-amber-900 animate-pulse' : 'bg-slate-200 text-slate-600'
    }`}>
      {status}
    </span>
  </div>
);

export default Home;