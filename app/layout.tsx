import 'reflect-metadata'
import { ApolloProvider } from '../components/ApolloProvider'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>Rosanna&apos;s Recipes</title>
        {(process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview") && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            data-recording-token="nOwUMoLXWiQJsMB9li28JOza8KdzQtUDQ9ZZ1Yl1"
            data-is-production-environment="false"
            src="https://snippet.meticulous.ai/v1/meticulous.js"
          />
        )}
      </head>
      <body>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  )
}

