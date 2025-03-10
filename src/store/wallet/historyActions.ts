import { useDispatch, useSelector } from 'react-redux';
import {
  FEATURE_PURCHASE_HISTORY,
  PRODUCT_PURCHASE_HISTORY,
  WALLET_DEPOSIT_HISTORY,
  WALLET_MIGRATIONS,
  WALLET_SWAP_HISTORY,
  WALLET_WITHDRAWS,
  WALLET_CLAIM_HISTORY,
} from '../../utils/network/ApiEndpoints';

//API
import ApiRequest from '../../utils/network/ApiRequest';
import {
  selectHistorySlice,
  setSwapHistory,
  setDepositHistory,
  setMigrateHistory,
  setWithdrawHistory,
  setFeaturePurchaseHistory,
  setProductPurchaseHistory,
  setTransactionHistory,
  setClaimHistory,
} from './historySlice';

export const useHistoryActions = () => {
  const dispatch = useDispatch();

  const {
    swapHistory,
    depositHistory,
    migrateHistory,
    withdrawHistory,
    featurePurchaseHistory,
    productPurchaseHistory,
  } = useSelector(selectHistorySlice);

  const getSwapHistoryRequests = async (force: boolean = false, filter?: any) => {
    if (swapHistory?.list?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${WALLET_SWAP_HISTORY}`,
      params: {
        page: filter.page,
        limit: filter.limit,
        search: filter.search,
      },
    });

    const _migrationReuests = response?.data?.data;
    dispatch(setSwapHistory(_migrationReuests));
  };

  const getDepositHistoryRequests = async (force: boolean = false, filter?: any) => {
    if (depositHistory?.list?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${WALLET_DEPOSIT_HISTORY}`,
      params: {
        page: filter.page,
        limit: filter.limit,
        search: filter.search,
      },
    });

    const _migrationReuests = response?.data?.data;
    dispatch(setDepositHistory(_migrationReuests));
  };

  const getWithdrawHistoryRequests = async (force: boolean = false, filter?: any) => {
    if (withdrawHistory?.list?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${WALLET_WITHDRAWS}`,
      params: {
        page: filter.page,
        limit: filter.limit,
        search: filter.search,
      },
    });

    const _migrationReuests = response?.data?.data;
    dispatch(setWithdrawHistory(_migrationReuests));
  };

  const getMigrateHistoryRequests = async (force: boolean = false, filter?: any) => {
    if (migrateHistory?.list?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${WALLET_MIGRATIONS}`,
      params: {
        page: filter.page,
        limit: filter.limit,
        search: filter.search,
      },
    });

    const _migrationReuests = response?.data?.data;
    dispatch(setMigrateHistory(_migrationReuests));
  };

  const getFeaturePurchaseHistory = async (force: boolean = false, filter?: any) => {
    if (featurePurchaseHistory?.list?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${FEATURE_PURCHASE_HISTORY}`,
      params: {
        page: filter.page,
        limit: filter.limit,
        search: filter.search,
      },
    });

    dispatch(setFeaturePurchaseHistory(response?.data?.data));
  };

  const getProductPurchaseHistory = async (force: boolean = false, filter?: any) => {
    if (productPurchaseHistory?.list?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${PRODUCT_PURCHASE_HISTORY}`,
      params: {
        page: filter.page,
        limit: filter.limit,
        search: filter.search,
      },
    });

    dispatch(setProductPurchaseHistory(response?.data?.data));
  };


  const getClaimHistory = async (force: boolean = false, filter?: any) => {
    try {
      const response = await ApiRequest().request({
        method: 'GET',
        url: WALLET_CLAIM_HISTORY,
        params: {
          page: filter.page,
          limit: filter.limit,
          search: filter.search,
        },
      });
      
      if (response?.data?.status) {
        dispatch(setClaimHistory(response?.data?.data));
      }
      return response?.data;
    } catch (error: any) {
      return { status: false, message: error.message };
    }
  };



  return {
    getSwapHistoryRequests,
    getMigrateHistoryRequests,
    getWithdrawHistoryRequests,
    getDepositHistoryRequests,
    getFeaturePurchaseHistory,
    getProductPurchaseHistory,
    getClaimHistory,
  };
};
