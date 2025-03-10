import GlobalTable from '../../Table/GlobalTable';
import { MigrationRequest } from '../../../store/wallet/walletSlice';
import { Chip, Tooltip } from '@mui/material';
import GlobalDialog from '../../Dialog';
import UpdateRequest from '../UpdateRequest';
import { useState } from 'react';
import { MIGRATION_ACTIONS } from '../../../constants';
import moment from 'moment';
import WithdrawActionButton from '../WithdrawActionButton';
import StatusChip from '../../StatusChip';

type Props = {
  data: {
    list: MigrationRequest[];
    paginate: any;
  };
  loading: boolean;
  page: number;
  setPage: (_: any) => void;
};

const headCells = [
  { id: 'id', label: 'ID' },
  { id: 'requestId', label: 'Request ID' },
  { id: 'requestDate', label: 'Request Date' },
  { id: 'user', label: 'User Name' },
  { id: 'blockchainId', label: 'Account' },
  { id: 'fee', label: 'Migration Fee' },
  { id: 'amount', label: 'Migration Amount' },
  { id: 'status', label: 'Status' },
  {
    id: 'actions',
    label: 'Actions',
    headCellClass: 'text-center min-w-[100px]',
  },
];

const MigrationRequestTable = ({ data, loading, page, setPage }: Props) => {
  const [openMigrationAction, setOpenMigrationAction] = useState(false);
  const [migrationAction, setMigrationAction] = useState<any>();

  const rows = data?.list?.map((_data, index) => {
    return {
      id: index + 1,
      requestId: _data.requestId,
      requestDate: moment(_data?.createdAt).format('MMM, DD YYYY hh:mm'),
      user: _data.user.username,
      blockchainId: (
        <Tooltip title={_data.blockchainId}>
          <Chip label={_data.blockchainId} size="small" sx={{ fontSize: '11px' }} />
        </Tooltip>
      ),
      fee: _data.fee,
      amount: _data.amount,
      status: <StatusChip status={_data.status} />,
      actions: (
        <div className="flex flex-col screen1500:flex-row justify-center gap-2">
          <WithdrawActionButton
            status={_data.status}
            onClick={() => {
              setOpenMigrationAction(true);
              setMigrationAction({
                type: MIGRATION_ACTIONS.ACCEPT,
                requestId: _data._id,
              });
            }}
            className=" bg-green-800 hover:bg-green-800/70"
          >
            Complete
          </WithdrawActionButton>

          <WithdrawActionButton
            status={_data.status}
            onClick={() => {
              setOpenMigrationAction(true);
              setMigrationAction({
                type: MIGRATION_ACTIONS.REJECT,
                requestId: _data._id,
              });
            }}
            className="bg-red-600 hover:bg-red-600/70"
          >
            Reject
          </WithdrawActionButton>
        </div>
      ),
    };
  });

  return (
    <>
      <GlobalTable rows={rows} headCells={headCells} isLoading={loading} page={page} handlePageChange={setPage} />

      {/* ACTIONS DIALOG */}
      <GlobalDialog
        open={openMigrationAction}
        title={`${migrationAction?.type === MIGRATION_ACTIONS.ACCEPT ? 'Approve' : 'Reject'} Migration Request`}
        content={
          <UpdateRequest
            requestFor="MIGRATION"
            action={migrationAction}
            onClose={() => {
              setOpenMigrationAction(false);
            }}
          />
        }
        closeButtonShow={false}
      />
    </>
  );
};

export default MigrationRequestTable;
