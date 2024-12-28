import 'reflect-metadata'
import { ApolloProvider } from '../components/ApolloProvider'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>Rosanna&apos;s Recipes</title>
      </head>
      <body>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  )
}

