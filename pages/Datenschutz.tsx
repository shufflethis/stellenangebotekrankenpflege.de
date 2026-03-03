// HR-UPDATER: v1.0

import React from 'react';

const Datenschutz: React.FC = () => {
  return (
    <div className="bg-slate-50 py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10">Datenschutzerklärung</h1>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 space-y-8 text-slate-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Verantwortlicher</h2>
            <div className="space-y-1">
              <p className="font-semibold text-slate-700">Social Media Venture GmbH</p>
              <p>Vertreten durch: Thomas Sander</p>
              <p>Schliemannstraße 23, 10437 Berlin</p>
              <p>E-Mail: <a href="mailto:info@socialmediaventure.com" className="text-sky-600 hover:text-sky-700 underline">info@socialmediaventure.com</a></p>
              <p>Telefon: +49 30 403 6654 32</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Allgemeines zur Datenverarbeitung</h2>
            <p>
              Wir verarbeiten personenbezogene Daten unserer Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist. Die Verarbeitung personenbezogener Daten unserer Nutzer erfolgt regelmäßig nur nach Einwilligung des Nutzers. Eine Ausnahme gilt in solchen Fällen, in denen eine vorherige Einholung einer Einwilligung aus tatsächlichen Gründen nicht möglich ist und die Verarbeitung der Daten durch gesetzliche Vorschriften gestattet ist.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Datenerhebung auf unserer Website</h2>
            <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">Server-Log-Dateien</h3>
            <p className="mb-3">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse (anonymisiert)</li>
            </ul>
            <p>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1 lit. f DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen gestattet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Cookies</h2>
            <p className="mb-3">
              Unsere Website verwendet nur technisch notwendige Cookies. Diese dienen dazu, unser Angebot nutzerfreundlicher und sicherer zu machen. Technisch notwendige Cookies werden in der Regel beim Schließen des Browsers wieder gelöscht.
            </p>
            <p>
              Es werden keine Cookies für Tracking- oder Werbezwecke eingesetzt. Rechtsgrundlage für die Verwendung technisch notwendiger Cookies ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Kontaktformular</h2>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt, oder auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur Wahrung unserer berechtigten Interessen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Hosting</h2>
            <p>
              Diese Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA) gehostet. Vercel kann beim Zugriff auf die Website personenbezogene Daten in Server-Log-Dateien erheben (z.B. IP-Adresse, Datum und Uhrzeit des Abrufs, übertragene Datenmenge, anfragender Provider). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Es besteht ein Auftragsverarbeitungsvertrag mit Vercel. Die Datenübertragung in die USA wird auf Basis der EU-Standardvertragsklauseln abgesichert.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Webanalyse</h2>
            <p>
              Wir nutzen Plausible Analytics, einen datenschutzfreundlichen Webanalysedienst. Plausible speichert keine Cookies und erfasst keine personenbezogenen Daten. Es werden keine IP-Adressen gespeichert. Die erhobenen Daten (Seitenaufrufe, Verweisdauer, ungefährer Standort auf Länderebene) dienen ausschließlich der statistischen Auswertung und Verbesserung unseres Angebots. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Rechte der Betroffenen</h2>
            <p className="mb-3">Sie haben als betroffene Person folgende Rechte:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie können Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten verlangen.</li>
              <li><strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie können die Berichtigung unrichtiger oder die Vervollständigung Ihrer Daten verlangen.</li>
              <li><strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie können die Löschung Ihrer personenbezogenen Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</li>
              <li><strong>Recht auf Einschränkung (Art. 18 DSGVO):</strong> Sie können die Einschränkung der Verarbeitung Ihrer Daten verlangen.</li>
              <li><strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie können verlangen, Ihre Daten in einem strukturierten, gängigen Format zu erhalten.</li>
              <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung Ihrer Daten jederzeit widersprechen.</li>
              <li><strong>Beschwerderecht:</strong> Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Aktualität und Änderung dieser Datenschutzerklärung</h2>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig. Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Seite abgerufen werden.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Datenschutz;
