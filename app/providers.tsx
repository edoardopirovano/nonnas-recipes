"use client";

import { ApolloProvider } from "@/components/ApolloProvider";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <ApolloProvider>{children}</ApolloProvider>
    </UserProvider>
  );
};
