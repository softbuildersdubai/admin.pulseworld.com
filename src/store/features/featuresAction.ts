// REDUX
import { setFeaturesList, selectFeatures } from './featuresSlice';
import { useDispatch, useSelector } from 'react-redux';

// UTILS
import { FEATURE } from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';

export const useFeaturesActions = () => {
  const dispatch = useDispatch();

  const { featuresList } = useSelector(selectFeatures);

  // Recent Devices Section Notifications Api
  const getFeaturesList = async (force: boolean = false) => {
    if (featuresList?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${FEATURE}`,
    });
    const _featuresList = response?.data?.data;
    dispatch(setFeaturesList(_featuresList));
  };

  const updateFeature = async (id: string, data: any) => {
    const response = await ApiRequest().request({
      method: 'PUT',
      url: `${FEATURE}/${id}`,
      data,
    });
    return response?.data?.data;
  };

  return {
    getFeaturesList,
    updateFeature,
  };
};
