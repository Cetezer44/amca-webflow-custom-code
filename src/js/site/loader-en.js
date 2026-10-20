// Masque le loader sur l'accueil anglais.
// Origine : Site settings › Footer code (dernier script)
import { ready } from '../utils/ready.js';

export default function loaderEn() {
  ready(() => {
    const loader = document.querySelector(".loader");

    // ✅ Vérifie si on est sur la page d'accueil EN (et uniquement celle-ci)
    const path = window.location.pathname;
    const isEnglishHome = path === "/en" || path === "/en/";

    if (loader && isEnglishHome) {
      loader.style.display = "none";
    }

    // ✅ Si changement de langue vers l'anglais, on masque aussi le loader
    document.addEventListener("webflow:locale:change", (event) => {
      if (event.detail?.locale === "en" && isEnglishHome && loader) {
        loader.style.display = "none";
      }
    });
  });
}
