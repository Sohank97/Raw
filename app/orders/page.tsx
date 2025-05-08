'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [orderProcessed, setOrderProcessed] = useState(false);

  useEffect(() => {
    // Clear cart when arriving from successful checkout
    if (success === 'true' && sessionId && !orderProcessed) {
      clearCart();
      setOrderProcessed(true);
    }
  }, [success, sessionId, clearCart, orderProcessed]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoading && !user && !success) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router, success]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  // Show thank you page after successful checkout
  if (success === 'true' && sessionId) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold mb-2">Thank You For Your Order!</h1>
            <p className="text-gray-600 mb-6">
              Your order has been successfully placed. 
              {user ? ' You can check your order status in your order history.' : ' Create an account to track your order status.'}
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/products">
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Continue Shopping
                </button>
              </Link>
              {!user && (
                <Link href="/auth/register">
                  <button className="border border-amber-500 text-amber-500 hover:bg-amber-50 px-6 py-2 rounded-lg font-medium transition-colors">
                    Create Account
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders yet. Check out our products and place your first order.
          </p>
          <Link href="/products">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
              Browse Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
} 