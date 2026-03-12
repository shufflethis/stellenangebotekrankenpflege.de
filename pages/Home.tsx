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
    title: 'Pflegefachmann/Pflegefachfrau (Gesundheits- und Krankenpflege) (m/w/d)',
    company: 'Tempton Personaldienstleistungen GmbH NL Magdeburg Medical',
    location: 'Haldensleben',
    type: 'Vollzeit',
    description: 'Pflegefachmann/Pflegefachfrau (Gesundheits- und Krankenpflege) (m/w/d)',
    postedAt: '2026-03-06'
  },
  {
    id: '2',
    title: 'Pflegefachmann/Pflegefachfrau (m/w/d) Krankenpflege',
    company: 'Tempton Personaldienstleistungen GmbH NL Magdeburg Medical',
    location: 'Braunlage',
    type: 'Vollzeit',
    description: 'Pflegefachmann/Pflegefachfrau (m/w/d) Krankenpflege',
    postedAt: '2026-03-06'
  },
  {
    id: '3',
    title: 'Pflegehelfer für stationäre Krankenpflege (m/w/d)',
    company: 'Impuls Personal GmbH Filiale Köln',
    location: 'Bergisch Gladbach',
    type: 'Vollzeit',
    description: 'Pflegehelfer für stationäre Krankenpflege (m/w/d)',
    postedAt: '2026-03-05'
  },
  {
    id: '4',
    title: 'Gesundheits- und Krankenpflege Helfer (m/w/d)',
    company: 'Impuls Personal GmbH Filiale Köln',
    location: 'Bergisch Gladbach',
    type: 'Vollzeit',
    description: 'Gesundheits- und Krankenpflege Helfer (m/w/d)',
    postedAt: '2026-03-05'
  },
  {
    id: '5',
    title: 'Zahntechniker (m/w/d) für den Bereich CAD / CAM',
    company: 'DELABO.GROUPSofort-Bewerbung',
    location: 'Klein Rönnau',
    type: 'Vollzeit',
    description: 'Zahntechniker (m/w/d) für den Bereich CAD / CAM',
    postedAt: '2026-03-04'
  },
  {
    id: '6',
    title: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    company: 'Kinder- und Jugendhilfe Weidenkorb',
    location: 'Löhne',
    type: 'Vollzeit',
    description: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    postedAt: '2026-03-04'
  },
  {
    id: '7',
    title: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    company: 'Kinder- und Jugendhilfe Weidenkorb',
    location: 'Espelkamp',
    type: 'Vollzeit',
    description: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    postedAt: '2026-03-04'
  },
  {
    id: '8',
    title: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    company: 'Kinder- und Jugendhilfe Weidenkorb',
    location: 'Lübbecke',
    type: 'Vollzeit',
    description: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    postedAt: '2026-03-04'
  },
  {
    id: '9',
    title: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    company: 'Kinder- und Jugendhilfe Weidenkorb',
    location: 'Hüllhorst',
    type: 'Vollzeit',
    description: 'Hauswirtschaftliche Leitung (m/w/d) für unser Kinderhaus in Teil- oder Vollzeit',
    postedAt: '2026-03-04'
  },
  {
    id: '10',
    title: 'Pflegehelfer für stationäre Krankenpflege (m/w/d)',
    company: 'Impuls Personal GmbH Filiale Köln',
    location: 'Köln',
    type: 'Vollzeit',
    description: 'Pflegehelfer für stationäre Krankenpflege (m/w/d)',
    postedAt: '2026-03-04'
  },
  {
    id: '11',
    title: 'Gesundheits- und Krankenpflege Helfer (m/w/d)',
    company: 'Impuls Personal GmbH Filiale Köln',
    location: 'Köln',
    type: 'Vollzeit',
    description: 'Gesundheits- und Krankenpflege Helfer (m/w/d)',
    postedAt: '2026-03-04'
  },
  {
    id: '12',
    title: 'Pflegefachkraft (m/w/d) Krankenpflege',
    company: 'MANPOWER GmbH & Co. KG',
    location: 'Hannover',
    type: 'Vollzeit',
    description: 'Pflegefachkraft (m/w/d) Krankenpflege',
    postedAt: '2026-03-02'
  },
  {
    id: '13',
    title: 'Pflegeassistent/Pflegeassistentin (Gesundheits- und Krankenpflege) (m/w/d)',
    company: 'Tempton Personaldienstleistungen GmbH NL Wittenberg',
    location: 'Lutherstadt Wittenberg',
    type: 'Vollzeit',
    description: 'Pflegeassistent/Pflegeassistentin (Gesundheits- und Krankenpflege) (m/w/d)',
    postedAt: '2026-03-02'
  },
  {
    id: '14',
    title: 'Pflegehilfskraft (m/w/d) Krankenpflege',
    company: 'WEISS Personalmanagement GmbH - Aschaffenburg',
    location: 'Aschaffenburg',
    type: 'Vollzeit',
    description: 'Pflegehilfskraft (m/w/d) Krankenpflege',
    postedAt: '2026-03-01'
  },
  {
    id: '15',
    title: 'Pflegefachmann (m/w/d) Krankenpflege - Wunschprämie!',
    company: 'KCS Medical GmbH',
    location: 'Korbach',
    type: 'Vollzeit',
    description: 'Pflegefachmann (m/w/d) Krankenpflege - Wunschprämie!',
    postedAt: '2026-02-27'
  },
  {
    id: '16',
    title: 'Pflegefachkraft (Gesundheits- und Krankenpflege)',
    company: 'KCS Medical GmbH',
    location: 'Wiesbaden',
    type: 'Vollzeit',
    description: 'Pflegefachkraft (Gesundheits- und Krankenpflege)',
    postedAt: '2026-02-27'
  },
  {
    id: '17',
    title: 'Berufsanerkennung in der Gesundheits- und Krankenpflege',
    company: 'Universitätsklinikum Augsburg AdöR',
    location: 'Augsburg, Bayern',
    type: 'Vollzeit',
    description: 'Berufsanerkennung in der Gesundheits- und Krankenpflege',
    postedAt: '2026-02-26'
  },
  {
    id: '18',
    title: 'Pflegehelfer (m/w/d) - stationäre Krankenpflege',
    company: 'PerZukunft Arbeitsvermittlung GmbH&Co.KG',
    location: 'Berlin',
    type: 'Vollzeit',
    description: 'Pflegehelfer (m/w/d) - stationäre Krankenpflege',
    postedAt: '2026-02-25'
  },
  {
    id: '19',
    title: 'Ein Herz für die Krankenpflege! (m/w/d)',
    company: 'MaNovoSante Personalmanagement GmbH & Co. KG',
    location: 'München',
    type: 'Vollzeit',
    description: 'Ein Herz für die Krankenpflege! (m/w/d)',
    postedAt: '2026-02-23'
  },
  {
    id: '20',
    title: 'Pflegefachmann/Pflegefachfrau (Gesundheits- und Krankenpflege) (m/w/d)',
    company: 'Brekstar Medical GmbH',
    location: 'Regensburg',
    type: 'Vollzeit',
    description: 'Pflegefachmann/Pflegefachfrau (Gesundheits- und Krankenpflege) (m/w/d)',
    postedAt: '2026-02-17'
  },
  {
    id: '21',
    title: 'Pflegehelfer - stationäre Krankenpflege  (m/w/d)',
    company: 'PerZukunft Arbeitsvermittlung GmbH&Co.KG',
    location: 'Berlin',
    type: 'Vollzeit',
    description: 'Pflegehelfer - stationäre Krankenpflege  (m/w/d)',
    postedAt: '2026-02-13'
  },
  {
    id: '22',
    title: 'Gesundheits- und Krankenpflege  (m/w/d)',
    company: 'Caritasverband Mannheim e.V.',
    location: 'Mannheim',
    type: 'Vollzeit',
    description: 'Gesundheits- und Krankenpflege  (m/w/d)',
    postedAt: '2026-02-12'
  },
  {
    id: '23',
    title: 'Pflegefachmann/frau (Gesundheits- und Krankenpflege)',
    company: 'Störmanns Hof Seniorenheim- Gemeinnützige Gesellschaft für Altenpflege mbH',
    location: 'Eslohe (Sauerland)',
    type: 'Vollzeit',
    description: 'Pflegefachmann/frau (Gesundheits- und Krankenpflege)',
    postedAt: '2026-02-10'
  },
  {
    id: '24',
    title: 'Altenpflegekraft (m/w/d)  stationäre Krankenpflege',
    company: 'PerZukunft Arbeitsvermittlung GmbH&Co.KG',
    location: 'Berlin',
    type: 'Vollzeit',
    description: 'Altenpflegekraft (m/w/d)  stationäre Krankenpflege',
    postedAt: '2026-02-06'
  },
  {
    id: '25',
    title: 'Pflegefachmann Gesundheits- und Krankenpflege (m/w/d)',
    company: 'Tempton Personaldienstleistungen GmbH NL Hamburg Medical',
    location: 'Rosengarten, Kreis Harburg',
    type: 'Vollzeit',
    description: 'Pflegefachmann Gesundheits- und Krankenpflege (m/w/d)',
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
            <aside className="w-full lg:w-1/4 order-2 lg:order-1">
              <Sidebar />
            </aside>
            <div className="w-full lg:w-3/4 order-1 lg:order-2">
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
        {/* Geo SEO: Krankenpflege Jobs in deutschen Städten */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-black text-slate-900 font-clinical uppercase tracking-tight mb-4">
            Krankenpflege-Jobs in <span className="text-cyan-600">deutschen Städten</span>
          </h2>
          <p className="text-slate-500 mb-10 max-w-3xl">
            Finden Sie aktuelle Stellenangebote in der Gesundheits- und Krankenpflege in allen großen Städten Deutschlands. Ob Universitätsklinik, Fachkrankenhaus oder ambulanter Pflegedienst -- wir listen Vakanzen aus Ihrer Region.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { city: 'Berlin', region: 'Berlin' },
              { city: 'Hamburg', region: 'Hamburg' },
              { city: 'München', region: 'Bayern' },
              { city: 'Köln', region: 'NRW' },
              { city: 'Frankfurt am Main', region: 'Hessen' },
              { city: 'Stuttgart', region: 'Baden-Württemberg' },
              { city: 'Düsseldorf', region: 'NRW' },
              { city: 'Leipzig', region: 'Sachsen' },
              { city: 'Dortmund', region: 'NRW' },
              { city: 'Essen', region: 'NRW' },
              { city: 'Bremen', region: 'Bremen' },
              { city: 'Dresden', region: 'Sachsen' },
              { city: 'Hannover', region: 'Niedersachsen' },
              { city: 'Nürnberg', region: 'Bayern' },
              { city: 'Duisburg', region: 'NRW' },
              { city: 'Bochum', region: 'NRW' },
              { city: 'Wuppertal', region: 'NRW' },
              { city: 'Bielefeld', region: 'NRW' },
              { city: 'Bonn', region: 'NRW' },
              { city: 'Mannheim', region: 'Baden-Württemberg' },
              { city: 'Karlsruhe', region: 'Baden-Württemberg' },
              { city: 'Augsburg', region: 'Bayern' },
              { city: 'Wiesbaden', region: 'Hessen' },
              { city: 'Münster', region: 'NRW' },
              { city: 'Freiburg', region: 'Baden-Württemberg' },
              { city: 'Aachen', region: 'NRW' },
              { city: 'Kiel', region: 'Schleswig-Holstein' },
              { city: 'Lübeck', region: 'Schleswig-Holstein' },
              { city: 'Magdeburg', region: 'Sachsen-Anhalt' },
              { city: 'Rostock', region: 'Mecklenburg-Vorpommern' },
            ].map((item) => (
              <div key={item.city} className="bg-white rounded-xl p-4 border border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all cursor-pointer group">
                <div className="font-bold text-slate-900 group-hover:text-cyan-600 transition-colors text-sm">{item.city}</div>
                <div className="text-slate-400 text-xs mt-1">{item.region}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200">
          <h2 className="text-3xl font-black text-slate-900 font-clinical uppercase tracking-tight mb-10">
            Häufig gestellte <span className="text-cyan-600">Fragen</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                q: 'Ist die Nutzung von stellenangebotekrankenpflege.de kostenlos?',
                a: 'Ja, die Jobsuche und Bewerbung ist für Bewerber vollständig kostenlos. Arbeitgeber können Stellenanzeigen zu attraktiven Konditionen schalten.'
              },
              {
                q: 'Welche Berufe werden auf dem Portal gelistet?',
                a: 'Wir listen Stellen in der Gesundheits- und Krankenpflege, Altenpflege, Intensivpflege, OP-Pflege, Anästhesie, Pädiatrie sowie verwandte Berufe wie Pflegehelfer, ATAs, OTAs und Hebammen.'
              },
              {
                q: 'Wie oft werden neue Stellenangebote veröffentlicht?',
                a: 'Unsere Stellenangebote werden täglich aktualisiert. Neue Vakanzen von Kliniken, Krankenhäusern und Pflegeeinrichtungen aus ganz Deutschland werden fortlaufend ergänzt.'
              },
              {
                q: 'Kann ich mich direkt über das Portal bewerben?',
                a: 'Ja, viele Stellenangebote bieten eine Direktbewerbung. Sie werden entweder direkt zum Arbeitgeber weitergeleitet oder können Ihre Unterlagen über unser Formular einreichen.'
              },
              {
                q: 'Welche Qualifikationen werden in der Krankenpflege benötigt?',
                a: 'Für die meisten Stellen wird eine abgeschlossene Ausbildung als Pflegefachmann/-frau (ehem. Gesundheits- und Krankenpfleger/in) benötigt. Für Hilfskraftstellen reicht oft ein Pflegebasiskurs.'
              },
              {
                q: 'Gibt es auch Stellen in Teilzeit oder im Nachtdienst?',
                a: 'Ja, wir listen Stellen in Vollzeit, Teilzeit sowie mit verschiedenen Schichtmodellen. Nutzen Sie die Filterfunktion, um passende Angebote zu finden.'
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-3">{item.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Karriere-Infos */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200">
          <h2 className="text-3xl font-black text-slate-900 font-clinical uppercase tracking-tight mb-4">
            Karriere in der <span className="text-cyan-600">Krankenpflege</span>
          </h2>
          <p className="text-slate-500 mb-10 max-w-3xl">
            Die Krankenpflege bietet vielfältige Karrieremöglichkeiten mit sicheren Zukunftsaussichten. Hier finden Sie wichtige Informationen rund um Ausbildung, Weiterbildung und Karrierewege.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <div className="bg-cyan-100 text-cyan-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Cross size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">Ausbildung</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Die generalistische Pflegeausbildung dauert 3 Jahre und qualifiziert für die Arbeit in Krankenhäusern, Pflegeheimen und ambulanten Diensten. Der Abschluss als Pflegefachmann/-frau ist EU-weit anerkannt.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <div className="bg-cyan-100 text-cyan-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FlaskConical size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">Fachweiterbildungen</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Nach der Ausbildung stehen zahlreiche Fachweiterbildungen offen: Intensivpflege, Anästhesie, OP-Pflege, Onkologie, Psychiatrie oder Palliativpflege. Diese erhöhen die Karrierechancen und das Gehalt deutlich.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-slate-200">
              <div className="bg-cyan-100 text-cyan-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Thermometer size={24} />
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">Gehalt & Perspektiven</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Das Einstiegsgehalt in der Krankenpflege liegt bei ca. 33.000-36.000 EUR brutto/Jahr. Mit Fachweiterbildung, Schichtzulagen und Berufserfahrung sind 45.000-55.000 EUR und mehr möglich. Leitungspositionen bieten weitere Aufstiegsmöglichkeiten.
              </p>
            </div>
          </div>
        </section>
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
