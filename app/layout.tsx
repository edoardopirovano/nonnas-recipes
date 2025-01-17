import "reflect-metadata";
import "./globals.css";
import { Providers } from "./providers";
import { Comic_Neue } from "next/font/google";

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
  return (
    <html lang="en" className={comicFont.variable}>
      <head>
        <meta charSet="UTF-8" />
        <title>Rosanna&apos;s Recipes</title>
        {
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            data-recording-token="nOwUMoLXWiQJsMB9li28JOza8KdzQtUDQ9ZZ1Yl1"
            data-is-production-environment="false"
            src="https://snippet.meticulous.ai/v1/meticulous.js"
          />
        }
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
