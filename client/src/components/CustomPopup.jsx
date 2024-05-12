import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const CustomPopup = ({ popupInfo, id }) => {
  const navigate = useNavigate();

  return (
    <div>
      <p> {popupInfo}</p>
      <button type='button' onClick={() => navigate(`/listing/${id}`)}>
        Show details
      </button>
    </div>
  );
};

CustomPopup.propTypes = {
  popupInfo: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default CustomPopup;
