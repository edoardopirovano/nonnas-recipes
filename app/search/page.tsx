import { AppDataSource } from "../../lib/db";
import { Language, Recipe } from "../../entities/Recipe";
import { Like, FindOptionsWhere } from "typeorm";
import { initDb } from "../../lib/db";
import { PaginationControls } from "@/components/PaginationControls";
import Link from "next/link";
import { getServerTranslation } from "@/utils/serverTranslation";

interface SearchPageProps {
  searchParams: {
    title?: string;
    category?: string;
    ingredients?: string;
    page?: string;
    language?: string;
  };
}

const ITEMS_PER_PAGE = 15;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  await initDb();
  const { title, category, ingredients, page = "1", language } = searchParams;
  const currentPage = parseInt(page);

  const whereClause: FindOptionsWhere<Recipe> = {};
  if (title) whereClause.title = Like(`%${decodeURIComponent(title)}%`);
  if (category)
    whereClause.category = Like(`%${decodeURIComponent(category)}%`);
  if (ingredients)
    whereClause.ingredients = Like(`%${decodeURIComponent(ingredients)}%`);
  if (language) whereClause.language = language as Language;
  console.log(whereClause);

  const [recipes, total] = await AppDataSource.getRepository(
    Recipe
  ).findAndCount({
    where: whereClause,
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    order: { id: "DESC" },
  });

  await AppDataSource.destroy();

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[lightgrey] p-8">
      <table className="w-[800px] mx-auto mb-4">
        <tbody>
          <tr>
            <td className="text-left">
              <Link
                href="/search/form"
                className="font-comic text-sm underline"
              >
                <h4>{getServerTranslation("searchPageLink")}</h4>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-[800px] mx-auto mb-4 border-spacing-[3px] border-separate">
        <tbody>
          <tr>
            <th className="bg-[lightgrey] text-center">
              <span className="font-comic">
                {total} {getServerTranslation("records")}{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;
                {getServerTranslation("page")}: {currentPage} / {totalPages}
              </span>
            </th>
          </tr>
        </tbody>
      </table>

      <div className="w-[800px] mx-auto">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="bg-[slategray] text-[antiquewhite] p-2 w-[10%] border border-gray-400 font-['Comic_Sans_MS']">
                {getServerTranslation("resultsCategory")}
              </th>
              <th className="bg-[slategray] text-[antiquewhite] p-2 w-[30%] border border-gray-400 font-['Comic_Sans_MS']">
                {getServerTranslation("resultsTitle")}
              </th>
              <th className="bg-[slategray] text-[antiquewhite] p-2 w-[60%] border border-gray-400 font-['Comic_Sans_MS']">
                {getServerTranslation("resultsIngredients")}
              </th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td className="bg-[moccasin] p-2 align-top border border-gray-400">
                  <span className="font-['Comic_Sans_MS'] text-black text-sm">
                    {recipe.category.toLowerCase()}
                  </span>
                </td>
                <td className="bg-[moccasin] p-2 align-top border border-gray-400">
                  <Link href={`/recipe/${recipe.id}`}>
                    <span className="font-['Comic_Sans_MS'] text-blue-600 text-sm underline">
                      {recipe.title}
                    </span>
                  </Link>
                </td>
                <td className="bg-[moccasin] p-2 align-top border border-gray-400">
                  <span className="font-['Comic_Sans_MS'] text-[saddlebrown] text-sm whitespace-pre-line">
                    {recipe.ingredients}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-[800px] mx-auto mt-4">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
}
