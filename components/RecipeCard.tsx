import Link from 'next/link'
import { Recipe } from '../entities/Recipe'

interface RecipeCardProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
        <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
        <p className="text-sm text-gray-600 mb-2">Category: {recipe.category}</p>
        <p className="text-sm text-gray-500 line-clamp-2">
          {recipe.ingredients.split('\n')[0]}...
        </p>
      </div>
    </Link>
  )
} 