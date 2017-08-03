import { signOut } from '../actions';
import R from 'ramda';
import { replace } from 'react-router-redux';

export * from './fileStorageMiddleware';

export const apiErrorMiddleware = store => next => (action) => {
  if (
    /FAILURE_.*/.test(action.type) &&
    action.payload.name === 'ApiError' &&
    action.payload.status === 401
  ) {
    store.dispatch(signOut());
  }
  return next(action);
};
