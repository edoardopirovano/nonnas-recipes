"use client";

import { useRouter } from "next/navigation";

export function BackToSearchLink() {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <a
      href="#"
      onClick={handleClick}
      className="font-comic text-lg text-[honeydew] hover:underline"
    >
      Ritorna alla lista
    </a>
  );
}
