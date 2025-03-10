//REDUX
import { combineReducers } from 'redux';
//REDUX-TOOLKIT
import { configureStore } from '@reduxjs/toolkit';
// REDUX_PERSIT
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
//SLICES
import drawerSlice, { setDrawerTab } from './drawer/drawerSlice';
import userSlice from './user/userSlice';
import tokenSlice from './token/tokenSlice';
import walletSlice from './wallet/walletSlice';
import providerSlice from './providers/providerSlice';
import customerSlice from './customer/customerSlice';
import productSlice from './products/productSlice';
import featuresSlice from './features/featuresSlice';
import dashboardSlice from './Dashboard/dashboardSlice';
import historySlice from './wallet/historySlice';
import adminSlice from './admin/adminSlice';
import notificationsSlice from './notifications/notificationsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'drawer']
};

const rootReducer = combineReducers({
  drawer: drawerSlice,
  user: userSlice,
  token: tokenSlice,
  wallet: walletSlice,
  provider: providerSlice,
  customer: customerSlice,
  product: productSlice,
  features: featuresSlice,
  dashboard: dashboardSlice,
  history: historySlice,
  notifications: notificationsSlice,
  admin: adminSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export const handleTabChange = (newTab: string) => store.dispatch(setDrawerTab(newTab));
