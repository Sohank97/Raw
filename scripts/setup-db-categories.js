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
  },
  {
    name: 'Special Edition',
    slug: 'special-edition',
    description: 'Limited edition RAW products with unique features and designs'
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
  {
    name: 'RAW Black Rolling Papers',
    price: 6.99,
    image_url: '/images/product-7.jpg',
    description: 'Ultra thin premium black rolling papers for the smoothest experience.',
    details: 'RAW Black papers are the thinnest rolling papers we produce. Made from unbleached fibers and designed for the connoisseur who prefers a notably thin, smooth smoking experience.',
    category_id: 1 // Rolling Papers
  },
  {
    name: 'RAW Organic Hemp Papers',
    price: 5.49,
    image_url: '/images/product-8.jpg',
    description: 'Pure organic hemp rolling papers with natural gum.',
    details: 'RAW Organic Hemp papers are made from pure hemp and use natural tree sap gum. These papers are unrefined, chlorine-free, and additive-free for a pure hemp smoking experience.',
    category_id: 1 // Rolling Papers
  },
  {
    name: 'RAW Starter Bundle',
    price: 19.99,
    image_url: '/images/product-9.jpg',
    description: 'Everything you need to get started with RAW products.',
    details: 'This starter bundle includes classic RAW rolling papers, filter tips, a small rolling tray, and a rolling machine. Perfect for beginners or as a gift for RAW enthusiasts.',
    category_id: 3 // Bundles
  },
  {
    name: 'RAW Connoisseur Bundle',
    price: 39.99,
    image_url: '/images/product-10.jpg',
    description: 'Premium collection of essential RAW products for enthusiasts.',
    details: 'Our connoisseur bundle includes RAW Black papers, organic hemp papers, premium filter tips, a large bamboo rolling tray, and a hemp wick. The ultimate RAW experience in one package.',
    category_id: 3 // Bundles
  },
  {
    name: 'RAW Gold Limited Edition Papers',
    price: 15.99,
    image_url: '/images/product-11.jpg',
    description: 'Exclusive 24K gold-dipped rolling papers for special occasions.',
    details: 'These limited edition papers feature 24K gold leaf on the edges, making them perfect for celebrations and special moments. Each pack comes in a collector\'s tin and includes a certificate of authenticity.',
    category_id: 4 // Special Edition
  },
  {
    name: 'RAW Crystal Glass Rolling Tray',
    price: 59.99,
    image_url: '/images/product-12.jpg',
    description: 'Luxury crystal glass rolling tray with RAW logo engraving.',
    details: 'This special edition crystal glass rolling tray features an etched RAW logo and polished edges. Each tray is handcrafted from premium crystal glass and comes in a velvet-lined box. A true statement piece for collectors.',
    category_id: 4 // Special Edition
  }
];

async function setupDatabase() {
  try {
    console.log('Setting up the Supabase database...');
    
    // First create categories
    console.log('Inserting category data...');
    const { data: categoryResult, error: categoryError } = await supabase
      .from('categories')
      .insert(categoryData)
      .select();
    
    if (categoryError) {
      console.error('Error inserting categories:', categoryError);
      return;
    }
    
    console.log(`Successfully inserted ${categoryResult?.length || 0} categories.`);
    
    // Then insert products
    console.log('Inserting product data...');
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select();
    
    if (error) {
      console.error('Error inserting products:', error);
      return;
    }
    
    console.log(`Successfully inserted ${data?.length || 0} products.`);
    data?.forEach(product => {
      console.log(`- ID ${product.id}: ${product.name} ($${product.price})`);
    });
    
    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

// Run the setup function
setupDatabase(); 