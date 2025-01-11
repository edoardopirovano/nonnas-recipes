"use client";

import Link from "next/link";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  searchParams: {
    title?: string;
    category?: string;
    ingredients?: string;
  };
}

export function PaginationControls({
  currentPage,
  totalPages,
  searchParams,
}: PaginationControlsProps) {
  const createQueryString = (page: number) => {
    const params = new URLSearchParams();
    if (searchParams.title) params.set("title", searchParams.title);
    if (searchParams.category) params.set("category", searchParams.category);
    if (searchParams.ingredients)
      params.set("ingredients", searchParams.ingredients);
    params.set("page", page.toString());
    return params.toString();
  };

  return (
    <div className="flex justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={`/search?${createQueryString(currentPage - 1)}`}
          className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 font-['Comic_Sans_MS']"
        >
          {"<"}
        </Link>
      )}
      {currentPage < totalPages && (
        <Link
          href={`/search?${createQueryString(currentPage + 1)}`}
          className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 font-['Comic_Sans_MS']"
        >
          {">"}
        </Link>
      )}
      {currentPage < totalPages - 1 && (
        <Link
          href={`/search?${createQueryString(totalPages)}`}
          className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 font-['Comic_Sans_MS']"
        >
          {">>"}
        </Link>
      )}
    </div>
  );
}
