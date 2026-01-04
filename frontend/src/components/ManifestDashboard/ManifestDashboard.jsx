import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Circle, PlayCircle, Plus, 
  Trash2, Filter, GitCommit, GripVertical 
} from 'lucide-react';
import { PROJECT_MANIFEST } from '../../utils/ProjectManifest';

const ManifestDashboard = () => {
  // Initializing state from your PROJECT_MANIFEST structure
  const [manifest, setManifest] = useState(PROJECT_MANIFEST);
  const [activeFilter, setActiveFilter] = useState('all');

  // --- Core Functions ---

  const cycleStatus = (sprintIdx, taskId) => {
    const statusOrder = ['not started', 'under development', 'completed'];
    const newManifest = [...manifest];
    const task = newManifest[sprintIdx].tasks.find(t => t.id === taskId);
    
    // Handle 'pending' from your initial data by mapping it to 'not started'
    let currentStatus = task.status === 'pending' ? 'not started' : task.status;
    const nextStatus = statusOrder[(statusOrder.indexOf(currentStatus) + 1) % statusOrder.length];
    
    task.status = nextStatus;
    setManifest(newManifest);
  };

  const addTask = (sprintIdx, taskIdx) => {
    const newManifest = [...manifest];
    const newTask = {
      id: Date.now(),
      task: "New tactical step...",
      status: "not started",
      dep: null
    };
    newManifest[sprintIdx].tasks.splice(taskIdx + 1, 0, newTask);
    setManifest(newManifest);
  };

  const deleteTask = (sprintIdx, taskId) => {
    const newManifest = [...manifest];
    newManifest[sprintIdx].tasks = newManifest[sprintIdx].tasks.filter(t => t.id !== taskId);
    setManifest(newManifest);
  };

  const getStatusUI = (status) => {
    if (status === 'completed') return { icon: <CheckCircle2 size={18} className="text-emerald-400" />, class: "border-emerald-500/20 bg-emerald-500/5 text-slate-400 line-through" };
    if (status === 'under development') return { icon: <PlayCircle size={18} className="text-cyan-400 animate-pulse" />, class: "border-cyan-500/30 bg-cyan-500/5 text-white" };
    return { icon: <Circle size={18} className="text-slate-600" />, class: "border-white/5 bg-white/[0.02] text-slate-500" };
  };

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h1 className="text-4xl font-black text-white italic tracking-tighter">
              SYSTEM <span className="text-cyan-500">TRACEABILITY</span>
            </h1>
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
              Dependency-Mapped Monolith Progress
            </p>
          </div>

          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            {['all', 'not started', 'under development', 'completed'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase transition-all ${
                  activeFilter === f ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        {/* Sprint Mapping */}
        <div className="space-y-20 relative before:absolute before:inset-0 before:left-[19px] before:w-[1px] before:bg-gradient-to-b before:from-cyan-500/50 before:to-transparent">
          {manifest.map((sprint, sIdx) => (
            <section key={sprint.sprint} className="relative pl-12">
              
              {/* Sprint Node */}
              <div className="absolute left-0 top-0 w-10 h-10 bg-[#05070a] border border-cyan-500/30 rounded-full flex items-center justify-center z-10 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                <GitCommit size={20} className="text-cyan-400" />
              </div>

              <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
                {sprint.sprint}
                <span className="h-[1px] flex-1 bg-white/5" />
              </h2>

              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {sprint.tasks
                    .filter(t => activeFilter === 'all' || (t.status === 'pending' && activeFilter === 'not started') || t.status === activeFilter)
                    .map((task, tIdx) => {
                      const ui = getStatusUI(task.status);
                      return (
                        <React.Fragment key={task.id}>
                          {/* Sequential Injection Point */}
                          <div className="group flex justify-center -my-2 opacity-0 hover:opacity-100 transition-all relative z-20">
                            <button 
                              onClick={() => addTask(sIdx, tIdx - 1)}
                              className="bg-cyan-500 text-black rounded-full p-0.5 hover:scale-125 transition-transform"
                            >
                              <Plus size={12} strokeWidth={4} />
                            </button>
                          </div>

                          <motion.div
                            layout
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={`group flex items-center justify-between p-4 border rounded-2xl transition-all duration-300 ${ui.class} hover:border-cyan-500/40`}
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <button onClick={() => cycleStatus(sIdx, task.id)} className="hover:scale-110 transition-transform">
                                {ui.icon}
                              </button>
                              
                              <div className="flex-1">
                                <input 
                                  className="bg-transparent border-none outline-none w-full text-sm font-medium focus:text-cyan-300 transition-colors"
                                  value={task.task}
                                  onChange={(e) => {
                                    const newManifest = [...manifest];
                                    newManifest[sIdx].tasks[tIdx].task = e.target.value;
                                    setManifest(newManifest);
                                  }}
                                />
                                <div className="flex gap-3 mt-1 opacity-40">
                                   <span className="text-[8px] font-mono uppercase tracking-tighter">Task_UID: {task.id}</span>
                                   {task.dep && <span className="text-[8px] font-mono uppercase tracking-tighter">Requires: #{task.dep}</span>}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => deleteTask(sIdx, task.id)} className="p-2 hover:text-red-400">
                                <Trash2 size={14} />
                              </button>
                              <GripVertical size={14} className="text-slate-800 cursor-grab" />
                            </div>
                          </motion.div>
                        </React.Fragment>
                      );
                    })}
                </AnimatePresence>

                {/* Add task at end of sprint */}
                <button 
                  onClick={() => addTask(sIdx, sprint.tasks.length - 1)}
                  className="w-full py-3 border border-dashed border-white/5 rounded-xl flex items-center justify-center gap-2 text-[10px] font-bold text-slate-600 hover:text-cyan-500 hover:border-cyan-500/20 transition-all mt-4"
                >
                  <Plus size={14} /> APPEND STEP TO {sprint.sprint.split(':')[1]}
                </button>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManifestDashboard;