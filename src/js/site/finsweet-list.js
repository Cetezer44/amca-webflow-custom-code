// Finsweet Attributes (listes CMS : filtres, pagination…), action 3.2 du plan Waisso.
// Avant : chargé sur les 180 pages depuis le Head code de Webflow.
// Maintenant : chargé seulement sur les pages qui ont une liste Finsweet
// (/actualites, /section-internationale/news et leurs versions EN).

const SRC = 'https://cdn.jsdelivr.net/npm/@finsweet/attributes@2/attributes.js';

export default function finsweetList() {
  if (!document.querySelector('[fs-list-element]')) return;
  if (document.querySelector('script[src*="@finsweet/attributes"]')) return;
  const s = document.createElement('script');
  s.type = 'module';
  s.async = true;
  s.src = SRC;
  s.setAttribute('fs-list', '');
  document.head.appendChild(s);
}
