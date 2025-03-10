import { RotatingLines } from 'react-loader-spinner';

type Props = {
  width?: number;
  className?: string;
};

const Loader = ({ width = 50, className = '' }: Props) => {
  return (
    <div id="preloader" className={`flex justify-center items-center ${className}`}>
      <RotatingLines visible={true} width={`${width}`} strokeWidth="3" animationDuration="0.75" strokeColor="#eee" />
    </div>
  );
};

export default Loader;
