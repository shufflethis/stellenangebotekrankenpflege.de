/**
 * Universal Application Widget for HR Job Portals
 *
 * Standalone vanilla JS — no dependencies, uses existing Tailwind classes.
 * Loaded via <script> tag in every portal's index.html.
 *
 * Features:
 *   - Intercepts "Jetzt bewerben" buttons → opens modal with job title prefilled
 *   - Intercepts "Anmelden"/"Login"/"Kontakt" navbar links → opens modal
 *   - Replaces "Anmelden"/"Login" text with "Kontakt" via MutationObserver
 *   - 3-tab modal: Auf Stelle bewerben, Initiativbewerbung, Stelle ausschreiben
 *   - Submits to backend-geo-tool.vercel.app
 *   - Honeypot, file upload (10MB max), accessibility (focus trap, aria, ESC)
 */
(function () {
  'use strict';

  if (window.__applicationWidgetLoaded) return;
  window.__applicationWidgetLoaded = true;

  var API_BASE = 'https://backend-geo-tool.vercel.app/api';
  var MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  var domain = window.location.hostname;
  var niche = deriveNiche(domain);

  // ─── Niche derivation (mirrors backend config.js) ───
  function deriveNiche(d) {
    var name = d
      .replace(/\.(de|com|net)$/, '')
      .replace(/-?(stellenangebote|stellen|stellenanzeigen|stellenausschreibungen)/, '')
      .replace(/-/g, ' ')
      .trim();
    if (!name) return 'Jobs';
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // ─── Escape HTML ───
  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  // ─── State ───
  var modalEl = null;
  var activeTab = 'direct'; // direct | initiative | employer
  var prefillJobTitle = '';

  // ─── Navbar text replacement ───
  // Replaces "Anmelden" / "Login" with "Kontakt" in navigation areas.
  // Uses MutationObserver to catch React-rendered content.
  (function replaceNavbarText() {
    var targets = ['Anmelden', 'Login'];
    var replacement = 'Kontakt';

    function replaceInNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var trimmed = node.textContent.trim();
        for (var i = 0; i < targets.length; i++) {
          if (trimmed === targets[i]) {
            node.textContent = node.textContent.replace(targets[i], replacement);
            return true;
          }
        }
      }
      if (node.nodeType === Node.ELEMENT_NODE) {
        var children = node.childNodes;
        for (var j = 0; j < children.length; j++) {
          if (replaceInNode(children[j])) return true;
        }
      }
      return false;
    }

    function scanAll() {
      var found = false;
      var els = document.querySelectorAll('nav, header, [class*="nav"], [role="navigation"], [class*="Nav"]');
      for (var i = 0; i < els.length; i++) {
        if (replaceInNode(els[i])) found = true;
      }
      return found;
    }

    // Try immediately (in case DOM is already rendered)
    if (scanAll()) return;

    // Watch for React to render the navbar
    var observer = new MutationObserver(function (mutations, obs) {
      if (scanAll()) {
        obs.disconnect();
      }
    });

    // Start observing as soon as body exists
    function startObserving() {
      if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
      } else {
        document.addEventListener('DOMContentLoaded', function () {
          observer.observe(document.body, { childList: true, subtree: true });
        });
      }
    }
    startObserving();

    // Safety: also try on DOMContentLoaded and load events
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(scanAll, 100);
      setTimeout(scanAll, 500);
      setTimeout(scanAll, 1500);
    });
    window.addEventListener('load', function () {
      setTimeout(scanAll, 200);
    });
  })();

  // ─── Button interception (capture phase) ───
  document.addEventListener('click', function (e) {
    var target = e.target;
    // Walk up to find clickable element
    var clickable = target.closest ? target.closest('button, a, [role="button"]') : null;
    if (!clickable) {
      // Fallback for browsers without closest, or if text itself was clicked
      clickable = target;
      while (clickable && clickable !== document.body) {
        var tag = (clickable.tagName || '').toLowerCase();
        if (tag === 'button' || tag === 'a' || (clickable.getAttribute && clickable.getAttribute('role') === 'button')) break;
        clickable = clickable.parentElement;
      }
      if (!clickable || clickable === document.body) return;
    }

    var text = (clickable.textContent || '').trim();

    // "Jetzt bewerben" button
    if (/jetzt\s+bewerben/i.test(text)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();

      // Try to find job title from nearest card heading
      var card = clickable.closest('[class*="card"], [class*="Card"], article, li, [class*="job"], [class*="Job"]');
      if (!card) {
        // Try parent divs up to 5 levels
        card = clickable.parentElement;
        var depth = 0;
        while (card && depth < 5) {
          var heading = card.querySelector('h2, h3, h4');
          if (heading) break;
          card = card.parentElement;
          depth++;
        }
      }
      var jobTitle = '';
      if (card) {
        var heading = card.querySelector('h2, h3, h4, [class*="title"], [class*="Title"]');
        if (heading) jobTitle = heading.textContent.trim();
      }
      prefillJobTitle = jobTitle;
      activeTab = 'direct';
      openModal();
      return;
    }

    // "Kontakt" / "Anmelden" / "Login" / "Arbeitgeber-Login" / "Kontakt aufnehmen"
    if (/^(Kontakt|Anmelden|Login|Arbeitgeber.?Login|Kontakt aufnehmen)$/i.test(text)) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
      prefillJobTitle = '';
      activeTab = 'direct';
      openModal();
      return;
    }
  }, true); // capture phase — fires BEFORE React handlers

  // ─── Inject styles once ───
  function injectStyles() {
    if (document.getElementById('aw-styles')) return;
    var style = document.createElement('style');
    style.id = 'aw-styles';
    style.textContent = [
      '@keyframes awSlideIn { from { opacity:0; transform:translateY(20px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }',
      '#aw-overlay { position:fixed; top:0; left:0; right:0; bottom:0; z-index:99999; display:flex; align-items:center; justify-content:center; padding:1rem; background:rgba(0,0,0,0.5); backdrop-filter:blur(4px); -webkit-backdrop-filter:blur(4px); }',
      '#aw-modal { background:#fff; border-radius:1rem; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); width:100%; max-width:32rem; max-height:90vh; overflow-y:auto; position:relative; animation:awSlideIn .25s ease-out; }',
      '.aw-tab-bar { display:flex; border-bottom:1px solid #e5e7eb; padding:0 1.5rem; }',
      '.aw-tab { padding:0.625rem 1rem; font-size:0.8125rem; font-weight:500; border-bottom:2px solid transparent; margin-bottom:-1px; color:#6b7280; cursor:pointer; background:none; border-top:none; border-left:none; border-right:none; transition:color 0.15s, border-color 0.15s; white-space:nowrap; }',
      '.aw-tab:hover { color:#1e40af; }',
      '.aw-tab.active { color:#2563eb; border-bottom-color:#2563eb; }',
      '#aw-overlay input, #aw-overlay select, #aw-overlay textarea { display:block; width:100%; padding:0.5rem 0.75rem; border:1px solid #d1d5db; border-radius:0.5rem; font-size:0.875rem; font-family:inherit; transition:border-color 0.15s; box-sizing:border-box; background:#fff; color:#1f2937; }',
      '#aw-overlay input[type="file"] { padding:0.375rem 0.75rem; }',
      '#aw-overlay input:focus, #aw-overlay select:focus, #aw-overlay textarea:focus { outline:none; border-color:#2563eb; box-shadow:0 0 0 3px rgba(37,99,235,0.1); }',
      '#aw-overlay label { display:block; font-size:0.8125rem; font-weight:500; color:#374151; margin-bottom:0.25rem; }',
      '.aw-field { margin-bottom:0.875rem; }',
      '.aw-required::after { content:" *"; color:#ef4444; }',
      '.aw-close-btn { position:absolute; top:1rem; right:1rem; background:none; border:none; font-size:1.5rem; color:#9ca3af; cursor:pointer; padding:0.25rem 0.5rem; line-height:1; z-index:10; }',
      '.aw-close-btn:hover { color:#374151; }',
      '.aw-submit-btn { display:block; width:100%; padding:0.75rem 1.5rem; background:#2563eb; color:#fff; font-weight:600; font-size:0.875rem; border:none; border-radius:0.5rem; cursor:pointer; transition:background 0.15s; font-family:inherit; }',
      '.aw-submit-btn:hover { background:#1d4ed8; }',
      '.aw-submit-btn:disabled { opacity:0.6; cursor:not-allowed; }',
      '.aw-status { padding:0.75rem; border-radius:0.5rem; font-size:0.8125rem; margin-top:0.5rem; }',
      '.aw-status-success { background:#f0fdf4; color:#166534; border:1px solid #bbf7d0; }',
      '.aw-status-error { background:#fef2f2; color:#991b1b; border:1px solid #fecaca; }',
      '.aw-status-loading { background:#eff6ff; color:#1e40af; border:1px solid #bfdbfe; }',
    ].join('\n');
    (document.head || document.documentElement).appendChild(style);
  }

  // ─── Modal HTML builder ───
  function buildModal() {
    injectStyles();

    var overlay = document.createElement('div');
    overlay.id = 'aw-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Kontaktformular');

    overlay.innerHTML = '<div id="aw-modal">'
      + '<button class="aw-close-btn" id="aw-close" aria-label="Schliessen">&times;</button>'
      + '<div style="padding:1.5rem 1.5rem 0">'
      + '<h2 style="font-size:1.25rem;font-weight:700;color:#0f172a;margin:0 0 0.25rem">Kontakt aufnehmen</h2>'
      + '<p style="font-size:0.8125rem;color:#6b7280;margin:0 0 1rem">' + esc(domain) + '</p>'
      + '</div>'
      + '<div class="aw-tab-bar" id="aw-tabs">'
      + '<button data-tab="direct" class="aw-tab" type="button">Auf Stelle bewerben</button>'
      + '<button data-tab="initiative" class="aw-tab" type="button">Initiativbewerbung</button>'
      + '<button data-tab="employer" class="aw-tab" type="button">Stelle ausschreiben</button>'
      + '</div>'
      + '<form id="aw-form" style="padding:1.5rem" enctype="multipart/form-data" novalidate>'
      + '<div style="position:absolute;left:-9999px;top:-9999px" aria-hidden="true">'
      + '<label for="aw-website">Website</label>'
      + '<input type="text" id="aw-website" name="website" tabindex="-1" autocomplete="off">'
      + '</div>'
      + '<div id="aw-fields"></div>'
      + '<div id="aw-status" style="display:none"></div>'
      + '<button type="submit" id="aw-submit" class="aw-submit-btn">Absenden</button>'
      + '</form>'
      + '</div>';

    return overlay;
  }

  // ─── Field definitions per tab ───
  function getFields(tab) {
    if (tab === 'direct') {
      return [
        { name: 'stellenReferenz', label: 'Stelle / Referenz', type: 'text', value: prefillJobTitle, required: true },
        { name: 'name', label: 'Vollständiger Name', type: 'text', required: true },
        { name: 'email', label: 'E-Mail-Adresse', type: 'email', required: true },
        { name: 'telefon', label: 'Telefon', type: 'tel' },
        { name: 'anschreiben', label: 'Anschreiben / Nachricht', type: 'textarea', placeholder: 'Warum bewerben Sie sich auf diese Stelle?' },
        { name: 'gehaltsvorstellung', label: 'Gehaltsvorstellung (brutto/Jahr)', type: 'text', placeholder: 'z.B. 45.000 - 55.000 EUR' },
        { name: 'starttermin', label: 'Frühester Starttermin', type: 'date' },
        { name: 'lebenslauf', label: 'Lebenslauf hochladen (PDF, max. 10MB)', type: 'file', accept: '.pdf,.doc,.docx' },
      ];
    }

    if (tab === 'initiative') {
      return [
        { name: 'name', label: 'Vollständiger Name', type: 'text', required: true },
        { name: 'email', label: 'E-Mail-Adresse', type: 'email', required: true },
        { name: 'telefon', label: 'Telefon', type: 'tel' },
        { name: 'gewuenschterBeruf', label: 'Gewünschter Beruf / Bereich', type: 'text', value: niche, required: true },
        { name: 'region', label: 'Bevorzugte Region', type: 'text', placeholder: 'z.B. Bayern, Berlin, NRW' },
        { name: 'kurzvorstellung', label: 'Kurzvorstellung', type: 'textarea', placeholder: 'Stellen Sie sich kurz vor...' },
        { name: 'erfahrung', label: 'Berufserfahrung', type: 'select', options: [
          { value: '', label: 'Bitte wählen...' },
          { value: 'keine', label: 'Keine / Berufseinsteiger' },
          { value: '1-2', label: '1-2 Jahre' },
          { value: '3-5', label: '3-5 Jahre' },
          { value: '5-10', label: '5-10 Jahre' },
          { value: '10+', label: 'Über 10 Jahre' },
        ]},
        { name: 'gehaltsvorstellung', label: 'Gehaltsvorstellung (brutto/Jahr)', type: 'text', placeholder: 'z.B. 45.000 - 55.000 EUR' },
        { name: 'lebenslauf', label: 'Lebenslauf hochladen (PDF, max. 10MB)', type: 'file', accept: '.pdf,.doc,.docx' },
      ];
    }

    // employer
    return [
      { name: 'firmenname', label: 'Firmenname', type: 'text', required: true },
      { name: 'ansprechpartner', label: 'Ansprechpartner', type: 'text', required: true },
      { name: 'email', label: 'E-Mail-Adresse', type: 'email', required: true },
      { name: 'telefon', label: 'Telefon', type: 'tel' },
      { name: 'jobtitel', label: 'Stellentitel', type: 'text', required: true, placeholder: 'z.B. Elektroniker (m/w/d)' },
      { name: 'beschreibung', label: 'Stellenbeschreibung', type: 'textarea', placeholder: 'Beschreiben Sie die zu besetzende Stelle...' },
      { name: 'plz', label: 'PLZ', type: 'text', placeholder: 'z.B. 10115' },
      { name: 'stadt', label: 'Stadt', type: 'text' },
      { name: 'arbeitszeit', label: 'Arbeitszeit', type: 'select', options: [
        { value: '', label: 'Bitte wählen...' },
        { value: 'vollzeit', label: 'Vollzeit' },
        { value: 'teilzeit', label: 'Teilzeit' },
        { value: 'minijob', label: 'Minijob' },
        { value: 'ausbildung', label: 'Ausbildung' },
        { value: 'praktikum', label: 'Praktikum' },
        { value: 'freelance', label: 'Freelance' },
      ]},
      { name: 'stellenanzeige', label: 'Stellenanzeige hochladen (PDF, max. 10MB)', type: 'file', accept: '.pdf,.doc,.docx' },
    ];
  }

  // ─── Render fields into container ───
  function renderFields(tab) {
    var container = document.getElementById('aw-fields');
    if (!container) return;

    var fields = getFields(tab);
    var html = '';

    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      var reqClass = f.required ? ' aw-required' : '';
      var id = 'aw-f-' + f.name;
      var val = f.value || '';
      var ph = f.placeholder || '';

      if (f.type === 'textarea') {
        html += '<div class="aw-field"><label for="' + id + '" class="' + reqClass + '">' + esc(f.label) + '</label>'
          + '<textarea id="' + id + '" name="' + f.name + '" rows="3" placeholder="' + esc(ph) + '"'
          + (f.required ? ' required' : '') + '>' + esc(val) + '</textarea></div>';
      } else if (f.type === 'select') {
        var opts = '';
        var options = f.options || [];
        for (var j = 0; j < options.length; j++) {
          opts += '<option value="' + esc(options[j].value) + '">' + esc(options[j].label) + '</option>';
        }
        html += '<div class="aw-field"><label for="' + id + '" class="' + reqClass + '">' + esc(f.label) + '</label>'
          + '<select id="' + id + '" name="' + f.name + '"' + (f.required ? ' required' : '') + '>' + opts + '</select></div>';
      } else if (f.type === 'file') {
        html += '<div class="aw-field"><label for="' + id + '" class="' + reqClass + '">' + esc(f.label) + '</label>'
          + '<input id="' + id + '" name="' + f.name + '" type="file" accept="' + (f.accept || '') + '"'
          + (f.required ? ' required' : '') + '></div>';
      } else {
        html += '<div class="aw-field"><label for="' + id + '" class="' + reqClass + '">' + esc(f.label) + '</label>'
          + '<input id="' + id + '" name="' + f.name + '" type="' + f.type + '" value="' + esc(val) + '"'
          + ' placeholder="' + esc(ph) + '"' + (f.required ? ' required' : '') + '></div>';
      }
    }

    container.innerHTML = html;
  }

  // ─── Tab switching ───
  function setActiveTab(tab) {
    activeTab = tab;
    var tabs = document.querySelectorAll('.aw-tab');
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].getAttribute('data-tab') === tab) {
        tabs[i].classList.add('active');
      } else {
        tabs[i].classList.remove('active');
      }
    }
    renderFields(tab);

    // Update submit button text
    var btn = document.getElementById('aw-submit');
    if (btn) {
      if (tab === 'employer') {
        btn.textContent = 'Stelle einreichen';
      } else if (tab === 'initiative') {
        btn.textContent = 'Initiativbewerbung absenden';
      } else {
        btn.textContent = 'Bewerbung absenden';
      }
    }

    // Clear status
    var status = document.getElementById('aw-status');
    if (status) {
      status.style.display = 'none';
      status.innerHTML = '';
    }
  }

  // ─── Open modal ───
  function openModal() {
    if (modalEl) closeModal();

    modalEl = buildModal();
    document.body.appendChild(modalEl);

    // Tab click handlers
    var tabBtns = modalEl.querySelectorAll('.aw-tab');
    for (var i = 0; i < tabBtns.length; i++) {
      (function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          setActiveTab(btn.getAttribute('data-tab'));
        });
      })(tabBtns[i]);
    }

    // Close button
    document.getElementById('aw-close').addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });

    // Backdrop click
    modalEl.addEventListener('click', function (e) {
      if (e.target === modalEl) closeModal();
    });

    // ESC key
    document.addEventListener('keydown', handleEsc);

    // Form submit
    document.getElementById('aw-form').addEventListener('submit', handleSubmit);

    // Set active tab and render fields
    setActiveTab(activeTab);

    // Focus first input after render
    setTimeout(function () {
      if (!modalEl) return;
      var firstInput = modalEl.querySelector('#aw-fields input, #aw-fields select, #aw-fields textarea');
      if (firstInput) firstInput.focus();
    }, 50);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  // ─── Close modal ───
  function closeModal() {
    if (!modalEl) return;
    if (modalEl.parentNode) modalEl.parentNode.removeChild(modalEl);
    modalEl = null;
    document.removeEventListener('keydown', handleEsc);
    document.body.style.overflow = '';
  }

  function handleEsc(e) {
    if (e.key === 'Escape') closeModal();
  }

  // ─── Focus trap ───
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || !modalEl) return;

    var focusable = modalEl.querySelectorAll('button:not([tabindex="-1"]), input:not([tabindex="-1"]), select, textarea');
    if (focusable.length === 0) return;

    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // ─── Form submission ───
  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    var form = document.getElementById('aw-form');
    var statusEl = document.getElementById('aw-status');
    var submitBtn = document.getElementById('aw-submit');

    // Honeypot check
    var honeypot = form.querySelector('[name="website"]');
    if (honeypot && honeypot.value) {
      showStatus(statusEl, 'success', 'Vielen Dank! Ihre Anfrage wurde gesendet.');
      return;
    }

    // Client-side validation
    var requiredFields = form.querySelectorAll('[required]');
    for (var i = 0; i < requiredFields.length; i++) {
      if (!requiredFields[i].value || !requiredFields[i].value.trim()) {
        requiredFields[i].focus();
        requiredFields[i].style.borderColor = '#ef4444';
        setTimeout(function () { requiredFields[i].style.borderColor = ''; }, 2000);
        showStatus(statusEl, 'error', 'Bitte füllen Sie alle Pflichtfelder (*) aus.');
        return;
      }
    }

    // Email validation
    var emailField = form.querySelector('[name="email"]');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.focus();
      showStatus(statusEl, 'error', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      return;
    }

    // File size check
    var fileInputs = form.querySelectorAll('input[type="file"]');
    for (var j = 0; j < fileInputs.length; j++) {
      var files = fileInputs[j].files;
      if (files && files.length > 0) {
        if (files[0].size > MAX_FILE_SIZE) {
          showStatus(statusEl, 'error', 'Die Datei "' + files[0].name + '" ist zu groß (' + Math.round(files[0].size / 1024 / 1024) + 'MB). Maximal 10MB erlaubt.');
          return;
        }
      }
    }

    // Build FormData
    var fd = new FormData(form);
    fd.append('domain', domain);
    fd.append('niche', niche);

    if (activeTab === 'employer') {
      fd.append('source', 'widget');
    } else {
      fd.append('mode', activeTab); // direct or initiative
    }

    // Determine endpoint
    var endpoint = activeTab === 'employer'
      ? API_BASE + '/employer-submit'
      : API_BASE + '/applicant-submit';

    // Show loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Wird gesendet...';
    showStatus(statusEl, 'loading', 'Ihre Daten werden übermittelt...');

    fetch(endpoint, {
      method: 'POST',
      body: fd,
    })
    .then(function (res) {
      if (!res.ok) {
        return res.text().then(function (t) {
          throw new Error('Server-Fehler (' + res.status + '): ' + (t || 'Unbekannt'));
        });
      }
      return res.json();
    })
    .then(function () {
      var msg = activeTab === 'employer'
        ? 'Vielen Dank! Ihre Stellenanzeige wurde erfolgreich eingereicht. Wir melden uns in Kürze.'
        : 'Vielen Dank für Ihre Bewerbung! Wir leiten sie umgehend weiter.';
      showStatus(statusEl, 'success', msg);
      submitBtn.style.display = 'none';

      // Auto-close after 3 seconds
      setTimeout(closeModal, 3000);
    })
    .catch(function (err) {
      showStatus(statusEl, 'error', 'Fehler beim Senden: ' + err.message);
      submitBtn.disabled = false;
      if (activeTab === 'employer') {
        submitBtn.textContent = 'Stelle einreichen';
      } else if (activeTab === 'initiative') {
        submitBtn.textContent = 'Initiativbewerbung absenden';
      } else {
        submitBtn.textContent = 'Bewerbung absenden';
      }
    });
  }

  // ─── Status display ───
  function showStatus(el, type, msg) {
    if (!el) return;
    el.style.display = 'block';
    el.className = 'aw-status aw-status-' + type;
    el.textContent = msg;
  }

})();
