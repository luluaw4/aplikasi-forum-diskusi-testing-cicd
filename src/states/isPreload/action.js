import api from '../../utils/api';
import { setAuthUser, unsetAuthUser } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreload(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    const accessToken = api.getAccessToken();

    if (!accessToken) {
      dispatch(unsetAuthUser());
      dispatch(setIsPreload(false));
      return;
    }

    try {
      const profile = await api.getOwnProfile();
      dispatch(setAuthUser(profile.user || profile));
    } catch (error) {
      api.putAccessToken('');
      dispatch(unsetAuthUser());
    } finally {
      dispatch(setIsPreload(false));
    }
  };
}

export { ActionType, setIsPreload, asyncPreloadProcess };
