// Accordéons FAQ (.faq-item) animés avec GSAP (chargé par Webflow).
// Origine : Site settings › Footer code [Accordeon Footer]
import { ready } from '../utils/ready.js';

export default function faqAccordion() {
    ready(() => {
      gsap.registerPlugin(ScrollTrigger);

      const faqItems = document.querySelectorAll(".faq-item");

      faqItems.forEach(faq => {
        const cta = faq.querySelector(".cta-faq-item");
        const content = faq.querySelector(".bottom-faq-item");

        // Initialisation : cacher tout en JS
        gsap.set(content, {
          height: 0,
          opacity: 0,
          overflow: "hidden",
          pointerEvents: "none"
        });

        faq.dataset.open = "false";

        cta.addEventListener("click", () => {
          const isOpen = faq.dataset.open === "true";

          if (isOpen) {
            // Fermer l'item cliqué si déjà ouvert
            closeItem(faq);
          } else {
            // Fermer tous les autres
            faqItems.forEach(other => {
              if (other !== faq && other.dataset.open === "true") {
                closeItem(other);
              }
            });

            // Ouvrir celui cliqué
            openItem(faq);
          }
        });
      });

      function openItem(faq) {
        const content = faq.querySelector(".bottom-faq-item");
        const autoHeight = content.scrollHeight;

        gsap.to(content, {
          height: autoHeight,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onStart: () => {
            content.style.pointerEvents = "auto";
            faq.dataset.open = "true";
          }
        });
      }

      function closeItem(faq) {
        const content = faq.querySelector(".bottom-faq-item");

        gsap.to(content, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            content.style.pointerEvents = "none";
            faq.dataset.open = "false";
          }
        });
      }
    });
}
