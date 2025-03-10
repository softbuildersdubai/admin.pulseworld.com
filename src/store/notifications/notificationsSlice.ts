//REDUX-TOOLKIT
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  list: [];
  badge: number;
  notifications: {
    list: any[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
    pageLoaded: number;
  };
  badgeUpdated: boolean;
}

const initialState: Notification = {
  list: [],
  badge: 0,
  notifications: {
    list: [],
    totalCount: 0,
    totalPages: 0,
    currentPage: 0,
    pageLoaded: 0,
  },
  badgeUpdated: false,
};

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<any>) => {
      if (action.payload.force) {
        return {
          ...state,
          notifications: {
            list: action.payload.notificationData.list,
            totalCount: action.payload.notificationData.totalCount,
            totalPages: action.payload.notificationData.totalPages,
            currentPage: action.payload.notificationData.currentPage,
            pageLoaded: action.payload.page,
          },
          badge: action.payload.notificationData.badgeCount,
        };
      }
      if (action.payload.page > state.notifications.pageLoaded)
        return {
          ...state,
          notifications: {
            list: [...state.notifications.list, ...action.payload.notificationData.list],
            totalCount: action.payload.notificationData.totalCount,
            totalPages: action.payload.notificationData.totalPages,
            currentPage: action.payload.notificationData.currentPage,
            pageLoaded: action.payload.page,
          },
          badge: action.payload.page === 1 ? action.payload.notificationData.badgeCount : 0,
        };
    },
    setBadge: (state, action: PayloadAction<any>) => {
      return { ...state, badge: action.payload };
    },
    setBadgeUpdated: (state) => {
      return { ...state, badge: 0, badgeUpdated: true };
    },
    removeNotification: (state, action: PayloadAction<any>) => {
      const newArray: any = state.list.filter((item: any) => item.id !== action.payload);

      return { ...state, list: newArray };
    },
  },
});

export const { setBadge, removeNotification, setNotifications, setBadgeUpdated } = slice.actions;
export const notification_badge = (state: { notifications: Notification }) => state.notifications.badge;
export const selectNotifications = (state: { notifications: Notification }) => state.notifications.notifications;
export default slice.reducer;
