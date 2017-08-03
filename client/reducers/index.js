import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import R from 'ramda';

import { SIGN_OUT } from '../actions';

const appReducer = combineReducers({
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT) {
    // clear all data when the user signs out
    state = R.pick(['api'], state); // eslint-disable-line
  }
  return appReducer(state, action);
};

export default rootReducer;
