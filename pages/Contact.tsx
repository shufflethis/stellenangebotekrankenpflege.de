// HR-UPDATER: v1.0

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type Tab = 'employer' | 'applicant';
type ApplicantMode = 'direct' | 'initiative';
type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const Contact: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('employer');
  const [applicantMode, setApplicantMode] = useState<ApplicantMode>('direct');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Employer form state
  const [employer, setEmployer] = useState({
    firmenname: '',
    ansprechpartner: '',
    email: '',
    telefon: '',
    stellentitel: '',
    plz: '',
    stadt: '',
    beschreibung: '',
    arbeitszeit: '',
    website: '', // honeypot
  });

  // Applicant direct form state
  const [direct, setDirect] = useState({
    stellenReferenz: '',
    name: '',
    email: '',
    telefon: '',
    anschreiben: '',
    gehaltsvorstellung: '',
    starttermin: '',
    website: '', // honeypot
  });

  // Applicant initiative form state
  const [initiative, setInitiative] = useState({
    name: '',
    email: '',
    telefon: '',
    gewuenschterBeruf: '',
    region: '',
    kurzvorstellung: '',
    erfahrung: '',
    gehaltsvorstellung: '',
    website: '', // honeypot
  });

  const handleEmployerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEmployer({ ...employer, [e.target.name]: e.target.value });
  };

  const handleDirectChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDirect({ ...direct, [e.target.name]: e.target.value });
  };

  const handleInitiativeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setInitiative({ ...initiative, [e.target.name]: e.target.value });
  };

  const resetForms = () => {
    setEmployer({ firmenname: '', ansprechpartner: '', email: '', telefon: '', stellentitel: '', plz: '', stadt: '', beschreibung: '', arbeitszeit: '', website: '' });
    setDirect({ stellenReferenz: '', name: '', email: '', telefon: '', anschreiben: '', gehaltsvorstellung: '', starttermin: '', website: '' });
    setInitiative({ name: '', email: '', telefon: '', gewuenschterBeruf: '', region: '', kurzvorstellung: '', erfahrung: '', gehaltsvorstellung: '', website: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      let endpoint: string;
      const formData = new FormData();

      if (activeTab === 'employer') {
        if (employer.website) return;
        endpoint = `https://backend-geo-tool.vercel.app/api/employer-submit`;
        formData.append('domain', 'stellenangebotekrankenpflege.de');
        formData.append('niche', 'Krankenpflege');
        Object.entries(employer).forEach(([key, value]) => {
          if (key !== 'website' && value) formData.append(key, value);
        });
      } else {
        const data = applicantMode === 'direct' ? direct : initiative;
        if (data.website) return;
        endpoint = `https://backend-geo-tool.vercel.app/api/applicant-submit`;
        formData.append('domain', 'stellenangebotekrankenpflege.de');
        formData.append('niche', 'Krankenpflege');
        formData.append('mode', applicantMode);
        Object.entries(data).forEach(([key, value]) => {
          if (key !== 'website' && value) formData.append(key, value);
        });
      }

      const res = await fetch(endpoint, { method: 'POST', body: formData });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || 'Anfrage fehlgeschlagen. Bitte versuchen Sie es später erneut.');
      }

      setStatus('success');
      resetForms();
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Ein unerwarteter Fehler ist aufgetreten.');
    }
  };

  const btnClass = 'w-full font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-600 px-8 py-3.5 text-lg disabled:opacity-50';
  const inputClass = 'mt-1 block w-full border border-slate-300 rounded-lg shadow-sm py-2.5 px-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1';

  if (status === 'success') {
    return (
      <div className="bg-slate-50 min-h-screen py-16 md:py-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Vielen Dank!</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {activeTab === 'employer'
                ? 'Ihre Stellenanzeige wurde erfolgreich übermittelt. Wir melden uns in Kürze bei Ihnen.'
                : 'Ihre Bewerbung wurde erfolgreich gesendet. Wir setzen uns zeitnah mit Ihnen in Verbindung.'}
            </p>
            <button onClick={() => setStatus('idle')} className={btnClass}>
              Neue Anfrage stellen
            </button>
            <div className="mt-6">
              <Link to="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Zurück zur Startseite</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <Link to="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">&larr; Zurück zur Startseite</Link>
        </div>
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Kontakt</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Ob Sie als Arbeitgeber eine Stelle ausschreiben möchten oder sich als Fachkraft bewerben wollen – wir sind für Sie da.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex rounded-xl bg-slate-200 p-1 mb-8">
          <button
            type="button"
            onClick={() => { setActiveTab('employer'); setStatus('idle'); setErrorMsg(''); }}
            className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'employer'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Für Arbeitgeber
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('applicant'); setStatus('idle'); setErrorMsg(''); }}
            className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg transition-all duration-200 ${
              activeTab === 'applicant'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Für Bewerber
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
          {status === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700 font-medium">{errorMsg}</p>
            </div>
          )}

          {/* ============ EMPLOYER FORM ============ */}
          {activeTab === 'employer' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Stellenanzeige aufgeben</h2>
              <p className="text-slate-600 text-sm mb-6">Füllen Sie das Formular aus und wir veröffentlichen Ihre Stelle schnellstmöglich.</p>

              <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                <label htmlFor="emp-website">Website</label>
                <input type="text" id="emp-website" name="website" value={employer.website} onChange={handleEmployerChange} autoComplete="off" tabIndex={-1} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="emp-firmenname" className={labelClass}>Firmenname *</label>
                  <input id="emp-firmenname" name="firmenname" required value={employer.firmenname} onChange={handleEmployerChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="emp-ansprechpartner" className={labelClass}>Ansprechpartner *</label>
                  <input id="emp-ansprechpartner" name="ansprechpartner" required value={employer.ansprechpartner} onChange={handleEmployerChange} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="emp-email" className={labelClass}>E-Mail *</label>
                  <input id="emp-email" name="email" type="email" required value={employer.email} onChange={handleEmployerChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="emp-telefon" className={labelClass}>Telefon *</label>
                  <input id="emp-telefon" name="telefon" type="tel" required value={employer.telefon} onChange={handleEmployerChange} className={inputClass} />
                </div>
              </div>

              <div>
                <label htmlFor="emp-stellentitel" className={labelClass}>Stellentitel *</label>
                <input id="emp-stellentitel" name="stellentitel" required value={employer.stellentitel} onChange={handleEmployerChange} className={inputClass} placeholder="z.B. Krankenpflege (m/w/d)" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="emp-plz" className={labelClass}>PLZ *</label>
                  <input id="emp-plz" name="plz" required value={employer.plz} onChange={handleEmployerChange} className={inputClass} pattern="[0-9]{5}" maxLength={5} placeholder="z.B. 10115" />
                </div>
                <div>
                  <label htmlFor="emp-stadt" className={labelClass}>Stadt *</label>
                  <input id="emp-stadt" name="stadt" required value={employer.stadt} onChange={handleEmployerChange} className={inputClass} placeholder="z.B. Berlin" />
                </div>
              </div>

              <div>
                <label htmlFor="emp-arbeitszeit" className={labelClass}>Arbeitszeit</label>
                <select id="emp-arbeitszeit" name="arbeitszeit" value={employer.arbeitszeit} onChange={handleEmployerChange} className={inputClass}>
                  <option value="">Bitte wählen</option>
                  <option value="Vollzeit">Vollzeit</option>
                  <option value="Teilzeit">Teilzeit</option>
                  <option value="Minijob">Minijob</option>
                  <option value="Ausbildung">Ausbildung</option>
                </select>
              </div>

              <div>
                <label htmlFor="emp-beschreibung" className={labelClass}>Stellenbeschreibung</label>
                <textarea id="emp-beschreibung" name="beschreibung" rows={5} value={employer.beschreibung} onChange={handleEmployerChange} className={inputClass} placeholder="Beschreiben Sie die Stelle, Anforderungen und was Sie bieten..." />
              </div>

              <button type="submit" className={btnClass} disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Wird gesendet...
                  </span>
                ) : 'Stellenanzeige einreichen'}
              </button>
            </form>
          )}

          {/* ============ APPLICANT FORM ============ */}
          {activeTab === 'applicant' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Jetzt bewerben</h2>
              <p className="text-slate-600 text-sm mb-4">Wählen Sie aus, wie Sie sich bewerben möchten.</p>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <label className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  applicantMode === 'direct' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input type="radio" name="applicantMode" value="direct" checked={applicantMode === 'direct'} onChange={() => setApplicantMode('direct')} className="text-blue-600 focus:ring-blue-500" />
                  <div>
                    <span className="font-semibold text-slate-900 text-sm">Auf eine Stelle bewerben</span>
                    <p className="text-xs text-slate-500 mt-0.5">Direkte Bewerbung mit Stellen-Referenz</p>
                  </div>
                </label>
                <label className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  applicantMode === 'initiative' ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-slate-300'
                }`}>
                  <input type="radio" name="applicantMode" value="initiative" checked={applicantMode === 'initiative'} onChange={() => setApplicantMode('initiative')} className="text-blue-600 focus:ring-blue-500" />
                  <div>
                    <span className="font-semibold text-slate-900 text-sm">Initiativbewerbung</span>
                    <p className="text-xs text-slate-500 mt-0.5">Allgemeine Bewerbung ohne konkrete Stelle</p>
                  </div>
                </label>
              </div>

              {/* ---- Direct Application Form ---- */}
              {applicantMode === 'direct' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                    <label htmlFor="dir-website">Website</label>
                    <input type="text" id="dir-website" name="website" value={direct.website} onChange={handleDirectChange} autoComplete="off" tabIndex={-1} />
                  </div>

                  <div>
                    <label htmlFor="dir-stellenReferenz" className={labelClass}>Stellen-Referenz</label>
                    <input id="dir-stellenReferenz" name="stellenReferenz" value={direct.stellenReferenz} onChange={handleDirectChange} className={inputClass} placeholder="z.B. Job-ID oder Stellentitel" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="dir-name" className={labelClass}>Name *</label>
                      <input id="dir-name" name="name" required value={direct.name} onChange={handleDirectChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="dir-email" className={labelClass}>E-Mail *</label>
                      <input id="dir-email" name="email" type="email" required value={direct.email} onChange={handleDirectChange} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="dir-telefon" className={labelClass}>Telefon *</label>
                    <input id="dir-telefon" name="telefon" type="tel" required value={direct.telefon} onChange={handleDirectChange} className={inputClass} />
                  </div>

                  <div>
                    <label htmlFor="dir-anschreiben" className={labelClass}>Anschreiben</label>
                    <textarea id="dir-anschreiben" name="anschreiben" rows={5} value={direct.anschreiben} onChange={handleDirectChange} className={inputClass} placeholder="Warum interessiert Sie diese Stelle?" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="dir-gehaltsvorstellung" className={labelClass}>Gehaltsvorstellung</label>
                      <input id="dir-gehaltsvorstellung" name="gehaltsvorstellung" value={direct.gehaltsvorstellung} onChange={handleDirectChange} className={inputClass} placeholder="z.B. 45.000 € brutto/Jahr" />
                    </div>
                    <div>
                      <label htmlFor="dir-starttermin" className={labelClass}>Frühester Starttermin</label>
                      <input id="dir-starttermin" name="starttermin" value={direct.starttermin} onChange={handleDirectChange} className={inputClass} placeholder="z.B. 01.04.2026" />
                    </div>
                  </div>

                  <button type="submit" className={btnClass} disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        Wird gesendet...
                      </span>
                    ) : 'Bewerbung absenden'}
                  </button>
                </form>
              )}

              {/* ---- Initiative Application Form ---- */}
              {applicantMode === 'initiative' && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                    <label htmlFor="ini-website">Website</label>
                    <input type="text" id="ini-website" name="website" value={initiative.website} onChange={handleInitiativeChange} autoComplete="off" tabIndex={-1} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="ini-name" className={labelClass}>Name *</label>
                      <input id="ini-name" name="name" required value={initiative.name} onChange={handleInitiativeChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="ini-email" className={labelClass}>E-Mail *</label>
                      <input id="ini-email" name="email" type="email" required value={initiative.email} onChange={handleInitiativeChange} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="ini-telefon" className={labelClass}>Telefon *</label>
                      <input id="ini-telefon" name="telefon" type="tel" required value={initiative.telefon} onChange={handleInitiativeChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="ini-gewuenschterBeruf" className={labelClass}>Gewünschter Beruf *</label>
                      <input id="ini-gewuenschterBeruf" name="gewuenschterBeruf" required value={initiative.gewuenschterBeruf} onChange={handleInitiativeChange} className={inputClass} placeholder="z.B. Krankenpflege" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ini-region" className={labelClass}>Bevorzugte Region</label>
                    <input id="ini-region" name="region" value={initiative.region} onChange={handleInitiativeChange} className={inputClass} placeholder="z.B. Raum Berlin, bundesweit, etc." />
                  </div>

                  <div>
                    <label htmlFor="ini-kurzvorstellung" className={labelClass}>Kurzvorstellung</label>
                    <textarea id="ini-kurzvorstellung" name="kurzvorstellung" rows={5} value={initiative.kurzvorstellung} onChange={handleInitiativeChange} className={inputClass} placeholder="Erzählen Sie kurz von sich und Ihrer Erfahrung..." />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="ini-erfahrung" className={labelClass}>Berufserfahrung</label>
                      <select id="ini-erfahrung" name="erfahrung" value={initiative.erfahrung} onChange={handleInitiativeChange} className={inputClass}>
                        <option value="">Bitte wählen</option>
                        <option value="Berufseinsteiger">Berufseinsteiger</option>
                        <option value="1-3 Jahre">1–3 Jahre</option>
                        <option value="3-5 Jahre">3–5 Jahre</option>
                        <option value="5-10 Jahre">5–10 Jahre</option>
                        <option value="10+ Jahre">Über 10 Jahre</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="ini-gehaltsvorstellung" className={labelClass}>Gehaltsvorstellung</label>
                      <input id="ini-gehaltsvorstellung" name="gehaltsvorstellung" value={initiative.gehaltsvorstellung} onChange={handleInitiativeChange} className={inputClass} placeholder="z.B. 40.000 € brutto/Jahr" />
                    </div>
                  </div>

                  <button type="submit" className={btnClass} disabled={status === 'loading'}>
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                        Wird gesendet...
                      </span>
                    ) : 'Initiativbewerbung absenden'}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
