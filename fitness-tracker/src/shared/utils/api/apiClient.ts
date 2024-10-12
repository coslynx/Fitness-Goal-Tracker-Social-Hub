import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getAuthToken } from '@shared/utils/auth';

// Define an interface for the Axios instance with custom configuration
interface AxiosInstanceConfig extends AxiosRequestConfig {
  baseURL: string;
}

// Create a function to initialize the Axios instance
const createAxiosInstance = (config: AxiosInstanceConfig): AxiosInstance => {
  const instance = axios.create(config);

  // Add an interceptor for adding authentication headers to requests
  instance.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Add an interceptor for handling API errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle API errors
      // - Log the error (use a logging utility if available)
      // - Handle specific error codes (e.g., 401 Unauthorized, 403 Forbidden)
      // - Potentially throw a custom error object for the frontend to handle
      // - Consider retry logic or other error handling strategies based on the specific error
      // - Example:
      //   if (error.response?.status === 401) {
      //     // Handle unauthorized access, e.g., redirect to login
      //     // ...
      //   } else if (error.response?.status === 403) {
      //     // Handle forbidden access, e.g., display an error message
      //     // ...
      //   } else {
      //     // Handle other errors, e.g., display a generic error message
      //     // ...
      //   }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create a global Axios instance with default configuration
const apiClient: AxiosInstance = createAxiosInstance({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
});

// Export the Axios instance for use in other parts of the application
export { apiClient };