import Link from 'next/link';
import { fetchProducts, fetchCategories, fetchSliderProducts } from './lib/supabase';
import ProductSlider from './components/ProductSlider';
import ProductCard from './components/ProductCard';
import HeroProduct from './components/HeroProduct';
import InteractiveButton from './components/InteractiveButton';
import InteractiveLink from './components/InteractiveLink';

// Make the page dynamic
export const dynamicPage = 'force-dynamic';

export default async function Home() {
  // Fetch products and categories from Supabase
  const featuredProducts = await fetchProducts();
  const sliderProducts = await fetchSliderProducts();

  // Styles for containers
  const heroStyles = {
    position: 'relative',
    overflow: 'hidden',
    minHeight: '600px',
    background: 'linear-gradient(to bottom, #000000, #1f2937, #111827)',
    color: 'white'
  };

  const decorationStyles1 = {
    position: 'absolute',
    width: '16rem',
    height: '16rem',
    borderRadius: '9999px',
    background: 'linear-gradient(to right, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1))',
    filter: 'blur(64px)',
    top: '5rem',
    left: '-5rem'
  };

  const decorationStyles2 = {
    position: 'absolute',
    width: '24rem',
    height: '24rem',
    borderRadius: '9999px',
    background: 'linear-gradient(to left, rgba(217, 119, 6, 0.1), rgba(217, 119, 6, 0.05))',
    filter: 'blur(64px)',
    bottom: '0',
    right: '0'
  };

  return (
    <div>
      {/* 3D Hero Section */}
      <section style={heroStyles}>
        {/* 3D Element Decorations */}
        <div style={decorationStyles1}></div>
        <div style={decorationStyles2}></div>
        
        {/* Background 3D Particles */}
        <div style={{ position: 'absolute', inset: '0', zIndex: '0', opacity: '0.4' }}>
          <div style={{ position: 'absolute', width: '0.5rem', height: '0.5rem', background: '#F59E0B', borderRadius: '9999px', top: '25%', left: '25%', animation: 'pulse 2s infinite' }}></div>
          <div style={{ position: 'absolute', width: '0.5rem', height: '0.5rem', background: '#FBBF24', borderRadius: '9999px', top: '33%', left: '50%', animation: 'pulse 2s infinite', animationDelay: '0.5s' }}></div>
          <div style={{ position: 'absolute', width: '0.75rem', height: '0.75rem', background: '#FCD34D', borderRadius: '9999px', top: '67%', left: '33%', animation: 'pulse 2s infinite', animationDelay: '1s' }}></div>
          <div style={{ position: 'absolute', width: '0.5rem', height: '0.5rem', background: '#F59E0B', borderRadius: '9999px', top: '50%', left: '75%', animation: 'pulse 2s infinite', animationDelay: '1.5s' }}></div>
          <div style={{ position: 'absolute', width: '0.5rem', height: '0.5rem', background: '#FBBF24', borderRadius: '9999px', top: '75%', left: '25%', animation: 'pulse 2s infinite', animationDelay: '2s' }}></div>
          <div style={{ position: 'absolute', width: '0.75rem', height: '0.75rem', background: '#FCD34D', borderRadius: '9999px', top: '25%', left: '67%', animation: 'pulse 2s infinite', animationDelay: '2.5s' }}></div>
        </div>
        
        <div style={{ container: 'true', margin: '0 auto', position: 'relative', zIndex: '10', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '5rem 1.5rem' }} className="md:flex-row">
          {/* Hero Text */}
          <div style={{ width: '100%', marginBottom: '3rem' }} className="md:w-1/2 md:mb-0">
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1.5rem', lineHeight: '1.2' }} className="md:text-6xl">
              Experience <span style={{ backgroundImage: 'linear-gradient(to right, #F59E0B, #D97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Premium</span> RAW Quality
            </h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: '#D1D5DB', fontWeight: '300' }} className="md:text-2xl">
              Handcrafted with care. Made from 100% natural materials for the purest experience.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <InteractiveButton href="/products" variant="amber">
                Shop Now
              </InteractiveButton>
              <InteractiveLink href="/categories" variant="secondary">
                Explore Categories
              </InteractiveLink>
            </div>
            
            {/* Trust Badges */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '3rem', gap: '1rem', fontSize: '0.875rem', color: '#9CA3AF' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.25rem', color: '#F59E0B' }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                Premium Quality
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.25rem', color: '#F59E0B' }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Secure Checkout
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.25rem', color: '#F59E0B' }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2v5a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V5a1 1 0 00-1-1H3z"></path>
                </svg>
                Fast Shipping
              </div>
            </div>
          </div>
          
          {/* 3D Product Display */}
          <div style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', perspective: '1000px' }} className="md:w-1/2">
            <div style={{ position: 'relative', height: '400px', width: '400px', transform: 'rotateY(0deg)', animation: 'float 6s ease-in-out infinite' }}>
              <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: '18rem', height: '18rem' }}>
                  <div style={{ position: 'absolute', inset: '0', background: 'linear-gradient(to bottom right, rgba(217, 119, 6, 0.3), rgba(245, 158, 11, 0.2))', borderRadius: '9999px', filter: 'blur(24px)' }}></div>
                  <div style={{ position: 'absolute', inset: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ position: 'relative', zIndex: '20', width: '16rem', height: '16rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '9999px', border: '1px solid rgba(245, 158, 11, 0.3)', animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
                      <div style={{ position: 'absolute', width: '14rem', height: '14rem', borderRadius: '9999px', border: '1px solid rgba(245, 158, 11, 0.2)' }}></div>
                      <div style={{ position: 'absolute', width: '12rem', height: '12rem', borderRadius: '9999px', border: '1px solid rgba(245, 158, 11, 0.1)' }}></div>
                      
                      {/* Product Image */}
                      <div style={{ position: 'relative', zIndex: '30', transform: 'scale(1.25)', filter: 'drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15))', transition: 'transform 0.7s' }}>
                        <HeroProduct />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* White background sections start */}
      <div style={{ background: 'white' }}>
        {/* Product Slider with white background */}
        {sliderProducts.length > 0 && (
          <div style={{ marginTop: '0' }}>
            <ProductSlider products={sliderProducts} />
          </div>
        )}
        
        {/* Features Section */}
        <section style={{ container: 'true', margin: '0 auto', padding: '4rem 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>Why Choose RAW?</h2>
            <p style={{ color: '#4B5563', maxWidth: '36rem', margin: '0 auto' }}>
              Our products are crafted with care and attention to detail, providing you with the best possible experience.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="md:grid-cols-3">
            <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', padding: '2rem', textAlign: 'center', transition: 'box-shadow 0.3s' }}>
              <div style={{ background: 'rgba(251, 191, 36, 0.1)', width: '4rem', height: '4rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <svg style={{ width: '2rem', height: '2rem', color: '#D97706' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>100% Natural</h3>
              <p style={{ color: '#4B5563' }}>
                Made from unbleached, all-natural materials that provide a pure and clean experience.
              </p>
            </div>
            
            <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', padding: '2rem', textAlign: 'center', transition: 'box-shadow 0.3s' }}>
              <div style={{ background: 'rgba(251, 191, 36, 0.1)', width: '4rem', height: '4rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <svg style={{ width: '2rem', height: '2rem', color: '#D97706' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Eco-Friendly</h3>
              <p style={{ color: '#4B5563' }}>
                Sustainable practices and environmentally conscious materials are at the core of our business.
              </p>
            </div>
            
            <div style={{ background: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', padding: '2rem', textAlign: 'center', transition: 'box-shadow 0.3s' }}>
              <div style={{ background: 'rgba(251, 191, 36, 0.1)', width: '4rem', height: '4rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <svg style={{ width: '2rem', height: '2rem', color: '#D97706' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Premium Quality</h3>
              <p style={{ color: '#4B5563' }}>
                Superior craftsmanship and attention to detail ensure you get the best quality products.
              </p>
            </div>
          </div>
        </section>
        
        {/* Best Sellers Section */}
        <section style={{ container: 'true', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2.5rem', textAlign: 'center', color: '#111827' }}>Best Sellers</h2>
          {featuredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6B7280', padding: '3rem 0' }}>
              <p>No products available at the moment. Please check back later.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }} className="md:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
      {/* White background sections end */}
      
      {/* Call to action */}
      <section style={{ background: 'linear-gradient(to bottom, #D97706, #000000)', color: 'white', padding: '6rem 1.5rem', margin: '0' }}>
        <div style={{ container: 'true', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          {/* Decorative elements */}
          <div style={{ position: 'absolute', left: '0', top: '0', width: '8rem', height: '8rem', borderRadius: '9999px', background: 'rgba(255, 255, 255, 0.05)', filter: 'blur(24px)' }}></div>
          <div style={{ position: 'absolute', right: '0', bottom: '0', width: '10rem', height: '10rem', borderRadius: '9999px', background: 'rgba(146, 64, 14, 0.2)', filter: 'blur(24px)' }}></div>
          
          <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem', position: 'relative', zIndex: '10' }} className="md:text-5xl">Ready to experience RAW quality?</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: '0.9', maxWidth: '48rem', margin: '0 auto 2.5rem' }} className="md:text-2xl">
            Join thousands of satisfied customers and discover why RAW is the preferred choice for premium rolling products.
          </p>
          <InteractiveButton href="/products" variant="cta">
            Shop All Products
          </InteractiveButton>
          
          {/* Optional decorative line - visible on larger screens */}
          <div style={{ width: '6rem', height: '0.25rem', background: 'rgba(255, 255, 255, 0.3)', margin: '4rem auto 0', display: 'none' }} className="md:block"></div>
        </div>
      </section>
    </div>
  );
} 