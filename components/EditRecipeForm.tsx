"use client";

import { Language } from "@/entities/Recipe";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";

interface EditRecipeFormProps {
  id?: number;
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
  const [categoryMode, setCategoryMode] = useState("existing");

  const formatSearchParams = (params: {
    [key: string]: string | string[] | undefined;
  }) => {
    return Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  };

  const queryString = formatSearchParams(searchParams);

  const handleDelete = async () => {
    if (!id || !window.confirm(t("deleteConfirmation"))) return;

    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      window.location.href = `/search/form?${queryString}`;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const categoryMode = formData.get("categoryMode");

    const recipeData = {
      category:
        categoryMode === "existing"
          ? formData.get("existingCategory")
          : formData.get("newCategory"),
      title: formData.get("title"),
      ingredients: formData.get("ingredients"),
      instructions: formData.get("instructions"),
      language: formData.get("language") as Language,
    };

    const response = await fetch(
      id ? `/api/recipes/${id}` : "/api/recipes/new",
      {
        method: id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      }
    );

    const data = await response.json();
    if (response.ok) {
      window.location.href = `/recipe/${id || data.id}?${queryString}`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6 font-comic">
          <div>
            <div className="italic">{t("category")}</div>
            <div className="space-y-2">
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="categoryMode"
                    value="existing"
                    defaultChecked={true}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setCategoryMode("existing");
                      }
                    }}
                    className="mr-2"
                  />
                  {t("existingCategory")}
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="categoryMode"
                    value="new"
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setCategoryMode("new");
                      }
                    }}
                    className="mr-2"
                  />
                  {t("newCategory")}
                </label>
              </div>
              <div className="category-inputs">
                <select
                  name="existingCategory"
                  defaultValue={
                    categories.includes(category) ? category : categories[0]
                  }
                  className="w-full p-2 border border-gray-300 rounded font-comic"
                  style={{
                    display: categoryMode === "existing" ? "block" : "none",
                  }}
                >
                  {categories.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="newCategory"
                  defaultValue={!categories.includes(category) ? category : ""}
                  className="w-full p-2 border border-gray-300 rounded font-comic"
                  style={{
                    display: categoryMode === "new" ? "block" : "none",
                  }}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="italic">{t("language")}</div>
            <select
              name="language"
              defaultValue={language}
              className="w-full p-2 border border-gray-300 rounded font-comic"
            >
              <option value="en">English</option>
              <option value="it">Italiano</option>
              <option value="ja">日本語</option>
            </select>
          </div>

          <div>
            <div className="italic">{t("title")}</div>
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
              rows={3}
              className="w-full p-2 border border-gray-300 rounded font-comic"
            />
          </div>

          <div>
            <div className="text-lg italic">{t("preparation")}</div>
            <textarea
              name="instructions"
              defaultValue={instructions}
              rows={5}
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
                href={id ? `/recipe/${id}?${queryString}` : "/search/form"}
                className="font-comic text-lg underline hover:text-orange-800"
              >
                {t("cancel")}
              </Link>
            </td>
            {id && (
              <td className="text-center">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="font-comic text-lg underline hover:text-orange-800 text-red-600"
                >
                  {t("delete")}
                </button>
              </td>
            )}
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
