import { selectProviderSlice, setProviders } from './providerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PROVIDER } from '../../utils/network/ApiEndpoints';

//API
import ApiRequest from '../../utils/network/ApiRequest';

export const useProvidersActions = () => {
  const dispatch = useDispatch();

  const { providers } = useSelector(selectProviderSlice);

  const getProviders = async (force: boolean = false, page: any = 1) => {
    if (providers?.list?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${PROVIDER}?page=${page}`,
    });
    // await getProducts(true)
    const _providers = response?.data?.data;

    dispatch(setProviders(_providers));
  };

  const getProviderById = async (id: string) => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: `${PROVIDER}/${id}`,
      })
      .then((response: any) => {
        return response.data;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const addProvider = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: PROVIDER,
        data: data,
      })
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  const updateProvider = async (id: string | undefined, data: any) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: `${PROVIDER}/${id}`,
        data: data,
      })
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => {
        return err.data;
      });
  };

  return {
    getProviders,
    addProvider,
    updateProvider,
    getProviderById,
  };
};
