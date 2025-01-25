import { AppDataSource, initDb } from "../../../lib/db";
import { Recipe } from "../../../entities/Recipe";
import { notFound } from "next/navigation";
import { RecipeView } from "@/components/RecipeView";

interface RecipePageProps {
  params: {
    id: string;
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
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

  return <RecipeView recipe={recipe} />;
}
