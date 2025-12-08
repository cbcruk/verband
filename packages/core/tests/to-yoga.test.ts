import { describe, it, expect } from 'vitest'
import { rowBasedToYoga } from '../src/transforms/to-yoga'
import { flatToRowBased } from '../src/transforms/to-row-based'
import type { LayoutConfig } from '../src/types'

const defaultConfig: LayoutConfig = {
  cols: 12,
  rowHeight: 50,
  gap: { row: 16, column: 16 },
}

describe('rowBasedToYoga', () => {
  it('should create correct root node', () => {
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 12, h: 2 }]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToYoga(rowBased, defaultConfig)

    expect(result.root.flexDirection).toBe('column')
    expect(result.root.gap).toBe(16)
  })

  it('should include padding when provided', () => {
    const config: LayoutConfig = {
      ...defaultConfig,
      padding: { top: 10, right: 20, bottom: 10, left: 20 },
    }
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 12, h: 2 }]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToYoga(rowBased, config)

    expect(result.root.padding).toEqual({ top: 10, right: 20, bottom: 10, left: 20 })
  })

  it('should create row nodes with correct height', () => {
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 12, h: 2 }]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToYoga(rowBased, defaultConfig)

    const rowNode = result.root.children![0]
    expect(rowNode.flexDirection).toBe('row')
    expect(rowNode.height).toBe(116) // 2 * 50 + 1 * 16
    expect(rowNode.gap).toBe(16)
  })

  it('should create item nodes with correct flex properties', () => {
    const flatLayout = [
      { i: 'a', x: 0, y: 0, w: 4, h: 2 },
      { i: 'b', x: 4, y: 0, w: 8, h: 2 },
    ]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToYoga(rowBased, defaultConfig)

    const items = result.root.children![0].children!
    expect(items[0].id).toBe('a')
    expect(items[0].flexGrow).toBe(4)
    expect(items[0].flexShrink).toBe(1)
    expect(items[0].flexBasis).toBe(0)

    expect(items[1].id).toBe('b')
    expect(items[1].flexGrow).toBe(8)
  })

  it('should preserve min/max constraints', () => {
    const flatLayout = [
      { i: 'a', x: 0, y: 0, w: 12, h: 2, minW: 100, maxW: 500, minH: 50, maxH: 200 },
    ]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToYoga(rowBased, defaultConfig)

    const item = result.root.children![0].children![0]
    expect(item.minWidth).toBe(100)
    expect(item.maxWidth).toBe(500)
    expect(item.minHeight).toBe(50)
    expect(item.maxHeight).toBe(200)
  })

  it('should handle multiple rows', () => {
    const flatLayout = [
      { i: 'a', x: 0, y: 0, w: 12, h: 2 },
      { i: 'b', x: 0, y: 2, w: 6, h: 3 },
      { i: 'c', x: 6, y: 2, w: 6, h: 3 },
    ]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToYoga(rowBased, defaultConfig)

    expect(result.root.children).toHaveLength(2)
    expect(result.root.children![0].children).toHaveLength(1)
    expect(result.root.children![1].children).toHaveLength(2)
  })
})
