// Scroll horizontal des spécialisations (GSAP ScrollTrigger).
// Origine : Accueil et /les-formations › Before </body> [Horizontal Scroll Specialisations]
import { ready } from '../utils/ready.js';

export default function horizontalScroll() {
    ready(function () {
      gsap.registerPlugin(ScrollTrigger);

      const container = document.querySelector(".list-programme-home");
      const section = document.querySelector(".horizontal-scroll-section");
      const lastCard = container.lastElementChild;
      const images = gsap.utils.toArray(".card-programme .img-cover");

      const scrollWidth = container.scrollWidth;
      const viewportWidth = window.innerWidth;
      const lastCardWidth = lastCard.offsetWidth;

      // 🔧 Allonge la durée du scroll en ajoutant + de marge à droite
      const scrollDistance = scrollWidth - viewportWidth + lastCardWidth * 1;

      const totalImages = images.length;

      gsap.to(container, {
        x: () => -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: self => {
            const progress = self.progress;

            images.forEach((img, i) => {
              const positionRatio = i / (totalImages - 1);
              const strength = 1 - positionRatio;
              const targetX = progress * 60 * strength;

              if (!img._currentX) img._currentX = 0;
              img._currentX += (targetX - img._currentX) * 0.1;

              gsap.set(img, {
                x: img._currentX
              });
            });
          }
        }
      });
    });
}
