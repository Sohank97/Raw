'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Product } from '../lib/supabase';
import Image from 'next/image';

export default function ProductSlider({ products }: { products: Product[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideContainerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate slides every 6 seconds
  useEffect(() => {
    if (products.length <= 1) return;
    
    const interval = setInterval(() => {
      handleNextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [products.length, currentIndex]);

  // Handle manual navigation with transition state
  const handleSlideChange = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const handlePrevSlide = () => {
    const newIndex = currentIndex === 0 ? products.length - 1 : currentIndex - 1;
    handleSlideChange(newIndex);
  };

  const handleNextSlide = () => {
    const newIndex = (currentIndex + 1) % products.length;
    handleSlideChange(newIndex);
  };

  // Handle swipe gestures
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 100) {
      // Swipe left
      handleNextSlide();
    } else if (touchEndX.current - touchStartX.current > 100) {
      // Swipe right
      handlePrevSlide();
    }
  };

  if (products.length === 0) {
    return null;
  }
  
  // Placeholder image data URL
  const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f1be6e' /%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='32' font-weight='bold' text-anchor='middle' dominant-baseline='middle' fill='%23222222'%3ERAW%3C/text%3E%3C/svg%3E";

  return (
    <div 
      className="relative w-full h-[500px] md:h-[650px] overflow-hidden my-0 group bg-white"
      ref={slideContainerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
      <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-amber-500/5 to-transparent"></div>
      <div className="absolute right-0 bottom-0 w-1/4 h-2/3 bg-gradient-to-t from-amber-600/5 to-transparent"></div>
      
      {/* Slides container */}
      <div className="relative w-full h-full">
        {/* Slides */}
        {products.map((product, index) => {
          const isActive = index === currentIndex;
          const isPrev = (index === currentIndex - 1) || (currentIndex === 0 && index === products.length - 1);
          const isNext = (index === currentIndex + 1) || (currentIndex === products.length - 1 && index === 0);
          
          return (
            <div 
              key={product.id}
              className={`absolute inset-0 transition-all duration-800 ease-in-out ${
                isActive ? 'opacity-100 z-20 transform-none' :
                isPrev ? 'opacity-0 z-10 -translate-x-[5%] scale-[0.95]' :
                isNext ? 'opacity-0 z-10 translate-x-[5%] scale-[0.95]' :
                'opacity-0 z-0'
              }`}
            >
              {/* Slide background with enhanced gradient overlay */}
              <div className="absolute inset-0 overflow-hidden">
                <div 
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-[10s] ease-in-out ${isActive ? 'scale-110' : 'scale-100'}`}
                  style={{ 
                    backgroundImage: `url(${product.image_url || placeholderImage})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30"></div>
                </div>
              </div>
              
              {/* Slide content with 3D floating effect */}
              <div className={`relative z-10 h-full flex items-center transition-transform duration-1000 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="container mx-auto px-6">
                  <div className="max-w-xl">
                    <div className="mb-4 transform transition-transform duration-700 delay-100">
                      {product.category && (
                        <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-sm font-medium shadow-lg">
                          {product.category.name}
                        </span>
                      )}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                      <span className="inline-block transform transition-transform duration-700 delay-200">
                        {product.name}
                      </span>
                    </h3>
                    <div className="w-16 h-1 bg-amber-500 mb-6 transform transition-transform duration-700 delay-300"></div>
                    <p className="text-gray-700 text-lg mb-8 max-w-lg transform transition-transform duration-700 delay-400">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-6 transform transition-transform duration-700 delay-500">
                      <span className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">
                        ${product.price.toFixed(2)}
                      </span>
                      <Link href={`/products/${product.id}`}>
                        <span className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg shadow-lg hover:from-amber-600 hover:to-amber-700 transition-colors transform hover:scale-105 duration-300 ease-in-out">
                          Shop Now
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-30 pointer-events-none">
                <div className="absolute right-[10%] bottom-[20%] w-20 h-20 rounded-full border border-amber-500/20"></div>
                <div className="absolute right-[20%] bottom-[10%] w-32 h-32 rounded-full border border-amber-500/10"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows - enhanced design */}
      {products.length > 1 && (
        <>
          <button 
            onClick={handlePrevSlide}
            disabled={isTransitioning}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-amber-500 text-gray-800 hover:text-white p-3 rounded-full transition-colors duration-300 opacity-70 hover:opacity-100 group-hover:opacity-90 shadow-md"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={handleNextSlide}
            disabled={isTransitioning}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 bg-white/70 hover:bg-amber-500 text-gray-800 hover:text-white p-3 rounded-full transition-colors duration-300 opacity-70 hover:opacity-100 group-hover:opacity-90 shadow-md"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Enhanced indicators */}
      {products.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-3">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              disabled={isTransitioning}
              className={`relative h-3 transition-all duration-500 rounded-full overflow-hidden shadow-sm ${
                index === currentIndex ? 'w-12 bg-amber-500' : 'w-3 bg-gray-400/40 hover:bg-gray-400/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index === currentIndex && (
                <span className="absolute top-0 left-0 bottom-0 bg-white/30 animate-progress"></span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 