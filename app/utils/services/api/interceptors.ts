import { AxiosInstance } from 'axios';

export const setupInterceptors = (client: AxiosInstance) => {
  client.interceptors.request.use(
    (config) => {
      // Modify request configuration (e.g., add headers)
      return config;
    },
    (error) => {
      // Handle request error
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response) => {
      // Modify response data
      return response;
    },
    (error) => {
      // Handle response error
      return Promise.reject(error);
    }
  );
};
