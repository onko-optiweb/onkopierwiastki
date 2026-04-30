'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Facility } from '@/src/data/facilities';

// Custom marker icon matching the site accent color
const defaultIcon = new L.DivIcon({
  html: `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#5B65DC"/>
    <circle cx="14" cy="13" r="5" fill="white"/>
  </svg>`,
  className: '',
  iconSize: [28, 36],
  iconAnchor: [14, 36],
  popupAnchor: [0, -36],
});

const activeIcon = new L.DivIcon({
  html: `<svg width="34" height="44" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#122056"/>
    <circle cx="14" cy="13" r="5" fill="white"/>
  </svg>`,
  className: '',
  iconSize: [34, 44],
  iconAnchor: [17, 44],
  popupAnchor: [0, -44],
});

// Fly to active marker
function FlyToActive({ facilities, activeId }: { facilities: Facility[]; activeId: number | null }) {
  const map = useMap();

  useEffect(() => {
    if (activeId === null) return;
    const f = facilities.find((f) => f.id === activeId);
    if (f && map.getSize().x > 0) {
      map.flyTo([f.lat, f.lng], 12, { duration: 0.8 });
    }
  }, [activeId, facilities, map]);

  // Fit bounds when facilities change
  useEffect(() => {
    if (facilities.length === 0) return;
    if (activeId !== null) return;
    if (map.getSize().x === 0) return;
    const bounds = L.latLngBounds(facilities.map((f) => [f.lat, f.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [facilities, activeId, map]);

  return null;
}

interface FacilitiesMapProps {
  facilities: Facility[];
  activeId: number | null;
  onSelect: (id: number) => void;
}

export default function FacilitiesMap({ facilities, activeId, onSelect }: FacilitiesMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  // Center of Poland
  const center: [number, number] = [52.0, 19.0];

  return (
    <MapContainer
      center={center}
      zoom={6}
      className="w-full h-full z-0"
      ref={mapRef}
      scrollWheelZoom={true}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToActive facilities={facilities} activeId={activeId} />
      {facilities.map((f) => (
        <Marker
          key={f.id}
          position={[f.lat, f.lng]}
          icon={activeId === f.id ? activeIcon : defaultIcon}
          eventHandlers={{
            click: () => onSelect(f.id),
          }}
        >
          <Popup>
            <div className="text-sm">
              <p className="font-bold text-[#122056] mb-1">{f.name}</p>
              <p className="text-[#8a8fa6] text-xs">{f.address}</p>
              <p className="text-[#8a8fa6] text-xs mt-1">{f.phone}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
