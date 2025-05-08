import Link from 'next/link';
import { fetchCategories } from '../lib/supabase';

// Make the page dynamic
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable cache completely

export default async function CategoriesPage() {
  console.log('Fetching categories for the categories page...');
  
  // Fetch categories from Supabase
  const categories = await fetchCategories();
  
  console.log(`Retrieved ${categories.length} categories:`, 
    categories.map(c => `${c.name} (${c.slug})`).join(', '));

  // Define fixed categories with icons if data isn't loading correctly
  const fixedCategories = [
    {
      id: 1,
      name: 'Rolling Papers',
      slug: 'rolling-papers',
      description: 'Premium quality rolling papers for the perfect smoke',
      icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
    },
    {
      id: 2,
      name: 'Accessories',
      slug: 'accessories',
      description: 'Essential accessories for your smoking experience',
      icon: 'M13 10V3L4 14h7v7l9-11h-7z'
    },
    {
      id: 3,
      name: 'Bundles',
      slug: 'bundles',
      description: 'Save with our specially curated product bundles',
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
    },
    {
      id: 4,
      name: 'Special Edition',
      slug: 'special-edition',
      description: 'Limited edition RAW products with unique features and designs',
      icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
    }
  ];

  // Use database categories if available, otherwise use fixed categories
  const displayCategories = categories.length > 0 ? categories : fixedCategories;

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-white mb-4">Categories</h1>
            <p className="text-amber-100 text-xl">
              Browse our premium RAW products by category to find exactly what you're looking for.
            </p>
          </div>
        </div>
      </div>
      
      {/* Categories Grid */}
      <div className="container mx-auto px-4 py-16">
        {displayCategories.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p>No categories available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {displayCategories.map((category) => (
              <Link 
                key={category.id} 
                href={`/products?category=${category.slug}`}
                className="block"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-xl">
                  <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-300 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center transform rotate-12 transition-transform duration-300 hover:rotate-0">
                        {category.icon ? (
                          <svg className="w-12 h-12 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={category.icon} />
                          </svg>
                        ) : (
                          <span className="text-2xl font-bold text-amber-800">{category.name.charAt(0)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{category.name}</h3>
                    <p className="text-gray-600 mb-6">{category.description}</p>
                    
                    <div className="text-right">
                      <span className="inline-block px-4 py-2 bg-amber-500 text-white rounded-lg font-medium transition-transform hover:scale-105">
                        Browse Products
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Call to Action */}
      <div className="bg-gray-100 py-16 px-4 mt-8">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Can't Find What You're Looking For?</h2>
            <p className="text-gray-600 mb-8">
              We have a wide range of premium RAW products. If you prefer to see all products at once,
              you can browse our complete collection.
            </p>
            
            <Link href="/products">
              <span className="inline-block px-8 py-4 bg-amber-500 text-white font-bold rounded-full transition-transform hover:scale-105">
                View All Products
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 