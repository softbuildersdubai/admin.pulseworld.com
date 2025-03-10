import { useNavigate } from 'react-router-dom';
import { edit } from '../../../images/other';
import { Token } from '../../../store/token/tokenSlice';
import GlobalTable from '../../Table/GlobalTable';
import { Tooltip } from '@mui/material';
import StatusChip from '../../StatusChip';
import TokenNameWithLogo from '../../TokenNameWithLogo';

type Props = {
  data: Token[];
  loading: boolean;
};

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'symbol', label: 'Sybmol' },
  { id: 'canMigrate', label: 'Migration' },
  { id: 'canWithdraw', label: 'Withdraw' },
  { id: 'canTopup', label: 'Top up' },
  { id: 'allowNegativeBalance', label: 'Allow Negitive' },
  { id: 'swapFromEnabled', label: 'Swap From' },
  { id: 'swapToEnabled', label: 'Swap To' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center' },
];

const TokensTable = ({ data, loading }: Props) => {
  const navigate = useNavigate();

  const rows = data?.map((_data) => {
    return {
      name: <TokenNameWithLogo tokenName={_data.name} />,
      symbol: _data.symbol,
      canMigrate: <StatusChip status={_data.canMigrate} />,
      canWithdraw: <StatusChip status={_data.canWithdraw} />,
      canTopup: <StatusChip status={_data.canTopup} />,
      allowNegativeBalance: <StatusChip status={_data.allowNegativeBalance} />,
      swapFromEnabled: <StatusChip status={_data.swapFromEnabled} />,
      swapToEnabled: <StatusChip status={_data.swapToEnabled} />,
      actions: (
        <div className="flex justify-center">
          <Tooltip title="Edit Token">
            <img
              src={edit}
              width={24}
              height={24}
              alt="View Icon"
              onClick={() => navigate(`/tokens/details/${_data._id}`)}
              className="cursor-pointer"
            />
          </Tooltip>
        </div>
      ),
    };
  });

  return (
    // TABLE
    <GlobalTable rows={rows} headCells={headCells} isLoading={loading} paginate={false} />
  );
};

export default TokensTable;
