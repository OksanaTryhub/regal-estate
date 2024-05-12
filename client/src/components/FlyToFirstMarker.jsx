import { useEffect } from "react";
import { useMap } from "react-leaflet";
import PropTypes from "prop-types";

const FlyToFirstMarker = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 5, { duration: 1.5 });
    }
  }, [position, map]);

  return null;
};

FlyToFirstMarker.propTypes = {
  position: PropTypes.array.isRequired,
};
export default FlyToFirstMarker;
