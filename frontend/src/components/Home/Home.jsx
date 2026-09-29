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
        <div className="app-card flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--color-primary-subtle)] border border-[var(--color-primary)]/20 rounded-xl flex items-center justify-center text-[var(--color-primary)] flex-shrink-0">
              <Sparkles size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge-base badge-primary">
                  Setup Incomplete
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--color-text-main)]">
                Complete your Business & Operations Profile
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Configure your service models (Cloud Kitchen, Dine-In), Swiggy/Zomato integrations, and compliance details.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/organization-settings')}
            className="btn-primary whitespace-nowrap"
          >
            Complete Setup
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* SECTION 1: KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Compliance Score" value="94%" color="text-[var(--color-success)]" iconBg="bg-[var(--color-success-subtle)]" icon={<ShieldCheck size={20} />} />
        <StatCard title="Pending Logs" value="3" color="text-[var(--color-warning)]" iconBg="bg-[var(--color-warning-subtle)]" icon={<Clock size={20} />} />
        <StatCard title="Critical Issues" value="0" color="text-[var(--color-critical)]" iconBg="bg-[var(--color-critical-subtle)]" icon={<AlertTriangle size={20} />} />
        <StatCard title="Days to Audit" value="12" color="text-[var(--color-primary)]" iconBg="bg-[var(--color-primary-subtle)]" icon={<FileWarning size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SECTION 2: DAILY PROGRESS (Large) */}
        <div className="lg:col-span-2 app-card">
          <h3 className="text-base font-bold text-[var(--color-text-main)] mb-4">Today's Schedule 4 Progress</h3>
          <div className="space-y-3">
            <ProgressItem label="Morning Hygiene Check" time="08:00 AM" status="Completed" />
            <ProgressItem label="Fridge Temperature Log" time="11:00 AM" status="Pending" isUrgent />
            <ProgressItem label="Evening Sanitation" time="08:00 PM" status="Scheduled" />
          </div>
        </div>

        {/* SECTION 3: LICENSE WATCH (Small) */}
        <div className="app-card">
          <h3 className="text-base font-bold text-[var(--color-text-main)] mb-4">Regulatory Alerts</h3>
          <div className="p-4 bg-[var(--color-warning-subtle)] border border-[var(--color-warning)]/30 rounded-xl">
            <p className="text-sm font-bold text-[var(--color-warning-text)]">FSSAI License Renewal</p>
            <p className="text-xs text-[var(--color-warning-text)] opacity-90 mt-1">Your FoSCoS license expires in 24 days. Start renewal process now.</p>
          </div>
        </div>
      </div>
      
      <ComplianceChart />
    </div>
  );
};

// Reusable Small Components
const StatCard = ({ title, value, color, iconBg, icon }) => (
  <div className="app-card flex items-center justify-between p-5">
    <div>
      <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
    <div className={`p-3 ${iconBg} ${color} rounded-xl`}>{icon}</div>
  </div>
);

const ProgressItem = ({ label, time, status, isUrgent }) => (
  <div className="flex items-center justify-between p-3.5 app-card-subtle">
    <div>
      <p className="text-sm font-semibold text-[var(--color-text-main)]">{label}</p>
      <p className="text-xs text-[var(--color-text-muted)]">{time}</p>
    </div>
    <span className={`badge-base ${
      status === 'Completed' ? 'badge-success' : 
      isUrgent ? 'badge-warning animate-pulse' : 'badge-info'
    }`}>
      {status}
    </span>
  </div>
);

export default Home;