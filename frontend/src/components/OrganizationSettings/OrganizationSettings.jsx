import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Building2,
  Utensils,
  Share2,
  ShieldCheck,
  PhoneCall,
  UserCheck,
  Save,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Plus,
  X,
  RefreshCw,
} from "lucide-react";
import {
  getOrgProfileAction,
  updateOrgProfileAction,
  transferOwnershipAction,
} from "../../store/actions/orgProfileActions";
import toast from "react-hot-toast";

const SERVICE_MODEL_OPTIONS = [
  { id: "dine_in", label: "Dine-In Restaurant", desc: "Table service & seating management" },
  { id: "cloud_kitchen", label: "Cloud / Ghost Kitchen", desc: "Delivery-only, zero storefront" },
  { id: "takeaway", label: "Takeaway & Quick Pickup", desc: "Over-the-counter ordering" },
  { id: "delivery_aggregator", label: "Delivery Aggregators", desc: "Swiggy, Zomato, ONDC integrations" },
  { id: "delivery_own", label: "Self-Managed Delivery", desc: "In-house fleet & drivers" },
  { id: "catering", label: "Event & Bulk Catering", desc: "Large-scale batch preparation" },
];

const CUISINE_PRESETS = [
  "North Indian",
  "South Indian",
  "Chinese",
  "Continental",
  "Mughlai",
  "Italian & Pizza",
  "Fast Food & Burgers",
  "Bakery & Desserts",
  "Beverages & Cafe",
  "Asian Street Food",
];

const OrganizationSettings = () => {
  const dispatch = useDispatch();
  const { profile, loading, saving, error } = useSelector((state) => state.orgProfile);
  const { user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("operations");
  const [newCuisine, setNewCuisine] = useState("");
  const [transferTargetId, setTransferTargetId] = useState("");
  const [showTransferModal, setShowTransferModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    logoUrl: "",
    companyRegistrationNumber: "",
    taxId: "",
    billingEmail: "",
    currency: "INR",
    timezone: "Asia/Kolkata",
    operationsProfile: {
      serviceModels: [],
      cuisineTypes: [],
      avgDailyOrders: "",
      operatingSchedule: "fixed_hours",
    },
    integrations: {
      deliveryPlatforms: [
        { name: "swiggy", isActive: false, merchantId: "" },
        { name: "zomato", isActive: false, merchantId: "" },
        { name: "ondc", isActive: false, merchantId: "" },
      ],
      posSystem: "Petpooja",
      accountingSoftware: "Tally",
    },
    compliance: {
      gstRegistered: true,
      shopAndEstablishmentLicense: "",
      fireSafetyCertificate: "",
      liquorLicense: "",
      halaalCertification: "",
      isoCertified: false,
    },
    support: {
      primaryPhone: "",
      secondaryPhone: "",
      website: "",
      socialMedia: {
        instagram: "",
        facebook: "",
      },
    },
  });

  useEffect(() => {
    dispatch(getOrgProfileAction());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        slug: profile.slug || "",
        logoUrl: profile.logoUrl || "",
        companyRegistrationNumber: profile.companyRegistrationNumber || "",
        taxId: profile.taxId || "",
        billingEmail: profile.billingEmail || "",
        currency: profile.currency || "INR",
        timezone: profile.timezone || "Asia/Kolkata",
        operationsProfile: {
          serviceModels: profile.operationsProfile?.serviceModels || [],
          cuisineTypes: profile.operationsProfile?.cuisineTypes || [],
          avgDailyOrders: profile.operationsProfile?.avgDailyOrders || "",
          operatingSchedule: profile.operationsProfile?.operatingSchedule || "fixed_hours",
        },
        integrations: {
          deliveryPlatforms: profile.integrations?.deliveryPlatforms?.length
            ? profile.integrations.deliveryPlatforms
            : [
                { name: "swiggy", isActive: false, merchantId: "" },
                { name: "zomato", isActive: false, merchantId: "" },
                { name: "ondc", isActive: false, merchantId: "" },
              ],
          posSystem: profile.integrations?.posSystem || "Petpooja",
          accountingSoftware: profile.integrations?.accountingSoftware || "Tally",
        },
        compliance: {
          gstRegistered: profile.compliance?.gstRegistered ?? true,
          shopAndEstablishmentLicense: profile.compliance?.shopAndEstablishmentLicense || "",
          fireSafetyCertificate: profile.compliance?.fireSafetyCertificate || "",
          liquorLicense: profile.compliance?.liquorLicense || "",
          halaalCertification: profile.compliance?.halaalCertification || "",
          isoCertified: profile.compliance?.isoCertified ?? false,
        },
        support: {
          primaryPhone: profile.support?.primaryPhone || "",
          secondaryPhone: profile.support?.secondaryPhone || "",
          website: profile.support?.website || "",
          socialMedia: {
            instagram: profile.support?.socialMedia?.instagram || "",
            facebook: profile.support?.socialMedia?.facebook || "",
          },
        },
      });
    }
  }, [profile]);

  // Calculate Profile Completion Score
  const calculateCompletion = () => {
    let score = 0;
    const checks = [
      formData.name,
      formData.companyRegistrationNumber,
      formData.taxId,
      formData.billingEmail,
      formData.operationsProfile.serviceModels.length > 0,
      formData.operationsProfile.cuisineTypes.length > 0,
      formData.operationsProfile.avgDailyOrders,
      formData.integrations.deliveryPlatforms.some((p) => p.isActive && p.merchantId),
      formData.compliance.shopAndEstablishmentLicense || formData.compliance.fireSafetyCertificate,
      formData.support.primaryPhone,
    ];
    checks.forEach((chk) => {
      if (chk) score += 10;
    });
    return Math.min(score, 100);
  };

  const completionPercentage = calculateCompletion();

  // Handlers
  const handleServiceModelToggle = (modelId) => {
    const current = formData.operationsProfile.serviceModels;
    const exists = current.includes(modelId);
    const updated = exists ? current.filter((m) => m !== modelId) : [...current, modelId];
    setFormData({
      ...formData,
      operationsProfile: {
        ...formData.operationsProfile,
        serviceModels: updated,
      },
    });
  };

  const handleAddCuisine = (cuisine) => {
    if (!cuisine) return;
    const current = formData.operationsProfile.cuisineTypes;
    if (!current.includes(cuisine)) {
      setFormData({
        ...formData,
        operationsProfile: {
          ...formData.operationsProfile,
          cuisineTypes: [...current, cuisine],
        },
      });
    }
    setNewCuisine("");
  };

  const handleRemoveCuisine = (cuisine) => {
    setFormData({
      ...formData,
      operationsProfile: {
        ...formData.operationsProfile,
        cuisineTypes: formData.operationsProfile.cuisineTypes.filter((c) => c !== cuisine),
      },
    });
  };

  const handleDeliveryPlatformChange = (platformName, field, value) => {
    const updated = formData.integrations.deliveryPlatforms.map((p) => {
      if (p.name.toLowerCase() === platformName.toLowerCase()) {
        return { ...p, [field]: value };
      }
      return p;
    });
    setFormData({
      ...formData,
      integrations: {
        ...formData.integrations,
        deliveryPlatforms: updated,
      },
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateOrgProfileAction(formData));
      toast.success("Organization details saved successfully!");
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to save changes");
    }
  };

  const handleTransferOwnership = async () => {
    if (!transferTargetId) {
      toast.error("Please provide the User ID of the new administrator");
      return;
    }
    try {
      await dispatch(transferOwnershipAction(transferTargetId));
      toast.success("Enterprise ownership transferred successfully!");
      setShowTransferModal(false);
      setTransferTargetId("");
    } catch (err) {
      toast.error(typeof err === "string" ? err : "Failed to transfer ownership");
    }
  };

  if (loading && !profile) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <RefreshCw className="animate-spin text-cyan-500" size={24} />
          <span>Loading organization profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {formData.name || "Organization Profile & Settings"}
              </h1>
              <p className="text-sm text-slate-500">
                Corporate Tenant Identity, Operational Model, and Platform Governance
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md shadow-cyan-600/20 active:scale-95 disabled:opacity-50"
        >
          {saving ? (
            <RefreshCw className="animate-spin" size={16} />
          ) : (
            <Save size={16} />
          )}
          {saving ? "Saving Changes..." : "Save Configuration"}
        </button>
      </div>

      {/* 2. COMPLETION PROGRESS BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 rounded-2xl shadow-lg border border-slate-700/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Onboarding Readiness
            </span>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Business Profile: {completionPercentage}% Complete
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            {completionPercentage === 100
              ? "All regulatory and platform details configured!"
              : "Complete your operations and compliance info for full feature unlocking"}
          </span>
        </div>

        <div className="w-full bg-slate-700/60 rounded-full h-3 overflow-hidden p-0.5 border border-slate-600/50">
          <div
            className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-700 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* 3. TABS NAVIGATION */}
      <div className="flex overflow-x-auto border-b border-slate-200 gap-2 pb-px">
        {[
          { id: "operations", label: "Operations & Cuisines", icon: Utensils },
          { id: "integrations", label: "Delivery & POS Integrations", icon: Share2 },
          { id: "compliance", label: "Compliance & Licensing", icon: ShieldCheck },
          { id: "corporate", label: "Corporate & Tax Legal", icon: Building2 },
          { id: "support", label: "Contact & Brand Assets", icon: PhoneCall },
          { id: "governance", label: "Admin Ownership & Governance", icon: UserCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                isActive
                  ? "border-cyan-600 text-cyan-600 bg-cyan-50/50 rounded-t-xl"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 4. TAB CONTENTS */}
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
        {/* ==================================================== */}
        {/* TAB 1: OPERATIONS & CUISINES */}
        {/* ==================================================== */}
        {activeTab === "operations" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Business Service Models
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Select all the operational channels that this business functions on. KitchenOS will adapt POS and dispatch views accordingly.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SERVICE_MODEL_OPTIONS.map((opt) => {
                  const isChecked = formData.operationsProfile.serviceModels.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleServiceModelToggle(opt.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isChecked
                          ? "border-cyan-500 bg-cyan-50/40 text-slate-900 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white text-slate-600"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-slate-800">{opt.label}</h4>
                          <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                            isChecked
                              ? "bg-cyan-500 border-cyan-500 text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {isChecked && <CheckCircle2 size={14} />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Cuisines Section */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Cuisine Specialties
              </h3>
              <p className="text-sm text-slate-500 mb-3">
                Used to tailor recipe logs, allergen auditing templates, and inventory categorization.
              </p>

              {/* Selected Cuisine Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.operationsProfile.cuisineTypes.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-cyan-300 text-xs font-semibold"
                  >
                    {c}
                    <button
                      type="button"
                      onClick={() => handleRemoveCuisine(c)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <X size={13} />
                    </button>
                  </span>
                ))}
                {formData.operationsProfile.cuisineTypes.length === 0 && (
                  <span className="text-xs text-slate-400 italic">No cuisines selected yet. Pick below or add custom.</span>
                )}
              </div>

              {/* Preset Chips */}
              <div className="space-y-2 mb-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Add Presets:</span>
                <div className="flex flex-wrap gap-2">
                  {CUISINE_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleAddCuisine(preset)}
                      className="px-2.5 py-1 text-xs font-medium border border-slate-200 rounded-md hover:bg-slate-50 text-slate-600 transition-all"
                    >
                      + {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Cuisine Input */}
              <div className="flex gap-2 max-w-md">
                <input
                  type="text"
                  placeholder="Add custom cuisine (e.g., Lebanese, Vegan Fusion)"
                  value={newCuisine}
                  onChange={(e) => setNewCuisine(e.target.value)}
                  className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddCuisine(newCuisine)}
                  className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Operating Schedule & Volume */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Operating Schedule
                </label>
                <select
                  value={formData.operationsProfile.operatingSchedule}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      operationsProfile: {
                        ...formData.operationsProfile,
                        operatingSchedule: e.target.value,
                      },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500 bg-white"
                >
                  <option value="fixed_hours">Fixed Hours (e.g. 10:00 AM – 11:00 PM)</option>
                  <option value="24x7">24x7 Round-the-Clock Operations</option>
                  <option value="seasonal">Seasonal / Event Specific</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Average Daily Order Volume (Estimated)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 250 orders/day across all branches"
                  value={formData.operationsProfile.avgDailyOrders}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      operationsProfile: {
                        ...formData.operationsProfile,
                        avgDailyOrders: e.target.value,
                      },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: PLATFORM INTEGRATIONS */}
        {/* ==================================================== */}
        {activeTab === "integrations" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Third-Party Delivery Aggregators
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Connect external food aggregators to consolidate kitchen tickets and centralized audit trails.
              </p>

              <div className="space-y-4">
                {formData.integrations.deliveryPlatforms.map((platform) => (
                  <div
                    key={platform.name}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-xl border-slate-200 gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center font-black text-orange-600 uppercase text-xs">
                        {platform.name.substring(0, 3)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-800 capitalize">
                          {platform.name} Partner Sync
                        </h4>
                        <p className="text-xs text-slate-500">
                          {platform.isActive ? "Active and receiving orders" : "Inactive / Not connected"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-1 md:max-w-md justify-end">
                      <input
                        type="text"
                        placeholder="Merchant ID / Store ID"
                        value={platform.merchantId || ""}
                        onChange={(e) =>
                          handleDeliveryPlatformChange(platform.name, "merchantId", e.target.value)
                        }
                        className="flex-1 border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-cyan-500"
                      />
                      <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                        <input
                          type="checkbox"
                          checked={platform.isActive}
                          onChange={(e) =>
                            handleDeliveryPlatformChange(platform.name, "isActive", e.target.checked)
                          }
                          className="w-4 h-4 text-cyan-600 rounded focus:ring-cyan-500"
                        />
                        Active
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* POS and Accounting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Point of Sale (POS) Engine
                </label>
                <input
                  type="text"
                  placeholder="e.g. Petpooja, Posist, Razorpay POS"
                  value={formData.integrations.posSystem}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      integrations: { ...formData.integrations, posSystem: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Accounting / ERP Integration
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tally Prime, Zoho Books, QuickBooks"
                  value={formData.integrations.accountingSoftware}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      integrations: { ...formData.integrations, accountingSoftware: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: COMPLIANCE & LICENSING */}
        {/* ==================================================== */}
        {activeTab === "compliance" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Corporate Regulatory Certifications
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Enterprise-wide regulatory numbers. Individual kitchen FSSAI certificates are managed under Branch Offices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Shop & Establishment License Ref
                </label>
                <input
                  type="text"
                  placeholder="SE-REG-2024-XXXX"
                  value={formData.compliance.shopAndEstablishmentLicense}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      compliance: { ...formData.compliance, shopAndEstablishmentLicense: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Fire & Safety NOC Reference
                </label>
                <input
                  type="text"
                  placeholder="FIRE-NOC-MH-XXXX"
                  value={formData.compliance.fireSafetyCertificate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      compliance: { ...formData.compliance, fireSafetyCertificate: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Liquor / Excise License (If Applicable)
                </label>
                <input
                  type="text"
                  placeholder="Optional (FL-III / Bar License)"
                  value={formData.compliance.liquorLicense}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      compliance: { ...formData.compliance, liquorLicense: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Halal Food Preparation Certification
                </label>
                <input
                  type="text"
                  placeholder="Optional Halal Certification ID"
                  value={formData.compliance.halaalCertification}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      compliance: { ...formData.compliance, halaalCertification: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: CORPORATE & TAX LEGAL */}
        {/* ==================================================== */}
        {activeTab === "corporate" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Legal Entity & Invoicing Defaults
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Corporate identification for automated B2B invoicing and tenant billing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Registered Legal Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Company Registration Number (CIN)
                </label>
                <input
                  type="text"
                  value={formData.companyRegistrationNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, companyRegistrationNumber: e.target.value })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Tax Identification / GSTIN
                </label>
                <input
                  type="text"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Dedicated Invoicing / Billing Email
                </label>
                <input
                  type="email"
                  value={formData.billingEmail}
                  onChange={(e) => setFormData({ ...formData, billingEmail: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Default Accounting Currency
                </label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500 bg-white"
                >
                  <option value="INR">INR (₹) - Indian Rupee</option>
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="EUR">EUR (€) - Euro</option>
                  <option value="GBP">GBP (£) - British Pound</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Master Organization Timezone
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500 bg-white"
                >
                  <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                  <option value="UTC">UTC (Universal)</option>
                  <option value="America/New_York">America/New_York (EST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: CONTACT & BRAND ASSETS */}
        {/* ==================================================== */}
        {activeTab === "support" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Brand Identity & Support Contacts
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Used on customer receipts, partner integrations, and system-generated dispatch sheets.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Primary Enterprise Phone
                </label>
                <input
                  type="text"
                  placeholder="+91 98765 43210"
                  value={formData.support.primaryPhone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      support: { ...formData.support, primaryPhone: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Official Website
                </label>
                <input
                  type="url"
                  placeholder="https://www.yourbrand.com"
                  value={formData.support.website}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      support: { ...formData.support, website: e.target.value },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Instagram Handle
                </label>
                <input
                  type="text"
                  placeholder="@yourbrand"
                  value={formData.support.socialMedia.instagram}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      support: {
                        ...formData.support,
                        socialMedia: { ...formData.support.socialMedia, instagram: e.target.value },
                      },
                    })
                  }
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Brand Logo URL
                </label>
                <input
                  type="url"
                  placeholder="https://cdn.yourbrand.com/logo.png"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: GOVERNANCE & OWNERSHIP TRANSFER */}
        {/* ==================================================== */}
        {activeTab === "governance" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Enterprise Administration & Ownership Delegation
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                The Primary Enterprise Administrator holds master signing and governance authority over this tenant.
              </p>
            </div>

            {/* Current Admin Card */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-lg">
                    {profile?.admin?.fullname?.charAt(0) || user?.fullname?.charAt(0) || "A"}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {profile?.admin?.fullname || user?.fullname} (Current Primary Admin)
                    </h4>
                    <p className="text-sm text-slate-500">
                      {profile?.admin?.email || user?.email} • Role: Enterprise Administrator
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowTransferModal(true)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                >
                  Transfer Ownership
                </button>
              </div>
            </div>

            {/* Transfer Modal */}
            {showTransferModal && (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Transfer Enterprise Ownership
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Transferring ownership will promote the target user to Enterprise Admin and reassign your role to Manager. This action can only be undone by the new owner.
                  </p>

                  <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                      Target User MongoDB ID
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 64f1b2c3d4e5f6..."
                      value={transferTargetId}
                      onChange={(e) => setTransferTargetId(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowTransferModal(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleTransferOwnership}
                      disabled={saving}
                      className="px-4 py-2 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl"
                    >
                      Confirm Transfer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrganizationSettings;
