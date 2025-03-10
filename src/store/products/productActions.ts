import { selectProductSlice, setProducts } from './productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT } from '../../utils/network/ApiEndpoints';

//API
import ApiRequest from '../../utils/network/ApiRequest';

export const useProductActions = () => {
  const dispatch = useDispatch();

  const { products } = useSelector(selectProductSlice);

  const getProducts = async (force: boolean = false, page: any = 1) => {
    if (products?.list?.length && !force) return;

    const response = await ApiRequest().request({
      method: 'GET',
      url: `${PRODUCT}?page=${page}`,
    });
    const _products = response?.data?.data;
    dispatch(setProducts(_products));
  };

  const getProductById = async (id: string | undefined) => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${PRODUCT}/${id}`,
    });
    return response?.data?.data;
  };

  const getProductVouchers = async (id: string | undefined, status: string, page: number) => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: `${PRODUCT}/vouchers/${id}?page=${page}`,
      params: { status },
    });
    return response?.data?.data;
  };

  const addProduct = async (data: any) => {
    return await ApiRequest()
      .request({
        method: 'POST',
        url: PRODUCT,
        data: data,
      })
      .then((response: any) => response.data)
      .catch((err: any) => err.data);
  };

  const updateProduct = async (id: string | undefined, data: any) => {
    return await ApiRequest()
      .request({
        method: 'PUT',
        url: `${PRODUCT}/${id}`,
        data: data,
      })
      .then((response: any) => response.data)
      .catch((err: any) => err.data);
  };

  return {
    getProducts,
    addProduct,
    updateProduct,
    getProductById,
    getProductVouchers,
  };
};
