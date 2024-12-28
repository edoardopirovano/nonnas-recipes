'use client'

import { useQuery, useMutation, gql } from '@apollo/client'
import { Button } from "@/components/ui/button"
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

const DELETE_RECIPE = gql`
  mutation DeleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
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
  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    refetchQueries: ['GetRecipes'],
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  const handleDelete = async (id: string) => {
    await deleteRecipe({ variables: { id } })
  }

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
            <Button variant="destructive" onClick={() => handleDelete(recipe.id)}>Delete</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

