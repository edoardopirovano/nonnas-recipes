import "reflect-metadata";
import { createYoga } from "graphql-yoga";
import { readFileSync } from "fs";
import { join } from "path";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers } from "../../../resolvers";
import { initDb } from "../../../lib/db";

import { Plugin } from "graphql-yoga";

const typeDefs = readFileSync(join(process.cwd(), "schema.graphql"), "utf8");

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const useDb: Plugin = {
  async onRequest() {
    await initDb();
  },
};

const { handleRequest } = createYoga({
  schema,
  plugins: [useDb],
  fetchAPI: { Response },
});

export { handleRequest as GET, handleRequest as POST };
