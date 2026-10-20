// Slider hero en fondu (.slider-hero-hp .img-amca).
// Origine : Embed « slider-fade-embed » (accueil, Bachelor)
import { ready } from '../utils/ready.js';

export default function heroSlider() {
    ready(function () {
      var DURATION = 4000; // durée d'affichage de chaque image, en ms (avant de passer à la suivante)

      document.querySelectorAll('.slider-hero-hp').forEach(function (slider) {
        var images = slider.querySelectorAll('.img-amca');
        if (images.length < 2) return; // rien à faire s'il n'y a pas au moins 2 images

        var index = 0;
        images.forEach(function (img) { img.classList.remove('is-active'); });
        images[0].classList.add('is-active');

        setInterval(function () {
          var current = images[index];
          index = (index + 1) % images.length; // boucle infinie
          var next = images[index];
          current.classList.remove('is-active');
          next.classList.add('is-active');
        }, DURATION);
      });
    });
}
