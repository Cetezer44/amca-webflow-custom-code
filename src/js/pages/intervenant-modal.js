// Modales des intervenants (GSAP, chargé par Webflow).
// Origine : Embed « animation-modal » (/lecole/partenaires, /lecole/les-intervenants)
import { ready } from '../utils/ready.js';

export default function intervenantModal() {
  ready(() => {

    function buildModalTimeline(modal) {
      const box    = modal.querySelector(".container-modal");
      const close  = modal.querySelector(".close-modal");
      const topBlk = modal.querySelector(".top-intervenant-modal");
      const botBlk = modal.querySelector(".bot-intervenant-modal");

      gsap.set(modal, { autoAlpha: 0 });
      gsap.set(box,   { y: 20, scale: 0.98, autoAlpha: 0 });
      if (topBlk || botBlk) gsap.set([topBlk, botBlk].filter(Boolean), { y: 10, autoAlpha: 0 });

      const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });

      tl.add(() => {
          modal.style.display = "flex";
          document.body.style.overflow = "hidden"; // 🔒 empêche le scroll
        }, 0)
        .to(modal, { autoAlpha: 1, duration: 0.5 }, 0)
        .to(box,   { y: 0, scale: 1, autoAlpha: 1, duration: 0.5 }, 0.05);

      if (topBlk) tl.to(topBlk, { y: 0, autoAlpha: 1, duration: 0.4 }, 0.12);
      if (botBlk) tl.to(botBlk, { y: 0, autoAlpha: 1, duration: 0.4 }, 0.16);

      tl.eventCallback("onReverseComplete", () => {
        modal.style.display = "none";
        document.body.style.overflow = ""; // 🔓 réactive le scroll
        tl.pause(0);
      });

      modal._open  = () => tl.restart(true);
      modal._close = () => tl.reverse();

      if (close) close.addEventListener("click", modal._close);
      modal.addEventListener("click", (e) => {
        if (!box.contains(e.target)) modal._close();
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.display === "flex") modal._close();
      });

      return tl;
    }

    document.querySelectorAll(".w-dyn-item").forEach((item) => {
      const modal  = item.querySelector(".modal_intervenant");
      const button = item.querySelector(".button");

      if (modal && button) {
        buildModalTimeline(modal);
        button.addEventListener("click", (e) => {
          e.preventDefault();
          modal._open();
        });
      }
    });

  });
}
