// UTILS
import {
  LEGAL_CONTENT,
  LINKS_SETTINGS,
  QUICKI_PAY_SETTINGS,
  SHOW_PAGES,
  SWAP_PRIORITY,
} from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';

export const useSettingsActions = () => {
  const getQuickiPaySettings = async () => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${QUICKI_PAY_SETTINGS}`,
    });
    return response?.data;
  };

  const getShowPagesList = async () => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${SHOW_PAGES}`,
    });
    return response?.data;
  };

  const updateShowPage = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: `${SHOW_PAGES}`,
        data: data,
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const updateQuickiPaySettings = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: `${QUICKI_PAY_SETTINGS}/${data._id}`,
        data: { trxFee: data.trxFee, trxFeeType: data.trxFeeType.value },
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const updateLinkSettings = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: `${LINKS_SETTINGS}`,
        data: data,
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const updatePrivacySettings = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: `${LEGAL_CONTENT}`,
        data: data,
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const getLinkSettings = async () => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${LINKS_SETTINGS}`,
    });
    return response?.data;
  };

  const getSwapPriority = async () => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${SWAP_PRIORITY}`,
    });
    return response?.data;
  };

  const updateSwapPriority = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: `${SWAP_PRIORITY}`,
        data: data,
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const getPrivacySettings = async () => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${LEGAL_CONTENT}/privacy-policy`,
    });
    return response?.data;
  };

  const updateTermsAndConditionsSettings = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: `${LEGAL_CONTENT}`,
        data: data,
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const getTermsAndConditionsSettings = async () => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${LEGAL_CONTENT}/terms-and-conditions`,
    });
    return response?.data;
  };

  return {
    getQuickiPaySettings,
    updateQuickiPaySettings,
    getLinkSettings,
    getSwapPriority,
    updateSwapPriority,
    updateLinkSettings,
    getPrivacySettings,
    updatePrivacySettings,
    updateTermsAndConditionsSettings,
    getTermsAndConditionsSettings,
    getShowPagesList,
    updateShowPage,
  };
};
