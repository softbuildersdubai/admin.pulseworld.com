// REDUX
import {
  TokenTransactionSettingType,
  selectToken,
  setTokenList,
  setTokenPairs,
  setTokenTRansactionSettingList,
} from './tokenSlice';
import { useDispatch, useSelector } from 'react-redux';

// UTILS
import {
  TOKEN,
  TOKEN_PAIRS,
  TOKEN_PAIRS_EDIT,
  TOKEN_PAIRS_SETTING,
  TOKEN_TRANSACTION_SETTING,
} from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';

export const useTokenActions = () => {
  const dispatch = useDispatch();

  const { tokensList, tokenTransactionSettingList, tokenPairs } = useSelector(selectToken);

  // Recent Devices Section Notifications Api
  const getTokensList = async (force: boolean = false) => {
    if (tokensList?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${TOKEN}/`,
    });
    const _tokensList = response?.data?.data;
    dispatch(setTokenList(_tokensList));
  };

  const getTokenById = async (id: string) => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${TOKEN}/${id}`,
    });
    const _token = response?.data?.data;
    return _token;
  };

  const updateToken = async (id: string | undefined, data: any) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: `${TOKEN}/${id}`,
        data: data,
      })
      .then((response: any) => {
        getTokensList(true);
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const getTokenTransactionSettingList = async (force: boolean = false) => {
    const existingData = tokenTransactionSettingList
      ? Object.keys(tokenTransactionSettingList).find((token) => {
        return tokenTransactionSettingList[token].length > 0 && token;
      })
      : [];

    if (existingData && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${TOKEN_TRANSACTION_SETTING}`,
    });
    const _tokenTransactionSettingList = response?.data?.data;

    const tokensByType: { [key: string]: TokenTransactionSettingType[] } = {};

    // Iterate over each transaction type
    const transactionTypes = ['WITHDRAW', 'DEPOSIT', 'MIGRATE', 'SWAP'];
    transactionTypes.forEach((type) => {
      // Filter tokens array based on transactionType
      const tokensOfType = _tokenTransactionSettingList.filter(
        (token: TokenTransactionSettingType) => token.transactionType === type
      );
      // Assign filtered tokens to the corresponding type key in tokensByType object
      tokensByType[type] = tokensOfType;
    });

    dispatch(setTokenTRansactionSettingList(tokensByType));
  };

  const getTokenTransactionSettingById = async (id: string) => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${TOKEN_TRANSACTION_SETTING}/${id}`,
    });
    const _tokenTransactionSetting = response?.data?.data;
    return _tokenTransactionSetting;
  };

  const updateTokenTransactionSettings = async (id: string | undefined, data: any) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: `${TOKEN_TRANSACTION_SETTING}/${id}`,
        data: data,
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const getTokenPairs = async (force: boolean = false) => {
    if (tokenPairs?.length && !force) return;

    return await ApiRequest()
      .request({
        method: 'GET',
        url: TOKEN_PAIRS,
      })
      .then((response: any) => {
        dispatch(setTokenPairs(response?.data?.data));
        return response;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const getTokenPairById = async (id: string) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: `${TOKEN_PAIRS}/${id}`,
      })
      .then((response: any) => {
        return response?.data?.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const getSingleTokenPairSetting = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: TOKEN_PAIRS_SETTING,
      })
      .then((response: any) => {
        return response.data.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const editSingleTokenPairSetting = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: TOKEN_PAIRS_EDIT,
        data,
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  return {
    getTokensList,
    getTokenById,
    updateToken,
    getTokenTransactionSettingList,
    getTokenTransactionSettingById,
    updateTokenTransactionSettings,
    getTokenPairs,
    getTokenPairById,
    getSingleTokenPairSetting,
    editSingleTokenPairSetting,
  };
};
