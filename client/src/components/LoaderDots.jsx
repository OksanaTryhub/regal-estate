import PropTypes from "prop-types";
import { ThreeDots } from "react-loader-spinner";

const LoaderDots = ({ color }) => {
  const defaultColor = "#EABD4D";
  const actualColor = color || defaultColor;
  return (
    <div className='flex items-center justify-center'>
      <ThreeDots
        visible={true}
        height='20'
        width='20'
        color={actualColor}
        radius='7'
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  );
};

LoaderDots.propTypes = {
  color: PropTypes.string,
};

export default LoaderDots;
