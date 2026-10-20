# Vidéos du site (action 3.1)

Hébergement : Bunny, `https://cetestudio.b-cdn.net/AMCA/`. Les originaux restent en ligne sous leur ancien nom.

| Fichier | Avant | 1080p | 720p (mobile) | Poster |
|---|---|---|---|---|
| `Teaser_site_Web_AMCA` (25 s) | 6,4 Mo, H.264 4:2:2 | 2,1 Mo | 1,3 Mo | webp 20 Ko / jpg 42 Ko |
| `Ecole_Int_Ext` (62 s) | 76 Mo, 10 Mb/s | 6,9 Mo | 3,9 Mo | webp 27 Ko / jpg 61 Ko |

Le teaser d'origine était en 4:2:2, que de nombreux navigateurs mobiles (iOS en particulier) décodent mal : les versions compressées sont en 4:2:0.

## Commandes (ffmpeg)

```bash
# 1080p
ffmpeg -i SOURCE.mp4 -an -sn -dn -map_metadata -1 -c:v libx264 -preset slower -crf 28 \
  -maxrate 680k -bufsize 1400k -pix_fmt yuv420p -profile:v high -vf "scale=1920:-2" \
  -movflags +faststart NOM-1080.mp4
# 720p
ffmpeg -i SOURCE.mp4 -an -sn -dn -map_metadata -1 -c:v libx264 -preset slower -crf 28 \
  -maxrate 420k -bufsize 900k -pix_fmt yuv420p -profile:v main -vf "scale=1280:-2" \
  -movflags +faststart NOM-720.mp4
# poster
ffmpeg -ss 0.5 -i SOURCE.mp4 -frames:v 1 -vf "scale=1280:-2" -q:v 4 NOM-poster.jpg
ffmpeg -i NOM-poster.jpg -c:v libwebp -quality 72 NOM-poster.webp
```

`Ecole_Int_Ext` garde une piste audio AAC (96 k en 1080p, 64 k en 720p) avec `-maxrate 900k` (1080p) et `550k` (720p). `-movflags +faststart` permet la lecture avant la fin du téléchargement.

## Comportement

- Aucune vidéo n'est téléchargée au chargement de la page : seul le poster s'affiche.
- Bandeaux (`data-amca-load="idle"`) : la vidéo démarre après l'événement `load`. Le bandeau de l'accueil est masqué en CSS (`.showreel_embed.showreel-home`) : il n'est jamais chargé.
- Showreel et vidéo campus : chargées à 200 px de l'écran, mises en pause en le quittant.
- Bouton play de la vidéo campus : relance depuis le début (`src/js/pages/campus-video.js`).
- « Réduire les animations » (système) : pas de lecture automatique.
