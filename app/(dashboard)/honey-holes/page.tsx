'use client'

import dynamic from 'next/dynamic'
import { useState, useRef } from 'react'

const HoneyHoleMap = dynamic(() => import('@/components/HoneyHoleMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-stone-900 flex items-center justify-center">
      <span className="text-stone-400 text-sm">Loading map...</span>
    </div>
  ),
})

type Filter = 'all' | 'mine' | 'public'

const FILTER_LABELS: Record<Filter, string> = {
  all: 'All',
  mine: 'My Spots',
  public: 'Public Only',
}

interface Spot {
  id: string
  name: string
  lat: number
  lng: number
  isPublic: boolean
  catches: number
  lastCatch?: string
}

const STUB_SPOTS: Spot[] = [
  {
    id: 's-001',
    name: 'Thornton River — Lower',
    lat: 38.658,
    lng: -78.23,
    isPublic: false,
    catches: 7,
    lastCatch: 'Brook trout, 11"',
  },
  {
    id: 's-002',
    name: 'Gooney Creek Bend',
    lat: 38.895,
    lng: -78.02,
    isPublic: true,
    catches: 3,
    lastCatch: 'Brown trout, 13"',
  },
  {
    id: 's-003',
    name: 'Overall Run — Above Falls',
    lat: 38.8,
    lng: -78.31,
    isPublic: true,
    catches: 5,
    lastCatch: 'Rainbow, 16"',
  },
]

export default function HoneyHolesPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const filteredSpots = STUB_SPOTS.filter((s) => {
    if (filter === 'mine') return !s.isPublic
    if (filter === 'public') return s.isPublic
    return true
  })

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-56px)]">
      {/* ── MAP PANEL ── */}
      <div className="flex-1 relative min-h-[300px]">
        <HoneyHoleMap
          spots={filteredSpots}
          onSelectSpot={setSelectedSpot}
          selectedSpotId={selectedSpot?.id ?? null}
        />
      </div>

      {/* ── SIDEBAR PANEL ── */}
      <aside className="w-full lg:w-80 bg-stone-900 border-t lg:border-t-0 lg:border-l border-stone-700 flex flex-col shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-stone-700">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-serif text-xl font-bold text-stone-100">
              Honey Holes
            </h1>
            <button
              onClick={() => fileRef.current?.click()}
              className="bg-green-700 hover:bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
            >
              Upload a Catch
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={() => {
                // backend hook goes here
              }}
            />
          </div>

          {/* Filter pills */}
          <div className="flex gap-1">
            {(Object.keys(FILTER_LABELS) as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-1 text-xs font-medium rounded transition-colors ${
                  filter === f
                    ? 'bg-green-700 text-white'
                    : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                }`}
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Spot list */}
        <div className="flex-1 overflow-y-auto divide-y divide-stone-800">
          {filteredSpots.length === 0 ? (
            <p className="p-4 text-stone-500 text-sm">No spots match this filter.</p>
          ) : (
            filteredSpots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setSelectedSpot(spot)}
                className={`w-full text-left px-4 py-3 hover:bg-stone-800 transition-colors ${
                  selectedSpot?.id === spot.id ? 'bg-stone-800' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-stone-100 text-sm font-medium">
                    {spot.name}
                  </span>
                  <span
                    className={`shrink-0 text-xs px-1.5 py-0.5 rounded font-medium ${
                      spot.isPublic
                        ? 'bg-green-900/60 text-green-400'
                        : 'bg-amber-900/60 text-amber-400'
                    }`}
                  >
                    {spot.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
                <p className="text-stone-500 text-xs mt-0.5">
                  {spot.catches} catches
                  {spot.lastCatch ? ` · Last: ${spot.lastCatch}` : ''}
                </p>
              </button>
            ))
          )}
        </div>

        {/* Selected spot detail */}
        {selectedSpot && (
          <div className="border-t border-stone-700 p-4">
            <h2 className="font-serif text-base font-bold text-stone-100 mb-1">
              {selectedSpot.name}
            </h2>
            <p className="text-stone-400 text-xs mb-3">
              {selectedSpot.catches} total catches
              {selectedSpot.lastCatch
                ? ` · Last: ${selectedSpot.lastCatch}`
                : ''}
            </p>
            {/* Public/Private toggle (UI only) */}
            <div className="flex items-center gap-3">
              <span className="text-stone-400 text-xs">Visibility:</span>
              <button
                className={`text-xs px-3 py-1 rounded font-medium transition-colors ${
                  selectedSpot.isPublic
                    ? 'bg-green-700 text-white'
                    : 'bg-stone-700 text-stone-400'
                }`}
                title="Toggle visibility (UI stub — no backend yet)"
              >
                {selectedSpot.isPublic ? 'Public' : 'Private'}
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}
