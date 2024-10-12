import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { apiClient } from '@shared/utils/api/apiClient';
import { User } from '@shared/utils/types/user';
import { errorCodes } from '@shared/utils/constants/errorCodes';
import { httpStatusCodes } from '@shared/utils/constants/httpStatusCodes';
import { useGoals } from '@frontend/app/src/hooks/useGoals';
import { usePosts } from '@frontend/app/src/hooks/usePosts';
import { useToast } from '@frontend/app/src/components/organisms/Toast';
import { useFetchUser } from '@frontend/app/src/hooks/useFetchUser';

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { goals, isLoading: goalsLoading, error: goalsError } = useGoals();
  const { posts, isLoading: postsLoading, error: postsError } = usePosts();
  const { user, isLoading: userLoading, error: userError } = useFetchUser();
  const { showToast } = useToast();

  useEffect(() => {
    if (status === 'loading') {
      return;
    }

    if (!session) {
      router.push('/(auth)/login');
      return;
    }

    if (userError) {
      showToast({
        type: 'error',
        message: 'Error fetching user data. Please try again later.',
      });
      return;
    }

    if (goalsError) {
      showToast({
        type: 'error',
        message: 'Error fetching goals. Please try again later.',
      });
      return;
    }

    if (postsError) {
      showToast({
        type: 'error',
        message: 'Error fetching posts. Please try again later.',
      });
      return;
    }
  }, [status, session, userError, goalsError, postsError, showToast, router]);

  if (userLoading || goalsLoading || postsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-gray-300" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex flex-col w-full">
        <div className="p-4">
          <h1 className="text-3xl font-bold">Welcome, {user.name}!</h1>
        </div>
        <div className="flex flex-1 gap-4">
          <div className="w-1/2 p-4">
            <h2 className="text-2xl font-bold">Your Goals</h2>
            <ul className="mt-4">
              {goals.map((goal) => (
                <li key={goal.id} className="mb-2">
                  {/* Implement a component to display each goal with relevant information. */}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-1/2 p-4">
            <h2 className="text-2xl font-bold">Community Feed</h2>
            <ul className="mt-4">
              {posts.map((post) => (
                <li key={post.id} className="mb-2">
                  {/* Implement a component to display each post with relevant information. */}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg">Failed to fetch user data. Please try again later.</p>
    </div>
  );
}