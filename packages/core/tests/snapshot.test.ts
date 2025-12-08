import { describe, it, expect } from 'vitest'
import { LayoutConverter } from '../src/converter'
import { flatToRowBased } from '../src/transforms/to-row-based'
import { flatLayoutToAscii, rowBasedLayoutToAscii } from '../src/utils/ascii-renderer'
import type { LayoutConfig } from '../src/types'

const config: LayoutConfig = {
  cols: 12,
  rowHeight: 50,
  gap: { row: 10, column: 10 },
}

describe('Snapshot: Simple Layout', () => {
  /**
   * ┌───────────────────────┐
   * │           a           │  <- 전체 너비 헤더
   * ├───────────┬───────────┤
   * │     b     │     c     │  <- 2개 컬럼 (6:6)
   * └───────────┴───────────┘
   */
  const layout = [
    { i: 'a', x: 0, y: 0, w: 12, h: 2 },
    { i: 'b', x: 0, y: 2, w: 6, h: 2 },
    { i: 'c', x: 6, y: 2, w: 6, h: 2 },
  ]

  it('ascii', () => {
    expect(flatLayoutToAscii(layout, 12)).toMatchSnapshot()
  })

  it('row-based', () => {
    expect(flatToRowBased(layout)).toMatchSnapshot()
  })

  it('flexbox', () => {
    const converter = new LayoutConverter(layout, config)
    expect(converter.toFlexbox()).toMatchSnapshot()
  })

  it('css-grid', () => {
    const converter = new LayoutConverter(layout, config)
    expect(converter.toCSSGrid()).toMatchSnapshot()
  })

  it('yoga', () => {
    const converter = new LayoutConverter(layout, config)
    expect(converter.toYoga()).toMatchSnapshot()
  })
})

describe('Snapshot: Dashboard Layout', () => {
  /**
   * ┌───────────────────────┐
   * │           H           │  <- Header
   * ├─────┬─────────────────┤
   * │  S  │        M        │  <- Sidebar + Main
   * ├─────┴─────────────────┤
   * │           F           │  <- Footer
   * └───────────────────────┘
   */
  const layout = [
    { i: 'H', x: 0, y: 0, w: 12, h: 1 },
    { i: 'S', x: 0, y: 1, w: 3, h: 3 },
    { i: 'M', x: 3, y: 1, w: 9, h: 3 },
    { i: 'F', x: 0, y: 4, w: 12, h: 1 },
  ]

  it('ascii', () => {
    expect(flatLayoutToAscii(layout, 12)).toMatchSnapshot()
  })

  it('row-based', () => {
    expect(flatToRowBased(layout)).toMatchSnapshot()
  })

  it('flexbox', () => {
    const converter = new LayoutConverter(layout, config)
    expect(converter.toFlexbox()).toMatchSnapshot()
  })

  it('css-grid', () => {
    const converter = new LayoutConverter(layout, config)
    expect(converter.toCSSGrid()).toMatchSnapshot()
  })
})

describe('Snapshot: 3-Column Grid', () => {
  /**
   * ┌───────┬───────┬───────┐
   * │   A   │   B   │   C   │  <- 3개 균등 컬럼 (4:4:4)
   * ├───────┴───┬───┴───────┤
   * │     D     │     E     │  <- 2개 컬럼 (6:6)
   * └───────────┴───────────┘
   */
  const layout = [
    { i: 'A', x: 0, y: 0, w: 4, h: 2 },
    { i: 'B', x: 4, y: 0, w: 4, h: 2 },
    { i: 'C', x: 8, y: 0, w: 4, h: 2 },
    { i: 'D', x: 0, y: 2, w: 6, h: 1 },
    { i: 'E', x: 6, y: 2, w: 6, h: 1 },
  ]

  it('ascii', () => {
    expect(flatLayoutToAscii(layout, 12)).toMatchSnapshot()
  })

  it('row-based', () => {
    expect(flatToRowBased(layout)).toMatchSnapshot()
  })
})

describe('Snapshot: Asymmetric Layout', () => {
  /**
   * ┌───────────────┬───────┐
   * │       A       │   B   │  <- 비대칭 (8:4)
   * ├───┬───────┬───┴───────┤
   * │ C │   D   │     E     │  <- 3개 (2:4:6)
   * └───┴───────┴───────────┘
   */
  const layout = [
    { i: 'A', x: 0, y: 0, w: 8, h: 3 },
    { i: 'B', x: 8, y: 0, w: 4, h: 3 },
    { i: 'C', x: 0, y: 3, w: 2, h: 1 },
    { i: 'D', x: 2, y: 3, w: 4, h: 1 },
    { i: 'E', x: 6, y: 3, w: 6, h: 1 },
  ]

  it('ascii', () => {
    expect(flatLayoutToAscii(layout, 12)).toMatchSnapshot()
  })

  it('row-based', () => {
    expect(flatToRowBased(layout)).toMatchSnapshot()
  })
})
