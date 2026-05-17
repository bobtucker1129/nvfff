interface GearTableProps {
  columns: string[]
  rows: string[][]
  emptyMessage?: string
}

export default function GearTable({
  columns,
  rows,
  emptyMessage = 'No items yet.',
}: GearTableProps) {
  return (
    <div className="rounded-xl border border-stone-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-stone-800 border-b border-stone-700">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-semibold text-stone-400 uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-stone-500 text-sm"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`border-b border-stone-800 hover:bg-stone-800/60 transition-colors ${
                    rowIdx % 2 === 0 ? 'bg-stone-900/40' : 'bg-stone-900/20'
                  }`}
                >
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={`px-4 py-3 whitespace-nowrap ${
                        cellIdx === 0
                          ? 'font-mono text-xs text-amber-500'
                          : 'text-stone-200'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
