import GlobalTable from '../../Table/GlobalTable';
import { User } from '../../../store/user/userSlice';
import { check, close, edit, down_arrow, lock, mail, viewWhite, unlock, impersonateIcon } from '../../../images/other';
import { Tooltip } from 'antd';
import { tokenImages } from '../../../pages/Tokens/TokenTransactionSettings/TokenTransactionSettingDetails';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ConfirmDialog from '../../Dialog/ConfirmDialog';
import { useCustomerActions } from '../../../store/customer/customerActions';
import GlobalDialog from '../../Dialog';
import MailUser from '../MailUser';
import StatusChip from '../../StatusChip';
import { useUserActions } from '../../../store/user/userActions';
import { errorAlert, successAlert } from '../../../utils/alerts';
import { getTableIndexNumber } from '../../../utils/utils';
import ApiRequest from '../../../utils/network/ApiRequest';
import { DISTABLE_USER_2FA } from '../../../utils/network/ApiEndpoints';

type Props = {
  data: { list: User[];[key: string]: any };
  loading: boolean;
  page: any;
  setPage: (_: any) => void;
  setReFetch: any;
  sort?: any;
  setSort?: any;
  filters?: any;
  setFilters?: any;
};

const headCells = [
  { id: '_id', label: '' },
  { id: 'id', label: 'ID', dataClass: '', show: true },
  {
    id: 'username',
    label: 'User Name',
    dataClass: 'min-w-[150px]',
    show: true,
  },
  {
    id: 'name',
    label: 'First/Last Name',
    dataClass: 'min-w-[180px]',
    show: true,
  },
  { id: 'email', label: 'Email', dataClass: 'min-w-fit', show: true },
  { id: 'sponsor', label: 'Sponsor', dataClass: 'min-w-[150px]', show: true },
  { id: 'accountType', label: 'Account', dataClass: 'min-w-fit', show: true },
  { id: 'country', label: 'Country', dataClass: 'min-w-fit', show: true },
  { id: 'phoneNumber', label: 'Phone', dataClass: 'min-w-[120px]', show: true },
  { id: 'status', label: 'Status', dataClass: 'min-w-fit pr-5', show: true },
  { id: 'refCode', label: 'Ref. Code', dataClass: 'min-w-[120px]', show: true },
  { id: 'twoFA', label: '2FA', dataClass: '!min-w-max', show: true },
  {
    id: 'verified',
    label: 'Verified',
    dataClass: 'min-w-fit text-center',
    show: true,
  },
  { id: 'balance', label: 'Balance', dataClass: 'min-w-[130px]', show: true },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center', show: true },
];

const UsersTable = ({ data, loading, page, setPage, setReFetch, sort, setSort, filters }: Props) => {
  const navigate = useNavigate();
  const { changeUserStatus } = useCustomerActions();
  const { impersonateUser } = useUserActions();
  const [openLockUserDialog, setOpenLockUserDialog] = useState(false);
  const [openSendMailDialog, setOpenSendMailDialog] = useState(false);
  const [twoFaDisable, setTwoFaDisable] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [currentUser, setCurrentUser] = useState<any>('');
  const [columns, setColumns] = useState<any[]>(headCells.filter((cell) => cell.id !== '_id'));

  const rows = data?.list?.map((_data, index) => {
    return {
      _id: _data._id,
      id: getTableIndexNumber(page === -1 ? 1 : page, index, 10),
      username: _data.username,
      name:
        _data.accountType === 'COMPANY'
          ? _data.companyName ?? '-'
          : _data.firstName
            ? `${_data.firstName} ${_data.lastName}`
            : '-',
      email: _data.email ?? '-',
      sponsor:
        _data.refParent?.accountType === 'COMPANY'
          ? _data.refParent?.companyName ?? '-'
          : `${_data.refParent?.firstName ?? ''} ${_data.refParent?.lastName ?? '-'}`,
      accountType: _data?.accountType,
      country: _data.country?.name ?? '-',
      phoneNumber: _data.phoneNumber ? _data.phoneNumber : '-',
      refCode: _data.refCode,
      twoFA: (
        <Tooltip title={_data.twoFA ? 'User Actived 2FA' : 'User not Active 2FA'}>
          <div
            className={_data.twoFA ? `cursor-pointer` : ''}
            onClick={() => {
              if (_data.twoFA) {
                setSelectedUser(_data._id);
                setTwoFaDisable(true);
              }
            }}
          >
            <StatusChip status={_data.twoFA} />
          </div>
        </Tooltip>
      ),

      verified: (
        <div className="flex justify-center">
          <img src={_data.verified ? check : close} />
        </div>
      ),
      status: <StatusChip status={_data.status} />,
      balance: (
        <div className="flex items-center justify-between gap-1 pr-5">
          <div className="flex items-center gap-2">
            <img src={tokenImages.Tether} alt="" className="w-4 h-4" />
            <span>{Number(Number(_data.balance.totalBalance).toFixed(2))}</span>
          </div>
          <Tooltip
            placement="bottom"
            destroyTooltipOnHide={true}
            trigger={'click'}
            title={
              <div className="flex flex-col w-32 gap-2 p-1" aria-hidden={'true'}>
                {_data?.balance?.tokens && Object.keys(_data?.balance?.tokens).map((token) => {
                  return (
                    <>
                      <div className="flex items-center w-full gap-2">
                        <img
                          src={token === 'USDT' ? tokenImages['Tether'] : tokenImages[token]}
                          className="w-6 h-6 object-contain"
                        />
                        <span>Balance: {Number(Number(_data.balance.tokens[token].balance).toFixed(2))}</span>
                      </div>
                    </>
                  );
                })}
              </div>
            }
          >
            <img
              src={down_arrow}
              alt=""
              className={`!text-base w-4 h-4 sm:!text-lg cursor-pointer transition-all duration-100 ease-in-out border rounded-md hover:bg-gray-700`}
              onClick={() => { }}
            />
          </Tooltip>
        </div>
      ),
      actions: (
        <div className="flex justify-center gap-2">
          <Tooltip title="View User">
            <img
              src={viewWhite}
              width={18}
              height={18}
              alt="View Icon"
              onClick={() =>
                navigate(`/users/view/${_data._id}`, {
                  state: { _data, edit: false },
                })
              }
              className="cursor-pointer"
            />
          </Tooltip>

          <Tooltip title="Edit User">
            <img
              src={edit}
              width={18}
              height={18}
              alt="Edit Icon"
              onClick={() =>
                navigate(`/users/edit/${_data._id}`, {
                  state: { _data, edit: true },
                })
              }
              className="cursor-pointer"
            />
          </Tooltip>

          {/* <Tooltip title="Mail User">
            <img
              src={mail}
              width={18}
              height={18}
              alt="Message Icon"
              onClick={() => {
                setCurrentUser(_data);
                setOpenSendMailDialog(true);
              }}
              className="cursor-pointer"
            />
          </Tooltip> */}
{/* 
          <Tooltip title={_data.status === 'ACTIVE' ? 'Block User' : 'Un-Block User'}>
            <img
              src={_data.status === 'ACTIVE' ? unlock : lock}
              width={18}
              height={18}
              alt="Lock Icon"
              onClick={() => {
                setCurrentUser(_data);
                setOpenLockUserDialog(true);
              }}
              className="cursor-pointer"
            />
          </Tooltip>

          <Tooltip title={'Impersoante'}>
            <img
              src={impersonateIcon}
              width={18}
              height={18}
              alt="Impoersoante Icon"
              onClick={async () => {
                const res = await impersonateUser(_data._id);
                if (res.status) {
                  window.open(res.data.url, '_blank');
                } else {
                  errorAlert(res.message);
                }
              }}
              className="cursor-pointer"
            />
          </Tooltip> */}
        </div>
      ),
    };
  });

  const getCsvData = () => {
    // GET THE SELECTED COLUMNS
    const showKeys: any = [];
    columns.forEach((cell: any) => {
      if (cell.show && cell.id !== 'id' && cell.id !== '_id' && cell.id !== 'actions') showKeys.push(cell.id);
    });

    const csvData: any[] = [];

    // GET DATA FOR SELECTED COLUMN IN EACH ROW
    for (const row of data.list) {
      const data: any = {};
      const _data = {
        ...row,
        name:
          row.accountType === 'COMPANY'
            ? row.companyName ?? '-'
            : row.firstName
              ? `${row.firstName} ${row.lastName}`
              : '-',
        sponsor:
          row.refParent?.accountType === 'COMPANY'
            ? row.refParent?.companyName ?? '-'
            : `${row.refParent?.firstName ?? ''} ${row.refParent?.lastName ?? '-'}`,
        country: row?.country ? row.country?.name : '-',
        verified: row.isVerified ? 'Verified' : 'Non-Verified',
        balance: row.balance.totalBalance,
        twoFA: row.twoFA ? 'Enabled' : 'Disabled',
      };
      showKeys.forEach((key) => (data[key] = _data[key] || ''));
      csvData.push(data);
    }

    return csvData;
  };

  // HANDLERS
  const handleUserStatusChange = async (status: string) => {
    const res = await changeUserStatus(currentUser._id, status);
    setReFetch('fetch');
    return res;
  };

  return (
    <div className="flex flex-col bg-[#181717]">
      {/* TBALE */}

      <ConfirmDialog
        title="Disable User 2FA?"
        open={twoFaDisable}
        onClose={() => setTwoFaDisable(false)}
        onConfirm={async () => {
          await ApiRequest().request({
            method: 'POST',
            url: DISTABLE_USER_2FA,
            data: {
              user: selectedUser,
            },
          });
          setTwoFaDisable(false);
          // successAlert(res.message);
        }}
      >
        Are you sure you want to Disable 2FA?
      </ConfirmDialog>

      <GlobalTable
        rows={rows}
        // headCells={headCells}
        isLoading={loading}
        totalPages={data?.totalPages}
        handlePageChange={setPage}
        page={page}
        sort={sort}
        setSort={setSort}
        showSort={true}
        checkBoxes={true}
        outerFilters={filters}
        refetch={() => setReFetch('fetch')}
        showInnerFilters={true}
        headCells={columns?.filter((itm) => itm?.show === true)}
        setColumns={setColumns}
        ColumnsList={columns}
        csvData={getCsvData}
        showInnerFiltersSearch={false}
        innerFiltersClassName="absolute right-4 -top-[540px] md:-top-[310px] lg:-top-[315px] xl:-top-60"
      />

      {/* USER STATUS DIALOG */}
      <ConfirmDialog
        title={currentUser?.status === 'ACTIVE' ? 'Block User?' : 'Un-Block User?'}
        open={openLockUserDialog}
        onClose={() => {
          setCurrentUser(null);
          setOpenLockUserDialog(false);
        }}
        onConfirm={async () => {
          const res: any = await handleUserStatusChange(currentUser?.status === 'ACTIVE' ? 'BLOCK' : 'ACTIVE');

          if (res.data.status) {
            setOpenLockUserDialog(false);
            successAlert(res.data.message);
          } else {
            setOpenLockUserDialog(false);
            errorAlert(res.data.message);
          }

          return res;
        }}
      >
        Are you sure you want to {currentUser?.status === 'ACTIVE' ? 'Block' : 'Un-Block'} this user?
      </ConfirmDialog>

      {/* SEND USER MAIL DIALOG */}
      <GlobalDialog
        open={openSendMailDialog}
        content={
          <div className="flex flex-col">
            <span className="text-2xl">Mail User</span>
            <MailUser onClose={() => setOpenSendMailDialog(false)} user={currentUser} />
          </div>
        }
        closeButtonShow={false}
      />
    </div>
  );
};

export default UsersTable;
