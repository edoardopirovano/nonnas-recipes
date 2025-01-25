import { SearchForm } from "../../../components/SearchForm";
import { RandomImage } from "@/components/RandomImage";
import { AppDataSource } from "../../../lib/db";
import { Recipe } from "../../../entities/Recipe";
import { initDb } from "../../../lib/db";
import Link from "next/link";
import {
  getServerLanguage,
  getServerTranslation,
} from "@/utils/serverTranslation";

export default async function SearchFormPage() {
  await initDb();
  const categoriesQuery = await AppDataSource.getRepository(Recipe)
    .createQueryBuilder("recipe")
    .select("DISTINCT category, language")
    .orderBy("category", "ASC")
    .getRawMany();

  const categories = [
    {
      id: 1,
      name: getServerTranslation("allCategories"),
      language: getServerLanguage(),
    },
    ...categoriesQuery.map((cat, index) => ({
      id: index + 2,
      name: cat.category.toLowerCase(),
      language: cat.language.toLowerCase(),
    })),
  ];
  return (
    <main className="min-h-screen p-8 bg-[palegoldenrod]">
      <Link
        href="/"
        className="inline-block mb-4 text-blue-800 hover:underline font-comic"
      >
        ← {getServerTranslation("backToHome")}
      </Link>
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
          {getServerTranslation("search")}:
        </div>
        <SearchForm categories={categories} />
      </div>
    </main>
  );
}
