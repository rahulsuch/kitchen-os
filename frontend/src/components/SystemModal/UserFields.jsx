import React from 'react';
import { User, Mail, Lock } from 'lucide-react';

const UserFields = ({ formData, setFormData }) => {
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Full Name</label>
          <input name="name" onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500" placeholder="John Doe" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">System Email</label>
          <input name="email" onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500" placeholder="user@node.com" />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Access Level (Role)</label>
        <select name="role" onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition-all">
          <option className="bg-slate-900" value="staff">Staff</option>
          <option className="bg-slate-900" value="branchadmin">Branch Admin</option>
          <option className="bg-slate-900" value="enterpriseadmin">Enterprise Admin</option>
          <option className="bg-slate-900" value="superadmin">Super Admin</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Secure Key (Password)</label>
        <input name="password" type="password" onChange={handleChange} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500" placeholder="••••••••" />
      </div>
    </div>
  );
};

export default UserFields;