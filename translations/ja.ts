export const translations = {
  welcome: "ロザンナのレシピサイトへようこそ！",
  description:
    "ロス（私の優しい奥様）が長年かけてエクセルシートに丁寧に入力してきたレシピをすべて紹介するシンプルなウェブサイトです",
  recipeSource:
    "これらのレシピは、ガンベロ・ロッソ、グスト、メッゾジョルノ・ディ・クオーコ、ウェブなどで紹介された、信頼性が高く魅力的で実現可能なレシピを、著名なシェフ（マルケージ、ラヴァイオーリ、サンティン、マリオーラ、ルジャーティ、コレッリ、ヴィッサーニなど）から収集したものです。",
  photoCredit: "写真はSucréSaléの無料カタログから提供されています",
  navigation: "楽しいブラウジングを！",
  visitors: "訪問者数",
  recipesViewed: "閲覧されたレシピ",
  recipesAvailable: "利用可能なレシピ",
  // Search form translations
  inCategory: "カテゴリー：",
  containsWord: "次の言葉/フレーズを含む：",
  inTitle: "タイトルに：",
  inIngredients: "材料に：",
  search: "検索",
  // Recipe page translations
  recipe: "レシピ：",
  category: "カテゴリー：",
  ingredients: "材料：",
  preparation: "作り方：",
  lastUpdate: "最終更新日：",
  searchPage: "検索ページ",
  backToSearch: "検索結果に戻る",
  // Language names for accessibility
  switchToLanguage: "{language}に切り替える",
  languageNames: {
    en: "英語",
    it: "イタリア語",
    ja: "日本語",
  },
  // Profile page translations
  loading: "読み込み中...",
  login: "ログイン",
  loggedInAs: "{name}としてログイン中",
  logout: "ログアウト",
  adminPanel: "管理者",
  // Search results translations
  searchPageLink: "検索ページ",
  records: "件",
  page: "ページ",
  resultsCategory: "カテゴリー",
  resultsTitle: "タイトル",
  resultsIngredients: "材料",
};

export type TranslationKeys = keyof typeof translations;
