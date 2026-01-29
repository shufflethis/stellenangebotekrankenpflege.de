
import React from 'react';
import { User, Activity } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="h-20 flex items-center bg-white border-b border-slate-200 sticky top-0 z-50 px-4">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="bg-slate-900 text-cyan-400 p-2 rounded-lg group-hover:bg-cyan-600 group-hover:text-white transition-all">
            <Activity size={24} />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900 font-clinical uppercase">
            KRANKEN<span className="text-cyan-600">PFLEGE</span>
          </span>
        </div>
        
        <div className="hidden lg:flex gap-10 font-bold text-slate-400 uppercase text-[10px] tracking-[0.2em]">
          <a href="#" className="hover:text-cyan-600 transition-colors">Jobsuche</a>
          <a href="#" className="hover:text-cyan-600 transition-colors">Kliniken</a>
          <a href="#" className="hover:text-cyan-600 transition-colors">Fachbereiche</a>
        </div>

        <div className="flex items-center gap-3">
          <button className="text-slate-900 font-bold px-4 py-2 hover:text-cyan-600 transition-colors text-xs uppercase tracking-widest">
            Für Arbeitgeber
          </button>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-slate-800 transition-all flex items-center gap-2 text-xs uppercase tracking-widest">
            <User size={16} />
            <span>Login</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
