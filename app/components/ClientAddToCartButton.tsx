'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../lib/supabase';
import { ShoppingCart } from 'lucide-react';

export default function ClientAddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    
    // Reset adding state after animation
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center border border-gray-300 rounded-md">
          <button 
            className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="px-3 py-2 border-x border-gray-300 min-w-[40px] text-center">
            {quantity}
          </span>
          <button 
            className="px-3 py-2 text-gray-500 hover:text-gray-700"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
        
        <div className="text-sm text-gray-500">
          ${(product.price * quantity).toFixed(2)}
        </div>
      </div>
      
      <button 
        onClick={handleAddToCart}
        className={`w-full py-4 bg-gradient-to-r from-amber-500 to-amber-700 text-white font-bold rounded-xl transform transition flex items-center justify-center gap-2 ${
          isAdding ? 'animate-pulse' : 'hover:scale-105 hover:shadow-lg'
        }`}
      >
        <ShoppingCart className="h-5 w-5" />
        {isAdding ? 'Added to Cart!' : 'Add to Cart'}
      </button>
    </div>
  );
} 