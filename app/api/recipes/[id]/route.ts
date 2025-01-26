import { NextResponse } from "next/server";
import { AppDataSource, initDb } from "@/lib/db";
import { Language, Recipe } from "@/entities/Recipe";
import { getSession } from "@auth0/nextjs-auth0";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const recipe = await AppDataSource.getRepository(Recipe).findOne({
      where: { id: parseInt(params.id) },
      relations: ["translatedFrom"],
    });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (recipe.translatedFrom) {
      return NextResponse.json(
        { error: "Cannot edit translated recipes" },
        { status: 403 }
      );
    }

    const body = await request.json();

    await AppDataSource.getRepository(Recipe).update(
      { id: recipe.id },
      {
        category: body.category,
        title: body.title,
        ingredients: body.ingredients,
        instructions: body.instructions,
        language: body.language,
        translateTo: ["en", "it", "ja"]
          .filter((lang) => lang !== body.language)
          .join(","),
        modifiedAt: new Date(),
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const recipe = await AppDataSource.getRepository(Recipe).findOne({
      where: { id: parseInt(params.id) },
      relations: ["translatedFrom"],
    });

    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    if (recipe.translatedFrom) {
      return NextResponse.json(
        { error: "Cannot delete translated recipes" },
        { status: 403 }
      );
    }

    // Delete all translations of this recipe
    await AppDataSource.getRepository(Recipe).delete({
      translatedFrom: { id: recipe.id },
    });

    // Delete the recipe itself
    await AppDataSource.getRepository(Recipe).delete({
      id: recipe.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.json(
      { error: "Failed to delete recipe" },
      { status: 500 }
    );
  }
}
