import PropTypes from "prop-types";
import { RotatingLines } from "react-loader-spinner";

const Loader = ({ size }) => {
  const defaultSize = 24; // Размер по умолчанию
  const actualSize = size || defaultSize; // Используйте размер реквизита или размер по умолчанию

  return (
    <div className='flex items-center justify-center'>
      <RotatingLines
        visible={true}
        height={actualSize}
        width={actualSize}
        strokeColor='#EABD4D'
        strokeWidth='3'
        animationDuration='0.75'
        ariaLabel='rotating-lines-loading'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.number,
};

export default Loader;
