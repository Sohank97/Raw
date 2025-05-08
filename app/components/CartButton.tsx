'use client';

import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function CartButton() {
  const { getCartCount, isCartOpen, setIsCartOpen } = useCart();
  const cartCount = getCartCount();
  
  return (
    <button 
      className="relative flex items-center mr-4 text-white hover:text-amber-400 transition-colors focus:outline-none"
      onClick={() => setIsCartOpen(!isCartOpen)}
    >
      <ShoppingBag className="w-6 h-6" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
          {cartCount}
        </span>
      )}
    </button>
  );
} 