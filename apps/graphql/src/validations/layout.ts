import { z } from 'zod'
import { GraphQLError } from 'graphql'

export const LayoutItemSchema = z.object({
  i: z.string().min(1, 'id is required'),
  x: z.number().min(0, 'x must be >= 0'),
  y: z.number().min(0, 'y must be >= 0'),
  w: z.number().min(1, 'width must be >= 1'),
  h: z.number().min(1, 'height must be >= 1'),
  minW: z.number().min(1).optional(),
  maxW: z.number().min(1).optional(),
  minH: z.number().min(1).optional(),
  maxH: z.number().min(1).optional(),
  static: z.boolean().optional(),
})

export const GapConfigSchema = z.object({
  row: z.number().min(0, 'gap.row must be >= 0'),
  column: z.number().min(0, 'gap.column must be >= 0'),
})

export const PaddingConfigSchema = z.object({
  top: z.number().min(0),
  right: z.number().min(0),
  bottom: z.number().min(0),
  left: z.number().min(0),
})

export const LayoutConfigSchema = z.object({
  cols: z.number().min(1, 'cols must be >= 1').max(24, 'cols must be <= 24'),
  rowHeight: z.number().min(1, 'rowHeight must be >= 1'),
  gap: GapConfigSchema,
  padding: PaddingConfigSchema.optional(),
})

export const CreateLayoutInputSchema = z.object({
  name: z.string().min(1, 'name is required').max(100, 'name must be <= 100 characters'),
  description: z.string().max(500, 'description must be <= 500 characters').optional(),
  items: z.array(LayoutItemSchema).min(1, 'items must have at least 1 element'),
  config: LayoutConfigSchema,
})

export const UpdateLayoutInputSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  items: z.array(LayoutItemSchema).min(1).optional(),
  config: LayoutConfigSchema.optional(),
})

export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
  const result = schema.safeParse(data)

  if (!result.success) {
    const firstIssue = result.error.issues[0]
    const path = firstIssue.path.join('.')

    throw new GraphQLError(firstIssue.message, {
      extensions: {
        code: 'BAD_USER_INPUT',
        argumentName: path || 'input',
      },
    })
  }

  return result.data
}
