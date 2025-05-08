import Link from 'next/link';
import { products } from './data/products';

// Get just the first 3 products for the featured section
const featuredProducts = products.slice(0, 3);

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-100 py-12 mb-12 rounded-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to RAW Shop</h1>
          <p className="text-xl mb-6">Premium rolling products for the perfect experience</p>
          <Link href="/products">
            <span className="btn">Shop All Products</span>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="card">
              <div className="p-4">
                <div className="bg-gray-200 h-48 rounded mb-4">
                  {/* Replace with actual images when available */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Product Image
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  <Link href={`/products/${product.id}`}>
                    <span className="btn">View Details</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 