import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../user/userSlice';
import { Token } from '../token/tokenSlice';

export interface WithdrawRequest {
  _id: string;
  requestId: string;
  user: User;
  fromWallet: string;
  token: Token;
  type: 'WITHDRAW' | 'MIGRATE';
  address: string;
  amount: number;
  fee: number;
  status: 'PENDING' | 'DENIED' | 'COMPLETED';
  withdrawProcess: 'MANUAL' | 'AUTOMATIC';
  network: any;
  trxHashUrl: string;
  deletedAt: string | null;
  denialReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MigrationRequest {
  _id: string;
  requestId: string;
  user: User;
  blockchainId: string;
  fromWallet: string;
  token: Token;
  type: string;
  address: string;
  amount: number;
  fee: number;
  status: string;
  network: any;
  trxHashUrl: string;
  deletedAt: string | null;
  denialReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WalletStateSlice {
  withdrawRequests: {
    list: WithdrawRequest[];
    currentPage: any;
    totalCount: any;
    totalPages: any;
  };
  migrationRequests: {
    list: MigrationRequest[];
    paginate: any;
  };
}

const initialState: WalletStateSlice = {
  withdrawRequests: {
    list: [],
    currentPage: 0,
    totalCount: 0,
    totalPages: 0,
  },
  migrationRequests: {
    list: [],
    paginate: {},
  },
};

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWithdrawRequests: (state, action: PayloadAction<any>) => {
      return { ...state, withdrawRequests: action.payload };
    },
    setMigrationRequests: (state, action: PayloadAction<any>) => {
      return { ...state, migrationRequests: action.payload };
    },
  },
});

export const { setWithdrawRequests, setMigrationRequests } = walletSlice.actions;
export const selectWalletSlice = (state: { wallet: WalletStateSlice }) => state.wallet;

export default walletSlice.reducer;
