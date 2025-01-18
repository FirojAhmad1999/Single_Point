import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import { useOperator } from '../../context/OperatorContext';

const GOOGLE_MAPS_LIBRARIES = ['marker'];
const GOOGLE_MAPS_API_KEY='AIzaSyDR8F4dlURYSnddzvyzinqp7vpOY26l-0A'

const mapOptions = {
  mapId: '7d83d821e81b2427',
  disableDefaultUI: true,
  zoomControl: true,
  restriction: {
    latLngBounds: null, // Will be set dynamically
    strictBounds: true,
  },
  
};

const mapStyles = {
  height: '90vh',
  width: '95%',
  margin: '20px auto',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

// Function to fetch country boundaries from Google Geocoding API
const getCountryBounds = async (countryName) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        countryName
      )}&key=${GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();

    if (data.results && data.results[0]) {
      const bounds = data.results[0].geometry.viewport;
      return {
        north: bounds.northeast.lat,
        south: bounds.southwest.lat,
        east: bounds.northeast.lng,
        west: bounds.southwest.lng,
        center: {
          lat: (bounds.northeast.lat + bounds.southwest.lat) / 2,
          lng: (bounds.northeast.lng + bounds.southwest.lng) / 2,
        },
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching country bounds:', error);
    return null;
  }
};

const OperatorMap = () => {
  const navigate = useNavigate();
  const { 
    operators, 
    selectedOperator, 
    setSelectedOperator, 
    loading, 
    error,
    filters 
  } = useOperator();
  
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapBounds, setMapBounds] = useState(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  // Update map when country filter changes
  useEffect(() => {
    const updateMapForCountry = async () => {
      if (!mapInstanceRef.current || !filters.country) return;

      const bounds = await getCountryBounds(filters.country);
      if (bounds) {
        // Update map options with country restrictions
        const newMapOptions = {
          ...mapOptions,
          restriction: {
            latLngBounds: {
              north: bounds.north,
              south: bounds.south,
              east: bounds.east,
              west: bounds.west,
            },
            strictBounds: true,
          },
        };

        // Apply new options to map
        mapInstanceRef.current.setOptions(newMapOptions);
        
        // Center the map on the country
        mapInstanceRef.current.setCenter(bounds.center);
        
        // Set appropriate zoom level
        const newZoom = Math.min(
          Math.log2(360 / (bounds.east - bounds.west)) + 1,
          Math.log2(180 / (bounds.north - bounds.south)) + 1
        );
        mapInstanceRef.current.setZoom(newZoom);

        setMapBounds(bounds);
        setMapCenter(bounds.center);
      }
    };

    updateMapForCountry();
  }, [filters.country]);

  // Filter operators based on selected country
  const filteredOperators = useCallback(() => {
    if (!filters.country || !mapBounds) return operators;

    return operators.filter(operator => {
      if (!operator.com_Lat || !operator.com_long) return false;
      
      const lat = parseFloat(operator.com_Lat);
      const lng = parseFloat(operator.com_long);
      
      return (
        lat >= mapBounds.south &&
        lat <= mapBounds.north &&
        lng >= mapBounds.west &&
        lng <= mapBounds.east
      );
    });
  }, [operators, filters.country, mapBounds]);

  const handleOperatorCardClick = async (operator) => {
    try {
      navigate(`/operator-details/${operator.comId}`);
    } catch (error) {
      console.error('Error navigating to operator details:', error);
    }
  };

  const createMarkers = useCallback(() => {
    if (!window.google || !mapInstanceRef.current) return;

    // Clean up existing markers
    Object.values(markersRef.current).forEach(marker => marker.map = null);
    markersRef.current = {};

    // Only create markers for filtered operators
    const currentOperators = filteredOperators();
    
    currentOperators.forEach((operator, index) => {
      if (!operator.com_Lat || !operator.com_long) return;

      const position = {
        lat: parseFloat(operator.com_Lat),
        lng: parseFloat(operator.com_long),
      };

      const markerElement = document.createElement('div');
      markerElement.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" fill="#4285F4" stroke="#FFFFFF" stroke-width="1.5">
          <path d="M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
        </svg>
      `;

      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map: mapInstanceRef.current,
        position,
        content: markerElement,
        title: operator.name,
      });

      marker.addListener('click', () => {
        setSelectedOperator(operator);
        
        const scale = Math.pow(2, mapInstanceRef.current.getZoom());
        const projection = mapInstanceRef.current.getProjection();
        const bounds = mapInstanceRef.current.getBounds();
        
        if (projection && bounds) {
          const point = projection.fromLatLngToPoint(new google.maps.LatLng(position));
          const center = projection.fromLatLngToPoint(bounds.getCenter());
          const worldPoint = new google.maps.Point(
            (point.x - center.x) * scale + mapInstanceRef.current.getDiv().offsetWidth / 2,
            (point.y - center.y) * scale + mapInstanceRef.current.getDiv().offsetHeight / 2
          );

          setMarkerPosition({
            x: worldPoint.x,
            y: worldPoint.y
          });
        }
      });

      const markerId = operator.id || `${operator.com_Lat}-${operator.com_long}-${index}`;
      markersRef.current[markerId] = marker;
    });
  }, [filteredOperators, setSelectedOperator]);

  useEffect(() => {
    if (isLoaded && operators.length > 0) {
      createMarkers();
    }
  }, [isLoaded, operators, createMarkers, mapBounds]);

  const onMapLoad = useCallback((map) => {
    mapInstanceRef.current = map;
  }, []);

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
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="text-white text-lg">Loading operators...</div>
        </div>
      )}
      <GoogleMap
        mapContainerStyle={mapStyles}
        center={mapCenter}
        zoom={mapZoom}
        options={{
          ...mapOptions,
          restriction: mapBounds ? {
            latLngBounds: {
              north: mapBounds.north,
              south: mapBounds.south,
              east: mapBounds.east,
              west: mapBounds.west,
            },
            strictBounds: true,
          } : undefined,
        }}
        onLoad={onMapLoad}
      >
        {selectedOperator && markerPosition && (
          <div
            className="absolute p-4 bg-white rounded-lg shadow-lg max-w-xs cursor-pointer hover:bg-gray-50 transition-colors"
            style={{
              left: `${markerPosition.x}px`,
              top: `${markerPosition.y}px`,
              transform: 'translate(-50%, -100%)',
              zIndex: 1000
            }}
            onClick={() => handleOperatorCardClick(selectedOperator)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedOperator(null);
                setMarkerPosition(null);
              }}
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
                <span>{selectedOperator.role || 'N/A'}</span>
              </div>
            </div>
          </div>
        )}
      </GoogleMap>
    </div>
  );
};

export default React.memo(OperatorMap);