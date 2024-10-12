import { apiClient } from '@shared/utils/api/apiClient';
import { errorCodes } from '@shared/utils/constants/errorCodes';
import { httpStatusCodes } from '@shared/utils/constants/httpStatusCodes';
import { User } from '@shared/utils/types/user';

// Define the interface for the Auth service
interface AuthService {
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string) => Promise<User>;
  getUser: (userId?: number) => Promise<User | null>;
  updateUser: (userId: number, user: Partial<User>) => Promise<User>;
}

// Implement the Auth service
const authService: AuthService = {
  async login(email, password) {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.status === httpStatusCodes.OK) {
        return response.data;
      } else {
        throw new Error(errorCodes.INVALID_CREDENTIALS);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === errorCodes.INVALID_CREDENTIALS) {
          throw new Error(errorCodes.INVALID_CREDENTIALS);
        } else {
          throw new Error(errorCodes.UNEXPECTED_ERROR);
        }
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
  async register(email, password) {
    try {
      const response = await apiClient.post('/auth/register', { email, password });
      if (response.status === httpStatusCodes.CREATED) {
        return response.data;
      } else {
        throw new Error(errorCodes.USER_ALREADY_EXISTS);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === errorCodes.USER_ALREADY_EXISTS) {
          throw new Error(errorCodes.USER_ALREADY_EXISTS);
        } else {
          throw new Error(errorCodes.UNEXPECTED_ERROR);
        }
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
  async getUser(userId) {
    try {
      const response = await apiClient.get<User>(`/users${userId ? `/${userId}` : ''}`);
      if (response.status === httpStatusCodes.OK) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === errorCodes.USER_NOT_FOUND) {
          return null;
        } else {
          throw new Error(errorCodes.UNEXPECTED_ERROR);
        }
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
  async updateUser(userId, user) {
    try {
      const response = await apiClient.put(`/users/${userId}`, user);
      if (response.status === httpStatusCodes.OK) {
        return response.data;
      } else {
        throw new Error(errorCodes.USER_UPDATE_FAILED);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === errorCodes.USER_UPDATE_FAILED) {
          throw new Error(errorCodes.USER_UPDATE_FAILED);
        } else {
          throw new Error(errorCodes.UNEXPECTED_ERROR);
        }
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
};

// Export the Auth service
export { authService };