import { products } from '../../data/products';

export default function ProductPage({ params }: { params: { id: string } }) {
  const productId = parseInt(params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p>Sorry, the product you're looking for doesn't exist.</p>
        <a href="/products" className="btn inline-block mt-4">Back to Products</a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <a href="/products" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to Products
      </a>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        {/* Product Image */}
        <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center text-gray-500">
          Product Image
        </div>
        
        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
            <p className="text-gray-700">{product.details}</p>
          </div>
          
          <button className="btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
} 