import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { AuthContextValue } from '../components/auth/auth-provider'

export interface RouterContext {
  auth: AuthContextValue
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent(): React.ReactElement {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  )
}
