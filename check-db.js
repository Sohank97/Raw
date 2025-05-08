const { createClient } = require('@supabase/supabase-js');

// Supabase connection details
const supabaseUrl = 'https://llemtaohxtjwwhwsnejr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZW10YW9oeHRqd3dod3NuZWpyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjY0MjA1MiwiZXhwIjoyMDYyMjE4MDUyfQ.dC2A4uPG6jn_Y-qtKIezPs1NxEeJ6-Vvf9dYa4sZNk0';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  try {
    console.log('Checking Supabase database content...');
    
    // Check categories
    console.log('\nFetching categories:');
    const { data: categories, error: categoryError } = await supabase
      .from('categories')
      .select('*')
      .order('id');
    
    if (categoryError) {
      console.error('Error fetching categories:', categoryError);
    } else {
      console.log(`Found ${categories.length} categories:`);
      categories.forEach(category => {
        console.log(`- ID ${category.id}: ${category.name} (slug: ${category.slug})`);
      });
    }
    
    // Check products
    console.log('\nFetching products:');
    const { data: products, error: productError } = await supabase
      .from('products')
      .select('*, categories(*)')
      .order('id');
    
    if (productError) {
      console.error('Error fetching products:', productError);
    } else {
      console.log(`Found ${products.length} products:`);
      products.forEach(product => {
        console.log(`- ID ${product.id}: ${product.name} (category: ${product.categories?.name || 'Unknown'})`);
      });
    }
    
    console.log('\nDatabase check completed!');
  } catch (error) {
    console.error('Error checking database:', error);
  }
}

// Run the check function
checkDatabase(); 