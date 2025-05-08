import { Product } from '../lib/supabase';
import ClientAddToCartButton from './ClientAddToCartButton';

export default function AddToCartButton({ product }: { product: Product }) {
  return <ClientAddToCartButton product={product} />;
} 