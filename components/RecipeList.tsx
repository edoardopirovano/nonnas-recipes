'use client'

import { useQuery, gql } from '@apollo/client'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

const GET_RECIPES = gql`
  query GetRecipes {
    recipes {
      id
      title
      ingredients
      instructions
      createdAt
    }
  }
`

interface Recipe {
  id: string
  title: string
  ingredients: string
  instructions: string
  createdAt: string
}

export default function RecipeList() {
  const { loading, error, data } = useQuery(GET_RECIPES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="space-y-4">
      {data.recipes.map((recipe: Recipe) => (
        <Card key={recipe.id}>
          <CardHeader>
            <CardTitle>{recipe.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold">Ingredients:</h3>
            <p className="whitespace-pre-line">{recipe.ingredients}</p>
            <h3 className="font-semibold mt-2">Instructions:</h3>
            <p className="whitespace-pre-line">{recipe.instructions}</p>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

