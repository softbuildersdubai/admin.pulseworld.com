
import Zoom from "react-medium-image-zoom";
type Props = {
  path: string;
  alt?: string;
  className?:string
};

const ZoomImage = ({ path , alt , className}: Props) => {
  return (
    <Zoom>
      <img
      className={className}
        alt={alt}
        src={path}
      />
    </Zoom>
  );
};

export default ZoomImage;
