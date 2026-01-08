import { Link } from '@tanstack/react-router'
import type { SavedLayout } from '../../graphql/generated'

interface LayoutCardProps {
  layout: Pick<SavedLayout, 'id' | 'name' | 'description' | 'createdAt' | 'config' | 'items'>
  onDelete?: (id: string) => void
}

export function LayoutCard({ layout, onDelete }: LayoutCardProps): React.ReactElement {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-2 flex items-start justify-between">
        <Link to="/layout/$id" params={{ id: layout.id }} className="text-lg font-semibold text-gray-900 hover:text-blue-600">
          {layout.name}
        </Link>
        {onDelete && (
          <button
            onClick={() => onDelete(layout.id)}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        )}
      </div>

      {layout.description && (
        <p className="mb-3 text-sm text-gray-600">{layout.description}</p>
      )}

      <div className="flex gap-4 text-xs text-gray-500">
        <span>{layout.config.cols} cols</span>
        <span>{layout.items.length} items</span>
      </div>

      <div className="mt-3 grid grid-cols-12 gap-0.5 rounded bg-gray-100 p-2" style={{ height: '60px' }}>
        {layout.items.map((item) => (
          <div
            key={item.i}
            className="rounded bg-blue-400"
            style={{
              gridColumn: `${item.x + 1} / span ${item.w}`,
              gridRow: `${item.y + 1} / span ${item.h}`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
