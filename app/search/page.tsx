import { AppDataSource } from '../../lib/db'
import { Recipe } from '../../entities/Recipe'
import { RecipeCard } from '../../components/RecipeCard'
import { Like, FindOptionsWhere } from 'typeorm'
import { PaginationControls } from '../../components/PaginationControls'

interface SearchPageProps {
  searchParams: {
    title?: string
    category?: string
    ingredients?: string
    page?: string
  }
}

const ITEMS_PER_PAGE = 20

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { title, category, ingredients, page = '1' } = searchParams
  const currentPage = parseInt(page)
  
  await AppDataSource.initialize()
  
  const whereClause: FindOptionsWhere<Recipe> = {}
  if (title) whereClause.title = Like(`%${title}%`)
  if (category) whereClause.category = Like(`%${category}%`)
  if (ingredients) whereClause.ingredients = Like(`%${ingredients}%`)

  const [recipes, total] = await AppDataSource.getRepository(Recipe).findAndCount({
    where: whereClause,
    order: { createdAt: 'DESC' },
    take: ITEMS_PER_PAGE,
    skip: (currentPage - 1) * ITEMS_PER_PAGE
  })

  await AppDataSource.destroy()

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Search Results</h1>
      {recipes.length === 0 ? (
        <p className="text-center text-gray-500">No recipes found matching your criteria.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          <div className="mt-8">
            <PaginationControls 
              currentPage={currentPage} 
              totalPages={totalPages}
              searchParams={searchParams}
            />
          </div>
        </>
      )}
    </main>
  )
} 