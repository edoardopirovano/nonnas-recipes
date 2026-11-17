import "reflect-metadata";
import "./globals.css";
import { Providers } from "./providers";
import { Comic_Neue } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { getServerLanguage } from "@/utils/serverTranslation";
import { CookiesProvider } from "next-client-cookies/server";

const comicFont = Comic_Neue({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-comic",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialLanguage = getServerLanguage();

  return (
    <html lang={initialLanguage} className={comicFont.variable}>
      <head>
        <meta charSet="UTF-8" />
        <title>Rosanna&apos;s Recipes</title>
        <GoogleAnalytics gaId="G-85J7W0VP2Z" />
      </head>
      <body>
        <CookiesProvider>
          <LanguageProvider initialLanguage={initialLanguage}>
            <Providers>{children}</Providers>
          </LanguageProvider>
        </CookiesProvider>
      </body>
    </html>
  );
}
