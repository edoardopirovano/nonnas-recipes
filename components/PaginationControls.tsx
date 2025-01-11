'use client'

import Link from 'next/link'

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  searchParams: {
    title?: string
    category?: string
    ingredients?: string
    page?: string
  }
}

export function PaginationControls({ currentPage, totalPages, searchParams }: PaginationControlsProps) {
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams()
    if (searchParams.title) params.set('title', searchParams.title)
    if (searchParams.category) params.set('category', searchParams.category)
    if (searchParams.ingredients) params.set('ingredients', searchParams.ingredients)
    params.set('page', pageNumber.toString())
    return `/search?${params.toString()}`
  }

  return (
    <div className="flex justify-center items-center gap-2">
      {currentPage > 1 && (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Previous
        </Link>
      )}
      
      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      
      {currentPage < totalPages && (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          Next
        </Link>
      )}
    </div>
  )
} 