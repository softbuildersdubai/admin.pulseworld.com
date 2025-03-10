import { useNavigate } from 'react-router-dom';
import { edit } from '../../../images/other';
import { TokenTransactionSettingType } from '../../../store/token/tokenSlice';
import GlobalTable from '../../Table/GlobalTable';
import { Chip, Tooltip } from '@mui/material';
import TokenNameWithLogo from '../../TokenNameWithLogo';

type Props = {
  data: TokenTransactionSettingType[];
  loading: boolean;
};

const headCells = [
  { id: 'tokenName', label: 'Token Name', headCellClass: 'w-32 ' },
  { id: 'trxProcess', label: 'Trx. Process', headCellClass: '' },
  { id: 'minimumTrxAmount', label: 'Min. Trx. Amount', headCellClass: '' },
  { id: 'dailyTrxCountLimit', label: 'Daily Trx. Count Limit', headCellClass: '' },
  { id: 'dailyAmountLimit', label: 'Daily Amount Limit', headCellClass: '' },
  { id: 'fee', label: 'Fee', headCellClass: 'w-24 ' },
  { id: 'feeType', label: 'Fee Type', headCellClass: 'w-32' },
  { id: 'actions', label: 'Actions', headCellClass: 'text-center w-24 ' },
];

const TokenTransactionSettingsTable = ({ data, loading }: Props) => {
  const navigate = useNavigate();

  const rows = data?.map((_data) => {
    return {
      tokenName: <TokenNameWithLogo tokenName={_data.tokenName ?? ''} />,
      trxProcess: _data.trxProcess,
      minimumTrxAmount: _data.minimumTrxAmount ?? 'Unlimited',
      dailyTrxCountLimit: _data.dailyTrxCountLimit ?? 'Unlimited',
      dailyAmountLimit: _data.dailyAmountLimit ?? 'Unlimited',
      fee: _data.fee,
      feeType: (
        <Chip
          label={_data.feeType}
          size="small"
          sx={{ fontSize: '11px' }}
          color={_data.feeType === 'AMOUNT' ? 'default' : 'primary'}
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
              onClick={() =>
                navigate(`/tokens/settings/${_data?.transactionType?.toLowerCase()}/details/${_data._id}`, {
                  state: _data,
                })
              }
              className="cursor-pointer"
            />
          </Tooltip>
        </div>
      ),
    };
  });

  return (
    // TABLE
    <>
      <GlobalTable rows={rows} headCells={headCells} isLoading={loading} paginate={false} />
    </>
  );
};

export default TokenTransactionSettingsTable;
