import { supabase } from './supabase';
import type { Product } from './supabase';

// Sample product data
const productData: Omit<Product, 'id' | 'created_at'>[] = [
  {
    name: 'RAW Rolling Papers',
    price: 4.99,
    image_url: '/images/product-1.jpg',
    description: 'Classic unrefined rolling papers for the perfect smoke.',
    details: 'RAW Rolling Papers are made from unbleached fibers and are vegan-friendly. The natural brown color comes from the natural fibers used in the papermaking process.',
  },
  {
    name: 'RAW Pre-Rolled Cones',
    price: 12.99,
    image_url: '/images/product-2.jpg',
    description: 'Ready to fill pre-rolled cones for convenience.',
    details: 'Pre-rolled for your convenience, these RAW cones are perfect for beginners or anyone looking to save time. Each cone is carefully crafted with the same unbleached paper as our classic rolling papers.',
  },
  {
    name: 'RAW Rolling Tray',
    price: 24.99,
    image_url: '/images/product-3.jpg',
    description: 'Classic bamboo rolling tray with magnetic closure.',
    details: 'This bamboo rolling tray is designed to make rolling easier and less messy. The magnetic closure helps keep everything secure. Made from sustainable bamboo.',
  },
  {
    name: 'RAW Rolling Machine',
    price: 9.99,
    image_url: '/images/product-4.jpg',
    description: 'Perfect rolling machine for consistent results every time.',
    details: 'The RAW rolling machine helps you create perfectly rolled cigarettes every time. Simple to use and produces consistent results even for beginners.',
  },
  {
    name: 'RAW Tips',
    price: 2.99,
    image_url: '/images/product-5.jpg',
    description: 'Natural unrefined filter tips for a better experience.',
    details: 'RAW filter tips are made from unbleached paper. These tips help prevent burning your fingers and lips while providing a smooth draw.',
  },
  {
    name: 'RAW Hemp Wick',
    price: 5.99,
    image_url: '/images/product-6.jpg',
    description: 'All-natural hemp wick coated with beeswax.',
    details: 'RAW hemp wick is made from hemp fibers coated in natural beeswax. It provides a cleaner way to light your smoking materials without inhaling butane from lighters.',
  },
];

async function setupDatabase() {
  try {
    console.log('Setting up the Supabase database...');
    
    // First check if products table exists and has data
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('id')
      .limit(1);
    
    if (!checkError && existingProducts && existingProducts.length > 0) {
      console.log('Products table already contains data. Skipping setup.');
      return;
    }
    
    // Insert products
    console.log('Inserting product data...');
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select();
    
    if (error) {
      console.error('Error inserting products:', error);
      return;
    }
    
    console.log(`Successfully inserted ${data.length} products.`);
    data.forEach(product => {
      console.log(`- ID ${product.id}: ${product.name} ($${product.price})`);
    });
    
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

// Run the setup function
setupDatabase(); 