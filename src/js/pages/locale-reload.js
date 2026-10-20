// Recharge la page au changement de langue.
// Origine : Accueil et /les-formations › Before </body>
export default function localeReload() {
  document.addEventListener("webflow:locale:change", () => {
    window.location.reload();
  });
}
