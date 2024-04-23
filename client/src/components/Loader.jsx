import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className='flex items-center justify-center'>
      <RotatingLines
        visible={true}
        height='24'
        width='24'
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
