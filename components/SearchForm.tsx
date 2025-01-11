'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function SearchForm() {
  const router = useRouter()
  const [filters, setFilters] = useState({
    title: '',
    category: '',
    ingredients: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const searchParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) searchParams.append(key, value)
    })
    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto p-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Recipe Title
        </label>
        <input
          type="text"
          id="title"
          value={filters.title}
          onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium">
          Category
        </label>
        <input
          type="text"
          id="category"
          value={filters.category}
          onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          className="mt-1 block w-full rounded-md border p-2"
        />
      </div>

      <div>
        <label htmlFor="ingredients" className="block text-sm font-medium">
          Ingredients
        </label>
        <input
          type="text"
          id="ingredients"
          value={filters.ingredients}
          onChange={(e) => setFilters(prev => ({ ...prev, ingredients: e.target.value }))}
          className="mt-1 block w-full rounded-md border p-2"
          placeholder="Search by ingredients..."
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Search Recipes
      </button>
    </form>
  )
} 