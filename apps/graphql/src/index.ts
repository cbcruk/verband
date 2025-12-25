import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema/index.js'
import { resolvers } from './resolvers/index.js'
import { LayoutStore } from './data-sources/layout-store.js'
import { UserStore } from './data-sources/user-store.js'
import { extractToken, verifyToken } from './utils/auth.js'
import type { Context } from './types/context.js'

async function startServer() {
  const layoutStore = new LayoutStore()
  const userStore = new UserStore()

  layoutStore.seedSampleData()

  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const token = extractToken(req.headers.authorization)
      const payload = token ? verifyToken(token) : null

      return {
        dataSources: { layoutStore, userStore },
        userId: payload?.userId ?? null,
      }
    },
  })

  console.log(`Server ready at: ${url}`)
}

startServer()
