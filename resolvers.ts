import { getRepository } from "typeorm"
import { Recipe } from "./entities/Recipe"

export const resolvers = {
  Query: {
    recipes: async () => {
      const recipeRepository = getRepository(Recipe)
      return await recipeRepository.find()
    },
  },
  Mutation: {
    addRecipe: async (_, { title, ingredients, instructions }) => {
      const recipeRepository = getRepository(Recipe)
      const recipe = recipeRepository.create({ title, ingredients, instructions })
      await recipeRepository.save(recipe)
      return recipe
    },
    deleteRecipe: async (_, { id }) => {
      const recipeRepository = getRepository(Recipe)
      const result = await recipeRepository.delete(id)
      return result.affected > 0
    },
  },
}

