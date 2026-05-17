'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

type Tab = 'rods' | 'reels' | 'gear'
type Condition = 'excellent' | 'good' | 'fair' | 'poor' | ''

interface Rod {
  id: string
  user_id: string
  brand: string
  model: string | null
  length_ft: number | null
  line_weight: number | null
  weight_oz: number | null
  condition: Condition
  est_value_usd: number | null
  notes: string | null
  created_at: string
}

const CONDITIONS: Condition[] = ['excellent', 'good', 'fair', 'poor']

const conditionLabel = (c: Condition) =>
  c ? c.charAt(0).toUpperCase() + c.slice(1) : '—'

const conditionColor = (c: Condition) => {
  if (c === 'excellent') return 'text-green-600'
  if (c === 'good') return 'text-lime-600'
  if (c === 'fair') return 'text-amber-600'
  if (c === 'poor') return 'text-red-600'
  return 'text-stone-400'
}

function formatLength(ft: number | null): string {
  if (!ft) return '—'
  const whole = Math.floor(ft)
  const inches = Math.round((ft - whole) * 12)
  return inches > 0 ? `${whole}'${inches}"` : `${whole}'0"`
}

function parseLength(val: string): number | null {
  const match = val.match(/(\d+)'(\d+)/)
  if (match) {
    return parseInt(match[1]) + parseInt(match[2]) / 12
  }
  const num = parseFloat(val)
  return isNaN(num) ? null : num
}

export default function GearPage() {
  const [activeTab, setActiveTab] = useState<Tab>('rods')
  const [rods, setRods] = useState<Rod[]>([])
  const [loading, setLoading] = useState(true)
  const [editingRod, setEditingRod] = useState<Rod | null>(null)
  const [draft, setDraft] = useState<Partial<Rod> | null>(null)
  const [error, setError] = useState('')

  const supabase = createClient()

  useEffect(() => {
    loadRods()
  }, [])

  async function loadRods() {
    setLoading(true)
    const { data, error } = await supabase
      .from('rods')
      .select('*')
      .order('id')

    if (error) {
      setError(error.message)
    } else if (data && data.length > 0) {
      setRods(data)
    } else {
      // Seed initial data if empty
      await seedRods()
    }
    setLoading(false)
  }

  async function seedRods() {
    const seedData = [
      { id: 'R-001', brand: 'Sage', model: 'Graphite II 690 DS', length_ft: 9.0, line_weight: 6, weight_oz: 3.5, condition: 'good' as Condition, est_value_usd: 200, notes: '' },
      { id: 'R-002', brand: 'Fenwick', model: 'Iron Feather IF 905', length_ft: 9.0, line_weight: 5, weight_oz: 3.25, condition: 'excellent' as Condition, est_value_usd: 265, notes: 'Late 70s fiberglass — collectible' },
      { id: 'R-003', brand: 'Sage', model: 'Graphite II 590 DS', length_ft: 9.0, line_weight: 5, weight_oz: 3.375, condition: 'excellent' as Condition, est_value_usd: 225, notes: '' },
      { id: 'R-004', brand: 'Orvis', model: 'Superfine Graphite Trout', length_ft: 8.0, line_weight: 6, weight_oz: 2.625, condition: '' as Condition, est_value_usd: 275, notes: 'Date code: 0990 (Oct 1990)' },
      { id: 'R-005', brand: 'Okuma', model: 'Infusion F-904-5', length_ft: 9.0, line_weight: 5, weight_oz: null, condition: '' as Condition, est_value_usd: 65, notes: '' },
      { id: 'R-006', brand: 'Echo', model: '990-4X (Rajeff Sports)', length_ft: 9.0, line_weight: 9, weight_oz: null, condition: '' as Condition, est_value_usd: 120, notes: '4-piece travel rod' },
    ]

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const rodsWithUser = seedData.map(r => ({ ...r, user_id: user.id }))
    
    const { error } = await supabase.from('rods').insert(rodsWithUser)
    if (!error) {
      loadRods()
    }
  }

  function openEdit(rod: Rod) {
    setDraft({ ...rod })
    setEditingRod(rod)
  }

  async function saveEdit() {
    if (!draft || !draft.id) return
    
    const { error } = await supabase
      .from('rods')
      .update({
        brand: draft.brand,
        model: draft.model,
        length_ft: draft.length_ft,
        line_weight: draft.line_weight,
        weight_oz: draft.weight_oz,
        condition: draft.condition || null,
        est_value_usd: draft.est_value_usd,
        notes: draft.notes,
      })
      .eq('id', draft.id)

    if (error) {
      setError(error.message)
      return
    }

    setEditingRod(null)
    setDraft(null)
    loadRods()
  }

  function cancelEdit() {
    setEditingRod(null)
    setDraft(null)
    setError('')
  }

  if (loading) {
    return (
      <div className="p-4 sm:p-6 max-w-6xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-stone-200 rounded w-48"></div>
          <div className="h-4 bg-stone-200 rounded w-64"></div>
          <div className="h-64 bg-stone-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-stone-900">My Gear</h1>
        <p className="text-stone-500 text-sm mt-1">Your rods, reels, and kit — all in one place.</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-white border border-stone-200 rounded-lg p-1 w-fit shadow-sm">
        {(['rods', 'reels', 'gear'] as Tab[]).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-1.5 rounded-md text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'bg-green-700 text-white' : 'text-stone-500 hover:text-stone-800'}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Rods table */}
      {activeTab === 'rods' && (
        <div className="overflow-x-auto rounded-lg border border-stone-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50">
                <th className="text-left px-4 py-3 text-stone-500 font-medium">ID</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Brand</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Model</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Length</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Line</th>
                <th className="text-left px-4 py-3 text-stone-500 font-medium">Condition</th>
                <th className="text-left px-4 py-3 text-stone-600 font-medium">
                  Est. Value
                  <div className="text-stone-400 text-xs font-normal">AI estimate</div>
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rods.map(rod => (
                <tr key={rod.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-amber-600 font-semibold">{rod.id}</td>
                  <td className="px-4 py-3 text-stone-800">{rod.brand}</td>
                  <td className="px-4 py-3 text-stone-600">{rod.model || '—'}</td>
                  <td className="px-4 py-3 text-stone-500">{formatLength(rod.length_ft)}</td>
                  <td className="px-4 py-3 text-stone-500">#{rod.line_weight || '—'}</td>
                  <td className={`px-4 py-3 font-medium ${conditionColor(rod.condition)}`}>
                    {conditionLabel(rod.condition)}
                  </td>
                  <td className="px-4 py-3 text-green-600 font-medium">
                    {rod.est_value_usd ? `~$${rod.est_value_usd}` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => openEdit(rod)}
                      className="text-stone-400 hover:text-green-600 transition-colors text-xs px-2 py-1 rounded hover:bg-stone-100">
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
        <div className="text-stone-500 text-sm py-8 text-center bg-white rounded-lg border border-stone-200">
          No reels logged yet. Reels coming after we finish the rod inventory.
        </div>
      )}
      {activeTab === 'gear' && (
        <div className="text-stone-500 text-sm py-8 text-center bg-white rounded-lg border border-stone-200">
          2 items logged:
          <div className="mt-4 overflow-x-auto rounded-lg border border-stone-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50">
                  <th className="text-left px-4 py-3 text-stone-500 font-medium">ID</th>
                  <th className="text-left px-4 py-3 text-stone-500 font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-stone-500 font-medium">Brand</th>
                  <th className="text-left px-4 py-3 text-stone-500 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="px-4 py-3 font-mono text-amber-600 font-semibold">G-001</td>
                  <td className="px-4 py-3 text-stone-600">Waders</td>
                  <td className="px-4 py-3 text-stone-500">Unknown</td>
                  <td className="px-4 py-3 text-stone-500">TechH2O Waterproof/Breathable</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-amber-600 font-semibold">G-002</td>
                  <td className="px-4 py-3 text-stone-600">Waders</td>
                  <td className="px-4 py-3 text-stone-500">Guide Series</td>
                  <td className="px-4 py-3 text-stone-500">Chest waders, tan/olive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {draft && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-stone-900/50 p-4">
          <div className="bg-white border border-stone-200 rounded-xl w-full max-w-md shadow-2xl">
            <div className="p-5 border-b border-stone-200 flex items-center justify-between">
              <h2 className="font-serif text-lg font-bold text-stone-900">Edit {draft.id}</h2>
              <button onClick={cancelEdit} className="text-stone-400 hover:text-stone-600 text-xl leading-none">×</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Brand</label>
                  <input value={draft.brand || ''} onChange={e => setDraft({ ...draft, brand: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded px-3 py-2 text-stone-900 text-sm focus:outline-none focus:border-green-600" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Length (e.g. 9&apos;0&quot;)</label>
                  <input value={formatLength(draft.length_ft || null)} onChange={e => setDraft({ ...draft, length_ft: parseLength(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded px-3 py-2 text-stone-900 text-sm focus:outline-none focus:border-green-600" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Model</label>
                <input value={draft.model || ''} onChange={e => setDraft({ ...draft, model: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded px-3 py-2 text-stone-900 text-sm focus:outline-none focus:border-green-600" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Line Weight</label>
                  <input type="number" value={draft.line_weight || ''} onChange={e => setDraft({ ...draft, line_weight: e.target.value ? parseInt(e.target.value) : null })}
                    className="w-full bg-stone-50 border border-stone-200 rounded px-3 py-2 text-stone-900 text-sm focus:outline-none focus:border-green-600" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Weight (oz)</label>
                  <input type="number" step="0.1" value={draft.weight_oz || ''} onChange={e => setDraft({ ...draft, weight_oz: e.target.value ? parseFloat(e.target.value) : null })}
                    className="w-full bg-stone-50 border border-stone-200 rounded px-3 py-2 text-stone-900 text-sm focus:outline-none focus:border-green-600" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Condition</label>
                  <select value={draft.condition || ''} onChange={e => setDraft({ ...draft, condition: e.target.value as Condition })}
                    className="w-full bg-stone-50 border border-stone-200 rounded px-3 py-2 text-stone-900 text-sm focus:outline-none focus:border-green-600">
                    <option value="">— Select —</option>
                    {CONDITIONS.map(c => <option key={c} value={c}>{conditionLabel(c)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Est. Value ($)</label>
                  <input type="number" value={draft.est_value_usd || ''} onChange={e => setDraft({ ...draft, est_value_usd: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="200"
                    className="w-full bg-stone-50 border border-stone-200 rounded px-3 py-2 text-stone-900 text-sm focus:outline-none focus:border-green-600" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Notes</label>
                <textarea value={draft.notes || ''} onChange={e => setDraft({ ...draft, notes: e.target.value })} rows={2}
                  className="w-full bg-stone-50 border border-stone-200 rounded px-3 py-2 text-stone-900 text-sm focus:outline-none focus:border-green-600 resize-none" />
              </div>
            </div>
            <div className="p-5 border-t border-stone-200 flex gap-3">
              <button onClick={cancelEdit} className="flex-1 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 text-sm rounded transition-colors">Cancel</button>
              <button onClick={saveEdit} className="flex-1 py-2 bg-green-700 hover:bg-green-600 text-white text-sm font-medium rounded transition-colors">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
