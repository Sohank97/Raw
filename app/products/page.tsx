import Link from 'next/link';
import { fetchProducts, fetchCategories } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

// Make the page dynamic
export const dynamicParams = 'force-dynamic';

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Get filter params
  const category = searchParams.category as string || '';
  const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice as string) : undefined;
  const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice as string) : undefined;
  const sortBy = searchParams.sort as string || 'featured';
  
  // Fetch products and categories from database
  const products = await fetchProducts();
  const categories = await fetchCategories();
  
  // Filter products based on search params
  let filteredProducts = [...products];
  
  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(product => 
      product.category?.slug === category
    );
  }
  
  // Filter by price range
  if (minPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.price >= minPrice
    );
  }
  
  if (maxPrice !== undefined) {
    filteredProducts = filteredProducts.filter(product => 
      product.price <= maxPrice
    );
  }
  
  // Sort products
  switch (sortBy) {
    case 'price-low':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filteredProducts.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
        const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
      break;
    case 'featured':
    default:
      // Keep default order or implement featured logic
      break;
  }

  // Function to generate filter URL
  const getFilterUrl = (params: Record<string, string | undefined>) => {
    const url = new URLSearchParams();
    
    // Start with current params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) url.append(key, value.toString());
    });
    
    // Update with new params
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) {
        url.delete(key);
      } else {
        url.set(key, value);
      }
    });
    
    return `?${url.toString()}`;
  };

  // Price ranges for filtering
  const priceRanges = [
    { label: 'Under $10', value: '0-10' },
    { label: '$10 - $25', value: '10-25' },
    { label: '$25 - $50', value: '25-50' },
    { label: 'Over $50', value: '50-1000' }
  ];

  // Main product categories
  const mainCategories = [
    { name: 'Rolling Papers', slug: 'rolling-papers' },
    { name: 'Accessories', slug: 'accessories' },
    { name: 'Bundles', slug: 'bundles' },
    { name: 'Special Edition', slug: 'special-edition' }
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Shop Premium RAW Products</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Browse our complete selection of premium quality rolling products made from all-natural materials.
          Find the perfect RAW products for your needs.
        </p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-6">Filters</h2>
            
            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="font-medium mb-3 text-gray-700">Categories</h3>
              <div className="space-y-2">
                <div>
                  <Link 
                    href={getFilterUrl({ category: undefined })}
                    className={`block px-3 py-2 rounded-lg transition ${!category ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'}`}
                  >
                    All Products
                  </Link>
                </div>
                
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <Link 
                      href={getFilterUrl({ category: cat.slug })}
                      className={`block px-3 py-2 rounded-lg transition ${category === cat.slug ? 'bg-amber-100 text-amber-800' : 'hover:bg-gray-100'}`}
                    >
                      {cat.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-8">
              <h3 className="font-medium mb-3 text-gray-700">Price Range</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  href={getFilterUrl({ minPrice: undefined, maxPrice: '10' })}
                  className={`px-3 py-2 text-center border rounded-lg transition ${maxPrice === 10 ? 'bg-amber-100 border-amber-300' : 'hover:bg-gray-100'}`}
                >
                  Under $10
                </Link>
                <Link 
                  href={getFilterUrl({ minPrice: '10', maxPrice: '20' })}
                  className={`px-3 py-2 text-center border rounded-lg transition ${minPrice === 10 && maxPrice === 20 ? 'bg-amber-100 border-amber-300' : 'hover:bg-gray-100'}`}
                >
                  $10 - $20
                </Link>
                <Link 
                  href={getFilterUrl({ minPrice: '20', maxPrice: '50' })}
                  className={`px-3 py-2 text-center border rounded-lg transition ${minPrice === 20 && maxPrice === 50 ? 'bg-amber-100 border-amber-300' : 'hover:bg-gray-100'}`}
                >
                  $20 - $50
                </Link>
                <Link 
                  href={getFilterUrl({ minPrice: '50', maxPrice: undefined })}
                  className={`px-3 py-2 text-center border rounded-lg transition ${minPrice === 50 ? 'bg-amber-100 border-amber-300' : 'hover:bg-gray-100'}`}
                >
                  Over $50
                </Link>
              </div>
            </div>
            
            {/* Clear Filters Button */}
            {(category || minPrice || maxPrice) && (
              <Link 
                href="/products"
                className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </Link>
            )}
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="lg:w-3/4">
          {/* Sort Controls */}
          <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex justify-between items-center">
            <p className="text-gray-500">
              Showing <span className="font-medium text-gray-900">{filteredProducts.length}</span> products
            </p>
            
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
              <select 
                id="sort"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
                value={sortBy}
                onChange={(e) => {
                  const url = getFilterUrl({ sort: e.target.value });
                  window.location.href = url;
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
          
          {/* Products Display */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-600 mb-6">We couldn't find any products matching your current filters.</p>
              <Link href="/products">
                <button className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
                  View All Products
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Featured Collection Banner */}
      <div className="mt-24 mb-8 bg-gradient-to-r from-amber-500 to-amber-700 rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">RAW Premium Collection</h2>
            <p className="mb-6 opacity-90">Discover our premium line of all-natural and unrefined rolling products. Experience the pure quality that has made RAW a trusted favorite worldwide.</p>
            <Link href="/products?category=premium">
              <button className="px-6 py-3 bg-white text-amber-700 font-medium rounded-lg hover:bg-gray-100 transition shadow-md">
                Shop Premium Collection
              </button>
            </Link>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="text-4xl font-bold text-white">RAW</div>
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/30 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-white/20 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 