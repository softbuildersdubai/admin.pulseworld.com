import { Token } from '../../../store/token/tokenSlice';
import GlobalTable from '../../Table/GlobalTable';
import StatusChip from '../../StatusChip';
import { viewWhite, edit, lock, unlock } from '../../../images/other';
import { Tooltip } from 'antd';
import ConfirmDialog from '../../Dialog/ConfirmDialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminActions } from '../../../store/admin/adminActions';
import { errorAlert, successAlert } from '../../../utils/alerts';

type Props = {
  data: Token[];
  loading: boolean;
  fireApi: () => void;
};

const headCells = [
  { id: 'username', label: 'Username' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'status', label: 'Status' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
];

const AdminTable = ({ data, loading, fireApi }: Props) => {
  const [openLockUserDialog, setOpenLockUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>();
  const navigate = useNavigate();

  const { updateAdminAccess } = useAdminActions();

  const rows = data?.map((_data: any) => {
    return {
      username: _data.username,
      firstName: _data.firstName,
      lastName: _data.lastName,
      status: <StatusChip status={_data.status} />,
      actions: (
        <div className="flex items-center gap-2">
          <Tooltip title="View User">
            <img
              src={viewWhite}
              width={18}
              height={18}
              alt="View Icon"
              onClick={() => navigate("/admins/view/" + _data?._id, {
                state: { _data, edit: false },
              })}
              className="cursor-pointer"
            />
          </Tooltip>

          <Tooltip title="Edit User">
            <img
              src={edit}
              width={18}
              height={18}
              alt="Edit Icon"
              onClick={() => navigate("/admins/edit/" + _data?._id, {
                state: { _data, edit: true },
              })}
              className="cursor-pointer"
            />
          </Tooltip>

          <Tooltip title={_data.status === 'ACTIVE' ? 'Block Admin' : 'Un-Block Admin'}>
            <img
              src={_data.status === 'ACTIVE' ? unlock : lock}
              width={18}
              height={18}
              alt="Lock Icon"
              onClick={() => {
                setOpenLockUserDialog(true)
                setSelectedUser(_data)
              }}
              className="cursor-pointer"
            />
          </Tooltip>


        </div>
      )
    };
  });

  return (
    // TABLE

    <>

      <ConfirmDialog
        title={selectedUser?.status === 'ACTIVE' ? 'Block Admin?' : 'Un-Block Admin?'}
        open={openLockUserDialog}
        onClose={() => {
          setOpenLockUserDialog(false);
        }}
        onConfirm={async () => {
          const response = await updateAdminAccess(selectedUser?._id,
            selectedUser?.status === 'ACTIVE' ? 'BLOCK' : 'ACTIVE'
          );

          if (response?.status) {
            successAlert(`Admin acesss ${selectedUser?.status === 'ACTIVE' ? 'Block' : 'Active'}, Successfully!`);
            fireApi();
          }
          else {
            errorAlert(response?.message);
          }

          setOpenLockUserDialog(false);
        }}
      >
        Are you sure you want to {selectedUser?.status === 'ACTIVE' ? 'Block' : 'Un-Block'} this Admin?
      </ConfirmDialog>

      <GlobalTable rows={rows} headCells={headCells} isLoading={loading} paginate={false} />
    </>


  );
};

export default AdminTable;
