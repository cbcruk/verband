import type { RowBasedLayout, LayoutConfig, YogaLayout, YogaNode } from '../types'
import { calculateHeight } from '../utils/calculate-height'

export function rowBasedToYoga(rowBased: RowBasedLayout, config: LayoutConfig): YogaLayout {
  const { gap, padding } = config

  return {
    root: {
      flexDirection: 'column',
      gap: gap.row,
      ...(padding && { padding }),
      children: rowBased.map((row) => {
        const heightPx = calculateHeight(row.height, config)

        return {
          flexDirection: 'row',
          height: heightPx,
          gap: gap.column,
          children: row.items.map(
            (item) =>
              ({
                id: item.id,
                flexDirection: 'column' as const,
                flexGrow: item.width,
                flexShrink: 1,
                flexBasis: 0,
                ...(item.minWidth !== undefined && { minWidth: item.minWidth }),
                ...(item.maxWidth !== undefined && { maxWidth: item.maxWidth }),
                ...(item.minHeight !== undefined && {
                  minHeight: item.minHeight,
                }),
                ...(item.maxHeight !== undefined && {
                  maxHeight: item.maxHeight,
                }),
              }) satisfies YogaNode
          ),
        } satisfies YogaNode
      }),
    },
  }
}
