import { AppDataSource } from "./lib/db"
import { Recipe } from "./entities/Recipe"

export const resolvers = {
  Query: {
    recipes: async (): Promise<Recipe[]> => {
      const recipeRepository = AppDataSource.getRepository(Recipe)
      return await recipeRepository.find()
    },
  },
  Mutation: {
    addRecipe: async (
      _: any,
      { title, ingredients, instructions }: { title: string; ingredients: string; instructions: string }
    ): Promise<Recipe> => {
      const recipeRepository = AppDataSource.getRepository(Recipe)
      const recipe = recipeRepository.create({ title, ingredients, instructions })
      return await recipeRepository.save(recipe)
    },
    deleteRecipe: async (_: any, { id }: { id: number }): Promise<boolean> => {
      const recipeRepository = AppDataSource.getRepository(Recipe)
      const result = await recipeRepository.delete(id)
      return (result.affected ?? 0) > 0
    },
  },
}

