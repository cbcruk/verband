import { createFileRoute, redirect, Link } from '@tanstack/react-router'
import { useAuth } from '../hooks/use-auth'
import { LayoutDetail } from '../components/layouts/layout-detail'

export const Route = createFileRoute('/layout/$id')({
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated && !context.auth.loading) {
      throw redirect({ to: '/login' })
    }
  },
  component: LayoutPage,
})

function LayoutPage(): React.ReactElement {
  const { id } = Route.useParams()
  const { user, logout, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold text-gray-900">
            Verband
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <button
              onClick={logout}
              className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="text-sm text-blue-600 hover:text-blue-800">
            ← Back to layouts
          </Link>
        </div>
        <LayoutDetail id={id} />
      </main>
    </div>
  )
}
