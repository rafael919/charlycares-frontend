import { injectGlobal } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';
import React from 'react';
import ReactDOM from 'react-dom';

// import { onAppUpdate } from './ui/actions';
import './themes/semantic/dist/semantic.min.css';
import 'node-snackbar/dist/snackbar.min.css';
import App from './features/App';
import configureStore from './store';
import globalCSS from './themes/globalCSS';
import registerServiceWorker from './registerServiceWorker';
import routeTransitions from './themes/routeTransitions';

injectGlobal`
  ${globalCSS}
  ${routeTransitions}
`;

// if (process.env.NODE_ENV !== 'production') {
//   const { registerObserver } = require('react-perf-devtool');

//   registerObserver();
// }

// const onUpdate = () => {
//   store.dispatch(onAppUpdate());
// };

// localStorage.clear();
if (
  process.env.NODE_ENV === 'production' &&
  process.env.REACT_APP_STAGE !== 'testing'
) {
  Sentry.init({
    dsn: 'https://25bb7d9271744f718b1a66f102ee8342@sentry.io/1398212',
  });
}

const createdStore = configureStore();
const { store, persistor } = createdStore;

const root = document && document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  root
);

registerServiceWorker();
