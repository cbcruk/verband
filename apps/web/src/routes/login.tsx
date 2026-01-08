import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginForm } from '../components/auth/login-form'

export const Route = createFileRoute('/login')({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' })
    }
  },
  component: LoginPage,
})

function LoginPage(): React.ReactElement {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Login</h1>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-gray-500">
          Demo credentials: admin@example.com / admin123
        </p>
      </div>
    </div>
  )
}
