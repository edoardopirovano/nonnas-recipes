import { SearchForm } from '../../../components/SearchForm'

export default function SearchFormPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Search Recipes
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Find the perfect Italian recipe by searching through our collection. 
        Filter by title, category, or ingredients.
      </p>
      <SearchForm />
    </main>
  )
} 