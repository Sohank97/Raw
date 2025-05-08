import Link from 'next/link';
import { fetchProductById, fetchProductsByCategory } from '../../lib/supabase';
import { notFound } from 'next/navigation';
import AddToCartButton from '../../components/AddToCartButton';

// Make the page dynamic
export const dynamicParams = 'force-dynamic';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  
  // Fetch product from Supabase
  const product = await fetchProductById(productId);

  if (!product) {
    // Return 404 not found page if product doesn't exist
    notFound();
  }
  
  // Fetch related products from the same category
  const relatedProducts = await fetchProductsByCategory(product.category?.slug || '');
  
  // Filter out the current product and limit to 3 related products
  const filteredRelatedProducts = relatedProducts
    .filter(relatedProduct => relatedProduct.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Link href="/products">
        <span className="inline-flex items-center text-amber-600 hover:text-amber-800 mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Products
        </span>
      </Link>
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image with 3D effect */}
          <div className="relative bg-gradient-to-br from-amber-50 to-amber-100 p-8 flex items-center justify-center">
            <div className="relative w-80 h-80 perspective">
              <div className="w-full h-full transform hover:rotate-y-6 transition-transform duration-500">
                <div className="absolute w-full h-full bg-amber-100 rounded-xl transform rotate-3 scale-95 shadow-lg">
                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-amber-800">
                    RAW
                  </div>
                </div>
                <div className="absolute w-full h-full bg-white rounded-xl p-4 flex items-center justify-center">
                  <div className="text-3xl font-bold text-amber-700">{product.name}</div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-amber-400 rounded-full opacity-40 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-amber-600 rounded-full opacity-30 animate-bounce"></div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="p-6">
            {/* Category Badge */}
            {product.category && (
              <Link href={`/products?category=${product.category.slug}`}>
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm mb-3 hover:bg-amber-200 transition-colors">
                  {product.category.name}
                </span>
              </Link>
            )}
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-amber-600 mr-4">${product.price.toFixed(2)}</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">In Stock</span>
            </div>
            
            <p className="text-gray-700 mb-8">{product.description}</p>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Product Details</h2>
              <p className="text-gray-700">{product.details}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="font-medium text-gray-800">Material</div>
                <div className="text-gray-600">Organic hemp</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="font-medium text-gray-800">Origin</div>
                <div className="text-gray-600">Spain</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="font-medium text-gray-800">Type</div>
                <div className="text-gray-600">Natural unbleached</div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="font-medium text-gray-800">Sustainable</div>
                <div className="text-gray-600">Yes</div>
              </div>
            </div>
            
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {filteredRelatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredRelatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:-translate-y-2 hover:shadow-xl">
                  <div className="h-40 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-24 h-24 bg-white rounded-lg shadow-md flex items-center justify-center transform rotate-12 transition-transform duration-300 hover:rotate-0">
                        <span className="text-xl font-bold text-amber-800">RAW</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold mb-1 text-gray-800">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{relatedProduct.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-amber-600">${relatedProduct.price.toFixed(2)}</span>
                      <span className="text-sm text-amber-500">View Details →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 