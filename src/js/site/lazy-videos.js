// Chargement différé des vidéos (action 3.1 du plan Waisso).
//
// Dans Webflow, les embeds vidéo n'ont plus de `src` ni d'`autoplay` : le navigateur
// n'affiche que l'image d'affiche (poster) et ne télécharge rien au chargement.
// Ce module met la source en place au bon moment :
//
//   <video muted loop playsinline preload="none" poster="…-poster.webp"
//          data-amca-src="…-1080.mp4"          vidéo pour ordinateur
//          data-amca-src-mobile="…-720.mp4"    vidéo pour mobile / connexion lente
//          data-amca-autoplay                   lecture automatique (muette)
//          data-amca-load="visible|idle">       quand charger (défaut : visible)
//
// - visible : quand la vidéo approche de l'écran ; elle se met en pause en le quittant.
// - idle    : après le chargement complet de la page (vidéo de bandeau, en haut).
// Une vidéo masquée (display: none) n'est jamais chargée.
// Avec « réduire les animations » activé dans le système, pas de lecture automatique.
import { ready } from '../utils/ready.js';

const MOBILE = '(max-width: 991px)';
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function slowConnection() {
  const c = navigator.connection;
  return !!(c && (c.saveData || /(^|-)2g|3g/.test(c.effectiveType || '')));
}

function isDisplayed(video) {
  return video.offsetParent !== null || video.getClientRects().length > 0;
}

// Met la source en place (une seule fois). Exportée pour la lecture au clic.
export function loadVideo(video) {
  if (video.dataset.amcaLoaded) return;
  const mobile = window.matchMedia(MOBILE).matches || slowConnection();
  const src = (mobile && video.dataset.amcaSrcMobile) || video.dataset.amcaSrc;
  if (!src) return;
  video.dataset.amcaLoaded = '1';
  video.preload = 'auto';
  video.src = src;
  video.load();
}

function play(video) {
  if (!video.dataset.amcaLoaded) loadVideo(video);
  const p = video.play();
  if (p && p.catch) p.catch(() => {}); // lecture refusée (économie d'énergie iOS…) : le poster reste affiché
}

function autoplay(video) {
  return video.hasAttribute('data-amca-autoplay') && !reduceMotion();
}

export default function lazyVideos() {
  ready(() => {
    const videos = [...document.querySelectorAll('video[data-amca-src]')];
    if (!videos.length) return;

    // Vidéos à charger quand elles approchent de l'écran
    const observer = 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
          entries.forEach(({ target, isIntersecting }) => {
            // Vidéo « idle » pas encore chargée : on attend la fin du chargement de la page
            if (target.dataset.amcaLoad === 'idle' && !target.dataset.amcaLoaded) return;
            if (isIntersecting) {
              loadVideo(target);
              if (autoplay(target)) play(target);
            } else if (!target.paused) {
              target.pause();
            }
          });
        }, { rootMargin: '200px 0px' })
      : null;

    videos.forEach((video) => {
      if ((video.dataset.amcaLoad || 'visible') === 'idle') {
        const start = () => {
          if (!isDisplayed(video)) return;
          loadVideo(video);
          if (autoplay(video)) play(video);
        };
        const idle = () => ('requestIdleCallback' in window
          ? requestIdleCallback(start, { timeout: 2000 })
          : setTimeout(start, 200));
        if (document.readyState === 'complete') idle();
        else window.addEventListener('load', idle, { once: true });
      }
      if (observer) observer.observe(video);
      else { loadVideo(video); if (autoplay(video)) play(video); }
    });
  });
}

export { play as playVideo };
