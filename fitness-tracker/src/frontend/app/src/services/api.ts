import { apiClient } from '@shared/utils/api/apiClient';
import { errorCodes } from '@shared/utils/constants/errorCodes';
import { httpStatusCodes } from '@shared/utils/constants/httpStatusCodes';
import { User, Goal, Post } from '@shared/utils/types';

// Define the interface for the API service
interface ApiService {
  // Authentication
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string) => Promise<User>;
  getUser: (userId?: number) => Promise<User | null>;
  updateUser: (userId: number, user: Partial<User>) => Promise<User>;
  // Goal Management
  createGoal: (goal: Goal) => Promise<Goal>;
  getGoals: (userId?: number) => Promise<Goal[]>;
  updateGoal: (goalId: number, goal: Partial<Goal>) => Promise<Goal>;
  deleteGoal: (goalId: number) => Promise<void>;
  // Post Management
  createPost: (post: Post) => Promise<Post>;
  getPosts: (userId?: number) => Promise<Post[]>;
  updatePost: (postId: number, post: Partial<Post>) => Promise<Post>;
  deletePost: (postId: number) => Promise<void>;
}

// Implement the API service
const apiService: ApiService = {
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
  async createGoal(goal) {
    try {
      const response = await apiClient.post('/goals', goal);
      if (response.status === httpStatusCodes.CREATED) {
        return response.data;
      } else {
        throw new Error(errorCodes.GOAL_CREATION_FAILED);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === errorCodes.GOAL_CREATION_FAILED) {
          throw new Error(errorCodes.GOAL_CREATION_FAILED);
        } else {
          throw new Error(errorCodes.UNEXPECTED_ERROR);
        }
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
  async getGoals(userId) {
    try {
      const response = await apiClient.get<Goal[]>(`/goals${userId ? `?userId=${userId}` : ''}`);
      if (response.status === httpStatusCodes.OK) {
        return response.data;
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
  async updateGoal(goalId, goal) {
    try {
      const response = await apiClient.put(`/goals/${goalId}`, goal);
      if (response.status === httpStatusCodes.OK) {
        return response.data;
      } else {
        throw new Error(errorCodes.GOAL_UPDATE_FAILED);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === errorCodes.GOAL_UPDATE_FAILED) {
          throw new Error(errorCodes.GOAL_UPDATE_FAILED);
        } else {
          throw new Error(errorCodes.UNEXPECTED_ERROR);
        }
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
  async deleteGoal(goalId) {
    try {
      const response = await apiClient.delete(`/goals/${goalId}`);
      if (response.status === httpStatusCodes.NO_CONTENT) {
        return;
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
  async createPost(post) {
    try {
      const response = await apiClient.post('/posts', post);
      if (response.status === httpStatusCodes.CREATED) {
        return response.data;
      } else {
        throw new Error(errorCodes.POST_CREATION_FAILED);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === errorCodes.POST_CREATION_FAILED) {
          throw new Error(errorCodes.POST_CREATION_FAILED);
        } else {
          throw new Error(errorCodes.UNEXPECTED_ERROR);
        }
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
  async getPosts(userId) {
    try {
      const response = await apiClient.get<Post[]>(`/posts${userId ? `?userId=${userId}` : ''}`);
      if (response.status === httpStatusCodes.OK) {
        return response.data;
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
  async updatePost(postId, post) {
    try {
      const response = await apiClient.put(`/posts/${postId}`, post);
      if (response.status === httpStatusCodes.OK) {
        return response.data;
      } else {
        throw new Error(errorCodes.POST_UPDATE_FAILED);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === errorCodes.POST_UPDATE_FAILED) {
          throw new Error(errorCodes.POST_UPDATE_FAILED);
        } else {
          throw new Error(errorCodes.UNEXPECTED_ERROR);
        }
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
  async deletePost(postId) {
    try {
      const response = await apiClient.delete(`/posts/${postId}`);
      if (response.status === httpStatusCodes.NO_CONTENT) {
        return;
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      } else {
        throw new Error(errorCodes.UNEXPECTED_ERROR);
      }
    }
  },
};

// Export the API service
export { apiService };