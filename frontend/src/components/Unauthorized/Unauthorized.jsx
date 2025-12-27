import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8 text-center border border-slate-100">
        
        {/* Icon Header */}
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="text-red-600" size={40} />
        </div>

        {/* Text Content */}
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Access Denied
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          You don't have the required permissions to view this page. 
          This incident has been logged for security purposes.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate(-1)} // Goes back to the previous page
            className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl font-semibold hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center justify-center gap-2 bg-white text-slate-600 border border-slate-200 py-3 px-4 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
          >
            <Home size={18} />
            Return Dashboard
          </button>
        </div>

        {/* Footer Detail */}
        <div className="mt-8 pt-6 border-t border-slate-50">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            ComplianceOS Security Protocol v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;