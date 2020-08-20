import axios from 'axios';
import axiosRetry from 'axios-retry';

export const TIMEOUT = 20000;

const BETA_URL = 'https://charlycares-backend-dev.herokuapp.com/api/v1';
const DEV_URL = 'http://localhost:8888/api/v1';
const LIVE_URL = 'https://charlycares-backend.herokuapp.com/api/v1';

const devServer = axios.create({
  baseURL:
    process.env.REACT_APP_STAGE === 'testing' ||
    process.env.NODE_ENV === 'development'
      ? BETA_URL
      : LIVE_URL,
  timeout: TIMEOUT,
});

axiosRetry(devServer, {
  retries: 3,
  retryDelay: retryCount => {
    return retryCount * 1000;
  },
});

export default devServer;
