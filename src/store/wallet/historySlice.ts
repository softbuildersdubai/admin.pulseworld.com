import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SwapHistory {
  amount: number;
  createdAt: string;
  deletedAt: string;
  fee: number;

  fromTrx: string;
  fromWallet: {
    token: {
      name: string;
      symbol: string;
      _id: string;
    };
    id: string;
  };
  swappedRatio: number;
  toTrx: string;
  toWallet: {
    token: {
      name: string;
      symbol: string;
      _id: string;
    };
    id: string;
  };
  updatedAt: string;
  user: {
    _id: string;
    email: string;
    lastName: string;
    firstName: string;
    username: string;
    uuid: number;
  };
  _id: string;
}

export interface historyStateSlice {
  swapHistory: {
    list: SwapHistory[];
    currentPage: any;
    totalCount: any;
    totalPages: any;
  };
  migrateHistory: {
    list: any;
    currentPage: any;
    totalCount: any;
    totalPages: any;
  };
  withdrawHistory: {
    list: any;
    currentPage: any;
    totalCount: any;
    totalPages: any;
  };
  depositHistory: {
    list: any;
    currentPage: any;
    totalCount: any;
    totalPages: any;
  };
  featurePurchaseHistory: {
    list: any;
    currentPage: any;
    totalCount: any;
    totalPages: any;
  };
  productPurchaseHistory: {
    list: any;
    currentPage: any;
    totalCount: any;
    totalPages: any;
  };
  transactionHistory: {
    list: any[];
    totalPages: number;
    currentPage: number;
    totalRecords: number;
  };
  claimHistory: {
    list: any[];
    currentPage: number;
    totalCount: number;
    totalPages: number;
  };
}

const initialState: historyStateSlice = {
  swapHistory: {
    list: [],
    currentPage: 0,
    totalCount: 0,
    totalPages: 0,
  },
  migrateHistory: {
    list: [],
    currentPage: 0,
    totalCount: 0,
    totalPages: 0,
  },
  // withdrawHistory: {
  //   list: [],
  //   currentPage: 0,
  //   totalCount: 0,
  //   totalPages: 0,
  // },
  depositHistory: {
    list: [],
    currentPage: 0,
    totalCount: 0,
    totalPages: 0,
  },
  featurePurchaseHistory: {
    list: [],
    currentPage: 0,
    totalCount: 0,
    totalPages: 0,
  },
  productPurchaseHistory: {
    list: [],
    currentPage: 0,
    totalCount: 0,
    totalPages: 0,
  },
  transactionHistory: {
    list: [],
    totalPages: 0,
    currentPage: 1,
    totalRecords: 0,
  },
  claimHistory: {
    list: [],
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
  },
  withdrawHistory: {
    list: [],
    currentPage: 1,
    totalCount: 0,
    totalPages: 0,
  },
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setSwapHistory: (state, action: PayloadAction<any>) => {
      return { ...state, swapHistory: action.payload };
    },
    setDepositHistory: (state, action: PayloadAction<any>) => {
      return { ...state, depositHistory: action.payload };
    },
    setMigrateHistory: (state, action: PayloadAction<any>) => {
      return { ...state, migrateHistory: action.payload };
    },
    setWithdrawHistory: (state, action: PayloadAction<any>) => {
      return { ...state, withdrawHistory: action.payload };
    },
    setFeaturePurchaseHistory: (state, action: PayloadAction<any>) => {
      return { ...state, featurePurchaseHistory: action.payload };
    },
    setProductPurchaseHistory: (state, action: PayloadAction<any>) => {
      return { ...state, productPurchaseHistory: action.payload };
    },
    setTransactionHistory: (state, action) => {
      state.transactionHistory = action.payload;
    },
    setClaimHistory: (state, action: PayloadAction<any>) => {
      return { ...state, claimHistory: action.payload };
    },
  },
});

export const {
  setSwapHistory,
  setDepositHistory,
  setMigrateHistory,
  setWithdrawHistory,
  setFeaturePurchaseHistory,
  setProductPurchaseHistory,
  setTransactionHistory,
  setClaimHistory,
} = historySlice.actions;
export const selectHistorySlice = (state: { history: historyStateSlice }) => state.history;

export default historySlice.reducer;
