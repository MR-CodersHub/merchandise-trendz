/**
 * TrendZ Services & Solutions Comprehensive Database
 */

export const servicesData = [
  {
    id: 'dtg-printing',
    title: 'Direct-to-Garment (DTG) HD Printing',
    category: 'Apparel Technology',
    subtitle: 'Ultra-vibrant, museum-grade photorealistic prints directly into garment fibers with zero setup fees.',
    icon: '',
    badge: 'Flagship Service',
    rating: 4.9,
    reviewsCount: 520,
    turnaround: '24 - 48 Hours',
    minOrder: '1 Piece (No Minimums)',
    heroImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    overview: 'Our industrial Direct-to-Garment printing utilizes Kornit Avalanche HD6 pigment technology with water-based neo-pigment inks. The inks penetrate directly into the textile fibers, resulting in an exceptionally soft hand-feel, breathable comfort, and ultra-durable wash fastness that retains vibrant color depth through 80+ wash cycles.',
    benefits: [
      { title: 'Unlimited Colors & Gradients', desc: 'No color count limitations or screen setup charges. Full RGB/CMYK spectrum supported with pinpoint 1200 DPI resolution.' },
      { title: 'Ultra-Soft Breathable Finish', desc: 'Water-based organic inks fuse into fabric fibers without stiff plastic layers or peeling.' },
      { title: 'On-Demand Zero Inventory', desc: 'Order a single custom sample or integrate seamlessly with your Shopify / WooCommerce store for automated dropshipping.' },
      { title: 'Eco-Friendly Inks', desc: '100% toxin-free, OEKO-TEX Eco-Passport certified biodegradable inks safe for infants and sensitive skin.' }
    ],
    technicalSpecs: [
      { key: 'Print Resolution', value: 'Up to 1200 x 1200 DPI' },
      { key: 'Compatible Fabrics', value: '100% Ring-spun Cotton, Cotton-Poly Blends (min 70% cotton), French Terry, Fleece' },
      { key: 'Max Print Area', value: '16 x 20 inches (40.6 x 50.8 cm)' },
      { key: 'Color Match Fidelity', value: 'Delta E < 1.5 against digital sRGB / Adobe RGB proof' },
      { key: 'Durability Standard', value: 'AATCC Class 4.5 wash fastness rating (80+ cycles)' }
    ],
    pricingTiers: [
      {
        tier: 'Sample & Creator Single',
        pricePerUnit: '$19.99',
        qtyRange: '1 - 9 pcs',
        features: ['Full HD Color Front or Back', 'Complimentary Pre-treat', 'Individually Polybagged', '24h Priority Queue'],
        isPopular: false
      },
      {
        tier: 'Creator Drop & Team',
        pricePerUnit: '$13.50',
        qtyRange: '10 - 49 pcs',
        features: ['Front & Back 2-Location Print Included', 'Custom Inside Neck Label Transfer', 'Bulk Box Packaging', 'Dedicated Account Rep'],
        isPopular: true
      },
      {
        tier: 'Brand Enterprise Volume',
        pricePerUnit: '$9.80',
        qtyRange: '50+ pcs',
        features: ['All Locations Included', 'Custom Woven Tag Attachment', 'Folded & Barcode Labeled', 'Free Ground Logistics Shipping'],
        isPopular: false
      }
    ],
    faqs: [
      {
        q: 'What artwork file formats work best for DTG printing?',
        a: 'We recommend high-resolution PNG or TIFF files with transparent backgrounds, rendered at 300 DPI at full print scale. Vector files (AI, EPS, SVG, PDF) with fonts converted to outlines are also welcome.'
      },
      {
        q: 'Does DTG printing crack or peel over time?',
        a: 'No! Unlike traditional vinyl heat-press transfers that sit on top of the fabric as plastic films, DTG inks permeate directly into the garment threads and cure thermally, so they do not peel or crack.'
      },
      {
        q: 'Can DTG print on dark and black t-shirts?',
        a: 'Yes, absolutely. Our high-speed machines lay down an automated high-opacity titanium white underbase before applying the vivid colored inks on all dark fabrics.'
      }
    ]
  },
  {
    id: 'sublimation',
    title: 'All-Over Dye Sublimation & Drinkware',
    category: 'Sublimation & Hardware',
    subtitle: 'Seamless edge-to-edge full surface printing for jerseys, ceramic mugs, gaming mousepads, and stainless steel bottles.',
    icon: '',
    badge: '360° Seamless',
    rating: 4.8,
    reviewsCount: 390,
    turnaround: '2 - 3 Days',
    minOrder: '1 Piece',
    heroImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    overview: 'Dye sublimation uses heat and pressure to transform solid dye particles directly into a gas, bonding permanently into polyester polymer molecules and specialized coated surfaces. The result is an indelible, scratch-proof, completely permanent high-gloss or matte visual that never fades.',
    benefits: [
      { title: 'True 360° Edge-to-Edge Print', desc: 'No borders or margins. Cover every millimeter of mugs, mousepads, tote accessories, and activewear.' },
      { title: 'Fade-Proof & Dishwasher Safe', desc: 'Embedded directly into the coating substrate, resistant to UV light, microwaves, and commercial dishwashers.' },
      { title: 'Vivid Neon & Rich Black Depth', desc: 'Wide color gamut reproducing neon gaming gradients and ultra-deep contrast.' },
      { title: 'Zero Tactile Texture', desc: 'The surface feels completely glass-smooth with no raised ridges.' }
    ],
    technicalSpecs: [
      { key: 'Substrate Coatings', value: 'High-density ORCA coatings, Poly-blend polymers, 304 Stainless' },
      { key: 'Heating Temperature', value: '400°F (204°C) at 60 PSI calibrated hydraulic pressure' },
      { key: 'Resolution', value: '1440 DPI MicroPiezo print head' },
      { key: 'Dishwasher Grade', value: 'Certified 3,000 industrial cycles' }
    ],
    pricingTiers: [
      {
        tier: 'Individual Piece',
        pricePerUnit: '$14.50',
        qtyRange: '1 - 5 pcs',
        features: ['Full wrap edge-to-edge', 'Gift-ready crushproof box', 'Custom bottom stamp option'],
        isPopular: false
      },
      {
        tier: 'Merch Bundle (10+)',
        pricePerUnit: '$8.90',
        qtyRange: '10 - 50 pcs',
        features: ['Full color 360° Sublimation', 'Custom branded sticker seal', 'Protective bubble sleeves'],
        isPopular: true
      },
      {
        tier: 'Commercial Bulk (100+)',
        pricePerUnit: '$5.80',
        qtyRange: '100+ pcs',
        features: ['Master carton shipping', 'Custom packaging inserts', 'Palletized express delivery'],
        isPopular: false
      }
    ],
    faqs: [
      {
        q: 'Can dye sublimation be applied to 100% cotton garments?',
        a: 'Sublimation requires synthetic polymer chains (polyester) or polymer coatings to bind. For pure cotton apparel, we recommend our DTG or Screen Transfer methods.'
      },
      {
        q: 'Are the sublimated mugs microwave and dishwasher safe?',
        a: 'Yes, our ceramic mugs and tumblers use hard ORCA-coated glaze that is 100% microwave safe and top-rack dishwasher safe.'
      }
    ]
  },
  {
    id: 'embroidery',
    title: '3D Puff & Precision Stitch Embroidery',
    category: 'High-End Needlework',
    subtitle: 'High-density Tajima multi-head embroidery delivering tactile 3D puff and flat luxury stitching for caps, hoodies, and beanies.',
    icon: '',
    badge: 'Luxury Tactile',
    rating: 5.0,
    reviewsCount: 440,
    turnaround: '3 - 5 Days',
    minOrder: '6 Pieces',
    heroImage: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1200&q=80',
    overview: 'Give your streetwear and corporate merchandise a structured, premium texture with our precision Tajima embroidery machines. We offer up to 15 thread colors per design, specialized metallic threads, and 3D foam puff embroidery that gives hats and outerwear an authentic luxury look.',
    benefits: [
      { title: '3D Foam Puff Dimension', desc: 'Elevate your letters and logo outlines with high-density EVA foam that pops off the fabric.' },
      { title: 'Tajima 15-Needle Precision', desc: 'Capable of handling complex multi-color crests, micro-lettering down to 4mm, and intricate line work.' },
      { title: 'Madeira Polyneon Threads', desc: 'Industrial grade, high-sheen German threads that never bleed or break under heavy wear.' },
      { title: 'Expert Digitization', desc: 'Manual vector-to-stitch digitization with stitch density optimization to prevent fabric puckering.' }
    ],
    technicalSpecs: [
      { key: 'Max Thread Colors', value: '15 threads per design location' },
      { key: 'Stitch Formats', value: 'Flat Satin, Tatami Fill, 3D Puff EVA, Metallic Madeira' },
      { key: 'Supported Products', value: 'Snapbacks, Dad Hats, Beanies, Fleece Hoodies, Bomber Jackets, Canvas Backpacks' },
      { key: 'Minimum Letter Height', value: '4.5 mm for crisp legibility' }
    ],
    pricingTiers: [
      {
        tier: 'Creator Starter (6+ pcs)',
        pricePerUnit: '$24.00',
        qtyRange: '6 - 24 pcs',
        features: ['Up to 8,000 stitches', 'Front center embroidery', 'Standard thread palette', '1 Free digital stitch proof'],
        isPopular: false
      },
      {
        tier: 'Streetwear Brand (25+ pcs)',
        pricePerUnit: '$16.50',
        qtyRange: '25 - 99 pcs',
        features: ['3D Puff EVA Included', 'Front + Side/Back Stitch', 'Free Digitizing Setup ($45 value)', 'Inside Custom Woven Label'],
        isPopular: true
      },
      {
        tier: 'Wholesale Volume (100+ pcs)',
        pricePerUnit: '$11.20',
        qtyRange: '100+ pcs',
        features: ['Up to 15,000 stitches', 'Metallic thread accents', 'Individual hang tag attach', 'Express air delivery'],
        isPopular: false
      }
    ],
    faqs: [
      {
        q: 'What is stitch digitizing?',
        a: 'Digitizing is the specialized process of converting your 2D flat artwork into programmed stitch paths, densities, and needle directions that the embroidery robot reads.'
      },
      {
        q: 'Can all logos be done in 3D puff?',
        a: '3D puff works best with bold lettering and thick shapes (at least 5mm wide). Extremely thin lines and tiny text are completed in crisp flat satin stitch for optimal sharpness.'
      }
    ]
  },
  {
    id: 'creator-drops',
    title: 'Creator POD Drop & Fulfillment Studio',
    category: 'Creator Economy',
    subtitle: 'End-to-end merchandise management for YouTube creators, Twitch streamers, podcasters, and indie musicians.',
    icon: '',
    badge: 'Zero Risk',
    rating: 4.9,
    reviewsCount: 680,
    turnaround: 'Automated 48h Dispatch',
    minOrder: 'Zero Inventory',
    heroImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
    overview: 'Turn your fanbase into a recurring revenue stream without ever packing a box, managing warehouses, or handling customer return emails. TrendZ Creator Suite connects to your store, prints items on demand when fans order, and ships worldwide under your custom branded packaging.',
    benefits: [
      { title: '100% White-Label Branding', desc: 'Your brand name, return address, custom neck tags, and packing slips on every customer package.' },
      { title: 'Global Multi-Hub Logistics', desc: 'Fulfillment centers in USA, Europe, UK, and Asia Pacific for blazing fast shipping and minimal customs.' },
      { title: 'Real-Time Royalty Payouts', desc: 'Transparent dashboard tracking live sales, unit costs, gross revenue, and instant payout triggers via Stripe / PayPal.' },
      { title: 'Limited Drop Countdown Engine', desc: 'Pre-order campaign tools with stock counters and urgency timers designed to maximize drop day hype.' }
    ],
    technicalSpecs: [
      { key: 'API Integrations', value: 'Shopify, WooCommerce, TikTok Shop, Etsy, Discord Webhooks, Custom REST API' },
      { key: 'Avg Dispatch Speed', value: '98.4% of orders dispatched within 48 business hours' },
      { key: 'Branding Inserts', value: 'Custom holographic stickers, thank-you cards, custom poly mailers' }
    ],
    pricingTiers: [
      {
        tier: 'Free Starter Hub',
        pricePerUnit: 'Pay Per Order',
        qtyRange: 'Zero monthly fees',
        features: ['Standard catalog access', 'Automated order sync', 'Real-time tracking notifications', 'Standard white-label pack'],
        isPopular: false
      },
      {
        tier: 'Creator Pro Suite',
        pricePerUnit: '$29 / month',
        qtyRange: 'High-Volume Drops',
        features: ['15% Discount on all base costs', 'Custom branded polymailers', 'VIP priority production line', 'Dedicated Discord channel'],
        isPopular: true
      },
      {
        tier: 'Agency & Label',
        pricePerUnit: 'Custom Quote',
        qtyRange: '1,000+ orders/mo',
        features: ['Dedicated warehouse bin storage', 'Custom cut-and-sew apparel', 'Live event tour merch trucking', 'Custom API integration'],
        isPopular: false
      }
    ],
    faqs: [
      {
        q: 'How do I receive my creator profit payouts?',
        a: 'Profits are calculated as (Customer Price - Base Manufacturing Cost). Earnings accumulate in your Creator Portal and can be withdrawn anytime via direct bank transfer, PayPal, or Stripe.'
      },
      {
        q: 'Do you handle customer returns and exchanges?',
        a: 'Yes, our automated support system processes size exchanges and damaged-item reprints with zero friction.'
      }
    ]
  },
  {
    id: 'custom-packaging',
    title: 'Luxury Unboxing & Custom Packaging',
    category: 'Brand Packaging',
    subtitle: 'Custom printed matte polymailers, rigid magnetic boxes, embossed tissue paper, and holographic sticker packs.',
    icon: '',
    badge: 'Premium Unboxing',
    rating: 4.9,
    reviewsCount: 280,
    turnaround: '3 - 7 Days',
    minOrder: '25 Units',
    heroImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    overview: 'In e-commerce, the physical unboxing moment is your most powerful marketing touchpoint. We craft bespoke custom mailers, FSC-certified tissue paper, foil-stamped thank-you inserts, and branded shipping boxes that turn your buyers into viral social media unboxing creators.',
    benefits: [
      { title: 'Foil & Spot UV Embellishments', desc: 'Add gold, silver, or holographic foil stamping and tactile high-gloss UV accents.' },
      { title: '100% Recycled & Biodegradable', desc: 'Eco-conscious mailers and soy-based inks that align with modern consumer sustainability values.' },
      { title: 'Warehouse Storage Included', desc: 'Order packaging in bulk and we store it in our fulfillment center free of charge to pack with your future orders.' }
    ],
    technicalSpecs: [
      { key: 'Materials', value: '350 GSM Kraft Paper, 100% D2W Biodegradable Poly, Heavy Corrugated E-Flute' },
      { key: 'Finishes', value: 'Soft-Touch Matte Lamination, Gloss UV, Metallic Foil, Embossing' }
    ],
    pricingTiers: [
      {
        tier: 'Custom Polymailer Pack',
        pricePerUnit: '$0.85/unit',
        qtyRange: '100 units',
        features: ['Full front/back dual color print', 'Dual adhesive strip for returns', 'Waterproof 60 micron film'],
        isPopular: true
      },
      {
        tier: 'Rigid Presentation Box',
        pricePerUnit: '$3.40/unit',
        qtyRange: '50 units',
        features: ['Full color outside + inside printing', 'Matte velvet lamination', 'Custom die-cut foam insert available'],
        isPopular: false
      }
    ],
    faqs: [
      {
        q: 'Can TrendZ store our packaging and pack our POD orders in them?',
        a: 'Yes! When you order packaging through TrendZ, we automatically store your stock in our logistics hub and pack every new order in your custom boxes/mailers.'
      }
    ]
  },
  {
    id: 'corporate-bulk',
    title: 'Corporate Merch & Event Fulfillment',
    category: 'B2B & Enterprise',
    subtitle: 'High-volume custom merchandise packages for tech conferences, employee onboarding kits, and brand activations.',
    icon: '',
    badge: 'Enterprise Scalable',
    rating: 4.9,
    reviewsCount: 310,
    turnaround: '5 - 7 Days',
    minOrder: '50 Bundles',
    heroImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    overview: 'Outfit your team with curated swag boxes that people actually love to wear. From premium Patagonia-style jackets and embroidered backpacks to smart stainless drinkware and tech organizers, we handle individual home address drop-shipping across 60+ countries.',
    benefits: [
      { title: 'Kitting & Custom Onboarding Boxes', desc: 'Combine apparel, tech gadgets, notebooks, and snacks into one elegantly packed box.' },
      { title: 'Multi-Address Global Dispatch', desc: 'Upload a CSV of employee addresses or let them choose their own sizes via a private custom portal.' },
      { title: 'Dedicated B2B Account Director', desc: 'Single point of contact managing sample approvals, tax invoicing, and logistics guarantees.' }
    ],
    technicalSpecs: [
      { key: 'Swag Options', value: 'Apparel, Tech Accessories, Drinkware, Stationery, Custom Audio, Bags' },
      { key: 'Global Coverage', value: 'Direct delivery with prepaid DDP duties to 120+ countries' }
    ],
    pricingTiers: [
      {
        tier: 'Starter Event Swag Kit',
        pricePerUnit: '$35 / box',
        qtyRange: '50 - 150 kits',
        features: ['Custom T-Shirt + Mug + Sticker Pack', 'Branded Kraft Swag Box', 'Bulk pallet shipment to venue'],
        isPopular: false
      },
      {
        tier: 'Executive Onboarding Swag',
        pricePerUnit: '$79 / box',
        qtyRange: '25+ kits',
        features: ['Premium Fleece Hoodie + Stainless Tumbler + Hardcover Notebook + Metal Pen', 'Custom magnetic rigid gift box', 'Direct-to-home dispatch'],
        isPopular: true
      }
    ],
    faqs: [
      {
        q: 'Can you ship directly to remote employees around the world?',
        a: 'Yes! We support global multi-address dispatch with all customs duties and local VAT prepaid (DDP) so your employees never pay fees upon delivery.'
      }
    ]
  }
];
