import { useLayoutsQuery, useDeleteLayoutMutation } from '../../graphql/generated'
import { LayoutCard } from './layout-card'

export function LayoutList(): React.ReactElement {
  const { data, loading, error, refetch } = useLayoutsQuery({
    variables: { first: 10 },
  })

  const [deleteLayout] = useDeleteLayoutMutation({
    onCompleted: () => refetch(),
  })

  function handleDelete(id: string): void {
    if (confirm('Are you sure you want to delete this layout?')) {
      deleteLayout({ variables: { id } })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="text-gray-500">Loading layouts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-red-600">
        Error loading layouts: {error.message}
      </div>
    )
  }

  const layouts = data?.layouts.edges.map((edge) => edge.node) ?? []

  if (layouts.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-gray-300 p-8 text-center text-gray-500">
        No layouts yet. Create your first layout!
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {layouts.map((layout) => (
        <LayoutCard key={layout.id} layout={layout} onDelete={handleDelete} />
      ))}
    </div>
  )
}
