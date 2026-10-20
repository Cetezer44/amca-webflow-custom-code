// Fond du header au scroll (classe nav_scrolled).
// Origine : Site settings › Footer code [Color Background Menu]
import { ready } from '../utils/ready.js';

export default function navScroll() {
    ready(function () {
      const nav = document.querySelector(".nav_component");

      function toggleNavClass() {
        if (window.scrollY > 30) {
          nav.classList.add("nav_scrolled");
        } else {
          nav.classList.remove("nav_scrolled");
        }
      }

      window.addEventListener("scroll", toggleNavClass);
      toggleNavClass();
    });
}
