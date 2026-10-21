// Cookiebot (chargé 3 s après le load de la page) et Google Tag Manager.
// Origine : Site settings › Head code.
//
// Depuis le 21/10/2026, Google Analytics (G-YNS9HSCPNT) et Google Ads
// (AW-17492061884) passent par un seul conteneur GTM (GTM-KGTJ8KVQ) :
//   - balise Google GA4 et balise Google Ads sur « Initialization - All Pages »,
//   - Conversion Linker sur « All Pages ».
// Export du conteneur : gtm/GTM-KGTJ8KVQ.json.
// Ne plus renseigner d'identifiant dans Webflow (Site settings › Apps & integrations
// › Google tag) et ne pas réinstaller l'app « Google Site Tools for Webflow » :
// les balises seraient chargées en double.
//
// GTM est chargé dès l'exécution de ce module (amca.min.js est en defer, donc après
// l'analyse du HTML) : les pages vues sont mesurées comme avant.

const COOKIEBOT_ID = 'a9d19b87-8fea-42d4-a012-afcab91814f2';
const COOKIEBOT_DELAY = 3000; // ms après l'événement load
const GTM_ID = 'GTM-KGTJ8KVQ';

function onLoad(fn) {
  if (document.readyState === 'complete') fn();
  else window.addEventListener('load', fn, { once: true });
}

function loadCookiebot() {
  const s = document.createElement('script');
  s.id = 'Cookiebot';
  s.src = 'https://consent.cookiebot.com/uc.js';
  s.setAttribute('data-cbid', COOKIEBOT_ID);
  s.setAttribute('data-blockingmode', 'auto');
  s.type = 'text/javascript';
  s.async = true;
  document.head.appendChild(s);
}

function loadGtm() {
  if (window.google_tag_manager && window.google_tag_manager[GTM_ID]) return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
  document.head.appendChild(s);
}

export default function consentTracking() {
  loadGtm();
  onLoad(() => setTimeout(loadCookiebot, COOKIEBOT_DELAY));
}
