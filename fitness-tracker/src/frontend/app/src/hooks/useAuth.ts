import { useSession, Session } from 'next-auth/react'; // Import next-auth/react for authentication (version 4.24.8 or later)
import { useEffect, useState } from 'react'; // Import React hooks for managing state and side effects (version 18.2.0 or later)

/**
 * A custom hook to manage authentication state for the application. 
 * 
 * This hook provides access to the current authentication session and 
 * related user information. It leverages NextAuth.js for authentication 
 * and session management. 
 * 
 * @returns {{ session: Session | null, loading: boolean, error: string | null }} 
 *  - `session`: The current authentication session (if authenticated), 
 *    or null if not authenticated.
 *  - `loading`: True if the authentication process is still in progress, 
 *    or false if it has completed.
 *  - `error`: An error message (string) if an error occurs during 
 *    authentication, or null if no error.
 */
export const useAuth = () => {
  const { data: session, status } = useSession(); // Use next-auth/react's useSession hook to fetch authentication data.
  const [loading, setLoading] = useState(true); // State to track loading state.
  const [error, setError] = useState<string | null>(null); // State to store potential errors.

  useEffect(() => {
    if (status === 'loading') {
      // Set loading state to true if authentication is in progress. 
      setLoading(true);
      setError(null); // Clear any previous error.
    } else if (status === 'authenticated') {
      // Set loading state to false and clear any potential error if 
      // the user is authenticated.
      setLoading(false);
      setError(null);
    } else if (status === 'unauthenticated') {
      // Set loading state to false and clear any potential error if 
      // the user is not authenticated.
      setLoading(false);
      setError(null);
    } else if (status === 'error') {
      // Set loading state to false and set an error message if 
      // there is an error during authentication.
      setLoading(false);
      setError('An error occurred during authentication. Please try again later.');
    }
  }, [status]); // Dependency array includes 'status' to trigger useEffect on changes to the authentication status.

  // Return the authentication session, loading state, and potential error. 
  return { session, loading, error };
};