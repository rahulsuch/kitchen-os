import React from 'react';
import { ShieldCheck, AlertTriangle, Clock, FileWarning } from 'lucide-react';
import ComplianceChart from '../../utils/ComplianceChart';

const Home = () => {
  return (
    <div className="space-y-6">
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