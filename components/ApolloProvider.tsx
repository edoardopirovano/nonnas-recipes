'use client'

import { ApolloClient, InMemoryCache, ApolloProvider as BaseApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
})

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <BaseApolloProvider client={client}>{children}</BaseApolloProvider>
}

