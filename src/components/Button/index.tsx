import React from 'react';
import { RotatingLines } from 'react-loader-spinner';

interface Props {
  children: React.ReactNode;
  loading?: boolean;
  className?: string;
  onClick?: any;
  loadingType?: 'text' | 'circular';
  buttonType?: 'submit' | 'button';
  disable?: boolean;
}

const Button = ({
  children,
  loading,
  className,
  onClick,
  loadingType = 'text',
  buttonType = 'submit',
  disable = false,
}: Props) => {
  return (
    <button
      className={`rounded px-6 py-3 flex justify-center items-center cursor-pointer bg-buttonColor shadow-[0_13px_39px_-15px_rgba(38,165,255,0.9)] text-white ${className}`}
      disabled={loading || disable}
      onClick={onClick}
      type={buttonType || 'submit'}
    >
      {loading ? (
        <>
          {loadingType === 'text' ? (
            <span>Loading...</span>
          ) : (
            <RotatingLines visible={true} width="20" strokeWidth="3" animationDuration="0.75" strokeColor="white" />
          )}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
