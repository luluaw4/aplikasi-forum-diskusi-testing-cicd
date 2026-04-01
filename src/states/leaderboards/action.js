import api from '../../utils/api';
import { hideLoading, showLoading } from '../loading/action';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboards(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const data = await api.getLeaderboards();
      dispatch(receiveLeaderboards(data.leaderboards || data));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { ActionType, receiveLeaderboards, asyncReceiveLeaderboards };
