"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'

const SignInPage = () => {
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // For demonstration, assuming successful sign-in
    if (gmail === 'test@gmail.com' && password === 'password') {
      // Save authentication status in localStorage
      localStorage.setItem('isAuthenticated', 'true');

      // Redirect to the dashboard
      router.push('/');
    } else {
      // Handle failed sign-in
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-8 text-3xl text-center font-bold">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="gmail"
            placeholder="Email address"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-black text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Sign in
          </button>
        </form>
        <div className="text-grey-dark mt-6 w-full text-right">
          Don't have an account?
          <a className="no-underline text-blue-500 ml-2" href="/sign-up">
            Sign up
          </a>.
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
