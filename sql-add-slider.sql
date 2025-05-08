-- Add is_slider column to products table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'products'
        AND column_name = 'is_slider'
    ) THEN
        ALTER TABLE products ADD COLUMN is_slider BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Set some products to show in slider
UPDATE products SET is_slider = false;
UPDATE products SET is_slider = true WHERE id IN (3, 4, 7); 