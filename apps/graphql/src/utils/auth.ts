import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'

const JWT_SECRET = 'your-secret-key-change-in-production'

export interface TokenPayload {
  userId: string
  email: string
}

export function createToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' })
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload
  } catch {
    return null
  }
}

export function extractToken(authHeader: string | undefined): string | null {
  if (!authHeader?.startsWith('Bearer ')) {
    return null
  }

  return authHeader.slice(7)
}

export function requireAuth(userId: string | null): asserts userId is string {
  if (!userId) {
    throw new GraphQLError('Authentication required', {
      extensions: { code: 'UNAUTHENTICATED' },
    })
  }
}
