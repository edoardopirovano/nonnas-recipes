export const translations = {
  welcome: "Benvenuti nel sito delle ricette di Rosanna!",
  description:
    "Un sito molto spartano che presenta tutte le ricette pazientemente digitate negli ultimi anni su un foglio Excel da Ros (la mia gentil Signora)",
  recipeSource:
    "Le ricette sono state raccolte fra le più credibili, accattivanti e fattibili esposte da maestri gastronomici (Marchesi, Ravaioli, Santin, Mariola, Rugiati, Corelli, Vissani etc.) nel Gambero Rosso, Gusto, Mezzogiorno di cuoco, WEB e quant'altri.",
  photoCredit: "Le fotografie provengono dal catalogo FREE di",
  navigation: "Buona navigazione!",
  visitors: "Visitatori",
  recipesViewed: "Ricette visitate",
  recipesAvailable: "Ricette disponibili",
  // Search form translations
  inCategory: "Nella categoria:",
  containsWord: "Che contiene la parola/frase:",
  inTitle: "Nel titolo:",
  inIngredients: "Negli ingredienti:",
  search: "Ricerca",
  // Recipe page translations
  recipe: "Ricetta:",
  category: "Categoria:",
  ingredients: "Ingredienti:",
  preparation: "Preparazione:",
  lastUpdate: "Data ultimo aggiornamento:",
  searchPage: "Pagina di ricerca",
  backToSearch: "Torna ai risultati",
  // Language names for accessibility
  switchToLanguage: "Passa a {language}",
  languageNames: {
    en: "Inglese",
    it: "Italiano",
    ja: "Giapponese",
  },
  // Profile page translations
  loading: "Caricamento ...",
  login: "Effettua il login",
  loggedInAs: "Connesso come {name}",
  logout: "disconnetti",
  adminPanel: "admin",
  // Search results translations
  searchPageLink: "Pagina di ricerca",
  records: "Risultati",
  page: "Pagina",
  resultsCategory: "Categoria",
  resultsTitle: "Titolo",
  resultsIngredients: "Ingredienti",
};

export type TranslationKeys = keyof typeof translations;
