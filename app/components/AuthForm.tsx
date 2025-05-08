'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

type FormMode = 'login' | 'register' | 'reset';

interface AuthFormProps {
  mode: FormMode;
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signIn, signUp, resetPassword, isLoading, error, setError } = useAuth();

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Sign In';
      case 'register': return 'Create Account';
      case 'reset': return 'Reset Password';
      default: return 'Sign In';
    }
  };

  const getButtonText = () => {
    if (isLoading) {
      return 'Processing...';
    }
    
    switch (mode) {
      case 'login': return 'Sign In';
      case 'register': return 'Sign Up';
      case 'reset': return 'Send Reset Link';
      default: return 'Submit';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if ((mode === 'login' || mode === 'register') && !password.trim()) {
      setError('Please enter your password');
      return;
    }

    if (mode === 'register') {
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    try {
      if (mode === 'login') {
        await signIn(email, password);
      } else if (mode === 'register') {
        await signUp(email, password);
      } else if (mode === 'reset') {
        await resetPassword(email);
      }
    } catch (error) {
      // Error is handled in the auth context
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{getTitle()}</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            placeholder="you@example.com"
            required
          />
        </div>

        {(mode === 'login' || mode === 'register') && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              placeholder="••••••••"
              required
            />
          </div>
        )}

        {mode === 'register' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
              placeholder="••••••••"
              required
            />
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-amber-400 disabled:cursor-not-allowed"
          >
            {getButtonText()}
          </button>
        </div>
      </form>

      <div className="mt-6">
        {mode === 'login' && (
          <div className="text-sm text-center space-y-2">
            <Link href="/auth/register" className="text-amber-600 hover:text-amber-500">
              Don't have an account? Sign up
            </Link>
            <div className="block">
              <Link href="/auth/reset-password" className="text-amber-600 hover:text-amber-500">
                Forgot your password?
              </Link>
            </div>
          </div>
        )}

        {mode === 'register' && (
          <div className="text-sm text-center">
            <Link href="/auth/login" className="text-amber-600 hover:text-amber-500">
              Already have an account? Sign in
            </Link>
          </div>
        )}

        {mode === 'reset' && (
          <div className="text-sm text-center">
            <Link href="/auth/login" className="text-amber-600 hover:text-amber-500">
              Remember your password? Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 