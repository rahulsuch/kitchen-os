import React from "react";
import { Globe, Mail, FileText, Wallet, Clock } from "lucide-react";

const OrgFields = ({ formData, setFormData, submitHandler }) => {
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      
      {/* Organization Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">
          Organization Name
        </label>
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

      {/* Billing Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">
          Billing / Admin Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="email"
            name="billingEmail"
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none focus:border-cyan-500 transition-all"
            placeholder="accounts@brand.com"
          />
        </div>
      </div>

      {/* Registration & Tax - Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">
            Company Reg No.
          </label>
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input
              name="companyRegistrationNumber"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none focus:border-cyan-500 transition-all"
              placeholder="CIN / Reg No."
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">
            Tax ID / GSTIN
          </label>
          <div className="relative">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <input
              name="taxId"
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none focus:border-cyan-500 transition-all"
              placeholder="GSTIN / VAT"
            />
          </div>
        </div>
      </div>

      {/* Localization - Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">
            Currency
          </label>
          <div className="relative">
            <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <select
              name="currency"
              onChange={handleChange}
              defaultValue="INR"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition-all"
            >
              <option value="INR" className="bg-slate-900">INR (₹)</option>
              <option value="USD" className="bg-slate-900">USD ($)</option>
              <option value="EUR" className="bg-slate-900">EUR (€)</option>
              <option value="GBP" className="bg-slate-900">GBP (£)</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">
            Timezone
          </label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
            <select
              name="timezone"
              onChange={handleChange}
              defaultValue="Asia/Kolkata"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition-all"
            >
              <option value="Asia/Kolkata" className="bg-slate-900">Asia/Kolkata (IST)</option>
              <option value="UTC" className="bg-slate-900">UTC (Global)</option>
              <option value="America/New_York" className="bg-slate-900">US East (EST)</option>
              <option value="Europe/London" className="bg-slate-900">Europe (GMT)</option>
            </select>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrgFields;
