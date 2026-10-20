// Bloc « Portes ouvertes » fixe : apparition après 2,5 s, masqué quand il chevauche le footer.
// Origine : Composant « Portes Ouvertes Fixe » › embed anim-block-po
import { ready } from '../utils/ready.js';

export default function portesOuvertesFixe() {
    ready(function () {
      var el = document.querySelector(".featured_actu_block_portes_ouvertes_fixed");
      if (!el) return;
      setTimeout(function () {
        el.classList.add("is-visible");
      }, 2500);
    });

  ready(function () {
    const block = document.querySelector(".featured_actu_block_portes_ouvertes_fixed");
    const footer = document.querySelector(".footer");

    if (!block || !footer) return;

    function checkOverlap() {
      const blockRect = block.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();

      // Si le bas du bloc fixed chevauche le haut du footer
      if (blockRect.bottom >= footerRect.top) {
        block.style.opacity = "0";
        block.style.pointerEvents = "none";
        block.style.transition = "opacity 0.3s ease";
      } else {
        block.style.opacity = "1";
        block.style.pointerEvents = "auto";
        block.style.transition = "opacity 0.3s ease";
      }
    }

    // Vérifier au scroll
    window.addEventListener("scroll", checkOverlap, { passive: true });

    // Vérifier aussi au resize
    window.addEventListener("resize", checkOverlap, { passive: true });

    // Vérification initiale
    checkOverlap();
  });
}
