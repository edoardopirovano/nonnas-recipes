import { AppDataSource } from "../../lib/db";
import { Recipe } from "../../entities/Recipe";
import { FindOptionsWhere, ILike, FindOptionsOrder } from "typeorm";
import { initDb } from "../../lib/db";
import { PaginationControls } from "@/components/PaginationControls";
import Link from "next/link";
import {
  getServerLanguage,
  getServerTranslation,
} from "@/utils/serverTranslation";

interface SearchPageProps {
  searchParams: {
    title?: string;
    category?: string;
    ingredients?: string;
    page?: string;
    creator?: string;
    instructions?: string;
    shuffle?: string;
  };
}

const ITEMS_PER_PAGE = 15;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  await initDb();
  const {
    title,
    category,
    ingredients,
    page = "1",
    creator,
    instructions,
    shuffle,
  } = searchParams;
  const currentPage = parseInt(page);

  const whereClause: FindOptionsWhere<Recipe> = {};
  if (title) whereClause.title = ILike(`%${decodeURIComponent(title)}%`);
  if (category)
    whereClause.category = ILike(`%${decodeURIComponent(category)}%`);
  if (ingredients)
    whereClause.ingredients = ILike(`%${decodeURIComponent(ingredients)}%`);
  whereClause.language = getServerLanguage();
  if (creator)
    whereClause.createdBy = { name: ILike(`%${decodeURIComponent(creator)}%`) };
  if (instructions)
    whereClause.instructions = ILike(`%${decodeURIComponent(instructions)}%`);

  const orderClause: FindOptionsOrder<Recipe> = shuffle
    ? { id: "DESC" } // Using DESC as a proxy for random since RANDOM is not supported
    : { title: "ASC" };

  const [recipes, total] = await AppDataSource.getRepository(
    Recipe
  ).findAndCount({
    where: whereClause,
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    order: orderClause,
  });

  await AppDataSource.destroy();

  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  const createQueryString = (params: Record<string, string | undefined>) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) searchParams.append(key, value);
    });
    return searchParams.toString();
  };

  const toggleShuffle = () => {
    const newParams = { ...searchParams };
    if (shuffle) {
      delete newParams.shuffle;
    } else {
      newParams.shuffle = "true";
    }
    return createQueryString(newParams);
  };

  return (
    <main className="min-h-screen bg-[lightgrey] p-4 sm:p-8">
      <Link
        href="/search/form"
        className="inline-block mb-4 text-blue-800 hover:underline font-comic"
      >
        ← {getServerTranslation("searchPageLink")}
      </Link>

      <div className="w-full max-w-[800px] mx-auto mb-4">
        <table className="w-full border-spacing-[3px] border-separate">
          <tbody>
            <tr>
              <th className="bg-[lightgrey] text-center">
                <span className="font-comic text-sm sm:text-base">
                  {total} {getServerTranslation("records")}{" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {getServerTranslation("page")}: {currentPage} / {totalPages}
                </span>
              </th>
            </tr>
            <tr>
              <td className="text-center">
                <Link
                  href={`/search?${toggleShuffle()}`}
                  className="inline-block px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 font-['Comic_Sans_MS']"
                >
                  {getServerTranslation("shuffleResults")}
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-[800px] mx-auto overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 min-w-[640px]">
          <thead>
            <tr>
              <th className="bg-[slategray] text-[antiquewhite] p-2 w-[10%] border border-gray-400 font-['Comic_Sans_MS'] text-sm sm:text-base">
                {getServerTranslation("resultsCategory")}
              </th>
              <th className="bg-[slategray] text-[antiquewhite] p-2 w-[30%] border border-gray-400 font-['Comic_Sans_MS'] text-sm sm:text-base">
                {getServerTranslation("resultsTitle")}
              </th>
              <th className="bg-[slategray] text-[antiquewhite] p-2 w-[60%] border border-gray-400 font-['Comic_Sans_MS'] text-sm sm:text-base">
                {getServerTranslation("resultsIngredients")}
              </th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td className="bg-[moccasin] p-2 align-top border border-gray-400">
                  <span className="font-['Comic_Sans_MS'] text-black text-xs sm:text-sm">
                    {recipe.category.toLowerCase()}
                  </span>
                </td>
                <td className="bg-[moccasin] p-2 align-top border border-gray-400">
                  <Link
                    href={{
                      pathname: `/recipe/${recipe.id}`,
                      query: searchParams,
                    }}
                  >
                    <span className="font-['Comic_Sans_MS'] text-blue-600 text-xs sm:text-sm underline break-words">
                      {recipe.title}
                    </span>
                  </Link>
                </td>
                <td className="bg-[moccasin] p-2 align-top border border-gray-400">
                  <span className="font-['Comic_Sans_MS'] text-[saddlebrown] text-xs sm:text-sm whitespace-pre-line">
                    {recipe.ingredients}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-[800px] mx-auto mt-4">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      </div>
    </main>
  );
}
