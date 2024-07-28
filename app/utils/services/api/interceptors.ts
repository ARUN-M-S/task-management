import { AxiosInstance } from 'axios';

export const setupInterceptors = (client: AxiosInstance) => {
  client.interceptors.request.use(
    (config) => {
        console.log(config,"config");
     let tokens = localStorage.getItem('token')
        config.headers['authorization'] = tokens
        
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
       if(error.response?.status ==401){
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.setItem('token', 'null');
  
  
        // Redirect to the dashboard
      window.location.href='/sign-in'
       }
        
      // Handle response error
      return Promise.reject(error);
    }
  );
};
