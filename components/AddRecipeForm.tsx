'use client'

import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"

const ADD_RECIPE = gql`
  mutation AddRecipe($title: String!, $ingredients: String!, $instructions: String!) {
    addRecipe(title: $title, ingredients: $ingredients, instructions: $instructions) {
      id
      title
    }
  }
`

export default function AddRecipeForm() {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')

  const [addRecipe] = useMutation(ADD_RECIPE, {
    refetchQueries: ['GetRecipes'],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addRecipe({ variables: { title, ingredients, instructions } })
    setTitle('')
    setIngredients('')
    setInstructions('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Recipe Title"
          required
        />
      </div>
      <div>
        <Textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients (one per line)"
          required
        />
      </div>
      <div>
        <Textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Instructions"
          required
        />
      </div>
      <Button type="submit">Add Recipe</Button>
    </form>
  )
}

