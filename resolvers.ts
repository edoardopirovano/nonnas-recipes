import { AppDataSource } from "./lib/db";
import { Recipe } from "./entities/Recipe";
import { decode } from "html-entities";
import { Like, FindOptionsWhere } from "typeorm";
import he from "he";

export const resolvers = {
  Query: {
    recipes: async (
      parent: unknown,
      args: { title?: string; category?: string; ingredients?: string }
    ): Promise<Recipe[]> => {
      const recipeRepository = AppDataSource.getRepository(Recipe);

      const whereClause: FindOptionsWhere<Recipe> = {};
      if (args.title)
        whereClause.title = Like(
          `%${he.encode(args.title, { decimal: true })}%`
        );
      if (args.category)
        whereClause.category = Like(
          `%${he.encode(args.category, { decimal: true })}%`
        );
      if (args.ingredients)
        whereClause.ingredients = Like(
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
  },
};
