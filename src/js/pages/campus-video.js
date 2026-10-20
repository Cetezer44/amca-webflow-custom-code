// Vidéo campus de l'accueil : lecture depuis le début au clic sur le bouton play,
// retour au bouton quand la vidéo sort de l'écran.
// Origine : Accueil et /les-formations › Before </body> [Launch Video Home]
// Correction 3.1 : la vidéo est cherchée dans .container-video-campus (l'ancien
// sélecteur #campus-video visait par erreur la vidéo showreel, qui porte le même id).
import { ready } from '../utils/ready.js';
import { playVideo } from '../site/lazy-videos.js';

export default function campusVideo() {
  ready(function () {
    const container = document.querySelector('.container-video-campus');
    if (!container) return;
    const playBtn = container.querySelector('.icon-play');
    const filter = container.querySelector('.filter');
    const video = container.querySelector('video');
    if (!playBtn || !video) return;

    playBtn.addEventListener('click', function () {
      video.currentTime = 0;
      playVideo(video);
      playBtn.classList.add('fade-out');
      if (filter) filter.classList.add('fade-out');
    });

    // Quand la vidéo sort de l'écran (moins de 10 % visible) : retour au début et au bouton
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          video.pause();
          if (video.readyState > 0) video.currentTime = 0;
          playBtn.classList.remove('fade-out');
          if (filter) filter.classList.remove('fade-out');
        }
      });
    }, { threshold: 0.1 });

    observer.observe(container);
  });
}
