import GlobalTable from '../../Table/GlobalTable';
import { WithdrawRequest } from '../../../store/wallet/walletSlice';
import { Chip, Tooltip } from '@mui/material';
import GlobalDialog from '../../Dialog';
import UpdateRequest from '../UpdateRequest';
import { useState } from 'react';
import { WALLET_ACTIONS } from '../../../constants';
import moment from 'moment';
import { Link } from 'react-router-dom';
import WithdrawActionButton from '../WithdrawActionButton';
import StatusChip from '../../StatusChip';
import TokenNameWithLogo from '../../TokenNameWithLogo';
import { copy } from '../../../images/other';
import { copyToClipboard, getTableIndexNumber } from '../../../utils/utils';

type Props = {
  data: {
    list: WithdrawRequest[];
    currentPage: any;
    totalCount: any;
    totalPages: any;
  };
  loading: boolean;
  filter: any;
  setFilter: (_: any) => void;
};

const headCells = [
  { id: 'id', label: 'ID', dataClass: '', show: true },
  { id: 'user', label: 'User Name', dataClass: 'min-w-40', show: true },
  { id: 'requestId', label: 'Request ID', dataClass: 'min-w-32', show: true },
  { id: 'requestDate', label: 'Request Date', dataClass: 'min-w-36', show: true },
  { id: 'token', label: 'Token', dataClass: 'min-w-24', show: true },
  { id: 'network', label: 'Network', dataClass: 'min-w-24', show: true },
  { id: 'address', label: 'Wallet Address', dataClass: 'max-w-40', show: true },
  { id: 'fee', label: 'Withdrawal Fee', dataClass: 'min-w-40', show: true },
  { id: 'amount', label: 'Withdrawal Amount', dataClass: 'min-w-44', show: true },
  { id: 'trxHashUrl', label: 'Transaction Hash', dataClass: 'max-w-32', show: true },
  { id: 'status', label: 'Status', dataClass: 'min-w-32 text-center', show: true },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center min-w-[100px]', show: true },
];

const WithdrawRequestsTable = ({ data, loading, filter, setFilter }: Props) => {
  const [openWithdrawAction, setOpenWithdrawAction] = useState(false);
  const [withdrawAction, setWithdrawAction] = useState<any>();
  const [columns, setColumns] = useState<any[]>(headCells);
  const [copied, setCopied] = useState<boolean>(false);

  const rows = data?.list?.map((_data, index) => {
    return {
      id: getTableIndexNumber(filter.page, index, filter.limit),
      user: `${_data?.user?.firstName ? _data?.user?.firstName : ''} ${
        _data?.user?.lastName ? _data?.user?.lastName : '-'
      }`,
      requestId: _data.requestId,
      requestDate: moment(_data?.createdAt).format('MMM, DD YYYY hh:mm'),
      token: <TokenNameWithLogo tokenName={_data.token.name} />,
      network: _data.network?.name,
      address: _data.address ? (
        <div>
          <Tooltip title={_data.address}>
            <Chip
              label={
                <div className="flex items-center relative w-[140px] py-1">
                  <span className="pr-10 w-[75%] overflow-hidden">{_data.address}</span>
                  <Tooltip title={copied ? 'Copied' : 'Copy'} placement="top">
                    <img
                      src={copy}
                      className="cursor-pointer absolute right-2"
                      onClick={() => copyToClipboard(_data.address, setCopied)}
                    />
                  </Tooltip>
                </div>
              }
              size="small"
              sx={{ fontSize: '11px' }}
            />
          </Tooltip>
        </div>
      ) : (
        '-'
      ),
      fee: _data.fee,
      amount: _data.amount,
      trxHashUrl: _data.trxHashUrl ? (
        <Tooltip title={_data.trxHashUrl}>
          <Link to={_data.trxHashUrl}>
            <Chip label={_data.trxHashUrl} size="small" sx={{ fontSize: '11px' }} />
          </Link>
        </Tooltip>
      ) : (
        '-'
      ),
      status: <StatusChip status={_data.status} />,
      denialReason: (
        <Tooltip title={_data.denialReason ?? '-'}>
          <span>{_data.denialReason ?? '-'}</span>
        </Tooltip>
      ),
      actions: (
        <div className="flex flex-col screen1500:flex-row justify-center gap-2">
          <WithdrawActionButton
            status={_data.status}
            onClick={() => {
              setOpenWithdrawAction(true);
              setWithdrawAction({ type: WALLET_ACTIONS.ACCEPT, requestId: _data._id });
            }}
            className=" bg-green-800 hover:bg-green-800/70"
          >
            Complete
          </WithdrawActionButton>

          <WithdrawActionButton
            status={_data.status}
            onClick={() => {
              setOpenWithdrawAction(true);
              setWithdrawAction({ type: WALLET_ACTIONS.REJECT, requestId: _data._id });
            }}
            className="bg-red-600 hover:bg-red-600/70"
          >
            Reject
          </WithdrawActionButton>
        </div>
      ),
    };
  });

  const getCsvData = () => {
    // GET THE SELECTED COLUMNS
    const showKeys: any = [];
    columns.forEach((cell: any) => {
      if (cell.show) showKeys.push(cell.id);
    });

    const csvData: any[] = [];

    // GET DATA FOR SELECTED COLUMN IN EACH ROW
    for (const row of data.list) {
      const data: any = {};
      const _data = {
        ...row,
        requestDate: moment(row?.createdAt).format('MMM, DD YYYY hh:mm'),
        user: `${row?.user?.firstName ? row?.user?.firstName : ''} ${row?.user?.lastName ? row?.user?.lastName : '-'}`,
        token: row?.token?.name ?? '',
        network: row?.network.name ?? '',
      };
      showKeys.forEach((key) => (data[key] = _data[key] || ''));
      csvData.push(data);
    }

    return csvData;
  };

  return (
    <>
      <GlobalTable
        rows={rows}
        headCells={columns?.filter((itm) => itm?.show === true)}
        isLoading={loading}
        page={filter.page}
        totalPages={data?.totalPages}
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

      {/* ACTIONS DIALOG */}
      <GlobalDialog
        open={openWithdrawAction}
        title={`${withdrawAction?.type === WALLET_ACTIONS.ACCEPT ? 'Approve' : 'Reject'} Withdraw Request`}
        content={
          <UpdateRequest
            requestFor="WITHDRAW"
            action={withdrawAction}
            onClose={() => {
              setOpenWithdrawAction(false);
            }}
          />
        }
        closeButtonShow={false}
      />
    </>
  );
};

export default WithdrawRequestsTable;
