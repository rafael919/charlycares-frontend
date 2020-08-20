import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga, rootReducer } from './rootReducer';
import { persistStore } from 'redux-persist';
import { authorizationMiddleware } from 'Utils/middleware';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers: Function =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(authorizationMiddleware, sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
