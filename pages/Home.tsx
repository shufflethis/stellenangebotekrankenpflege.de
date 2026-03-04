// HR-UPDATER: v1.0

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import Sidebar from '../components/Sidebar';
import Hero from '../components/Hero';
import { Job } from '../types';
import { ShieldCheck, Cross, FlaskConical, Thermometer } from 'lucide-react';

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Zahntechniker (m/w/d) für den Bereich CAD / CAM',
    company: 'DELABO.GROUPSofort-Bewerbung',
    location: 'Klein Rönnau',
    type: 'Vollzeit',
    description: 'Zahntechniker (m/w/d) für den Bereich CAD / CAM',
    postedAt: '2026-03-04'
  },
  {
    id: '2',
    title: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    company: 'Kinder- und Jugendhilfe Weidenkorb',
    location: 'Löhne',
    type: 'Vollzeit',
    description: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    postedAt: '2026-03-04'
  },
  {
    id: '3',
    title: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    company: 'Kinder- und Jugendhilfe Weidenkorb',
    location: 'Espelkamp',
    type: 'Vollzeit',
    description: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    postedAt: '2026-03-04'
  },
  {
    id: '4',
    title: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    company: 'Kinder- und Jugendhilfe Weidenkorb',
    location: 'Lübbecke',
    type: 'Vollzeit',
    description: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    postedAt: '2026-03-04'
  },
  {
    id: '5',
    title: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    company: 'Kinder- und Jugendhilfe Weidenkorb',
    location: 'Hüllhorst',
    type: 'Vollzeit',
    description: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    postedAt: '2026-03-04'
  },
  {
    id: '6',
    title: 'Pflegehelfer für stationäre Krankenpflege (m/w/d)',
    company: 'Impuls Personal GmbH Filiale Köln',
    location: 'Köln',
    type: 'Vollzeit',
    description: 'Pflegehelfer für stationäre Krankenpflege (m/w/d)',
    postedAt: '2026-03-04'
  },
  {
    id: '7',
    title: 'Gesundheits- und Krankenpflege Helfer (m/w/d)',
    company: 'Impuls Personal GmbH Filiale Köln',
    location: 'Köln',
    type: 'Vollzeit',
    description: 'Gesundheits- und Krankenpflege Helfer (m/w/d)',
    postedAt: '2026-03-04'
  },
  {
    id: '8',
    title: 'Pflegefachkraft (m/w/d) Krankenpflege',
    company: 'MANPOWER GmbH & Co. KG',
    location: 'Hannover',
    type: 'Vollzeit',
    description: 'Pflegefachkraft (m/w/d) Krankenpflege',
    postedAt: '2026-03-02'
  },
  {
    id: '9',
    title: 'Pflegeassistent/Pflegeassistentin (Gesundheits- und Krankenpflege) (m/w/d)',
    company: 'Tempton Personaldienstleistungen GmbH NL Wittenberg',
    location: 'Lutherstadt Wittenberg',
    type: 'Vollzeit',
    description: 'Pflegeassistent/Pflegeassistentin (Gesundheits- und Krankenpflege) (m/w/d)',
    postedAt: '2026-03-02'
  },
  {
    id: '10',
    title: 'Pflegehilfskraft (m/w/d) Krankenpflege',
    company: 'WEISS Personalmanagement GmbH - Aschaffenburg',
    location: 'Aschaffenburg',
    type: 'Vollzeit',
    description: 'Pflegehilfskraft (m/w/d) Krankenpflege',
    postedAt: '2026-03-01'
  },
  {
    id: '11',
    title: 'Pflegefachmann (m/w/d) Krankenpflege - Wunschprämie!',
    company: 'KCS Medical GmbH',
    location: 'Korbach',
    type: 'Vollzeit',
    description: 'Pflegefachmann (m/w/d) Krankenpflege - Wunschprämie!',
    postedAt: '2026-02-27'
  },
  {
    id: '12',
    title: 'Pflegefachkraft (Gesundheits- und Krankenpflege)',
    company: 'KCS Medical GmbH',
    location: 'Wiesbaden',
    type: 'Vollzeit',
    description: 'Pflegefachkraft (Gesundheits- und Krankenpflege)',
    postedAt: '2026-02-27'
  },
  {
    id: '13',
    title: 'Berufsanerkennung in der Gesundheits- und Krankenpflege',
    company: 'Universitätsklinikum Augsburg AdöR',
    location: 'Augsburg, Bayern',
    type: 'Vollzeit',
    description: 'Berufsanerkennung in der Gesundheits- und Krankenpflege',
    postedAt: '2026-02-26'
  },
  {
    id: '14',
    title: 'Pflegehelfer (m/w/d) - stationäre Krankenpflege',
    company: 'PerZukunft Arbeitsvermittlung GmbH&Co.KG',
    location: 'Berlin',
    type: 'Vollzeit',
    description: 'Pflegehelfer (m/w/d) - stationäre Krankenpflege',
    postedAt: '2026-02-25'
  },
  {
    id: '15',
    title: 'Ein Herz für die Krankenpflege! (m/w/d)',
    company: 'MaNovoSante Personalmanagement GmbH & Co. KG',
    location: 'München',
    type: 'Vollzeit',
    description: 'Ein Herz für die Krankenpflege! (m/w/d)',
    postedAt: '2026-02-23'
  },
  {
    id: '16',
    title: 'Pflegefachmann/Pflegefachfrau (Gesundheits- und Krankenpflege) (m/w/d)',
    company: 'Brekstar Medical GmbH',
    location: 'Regensburg',
    type: 'Vollzeit',
    description: 'Pflegefachmann/Pflegefachfrau (Gesundheits- und Krankenpflege) (m/w/d)',
    postedAt: '2026-02-17'
  },
  {
    id: '17',
    title: 'Pflegehelfer - stationäre Krankenpflege  (m/w/d)',
    company: 'PerZukunft Arbeitsvermittlung GmbH&Co.KG',
    location: 'Berlin',
    type: 'Vollzeit',
    description: 'Pflegehelfer - stationäre Krankenpflege  (m/w/d)',
    postedAt: '2026-02-13'
  },
  {
    id: '18',
    title: 'Gesundheits- und Krankenpflege  (m/w/d)',
    company: 'Caritasverband Mannheim e.V.',
    location: 'Mannheim',
    type: 'Vollzeit',
    description: 'Gesundheits- und Krankenpflege  (m/w/d)',
    postedAt: '2026-02-12'
  },
  {
    id: '19',
    title: 'Pflegefachmann/frau (Gesundheits- und Krankenpflege)',
    company: 'Störmanns Hof Seniorenheim- Gemeinnützige Gesellschaft für Altenpflege mbH',
    location: 'Eslohe (Sauerland)',
    type: 'Vollzeit',
    description: 'Pflegefachmann/frau (Gesundheits- und Krankenpflege)',
    postedAt: '2026-02-10'
  },
  {
    id: '20',
    title: 'Altenpflegekraft (m/w/d)  stationäre Krankenpflege',
    company: 'PerZukunft Arbeitsvermittlung GmbH&Co.KG',
    location: 'Berlin',
    type: 'Vollzeit',
    description: 'Altenpflegekraft (m/w/d)  stationäre Krankenpflege',
    postedAt: '2026-02-06'
  },
  {
    id: '21',
    title: 'Pflegefachmann Gesundheits- und Krankenpflege (m/w/d)',
    company: 'Tempton Personaldienstleistungen GmbH NL Hamburg Medical',
    location: 'Rosengarten, Kreis Harburg',
    type: 'Vollzeit',
    description: 'Pflegefachmann Gesundheits- und Krankenpflege (m/w/d)',
    postedAt: '2026-02-02'
  },
  {
    id: '22',
    title: 'Pflegefachman Gesundheits- und Krankenpflege (m/w/d)',
    company: 'Tempton Personaldienstleistungen GmbH NL Hamburg Medical',
    location: 'Buchholz in der Nordheide',
    type: 'Vollzeit',
    description: 'Pflegefachman Gesundheits- und Krankenpflege (m/w/d)',
    postedAt: '2026-02-02'
  },
  {
    id: '23',
    title: 'Pflegeassistent/Pflegeassistentin (Gesundheits- und Krankenpflege) (m/w/d)',
    company: 'Tempton Personaldienstleistungen GmbH NL Frankfurt Medical',
    location: 'Hanau',
    type: 'Vollzeit',
    description: 'Pflegeassistent/Pflegeassistentin (Gesundheits- und Krankenpflege) (m/w/d)',
    postedAt: '2026-02-02'
  },
  {
    id: '24',
    title: 'Pflegefachkraft (Gesundheits- und Krankenpflege) (m/w/d)',
    company: 'stewe Personalservice GmbH & Co. KG - NL Krefeld',
    location: 'Neuss',
    type: 'Vollzeit',
    description: 'Pflegefachkraft (Gesundheits- und Krankenpflege) (m/w/d)',
    postedAt: '2026-02-02'
  },
  {
    id: '25',
    title: 'Pflegeassistentin Gesundheits- und Krankenpflege (m/w/d)',
    company: 'AllcuraMed Personal GmbH Hamburg',
    location: 'Hamburg',
    type: 'Vollzeit',
    description: 'Pflegeassistentin Gesundheits- und Krankenpflege (m/w/d)',
    postedAt: '2026-02-02'
  }
];

const Home: React.FC = () => {
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
            <Link to="/impressum" className="hover:text-cyan-400 transition-colors text-sm">Impressum</Link>
            <Link to="/datenschutz" className="hover:text-cyan-400 transition-colors text-sm">Datenschutz</Link>
            <Link to="/kontakt" className="hover:text-blue-400 transition-colors">Kontakt</Link>
            <Link to="/autor/thomas-sander" className="hover:text-blue-400 transition-colors">Autor</Link>
            <p className="mt-6 text-[10px]">© 2024 stellenangebotekrankenpflege.de</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
