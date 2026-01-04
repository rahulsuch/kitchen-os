export const CyberCard = ({ children, title, icon, badge }) => (
  <div className="group relative bg-[#0d121b]/100 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md hover:border-cyan-500/30 transition-all duration-500">
    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
    <div className="px-6 py-5 flex items-center justify-between border-b border-white/5">
      <div className="flex items-center gap-3">
        <span className="text-cyan-400">{icon}</span>
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">{title}</h3>
      </div>
      {badge && (
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-[9px] font-bold uppercase border border-cyan-500/20">
          <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" /> {badge}
        </span>
      )}
    </div>
    <div className="p-6">{children}</div>
  </div>
);