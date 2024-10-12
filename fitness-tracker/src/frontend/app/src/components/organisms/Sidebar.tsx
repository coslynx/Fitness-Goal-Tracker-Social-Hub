import React from 'react';
import { tw } from 'tailwind-css'; // Import Tailwind CSS for styling (version 3.4.13)
import { NavItem } from '@shared/ui-components'; // Import NavItem component from shared ui-components (version 1.0.0)
import { useSession } from 'next-auth/react'; // Import NextAuth.js for managing authentication state (version 4.24.8)
import Link from 'next/link'; // Import Next.js's Link component for client-side navigation (version 14.2.15)
import { Typography } from '@shared/ui-components';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { data: session } = useSession();

  return (
    <div className={tw`bg-white shadow-md rounded-md p-4 w-64`}>
      <Typography variant="h3" className={tw`mb-4`}>
        Fitness Tracker
      </Typography>
      <ul className={tw`space-y-2`}>
        <NavItem label="Dashboard" href="/dashboard" isActive={true} />
        <NavItem label="Goals" href="/goals" isActive={false} />
        <NavItem label="Social Feed" href="/social" isActive={false} />
        <NavItem label="Profile" href="/profile" isActive={false} />
        <NavItem label="Settings" href="/settings" isActive={false} />
        {session ? (
          <NavItem label="Logout" href="/api/auth/logout" isActive={false} />
        ) : (
          <NavItem label="Login" href="/(auth)/login" isActive={false} />
        )}
      </ul>
    </div>
  );
};

export default Sidebar;