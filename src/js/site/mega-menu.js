// Ouverture / fermeture des méga-menus du header au survol.
// Origine : Site settings › Footer code [Mega Menu]
import { ready } from '../utils/ready.js';

export default function megaMenu() {
    ready(function () {

      var ecoleTrigger = document.querySelector(".ecole-dd-mega-menu");
      var ecoleMenu = document.querySelector(".mega-menu-ecole-container");
      var programmeTrigger = document.querySelector(".programme-dd-mega-menu");
      var programmeMenu = document.querySelector(".mega-menu-programme-container");
      var speTrigger = document.querySelector(".spe-dd-mega-menu");
      var speMenu = document.querySelector(".mega-menu-spe-container");
      var formTrigger = document.querySelector(".form-dd-mega-menu");
      var formMenu = document.querySelector(".mega-menu-form-container");

      if (!ecoleTrigger || !ecoleMenu || !programmeTrigger || !programmeMenu || !speTrigger || !speMenu || !formTrigger || !formMenu) return;

      var closeTimeout;

      var menus = [
        { trigger: ecoleTrigger, menu: ecoleMenu, visible: false },
        { trigger: programmeTrigger, menu: programmeMenu, visible: false },
        { trigger: speTrigger, menu: speMenu, visible: false },
        { trigger: formTrigger, menu: formMenu, visible: false },
      ];

      function openMenu(entry) {
        clearTimeout(closeTimeout);
        menus.forEach(function (m) {
          if (m !== entry && m.visible) {
            m.visible = false;
            m.menu.classList.remove("active");
            m.menu.style.display = "none";
          }
        });
        if (entry.visible) return;
        entry.visible = true;
        entry.menu.style.display = "flex";
        requestAnimationFrame(function () {
          entry.menu.classList.add("active");
        });
      }

      function closeMenu(entry) {
        if (!entry.visible) return;
        entry.visible = false;
        entry.menu.classList.remove("active");
        closeTimeout = setTimeout(function () {
          if (!entry.visible) {
            entry.menu.style.display = "none";
          }
        }, 200);
      }

      function closeAllMenus() {
        clearTimeout(closeTimeout);
        menus.forEach(function (m) {
          if (m.visible) {
            m.visible = false;
            m.menu.classList.remove("active");
            m.menu.style.display = "none";
          }
        });
      }

      menus.forEach(function (entry) {
        entry.trigger.addEventListener("mouseenter", function () {
          openMenu(entry);
        });

        entry.menu.addEventListener("mouseenter", function () {
          clearTimeout(closeTimeout);
        });

        entry.menu.addEventListener("mouseleave", function () {
          closeMenu(entry);
        });
      });

      [".close-mega-menu", ".nav_brand", ".flex_cta_header"].forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (el) {
          el.addEventListener("mouseenter", closeAllMenus);
        });
      });

      document.querySelectorAll(".nav_menu_link").forEach(function (el) {
        var isInMegaMenu = menus.some(function (m) { return m.menu.contains(el); });
        var isTrigger = menus.some(function (m) { return m.trigger === el || m.trigger.contains(el); });
        if (!isInMegaMenu && !isTrigger) {
          el.addEventListener("mouseenter", closeAllMenus);
        }
      });

    });
}
