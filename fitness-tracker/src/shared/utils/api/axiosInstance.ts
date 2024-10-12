import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'; // Import axios (version 1.7.7) for making HTTP requests
import { getAuthToken } from '@shared/utils/auth'; // Import getAuthToken from shared utils (ensure this file is correctly implemented)

// Define an interface for the Axios instance with custom configuration
interface AxiosInstanceConfig extends AxiosRequestConfig {
  baseURL: string;
}

// Create a function to initialize the Axios instance
const createAxiosInstance = (config: AxiosInstanceConfig): AxiosInstance => {
  const instance = axios.create(config); // Create a new Axios instance with the provided configuration

  // Add an interceptor for adding authentication headers to requests
  instance.interceptors.request.use((config) => {
    const token = getAuthToken(); // Get the authentication token from shared utils
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header if it exists
    }
    return config; // Return the modified config object
  });

  // Add an interceptor for handling API errors
  instance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
      // Handle API errors
      //  - Log the error (use a logging utility if available)
      //  - Handle specific error codes (e.g., 401 Unauthorized, 403 Forbidden)
      //  - Potentially throw a custom error object for the frontend to handle
      //  - Consider retry logic or other error handling strategies based on the specific error
      //  - Example:
      //    if (error.response?.status === 401) {
      //      // Handle unauthorized access, e.g., redirect to login
      //      // ...
      //    } else if (error.response?.status === 403) {
      //      // Handle forbidden access, e.g., display an error message
      //      // ...
      //    } else {
      //      // Handle other errors, e.g., display a generic error message
      //      // ...
      //    }
      return Promise.reject(error); // Rethrow the error for the promise chain to handle
    }
  );

  return instance; // Return the Axios instance with configured interceptors
};

// Create a global Axios instance with default configuration
const axiosInstance = createAxiosInstance({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api', // Set the base URL for API requests (ensure this is configured correctly)
});

// Export the Axios instance for use in other parts of the application
export default axiosInstance;