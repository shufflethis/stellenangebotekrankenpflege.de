
import React from 'react';
import { Filter, Hospital, Award, Info } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 px-2">
        <Filter size={20} className="text-cyan-600" />
        <h3 className="font-black text-slate-900 text-lg font-clinical uppercase tracking-widest">Parameter</h3>
      </div>

      <div className="glass-card p-8 rounded-2xl border border-slate-200">
        <section className="mb-10">
          <h4 className="font-black text-slate-300 text-[10px] uppercase mb-6 tracking-[0.3em] flex items-center gap-2">
            <Hospital size={16} className="text-cyan-600" /> Fachabteilung
          </h4>
          <div className="space-y-4">
            {[
              'Allgemeinchirurgie', 
              'Kardiologie', 
              'Neurologie', 
              'Pädiatrie', 
              'Intensiv / Anästhesie',
              'Geriatrie'
            ].map(item => (
              <label key={item} className="flex items-center gap-4 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded-md border-slate-200 text-cyan-600 focus:ring-cyan-500/50 cursor-pointer transition-all" />
                <span className="text-slate-600 font-bold text-xs uppercase tracking-wide group-hover:text-cyan-600 transition-colors">{item}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h4 className="font-black text-slate-300 text-[10px] uppercase mb-6 tracking-[0.3em] flex items-center gap-2">
            <Award size={16} className="text-cyan-600" /> Qualifikation
          </h4>
          <div className="space-y-4">
            {[
              'Examen (GKP)', 
              'Fachweiterbildung', 
              'Akademischer Grad', 
              'Leitungserfahrung'
            ].map(item => (
              <label key={item} className="flex items-center gap-4 cursor-pointer group">
                <input type="radio" name="qual" className="w-5 h-5 border-slate-200 text-cyan-600 focus:ring-cyan-500/50 cursor-pointer transition-all" />
                <span className="text-slate-600 font-bold text-xs uppercase tracking-wide group-hover:text-cyan-600 transition-colors">{item}</span>
              </label>
            ))}
          </div>
        </section>

        <div className="bg-slate-900 p-6 rounded-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-2 text-cyan-500/20 group-hover:scale-110 transition-transform">
              <Info size={40} />
           </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-[10px] mb-3 uppercase tracking-widest">
              <span>Marktanalyse</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed font-medium italic">
              Derzeit suchen <b>85%</b> der Universitätskliniken aktiv nach Fachkräften für den OP-Dienst.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
