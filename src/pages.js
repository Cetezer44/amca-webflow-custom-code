// Identifiants des pages Webflow (attribut data-wf-page de <html>).
// Une même page a le même identifiant en FR et en EN ; un template CMS a un
// seul identifiant pour toutes ses fiches. Utilisé par le JS (src/js/main.js)
// et par le build CSS (build.mjs) pour cibler chaque code sur ses pages.

export const PAGES = {
  accueil: '6891bc152fe7a0afbf690729',
  lesFormations: '69c385498a002ac60c750524', // /les-formations (Landing Page PO)
  candidater: '6891bc152fe7a0afbf6907cb',
  relationEntreprise: '6891bc152fe7a0afbf690807',
  partenaires: '68b01542f3d03664fa00928c',
  intervenants: '68d158ee7ab04bf57f81d70a',
  bts: '6abc0bc7a9759349a92ff463',
  speRealisation: '6891bc152fe7a0afbf690747',
  speAssistant: '6891bc152fe7a0afbf690748',
  speScenariste: '6891bc152fe7a0afbf690749',
  speMontage: '6891bc152fe7a0afbf69074d',
  speProduction: '6891bc152fe7a0afbf69074e',
  intlBachelor: '69cd796d6c5a15c92e947bfc',
  intlOpenHouse: '69ce1f451dd39eb0aed1bf5f',
  intlNews: '69cd8326585c8804832c5d82',
  templateArticle: '6891bc152fe7a0afbf69073a', // template CMS des articles de blog
};

const P = PAGES;
export const GROUPS = {
  accueilEtFormations: [P.accueil, P.lesFormations],
  specialisations: [P.speRealisation, P.speAssistant, P.speScenariste, P.speMontage, P.speProduction],
  navSpecialisation: [P.speRealisation, P.speAssistant, P.speScenariste, P.speMontage, P.speProduction, P.intlBachelor, P.intlOpenHouse],
  heroSlider: [P.accueil, P.intlBachelor],
  modalIntervenants: [P.partenaires, P.intervenants],
  faqInternational: [P.intlNews, P.intlOpenHouse],
};
