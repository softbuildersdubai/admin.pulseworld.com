import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { refresh } from '../../../images/other';
import { useHistoryActions } from '../../../store/wallet/historyActions';
import { selectHistorySlice } from '../../../store/wallet/historySlice';
import GlobalTable from '../../../components/Table/GlobalTable';
import moment from 'moment';
import { getTableIndexNumber } from '../../../utils/utils';
import { Chip } from '@mui/material';

const headCells = [
  { id: 'id', label: 'ID', show: true },
  { id: 'user', label: 'User', show: true },
  { id: 'withdrawableBalance', label: 'Withdrawable Balance', show: true },
  { id: 'initialBalance', label: 'Initial Balance', show: true },
  { id: 'claimableValue', label: 'Claimable Value', show: true },
  { id: 'amount', label: 'Amount', show: true },
//   { id: 'status', label: 'Status', show: true },
  { id: 'date', label: 'Date', show: true },
];

type FILTER = {
  page: number;
  limit: number;
  search: string | null;
};

const ClaimHistory = () => {
  const { getClaimHistory } = useHistoryActions();
  const { claimHistory } = useSelector(selectHistorySlice);
  const [columns, setColumns] = useState<any[]>(headCells);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState<FILTER>({
    page: 1,
    limit: 10,
    search: null,
  });

  const rows = claimHistory?.list?.map((_data: any, index) => ({
    id: getTableIndexNumber(filter.page, index, filter.limit),
    user: `${_data?.user?.firstName || ''} ${_data?.user?.lastName || '-'}`,
    withdrawableBalance: _data?.wallet?.withdrawableBalance || '0',
    initialBalance: _data?.wallet?.initialBalance || '0',
    claimableValue: _data?.wallet?.claimableValue || '0',
    amount: _data?.amount || '0',
    // status: (
    //   <Chip
    //     label={_data?.status || 'PENDING'}
    //     size="small"
    //     color={_data?.status === 'COMPLETED' ? 'success' : _data?.status === 'PENDING' ? 'default' : 'error'}
    //     sx={{ fontSize: '10px', fontWeight: 700 }}
    //   />
    // ),
    date: moment(_data?.createdAt).format('MMM, DD YYYY hh:mm'),
  })) || [];

  const fetchData = async () => {
    setLoading(true);
    await getClaimHistory(true, filter);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [filter.limit, filter.page]);

  useEffect(() => {
    if (filter.search !== null) {
      const search = setTimeout(() => {
        fetchData();
      }, 400);
      return () => clearTimeout(search);
    }
  }, [filter.search]);

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-5">Claim History</h1>
        <div className="flex gap-1 items-center cursor-pointer px-3" onClick={fetchData}>
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      <GlobalTable
        rows={rows}
        headCells={columns?.filter((itm) => itm?.show === true)}
        isLoading={loading}
        totalPages={claimHistory?.totalPages}
        page={filter.page}
        handlePageChange={(page) => setFilter({ ...filter, page })}
        handleLimitChange={(limit) => setFilter({ ...filter, limit })}
        setColumns={setColumns}
        ColumnsList={columns}
        filter={filter}
        setFilter={setFilter}
        showInnerFilters={true}
      />
    </div>
  );
};

export default ClaimHistory; 