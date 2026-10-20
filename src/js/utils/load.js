// Chargement de scripts et de feuilles de style tiers à la demande.

export function loadScript(src, attrs = {}) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    s.onload = resolve;
    s.onerror = () => reject(new Error('Échec du chargement : ' + src));
    document.head.appendChild(s);
  });
}

export function loadStyle(href) {
  if (document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) return;
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = href;
  document.head.appendChild(l);
}
