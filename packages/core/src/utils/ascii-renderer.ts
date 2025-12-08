import type { FlatLayout, RowBasedLayout } from '../types'

const BOX = {
  topLeft: '┌',
  topRight: '┐',
  bottomLeft: '└',
  bottomRight: '┘',
  horizontal: '─',
  vertical: '│',
  topT: '┬',
  bottomT: '┴',
  leftT: '├',
  rightT: '┤',
  cross: '┼',
}

interface Cell {
  id: string
  x: number
  y: number
  w: number
  h: number
}

function createGrid(cells: Cell[], cols: number, rows: number): (string | null)[][] {
  const grid: (string | null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null))

  for (const cell of cells) {
    for (let y = cell.y; y < cell.y + cell.h; y++) {
      for (let x = cell.x; x < cell.x + cell.w; x++) {
        if (y < rows && x < cols) {
          grid[y][x] = cell.id
        }
      }
    }
  }

  return grid
}

function getCornerChar(top: boolean, bottom: boolean, left: boolean, right: boolean): string {
  const count = [top, bottom, left, right].filter(Boolean).length

  if (count === 0) return ' '
  if (count === 2) {
    if (top && bottom) return BOX.vertical
    if (left && right) return BOX.horizontal
    if (bottom && right) return BOX.topLeft
    if (bottom && left) return BOX.topRight
    if (top && right) return BOX.bottomLeft
    if (top && left) return BOX.bottomRight
  }
  if (count === 3) {
    if (!top) return BOX.topT
    if (!bottom) return BOX.bottomT
    if (!left) return BOX.leftT
    if (!right) return BOX.rightT
  }
  if (count === 4) return BOX.cross
  return ' '
}

export function flatLayoutToAscii(layout: FlatLayout, cols: number): string {
  if (layout.length === 0) return '(empty)'

  const cells: Cell[] = layout.map((item) => ({
    id: item.i,
    x: item.x,
    y: item.y,
    w: item.w,
    h: item.h,
  }))

  return renderBoxLayout(cells, cols)
}

export function rowBasedLayoutToAscii(layout: RowBasedLayout, cols: number): string {
  if (layout.length === 0) return '(empty)'

  const cells: Cell[] = []
  let currentY = 0

  for (const row of layout) {
    for (const item of row.items) {
      cells.push({
        id: item.id,
        x: item.x,
        y: currentY,
        w: item.width,
        h: row.height,
      })
    }
    currentY += row.height
  }

  return renderBoxLayout(cells, cols)
}

function renderBoxLayout(cells: Cell[], cols: number): string {
  if (cells.length === 0) return '(empty)'

  const maxY = Math.max(...cells.map((c) => c.y + c.h))
  const grid = createGrid(cells, cols, maxY)
  const cellWidth = 3
  const lines: string[] = []

  for (let y = 0; y <= maxY; y++) {
    let borderLine = ''
    let contentLine = ''

    for (let x = 0; x <= cols; x++) {
      const topLeft = y > 0 && x > 0 ? grid[y - 1][x - 1] : null
      const topRight = y > 0 && x < cols ? grid[y - 1][x] : null
      const bottomLeft = y < maxY && x > 0 ? grid[y][x - 1] : null
      const bottomRight = y < maxY && x < cols ? grid[y][x] : null

      const hasTop = topLeft !== null || topRight !== null
      const hasBottom = bottomLeft !== null || bottomRight !== null
      const hasLeft = topLeft !== null || bottomLeft !== null
      const hasRight = topRight !== null || bottomRight !== null

      const needVerticalUp = hasTop && topLeft !== topRight
      const needVerticalDown = hasBottom && bottomLeft !== bottomRight
      const needHorizontalLeft = hasLeft && topLeft !== bottomLeft
      const needHorizontalRight = hasRight && topRight !== bottomRight

      borderLine += getCornerChar(
        needVerticalUp,
        needVerticalDown,
        needHorizontalLeft,
        needHorizontalRight
      )

      if (x < cols) {
        const above = y > 0 ? grid[y - 1][x] : null
        const below = y < maxY ? grid[y][x] : null
        const needHorizontalBorder = above !== below && (above !== null || below !== null)

        if (needHorizontalBorder) {
          borderLine += BOX.horizontal.repeat(cellWidth)
        } else {
          borderLine += ' '.repeat(cellWidth)
        }
      }
    }

    if (y < maxY) {
      for (let x = 0; x <= cols; x++) {
        const current = x < cols ? grid[y][x] : null
        const leftCell = x > 0 ? grid[y][x - 1] : null
        const needVerticalBorder = current !== leftCell && (current !== null || leftCell !== null)

        if (needVerticalBorder) {
          contentLine += BOX.vertical
        } else {
          contentLine += ' '
        }

        if (x < cols) {
          const cell = cells.find((c) => c.id === current && c.x === x && c.y === y)

          if (cell) {
            const totalWidth = cellWidth * cell.w + (cell.w - 1)
            const label = cell.id.substring(0, totalWidth)
            const padLeft = Math.floor((totalWidth - label.length) / 2)
            const padRight = totalWidth - label.length - padLeft
            contentLine += ' '.repeat(padLeft) + label + ' '.repeat(padRight)
            x += cell.w - 1
          } else {
            contentLine += ' '.repeat(cellWidth)
          }
        }
      }
    }

    lines.push(borderLine)
    if (y < maxY) {
      lines.push(contentLine)
    }
  }

  return lines.join('\n')
}
