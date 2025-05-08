'use client';

import AuthForm from '../../components/AuthForm';

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Create Your Account</h1>
        <AuthForm mode="register" />
      </div>
    </div>
  );
} 