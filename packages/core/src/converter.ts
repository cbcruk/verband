import type {
  FlatLayout,
  LayoutConfig,
  RowBasedLayout,
  FlexboxLayout,
  CSSGridLayout,
  YogaLayout,
} from './types'

import { flatToRowBased } from './transforms/to-row-based'
import { rowBasedToFlexbox } from './transforms/to-flexbox'
import { rowBasedToCSSGrid } from './transforms/to-css-grid'
import { rowBasedToYoga } from './transforms/to-yoga'

export class LayoutConverter {
  private rowBased: RowBasedLayout
  private config: LayoutConfig

  constructor(flatLayout: FlatLayout, config: LayoutConfig) {
    this.rowBased = flatToRowBased(flatLayout)
    this.config = config
  }

  getRowBased(): RowBasedLayout {
    return this.rowBased
  }

  toFlexbox(): FlexboxLayout {
    return rowBasedToFlexbox(this.rowBased, this.config)
  }

  toCSSGrid(): CSSGridLayout {
    return rowBasedToCSSGrid(this.rowBased, this.config)
  }

  toYoga(): YogaLayout {
    return rowBasedToYoga(this.rowBased, this.config)
  }
}
