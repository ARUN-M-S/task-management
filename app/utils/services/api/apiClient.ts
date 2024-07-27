import axios from 'axios'
import { setupInterceptors } from './interceptors';



const apiClient = axios.create({
    baseURL: process.env.API_URL, // Replace with your API base URL
    timeout: 10000, // Optional: set a timeout
  });


setupInterceptors(apiClient);

export default apiClient;
  