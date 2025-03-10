import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardSliceState {
  usersOverview: any;
  allTokensBalance: any;
  feeCollected: any;
  ordersOverview: any;
  productsOverview: any;
}

const initialState: DashboardSliceState = {
  usersOverview: null,
  allTokensBalance: null,
  feeCollected: null,
  ordersOverview: null,
  productsOverview: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setUsersOverview: (state, action: PayloadAction<any>) => {
      return { ...state, usersOverview: action.payload };
    },
    setAllTokensBalance: (state, action: PayloadAction<any>) => {
      return { ...state, allTokensBalance: action.payload };
    },
    setFeeCollected: (state, action: PayloadAction<any>) => {
      return { ...state, feeCollected: action.payload };
    },
    setOrdersOverview: (state, action: PayloadAction<any>) => {
      return { ...state, ordersOverview: action.payload };
    },
    setProductsOverview: (state, action: PayloadAction<any>) => {
      return { ...state, productsOverview: action.payload };
    },
  },
});

export const { setAllTokensBalance, setFeeCollected, setOrdersOverview, setProductsOverview, setUsersOverview } =
  dashboardSlice.actions;

export const selectDashboard = (state: { dashboard: DashboardSliceState }) => state.dashboard;
export default dashboardSlice.reducer;
