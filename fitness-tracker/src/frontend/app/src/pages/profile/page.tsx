import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { apiClient } from '@shared/utils/api/apiClient';
import { User } from '@shared/utils/types/user';
import { errorCodes } from '@shared/utils/constants/errorCodes';
import { httpStatusCodes } from '@shared/utils/constants/httpStatusCodes';
import { useToast } from '@frontend/app/src/components/organisms/Toast';
import { Typography } from '@shared/ui-components';
import { Button } from '@shared/ui-components';
import { Input } from '@shared/ui-components';
import { Card } from '@shared/ui-components';
import { useFetchUser } from '@frontend/app/src/hooks/useFetchUser';

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { showToast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { user: fetchedUser, isLoading: userLoading, error: userError } =
    useFetchUser();

  useEffect(() => {
    if (userLoading) {
      return;
    }

    if (userError) {
      showToast({
        type: 'error',
        message: 'Error fetching user data. Please try again later.',
      });
      return;
    }

    if (fetchedUser) {
      setUser(fetchedUser);
      setIsLoading(false);
    }
  }, [userLoading, userError, fetchedUser, showToast]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(user?.name || '');
    setEmail(user?.email || '');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await apiClient.put('/users', {
        name,
        email,
      });

      if (response.status === httpStatusCodes.OK) {
        setUser(response.data);
        setIsEditing(false);
        showToast({
          type: 'success',
          message: 'Profile updated successfully!',
        });
      } else {
        setError('Failed to update profile. Please try again later.');
        showToast({
          type: 'error',
          message: 'Failed to update profile. Please try again later.',
        });
      }
    } catch (error: any) {
      if (error.response?.status === httpStatusCodes.UNAUTHORIZED) {
        showToast({
          type: 'error',
          message: 'Session expired. Please log in again.',
        });
        router.push('/(auth)/login');
      } else {
        setError(
          'Failed to update profile. Please try again later.'
        );
        showToast({
          type: 'error',
          message: 'Failed to update profile. Please try again later.',
        });
      }
      console.error('Error updating user profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-gray-300" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h2" align="center">
        Your Profile
      </Typography>

      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}

      {user && (
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Typography variant="h3">{user.name}</Typography>

            {!isEditing && (
              <Button variant="primary" onClick={handleEditClick}>
                Edit Profile
              </Button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Typography variant="label">Email:</Typography>
            <Typography variant="body">
              {isEditing ? (
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                email
              )}
            </Typography>
          </div>

          {isEditing && (
            <div className="flex gap-2">
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Save Changes
              </Button>
              <Button variant="secondary" onClick={handleCancelClick}>
                Cancel
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}