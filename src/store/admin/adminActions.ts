import { useDispatch } from 'react-redux';
import {
  ADMIN_ACCESS,
  ADMIN_ACTIVITY,
  ADMIN_CHECK_EMAIL,
  ADMIN_CHECK_USERNAME,
  ADMIN_CREATE,
  ADMIN_INFO,
  ADMIN_PERMISSIONS,
  ADMIN_UPDATE,
} from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';
import { setAdminActivity, setAdminData, setAdminList, setAdminPermissionsList } from './adminSlice';

export const useAdminActions = () => {
  const dispatch = useDispatch();

  const getAdminData = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: ADMIN_INFO,
      })
      .then((response: any) => {
        dispatch(setAdminData(response.data.data));
        return response.data;
      })
      .catch((err: any) => err.data);
  };

  const createAdminData = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: ADMIN_CREATE,
        data,
      })
      .then((response: any) => response.data.data)
      .catch((err: any) => err.data);
  };

  const updateAdminData = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: ADMIN_UPDATE,
        data,
      })
      .then((response: any) => response.data)
      .catch((err: any) => err.data);
  };

  const checkAdminEmail = async (email: string) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: ADMIN_CHECK_EMAIL + '/' + email,
      })
      .then((response: any) => response.data.data)
      .catch((err: any) => err.data);
  };

  const checkAdminUsername = async (username: string) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: ADMIN_CHECK_USERNAME + '/' + username,
      })
      .then((response: any) => response.data.data)
      .catch((err: any) => err.data);
  };

  const getAdminList = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: '/',
      })
      .then((response: any) => {
        setAdminList(response?.data?.data);
        return response?.data?.data;
      })
      .catch((err: any) => err.data);
  };

  const getAdminPermissionsList = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: ADMIN_PERMISSIONS,
      })
      .then((response: any) => {
        dispatch(setAdminPermissionsList(response?.data?.data));
        return response?.data;
      })
      .catch((err: any) => err.data);
  };

  const updateAdminAccess = async (id: string, status: string) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: ADMIN_ACCESS + '/' + id,
        data: { status },
      })
      .then((response: any) => response.data)
      .catch((err: any) => err.data);
  };

  const getAdminActivity = async (params) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: ADMIN_ACTIVITY,
        params,
      })
      .then((response: any) => {
        dispatch(setAdminActivity(response.data.data));
        return response.data;
      })
      .catch((err: any) => err.data);
  };

  return {
    getAdminData,
    createAdminData,
    updateAdminData,
    checkAdminEmail,
    checkAdminUsername,
    getAdminList,
    updateAdminAccess,
    getAdminActivity,
    getAdminPermissionsList,
  };
};
