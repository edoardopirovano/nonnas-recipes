"use client";

import Link from "next/link";
import { RandomImage } from "@/components/RandomImage";
import { DigitDisplay } from "@/components/DigitDisplay";
import Profile from "./profile/profile";
import { useTrackVisitor } from "@/hooks/useTrackVisitor";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "@/hooks/useTranslation";

const GET_STATS = gql`
  query Stats {
    stats {
      totalRecipes
      totalViews
      visitorCount
    }
  }
`;

export default function Home() {
  useTrackVisitor();
  const { data } = useQuery(GET_STATS);
  const { t } = useTranslation();

  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center bg-[antiquewhite] relative">
      <LanguageSelector />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl">
        <RandomImage width={150} height={150} className="w-full h-auto" />
        <RandomImage width={150} height={150} className="w-full h-auto" />
        <RandomImage width={150} height={150} className="w-full h-auto" />
        <RandomImage width={150} height={150} className="w-full h-auto" />
      </div>

      <div className="max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600 mb-6 font-comic">
          {t("welcome")}
        </h1>
        <p className="text-[mediumslateblue] italic mb-4">{t("description")}</p>
        <p className="text-[mediumslateblue] italic mb-4">
          {t("recipeSource")}
        </p>
        <p className="text-[mediumslateblue] italic">
          {t("photoCredit")}{" "}
          <a
            href="http://www.photocuisine.com/"
            className="text-orange-600 underline"
          >
            SucréSalé
          </a>
          .
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-4xl w-full mb-8">
        <Link
          href="/search/form"
          className="text-red-600 underline text-center font-comic italic"
        >
          {t("navigation")}
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-8 text-[mediumslateblue] font-comic mb-8">
        <div className="flex items-center gap-2">
          {t("visitors")}:{" "}
          <DigitDisplay number={data?.stats?.visitorCount || 0} />
        </div>
        <div className="flex items-center gap-2">
          {t("recipesViewed")}:{" "}
          <DigitDisplay number={data?.stats?.totalViews || 0} />
        </div>
        <div className="flex items-center gap-2">
          {t("recipesAvailable")}:{" "}
          <DigitDisplay number={data?.stats?.totalRecipes || 0} />
        </div>
      </div>
      <Profile />
    </main>
  );
}
