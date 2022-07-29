import axios, { AxiosRequestConfig } from 'axios';

const options: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_API_URL,
  responseType: 'json',
};

const axiosInstance = axios.create(options);

export default axiosInstance;
