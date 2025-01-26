"use client";

import { useRouter } from "next/navigation";

interface BackToSearchLinkProps {
  text: string;
  searchParams?: URLSearchParams | string;
}

export function BackToSearchLink({
  text,
  searchParams,
}: BackToSearchLinkProps) {
  const router = useRouter();

  const handleClick = () => {
    if (searchParams) {
      const queryString =
        typeof searchParams === "string"
          ? searchParams
          : searchParams.toString();
      router.push(`/search?${queryString}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <span
      className="font-comic text-lg underline cursor-pointer"
      onClick={handleClick}
    >
      {text}
    </span>
  );
}
