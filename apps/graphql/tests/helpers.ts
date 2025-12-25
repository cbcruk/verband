import { LayoutStore } from '../src/data-sources/layout-store'
import { UserStore } from '../src/data-sources/user-store'
import type { Context } from '../src/types/context'

export function createTestContext(userId: string | null = null): Context {
  const layoutStore = new LayoutStore()
  const userStore = new UserStore()

  return {
    dataSources: { layoutStore, userStore },
    userId,
  }
}

export function createTestContextWithData(userId: string | null = null): Context {
  const context = createTestContext(userId)
  context.dataSources.layoutStore.seedSampleData()

  return context
}
