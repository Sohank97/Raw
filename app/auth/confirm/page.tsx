'use client';

import Link from 'next/link';

export default function ConfirmPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-8 text-center">
        <svg
          className="w-16 h-16 mx-auto text-amber-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Check Your Email</h1>
        <p className="text-gray-600 mb-8">
          We've sent a confirmation link to your email address. Please check your inbox and click the link to verify your account.
        </p>
        <p className="text-gray-600 mb-4 text-sm">
          If you don't see the email, check your spam folder or request a new confirmation email.
        </p>
        <div className="mt-6">
          <Link href="/auth/login">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Return to Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 