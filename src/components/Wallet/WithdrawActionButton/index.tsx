import { ReactNode } from 'react';

type Props = { onClick: any; className: string; status: string; children: ReactNode };

const WithdrawActionButton = ({ onClick, className, status, children }: Props) => {
  return (
    <button
      className={`text-xs font-normal text-white rounded-md px-2 py-1 transition-all duration-150 ease-in-out ${
        (status === 'COMPLETED' || status === 'DENIED') && ' !bg-gray-600 cursor-not-allowed hover:bg-gray-600'
      } ${className}`}
      onClick={onClick}
      disabled={status === 'COMPLETED' || status === 'DENIED'}
    >
      {children}
    </button>
  );
};

export default WithdrawActionButton;
