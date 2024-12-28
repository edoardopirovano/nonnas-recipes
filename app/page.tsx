import RecipeList from '../components/RecipeList'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Rosanna&apos;s Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Recipes</h2>
          <RecipeList />
        </div>
      </div>
    </main>
  )
}

