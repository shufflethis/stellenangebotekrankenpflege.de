// HR-UPDATER: v1.0

import React from 'react';

const Impressum: React.FC = () => {
  return (
    <div className="bg-slate-50 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">Impressum</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Angaben gemäß § 5 TMG</h2>
            <div className="text-slate-700 leading-relaxed space-y-1">
              <p className="font-semibold">Social Media Venture GmbH</p>
              <p>Schliemannstraße 23</p>
              <p>10437 Berlin</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Handelsregister</h2>
            <div className="text-slate-700 leading-relaxed space-y-1">
              <p>Handelsregister: 162557 B</p>
              <p>Registergericht: Amtsgericht Berlin-Charlottenburg</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Vertreten durch</h2>
            <p className="text-slate-700">Thomas Sander</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Kontakt</h2>
            <div className="text-slate-700 leading-relaxed space-y-1">
              <p>Telefon: <a href="tel:+493040366543" className="text-sky-600 hover:text-sky-700 underline">+49 30 403 6654 32</a></p>
              <p>E-Mail: <a href="mailto:info@socialmediaventure.com" className="text-sky-600 hover:text-sky-700 underline">info@socialmediaventure.com</a></p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Umsatzsteuer-ID</h2>
            <p className="text-slate-700">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE298885799</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
            <p className="text-slate-600 leading-relaxed">
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
            <div className="text-slate-700 leading-relaxed space-y-1">
              <p>Thomas Sander</p>
              <p>Social Media Venture GmbH</p>
              <p>Schliemannstraße 23, 10437 Berlin</p>
            </div>
          </section>

          <hr className="border-slate-200" />

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Haftungsausschluss</h2>

            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">Haftung für Inhalte</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">Haftung für Links</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            </p>

            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">Urheberrecht</h3>
            <p className="text-slate-600 leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
