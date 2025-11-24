'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Driver } from '@/lib/types';

interface LiveMapProps {
  drivers: Driver[];
}

export default function LiveMap({ drivers }: LiveMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  const activeDrivers = drivers.filter((d) => d.currentLocation);
  const center = activeDrivers.length > 0
    ? [activeDrivers[0].currentLocation!.lat, activeDrivers[0].currentLocation!.lng] as [number, number]
    : [12.9716, 77.5946] as [number, number];

  const truckIcon = new Icon({
    iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDA4NGM3Ij48cGF0aCBkPSJNMTggMThoLTF2LTFjMC0uNTUtLjQ1LTEtMS0xcy0xIC40NS0xIDF2MWgtNHYtMWMwLS41NS0uNDUtMS0xLTFzLTEgLjQ1LTEgMXYxSDd2LTFjMC0uNTUtLjQ1LTEtMS0xcy0xIC40NS0xIDF2MUg0VjZoNHYxYzAgLjU1LjQ1IDEgMSAxczEtLjQ1IDEtMVY2aDR2MWMwIC41NS40NSAxIDEgMXMxLS40NSAxLTFWNmg0djEyaC0yeiIvPjwvc3ZnPg==',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {activeDrivers.map((driver) => (
          <Marker
            key={driver.id}
            position={[driver.currentLocation!.lat, driver.currentLocation!.lng]}
            icon={truckIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold">{driver.name}</h3>
                <p className="text-sm">ID: {driver.id}</p>
                <p className="text-sm">Vehicle: {driver.vehicleNumber}</p>
                <p className="text-sm">Status: {driver.status}</p>
                <p className="text-sm">Orders: {driver.assignedOrders}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
