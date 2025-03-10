import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../user/userSlice";

export interface CustomerVerificationRequest {
  _id: string;
  user: User;
  status: "PENDING" | "VERIFIED" | "REJECTED";
  type: "KYC" | "KYB";
  companyName: string | null; // Assuming it could be null
  email: string | null;
  firstName: string;
  lastName: string;
  governmentIdNumber: string;
  isPoliticalyExposed: boolean;
  verificationFiles: any;
  retryVerification: boolean;
  deletedAt: string | null;
  rejectionReason: string;
  rejectedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  username: string;
  firstName: string | null;
  lastName: string | null;
  companyName: string | null;
  email: string;
  sponsor: {
    _id: string;
    username: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    companyName: string | null;
    accountType: string;
  };
  account: any;
  refCode: string;
  twoFA: any;
  verified: any;
  status: any;
  totalBalance: number;
  tokensBalance:
    | {
        [key: string]: {
          balance: number;
          percent: string;
          name: string;
        };
      }
    | any;
  [key: string]: any;
}

export interface CountriesType {
  _id: string;
  name: string;
  code: string;
  phoneCode: string;
  flag: string;
}

export interface CustomerSliceState {
  customersList: {
    list: User[];
    currentPage: number;
    totalCount: number;
    totalPages: number;
  };
  customerVerificationRequests: {
    list: CustomerVerificationRequest[];
    paginate: any;
  };
  countries: CountriesType[];
  verificationHistory: [];
}

const initialState: CustomerSliceState = {
  customersList: {
    list: [],
    currentPage: 1,
    totalCount: 1,
    totalPages: 1,
  },
  customerVerificationRequests: {
    list: [],
    paginate: {},
  },
  countries: [],
  verificationHistory: [],
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomersList: (state, action: PayloadAction<any>) => {
      return { ...state, customersList: action.payload };
    },
    setCustomerVerificationRequests: (state, action: PayloadAction<any>) => {
      return { ...state, customerVerificationRequests: action.payload };
    },
    setCountries: (state, action: PayloadAction<any>) => {
      return { ...state, countries: action.payload };
    },
    setverificationHistory: (state, action: PayloadAction<any>) => {
      return { ...state, verificationHistory: action.payload };
    },
  },
});

export const {
  setCustomerVerificationRequests,
  setCustomersList,
  setCountries,
  setverificationHistory,
} = customerSlice.actions;

export const selectCustomerSlice = (state: { customer: CustomerSliceState }) =>
  state.customer;

export default customerSlice.reducer;
