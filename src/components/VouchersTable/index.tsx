import { useEffect, useState } from 'react';
import GlobalTable from '../Table/GlobalTable';
import { useProductActions } from '../../store/products/productActions';
import { Chip } from '@mui/material';

type Props = {
  id: string;
  status: string;
};

const headCells = [
  { id: 'code', label: 'Code' },
  { id: 'status', label: 'Status' },
  { id: 'createdAt', label: 'Created At' },
];

const VouchersTable = ({ id, status }: Props) => {
  const [loading, setLoading] = useState<any>(true);
  const [vouchers, setVouchers] = useState<any>();
  const [page, setPage] = useState<any>(1);

  const { getProductVouchers } = useProductActions();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const _data = await getProductVouchers(id, status, page);

      setVouchers(_data);
      setLoading(false);
    })();
  }, [page]);

  const rows = vouchers?.list?.map((_data) => {
    return {
      code: _data?.code,
      status: <Chip label={_data?.status} size="small" sx={{ fontSize: '11px' }} color="success" />,
      createdAt: _data?.createdAt,
    };
  });

  return (
    // TABLE
    <div className="my-10">
      <div className="bg-[#181717] px-5 py-5 font-bold text-2xl">VOUCHERS</div>
      <GlobalTable
        rows={rows}
        headCells={headCells}
        isLoading={loading}
        page={page}
        handlePageChange={setPage}
        totalPages={vouchers?.totalPages}
      />
    </div>
  );
};

export default VouchersTable;
