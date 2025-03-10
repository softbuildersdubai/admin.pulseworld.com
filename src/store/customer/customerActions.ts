import {
  CountriesType,
  selectCustomerSlice,
  setCountries,
  setCustomerVerificationRequests,
  setCustomersList,
} from './customerSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  BULK_USER_ACCESS,
  BULK_USER_MESSAGES,
  COUNTRIES,
  USER,
  USER_ACCESS,
  USER_MESSAGE,
  USER_VERIFICATION,
  USER_VERIFICATION_HISTORY,
} from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';

export const useCustomerActions = () => {
  const dispatch = useDispatch();

  const { customerVerificationRequests, countries } = useSelector(selectCustomerSlice);

  const getCustomersList = async (params: any) => {
    // if (customersList?.list?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: USER,
      params,
    });
    const _customersList = response?.data?.data;
    dispatch(setCustomersList(_customersList));
  };

  const getCustomerById = async (id: any) => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${USER}/${id}`,
    });
    return response?.data?.data;
  };

  const getCountries = async (force: boolean = false) => {
    if (countries?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${COUNTRIES}`,
    });
    const _countries = response?.data?.data.map((country: CountriesType) => {
      return { value: country._id, label: country.name };
    });
    dispatch(setCountries(_countries));
  };

  const getCustomerVerificationRequests = async (force: boolean = false, page: any = 1) => {
    if (customerVerificationRequests?.list?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${USER_VERIFICATION}?page=${page}`,
    });
    const _customerVerificationRequests = response?.data?.data;

    dispatch(setCustomerVerificationRequests(_customerVerificationRequests));
  };

  const getCustomerVerificationRequestsHistory = async (id) => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${USER_VERIFICATION_HISTORY}/${id}`,
    });
    const _customerVerificationRequests = response?.data?.data;
    return _customerVerificationRequests;
  };

  const getSingleCustomerVerificationInfo = async (id?: string) => {
    if (customerVerificationRequests?.list?.length) {
      const find = customerVerificationRequests?.list.find((item) => item._id.toString() === id);

      if (find) {
        return find;
      }
    }

    const { data } = await ApiRequest().request({
      method: 'GET',
      url: `${USER_VERIFICATION}/${id}`,
    });
    return data.data;

    // const _customerVerificationRequests = response?.data?.data;
    // dispatch(setCustomerVerificationRequests(_customerVerificationRequests));
  };

  const verification_action = async (id: string | undefined, status: string, rejectionReason?: string) => {
    // VERIFIED
    try {
      const { data } = await ApiRequest().request({
        method: 'PATCH',
        url: `${USER_VERIFICATION}/${id}`,
        data: {
          status: status,
          rejectionReason,
        },
      });
      return data;
    } catch (err: any) {
      console.log({ err });
      return err.data;
    }

    // dispatch(setCustomerVerificationRequests(_customerVerificationRequests));
  };

  const changeUserStatus = async (id: string | undefined, status: string) => {
    // VERIFIED
    return await ApiRequest().request({
      method: 'PUT',
      url: `${USER_ACCESS}/${id}`,
      data: {
        status: status,
      },
    });
  };

  const changeBulkUsersStatus = async (userIds: Array<string> | undefined, data: any) => {
    // VERIFIED
    try {
      return await ApiRequest().request({
        method: 'PUT',
        url: `${BULK_USER_ACCESS}`,
        data: { ...data, userIds },
      });
    } catch (error) {
      console.log('Set Bulk User Access Error: ', error);
    }
  };

  const sendUserMail = async (id: string | undefined, data: any) => {
    // VERIFIED
    try {
      return await ApiRequest().request({
        method: 'POST',
        url: `${USER_MESSAGE}/${id}`,
        data,
      });
    } catch (error) {
      console.log('Send User Mail Error: ', error);
    }
  };

  const sendBulkMailToUsers = async (userIds: Array<string> | undefined, data: any) => {
    // VERIFIED
    try {
      return await ApiRequest().request({
        method: 'POST',
        url: `${BULK_USER_MESSAGES}`,
        data: { ...data, userIds },
      });
    } catch (error) {
      console.log('Send Bulk User Mail Error: ', error);
    }
  };

  const updateCustomer = async (id: string | undefined, data: any) => {
    const response = await ApiRequest().request({
      method: 'PATCH',
      url: `${USER}/${id}`,
      data,
    });

    return response.data;
  };

  return {
    getCustomersList,
    getCustomerById,
    getCustomerVerificationRequests,
    getSingleCustomerVerificationInfo,
    verification_action,
    changeUserStatus,
    sendUserMail,
    getCountries,
    updateCustomer,
    getCustomerVerificationRequestsHistory,
    sendBulkMailToUsers,
    changeBulkUsersStatus,
  };
};
