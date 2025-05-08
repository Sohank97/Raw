// This script sets up the database with initial product data

const { createClient } = require('@supabase/supabase-js');

// Supabase connection details
const supabaseUrl = 'https://llemtaohxtjwwhwsnejr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZW10YW9oeHRqd3dod3NuZWpyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjY0MjA1MiwiZXhwIjoyMDYyMjE4MDUyfQ.dC2A4uPG6jn_Y-qtKIezPs1NxEeJ6-Vvf9dYa4sZNk0';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Sample category data
const categoryData = [
  {
    name: 'Rolling Papers',
    slug: 'rolling-papers',
    description: 'Premium quality rolling papers for the perfect smoke'
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    description: 'Essential accessories for your smoking experience'
  },
  {
    name: 'Bundles',
    slug: 'bundles',
    description: 'Save with our specially curated product bundles'
  }
];

// Sample product data
const productData = [
  {
    name: 'RAW Rolling Papers',
    price: 4.99,
    image_url: '/images/product-1.jpg',
    description: 'Classic unrefined rolling papers for the perfect smoke.',
    details: 'RAW Rolling Papers are made from unbleached fibers and are vegan-friendly. The natural brown color comes from the natural fibers used in the papermaking process.',
    category_id: 1 // Will be linked to 'Rolling Papers'
  },
  {
    name: 'RAW Pre-Rolled Cones',
    price: 12.99,
    image_url: '/images/product-2.jpg',
    description: 'Ready to fill pre-rolled cones for convenience.',
    details: 'Pre-rolled for your convenience, these RAW cones are perfect for beginners or anyone looking to save time. Each cone is carefully crafted with the same unbleached paper as our classic rolling papers.',
    category_id: 1 // Will be linked to 'Rolling Papers'
  },
  {
    name: 'RAW Rolling Tray',
    price: 24.99,
    image_url: '/images/product-3.jpg',
    description: 'Classic bamboo rolling tray with magnetic closure.',
    details: 'This bamboo rolling tray is designed to make rolling easier and less messy. The magnetic closure helps keep everything secure. Made from sustainable bamboo.',
    category_id: 2 // Will be linked to 'Accessories'
  },
  {
    name: 'RAW Rolling Machine',
    price: 9.99,
    image_url: '/images/product-4.jpg',
    description: 'Perfect rolling machine for consistent results every time.',
    details: 'The RAW rolling machine helps you create perfectly rolled cigarettes every time. Simple to use and produces consistent results even for beginners.',
    category_id: 2 // Will be linked to 'Accessories'
  },
  {
    name: 'RAW Tips',
    price: 2.99,
    image_url: '/images/product-5.jpg',
    description: 'Natural unrefined filter tips for a better experience.',
    details: 'RAW filter tips are made from unbleached paper. These tips help prevent burning your fingers and lips while providing a smooth draw.',
    category_id: 2 // Will be linked to 'Accessories'
  },
  {
    name: 'RAW Hemp Wick',
    price: 5.99,
    image_url: '/images/product-6.jpg',
    description: 'All-natural hemp wick coated with beeswax.',
    details: 'RAW hemp wick is made from hemp fibers coated in natural beeswax. It provides a cleaner way to light your smoking materials without inhaling butane from lighters.',
    category_id: 2 // Will be linked to 'Accessories'
  },
];

async function setupDatabase() {
  try {
    console.log('Setting up the Supabase database...');
    
    // First check if tables exist
    const { data: existingCategories, error: checkCategoryError } = await supabase
      .from('categories')
      .select('id')
      .limit(1);
    
    if (checkCategoryError) {
      // Tables might not exist yet, we'll create them
      console.log('Creating tables...');
      
      // Create categories table
      const createCategoriesTableSQL = `
        CREATE TABLE IF NOT EXISTS categories (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
      
      // Create products table with category_id foreign key
      const createProductsTableSQL = `
        CREATE TABLE IF NOT EXISTS products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL,
          image_url VARCHAR(255),
          description TEXT NOT NULL,
          details TEXT,
          category_id INTEGER REFERENCES categories(id),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `;
      
      // Use the SQL API to create the tables
      await supabase.rpc('exec_sql', { sql: createCategoriesTableSQL });
      await supabase.rpc('exec_sql', { sql: createProductsTableSQL });
      
      console.log('Tables created successfully.');
    } else if (existingCategories && existingCategories.length > 0) {
      console.log('Tables already exist. Continuing anyway...');
    }
    
    // Insert categories first
    console.log('Inserting category data...');
    const { data: categoryResult, error: categoryError } = await supabase
      .from('categories')
      .insert(categoryData)
      .select();
    
    if (categoryError) {
      console.error('Error inserting categories:', categoryError);
      return;
    }
    
    console.log(`Successfully inserted ${categoryResult.length} categories.`);
    
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
    
    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

// Run the setup function
setupDatabase(); 