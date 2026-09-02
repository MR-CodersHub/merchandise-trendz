/**
 * Print-on-Demand Products Database
 */

export const products = [
  {
    id: 'prod-01',
    name: 'Heavyweight Premium Cotton T-Shirt',
    category: 'apparel',
    categoryLabel: 'Custom Apparel',
    basePrice: 19.99,
    bulkPrice: 12.50,
    tag: 'Best Seller',
    rating: 4.9,
    reviewsCount: 428,
    colors: ['#FFFFFF', '#111111', '#FFB800', '#2563EB', '#4B5563'],
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    description: '100% Ring-spun combed organic cotton (240 GSM). High-definition Direct-to-Garment (DTG) print with ultra-sharp details and zero wash fade.',
    printLocations: ['Front Chest', 'Back Full', 'Left Sleeve']
  },
  {
    id: 'prod-02',
    name: 'Oversized Streetwear Fleece Hoodie',
    category: 'apparel',
    categoryLabel: 'Custom Apparel',
    basePrice: 42.00,
    bulkPrice: 28.00,
    tag: 'Trending',
    rating: 5.0,
    reviewsCount: 312,
    colors: ['#FFFFFF', '#111111', '#E5E7EB', '#D97706'],
    sizes: ['M', 'L', 'XL', '2XL'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    description: 'Ultra-soft 380 GSM brushed fleece with double-lined hood, kangaroo pouch, and reinforced ribbed cuffs. Perfect for branded drops.',
    printLocations: ['Front Center', 'Back Poster', 'Hood Edge']
  },
  {
    id: 'prod-03',
    name: 'Matte Ceramic Coffee Mug (15oz)',
    category: 'drinkware',
    categoryLabel: 'Drinkware & Mugs',
    basePrice: 14.50,
    bulkPrice: 7.90,
    tag: 'Top Gift',
    rating: 4.8,
    reviewsCount: 195,
    colors: ['#FFFFFF', '#111111', '#FFB800'],
    sizes: ['11oz', '15oz'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    description: 'Premium ceramic with ergonomic C-handle. 360-degree all-around dye-sublimation print, microwave & dishwasher safe.',
    printLocations: ['Full Wrap 360°', 'Front Logo', 'Double Sided']
  },
  {
    id: 'prod-04',
    name: 'Heavy Duty Organic Canvas Tote Bag',
    category: 'accessories',
    categoryLabel: 'Bags & Accessories',
    basePrice: 16.00,
    bulkPrice: 8.50,
    tag: 'Eco Friendly',
    rating: 4.9,
    reviewsCount: 260,
    colors: ['#F3F4F6', '#111111', '#FEF3C7'],
    sizes: ['Standard (15x16 in)', 'Large Gusset'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    description: '12oz durable organic canvas with reinforced cross-stitched handles. Crisp vector screen-printing with eco-friendly water-based inks.',
    printLocations: ['Front Center', 'Double Sided']
  },
  {
    id: 'prod-05',
    name: 'Impact Armor MagSafe Phone Case',
    category: 'tech',
    categoryLabel: 'Phone Cases & Tech',
    basePrice: 22.00,
    bulkPrice: 13.00,
    tag: 'High Margin',
    rating: 4.9,
    reviewsCount: 540,
    colors: ['#111111', '#FFFFFF', '#FFB800'],
    sizes: ['iPhone 16 Pro', 'iPhone 15', 'Galaxy S24 Ultra', 'Pixel 9 Pro'],
    image: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80',
    description: 'Dual-layer shockproof polycarbonate with raised camera ring. Glossy UV scratch-resistant wrap-around artwork finish.',
    printLocations: ['Back Full Bleed', 'Matte Edge']
  },
  {
    id: 'prod-06',
    name: 'Vintage Washed Cotton Bucket Hat',
    category: 'accessories',
    categoryLabel: 'Headwear',
    basePrice: 24.00,
    bulkPrice: 14.20,
    tag: 'New Drop',
    rating: 4.7,
    reviewsCount: 88,
    colors: ['#D1D5DB', '#111111', '#FEF08A'],
    sizes: ['One Size Fits All'],
    image: 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=800&q=80',
    description: '100% enzyme-washed cotton twill with brass eyelets for breathability. 3D high-density embroidered patch or flat print.',
    printLocations: ['Front Center 3D Embroidery']
  },
  {
    id: 'prod-07',
    name: 'Vacuum Insulated Stainless Tumbler (20oz)',
    category: 'drinkware',
    categoryLabel: 'Drinkware & Mugs',
    basePrice: 28.00,
    bulkPrice: 16.50,
    tag: 'Popular',
    rating: 4.9,
    reviewsCount: 168,
    colors: ['#FFFFFF', '#111111', '#E5E7EB'],
    sizes: ['20oz', '30oz'],
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    description: 'Double-wall vacuum insulation keeps drinks ice cold for 24h or piping hot for 12h. Precision laser engraving & UV color prints.',
    printLocations: ['Laser Etch Front', 'Color UV Print']
  },
  {
    id: 'prod-08',
    name: 'Die-Cut Holographic & Vinyl Sticker Pack',
    category: 'accessories',
    categoryLabel: 'Bags & Accessories',
    basePrice: 9.99,
    bulkPrice: 2.80,
    tag: 'Quick Turnaround',
    rating: 5.0,
    reviewsCount: 710,
    colors: ['#FFB800', '#FFFFFF'],
    sizes: ['50 Pack', '100 Pack', '500 Bulk'],
    image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=800&q=80',
    description: 'Weatherproof vinyl stickers with UV lamination. Thick, durable, scratch-resistant and dishwasher proof.',
    printLocations: ['Custom Cut Shape']
  }
];

export const sampleArtworks = [
  {
    id: 'art-1',
    name: 'Retro Sunrise Wave',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="44" fill="#FFB800"/><path d="M15 65C30 55 40 75 55 60C70 45 80 65 85 55V85H15V65Z" fill="#111111"/><circle cx="50" cy="35" r="14" fill="#FFFFFF"/><path d="M22 80H78" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/></svg>`
  },
  {
    id: 'art-2',
    name: 'Urban Cyber Skull',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" rx="16" fill="#111111"/><circle cx="36" cy="42" r="8" fill="#FFB800"/><circle cx="64" cy="42" r="8" fill="#FFB800"/><path d="M35 68H65" stroke="#FFB800" stroke-width="5" stroke-linecap="round"/><path d="M42 60V76M50 60V76M58 60V76" stroke="#111111" stroke-width="3"/></svg>`
  },
  {
    id: 'art-3',
    name: 'Tokyo Street Typo',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="12" fill="#18181B"/><text x="50" y="44" font-family="sans-serif" font-weight="900" font-size="20" fill="#FFB800" text-anchor="middle">CREATIVE</text><text x="50" y="68" font-family="sans-serif" font-weight="800" font-size="14" fill="#FFFFFF" text-anchor="middle">STUDIO 26</text></svg>`
  },
  {
    id: 'art-4',
    name: 'Minimalist Monogram',
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="42" stroke="#FFB800" stroke-width="4"/><text x="50" y="62" font-family="serif" font-weight="900" font-size="36" fill="#111111" text-anchor="middle">3A</text></svg>`
  }
];
