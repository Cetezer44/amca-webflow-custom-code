// Bandeau d’infos défilant (.bandeau-marquee-infos).
// Origine : Embed « embed-marquee » (accueil, /les-formations)
import { ready } from '../utils/ready.js';

export default function marquee() {
  ready(() => {
    const container = document.querySelector(".bandeau-marquee-infos");
    if (!container) return;

    // Récupère les items existants (enfants directs)
    const originalItems = Array.from(container.querySelectorAll(":scope > .marquee-text-bandeau-infos"));
    if (!originalItems.length) return;

    // Crée le rail et déplace les items dedans
    const track = document.createElement("div");
    track.className = "marquee-track";

    originalItems.forEach(el => track.appendChild(el)); // déplace (pas clone)

    // Duplique la liste complète 2× (total = 3 blocs → -33.333% dans @keyframes)
    for (let i = 0; i < 2; i++) {
      originalItems.forEach((el) => {
        const clone = el.cloneNode(true);
        clone.setAttribute("aria-hidden", "true"); // accessibilité : on masque les clones
        track.appendChild(clone);
      });
    }

    // Insère le rail dans le conteneur
    container.appendChild(track);

    // Optionnel : si le contenu est très court, accélérer/reduire la durée selon la largeur
    // (dé-commente si tu veux une durée dynamique)
    /*
    const resize = () => {
      const ratio = track.scrollWidth / window.innerWidth;
      const base = 40; // secondes
      track.style.animationDuration = Math.max(20, base * Math.min(ratio, 4)) + "s";
    };
    window.addEventListener("resize", resize);
    resize();
    */
  });
}
