
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import JobCard from './components/JobCard';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import { Job } from './types';
import { ShieldCheck, Cross, FlaskConical, Thermometer } from 'lucide-react';

const MOCK_JOBS: Job[] = [
  {
    id: 'hosp1',
    title: 'Gesundheits- & Krankenpfleger (m/w/d) Chirurgie',
    company: 'Universitätsklinikum Eppendorf',
    location: 'Hamburg',
    type: 'Vollzeit',
    salary: '4.200€ - 5.100€',
    description: 'Verantwortungsvolle Pflege im Bereich der Viszeral- und Thoraxchirurgie. Wir bieten modernste OP-Säle, ein interdisziplinäres Team und volle Unterstützung bei Fachweiterbildungen.',
    postedAt: 'Vor 45 Min.',
    logo: 'https://picsum.photos/seed/uke/120/120'
  },
  {
    id: 'hosp2',
    title: 'Anästhesietechnischer Assistent / ATA',
    company: 'Charité – Universitätsmedizin',
    location: 'Berlin',
    type: 'Vollzeit',
    salary: '4.800€ - 5.800€',
    description: 'Begleitung hochkomplexer Eingriffe in einem der führenden Krankenhäuser Europas. Attraktive Vergütung nach TV-L und exzellente Aufstiegschancen.',
    postedAt: 'Vor 3 Std.',
    logo: 'https://picsum.photos/seed/charite/120/120'
  },
  {
    id: 'hosp3',
    title: 'Pflegekraft (m/w/d) Notaufnahme',
    company: 'Klinikum München Rechts der Isar',
    location: 'München',
    type: 'Teilzeit',
    salary: '3.100€ - 3.900€',
    description: 'Adrenalin und Teamgeist in der zentralen Notaufnahme. Wir arbeiten nach Triage-Standards und bieten regelmäßige Supervisionen.',
    postedAt: 'Gestern',
    logo: 'https://picsum.photos/seed/isar/120/120'
  }
];

const App: React.FC = () => {
  const [jobs] = useState<Job[]>(MOCK_JOBS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            <aside className="w-full lg:w-1/4">
              <Sidebar />
            </aside>
            <div className="w-full lg:w-3/4">
              <div className="glass-card p-6 rounded-2xl mb-10 flex items-center justify-between border-l-4 border-cyan-600">
                <div className="flex items-center gap-5">
                  <div className="bg-cyan-600 text-white p-3 rounded-xl shadow-lg">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 font-clinical uppercase tracking-tighter">
                      Gelistete <span className="text-cyan-600">Klinik-Vakanzen</span>
                    </h2>
                    <p className="text-slate-400 text-xs font-medium">Validierte Angebote von zertifizierten Häusern</p>
                  </div>
                </div>
                <div className="hidden md:flex gap-4">
                   <div className="text-right">
                      <div className="text-[10px] font-black uppercase text-slate-400">Live-Statistik</div>
                      <div className="text-sm font-bold text-cyan-600">248 Neue Stellen</div>
                   </div>
                </div>
              </div>
              
              {loading ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-44 bg-white/60 animate-pulse rounded-2xl border border-slate-200"></div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}

              {/* Clinical Excellence CTA */}
              <div className="mt-20 relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-slate-900">
                   <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-600/10 skew-x-12 translate-x-1/4"></div>
                </div>
                <div className="relative z-10 p-12 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 bg-cyan-600/20 text-cyan-400 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest mb-6">
                      <FlaskConical size={14} /> Karriereschub
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 font-clinical uppercase tracking-tight">Klinische Exzellenz braucht <span className="text-cyan-400">Dich.</span></h3>
                    <p className="text-slate-400 text-lg leading-relaxed">
                      Lass dich von Top-Kliniken finden. Unser exklusives Netzwerk bietet Stellen, die oft gar nicht öffentlich ausgeschrieben werden.
                    </p>
                  </div>
                  <button className="clinic-button text-white font-black px-10 py-5 rounded-xl uppercase tracking-widest text-sm whitespace-nowrap border border-cyan-500/30">
                    Klinik-Profil erstellen
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-slate-900 text-slate-500 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-black text-white font-clinical mb-6">
              KRANKENPFLEGE<span className="text-cyan-500">JOBS</span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed">
              Die spezialisierte Plattform für medizinisches Fachpersonal in der Akut- und Fachpflege. Qualität und Integrität in der Personalvermittlung.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">Fachbereiche</h4>
            <a href="#" className="hover:text-cyan-400 transition-colors text-sm">Chirurgie</a>
            <a href="#" className="hover:text-cyan-400 transition-colors text-sm">Innere Medizin</a>
            <a href="#" className="hover:text-cyan-400 transition-colors text-sm">Anästhesie/OP</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">Rechtliches</h4>
            <a href="#" className="hover:text-cyan-400 transition-colors text-sm">Impressum</a>
            <a href="#" className="hover:text-cyan-400 transition-colors text-sm">Datenschutz</a>
            <p className="mt-6 text-[10px]">© 2024 stellenangebotekrankenpflege.de</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
