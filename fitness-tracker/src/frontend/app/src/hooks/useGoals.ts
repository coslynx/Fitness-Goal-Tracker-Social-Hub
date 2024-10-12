import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { apiClient } from '@shared/utils/api/apiClient';
import { Goal } from '@shared/utils/types/goal';
import { errorCodes } from '@shared/utils/constants/errorCodes';
import { httpStatusCodes } from '@shared/utils/constants/httpStatusCodes';
import { useToast } from '@frontend/app/src/components/organisms/Toast';

interface UseGoalsProps {
  userId?: number;
}

export const useGoals = ({ userId }: UseGoalsProps = {}) => {
  const { data: session } = useSession();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchGoals = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get<Goal[]>(`/goals${userId ? `?userId=${userId}` : ''}`);

        if (response.status === httpStatusCodes.OK) {
          setGoals(response.data);
        } else {
          setError('Failed to fetch goals. Please try again later.');
          showToast({ type: 'error', message: 'Failed to fetch goals. Please try again later.' });
        }
      } catch (error: any) {
        if (error.response?.status === httpStatusCodes.UNAUTHORIZED) {
          showToast({
            type: 'error',
            message: 'Session expired. Please log in again.',
          });
          // Redirect to login page (handle this based on your routing implementation)
        } else {
          setError(
            'Failed to fetch goals. Please try again later.'
          );
          showToast({
            type: 'error',
            message: 'Failed to fetch goals. Please try again later.',
          });
        }
        console.error('Error fetching goals:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchGoals();
    }
  }, [session, userId, showToast]);

  return { goals, isLoading, error };
};