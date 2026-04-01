import { ActionType } from './action';

function leaderboardsReducer(state = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_LEADERBOARDS:
      return action.payload.leaderboards;
    default:
      return state;
  }
}

export default leaderboardsReducer;
