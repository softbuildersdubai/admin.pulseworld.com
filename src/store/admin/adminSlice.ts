import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IAdminPermission {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminStateSlice {
  data: any;
  list: any;
  activity: any;
  adminPermissionsList: IAdminPermission[];
}

const initialState: AdminStateSlice = {
  data: null,
  list: null,
  activity: null,
  adminPermissionsList: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminData: (state, action: PayloadAction<any>) => {
      return { ...state, data: action.payload };
    },
    setAdminList: (state, action: PayloadAction<any>) => {
      return { ...state, list: action.payload };
    },
    setAdminActivity: (state, action: PayloadAction<any>) => {
      return { ...state, activity: action.payload };
    },
    setAdminPermissionsList: (state, action: PayloadAction<any>) => {
      return { ...state, adminPermissionsList: action.payload };
    },
  },
});

export const { setAdminData, setAdminList, setAdminActivity, setAdminPermissionsList } = adminSlice.actions;
export const selectAdminData = (state: { admin: AdminStateSlice }) => state.admin.data;
export const selectAdminList = (state: { admin: AdminStateSlice }) => state.admin.list;
export const selectAdminActivity = (state: { admin: AdminStateSlice }) => state.admin.activity;
export const selectAdminPermissionsList = (state: { admin: AdminStateSlice }) => state.admin.adminPermissionsList;
export default adminSlice.reducer;
