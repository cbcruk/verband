import type { LayoutStore } from '../data-sources/layout-store'
import type { UserStore } from '../data-sources/user-store'

export interface Context {
  dataSources: {
    layoutStore: LayoutStore
    userStore: UserStore
  }
  userId: string | null
}
