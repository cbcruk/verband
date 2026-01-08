import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'
import { LayoutConverter } from '@verband/core'
import type { Resolvers } from '../types/generated'
import { CreateLayoutInputSchema, UpdateLayoutInputSchema, validate } from '../validations/layout'
import { createToken, requireAuth } from '../utils/auth'

function notFoundError(id: string): never {
  throw new GraphQLError(`Layout not found: ${id}`, {
    extensions: { code: 'NOT_FOUND', argumentName: 'id' },
  })
}

function invalidCredentials(): never {
  throw new GraphQLError('Invalid email or password', {
    extensions: { code: 'UNAUTHENTICATED' },
  })
}

const YogaDimension = new GraphQLScalarType({
  name: 'YogaDimension',
  description: 'Yoga dimension value - number or "auto"',
  serialize(value) {
    return value
  },
  parseValue(value) {
    return value
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10)
    }

    if (ast.kind === Kind.STRING && ast.value === 'auto') {
      return 'auto'
    }

    return null
  },
})

export const resolvers: Resolvers = {
  YogaDimension,
  SavedLayout: {
    createdAt: (parent) => parent.createdAt.toISOString(),
    updatedAt: (parent) => parent.updatedAt.toISOString(),
  },
  Query: {
    me: (_, __, { dataSources, userId }) => {
      if (!userId) return null

      return dataSources.userStore.findById(userId) ?? null
    },
    layouts: (_, args, { dataSources }) => {
      return dataSources.layoutStore.findPaginated({
        first: args.first ?? undefined,
        after: args.after ?? undefined,
        last: args.last ?? undefined,
        before: args.before ?? undefined,
      })
    },
    layout: (_, { id }, { dataSources }) => {
      return dataSources.layoutStore.findById(id) ?? null
    },
    layoutToFlexbox: (_, { id }, { dataSources }) => {
      const layout = dataSources.layoutStore.findById(id)

      if (!layout) notFoundError(id)

      const converter = new LayoutConverter(layout.items, layout.config)

      return converter.toFlexbox()
    },
    layoutToCSSGrid: (_, { id }, { dataSources }) => {
      const layout = dataSources.layoutStore.findById(id)

      if (!layout) notFoundError(id)

      const converter = new LayoutConverter(layout.items, layout.config)

      return converter.toCSSGrid()
    },
    layoutToYoga: (_, { id }, { dataSources }) => {
      const layout = dataSources.layoutStore.findById(id)

      if (!layout) notFoundError(id)

      const converter = new LayoutConverter(layout.items, layout.config)

      return converter.toYoga()
    },
  },
  Mutation: {
    login: (_, { email, password }, { dataSources }) => {
      const user = dataSources.userStore.findByEmail(email)

      if (!user || user.password !== password) {
        invalidCredentials()
      }

      const token = createToken({ userId: user.id, email: user.email })

      return { token, user }
    },
    createLayout: (_, { input }, { dataSources, userId }) => {
      requireAuth(userId)

      const validatedInput = validate(CreateLayoutInputSchema, input)

      return dataSources.layoutStore.create(validatedInput)
    },
    updateLayout: (_, { id, input }, { dataSources, userId }) => {
      requireAuth(userId)

      const validatedInput = validate(UpdateLayoutInputSchema, input)

      const result = dataSources.layoutStore.update(id, validatedInput)

      if (!result) notFoundError(id)

      return result
    },
    deleteLayout: (_, { id }, { dataSources, userId }) => {
      requireAuth(userId)

      const success = dataSources.layoutStore.delete(id)

      if (!success) notFoundError(id)

      return { success, id }
    },
  },
}
