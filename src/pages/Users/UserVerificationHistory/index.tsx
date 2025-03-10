import { useEffect, useState } from 'react';

// REDUX
import { useCustomerActions } from '../../../store/customer/customerActions';

// COMMON
import { refresh } from '../../../images/other';
import GlobalTable from '../../../components/Table/GlobalTable';
import StatusChip from '../../../components/StatusChip';

const headCells = [
  { id: 'firstName', label: 'First Name' },
  { id: 'lastName', label: 'Last Name' },
  { id: 'companyName', label: 'Company Name' },
  { id: 'email', label: 'Email' },
  { id: 'status', label: 'Status' },
  { id: 'rejectionReason', label: 'Rejection Reason' },
  { id: 'governmentIdNumber', label: 'Gov. ID' },
  { id: 'isPoliticalyExposed', label: 'Politicaly Exposed' },
];

const UserVerificationHistory = ({
  userId,
  currentVerificationRequestId,
}: {
  userId: string | undefined;
  currentVerificationRequestId: string | undefined;
}) => {
  const { getCustomerVerificationRequestsHistory } = useCustomerActions();
  const [verificationRequestsHistory, setVerificationRequestsHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const history = await getCustomerVerificationRequestsHistory(userId);
      setVerificationRequestsHistory(history);
      setLoading(false);
    })();
  }, []);

  const rows = verificationRequestsHistory
    ?.filter((history: any) => history?._id !== currentVerificationRequestId)
    .map((_data: any) => {
      return {
        firstName: _data.firstName ? _data.firstName : '-',
        lastName: _data.lastName ? _data.lastName : '-',
        companyName: _data.companyName ? _data.companyName : '-',
        email: _data.email ? _data.email : '-',
        status: _data.status ? <StatusChip status={_data.status} /> : '-',
        rejectionReason: _data.rejectionReason ? _data.rejectionReason : '-',
        attempts: _data.attempts,
        governmentIdNumber: _data.governmentIdNumber,
        isPoliticalyExposed: _data.isPoliticalyExposed ? 'Yes' : 'No',
      };
    });

  return (
    <div className="w-full rounded-md">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center text-white bg-[#181717] pt-5 px-3 mt-8">
        <h1 className="flex-1 font-bold text-2xl py-1">User Verification Requests History</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getCustomerVerificationRequestsHistory(userId);
            setLoading(false);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      {/* TABLE */}
      <GlobalTable rows={rows} headCells={headCells} isLoading={loading} />
    </div>
  );
};

export default UserVerificationHistory;
