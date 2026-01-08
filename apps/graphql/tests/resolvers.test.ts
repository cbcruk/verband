import { describe, it, expect } from 'vitest'
import { resolvers } from '../src/resolvers'
import { createTestContext, createTestContextWithData } from './helpers'

describe('Query', () => {
  describe('layouts', () => {
    it('should return empty connection when no layouts', () => {
      const context = createTestContext()

      const result = resolvers.Query.layouts({}, {}, context)

      expect(result.edges).toHaveLength(0)
      expect(result.totalCount).toBe(0)
      expect(result.pageInfo.hasNextPage).toBe(false)
    })

    it('should return paginated layouts', () => {
      const context = createTestContextWithData()

      const result = resolvers.Query.layouts({}, { first: 1 }, context)

      expect(result.edges).toHaveLength(1)
      expect(result.totalCount).toBe(2)
      expect(result.pageInfo.hasNextPage).toBe(true)
    })
  })

  describe('layout', () => {
    it('should return layout by id', () => {
      const context = createTestContextWithData()

      const result = resolvers.Query.layout({}, { id: 'layout_1' }, context)

      expect(result).toBeDefined()
      expect(result?.name).toBe('Dashboard Layout')
    })

    it('should return null for non-existent id', () => {
      const context = createTestContextWithData()

      const result = resolvers.Query.layout({}, { id: 'invalid' }, context)

      expect(result).toBeNull()
    })
  })

  describe('me', () => {
    it('should return null when not authenticated', () => {
      const context = createTestContext(null)

      const result = resolvers.Query.me({}, {}, context)

      expect(result).toBeNull()
    })

    it('should return user when authenticated', () => {
      const context = createTestContext('user_1')

      const result = resolvers.Query.me({}, {}, context)

      expect(result).toBeDefined()
      expect(result?.email).toBe('admin@example.com')
    })
  })
})

describe('Mutation', () => {
  describe('login', () => {
    it('should return token for valid credentials', () => {
      const context = createTestContext()

      const result = resolvers.Mutation.login(
        {},
        { email: 'admin@example.com', password: 'admin123' },
        context
      )

      expect(result.token).toBeDefined()
      expect(result.user.email).toBe('admin@example.com')
    })

    it('should throw error for invalid credentials', () => {
      const context = createTestContext()

      expect(() =>
        resolvers.Mutation.login({}, { email: 'admin@example.com', password: 'wrong' }, context)
      ).toThrow('Invalid email or password')
    })
  })

  describe('createLayout', () => {
    it('should throw when not authenticated', () => {
      const context = createTestContext(null)
      const input = {
        name: 'Test',
        items: [{ i: 'a', x: 0, y: 0, w: 1, h: 1 }],
        config: { cols: 12, rowHeight: 50, gap: { row: 10, column: 10 } },
      }

      expect(() => resolvers.Mutation.createLayout({}, { input }, context)).toThrow(
        'Authentication required'
      )
    })

    it('should create layout when authenticated', () => {
      const context = createTestContext('user_1')
      const input = {
        name: 'New Layout',
        items: [{ i: 'box', x: 0, y: 0, w: 6, h: 2 }],
        config: { cols: 12, rowHeight: 50, gap: { row: 10, column: 10 } },
      }

      const result = resolvers.Mutation.createLayout({}, { input }, context)

      expect(result.id).toBeDefined()
      expect(result.name).toBe('New Layout')
    })

    it('should validate input', () => {
      const context = createTestContext('user_1')
      const input = {
        name: '',
        items: [{ i: 'a', x: 0, y: 0, w: 1, h: 1 }],
        config: { cols: 12, rowHeight: 50, gap: { row: 10, column: 10 } },
      }

      expect(() => resolvers.Mutation.createLayout({}, { input }, context)).toThrow(
        'name is required'
      )
    })
  })

  describe('deleteLayout', () => {
    it('should delete layout when authenticated', () => {
      const context = createTestContextWithData('user_1')

      const result = resolvers.Mutation.deleteLayout({}, { id: 'layout_1' }, context)

      expect(result.success).toBe(true)
      expect(result.id).toBe('layout_1')
    })

    it('should throw when layout not found', () => {
      const context = createTestContextWithData('user_1')

      expect(() => resolvers.Mutation.deleteLayout({}, { id: 'invalid' }, context)).toThrow(
        'Layout not found'
      )
    })
  })
})
