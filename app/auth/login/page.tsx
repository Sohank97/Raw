'use client';

import AuthForm from '../../components/AuthForm';

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</h1>
        <AuthForm mode="login" />
      </div>
    </div>
  );
} 