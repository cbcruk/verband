import { GraphQLError, GraphQLScalarType, Kind } from 'graphql'
import { LayoutConverter } from '@verband/core'
import type { Context } from '../types/context'
import type {
  CreateLayoutInput,
  UpdateLayoutInput,
  PaginationArgs,
} from '../data-sources/layout-store'
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

export const resolvers = {
  YogaDimension,
  Query: {
    me: (_: unknown, __: unknown, { dataSources, userId }: Context) => {
      if (!userId) return null

      return dataSources.userStore.findById(userId)
    },
    layouts: (_: unknown, args: PaginationArgs, { dataSources }: Context) => {
      return dataSources.layoutStore.findPaginated(args)
    },
    layout: (_: unknown, { id }: { id: string }, { dataSources }: Context) => {
      return dataSources.layoutStore.findById(id)
    },
    layoutToFlexbox: (_: unknown, { id }: { id: string }, { dataSources }: Context) => {
      const layout = dataSources.layoutStore.findById(id)

      if (!layout) notFoundError(id)

      const converter = new LayoutConverter(layout.items, layout.config)

      return converter.toFlexbox()
    },
    layoutToCSSGrid: (_: unknown, { id }: { id: string }, { dataSources }: Context) => {
      const layout = dataSources.layoutStore.findById(id)

      if (!layout) notFoundError(id)

      const converter = new LayoutConverter(layout.items, layout.config)

      return converter.toCSSGrid()
    },
    layoutToYoga: (_: unknown, { id }: { id: string }, { dataSources }: Context) => {
      const layout = dataSources.layoutStore.findById(id)

      if (!layout) notFoundError(id)

      const converter = new LayoutConverter(layout.items, layout.config)

      return converter.toYoga()
    },
  },
  Mutation: {
    login: (
      _: unknown,
      { email, password }: { email: string; password: string },
      { dataSources }: Context
    ) => {
      const user = dataSources.userStore.findByEmail(email)

      if (!user || user.password !== password) {
        invalidCredentials()
      }

      const token = createToken({ userId: user.id, email: user.email })

      return { token, user }
    },
    createLayout: (
      _: unknown,
      { input }: { input: CreateLayoutInput },
      { dataSources, userId }: Context
    ) => {
      requireAuth(userId)

      const validatedInput = validate(CreateLayoutInputSchema, input)

      return dataSources.layoutStore.create(validatedInput)
    },
    updateLayout: (
      _: unknown,
      { id, input }: { id: string; input: UpdateLayoutInput },
      { dataSources, userId }: Context
    ) => {
      requireAuth(userId)

      const validatedInput = validate(UpdateLayoutInputSchema, input)

      const result = dataSources.layoutStore.update(id, validatedInput)

      if (!result) notFoundError(id)

      return result
    },
    deleteLayout: (_: unknown, { id }: { id: string }, { dataSources, userId }: Context) => {
      requireAuth(userId)

      const success = dataSources.layoutStore.delete(id)

      if (!success) notFoundError(id)

      return { success, id }
    },
  },
}
