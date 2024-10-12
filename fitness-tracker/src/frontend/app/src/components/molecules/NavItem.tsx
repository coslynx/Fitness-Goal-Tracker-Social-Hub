import React from 'react';
import { tw } from 'tailwind-css'; // Import Tailwind CSS for styling (version 3.4.13)
import Link from 'next/link'; // Import Next.js's Link component for client-side navigation (version 14.2.15)
import { NavItemProps } from './NavItem.types'; // Import the type definition for NavItem props

/**
 * A reusable navigation item component for use in menus or sidebars.
 *
 * @param {NavItemProps} props - The props for the NavItem component.
 * @returns {JSX.Element} The rendered NavItem component.
 */
const NavItem: React.FC<NavItemProps> = ({ label, href, icon, isActive }) => {
  // Determine the active class based on the isActive prop
  const activeClass = isActive ? 'bg-primary-500 text-white' : '';

  return (
    <Link href={href} className={tw`flex items-center px-4 py-2 rounded-md hover:bg-gray-100 ${activeClass}`}>
      {icon && <span className={tw`mr-2`}>{icon}</span>}
      <span className={tw`text-gray-700 font-medium`}>{label}</span>
    </Link>
  );
};

export default NavItem;