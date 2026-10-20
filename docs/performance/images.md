# Images (action 3.3) — 20/10/2026

Conversion en WebP par l'API Webflow (`compress_assets`) des 52 images du site en JPG/PNG de plus de 100 Ko : **29,0 Mo → 5,1 Mo** (−82 %). Même asset, même emplacement : rien à changer dans le Designer.

Les originaux sont sauvegardés hors Webflow (zip de 52 fichiers, 29 Mo) chez Charles : `~/Movies/AMCA-images-originales/AMCA-images-originales-2026-10-20.zip`.

Vérification après publication : 551 URL d'images (src + srcset) sur les 176 pages, aucune en erreur.

Non traité :
- Les images des collections CMS (articles, stages…) ne sont pas des assets du site pour l'API : à convertir à l'import (WebP < 300 Ko) lors des prochaines mises à jour de contenu. Exemples lourds : `projection 2.jpg` (3,6 Mo), `paris.jpg` (3,0 Mo), une capture d'écran PNG (2,8 Mo), servies en variantes redimensionnées par Webflow.

## Polices et CSS/JS

- Minification CSS et JS activée (Site settings › Publishing › Options avancées) ; HTML déjà minifié.
- « CSS par page » laissé désactivé : il retirerait les classes ajoutées par le JavaScript (menus, modales) qui ne sont pas dans le HTML de la page.
- « Charger JS de manière asynchrone » laissé désactivé : `amca.min.js` utilise GSAP chargé par Webflow.
- Polices : Satoshi (3 fichiers, hébergés par Webflow) et Inter 300–700 via Google Fonts. Les 5 graisses d'Inter sont utilisées dans le CSS : rien à retirer sans changer le design.
