import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { Metadata } from 'next';
import { useRouter } from 'next/navigation';
import { useToast } from '@frontend/app/src/components/organisms/Toast';
import { useFetchUser } from '@frontend/app/src/hooks/useFetchUser';
import Header from '@frontend/app/src/components/organisms/Header';
import Footer from '@frontend/app/src/components/organisms/Footer';

export const metadata: Metadata = {
  title: 'Fitness Goal Tracker & Social Hub',
  description: 'Empower your fitness journey. Set, track, and share your goals.',
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { showToast } = useToast();
  const { user, isLoading: userLoading, error: userError } = useFetchUser();

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

    if (!user) {
      router.push('/(auth)/login');
      return;
    }
  }, [userLoading, userError, user, showToast, router]);

  return (
    <SessionProvider session={user ? { user } : undefined}>
      {userLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-gray-300" />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 bg-gray-100 p-4">{children}</main>
          <Footer />
        </div>
      )}
    </SessionProvider>
  );
};

export default Layout;