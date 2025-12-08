import { describe, it, expect } from 'vitest'
import { LayoutConverter } from '../src/converter'
import type { LayoutConfig } from '../src/types'

const defaultConfig: LayoutConfig = {
  cols: 12,
  rowHeight: 50,
  gap: { row: 16, column: 16 },
}

describe('LayoutConverter', () => {
  it('should create converter instance', () => {
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 12, h: 2 }]
    const converter = new LayoutConverter(flatLayout, defaultConfig)

    expect(converter).toBeInstanceOf(LayoutConverter)
  })

  it('should return row-based layout', () => {
    const flatLayout = [
      { i: 'a', x: 0, y: 0, w: 12, h: 2 },
      { i: 'b', x: 0, y: 2, w: 6, h: 2 },
      { i: 'c', x: 6, y: 2, w: 6, h: 2 },
    ]
    const converter = new LayoutConverter(flatLayout, defaultConfig)
    const rowBased = converter.getRowBased()

    expect(rowBased).toHaveLength(2)
    expect(rowBased[0].items[0].id).toBe('a')
    expect(rowBased[1].items).toHaveLength(2)
  })

  it('should convert to Flexbox layout', () => {
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 12, h: 2 }]
    const converter = new LayoutConverter(flatLayout, defaultConfig)
    const flexbox = converter.toFlexbox()

    expect(flexbox.container.display).toBe('flex')
    expect(flexbox.rows).toHaveLength(1)
  })

  it('should convert to CSS Grid layout', () => {
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 12, h: 2 }]
    const converter = new LayoutConverter(flatLayout, defaultConfig)
    const grid = converter.toCSSGrid()

    expect(grid.container.display).toBe('grid')
    expect(grid.items).toHaveLength(1)
  })

  it('should convert to Yoga layout', () => {
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 12, h: 2 }]
    const converter = new LayoutConverter(flatLayout, defaultConfig)
    const yoga = converter.toYoga()

    expect(yoga.root.flexDirection).toBe('column')
    expect(yoga.root.children).toHaveLength(1)
  })

  it('should work with complex layout', () => {
    const flatLayout = [
      { i: 'header', x: 0, y: 0, w: 12, h: 2 },
      { i: 'sidebar', x: 0, y: 2, w: 3, h: 4 },
      { i: 'main', x: 3, y: 2, w: 9, h: 4 },
      { i: 'footer', x: 0, y: 6, w: 12, h: 2 },
    ]
    const converter = new LayoutConverter(flatLayout, defaultConfig)

    const rowBased = converter.getRowBased()
    expect(rowBased).toHaveLength(3)

    const flexbox = converter.toFlexbox()
    expect(flexbox.rows).toHaveLength(3)
    expect(flexbox.rows[1].items).toHaveLength(2)

    const grid = converter.toCSSGrid()
    expect(grid.items).toHaveLength(4)

    const yoga = converter.toYoga()
    expect(yoga.root.children).toHaveLength(3)
  })
})
