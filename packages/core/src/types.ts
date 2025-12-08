export interface FlatLayoutItem {
  i: string
  x: number
  y: number
  w: number
  h: number
  minW?: number
  maxW?: number
  minH?: number
  maxH?: number
  static?: boolean
  [key: string]: unknown
}

export type FlatLayout = FlatLayoutItem[]

export interface RowBasedLayoutItem {
  id: string
  x: number
  width: number
  height: number
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  [key: string]: unknown
}

export interface RowBasedLayoutRow {
  y: number
  height: number
  items: RowBasedLayoutItem[]
}

export type RowBasedLayout = RowBasedLayoutRow[]

export interface LayoutConfig {
  cols: number
  rowHeight: number
  gap: {
    row: number
    column: number
  }
  padding?: {
    top: number
    right: number
    bottom: number
    left: number
  }
}

export interface FlexboxItemStyle {
  flex: string
  minWidth?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
}

export interface FlexboxItem {
  id: string
  style: FlexboxItemStyle
}

export interface FlexboxRowStyle {
  display: 'flex'
  gap: string
  minHeight: string
}

export interface FlexboxRow {
  style: FlexboxRowStyle
  items: FlexboxItem[]
}

export interface FlexboxContainerStyle {
  display: 'flex'
  flexDirection: 'column'
  gap: string
  padding?: string
}

export interface FlexboxLayout {
  container: FlexboxContainerStyle
  rows: FlexboxRow[]
}

export interface CSSGridItemStyle {
  gridRow: string
  gridColumn: string
  minWidth?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
}

export interface CSSGridItem {
  id: string
  style: CSSGridItemStyle
}

export interface CSSGridContainerStyle {
  display: 'grid'
  gridTemplateRows: string
  gridTemplateColumns: string
  gap: string
  padding?: string
}

export interface CSSGridLayout {
  container: CSSGridContainerStyle
  items: CSSGridItem[]
}

export interface YogaNode {
  id?: string
  flexDirection: 'column' | 'row'
  width?: number | 'auto'
  height?: number | 'auto'
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  flexGrow?: number
  flexShrink?: number
  flexBasis?: number | 'auto'
  gap?: number
  padding?: {
    top: number
    right: number
    bottom: number
    left: number
  }
  children?: YogaNode[]
}

export interface YogaLayout {
  root: YogaNode
}
