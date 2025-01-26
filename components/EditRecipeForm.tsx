"use client";

import { Language } from "@/entities/Recipe";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

interface EditRecipeFormProps {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  category: string;
  language: Language;
  categories: string[];
  searchParams: { [key: string]: string | string[] | undefined };
}

export function EditRecipeForm({
  id,
  title,
  ingredients,
  instructions,
  category,
  language,
  categories,
  searchParams,
}: EditRecipeFormProps) {
  const { t } = useTranslation();

  const formatSearchParams = (params: {
    [key: string]: string | string[] | undefined;
  }) => {
    return Object.entries(params)
      .filter(([key, value]) => value !== undefined && key !== "from")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  };

  const queryString = formatSearchParams(searchParams);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const updatedRecipe = {
      category: formData.get("category"),
      title: formData.get("title"),
      ingredients: formData.get("ingredients"),
      instructions: formData.get("instructions"),
      language: language,
    };

    await fetch(`/api/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecipe),
    });

    window.location.href = `/recipe/${id}?${queryString}`;
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6 font-comic">
          <div>
            <div className="italic">{t("category")}</div>
            <select
              name="category"
              defaultValue={category}
              className="w-full p-2 border border-gray-300 rounded font-comic"
            >
              {categories.map((c, i) => (
                <option key={i} value={c} selected={c === category}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="italic">{t("recipe")}</div>
            <input
              type="text"
              name="title"
              defaultValue={title}
              className="w-full p-2 border border-gray-300 rounded font-comic"
            />
          </div>

          <div>
            <div className="text-lg italic">{t("ingredients")}</div>
            <textarea
              name="ingredients"
              defaultValue={ingredients}
              rows={10}
              className="w-full p-2 border border-gray-300 rounded font-comic"
            />
          </div>

          <div>
            <div className="text-lg italic">{t("preparation")}</div>
            <textarea
              name="instructions"
              defaultValue={instructions}
              rows={10}
              className="w-full p-2 border border-gray-300 rounded font-comic"
            />
          </div>
        </div>
      </div>

      <table className="w-full mx-auto mt-8">
        <tbody>
          <tr>
            <td className="text-center">
              <Link
                href={`/recipe/${id}?${queryString}`}
                className="font-comic text-lg underline hover:text-orange-800"
              >
                {t("cancel")}
              </Link>
            </td>
            <td className="text-center">
              <button
                type="submit"
                className="font-comic text-lg underline hover:text-orange-800"
              >
                {t("save")}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}
