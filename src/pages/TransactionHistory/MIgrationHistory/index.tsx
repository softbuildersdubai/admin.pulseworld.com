import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';

// COMMON
import { refresh } from '../../../images/other';
import { useHistoryActions } from '../../../store/wallet/historyActions';
import { selectHistorySlice } from '../../../store/wallet/historySlice';
import GlobalTable from '../../../components/Table/GlobalTable';
import moment from 'moment';
import { Tooltip } from 'antd';
import { Chip } from '@mui/material';
import StatusChip from '../../../components/StatusChip';
import TokenNameWithLogo from '../../../components/TokenNameWithLogo';
import { getTableIndexNumber } from '../../../utils/utils';

const headCells = [
  { id: 'id', label: 'ID', show: true },
  { id: 'user', label: 'User', show: true },
  { id: 'requestId', label: 'Request ID', show: true },
  { id: 'requestDate', label: 'Request Date', show: true },
  { id: 'token', label: 'Token', show: true },
  { id: 'blockchainId', label: 'Account', show: true },
  { id: 'fee', label: 'Migration Fee', show: true },
  { id: 'amount', label: 'Amount', show: true },
  { id: 'denialReason', label: 'Rejection Reason', show: true },
  { id: 'status', label: 'Status', show: true, dataClass: 'text-center' },
];

type FILTER = {
  page: number;
  limit: number;
  search: string | null;
};

const MigrationHistory = () => {
  const { getMigrateHistoryRequests } = useHistoryActions();
  const { migrateHistory } = useSelector(selectHistorySlice);
  const [columns, setColumns] = useState<any[]>(headCells);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FILTER>({
    page: 1,
    limit: 10,
    search: null,
  });

  const rows = migrateHistory?.list?.map((_data, index) => {
    return {
      id: getTableIndexNumber(filter.page, index, filter.limit),
      user: `${_data?.user?.firstName ? _data?.user?.firstName : ''} ${
        _data?.user?.lastName ? _data?.user?.lastName : '-'
      }`,
      requestId: _data.requestId,
      requestDate: moment(_data?.createdAt).format('MM, DD YYYY hh:mm'),
      token: <TokenNameWithLogo tokenName={_data.token.name} />,
      blockchainId: (
        <Tooltip title={_data.blockchainId}>
          <Chip label={_data.blockchainId} size="small" sx={{ fontSize: '10px' }}></Chip>
        </Tooltip>
      ),
      amount: _data.amount,
      fee: _data.fee,
      status: <StatusChip status={_data.status} />,
      denialReason: (
        <Tooltip title={_data.denialReason ?? '-'}>
          <span>{_data.denialReason ?? '-'}</span>
        </Tooltip>
      ),
    };
  });

  const getCsvData = () => {
    // GET THE SELECTED COLUMNS
    const showKeys: any = [];
    columns.forEach((cell: any) => {
      if (cell.show && cell.id !== 'id') showKeys.push(cell.id);
    });

    const csvData: any[] = [];

    // GET DATA FOR SELECTED COLUMN IN EACH ROW
    for (const row of migrateHistory.list) {
      const data: any = {};
      const _data = {
        ...row,
        user: `${row?.user?.firstName ? row?.user?.firstName : ''} ${row?.user?.lastName ? row?.user?.lastName : '-'}`,
        requestDate: moment(row?.createdAt).format('MM, DD YYYY hh:mm'),
        token: row?.token?.name ?? '',
        blockchainId: row?.blockchainId ?? '',
      };
      showKeys.forEach((key) => (data[key] = _data[key] || ''));
      csvData.push(data);
    }

    return csvData;
  };

  useEffect(() => {
    setLoading(true);
    getMigrateHistoryRequests(true, filter);
    setLoading(false);
  }, [filter.limit, filter.page]);

  useEffect(() => {
    if (filter.search !== null) {
      const search = setTimeout(async () => {
        await getMigrateHistoryRequests(true, filter);
      }, 400);
      return () => clearTimeout(search);
    }
  }, [filter.search]);

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-1">Migration History</h1>
        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getMigrateHistoryRequests(true, filter);
            setLoading(false);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      <GlobalTable
        rows={rows}
        headCells={columns?.filter((itm) => itm?.show === true)}
        isLoading={loading}
        totalPages={migrateHistory?.totalPages}
        page={filter.page}
        handlePageChange={(page) => {
          setFilter({ ...filter, page });
        }}
        handleLimitChange={(limit) => {
          setFilter({ ...filter, limit });
        }}
        setColumns={setColumns}
        ColumnsList={columns}
        filter={filter}
        setFilter={setFilter}
        showInnerFilters={true}
        csvData={getCsvData}
      />
    </div>
  );
};

export default MigrationHistory;
