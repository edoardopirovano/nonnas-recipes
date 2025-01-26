import { NextResponse } from "next/server";
import { AppDataSource, initDb } from "@/lib/db";
import { Recipe } from "@/entities/Recipe";
import { getSession } from "@auth0/nextjs-auth0";

export async function POST(request: Request) {
  try {
    await initDb();

    const session = await getSession();
    if (!session?.user?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await AppDataSource.getRepository("user").findOne({
      where: { id: session.user.sub },
    });

    if (!user?.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();

    const recipe = AppDataSource.getRepository(Recipe).create({
      category: body.category,
      title: body.title,
      ingredients: body.ingredients,
      instructions: body.instructions,
      language: body.language,
      modifiedAt: new Date(),
      createdAt: new Date(),
      views: 0,
      translateTo: ["en", "it", "ja"]
        .filter((lang) => lang !== body.language)
        .join(","),
    });

    await AppDataSource.getRepository(Recipe).save(recipe);

    return NextResponse.json({ id: recipe.id });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 }
    );
  }
}
