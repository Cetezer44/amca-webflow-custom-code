// Exécute fn une fois le DOM analysé.
// amca.js est chargé en `defer` : le DOM est déjà prêt quand il s'exécute,
// fn est alors appelée tout de suite. Le listener ne sert que si le script
// est un jour chargé autrement (sans defer, dans le <head>).
export function ready(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}
