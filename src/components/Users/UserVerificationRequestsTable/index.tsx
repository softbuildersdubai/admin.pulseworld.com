import { useNavigate } from 'react-router-dom';
import { viewWhite } from '../../../images/other';
import GlobalTable from '../../Table/GlobalTable';
import { Tooltip } from '@mui/material';
import ConfirmDialog from '../../Dialog/ConfirmDialog';
import { useState } from 'react';
import { useCustomerActions } from '../../../store/customer/customerActions';
import { VERIFICATION_ACTION_STATUS } from '../../../utils/constance';
import { errorAlert, successAlert } from '../../../utils/alerts';
import FormikInput from '../../FormikInput';
import StatusChip from '../../StatusChip';

type Props = {
  data: { list: any[]; paginate: any };
  loading: boolean;
  page: number;
  setPage: (_: any) => void;
};

const headCells = [
  { id: 'user', label: 'Requestor' },
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'companyName', label: 'Company Name' },
  { id: 'email', label: 'Email' },
  { id: 'status', label: 'Status' },
  { id: 'type', label: 'Verification Type' },
  { id: 'attempts', label: 'Attempts' },
  { id: 'governmentIdNumber', label: 'Gov. ID' },
  { id: 'isPoliticalyExposed', label: 'Politicaly Exposed' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
];

const UserVeriricationRequestsTable = ({ data, loading, page, setPage }: Props) => {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionReasonError, setRejectionReasonError] = useState('');
  const { verification_action } = useCustomerActions();
  const { getCustomerVerificationRequests } = useCustomerActions();

  const [dataInfo, setDataInfo] = useState<any>(null);

  const rows = data?.list?.map((_data) => {
    return {
      user: _data.user?.username,
      firstName: _data.firstName ? _data.firstName : '-',
      lastName: _data.lastName ? _data.lastName : '-',
      companyName: _data.companyName ? _data.companyName : '-',
      email: _data.email ? _data.email : '-',
      status: _data.status ? <StatusChip status={_data.status} /> : '-',
      type: _data.type,
      attempts: _data.attempts,
      governmentIdNumber: _data.governmentIdNumber,
      isPoliticalyExposed: _data.isPoliticalyExposed ? 'Yes' : 'No',
      actions: (
        <div className="flex justify-center gap-2">
          <Tooltip title={'Accept'}>
            <div className="border p-[2px]">
              <p
                onClick={async () => {
                  setDataInfo(_data._id);
                  setConfirmOpen(true);
                }}
                className="cursor-pointer w-[20px] h-full text-[16px] text-white flex items-center justify-center bg-greenSecondary"
              >
                A
              </p>
            </div>
          </Tooltip>

          <Tooltip title={'Reject'}>
            <div className="border p-[2px]">
              <p
                onClick={() => {
                  setDataInfo(_data._id);
                  setRejectOpen(true);
                }}
                className="cursor-pointer w-[20px] h-full text-[16px] text-white flex items-center justify-center bg-errorColor"
              >
                X
              </p>
            </div>
          </Tooltip>

          <Tooltip title={'Preview'}>
            <div className="border p-[2px]">
              <img
                src={viewWhite}
                alt="View Icon"
                onClick={() => navigate('/users/verifications/' + _data._id, { state: _data })}
                className="cursor-pointer min-w-[20px] min-h-[20px] object-contain"
              />
            </div>
          </Tooltip>
        </div>
      ),
    };
  });

  return (
    <div>
      <GlobalTable
        rows={rows}
        headCells={headCells}
        isLoading={loading}
        totalPages={data?.paginate?.metadata?.page?.totalPage}
        handlePageChange={setPage}
        page={page}
      />
      <ConfirmDialog
        title="Approved Verification?"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={async () => {
          const res = await verification_action(dataInfo, VERIFICATION_ACTION_STATUS.VERIFIED);
          if (!res.status) {
            errorAlert(res.message);
            setConfirmOpen(false);
            return;
          }
          await getCustomerVerificationRequests(true);
          setConfirmOpen(false);
          navigate('/users/verifications');
          successAlert(res.message);
        }}
      >
        Are you sure you want to Approve this verification?
      </ConfirmDialog>
      <ConfirmDialog
        title="Reject Verification?"
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        onConfirm={async () => {
          if (!rejectionReason) {
            setRejectionReasonError('Required');
            return;
          }
          const res = await verification_action(dataInfo, VERIFICATION_ACTION_STATUS.REJECTED, rejectionReason);
          if (!res.status) {
            errorAlert(res.message);
            setRejectOpen(false);
            return;
          }
          await getCustomerVerificationRequests(true);
          setRejectOpen(false);
          navigate('/users/verifications');
          successAlert(res.message);
        }}
      >
        <div className="flex flex-col gap-6">
          <span>Are you sure you want to Reject this verification?</span>
          <FormikInput
            label={'Rejection Reason'}
            name={'rejectionReason'}
            type={'text'}
            placeholder={'Enter rejection reason'}
            onChange={(e) => {
              rejectionReasonError && setRejectionReasonError('');
              setRejectionReason(e.target.value);
            }}
            value={rejectionReason}
            error={rejectionReasonError}
            touched={true}
          />
        </div>
      </ConfirmDialog>
    </div>
  );
};

export default UserVeriricationRequestsTable;
