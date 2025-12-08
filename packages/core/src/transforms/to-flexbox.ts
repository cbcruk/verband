import type { RowBasedLayout, LayoutConfig, FlexboxLayout } from '../types'
import { calculateHeight } from '../utils/calculate-height'

export function rowBasedToFlexbox(rowBased: RowBasedLayout, config: LayoutConfig): FlexboxLayout {
  const { gap, padding } = config

  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: `${gap.row}px`,
      ...(padding && {
        padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`,
      }),
    },
    rows: rowBased.map((row) => {
      const heightPx = calculateHeight(row.height, config)

      return {
        style: {
          display: 'flex',
          gap: `${gap.column}px`,
          minHeight: `${heightPx}px`,
        },
        items: row.items.map((item) => ({
          id: item.id,
          style: {
            flex: `${item.width} 1 0%`,
            ...(item.minWidth !== undefined && {
              minWidth: `${item.minWidth}px`,
            }),
            ...(item.maxWidth !== undefined && {
              maxWidth: `${item.maxWidth}px`,
            }),
            ...(item.minHeight !== undefined && {
              minHeight: `${item.minHeight}px`,
            }),
            ...(item.maxHeight !== undefined && {
              maxHeight: `${item.maxHeight}px`,
            }),
          },
        })),
      }
    }),
  }
}
