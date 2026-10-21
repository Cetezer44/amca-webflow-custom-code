// Consentement (Google Consent Mode v2 + Cookiebot) et Google Tag Manager.
// Origine : Site settings › Head code.
//
// Google Analytics (G-YNS9HSCPNT) et Google Ads (AW-17492061884) passent par un
// seul conteneur GTM (GTM-KGTJ8KVQ, export dans gtm/GTM-KGTJ8KVQ.json). Ne plus
// renseigner d'identifiant dans Webflow (Apps & integrations › Google tag) ni
// réinstaller l'app « Google Site Tools for Webflow » : doublons.
//
// Consent Mode v2 (21/10/2026) :
// 1. Avant GTM, consentement par défaut « refusé » pour la mesure et la publicité.
//    Les balises Google n'écrivent alors aucun cookie et n'envoient que des
//    signaux anonymes (modélisation).
// 2. Visiteur qui a déjà répondu : son choix est lu dans le cookie CookieConsent
//    et appliqué tout de suite, sans attendre Cookiebot.
// 3. Cookiebot (chargé 3 s après le load, pour la performance) affiche le bandeau ;
//    à chaque choix, ses événements mettent à jour le consentement Google.
// GTM est marqué data-cookieconsent="ignore" pour que le blocage automatique de
// Cookiebot ne l'empêche pas : c'est le Consent Mode qui pilote les balises Google.

const COOKIEBOT_ID = 'a9d19b87-8fea-42d4-a012-afcab91814f2';
const COOKIEBOT_DELAY = 3000; // ms après l'événement load
const GTM_ID = 'GTM-KGTJ8KVQ';

window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
window.gtag = window.gtag || gtag;

function onLoad(fn) {
  if (document.readyState === 'complete') fn();
  else window.addEventListener('load', fn, { once: true });
}

const toState = (granted) => (granted ? 'granted' : 'denied');

function consentFrom(stats, marketing) {
  return {
    analytics_storage: toState(stats),
    ad_storage: toState(marketing),
    ad_user_data: toState(marketing),
    ad_personalization: toState(marketing),
  };
}

// Choix déjà enregistré par Cookiebot (cookie CookieConsent), ou null.
function storedConsent() {
  const m = document.cookie.match(/(?:^|;\s*)CookieConsent=([^;]+)/);
  if (!m) return null;
  let v;
  try { v = decodeURIComponent(m[1]); } catch (e) { v = m[1]; }
  if (v === '-1') return consentFrom(true, true); // hors zone de consentement
  if (!/statistics:/.test(v)) return null;
  return consentFrom(/statistics:true/.test(v), /marketing:true/.test(v));
}

function setDefaultConsent() {
  gtag('consent', 'default', {
    ...consentFrom(false, false),
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  });
  gtag('set', 'ads_data_redaction', true);
  const stored = storedConsent();
  if (stored) gtag('consent', 'update', stored);
}

function updateFromCookiebot() {
  const c = window.Cookiebot && window.Cookiebot.consent;
  if (!c) return;
  gtag('consent', 'update', consentFrom(!!c.statistics, !!c.marketing));
}

function loadGtm() {
  if (window.google_tag_manager && window.google_tag_manager[GTM_ID]) return;
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const s = document.createElement('script');
  s.async = true;
  s.setAttribute('data-cookieconsent', 'ignore');
  s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
  document.head.appendChild(s);
}

function loadCookiebot() {
  ['CookiebotOnConsentReady', 'CookiebotOnAccept', 'CookiebotOnDecline'].forEach((ev) =>
    window.addEventListener(ev, updateFromCookiebot));
  const s = document.createElement('script');
  s.id = 'Cookiebot';
  s.src = 'https://consent.cookiebot.com/uc.js';
  s.setAttribute('data-cbid', COOKIEBOT_ID);
  s.setAttribute('data-blockingmode', 'auto');
  s.setAttribute('data-consentmode-defaults', 'disabled'); // défauts posés ci-dessus
  s.type = 'text/javascript';
  s.async = true;
  document.head.appendChild(s);
}

export default function consentTracking() {
  setDefaultConsent();
  loadGtm();
  onLoad(() => setTimeout(loadCookiebot, COOKIEBOT_DELAY));
}
