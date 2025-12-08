import type { RowBasedLayout, LayoutConfig, CSSGridLayout } from '../types'
import { calculateHeight } from '../utils/calculate-height'

export function rowBasedToCSSGrid(rowBased: RowBasedLayout, config: LayoutConfig): CSSGridLayout {
  const { cols, gap, padding } = config

  const templateRows = rowBased
    .map((row) => {
      const heightPx = calculateHeight(row.height, config)
      return `${heightPx}px`
    })
    .join(' ')

  const items = rowBased.flatMap((row, rowIndex) => {
    return row.items.map((item) => ({
      id: item.id,
      style: {
        gridRow: `${rowIndex + 1}`,
        gridColumn: `${item.x + 1} / span ${item.width}`,
        ...(item.minWidth !== undefined && { minWidth: `${item.minWidth}px` }),
        ...(item.maxWidth !== undefined && { maxWidth: `${item.maxWidth}px` }),
        ...(item.minHeight !== undefined && {
          minHeight: `${item.minHeight}px`,
        }),
        ...(item.maxHeight !== undefined && {
          maxHeight: `${item.maxHeight}px`,
        }),
      },
    }))
  })

  return {
    container: {
      display: 'grid',
      gridTemplateRows: templateRows,
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: `${gap.row}px ${gap.column}px`,
      ...(padding && {
        padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
      }),
    },
    items,
  }
}
