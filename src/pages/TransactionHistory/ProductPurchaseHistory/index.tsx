import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';

// COMMON
import { photo, refresh } from '../../../images/other';
import { useHistoryActions } from '../../../store/wallet/historyActions';
import { selectHistorySlice } from '../../../store/wallet/historySlice';
import GlobalTable from '../../../components/Table/GlobalTable';
import StatusChip from '../../../components/StatusChip';
import { Tooltip } from 'antd';
import moment from 'moment';
import { getTableIndexNumber } from '../../../utils/utils';

const headCells = [
  { id: 'id', label: 'ID', show: true },
  { id: 'user', label: 'User', show: true },
  { id: 'product', label: 'Product', show: true },
  { id: 'provider', label: 'Provider', show: true, headCellClass: 'min-w-[120px]' },
  { id: 'productPrice', label: 'Product Price', show: true, headCellClass: 'min-w-[120px]' },
  { id: 'boughtAt', label: 'Date', show: true },
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

const ProductPurchaseHistory = () => {
  const { getProductPurchaseHistory } = useHistoryActions();
  const { productPurchaseHistory } = useSelector(selectHistorySlice);

  const [columns, setColumns] = useState<any[]>(headCells);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FILTER>({
    page: 1,
    limit: 10,
    search: null,
  });

  const rows = productPurchaseHistory?.list?.map((_data, index) => {
    return {
      id: getTableIndexNumber(filter.page, index, filter.limit),
      user: `${_data?.user?.firstName ? _data?.user?.firstName : ''} ${
        _data?.user?.lastName ? _data?.user?.lastName : '-'
      }`,
      product: (
        <div className="flex gap-2 items-center">
          <span>{_data?.product?.name}</span>
          <Tooltip
            placement="bottom"
            destroyTooltipOnHide={true}
            trigger={'hover'}
            title={
              <div className="flex justify-center items-center flex-col w-32 gap-2 p-1" aria-hidden={'true'}>
                <img src={_data.product?.image?.path} className="w-28 h-28 object-contain" />
              </div>
            }
          >
            <img src={photo} alt="" className={`w-5 h-5 object-contain`} />
          </Tooltip>
        </div>
      ),
      provider: _data?.product?.provider?.name,
      productPrice: _data?.subTotal,
      boughtAt: moment(_data.createdAt).format('MMM, DD YYYY'),
      transactionFee: _data?.transactionFee,
      total: _data?.total,
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
    for (const row of productPurchaseHistory.list) {
      const data: any = {};
      const _data = {
        ...row,
        user: `${row?.user?.firstName ? row?.user?.firstName : ''} ${row?.user?.lastName ? row?.user?.lastName : '-'}`,
        product: row?.product?.name,
        boughtAt: moment(row.createdAt).format('MMM, DD YYYY'),
        paymentMethod: row?.paymentMethod?.name,
        voucherAssigned: '',
      };
      showKeys.forEach((key) => (data[key] = _data[key] || ''));
      csvData.push(data);
    }

    return csvData;
  };

  useEffect(() => {
    setLoading(true);
    getProductPurchaseHistory(true, filter);
    setLoading(false);
  }, [filter.limit, filter.page]);

  useEffect(() => {
    if (filter.search !== null) {
      const search = setTimeout(async () => {
        await getProductPurchaseHistory(true, filter);
      }, 400);
      return () => clearTimeout(search);
    }
  }, [filter.search]);

  return (
    <div className="w-full px-2">
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-1">Product Purchase History</h1>
        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getProductPurchaseHistory(true, filter);
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
        totalPages={productPurchaseHistory?.totalPages}
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

export default ProductPurchaseHistory;
