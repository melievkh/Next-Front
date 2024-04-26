import { config } from '@/config/app.config';
import { storage } from '@/config/storage.config';
import { notification } from 'antd';
import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: config.BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem(storage.ACCESS_TOKEN);

    if (config.url && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    notification.error({
      message: error.response.data.message,
    });
    return Promise.reject(error);
  },
);

export default axiosInstance;
