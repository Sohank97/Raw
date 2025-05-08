export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  details: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'RAW Rolling Papers',
    price: 4.99,
    image: '/images/product-1.jpg',
    description: 'Classic unrefined rolling papers for the perfect smoke.',
    details: 'RAW Rolling Papers are made from unbleached fibers and are vegan-friendly. The natural brown color comes from the natural fibers used in the papermaking process.',
  },
  {
    id: 2,
    name: 'RAW Pre-Rolled Cones',
    price: 12.99,
    image: '/images/product-2.jpg',
    description: 'Ready to fill pre-rolled cones for convenience.',
    details: 'Pre-rolled for your convenience, these RAW cones are perfect for beginners or anyone looking to save time. Each cone is carefully crafted with the same unbleached paper as our classic rolling papers.',
  },
  {
    id: 3,
    name: 'RAW Rolling Tray',
    price: 24.99,
    image: '/images/product-3.jpg',
    description: 'Classic bamboo rolling tray with magnetic closure.',
    details: 'This bamboo rolling tray is designed to make rolling easier and less messy. The magnetic closure helps keep everything secure. Made from sustainable bamboo.',
  },
  {
    id: 4,
    name: 'RAW Rolling Machine',
    price: 9.99,
    image: '/images/product-4.jpg',
    description: 'Perfect rolling machine for consistent results every time.',
    details: 'The RAW rolling machine helps you create perfectly rolled cigarettes every time. Simple to use and produces consistent results even for beginners.',
  },
  {
    id: 5,
    name: 'RAW Tips',
    price: 2.99,
    image: '/images/product-5.jpg',
    description: 'Natural unrefined filter tips for a better experience.',
    details: 'RAW filter tips are made from unbleached paper. These tips help prevent burning your fingers and lips while providing a smooth draw.',
  },
  {
    id: 6,
    name: 'RAW Hemp Wick',
    price: 5.99,
    image: '/images/product-6.jpg',
    description: 'All-natural hemp wick coated with beeswax.',
    details: 'RAW hemp wick is made from hemp fibers coated in natural beeswax. It provides a cleaner way to light your smoking materials without inhaling butane from lighters.',
  },
]; 