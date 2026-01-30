import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

// Import Css
import '../styling/leaflet-address.css';

// Fix marker icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Refresh Map
function RecenterMap({ lat, lng }) {
  const map = useMap();

  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);

  return null;
}

export function AddressInput({ setAddress, setCoordinates, setShippingFee }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value) return setSuggestions([]);

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}`);
      const data = await res.json();
      setSuggestions(data);
    } catch (err) {
      console.error('Error fetching address suggestions:', err);
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setAddress(place.display_name);
    setCoordinates({ lat: parseFloat(place.lat), lng: parseFloat(place.lon) });
    setShippingFee(Math.floor(Math.random() * 5) + 3);
    setQuery(place.display_name);
    setSuggestions([]);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setAddress('');
    setCoordinates({ lat: null, lng: null});
    setShippingFee(0);
  };

  return (
    <div className="address-wrapper">
      <input
        value={query}
        onChange={handleChange}
        placeholder="Find your location.."
        className="address-input"
      />

      {query && (
          <span
            onClick={handleClear}
            className='address-clear'
          >
            <i className='fa fa-times'></i>
          </span>
      )}

      {suggestions.length > 0 && (
        <ul className="address-suggestions">
          {suggestions.map(place => (
            <li key={place.place_id} onClick={() => handleSelect(place)}>
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function MapPreview({ coordinates }) {
  if (!coordinates.lat || !coordinates.lng) return null;

  return (
    <MapContainer
      center={[coordinates.lat, coordinates.lng]}
      zoom={15}
      className="map-preview"
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[coordinates.lat, coordinates.lng]} />
      <RecenterMap lat={coordinates.lat} lng={coordinates.lng} />
    </MapContainer>
  );
}