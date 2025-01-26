"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";

interface SearchFormProps {
  categories: string[];
  creators: string[];
}

export function SearchForm({ categories, creators }: SearchFormProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const allCategories = categories[0];
  const allCreators = creators[0];

  const [filters, setFilters] = useState({
    title: "",
    category: allCategories,
    creator: allCreators,
    ingredients: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== allCategories && value !== allCreators) {
        searchParams.append(key, encodeURIComponent(value));
      }
    });
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-[800px] mx-auto p-4"
    >
      <div className="flex items-start space-x-4 font-comic text-lg">
        <div className="whitespace-nowrap">{t("inCategory")}</div>
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
          className="w-full p-1"
        >
          {categories.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-start space-x-4 font-comic text-lg">
        <div className="whitespace-nowrap">{t("byCreator")}</div>
        <select
          value={filters.creator}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, creator: e.target.value }))
          }
          className="w-full p-1"
        >
          {creators.map((creator, i) => (
            <option key={i} value={creator}>
              {creator}
            </option>
          ))}
        </select>
      </div>

      <div className="font-comic text-lg">{t("containsWord")}</div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="bg-black text-[antiquewhite] p-2 font-comic text-lg whitespace-nowrap">
            {t("inTitle")}
          </div>
          <input
            type="text"
            value={filters.title}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-1"
            maxLength={120}
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-black text-[antiquewhite] p-2 font-comic text-lg whitespace-nowrap">
            {t("inIngredients")}
          </div>
          <input
            type="text"
            value={filters.ingredients}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, ingredients: e.target.value }))
            }
            className="w-full p-1"
            maxLength={120}
          />
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          className="px-8 py-2 bg-gray-200 hover:bg-gray-300 transition-colors"
        >
          {t("search")}
        </button>
      </div>
    </form>
  );
}
