import React from 'react';
import { Globe, ShieldCheck, Zap } from 'lucide-react';

const OrgFields = ({ formData, setFormData }) => {
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Organization Name</label>
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            name="name"
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none focus:border-cyan-500 transition-all" 
            placeholder="e.g. Global Kitchens Ltd" 
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Plan Tier</label>
          <select name="plan" onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition-all">
            <option className="bg-slate-900">Standard</option>
            <option className="bg-slate-900">Enterprise</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Region Node</label>
          <select name="region" onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition-all">
            <option className="bg-slate-900">India-North</option>
            <option className="bg-slate-900">US-East</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrgFields;