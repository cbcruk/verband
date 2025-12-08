import { describe, it, expect } from 'vitest'
import { rowBasedToCSSGrid } from '../src/transforms/to-css-grid'
import { flatToRowBased } from '../src/transforms/to-row-based'
import type { LayoutConfig } from '../src/types'

const defaultConfig: LayoutConfig = {
  cols: 12,
  rowHeight: 50,
  gap: { row: 16, column: 16 },
}

describe('rowBasedToCSSGrid', () => {
  it('should create correct container styles', () => {
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 12, h: 2 }]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToCSSGrid(rowBased, defaultConfig)

    expect(result.container.display).toBe('grid')
    expect(result.container.gridTemplateColumns).toBe('repeat(12, 1fr)')
    expect(result.container.gap).toBe('16px 16px')
  })

  it('should create correct gridTemplateRows', () => {
    const flatLayout = [
      { i: 'a', x: 0, y: 0, w: 12, h: 2 },
      { i: 'b', x: 0, y: 2, w: 12, h: 3 },
    ]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToCSSGrid(rowBased, defaultConfig)

    // Row 1: 2 * 50 + 1 * 16 = 116px
    // Row 2: 3 * 50 + 2 * 16 = 182px
    expect(result.container.gridTemplateRows).toBe('116px 182px')
  })

  it('should create correct item grid positions', () => {
    const flatLayout = [
      { i: 'a', x: 0, y: 0, w: 4, h: 2 },
      { i: 'b', x: 4, y: 0, w: 8, h: 2 },
    ]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToCSSGrid(rowBased, defaultConfig)

    expect(result.items[0].style.gridRow).toBe('1')
    expect(result.items[0].style.gridColumn).toBe('1 / span 4')

    expect(result.items[1].style.gridRow).toBe('1')
    expect(result.items[1].style.gridColumn).toBe('5 / span 8')
  })

  it('should include padding when provided', () => {
    const config: LayoutConfig = {
      ...defaultConfig,
      padding: { top: 10, right: 20, bottom: 10, left: 20 },
    }
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 12, h: 2 }]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToCSSGrid(rowBased, config)

    expect(result.container.padding).toBe('10px 20px 10px 20px')
  })

  it('should flatten items from multiple rows', () => {
    const flatLayout = [
      { i: 'a', x: 0, y: 0, w: 12, h: 2 },
      { i: 'b', x: 0, y: 2, w: 6, h: 2 },
      { i: 'c', x: 6, y: 2, w: 6, h: 2 },
    ]
    const rowBased = flatToRowBased(flatLayout)
    const result = rowBasedToCSSGrid(rowBased, defaultConfig)

    expect(result.items).toHaveLength(3)
    expect(result.items[0].id).toBe('a')
    expect(result.items[1].id).toBe('b')
    expect(result.items[2].id).toBe('c')

    expect(result.items[1].style.gridRow).toBe('2')
    expect(result.items[2].style.gridRow).toBe('2')
  })
})
