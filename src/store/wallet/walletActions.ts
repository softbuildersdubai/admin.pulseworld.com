import { selectWalletSlice, setMigrationRequests, setWithdrawRequests } from './walletSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  WALLET_MIGRATIONS,
  WALLET_MIGRATIONS_ACTIONS,
  WALLET_SWAP_HISTORY,
  WALLET_WITHDRAWS,
  WALLET_WITHDRAWS_ACTIONS,
} from '../../utils/network/ApiEndpoints';

//API
import ApiRequest from '../../utils/network/ApiRequest';

export const useWalletActions = () => {
  const dispatch = useDispatch();

  const { withdrawRequests, migrationRequests } = useSelector(selectWalletSlice);

  const getWithdrawRequests = async (force: boolean = false, filter?: any) => {
    if (withdrawRequests?.list?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${WALLET_WITHDRAWS}`,
      params: {
        page: filter.page,
        limit: filter.limit,
        search: filter.search,
        status: 'PENDING',
      },
    });
    const _withdrawRequests = response?.data?.data;
    dispatch(setWithdrawRequests(_withdrawRequests));
  };

  const updateWithdrawRequest = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: WALLET_WITHDRAWS_ACTIONS,
        data: data,
      })
      .then((response: any) => response)
      .catch((error: any) => error);
  };

  const getMigrationRequests = async (force: boolean = false, page: any = 1) => {
    if (migrationRequests?.list?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${WALLET_MIGRATIONS}?page=${page}&searchKey=&status=PENDING`,
    });
    const _migrationReuests = response?.data?.data;
    dispatch(setMigrationRequests(_migrationReuests));
  };

  const getSwapHistoryRequests = async (force: boolean = false) => {
    if (migrationRequests?.list?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${WALLET_SWAP_HISTORY}`,
    });
    const _migrationReuests = response?.data?.data;

    dispatch(setMigrationRequests(_migrationReuests));
  };

  const updateMigrationRequest = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: WALLET_MIGRATIONS_ACTIONS,
        data: data,
      })
      .then((response: any) => response)
      .catch((error: any) => error);
  };

  return {
    getWithdrawRequests,
    updateWithdrawRequest,
    getMigrationRequests,
    updateMigrationRequest,
    getSwapHistoryRequests,
  };
};
