import axios from 'axios';
import storage from '@/utils/storage';
import {SSCP_WEB_BASE_URL} from '@/pages/configWords/utils/constants';

let {userName, userId} = storage.getUserInfo();

axios.defaults.baseURL = SSCP_WEB_BASE_URL;
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.timeout = 60000;

axios.interceptors.request.use((config) => {
  config.data = {
    ...config.data,
    operatorName: userName,
    operatorId: userId
  };
  return config;
});

axios.interceptors.response.use((response) => {
  return response.data;
}, (err) => {
  return Promise.reject(err);
});

export default axios;
