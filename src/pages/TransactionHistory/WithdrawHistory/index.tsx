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
import { Link } from 'react-router-dom';
import TokenNameWithLogo from '../../../components/TokenNameWithLogo';
import { getTableIndexNumber } from '../../../utils/utils';

const headCells = [
  { id: 'id', label: 'ID', show: true },
  { id: 'user', label: 'User', show: true },
  { id: 'requestId', label: 'Request ID', dataClass: 'w-32', show: true },
  { id: 'requestDate', label: 'Request Date', dataClass: 'w-36', show: true },
  { id: 'token', label: 'Token', dataClass: 'w-36', show: true },
  { id: 'network', label: 'Network', dataClass: 'w-36', show: true },
  { id: 'address', label: 'Wallet Address', dataClass: 'max-w-32', show: true },
  { id: 'fee', label: 'Withdrawal Fee', dataClass: 'w-36', show: true },
  { id: 'amount', label: 'Withdrawal Amount', dataClass: 'w-44', show: true },
  { id: 'trxHashUrl', label: 'Transaction Hash', dataClass: 'max-w-32', show: true },
  { id: 'denialReason', label: 'Rejection Reason', show: true },
  { id: 'status', label: 'Status', dataClass: 'w-32 text-center', show: true },
];

type FILTER = {
  page: number;
  limit: number;
  search: string | null;
};

const WithdrawHistory = () => {
  const { getWithdrawHistoryRequests } = useHistoryActions();
  const { withdrawHistory } = useSelector(selectHistorySlice);
  const [columns, setColumns] = useState<any[]>(headCells);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FILTER>({
    page: 1,
    limit: 10,
    search: null,
  });

  const rows = withdrawHistory?.list?.map((_data, index) => {
    return {
      id: getTableIndexNumber(filter.page, index, filter.limit),
      user: `${_data?.user?.firstName ? _data?.user?.firstName : ''} ${
        _data?.user?.lastName ? _data?.user?.lastName : '-'
      }`,
      requestId: _data.requestId,
      requestDate: moment(_data?.createdAt).format('MMM, DD YYYY hh:mm'),
      token: <TokenNameWithLogo tokenName={_data.token.name} />,
      amount: _data.amount,
      network: _data.network?.name,
      address: _data.address ? (
        <Tooltip title={_data.address}>
          <Chip label={_data.address} size="small" sx={{ fontSize: '11px' }} />
        </Tooltip>
      ) : (
        '-'
      ),
      fee: _data.fee,
      trxHashUrl: _data.trxHashUrl ? (
        <Tooltip title={_data.trxHashUrl}>
          <Link to={_data.trxHashUrl}>
            <Chip label={_data.trxHashUrl} size="small" sx={{ fontSize: '11px' }} />
          </Link>
        </Tooltip>
      ) : (
        '-'
      ),
      status: (
        <Chip
          label={_data.status}
          size="small"
          color={_data.status === 'COMPLETED' ? 'success' : _data.status === 'PENDING' ? 'default' : 'error'}
          sx={{ fontSize: '10px', fontWeight: 700 }}
        />
      ),
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
    for (const row of withdrawHistory.list) {
      const data: any = {};
      const _data = {
        ...row,
        user: `${row?.user?.firstName ? row?.user?.firstName : ''} ${row?.user?.lastName ? row?.user?.lastName : '-'}`,
        requestDate: moment(row?.createdAt).format('MMM, DD YYYY hh:mm'),
        token: row?.token?.name ?? '',
        network: row?.network.name ?? '',
      };
      showKeys.forEach((key) => (data[key] = _data[key] || ''));
      csvData.push(data);
    }

    return csvData;
  };

  useEffect(() => {
    setLoading(true);
    getWithdrawHistoryRequests(true, filter);
    setLoading(false);
  }, [filter.limit, filter.page]);

  useEffect(() => {
    if (filter.search !== null) {
      const search = setTimeout(async () => {
        await getWithdrawHistoryRequests(true, filter);
      }, 400);
      return () => clearTimeout(search);
    }
  }, [filter.search]);

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-5">Withdraw History</h1>
        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getWithdrawHistoryRequests(true, filter);
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
        totalPages={withdrawHistory?.totalPages}
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

export default WithdrawHistory;
