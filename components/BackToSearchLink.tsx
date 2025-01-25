"use client";

import { useRouter } from "next/navigation";

interface BackToSearchLinkProps {
  text: string;
}

export function BackToSearchLink({ text }: BackToSearchLinkProps) {
  const router = useRouter();

  return (
    <span
      className="font-comic text-lg underline cursor-pointer"
      onClick={() => router.back()}
    >
      {text}
    </span>
  );
}
