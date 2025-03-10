//REDUX-TOOLKIT
import { setNotifications, setBadge, removeNotification, setBadgeUpdated } from './notificationsSlice';
import { useDispatch } from 'react-redux';
//UTILS
import {
  DELETE_NOTIFICATIONS,
  GET_USER_ACTIVITY,
  NOTIFICATIONS_BADGE,
  READ_ALL_NOTIFICATIONS,
  READ_NOTIFICATIONS,
} from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';

export const useNotificationsActions = () => {
  const dispatch = useDispatch();

  const getNotifications = async (page = 1, force = false) => {
    const url = GET_USER_ACTIVITY + '?page=' + page;

    return await ApiRequest()
      .request({
        method: 'GET',
        url: url,
      })
      .then((response: any) => {
        dispatch(setNotifications({ notificationData: response.data.data, page, force }));
        return response.data.data;
      })
      .catch((error: any) => error);
  };

  const readNotification = async () => {
    const url = READ_NOTIFICATIONS;

    return await ApiRequest()
      .request({
        method: 'PUT',
        url: url,
      })
      .then((response: any) => {
        dispatch(setBadgeUpdated());
        return response;
      })
      .catch((error: any) => error);
  };

  const deleteNotification = async (notification_id) => {
    const url = DELETE_NOTIFICATIONS + notification_id;

    return await ApiRequest()
      .request({
        method: 'POST',
        url: url,
      })
      .then((response: any) => {
        dispatch(removeNotification(notification_id));
        return response;
      })
      .catch((error: any) => error);
  };

  const readAllNotifications = async () => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: READ_ALL_NOTIFICATIONS,
      })
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => error);
  };

  const getBadge = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: NOTIFICATIONS_BADGE,
      })
      .then((response: any) => {
        dispatch(setBadge(response.data.data.badge));
        return response;
      })
      .catch((error: any) => error);
  };

  return {
    getNotifications,
    readNotification,
    deleteNotification,
    readAllNotifications,
    getBadge,
  };
};
