import { apiClient } from '@shared/utils/api/apiClient';
import { errorCodes } from '@shared/utils/constants/errorCodes';
import { httpStatusCodes } from '@shared/utils/constants/httpStatusCodes';
import { Post } from '@shared/utils/types/post';

// Define the interface for the Post service
interface PostService {
  createPost: (post: Post) => Promise<Post>;
  getPosts: (userId?: number) => Promise<Post[]>;
  updatePost: (postId: number, post: Partial<Post>) => Promise<Post>;
  deletePost: (postId: number) => Promise<void>;
}

// Implement the Post service
const postService: PostService = {
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

// Export the Post service
export { postService };