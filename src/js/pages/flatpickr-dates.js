// Sélecteur de date en français (Flatpickr) sur les champs .custom-date-input.
// Origine : /candidater et /lecole/relation-entreprise › Inside <head> et Before </body>.
// Flatpickr n'est plus chargé sur toutes les pages par Webflow : on le charge ici,
// uniquement sur les pages qui ont un champ date.
import { ready } from '../utils/ready.js';
import { loadScript, loadStyle } from '../utils/load.js';

const CDN = 'https://cdn.jsdelivr.net/npm/flatpickr';

export default function flatpickrDates(options = {}) {
  ready(async () => {
    if (!document.querySelector('.custom-date-input')) return;
    loadStyle(CDN + '/dist/flatpickr.min.css');
    await loadScript(CDN);
    await loadScript(CDN + '/dist/l10n/fr.js');
    window.flatpickr('.custom-date-input', {
      dateFormat: 'd/m/Y', // Format JJ/MM/AAAA
      locale: 'fr',        // Activation de la langue française
      ...options,
    });
  });
}
