import api from '../../utils/api';
import { hideLoading, showLoading } from '../loading/action';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUser(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUser() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const token = await api.login({ email, password });
      const accessToken = token.accessToken || token.token || token;
      api.putAccessToken(accessToken);
      const profile = await api.getOwnProfile();
      dispatch(setAuthUser(profile.user || profile));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    api.putAccessToken('');
    dispatch(unsetAuthUser());
  };
}

function asyncRegisterUser({ name, email, password, navigate }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register({ name, email, password });
      alert('Registrasi berhasil, silakan login.');
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  setAuthUser,
  unsetAuthUser,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
};
