// REDUX
import { useDispatch, useSelector } from 'react-redux';

// UTILS
import {
  ADMIN_DASHBOARD,
  DASHBOARD_FEE_COLLECTED_OVERVIEW,
  DASHBOARD_ORDER_OVERVIEW,
  DASHBOARD_PRODUCTS_OVERVIEW,
  DASHBOARD_TOKEN_OVERVIEW,
  DASHBOARD_USER_OVERVIEW,
} from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';
import {
  setUsersOverview,
  setProductsOverview,
  setAllTokensBalance,
  setFeeCollected,
  setOrdersOverview,
  selectDashboard,
} from './dashboardSlice';

export const useDashboardActions = () => {
  const dispatch = useDispatch();
  const { allTokensBalance, feeCollected, ordersOverview, productsOverview, usersOverview } =
    useSelector(selectDashboard);

  // Recent Devices Section Notifications Api
  const getDashboardStats = async () => {
    if (!usersOverview) {
      const userOverview = await ApiRequest().request({
        method: 'GET',
        url: `${ADMIN_DASHBOARD}`,
      });
      dispatch(setUsersOverview(userOverview.data.data));
    }

    if (!allTokensBalance) {
      const tokenOverview = await ApiRequest().request({
        method: 'GET',
        url: `${DASHBOARD_TOKEN_OVERVIEW}`,
      });
      dispatch(setAllTokensBalance(tokenOverview.data.data));
    }

    if (!feeCollected) {
      const feeCollectedOverview = await ApiRequest().request({
        method: 'GET',
        url: `${DASHBOARD_FEE_COLLECTED_OVERVIEW}`,
      });
      dispatch(setFeeCollected(feeCollectedOverview.data.data));
    }

    if (!ordersOverview) {
      const ordersOverview = await ApiRequest().request({
        method: 'GET',
        url: `${DASHBOARD_ORDER_OVERVIEW}`,
      });
      dispatch(setOrdersOverview(ordersOverview.data.data));
    }

    if (!productsOverview) {
      const productsOverview = await ApiRequest().request({
        method: 'GET',
        url: `${DASHBOARD_PRODUCTS_OVERVIEW}`,
      });
      dispatch(setProductsOverview(productsOverview.data.data));
    }
  };
  return {
    getDashboardStats,
  };
};
