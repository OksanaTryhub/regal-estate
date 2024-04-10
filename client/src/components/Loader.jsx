import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className='flex items-center justify-center'>
      <RotatingLines
        visible={true}
        height='28'
        width='28'
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

export default Loader;
