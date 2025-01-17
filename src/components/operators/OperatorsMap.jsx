import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { operatorService } from '../../api/operatorService';

const GOOGLE_MAPS_LIBRARIES = ['marker'];

const mapOptions = {
  mapId: 'YOUR_MAP_ID_HERE',
  disableDefaultUI: true,
  zoomControl: true,
};

const mapStyles = {
  height: '90vh',
  width: '95%',
  margin: '20px auto',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const OperatorMap = () => {
  const [operators, setOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDR8F4dlURYSnddzvyzinqp7vpOY26l-0A',
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  useEffect(() => {
    let mounted = true;

    const fetchOperators = async () => {
      try {
        const data = await operatorService.fetchOperators();
        if (mounted) {
          setOperators(data);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message || 'Failed to load operators');
          console.error('Error fetching operators:', err);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchOperators();

    return () => {
      mounted = false;
    };
  }, []);

  const createMarkers = useCallback(() => {
    if (!window.google || !mapInstanceRef.current) return;

    // Clean up existing markers
    Object.values(markersRef.current).forEach(marker => marker.map = null);
    markersRef.current = {};

    operators
      .filter(operator => operator.com_Lat && operator.com_long)
      .forEach((operator, index) => {
        const position = {
          lat: parseFloat(operator.com_Lat),
          lng: parseFloat(operator.com_long),
        };

        // Create marker element
        const markerElement = document.createElement('div');
        markerElement.innerHTML = `
          <svg viewBox="0 0 24 24" width="24" height="24" fill="#4285F4" stroke="#FFFFFF" stroke-width="1.5">
            <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
          </svg>
        `;

        // Create advanced marker
        const marker = new window.google.maps.marker.AdvancedMarkerElement({
          map: mapInstanceRef.current,
          position,
          content: markerElement,
          title: operator.name,
        });

        // Add click listener
        marker.addListener('click', () => {
          setSelectedOperator(operator);
        });

        // Store marker reference
        const markerId = operator.id || `${operator.com_Lat}-${operator.com_long}-${index}`;
        markersRef.current[markerId] = marker;
      });
  }, [operators]);

  useEffect(() => {
    if (isLoaded && operators.length > 0) {
      createMarkers();
    }
  }, [isLoaded, operators, createMarkers]);

  const onMapLoad = useCallback((map) => {
    mapInstanceRef.current = map;
    if (operators.length > 0) {
      createMarkers();
    }
  }, [operators, createMarkers]);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-lg">Error loading Google Maps</div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-lg">Loading maps...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-white text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="text-white text-lg">Loading operators...</div>
        </div>
      )}
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={{ lat: 20, lng: 0 }}
        zoom={2}
        options={mapOptions}
        onLoad={onMapLoad}
      >
        {selectedOperator && (
          <div
            className="absolute p-4 bg-white rounded-lg shadow-lg max-w-xs"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -100%)',
              zIndex: 1000
            }}
          >
            <button
              onClick={() => setSelectedOperator(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {selectedOperator.name}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <span className="font-semibold mr-2">Category:</span>
                <span>{selectedOperator.category || 'N/A'}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="font-semibold mr-2">Fleet:</span>
                <span>{selectedOperator.fleet || 'N/A'}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <span className="font-semibold mr-2">Role:</span>
                <span>
                  {selectedOperator.role}
                </span>
              </div>
            </div>
          </div>
        )}
      </GoogleMap>
    </div>
  );
};

export default React.memo(OperatorMap);