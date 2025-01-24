"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface BackToSearchLinkProps {
  text: string;
}

export function BackToSearchLink({ text }: BackToSearchLinkProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());

  return (
    <Link
      href={`/search?${params.toString()}`}
      className="font-comic text-lg underline"
    >
      {text}
    </Link>
  );
}
