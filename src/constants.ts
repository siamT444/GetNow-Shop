import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Tech Gadgets', icon: 'Cpu', slug: 'tech' },
  { id: '2', name: 'Home & Kitchen', icon: 'Home', slug: 'home' },
  { id: '3', name: 'Health & Fitness', icon: 'Activity', slug: 'health' },
  { id: '4', name: 'Smart Accessories', icon: 'Watch', slug: 'accessories' },
  { id: '5', name: 'Trending TikTok', icon: 'Zap', slug: 'trending' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Sony WH-1000XM5 Noise Canceling Headphones',
    category: 'Tech Gadgets',
    image: 'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&q=80&w=800',
    price: '$348.00',
    rating: 4.8,
    reviewsCount: 12450,
    benefit: 'Industry-leading noise cancellation with exceptional sound quality.',
    features: [
      'Two processors control 8 microphones',
      'Auto NC Optimizer',
      'Up to 30-hour battery life',
      'Crystal clear hands-free calling'
    ],
    pros: ['Top-tier noise cancellation', 'Comfortable for long wear', 'Excellent app support'],
    cons: ['Expensive', 'Does not fold as small as XM4'],
    amazonUrl: 'https://amazon.com',
    description: 'The Sony WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation and exceptional call quality.',
    isTrending: true
  },
  {
    id: 'p2',
    name: 'Ninja AF101 Air Fryer, 4 Qt',
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800',
    price: '$89.99',
    rating: 4.7,
    reviewsCount: 45000,
    benefit: 'Crispy, healthy meals with up to 75% less fat than traditional frying.',
    features: [
      '4-quart ceramic-coated basket',
      'Wide temperature range: 105°F–400°F',
      'Dehydrate, Roast, Reheat functions',
      'Dishwasher safe parts'
    ],
    pros: ['Easy to clean', 'Compact design', 'Versatile functions'],
    cons: ['Small for large families', 'Initial plastic smell'],
    amazonUrl: 'https://amazon.com',
    description: 'The Ninja Air Fryer is a versatile kitchen essential that lets you enjoy your favorite fried foods with a fraction of the oil.',
    isTrending: true,
    isDeal: true,
    discount: '25% OFF'
  },
  {
    id: 'p3',
    name: 'Apple Watch Series 9 [GPS 41mm]',
    category: 'Smart Accessories',
    image: 'https://images.unsplash.com/photo-1546868871-70c122467d8b?auto=format&fit=crop&q=80&w=800',
    price: '$329.00',
    rating: 4.9,
    reviewsCount: 8900,
    benefit: 'The ultimate device for a healthy life is now even more powerful.',
    features: [
      'S9 SiP for a super-bright display',
      'Magic double tap gesture',
      'Advanced health sensors',
      'Carbon neutral combinations available'
    ],
    pros: ['Incredible performance', 'Brightest screen yet', 'Seamless ecosystem'],
    cons: ['18-hour battery life', 'Requires iPhone'],
    amazonUrl: 'https://amazon.com',
    description: 'Apple Watch Series 9 helps you stay connected, active, healthy, and safe. Featuring the S9 SiP and a magical new way to use your watch without touching the screen.',
    isTrending: true
  },
  {
    id: 'p4',
    name: 'WalkingPad C2 Mini Foldable Treadmill',
    category: 'Health & Fitness',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=800',
    price: '$449.00',
    rating: 4.5,
    reviewsCount: 3200,
    benefit: 'Perfect for under-desk walking and small apartments.',
    features: [
      '180-degree folding design',
      'Smart gravity foot sensing speed control',
      'Quiet brushless motor',
      'App and remote control'
    ],
    pros: ['Extremely space-saving', 'Quiet operation', 'No assembly required'],
    cons: ['Walking only (no running)', 'Weight limit 220lbs'],
    amazonUrl: 'https://amazon.com',
    description: 'The WalkingPad C2 is the ultimate solution for staying active while working from home. Its patented folding technology makes it easy to store under a sofa or bed.',
    isTrending: false,
    isDeal: true,
    discount: '$50 Coupon'
  }
];
