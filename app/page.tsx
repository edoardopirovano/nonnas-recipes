import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">
        Nonna&apos;s Recipes
      </h1>
      <p className="text-xl mb-8 text-gray-600">
        Welcome to our collection of authentic Italian recipes, passed down through generations. 
        Find the perfect dish for any occasion, from traditional pasta dishes to delectable desserts.
      </p>
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8">
            <div className="p-4">
              <h3 className="font-semibold mb-2">Authentic Recipes</h3>
              <p className="text-gray-600">Traditional Italian recipes curated with love and expertise</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Easy to Follow</h3>
              <p className="text-gray-600">Step-by-step instructions for cooks of all skill levels</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Family Favorites</h3>
              <p className="text-gray-600">Time-tested recipes that bring families together</p>
            </div>
          </div>
        </div>
        <Link 
          href="/search/form" 
          className="inline-block bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
        >
          Find Your Perfect Recipe
        </Link>
      </div>
    </main>
  )
}

