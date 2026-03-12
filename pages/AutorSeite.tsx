// HR-UPDATER: v1.0

import React from 'react';

const AutorSeite: React.FC = () => {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Thomas Sander',
        url: 'https://stellenangebotekrankenpflege.de/autor/thomas-sander',
        jobTitle: 'Gründer & Geschäftsführer',
        worksFor: {
          '@type': 'Organization',
          name: 'Social Media Venture GmbH',
          url: 'https://stellenangebotekrankenpflege.de',
        },
        description: 'HR-Tech-Experte und Gründer spezialisierter Jobportale für Fachkräfte in Deutschland.',
        knowsAbout: ['HR-Tech', 'Recruiting', 'Jobportale', 'Krankenpflege', 'Personalwesen'],
        sameAs: ['https://de.linkedin.com/in/thomas-sander-520676303'],
      }) }} />

      <div className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

            {/* Hero Section */}
            <div className="bg-gradient-to-br from-sky-800 to-slate-900 p-8 md:p-12">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {/* Photo Placeholder */}
                <div className="flex-shrink-0 w-28 h-28 rounded-full bg-sky-700 flex items-center justify-center text-white text-3xl font-bold ring-4 ring-sky-600/30">
                  TS
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Thomas Sander</h1>
                  <p className="text-sky-200 text-lg font-medium mb-3">Gründer & Geschäftsführer</p>
                  <p className="text-sky-100/80 text-sm">Social Media Venture GmbH</p>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12 space-y-10">
              {/* Bio Section */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Über Thomas Sander</h2>
                <div className="text-slate-600 leading-relaxed space-y-4">
                  <p>
                    Thomas Sander ist ein erfahrener Unternehmer im Bereich HR-Tech und digitales Recruiting. Als Gründer und Geschäftsführer der Social Media Venture GmbH hat er eine Vielzahl spezialisierter Jobportale aufgebaut, die Fachkräfte und Arbeitgeber in verschiedenen Branchen gezielt zusammenbringen.
                  </p>
                  <p>
                    Mit seiner langjährigen Erfahrung im Personalwesen erkannte er früh, dass generische Jobbörsen den spezifischen Anforderungen einzelner Branchen oft nicht gerecht werden. Seine Vision: Für jede Branche ein maßgeschneidertes Portal, das sowohl Arbeitgebern als auch Bewerbern den bestmöglichen Service bietet.
                  </p>
                  <p>
                    Unter seiner Leitung ist stellenangebotekrankenpflege.de zu einer führenden Anlaufstelle für Krankenpflege-Stellenangebote in Deutschland, Österreich und der Schweiz geworden.
                  </p>
                </div>
              </section>

              {/* Schwerpunkte & Expertise */}
              <section>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Schwerpunkte & Expertise</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'HR-Tech & Recruiting', desc: 'Entwicklung digitaler Lösungen für modernes Personalmanagement' },
                    { title: 'Spezialisierte Jobportale', desc: 'Aufbau und Betrieb branchenspezifischer Stellenplattformen' },
                    { title: 'Arbeitsmarktanalyse', desc: 'Tiefgehendes Verständnis des deutschen Fachkräftemarkts' },
                    { title: 'Krankenpflege-Branche', desc: 'Branchenspezifisches Know-how und Netzwerk im Krankenpflege-Bereich' },
                    { title: 'Content & SEO', desc: 'Strategische Inhalte für maximale Reichweite und Sichtbarkeit' },
                    { title: 'Digitale Transformation', desc: 'Begleitung von Unternehmen auf dem Weg zur digitalen Personalstrategie' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contact Section */}
              <section className="bg-slate-50 rounded-xl p-6 border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Kontakt</h2>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-sky-700" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">E-Mail</p>
                      <a href="mailto:info@socialmediaventure.com" className="text-sky-600 hover:text-sky-700 font-medium text-sm">info@socialmediaventure.com</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-sky-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">LinkedIn</p>
                      <a href="https://de.linkedin.com/in/thomas-sander-520676303" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-sky-700 font-medium text-sm">LinkedIn-Profil</a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutorSeite;
