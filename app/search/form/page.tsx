import { SearchForm } from "../../../components/SearchForm";
import { AppDataSource } from "../../../lib/db";
import { Language, Recipe } from "../../../entities/Recipe";
import { initDb } from "../../../lib/db";
import Link from "next/link";
import { getServerTranslation } from "@/utils/serverTranslation";
import { ImageGrid } from "@/components/ImageGrid";

export default async function SearchFormPage() {
  await initDb();
  const categoriesQuery = await AppDataSource.getRepository(Recipe)
    .createQueryBuilder("recipe")
    .select("DISTINCT category, language")
    .orderBy("category", "ASC")
    .getRawMany();

  const categories = [
    ...["en", "it", "ja"].map((language, index) => ({
      id: index + 1,
      name: getServerTranslation("allCategories", {
        language: language as Language,
      }).toLowerCase(),
      language,
    })),
    ...categoriesQuery.map((cat, index) => ({
      id: index + 100,
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
      <ImageGrid />

      <div className="max-w-[800px] mx-auto">
        <div className="bg-black text-[antiquewhite] text-center p-2 font-comic text-lg">
          {getServerTranslation("search")}:
        </div>
        <SearchForm categories={categories} />
      </div>
    </main>
  );
}
