import type { FlatLayoutItem, LayoutConfig } from '@verband/core'

export interface StoredLayout {
  id: string
  name: string
  description?: string
  items: FlatLayoutItem[]
  config: LayoutConfig
  createdAt: Date
  updatedAt: Date
}

export interface CreateLayoutInput {
  name: string
  description?: string
  items: FlatLayoutItem[]
  config: LayoutConfig
}

export interface UpdateLayoutInput {
  name?: string
  description?: string
  items?: FlatLayoutItem[]
  config?: LayoutConfig
}

export interface PaginationArgs {
  first?: number
  after?: string
  last?: number
  before?: string
}

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: string | null
  endCursor: string | null
}

export interface LayoutEdge {
  node: StoredLayout
  cursor: string
}

export interface LayoutConnection {
  edges: LayoutEdge[]
  pageInfo: PageInfo
  totalCount: number
}

export class LayoutStore {
  private layouts: Map<string, StoredLayout> = new Map()
  private idCounter: number = 0

  private generateId(): string {
    return `layout_${++this.idCounter}`
  }

  create(input: CreateLayoutInput): StoredLayout {
    const id = this.generateId()
    const now = new Date()
    const layout: StoredLayout = {
      id,
      name: input.name,
      description: input.description,
      items: input.items,
      config: input.config,
      createdAt: now,
      updatedAt: now,
    }

    this.layouts.set(id, layout)

    return layout
  }

  findAll(): StoredLayout[] {
    return Array.from(this.layouts.values())
  }

  findPaginated(args: PaginationArgs): LayoutConnection {
    const allLayouts = Array.from(this.layouts.values())
    const totalCount = allLayouts.length

    const startIndex = this.findIndexByCursor(allLayouts, args.after, (i) => i + 1, 0)
    const endIndex = this.findIndexByCursor(allLayouts, args.before, (i) => i, allLayouts.length)

    const slicedLayouts = (() => {
      const sliced = allLayouts.slice(startIndex, endIndex)

      switch (true) {
        case args.first !== undefined:
          return sliced.slice(0, args.first)
        case args.last !== undefined:
          return sliced.slice(-args.last)
        default:
          return sliced
      }
    })()

    const edges: LayoutEdge[] = slicedLayouts.map((layout) => ({
      node: layout,
      cursor: this.encodeCursor(layout.id),
    }))

    const firstEdge = edges[0]
    const lastEdge = edges[edges.length - 1]

    const originalFirstIndex = firstEdge
      ? allLayouts.findIndex((l) => l.id === firstEdge.node.id)
      : 0
    const originalLastIndex = lastEdge ? allLayouts.findIndex((l) => l.id === lastEdge.node.id) : 0

    return {
      edges,
      pageInfo: {
        hasNextPage: originalLastIndex < allLayouts.length - 1,
        hasPreviousPage: originalFirstIndex > 0,
        startCursor: firstEdge?.cursor ?? null,
        endCursor: lastEdge?.cursor ?? null,
      },
      totalCount,
    }
  }

  private encodeCursor(id: string): string {
    return Buffer.from(id).toString('base64')
  }

  private findIndexByCursor(
    layouts: StoredLayout[],
    cursor: string | undefined,
    onFound: (index: number) => number,
    defaultValue: number
  ): number {
    if (!cursor) return defaultValue

    const index = layouts.findIndex((l) => this.encodeCursor(l.id) === cursor)

    return index !== -1 ? onFound(index) : defaultValue
  }

  findById(id: string): StoredLayout | undefined {
    return this.layouts.get(id)
  }

  update(id: string, input: UpdateLayoutInput): StoredLayout | undefined {
    const existing = this.layouts.get(id)

    if (!existing) return undefined

    const updated: StoredLayout = {
      ...existing,
      name: input.name ?? existing.name,
      description: input.description ?? existing.description,
      items: input.items ?? existing.items,
      config: input.config ?? existing.config,
      updatedAt: new Date(),
    }

    this.layouts.set(id, updated)

    return updated
  }

  delete(id: string): boolean {
    return this.layouts.delete(id)
  }

  seedSampleData(): void {
    this.create({
      name: 'Dashboard Layout',
      description: 'Basic dashboard with header, sidebar, main content, and footer',
      items: [
        { i: 'header', x: 0, y: 0, w: 12, h: 1 },
        { i: 'sidebar', x: 0, y: 1, w: 3, h: 3 },
        { i: 'main', x: 3, y: 1, w: 9, h: 3 },
        { i: 'footer', x: 0, y: 4, w: 12, h: 1 },
      ],
      config: {
        cols: 12,
        rowHeight: 100,
        gap: { row: 10, column: 10 },
      },
    })

    this.create({
      name: 'Blog Layout',
      description: 'Simple blog layout with content and sidebar',
      items: [
        { i: 'header', x: 0, y: 0, w: 12, h: 1 },
        { i: 'content', x: 0, y: 1, w: 8, h: 4 },
        { i: 'sidebar', x: 8, y: 1, w: 4, h: 4 },
        { i: 'footer', x: 0, y: 5, w: 12, h: 1 },
      ],
      config: {
        cols: 12,
        rowHeight: 80,
        gap: { row: 16, column: 16 },
      },
    })
  }
}
