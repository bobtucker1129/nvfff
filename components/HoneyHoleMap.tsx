'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

const fixLeafletIcons = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })
}

// Green icon for public spots
const greenIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Orange icon for private spots
const orangeIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export interface HoneyHoleSpot {
  id: string
  name: string
  lat: number
  lng: number
  isPublic: boolean
  catches: number
  lastCatch?: string
}

interface HoneyHoleMapProps {
  spots: HoneyHoleSpot[]
  onSelectSpot: (spot: HoneyHoleSpot) => void
  selectedSpotId: string | null
}

// NoVA / Shenandoah center
const NOVA_CENTER: [number, number] = [38.79, -78.18]

export default function HoneyHoleMap({
  spots,
  onSelectSpot,
  selectedSpotId,
}: HoneyHoleMapProps) {
  useEffect(() => {
    fixLeafletIcons()
  }, [])

  return (
    <MapContainer
      center={NOVA_CENTER}
      zoom={9}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {spots.map((spot) => (
        <Marker
          key={spot.id}
          position={[spot.lat, spot.lng]}
          icon={spot.isPublic ? greenIcon : orangeIcon}
          eventHandlers={{
            click: () => onSelectSpot(spot),
          }}
        >
          <Popup>
            <div>
              <p className="font-bold text-sm mb-1">{spot.name}</p>
              <p className="text-xs text-gray-600">
                {spot.isPublic ? 'Public' : 'Private'} &middot;{' '}
                {spot.catches} catch{spot.catches !== 1 ? 'es' : ''}
              </p>
              {spot.lastCatch && (
                <p className="text-xs text-gray-600">Last: {spot.lastCatch}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 8,
          zIndex: 1000,
          background: 'rgba(28,25,23,0.85)',
          border: '1px solid #44403c',
          borderRadius: 8,
          padding: '6px 10px',
          fontSize: 11,
          color: '#d6d3d1',
          pointerEvents: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <span style={{ color: '#4ade80', fontWeight: 700 }}>&#9679;</span> Public
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ color: '#fb923c', fontWeight: 700 }}>&#9679;</span> Private
        </div>
      </div>
    </MapContainer>
  )
}
