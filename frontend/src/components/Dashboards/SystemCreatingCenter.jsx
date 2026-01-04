import React, { useState } from 'react';
import { Building2, UserPlus, Fingerprint, ShieldCheck, Globe, Zap } from 'lucide-react';
import { toast } from 'react-hot-toast';

const SystemCreationCenter = () => {
  const [activeMode, setActiveMode] = useState('org'); // 'org' or 'user'
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* HUD Navigation */}
        <div className="flex gap-4 mb-10 bg-white/5 p-1 rounded-2xl border border-white/10 w-fit">
          <button 
            onClick={() => setActiveMode('org')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeMode === 'org' ? 'bg-cyan-500 text-black font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <Building2 size={18} /> Organization Node
          </button>
          <button 
            onClick={() => setActiveMode('user')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${activeMode === 'user' ? 'bg-cyan-500 text-black font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)]' : 'hover:bg-white/5 text-slate-400'}`}
          >
            <UserPlus size={18} /> Identity Creation
          </button>
        </div>

        {/* Glass Form Container */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-transparent rounded-3xl blur-xl opacity-50"></div>
          <div className="relative bg-[#0d1420]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                {activeMode === 'org' ? <Building2 className="text-cyan-400"/> : <Fingerprint className="text-cyan-400"/>}
                {activeMode === 'org' ? 'Provision New Organization' : 'Initialize System Identity'}
              </h2>
              <p className="text-slate-500 text-sm mt-1">Authorized SuperAdmin protocol active.</p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeMode === 'org' ? <OrgFields /> : <UserFields />}

              <div className="col-span-full mt-6 pt-6 border-t border-white/5 flex justify-end">
                <button 
                  type="submit"
                  disabled={loading}
                  className="group relative flex items-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-cyan-400 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Zap size={18} className="group-hover:fill-current" />
                  {loading ? 'Processing...' : 'Execute Deployment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Form Field Modules ---

const OrgFields = () => (
  <>
    <InputGroup label="Organization Name" placeholder="e.g. Global Kitchens Ltd" icon={<Globe size={16}/>} />
    <InputGroup label="Domain/Slug" placeholder="global-kitchens" icon={<ShieldCheck size={16}/>} />
    <InputGroup label="Subscription Tier" type="select" options={['Enterprise', 'Standard', 'Trial']} />
    <InputGroup label="Region Node" type="select" options={['India-North', 'US-East', 'EU-West']} />
  </>
);

const UserFields = () => (
  <>
    <InputGroup label="Full Legal Name" placeholder="John Doe" icon={<Fingerprint size={16}/>} />
    <InputGroup label="System Email" placeholder="identity@domain.com" />
    <InputGroup label="Access Level (Role)" type="select" options={['superadmin', 'enterpriseadmin', 'branchadmin', 'staff']} />
    <InputGroup label="Assign Organization" type="select" options={['Load Orgs...']} />
    <div className="col-span-full">
      <InputGroup label="Temporary Access Key (Password)" type="password" />
    </div>
  </>
);

// --- Futuristic Input Component ---

const InputGroup = ({ label, placeholder, type = "text", icon, options }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold ml-1">{label}</label>
    <div className="relative group">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors">{icon}</div>}
      
      {type === 'select' ? (
        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none cursor-pointer">
          {options.map(opt => <option key={opt} className="bg-[#0d1420] text-white">{opt}</option>)}
        </select>
      ) : (
        <input 
          type={type}
          placeholder={placeholder}
          className={`w-full bg-white/5 border border-white/10 rounded-xl ${icon ? 'pl-11' : 'px-4'} py-3 text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all`}
        />
      )}
    </div>
  </div>
);

export default SystemCreationCenter;