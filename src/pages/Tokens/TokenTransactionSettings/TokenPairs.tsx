import { useEffect, useState } from 'react';
// REDUX
import { useTokenActions } from '../../../store/token/tokenAction';
import { selectToken } from '../../../store/token/tokenSlice';
import { useSelector } from 'react-redux';

// COMMON
import { edit, refresh } from '../../../images/other';
import GlobalTable from '../../../components/Table/GlobalTable';
import { Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';
import TokenNameWithLogo from '../../../components/TokenNameWithLogo';
import { Chip } from '@mui/material';

const TokenPairs = () => {
  const { getTokenPairs } = useTokenActions();
  const { tokenPairs } = useSelector(selectToken);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getTokenPairs();
      setLoading(false);
    })();
  }, []);

  const navigate = useNavigate();

  const headCells = [
    { id: 'pairToken', label: 'Pair Token', headCellClass: 'w-20' },
    { id: 'baseToken', label: 'Base Token', headCellClass: 'w-20' },
    { id: 'rate', label: 'Rate', headCellClass: 'w-[150px]' },
    { id: 'swapFee', label: 'Swap Fee', headCellClass: 'w-20' },
    { id: 'swapFeeType', label: 'Swap Fee Type', headCellClass: 'w-20' },
    { id: 'actions', label: 'Action', headCellClass: 'w-24 text-center' },
  ];
  const rows = tokenPairs?.map((_data: any) => {
    return {
      pairToken: <TokenNameWithLogo tokenName={_data.pairedToken.name} />,
      baseToken: <TokenNameWithLogo tokenName={_data.baseToken.name} />,
      rate: (
        <div className="flex gap-1 text-sm">
          <span>1 USDT</span>= {_data.rate}
          <span
            className={
              _data.pairedToken.name === 'XPL'
                ? 'text-XPLColor'
                : _data.pairedToken.name === 'PUSD'
                ? 'text-PUSDColor'
                : _data.pairedToken.name === 'AUSD'
                ? 'text-AUSDColor'
                : 'text-USDTColor'
            }
          >
            {_data.pairedToken.name}
          </span>
        </div>
      ),
      swapFee: _data.swapFee,
      swapFeeType: (
        <Chip
          label={_data.swapFeeType}
          size="small"
          sx={{ fontSize: '11px' }}
          color={_data.swapFeeType === 'AMOUNT' ? 'default' : 'primary'}
        ></Chip>
      ),
      actions: (
        <div className="flex justify-center">
          <Tooltip title="Edit">
            <img
              src={edit}
              width={24}
              height={24}
              alt="Edit Icon"
              onClick={() => navigate(`/tokens/settings/token-pair/details/${_data._id}`, { state: _data })}
              className="cursor-pointer"
            />
          </Tooltip>
        </div>
      ),
    };
  });

  return (
    <div className="w-full px-2">
      {/* PAGE TITLE */}
      <div className="flex bg-primary items-center text-white mt-4">
        <h1 className="flex-1 font-bold text-2xl py-1">Tokens Pairs/Swap Setting</h1>

        <div
          className="flex gap-1 items-center cursor-pointer px-3"
          onClick={async () => {
            setLoading(true);
            await getTokenPairs(true);
            setLoading(false);
          }}
        >
          <img src={refresh} alt="" width={24} height={24} />
          <span>Refresh</span>
        </div>
      </div>

      {/* TABLE */}
      <GlobalTable rows={rows} headCells={headCells} isLoading={loading} paginate={false} />
    </div>
  );
};

export default TokenPairs;
