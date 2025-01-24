import { AppDataSource } from "../../lib/db";
import { Language, Recipe } from "../../entities/Recipe";
import { Like, FindOptionsWhere } from "typeorm";
import he from "he";
import { initDb } from "../../lib/db";
import { SearchResults } from "@/components/SearchResults";

interface SearchPageProps {
  searchParams: {
    title?: string;
    category?: string;
    ingredients?: string;
    page?: string;
    language?: string;
  };
}

const ITEMS_PER_PAGE = 15;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  await initDb();
  const { title, category, ingredients, page = "1", language } = searchParams;
  const currentPage = parseInt(page);

  const whereClause: FindOptionsWhere<Recipe> = {};
  if (title)
    whereClause.title = Like(`%${he.encode(title, { decimal: true })}%`);
  if (category)
    whereClause.category = Like(`%${he.encode(category, { decimal: true })}%`);
  if (ingredients)
    whereClause.ingredients = Like(
      `%${he.encode(ingredients, { decimal: true })}%`
    );
  if (language) whereClause.language = language as Language;

  const [recipes, total] = await AppDataSource.getRepository(
    Recipe
  ).findAndCount({
    where: whereClause,
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    order: { id: "DESC" },
  });

  await AppDataSource.destroy();

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <SearchResults
      recipes={recipes}
      total={total}
      currentPage={currentPage}
      totalPages={totalPages}
      searchParams={searchParams}
    />
  );
}
