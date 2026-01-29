
import React from 'react';
import { Search, MapPin, Thermometer } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pt-20 pb-28 px-4 bg-slate-50 relative border-b border-slate-200">
      {/* Structural accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-cyan-600"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white text-slate-900 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-10 shadow-sm border border-slate-200">
          <Thermometer size={14} className="text-cyan-600" />
          Medizinische Fachkräfte im Fokus
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-none font-clinical uppercase tracking-tighter">
          Präzision in der <span className="text-cyan-600">Pflege.</span> <br/>
          Exzellenz im <span className="text-slate-400">Beruf.</span>
        </h1>
        <p className="text-lg text-slate-500 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
          Das Fachportal für Gesundheits- und Krankenpfleger, ATAs, OTAs und Hebammen. Entdecke Vakanzen in Deutschlands führenden Kliniken.
        </p>
        
        <div className="max-w-4xl mx-auto bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-2 border border-slate-200">
          <div className="flex-grow flex items-center px-6 py-4 w-full bg-slate-50 rounded-xl border border-transparent focus-within:border-cyan-600/30 transition-colors">
            <Search className="text-slate-400 mr-4" size={20} />
            <input 
              type="text" 
              placeholder="Fachbereich (z.B. Intensiv, OP, Kardiologie)" 
              className="w-full bg-transparent focus:outline-none text-slate-900 font-bold placeholder-slate-300 text-sm uppercase tracking-wide"
            />
          </div>
          <div className="flex-grow flex items-center px-6 py-4 w-full bg-slate-50 rounded-xl border border-transparent focus-within:border-cyan-600/30 transition-colors">
            <MapPin className="text-slate-400 mr-4" size={20} />
            <input 
              type="text" 
              placeholder="Stadt / Klinikgruppe" 
              className="w-full bg-transparent focus:outline-none text-slate-900 font-bold placeholder-slate-300 text-sm uppercase tracking-wide"
            />
          </div>
          <button className="w-full md:w-auto clinic-button text-white font-black px-12 py-5 rounded-xl transition-all uppercase tracking-widest text-xs">
            Suche starten
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
