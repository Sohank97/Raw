import Link from 'next/link';
import { products } from '../data/products';

export default function ProductsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
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
    </div>
  );
} 