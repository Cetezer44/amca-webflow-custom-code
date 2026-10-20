// Images qui suivent la souris dans la section cursus.
// Origine : Accueil et /les-formations › Before </body> [Follow Images Mouse]
import { ready } from '../utils/ready.js';

export default function followMouseImages() {
  ready(function () {
    const section = document.querySelector(".section_cursus_home");
    const cmsItems = document.querySelectorAll(".mouse-image-item img");

    if (!section || cmsItems.length === 0) return;

    const images = Array.from(cmsItems).map(img => img.src);
    let currentIndex = 0;
    let lastX = 0, lastY = 0;
    let totalDistance = 0;
    let idleTimeout;
    let ghosts = [];
    let lastScrollY = window.scrollY;
    let mouseInside = false;
    let scrollImageActive = false; // ← verrou pour image de scroll

    function createGhostImage(src, x, y, isScroll = false) {
      const ghost = document.createElement("img");
      ghost.src = src;
      ghost.classList.add("floating-image");

      const rotation = (Math.random() * 20) - 10;
      const baseTransform = `translate(${x + 20}px, ${y + 20}px) rotate(${rotation}deg)`;

      ghost.style.transform = `${baseTransform} scale(0.95)`;
      ghost.style.opacity = "1";
      ghost.style.zIndex = "10";
      ghost.style.position = "fixed";
      ghost.style.left = "0";
      ghost.style.top = "0";
      ghost.style.pointerEvents = "none";
      ghost.style.transition = "opacity 0.3s ease, transform 0.5s ease-out";

      document.body.appendChild(ghost);
      ghosts.push(ghost);

      setTimeout(() => {
        ghost.style.transform = `${baseTransform} scale(1)`;
      }, 10);

      while (ghosts.length > 4) {
        const old = ghosts.shift();
        old.style.opacity = "0";
        setTimeout(() => old.remove(), 300);
      }

      const isLatest = (ghosts.length === 4);
      const duration = isLatest ? 2000 : 300;

      setTimeout(() => {
        ghost.style.opacity = "0";
        setTimeout(() => {
          ghost.remove();
          ghosts = ghosts.filter(g => g !== ghost);

          // 🔓 Libère le verrou si c'était une image scroll
          if (isScroll) scrollImageActive = false;
        }, 300);
      }, duration);
    }

    function resetIdleTimer() {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        ghosts.forEach(ghost => {
          ghost.style.opacity = "0";
          setTimeout(() => ghost.remove(), 300);
        });
        ghosts = [];
      }, 1000);
    }

    section.addEventListener("mousemove", function (e) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      totalDistance += Math.sqrt(dx * dx + dy * dy);
      lastX = e.clientX;
      lastY = e.clientY;

      resetIdleTimer();

      if (totalDistance > 100) {
        currentIndex = (currentIndex + 1) % images.length;
        createGhostImage(images[currentIndex], e.clientX, e.clientY);
        totalDistance = 0;
      }
    });

    section.addEventListener("mouseenter", (e) => {
      mouseInside = true;
      lastX = e.clientX;
      lastY = e.clientY;
      resetIdleTimer();
    });

    section.addEventListener("mouseleave", () => {
      mouseInside = false;
      clearTimeout(idleTimeout);
      ghosts.forEach(ghost => {
        ghost.style.opacity = "0";
        setTimeout(() => ghost.remove(), 300);
      });
      ghosts = [];
    });

    // 🆕 Scroll déclencheur avec verrou
    window.addEventListener("scroll", () => {
      if (!mouseInside || scrollImageActive) return;

      const scrollDelta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;

      if (scrollDelta > 5) {
        scrollImageActive = true;
        currentIndex = (currentIndex + 1) % images.length;
        createGhostImage(images[currentIndex], lastX, lastY, true);
        resetIdleTimer();
      }
    });
  });
}
