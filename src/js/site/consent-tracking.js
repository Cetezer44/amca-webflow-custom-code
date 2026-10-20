// Cookiebot (chargé 3 s après le load de la page) et balise Google Ads (gtag).
// Origine : Site settings › Head code.
//
// Action 3.2 du plan Waisso : la bibliothèque Google Ads (gtag.js?id=AW-…) est
// téléchargée après l'événement load, pour ne pas ralentir le premier affichage.
// La commande config est mise en file tout de suite : rien n'est perdu.
// Testé : ajouter AW au gtag.js de Google Analytics (installé par Webflow) ne suffit
// pas, le conteneur Google Ads n'est alors pas chargé. On garde donc sa bibliothèque.

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
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GOOGLE_ADS_ID);

  onLoad(() => {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GOOGLE_ADS_ID;
    document.head.appendChild(s);
  });
}

export default function consentTracking() {
  loadGtag();
  onLoad(() => setTimeout(loadCookiebot, COOKIEBOT_DELAY));
}
