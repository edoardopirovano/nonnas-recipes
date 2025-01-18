import { AppDataSource } from "./lib/db";
import { Recipe } from "./entities/Recipe";
import { decode } from "html-entities";
import { ILike, FindOptionsWhere } from "typeorm";
import he from "he";
import { Visitors } from "./entities/Visitors";
import { trackVisitor } from "./lib/visitors";
import { LocationData } from "./types/locationData.types";

export const resolvers = {
  Query: {
    recipes: async (
      parent: unknown,
      args: { title?: string; category?: string; ingredients?: string }
    ): Promise<Recipe[]> => {
      const recipeRepository = AppDataSource.getRepository(Recipe);

      const whereClause: FindOptionsWhere<Recipe> = {};
      if (args.title)
        whereClause.title = ILike(
          `%${he.encode(args.title, { decimal: true })}%`
        );
      if (args.category)
        whereClause.category = ILike(
          `%${he.encode(args.category, { decimal: true })}%`
        );
      if (args.ingredients)
        whereClause.ingredients = ILike(
          `%${he.encode(args.ingredients, { decimal: true })}%`
        );

      const recipes = await recipeRepository.find({
        where: whereClause,
        order: {
          title: "ASC",
        },
      });

      return recipes.map((recipe) => ({
        ...recipe,
        title: decode(recipe.title),
        ingredients: decode(recipe.ingredients),
        instructions: decode(recipe.instructions),
      }));
    },
    stats: async () => {
      const recipeRepository = AppDataSource.getRepository(Recipe);
      const totalRecipes = await recipeRepository.count();
      const totalViews = await recipeRepository
        .createQueryBuilder("recipe")
        .select("SUM(recipe.views)", "total")
        .getRawOne();
      const visitorsRepository = AppDataSource.getRepository(Visitors);
      const visitorCount = await visitorsRepository
        .createQueryBuilder("visitors")
        .select("SUM(visitors.count)", "total")
        .getRawOne();
      return {
        totalRecipes,
        totalViews: parseInt(totalViews?.total || "0"),
        visitorCount: parseInt(visitorCount?.total || "0"),
      };
    },
    trackVisitor: async (
      parent: unknown,
      args: { locationData: LocationData }
    ): Promise<boolean> => {
      trackVisitor(args.locationData);
      return true;
    },
  },
};
