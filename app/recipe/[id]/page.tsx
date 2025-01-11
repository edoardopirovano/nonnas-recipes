import { AppDataSource } from '../../../lib/db'
import { Recipe } from '../../../entities/Recipe'
import { notFound } from 'next/navigation'

interface RecipePageProps {
  params: {
    id: string
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  await AppDataSource.initialize()
  
  const recipe = await AppDataSource.getRepository(Recipe).findOne({
    where: { id: parseInt(params.id) }
  })

  await AppDataSource.destroy()

  if (!recipe) {
    notFound()
  }

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{recipe.title}</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Category</h2>
        <p className="text-gray-700">{recipe.category}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <div className="whitespace-pre-wrap text-gray-700">
          {recipe.ingredients}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <div className="whitespace-pre-wrap text-gray-700">
          {recipe.instructions}
        </div>
      </div>
    </main>
  )
} 