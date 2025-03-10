import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//UTILS
// import currentStorage from "../../utils/currentStorage"

export interface User {
  _id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  refParent?: {
    _id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    companyName: string | null;
    accountType: 'INDIVIDUAL' | 'COMPANY';
  } | null;
  isCompanyDefaultAccount: boolean;
  password: string;
  firstName: string;
  lastName: string;
  companyName: string | null;
  accountType: 'INDIVIDUAL' | 'COMPANY';
  differentBillingAddress: boolean;
  isSecurityCodeSet: boolean;
  securityCode: string | null;
  twoFactorAuthEnabled: boolean;
  isVerified: boolean;
  withdrawEnabled: boolean;
  xplEnabled: boolean;
  swapEnabled: boolean;
  type: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'BLOCK';
  deletedAt: string | null;
  createdAt: string;
  refCode: string;
  address: string;
  phoneNumber: string;
  permissions: any;
  [key: string]: any;
}
export interface UserSliceState {
  accessToken: string;
  user: any;
}

const initialState: UserSliceState = {
  accessToken: '',
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    setLogout: (state) => {
      return {
        ...state,
        accessToken: '',
        user: null,
      };
    },
    setUpdateUser: (state, action: PayloadAction<{ user: any }>) => {
      // const storage = currentStorage()
      // storage.setItem("user", JSON.stringify(action.payload.user))
      return { ...state, user: action.payload.user };
    },
  },
});

export const { setLogin, setLogout, setUpdateUser } = userSlice.actions;

export const selectUserSlice = (state: { user: UserSliceState }) => state.user;
export const selectUser = (state: { user: UserSliceState }) => state.user.user;

export default userSlice.reducer;
