'use client';

import AuthForm from '../../components/AuthForm';

export default function ResetPasswordPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Reset Your Password</h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <AuthForm mode="reset" />
      </div>
    </div>
  );
} 