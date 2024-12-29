import 'reflect-metadata'
import { createYoga } from 'graphql-yoga'
import { readFileSync } from 'fs'
import { join } from 'path'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from '../../../resolvers'
import { AppDataSource } from '../../../lib/db'

import { Plugin } from 'graphql-yoga'

const typeDefs = readFileSync(join(process.cwd(), 'schema.graphql'), 'utf8')

// Initialize database connection
const initDb = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
      console.log("Database connected successfully")
    }
  } catch (error) {
    console.error("Error connecting to database:", error)
    throw error
  }
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const useDb: Plugin = {
  async onRequest({ request, fetchAPI, endResponse }) {
    await initDb()
  }
}

const { handleRequest } = createYoga({
  schema,
  plugins: [useDb],
  fetchAPI: { Response },
})

export { handleRequest as GET, handleRequest as POST }

