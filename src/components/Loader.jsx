import { RotatingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <RotatingLines
        strokeColor="#696969"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  );
};

export default Loader;