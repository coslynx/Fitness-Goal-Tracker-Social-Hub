import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import NextAuth.js for authentication (version 4.24.8)
import Link from 'next/link'; // Import Next.js's Link component for client-side navigation (version 14.2.15)
import { NavItem } from '@shared/ui-components'; // Import NavItem component from shared ui-components (version 1.0.0)
import { Typography } from '@shared/ui-components'; // Import Typography component from shared ui-components (version 1.0.0)
import { Button } from '@shared/ui-components'; // Import Button component from shared ui-components (version 1.0.0)
import { useToast } from '@frontend/app/src/components/organisms/Toast';
import { useFetchUser } from '@frontend/app/src/hooks/useFetchUser';

interface HeaderProps {}

/**
 * Header component for the Fitness Goal Tracker & Social Hub application.
 * 
 * This component renders the application's navigation bar, user profile information, and branding elements.
 * It integrates with NextAuth.js to manage authentication state and display user data.
 *
 * @param {HeaderProps} props - The props for the Header component.
 * @returns {JSX.Element} The rendered Header component.
 */
const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (status === 'loading') {
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
  }, [status, userError, fetchedUser, showToast]);

  const { user: fetchedUser, isLoading: userLoading, error: userError } = useFetchUser();

  const handleLogout = async () => {
    try {
      // Implement logout logic using the appropriate API endpoint 
      await fetch('/api/auth/logout');
      router.push('/(auth)/login');
      showToast({
        type: 'success',
        message: 'You have been logged out.',
      });
    } catch (error) {
      // Handle logout errors
      console.error('Error during logout:', error);
      showToast({
        type: 'error',
        message: 'An error occurred during logout. Please try again later.',
      });
    }
  };

  if (isLoading) {
    return (
      <header className="bg-primary-500 text-white py-4 shadow-md">
        {/* Display a loading indicator */}
        <div className="container mx-auto flex justify-between items-center">
          {/* Loading indicator */}
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-gray-300" />
        </div>
      </header>
    );
  }

  return (
    <header className="bg-primary-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Branding (logo or title) */}
        <Typography variant="h2" align="center">
          Fitness Tracker
        </Typography>

        {/* Navigation Bar */}
        <nav className="flex gap-4">
          {/* Navigation items */}
          <NavItem label="Dashboard" href="/dashboard" isActive={true} />
          <NavItem label="Goals" href="/goals" isActive={false} />
          <NavItem label="Social Feed" href="/social" isActive={false} />

          {/* User Profile Menu */}
          <div className="relative">
            <Button variant="secondary" className="rounded-full" onClick={() => {}}>
              {/* Display user profile image or initials (optional) */}
              <span className="font-bold text-xs">{user.name.charAt(0)}</span>
            </Button>
            <ul className="absolute right-0 mt-2 py-2 px-2 rounded-md shadow-lg bg-white z-10">
              {/* Profile dropdown items */}
              <li className="py-1 px-2 hover:bg-gray-100 rounded-md">
                <Link href="/profile">My Profile</Link>
              </li>
              <li className="py-1 px-2 hover:bg-gray-100 rounded-md">
                <Link href="/settings">Settings</Link>
              </li>
              <li className="py-1 px-2 hover:bg-gray-100 rounded-md">
                <Button variant="secondary" onClick={handleLogout}>
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;