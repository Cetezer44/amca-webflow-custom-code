// Accordéons du méga-menu Formations.
// Origine : Site settings › Footer code [Accordéons Méga Menu Formations]
import { ready } from '../utils/ready.js';

export default function megaMenuAccordions() {
    ready(function () {
      var items = document.querySelectorAll("[data-mm-acc]");
      if (!items.length) return;
      function setState(item, open) {
        item.classList.toggle("is-open", open);
        var toggle = item.querySelector("[data-mm-acc-toggle]");
        var icon = item.querySelector(".mm-acc-icon");
        if (toggle) toggle.setAttribute("aria-expanded", open);
        if (icon) icon.textContent = open ? "−" : "+";
      }
      items.forEach(function (item) {
        setState(item, false);
        var toggle = item.querySelector("[data-mm-acc-toggle]");
        if (!toggle) return;
        toggle.setAttribute("role", "button");
        toggle.setAttribute("tabindex", "0");
        function onToggle(e) {
          e.preventDefault();
          var open = !item.classList.contains("is-open");
          items.forEach(function (o) { setState(o, false); });
          if (open) setState(item, true);
        }
        toggle.addEventListener("click", onToggle);
        toggle.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") onToggle(e); });
      });
    });
}
