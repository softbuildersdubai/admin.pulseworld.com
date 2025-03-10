import { useState } from 'react';
import { add } from '../../images/other';

type Props = {
  viewImage: boolean;
  image?: any;
  deleteImageHandler?: any;
};

const ProductImageViewer = ({ viewImage, image, deleteImageHandler }: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`flex justify-center items-center p-4 border rounded-md ${
        !viewImage ? '' : 'border-gray-600 hover:border-gray-100'
      } relative`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {viewImage ? (
        <>
          {hovered && (
            <img
              src={add}
              alt=""
              className="w-5 h-5 bg-red-600 rounded-full rotate-45 absolute top-[-8px] right-[-8px] cursor-pointer"
              onClick={deleteImageHandler}
            />
          )}

          <img src={image && URL.createObjectURL(image)} alt="" className="w-32 h-32 object-cover" />
        </>
      ) : (
        <img src={add} alt="" className="w-32 h-32" />
      )}
    </div>
  );
};

export default ProductImageViewer;
