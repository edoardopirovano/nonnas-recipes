import { AppDataSource, initDb } from "../../../lib/db";
import { Recipe } from "../../../entities/Recipe";
import { notFound } from "next/navigation";
import { getServerTranslation } from "@/utils/serverTranslation";
import { RandomImage } from "@/components/RandomImage";
import he from "he";
import { BackToSearchLink } from "@/components/BackToSearchLink";
import { Link } from "lucide-react";

interface RecipePageProps {
  params: {
    id: string;
  };
}

const colorChoices = [
  ["firebrick", "greenyellow"],
  ["darkslateblue", "honeydew"],
  ["brown", "bisque"],
  ["cadetblue", "beige"],
  ["darkgoldenrod", "khaki"],
  ["forestgreen", "aliceblue"],
  ["darkblue", "gainsboro"],
  ["maroon", "orange"],
  ["darkmagenta", "blanchedalmond"],
  ["chocolate", "lightgrey"],
  ["red", "navajowhite"],
  ["darkred", "gold"],
  ["coral", "indigo"],
  ["darkgreen", "greenyellow"],
  ["crimson", "ghostwhite"],
];

export default async function RecipePage({ params }: RecipePageProps) {
  const randomIndex = Math.floor(Math.random() * colorChoices.length);
  const [bg, text] = colorChoices[randomIndex];

  await initDb();

  const recipe = await AppDataSource.getRepository(Recipe).findOne({
    where: { id: parseInt(params.id) },
  });

  if (!recipe) {
    notFound();
  }

  await AppDataSource.getRepository(Recipe).increment(
    { id: recipe.id },
    "views",
    1
  );

  return (
    <main
      style={{ backgroundColor: bg, color: text }}
      className="min-h-screen p-8 flex flex-col items-center justify-center"
    >
      <div className="max-w-[90%] mx-auto">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="w-1/4 text-center">
                <RandomImage
                  width={150}
                  height={150}
                  className="w-auto h-auto"
                />
              </td>
              <td className="w-1/2">
                <div className="font-comic italic">
                  <strong>
                    {getServerTranslation("recipe")} <br />
                    {he.decode(recipe.title)}
                  </strong>
                </div>
              </td>
              <td className="w-1/4 text-center">
                <RandomImage
                  width={150}
                  height={150}
                  className="w-auto h-auto"
                />
              </td>
            </tr>

            <tr>
              <td className="w-1/4 text-center">
                <RandomImage
                  width={150}
                  height={150}
                  className="w-auto h-auto"
                />
              </td>
              <td>
                <div className="space-y-6 font-comic">
                  <div>
                    <div className="italic">
                      {getServerTranslation("category")}
                    </div>
                    <div className="text-sm">{he.decode(recipe.category)}</div>
                  </div>

                  <div>
                    <div className="text-lg italic">
                      {getServerTranslation("ingredients")}
                    </div>
                    <div className="text-sm whitespace-pre-wrap">
                      {he.decode(recipe.ingredients)}
                    </div>
                  </div>

                  <div>
                    <div className="text-lg italic">
                      {getServerTranslation("preparation")}
                    </div>
                    <div className="text-sm whitespace-pre-wrap">
                      {he.decode(recipe.instructions)}
                    </div>
                  </div>

                  <div>
                    <div className="text-lg italic">
                      {getServerTranslation("lastUpdate")}
                    </div>
                    <div className="text-xs">
                      {new Date(recipe.createdAt).toLocaleDateString(
                        recipe.language === "ja"
                          ? "ja-JP"
                          : recipe.language === "it"
                          ? "it-IT"
                          : "en-GB"
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="w-1/4 text-center">
                <RandomImage
                  width={150}
                  height={150}
                  className="w-auto h-auto"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <table className="w-[800px] mx-auto mt-8">
          <tbody>
            <tr>
              <td className="text-center">
                <BackToSearchLink text={getServerTranslation("backToSearch")} />
              </td>
              <td className="text-center">
                <Link
                  href="/search/form"
                  className="font-comic text-lg underline"
                >
                  {getServerTranslation("searchPage")}
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
