# Audit Waisso 4.1 à 4.5 : métadonnées, H1, FR/EN — 20/10/2026

Sources : audit PDF du 14/10/2026, annexe « Annexe optimisations par page AMCA.xlsx » (requêtes non-marque et recommandations par page).
Mesures : crawl complet du sitemap (174 URL FR + EN), avant sur amcaparis.com, après sur la préprod.

## Résultat

| Point | Avant (prod) | Après (préprod) |
|---|---|---|
| 4.1 Titles > 60 caractères | 69 | 0 |
| 4.1 Titles dupliqués | 18 groupes | 0 |
| 4.1 Titles vides | 4 | 0 |
| 4.2 H1 dupliqués | 30 groupes | 0 |
| 4.2 Pages sans H1 | 2 | 0 |
| 4.2 Pages avec 2 H1 | 4 | 0 |
| 4.3 Meta descriptions dupliquées | 18 groupes | 0 |
| 4.3 Meta descriptions vides | 4 | 0 |
| 4.4 Pages sans alternates hreflang | items EN seuls | 0 |

(Les chiffres de l'audit, 69 / 34 / 4 / 68 / 7 / 44 / 11, comptaient chaque URL ; ici on compte des groupes de doublons.)

## Ce qui a été modifié

- **Pages statiques** : 45 titles et meta descriptions FR et EN réécrits à partir des requêtes de l'annexe (format « mot-clé principal à Paris | AMCA », 50 à 60 caractères ; descriptions de 120 à 155 caractères).
- **CMS Stages** : title et meta de 17 variantes FR/EN ; noms EN traduits (H1). Stage acting EN archivé (doublon du FR, non traduit) → 301 vers /en/stages.
- **CMS Blog** : 66 mises à jour (nom = H1, balise-title, balise-meta-description) en FR et EN ; l'article EN « avoid-losing-a-year » archivé (doublon de la page rentrée décalée) → 301.
- **H1** :
  - /les-formations et /lecole/lecole : le second H1 passe en H2 (sur /lecole/lecole, l'instance de composant a été détachée car le niveau de titre ne peut pas être une propriété) ;
  - contact international : ajout d'un H1 « Nous contacter » / « Contact us » ;
  - EN : H1 traduits sur l'accueil, réalisation, bachelor, portes ouvertes international, aides, handicap, rentrée décalée, stages, news, BTS.
- **Accueil** : la vidéo showreel masquée du hero est supprimée (le diaporama photo reste).
- **Page 404** : refaite aux couleurs de l'AMCA (fond violet, logo, totems, footer) ; titre « Coupez ! Cette page n'existe pas. », 4 liens (accueil, formations, stages, contact) ; version EN traduite ; title « Page introuvable (404) | AMCA ».

## 4.4 hreflang

Webflow génère les balises `link rel="alternate" hreflang` (fr, en, x-default) et les URL /en/… sur toutes les pages publiées dans les deux langues. Aucune erreur restante après archivage des deux items EN orphelins.

## 4.5 Reste à faire côté contenu (hors périmètre technique)

- Corps des articles de blog non traduits en EN (et articles rédigés en anglais affichés tels quels en FR).
- Corps de la page EN « aides financières » et de la page EN BTS encore en français (seuls le hero et les métadonnées sont traduits).
- Dates « 2026 » à mettre à jour dans les textes de rentrée.
- Stages DaVinci Resolve et Premiere Pro : pas de version EN.
