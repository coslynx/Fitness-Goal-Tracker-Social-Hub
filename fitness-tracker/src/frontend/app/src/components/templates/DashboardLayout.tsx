import React from 'react';
import { tw } from 'tailwind-css'; // Import Tailwind CSS for styling (version 3.4.13)
import { Header } from '@frontend/app/src/components/organisms/Header'; // Import Header component (ensure this is properly implemented and exported)
import { Footer } from '@frontend/app/src/components/organisms/Footer'; // Import Footer component (ensure this is properly implemented and exported)
import { Sidebar } from '@frontend/app/src/components/organisms/Sidebar'; // Import Sidebar component (ensure this is properly implemented and exported)

interface DashboardLayoutProps {
  /** The children to render inside the layout. */
  children: React.ReactNode;
}

/**
 * Dashboard Layout component for the Fitness Goal Tracker & Social Hub application.
 *
 * This component provides a consistent layout for all pages within the application's dashboard.
 * It renders the Header, Footer, and Sidebar components, along with the provided children content.
 *
 * @param {DashboardLayoutProps} props - The props for the DashboardLayout component.
 * @returns {JSX.Element} The rendered DashboardLayout component.
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className={tw`flex flex-col min-h-screen`}>
      {/* Render the Header component */}
      <Header />
      {/* Render the main content area */}
      <main className={tw`flex-1 bg-gray-100 p-4 flex`}>
        {/* Render the Sidebar component */}
        <Sidebar />
        <div className={tw`flex-1 p-4`}>{children}</div>
      </main>
      {/* Render the Footer component */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;