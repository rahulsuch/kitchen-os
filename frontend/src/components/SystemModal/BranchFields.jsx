import React, { useEffect } from "react";
import { MapPin, Building2, Phone, User, Network } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrganizationData } from "../../store/actions/dataListActions";

const BranchFields = ({ formData, setFormData }) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(e)
  };

  // Get organizations from Redux state (with a fallback to empty array)
  const dataList = useSelector((state) => state.dataList);
  const organizations = useSelector(
    (state) => state.dataList?.organizationData || [],
  );

  console.log(
    "state dataList => ",
    dataList,
    "\n organizations => ",
    organizations,
  );
  // Fetch organizations ONLY when this Branch form is rendered
  useEffect(() => {
    loadOrganizationData(dispatch);
  }, [dispatch]);

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Organization Selection */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">
          Parent Organization
        </label>
        <select
          name="organizationId"
          onChange={handleChange}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition-all"
        >
          <option value="" className="bg-slate-900">
            Select Organization...
          </option>
          {organizations.map((org) => (
            <option key={org._id} value={org._id} className="bg-slate-900">
              {org.name}
            </option>
          ))}
        </select>
      </div>

      {/* Branch Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">
          Branch Name
        </label>
        <div className="relative">
          <Building2
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={16}
          />
          <input
            name="branchName"
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none focus:border-cyan-500 transition-all"
            placeholder="e.g. Jaipur Downtown"
          />
        </div>
      </div>

      {/* Branch Type */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">
          Branch Type
        </label>
        <div className="relative">
          <Network
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={16}
          />
          <select
            name="branchType"
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-cyan-500 transition-all"
          >
            <option value="Local" className="bg-slate-900">
              Local Branch
            </option>
            <option value="Cloud Kitchen" className="bg-slate-900">
              Cloud Kitchen
            </option>
            <option value="Regional" className="bg-slate-900">
              Regional Hub
            </option>
            <option value="Headquarters" className="bg-slate-900">
              Headquarters
            </option>
          </select>
        </div>
      </div>

      {/* Branch Location */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">
          Location
        </label>
        <div className="relative">
          <MapPin
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={16}
          />
          <input
            name="location"
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none focus:border-cyan-500 transition-all"
            placeholder="e.g. C-Scheme, Jaipur"
          />
        </div>
      </div>

      {/* Reception Contact */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">
          Reception Contact
        </label>
        <div className="relative">
          <Phone
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={16}
          />
          <input
            name="receptionContact"
            type="tel"
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none focus:border-cyan-500 transition-all"
            placeholder="+91 98765 43210"
          />
        </div>
      </div>

      {/* Branch Head */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">
          Branch Head / Manager
        </label>
        <div className="relative">
          <User
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={16}
          />
          <input
            name="branchHead"
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-700 outline-none focus:border-cyan-500 transition-all"
            placeholder="Search Manager / User ID..."
          />
        </div>
      </div>
    </div>
  );
};

export default BranchFields;
