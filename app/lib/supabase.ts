import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://llemtaohxtjwwhwsnejr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsZW10YW9oeHRqd3dod3NuZWpyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjY0MjA1MiwiZXhwIjoyMDYyMjE4MDUyfQ.dC2A4uPG6jn_Y-qtKIezPs1NxEeJ6-Vvf9dYa4sZNk0';

// Create a single supabase client for the entire app
export const supabase = createClient(supabaseUrl, supabaseKey);

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at?: string;
  icon?: string; // Optional icon path property
}

export type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  details: string;
  category_id: number;
  category?: Category;
  created_at?: string;
  is_slider: boolean;
}

// Function to fetch all categories
export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data || [];
}

// Function to fetch a single category by slug
export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error(`Error fetching category with slug ${slug}:`, error);
    return null;
  }
  
  return data;
}

// Function to fetch all products
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .order('id');
  
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  
  // Transform the data to match our Product type
  return data.map(item => ({
    ...item,
    category: item.categories
  })) || [];
}

// Function to fetch products by category slug
export async function fetchProductsByCategory(categorySlug: string): Promise<Product[]> {
  const { data: category, error: categoryError } = await supabase
    .from('categories')
    .select('id')
    .eq('slug', categorySlug)
    .single();
  
  if (categoryError || !category) {
    console.error(`Error fetching category with slug ${categorySlug}:`, categoryError);
    return [];
  }
  
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('category_id', category.id)
    .order('id');
  
  if (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error);
    return [];
  }
  
  // Transform the data to match our Product type
  return data.map(item => ({
    ...item,
    category: item.categories
  })) || [];
}

// Function to fetch a single product by ID
export async function fetchProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
  
  // Transform the data to match our Product type
  return {
    ...data,
    category: data.categories
  };
}

// Function to fetch products for slider
export async function fetchSliderProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('is_slider', true)
    .order('id');
  
  if (error) {
    console.error('Error fetching slider products:', error);
    return [];
  }
  
  // Transform the data to match our Product type
  return data.map(item => ({
    ...item,
    category: item.categories
  })) || [];
} 