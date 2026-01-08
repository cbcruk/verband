import { useState } from 'react'
import {
  useLayoutQuery,
  useLayoutToFlexboxQuery,
  useLayoutToCssGridQuery,
} from '../../graphql/generated'
import { FlexboxPreview, CSSGridPreview } from './layout-preview'

interface LayoutDetailProps {
  id: string
}

type PreviewTab = 'flexbox' | 'grid'

export function LayoutDetail({ id }: LayoutDetailProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<PreviewTab>('flexbox')

  const { data: layoutData, loading: layoutLoading } = useLayoutQuery({
    variables: { id },
  })

  const { data: flexboxData, loading: flexboxLoading } = useLayoutToFlexboxQuery({
    variables: { id },
    skip: activeTab !== 'flexbox',
  })

  const { data: gridData, loading: gridLoading } = useLayoutToCssGridQuery({
    variables: { id },
    skip: activeTab !== 'grid',
  })

  if (layoutLoading) {
    return <div className="py-8 text-center text-gray-500">Loading layout...</div>
  }

  const layout = layoutData?.layout

  if (!layout) {
    return <div className="py-8 text-center text-red-500">Layout not found</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{layout.name}</h1>
        {layout.description && (
          <p className="mt-1 text-gray-600">{layout.description}</p>
        )}
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-medium text-gray-700">Layout Info</h2>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-500">Columns</dt>
            <dd className="font-medium">{layout.config.cols}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Row Height</dt>
            <dd className="font-medium">{layout.config.rowHeight}px</dd>
          </div>
          <div>
            <dt className="text-gray-500">Gap</dt>
            <dd className="font-medium">
              {layout.config.gap.row}px / {layout.config.gap.column}px
            </dd>
          </div>
          <div>
            <dt className="text-gray-500">Items</dt>
            <dd className="font-medium">{layout.items.length}</dd>
          </div>
        </dl>
      </div>

      <div>
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setActiveTab('flexbox')}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              activeTab === 'flexbox'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Flexbox
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              activeTab === 'grid'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            CSS Grid
          </button>
        </div>

        {activeTab === 'flexbox' && (
          flexboxLoading ? (
            <div className="py-4 text-center text-gray-500">Loading Flexbox preview...</div>
          ) : flexboxData?.layoutToFlexbox ? (
            <FlexboxPreview layout={flexboxData.layoutToFlexbox} />
          ) : null
        )}

        {activeTab === 'grid' && (
          gridLoading ? (
            <div className="py-4 text-center text-gray-500">Loading CSS Grid preview...</div>
          ) : gridData?.layoutToCSSGrid ? (
            <CSSGridPreview layout={gridData.layoutToCSSGrid} />
          ) : null
        )}
      </div>
    </div>
  )
}
