import './cardDetailLocation.scss';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from '/src/assets/pin-marker.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import Spinner from '/src/components/ReusableComponents/Spinner/Spinner';
import infinity from '/src/assets/infinity.svg';
const CardDetailLocation = ({ resultData, loader }) => {
  const defaultIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [45, 45],
    iconAnchor: [22.5, 45],
    shadowSize: [65, 45],
  });

  return (
    <section className="location-container">
      {loader ? (
        <Spinner spinnerImage={infinity} searchClass="map-loader" />
      ) : (
        <MapContainer
          center={[resultData.listingLat, resultData.listingLng]}
          zoom={13}
          scrollWheelZoom={true}
          className="location-container__map"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={[resultData.listingLat, resultData.listingLng]}
            icon={defaultIcon}
          ></Marker>
        </MapContainer>
      )}
    </section>
  );
};

export default CardDetailLocation;
