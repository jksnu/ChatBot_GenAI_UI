// components/SignInButton.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function SignInButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('username');
    if (user) {
      setUsername(user);
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignIn = async () => {
    try {
      // Simulate authentication
      const user = prompt('Enter your username (admin for admin access):');
      if (user) {
        localStorage.setItem('username', user);
        setUsername(user);
        setIsLoggedIn(true);
        toast.success(`Signed in as ${user}`);
      }
    } catch (err) {
      console.error(err);
      toast.error('Sign-in failed');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('username');
    setUsername('');
    setIsLoggedIn(false);
    toast.success('Signed out');
    router.refresh();
  };

  if (isLoggedIn) {
    return (
      <div className="flex gap-2 items-center">
        <span className="text-sm font-medium">Hello, {username}</span>
        <button
          onClick={handleSignOut}
          className="text-xs text-red-500 hover:underline"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
    >
      Sign in
    </button>
  );
}
