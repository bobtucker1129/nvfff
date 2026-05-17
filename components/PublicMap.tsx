'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

// Fix default marker icon paths broken by webpack
const fixLeafletIcons = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })
}

interface PublicPin {
  name: string
  lat: number
  lng: number
  catches: number
  lastCatch: string
}

const PUBLIC_PINS: PublicPin[] = [
  {
    name: 'Shenandoah Bend',
    lat: 38.8991,
    lng: -78.1705,
    catches: 2,
    lastCatch: 'Brown trout, 14"',
  },
  {
    name: 'Gooney Creek Access',
    lat: 38.9284,
    lng: -78.04,
    catches: 1,
    lastCatch: 'Brook trout, 9"',
  },
  {
    name: 'Overall Run Falls',
    lat: 38.8217,
    lng: -78.285,
    catches: 4,
    lastCatch: 'Rainbow, 18"',
  },
]

// Virginia center
const VA_CENTER: [number, number] = [37.4316, -78.6569]

export default function PublicMap() {
  useEffect(() => {
    fixLeafletIcons()
  }, [])

  return (
    <MapContainer
      center={VA_CENTER}
      zoom={7}
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {PUBLIC_PINS.map((pin) => (
        <Marker key={pin.name} position={[pin.lat, pin.lng]}>
          <Popup>
            <div className="text-stone-900">
              <p className="font-bold text-sm mb-1">{pin.name}</p>
              <p className="text-xs text-gray-600">{pin.catches} catch{pin.catches !== 1 ? 'es' : ''}</p>
              <p className="text-xs text-gray-600">Last: {pin.lastCatch}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
