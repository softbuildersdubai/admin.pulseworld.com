import { useEffect, useState } from 'react';
// REDUX
import { useTokenActions } from '../../store/token/tokenAction';
import { selectToken } from '../../store/token/tokenSlice';
import { useSelector } from 'react-redux';
// COMMON
import { refresh } from '../../images/other';
import TokensTable from '../../components/Token/TokenTable';

const Tokens = () => {
  const { getTokensList } = useTokenActions();
  const { tokensList } = useSelector(selectToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getTokensList();
      setLoading(false);
    })();
  }, []);

  return (
    <div className="w-full px-2">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center text-white">
        <h1 className="flex-1 font-bold text-2xl py-1">Tokens</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getTokensList(true);
            setLoading(false);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      {/* TABLE */}
      <TokensTable data={tokensList} loading={loading} />
    </div>
  );
};

export default Tokens;
