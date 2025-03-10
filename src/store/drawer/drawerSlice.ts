//REDUX-TOOLKIT
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DrawerSliceState {
  width: number;
  open: boolean;
  openItemKey: string;
  tab: string;
  activeMenu?: string;
  expendMenu?: boolean;
  expendKey?: string;
}
const initialState: DrawerSliceState = {
  width: 240,
  open: true,
  openItemKey: '',
  tab: '/',
  activeMenu: '/',
  expendMenu: false,
  expendKey: '',
};

const drawerSlice = createSlice({
  name: 'drawerSlice',
  initialState,
  reducers: {
    setDrawerWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setDrawerOpenItemIndex: (state, action: PayloadAction<string>) => {
      state.openItemKey = action.payload;
    },
    setDrawerTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;
    },
    setActiveMenu: (state, action: PayloadAction<any>) => {
      const menu: any = action.payload;
      return {
        ...state,
        activeMenu: menu.url,
        openItemKey: menu.key,
      };
    },
    setExpendMenu: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setDrawerWidth, setDrawerOpen, setDrawerOpenItemIndex, setDrawerTab, setActiveMenu, setExpendMenu } =
  drawerSlice.actions;
export const selectDrawerWidth = (state: { drawer: DrawerSliceState }) => state.drawer.width;
export const selectDrawerOpen = (state: { drawer: DrawerSliceState }) => state.drawer.open;
export const selectDrawerOpenItemKey_ = (state: { drawer: DrawerSliceState }) => state.drawer.openItemKey;
export const selectDrawerTab = (state: { drawer: DrawerSliceState }) => state.drawer.tab;
export const selectActiveMenu = (state: { drawer: DrawerSliceState }) => state.drawer.activeMenu;
export const selectDrawer = (state: { drawer: DrawerSliceState }) => state.drawer;

export default drawerSlice.reducer;
