import { useEffect, useState } from "react";
// REDUX
import { useSelector } from "react-redux";

// COMMON
import { refresh } from "../../../images/other";
import { useWalletActions } from "../../../store/wallet/walletActions";
import { selectWalletSlice } from "../../../store/wallet/walletSlice";
import MigrationRequestTable from "../../../components/Wallet/MigrationRequestTable";

const MigrationRequests = () => {
  const { getMigrationRequests } = useWalletActions();
  const { migrationRequests } = useSelector(selectWalletSlice);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getMigrationRequests();
      setLoading(false);
    })();
  }, []);

  return (
    <div className="w-full px-2">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-1">
          Migration Requests
        </h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getMigrationRequests(true);
            setLoading(false);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      {/* TABLE */}
      <MigrationRequestTable
        data={migrationRequests}
        loading={loading}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default MigrationRequests;
