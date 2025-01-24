"use client";

import { PaginationControls } from "@/components/PaginationControls";
import Link from "next/link";
import he from "he";
import { useTranslation } from "@/hooks/useTranslation";
import { Recipe } from "@/entities/Recipe";

interface SearchResultsProps {
  recipes: Recipe[];
  total: number;
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: string | undefined };
}

export function SearchResults({
  recipes,
  total,
  currentPage,
  totalPages,
  searchParams,
}: SearchResultsProps) {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[lightgrey] p-8">
      <table className="w-[800px] mx-auto mb-4">
        <tbody>
          <tr>
            <td className="text-left">
              <Link
                href="/search/form"
                className="font-comic text-sm underline"
              >
                <h4>{t("searchPageLink")}</h4>
              </Link>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="w-[800px] mx-auto mb-4 border-spacing-[3px] border-separate">
        <tbody>
          <tr>
            <th className="bg-[lightgrey] text-center">
              <span className="font-comic">
                {total} {t("records")} &nbsp;&nbsp;&nbsp;&nbsp;
                {t("page")}: {currentPage} / {totalPages}
              </span>
            </th>
          </tr>
        </tbody>
      </table>

      <div className="w-[800px] mx-auto">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="bg-[slategray] text-[antiquewhite] p-2 w-[10%] border border-gray-400 font-['Comic_Sans_MS']">
                {t("resultsCategory")}
              </th>
              <th className="bg-[slategray] text-[antiquewhite] p-2 w-[30%] border border-gray-400 font-['Comic_Sans_MS']">
                {t("resultsTitle")}
              </th>
              <th className="bg-[slategray] text-[antiquewhite] p-2 w-[60%] border border-gray-400 font-['Comic_Sans_MS']">
                {t("resultsIngredients")}
              </th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((recipe) => (
              <tr key={recipe.id}>
                <td className="bg-[moccasin] p-2 align-top border border-gray-400">
                  <span className="font-['Comic_Sans_MS'] text-black text-sm">
                    {he.decode(recipe.category.toLowerCase())}
                  </span>
                </td>
                <td className="bg-[moccasin] p-2 align-top border border-gray-400">
                  <Link href={`/recipe/${recipe.id}`}>
                    <span className="font-['Comic_Sans_MS'] text-blue-600 text-sm underline">
                      {he.decode(recipe.title)}
                    </span>
                  </Link>
                </td>
                <td className="bg-[moccasin] p-2 align-top border border-gray-400">
                  <span className="font-['Comic_Sans_MS'] text-[saddlebrown] text-sm whitespace-pre-line">
                    {he.decode(recipe.ingredients)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-[800px] mx-auto mt-4">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={searchParams}
        />
      </div>
    </div>
  );
}
