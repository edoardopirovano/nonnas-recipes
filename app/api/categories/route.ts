import { NextResponse } from "next/server";
import { AppDataSource, initDb } from "@/lib/db";
import { Recipe } from "@/entities/Recipe";

export async function GET() {
  try {
    await initDb();

    const categories = await AppDataSource.getRepository(Recipe)
      .createQueryBuilder("recipe")
      .select("DISTINCT recipe.category", "category")
      .orderBy("recipe.category", "ASC")
      .getRawMany();

    const formattedCategories = [
      { id: 1, name: "Tutte le categorie" },
      ...categories.map((cat, index) => ({
        id: index + 2,
        name: cat.category.toLowerCase(),
      })),
    ];

    return NextResponse.json(formattedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
