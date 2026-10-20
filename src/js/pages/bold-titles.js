// Met en gras les segments *entre astérisques* des titres d’actualité.
// Origine : Accueil et /les-formations › Before </body>
import { ready } from '../utils/ready.js';

export default function boldTitles() {
  ready(function () {
    document.querySelectorAll(".title-featured-actu").forEach((el) => {
      if (el.dataset.boldified === "1") return;
      el.dataset.boldified = "1";

      // Récupère le texte pur (les * inclus)
      const raw = el.textContent || "";
      const parts = raw.split("*");
      if (parts.length < 3) return; // pas de paire *...*

      // Vérifie la graisse actuelle pour créer un contraste si nécessaire
      const currentWeight = parseInt(getComputedStyle(el).fontWeight, 10);
      const needsContrast = !isNaN(currentWeight) && currentWeight >= 600;
      if (needsContrast) {
        el.classList.add("tf-base-normal"); // ramène le titre à 400
      }

      // Reconstruit le contenu : texte normal / segment bold alternés
      const frag = document.createDocumentFragment();
      let makeBold = false;
      for (let i = 0; i < parts.length; i++) {
        const segment = parts[i];
        if (segment) {
          if (makeBold) {
            const s = document.createElement("span");
            s.className = "bolded-actu";
            s.textContent = segment;
            frag.appendChild(s);
          } else {
            frag.appendChild(document.createTextNode(segment));
          }
        }
        // Chaque séparation provenait d'un astérisque
        if (i < parts.length - 1) makeBold = !makeBold;
      }

      // Remplace le contenu (les * disparaissent, c’est attendu)
      el.innerHTML = "";
      el.appendChild(frag);
    });
  });
}
