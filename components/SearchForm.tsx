"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
  id: number;
  name: string;
};

interface SearchFormProps {
  categories: Category[];
}

export function SearchForm({ categories }: SearchFormProps) {
  const router = useRouter();
  const [filters, setFilters] = useState({
    title: "",
    category: "Tutte le categorie",
    ingredients: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "Tutte le categorie")
        searchParams.append(key, value);
    });
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-[800px] mx-auto p-4"
    >
      <div className="flex items-start space-x-4 font-comic text-lg">
        <div className="whitespace-nowrap">Nella categoria:</div>
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
          className="w-full p-1"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="font-comic text-lg">Che contiene la parola/frase:</div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="bg-black text-[antiquewhite] p-2 font-comic text-lg whitespace-nowrap">
            Nel titolo:
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
            Negli ingredienti:
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
          Ricerca
        </button>
      </div>
    </form>
  );
}
