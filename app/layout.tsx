import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import UserNav from './components/UserNav';
import CartButton from './components/CartButton';
import CartDrawer from './components/CartDrawer';
import InteractiveLink from './components/InteractiveLink';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RAW Shop',
  description: 'Premium RAW products for the perfect rolling experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen bg-white`}>
        <AuthProvider>
          <CartProvider>
            <header className="bg-gradient-to-r from-gray-900 to-black text-white px-6 py-4 sticky top-0 z-50 shadow-md">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                  <span className="text-amber-300">RAW</span> Shop
                </h1>
                <nav className="flex items-center">
                  <ul className="flex gap-6">
                    <li>
                      <InteractiveLink href="/" variant="nav">
                        Home
                      </InteractiveLink>
                    </li>
                    <li>
                      <InteractiveLink href="/categories" variant="nav">
                        Categories
                      </InteractiveLink>
                    </li>
                    <li>
                      <InteractiveLink href="/products" variant="nav">
                        Products
                      </InteractiveLink>
                    </li>
                    <li>
                      <InteractiveLink href="/contact" variant="nav">
                        Contact
                      </InteractiveLink>
                    </li>
                  </ul>
                  <div className="ml-6 flex items-center">
                    <CartButton />
                    <UserNav />
                  </div>
                </nav>
              </div>
            </header>
            
            <CartDrawer />
            
            <main className="flex-1">
              {children}
            </main>
            
            <footer className="bg-black text-white pt-12 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-4">
                      <span className="text-amber-300">RAW</span> Shop
                    </h2>
                    <p className="text-gray-400 max-w-md">
                      Premium quality rolling products made from all-natural materials for the perfect experience.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="flex flex-col gap-2">
                      <li><InteractiveLink href="/" variant="footer">Home</InteractiveLink></li>
                      <li><InteractiveLink href="/categories" variant="footer">Categories</InteractiveLink></li>
                      <li><InteractiveLink href="/products" variant="footer">Products</InteractiveLink></li>
                      <li><InteractiveLink href="/contact" variant="footer">Contact</InteractiveLink></li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
                  <p>© {new Date().getFullYear()} RAW Shop. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
} 