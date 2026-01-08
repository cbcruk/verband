import type { FlexboxLayout, CssGridLayout } from '../../graphql/generated'

interface FlexboxPreviewProps {
  layout: FlexboxLayout
}

export function FlexboxPreview({ layout }: FlexboxPreviewProps): React.ReactElement {
  const containerStyle = {
    display: layout.container.display,
    flexDirection: layout.container.flexDirection as React.CSSProperties['flexDirection'],
    gap: layout.container.gap,
    padding: layout.container.padding ?? undefined,
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h3 className="mb-3 text-sm font-medium text-gray-700">Flexbox Preview</h3>
      <div style={containerStyle} className="min-h-[200px] rounded bg-white p-2">
        {layout.rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            style={{
              display: row.style.display,
              gap: row.style.gap,
              minHeight: row.style.minHeight,
            }}
          >
            {row.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-center rounded bg-blue-400 text-xs font-medium text-white"
                style={{
                  flex: item.style.flex,
                  minWidth: item.style.minWidth ?? undefined,
                  maxWidth: item.style.maxWidth ?? undefined,
                  minHeight: item.style.minHeight ?? undefined,
                  maxHeight: item.style.maxHeight ?? undefined,
                }}
              >
                {item.id}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

interface CSSGridPreviewProps {
  layout: CssGridLayout
}

export function CSSGridPreview({ layout }: CSSGridPreviewProps): React.ReactElement {
  const containerStyle: React.CSSProperties = {
    display: layout.container.display,
    gridTemplateRows: layout.container.gridTemplateRows,
    gridTemplateColumns: layout.container.gridTemplateColumns,
    gap: layout.container.gap,
    padding: layout.container.padding ?? undefined,
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h3 className="mb-3 text-sm font-medium text-gray-700">CSS Grid Preview</h3>
      <div style={containerStyle} className="min-h-[200px] rounded bg-white p-2">
        {layout.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-center rounded bg-green-400 text-xs font-medium text-white"
            style={{
              gridRow: item.style.gridRow,
              gridColumn: item.style.gridColumn,
              minWidth: item.style.minWidth ?? undefined,
              maxWidth: item.style.maxWidth ?? undefined,
              minHeight: item.style.minHeight ?? undefined,
              maxHeight: item.style.maxHeight ?? undefined,
            }}
          >
            {item.id}
          </div>
        ))}
      </div>
    </div>
  )
}
