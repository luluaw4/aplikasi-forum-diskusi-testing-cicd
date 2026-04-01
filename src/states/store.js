import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import threadDetailReducer from './threadDetail/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import loadingReducer from './loading/reducer';
import selectedCategoryReducer from './selectedCategory/reducer';

const rootReducer = combineReducers({
  authUser: authUserReducer,
  isPreload: isPreloadReducer,
  threads: threadsReducer,
  threadDetail: threadDetailReducer,
  leaderboards: leaderboardsReducer,
  loading: loadingReducer,
  selectedCategory: selectedCategoryReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
