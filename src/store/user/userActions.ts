import { setLogin, setLogout, setUpdateUser } from './userSlice';
import { useDispatch } from 'react-redux';
import { GET_PROFILE, IMPERSONATE_USER, LOGIN } from '../../utils/network/ApiEndpoints';
import ApiRequest from '../../utils/network/ApiRequest';
//API
import { useNavigate } from 'react-router-dom';

export const useUserActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = async ({ email, password }: { email: string; password: string }) => {
    try {
      return await ApiRequest()
        .request({
          method: 'POST',
          url: LOGIN,
          data: {
            email,
            password,
          },
        })
        .then((response: any) => {
          const { data } = response;
          dispatch(
            setLogin({
              accessToken: data.data.token,
              user: data.data.user,
            })
          );
          return response;
        })
        .catch((error: any) => {
          return error;
        });
    } catch (error: any) {
      return error;
    }
  };

  const impersonateUser = async (id: string) => {
    const response = await ApiRequest().request({
      method: 'GET',
      url: IMPERSONATE_USER + `/${id}`,
    });

    return response.data;
  };

  const userLogout = async () => {
    dispatch(setLogout());
    navigate('/auth/login');
    window.location.reload();
  };

  const getUserProfiles = async () => {
    return await ApiRequest()
      .request({
        method: 'GET',
        url: GET_PROFILE,
      })
      .then((response: any) => {
        const profile = response.data.data;
        console.log({ profile });

        dispatch(setUpdateUser({ user: profile }));
        return response;
      })
      .catch((error: any) => error);
  };

  return {
    userLogin,
    userLogout,
    impersonateUser,
    getUserProfiles
  };
};
