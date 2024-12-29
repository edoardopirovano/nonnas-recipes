import { AppDataSource } from "./lib/db"
import { Recipe } from "./entities/Recipe"
import { decode } from "html-entities"

export const resolvers = {
  Query: {
    recipes: async (): Promise<Recipe[]> => {
      const recipeRepository = AppDataSource.getRepository(Recipe)
      const recipes = await recipeRepository.find({
        order: {
          title: "ASC"
        }
      })
      return recipes.map(recipe => ({
        ...recipe,
        title: decode(recipe.title),
        ingredients: decode(recipe.ingredients),
        instructions: decode(recipe.instructions)
      }))
    },
  },
  Mutation: {
  },
}

