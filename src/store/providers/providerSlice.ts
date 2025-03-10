import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Provider {
  _id: string;
  name: string;
  description: string;
  logo: {
    _id: string;
    path: string;
  };
  status: 'ACTIVE' | 'INACTIVE' | 'COMING_SOON';
  deletedAt: string | null;
  createdAt: string;
}

export interface ProviderStateSlice {
  providers: {
    list: Provider[];
    paginate: any;
  };
}

const initialState: ProviderStateSlice = {
  providers: {
    list: [],
    paginate: {},
  },
};

const providerSlice = createSlice({
  name: 'provider',
  initialState,
  reducers: {
    setProviders: (state, action: PayloadAction<any>) => {
      return { ...state, providers: action.payload };
    },
  },
});

export const { setProviders } = providerSlice.actions;
export const selectProviderSlice = (state: { provider: ProviderStateSlice }) => state.provider;

export default providerSlice.reducer;
