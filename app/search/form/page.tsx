import { SearchForm } from "../../../components/SearchForm";
import { AppDataSource } from "../../../lib/db";
import { Recipe } from "../../../entities/Recipe";
import { initDb } from "../../../lib/db";
import Link from "next/link";
import {
  getServerLanguage,
  getServerTranslation,
} from "@/utils/serverTranslation";
import { ImageGrid } from "@/components/ImageGrid";

export default async function SearchFormPage() {
  await initDb();
  const categoriesQuery = await AppDataSource.getRepository(Recipe)
    .createQueryBuilder("recipe")
    .select("DISTINCT category")
    .where("language = :language", { language: getServerLanguage() })
    .orderBy("category", "ASC")
    .getRawMany();

  const categories = [
    getServerTranslation("allCategories").toLowerCase(),
    ...categoriesQuery.map((cat) => cat.category.toLowerCase()),
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
