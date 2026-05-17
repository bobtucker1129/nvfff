'use client'

import dynamic from 'next/dynamic'
import { useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'

const HoneyHoleMap = dynamic(() => import('@/components/HoneyHoleMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-stone-900 flex items-center justify-center">
      <span className="text-stone-400 text-sm">Loading map...</span>
    </div>
  ),
})

type Filter = 'all' | 'mine' | 'public'

interface Spot {
  id: string
  name: string
  lat: number
  lng: number
  isPublic: boolean
  catches: number
  lastCatch?: string
}

interface PendingCatch {
  file: File
  previewUrl: string
  lat: number | null
  lng: number | null
  gpsError: boolean
}

const STUB_SPOTS: Spot[] = [
  { id: 's-001', name: 'Thornton River — Lower', lat: 38.658, lng: -78.23, isPublic: false, catches: 7, lastCatch: 'Brook trout, 11"' },
  { id: 's-002', name: 'Gooney Creek Bend', lat: 38.895, lng: -78.02, isPublic: true, catches: 3, lastCatch: 'Brown trout, 13"' },
  { id: 's-003', name: 'Overall Run — Above Falls', lat: 38.8, lng: -78.31, isPublic: true, catches: 5, lastCatch: 'Rainbow, 16"' },
]

export default function HoneyHolesPage() {
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null)
  const [spots, setSpots] = useState<Spot[]>(STUB_SPOTS)
  const [pending, setPending] = useState<PendingCatch | null>(null)
  const [species, setSpecies] = useState('')
  const [notes, setNotes] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const previewUrl = URL.createObjectURL(file)
    let lat: number | null = null
    let lng: number | null = null
    let gpsError = false

    try {
      const exifr = await import('exifr')
      const gps = await exifr.gps(file)
      if (gps?.latitude && gps?.longitude) {
        lat = gps.latitude
        lng = gps.longitude
      } else {
        gpsError = true
      }
    } catch {
      gpsError = true
    }

    setPending({ file, previewUrl, lat, lng, gpsError })
    setSpecies('')
    setNotes('')
    setIsPublic(false)
    setUploadError('')
    // Reset file input so same file can be re-selected
    e.target.value = ''
  }

  async function handleSubmitCatch() {
    if (!pending || !pending.lat || !pending.lng) return
    setUploading(true)
    setUploadError('')

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not logged in')

      // Upload photo to Supabase Storage
      const ext = pending.file.name.split('.').pop() ?? 'jpg'
      const path = `${user.id}/${Date.now()}.${ext}`
      const { error: uploadErr } = await supabase.storage
        .from('catch-photos')
        .upload(path, pending.file, { upsert: false })
      if (uploadErr) throw uploadErr

      const { data: urlData } = supabase.storage.from('catch-photos').getPublicUrl(path)

      // Insert catch record
      const { error: dbErr } = await supabase.from('catches').insert({
        user_id: user.id,
        lat: pending.lat,
        lng: pending.lng,
        photo_url: urlData.publicUrl,
        fish_species: species || null,
        notes: notes || null,
        is_public: isPublic,
      })
      if (dbErr) throw dbErr

      // Add pin to local map
      const newSpot: Spot = {
        id: `new-${Date.now()}`,
        name: species ? `${species} catch` : 'New catch',
        lat: pending.lat,
        lng: pending.lng,
        isPublic,
        catches: 1,
        lastCatch: species || undefined,
      }
      setSpots(prev => [newSpot, ...prev])
      setPending(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      // If storage bucket doesn't exist yet, show friendly message
      if (msg.includes('Bucket not found') || msg.includes('bucket')) {
        setUploadError('Storage not set up yet — ask your admin to create the "catch-photos" bucket in Supabase.')
      } else {
        setUploadError(msg)
      }
    } finally {
      setUploading(false)
    }
  }

  const filteredSpots = spots.filter(s => {
    if (filter === 'mine') return !s.isPublic
    if (filter === 'public') return s.isPublic
    return true
  })

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-56px)]">

      {/* ── MAP ── */}
      <div className="flex-1 relative min-h-[300px]">
        <HoneyHoleMap spots={filteredSpots} onSelectSpot={setSelectedSpot} selectedSpotId={selectedSpot?.id ?? null} />
      </div>

      {/* ── SIDEBAR ── */}
      <aside className="w-full lg:w-80 bg-stone-900 border-t lg:border-t-0 lg:border-l border-stone-700 flex flex-col shrink-0">
        <div className="p-4 border-b border-stone-700">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-serif text-xl font-bold text-stone-100">Honey Holes</h1>
            <button
              onClick={() => fileRef.current?.click()}
              className="bg-green-700 hover:bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
            >
              + Upload a Catch
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
          <div className="flex gap-1">
            {(['all', 'mine', 'public'] as Filter[]).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-1 py-1 text-xs font-medium rounded transition-colors ${filter === f ? 'bg-green-700 text-white' : 'bg-stone-800 text-stone-400 hover:text-stone-200'}`}>
                {f === 'all' ? 'All' : f === 'mine' ? 'My Spots' : 'Public'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-stone-800">
          {filteredSpots.map(spot => (
            <button key={spot.id} onClick={() => setSelectedSpot(spot)}
              className={`w-full text-left px-4 py-3 hover:bg-stone-800 transition-colors ${selectedSpot?.id === spot.id ? 'bg-stone-800' : ''}`}>
              <div className="flex items-start justify-between gap-2">
                <span className="text-stone-100 text-sm font-medium">{spot.name}</span>
                <span className={`shrink-0 text-xs px-1.5 py-0.5 rounded font-medium ${spot.isPublic ? 'bg-green-900/60 text-green-400' : 'bg-amber-900/60 text-amber-400'}`}>
                  {spot.isPublic ? 'Public' : 'Private'}
                </span>
              </div>
              <p className="text-stone-500 text-xs mt-0.5">{spot.catches} catches{spot.lastCatch ? ` · Last: ${spot.lastCatch}` : ''}</p>
            </button>
          ))}
        </div>
      </aside>

      {/* ── UPLOAD MODAL ── */}
      {pending && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-xl w-full max-w-sm shadow-2xl overflow-hidden">
            {/* Photo preview */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={pending.previewUrl} alt="Catch preview" className="w-full h-48 object-cover" />

            <div className="p-4 space-y-4">
              <h2 className="font-serif text-lg font-bold text-stone-100">Log this catch</h2>

              {pending.gpsError ? (
                <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-3 text-amber-300 text-xs">
                  No GPS found in this photo. Make sure Location Services are enabled on your camera app, or take the photo from within this app to capture GPS automatically.
                </div>
              ) : (
                <p className="text-stone-400 text-xs">
                  📍 GPS: {pending.lat?.toFixed(4)}, {pending.lng?.toFixed(4)}
                </p>
              )}

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Species (optional)</label>
                <input type="text" placeholder="e.g. Brook trout, Rainbow, Brown..." value={species} onChange={e => setSpecies(e.target.value)}
                  className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-stone-100 text-sm placeholder-stone-500 focus:outline-none focus:border-green-600" />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-300 mb-1">Notes (optional)</label>
                <textarea placeholder="Size, fly used, conditions..." value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                  className="w-full bg-stone-800 border border-stone-600 rounded px-3 py-2 text-stone-100 text-sm placeholder-stone-500 focus:outline-none focus:border-green-600 resize-none" />
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setIsPublic(p => !p)}
                  className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${isPublic ? 'bg-green-700 text-white' : 'bg-stone-800 text-stone-400'}`}>
                  {isPublic ? '🌍 Public' : '🔒 Private'}
                </button>
                <span className="text-stone-500 text-xs">{isPublic ? 'Visible to all members' : 'Only you can see this'}</span>
              </div>

              {uploadError && <p className="text-red-400 text-xs">{uploadError}</p>}

              <div className="flex gap-2">
                <button onClick={() => setPending(null)} className="flex-1 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 text-sm rounded transition-colors">
                  Cancel
                </button>
                <button
                  onClick={handleSubmitCatch}
                  disabled={uploading || pending.gpsError}
                  className="flex-1 py-2 bg-green-700 hover:bg-green-600 disabled:bg-stone-700 disabled:text-stone-500 text-white text-sm font-medium rounded transition-colors"
                >
                  {uploading ? 'Saving...' : 'Save Catch'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
