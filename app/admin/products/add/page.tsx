'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';
import type { Category } from '../../../lib/supabase';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    details: '',
    image_url: '/images/product-placeholder.jpg', // Default placeholder image
    category_id: '',
    is_slider: false
  });

  useEffect(() => {
    // Fetch categories when component mounts
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
      
      // Set default category if available
      if (data && data.length > 0) {
        setFormData(prev => ({ ...prev, category_id: data[0].id.toString() }));
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Convert string values to appropriate types
      const price = parseFloat(formData.price);
      const category_id = parseInt(formData.category_id);

      if (isNaN(price) || price <= 0) {
        throw new Error('Please enter a valid price');
      }

      if (isNaN(category_id)) {
        throw new Error('Please select a category');
      }

      // Insert new product into Supabase
      const { data, error } = await supabase
        .from('products')
        .insert([
          { 
            name: formData.name,
            price,
            description: formData.description,
            details: formData.details,
            image_url: formData.image_url,
            category_id,
            is_slider: formData.is_slider
          }
        ])
        .select();

      if (error) throw error;

      // Redirect to product management page on success
      router.push('/admin/products');
    } catch (err: any) {
      console.error('Error adding product:', err);
      setError(err.message || 'Failed to add product');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Name */}
            <div className="col-span-2">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Product Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="RAW Rolling Papers"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
                Price ($)*
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="4.99"
                step="0.01"
                min="0.01"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category_id" className="block text-gray-700 font-medium mb-2">
                Category*
              </label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div className="col-span-2">
              <label htmlFor="image_url" className="block text-gray-700 font-medium mb-2">
                Image URL
              </label>
              <input
                type="text"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="/images/product-1.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Leave as default for placeholder image. In a real application, you would upload images to storage.
              </p>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                Short Description*
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="A brief description of the product"
                required
              ></textarea>
            </div>

            {/* Details */}
            <div className="col-span-2">
              <label htmlFor="details" className="block text-gray-700 font-medium mb-2">
                Full Details
              </label>
              <textarea
                id="details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Detailed product information"
              ></textarea>
            </div>
            
            {/* Is Slider */}
            <div className="col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_slider"
                  name="is_slider"
                  checked={formData.is_slider}
                  onChange={handleChange}
                  className="w-4 h-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                />
                <label htmlFor="is_slider" className="ml-2 block text-gray-700 font-medium">
                  Show in homepage slider
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                If checked, this product will appear in the homepage slider.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <Link href="/admin/products">
              <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium">
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-medium flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                'Add Product'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 