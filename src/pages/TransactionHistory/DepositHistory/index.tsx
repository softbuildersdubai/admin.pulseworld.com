import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';

// COMMON
import { refresh } from '../../../images/other';
import { useHistoryActions } from '../../../store/wallet/historyActions';
import { selectHistorySlice } from '../../../store/wallet/historySlice';
import GlobalTable from '../../../components/Table/GlobalTable';
import moment from 'moment';
import StatusChip from '../../../components/StatusChip';
import TokenNameWithLogo from '../../../components/TokenNameWithLogo';
import { getTableIndexNumber } from '../../../utils/utils';

const headCells = [
  { id: 'id', label: 'ID', show: true },
  { id: 'user', label: 'User', show: true },
  { id: 'createdAt', label: 'Date', show: true },
  { id: 'fromToken', label: 'From Token', show: true },
  { id: 'amount', label: 'Amount', show: true },
  { id: 'fee', label: 'Fee', show: true },
  { id: 'status', label: 'Status', show: true, dataClass: 'text-center' },
];
type FILTER = {
  page: number;
  limit: number;
  search: string | null;
};
const DepositHistory = () => {
  const { getDepositHistoryRequests } = useHistoryActions();
  const { depositHistory } = useSelector(selectHistorySlice);
  const [columns, setColumns] = useState<any[]>(headCells);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FILTER>({
    page: 1,
    limit: 10,
    search: null,
  });

  const rows = depositHistory?.list?.map((_data, index) => {
    return {
      id: getTableIndexNumber(filter.page, index, filter.limit),
      user: `${_data?.user?.firstName ? _data?.user?.firstName : ''} ${
        _data?.user?.lastName ? _data?.user?.lastName : '-'
      }`,
      createdAt: moment(_data?.createdAt).format('MMM, DD YYYY hh:mm'),
      fromToken: <TokenNameWithLogo tokenName={_data?.wallet?.token?.name} />,
      amount: _data?.amount,
      status: <StatusChip status={_data?.status} />,
      fee: _data.fee,
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
    for (const row of depositHistory.list) {
      const data: any = {};
      const _data = {
        ...row,
        user: `${row?.user?.firstName ? row?.user?.firstName : ''} ${row?.user?.lastName ? row?.user?.lastName : '-'}`,
        createdAt: moment(row?.createdAt).format('MMM, DD YYYY hh:mm'),
        fromToken: row?.wallet?.token?.name ?? '',
        wallet: '',
        fee: row?.fee.toString(),
        requestDate: moment(row?.createdAt).format('MMM, DD YYYY hh:mm'),
      };
      showKeys.forEach((key) => (data[key] = _data[key] || ''));
      csvData.push(data);
    }

    return csvData;
  };

  useEffect(() => {
    setLoading(true);
    getDepositHistoryRequests(true, filter);
    setLoading(false);
  }, [filter.limit, filter.page]);

  useEffect(() => {
    if (filter.search !== null) {
      const search = setTimeout(async () => {
        await getDepositHistoryRequests(true, filter);
      }, 400);
      return () => clearTimeout(search);
    }
  }, [filter.search]);

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-1">Deposit History</h1>
        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getDepositHistoryRequests(true, filter);
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
        totalPages={depositHistory?.totalPages}
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

export default DepositHistory;
