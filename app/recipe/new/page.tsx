import { getSession } from "@auth0/nextjs-auth0";
import { AppDataSource, initDb } from "@/lib/db";
import { Recipe } from "@/entities/Recipe";
import { redirect } from "next/navigation";
import {
  getServerLanguage,
  getServerTranslation,
} from "@/utils/serverTranslation";
import { RandomImage } from "@/components/RandomImage";
import { ColouredMain } from "@/components/ColouredContainer";
import { EditRecipeForm } from "@/components/EditRecipeForm";

interface NewRecipePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function NewRecipePage({
  searchParams,
}: NewRecipePageProps) {
  await initDb();

  const session = await getSession();
  const user = session?.user?.sub
    ? await AppDataSource.getRepository("user").findOne({
        where: { id: session.user.sub },
      })
    : null;

  if (!user?.isAdmin) {
    redirect("/");
  }

  const categoriesQuery = await AppDataSource.getRepository(Recipe)
    .createQueryBuilder("recipe")
    .select("DISTINCT category")
    .where("language = :language", { language: getServerLanguage() })
    .orderBy("category", "ASC")
    .getRawMany();

  const categories = categoriesQuery.map((cat) => cat.category.toLowerCase());

  return (
    <ColouredMain bg="darkgreen" text="gold">
      <div className="max-w-[90%] mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="hidden md:flex items-center justify-center w-[150px]">
            <RandomImage width={150} height={150} className="object-contain" />
          </div>
          <div className="text-center flex-1">
            <div className="font-comic italic">
              <strong>{getServerTranslation("newRecipe")}</strong>
            </div>
          </div>
          <div className="hidden md:flex items-center justify-center w-[150px]">
            <RandomImage width={150} height={150} className="object-contain" />
          </div>
        </div>

        <EditRecipeForm
          title=""
          ingredients=""
          instructions=""
          category={categories[0] || ""}
          language={getServerLanguage()}
          categories={categories}
          searchParams={searchParams}
        />
      </div>
    </ColouredMain>
  );
}
