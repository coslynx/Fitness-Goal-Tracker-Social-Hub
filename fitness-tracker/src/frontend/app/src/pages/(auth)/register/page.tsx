import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Input } from '@shared/ui-components';
import { Typography } from '@shared/ui-components';
import { Button } from '@shared/ui-components';
import { useToast } from '@frontend/app/src/components/organisms/Toast';

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      showToast({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        showToast({ type: 'error', message: errorData.message });
      } else {
        router.push('/(auth)/login');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred during registration. Please try again later.');
      showToast({ type: 'error', message: 'An error occurred during registration. Please try again later.' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        <Typography variant="h2" align="center">
          Register
        </Typography>

        {error && <div className="text-red-500 text-center">{error}</div>}

        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
        />

        <Button type="submit">Register</Button>
      </div>
    </form>
  );
}