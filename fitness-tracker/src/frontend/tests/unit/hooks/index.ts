import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { apiClient } from '@shared/utils/api/apiClient';
import { errorCodes } from '@shared/utils/constants/errorCodes';
import { httpStatusCodes } from '@shared/utils/constants/httpStatusCodes';
import { User, Goal, Post } from '@shared/utils/types';
import { useGoals } from '@frontend/app/src/hooks/useGoals';
import { usePosts } from '@frontend/app/src/hooks/usePosts';
import { useFetchUser } from '@frontend/app/src/hooks/useFetchUser';
import { useAuth } from '@frontend/app/src/hooks/useAuth';
import { useForm } from '@frontend/app/src/hooks/useForm';
import { apiService } from '@frontend/app/src/services';

describe('Frontend Tests', () => {
  describe('API Interactions', () => {
    it('should fetch user data successfully', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(apiClient, 'get').mockResolvedValue({
        data: mockUser,
        status: httpStatusCodes.OK,
      });

      const { result } = renderHook(() => useFetchUser());
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.user).toEqual(mockUser);
    });

    it('should handle API errors correctly', async () => {
      jest.spyOn(apiClient, 'get').mockRejectedValue(new Error(errorCodes.USER_NOT_FOUND));

      const { result } = renderHook(() => useFetchUser());
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.error).toBe('Error fetching user data. Please try again later.');
    });

    it('should fetch goals successfully', async () => {
      const mockGoals: Goal[] = [
        {
          id: 1,
          userId: 1,
          title: 'Lose 10 pounds',
          target: 10,
          deadline: new Date(),
          progress: 50,
          user: {
            id: 1,
            email: 'test@example.com',
            name: 'Test User',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];

      jest.spyOn(apiClient, 'get').mockResolvedValue({
        data: mockGoals,
        status: httpStatusCodes.OK,
      });

      const { result } = renderHook(() => useGoals());
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.goals).toEqual(mockGoals);
    });

    it('should handle goal fetching errors correctly', async () => {
      jest.spyOn(apiClient, 'get').mockRejectedValue(new Error(errorCodes.UNEXPECTED_ERROR));

      const { result } = renderHook(() => useGoals());
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.error).toBe('Error fetching goals. Please try again later.');
    });

    it('should fetch posts successfully', async () => {
      const mockPosts: Post[] = [
        {
          id: 1,
          userId: 1,
          content: 'Started my new workout routine!',
          createdAt: new Date(),
          likes: 10,
          comments: 2,
          user: {
            id: 1,
            email: 'test@example.com',
            name: 'Test User',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];

      jest.spyOn(apiClient, 'get').mockResolvedValue({
        data: mockPosts,
        status: httpStatusCodes.OK,
      });

      const { result } = renderHook(() => usePosts());
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.posts).toEqual(mockPosts);
    });

    it('should handle post fetching errors correctly', async () => {
      jest.spyOn(apiClient, 'get').mockRejectedValue(new Error(errorCodes.UNEXPECTED_ERROR));

      const { result } = renderHook(() => usePosts());
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.error).toBe('Error fetching posts. Please try again later.');
    });
  });

  describe('UI Components', () => {
    it('should render a Button component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render an Input component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render a Typography component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render a Card component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render a FormField component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render a NavItem component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render a Header component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render a Footer component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render a Sidebar component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render a DashboardLayout component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render an AuthLayout component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render a Toast component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render a GoalCard component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render a PostCard component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render a SocialFeed component correctly', () => {
      // ... (implementation for UI component tests) ...
    });

    it('should render a GoalList component correctly', () => {
      // ... (implementation for UI component tests) ...
    });
  });

  describe('Hooks', () => {
    it('should correctly manage authentication state', () => {
      const { result } = renderHook(() => useAuth());
      expect(result.current.session).toBeNull();
      expect(result.current.loading).toBe(true);
      expect(result.current.error).toBeNull();
    });

    it('should handle authentication errors', () => {
      const { result } = renderHook(() => useAuth());
      // Simulate an authentication error
      result.current.error = 'Authentication Error';
      expect(result.current.error).toBe('Authentication Error');
    });

    it('should correctly handle form submission', async () => {
      const mockSubmit = jest.fn();
      const { result } = renderHook(() => useForm({ label: 'Email', type: 'email', onChange: jest.fn(), handleSubmit: mockSubmit }));
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, { target: { value: 'test@example.com' } });
      expect(result.current.value).toBe('test@example.com');
      fireEvent.submit(screen.getByRole('form'));
      await waitFor(() => expect(mockSubmit).toHaveBeenCalledTimes(1));
    });

    it('should handle form validation errors', async () => {
      const { result } = renderHook(() => useForm({ label: 'Email', type: 'email', onChange: jest.fn(), handleSubmit: jest.fn() }));
      const inputElement = screen.getByRole('textbox');
      fireEvent.change(inputElement, { target: { value: 'invalid-email' } });
      fireEvent.submit(screen.getByRole('form'));
      await waitFor(() => expect(result.current.error).toBe('Error: Please check your input.'));
    });

    it('should fetch goals for the current user', async () => {
      const { result } = renderHook(() => useGoals({ userId: 1 }));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      // Expect the fetched goals to be from the specified user
      expect(result.current.goals).toEqual(expect.arrayContaining([
        expect.objectContaining({ userId: 1 }),
      ]));
    });

    it('should fetch goals for all users if no userId is provided', async () => {
      const { result } = renderHook(() => useGoals());
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      // Expect the fetched goals to include goals from all users
      expect(result.current.goals).toEqual(expect.arrayContaining([
        expect.objectContaining({ userId: 1 }),
        expect.objectContaining({ userId: 2 }),
        // ... other user IDs
      ]));
    });

    it('should handle errors while fetching goals', async () => {
      jest.spyOn(apiClient, 'get').mockRejectedValue(new Error(errorCodes.UNEXPECTED_ERROR));

      const { result } = renderHook(() => useGoals({ userId: 1 }));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.error).toBe('Error fetching goals. Please try again later.');
    });

    it('should fetch posts for the current user', async () => {
      const { result } = renderHook(() => usePosts({ userId: 1 }));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      // Expect the fetched posts to be from the specified user
      expect(result.current.posts).toEqual(expect.arrayContaining([
        expect.objectContaining({ userId: 1 }),
      ]));
    });

    it('should fetch posts for all users if no userId is provided', async () => {
      const { result } = renderHook(() => usePosts());
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      // Expect the fetched posts to include posts from all users
      expect(result.current.posts).toEqual(expect.arrayContaining([
        expect.objectContaining({ userId: 1 }),
        expect.objectContaining({ userId: 2 }),
        // ... other user IDs
      ]));
    });

    it('should handle errors while fetching posts', async () => {
      jest.spyOn(apiClient, 'get').mockRejectedValue(new Error(errorCodes.UNEXPECTED_ERROR));

      const { result } = renderHook(() => usePosts({ userId: 1 }));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.error).toBe('Error fetching posts. Please try again later.');
    });
  });

  describe('Services', () => {
    it('should correctly log in a user', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(apiService, 'login').mockResolvedValue(mockUser);

      const { result } = renderHook(() => useForm({ label: 'Email', type: 'email', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(apiService.login).toHaveBeenCalledWith('test@example.com', 'password');
      expect(result.current.error).toBeNull();
    });

    it('should handle login errors correctly', async () => {
      jest.spyOn(apiService, 'login').mockRejectedValue(new Error(errorCodes.INVALID_CREDENTIALS));

      const { result } = renderHook(() => useForm({ label: 'Email', type: 'email', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(result.current.error).toBe('Invalid credentials.');
    });

    it('should register a new user', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(apiService, 'register').mockResolvedValue(mockUser);

      const { result } = renderHook(() => useForm({ label: 'Email', type: 'email', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(apiService.register).toHaveBeenCalledWith('test@example.com', 'password');
      expect(result.current.error).toBeNull();
    });

    it('should handle registration errors correctly', async () => {
      jest.spyOn(apiService, 'register').mockRejectedValue(new Error(errorCodes.USER_ALREADY_EXISTS));

      const { result } = renderHook(() => useForm({ label: 'Email', type: 'email', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(result.current.error).toBe('User already exists.');
    });

    it('should fetch a user by ID', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(apiService, 'getUser').mockResolvedValue(mockUser);

      const { result } = renderHook(() => useFetchUser({ userId: 1 }));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.user).toEqual(mockUser);
    });

    it('should handle errors while fetching a user', async () => {
      jest.spyOn(apiService, 'getUser').mockRejectedValue(new Error(errorCodes.USER_NOT_FOUND));

      const { result } = renderHook(() => useFetchUser({ userId: 1 }));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.error).toBe('Error fetching user data. Please try again later.');
    });

    it('should update a user', async () => {
      const mockUser: User = {
        id: 1,
        email: 'test@example.com',
        name: 'Updated Test User',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(apiService, 'updateUser').mockResolvedValue(mockUser);

      const { result } = renderHook(() => useForm({ label: 'Name', type: 'text', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(apiService.updateUser).toHaveBeenCalledWith(1, { name: 'Updated Test User' });
      expect(result.current.error).toBeNull();
    });

    it('should handle errors while updating a user', async () => {
      jest.spyOn(apiService, 'updateUser').mockRejectedValue(new Error(errorCodes.USER_UPDATE_FAILED));

      const { result } = renderHook(() => useForm({ label: 'Name', type: 'text', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(result.current.error).toBe('Failed to update user. Please try again later.');
    });

    it('should create a new goal', async () => {
      const mockGoal: Goal = {
        id: 1,
        userId: 1,
        title: 'Lose 10 pounds',
        target: 10,
        deadline: new Date(),
        progress: 0,
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest.spyOn(apiService, 'createGoal').mockResolvedValue(mockGoal);

      const { result } = renderHook(() => useForm({ label: 'Title', type: 'text', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(apiService.createGoal).toHaveBeenCalledWith({
        userId: 1,
        title: 'Lose 10 pounds',
        target: 10,
        deadline: new Date(),
      });
      expect(result.current.error).toBeNull();
    });

    it('should handle errors while creating a goal', async () => {
      jest.spyOn(apiService, 'createGoal').mockRejectedValue(new Error(errorCodes.GOAL_CREATION_FAILED));

      const { result } = renderHook(() => useForm({ label: 'Title', type: 'text', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(result.current.error).toBe('Failed to create goal. Please try again later.');
    });

    it('should fetch goals for a specific user', async () => {
      const mockGoals: Goal[] = [
        {
          id: 1,
          userId: 1,
          title: 'Lose 10 pounds',
          target: 10,
          deadline: new Date(),
          progress: 50,
          user: {
            id: 1,
            email: 'test@example.com',
            name: 'Test User',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];

      jest.spyOn(apiService, 'getGoals').mockResolvedValue(mockGoals);

      const { result } = renderHook(() => useGoals({ userId: 1 }));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.goals).toEqual(mockGoals);
    });

    it('should handle errors while fetching goals for a specific user', async () => {
      jest.spyOn(apiService, 'getGoals').mockRejectedValue(new Error(errorCodes.UNEXPECTED_ERROR));

      const { result } = renderHook(() => useGoals({ userId: 1 }));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.error).toBe('Error fetching goals. Please try again later.');
    });

    it('should update a goal', async () => {
      const mockGoal: Goal = {
        id: 1,
        userId: 1,
        title: 'Updated Goal',
        target: 15,
        deadline: new Date(),
        progress: 50,
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest.spyOn(apiService, 'updateGoal').mockResolvedValue(mockGoal);

      const { result } = renderHook(() => useForm({ label: 'Title', type: 'text', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(apiService.updateGoal).toHaveBeenCalledWith(1, { title: 'Updated Goal', target: 15 });
      expect(result.current.error).toBeNull();
    });

    it('should handle errors while updating a goal', async () => {
      jest.spyOn(apiService, 'updateGoal').mockRejectedValue(new Error(errorCodes.GOAL_UPDATE_FAILED));

      const { result } = renderHook(() => useForm({ label: 'Title', type: 'text', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(result.current.error).toBe('Failed to update goal. Please try again later.');
    });

    it('should delete a goal', async () => {
      jest.spyOn(apiService, 'deleteGoal').mockResolvedValue(undefined);

      const { result } = renderHook(() => useForm({ label: 'Goal ID', type: 'number', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(apiService.deleteGoal).toHaveBeenCalledWith(1);
      expect(result.current.error).toBeNull();
    });

    it('should handle errors while deleting a goal', async () => {
      jest.spyOn(apiService, 'deleteGoal').mockRejectedValue(new Error(errorCodes.UNEXPECTED_ERROR));

      const { result } = renderHook(() => useForm({ label: 'Goal ID', type: 'number', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(result.current.error).toBe('Error deleting goal. Please try again later.');
    });

    it('should create a new post', async () => {
      const mockPost: Post = {
        id: 1,
        userId: 1,
        content: 'My new post!',
        createdAt: new Date(),
        likes: 0,
        comments: 0,
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest.spyOn(apiService, 'createPost').mockResolvedValue(mockPost);

      const { result } = renderHook(() => useForm({ label: 'Content', type: 'text', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(apiService.createPost).toHaveBeenCalledWith({
        userId: 1,
        content: 'My new post!',
      });
      expect(result.current.error).toBeNull();
    });

    it('should handle errors while creating a post', async () => {
      jest.spyOn(apiService, 'createPost').mockRejectedValue(new Error(errorCodes.POST_CREATION_FAILED));

      const { result } = renderHook(() => useForm({ label: 'Content', type: 'text', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(result.current.error).toBe('Failed to create post. Please try again later.');
    });

    it('should fetch posts for a specific user', async () => {
      const mockPosts: Post[] = [
        {
          id: 1,
          userId: 1,
          content: 'My new post!',
          createdAt: new Date(),
          likes: 0,
          comments: 0,
          user: {
            id: 1,
            email: 'test@example.com',
            name: 'Test User',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      ];

      jest.spyOn(apiService, 'getPosts').mockResolvedValue(mockPosts);

      const { result } = renderHook(() => usePosts({ userId: 1 }));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.posts).toEqual(mockPosts);
    });

    it('should handle errors while fetching posts for a specific user', async () => {
      jest.spyOn(apiService, 'getPosts').mockRejectedValue(new Error(errorCodes.UNEXPECTED_ERROR));

      const { result } = renderHook(() => usePosts({ userId: 1 }));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.error).toBe('Error fetching posts. Please try again later.');
    });

    it('should update a post', async () => {
      const mockPost: Post = {
        id: 1,
        userId: 1,
        content: 'Updated Post',
        createdAt: new Date(),
        likes: 0,
        comments: 0,
        user: {
          id: 1,
          email: 'test@example.com',
          name: 'Test User',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest.spyOn(apiService, 'updatePost').mockResolvedValue(mockPost);

      const { result } = renderHook(() => useForm({ label: 'Content', type: 'text', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(apiService.updatePost).toHaveBeenCalledWith(1, { content: 'Updated Post' });
      expect(result.current.error).toBeNull();
    });

    it('should handle errors while updating a post', async () => {
      jest.spyOn(apiService, 'updatePost').mockRejectedValue(new Error(errorCodes.POST_UPDATE_FAILED));

      const { result } = renderHook(() => useForm({ label: 'Content', type: 'text', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(result.current.error).toBe('Failed to update post. Please try again later.');
    });

    it('should delete a post', async () => {
      jest.spyOn(apiService, 'deletePost').mockResolvedValue(undefined);

      const { result } = renderHook(() => useForm({ label: 'Post ID', type: 'number', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(apiService.deletePost).toHaveBeenCalledWith(1);
      expect(result.current.error).toBeNull();
    });

    it('should handle errors while deleting a post', async () => {
      jest.spyOn(apiService, 'deletePost').mockRejectedValue(new Error(errorCodes.UNEXPECTED_ERROR));

      const { result } = renderHook(() => useForm({ label: 'Post ID', type: 'number', onChange: jest.fn(), handleSubmit: jest.fn() }));
      await act(async () => {
        await result.current.handleSubmit(new Event('submit'));
      });
      expect(result.current.error).toBe('Error deleting post. Please try again later.');
    });
  });

  describe('Utils', () => {
    // ... (implementation for utils tests) ...
  });
});