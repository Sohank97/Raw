const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://llemtaohxtjwwhwsnejr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZW10YW9oeHRqd3dod3NuZWpyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjY0MjA1MiwiZXhwIjoyMDYyMjE4MDUyfQ.dC2A4uPG6jn_Y-qtKIezPs1NxEeJ6-Vvf9dYa4sZNk0';

// Create a single supabase client for the entire app
const supabase = createClient(supabaseUrl, supabaseKey);

async function executeSQL(sql) {
  try {
    const { data, error } = await supabase.rpc('execute_sql', { sql_query: sql });
    if (error) throw error;
    return data;
  } catch (error) {
    // If the function doesn't exist, we'll create it
    if (error.message && error.message.includes('function execute_sql() does not exist')) {
      try {
        // Create the function if it doesn't exist
        const createFunctionSQL = `
          CREATE OR REPLACE FUNCTION execute_sql(sql_query TEXT)
          RETURNS VOID
          LANGUAGE plpgsql
          SECURITY DEFINER
          AS $$
          BEGIN
            EXECUTE sql_query;
          END;
          $$;
        `;
        
        const { error: createError } = await supabase.from('_rpc').select().limit(1);
        if (createError) throw createError;
        
        // Try running the original query again
        return executeSQL(sql);
      } catch (err) {
        console.error('Error creating SQL execution function:', err);
        throw err;
      }
    } else {
      throw error;
    }
  }
}

async function updateDatabase() {
  console.log('Updating database for product slider feature...');

  try {
    // Attempt to add the is_slider column if it doesn't exist
    console.log('Adding is_slider column to products table (if it doesn\'t exist)...');
    const alterTableSQL = `
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name='products' AND column_name='is_slider'
        ) THEN
          ALTER TABLE products ADD COLUMN is_slider BOOLEAN DEFAULT false;
        END IF;
      END;
      $$;
    `;
    
    try {
      await executeSQL(alterTableSQL);
      console.log('Column added successfully or already exists.');
    } catch (error) {
      console.error('Error adding column:', error.message);
      
      // Try a direct approach if the previous approach failed
      console.log('Trying direct ALTER TABLE...');
      try {
        await supabase.postgrest.rpc('execute_sql', {
          sql_query: 'ALTER TABLE products ADD COLUMN IF NOT EXISTS is_slider BOOLEAN DEFAULT false;'
        });
        console.log('Direct ALTER TABLE successful.');
      } catch (directError) {
        console.error('Direct ALTER TABLE failed:', directError.message);
        // Continue with the rest of the function even if this fails
      }
    }

    // Update the database directly without the stored procedure
    console.log('Updating products in the database directly...');
    
    // Reset all products to not be in slider
    console.log('Resetting all products to not be in slider...');
    const { error: resetError } = await supabase
      .from('products')
      .update({ is_slider: false })
      .neq('id', 0);
    
    if (resetError) {
      // If the column doesn't exist, don't treat it as an error
      if (resetError.message && resetError.message.includes('does not exist')) {
        console.log('Column doesn\'t exist yet, proceeding anyway.');
      } else {
        throw new Error(`Error resetting products: ${resetError.message}`);
      }
    } else {
      console.log('All products reset successfully.');
      
      // Set specific products to be in the slider
      console.log('Setting selected products to appear in slider...');
      const { error: updateError } = await supabase
        .from('products')
        .update({ is_slider: true })
        .in('id', [3, 4, 7]);
      
      if (updateError) {
        throw new Error(`Error updating products: ${updateError.message}`);
      }
      
      console.log('Products updated successfully!');
    }

    console.log('Database update process completed.');
  } catch (error) {
    console.error('Error updating database:', error.message);
  }
}

// Run the function
updateDatabase();

 