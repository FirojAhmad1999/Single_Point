import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import useOperator from '../../hooks/useOperator';
import OperatorCard from './OperatorCard';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const OperatorsMap = () => {
  const {
    operators,
    selectedOperator,
    loading,
    error,
    fetchOperators,
    selectOperator
  } = useOperator();

  const customIcon = useMemo(() => new L.Icon({
    iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234B6BFB' width='32' height='32'%3E%3Cpath d='M12 0C7.31 0 3.5 3.81 3.5 8.5c0 7.94 8.5 15.5 8.5 15.5s8.5-7.56 8.5-15.5C20.5 3.81 16.69 0 12 0zm0 11a2.5 2.5 0 110-5 2.5 2.5 0 010 5z'/%3E%3C/svg%3E",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  }), []);

  useEffect(() => {
    fetchOperators();
  }, [fetchOperators]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="relative flex-1">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        className="h-full w-full"
        style={{ background: '#1a1a1a' }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {operators.map(operator => (
          <Marker
            key={operator.id}
            position={[operator.latitude, operator.longitude]}
            icon={customIcon}
            eventHandlers={{
              click: () => selectOperator(operator.id)
            }}
          >
            <Popup className="bg-gray-800 text-white">
              <div className="p-2">
                <h3 className="font-bold">{operator.name}</h3>
                <p className="text-sm text-gray-300">{operator.category}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <OperatorCard />
    </div>
  );
};

export default OperatorsMap;