import Link from "next/link";
import { RandomImage } from "@/components/RandomImage";
import { DigitDisplay } from "@/components/DigitDisplay";
import Profile from "./profile/profile";

export default function Home() {
  return (
    <main className="min-h-screen p-8 flex flex-col items-center justify-center bg-[antiquewhite]">
      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl">
        <RandomImage width={150} height={150} className="w-full h-auto" />
        <RandomImage width={150} height={150} className="w-full h-auto" />
        <RandomImage width={150} height={150} className="w-full h-auto" />
        <RandomImage width={150} height={150} className="w-full h-auto" />
      </div>

      {/* Welcome Message */}
      <div className="max-w-4xl text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600 mb-6 font-comic">
          Benvenuti nel sito delle ricette di Rosanna!
        </h1>
        <p className="text-[mediumslateblue] italic mb-4">
          Un sito molto spartano che presenta tutte le ricette pazientemente
          digitate negli ultimi anni su un foglio Excel da Ros (la mia gentil
          Signora)
        </p>
        <p className="text-[mediumslateblue] italic mb-4">
          Le ricette sono state raccolte fra le più credibili, accattivanti e
          fattibili esposte da maestri gastronomici (Marchesi, Ravaioli, Santin,
          Mariola, Rugiati, Corelli, Vissani etc.) nel Gambero Rosso, Gusto,
          Mezzogiorno di cuoco, WEB e quant&apos;altri.
        </p>
        <p className="text-[mediumslateblue] italic">
          Le fotografie provengono dal catalogo FREE di{" "}
          <a
            href="http://www.photocuisine.com/"
            className="text-orange-600 hover:underline"
          >
            SucréSalé
          </a>
          .
        </p>
      </div>

      {/* Navigation Links */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 max-w-4xl w-full mb-8">
        <Link
          href="/search/form"
          className="text-red-600 hover:underline text-center font-comic italic"
        >
          Buona navigazione!
        </Link>
      </div>

      {/* Stats - Note: These would need to be dynamic in a real implementation */}
      <div className="flex flex-wrap justify-center gap-8 text-[mediumslateblue] font-comic mb-8">
        <div className="flex items-center gap-2">
          Visitatori: <DigitDisplay number={60059} />
        </div>
        <div className="flex items-center gap-2">
          Ricette visitate: <DigitDisplay number={8309} />
        </div>
        <div className="flex items-center gap-2">
          Ricette disponibili: <DigitDisplay number={4287} />
        </div>
      </div>
      <Profile />
    </main>
  );
}
