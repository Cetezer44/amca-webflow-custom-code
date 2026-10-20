# AMCA — Custom code Webflow

Code personnalisé du site **amcaparis.com** (Webflow, site `6891bc152fe7a0afbf69072a`).

**Ce dépôt est la source du code.** Webflow ne contient plus que les balises qui chargent les fichiers de `dist/`, servis par jsDelivr. On ne remet pas de code dans Webflow : on modifie `src/`, on rebuild, on pousse, puis on met à jour la version dans Webflow.

## Fonctionnement

| Fichier | Rôle |
|---|---|
| `src/js/main.js` | Point d'entrée : lance le code commun, puis le code propre à la page en cours |
| `src/js/site/`, `src/js/components/` | Code exécuté sur toutes les pages (méga-menu, header, FAQ, Cookiebot, gtag, bloc Portes ouvertes…) |
| `src/js/pages/` | Code propre à certaines pages (accueil, BTS, spécialisations, formulaires, modales…) |
| `src/css/site/`, `src/css/pages/` | Styles communs et styles propres à certaines pages |
| `src/pages.js` | Identifiants Webflow des pages (`data-wf-page`) et groupes de pages |
| `build.mjs` | Build : `dist/amca.min.js` et `dist/amca.min.css` |
| `dist/` | Fichiers servis au site, à committer après chaque build |

Le code propre à une page ne s'exécute que sur elle : le JS teste `data-wf-page`, et le CSS est limité par `:where(html[data-wf-page="…"])`, qui ne change pas la spécificité des règles. Chaque module tourne isolé : une erreur dans l'un s'affiche dans la console (`[AMCA] …`) sans bloquer les autres.

### Ce qui reste volontairement dans Webflow

- Les balises de chargement (`Site settings › Custom code › Head code`) : `amca.min.css` et `amca.min.js`. Le Footer code ne contient plus qu'un commentaire : Vimeo Player, jQuery 3.7.1 (doublon du jQuery de Webflow), jQuery UI, jQuery Easing et Finsweet Autovideo ont été retirés le 20/10/2026 (inutilisés). Finsweet Attributes est chargé par `amca.min.js`, seulement sur les pages qui ont une liste (`src/js/site/finsweet-list.js`).
- Les icônes SVG des embeds : elles font partie du rendu HTML. Injectées en JS, elles apparaîtraient après le chargement.
- Les balises `<video>` des embeds de l'accueil (bandeau, showreel, campus) et de /les-formations (bandeau). Elles n'ont ni `src` ni `autoplay` : `src/js/site/lazy-videos.js` pose la source quand la vidéo approche de l'écran (ou après le chargement de la page pour les bandeaux), en 720p sur mobile. Modèle :
  ```html
  <video muted loop playsinline preload="none" poster="https://cetestudio.b-cdn.net/AMCA/<nom>-poster.webp"
         data-amca-src="https://cetestudio.b-cdn.net/AMCA/<nom>-1080.mp4"
         data-amca-src-mobile="https://cetestudio.b-cdn.net/AMCA/<nom>-720.mp4"
         data-amca-autoplay data-amca-load="visible|idle" style="…"></video>
  ```
  Les vidéos sont hébergées sur Bunny (`cetestudio.b-cdn.net/AMCA/`). Réglages d'encodage : `docs/performance/videos.md`.
- Les JSON-LD (Page settings › Schema markup) : celui du template Stages utilise des champs CMS, que seul Webflow peut remplir.
- Les pages en brouillon (Style Guide, Components…) et la page mot de passe, non concernées.
- Le `noindex` des 4 pages de confirmation (« merci ») : `<meta name="robots" content="noindex, follow">` dans Page settings › Custom code › Inside `<head>`. Webflow n'a pas de réglage natif, et la balise doit être dans le HTML servi pour que Google la lise. Ces pages sont aussi exclues du sitemap (action 2.4 du plan Waisso).
- La canonical globale (Site settings › SEO › Global canonical tag URL : `https://www.amcaparis.com`), action 2.2.
- Les redirections 301 (Site settings › Publishing) : la liste annotée est dans `webflow/redirects-301.csv`.

### Mettre à jour le code

```bash
npm install          # la première fois
# modifier src/…
npm run build
git add -A && git commit -m "…" && git push
```

Puis, dans Webflow › Site settings › Custom code › Head code, remplacer l'empreinte du commit dans les **2 URL** (`…@<commit>/dist/amca.min.css` et `…@<commit>/dist/amca.min.js`) par celle du nouveau commit (`git rev-parse HEAD`), et publier.

La version est figée par commit : jsDelivr met ces fichiers en cache sans limite, donc une URL ne change jamais de contenu. Pour revenir en arrière, il suffit de remettre l'empreinte précédente dans Webflow.

Version en ligne : voir les 2 URL du Head code (commit `9990c8a` au 20/10/2026, actions 3.1–3.2).

## Historique de l'export

Le premier commit du dépôt est une **copie conforme** du code tel qu'il était dans Webflow le 20/10/2026, avant les corrections SEO de l'audit Waisso du 14/10/2026. Les dossiers `site/`, `pages/`, `cms-templates/` et `embeds/` gardent cette trace : ils documentent l'ancien emplacement de chaque code et **ne sont plus chargés par le site**.

## Arborescence de l'export d'origine

| Dossier | Contenu | Où le trouver dans Webflow |
|---|---|---|
| `site/head.html`, `site/footer.html` | Code global (Finsweet Attributes, Cookiebot, gtag Google Ads, Vimeo, jQuery, méga-menu, accordéons, couleur du menu au scroll, loader EN) | Site settings › Custom code › Head code / Footer code |
| `pages/<page>/head.html`, `footer.html` | Code propre à une page (12 pages) | Page settings › Custom code › Inside `<head>` / Before `</body>` |
| `cms-templates/stages/schema-jsonld.html` (+ `.en.html`) | JSON-LD `Course` du template Stages, FR et EN | Template Stages › Page settings › Schema markup (locale FR / EN) |
| `pages/accueil/schema-jsonld.html` (+ `.en.html`) | JSON-LD de l'école (`EducationalOrganization`, `WebSite`, `WebPage`), FR et EN | Accueil › Page settings › Schema markup (locale FR / EN) |
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

- **JSON-LD des stages** : un guillemet en trop après `name` rendait le JSON invalide sur toutes les fiches stages (action 4 de l'audit). Corrigé le 20/10/2026, voir l'historique.
- **Champs dynamiques dans le JSON-LD** : l'API Webflow refuse d'écrire un schema contenant des champs CMS (`{{wf …\} }}`). Un schema dynamique se modifie donc dans le Designer (Page settings › Schema markup, avec « Add field »). Les schemas statiques passent par l'API.
- **Scripts tiers au chargement** (action 7 du plan, performance) : jQuery + jQuery UI + jQuery Easing, Vimeo Player, Finsweet Attributes (×2), GSAP, Flatpickr, gtag, Cookiebot. Ce dépôt sert de base à l'inventaire demandé par l'audit.
- **Cookiebot** est injecté 3 s après le `load` de la page.
- Les vidéos du showreel et du campus sont servies depuis `cetestudio.b-cdn.net` (embeds de l'accueil).

## Règle de travail

Le code fait foi dans ce dépôt (voir « Mettre à jour le code »). Seuls les JSON-LD (`cms-templates/`, `pages/accueil/schema-jsonld*`) se modifient encore dans Webflow : reporter ici chaque changement dans un commit qui indique la page concernée et l'action de l'audit correspondante.
