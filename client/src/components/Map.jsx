import { useState, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import * as ELG from "esri-leaflet-geocoder";

import LoaderDots from "./LoaderDots";
import Loader from "./Loader";
import FlyToFirstMarker from "./FlyToFirstMarker";
import CustomPopup from "./CustomPopup";
import { MdMapsHomeWork } from "react-icons/md";

import "leaflet/dist/leaflet.css";

const apiKey = import.meta.env.VITE_ARCGIS_API_KEY;

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const arcGisTileLayerUrl = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}?token=${apiKey}`;

  useEffect(() => {
    const fetchAllListings = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch("/api/listings");
        const data = await res.json();
        if (data && data.length > 0) {
          setListings(data);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        console.log(error);
      }
    };
    fetchAllListings();
  }, []);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const allMarkers = await Promise.all(
        listings.map(async (item) => {
          try {
            const results = await new Promise((resolve, reject) => {
              ELG.geocodeService({ apikey: apiKey })
                .geocode()
                .text(item.address)
                .run((err, results) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(results);
                  }
                });
            });
            if (results.results && results.results.length > 0) {
              const { lat, lng } = results.results[0].latlng;
              return { ...item, position: [lat, lng] };
            } else {
              console.log("No results found for", item.address);
              return null;
            }
          } catch (error) {
            console.error("Geocoding error for", item.address, ":", error);
            return null;
          }
        })
      );

      // Filter out any failed geocoding attempts
      setMarkers(allMarkers.filter((marker) => marker !== null));
    };

    fetchCoordinates();
  }, [listings]);

  const createCustomMarkerIcon = () => {
    const iconHtml = ReactDOMServer.renderToString(
      <div className='flex items-center justify-center w-10 h-10 rounded-full border bg-gold-1 hover:bg-dark-2 border-dark-2 text-dark-2 hover:text-gold-1 hover:border-gold-1'>
        <MdMapsHomeWork className='w-6 h-6' />
      </div>
    );
    return new divIcon({
      html: iconHtml,
      className: "custom-div-icon",
      iconSize: [30, 30],
    });
  };

  const createCustomClusterIcon = (cluster) => {
    const clusterHtml = ReactDOMServer.renderToString(
      <div className='h-[80px] w-[80px] rounded-full flex items-center justify-center font-sans font-bold text-lg text-dark-1 bg-gradient-radial from-[rgba(234,189,77,0.8)] to-transparent -translate-x-1/4 -translate-y-1/4 '>
        {cluster.getChildCount()}
      </div>
    );

    return new divIcon({
      html: clusterHtml,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  return (
    <>
      {loading && !error && (
        <div className='flex w-full justify-center items-center mt-[200px]'>
          <Loader size={40} />
        </div>
      )}
      {error && !loading && (
        <div className='flex justify-center mt-20 gap-4'>
          <p>Oops... Something went wrong! Refresh the page </p>
          <LoaderDots />
        </div>
      )}
      {!loading && !error && (
        <MapContainer
          className='h-screen'
          center={[48.450001, 34.983334]}
          zoom={13}
          style={{ height: "80vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            // url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            url={arcGisTileLayerUrl}
          />
          <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.position} icon={createCustomMarkerIcon()}>
                <Popup>{<CustomPopup popupInfo={marker.name} id={marker._id} />}</Popup>
              </Marker>
            ))}
            {markers[0] && <FlyToFirstMarker position={markers[0].position} />}
          </MarkerClusterGroup>
        </MapContainer>
      )}
    </>
  );
};

export default Map;
