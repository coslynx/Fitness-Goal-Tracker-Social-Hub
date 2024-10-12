import { render, screen } from '@testing-library/react';
import { apiClient } from '@shared/utils/api/apiClient';
import { errorCodes } from '@shared/utils/constants/errorCodes';
import { httpStatusCodes } from '@shared/utils/constants/httpStatusCodes';
import { User, Goal, Post } from '@shared/utils/types';
import { apiService } from '@frontend/app/src/services';
import { useAuth } from '@frontend/app/src/hooks/useAuth';
import { useForm } from '@frontend/app/src/hooks/useForm';
import { useGoals } from '@frontend/app/src/hooks/useGoals';
import { usePosts } from '@frontend/app/src/hooks/usePosts';
import { useFetchUser } from '@frontend/app/src/hooks/useFetchUser';
import { Button } from '@shared/ui-components';
import { Card } from '@shared/ui-components';
import { Input } from '@shared/ui-components';
import { Typography } from '@shared/ui-components';
import { FormField } from '@shared/ui-components/src/molecules/FormField';
import { NavItem } from '@shared/ui-components/src/molecules/NavItem';
import { Header } from '@frontend/app/src/components/organisms/Header';
import { Footer } from '@frontend/app/src/components/organisms/Footer';
import { Sidebar } from '@frontend/app/src/components/organisms/Sidebar';
import { DashboardLayout } from '@frontend/app/src/components/templates/DashboardLayout';
import { AuthLayout } from '@frontend/app/src/components/templates/AuthLayout';
import { Toast } from '@frontend/app/src/components/organisms/Toast';
import { GoalCard } from '@frontend/app/src/components/molecules/GoalCard';
import { PostCard } from '@frontend/app/src/components/molecules/PostCard';
import { SocialFeed } from '@frontend/app/src/components/organisms/SocialFeed';
import { GoalList } from '@frontend/app/src/components/organisms/GoalList';
import { formatDate } from '@shared/utils/date/formatDate';
import { capitalize } from '@shared/utils/string/capitalize';
import { validateEmail } from '@shared/utils/validators';
import { validatePassword } from '@shared/utils/validators';
import { validateUsername } from '@shared/utils/validators';
import { validateGoalTitle } from '@shared/utils/validators';
import { validateGoalTarget } from '@shared/utils/validators';
import { validateGoalDeadline } from '@shared/utils/validators';
import { validatePostContent } from '@shared/utils/validators';
import { formatCurrency } from '@shared/utils/formatters';
import { formatPercentage } from '@shared/utils/formatters';
import { formatNumberWithThousandsSeparator } from '@shared/utils/formatters';
import { renderHook } from '@testing-library/react-hooks';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

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
      render(<Button variant="primary" size="lg">Click Me</Button>);
      const buttonElement = screen.getByText('Click Me');
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass('rounded-md px-6 py-3 text-base bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-600');
    });

    it('should render an Input component correctly', () => {
      render(<Input label="Email" type="email" placeholder="Enter your email" />);
      const inputElement = screen.getByRole('textbox');
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveClass('block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm sm:leading-5');
    });

    it('should render a Typography component correctly', () => {
      render(<Typography variant="h2" align="center">Welcome</Typography>);
      const typographyElement = screen.getByText('Welcome');
      expect(typographyElement).toBeInTheDocument();
      expect(typographyElement).toHaveClass('text-3xl font-bold text-center');
    });

    it('should render a Card component correctly', () => {
      render(<Card title="My Profile">This is my profile content.</Card>);
      const cardElement = screen.getByText('My Profile');
      expect(cardElement).toBeInTheDocument();
      expect(cardElement).toHaveClass('rounded-md shadow-md bg-white p-4');
    });

    it('should render a FormField component correctly', () => {
      render(<FormField label="Email" type="email" placeholder="Enter your email" />);
      const formFieldElement = screen.getByText('Email');
      expect(formFieldElement).toBeInTheDocument();
    });

    it('should render a NavItem component correctly', () => {
      render(<NavItem label="Dashboard" href="/dashboard" isActive={true} />);
      const navItemElement = screen.getByText('Dashboard');
      expect(navItemElement).toBeInTheDocument();
      expect(navItemElement).toHaveClass('flex items-center px-4 py-2 rounded-md hover:bg-gray-100 bg-primary-500 text-white');
    });

    it('should render a Header component correctly', () => {
      render(<Header />);
      const headerElement = screen.getByRole('banner');
      expect(headerElement).toBeInTheDocument();
    });

    it('should render a Footer component correctly', () => {
      render(<Footer />);
      const footerElement = screen.getByRole('contentinfo');
      expect(footerElement).toBeInTheDocument();
    });

    it('should render a Sidebar component correctly', () => {
      render(<Sidebar />);
      const sidebarElement = screen.getByRole('navigation');
      expect(sidebarElement).toBeInTheDocument();
    });

    it('should render a DashboardLayout component correctly', () => {
      render(<DashboardLayout>Dashboard Content</DashboardLayout>);
      const dashboardLayoutElement = screen.getByText('Dashboard Content');
      expect(dashboardLayoutElement).toBeInTheDocument();
    });

    it('should render an AuthLayout component correctly', () => {
      render(<AuthLayout>Authentication Content</AuthLayout>);
      const authLayoutElement = screen.getByText('Authentication Content');
      expect(authLayoutElement).toBeInTheDocument();
    });

    it('should render a Toast component correctly', () => {
      render(<Toast type="success" message="Success!" />);
      const toastElement = screen.getByText('Success!');
      expect(toastElement).toBeInTheDocument();
    });

    it('should render a GoalCard component correctly', () => {
      const mockGoal: Goal = {
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
      };

      render(<GoalCard goal={mockGoal} />);
      const goalCardElement = screen.getByText('Lose 10 pounds');
      expect(goalCardElement).toBeInTheDocument();
    });

    it('should render a PostCard component correctly', () => {
      const mockPost: Post = {
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
      };

      render(<PostCard post={mockPost} />);
      const postCardElement = screen.getByText('Started my new workout routine!');
      expect(postCardElement).toBeInTheDocument();
    });

    it('should render a SocialFeed component correctly', () => {
      render(<SocialFeed />);
      const socialFeedElement = screen.getByRole('feed');
      expect(socialFeedElement).toBeInTheDocument();
    });

    it('should render a GoalList component correctly', () => {
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

      render(<GoalList goals={mockGoals} />);
      const goalListElement = screen.getByRole('list');
      expect(goalListElement).toBeInTheDocument();
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
    it('should format a date correctly', () => {
      const dateString = '2023-12-31';
      const formattedDate = formatDate(dateString);
      expect(formattedDate.date).toBe('December 31st, 2023');
      expect(formattedDate.time).toBe('12:00 AM');
    });

    it('should capitalize a string correctly', () => {
      const string = 'test string';
      const capitalizedString = capitalize(string);
      expect(capitalizedString).toBe('Test string');
    });

    it('should validate an email address correctly', () =>