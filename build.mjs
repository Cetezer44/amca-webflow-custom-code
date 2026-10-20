// Build : src/ → dist/amca.min.js et dist/amca.min.css
// Usage : npm run build
import { build } from 'esbuild';
import { transform } from 'lightningcss';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { PAGES as P, GROUPS as G } from './src/pages.js';

const version = JSON.parse(readFileSync('package.json', 'utf8')).version;
const banner = `/*! AMCA amcaparis.com v${version} | https://github.com/Cetezer44/amca-webflow-custom-code */`;

// CSS commun à toutes les pages
const SITE_CSS = [
  'site/global-styles.css',
  'site/header.css',
  'site/menu-smartphone.css',
  'site/mega-menu-accordions.css',
  'site/portes-ouvertes-fixe.css',
  'site/keyframes.css',
];

// CSS propre à certaines pages : chaque fichier est limité à ses pages
// via :where(html[data-wf-page="…"]), qui n'ajoute aucune spécificité : les règles
// gardent le même poids que dans Webflow. Dans ces fichiers, `&` désigne <html>.
const PAGE_CSS = {
  'pages/accueil.css': G.accueilEtFormations,
  'pages/showreel.css': G.accueilEtFormations,
  'pages/marquee.css': G.accueilEtFormations,
  'pages/purple-block.css': G.accueilEtFormations,
  'pages/hero-heading.css': G.accueilEtFormations,
  'pages/featured-block-fade.css': G.accueilEtFormations,
  'pages/campus-video.css': [P.accueil],
  'pages/hero-slider.css': G.heroSlider,
  'pages/specialisation-nav.css': G.navSpecialisation,
  'pages/specialisation-active.css': G.specialisations,
  'pages/bts.css': [P.bts],
  'pages/flatpickr-date.css': [P.candidater, P.relationEntreprise],
  'pages/candidature-uploads.css': [P.candidater],
  'pages/faq-international.css': G.faqInternational,
  'pages/blog-article.css': [P.templateArticle],
};

const read = (f) => readFileSync('src/css/' + f, 'utf8');
const scope = (ids) => ':where(' + ids.map((id) => `html[data-wf-page="${id}"]`).join(', ') + ')';

let css = SITE_CSS.map(read).join('\n\n');
for (const [file, ids] of Object.entries(PAGE_CSS)) {
  css += `\n\n${scope(ids)} {\n${read(file)}\n}`;
}

const { code } = transform({
  filename: 'amca.css',
  code: Buffer.from(css),
  minify: true,
  // Navigateurs sans support du CSS imbriqué : l'imbrication est aplatie au build.
  targets: { safari: (14 << 16), chrome: (90 << 16), firefox: (88 << 16) },
});

mkdirSync('dist', { recursive: true });
writeFileSync('dist/amca.min.css', banner + '\n' + code.toString());

await build({
  entryPoints: ['src/js/main.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2019'],
  banner: { js: banner },
  outfile: 'dist/amca.min.js',
  logLevel: 'info',
});
