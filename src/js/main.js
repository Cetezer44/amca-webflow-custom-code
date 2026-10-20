// Point d'entrée : dist/amca.min.js, chargé en `defer` dans le <head> par Webflow.
// Le code commun s'exécute sur toutes les pages ; le code propre à une page
// s'exécute seulement si l'identifiant Webflow de la page correspond.
import { PAGES as P, GROUPS as G } from '../pages.js';

import consentTracking from './site/consent-tracking.js';
import megaMenu from './site/mega-menu.js';
import megaMenuAccordions from './site/mega-menu-accordions.js';
import navScroll from './site/nav-scroll.js';
import faqAccordion from './site/faq-accordion.js';
import loaderEn from './site/loader-en.js';
import portesOuvertesFixe from './components/portes-ouvertes-fixe.js';
import lazyVideos from './site/lazy-videos.js';
import finsweetList from './site/finsweet-list.js';

import followMouseImages from './pages/follow-mouse-images.js';
import horizontalScroll from './pages/horizontal-scroll.js';
import campusVideo from './pages/campus-video.js';
import boldTitles from './pages/bold-titles.js';
import localeReload from './pages/locale-reload.js';
import heroSlider from './pages/hero-slider.js';
import marquee from './pages/marquee.js';
import featuredBlockFade from './pages/featured-block-fade.js';
import bts from './pages/bts.js';
import specialisationNav from './pages/specialisation-nav.js';
import flatpickrDates from './pages/flatpickr-dates.js';
import candidatureUploads from './pages/candidature-uploads.js';
import intervenantModal from './pages/intervenant-modal.js';

const page = document.documentElement.getAttribute('data-wf-page');
const on = (ids) => [].concat(ids).includes(page);

// Chaque module est isolé : une erreur dans l'un n'empêche pas les autres de tourner.
function run(name, fn, ...args) {
  try {
    fn(...args);
  } catch (err) {
    console.error('[AMCA] ' + name, err);
  }
}

// Toutes les pages
run('consentTracking', consentTracking);
run('megaMenu', megaMenu);
run('megaMenuAccordions', megaMenuAccordions);
run('navScroll', navScroll);
run('faqAccordion', faqAccordion);
run('loaderEn', loaderEn);
run('portesOuvertesFixe', portesOuvertesFixe);
run('lazyVideos', lazyVideos);
run('finsweetList', finsweetList);

// Accueil et /les-formations
if (on(G.accueilEtFormations)) {
  run('followMouseImages', followMouseImages);
  run('horizontalScroll', horizontalScroll);
  run('campusVideo', campusVideo);
  run('boldTitles', boldTitles);
  run('localeReload', localeReload);
  run('marquee', marquee);
  run('featuredBlockFade', featuredBlockFade);
}
if (on(G.heroSlider)) run('heroSlider', heroSlider);

// Spécialisations et section internationale
if (on(G.navSpecialisation)) run('specialisationNav', specialisationNav);
if (on(P.bts)) run('bts', bts);

// Formulaires
if (on(P.candidater)) {
  run('flatpickrDates', flatpickrDates);
  run('candidatureUploads', candidatureUploads);
}
if (on(P.relationEntreprise)) run('flatpickrDates', flatpickrDates, { minDate: 'today' });

// École
if (on(G.modalIntervenants)) run('intervenantModal', intervenantModal);
