import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';

// COMMON
import { refresh } from '../../../images/other';
import { useHistoryActions } from '../../../store/wallet/historyActions';
import { selectHistorySlice } from '../../../store/wallet/historySlice';
import GlobalTable from '../../../components/Table/GlobalTable';
import StatusChip from '../../../components/StatusChip';
import { getTableIndexNumber } from '../../../utils/utils';

const headCells = [
  { id: 'id', label: 'ID', show: true },
  { id: 'user', label: 'User', show: true },
  { id: 'feature', label: 'Feature', show: true },
  { id: 'featurePrice', label: 'Feature Price', show: true },
  { id: 'transactionFee', label: 'Transaction Fee', show: true },
  { id: 'total', label: 'Total Amount', show: true },
  { id: 'paymentMethod', label: 'Payment Method', show: true },
  { id: 'paymentStatus', label: 'Payment Status', show: true },
  { id: 'status', label: 'Status', show: true, dataClass: 'text-center' },
];

type FILTER = {
  page: number;
  limit: number;
  search: string | null;
};

const FeaturePurchaseHistory = () => {
  const { getFeaturePurchaseHistory } = useHistoryActions();
  const { featurePurchaseHistory } = useSelector(selectHistorySlice);
  const [columns, setColumns] = useState<any[]>(headCells);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState<FILTER>({
    page: 1,
    limit: 10,
    search: null,
  });

  const rows = featurePurchaseHistory?.list?.map((_data, index) => {
    return {
      id: getTableIndexNumber(filter.page, index, filter.limit),
      user: `${_data?.user?.firstName ? _data?.user?.firstName : ''} ${
        _data?.user?.lastName ? _data?.user?.lastName : '-'
      }`,
      feature: _data?.feature?.name,
      featurePrice: (
        <div className="flex gap-1">
          <span>{_data?.feature?.price}</span>
          {_data.currency ? (
            <span>{_data.currency === 'EUR' ? '€' : _data.currency === 'USD' ? '$' : _data.currency}</span>
          ) : (
            ' -'
          )}
        </div>
      ),
      transactionFee: (
        <div className="flex gap-1">
          <span>{_data?.transactionFee}</span>
          {_data.currency ? (
            <span>{_data.currency === 'EUR' ? '€' : _data.currency === 'USD' ? '$' : _data.currency}</span>
          ) : (
            ' -'
          )}
        </div>
      ),
      total: (
        <div className="flex gap-1">
          <span>{_data?.total}</span>
          {_data.currency ? (
            <span>{_data.currency === 'EUR' ? '€' : _data.currency === 'USD' ? '$' : _data.currency}</span>
          ) : (
            ' -'
          )}
        </div>
      ),
      paymentMethod: _data?.paymentMethod?.name,
      paymentStatus: <StatusChip status={_data?.paymentStatus} />,
      status: <StatusChip status={_data?.status} />,
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
    for (const row of featurePurchaseHistory.list) {
      const data: any = {};
      const _data = {
        ...row,
        user: `${row?.user?.firstName ? row?.user?.firstName : ''} ${row?.user?.lastName ? row?.user?.lastName : '-'}`,
        feature: row?.feature?.name,
        featurePrice: row?.feature?.price?.toString(),
        transactionFee: row?.transactionFee?.toString(),
        total: row?.total?.toString(),
        paymentMethod: row?.paymentMethod?.name,
      };
      showKeys.forEach((key) => (data[key] = _data[key] || ''));
      csvData.push(data);
    }

    return csvData;
  };

  useEffect(() => {
    setLoading(true);
    getFeaturePurchaseHistory(true, filter);
    setLoading(false);
  }, [filter.limit, filter.page]);

  useEffect(() => {
    if (filter.search !== null) {
      const search = setTimeout(async () => {
        await getFeaturePurchaseHistory(true, filter);
      }, 400);
      return () => clearTimeout(search);
    }
  }, [filter.search]);

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-1">Feature Purchase History</h1>
        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getFeaturePurchaseHistory(true, filter);
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
        totalPages={featurePurchaseHistory?.totalPages}
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

export default FeaturePurchaseHistory;
