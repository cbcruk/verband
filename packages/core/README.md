# verband

> Transform flat grid layouts to CSS Flexbox, Grid, or Yoga layouts

**verband** (German for "union, connection") bridges different layout systems by converting [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout) format to various CSS layout outputs.

```
┌───────────────────────┐
│           H           │
├─────┬─────────────────┤       Flexbox
│  S  │        M        │  ───► CSS Grid
├─────┴─────────────────┤       Yoga (React Native)
│           F           │
└───────────────────────┘
```

## Installation

```bash
pnpm add verband
```

## Usage

### Basic

```typescript
import { LayoutConverter } from 'verband'

const layout = [
  { i: 'header', x: 0, y: 0, w: 12, h: 1 },
  { i: 'sidebar', x: 0, y: 1, w: 3, h: 3 },
  { i: 'main', x: 3, y: 1, w: 9, h: 3 },
  { i: 'footer', x: 0, y: 4, w: 12, h: 1 },
]

const converter = new LayoutConverter(layout, {
  cols: 12,
  rowHeight: 50,
  gap: { row: 10, column: 10 },
})

// Convert to different formats
const flexbox = converter.toFlexbox()
const cssGrid = converter.toCSSGrid()
const yoga = converter.toYoga()
```

### Flexbox Output

```typescript
const flexbox = converter.toFlexbox()
// {
//   container: { display: 'flex', flexDirection: 'column', gap: '10px' },
//   rows: [
//     {
//       style: { display: 'flex', gap: '10px', minHeight: '50px' },
//       items: [{ id: 'header', style: { flex: '12 1 0%' } }]
//     },
//     ...
//   ]
// }
```

### CSS Grid Output

```typescript
const cssGrid = converter.toCSSGrid()
// {
//   container: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(12, 1fr)',
//     gridTemplateRows: '50px 170px 50px',
//     gap: '10px 10px'
//   },
//   items: [
//     { id: 'header', style: { gridColumn: '1 / span 12', gridRow: '1' } },
//     ...
//   ]
// }
```

### Yoga Output (React Native)

```typescript
const yoga = converter.toYoga()
// {
//   root: {
//     flexDirection: 'column',
//     gap: 10,
//     children: [...]
//   }
// }
```

## API

### `LayoutConverter`

Main class for converting layouts.

```typescript
new LayoutConverter(layout: FlatLayout, config: LayoutConfig)
```

#### Methods

| Method         | Return Type      | Description                              |
| -------------- | ---------------- | ---------------------------------------- |
| `toFlexbox()`  | `FlexboxLayout`  | Convert to CSS Flexbox                   |
| `toCSSGrid()`  | `CSSGridLayout`  | Convert to CSS Grid                      |
| `toYoga()`     | `YogaLayout`     | Convert to Yoga (React Native)           |
| `toRowBased()` | `RowBasedLayout` | Convert to row-based intermediate format |

### Transform Functions

Individual transform functions are also exported:

```typescript
import { flatToRowBased, rowBasedToFlexbox, rowBasedToCSSGrid, rowBasedToYoga } from 'verband'
```

### Types

```typescript
interface FlatLayoutItem {
  i: string // id
  x: number // column position
  y: number // row position
  w: number // width in columns
  h: number // height in rows
  minW?: number
  maxW?: number
  minH?: number
  maxH?: number
}

interface LayoutConfig {
  cols: number
  rowHeight: number
  gap: { row: number; column: number }
  padding?: { top: number; right: number; bottom: number; left: number }
}
```

### Utilities

```typescript
import { flatLayoutToAscii, calculateHeight } from 'verband'

// Visualize layout as ASCII art
console.log(flatLayoutToAscii(layout, 12))
// ┌───────────────────────┐
// │           H           │
// ├─────┬─────────────────┤
// │  S  │        M        │
// ├─────┴─────────────────┤
// │           F           │
// └───────────────────────┘

// Calculate total height in pixels
const height = calculateHeight(layout, { rowHeight: 50, gap: { row: 10 } })
```

## License

MIT
