import { SearchForm } from "../../../components/SearchForm";
import { RandomImage } from "@/components/RandomImage";
import { AppDataSource } from "../../../lib/db";
import { Recipe } from "../../../entities/Recipe";
import { initDb } from "../../../lib/db";

export default async function SearchFormPage() {
  await initDb();
  const categoriesQuery = await AppDataSource.getRepository(Recipe)
    .createQueryBuilder("recipe")
    .select("DISTINCT category, language")
    .orderBy("category", "ASC")
    .getRawMany();

  const categories = [
    { id: 1, name: "All categories", language: "en" },
    { id: 2, name: "Tutte le categorie", language: "it" },
    { id: 3, name: "すべてのカテゴリー", language: "ja" },
    ...categoriesQuery.map((cat, index) => ({
      id: index + 100,
      name: cat.category.toLowerCase(),
      language: cat.language.toLowerCase(),
    })),
  ];
  return (
    <main className="min-h-screen p-8 bg-[palegoldenrod]">
      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-[800px] mx-auto">
        <div className="text-center">
          <RandomImage width={150} height={150} className="w-[150px] h-auto" />
        </div>
        <div className="text-center">
          <RandomImage width={150} height={150} className="w-[150px] h-auto" />
        </div>
        <div className="text-center">
          <RandomImage width={150} height={150} className="w-[150px] h-auto" />
        </div>
        <div className="text-center">
          <RandomImage width={150} height={150} className="w-[150px] h-auto" />
        </div>
      </div>

      <div className="max-w-[800px] mx-auto">
        <div className="bg-black text-[antiquewhite] text-center p-2 font-comic text-lg">
          Seleziona uno o più criteri di ricerca:
        </div>
        <SearchForm categories={categories} />
      </div>
    </main>
  );
}
