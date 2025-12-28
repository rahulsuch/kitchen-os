import React from 'react';
import { MapPin, Building2 } from 'lucide-react';

const BranchFields = ({ formData, setFormData }) => {
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Parent Organization</label>
        <select name="organizationId" onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition-all">
          <option className="bg-slate-900">Select Organization...</option>
          {/* We will map actual Orgs here later */}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Branch Name</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            name="branchName"
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none focus:border-cyan-500 transition-all" 
            placeholder="e.g. Jaipur Downtown" 
          />
        </div>
      </div>
    </div>
  );
};

export default BranchFields;