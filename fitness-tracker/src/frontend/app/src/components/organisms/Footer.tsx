import React from 'react';
import { tw } from 'tailwind-css'; // Import Tailwind CSS (version 3.4.13) for styling
import Link from 'next/link'; // Import Next.js's Link component (version 14.2.15) for client-side navigation
import { Typography } from '@shared/ui-components'; // Import Typography component from shared ui-components (version 1.0.0)

interface FooterProps {}

/**
 * Footer component for the Fitness Goal Tracker & Social Hub application.
 *
 * @param {FooterProps} props - The props for the Footer component.
 * @returns {JSX.Element} The rendered Footer component.
 */
const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className={tw`bg-gray-800 text-white py-4 mt-4`}>
      <div className={tw`container mx-auto text-center`}>
        <Typography variant="body">
          &copy; {new Date().getFullYear()} Fitness Goal Tracker & Social Hub. All rights reserved.
        </Typography>
        <div className={tw`mt-2`}>
          <Link href="/about" className={tw`hover:underline`}>
            About
          </Link>
          {' | '}
          <Link href="/privacy" className={tw`hover:underline`}>
            Privacy Policy
          </Link>
          {' | '}
          <Link href="/terms" className={tw`hover:underline`}>
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;