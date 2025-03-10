import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';

// COMMON
import { refresh } from '../../../images/other';
import { useWalletActions } from '../../../store/wallet/walletActions';
import { selectWalletSlice } from '../../../store/wallet/walletSlice';
import WithdrawRequestsTable from '../../../components/Wallet/WithdrawRequestTable';

type FILTER = {
  page: number;
  limit: number;
  search: string | null;
};

const WithdrawRequests = () => {
  const { getWithdrawRequests } = useWalletActions();
  const { withdrawRequests } = useSelector(selectWalletSlice);
  const [filter, setFilter] = useState<FILTER>({
    page: 1,
    limit: 10,
    search: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getWithdrawRequests(true, filter);
      setLoading(false);
    })();
  }, [filter.limit, filter.page]);

  useEffect(() => {
    if (filter.search !== null) {
      const search = setTimeout(async () => {
        await getWithdrawRequests(true, filter);
      }, 400);
      return () => clearTimeout(search);
    }
  }, [filter.search]);

  return (
    <div className="w-full px-2">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-5">Withdraw Requests</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getWithdrawRequests(true);
            setLoading(false);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      {/* TABLE */}
      <WithdrawRequestsTable data={withdrawRequests} loading={loading} filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default WithdrawRequests;
