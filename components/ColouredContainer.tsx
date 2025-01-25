"use client";

import { useMemo } from "react";

const colourChoices = [
  ["firebrick", "greenyellow"],
  ["darkslateblue", "honeydew"],
  ["brown", "bisque"],
  ["cadetblue", "beige"],
  ["darkgoldenrod", "khaki"],
  ["forestgreen", "aliceblue"],
  ["darkblue", "gainsboro"],
  ["maroon", "orange"],
  ["darkmagenta", "blanchedalmond"],
  ["chocolate", "lightgrey"],
  ["red", "navajowhite"],
  ["darkred", "gold"],
  ["coral", "indigo"],
  ["darkgreen", "greenyellow"],
  ["crimson", "ghostwhite"],
];

export const ColouredMain = ({ children }: { children: React.ReactNode }) => {
  const { bg, text } = useMemo(() => {
    // Wrap this in a useMemo to avoid the colour changing on every render
    const randomIndex = Math.floor(Math.random() * colourChoices.length);
    const [bg, text] = colourChoices[randomIndex];
    return { bg, text };
  }, []);

  return (
    <main
      style={{ backgroundColor: bg, color: text }}
      className="min-h-screen p-8 flex flex-col items-center justify-center"
    >
      {children}
    </main>
  );
};
