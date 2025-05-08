import { Product } from '../lib/supabase';
import ClientProductCard from './ClientProductCard';

export default function ProductCard({ product }: { product: Product }) {
  return <ClientProductCard product={product} />;
} 