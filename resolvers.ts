import { AppDataSource } from "./lib/db"
import { Recipe } from "./entities/Recipe"
import { decode } from "html-entities"

export const resolvers = {
  Query: {
    recipes: async (): Promise<Recipe[]> => {
      const recipeRepository = AppDataSource.getRepository(Recipe)
      const recipes = await recipeRepository.find({
        take: 100
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
    // addRecipe: async (
    //   _: any,
    //   { title, ingredients, instructions }: { title: string; ingredients: string; instructions: string }
    // ): Promise<Recipe> => {
    //   const recipeRepository = AppDataSource.getRepository(Recipe)
    //   const recipe = recipeRepository.create({ title, ingredients, instructions })
    //   return await recipeRepository.save(recipe)
    // },
    // deleteRecipe: async (_: any, { id }: { id: number }): Promise<boolean> => {
    //   const recipeRepository = AppDataSource.getRepository(Recipe)
    //   const result = await recipeRepository.delete(id)
    //   return (result.affected ?? 0) > 0
    // },
  },
}

