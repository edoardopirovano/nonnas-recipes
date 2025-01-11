import { AppDataSource } from "../../../lib/db";
import { Recipe } from "../../../entities/Recipe";
import { notFound } from "next/navigation";
import { RandomImage } from "@/components/RandomImage";
import Link from "next/link";
import { BackToSearchLink } from "@/components/BackToSearchLink";
import he from "he";

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  await AppDataSource.initialize();

  const recipe = await AppDataSource.getRepository(Recipe).findOne({
    where: { id: parseInt(params.id) },
  });

  await AppDataSource.destroy();

  if (!recipe) {
    notFound();
  }

  return (
    <main className="min-h-screen p-8 bg-[darkslateblue]">
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
                <div className="font-comic italic text-[honeydew]">
                  <strong>
                    Ricetta: <br />
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
                <div className="space-y-6 text-[honeydew] font-comic">
                  <div>
                    <div className="italic">Categoria:</div>
                    <div className="text-sm">{he.decode(recipe.category)}</div>
                  </div>

                  <div>
                    <div className="text-lg italic">Ingredienti:</div>
                    <div className="text-sm whitespace-pre-wrap">
                      {he.decode(recipe.ingredients)}
                    </div>
                  </div>

                  <div>
                    <div className="text-lg italic">Preparazione:</div>
                    <div className="text-sm whitespace-pre-wrap">
                      {he.decode(recipe.instructions)}
                    </div>
                  </div>

                  <div>
                    <div className="text-lg italic">
                      Data ultimo aggiornamento:
                    </div>
                    <div className="text-xs">
                      {new Date(recipe.createdAt).toLocaleDateString("it-IT")}
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
                <BackToSearchLink />
              </td>
              <td className="text-center">
                <Link
                  href="/search/form"
                  className="font-comic text-lg text-[honeydew] hover:underline"
                >
                  Pagina di ricerca
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
