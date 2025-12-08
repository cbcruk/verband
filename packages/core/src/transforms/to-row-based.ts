import type { FlatLayout, RowBasedLayout } from '../types'

export function flatToRowBased(flatLayout: FlatLayout): RowBasedLayout {
  const groupedByY = flatLayout.reduce(
    (acc, item) => {
      if (!acc[item.y]) {
        acc[item.y] = []
      }
      acc[item.y].push(item)
      return acc
    },
    {} as Record<number, FlatLayout>
  )

  return Object.entries(groupedByY)
    .sort(([y1], [y2]) => Number(y1) - Number(y2))
    .map(([y, items]) => {
      const maxHeight = Math.max(...items.map((item) => item.h))
      const sortedItems = [...items].sort((a, b) => a.x - b.x)

      return {
        y: Number(y),
        height: maxHeight,
        items: sortedItems.map((item) => {
          const { i, x, w, h, minW, maxW, minH, maxH, static: _static, ...rest } = item
          return {
            id: i,
            x,
            width: w,
            height: h,
            ...(minW !== undefined && { minWidth: minW }),
            ...(maxW !== undefined && { maxWidth: maxW }),
            ...(minH !== undefined && { minHeight: minH }),
            ...(maxH !== undefined && { maxHeight: maxH }),
            ...rest,
          }
        }),
      }
    })
}
