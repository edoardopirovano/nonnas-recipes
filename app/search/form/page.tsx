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
import { getSession } from "@auth0/nextjs-auth0";

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

  const creatorsQuery = await AppDataSource.getRepository(Recipe)
    .createQueryBuilder("recipe")
    .leftJoinAndSelect("recipe.createdBy", "user")
    .select("DISTINCT user.name", "name")
    .where("recipe.language = :language", { language: getServerLanguage() })
    .andWhere("user.name IS NOT NULL")
    .orderBy("user.name", "ASC")
    .getRawMany();

  const creators = [
    getServerTranslation("allCreators").toLowerCase(),
    ...creatorsQuery.map((creator) => creator.name),
  ];

  const session = await getSession();
  const user = session?.user?.sub
    ? await AppDataSource.getRepository("user").findOne({
        where: { id: session.user.sub },
      })
    : null;

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
        <SearchForm categories={categories} creators={creators} />
      </div>

      {user?.isAdmin && (
        <div className="w-full max-w-[800px] mx-auto mb-4 text-center">
          <Link
            href="/recipe/new"
            className="inline-block px-6 py-2 text-lg bg-[#f4d03f] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-comic"
          >
            + {getServerTranslation("newRecipe")}
          </Link>
        </div>
      )}
    </main>
  );
}
