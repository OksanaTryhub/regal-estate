import { ThreeDots } from "react-loader-spinner";

const LoaderDots = () => {
  return (
    <div className='flex items-center justify-center'>
      <ThreeDots
        visible={true}
        height='20'
        width='20'
        color='#EABD4D'
        radius='7'
        ariaLabel='three-dots-loading'
        wrapperStyle={{}}
        wrapperClass=''
      />
    </div>
  );
};

export default LoaderDots;
