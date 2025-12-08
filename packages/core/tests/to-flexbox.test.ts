import { describe, it, expect } from 'vitest'
import { rowBasedToFlexbox } from '../src/transforms/to-flexbox'
import { flatToRowBased } from '../src/transforms/to-row-based'
import type { LayoutConfig } from '../src/types'

const defaultConfig: LayoutConfig = {
  cols: 12,
  rowHeight: 50,
  gap: { row: 16, column: 16 },
}

describe('rowBasedToFlexbox', () => {
  it('should create correct container styles', () => {
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 12, h: 2 }]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToFlexbox(rowBased, defaultConfig)

    expect(result.container.display).toBe('flex')
    expect(result.container.flexDirection).toBe('column')
    expect(result.container.gap).toBe('16px')
  })

  it('should include padding when provided', () => {
    const config: LayoutConfig = {
      ...defaultConfig,
      padding: { top: 10, right: 20, bottom: 10, left: 20 },
    }
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 12, h: 2 }]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToFlexbox(rowBased, config)

    expect(result.container.padding).toBe('10px 20px 10px 20px')
  })

  it('should create correct row styles', () => {
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 12, h: 2 }]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToFlexbox(rowBased, defaultConfig)

    expect(result.rows[0].style.display).toBe('flex')
    expect(result.rows[0].style.gap).toBe('16px')
    // 2 * 50 + (2-1) * 16 = 116
    expect(result.rows[0].style.minHeight).toBe('116px')
  })

  it('should create correct item styles with flex proportions', () => {
    const flatLayout = [
      { i: 'a', x: 0, y: 0, w: 4, h: 2 },
      { i: 'b', x: 4, y: 0, w: 8, h: 2 },
    ]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToFlexbox(rowBased, defaultConfig)

    expect(result.rows[0].items[0].style.flex).toBe('4 1 0%')
    expect(result.rows[0].items[1].style.flex).toBe('8 1 0%')
  })

  it('should handle multiple rows', () => {
    const flatLayout = [
      { i: 'a', x: 0, y: 0, w: 12, h: 2 },
      { i: 'b', x: 0, y: 2, w: 6, h: 3 },
      { i: 'c', x: 6, y: 2, w: 6, h: 3 },
    ]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToFlexbox(rowBased, defaultConfig)

    expect(result.rows).toHaveLength(2)
    expect(result.rows[0].items).toHaveLength(1)
    expect(result.rows[1].items).toHaveLength(2)
  })
})
