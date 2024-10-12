import React, { FC, ReactNode } from 'react';
import { tw } from 'tailwind-css'; // Import Tailwind CSS for styling (version 3.4.13)
import { Header } from '@frontend/app/src/components/organisms/Header'; // Import Header component (ensure this is properly implemented and exported)
import { Footer } from '@frontend/app/src/components/organisms/Footer'; // Import Footer component (ensure this is properly implemented and exported)

interface AuthLayoutProps {
  /** The children to render inside the layout. */
  children: ReactNode;
}

/**
 * Authentication Layout component for the Fitness Goal Tracker & Social Hub application.
 *
 * This component provides a consistent layout for all authentication-related pages (login, register).
 * It renders the Header and Footer components, along with the provided children content.
 *
 * @param {AuthLayoutProps} props - The props for the AuthLayout component.
 * @returns {JSX.Element} The rendered AuthLayout component.
 */
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={tw`flex flex-col min-h-screen`}>
      {/* Render the Header component */}
      <Header />
      {/* Render the main content area */}
      <main className={tw`flex-1 bg-gray-100 p-4 flex items-center justify-center`}>
        {children}
      </main>
      {/* Render the Footer component */}
      <Footer />
    </div>
  );
};

export default AuthLayout;