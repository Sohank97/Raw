# RAW Shop

A simple e-commerce store for RAW products built with Next.js and Tailwind CSS.

## Features

- Home page with featured products
- Products catalog page
- Individual product details page
- Responsive design for all screen sizes
- Static product data (for demonstration)

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

- `/`: Home page with featured products
- `/products`: All products catalog
- `/products/[id]`: Individual product details

## Project Structure

- `app/layout.tsx`: Root layout with header and footer
- `app/page.tsx`: Home page
- `app/products/page.tsx`: Products catalog
- `app/products/[id]/page.tsx`: Product details page
- `app/data/products.ts`: Static product data

## Technologies Used

- Next.js 14
- React
- TypeScript
- Tailwind CSS 