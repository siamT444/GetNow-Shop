export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  price: string;
  rating: number;
  reviewsCount: number;
  benefit: string;
  features: string[];
  pros: string[];
  cons: string[];
  amazonUrl: string;
  description: string;
  isTrending?: boolean;
  isDeal?: boolean;
  discount?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  slug: string;
}
