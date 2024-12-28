import { ApolloProvider } from '../components/ApolloProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  )
}

