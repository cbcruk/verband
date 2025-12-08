import { describe, it, expect } from 'vitest'
import { flatToRowBased } from '../src/transforms/to-row-based'

describe('flatToRowBased', () => {
  it('should convert flat layout to row-based structure', () => {
    const flatLayout = [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
      { i: 'b', x: 1, y: 2, w: 3, h: 2 },
      { i: 'c', x: 4, y: 4, w: 1, h: 2 },
      { i: 'd', x: 5, y: 4, w: 1, h: 2 },
    ]

    const result = flatToRowBased(flatLayout)

    expect(result).toHaveLength(3)
    expect(result[0].y).toBe(0)
    expect(result[0].items).toHaveLength(1)
    expect(result[0].items[0].id).toBe('a')

    expect(result[1].y).toBe(2)
    expect(result[1].items).toHaveLength(1)

    expect(result[2].y).toBe(4)
    expect(result[2].items).toHaveLength(2)
    expect(result[2].items[0].id).toBe('c')
    expect(result[2].items[1].id).toBe('d')
  })

  it('should sort items by x within each row', () => {
    const flatLayout = [
      { i: 'b', x: 6, y: 0, w: 6, h: 1 },
      { i: 'a', x: 0, y: 0, w: 6, h: 1 },
    ]

    const result = flatToRowBased(flatLayout)

    expect(result[0].items[0].id).toBe('a')
    expect(result[0].items[1].id).toBe('b')
  })

  it('should calculate row height as max item height', () => {
    const flatLayout = [
      { i: 'a', x: 0, y: 0, w: 6, h: 2 },
      { i: 'b', x: 6, y: 0, w: 6, h: 3 },
    ]

    const result = flatToRowBased(flatLayout)

    expect(result[0].height).toBe(3)
  })

  it('should preserve optional min/max constraints', () => {
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 6, h: 2, minW: 2, maxW: 8, minH: 1, maxH: 4 }]

    const result = flatToRowBased(flatLayout)

    expect(result[0].items[0].minWidth).toBe(2)
    expect(result[0].items[0].maxWidth).toBe(8)
    expect(result[0].items[0].minHeight).toBe(1)
    expect(result[0].items[0].maxHeight).toBe(4)
  })

  it('should handle empty layout', () => {
    const result = flatToRowBased([])
    expect(result).toHaveLength(0)
  })

  it('should preserve extra properties', () => {
    const flatLayout = [{ i: 'a', x: 0, y: 0, w: 6, h: 2, customProp: 'value' }]

    const result = flatToRowBased(flatLayout)

    expect(result[0].items[0].customProp).toBe('value')
  })
})
