// Apparition différée du bloc actualité formations.
// Origine : Embed « anim-block-formations » (accueil, /les-formations)
import { ready } from '../utils/ready.js';

export default function featuredBlockFade() {
    ready(function () {
      var el = document.querySelector(".featured_actu_block_formations");
      if (!el) return;
      setTimeout(function () {
        el.classList.add("is-visible");
      }, 3000);
    });
}
