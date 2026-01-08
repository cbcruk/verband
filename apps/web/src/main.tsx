import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { apolloClient } from './lib/apollo-client'
import { AuthProvider, useAuthContext } from './components/auth/auth-provider'
import { routeTree } from './routeTree.gen'
import './index.css'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  context: {
    auth: undefined!,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function InnerApp(): React.ReactElement {
  const auth = useAuthContext()
  return <RouterProvider router={router} context={{ auth }} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
)
