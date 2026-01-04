// components/SystemModal.jsx
import { Zap } from "lucide-react";
import OrgFields from './OrgFields';
import BranchFields from './BranchFields';
import UserFields from './UserFields';


const SystemModal = ({ type, onClose }) => {
  const titles = {
    org: "Provision Organization Node",
    branch: "Initialize Branch Node",
    user: "Create Identity Protocol"
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-[#0d1420] border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-200">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-2">
            <Zap size={18} className="text-cyan-500" />
            {titles[type]}
          </h2>
          <p className="text-slate-500 text-[10px] uppercase mt-1">Deployment Phase: Initialization</p>
        </div>

        <form className="space-y-4">
           {/* Dynamic Fields based on type */}
           {type === 'org' && <OrgFields />}
           {type === 'branch' && <BranchFields />}
           {type === 'user' && <UserFields />}

           <div className="flex gap-3 mt-8">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl border border-white/5 text-slate-400 font-bold text-xs uppercase hover:bg-white/5 transition-all"
              >
                Abort
              </button>
              <button 
                type="submit"
                className="flex-[2] px-6 py-3 rounded-xl bg-cyan-500 text-black font-black text-xs uppercase hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                Execute Sequence
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default SystemModal;