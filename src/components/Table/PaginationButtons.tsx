import { Pagination, Stack } from '@mui/material';
type PaginationButtonsProps = {
  count: any;
  totalPage?: number; // Add this line
  onChange: any;
  paginationPosition?: 'center' | 'right';
};

export default function PaginationButtons({
  onChange,
  totalPage,
  paginationPosition = 'center',
}: PaginationButtonsProps): JSX.Element {
  const position = paginationPosition === 'center' ? 'justify-center' : 'flex justify-end';

  return (
    <div className={`flex ${position}`}>
      <div className="flex justify-center p-1 space-x-1 rounded-lg">
        <Stack spacing={2}>
          {totalPage !== 1 && (
            <Pagination
              count={totalPage}
              shape="rounded"
              onChange={(e, page: number) => onChange(page)}
              sx={{
                '.Mui-selected': {
                  backgroundColor: 'rgba(38, 165, 255, 0.16)',
                  color: '#26A5FF',
                },
                '.Mui-selected:hover': {
                  backgroundColor: 'rgba(38, 165, 255, 0.8)',
                  color: '#fff',
                },
              }}
            />
          )}
        </Stack>
        {/* <button className=''>
                    <div className='flex justify-center p-1 space-x-1 rounded-lg'>
                        <img src={leftArrowTPGN} alt="" />
                    </div>
                </button>
                <button className=''>
                    <div className='flex justify-center p-1 space-x-1 bg-slate-300 rounded-lg shadow-xl'>
                        <span className='pl-2 pr-2'>1</span>
                    </div>
                </button>
                <button className=''>
                    <div className='flex justify-center p-1 space-x-1 rounded-lg'>
                        <span className='pl-2 pr-2'>2</span>
                    </div>
                </button>

                <button className=''>
                    <div className='flex justify-center p-1 space-x-1 rounded-lg'>
                        <span className='pl-2 pr-2'>8</span>
                    </div>
                </button>
                <button className=''>
                    <div className='flex justify-center p-1 space-x-1 rounded-lg'>
                        <span className='pl-2 pr-2'>9</span>
                    </div>
                </button>
                <button className=''>
                    <div className='flex justify-center p-1 space-x-1 rounded-lg'>
                        <img src={rightArrowTPGN} alt="" />
                    </div>
                </button> */}

        {/* paginatiopn */}
      </div>
    </div>
  );
}
