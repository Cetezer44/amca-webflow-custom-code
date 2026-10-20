// Lecture de la vidéo campus au clic, pause hors écran.
// Origine : Accueil et /les-formations › Before </body> [Launch Video Home]
import { ready } from '../utils/ready.js';

export default function campusVideo() {
    ready(function () {
      const playBtn = document.querySelector(".icon-play");
      const filter = document.querySelector(".filter");
      const video = document.querySelector("#campus-video");
      const container = document.querySelector(".container-video-campus");

      playBtn.addEventListener("click", function () {
        // Revenir au début de la vidéo et la jouer
        video.currentTime = 0;
        video.play();

        // Transition du bouton et du filtre
        playBtn.classList.add("fade-out");
        filter.classList.add("fade-out");
      });

      // Observer si le container sort du viewport
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            video.pause();
            video.currentTime = 0;
            playBtn.classList.remove("fade-out");
            filter.classList.remove("fade-out");
          }
        });
      }, {
        threshold: 0.1 // quand moins de 10% de la div est visible
      });

      observer.observe(container);
    });
}
