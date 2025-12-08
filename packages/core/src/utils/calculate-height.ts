import type { LayoutConfig } from '../types'

export function calculateHeight(height: number, config: LayoutConfig): number {
  const { rowHeight, gap } = config

  return height * rowHeight + (height - 1) * gap.row
}
