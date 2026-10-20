// Cookiebot (chargé 3 s après le load de la page) et balise Google Ads (gtag).
// Origine : Site settings › Head code.
//
// Action 3.2 du plan Waisso :
// - Google Analytics (G-…) est déjà installé par Webflow (Site settings › Integrations),
//   avec sa propre bibliothèque gtag.js. Google Ads est ajouté à cette même bibliothèque
//   (gtag('config', 'AW-…')) au lieu d'en télécharger une 2ᵉ copie (~150 Ko).
// - Si gtag.js n'est pas présent (intégration GA retirée), il est chargé comme avant,
//   mais après le chargement de la page pour ne pas ralentir le premier affichage.

const COOKIEBOT_ID = 'a9d19b87-8fea-42d4-a012-afcab91814f2';
const COOKIEBOT_DELAY = 3000; // ms après l'événement load
const GOOGLE_ADS_ID = 'AW-17492061884';

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

function loadGtag() {
  const hasGtagLib = !!document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
  const alreadyInit = typeof window.gtag === 'function';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  if (!alreadyInit) window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ADS_ID);

  if (!hasGtagLib) {
    onLoad(() => {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_ADS_ID;
      document.head.appendChild(s);
    });
  }
}

export default function consentTracking() {
  loadGtag();
  onLoad(() => setTimeout(loadCookiebot, COOKIEBOT_DELAY));
}
