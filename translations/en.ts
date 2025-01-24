export const translations = {
  welcome: "Welcome to Rosanna's Recipe Website!",
  description:
    "A simple website presenting all the recipes patiently typed over the years into an Excel sheet by Ros (my kind Lady)",
  recipeSource:
    "The recipes have been collected from the most credible, appealing and feasible ones presented by gastronomic masters (Marchesi, Ravaioli, Santin, Mariola, Rugiati, Corelli, Vissani etc.) in Gambero Rosso, Gusto, Mezzogiorno di cuoco, WEB and others.",
  photoCredit: "The photographs come from the FREE catalog of",
  navigation: "Happy browsing!",
  visitors: "Visitors",
  recipesViewed: "Recipes viewed",
  recipesAvailable: "Recipes available",
  // Search form translations
  inCategory: "In category:",
  containsWord: "Contains word/phrase:",
  inTitle: "In title:",
  inIngredients: "In ingredients:",
  search: "Search",
  // Recipe page translations
  recipe: "Recipe:",
  category: "Category:",
  ingredients: "Ingredients:",
  preparation: "Preparation:",
  lastUpdate: "Last update:",
  searchPage: "Search page",
  backToSearch: "Back to search results",
  // Language names for accessibility
  switchToLanguage: "Switch to {language}",
  languageNames: {
    en: "English",
    it: "Italian",
    ja: "Japanese",
  },
  // Profile page translations
  loading: "Loading ...",
  login: "Login",
  loggedInAs: "Logged in as {name}",
  logout: "logout",
  adminPanel: "admin",
  // Search results translations
  searchPageLink: "Search page",
  records: "Records",
  page: "Page",
  resultsCategory: "Category",
  resultsTitle: "Title",
  resultsIngredients: "Ingredients",
};

export type TranslationKeys = keyof typeof translations;
