import { ActionType } from './action';

function selectedCategoryReducer(state = 'all', action = {}) {
  switch (action.type) {
    case ActionType.SET_SELECTED_CATEGORY:
      return action.payload.category;
    default:
      return state;
  }
}

export default selectedCategoryReducer;
