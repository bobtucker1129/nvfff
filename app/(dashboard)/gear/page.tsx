'use client'

import { useState } from 'react'

type Tab = 'rods' | 'reels' | 'gear'
type Condition = 'excellent' | 'good' | 'fair' | 'poor' | ''

interface Rod {
  id: string
  brand: string
  model: string
  length: string
  lineWeight: string
  weight: string
  condition: Condition
  estValue: string
  notes: string
}

const CONDITIONS: Condition[] = ['excellent', 'good', 'fair', 'poor']

const conditionLabel = (c: Condition) =>
  c ? c.charAt(0).toUpperCase() + c.slice(1) : '—'

const conditionColor = (c: Condition) => {
  if (c === 'excellent') return 'text-green-400'
  if (c === 'good') return 'text-lime-400'
  if (c === 'fair') return 'text-amber-400'
  if (c === 'poor') return 'text-red-400'
  return 'text-stone-500'
}

const INITIAL_RODS: Rod[] = [
  { id: 'R-001', brand: 'Sage', model: 'Graphite II 690 DS', length: "9'0\"", lineWeight: '#6', weight: '3.5 oz', condition: 'good', estValue: '~$200', notes: '' },
  { id: 'R-002', brand: 'Fenwick', model: 'Iron Feather IF 905', length: "9'0\"", lineWeight: '#5', weight: '3.25 oz', condition: 'excellent', estValue: '~$265', notes: 'Late 70s fiberglass — collectible' },
  { id: 'R-003', brand: 'Sage', model: 'Graphite II 590 DS', length: "9'0\"", lineWeight: '#5', weight: '3.375 oz', condition: 'excellent', estValue: '~$225', notes: '' },
  { id: 'R-004', brand: 'Orvis', model: 'Superfine Graphite Trout', length: "8'0\"", lineWeight: '#6', weight: '2.625 oz', condition: '', estValue: '~$275', notes: 'Date code: 0990 (Oct 1990)' },
  { id: 'R-005', brand: 'Okuma', model: 'Infusion F-904-5', length: "9'0\"", lineWeight: '#5', weight: '—', condition: '', estValue: '~$65', notes: '' },
  { id: 'R-006', brand: 'Echo', model: '990-4X (Rajeff Sports)', length: "9'0\"", lineWeight: '#9', weight: '—', condition: '', estValue: '~$120', notes: '4-piece travel rod' },
]

export default function GearPage() {
  const [activeTab, setActiveTab] = useState<Tab>('rods')
  const [rods, setRods] = useState<Rod[]>(INITIAL_RODS)
  const [editingRod, setEditingRod] = useState<Rod | null>(null)
  const [draft, setDraft] = useState<Rod | null>(null)

  function openEdit(rod: Rod) {
    setDraft({ ...rod })
    setEditingRod(rod)
  }

  function saveEdit() {
    if (!draft) return
    setRods(prev => prev.map(r => r.id === draft.id ? draft : r))
    setEditingRod(null)
    setDraft(null)
  }

  function cancelEdit() {
    setEditingRod(null)
    setDraft(null)
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-100">My Gear</h1>
        <p className="text-stone-400 text-sm mt-1">Your rods, reels, and kit — all in one place.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-stone-900 border border-stone-700 rounded-lg p-1 w-fit">
        {(['rods', 'reels', 'gear'] as Tab[]).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'bg-green-700 text-stone-100' : 'text-stone-400 hover:text-stone-200'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Rods table */}
      {activeTab === 'rods' && (
        <div className="overflow-x-auto rounded-lg border border-stone-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-700 bg-stone-900/70">
                <th className="text-left px-4 py-3 text-stone-400 font-medium">ID</th>
                <th className="text-left px-4 py-3 text-stone-400 font-medium">Brand</th>
                <th className="text-left px-4 py-3 text-stone-400 font-medium">Model</th>
                <th className="text-left px-4 py-3 text-stone-400 font-medium">Length</th>
                <th className="text-left px-4 py-3 text-stone-400 font-medium">Line Wt</th>
                <th className="text-left px-4 py-3 text-stone-400 font-medium">Condition</th>
                <th className="text-left px-4 py-3 text-stone-300 font-medium">
                  Est. Value
                  <div className="text-stone-500 text-xs font-normal">AI estimate</div>
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800">
              {rods.map(rod => (
                <tr key={rod.id} className="hover:bg-stone-900/40 transition-colors">
                  <td className="px-4 py-3 font-mono text-amber-500 font-semibold">{rod.id}</td>
                  <td className="px-4 py-3 text-stone-200">{rod.brand}</td>
                  <td className="px-4 py-3 text-stone-300">{rod.model}</td>
                  <td className="px-4 py-3 text-stone-400">{rod.length}</td>
                  <td className="px-4 py-3 text-stone-400">{rod.lineWeight}</td>
                  <td className={`px-4 py-3 font-medium ${conditionColor(rod.condition)}`}>
                    {conditionLabel(rod.condition)}
                  </td>
                  <td className="px-4 py-3 text-green-400 font-medium">{rod.estValue}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => openEdit(rod)}
                      className="text-stone-500 hover:text-green-400 transition-colors text-xs px-2 py-1 rounded hover:bg-stone-800">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'reels' && (
        <div className="text-stone-500 text-sm py-8 text-center">No reels logged yet. Reels coming after we finish the rod inventory.</div>
      )}
      {activeTab === 'gear' && (
        <div className="text-stone-500 text-sm py-8 text-center">
          2 items logged:
          <div className="mt-4 overflow-x-auto rounded-lg border border-stone-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-700 bg-stone-900/70">
                  <th className="text-left px-4 py-3 text-stone-400 font-medium">ID</th>
                  <th className="text-left px-4 py-3 text-stone-400 font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-stone-400 font-medium">Brand</th>
                  <th className="text-left px-4 py-3 text-stone-400 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800">
                <tr>
                  <td className="px-4 py-3 font-mono text-amber-500 font-semibold">G-001</td>
                  <td className="px-4 py-3 text-stone-300">Waders</td>
                  <td className="px-4 py-3 text-stone-400">Unknown</td>
                  <td className="px-4 py-3 text-stone-400">TechH2O Waterproof/Breathable</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-amber-500 font-semibold">G-002</td>
                  <td className="px-4 py-3 text-stone-300">Waders</td>
                  <td className="px-4 py-3 text-stone-400">Guide Series</td>
                  <td className="px-4 py-3 text-stone-400">Chest waders, tan/olive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {draft && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-stone-950/80 p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-xl w-full max-w-md shadow-2xl">
            <div className="p-5 border-b border-stone-700 flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-stone-100">Edit {draft.id}</h2>
              <button onClick={cancelEdit} className="text-stone-500 hover:text-stone-300 text-xl leading-none">×</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Brand</label>
                  <input value={draft.brand} onChange={e => setDraft({ ...draft, brand: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-green-600" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Length</label>
                  <input value={draft.length} onChange={e => setDraft({ ...draft, length: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-green-600" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Model</label>
                <input value={draft.model} onChange={e => setDraft({ ...draft, model: e.target.value })}
                  className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-green-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Line Weight</label>
                  <input value={draft.lineWeight} onChange={e => setDraft({ ...draft, lineWeight: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-green-600" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Weight</label>
                  <input value={draft.weight} onChange={e => setDraft({ ...draft, weight: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-green-600" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Condition</label>
                  <select value={draft.condition} onChange={e => setDraft({ ...draft, condition: e.target.value as Condition })}
                    className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-green-600">
                    <option value="">— Select —</option>
                    {CONDITIONS.map(c => <option key={c} value={c}>{conditionLabel(c)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-400 mb-1">Est. Value</label>
                  <input value={draft.estValue} onChange={e => setDraft({ ...draft, estValue: e.target.value })}
                    placeholder="e.g. ~$200"
                    className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-green-600" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-400 mb-1">Notes</label>
                <textarea value={draft.notes} onChange={e => setDraft({ ...draft, notes: e.target.value })} rows={2}
                  className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-stone-100 text-sm focus:outline-none focus:border-green-600 resize-none" />
              </div>
            </div>
            <div className="p-5 border-t border-stone-700 flex gap-3">
              <button onClick={cancelEdit} className="flex-1 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm rounded transition-colors">Cancel</button>
              <button onClick={saveEdit} className="flex-1 py-2 bg-green-700 hover:bg-green-600 text-stone-100 text-sm font-medium rounded transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
