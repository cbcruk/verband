import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useMeQuery, useLoginMutation, User } from '../../graphql/generated'
import { setToken, removeToken, getToken } from '../../lib/token'
import { apolloClient } from '../../lib/apollo-client'

export interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  const [user, setUser] = useState<User | null>(null)
  const hasToken = !!getToken()

  const { data, loading: meLoading } = useMeQuery({
    skip: !hasToken,
  })

  const [loginMutation, { loading: loginLoading }] = useLoginMutation()

  useEffect(() => {
    if (data?.me) {
      setUser(data.me)
    }
  }, [data])

  const login = useCallback(
    async (email: string, password: string) => {
      const result = await loginMutation({ variables: { email, password } })

      if (result.data?.login) {
        setToken(result.data.login.token)
        setUser(result.data.login.user)
      }
    },
    [loginMutation]
  )

  const logout = useCallback(() => {
    removeToken()
    setUser(null)
    apolloClient.clearStore()
  }, [])

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    loading: meLoading || loginLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
