import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenSliceState {
  tokensList: Token[];
  tokenTransactionSettingList: {
    MIGRATE: TokenTransactionSettingType[];
    SWAP: TokenTransactionSettingType[];
    WITHDRAW: TokenTransactionSettingType[];
    DEPOSIT: TokenTransactionSettingType[];
    [key: string]: any;
  };
  tokenPairs: any[];
}

export interface Token {
  _id: string;
  name: string;
  symbol: string;
  withdrawFeeType: 'PERCENTAGE' | 'AMOUNT';
  withdrawFee: number;
  minimumWithdrawlAmount: number;
  allowedWithdrawlsPerDay: number;
  withdrawProcess: 'MANUAL' | 'AUTOMATIC';
  network: string;
  canWithdraw: boolean;
  canMigrate: boolean;
  canTopup: boolean;
  swapFee: number;
  isSwapable: boolean;
  dailyWithdrawLimit: number | null;
  dailyWithdrawCount: number | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  ordinator: number;
  allowNegativeBalance: boolean;
  onlyUsdtThreshold: boolean;
  swapFromEnabled: boolean;
  swapToEnabled: boolean;
}

export interface TokenTransactionSettingType {
  _id?: string;
  token?: string;
  transactionType?: string;
  feeType: string | any;
  fee: number;
  dailyAmountLimit: number | null;
  dailyTrxCountLimit: number | null;
  minimumTrxAmount: number;
  trxProcess: string | any;
  createdAt?: string;
  updatedAt?: string;
  tokenSymbol?: string;
  tokenName?: string;
  [key: string]: any;
}

const initialState: TokenSliceState = {
  tokensList: [],
  tokenTransactionSettingList: {
    MIGRATE: [],
    SWAP: [],
    WITHDRAW: [],
    DEPOSIT: [],
  },
  tokenPairs: [],
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setTokenList: (state, action: PayloadAction<any>) => {
      return { ...state, tokensList: action.payload };
    },
    setTokenTRansactionSettingList: (state, action: PayloadAction<any>) => {
      return { ...state, tokenTransactionSettingList: action.payload };
    },
    setTokenPairs: (state, action: PayloadAction<any>) => {
      return { ...state, tokenPairs: action.payload };
    },
  },
});

export const { setTokenList, setTokenTRansactionSettingList, setTokenPairs } = tokenSlice.actions;

export const selectToken = (state: { token: TokenSliceState }) => state.token;
export default tokenSlice.reducer;
