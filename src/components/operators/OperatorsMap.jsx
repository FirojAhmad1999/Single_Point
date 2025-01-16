import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const STATIC_OPERATORS = [
  {
    id: '2',
    name: 'Mountain Air',
    latitude: 51.5074,
    longitude: -0.1278,
    category: 'Helicopter',
    type: 'Operator',
    fleetSize: 5
  },
  {
    id: '1',
    name: 'Sky Aviation',
    latitude: 40.7128,
    longitude: -74.0060,
    category: 'Airplane',
    type: 'Operator',
    fleetSize: 8
  }
];

const OperatorsMap = () => {
  const customIcon = useMemo(() => new L.Icon({
    iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234B6BFB' width='32' height='32'%3E%3Cpath d='M12 0C7.31 0 3.5 3.81 3.5 8.5c0 7.94 8.5 15.5 8.5 15.5s8.5-7.56 8.5-15.5C20.5 3.81 16.69 0 12 0zm0 11a2.5 2.5 0 110-5 2.5 2.5 0 010 5z'/%3E%3C/svg%3E",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -10]
  }), []);

  return (
    <div className="relative h-full">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        className="h-[calc(100vh-64px)] w-full overflow-hidden"
        style={{ background: '#1a1a1a' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {STATIC_OPERATORS.map(operator => (
          <Marker
            key={operator.id}
            position={[operator.latitude, operator.longitude]}
            icon={customIcon}
          >
            <Popup maxWidth={320}>
              <div className="bg-[#1a1f2e] rounded-lg">
                <div className="p-4 min-w-[280px]">
                  <h2 className="text-white text-lg font-medium">{operator.name}</h2>
                  <p className="text-gray-400 text-sm">{operator.id}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white">{operator.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Type:</span>
                      <span className="text-white">{operator.type}</span>
                    </div>
                    {operator.fleetSize && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Fleet Size:</span>
                        <span className="text-white">{operator.fleetSize}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default OperatorsMap;