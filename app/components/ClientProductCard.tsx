'use client';

import { Product } from '../lib/supabase';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function ClientProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    addToCart(product, 1);
    
    // Reset adding state after animation
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:-translate-y-2 hover:shadow-xl">
      <div className="h-56 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center transform rotate-12 transition-transform duration-300 hover:rotate-0">
            <span className="text-2xl font-bold text-amber-800">RAW</span>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-amber-500 rounded-full text-white text-xs px-3 py-1 shadow-md">
            ${product.price.toFixed(2)}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full">
            {product.category?.name || 'Uncategorized'}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mb-6 line-clamp-2">{product.description}</p>
        
        <div className="flex justify-between items-center">
          <button 
            onClick={handleAddToCart}
            className={`px-3 py-2 text-white rounded-lg flex items-center gap-1 text-sm font-medium transition-all ${
              isAdding ? 'bg-green-500' : 'bg-amber-500 hover:bg-amber-600'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
          
          <Link href={`/products/${product.id}`}>
            <span className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium transition-all hover:bg-gray-200">
              View Details
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
} 