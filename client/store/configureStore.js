import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
// import { persistState } from 'redux-devtools';
import persistState from 'redux-localstorage';
import { pick } from 'ramda';

import { apiErrorMiddleware, fileStorageMiddleware } from '../middleware';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  let composeEnhancers;
  let logger;

  if (process.env.NODE_ENV === 'development') {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    logger = createLogger({
      level: 'info',
      collapsed: true,
    });
  } else {
    composeEnhancers = compose;
  }

  const router = routerMiddleware(browserHistory);
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk,
        apiMiddleware,
        apiErrorMiddleware,
        fileStorageMiddleware(),
        router
      ),
      // the logged-in user is persisted in local-storage
      persistState(null, { slicer: () => pick(['user', 'fileStructureStates', 'localFiles', 'projects']) })
    )
  );

  if (process.env.NODE_ENV === 'development' && module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
