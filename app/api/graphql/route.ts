import { createYoga } from 'graphql-yoga'
import { readFileSync } from 'fs'
import { join } from 'path'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { resolvers } from '../../../resolvers'
import { initializeDatabase } from '../../../lib/db'

const typeDefs = readFileSync(join(process.cwd(), 'schema.graphql'), 'utf8')

initializeDatabase()

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const { handleRequest } = createYoga({
  schema,
  fetchAPI: { Response },
})

export { handleRequest as GET, handleRequest as POST }

