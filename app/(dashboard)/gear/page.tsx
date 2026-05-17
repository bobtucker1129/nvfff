'use client'

import { useState } from 'react'
import GearTable from '@/components/GearTable'

type Tab = 'rods' | 'reels' | 'gear'

const rodColumns = [
  'ID',
  'Brand',
  'Model',
  'Length',
  'Line Weight',
  'Weight',
  'Condition',
  'Est. Value',
]

const reelColumns = [
  'ID',
  'Brand',
  'Model',
  'Line Weight',
  'Arbor',
  'Condition',
  'Est. Value',
]

const gearColumns = ['ID', 'Type', 'Brand', 'Description', 'Condition']

const rodRows = [
  ['R-001', 'Sage', 'Graphite II 690 DS', "9'0\"", '#6', '3.5 oz', 'Good', '—'],
  ['R-002', 'Fenwick', 'Iron Feather IF 905', "9'0\"", '#5', '3.25 oz', 'Excellent', '—'],
  ['R-003', 'Sage', 'Graphite II 590 DS', "9'0\"", '#5', '3.375 oz', 'Excellent', '—'],
  ['R-004', 'Orvis', 'Superfine Graphite Trout', "8'0\"", '#6', '2.625 oz', 'TBD', '—'],
  ['R-005', 'Okuma', 'Infusion F-904-5', "9'0\"", '#5', '—', 'TBD', '—'],
  ['R-006', 'Echo', '990-4X (Rajeff Sports)', "9'0\"", '#9', '—', 'TBD', '—'],
]

const TAB_LABELS: Record<Tab, string> = {
  rods: 'Rods',
  reels: 'Reels',
  gear: 'Gear',
}

const ADD_LABELS: Record<Tab, string> = {
  rods: 'Add Rod',
  reels: 'Add Reel',
  gear: 'Add Gear',
}

export default function GearPage() {
  const [activeTab, setActiveTab] = useState<Tab>('rods')

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-100">
            My Gear
          </h1>
          <p className="text-stone-400 text-sm mt-1">
            Your rods, reels, and kit — all in one place.
          </p>
        </div>
        <button
          disabled
          className="bg-stone-700 text-stone-400 text-sm font-medium px-4 py-2 rounded-lg cursor-not-allowed"
          title="Add items once Supabase is wired"
        >
          {ADD_LABELS[activeTab]}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-stone-900 border border-stone-700 rounded-lg p-1 w-fit">
        {(Object.keys(TAB_LABELS) as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-green-700 text-white'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            {TAB_LABELS[tab]}
          </button>
        ))}
      </div>

      {/* Table panels */}
      {activeTab === 'rods' && (
        <GearTable
          columns={rodColumns}
          rows={rodRows}
          emptyMessage="No rods logged yet."
        />
      )}
      {activeTab === 'reels' && (
        <GearTable
          columns={reelColumns}
          rows={[]}
          emptyMessage="No reels logged yet."
        />
      )}
      {activeTab === 'gear' && (
        <GearTable
          columns={gearColumns}
          rows={[]}
          emptyMessage="No gear logged yet."
        />
      )}
    </div>
  )
}
