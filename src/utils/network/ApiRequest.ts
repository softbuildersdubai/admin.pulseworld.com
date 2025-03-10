//AXIOS
import axios from 'axios';
//API
import { API_INSTANCE } from './ApiEndpoints';
// REDUX
import { store } from '../../store';
import { setLogout } from '../../store/user/userSlice';

const logout = () => {
  store.dispatch(setLogout());
  window.location.href = '/auth/login';
};

export default function ApiRequest() {
  const { user } = store.getState();

  const request = axios.create({
    baseURL: API_INSTANCE,
    headers: {
      Authorization: `Bearer ${user.accessToken ? user.accessToken : null}`,
      "ngrok-skip-browser-warning": "true"
    },
    responseType: 'json',
    socketPath: null,
  });

  request.interceptors.response.use(
    (response: any): any => response,
    (error: any) => {
      if (error.code === 'ERR_NETWORK') {
        return;
      }

      if (error.response.status === 401) {
        logout();
      }

      if (error.response.status === 403) {
        // logout()
      }

      return Promise.reject(error.response);
    }
  );

  return request;
}
