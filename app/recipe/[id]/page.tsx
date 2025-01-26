import { AppDataSource, initDb } from "../../../lib/db";
import { Recipe } from "../../../entities/Recipe";
import { notFound } from "next/navigation";
import { getServerTranslation } from "@/utils/serverTranslation";
import { RandomImage } from "@/components/RandomImage";
import { BackToSearchLink } from "@/components/BackToSearchLink";
import Link from "next/link";
import { ColouredMain } from "@/components/ColouredContainer";
import { getSession } from "@auth0/nextjs-auth0";

interface RecipePageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function RecipePage({
  params,
  searchParams,
}: RecipePageProps) {
  await initDb();

  const recipe = await AppDataSource.getRepository(Recipe).findOne({
    where: { id: parseInt(params.id) },
    relations: ["translatedFrom", "createdBy"],
  });

  if (!recipe) {
    notFound();
  }

  const session = await getSession();
  const user = session?.user?.sub
    ? await AppDataSource.getRepository("user").findOne({
        where: { id: session.user.sub },
      })
    : null;

  await AppDataSource.getRepository(Recipe).increment(
    { id: recipe.id },
    "views",
    1
  );

  const formatSearchParams = (params: {
    [key: string]: string | string[] | undefined;
  }) => {
    return Object.entries(params)
      .filter(([key, value]) => value !== undefined && key !== "from")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  };

  const queryString = formatSearchParams(searchParams);

  return (
    <ColouredMain>
      <div className="max-w-[90%] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="hidden md:flex items-center justify-center w-[150px]">
            <RandomImage width={150} height={150} className="object-contain" />
          </div>
          <div className="text-center flex-1">
            <div className="font-comic italic">
              <strong>
                {getServerTranslation("recipe")} <br />
                {recipe.title}
              </strong>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center w-[150px]">
            <RandomImage width={150} height={150} className="object-contain" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row mt-12 gap-8">
          <div className="hidden md:flex md:w-[150px] items-start justify-center">
            <RandomImage width={150} height={150} className="object-contain" />
          </div>
          <div className="flex-1 space-y-6 font-comic">
            <div>
              <div className="italic">{getServerTranslation("category")}</div>
              <div className="text-sm">{recipe.category}</div>
            </div>

            <div>
              <div className="text-lg italic">
                {getServerTranslation("ingredients")}
              </div>
              <div className="text-sm whitespace-pre-wrap">
                {recipe.ingredients}
              </div>
            </div>

            <div>
              <div className="text-lg italic">
                {getServerTranslation("preparation")}
              </div>
              <div className="text-sm whitespace-pre-wrap">
                {recipe.instructions}
              </div>
            </div>

            {recipe.createdBy.name && (
              <div>
                <div className="text-lg italic">
                  {getServerTranslation("createdBy")}
                </div>
                <div className="text-s">{recipe.createdBy.name}</div>
              </div>
            )}

            <div>
              <div className="text-lg italic">
                {getServerTranslation("lastUpdate")}
              </div>
              <div className="text-s">
                {new Date(recipe.modifiedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="hidden md:flex md:w-[150px] items-start justify-center">
            <RandomImage width={150} height={150} className="object-contain" />
          </div>
        </div>

        <table className="w-full mx-auto mt-8">
          <tbody>
            <tr>
              {queryString && (
                <td className="text-center">
                  <BackToSearchLink
                    text={getServerTranslation("backToSearch")}
                    searchParams={queryString}
                  />
                </td>
              )}
              <td className="text-center">
                <Link
                  href="/search/form"
                  className="font-comic text-lg underline hover:text-orange-800"
                >
                  {getServerTranslation("searchPage")}
                </Link>
              </td>
              {user?.isAdmin && !recipe.translatedFrom && (
                <td className="text-center">
                  <Link
                    href={`/recipe/${recipe.id}/edit?${queryString}`}
                    className="font-comic text-lg underline hover:text-orange-800"
                  >
                    {getServerTranslation("edit")}
                  </Link>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </ColouredMain>
  );
}
