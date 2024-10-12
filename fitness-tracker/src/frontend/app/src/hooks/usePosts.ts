import { useState, useEffect } from 'react';
import { apiClient } from '@shared/utils/api/apiClient';
import { Post } from '@shared/utils/types/post';
import { errorCodes } from '@shared/utils/constants/errorCodes';
import { httpStatusCodes } from '@shared/utils/constants/httpStatusCodes';
import { useToast } from '@frontend/app/src/components/organisms/Toast';

interface UsePostsProps {
  userId?: number;
}

export const usePosts = ({ userId }: UsePostsProps = {}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get<Post[]>(`/posts${userId ? `?userId=${userId}` : ''}`);

        if (response.status === httpStatusCodes.OK) {
          setPosts(response.data);
        } else {
          setError('Failed to fetch posts. Please try again later.');
          showToast({ type: 'error', message: 'Failed to fetch posts. Please try again later.' });
        }
      } catch (error: any) {
        if (error.response?.status === httpStatusCodes.UNAUTHORIZED) {
          showToast({
            type: 'error',
            message: 'Session expired. Please log in again.',
          });
          // Redirect to login page (handle this based on your routing implementation)
        } else {
          setError('Failed to fetch posts. Please try again later.');
          showToast({
            type: 'error',
            message: 'Failed to fetch posts. Please try again later.',
          });
        }
        console.error('Error fetching posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [userId, showToast]);

  return { posts, isLoading, error };
};