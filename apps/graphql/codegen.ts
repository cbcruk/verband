import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/schema/schema.graphql',
  generates: {
    './src/types/generated.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: './context#Context',
        mappers: {
          SavedLayout: '../data-sources/layout-store#StoredLayout',
        },
        scalars: {
          YogaDimension: 'number | "auto"',
        },
        useIndexSignature: true,
        enumsAsTypes: true,
      },
    },
  },
}

export default config
