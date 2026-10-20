# AMCA — Custom code Webflow

Sauvegarde versionnée de tout le code personnalisé du site **amcaparis.com** (Webflow, site `6891bc152fe7a0afbf69072a`), exporté le **20/10/2026**, avant les corrections SEO de l'audit Waisso du 14/10/2026.

Ce premier commit est une **copie conforme** de ce qui est en ligne : rien n'a été corrigé ni reformaté. Les corrections de l'audit feront l'objet de commits séparés, pour garder un historique lisible et pouvoir revenir en arrière.

## Arborescence

| Dossier | Contenu | Où le trouver dans Webflow |
|---|---|---|
| `site/head.html`, `site/footer.html` | Code global (Finsweet Attributes, Cookiebot, gtag Google Ads, Vimeo, jQuery, méga-menu, accordéons, couleur du menu au scroll, loader EN) | Site settings › Custom code › Head code / Footer code |
| `pages/<page>/head.html`, `footer.html` | Code propre à une page (12 pages) | Page settings › Custom code › Inside `<head>` / Before `</body>` |
| `cms-templates/stages/schema-jsonld.html` | JSON-LD `Course` du template Stages | Template Stages › Page settings › Schema markup |
| `embeds/pages/<page>/` | Embeds HTML placés directement dans les pages (164) | Designer › élément « Code Embed » de la page |
| `embeds/components/<composant>/` | Embeds HTML placés dans les composants (72) : header, méga-menus, footer, FAQ… | Designer › Components › composant concerné |

Conventions :
- Un `/` dans l'URL de la page devient `__` dans le nom du dossier (ex. `specialisations__realisation-mise-en-scene` = `/specialisations/realisation-mise-en-scene`).
- Les dossiers préfixés `_cms-template-` sont des templates de collection CMS ; ceux préfixés `_draft-` sont des pages en brouillon (non publiées).
- Chaque dossier `embeds/…` contient un `_index.json` qui relie chaque fichier à l'ID de l'élément Webflow et à ses classes. Les fichiers sont numérotés dans l'ordre de la page et nommés d'après la première classe de l'embed.

## Code par page

| Page | head | footer |
|---|---|---|
| `/` (accueil) | styles images flottantes, titres d'actus | images qui suivent la souris, scroll horizontal des spécialisations, vidéo campus, mise en gras des titres, rechargement au changement de langue |
| `/les-formations` | identique à l'accueil | identique à l'accueil |
| `/candidater` | Flatpickr (CSS) | Flatpickr FR, boutons d'upload personnalisés |
| `/lecole/relation-entreprise` | Flatpickr (CSS) | Flatpickr FR (dates passées interdites) |
| `/specialisations/bts-audiovisuel-option-montage-postproduction` | styles barre d'onglets, formulaire | ancres avec offset, onglets, accordéons, ouverture du dossier de candidature PDF |
| `/specialisations/*` (5 pages) et `/section-internationale/*` (2 pages) | désactivation du scroll natif | scroll doux et lien actif de la barre de navigation |

Les blocs identiques d'une page à l'autre sont conservés en double, comme dans Webflow.

## Points relevés pendant l'export

- **JSON-LD des stages cassé** : un guillemet en trop après la valeur de `name` (`… }}"",`) rend le JSON invalide sur les 17 pages stages. C'est le défaut « JSON-LD cassé » de l'audit (action 4 du plan). Laissé tel quel ici, à corriger dans un commit dédié.
- **Scripts tiers au chargement** (action 7 du plan, performance) : jQuery + jQuery UI + jQuery Easing, Vimeo Player, Finsweet Attributes (×2), GSAP, Flatpickr, gtag, Cookiebot. Ce dépôt sert de base à l'inventaire demandé par l'audit.
- **Cookiebot** est injecté 3 s après le `load` de la page.
- Les vidéos du showreel et du campus sont servies depuis `cetestudio.b-cdn.net` (embeds de l'accueil).

## Mettre à jour ce dépôt

Le code fait foi dans Webflow. Après chaque modification dans Webflow, reporter le changement ici dans un commit qui indique la page ou le composant concerné et l'action de l'audit correspondante.
