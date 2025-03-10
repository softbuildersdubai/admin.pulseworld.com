import { useEffect, useState } from 'react';
// REDUX
import { useSelector } from 'react-redux';

// COMMON
import { add, refresh } from '../../images/other';
import { useProvidersActions } from '../../store/providers/providerActions';
import { selectProviderSlice } from '../../store/providers/providerSlice';
import ProvidersTable from '../../components/ProvidersTable';
import { Link } from 'react-router-dom';

const Providers = () => {
  const { getProviders } = useProvidersActions();
  const { providers } = useSelector(selectProviderSlice);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getProviders();
      setLoading(false);
    })();
  }, []);

  return (
    <div className="w-full px-2">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-1">Providers</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getProviders(true);
            setLoading(false);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>

        <Link to={'/providers/add'} className="flex gap-1 text-white items-center cursor-pointer px-3">
          <img src={add} alt="" width={24} height={24} />
          <span>Add Provider</span>
        </Link>
      </div>

      {/* TABLE */}
      <ProvidersTable data={providers} loading={loading} page={page} setPage={setPage} />
    </div>
  );
};

export default Providers;
