import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';
import { useCustomerActions } from '../../../store/customer/customerActions';
import { selectCustomerSlice } from '../../../store/customer/customerSlice';

// COMMON
import { refresh } from '../../../images/other';
import UserVeriricationRequestsTable from '../../../components/Users/UserVerificationRequestsTable';

const UserVerificationRequests = () => {
  const { getCustomerVerificationRequests } = useCustomerActions();
  const { customerVerificationRequests } = useSelector(selectCustomerSlice);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getCustomerVerificationRequests();
      setLoading(false);
    })();
  }, []);

  return (
    <div className="w-full rounded-md px-5">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-5">KYC Verification Requests</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getCustomerVerificationRequests(true);
            setLoading(false);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      {/* TABLE */}
      <UserVeriricationRequestsTable
        data={customerVerificationRequests}
        loading={loading}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default UserVerificationRequests;
