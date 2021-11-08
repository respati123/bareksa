import axios, { AxiosRequestConfig } from 'axios';

let baseConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 25000,
};

const BaseApi = (token: string) => {
  baseConfig = {
    ...baseConfig,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const axiosInstances = axios.create(baseConfig);

  axiosInstances.interceptors.response.use((response) => {
    return response;
  });

  axiosInstances.interceptors.request.use((request) => {
    return request;
  });

  return axiosInstances;
};

export default BaseApi;
