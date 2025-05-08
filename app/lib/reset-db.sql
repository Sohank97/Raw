-- This script completely resets and rebuilds the database tables

-- Drop tables if they exist (to ensure clean setup)
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

-- Create the categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create the products table with category_id
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255),
  description TEXT NOT NULL,
  details TEXT,
  category_id INTEGER REFERENCES categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_slider BOOLEAN DEFAULT false
);

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
  ('Rolling Papers', 'rolling-papers', 'Premium quality rolling papers for the perfect smoke'),
  ('Accessories', 'accessories', 'Essential accessories for your smoking experience'),
  ('Bundles', 'bundles', 'Save with our specially curated product bundles'),
  ('Special Edition', 'special-edition', 'Limited edition RAW products with unique features and designs');

-- Insert sample products
INSERT INTO products (name, price, image_url, description, details, category_id) VALUES
  -- Original products (1-6)
  ('RAW Rolling Papers', 4.99, '/images/product-1.jpg', 'Classic unrefined rolling papers for the perfect smoke.', 'RAW Rolling Papers are made from unbleached fibers and are vegan-friendly. The natural brown color comes from the natural fibers used in the papermaking process.', 1),
  ('RAW Pre-Rolled Cones', 12.99, '/images/product-2.jpg', 'Ready to fill pre-rolled cones for convenience.', 'Pre-rolled for your convenience, these RAW cones are perfect for beginners or anyone looking to save time. Each cone is carefully crafted with the same unbleached paper as our classic rolling papers.', 1),
  ('RAW Rolling Tray', 24.99, '/images/product-3.jpg', 'Classic bamboo rolling tray with magnetic closure.', 'This bamboo rolling tray is designed to make rolling easier and less messy. The magnetic closure helps keep everything secure. Made from sustainable bamboo.', 2),
  ('RAW Rolling Machine', 9.99, '/images/product-4.jpg', 'Perfect rolling machine for consistent results every time.', 'The RAW rolling machine helps you create perfectly rolled cigarettes every time. Simple to use and produces consistent results even for beginners.', 2),
  ('RAW Tips', 2.99, '/images/product-5.jpg', 'Natural unrefined filter tips for a better experience.', 'RAW filter tips are made from unbleached paper. These tips help prevent burning your fingers and lips while providing a smooth draw.', 2),
  ('RAW Hemp Wick', 5.99, '/images/product-6.jpg', 'All-natural hemp wick coated with beeswax.', 'RAW hemp wick is made from hemp fibers coated in natural beeswax. It provides a cleaner way to light your smoking materials without inhaling butane from lighters.', 2),
  
  -- New products (7-12)
  ('RAW Black Rolling Papers', 6.99, '/images/product-7.jpg', 'Ultra thin premium black rolling papers for the smoothest experience.', 'RAW Black papers are the thinnest rolling papers we produce. Made from unbleached fibers and designed for the connoisseur who prefers a notably thin, smooth smoking experience.', 1),
  ('RAW Organic Hemp Papers', 5.49, '/images/product-8.jpg', 'Pure organic hemp rolling papers with natural gum.', 'RAW Organic Hemp papers are made from pure hemp and use natural tree sap gum. These papers are unrefined, chlorine-free, and additive-free for a pure hemp smoking experience.', 1),
  ('RAW Starter Bundle', 19.99, '/images/product-9.jpg', 'Everything you need to get started with RAW products.', 'This starter bundle includes classic RAW rolling papers, filter tips, a small rolling tray, and a rolling machine. Perfect for beginners or as a gift for RAW enthusiasts.', 3),
  ('RAW Connoisseur Bundle', 39.99, '/images/product-10.jpg', 'Premium collection of essential RAW products for enthusiasts.', 'Our connoisseur bundle includes RAW Black papers, organic hemp papers, premium filter tips, a large bamboo rolling tray, and a hemp wick. The ultimate RAW experience in one package.', 3),
  ('RAW Gold Limited Edition Papers', 15.99, '/images/product-11.jpg', 'Exclusive 24K gold-dipped rolling papers for special occasions.', 'These limited edition papers feature 24K gold leaf on the edges, making them perfect for celebrations and special moments. Each pack comes in a collector''s tin and includes a certificate of authenticity.', 4),
  ('RAW Crystal Glass Rolling Tray', 59.99, '/images/product-12.jpg', 'Luxury crystal glass rolling tray with RAW logo engraving.', 'This special edition crystal glass rolling tray features an etched RAW logo and polished edges. Each tray is handcrafted from premium crystal glass and comes in a velvet-lined box. A true statement piece for collectors.', 4);

-- Check if the column exists, if not add it
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                 WHERE table_name='products' AND column_name='is_slider') THEN
        ALTER TABLE products ADD COLUMN is_slider BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Reset any existing is_slider values
UPDATE products SET is_slider = false;

-- Set some products to appear in the slider
UPDATE products SET is_slider = true WHERE id IN (1, 2, 3); 